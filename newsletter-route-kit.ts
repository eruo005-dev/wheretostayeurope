// apps/web/src/app/api/newsletter/route.ts
//
// REPLACES the Listmonk-based newsletter-route.ts.
// Posts subscribers to Kit (formerly ConvertKit). Free up to 10k subs.
//
// Kit's API: https://developers.kit.com/v4
// You provide:
//   - one form per locale (create in Kit dashboard); set form_id env per locale
//   - one API key from Kit account settings
//
// Env vars:
//   KIT_API_KEY            — Kit API key
//   KIT_FORM_ID_EN         — form ID for English subscribers
//   KIT_FORM_ID_DE         — German (optional; falls back to EN if missing)
//   KIT_FORM_ID_FR         — French (optional)
//   KIT_FORM_ID_ES         — Spanish (optional)
//   TURNSTILE_SECRET_KEY   — Cloudflare Turnstile (spam gate)

import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- In-memory rate limit (per IP, 5 signups per hour) ----
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit.entries()) {
    if (entry.resetAt < now) rateLimit.delete(ip);
  }
}, RATE_LIMIT_WINDOW_MS).unref?.();

// ---- Turnstile verification ----
async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production"; // dev-only bypass
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const json = (await res.json()) as { success: boolean };
    return !!json.success;
  } catch {
    return false;
  }
}

// ---- Kit subscribe ----
async function subscribeToKit(
  email: string,
  locale: Locale,
  source: string
): Promise<{ ok: boolean; status: number; body?: unknown }> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return { ok: false, status: 500, body: "KIT_API_KEY not configured" };

  const formIdRaw =
    process.env[`KIT_FORM_ID_${locale.toUpperCase()}`] ?? process.env.KIT_FORM_ID_EN;
  if (!formIdRaw) return { ok: false, status: 500, body: "Kit form id not configured" };
  const formId = parseInt(formIdRaw, 10);

  // Kit v4 API: POST /v4/forms/{form_id}/subscribers
  // The free tier requires the v3-style `api_key` query param flow OR the v4 OAuth flow.
  // Simplest: use the v3 endpoint which Kit still supports for forms.
  const res = await fetch(`https://api.kit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      fields: {
        locale,
        source,
        signed_up_at: new Date().toISOString(),
      },
    }),
  });

  if (res.ok) return { ok: true, status: res.status };
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {}
  return { ok: false, status: res.status, body };
}

// ---- Handler ----
export async function POST(req: Request) {
  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many signups. Try again later." }, { status: 429 });
  }

  let email = "";
  let locale: Locale = "en";
  let turnstileToken: string | null = null;
  let source = "homepage";

  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const json = (await req.json()) as { email?: string; locale?: string; turnstileToken?: string; source?: string };
      email = String(json.email ?? "").trim().toLowerCase();
      locale = (SUPPORTED_LOCALES as readonly string[]).includes(String(json.locale))
        ? (json.locale as Locale)
        : "en";
      turnstileToken = json.turnstileToken ?? null;
      source = String(json.source ?? "homepage").slice(0, 80);
    } else {
      const form = await req.formData();
      email = String(form.get("email") ?? "").trim().toLowerCase();
      const rawLocale = String(form.get("locale") ?? "en");
      locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale)
        ? (rawLocale as Locale)
        : "en";
      turnstileToken = String(form.get("cf-turnstile-response") ?? "") || null;
      source = String(form.get("source") ?? "homepage").slice(0, 80);
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: "Captcha verification failed." }, { status: 403 });
  }

  const result = await subscribeToKit(email, locale, source);
  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error("[newsletter] kit failed:", result.status, result.body);
    return NextResponse.json({ error: "Signup failed. Please try again shortly." }, { status: 502 });
  }

  const confirmMessage: Record<Locale, string> = {
    en: "Check your inbox — we sent a confirmation link.",
    de: "Prüfe dein Postfach — wir haben dir einen Bestätigungslink geschickt.",
    fr: "Vérifiez votre boîte mail — un lien de confirmation vient d'être envoyé.",
    es: "Revisa tu correo — te enviamos un enlace de confirmación.",
  };

  const accept = req.headers.get("accept") ?? "";
  if (!accept.includes("application/json")) {
    const url = new URL(req.url);
    return NextResponse.redirect(new URL(`/${locale}/thank-you`, url), 303);
  }

  return NextResponse.json({ ok: true, message: confirmMessage[locale] });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

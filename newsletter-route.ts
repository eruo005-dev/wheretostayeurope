// apps/web/src/app/api/newsletter/route.ts
//
// Newsletter signup endpoint.
//   - Validates email + locale (both from the home-page form)
//   - Verifies Cloudflare Turnstile (spam gate)
//   - Adds subscriber to Listmonk with status="unconfirmed" → Listmonk sends
//     the double-opt-in email (required for GDPR consent proof)
//   - Rate-limits per IP (in-memory; swap to Redis if you later run multiple nodes)
//
// Env needed:
//   LISTMONK_URL           — e.g. http://listmonk.internal:9000
//   LISTMONK_USER          — Listmonk admin username
//   LISTMONK_PASS          — Listmonk admin password
//   LISTMONK_LIST_ID_<LOCALE> — per-locale list ID (e.g. LISTMONK_LIST_ID_EN=1)
//   TURNSTILE_SECRET_KEY   — Cloudflare Turnstile server-side key

import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- Simple in-memory rate limit (per IP, 5 signups per hour) ----
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

// Periodic sweep — keep map size bounded on long-running server
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimit.entries()) {
    if (entry.resetAt < now) rateLimit.delete(ip);
  }
}, RATE_LIMIT_WINDOW_MS).unref?.();

// ---- Turnstile verification ----
async function verifyTurnstile(token: string | null, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // In dev, skip if not configured. In prod, fail closed.
    return process.env.NODE_ENV !== "production";
  }
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const json = (await res.json()) as { success: boolean };
    return !!json.success;
  } catch {
    return false;
  }
}

// ---- Listmonk subscriber creation ----
async function createListmonkSubscriber(
  email: string,
  locale: Locale,
  source: string
): Promise<{ ok: boolean; status: number; body?: unknown }> {
  const url = process.env.LISTMONK_URL;
  const user = process.env.LISTMONK_USER;
  const pass = process.env.LISTMONK_PASS;
  const listIdRaw = process.env[`LISTMONK_LIST_ID_${locale.toUpperCase()}`];
  const listId = listIdRaw ? parseInt(listIdRaw, 10) : null;

  if (!url || !user || !pass || !listId) {
    return { ok: false, status: 500, body: "Listmonk not configured" };
  }

  const authHeader = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");

  const payload = {
    email,
    name: email.split("@")[0],
    status: "enabled",
    preconfirm_subscriptions: false, // → double opt-in; Listmonk sends confirmation email
    lists: [listId],
    attribs: {
      locale,
      source,
      signed_up_at: new Date().toISOString(),
    },
  };

  const res = await fetch(`${url}/api/subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 409 || res.status === 200 || res.status === 201) {
    // 409 = already exists — that's fine, treat as success (idempotent signup)
    return { ok: true, status: res.status };
  }

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

  const contentType = req.headers.get("content-type") ?? "";

  let email = "";
  let locale: Locale = "en";
  let turnstileToken: string | null = null;
  let source = "homepage";

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

  const result = await createListmonkSubscriber(email, locale, source);
  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error("[newsletter] listmonk failed:", result.status, result.body);
    return NextResponse.json({ error: "Signup failed. Please try again shortly." }, { status: 502 });
  }

  const confirmMessage: Record<Locale, string> = {
    en: "Check your inbox — we sent a confirmation link.",
    de: "Prüfe dein Postfach — wir haben dir einen Bestätigungslink geschickt.",
    fr: "Vérifiez votre boîte mail — un lien de confirmation vient d'être envoyé.",
    es: "Revisa tu correo — te enviamos un enlace de confirmación.",
  };

  // If the form submission came from a classic HTML form (no Accept: application/json), redirect
  // to a /thank-you page so the browser displays something; JSON clients get a JSON response.
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

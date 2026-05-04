// apps/web/src/middleware.ts
//
// Route middleware: locale enforcement + basic redirects.
//   - `/`            → `/en` (or negotiated locale from Accept-Language)
//   - `/le-marais`   → `/en/le-marais` (bare path without locale gets prefixed)
//   - `/EN/foo`      → `/en/foo` (locale case normalization)
//   - preserves query string, method, and cookies
//
// Deliberately does NOT:
//   - Try to redirect per-user-locale (respects whatever URL they shared/bookmarked)
//   - Touch /api/*, /_next/*, /favicon.ico, /robots.txt, /sitemap*.xml — these stay locale-less

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

/** Paths where the middleware should not run. */
const SKIP_PREFIXES = [
  "/api/",
  "/_next/",
  "/favicon.ico",
  "/robots.txt",
  "/ads.txt",      // AdSense / IAB ads.txt declaration — must be at root
  "/sitemap",
  "/legal/",       // legal pages get a locale prefix via the matcher redirect below, but when they arrive unprefixed we redirect
  "/admin/",       // Payload admin — not locale-aware
];

/** Parse the preferred locale from an Accept-Language header. */
function negotiateLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const parts = header
    .split(",")
    .map((p) => {
      const [tag, qStr] = p.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: qStr ? parseFloat(qStr) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parts) {
    const primary = tag.split("-")[0] as Locale;
    if (SUPPORTED_LOCALES.includes(primary)) return primary;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip API, Next internals, admin, static assets
  if (SKIP_PREFIXES.some((p) => p === pathname || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const firstSeg = pathname.split("/")[1] ?? "";
  const firstSegLower = firstSeg.toLowerCase();

  // Case-normalize locale
  if (firstSegLower !== firstSeg && SUPPORTED_LOCALES.includes(firstSegLower as Locale)) {
    const normalized = "/" + firstSegLower + pathname.slice(1 + firstSeg.length);
    const url = req.nextUrl.clone();
    url.pathname = normalized;
    return NextResponse.redirect(url, 308);
  }

  // Already locale-prefixed — carry on
  if (SUPPORTED_LOCALES.includes(firstSegLower as Locale)) {
    // Propagate locale to server components via a request header (used by root layout to set html lang)
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set("x-wts-locale", firstSegLower);
    return NextResponse.next({ request: { headers: reqHeaders } });
  }

  // Root redirect — negotiate from Accept-Language
  if (pathname === "/") {
    const locale = negotiateLocale(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url, 307);
  }

  // Bare unprefixed path — slap the default locale on and redirect
  const locale = negotiateLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Match everything except the paths we explicitly skip above (duplicated here for Next.js)
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|ads.txt|sitemap|admin).*)",
  ],
};

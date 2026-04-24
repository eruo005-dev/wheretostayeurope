// apps/web/src/app/api/revalidate/route.ts
//
// On-demand ISR invalidator — hit by n8n after the Booking property sync runs,
// by Payload on content publish/update, or manually by admin.
//
// Auth: shared secret via X-Revalidate-Secret header (preferred) or ?secret= query.
// Never log the secret. Rate-limit at the CDN level (Cloudflare rule recommended).
//
// Request shape:
//   POST /api/revalidate
//   Header: X-Revalidate-Secret: <REVALIDATE_SECRET>
//   Body:   { "type": "city"|"neighborhood"|"country"|"page"|"all",
//             "slug":  "le-marais",           // entity slug (required except for "all")
//             "citySlug": "paris",            // required for neighborhood/page scoped to a city
//             "countrySlug": "france",        // required for city/neighborhood/page
//             "locales": ["en","de","fr","es"]  // optional; defaults to all supported
//           }
//
// Response: { revalidated: true, paths: [...], ts: ISO8601 }

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

type RevalidateBody = {
  type: "city" | "neighborhood" | "country" | "page" | "all";
  slug?: string;
  citySlug?: string;
  countrySlug?: string;
  locales?: Locale[];
};

function checkSecret(req: Request): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const header = req.headers.get("x-revalidate-secret");
  if (header && timingSafeEqual(header, expected)) return true;
  const url = new URL(req.url);
  const qs = url.searchParams.get("secret");
  if (qs && timingSafeEqual(qs, expected)) return true;
  return false;
}

/** Timing-safe string compare — avoids auth bypass via response-time side channel. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: Request) {
  if (!checkSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody;
  try {
    body = (await req.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const locales = body.locales ?? [...SUPPORTED_LOCALES];
  const revalidated: string[] = [];

  try {
    switch (body.type) {
      case "all": {
        // Nuclear option: drop all ISR. Use sparingly (e.g. after template change).
        for (const locale of locales) {
          revalidatePath(`/${locale}`, "layout");
          revalidated.push(`/${locale} (layout)`);
        }
        break;
      }

      case "country": {
        if (!body.slug) return NextResponse.json({ error: "slug required for type=country" }, { status: 400 });
        for (const locale of locales) {
          const p = `/${locale}/${body.slug}`;
          revalidatePath(p);
          revalidated.push(p);
          // Country hub lists cities → revalidate at layout scope to catch nested /[city] pages with stale snippets
          revalidatePath(p, "layout");
        }
        revalidateTag(`country:${body.slug}`);
        break;
      }

      case "city": {
        if (!body.slug || !body.countrySlug) {
          return NextResponse.json(
            { error: "slug + countrySlug required for type=city" },
            { status: 400 }
          );
        }
        for (const locale of locales) {
          const p = `/${locale}/${body.countrySlug}/${body.slug}`;
          revalidatePath(p);
          revalidated.push(p);
          // Also revalidate the country hub (city list may have changed)
          const country = `/${locale}/${body.countrySlug}`;
          revalidatePath(country);
          revalidated.push(country);
        }
        revalidateTag(`city:${body.slug}`);
        break;
      }

      case "neighborhood": {
        if (!body.slug || !body.citySlug || !body.countrySlug) {
          return NextResponse.json(
            { error: "slug + citySlug + countrySlug required for type=neighborhood" },
            { status: 400 }
          );
        }
        for (const locale of locales) {
          const n = `/${locale}/${body.countrySlug}/${body.citySlug}/${body.slug}`;
          revalidatePath(n);
          revalidated.push(n);
          // Revalidate the parent city too — its top-properties + cheat-sheet may change
          const city = `/${locale}/${body.countrySlug}/${body.citySlug}`;
          revalidatePath(city);
          revalidated.push(city);
          // And Tier 3 pages scoped to this neighborhood — revalidate by layout under the city
          revalidatePath(city, "layout");
        }
        revalidateTag(`neighborhood:${body.slug}`);
        break;
      }

      case "page": {
        if (!body.slug) return NextResponse.json({ error: "slug required for type=page" }, { status: 400 });
        // Generic published page — slug is the full path segment after locale.
        for (const locale of locales) {
          const p = `/${locale}/${body.slug.replace(/^\/+/, "")}`;
          revalidatePath(p);
          revalidated.push(p);
        }
        break;
      }

      default:
        return NextResponse.json(
          { error: `Unknown type: ${(body as { type: string }).type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      revalidated: true,
      type: body.type,
      paths: revalidated,
      ts: new Date().toISOString(),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[revalidate] error:", err);
    return NextResponse.json({ error: "Revalidate failed" }, { status: 500 });
  }
}

/** Block GET etc. to avoid accidental prefetch triggers. */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

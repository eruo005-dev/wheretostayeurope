// apps/web/src/app/sitemap.ts
//
// Dynamic sitemap.xml — Next.js 15 metadata route. Generates the full URL set
// across all 4 locales with hreflang annotations. Required for GSC + Bing.

import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { SITE_URL } from "@/lib/seo/config";

const LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof LOCALES)[number];

export const revalidate = 3600; // re-build sitemap hourly

function altLanguages(path: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
  ) as Record<Locale, string>;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ---------- Static pages ----------
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: { languages: altLanguages("") },
    });
    entries.push({
      url: `${SITE_URL}/${locale}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: altLanguages("/about") },
    });
  }

  // Skip DB queries during build if DATABASE_URL is missing (e.g. Vercel preview without env)
  if (!process.env.DATABASE_URL) {
    return entries;
  }

  let payload;
  try {
    payload = await getPayload({ config: payloadConfig });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[sitemap] Payload init failed; serving static-only sitemap", err);
    return entries;
  }

  // ---------- Countries ----------
  try {
    const countries = await payload.find({
      collection: "countries",
      limit: 100,
      depth: 0,
      pagination: false,
    });
    for (const c of countries.docs) {
      const path = `/${c.slug}`;
      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: new Date((c.updatedAt as string | undefined) ?? Date.now()),
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: { languages: altLanguages(path) },
        });
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[sitemap] countries query failed:", err);
  }

  // ---------- Cities ----------
  try {
    const cities = await payload.find({
      collection: "cities",
      limit: 1000,
      depth: 1,
      pagination: false,
    });
    for (const ci of cities.docs) {
      const country = typeof ci.country === "object" && ci.country
        ? (ci.country as { slug?: string })
        : null;
      if (!country?.slug) continue;
      const path = `/${country.slug}/${ci.slug}`;
      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: new Date(
            (ci.lastReviewedAt as string | undefined) ??
            (ci.updatedAt as string | undefined) ??
            Date.now()
          ),
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: { languages: altLanguages(path) },
        });
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[sitemap] cities query failed:", err);
  }

  // ---------- Neighborhoods ----------
  try {
    const neighborhoods = await payload.find({
      collection: "neighborhoods",
      limit: 5000,
      depth: 2,
      pagination: false,
    });
    for (const n of neighborhoods.docs) {
      const city = typeof n.city === "object" && n.city
        ? (n.city as { slug?: string; country?: unknown })
        : null;
      if (!city?.slug) continue;
      const country = city.country && typeof city.country === "object"
        ? (city.country as { slug?: string })
        : null;
      if (!country?.slug) continue;
      const path = `/${country.slug}/${city.slug}/${n.slug}`;
      for (const locale of LOCALES) {
        entries.push({
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: new Date(
            (n.lastReviewedAt as string | undefined) ??
            (n.updatedAt as string | undefined) ??
            Date.now()
          ),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: { languages: altLanguages(path) },
        });
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[sitemap] neighborhoods query failed:", err);
  }

  return entries;
}

// apps/web/src/app/sitemap.ts
//
// Dynamic sitemap.xml — Next.js 15 metadata route. Generates the full URL set
// across all 4 locales with hreflang annotations. Required for GSC + Bing.
//
// Static-blog mode: every URL is sourced from lib/data/* — no DB. The Payload
// branches at the bottom are kept dormant for the eventual CMS migration but
// gated on DATABASE_URL so they never run in static deployments.

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";
import { COMPARISONS } from "@/lib/data/static-data-comparisons";
import { COUNTRIES, CITIES, ALL_NEIGHBORHOODS } from "@/lib/data/static-data";
import { ARTICLES } from "@/lib/data/articles";
import { LEGAL_PAGES } from "@/lib/data/legal-content";

const LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof LOCALES)[number];

// Pre-AdSense-review change: only English entries are submitted to GSC. Until
// per-locale translations land, de/fr/es pages serve the same English content
// and are noindex'd by [locale]/layout.tsx. Including them in the sitemap as
// separate primary entries would flag the site as duplicate-content. We keep
// the hreflang alternates (`languages`) so when translations come live, a
// single revert restores full multi-locale indexing without re-engineering.
const PRIMARY_LOCALE: Locale = "en";

export const revalidate = 3600; // re-build sitemap hourly

function altLanguages(path: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
  ) as Record<Locale, string>;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ---------- Top-level static routes (English only — other locales noindex'd) ----------
  entries.push({
    url: `${SITE_URL}/${PRIMARY_LOCALE}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
    alternates: { languages: altLanguages("") },
  });
  entries.push({
    url: `${SITE_URL}/${PRIMARY_LOCALE}/about`,
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: { languages: altLanguages("/about") },
  });
  entries.push({
    url: `${SITE_URL}/${PRIMARY_LOCALE}/articles`,
    changeFrequency: "weekly",
    priority: 0.6,
    alternates: { languages: altLanguages("/articles") },
  });
  entries.push({
    url: `${SITE_URL}/${PRIMARY_LOCALE}/compare`,
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: { languages: altLanguages("/compare") },
  });

  // ---------- Countries ----------
  for (const c of COUNTRIES) {
    const path = `/${c.slug}`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: altLanguages(path) },
    });
  }

  // ---------- Cities ----------
  for (const ci of CITIES) {
    const path = `/${ci.countrySlug}/${ci.slug}`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: altLanguages(path) },
    });
  }

  // ---------- Neighborhoods ----------
  for (const n of ALL_NEIGHBORHOODS) {
    const path = `/${n.countrySlug}/${n.citySlug}/${n.slug}`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: altLanguages(path) },
    });
  }

  // ---------- Comparison pages ----------
  for (const c of COMPARISONS) {
    const path = `/${c.countrySlug}/${c.citySlug}/compare/${c.slug}`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: altLanguages(path) },
    });
  }

  // ---------- Per-city compare indexes ----------
  const cityCompareKeys = new Set<string>();
  for (const c of COMPARISONS) cityCompareKeys.add(`${c.countrySlug}/${c.citySlug}`);
  for (const key of cityCompareKeys) {
    const path = `/${key}/compare`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: altLanguages(path) },
    });
  }

  // ---------- Articles ----------
  for (const a of ARTICLES) {
    const path = `/articles/${a.slug}`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: a.reviewedAt ? new Date(a.reviewedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: altLanguages(path) },
    });
  }

  // ---------- Legal pages ----------
  for (const slug of Object.keys(LEGAL_PAGES) as Array<keyof typeof LEGAL_PAGES>) {
    const path = `/legal/${slug}`;
    entries.push({
      url: `${SITE_URL}/${PRIMARY_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: altLanguages(path) },
    });
  }

  return entries;
}

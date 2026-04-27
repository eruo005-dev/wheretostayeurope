// apps/web/src/app/(frontend)/[locale]/[country]/queries.ts
//
// STATIC version — no Payload, no DB. All data lives in static-data.ts.
// API surface is preserved so page.tsx does not need to change.

import "server-only";
import { findCountry, citiesInCountry, COUNTRIES } from "@/lib/data/static-data";
import type { LexicalRoot } from "@/components/content/LexicalRenderer";

type Locale = "en" | "de" | "fr" | "es";

export type CountryPageData = {
  id: string;
  slug: string;
  name: string;
  isoCode: string;
  currencyCode: string | null;
  timezone: string | null;
  euMember: boolean;
  schengen: boolean;
  introHtml: LexicalRoot | null;
  bestTimeToVisit: string | null;
  travelTips: Record<string, unknown> | null;
  metaTitle: string | null;
  metaDescription: string | null;
  heroImage: {
    url: string;
    alt: string;
    credit: string | null;
    creditUrl: string | null;
    source: string | null;
  } | null;
};

export type CityInCountry = {
  id: string;
  slug: string;
  name: string;
  tier: "1" | "2" | "3" | null;
  lat: number | null;
  lng: number | null;
  population: number | null;
  introSnippet: string | null;
};

export async function getCountryBySlug({
  countrySlug,
}: {
  countrySlug: string;
  locale: Locale;
}): Promise<CountryPageData | null> {
  const c = findCountry(countrySlug);
  if (!c) return null;

  // Build a minimal Lexical root so the renderer has something to display.
  const introRoot: LexicalRoot = {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text: c.intro }],
        },
      ],
    },
  } as unknown as LexicalRoot;

  return {
    id: c.slug,
    slug: c.slug,
    name: c.name,
    isoCode: c.isoCode,
    currencyCode: c.currency,
    timezone: c.timezone,
    euMember: c.euMember,
    schengen: c.schengen,
    introHtml: introRoot,
    bestTimeToVisit: null,
    travelTips: null,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    heroImage: null,
  };
}

/** Cities in a country, sorted by tier then name. */
export async function getCitiesInCountry({
  countryId,
}: {
  countryId: string;
  locale: Locale;
}): Promise<CityInCountry[]> {
  // countryId here is actually the country slug (we use slug as id in static mode).
  const list = citiesInCountry(countryId);

  return list
    .slice()
    .sort((a, b) => {
      if (a.tier !== b.tier) return a.tier.localeCompare(b.tier);
      return a.name.localeCompare(b.name);
    })
    .map((c) => ({
      id: c.slug,
      slug: c.slug,
      name: c.name,
      tier: c.tier,
      lat: c.lat,
      lng: c.lng,
      population: c.population,
      introSnippet: c.intro || null,
    }));
}

export async function getAllPublishedCountryPaths(): Promise<
  Array<{ locale: string; country: string }>
> {
  const out: Array<{ locale: string; country: string }> = [];
  const locales: Locale[] = ["en", "de", "fr", "es"];
  for (const c of COUNTRIES) {
    for (const locale of locales) {
      out.push({ locale, country: c.slug });
    }
  }
  return out;
}

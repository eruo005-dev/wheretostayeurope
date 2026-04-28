// apps/web/src/app/(frontend)/[locale]/[country]/[city]/queries.ts
//
// STATIC version — no Payload, no DB. Cities + neighborhoods come from static-data.ts.
// Property/price data is empty until we wire an external feed.

import "server-only";
import {
  findCountry,
  findCity,
  neighborhoodsInCity,
  CITIES,
  getCulturalNotes,
} from "@/lib/data/static-data";
import type { PropertyCardData } from "@/components/affiliate/PropertyCard";
import type { LexicalRoot } from "@/components/content/LexicalRenderer";

type Locale = "en" | "de" | "fr" | "es";

export type CityPageData = {
  id: string;
  slug: string;
  name: string;
  countryId: string;
  countrySlug: string;
  countryName: string;
  lat: number | null;
  lng: number | null;
  tier: "1" | "2" | "3" | null;
  bookingDestId: number | null;
  gygLocationId: number | null;
  introHtml: LexicalRoot | null;
  whenToVisit: string | null;
  gettingAround: string | null;
  safetyNotes: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  seasonality: Record<string, { crowd?: number; price?: number }> | null;
  culturalNotes: string | null;
  heroImage: {
    url: string;
    alt: string;
    credit: string | null;
    creditUrl: string | null;
    source: string | null;
  } | null;
};

export type NeighborhoodSummary = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  priceTier: number | null;
  vibeTags: string[];
  tripTypeFit: string[];
  polygonGeojson: GeoJSON.Polygon | null;
};

export async function getCityBySlug({
  countrySlug,
  citySlug,
}: {
  countrySlug: string;
  citySlug: string;
  locale: Locale;
}): Promise<CityPageData | null> {
  const country = findCountry(countrySlug);
  if (!country) return null;

  const city = findCity(countrySlug, citySlug);
  if (!city) return null;

  const introRoot: LexicalRoot = {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: city.intro || `Where to stay in ${city.name}, ${country.name}.`,
            },
          ],
        },
      ],
    },
  } as unknown as LexicalRoot;

  return {
    id: city.slug,
    slug: city.slug,
    name: city.name,
    countryId: country.slug,
    countrySlug: country.slug,
    countryName: country.name,
    lat: city.lat,
    lng: city.lng,
    tier: city.tier,
    bookingDestId: city.bookingDestId,
    gygLocationId: null,
    introHtml: introRoot,
    whenToVisit: null,
    gettingAround: null,
    safetyNotes: null,
    metaTitle: `Where to Stay in ${city.name} — Neighborhood Guide`,
    metaDescription: `Honest, no-fluff picks of where to stay in ${city.name}, ${country.name}. By neighborhood, by trip type.`,
    seasonality: null,
    culturalNotes: getCulturalNotes(city.slug),
    heroImage: null,
  };
}

/** All neighborhoods in the city, ordered by name. */
export async function getCityNeighborhoods({
  cityId,
}: {
  cityId: string;
  locale: Locale;
}): Promise<NeighborhoodSummary[]> {
  const list = neighborhoodsInCity(cityId);

  return list
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((n) => ({
      id: n.slug,
      slug: n.slug,
      name: n.name,
      summary: n.summary || null,
      priceTier: n.priceTier,
      vibeTags: n.vibeTags,
      tripTypeFit: n.tripTypeFit,
      polygonGeojson: null,
    }));
}

/** City-wide top properties — empty until we wire an external feed. */
export async function getCityTopProperties(_args: {
  cityId: string;
  locale: Locale;
  limit?: number;
}): Promise<PropertyCardData[]> {
  return [];
}

/** City-wide price-band distribution — empty until we wire an external feed. */
export async function getCityPriceDistribution(_args: {
  cityId: string;
}): Promise<Record<"$" | "$$" | "$$$" | "$$$$", number>> {
  return { "$": 0, "$$": 0, "$$$": 0, "$$$$": 0 };
}

export async function getAllPublishedCityPaths(): Promise<
  Array<{ locale: string; country: string; city: string }>
> {
  const out: Array<{ locale: string; country: string; city: string }> = [];
  const locales: Locale[] = ["en", "de", "fr", "es"];
  for (const c of CITIES) {
    for (const locale of locales) {
      out.push({ locale, country: c.countrySlug, city: c.slug });
    }
  }
  return out;
}

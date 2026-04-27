// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/queries.ts
//
// STATIC version — no Payload, no DB. Until the NEIGHBORHOODS array is populated
// in static-data.ts, every lookup returns null and the page hits notFound().

import "server-only";
import {
  findCountry,
  findCity,
  findNeighborhood,
  neighborhoodsInCity,
  NEIGHBORHOODS,
} from "@/lib/data/static-data";
import type { PropertyCardData } from "@/components/affiliate/PropertyCard";

type Locale = "en" | "de" | "fr" | "es";

export type NeighborhoodPageData = {
  id: string;
  cityId: string;
  slug: string;
  name: string;
  lat: number | null;
  lng: number | null;
  polygonGeojson: GeoJSON.Polygon | null;
  vibeTags: string[];
  tripTypeFit: string[];
  priceTier: number | null;
  safetyScore: number | null;
  walkabilityScore: number | null;
  nearestMetro: string[];
  summary: string | null;
  whoItsFor: string | null;
  whoShouldSkip: string | null;
  diningNotes: string | null;
  nightlifeNotes: string | null;
  stayTips: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  cityName: string;
  heroImage: {
    url: string;
    alt: string;
    credit: string | null;
    creditUrl: string | null;
    source: string | null;
  } | null;
};

type NeighborhoodLookup = {
  citySlug: string;
  countrySlug: string;
  neighborhoodSlug: string;
  locale: Locale;
};

export async function getNeighborhoodBySlug({
  citySlug,
  countrySlug,
  neighborhoodSlug,
}: NeighborhoodLookup): Promise<NeighborhoodPageData | null> {
  const country = findCountry(countrySlug);
  if (!country) return null;
  const city = findCity(countrySlug, citySlug);
  if (!city) return null;
  const n = findNeighborhood(countrySlug, citySlug, neighborhoodSlug);
  if (!n) return null;

  return {
    id: n.slug,
    cityId: city.slug,
    slug: n.slug,
    name: n.name,
    lat: null,
    lng: null,
    polygonGeojson: null,
    vibeTags: n.vibeTags,
    tripTypeFit: n.tripTypeFit,
    priceTier: n.priceTier,
    safetyScore: null,
    walkabilityScore: null,
    nearestMetro: [],
    summary: n.summary,
    whoItsFor: n.whoItsFor,
    whoShouldSkip: n.whoShouldSkip,
    diningNotes: null,
    nightlifeNotes: null,
    stayTips: null,
    metaTitle: `${n.name}, ${city.name} — Where to Stay`,
    metaDescription: n.summary,
    cityName: city.name,
    heroImage: null,
  };
}

export async function getCityWithCountry({
  citySlug,
  countrySlug,
}: {
  citySlug: string;
  countrySlug: string;
  locale: Locale;
}): Promise<{
  id: string;
  name: string;
  lat: number;
  lng: number;
  countryName: string;
  countrySlug: string;
  bookingDestId: number | null;
} | null> {
  const country = findCountry(countrySlug);
  if (!country) return null;
  const city = findCity(countrySlug, citySlug);
  if (!city) return null;

  return {
    id: city.slug,
    name: city.name,
    lat: city.lat,
    lng: city.lng,
    countryName: country.name,
    countrySlug: country.slug,
    bookingDestId: city.bookingDestId,
  };
}

/** Top properties — empty until we wire an external feed. */
export async function getPropertiesByNeighborhood(_args: {
  neighborhoodId: string;
  locale: Locale;
  limit?: number;
}): Promise<PropertyCardData[]> {
  return [];
}

/** Price band distribution — empty until we wire an external feed. */
export async function getPriceBandDistribution(_args: {
  neighborhoodId: string;
}): Promise<Record<"$" | "$$" | "$$$" | "$$$$", number>> {
  return { "$": 0, "$$": 0, "$$$": 0, "$$$$": 0 };
}

/** Related neighborhoods in the same city. */
export async function getRelatedNeighborhoods({
  cityId,
  excludeId,
  limit = 5,
}: {
  cityId: string;
  excludeId: string;
  locale: Locale;
  limit?: number;
}): Promise<
  Array<{
    id: string;
    slug: string;
    name: string;
    summary: string | null;
    polygonGeojson: GeoJSON.Polygon | null;
  }>
> {
  return neighborhoodsInCity(cityId)
    .filter((n) => n.slug !== excludeId)
    .slice(0, limit)
    .map((n) => ({
      id: n.slug,
      slug: n.slug,
      name: n.name,
      summary: n.summary || null,
      polygonGeojson: null,
    }));
}

export async function getAllPublishedNeighborhoodPaths(): Promise<
  Array<{ locale: string; country: string; city: string; neighborhood: string }>
> {
  const out: Array<{ locale: string; country: string; city: string; neighborhood: string }> = [];
  const locales: Locale[] = ["en", "de", "fr", "es"];
  for (const n of NEIGHBORHOODS) {
    for (const locale of locales) {
      out.push({
        locale,
        country: n.countrySlug,
        city: n.citySlug,
        neighborhood: n.slug,
      });
    }
  }
  return out;
}

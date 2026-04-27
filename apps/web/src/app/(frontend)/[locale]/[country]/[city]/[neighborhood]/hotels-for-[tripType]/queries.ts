// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/hotels-for-[tripType]/queries.ts
//
// STATIC version — no Payload, no DB. Trip-type pages don't ship until we have
// real property data; resolve* still works for routing/breadcrumbs.

import "server-only";
import {
  findCountry,
  findCity,
  findNeighborhood,
} from "@/lib/data/static-data";
import type { PropertyCardData } from "@/components/affiliate/PropertyCard";

type Locale = "en" | "de" | "fr" | "es";

export const VALID_TRIP_TYPES = [
  "couples",
  "families",
  "solo",
  "business",
  "luxury",
  "budget",
  "digital-nomads",
  "first-timers",
] as const;
export type TripType = (typeof VALID_TRIP_TYPES)[number];

export function isTripType(v: string): v is TripType {
  return (VALID_TRIP_TYPES as readonly string[]).includes(v);
}

export type Tier3Context = {
  neighborhoodId: string;
  neighborhoodName: string;
  neighborhoodSlug: string;
  cityId: string;
  cityName: string;
  citySlug: string;
  countryName: string;
  countrySlug: string;
  neighborhoodSummary: string | null;
};

export async function resolveTier3Context({
  countrySlug,
  citySlug,
  neighborhoodSlug,
}: {
  countrySlug: string;
  citySlug: string;
  neighborhoodSlug: string;
  locale: Locale;
}): Promise<Tier3Context | null> {
  const country = findCountry(countrySlug);
  if (!country) return null;
  const city = findCity(countrySlug, citySlug);
  if (!city) return null;
  const n = findNeighborhood(countrySlug, citySlug, neighborhoodSlug);
  if (!n) return null;

  return {
    neighborhoodId: n.slug,
    neighborhoodName: n.name,
    neighborhoodSlug: n.slug,
    cityId: city.slug,
    cityName: city.name,
    citySlug: city.slug,
    countryName: country.name,
    countrySlug: country.slug,
    neighborhoodSummary: n.summary,
  };
}

/** No external feed yet — return empty. */
export async function getTier3Properties(_args: {
  neighborhoodId: string;
  tripType: TripType;
  locale: Locale;
  limit?: number;
}): Promise<PropertyCardData[]> {
  return [];
}

export async function getTier3PriceDistribution(_args: {
  neighborhoodId: string;
  tripType: TripType;
}): Promise<Record<"$" | "$$" | "$$$" | "$$$$", number>> {
  return { "$": 0, "$$": 0, "$$$": 0, "$$$$": 0 };
}

/** Until we have real data, no trip-type page passes the threshold. */
export async function hasEnoughPropertiesForTier3(_args: {
  neighborhoodId: string;
  tripType: TripType;
  minCount?: number;
}): Promise<boolean> {
  return false;
}

// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/hotels-for-[tripType]/queries.ts
//
// Queries for the Tier 3 programmatic "top hotels in [neighborhood] for [tripType]" page.
// Filter logic mirrors Template 1 in tier3-page-templates.md.

import "server-only";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { query } from "@/lib/db";
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

/** Resolve neighborhood + city + country — same pattern as the neighborhood page. */
export async function resolveTier3Context({
  countrySlug,
  citySlug,
  neighborhoodSlug,
  locale,
}: {
  countrySlug: string;
  citySlug: string;
  neighborhoodSlug: string;
  locale: Locale;
}): Promise<Tier3Context | null> {
  const payload = await getPayload({ config: payloadConfig });

  const countryRes = await payload.find({
    collection: "countries",
    where: { slug: { equals: countrySlug } },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });
  const country = countryRes.docs[0];
  if (!country) return null;

  const cityRes = await payload.find({
    collection: "cities",
    where: { and: [{ country: { equals: country.id } }, { slug: { equals: citySlug } }] },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });
  const city = cityRes.docs[0];
  if (!city) return null;

  const nRes = await payload.find({
    collection: "neighborhoods",
    where: { and: [{ city: { equals: city.id } }, { slug: { equals: neighborhoodSlug } }] },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });
  const n = nRes.docs[0];
  if (!n) return null;

  return {
    neighborhoodId: String(n.id),
    neighborhoodName: String(n.name),
    neighborhoodSlug: String(n.slug),
    cityId: String(city.id),
    cityName: String(city.name),
    citySlug: String(city.slug),
    countryName: String(country.name),
    countrySlug: String(country.slug),
    neighborhoodSummary: (n.summary as string | null) ?? null,
  };
}

/** Fetch the top properties matching the trip-type filter for this neighborhood. */
export async function getTier3Properties({
  neighborhoodId,
  tripType,
  locale,
  limit = 15,
}: {
  neighborhoodId: string;
  tripType: TripType;
  locale: Locale;
  limit?: number;
}): Promise<PropertyCardData[]> {
  // Filter logic per tier3-page-templates.md Template 1.
  // Review-score floor varies by trip type (luxury + couples want 8.5+, others 8.0+).
  // Amenity filter varies too — we assemble dynamic SQL fragments safely.
  const reviewFloor = tripType === "luxury" || tripType === "couples" ? 8.5 : 8.0;

  // Trip-type-specific SQL predicates
  const predicatesByType: Record<TripType, string> = {
    couples:
      "('spa' = ANY(p.amenities) OR 'rooftop' = ANY(p.amenities) OR p.review_score >= 9.0)",
    families:
      "('family_rooms' = ANY(p.amenities) OR 'kids_club' = ANY(p.amenities) OR 'cot' = ANY(p.amenities))",
    solo:
      "(p.price_band IN ('$','$$') AND p.review_score >= 8.5)",
    business:
      "('business_center' = ANY(p.amenities) OR 'wifi' = ANY(p.amenities) OR 'desk' = ANY(p.amenities))",
    luxury:
      "(p.star_rating >= 4.5 OR p.price_band = '$$$$')",
    budget:
      "(p.price_band IN ('$','$$'))",
    "digital-nomads":
      "('wifi' = ANY(p.amenities) OR 'desk' = ANY(p.amenities) OR 'kitchen' = ANY(p.amenities))",
    "first-timers":
      "(p.review_score >= 8.5 AND p.review_count >= 100)",
  };

  const sql = `
    SELECT
      id, booking_id, name, type, star_rating, review_score, review_count,
      price_band, price_estimate_eur, image_primary_url, affiliate_url_template,
      translations->$3->>'short_pitch' AS short_pitch
    FROM properties p
    WHERE p.neighborhood_id = $1::uuid
      AND p.is_active = true
      AND p.review_score >= $2
      AND ${predicatesByType[tripType]}
    ORDER BY p.review_score DESC NULLS LAST, p.review_count DESC NULLS LAST
    LIMIT $4
  `;

  const rows = await query<{
    id: string;
    booking_id: string | null;
    name: string;
    type: string | null;
    star_rating: string | null;
    review_score: string | null;
    review_count: number | null;
    price_band: "$" | "$$" | "$$$" | "$$$$" | null;
    price_estimate_eur: number | null;
    image_primary_url: string | null;
    affiliate_url_template: string | null;
    short_pitch: string | null;
  }>(sql, [neighborhoodId, reviewFloor, locale, limit]);

  return rows.map((r) => ({
    id: r.id,
    bookingId: r.booking_id,
    name: r.name,
    type: r.type,
    starRating: r.star_rating ? Number(r.star_rating) : null,
    reviewScore: r.review_score ? Number(r.review_score) : null,
    reviewCount: r.review_count,
    priceBand: r.price_band,
    priceEstimateEur: r.price_estimate_eur,
    imagePrimaryUrl: r.image_primary_url,
    affiliateUrlTemplate: r.affiliate_url_template,
    shortPitch: r.short_pitch,
  }));
}

/** Price-band distribution over the SAME filtered set (not the whole neighborhood). */
export async function getTier3PriceDistribution({
  neighborhoodId,
  tripType,
}: {
  neighborhoodId: string;
  tripType: TripType;
}): Promise<Record<"$" | "$$" | "$$$" | "$$$$", number>> {
  const reviewFloor = tripType === "luxury" || tripType === "couples" ? 8.5 : 8.0;
  const predicate: Record<TripType, string> = {
    couples: "('spa' = ANY(p.amenities) OR 'rooftop' = ANY(p.amenities) OR p.review_score >= 9.0)",
    families: "('family_rooms' = ANY(p.amenities) OR 'kids_club' = ANY(p.amenities) OR 'cot' = ANY(p.amenities))",
    solo: "(p.price_band IN ('$','$$') AND p.review_score >= 8.5)",
    business: "('business_center' = ANY(p.amenities) OR 'wifi' = ANY(p.amenities) OR 'desk' = ANY(p.amenities))",
    luxury: "(p.star_rating >= 4.5 OR p.price_band = '$$$$')",
    budget: "(p.price_band IN ('$','$$'))",
    "digital-nomads": "('wifi' = ANY(p.amenities) OR 'desk' = ANY(p.amenities) OR 'kitchen' = ANY(p.amenities))",
    "first-timers": "(p.review_score >= 8.5 AND p.review_count >= 100)",
  };

  const rows = await query<{ price_band: "$" | "$$" | "$$$" | "$$$$" | null; count: string }>(
    `
    SELECT p.price_band, COUNT(*)::text AS count
    FROM properties p
    WHERE p.neighborhood_id = $1::uuid
      AND p.is_active = true
      AND p.review_score >= $2
      AND ${predicate[tripType]}
    GROUP BY p.price_band
    `,
    [neighborhoodId, reviewFloor]
  );

  const out: Record<"$" | "$$" | "$$$" | "$$$$", number> = { "$": 0, "$$": 0, "$$$": 0, "$$$$": 0 };
  for (const r of rows) if (r.price_band) out[r.price_band] = Number(r.count);
  return out;
}

/** Only ship pages that would have ≥12 results — thin pages are worse than no page. */
export async function hasEnoughPropertiesForTier3({
  neighborhoodId,
  tripType,
  minCount = 12,
}: {
  neighborhoodId: string;
  tripType: TripType;
  minCount?: number;
}): Promise<boolean> {
  const dist = await getTier3PriceDistribution({ neighborhoodId, tripType });
  const total = Object.values(dist).reduce((a, b) => a + b, 0);
  return total >= minCount;
}

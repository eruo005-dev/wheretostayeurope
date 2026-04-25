// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/queries.ts
//
// Data-fetching for the neighborhood page.
// Mixes Payload local API (editorial entities) with raw pg (properties table, aggregates).

import "server-only";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { query } from "@/lib/db";
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

/**
 * Load neighborhood + city + country via Payload local API.
 * Falls back to English if the requested locale has no content.
 */
export async function getNeighborhoodBySlug({
  citySlug,
  countrySlug,
  neighborhoodSlug,
  locale,
}: NeighborhoodLookup): Promise<NeighborhoodPageData | null> {
  const payload = await getPayload({ config: payloadConfig });

  // 1. Find country
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

  // 2. Find city under this country
  const cityRes = await payload.find({
    collection: "cities",
    where: {
      and: [
        { country: { equals: country.id } },
        { slug: { equals: citySlug } },
      ],
    },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });
  const city = cityRes.docs[0];
  if (!city) return null;

  // 3. Find neighborhood under this city
  const nRes = await payload.find({
    collection: "neighborhoods",
    where: {
      and: [
        { city: { equals: city.id } },
        { slug: { equals: neighborhoodSlug } },
      ],
    },
    limit: 1,
    depth: 1, // pull related media
    locale,
    fallbackLocale: "en",
  });
  const n = nRes.docs[0];
  if (!n) return null;

  // 4. Optional hero image via related media (first approved image for this neighborhood)
  const mediaRes = await payload.find({
    collection: "media",
    where: {
      and: [
        { entityType: { equals: "neighborhood" } },
        { entityId: { equals: String(n.id) } },
        { reviewStatus: { equals: "approved" } },
      ],
    },
    limit: 1,
    sort: "-createdAt",
    locale,
    fallbackLocale: "en",
  });
  const heroMedia = mediaRes.docs[0];

  return {
    id: String(n.id),
    cityId: String(city.id),
    slug: String(n.slug),
    name: String(n.name),
    lat: (n.lat as number | null) ?? null,
    lng: (n.lng as number | null) ?? null,
    polygonGeojson: (n.polygonGeojson as GeoJSON.Polygon) ?? null,
    vibeTags: (n.vibeTags as string[]) ?? [],
    tripTypeFit: (n.tripTypeFit as string[]) ?? [],
    priceTier: n.priceTier ? Number(n.priceTier) : null,
    safetyScore: (n.safetyScore as number | null) ?? null,
    walkabilityScore: (n.walkabilityScore as number | null) ?? null,
    nearestMetro: (n.nearestMetro as { station?: string }[] | undefined)?.map((m) => m.station ?? "").filter(Boolean) ?? [],
    summary: (n.summary as string | null) ?? null,
    whoItsFor: (n.whoItsFor as string | null) ?? null,
    whoShouldSkip: (n.whoShouldSkip as string | null) ?? null,
    diningNotes: (n.diningNotes as string | null) ?? null,
    nightlifeNotes: (n.nightlifeNotes as string | null) ?? null,
    stayTips: (n.stayTips as string | null) ?? null,
    metaTitle: (n.metaTitle as string | null) ?? null,
    metaDescription: (n.metaDescription as string | null) ?? null,
    cityName: String(city.name),
    heroImage: heroMedia
      ? {
          url: String(heroMedia.url ?? ""),
          alt: String(heroMedia.altText ?? heroMedia.altTextBase ?? n.name),
          credit: (heroMedia.credit as string | null) ?? null,
          creditUrl: (heroMedia.creditUrl as string | null) ?? null,
          source: (heroMedia.source as string | null) ?? null,
        }
      : null,
  };
}

/** City + country meta for breadcrumb / centroid / schema. */
export async function getCityWithCountry({
  citySlug,
  countrySlug,
  locale,
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
    where: {
      and: [{ country: { equals: country.id } }, { slug: { equals: citySlug } }],
    },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });
  const city = cityRes.docs[0];
  if (!city) return null;

  return {
    id: String(city.id),
    name: String(city.name),
    lat: Number(city.lat ?? 0),
    lng: Number(city.lng ?? 0),
    countryName: String(country.name),
    countrySlug: String(country.slug),
    bookingDestId: (city.bookingDestId as number | null) ?? null,
  };
}

/** Top-rated properties in the neighborhood — raw pg against the external `properties` table. */
export async function getPropertiesByNeighborhood({
  neighborhoodId,
  locale,
  limit = 12,
}: {
  neighborhoodId: string;
  locale: Locale;
  limit?: number;
}): Promise<PropertyCardData[]> {
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
  }>(
    `
    SELECT
      id, booking_id, name, type, star_rating, review_score, review_count,
      price_band, price_estimate_eur, image_primary_url, affiliate_url_template,
      translations->$2->>'short_pitch' AS short_pitch
    FROM properties
    WHERE neighborhood_id = $1::uuid
      AND is_active = true
      AND review_score >= 7.5
    ORDER BY review_score DESC NULLS LAST, review_count DESC NULLS LAST
    LIMIT $3
    `,
    [neighborhoodId, locale, limit]
  );

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

/** Price-band distribution for the PriceBandHistogram component. */
export async function getPriceBandDistribution({
  neighborhoodId,
}: {
  neighborhoodId: string;
}): Promise<Record<"$" | "$$" | "$$$" | "$$$$", number>> {
  const rows = await query<{ price_band: "$" | "$$" | "$$$" | "$$$$" | null; count: string }>(
    `
    SELECT price_band, COUNT(*)::text AS count
    FROM properties
    WHERE neighborhood_id = $1::uuid AND is_active = true
    GROUP BY price_band
    `,
    [neighborhoodId]
  );

  const out: Record<"$" | "$$" | "$$$" | "$$$$", number> = { "$": 0, "$$": 0, "$$$": 0, "$$$$": 0 };
  for (const r of rows) {
    if (r.price_band) out[r.price_band] = Number(r.count);
  }
  return out;
}

/** Related neighborhoods in the same city (for nav + map context). */
export async function getRelatedNeighborhoods({
  cityId,
  excludeId,
  locale,
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
  const payload = await getPayload({ config: payloadConfig });
  const res = await payload.find({
    collection: "neighborhoods",
    where: {
      and: [{ city: { equals: cityId } }, { id: { not_equals: excludeId } }],
    },
    limit,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });

  return res.docs.map((d) => ({
    id: String(d.id),
    slug: String(d.slug),
    name: String(d.name),
    summary: (d.summary as string | null) ?? null,
    polygonGeojson: (d.polygonGeojson as GeoJSON.Polygon) ?? null,
  }));
}

/** All published neighborhood paths for generateStaticParams. */
export async function getAllPublishedNeighborhoodPaths(): Promise<
  Array<{ locale: string; country: string; city: string; neighborhood: string }>
> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "neighborhoods",
    limit: 10_000,
    depth: 2,
    pagination: false,
  });

  const out: Array<{ locale: string; country: string; city: string; neighborhood: string }> = [];
  const locales: Locale[] = ["en", "de", "fr", "es"];

  for (const n of res.docs) {
    const city = typeof n.city === "object" ? n.city : null;
    if (!city || typeof city !== "object") continue;
    const country = typeof city.country === "object" ? city.country : null;
    if (!country || typeof country !== "object") continue;

    for (const locale of locales) {
      out.push({
        locale,
        country: String(country.slug),
        city: String(city.slug),
        neighborhood: String(n.slug),
      });
    }
  }
  return out;
}

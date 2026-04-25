// apps/web/src/app/(frontend)/[locale]/[country]/[city]/queries.ts

import "server-only";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { query } from "@/lib/db";
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
  locale,
}: {
  countrySlug: string;
  citySlug: string;
  locale: Locale;
}): Promise<CityPageData | null> {
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

  const mediaRes = await payload.find({
    collection: "media",
    where: {
      and: [
        { entityType: { equals: "city" } },
        { entityId: { equals: String(city.id) } },
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
    id: String(city.id),
    slug: String(city.slug),
    name: String(city.name),
    countryId: String(country.id),
    countrySlug: String(country.slug),
    countryName: String(country.name),
    lat: (city.lat as number | null) ?? null,
    lng: (city.lng as number | null) ?? null,
    tier: (city.tier as "1" | "2" | "3" | null) ?? null,
    bookingDestId: (city.bookingDestId as number | null) ?? null,
    gygLocationId: (city.gygLocationId as number | null) ?? null,
    introHtml: (city.introHtml as LexicalRoot | null) ?? null,
    whenToVisit: (city.whenToVisit as string | null) ?? null,
    gettingAround: (city.gettingAround as string | null) ?? null,
    safetyNotes: (city.safetyNotes as string | null) ?? null,
    metaTitle: (city.metaTitle as string | null) ?? null,
    metaDescription: (city.metaDescription as string | null) ?? null,
    seasonality: (city.seasonality as Record<string, { crowd?: number; price?: number }>) ?? null,
    heroImage: heroMedia
      ? {
          url: String(heroMedia.url ?? ""),
          alt: String(heroMedia.altText ?? heroMedia.altTextBase ?? city.name),
          credit: (heroMedia.credit as string | null) ?? null,
          creditUrl: (heroMedia.creditUrl as string | null) ?? null,
          source: (heroMedia.source as string | null) ?? null,
        }
      : null,
  };
}

/** All neighborhoods in the city, ordered by tier/name, with enough metadata to drive the main list. */
export async function getCityNeighborhoods({
  cityId,
  locale,
}: {
  cityId: string;
  locale: Locale;
}): Promise<NeighborhoodSummary[]> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "neighborhoods",
    where: { city: { equals: cityId } },
    limit: 30, // cities rarely have more than 10–15 mapped at launch
    depth: 0,
    sort: "name",
    locale,
    fallbackLocale: "en",
  });

  return res.docs.map((n) => ({
    id: String(n.id),
    slug: String(n.slug),
    name: String(n.name),
    summary: (n.summary as string | null) ?? null,
    priceTier: n.priceTier ? Number(n.priceTier) : null,
    vibeTags: (n.vibeTags as string[]) ?? [],
    tripTypeFit: (n.tripTypeFit as string[]) ?? [],
    polygonGeojson: (n.polygonGeojson as GeoJSON.Polygon) ?? null,
  }));
}

/** City-wide top properties for the bottom-of-page shortlist (5–10). */
export async function getCityTopProperties({
  cityId,
  locale,
  limit = 8,
}: {
  cityId: string;
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
    WHERE city_id = $1::uuid
      AND is_active = true
      AND review_score >= 8.5
      AND review_count >= 50
    ORDER BY review_score DESC NULLS LAST, review_count DESC NULLS LAST
    LIMIT $3
    `,
    [cityId, locale, limit]
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

/** City-wide price-band distribution across ALL active properties. */
export async function getCityPriceDistribution({
  cityId,
}: {
  cityId: string;
}): Promise<Record<"$" | "$$" | "$$$" | "$$$$", number>> {
  const rows = await query<{ price_band: "$" | "$$" | "$$$" | "$$$$" | null; count: string }>(
    `
    SELECT price_band, COUNT(*)::text AS count
    FROM properties
    WHERE city_id = $1::uuid AND is_active = true
    GROUP BY price_band
    `,
    [cityId]
  );

  const out: Record<"$" | "$$" | "$$$" | "$$$$", number> = { "$": 0, "$$": 0, "$$$": 0, "$$$$": 0 };
  for (const r of rows) {
    if (r.price_band) out[r.price_band] = Number(r.count);
  }
  return out;
}

export async function getAllPublishedCityPaths(): Promise<
  Array<{ locale: string; country: string; city: string }>
> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "cities",
    limit: 1000,
    depth: 1,
    pagination: false,
  });

  const out: Array<{ locale: string; country: string; city: string }> = [];
  const locales: Locale[] = ["en", "de", "fr", "es"];

  for (const c of res.docs) {
    const country = typeof c.country === "object" ? c.country : null;
    if (!country || typeof country !== "object") continue;
    for (const locale of locales) {
      out.push({
        locale,
        country: String(country.slug),
        city: String(c.slug),
      });
    }
  }
  return out;
}

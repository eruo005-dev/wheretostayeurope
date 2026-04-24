// apps/web/src/app/(frontend)/[locale]/queries.ts

import "server-only";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

type Locale = "en" | "de" | "fr" | "es";

export type HomeFeaturedCountry = {
  id: string;
  slug: string;
  name: string;
  isoCode: string;
  cityCount: number;
};

export type HomeFeaturedCity = {
  id: string;
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  heroUrl: string | null;
};

export type HomeRecentGuide = {
  id: string;
  slug: string;
  name: string;
  citySlug: string;
  citySlugName: string;
  countrySlug: string;
  summary: string | null;
  updatedAt: string;
};

export async function getHomeFeaturedCountries(locale: Locale): Promise<HomeFeaturedCountry[]> {
  const payload = await getPayload({ config: payloadConfig });

  // Phase 1 countries only
  const phase1 = ["france", "spain", "italy", "germany", "united-kingdom", "netherlands", "turkey"];

  const res = await payload.find({
    collection: "countries",
    where: { slug: { in: phase1 } },
    limit: 20,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });

  // Count cities per country (bulk-count in a single pass — avoids N+1)
  const countryIds = res.docs.map((c) => c.id);
  const cityCountsRes =
    countryIds.length > 0
      ? await payload.find({
          collection: "cities",
          where: { country: { in: countryIds as string[] } },
          limit: 1000,
          depth: 0,
          pagination: false,
        })
      : { docs: [] };

  const counts = new Map<string, number>();
  for (const c of cityCountsRes.docs) {
    const cid = typeof c.country === "object" ? String((c.country as { id: string }).id) : String(c.country);
    counts.set(cid, (counts.get(cid) ?? 0) + 1);
  }

  return res.docs.map((c) => ({
    id: String(c.id),
    slug: String(c.slug),
    name: String(c.name),
    isoCode: String(c.isoCode ?? ""),
    cityCount: counts.get(String(c.id)) ?? 0,
  }));
}

export async function getHomeFeaturedCities(locale: Locale, limit = 8): Promise<HomeFeaturedCity[]> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "cities",
    where: { tier: { equals: "1" } },
    limit,
    depth: 1,
    sort: "name",
    locale,
    fallbackLocale: "en",
  });

  // Pull a hero image per city in parallel (approved media matching entity)
  const results = await Promise.all(
    res.docs.map(async (c) => {
      const countryObj = typeof c.country === "object" ? (c.country as { slug?: string; name?: string }) : null;
      const media = await payload.find({
        collection: "media",
        where: {
          and: [
            { entityType: { equals: "city" } },
            { entityId: { equals: String(c.id) } },
            { reviewStatus: { equals: "approved" } },
          ],
        },
        limit: 1,
        sort: "-createdAt",
      });
      return {
        id: String(c.id),
        slug: String(c.slug),
        name: String(c.name),
        countrySlug: countryObj?.slug ? String(countryObj.slug) : "",
        countryName: countryObj?.name ? String(countryObj.name) : "",
        heroUrl: media.docs[0]?.url ? String(media.docs[0].url) : null,
      };
    })
  );

  return results.filter((r) => r.countrySlug);
}

export async function getHomeRecentGuides(locale: Locale, limit = 6): Promise<HomeRecentGuide[]> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "neighborhoods",
    limit,
    depth: 2,
    sort: "-updatedAt",
    locale,
    fallbackLocale: "en",
  });

  return res.docs
    .map((n) => {
      const city = typeof n.city === "object" ? (n.city as { slug?: string; name?: string; country?: unknown }) : null;
      const country =
        city && typeof city.country === "object"
          ? (city.country as { slug?: string })
          : null;
      if (!city?.slug || !country?.slug) return null;
      return {
        id: String(n.id),
        slug: String(n.slug),
        name: String(n.name),
        citySlug: String(city.slug),
        citySlugName: String(city.name ?? ""),
        countrySlug: String(country.slug),
        summary: (n.summary as string | null) ?? null,
        updatedAt: String(n.updatedAt ?? ""),
      };
    })
    .filter((x): x is HomeRecentGuide => x !== null);
}

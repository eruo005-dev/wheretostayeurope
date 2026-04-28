// apps/web/src/app/(frontend)/[locale]/queries.ts
//
// STATIC version — no Payload, no DB. Reads from the canonical static-data module
// so newly added countries/cities show up on the homepage automatically.

import "server-only";
import { COUNTRIES, CITIES, citiesInCountry } from "@/lib/data/static-data";
import { ARTICLES, type Article } from "@/lib/data/articles";

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

export type HomeFeaturedArticle = Pick<
  Article,
  "slug" | "title" | "excerpt" | "publishedAt" | "reviewedAt" | "readingTimeMin"
>;

const FEATURED_CITY_SLUGS = [
  "paris",
  "rome",
  "barcelona",
  "amsterdam",
  "istanbul",
  "lisbon",
  "porto",
  "berlin",
];

export async function getHomeFeaturedCountries(_locale: Locale): Promise<HomeFeaturedCountry[]> {
  return COUNTRIES.map((c, i) => ({
    id: String(i + 1),
    slug: c.slug,
    name: c.name,
    isoCode: c.isoCode,
    cityCount: citiesInCountry(c.slug).length,
  }));
}

export async function getHomeFeaturedCities(_locale: Locale, limit = 8): Promise<HomeFeaturedCity[]> {
  return FEATURED_CITY_SLUGS.slice(0, limit)
    .map((slug, i) => {
      const city = CITIES.find((c) => c.slug === slug);
      const country = city ? COUNTRIES.find((co) => co.slug === city.countrySlug) : undefined;
      if (!city || !country) return null;
      return {
        id: String(i + 1),
        slug: city.slug,
        name: city.name,
        countrySlug: country.slug,
        countryName: country.name,
        heroUrl: null,
      };
    })
    .filter((x): x is HomeFeaturedCity => x !== null);
}

export async function getHomeRecentGuides(_locale: Locale, _limit = 6): Promise<HomeRecentGuide[]> {
  return [];
}

export async function getHomeFeaturedArticles(_locale: Locale, limit = 3): Promise<HomeFeaturedArticle[]> {
  return [...ARTICLES]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit)
    .map(({ slug, title, excerpt, publishedAt, reviewedAt, readingTimeMin }) => ({
      slug,
      title,
      excerpt,
      publishedAt,
      reviewedAt,
      readingTimeMin,
    }));
}

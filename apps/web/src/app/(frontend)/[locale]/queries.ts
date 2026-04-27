// apps/web/src/app/(frontend)/[locale]/queries.ts
//
// STATIC version — no Payload, no DB. All data lives in this file.
// To add countries/cities, edit the arrays below or migrate to MDX content files.

import "server-only";

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

const COUNTRIES = [
  { slug: "france",                  name: "France",                 iso: "FR", cities: 5 },
  { slug: "spain",                   name: "Spain",                  iso: "ES", cities: 5 },
  { slug: "italy",                   name: "Italy",                  iso: "IT", cities: 5 },
  { slug: "germany",                 name: "Germany",                iso: "DE", cities: 4 },
  { slug: "united-kingdom",          name: "United Kingdom",         iso: "GB", cities: 3 },
  { slug: "netherlands",             name: "Netherlands",            iso: "NL", cities: 3 },
  { slug: "turkey",                  name: "Turkey",                 iso: "TR", cities: 4 },
  { slug: "portugal",                name: "Portugal",               iso: "PT", cities: 2 },
  { slug: "greece",                  name: "Greece",                 iso: "GR", cities: 3 },
  { slug: "croatia",                 name: "Croatia",                iso: "HR", cities: 3 },
  { slug: "bosnia-and-herzegovina",  name: "Bosnia and Herzegovina", iso: "BA", cities: 2 },
  { slug: "czech-republic",          name: "Czech Republic",         iso: "CZ", cities: 2 },
  { slug: "hungary",                 name: "Hungary",                iso: "HU", cities: 1 },
  { slug: "poland",                  name: "Poland",                 iso: "PL", cities: 4 },
  { slug: "austria",                 name: "Austria",                iso: "AT", cities: 3 },
  { slug: "switzerland",             name: "Switzerland",            iso: "CH", cities: 3 },
  { slug: "belgium",                 name: "Belgium",                iso: "BE", cities: 4 },
  { slug: "denmark",                 name: "Denmark",                iso: "DK", cities: 2 },
  { slug: "sweden",                  name: "Sweden",                 iso: "SE", cities: 3 },
  { slug: "norway",                  name: "Norway",                 iso: "NO", cities: 2 },
];

const FEATURED_CITIES = [
  { slug: "paris",     name: "Paris",     countrySlug: "france",  countryName: "France"  },
  { slug: "rome",      name: "Rome",      countrySlug: "italy",   countryName: "Italy"   },
  { slug: "barcelona", name: "Barcelona", countrySlug: "spain",   countryName: "Spain"   },
  { slug: "amsterdam", name: "Amsterdam", countrySlug: "netherlands", countryName: "Netherlands" },
  { slug: "istanbul",  name: "Istanbul",  countrySlug: "turkey",  countryName: "Turkey"  },
  { slug: "lisbon",    name: "Lisbon",    countrySlug: "portugal", countryName: "Portugal" },
  { slug: "porto",     name: "Porto",     countrySlug: "portugal", countryName: "Portugal" },
  { slug: "berlin",    name: "Berlin",    countrySlug: "germany", countryName: "Germany" },
];

export async function getHomeFeaturedCountries(_locale: Locale): Promise<HomeFeaturedCountry[]> {
  return COUNTRIES.map((c, i) => ({
    id: String(i + 1),
    slug: c.slug,
    name: c.name,
    isoCode: c.iso,
    cityCount: c.cities,
  }));
}

export async function getHomeFeaturedCities(_locale: Locale, limit = 8): Promise<HomeFeaturedCity[]> {
  return FEATURED_CITIES.slice(0, limit).map((c, i) => ({
    id: String(i + 1),
    slug: c.slug,
    name: c.name,
    countrySlug: c.countrySlug,
    countryName: c.countryName,
    heroUrl: null,
  }));
}

export async function getHomeRecentGuides(_locale: Locale, _limit = 6): Promise<HomeRecentGuide[]> {
  // Empty until first MDX article is published. Section auto-hides when empty.
  return [];
}

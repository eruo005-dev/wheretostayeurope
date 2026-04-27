// apps/web/src/app/(frontend)/[locale]/[country]/queries.ts

import "server-only";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
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
  locale,
}: {
  countrySlug: string;
  locale: Locale;
}): Promise<CountryPageData | null> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "countries",
    where: { slug: { equals: countrySlug } },
    limit: 1,
    depth: 0,
    locale,
    fallbackLocale: "en",
  });
  const c = res.docs[0];
  if (!c) return null;

  const mediaRes = await payload.find({
    collection: "media",
    where: {
      and: [
        { entityType: { equals: "country" } },
        { entityId: { equals: String(c.id) } },
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
    id: String(c.id),
    slug: String(c.slug),
    name: String(c.name),
    isoCode: String(c.isoCode ?? ""),
    currencyCode: (c.currencyCode as string | null) ?? null,
    timezone: (c.timezone as string | null) ?? null,
    euMember: Boolean(c.euMember),
    schengen: Boolean(c.schengen),
    introHtml: (c.introHtml as LexicalRoot | null) ?? null,
    bestTimeToVisit: (c.bestTimeToVisit as string | null) ?? null,
    travelTips: (c.travelTips as Record<string, unknown> | null) ?? null,
    metaTitle: (c.metaTitle as string | null) ?? null,
    metaDescription: (c.metaDescription as string | null) ?? null,
    heroImage: heroMedia
      ? {
          url: String(heroMedia.url ?? ""),
          alt: String(heroMedia.altText ?? heroMedia.altTextBase ?? c.name),
          credit: (heroMedia.credit as string | null) ?? null,
          creditUrl: (heroMedia.creditUrl as string | null) ?? null,
          source: (heroMedia.source as string | null) ?? null,
        }
      : null,
  };
}

/** Cities in a country, sorted by tier then name. */
export async function getCitiesInCountry({
  countryId,
  locale,
}: {
  countryId: string;
  locale: Locale;
}): Promise<CityInCountry[]> {
  const payload = await getPayload({ config: payloadConfig });

  const res = await payload.find({
    collection: "cities",
    where: { country: { equals: countryId } },
    limit: 200,
    depth: 0,
    sort: ["tier", "name"],
    locale,
    fallbackLocale: "en",
  });

  return res.docs.map((c) => ({
    id: String(c.id),
    slug: String(c.slug),
    name: String(c.name),
    tier: (c.tier as "1" | "2" | "3" | null) ?? null,
    lat: (c.lat as number | null) ?? null,
    lng: (c.lng as number | null) ?? null,
    population: (c.population as number | null) ?? null,
    introSnippet: c.introHtml
      ? extractFirstParagraph(c.introHtml as LexicalRoot)
      : null,
  }));
}

export async function getAllPublishedCountryPaths(): Promise<
  Array<{ locale: string; country: string }>
> {
  // Build-time fallback: if no DB connection, skip pre-generation.
  // Pages render on-demand at runtime (dynamicParams = true).
  if (!process.env.DATABASE_URL) return [];

  try {
    const payload = await getPayload({ config: payloadConfig });
    const res = await payload.find({
      collection: "countries",
      limit: 100,
      depth: 0,
      pagination: false,
    });
    const out: Array<{ locale: string; country: string }> = [];
    const locales: Locale[] = ["en", "de", "fr", "es"];
    for (const c of res.docs) {
      for (const locale of locales) {
        out.push({ locale, country: String(c.slug) });
      }
    }
    return out;
  } catch {
    return [];
  }
}

/** Extract the first paragraph of a Lexical rich-text blob as plain text (for snippets). */
function extractFirstParagraph(root: LexicalRoot | null | undefined): string | null {
  if (!root?.root?.children) return null;
  for (const node of root.root.children) {
    if (node.type === "paragraph" && Array.isArray(node.children)) {
      const text = node.children
        .filter((c): c is { type: "text"; text: string } => c.type === "text" && "text" in c)
        .map((c) => c.text)
        .join("");
      if (text.trim().length > 0) {
        return text.length > 200 ? `${text.slice(0, 200)}…` : text;
      }
    }
  }
  return null;
}

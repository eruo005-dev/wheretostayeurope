// apps/web/src/lib/author.ts
//
// Single source of truth for "the author" — the AuthorProfile Global.
// Every page that renders a byline or Person schema reads through here.

import "server-only";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { SITE_URL } from "@/lib/seo/config";

type Locale = "en" | "de" | "fr" | "es";

export type AuthorData = {
  fullName: string;
  displayName: string;
  tagline: string | null;
  photoUrl: string | null;
  photoAlt: string | null;
  website: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  email: string;
  citiesVisitedCount: number;
  sameAs: string[];
};

let cached: { data: AuthorData; at: number; locale: Locale } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function getAuthor(locale: Locale): Promise<AuthorData> {
  if (cached && cached.locale === locale && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.data;
  }

  const payload = await getPayload({ config: payloadConfig });
  const profile = await payload.findGlobal({
    slug: "author-profile",
    locale,
    fallbackLocale: "en",
    depth: 1,
  });

  const photo = typeof profile.photo === "object" && profile.photo ? profile.photo : null;
  const photoUrl = photo && typeof photo === "object" && "url" in photo ? String(photo.url ?? "") : null;
  const photoAlt = photo && typeof photo === "object" && "altTextBase" in photo
    ? String(photo.altTextBase ?? profile.fullName ?? "")
    : null;

  const sameAs: string[] = [];
  if (profile.linkedin) sameAs.push(String(profile.linkedin));
  if (profile.twitter) sameAs.push(`https://twitter.com/${String(profile.twitter).replace(/^@/, "")}`);
  if (profile.instagram) sameAs.push(`https://instagram.com/${String(profile.instagram).replace(/^@/, "")}`);
  if (profile.website) sameAs.push(String(profile.website));

  const citiesVisited = Array.isArray(profile.citiesVisited) ? profile.citiesVisited : [];

  const data: AuthorData = {
    fullName: String(profile.fullName ?? "Site operator"),
    displayName: String(profile.displayName ?? profile.fullName ?? "Site operator"),
    tagline: (profile.tagline as string | null) ?? null,
    photoUrl,
    photoAlt,
    website: (profile.website as string | null) ?? null,
    twitter: (profile.twitter as string | null) ?? null,
    linkedin: (profile.linkedin as string | null) ?? null,
    instagram: (profile.instagram as string | null) ?? null,
    email: String(profile.email ?? "contact@wheretostayeurope.com"),
    citiesVisitedCount: citiesVisited.length,
    sameAs,
  };

  cached = { data, at: Date.now(), locale };
  return data;
}

export async function getAuthorProfileFull(locale: Locale) {
  const payload = await getPayload({ config: payloadConfig });
  return payload.findGlobal({
    slug: "author-profile",
    locale,
    fallbackLocale: "en",
    depth: 1,
  });
}

/** schema.org Person object — for injection into article JSON-LD + About page. */
export function buildPersonSchema(author: AuthorData, locale: Locale) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/${locale}/about#person`,
    name: author.fullName,
    alternateName: author.displayName !== author.fullName ? author.displayName : undefined,
    description: author.tagline ?? undefined,
    url: `${SITE_URL}/${locale}/about`,
    image: author.photoUrl ?? undefined,
    sameAs: author.sameAs.length > 0 ? author.sameAs : undefined,
    email: author.email,
    knowsAbout: [
      "European travel",
      "accommodation",
      "neighborhoods",
      "travel planning",
    ],
  };
}

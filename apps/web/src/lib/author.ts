// apps/web/src/lib/author.ts
//
// STATIC author profile — no Payload, no DB. Edit the constants below to
// customize. To switch to DB-backed Payload Globals later, restore the
// previous version of this file.

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

// EDIT THESE to your real values:
const AUTHOR: AuthorData = {
  fullName: process.env.AUTHOR_FULL_NAME ?? "Jay",
  displayName: process.env.AUTHOR_DISPLAY_NAME ?? "Jay",
  tagline: "Solo operator. I write about where to stay across Europe — by neighborhood, by trip type.",
  photoUrl: null, // set to a Cloudflare R2 / Unsplash URL when you have a headshot
  photoAlt: "Jay - WhereToStayEurope",
  website: null,
  twitter: null,
  linkedin: null,
  instagram: null,
  email: process.env.CONTACT_EMAIL ?? "contact@wheretostayeurope.com",
  citiesVisitedCount: 0, // bump as you visit + write about cities
  sameAs: [],
};

export async function getAuthor(_locale: Locale): Promise<AuthorData> {
  return AUTHOR;
}

export async function getAuthorProfileFull(_locale: Locale) {
  return {
    ...AUTHOR,
    bio: null,
    citiesVisited: [],
    credentials: [],
  } as Record<string, unknown>;
}

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

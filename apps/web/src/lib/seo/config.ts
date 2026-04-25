// apps/web/src/lib/seo/config.ts
//
// Central SEO + site-identity constants. Single source of truth for canonical
// URL base and site name across all schema, meta tags, and helpers.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://wheretostayeurope.com";

export const SITE_NAME = "WhereToStayEurope";

export const SITE_TAGLINE = "The decision layer for European accommodation.";

/** Default OpenGraph image (1200×630 recommended). Replace with your own. */
export const OG_IMAGE_DEFAULT = `${SITE_URL}/og/default.png`;

/** Legal entity string for Organization schema + Impressum. Fill from env. */
export const LEGAL_ENTITY_NAME =
  process.env.LEGAL_ENTITY_NAME ?? "[LEGAL ENTITY NAME]";

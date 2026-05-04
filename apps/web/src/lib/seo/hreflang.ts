// apps/web/src/lib/seo/hreflang.ts
//
// Builds the `alternates.languages` map for Next.js `generateMetadata`.
// Renders as <link rel="alternate" hreflang="..." /> tags in <head>.
//
// Policy:
//   - x-default points at English canonical
//   - self-reference included (Google requires it)
//   - Path part is locale-agnostic; locale is prefixed per-language
//
// IMPORTANT: hreflang is only emitted for locales whose CONTENT is actually
// delivered. Today the entity body text (intros, summaries, who-its-for,
// comparisons, articles) is English-only — the de/fr/es routes render English
// even though the URL prefix says otherwise. Claiming hreflang for those
// locales is a spec violation that causes Search Console to flag duplicate
// content. So `LIVE_LOCALES` below is the gate. When you ship real
// translations for a locale, add it to `LIVE_LOCALES` (one place, applies
// site-wide).

import { SITE_URL } from "./config";

export type SupportedLocale = "en" | "de" | "fr" | "es";

const LANG_REGION_MAP: Record<SupportedLocale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
};

/**
 * Locales whose CONTENT is actually translated. Add to this list when the
 * entity body fields (intro / summary / who-its-for / etc.) ship in that
 * locale. Until then, the locale gets a working URL but no hreflang claim.
 */
export const LIVE_LOCALES: readonly SupportedLocale[] = ["en"];

type Args = {
  /** Locale-agnostic path, e.g. "/france/paris/le-marais" (no leading locale segment, no trailing slash). */
  path: string;
  /** Locales where the *route* exists. Filtered against LIVE_LOCALES before emit. */
  locales: SupportedLocale[];
  /** If provided, overrides the slug per locale (when slugs differ by locale). */
  localizedPaths?: Partial<Record<SupportedLocale, string>>;
};

export function buildHreflangTags({ path, locales, localizedPaths }: Args): Record<string, string> {
  const cleanedBase = path.replace(/^\/+|\/+$/g, "");
  const out: Record<string, string> = {};

  // Only emit hreflang for locales whose content is actually delivered.
  const emittable = locales.filter((l) => LIVE_LOCALES.includes(l));

  for (const locale of emittable) {
    const localePath = localizedPaths?.[locale] ?? cleanedBase;
    const cleanedLocalePath = localePath.replace(/^\/+|\/+$/g, "");
    const full = `${SITE_URL}/${locale}/${cleanedLocalePath}`;
    out[LANG_REGION_MAP[locale]] = full;
  }

  // x-default: point to English canonical (en is always live)
  if (emittable.includes("en")) {
    const enPath = localizedPaths?.en ?? cleanedBase;
    out["x-default"] = `${SITE_URL}/en/${enPath.replace(/^\/+|\/+$/g, "")}`;
  }

  return out;
}

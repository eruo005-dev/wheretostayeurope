// apps/web/src/lib/seo/hreflang.ts
//
// Builds the `alternates.languages` map for Next.js `generateMetadata`.
// Renders as <link rel="alternate" hreflang="..." /> tags in <head>.
//
// Policy:
//   - x-default points at English canonical
//   - self-reference included (Google requires it)
//   - Path part is locale-agnostic; locale is prefixed per-language

import { SITE_URL } from "./config";

export type SupportedLocale = "en" | "de" | "fr" | "es";

const LANG_REGION_MAP: Record<SupportedLocale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
};

type Args = {
  /** Locale-agnostic path, e.g. "/france/paris/le-marais" (no leading locale segment, no trailing slash). */
  path: string;
  /** Locales where this page actually exists. Only these will be emitted. */
  locales: SupportedLocale[];
  /** If provided, overrides the slug per locale (when slugs differ by locale). */
  localizedPaths?: Partial<Record<SupportedLocale, string>>;
};

export function buildHreflangTags({ path, locales, localizedPaths }: Args): Record<string, string> {
  const cleanedBase = path.replace(/^\/+|\/+$/g, "");
  const out: Record<string, string> = {};

  for (const locale of locales) {
    const localePath = localizedPaths?.[locale] ?? cleanedBase;
    const cleanedLocalePath = localePath.replace(/^\/+|\/+$/g, "");
    const full = `${SITE_URL}/${locale}/${cleanedLocalePath}`;
    out[LANG_REGION_MAP[locale]] = full;
  }

  // x-default: point to English canonical
  if (locales.includes("en")) {
    const enPath = localizedPaths?.en ?? cleanedBase;
    out["x-default"] = `${SITE_URL}/en/${enPath.replace(/^\/+|\/+$/g, "")}`;
  }

  return out;
}

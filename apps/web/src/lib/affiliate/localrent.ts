// apps/web/src/lib/affiliate/localrent.ts
//
// Localrent.com car rental affiliate deep links. Reward 7.5-12% via TP, 30-day
// cookie. Used as a CTA on country pages where Localrent has coverage.
//
// Localrent specializes in local rental agencies (no Hertz/Avis-style chains)
// — strong in Eastern/Southern Europe, the Balkans, and the Caucasus.

import "server-only";
import { withTPMarker, type TPTrackingLabel } from "./travelpayouts";

type SearchParams = {
  /** Country slug as used on Localrent (e.g. "spain", "greece", "bosnia-and-herzegovina"). */
  countrySlug: string;
  locale: "en" | "de" | "fr" | "es";
};

/**
 * Map our internal country slugs to the slug Localrent uses on its URLs.
 * Most match, but we capture the differences here.
 */
const LOCALRENT_COUNTRY_SLUG_OVERRIDES: Record<string, string> = {
  "bosnia-and-herzegovina": "bosnia-and-herzegovina",
  "north-macedonia": "north-macedonia",
};

function localrentCountrySlug(ourSlug: string): string {
  return LOCALRENT_COUNTRY_SLUG_OVERRIDES[ourSlug] ?? ourSlug;
}

/**
 * Build a Localrent country page URL with the affiliate marker. Pattern:
 *   https://www.localrent.com/{locale}/{country-slug}/
 */
export function buildLocalrentCountryUrl(params: SearchParams, label: TPTrackingLabel): string {
  const slug = localrentCountrySlug(params.countrySlug);
  const base = `https://www.localrent.com/${params.locale}/${slug}/`;
  return withTPMarker(base, label);
}

/**
 * Countries where Localrent has meaningful coverage — gated set used to
 * decide whether the car-rental CTA renders at all on a country page.
 *
 * Source: Localrent.com footer country list, intersected with our COUNTRIES
 * inventory. UK / Scandinavia / Netherlands / Switzerland / Czech Republic
 * / Hungary / Poland are NOT covered → CTA hides on those country pages.
 */
export const LOCALRENT_COVERED_COUNTRIES: ReadonlySet<string> = new Set([
  "albania",
  "austria",
  "bosnia-and-herzegovina",
  "finland",
  "france",
  "germany",
  "greece",
  "italy",
  "malta",
  "montenegro",
  "north-macedonia",
  "portugal",
  "slovenia",
  "spain",
  "turkey",
]);

export function localrentCoversCountry(countrySlug: string): boolean {
  return LOCALRENT_COVERED_COUNTRIES.has(countrySlug);
}

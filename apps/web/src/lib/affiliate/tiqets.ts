// apps/web/src/lib/affiliate/tiqets.ts
//
// Tiqets attractions/tickets affiliate deep links. Reward 3.5-8%, 30-day cookie.
// Used as a CTA on every neighborhood page ("Things to do nearby").

import "server-only";
import { withTPMarker, type TPTrackingLabel } from "./travelpayouts";

type CitySearchParams = {
  /** Tiqets-friendly city name (their URL slug; e.g. "paris", "rome", "amsterdam"). */
  citySlug: string;
  locale: "en" | "de" | "fr" | "es";
};

/** Map our internal city slugs to Tiqets's URL slugs (most identical, a few differ). */
const TIQETS_CITY_SLUG_OVERRIDES: Record<string, string> = {
  // Identical slugs that Tiqets uses too (paris, rome, amsterdam, etc.) need no entry.
  // Add overrides only when our slug differs from Tiqets's:
  "the-hague": "the-hague",
  "luxembourg-city": "luxembourg",
  "cluj-napoca": "cluj-napoca",
};

function tiqetsCitySlug(ourSlug: string): string {
  return TIQETS_CITY_SLUG_OVERRIDES[ourSlug] ?? ourSlug;
}

/**
 * Build a Tiqets city page URL with the affiliate marker. Pattern:
 *   https://www.tiqets.com/{locale}/{city-slug}-c<id>/
 *
 * Tiqets routes also accept `https://www.tiqets.com/{locale}/{city-slug}/` (no
 * numeric ID) and 301-redirect to the canonical URL — using that form lets us
 * deep-link by name without maintaining a slug→id map.
 */
export function buildTiqetsCityUrl(params: CitySearchParams, label: TPTrackingLabel): string {
  const slug = tiqetsCitySlug(params.citySlug);
  const base = `https://www.tiqets.com/${params.locale}/${slug}/`;
  return withTPMarker(base, label);
}

/** Generic Tiqets homepage link for cities Tiqets doesn't cover. */
export function buildTiqetsHomeUrl(label: TPTrackingLabel, locale: "en" | "de" | "fr" | "es"): string {
  return withTPMarker(`https://www.tiqets.com/${locale}/`, label);
}

/**
 * Cities Tiqets covers well in Europe. Used to gate the CTA — we don't want to
 * promote a search that returns "no results" for villages or tier-3 cities.
 * Source: Tiqets's "popular cities" + spot-checked coverage. Update as needed.
 */
export const TIQETS_COVERED_CITIES: ReadonlySet<string> = new Set([
  // Tier-1 + popular tier-2
  "paris", "nice", "lyon", "marseille",
  "madrid", "barcelona", "valencia", "seville", "malaga",
  "rome", "florence", "venice", "milan", "naples",
  "berlin", "munich", "hamburg", "cologne",
  "london", "edinburgh",
  "amsterdam", "rotterdam",
  "istanbul",
  "lisbon", "porto",
  "athens", "thessaloniki", "santorini",
  "dubrovnik", "split",
  "prague",
  "budapest",
  "krakow", "warsaw", "gdansk",
  // wroclaw removed — Tiqets has no Wrocław inventory as of 2026-05-04
  "vienna", "salzburg",
  "zurich", "geneva",
  "brussels", "bruges", "ghent",
  "copenhagen",
  "stockholm",
  "dublin",
  "reykjavik",
  "tallinn",
  "valletta",
]);

export function tiqetsCoversCity(citySlug: string): boolean {
  return TIQETS_COVERED_CITIES.has(citySlug);
}

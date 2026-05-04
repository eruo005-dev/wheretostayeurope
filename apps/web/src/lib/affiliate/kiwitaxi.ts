// apps/web/src/lib/affiliate/kiwitaxi.ts
//
// Kiwitaxi airport-transfer affiliate deep links. Reward 9-11%, 30-day cookie.
// Used as a CTA on every city page ("Getting from the airport").

import "server-only";
import { withTPMarker, type TPTrackingLabel } from "./travelpayouts";

type SearchParams = {
  /** Free-text origin (city or airport name). Kiwitaxi autocompletes from this. */
  from?: string;
  /** Free-text destination. */
  to?: string;
  locale: "en" | "de" | "fr" | "es";
};

/**
 * Build a Kiwitaxi homepage URL with the affiliate marker. Their homepage has
 * a search form that pre-fills from `?from=...&to=...` query params.
 */
export function buildKiwitaxiSearchUrl(params: SearchParams, label: TPTrackingLabel): string {
  const base = `https://kiwitaxi.com/${params.locale}/`;
  const u = new URL(base);
  if (params.from) u.searchParams.set("from", params.from);
  if (params.to) u.searchParams.set("to", params.to);
  return withTPMarker(u.toString(), label);
}

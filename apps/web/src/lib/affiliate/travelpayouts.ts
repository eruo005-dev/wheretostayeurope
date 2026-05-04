// apps/web/src/lib/affiliate/travelpayouts.ts
//
// Shared Travelpayouts integration plumbing. The "marker" is the project ID
// from the TP dashboard (visible in dashboard URLs as `?source=NNNNNN`).
// Every brand-specific URL builder appends this marker so clicks attribute
// to the correct project.
//
// SETUP: set TRAVELPAYOUTS_MARKER in .env. The value is the numeric project ID.
// Default 525153 is the "Wheretostayeurope.com" project. Register additional
// projects for other domains at https://app.travelpayouts.com/.

import "server-only";

const RAW_MARKER = process.env.TRAVELPAYOUTS_MARKER ?? "525153";

if (process.env.NODE_ENV === "production" && !process.env.TRAVELPAYOUTS_MARKER) {
  // eslint-disable-next-line no-console
  console.warn(
    "[travelpayouts] TRAVELPAYOUTS_MARKER not set — falling back to default 525153 (Wheretostayeurope project)."
  );
}

/** Numeric project marker. Used as the `marker` query param for every TP brand URL. */
export const TP_MARKER = RAW_MARKER;

/** Short tracking label per page+component, similar to booking.ts TrackingLabel. */
export type TPTrackingLabel = {
  /** Where the link appears: city, country, neighborhood, article, comparison, home. */
  pageType: "city" | "country" | "neighborhood" | "article" | "comparison" | "home";
  /** Stable slug of the page (e.g. "paris", "france", "le-marais"). Used as sub-id. */
  pageSlug: string;
  /** Component slot (e.g. "kiwitaxi_cta", "tiqets_cta", "localrent_cta"). */
  component: string;
  /** Visible-locale of the page. */
  locale: "en" | "de" | "fr" | "es";
};

/**
 * Build a sub-id string that Travelpayouts tracks under the marker. This goes
 * into the `sub_id` (or equivalent per-brand) query param so we can attribute
 * conversion to a specific page+component in TP reports.
 *
 * Format: `wts-{pageType}-{pageSlug}-{component}-{locale}` (lowercase, ascii-only).
 */
export function buildTPSubId(label: TPTrackingLabel): string {
  const raw = `wts-${label.pageType}-${label.pageSlug}-${label.component}-${label.locale}`;
  return raw.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 64);
}

/**
 * Append `marker` and `sub_id` to a URL. Used by the per-brand URL builders.
 * Safely merges with any existing query params on the destination URL.
 */
export function withTPMarker(url: string, label: TPTrackingLabel): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    // Bad input — return as-is rather than crash. Brand builders should never hit this.
    return url;
  }
  u.searchParams.set("marker", TP_MARKER);
  u.searchParams.set("sub_id", buildTPSubId(label));
  return u.toString();
}

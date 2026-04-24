// apps/web/src/lib/affiliate/booking.ts
// Booking.com affiliate URL builder. Every outbound link passes through this.
// Label tracking is how we attribute revenue back to page/component in the
// Booking partner dashboard. Keep labels stable; changing schema mid-way breaks historical reporting.

const AID = process.env.BOOKING_AFFILIATE_AID;
if (!AID && process.env.NODE_ENV === "production") {
  // Don't throw in production (we want the site to still render); log loudly.
  // eslint-disable-next-line no-console
  console.error("[booking] BOOKING_AFFILIATE_AID is not set — affiliate links will not track.");
}

export type BookingSearchParams = {
  destType: "city" | "district" | "region" | "country" | "landmark";
  destId: number;
  checkin?: string; // YYYY-MM-DD
  checkout?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  currency?: string;
  locale?: string; // Booking's locale codes, e.g. 'en-us', 'de', 'fr', 'es'
};

export type BookingHotelParams = {
  countrySlug: string; // Booking's country slug, typically ISO lower (e.g. 'fr')
  hotelSlug: string;   // Booking's hotel slug, e.g. 'hotel-de-ville-paris'
  checkin?: string;
  checkout?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  currency?: string;
  locale?: string;
};

export type TrackingLabel = {
  pageType:
    | "country"
    | "city"
    | "neighborhood"
    | "comparison"
    | "trip_type"
    | "property_shortlist"
    | "contrarian"
    | "near_attraction"
    | "price_band"
    | "amenity";
  pageSlug: string; // stable per page; prefer slug over uuid so reports are readable
  locale: string;   // 'en' | 'de' | 'fr' | 'es' | 'it' | 'tr'
  component:
    | "header"
    | "inline"
    | "sticky_sidebar"
    | "end_of_section"
    | "property_card"
    | "faq"
    | "comparison_table";
};

/**
 * Construct the Booking `label` param. Max 64 chars, alphanumeric + `_` + `-`.
 * Pattern: `wts-{pageType}-{pageSlug}-{locale}-{component}`. Keep slugs short.
 */
export function buildLabel(t: TrackingLabel): string {
  const raw = `wts-${t.pageType}-${t.pageSlug}-${t.locale}-${t.component}`;
  return raw.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
}

function toSearchParams(q: Record<string, string | number | undefined>): URLSearchParams {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) {
    if (v !== undefined && v !== null && v !== "") p.set(k, String(v));
  }
  return p;
}

/** Build a Booking.com search URL targeting a city, district, region, country, or landmark. */
export function buildSearchUrl(params: BookingSearchParams, label: TrackingLabel): string {
  if (!AID) {
    // Fall back to un-tracked URL so the page still works; flag via console.
    // eslint-disable-next-line no-console
    console.warn("[booking] buildSearchUrl called without AID; returning untracked URL.");
  }
  const sp = toSearchParams({
    aid: AID,
    dest_id: params.destId,
    dest_type: params.destType,
    checkin: params.checkin,
    checkout: params.checkout,
    group_adults: params.adults ?? 2,
    group_children: params.children ?? 0,
    no_rooms: params.rooms ?? 1,
    selected_currency: params.currency ?? "EUR",
    lang: params.locale ?? "en-us",
    label: buildLabel(label),
  });
  return `https://www.booking.com/searchresults.html?${sp.toString()}`;
}

/** Build a Booking.com URL pointing at a specific hotel page. */
export function buildHotelUrl(params: BookingHotelParams, label: TrackingLabel): string {
  const sp = toSearchParams({
    aid: AID,
    checkin: params.checkin,
    checkout: params.checkout,
    group_adults: params.adults ?? 2,
    group_children: params.children ?? 0,
    no_rooms: params.rooms ?? 1,
    selected_currency: params.currency ?? "EUR",
    lang: params.locale ?? "en-us",
    label: buildLabel(label),
  });
  return `https://www.booking.com/hotel/${params.countrySlug}/${params.hotelSlug}.html?${sp.toString()}`;
}

/**
 * Build a neighborhood-scoped Booking URL. Prefers district search (more precise tracking +
 * better UX for the visitor) when Booking.com has a district ID for that neighborhood.
 * Falls back to city-level search if not.
 */
export function buildNeighborhoodUrl(
  neighborhood: {
    bookingDistrictId?: number | null;
    city: { bookingDestId?: number | null };
  },
  label: TrackingLabel,
  locale: string = "en-us",
  dates?: { checkin?: string; checkout?: string }
): string | null {
  if (neighborhood.bookingDistrictId) {
    return buildSearchUrl(
      {
        destType: "district",
        destId: neighborhood.bookingDistrictId,
        locale,
        ...dates,
      },
      label
    );
  }
  if (neighborhood.city?.bookingDestId) {
    return buildSearchUrl(
      {
        destType: "city",
        destId: neighborhood.city.bookingDestId,
        locale,
        ...dates,
      },
      label
    );
  }
  return null; // caller should hide the CTA if this returns null
}

/**
 * Map an internal locale to Booking.com's expected `lang` parameter.
 * Booking uses region-tagged codes (en-us, en-gb, de, fr, es, it).
 */
export function localeToBookingLang(locale: string, region?: "us" | "gb"): string {
  if (locale === "en") return region === "gb" ? "en-gb" : "en-us";
  return locale; // de, fr, es, it, tr — Booking uses bare codes for these
}

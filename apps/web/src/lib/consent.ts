// apps/web/src/lib/consent.ts
//
// Server-side read of Klaro consent cookie for RSC rendering.
// Klaro stores consent as a JSON object in a cookie named 'klaro'.
// Shape: { "mapbox": true, "booking_affiliate": false, ... }
//
// This lets server components decide whether to render Mapbox map, affiliate
// client-side tracking, etc. — without forcing client hydration just to check consent.

import { cookies } from "next/headers";

export type ConsentCategories = {
  /** Strictly necessary — always true (not consented, but present for type symmetry). */
  necessary: true;
  /** Analytics — currently Plausible (cookie-free, so value is effectively unused) */
  analytics: boolean;
  /** Mapbox map tiles + session cookie */
  maps: boolean;
  /** Affiliate partner client-side tracking (Booking, Agoda, Expedia) */
  affiliate: boolean;
};

const DEFAULT_DENY: ConsentCategories = {
  necessary: true,
  analytics: false,
  maps: false,
  affiliate: false,
};

export async function getConsent(): Promise<ConsentCategories> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get("klaro")?.value;
    if (!raw) return DEFAULT_DENY;

    // Klaro URL-encodes + JSON-encodes the value
    const parsed = JSON.parse(decodeURIComponent(raw)) as Record<string, boolean>;

    return {
      necessary: true,
      analytics: Boolean(parsed["analytics"]),
      maps: Boolean(parsed["maps"] ?? parsed["mapbox"]),
      affiliate: Boolean(parsed["affiliate"] ?? parsed["booking_affiliate"]),
    };
  } catch {
    return DEFAULT_DENY;
  }
}

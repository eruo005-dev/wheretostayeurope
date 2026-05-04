// apps/web/src/components/affiliate/TiqetsToursWidget.tsx
//
// Server component wrapper for the Travelpayouts Tiqets Popular Tours widget
// (TP widget id 3947). Renders 4 horizontal tour cards for the city. Tiqets
// indexes by NUMERIC city ID — we maintain a map below for the cities we
// actively cover. Cities not in the map fall through to the AttractionsCTA.
//
// To extend: visit https://www.tiqets.com/ for the city, copy the numeric ID
// from the URL (e.g. www.tiqets.com/en/amsterdam-c260932/ → 260932), and add
// the entry to TIQETS_CITY_IDS below.
//
// Widget URL pattern observed in the TP dashboard:
//   https://tpemb.com/content?currency=USD&trs={MARKER}&shmarker={PARTNER}
//     &language={LANG}&locale={CITY_ID}&layout=horizontal&cards=4
//     &powered_by=true&campaign_id=89&promo_id=3947

import { getConsent } from "@/lib/consent";
import { TP_MARKER } from "@/lib/affiliate/travelpayouts";
import { TravelpayoutsWidget } from "./TravelpayoutsWidget";
import { AttractionsCTA } from "./AttractionsCTA";

const TP_PARTNER_ID = process.env.TRAVELPAYOUTS_PARTNER_ID ?? "722878";

/**
 * Tiqets city ID map. Verified by spot-checking each ID against
 * https://www.tiqets.com/en/anything-c{ID}/ which redirects to the canonical
 * city page. Cities not in this map render the AttractionsCTA fallback (deep
 * link) — better than embedding a widget for a city Tiqets doesn't index.
 *
 * Last verified: 2026-05-04.
 *
 * Notable cases:
 *   - santorini → 187711 redirects to "fira-attractions" (Fira is the main
 *     village on Santorini; Tiqets indexes under that name).
 *   - wroclaw is NOT in this map: Tiqets has no Wrocław inventory as of the
 *     last verification — search returns Kraków-from-Wrocław tours only.
 */
const TIQETS_CITY_IDS: Record<string, number> = {
  // France
  paris: 66746,
  nice: 66770,
  lyon: 66838,
  marseille: 66825,

  // Spain
  madrid: 66254,
  barcelona: 66342,
  valencia: 65847,
  seville: 65870,
  malaga: 32,

  // Italy
  rome: 71631,
  florence: 71854,
  venice: 71510,
  milan: 71749,
  naples: 71720,

  // Germany
  berlin: 65144,
  munich: 31,
  hamburg: 64886,
  cologne: 64765,

  // United Kingdom & Ireland
  london: 67458,
  edinburgh: 21,
  dublin: 68616,

  // Netherlands
  amsterdam: 75061,
  rotterdam: 74895,

  // Portugal
  lisbon: 76528,
  porto: 76573,

  // Turkey
  istanbul: 79079,

  // Greece
  athens: 99239,
  thessaloniki: 67911,
  santorini: 187711,

  // Croatia
  dubrovnik: 68082,
  split: 68069,

  // Czech Republic / Hungary
  prague: 64162,
  budapest: 68199,

  // Poland
  krakow: 46,
  warsaw: 485,
  gdansk: 76392,

  // Austria
  vienna: 60335,
  salzburg: 60346,

  // Switzerland
  zurich: 20,
  geneva: 62678,

  // Belgium
  brussels: 60843,
  bruges: 60844,
  ghent: 60814,

  // Nordics
  copenhagen: 113,
  stockholm: 1638,
  reykjavik: 22,

  // Estonia / Malta
  tallinn: 65702,
  valletta: 73787,
};

type Props = {
  cityName: string;
  citySlug: string;
  neighborhoodSlug: string;
  locale: "en" | "de" | "fr" | "es";
};

export async function TiqetsToursWidget({ cityName, citySlug, neighborhoodSlug, locale }: Props) {
  const consent = await getConsent();
  const tiqetsCityId = TIQETS_CITY_IDS[citySlug];

  // Always fall back to the deep-link CTA for cities we haven't mapped to a
  // Tiqets numeric id, regardless of consent.
  if (tiqetsCityId === undefined) {
    return (
      <AttractionsCTA
        cityName={cityName}
        citySlug={citySlug}
        neighborhoodSlug={neighborhoodSlug}
        locale={locale}
      />
    );
  }

  return (
    <section style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 20, margin: "0 0 12px", color: "#0f172a", fontWeight: 600 }}>
        Top things to do in {cityName}
      </h3>
      <TravelpayoutsWidget
        ariaLabel={`Top tours and tickets in ${cityName}`}
        height={420}
        hasConsent={consent.affiliate}
        params={{
          currency: "EUR",
          trs: TP_MARKER,
          shmarker: TP_PARTNER_ID,
          language: locale,
          locale: tiqetsCityId,
          layout: "horizontal",
          cards: 4,
          powered_by: true,
          campaign_id: 89,
          promo_id: 3947,
        }}
        fallback={
          <AttractionsCTA
            cityName={cityName}
            citySlug={citySlug}
            neighborhoodSlug={neighborhoodSlug}
            locale={locale}
          />
        }
      />
    </section>
  );
}

// apps/web/src/components/affiliate/LocalrentSearchWidget.tsx
//
// Server component wrapper for the Travelpayouts Localrent Rental Cars Search
// Form widget (TP widget id 4322). Localrent indexes countries by numeric ID;
// we maintain a map below for the countries we cover. Falls back to the
// CarRentalCTA when consent denied or country isn't in the ID map.
//
// Widget URL pattern observed in the TP dashboard:
//   https://tpemb.com/content?trs={MARKER}&shmarker={PARTNER}&powered_by=true
//     &country={COUNTRY_ID}&lang={LANG}&width=100&background=light&logo=true
//     &header=true&gearbox=false&cars=false&border=true

import { getConsent } from "@/lib/consent";
import { TP_MARKER } from "@/lib/affiliate/travelpayouts";
import { localrentCoversCountry } from "@/lib/affiliate/localrent";
import { TravelpayoutsWidget } from "./TravelpayoutsWidget";
import { CarRentalCTA } from "./CarRentalCTA";

const TP_PARTNER_ID = process.env.TRAVELPAYOUTS_PARTNER_ID ?? "722878";

/**
 * Localrent country ID map. The widget needs a numeric country id (`country`
 * URL param). IDs sourced from Localrent's public widget API:
 *   https://widget.localrent.com/api/countries?key=travelpayouts&locale=en
 *
 * Last verified: 2026-05-04. Populated for every country in
 * LOCALRENT_COVERED_COUNTRIES (lib/affiliate/localrent.ts).
 */
const LOCALRENT_COUNTRY_IDS: Record<string, number> = {
  albania: 128,
  austria: 127,
  "bosnia-and-herzegovina": 141,
  finland: 139,
  france: 12,
  germany: 29,
  greece: 18,
  italy: 13,
  malta: 149,
  montenegro: 133,
  "north-macedonia": 147,
  portugal: 17,
  slovenia: 129,
  spain: 35,
  turkey: 109,
};

type Props = {
  countryName: string;
  countrySlug: string;
  locale: "en" | "de" | "fr" | "es";
};

export async function LocalrentSearchWidget({ countryName, countrySlug, locale }: Props) {
  if (!localrentCoversCountry(countrySlug)) return null;

  const consent = await getConsent();
  const countryId = LOCALRENT_COUNTRY_IDS[countrySlug];

  // Fall back to deep-link CTA when we don't know the country's numeric ID.
  if (countryId === undefined) {
    return <CarRentalCTA countryName={countryName} countrySlug={countrySlug} locale={locale} />;
  }

  return (
    <section style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 20, margin: "0 0 12px", color: "#0f172a", fontWeight: 600 }}>
        Compare car rental in {countryName}
      </h3>
      <TravelpayoutsWidget
        ariaLabel={`Car rental search for ${countryName}`}
        height={460}
        hasConsent={consent.affiliate}
        params={{
          trs: TP_MARKER,
          shmarker: TP_PARTNER_ID,
          powered_by: true,
          country: countryId,
          lang: locale,
          width: 100,
          background: "light",
          logo: true,
          header: true,
          gearbox: false,
          cars: false,
          border: true,
        }}
        fallback={
          <CarRentalCTA countryName={countryName} countrySlug={countrySlug} locale={locale} />
        }
      />
    </section>
  );
}

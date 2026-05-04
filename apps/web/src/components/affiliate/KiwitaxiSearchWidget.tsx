// apps/web/src/components/affiliate/KiwitaxiSearchWidget.tsx
//
// Server component wrapper for the Travelpayouts Kiwitaxi Shuttles Search Form
// widget (TP widget id 2949). Renders the pre-built search form pre-filled with
// the page's destination city; falls back to the AirportTransferCTA when
// affiliate consent is denied.
//
// Widget URL pattern observed in the TP dashboard:
//   https://tpemb.com/content?currency=USD&trs={MARKER}&shmarker={PARTNER}
//     &locale={LANG}&from=&to={CITY,COUNTRY}&country=&powered_by=true
//     &wtype=true&transfers_limit=10&bg_color=%23f5f5f5&button_color=...

import { getConsent } from "@/lib/consent";
import { TP_MARKER } from "@/lib/affiliate/travelpayouts";
import { TravelpayoutsWidget } from "./TravelpayoutsWidget";
import { AirportTransferCTA } from "./AirportTransferCTA";

const TP_PARTNER_ID = process.env.TRAVELPAYOUTS_PARTNER_ID ?? "722878";

type Props = {
  cityName: string;
  citySlug: string;
  countryName: string;
  locale: "en" | "de" | "fr" | "es";
};

export async function KiwitaxiSearchWidget({ cityName, citySlug, countryName, locale }: Props) {
  const consent = await getConsent();

  return (
    <section style={{ marginTop: 40 }}>
      <TravelpayoutsWidget
        ariaLabel={`Airport transfer search for ${cityName}`}
        height={520}
        hasConsent={consent.affiliate}
        params={{
          currency: "EUR",
          trs: TP_MARKER,
          shmarker: TP_PARTNER_ID,
          locale,
          from: "",
          to: `${cityName}, ${countryName}`,
          country: "",
          powered_by: true,
          wtype: true,
          transfers_limit: 10,
          bg_color: "#f5f5f5",
        }}
        fallback={
          <AirportTransferCTA
            cityName={cityName}
            citySlug={citySlug}
            countryName={countryName}
            locale={locale}
          />
        }
      />
    </section>
  );
}

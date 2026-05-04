// apps/web/src/components/affiliate/AirportTransferCTA.tsx
//
// Server-rendered Kiwitaxi airport-transfer CTA. Slot below the city pillar's
// neighborhood map. No client JS, no third-party iframe — just a deep-linked
// affiliate button that pre-fills the destination on Kiwitaxi.

import { buildKiwitaxiSearchUrl } from "@/lib/affiliate/kiwitaxi";
import type { TPTrackingLabel } from "@/lib/affiliate/travelpayouts";

type Props = {
  cityName: string;
  citySlug: string;
  countryName: string;
  locale: "en" | "de" | "fr" | "es";
};

const COPY: Record<string, { eyebrow: string; head: (city: string) => string; body: string; cta: string; fine: string }> = {
  en: {
    eyebrow: "Getting from the airport",
    head: (city) => `Pre-book a private transfer to your ${city} hotel`,
    body: "Fixed-price door-to-door rides — no airport-taxi haggling, no queueing. Available in over 100 countries via our partner Kiwitaxi.",
    cta: "Check transfer prices",
    fine: "Affiliate link — we may earn a commission on bookings, at no extra cost to you.",
  },
  de: {
    eyebrow: "Vom Flughafen zum Hotel",
    head: (city) => `Privattransfer zu deinem ${city}-Hotel im Voraus buchen`,
    body: "Festpreis-Transfer von Tür zu Tür — kein Taxi-Feilschen, keine Warteschlange. Über 100 Länder via Kiwitaxi.",
    cta: "Transferpreise prüfen",
    fine: "Affiliate-Link — wir verdienen evtl. Provision, ohne Aufpreis für dich.",
  },
  fr: {
    eyebrow: "De l'aéroport à l'hôtel",
    head: (city) => `Réservez un transfert privé vers votre hôtel à ${city}`,
    body: "Trajet porte-à-porte à prix fixe — pas de négociation taxi, pas de file. Plus de 100 pays via Kiwitaxi.",
    cta: "Voir les tarifs",
    fine: "Lien affilié — nous percevons une commission sans frais pour vous.",
  },
  es: {
    eyebrow: "Del aeropuerto al hotel",
    head: (city) => `Reserva un traslado privado a tu hotel en ${city}`,
    body: "Trayectos a precio fijo puerta a puerta — sin negociar el taxi, sin colas. Más de 100 países vía Kiwitaxi.",
    cta: "Ver tarifas",
    fine: "Enlace afiliado — podemos recibir una comisión sin coste extra para ti.",
  },
};

export function AirportTransferCTA({ cityName, citySlug, countryName, locale }: Props) {
  const copy = COPY[locale] ?? COPY.en;

  const trackingLabel: TPTrackingLabel = {
    pageType: "city",
    pageSlug: citySlug,
    component: "kiwitaxi_cta",
    locale,
  };

  // Pre-fill destination as the city; departure left blank so the user picks
  // their actual airport (e.g. CDG vs ORY for Paris).
  const url = buildKiwitaxiSearchUrl(
    { to: `${cityName}, ${countryName}`, locale },
    trackingLabel
  );

  return (
    <aside
      style={{
        marginTop: 40,
        padding: "20px 22px",
        borderRadius: 10,
        background: "#f0f9ff",
        border: "1px solid #bae6fd",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#0369a1",
          margin: "0 0 6px",
        }}
      >
        {copy.eyebrow}
      </p>
      <h3 style={{ fontSize: 19, margin: "0 0 8px", color: "#0c4a6e", fontWeight: 600 }}>
        {copy.head(cityName)}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: "#075985", margin: "0 0 14px" }}>
        {copy.body}
      </p>
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#0284c7",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {copy.cta} →
      </a>
      <p style={{ fontSize: 11, color: "#075985", margin: "10px 0 0", opacity: 0.8 }}>
        {copy.fine}
      </p>
    </aside>
  );
}

// apps/web/src/components/affiliate/CarRentalCTA.tsx
//
// Server-rendered Localrent car-rental CTA for country pages. Skip-renders
// when the country isn't in Localrent's coverage list (UK, Scandinavia,
// Netherlands, Switzerland, Czech Republic, Hungary, Poland → no CTA).

import { buildLocalrentCountryUrl, localrentCoversCountry } from "@/lib/affiliate/localrent";
import type { TPTrackingLabel } from "@/lib/affiliate/travelpayouts";

type Props = {
  countryName: string;
  countrySlug: string;
  locale: "en" | "de" | "fr" | "es";
};

const COPY: Record<string, { eyebrow: string; head: (country: string) => string; body: string; cta: string; fine: string }> = {
  en: {
    eyebrow: "Renting a car",
    head: (country) => `Compare local rental agencies across ${country}`,
    body: "Localrent skips the big chains and aggregates small local agencies — typically 30-40% cheaper than Hertz/Avis for the same week. Strongest in the Balkans, Greece, Spain.",
    cta: "Check car rental prices",
    fine: "Affiliate link — we may earn a commission on bookings, at no extra cost to you.",
  },
  de: {
    eyebrow: "Mietwagen",
    head: (country) => `Lokale Vermieter in ganz ${country} vergleichen`,
    body: "Localrent umgeht die großen Ketten und bündelt kleine lokale Anbieter — oft 30-40% günstiger als Hertz/Avis. Stark auf dem Balkan, in Griechenland und Spanien.",
    cta: "Preise prüfen",
    fine: "Affiliate-Link — wir verdienen evtl. Provision, ohne Aufpreis für dich.",
  },
  fr: {
    eyebrow: "Location de voiture",
    head: (country) => `Comparez les loueurs locaux dans toute la ${country}`,
    body: "Localrent ignore les grandes chaînes et regroupe les agences locales — souvent 30 à 40% moins cher qu'Hertz/Avis. Très présent dans les Balkans, en Grèce, en Espagne.",
    cta: "Voir les tarifs",
    fine: "Lien affilié — nous percevons une commission sans frais pour vous.",
  },
  es: {
    eyebrow: "Alquiler de coche",
    head: (country) => `Compara agencias locales en toda ${country}`,
    body: "Localrent se salta las grandes cadenas y agrupa agencias locales — habitualmente 30-40% más barato que Hertz/Avis. Más fuerte en los Balcanes, Grecia, España.",
    cta: "Ver tarifas",
    fine: "Enlace afiliado — podemos recibir una comisión sin coste extra para ti.",
  },
};

export function CarRentalCTA({ countryName, countrySlug, locale }: Props) {
  if (!localrentCoversCountry(countrySlug)) return null;

  const copy = COPY[locale] ?? COPY.en;

  const trackingLabel: TPTrackingLabel = {
    pageType: "country",
    pageSlug: countrySlug,
    component: "localrent_cta",
    locale,
  };

  const url = buildLocalrentCountryUrl({ countrySlug, locale }, trackingLabel);

  return (
    <aside
      style={{
        marginTop: 40,
        padding: "20px 22px",
        borderRadius: 10,
        background: "#fef3c7",
        border: "1px solid #fde68a",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#854d0e",
          margin: "0 0 6px",
        }}
      >
        {copy.eyebrow}
      </p>
      <h3 style={{ fontSize: 19, margin: "0 0 8px", color: "#713f12", fontWeight: 600 }}>
        {copy.head(countryName)}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: "#854d0e", margin: "0 0 14px" }}>
        {copy.body}
      </p>
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#ca8a04",
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
      <p style={{ fontSize: 11, color: "#854d0e", margin: "10px 0 0", opacity: 0.8 }}>
        {copy.fine}
      </p>
    </aside>
  );
}

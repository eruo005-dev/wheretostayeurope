// apps/web/src/components/affiliate/AttractionsCTA.tsx
//
// Server-rendered Tiqets "things to do" CTA for neighborhood pages. Skip-renders
// when Tiqets doesn't cover the city — no "no results" link traps.

import { buildTiqetsCityUrl, tiqetsCoversCity } from "@/lib/affiliate/tiqets";
import type { TPTrackingLabel } from "@/lib/affiliate/travelpayouts";

type Props = {
  /** City the neighborhood belongs to (Tiqets indexes by city). */
  cityName: string;
  citySlug: string;
  /** Stable slug of the *neighborhood* page — used in tracking sub_id only. */
  neighborhoodSlug: string;
  locale: "en" | "de" | "fr" | "es";
};

const COPY: Record<string, { eyebrow: string; head: (city: string) => string; body: string; cta: string; fine: string }> = {
  en: {
    eyebrow: "While you're there",
    head: (city) => `Skip the queue at ${city}'s top sights`,
    body: "Mobile tickets, instant confirmation, free cancellation on most options — booked through our partner Tiqets.",
    cta: "Browse top attractions",
    fine: "Affiliate link — we may earn a commission on bookings, at no extra cost to you.",
  },
  de: {
    eyebrow: "Wenn du schon mal da bist",
    head: (city) => `Schlange umgehen an den Top-Sehenswürdigkeiten in ${city}`,
    body: "Mobile Tickets, sofortige Bestätigung, oft kostenlose Stornierung — über unseren Partner Tiqets.",
    cta: "Top-Sehenswürdigkeiten",
    fine: "Affiliate-Link — wir verdienen evtl. Provision, ohne Aufpreis für dich.",
  },
  fr: {
    eyebrow: "Pendant que vous êtes là",
    head: (city) => `Évitez la queue aux sites majeurs de ${city}`,
    body: "Billets mobiles, confirmation instantanée, annulation gratuite sur la plupart des options — via notre partenaire Tiqets.",
    cta: "Voir les attractions",
    fine: "Lien affilié — nous percevons une commission sans frais pour vous.",
  },
  es: {
    eyebrow: "Mientras estés allí",
    head: (city) => `Evita las colas en los lugares imprescindibles de ${city}`,
    body: "Entradas móviles, confirmación inmediata, cancelación gratuita en la mayoría de opciones — vía nuestro socio Tiqets.",
    cta: "Ver atracciones",
    fine: "Enlace afiliado — podemos recibir una comisión sin coste extra para ti.",
  },
};

export function AttractionsCTA({ cityName, citySlug, neighborhoodSlug, locale }: Props) {
  if (!tiqetsCoversCity(citySlug)) return null;

  const copy = COPY[locale] ?? COPY.en;

  const trackingLabel: TPTrackingLabel = {
    pageType: "neighborhood",
    pageSlug: neighborhoodSlug,
    component: "tiqets_cta",
    locale,
  };

  const url = buildTiqetsCityUrl({ citySlug, locale }, trackingLabel);

  return (
    <aside
      style={{
        marginTop: 32,
        padding: "20px 22px",
        borderRadius: 10,
        background: "#f0fdf4",
        border: "1px solid #bbf7d0",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#166534",
          margin: "0 0 6px",
        }}
      >
        {copy.eyebrow}
      </p>
      <h3 style={{ fontSize: 19, margin: "0 0 8px", color: "#14532d", fontWeight: 600 }}>
        {copy.head(cityName)}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: "#166534", margin: "0 0 14px" }}>
        {copy.body}
      </p>
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#16a34a",
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
      <p style={{ fontSize: 11, color: "#166534", margin: "10px 0 0", opacity: 0.8 }}>
        {copy.fine}
      </p>
    </aside>
  );
}

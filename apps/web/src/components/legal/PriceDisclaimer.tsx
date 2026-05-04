// apps/web/src/components/legal/PriceDisclaimer.tsx
//
// Inline price disclaimer. Use anywhere a static price is mentioned.
// Example: "from €{price}/night <PriceAsterisk />"
//
// Client component because PriceAsterisk uses useId() to wire the tooltip.

"use client";

import { useId } from "react";

const COPY: Record<string, string> = {
  en: "Indicative price — live rates via the booking link; may vary by date and availability.",
  de: "Richtpreis — aktuelle Preise über den Buchungslink; können je nach Datum und Verfügbarkeit abweichen.",
  fr: "Prix indicatif — tarifs en temps réel via le lien de réservation ; peuvent varier selon la date et la disponibilité.",
  es: "Precio orientativo — tarifas en tiempo real a través del enlace de reserva; pueden variar según la fecha y disponibilidad.",
};

/** Small superscript asterisk that reveals the full disclaimer on hover / focus. */
export function PriceAsterisk({ locale = "en" }: { locale?: string }) {
  const id = useId();
  const text = COPY[locale] ?? COPY.en;
  return (
    <sup
      aria-describedby={id}
      tabIndex={0}
      style={{ color: "#64748b", cursor: "help", marginLeft: 2, fontSize: "0.75em" }}
    >
      *
      <span id={id} role="tooltip" style={srOnly}>{text}</span>
    </sup>
  );
}

/** Block-level disclaimer to place once per section that contains multiple prices. */
export function PriceDisclaimerBlock({ locale = "en" }: { locale?: string }) {
  const text = COPY[locale] ?? COPY.en;
  return (
    <p
      role="note"
      style={{
        fontSize: 12,
        color: "#64748b",
        fontStyle: "italic",
        margin: "4px 0 16px",
      }}
    >
      * {text}
    </p>
  );
}

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

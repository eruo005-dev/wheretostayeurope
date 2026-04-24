// apps/web/src/components/legal/VisaDisclaimer.tsx
//
// Prominent alert at the top of ANY page containing visa, entry-requirement, or
// border-rule content. Defensive — visa rules change without notice and any
// specific claim we make is a liability if it's stale.
//
// Strong recommendation: do NOT publish visa content in Phase 1.
// If you do, this component is MANDATORY above the first word of editorial.

import Link from "next/link";

const COPY: Record<string, { heading: string; body: string; linkText: string }> = {
  en: {
    heading: "Visa and entry rules change frequently — always verify with official sources.",
    body: "The information on this page is a non-authoritative overview as of the last review date. Visa requirements, entry documentation, and border rules change without notice and can vary by nationality, purpose of travel, recent travel history, and other factors. Before booking or travelling, check the official government source for your nationality and your destination. We accept no liability for decisions made based on this page.",
    linkText: "Find official sources",
  },
  de: {
    heading: "Visa- und Einreiseregeln ändern sich häufig — immer bei offiziellen Quellen prüfen.",
    body: "Die Informationen auf dieser Seite sind eine unverbindliche Übersicht zum Zeitpunkt der letzten Überprüfung. Visa-Anforderungen, Einreisedokumente und Grenzregeln ändern sich ohne Vorankündigung und können je nach Staatsangehörigkeit, Reisezweck, jüngster Reisehistorie und anderen Faktoren variieren. Vor Buchung oder Reise immer die offizielle Quelle der Regierung für deine Staatsangehörigkeit und dein Reiseziel prüfen. Wir übernehmen keine Haftung für Entscheidungen, die auf dieser Seite basieren.",
    linkText: "Offizielle Quellen finden",
  },
  fr: {
    heading: "Les règles de visa et d'entrée changent fréquemment — vérifiez toujours auprès des sources officielles.",
    body: "Les informations de cette page constituent un aperçu non contractuel à la date de la dernière révision. Les exigences de visa, les documents d'entrée et les règles frontalières peuvent changer sans préavis et varier selon la nationalité, le motif du voyage, l'historique récent et d'autres facteurs. Avant de réserver ou de voyager, consultez la source gouvernementale officielle pour votre nationalité et votre destination. Nous déclinons toute responsabilité quant aux décisions prises sur la base de cette page.",
    linkText: "Trouver les sources officielles",
  },
  es: {
    heading: "Las normas de visados y entrada cambian con frecuencia — verifica siempre con fuentes oficiales.",
    body: "La información de esta página es un resumen no oficial a la fecha de la última revisión. Los requisitos de visado, la documentación de entrada y las normas fronterizas pueden cambiar sin previo aviso y varían según la nacionalidad, el motivo del viaje, el historial reciente y otros factores. Antes de reservar o viajar, consulta la fuente oficial del gobierno para tu nacionalidad y tu destino. No aceptamos responsabilidad por decisiones tomadas a partir de esta página.",
    linkText: "Fuentes oficiales",
  },
};

type Props = {
  locale?: string;
  lastReviewedAt?: string;       // ISO date
  officialSourceUrl?: string;    // e.g. destination country's embassy page
};

export function VisaDisclaimer({ locale = "en", lastReviewedAt, officialSourceUrl }: Props) {
  const copy = COPY[locale] ?? COPY.en;
  return (
    <div
      role="alert"
      aria-label="Visa disclaimer"
      style={{
        background: "#fef2f2",
        border: "2px solid #ef4444",
        borderRadius: 8,
        padding: "16px 20px",
        margin: "16px 0 24px",
        color: "#7f1d1d",
      }}
    >
      <p style={{ margin: 0, fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>
        ⚠ {copy.heading}
      </p>
      <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5 }}>
        {copy.body}
      </p>
      {(lastReviewedAt || officialSourceUrl) && (
        <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.5 }}>
          {lastReviewedAt && (
            <span>
              Last reviewed: <strong>{lastReviewedAt}</strong>.
            </span>
          )}
          {officialSourceUrl && (
            <>
              {" "}
              <Link href={officialSourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#7f1d1d", textDecoration: "underline" }}>
                {copy.linkText} →
              </Link>
            </>
          )}
        </p>
      )}
    </div>
  );
}

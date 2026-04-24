// apps/web/src/components/legal/InsuranceDisclaimer.tsx
//
// Render this component DIRECTLY above every insurance affiliate CTA.
// Required because we are not licensed insurance intermediaries and must not
// be perceived as giving financial or insurance advice.

const COPY: Record<string, { label: string; body: string }> = {
  en: {
    label: "Not insurance advice.",
    body: "We are not licensed insurance agents or brokers. Travel insurance needs depend on your residency, health, and trip. Compare policies, read exclusions, and consult a licensed broker if you're unsure. If you buy through our link we earn a commission at no extra cost to you.",
  },
  de: {
    label: "Keine Versicherungsberatung.",
    body: "Wir sind keine lizenzierten Versicherungsvermittler. Dein Versicherungsbedarf hängt von Wohnsitz, Gesundheit und Reise ab. Vergleiche Policen, lies die Ausschlüsse, und wende dich bei Unsicherheit an einen lizenzierten Berater. Bei Abschluss über unseren Link erhalten wir eine Provision — ohne Aufpreis für dich.",
  },
  fr: {
    label: "Ce n'est pas un conseil en assurance.",
    body: "Nous ne sommes pas des courtiers ou agents d'assurance agréés. Vos besoins dépendent de votre résidence, de votre santé et de votre voyage. Comparez les polices, lisez les exclusions, et consultez un courtier agréé en cas de doute. Si vous souscrivez via notre lien, nous percevons une commission, sans coût supplémentaire pour vous.",
  },
  es: {
    label: "No es asesoramiento en seguros.",
    body: "No somos agentes ni corredores de seguros autorizados. Tus necesidades dependen de residencia, salud y viaje. Compara pólizas, lee las exclusiones, y consulta a un corredor autorizado si tienes dudas. Si contratas a través de nuestro enlace recibimos una comisión, sin coste adicional para ti.",
  },
};

export function InsuranceDisclaimer({ locale = "en" }: { locale?: string }) {
  const copy = COPY[locale] ?? COPY.en;
  return (
    <aside
      role="note"
      aria-label="Insurance disclaimer"
      style={{
        background: "#fff7ed",
        border: "1px solid #fdba74",
        borderRadius: 6,
        padding: "12px 16px",
        margin: "16px 0",
        fontSize: 13,
        color: "#7c2d12",
        lineHeight: 1.5,
      }}
    >
      <strong>{copy.label}</strong> {copy.body}
    </aside>
  );
}

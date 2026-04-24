// apps/web/src/components/legal/AffiliateDisclosure.tsx
//
// Two variants:
//  - <AffiliateDisclosureBanner /> — site-wide, persistent top bar (server component)
//  - <AffiliateDisclosureBlock />  — in-page block rendered ABOVE the first affiliate link
//
// Both are required for FTC "clear and conspicuous" compliance. Footer-only is not enough.

import Link from "next/link";

export function AffiliateDisclosureBanner({ locale = "en" }: { locale?: string }) {
  const copy = BANNER_COPY[locale] ?? BANNER_COPY.en;
  return (
    <div
      role="complementary"
      aria-label="Affiliate disclosure"
      style={{
        background: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
        padding: "8px 16px",
        fontSize: 13,
        color: "#334155",
        textAlign: "center",
      }}
    >
      {copy.before}{" "}
      <Link href={`/${locale}/legal/disclosure`} style={{ color: "#2563eb", textDecoration: "underline" }}>
        {copy.link}
      </Link>
      {copy.after}
    </div>
  );
}

export function AffiliateDisclosureBlock({ locale = "en" }: { locale?: string }) {
  const copy = BLOCK_COPY[locale] ?? BLOCK_COPY.en;
  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      style={{
        background: "#fef9c3",
        border: "1px solid #fde047",
        borderRadius: 6,
        padding: "12px 16px",
        margin: "16px 0",
        fontSize: 14,
        color: "#713f12",
        lineHeight: 1.5,
      }}
    >
      <strong>{copy.label}</strong> {copy.body}{" "}
      <Link href={`/${locale}/legal/disclosure`} style={{ color: "#713f12", textDecoration: "underline" }}>
        {copy.link}
      </Link>
    </aside>
  );
}

const BANNER_COPY: Record<string, { before: string; link: string; after: string }> = {
  en: {
    before: "This site earns commission on bookings made through our links, at no extra cost to you.",
    link: "Learn how",
    after: ".",
  },
  de: {
    before: "Diese Seite verdient Provisionen für Buchungen über unsere Links — ohne Aufpreis für dich.",
    link: "Mehr erfahren",
    after: ".",
  },
  fr: {
    before: "Ce site perçoit une commission sur les réservations effectuées via nos liens, sans coût supplémentaire pour vous.",
    link: "En savoir plus",
    after: ".",
  },
  es: {
    before: "Este sitio recibe una comisión por las reservas realizadas a través de nuestros enlaces, sin coste adicional para ti.",
    link: "Saber más",
    after: ".",
  },
};

const BLOCK_COPY: Record<string, { label: string; body: string; link: string }> = {
  en: {
    label: "Disclosure:",
    body: "some links on this page are affiliate links. If you book through them we may earn a commission at no additional cost to you. This does not influence our recommendations.",
    link: "Full disclosure →",
  },
  de: {
    label: "Hinweis:",
    body: "Einige Links auf dieser Seite sind Affiliate-Links. Wenn du darüber buchst, erhalten wir eine Provision — ohne Aufpreis für dich. Das beeinflusst unsere Empfehlungen nicht.",
    link: "Vollständige Offenlegung →",
  },
  fr: {
    label: "Divulgation :",
    body: "certains liens de cette page sont des liens affiliés. Si vous réservez via ces liens, nous recevons une commission, sans coût supplémentaire pour vous. Cela n'influence pas nos recommandations.",
    link: "Divulgation complète →",
  },
  es: {
    label: "Divulgación:",
    body: "algunos enlaces de esta página son enlaces de afiliado. Si reservas a través de ellos, recibimos una comisión sin coste adicional para ti. Esto no influye en nuestras recomendaciones.",
    link: "Divulgación completa →",
  },
};

// apps/web/src/components/layout/Header.tsx
//
// Site header with logo, country nav, and locale switcher. Server component —
// locale switcher is a small client component embedded inside.

import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SITE_NAME } from "@/lib/seo/config";

const NAV_COPY: Record<string, { countries: string; compare: string; about: string }> = {
  en: { countries: "Countries", compare: "Compare", about: "About" },
  de: { countries: "Länder", compare: "Vergleich", about: "Über uns" },
  fr: { countries: "Pays", compare: "Comparer", about: "À propos" },
  es: { countries: "Países", compare: "Comparar", about: "Acerca de" },
};

export function Header({ locale }: { locale: "en" | "de" | "fr" | "es" }) {
  const copy = NAV_COPY[locale] ?? NAV_COPY.en;

  return (
    <header
      style={{
        borderBottom: "1px solid #e2e8f0",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href={`/${locale}`}
          style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", textDecoration: "none", whiteSpace: "nowrap" }}
          aria-label={`${SITE_NAME} — home`}
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Primary" style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link href={`/${locale}`} style={navLink}>{copy.countries}</Link>
          <Link href={`/${locale}/compare`} style={navLink}>{copy.compare}</Link>
          <Link href={`/${locale}/about`} style={navLink}>{copy.about}</Link>
          <LocaleSwitcher currentLocale={locale} />
        </nav>
      </div>
    </header>
  );
}

const navLink: React.CSSProperties = {
  color: "#334155",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
};

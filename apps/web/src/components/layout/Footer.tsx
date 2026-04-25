// apps/web/src/components/layout/Footer.tsx
//
// Global footer. All required legal links + Cookie Preferences button (client).
// Legal compliance: Impressum + Privacy + Terms + Disclosure + Cookies links are
// mandatory and must be present on EVERY page. This component is rendered by
// the locale layout — do not use it inline anywhere else.

import Link from "next/link";
import { ConsentPreferencesButton } from "@/components/legal/ConsentProvider";
import { SITE_NAME, LEGAL_ENTITY_NAME } from "@/lib/seo/config";

const FOOTER_COPY: Record<string, {
  tagline: string;
  legal: string;
  contentSections: string;
  privacy: string; terms: string; disclosure: string; cookies: string; impressum: string;
  contact: string;
  cookiePrefs: string;
  copyright: (year: number) => string;
}> = {
  en: {
    tagline: "The decision layer for European accommodation.",
    legal: "Legal",
    contentSections: "Explore",
    privacy: "Privacy", terms: "Terms", disclosure: "Affiliate disclosure",
    cookies: "Cookies", impressum: "Impressum",
    contact: "Contact",
    cookiePrefs: "Cookie preferences",
    copyright: (y) => `© ${y} ${LEGAL_ENTITY_NAME}. All rights reserved.`,
  },
  de: {
    tagline: "Die Entscheidungsebene für Unterkünfte in Europa.",
    legal: "Rechtliches",
    contentSections: "Entdecken",
    privacy: "Datenschutz", terms: "AGB", disclosure: "Affiliate-Hinweis",
    cookies: "Cookies", impressum: "Impressum",
    contact: "Kontakt",
    cookiePrefs: "Cookie-Einstellungen",
    copyright: (y) => `© ${y} ${LEGAL_ENTITY_NAME}. Alle Rechte vorbehalten.`,
  },
  fr: {
    tagline: "Le niveau de décision pour l'hébergement en Europe.",
    legal: "Mentions légales",
    contentSections: "Explorer",
    privacy: "Confidentialité", terms: "Conditions", disclosure: "Divulgation affiliée",
    cookies: "Cookies", impressum: "Mentions légales",
    contact: "Contact",
    cookiePrefs: "Préférences cookies",
    copyright: (y) => `© ${y} ${LEGAL_ENTITY_NAME}. Tous droits réservés.`,
  },
  es: {
    tagline: "La capa de decisión para alojamiento en Europa.",
    legal: "Legal",
    contentSections: "Explorar",
    privacy: "Privacidad", terms: "Términos", disclosure: "Divulgación de afiliados",
    cookies: "Cookies", impressum: "Aviso legal",
    contact: "Contacto",
    cookiePrefs: "Preferencias de cookies",
    copyright: (y) => `© ${y} ${LEGAL_ENTITY_NAME}. Todos los derechos reservados.`,
  },
};

export function Footer({ locale }: { locale: "en" | "de" | "fr" | "es" }) {
  const copy = FOOTER_COPY[locale] ?? FOOTER_COPY.en;
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 64,
        borderTop: "1px solid #e2e8f0",
        background: "#f8fafc",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div>
          <strong style={{ fontSize: 16 }}>{SITE_NAME}</strong>
          <p style={{ fontSize: 14, color: "#64748b", margin: "8px 0 0", lineHeight: 1.5 }}>
            {copy.tagline}
          </p>
        </div>

        <nav aria-label="Legal">
          <h3 style={colHeading}>{copy.legal}</h3>
          <ul style={list}>
            <li><Link href={`/${locale}/legal/privacy`} style={footerLink}>{copy.privacy}</Link></li>
            <li><Link href={`/${locale}/legal/terms`} style={footerLink}>{copy.terms}</Link></li>
            <li><Link href={`/${locale}/legal/disclosure`} style={footerLink}>{copy.disclosure}</Link></li>
            <li><Link href={`/${locale}/legal/cookies`} style={footerLink}>{copy.cookies}</Link></li>
            <li><Link href={`/${locale}/legal/impressum`} style={footerLink}>{copy.impressum}</Link></li>
            <li>
              <ConsentPreferencesButton>
                <span style={footerLink}>{copy.cookiePrefs}</span>
              </ConsentPreferencesButton>
            </li>
          </ul>
        </nav>

        <nav aria-label={copy.contentSections}>
          <h3 style={colHeading}>{copy.contentSections}</h3>
          <ul style={list}>
            <li><Link href={`/${locale}/france`} style={footerLink}>France</Link></li>
            <li><Link href={`/${locale}/spain`} style={footerLink}>Spain</Link></li>
            <li><Link href={`/${locale}/italy`} style={footerLink}>Italy</Link></li>
            <li><Link href={`/${locale}/germany`} style={footerLink}>Germany</Link></li>
            <li><Link href={`/${locale}/united-kingdom`} style={footerLink}>United Kingdom</Link></li>
            <li><Link href={`/${locale}/netherlands`} style={footerLink}>Netherlands</Link></li>
            <li><Link href={`/${locale}/turkey`} style={footerLink}>Turkey</Link></li>
          </ul>
        </nav>

        <div>
          <h3 style={colHeading}>{copy.contact}</h3>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
            <a href="mailto:contact@wheretostayeurope.com" style={footerLink}>contact@wheretostayeurope.com</a>
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1120,
          margin: "24px auto 0",
          paddingTop: 16,
          borderTop: "1px solid #e2e8f0",
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        {copy.copyright(year)}
      </div>
    </footer>
  );
}

const colHeading: React.CSSProperties = {
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: 1,
  color: "#64748b",
  margin: "0 0 10px",
  fontWeight: 600,
};

const list: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const footerLink: React.CSSProperties = {
  fontSize: 14,
  color: "#334155",
  textDecoration: "none",
};

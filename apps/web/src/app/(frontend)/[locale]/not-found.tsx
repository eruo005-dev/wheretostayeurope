// apps/web/src/app/(frontend)/[locale]/not-found.tsx
//
// Top-level locale-scoped 404. Catches any path under /[locale]/ that doesn't
// match a route. Includes the locale's prefix in the home/compare links.

import Link from "next/link";
import { headers } from "next/headers";

const COPY: Record<string, { head: string; body: string; home: string; compare: string; about: string }> = {
  en: {
    head: "Page not found",
    body: "The page you were looking for doesn't exist (or never did). Try a city, a comparison, or the homepage.",
    home: "Home",
    compare: "Browse comparisons",
    about: "About",
  },
  de: {
    head: "Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht. Versuche eine Stadt, einen Vergleich oder die Startseite.",
    home: "Startseite",
    compare: "Vergleiche",
    about: "Über uns",
  },
  fr: {
    head: "Page introuvable",
    body: "La page recherchée n'existe pas. Essayez une ville, une comparaison ou la page d'accueil.",
    home: "Accueil",
    compare: "Comparaisons",
    about: "À propos",
  },
  es: {
    head: "Página no encontrada",
    body: "La página que buscabas no existe. Prueba con una ciudad, una comparación o la portada.",
    home: "Inicio",
    compare: "Comparaciones",
    about: "Acerca de",
  },
};

export default async function LocaleNotFound() {
  // Read the locale set by middleware (so links carry the right prefix).
  // Falls back to "en" when middleware didn't run or the header is absent.
  const h = await headers();
  const localeRaw = h.get("x-wts-locale") ?? "en";
  const locale = (["en", "de", "fr", "es"].includes(localeRaw) ? localeRaw : "en") as keyof typeof COPY;
  const copy = COPY[locale];

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#94867a",
          margin: "0 0 12px",
        }}
      >
        404
      </p>
      <h1 style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 14px", fontWeight: 700, color: "#0f172a" }}>
        {copy.head}
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.55, color: "#334155", margin: "0 0 28px" }}>
        {copy.body}
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href={`/${locale}`}
          style={{
            background: "#0f172a",
            color: "#fff",
            padding: "11px 20px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {copy.home} →
        </Link>
        <Link
          href={`/${locale}/compare`}
          style={{
            border: "1px solid #cbd5e1",
            color: "#0f172a",
            padding: "11px 20px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {copy.compare}
        </Link>
        <Link
          href={`/${locale}/about`}
          style={{
            border: "1px solid #cbd5e1",
            color: "#0f172a",
            padding: "11px 20px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {copy.about}
        </Link>
      </div>
    </main>
  );
}

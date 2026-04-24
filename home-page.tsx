// apps/web/src/app/(frontend)/[locale]/page.tsx
//
// Locale homepage. Degrades gracefully while content is sparse:
// - If no cities have heroes yet → shows text-only country grid.
// - If no neighborhoods published yet → hides the "recent guides" section.
// - Always renders the hero + value prop + email capture.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/seo/config";
import {
  getHomeFeaturedCountries,
  getHomeFeaturedCities,
  getHomeRecentGuides,
} from "./queries";

type Props = { params: Promise<{ locale: "en" | "de" | "fr" | "es" }> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

const COPY: Record<string, {
  heroTitle: string; heroLead: string;
  pickCountry: string; featuredCities: string; recentGuides: string;
  emailTitle: string; emailLead: string; emailPlaceholder: string; emailCTA: string;
  howItWorks: string;
  howPoints: string[];
  viewGuide: string;
  cityCount: (n: number) => string;
}> = {
  en: {
    heroTitle: "Where to stay in Europe — by neighborhood, by trip type.",
    heroLead: "The decision layer for European accommodation. We don't compete with booking sites on booking. We tell you where to stay before you open one.",
    pickCountry: "Pick a country",
    featuredCities: "Where to stay, by city",
    recentGuides: "Latest neighborhood guides",
    emailTitle: "Planning a European trip?",
    emailLead: "Monthly email — one neighborhood guide, one honest pick, zero filler.",
    emailPlaceholder: "your@email.com",
    emailCTA: "Sign me up",
    howItWorks: "How this works",
    howPoints: [
      "Neighborhood-first. We don't tell you which hotel to book — we tell you which neighborhood to book in.",
      "Opinionated. Every guide says who should skip it, not just who should stay.",
      "Honest. We earn commission when you book through our links, never more money from the same room than booking direct.",
    ],
    viewGuide: "Read the guide",
    cityCount: (n) => `${n} ${n === 1 ? "city" : "cities"} covered`,
  },
  de: {
    heroTitle: "Wo übernachten in Europa — nach Viertel, nach Reiseart.",
    heroLead: "Die Entscheidungsebene für Unterkünfte in Europa. Wir konkurrieren nicht mit Buchungsseiten — wir sagen dir, wo du vorher übernachten sollst.",
    pickCountry: "Land wählen",
    featuredCities: "Unterkünfte nach Stadt",
    recentGuides: "Neueste Viertel-Guides",
    emailTitle: "Planst du eine Europa-Reise?",
    emailLead: "Monatlicher Newsletter — ein Viertel-Guide, ein ehrlicher Tipp, kein Füllstoff.",
    emailPlaceholder: "deine@email.com",
    emailCTA: "Anmelden",
    howItWorks: "So funktioniert's",
    howPoints: [
      "Viertelzentriert. Wir sagen dir nicht, welches Hotel zu buchen — sondern in welchem Viertel.",
      "Meinungsstark. Jeder Guide sagt, wer es überspringen sollte, nicht nur wer dort wohnen sollte.",
      "Ehrlich. Wir verdienen Provision, wenn du über uns buchst — nie mehr, als du direkt zahlen würdest.",
    ],
    viewGuide: "Guide lesen",
    cityCount: (n) => `${n} ${n === 1 ? "Stadt" : "Städte"} abgedeckt`,
  },
  fr: {
    heroTitle: "Où loger en Europe — par quartier, par type de voyage.",
    heroLead: "Le niveau de décision pour l'hébergement en Europe. Nous ne concurrençons pas les sites de réservation — nous vous disons où loger avant d'en ouvrir un.",
    pickCountry: "Choisir un pays",
    featuredCities: "Où loger, par ville",
    recentGuides: "Derniers guides de quartier",
    emailTitle: "Vous préparez un voyage en Europe ?",
    emailLead: "Newsletter mensuelle — un guide de quartier, un choix honnête, zéro remplissage.",
    emailPlaceholder: "votre@email.com",
    emailCTA: "Je m'inscris",
    howItWorks: "Comment ça marche",
    howPoints: [
      "Centré sur le quartier. On ne vous dit pas quel hôtel réserver — mais dans quel quartier.",
      "Opinionné. Chaque guide précise pour qui ce quartier n'est pas fait.",
      "Honnête. On touche une commission quand vous réservez via nos liens, jamais plus que le prix direct.",
    ],
    viewGuide: "Lire le guide",
    cityCount: (n) => `${n} ${n === 1 ? "ville" : "villes"} couvertes`,
  },
  es: {
    heroTitle: "Dónde alojarse en Europa — por barrio, por tipo de viaje.",
    heroLead: "La capa de decisión para alojamiento en Europa. No competimos con las webs de reserva — te decimos dónde alojarte antes de abrir una.",
    pickCountry: "Elige país",
    featuredCities: "Dónde alojarse, por ciudad",
    recentGuides: "Últimas guías de barrio",
    emailTitle: "¿Planeando un viaje por Europa?",
    emailLead: "Newsletter mensual — una guía de barrio, una elección honesta, sin relleno.",
    emailPlaceholder: "tu@email.com",
    emailCTA: "Apúntame",
    howItWorks: "Cómo funciona",
    howPoints: [
      "Centrado en el barrio. No te decimos qué hotel reservar — sino en qué barrio.",
      "Con criterio. Cada guía dice a quién no le conviene, no solo a quién sí.",
      "Honesto. Cobramos comisión cuando reservas por nuestros enlaces; nunca más que el precio directo.",
    ],
    viewGuide: "Leer la guía",
    cityCount: (n) => `${n} ${n === 1 ? "ciudad" : "ciudades"} cubiertas`,
  },
};

export const revalidate = 1800; // 30 min
export const dynamicParams = true;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;

  return {
    title: `${SITE_NAME} — ${copy.heroTitle}`,
    description: SITE_TAGLINE,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: buildHreflangTags({ path: "", locales: [...SUPPORTED_LOCALES] }),
    },
    openGraph: {
      title: SITE_NAME,
      description: copy.heroLead,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      type: "website",
      locale,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;

  const [countries, cities, guides] = await Promise.all([
    getHomeFeaturedCountries(locale),
    getHomeFeaturedCities(locale, 8),
    getHomeRecentGuides(locale, 6),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main>
        {/* Hero */}
        <section
          style={{
            padding: "56px 20px 40px",
            maxWidth: 960,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: "0 0 16px", fontWeight: 800 }}>
            {copy.heroTitle}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#475569", margin: "0 auto", maxWidth: 720 }}>
            {copy.heroLead}
          </p>
        </section>

        {/* How it works */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
          <h2 style={sectionHeading}>{copy.howItWorks}</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {copy.howPoints.map((point, i) => (
              <li key={i} style={{ padding: "14px 16px", background: "#f8fafc", borderRadius: 8, fontSize: 15, lineHeight: 1.55, color: "#334155" }}>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Countries grid */}
        {countries.length > 0 && (
          <section style={{ maxWidth: 960, margin: "0 auto", padding: "40px 20px 24px" }}>
            <h2 style={sectionHeading}>{copy.pickCountry}</h2>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {countries.map((c) => (
                <Link
                  key={c.id}
                  href={`/${locale}/${c.slug}`}
                  style={{
                    display: "block",
                    padding: "16px 18px",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <strong style={{ fontSize: 18 }}>{c.name}</strong>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                    {c.cityCount > 0 ? copy.cityCount(c.cityCount) : "Coming soon"}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured cities with imagery */}
        {cities.length > 0 && (
          <section style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
            <h2 style={sectionHeading}>{copy.featuredCities}</h2>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/${locale}/${city.countrySlug}/${city.slug}`}
                  style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0", background: "#fff" }}
                >
                  {city.heroUrl ? (
                    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
                      <Image
                        src={city.heroUrl}
                        alt={city.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div style={{ background: "#f1f5f9", aspectRatio: "4 / 3" }} aria-hidden="true" />
                  )}
                  <div style={{ padding: "12px 14px" }}>
                    <strong style={{ fontSize: 17 }}>{city.name}</strong>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{city.countryName}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recent guides — hidden when empty */}
        {guides.length > 0 && (
          <section style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
            <h2 style={sectionHeading}>{copy.recentGuides}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {guides.map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/${locale}/${g.countrySlug}/${g.citySlug}/${g.slug}`}
                    style={{ display: "block", padding: "14px 16px", borderRadius: 8, border: "1px solid #e2e8f0", textDecoration: "none", color: "inherit", background: "#fff" }}
                  >
                    <div style={{ fontSize: 13, color: "#64748b" }}>{g.citySlugName}</div>
                    <strong style={{ fontSize: 17 }}>Where to stay in {g.name}</strong>
                    {g.summary && (
                      <p style={{ margin: "6px 0 0", fontSize: 14, color: "#475569", lineHeight: 1.5 }}>
                        {g.summary.length > 180 ? `${g.summary.slice(0, 180)}…` : g.summary}
                      </p>
                    )}
                    <div style={{ marginTop: 8, fontSize: 13, color: "#2563eb" }}>{copy.viewGuide} →</div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Email capture */}
        <section style={{ background: "#f8fafc", padding: "40px 20px", marginTop: 48 }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 26, margin: "0 0 8px", fontWeight: 700 }}>{copy.emailTitle}</h2>
            <p style={{ margin: "0 0 20px", color: "#475569", fontSize: 16, lineHeight: 1.55 }}>{copy.emailLead}</p>
            <form
              action="/api/newsletter"
              method="post"
              style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
            >
              <input type="hidden" name="locale" value={locale} />
              <input
                type="email"
                name="email"
                required
                placeholder={copy.emailPlaceholder}
                aria-label={copy.emailPlaceholder}
                style={{ flex: "1 1 260px", padding: "12px 14px", fontSize: 15, borderRadius: 6, border: "1px solid #cbd5e1", background: "#fff" }}
              />
              <button
                type="submit"
                style={{ padding: "12px 20px", fontSize: 15, fontWeight: 600, borderRadius: 6, background: "#0f172a", color: "#fff", border: "none", cursor: "pointer" }}
              >
                {copy.emailCTA}
              </button>
            </form>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
              Double opt-in. Unsubscribe anytime. See <Link href={`/${locale}/legal/privacy`} style={{ color: "#94a3b8", textDecoration: "underline" }}>privacy policy</Link>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

const sectionHeading: React.CSSProperties = {
  fontSize: 26,
  margin: "0 0 16px",
  fontWeight: 700,
};

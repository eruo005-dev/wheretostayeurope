// apps/web/src/app/(frontend)/[locale]/page.tsx
//
// REPLACES the earlier home-page.tsx.
// Immersive travel-editorial homepage: full-bleed hero with photo, serif display
// typography (Fraunces), warm editorial palette, wider canvas, richer card grids.
//
// Typography requires next/font setup (see "Font setup" at bottom).
// Imagery assumes you have at least one hero image in the Media collection tagged
// entityType="generic", entityId="home-hero". Fallback: CSS-only gradient block.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/seo/config";
import { getAuthor } from "@/lib/author";
import {
  getHomeFeaturedCountries,
  getHomeFeaturedCities,
  getHomeRecentGuides,
} from "./queries";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";

type Props = { params: Promise<{ locale: "en" | "de" | "fr" | "es" }> };
const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

const COPY: Record<string, {
  eyebrow: string;
  heroHead1: string;
  heroHeadItalic: string;
  heroHead2: string;
  heroLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pickCountry: string;
  howLabel: string;
  how1Title: string; how1Body: string;
  how2Title: string; how2Body: string;
  how3Title: string; how3Body: string;
  featuredLabel: string;
  recentLabel: string;
  emailHead: string;
  emailLead: string;
  emailPh: string;
  emailCta: string;
  emailFine: string;
  byLabel: string;
  soloLabel: string;
  citiesSuffix: string;
  viewGuide: string;
  cityCount: (n: number) => string;
}> = {
  en: {
    eyebrow: "THE DECISION LAYER · EUROPEAN ACCOMMODATION",
    heroHead1: "Where to stay in Europe —",
    heroHeadItalic: "by neighborhood",
    heroHead2: ", by trip type.",
    heroLead: "We don't compete with booking sites on booking. We tell you where to stay before you open one.",
    ctaPrimary: "Start with Paris",
    ctaSecondary: "Browse countries",
    pickCountry: "Pick a country",
    howLabel: "How we pick neighborhoods",
    how1Title: "Who it's for", how1Body: "Trip type, price tier, walking radius, noise tolerance. Every variable Booking.com won't tell you.",
    how2Title: "Who should skip", how2Body: "Nobody else says this. We do, every page. If the neighborhood's wrong for your trip, we'll tell you.",
    how3Title: "What it costs", how3Body: "Live price band pulled from Booking. Honest estimate, no guesswork, no stale 2019 data.",
    featuredLabel: "Where to stay, by city",
    recentLabel: "Latest neighborhood guides",
    emailHead: "Planning a European trip?",
    emailLead: "Monthly email — one neighborhood guide, one honest pick, zero filler.",
    emailPh: "your@email.com",
    emailCta: "Sign me up",
    emailFine: "Double opt-in. Unsubscribe anytime.",
    byLabel: "Written by",
    soloLabel: "solo operator",
    citiesSuffix: "European cities personally",
    viewGuide: "Read the guide",
    cityCount: (n) => `${n} ${n === 1 ? "city" : "cities"} covered`,
  },
  de: {
    eyebrow: "DIE ENTSCHEIDUNGSEBENE · UNTERKÜNFTE IN EUROPA",
    heroHead1: "Wo übernachten in Europa —",
    heroHeadItalic: "nach Viertel",
    heroHead2: ", nach Reiseart.",
    heroLead: "Wir konkurrieren nicht mit Buchungsseiten. Wir sagen dir, wo du vorher übernachten sollst.",
    ctaPrimary: "Mit Paris beginnen",
    ctaSecondary: "Länder entdecken",
    pickCountry: "Land wählen",
    howLabel: "So wählen wir Viertel",
    how1Title: "Für wen", how1Body: "Reisetyp, Preisklasse, Fußweg, Ruhebedürfnis. Alles was Booking.com nicht sagt.",
    how2Title: "Wer es überspringen sollte", how2Body: "Niemand sonst sagt das. Wir tun es, auf jeder Seite.",
    how3Title: "Was es kostet", how3Body: "Live-Preisband direkt von Booking. Ehrliche Schätzung, keine veralteten Daten.",
    featuredLabel: "Unterkünfte nach Stadt",
    recentLabel: "Neueste Viertel-Guides",
    emailHead: "Planst du eine Europa-Reise?",
    emailLead: "Monatlicher Newsletter — ein Viertel-Guide, ein ehrlicher Tipp, kein Füllstoff.",
    emailPh: "deine@email.com",
    emailCta: "Anmelden",
    emailFine: "Double Opt-in. Jederzeit abbestellbar.",
    byLabel: "Geschrieben von",
    soloLabel: "Solo-Betreiber",
    citiesSuffix: "europäischen Städten persönlich",
    viewGuide: "Guide lesen",
    cityCount: (n) => `${n} ${n === 1 ? "Stadt" : "Städte"}`,
  },
  fr: {
    eyebrow: "LE NIVEAU DE DÉCISION · HÉBERGEMENT EN EUROPE",
    heroHead1: "Où loger en Europe —",
    heroHeadItalic: "par quartier",
    heroHead2: ", par type de voyage.",
    heroLead: "Nous ne concurrençons pas les sites de réservation. Nous vous disons où loger avant d'en ouvrir un.",
    ctaPrimary: "Commencer par Paris",
    ctaSecondary: "Parcourir les pays",
    pickCountry: "Choisir un pays",
    howLabel: "Comment nous choisissons",
    how1Title: "Pour qui", how1Body: "Type de voyage, prix, rayon de marche, tolérance au bruit. Tout ce que Booking ne dit pas.",
    how2Title: "Qui doit éviter", how2Body: "Personne d'autre ne le dit. Nous si, sur chaque page.",
    how3Title: "Combien ça coûte", how3Body: "Tarifs en direct de Booking. Estimation honnête, pas de données obsolètes.",
    featuredLabel: "Où loger, par ville",
    recentLabel: "Derniers guides de quartier",
    emailHead: "Vous préparez un voyage en Europe ?",
    emailLead: "Newsletter mensuelle — un guide de quartier, un choix honnête, zéro remplissage.",
    emailPh: "votre@email.com",
    emailCta: "Je m'inscris",
    emailFine: "Double opt-in. Désabonnement à tout moment.",
    byLabel: "Écrit par",
    soloLabel: "opérateur solo",
    citiesSuffix: "villes européennes personnellement",
    viewGuide: "Lire le guide",
    cityCount: (n) => `${n} ${n === 1 ? "ville" : "villes"}`,
  },
  es: {
    eyebrow: "LA CAPA DE DECISIÓN · ALOJAMIENTO EUROPEO",
    heroHead1: "Dónde alojarse en Europa —",
    heroHeadItalic: "por barrio",
    heroHead2: ", por tipo de viaje.",
    heroLead: "No competimos con las webs de reserva. Te decimos dónde alojarte antes de abrir una.",
    ctaPrimary: "Empezar por París",
    ctaSecondary: "Explorar países",
    pickCountry: "Elige país",
    howLabel: "Cómo elegimos barrios",
    how1Title: "Para quién", how1Body: "Tipo de viaje, precio, radio de caminata, tolerancia al ruido. Todo lo que Booking no dice.",
    how2Title: "A quién no le conviene", how2Body: "Nadie más lo dice. Nosotros sí, en cada página.",
    how3Title: "Cuánto cuesta", how3Body: "Rango de precios en vivo desde Booking. Estimación honesta, sin datos obsoletos.",
    featuredLabel: "Dónde alojarse, por ciudad",
    recentLabel: "Últimas guías de barrio",
    emailHead: "¿Planeando un viaje por Europa?",
    emailLead: "Newsletter mensual — una guía de barrio, una elección honesta, sin relleno.",
    emailPh: "tu@email.com",
    emailCta: "Apúntame",
    emailFine: "Doble opt-in. Cancela cuando quieras.",
    byLabel: "Escrito por",
    soloLabel: "operador en solitario",
    citiesSuffix: "ciudades europeas personalmente",
    viewGuide: "Leer la guía",
    cityCount: (n) => `${n} ${n === 1 ? "ciudad" : "ciudades"}`,
  },
};

async function getHomeHero(locale: string) {
  if (!process.env.DATABASE_URL) return null;
  let payload;
  try {
    payload = await getPayload({ config: payloadConfig });
  } catch { return null; }
  const res = await payload.find({
    collection: "media",
    where: {
      and: [
        { entityType: { equals: "generic" } },
        { entityId: { equals: "home-hero" } },
        { reviewStatus: { equals: "approved" } },
      ],
    },
    limit: 1,
    sort: "-createdAt",
    locale,
    fallbackLocale: "en",
  });
  const m = res.docs[0];
  if (!m?.url) return null;
  return {
    url: String(m.url),
    alt: String(m.altText ?? m.altTextBase ?? "European rooftops at dusk"),
    credit: (m.credit as string | null) ?? null,
    creditUrl: (m.creditUrl as string | null) ?? null,
    source: (m.source as string | null) ?? null,
  };
}

export const revalidate = 1800;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;
  return {
    title: `${SITE_NAME} — ${copy.heroHead1} ${copy.heroHeadItalic}${copy.heroHead2}`,
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

  const [countries, cities, guides, hero, author] = await Promise.all([
    getHomeFeaturedCountries(locale),
    getHomeFeaturedCities(locale, 8),
    getHomeRecentGuides(locale, 6),
    getHomeHero(locale),
    getAuthor(locale),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main className="wts-home">
        {/* ================= HERO ================= */}
        <section className="wts-hero">
          <div className="wts-hero__media" aria-hidden="true">
            {hero ? (
              <Image
                src={hero.url}
                alt={hero.alt}
                fill
                priority
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="wts-hero__fallback" />
            )}
            <div className="wts-hero__scrim" />
          </div>

          <div className="wts-hero__content">
            <p className="wts-eyebrow">{copy.eyebrow}</p>
            <h1 className="wts-display">
              {copy.heroHead1} <em className="wts-display--italic">{copy.heroHeadItalic}</em>{copy.heroHead2}
            </h1>
            <p className="wts-lead">{copy.heroLead}</p>
            <div className="wts-hero__ctas">
              <Link href={`/${locale}/france/paris`} className="wts-btn wts-btn--primary">
                {copy.ctaPrimary} →
              </Link>
              <a href="#countries" className="wts-btn wts-btn--ghost">
                {copy.ctaSecondary}
              </a>
            </div>
          </div>

          {hero?.credit && (
            <p className="wts-hero__credit">
              Photo: {hero.credit}
              {hero.source && hero.creditUrl && (
                <>
                  {" "}·{" "}
                  <a href={hero.creditUrl} target="_blank" rel="noopener">{hero.source}</a>
                </>
              )}
            </p>
          )}
        </section>

        {/* ================= COUNTRIES ================= */}
        {countries.length > 0 && (
          <section className="wts-section" id="countries">
            <h2 className="wts-section__head">{copy.pickCountry}</h2>
            <div className="wts-countries">
              {countries.map((c) => (
                <Link key={c.id} href={`/${locale}/${c.slug}`} className="wts-country">
                  <span className="wts-country__name">{c.name}</span>
                  <span className="wts-country__count">
                    {c.cityCount > 0 ? copy.cityCount(c.cityCount) : "Coming soon"}
                  </span>
                  <span className="wts-country__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= HOW WE PICK ================= */}
        <section className="wts-section wts-section--tinted">
          <p className="wts-kicker">{copy.howLabel}</p>
          <div className="wts-how">
            <div className="wts-how__card">
              <span className="wts-how__num">01</span>
              <h3 className="wts-how__title">{copy.how1Title}</h3>
              <p className="wts-how__body">{copy.how1Body}</p>
            </div>
            <div className="wts-how__card">
              <span className="wts-how__num">02</span>
              <h3 className="wts-how__title">{copy.how2Title}</h3>
              <p className="wts-how__body">{copy.how2Body}</p>
            </div>
            <div className="wts-how__card">
              <span className="wts-how__num">03</span>
              <h3 className="wts-how__title">{copy.how3Title}</h3>
              <p className="wts-how__body">{copy.how3Body}</p>
            </div>
          </div>
        </section>

        {/* ================= FEATURED CITIES ================= */}
        {cities.length > 0 && (
          <section className="wts-section">
            <h2 className="wts-section__head">{copy.featuredLabel}</h2>
            <div className="wts-cities">
              {cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/${locale}/${city.countrySlug}/${city.slug}`}
                  className="wts-city"
                >
                  <div className="wts-city__media">
                    {city.heroUrl ? (
                      <Image
                        src={city.heroUrl}
                        alt={city.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="wts-city__fallback" aria-hidden="true" />
                    )}
                  </div>
                  <div className="wts-city__meta">
                    <span className="wts-city__country">{city.countryName}</span>
                    <span className="wts-city__name">{city.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= RECENT GUIDES ================= */}
        {guides.length > 0 && (
          <section className="wts-section wts-section--tinted">
            <h2 className="wts-section__head">{copy.recentLabel}</h2>
            <div className="wts-guides">
              {guides.map((g) => (
                <Link
                  key={g.id}
                  href={`/${locale}/${g.countrySlug}/${g.citySlug}/${g.slug}`}
                  className="wts-guide"
                >
                  <div className="wts-guide__city">{g.citySlugName}</div>
                  <div className="wts-guide__name">Where to stay in {g.name}</div>
                  {g.summary && (
                    <p className="wts-guide__summary">
                      {g.summary.length > 180 ? `${g.summary.slice(0, 180)}…` : g.summary}
                    </p>
                  )}
                  <span className="wts-guide__link">{copy.viewGuide} →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= EMAIL ================= */}
        <section className="wts-email">
          <h2 className="wts-email__head">{copy.emailHead}</h2>
          <p className="wts-email__lead">{copy.emailLead}</p>
          <form action="/api/newsletter" method="post" className="wts-email__form">
            <input type="hidden" name="locale" value={locale} />
            <input
              type="email"
              name="email"
              required
              placeholder={copy.emailPh}
              aria-label={copy.emailPh}
              className="wts-email__input"
            />
            <button type="submit" className="wts-btn wts-btn--primary">
              {copy.emailCta}
            </button>
          </form>
          <p className="wts-email__fine">
            {copy.emailFine}{" "}
            <Link href={`/${locale}/legal/privacy`} className="wts-email__finelink">
              Privacy
            </Link>
          </p>
        </section>

        {/* ================= AUTHOR BAND ================= */}
        <section className="wts-author">
          {author.photoUrl ? (
            <div className="wts-author__photo">
              <Image
                src={author.photoUrl}
                alt={author.photoAlt ?? author.fullName}
                fill
                sizes="56px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="wts-author__photo wts-author__photo--placeholder" aria-hidden="true" />
          )}
          <div className="wts-author__meta">
            <span>
              {copy.byLabel}{" "}
              <Link href={`/${locale}/about`} className="wts-author__name">
                {author.displayName}
              </Link>
            </span>
            <span className="wts-author__sub">
              {copy.soloLabel}
              {author.citiesVisitedCount > 0 && (
                <> · {author.citiesVisitedCount} {copy.citiesSuffix}</>
              )}
            </span>
          </div>
        </section>
      </main>

      <style>{`
        .wts-home { font-family: var(--font-sans, system-ui, sans-serif); }

        /* ===== Typography ramps ===== */
        .wts-eyebrow {
          font-size: 12px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.75);
          margin: 0 0 16px;
        }
        .wts-display {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(40px, 7vw, 88px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          font-weight: 500;
          color: #fff;
          margin: 0 0 20px;
          max-width: 960px;
        }
        .wts-display--italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.82);
        }
        .wts-lead {
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.55;
          color: rgba(255,255,255,0.85);
          margin: 0 0 28px;
          max-width: 580px;
        }
        .wts-kicker {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94867a;
          margin: 0 0 20px;
        }
        .wts-section__head {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.15;
          margin: 0 0 32px;
          color: #1a1a1a;
        }

        /* ===== Buttons ===== */
        .wts-btn {
          display: inline-flex;
          align-items: center;
          padding: 13px 22px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: transform 0.15s, background-color 0.2s, border-color 0.2s;
          cursor: pointer;
          border: 1px solid transparent;
          font-family: inherit;
        }
        .wts-btn:hover { transform: translateY(-1px); }
        .wts-btn--primary { background: #1a1a1a; color: #fff; }
        .wts-btn--primary:hover { background: #333; }
        .wts-btn--ghost {
          background: rgba(255,255,255,0.08);
          color: #fff;
          backdrop-filter: blur(8px);
          border-color: rgba(255,255,255,0.4);
        }
        .wts-btn--ghost:hover { background: rgba(255,255,255,0.16); }

        /* ===== Hero ===== */
        .wts-hero {
          position: relative;
          min-height: 640px;
          padding: 88px 28px 120px;
          display: flex;
          align-items: center;
          overflow: hidden;
          isolation: isolate;
        }
        .wts-hero__media {
          position: absolute;
          inset: 0;
          z-index: -1;
        }
        .wts-hero__fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 30%, #3a2e24 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, #2d3e3a 0%, transparent 60%),
            #1a1a1a;
        }
        .wts-hero__scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%);
        }
        .wts-hero__content {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }
        .wts-hero__ctas {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .wts-hero__credit {
          position: absolute;
          bottom: 14px;
          right: 20px;
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }
        .wts-hero__credit a { color: inherit; text-decoration: underline; }

        /* ===== Sections ===== */
        .wts-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 28px;
        }
        .wts-section--tinted {
          background: #faf6f0;
          max-width: none;
          padding-left: 28px;
          padding-right: 28px;
        }
        .wts-section--tinted > * {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ===== Countries ===== */
        .wts-countries {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }
        .wts-country {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 22px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #ece6dc;
          text-decoration: none;
          color: #1a1a1a;
          min-height: 110px;
          transition: border-color 0.2s, transform 0.15s;
          position: relative;
        }
        .wts-country:hover { border-color: #1a1a1a; transform: translateY(-2px); }
        .wts-country__name {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 22px;
          font-weight: 500;
          line-height: 1.1;
        }
        .wts-country__count {
          font-size: 13px;
          color: #94867a;
          margin-top: auto;
        }
        .wts-country__arrow {
          position: absolute;
          bottom: 20px;
          right: 22px;
          font-size: 18px;
          color: #94867a;
          transition: transform 0.2s, color 0.2s;
        }
        .wts-country:hover .wts-country__arrow { transform: translateX(4px); color: #1a1a1a; }

        /* ===== How we pick ===== */
        .wts-how {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
        }
        .wts-how__card {
          padding: 0;
        }
        .wts-how__num {
          display: block;
          font-family: var(--font-serif, Georgia, serif);
          font-size: 56px;
          font-weight: 400;
          font-style: italic;
          color: #c7553a;
          line-height: 1;
          margin-bottom: 14px;
        }
        .wts-how__title {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 8px;
          color: #1a1a1a;
        }
        .wts-how__body {
          font-size: 15px;
          line-height: 1.65;
          color: #5a5248;
          margin: 0;
        }

        /* ===== Featured cities ===== */
        .wts-cities {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .wts-city {
          display: block;
          text-decoration: none;
          color: #1a1a1a;
        }
        .wts-city__media {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 14px;
          background: #ece6dc;
          transition: transform 0.4s;
        }
        .wts-city:hover .wts-city__media { transform: scale(1.015); }
        .wts-city__fallback {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ece6dc 0%, #d6ccbd 100%);
        }
        .wts-city__meta {
          display: flex;
          flex-direction: column;
          padding: 12px 2px 0;
        }
        .wts-city__country {
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94867a;
        }
        .wts-city__name {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 22px;
          font-weight: 500;
          margin-top: 4px;
        }

        /* ===== Recent guides ===== */
        .wts-guides {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .wts-guide {
          display: block;
          padding: 24px 26px;
          background: #fff;
          border-radius: 14px;
          border: 1px solid #ece6dc;
          text-decoration: none;
          color: #1a1a1a;
          transition: border-color 0.2s, transform 0.15s;
        }
        .wts-guide:hover { border-color: #1a1a1a; transform: translateY(-2px); }
        .wts-guide__city {
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94867a;
        }
        .wts-guide__name {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 22px;
          font-weight: 500;
          line-height: 1.2;
          margin-top: 6px;
        }
        .wts-guide__summary {
          font-size: 14px;
          line-height: 1.6;
          color: #5a5248;
          margin: 10px 0 14px;
        }
        .wts-guide__link {
          font-size: 13px;
          color: #c7553a;
          font-weight: 500;
        }

        /* ===== Email ===== */
        .wts-email {
          background: #1a1a1a;
          color: #fff;
          padding: 96px 28px;
          text-align: center;
        }
        .wts-email__head {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 500;
          letter-spacing: -0.01em;
          margin: 0 0 12px;
        }
        .wts-email__lead {
          font-size: 17px;
          line-height: 1.55;
          color: rgba(255,255,255,0.75);
          margin: 0 auto 28px;
          max-width: 520px;
        }
        .wts-email__form {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 520px;
          margin: 0 auto;
        }
        .wts-email__input {
          flex: 1 1 260px;
          min-width: 0;
          padding: 14px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .wts-email__input:focus {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.08);
        }
        .wts-email__input::placeholder { color: rgba(255,255,255,0.45); }
        .wts-email__fine {
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          margin: 18px 0 0;
        }
        .wts-email__finelink {
          color: rgba(255,255,255,0.7);
          text-decoration: underline;
        }

        /* ===== Author band ===== */
        .wts-author {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 28px 72px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .wts-author__photo {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          background: #ece6dc;
          flex-shrink: 0;
        }
        .wts-author__photo--placeholder {
          background: linear-gradient(135deg, #ece6dc 0%, #d6ccbd 100%);
        }
        .wts-author__meta {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          color: #5a5248;
          line-height: 1.5;
        }
        .wts-author__name {
          color: #1a1a1a;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid #c7553a;
        }
        .wts-author__sub {
          font-size: 13px;
          color: #94867a;
        }

        @media (max-width: 640px) {
          .wts-hero { padding: 64px 20px 88px; min-height: 560px; }
          .wts-section { padding: 56px 20px; }
          .wts-section--tinted { padding-left: 20px; padding-right: 20px; }
          .wts-email { padding: 72px 20px; }
          .wts-author { padding: 32px 20px 56px; }
        }
      `}</style>
    </>
  );
}

/* =============================================================================
   Font setup — add these lines to apps/web/src/app/(frontend)/[locale]/layout.tsx

     import { Fraunces, Inter } from "next/font/google";

     const fraunces = Fraunces({
       subsets: ["latin"],
       display: "swap",
       variable: "--font-serif",
       weight: ["400", "500"],
       style: ["normal", "italic"],
     });
     const inter = Inter({
       subsets: ["latin"],
       display: "swap",
       variable: "--font-sans",
       weight: ["400", "500"],
     });

   Then on the <html> tag:
     <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>

   This populates var(--font-serif) and var(--font-sans) used throughout.
   ============================================================================= */

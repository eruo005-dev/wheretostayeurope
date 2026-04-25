// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/hotels-for-[tripType]/page.tsx
//
// Tier 3 programmatic route: "top-rated [neighborhood] hotels for [tripType]"
// Next.js parses the directory name `hotels-for-[tripType]` so `tripType` is a
// route param. The literal "hotels-for-" prefix keeps the URL human-readable.
//
// Ships only when the neighborhood has ≥ 12 matching properties for the trip
// type. Thin-match combinations 404 → parent neighborhood page.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { AffiliateDisclosureBanner, AffiliateDisclosureBlock } from "@/components/legal/AffiliateDisclosure";
import { PriceDisclaimerBlock } from "@/components/legal/PriceDisclaimer";
import { PriceBandHistogram } from "@/components/visualizations/PriceBandHistogram";
import { PropertyCard } from "@/components/affiliate/PropertyCard";

import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL } from "@/lib/seo/config";
import {
  VALID_TRIP_TYPES,
  isTripType,
  resolveTier3Context,
  getTier3Properties,
  getTier3PriceDistribution,
  hasEnoughPropertiesForTier3,
  type TripType,
} from "./queries";

type RouteParams = {
  locale: "en" | "de" | "fr" | "es";
  country: string;
  city: string;
  neighborhood: string;
  tripType: string;
};

type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  // No pre-rendering at build — Tier 3 combinatorial fan-out is too large.
  // ISR + on-demand revalidation cover this.
  return [];
}

const TRIP_TYPE_COPY: Record<string, Record<TripType, { title: string; label: string }>> = {
  en: {
    couples: { title: "for couples", label: "couples" },
    families: { title: "for families with kids", label: "families" },
    solo: { title: "for solo travelers", label: "solo travelers" },
    business: { title: "for business travelers", label: "business travelers" },
    luxury: { title: "for luxury travelers", label: "luxury travelers" },
    budget: { title: "on a budget", label: "budget travelers" },
    "digital-nomads": { title: "for digital nomads", label: "digital nomads" },
    "first-timers": { title: "for first-time visitors", label: "first-time visitors" },
  },
  de: {
    couples: { title: "für Paare", label: "Paare" },
    families: { title: "für Familien mit Kindern", label: "Familien" },
    solo: { title: "für Solo-Reisende", label: "Solo-Reisende" },
    business: { title: "für Geschäftsreisende", label: "Geschäftsreisende" },
    luxury: { title: "für Luxusreisende", label: "Luxusreisende" },
    budget: { title: "mit kleinem Budget", label: "Sparreisende" },
    "digital-nomads": { title: "für digitale Nomaden", label: "digitale Nomaden" },
    "first-timers": { title: "für Erstbesucher", label: "Erstbesucher" },
  },
  fr: {
    couples: { title: "pour les couples", label: "couples" },
    families: { title: "pour les familles avec enfants", label: "familles" },
    solo: { title: "pour les voyageurs solo", label: "voyageurs solo" },
    business: { title: "pour les voyageurs d'affaires", label: "voyageurs d'affaires" },
    luxury: { title: "pour les voyageurs de luxe", label: "voyageurs de luxe" },
    budget: { title: "pour petit budget", label: "voyageurs à petit budget" },
    "digital-nomads": { title: "pour nomades numériques", label: "nomades numériques" },
    "first-timers": { title: "pour première visite", label: "premiers visiteurs" },
  },
  es: {
    couples: { title: "para parejas", label: "parejas" },
    families: { title: "para familias con niños", label: "familias" },
    solo: { title: "para viajeros solos", label: "viajeros solos" },
    business: { title: "para viajeros de negocios", label: "viajeros de negocios" },
    luxury: { title: "para viajeros de lujo", label: "viajeros de lujo" },
    budget: { title: "con presupuesto ajustado", label: "viajeros con presupuesto" },
    "digital-nomads": { title: "para nómadas digitales", label: "nómadas digitales" },
    "first-timers": { title: "para primera visita", label: "primeros visitantes" },
  },
};

const INTRO_COPY: Record<string, (n: string, c: string, l: string, count: number) => string> = {
  en: (n, c, l, count) =>
    `${count} top-rated places to stay in ${n}, ${c}, filtered for ${l}. Based on current review scores from Booking.com and matched against ${n}'s specific fit — we only include properties that make sense for this kind of trip.`,
  de: (n, c, l, count) =>
    `${count} bestbewertete Unterkünfte in ${n}, ${c}, gefiltert für ${l}. Aktuelle Bewertungen von Booking.com, abgeglichen mit dem spezifischen Profil von ${n} — nur Unterkünfte, die für diese Art von Reise passen.`,
  fr: (n, c, l, count) =>
    `${count} hébergements les mieux notés à ${n}, ${c}, filtrés pour les ${l}. Basé sur les notes actuelles de Booking.com et sur l'adéquation à ${n} — uniquement les établissements pertinents pour ce type de voyage.`,
  es: (n, c, l, count) =>
    `${count} alojamientos mejor valorados en ${n}, ${c}, filtrados para ${l}. Basado en las valoraciones actuales de Booking.com y en la compatibilidad con ${n} — solo alojamientos que tienen sentido para este tipo de viaje.`,
};

const OUTRO_COPY: Record<string, (n: string, l: string) => string> = {
  en: (n, l) =>
    `Not convinced ${n} is the right neighborhood for ${l}? Check the full guide below — it's honest about who should skip this area, not just who should stay.`,
  de: (n, l) =>
    `Nicht überzeugt, dass ${n} das richtige Viertel für ${l} ist? Der ausführliche Guide unten sagt dir auch, wer es überspringen sollte — nicht nur wer dort wohnen sollte.`,
  fr: (n, l) =>
    `Vous n'êtes pas sûr que ${n} soit le bon quartier pour les ${l} ? Le guide complet ci-dessous précise aussi pour qui ce quartier n'est pas fait.`,
  es: (n, l) =>
    `¿No estás seguro de que ${n} sea el barrio adecuado para ${l}? La guía completa abajo también dice a quién no le conviene este barrio.`,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city, neighborhood, tripType } = await params;
  if (!isTripType(tripType)) return { title: "Not found" };

  const ctx = await resolveTier3Context({ countrySlug: country, citySlug: city, neighborhoodSlug: neighborhood, locale });
  if (!ctx) return { title: "Not found" };

  const copy = TRIP_TYPE_COPY[locale]?.[tripType] ?? TRIP_TYPE_COPY.en[tripType];
  const title = `Top hotels in ${ctx.neighborhoodName} ${copy.title} — ${ctx.cityName}`;
  const description = `Current top-rated places to stay in ${ctx.neighborhoodName}, ${ctx.cityName}, picked specifically ${copy.title}. Review scores, prices, and neighborhood fit.`;

  const path = `${country}/${city}/${neighborhood}/hotels-for-${tripType}`;
  const canonical = `${SITE_URL}/${locale}/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildHreflangTags({ path, locales: [...SUPPORTED_LOCALES] }),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Tier3Page({ params }: Props) {
  const { locale, country, city, neighborhood, tripType } = await params;

  if (!isTripType(tripType)) notFound();

  const ctx = await resolveTier3Context({
    countrySlug: country,
    citySlug: city,
    neighborhoodSlug: neighborhood,
    locale,
  });
  if (!ctx) notFound();

  // Thin-match guard — if fewer than 12 matching properties, don't ship this page
  const hasEnough = await hasEnoughPropertiesForTier3({
    neighborhoodId: ctx.neighborhoodId,
    tripType,
  });
  if (!hasEnough) notFound();

  const [properties, priceDistribution] = await Promise.all([
    getTier3Properties({ neighborhoodId: ctx.neighborhoodId, tripType, locale, limit: 15 }),
    getTier3PriceDistribution({ neighborhoodId: ctx.neighborhoodId, tripType }),
  ]);

  const copy = TRIP_TYPE_COPY[locale]?.[tripType] ?? TRIP_TYPE_COPY.en[tripType];
  const intro = (INTRO_COPY[locale] ?? INTRO_COPY.en)(
    ctx.neighborhoodName,
    ctx.cityName,
    copy.label,
    properties.length
  );
  const outro = (OUTRO_COPY[locale] ?? OUTRO_COPY.en)(ctx.neighborhoodName, copy.label);

  const breadcrumbs = [
    { name: ctx.countryName, url: `/${locale}/${country}` },
    { name: ctx.cityName, url: `/${locale}/${country}/${city}` },
    { name: ctx.neighborhoodName, url: `/${locale}/${country}/${city}/${neighborhood}` },
    {
      name: `${ctx.neighborhoodName} ${copy.title}`,
      url: `/${locale}/${country}/${city}/${neighborhood}/hotels-for-${tripType}`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.url}`,
        })),
      },
      {
        "@type": "ItemList",
        name: `Top hotels in ${ctx.neighborhoodName} ${copy.title}`,
        numberOfItems: properties.length,
        itemListElement: properties.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Hotel",
            name: p.name,
            aggregateRating: p.reviewScore
              ? {
                  "@type": "AggregateRating",
                  ratingValue: p.reviewScore,
                  reviewCount: p.reviewCount ?? 0,
                  bestRating: 10,
                }
              : undefined,
            priceRange: p.priceBand ?? undefined,
            starRating: p.starRating
              ? { "@type": "Rating", ratingValue: p.starRating }
              : undefined,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <AffiliateDisclosureBanner locale={locale} />

      <article style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
        <Breadcrumb items={breadcrumbs} />

        <header>
          <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: "12px 0 10px", fontWeight: 700 }}>
            Top-rated {ctx.neighborhoodName} hotels {copy.title}
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
            {ctx.cityName}, {ctx.countryName}
          </p>
        </header>

        <p style={{ fontSize: 17, lineHeight: 1.55, color: "#334155", margin: "20px 0" }}>
          {intro}
        </p>

        <AffiliateDisclosureBlock locale={locale} />

        {Object.values(priceDistribution).some((v) => v > 0) && (
          <section style={{ marginTop: 16 }}>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
              Price distribution across these {properties.length} properties:
            </p>
            <PriceBandHistogram counts={priceDistribution} compact locale={locale} />
          </section>
        )}

        <section style={{ marginTop: 24 }}>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                locale={locale}
                pageId={ctx.neighborhoodId}
                pageType="property_shortlist"
              />
            ))}
          </div>

          <PriceDisclaimerBlock locale={locale} />
        </section>

        <section style={{ marginTop: 40, padding: "20px", background: "#f8fafc", borderRadius: 8 }}>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#334155", margin: 0 }}>
            {outro}
          </p>
          <Link
            href={`/${locale}/${country}/${city}/${neighborhood}`}
            style={{
              display: "inline-block",
              marginTop: 12,
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Full {ctx.neighborhoodName} guide →
          </Link>
        </section>

        {/* Cross-links to other trip-type pages for the same neighborhood (internal link equity) */}
        <section style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: 18, marginBottom: 12 }}>
            Other trip types in {ctx.neighborhoodName}
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {VALID_TRIP_TYPES.filter((t) => t !== tripType).map((t) => {
              const otherCopy = TRIP_TYPE_COPY[locale]?.[t] ?? TRIP_TYPE_COPY.en[t];
              return (
                <li key={t}>
                  <Link
                    href={`/${locale}/${country}/${city}/${neighborhood}/hotels-for-${t}`}
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: "1px solid #e2e8f0",
                      color: "#334155",
                      textDecoration: "none",
                      fontSize: 13,
                    }}
                  >
                    {otherCopy.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
    </>
  );
}

function Breadcrumb({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "#64748b" }}>
      {items.map((item, i) => (
        <span key={item.url}>
          {i > 0 && <span aria-hidden="true"> › </span>}
          {i === items.length - 1 ? (
            <span aria-current="page" style={{ color: "#334155" }}>{item.name}</span>
          ) : (
            <Link href={item.url} style={{ color: "#64748b", textDecoration: "none" }}>
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/page.tsx
//
// Neighborhood deep-dive page — the integration surface.
// Pulls:
//   - Editorial fields + related media from Payload
//   - Top properties + price-band distribution from the external `properties` table (raw pg)
//   - Consent state from the Klaro cookie (server-side)
//   - Neighborhood polygons for the Mapbox map
//
// Renders:
//   - Breadcrumb + JSON-LD (BreadcrumbList, TouristDestination)
//   - Hero image with UGC attribution
//   - Editorial body sections (Who it's for / Who should skip / Stay tips)
//   - Consent-aware interactive map
//   - Price-band histogram (compact)
//   - Top-12 property grid with Booking affiliate CTAs
//   - PriceDisclaimerBlock
//   - Related neighborhoods
//   - Mandatory AffiliateDisclosureBanner + AffiliateDisclosureBlock

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// AffiliateDisclosureBanner is rendered globally by [locale]/layout.tsx
import { AffiliateDisclosureBlock } from "@/components/legal/AffiliateDisclosure";
import { TiqetsToursWidget } from "@/components/affiliate/TiqetsToursWidget";
import { PriceDisclaimerBlock } from "@/components/legal/PriceDisclaimer";
import { NeighborhoodMap } from "@/components/maps/NeighborhoodMap";
import { PriceBandHistogram } from "@/components/visualizations/PriceBandHistogram";
import { PropertyCard } from "@/components/affiliate/PropertyCard";

import { getConsent } from "@/lib/consent";
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL } from "@/lib/seo/config";
import { comparisonsInvolvingNeighborhood } from "@/lib/data/static-data-comparisons";
import {
  getNeighborhoodBySlug,
  getCityWithCountry,
  getPropertiesByNeighborhood,
  getPriceBandDistribution,
  getRelatedNeighborhoods,
  getAllPublishedNeighborhoodPaths,
} from "./queries";

type RouteParams = {
  locale: "en" | "de" | "fr" | "es";
  country: string;
  city: string;
  neighborhood: string;
};

type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

// ISR: revalidate every hour; on-demand revalidation fires from n8n Booking sync.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  // At build time: generate only the Tier-1 city neighborhoods (Paris, Porto, Valencia,
  // Istanbul, Rome, Barcelona, Amsterdam, London, Berlin, Madrid). Everything else is
  // generated on-demand via ISR when first requested.
  const all = await getAllPublishedNeighborhoodPaths();
  const tier1Cities = new Set([
    "paris", "porto", "valencia", "istanbul",
    "rome", "barcelona", "amsterdam", "london", "berlin", "madrid",
  ]);
  return all.filter((p) => tier1Cities.has(p.city));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city, neighborhood } = await params;

  const n = await getNeighborhoodBySlug({
    citySlug: city,
    countrySlug: country,
    neighborhoodSlug: neighborhood,
    locale,
  });
  if (!n) return { title: "Not found" };

  const title = n.metaTitle ?? `Where to Stay in ${n.name}, ${n.cityName}`;
  const description =
    n.metaDescription ??
    n.summary?.slice(0, 155) ??
    `Honest guide to ${n.name} in ${n.cityName} — who should stay there, who should skip, and top-rated hotels.`;

  const path = `${country}/${city}/${neighborhood}`;
  const canonical = `${SITE_URL}/${locale}/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildHreflangTags({
        path,
        locales: [...SUPPORTED_LOCALES],
      }),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale,
      images: n.heroImage ? [{ url: n.heroImage.url, alt: n.heroImage.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: n.heroImage ? [n.heroImage.url] : undefined,
    },
  };
}

export default async function NeighborhoodPage({ params }: Props) {
  const { locale, country, city, neighborhood } = await params;

  const n = await getNeighborhoodBySlug({
    citySlug: city,
    countrySlug: country,
    neighborhoodSlug: neighborhood,
    locale,
  });
  if (!n) notFound();

  const [cityData, properties, priceDistribution, related, consent] = await Promise.all([
    getCityWithCountry({ citySlug: city, countrySlug: country, locale }),
    getPropertiesByNeighborhood({ neighborhoodId: n.id, locale, limit: 12 }),
    getPriceBandDistribution({ neighborhoodId: n.id }),
    getRelatedNeighborhoods({ cityId: n.cityId, excludeId: n.id, locale, limit: 5 }),
    getConsent(),
  ]);
  if (!cityData) notFound();

  const neighborhoodComparisons = comparisonsInvolvingNeighborhood(city, n.slug);

  // Breadcrumb trail
  const breadcrumbs = [
    { name: cityData.countryName, url: `/${locale}/${country}` },
    { name: cityData.name, url: `/${locale}/${country}/${city}` },
    { name: n.name, url: `/${locale}/${country}/${city}/${neighborhood}` },
  ];

  // JSON-LD schema (BreadcrumbList + TouristDestination, FAQ omitted until FAQ section added)
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
        "@type": "TouristDestination",
        name: `${n.name}, ${cityData.name}`,
        description: n.summary ?? undefined,
        url: `${SITE_URL}/${locale}/${country}/${city}/${neighborhood}`,
        geo:
          n.lat && n.lng
            ? { "@type": "GeoCoordinates", latitude: n.lat, longitude: n.lng }
            : undefined,
        touristType: n.tripTypeFit,
        containedInPlace: {
          "@type": "City",
          name: cityData.name,
          address: { "@type": "PostalAddress", addressCountry: cityData.countryName },
        },
      },
    ],
  };

  // Build polygon set for the map: this neighborhood + its siblings
  const mapNeighborhoods = [n, ...related]
    .filter((x) => x.polygonGeojson)
    .map((x) => ({
      name: x.name,
      slug: x.slug,
      polygon: x.polygonGeojson as GeoJSON.Polygon,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
        <Breadcrumb items={breadcrumbs} />

        <header>
          <h1 style={{ fontSize: 38, lineHeight: 1.1, margin: "12px 0 8px", fontWeight: 700 }}>
            Where to Stay in {n.name}, {cityData.name}
          </h1>
          {n.summary && (
            <p style={{ fontSize: 19, lineHeight: 1.55, color: "#334155", marginBottom: 20 }}>
              {n.summary}
            </p>
          )}
        </header>

        {n.heroImage && n.heroImage.url && (
          <figure style={{ margin: "16px 0 24px" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <Image
                src={n.heroImage.url}
                alt={n.heroImage.alt}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 960px"
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </div>
            {n.heroImage.credit && (
              <figcaption style={{ fontSize: 12, color: "#64748b", marginTop: 6, textAlign: "right" }}>
                Photo: {n.heroImage.credit}
                {n.heroImage.source && (
                  <>
                    {" "}· via{" "}
                    {n.heroImage.creditUrl ? (
                      <a
                        href={n.heroImage.creditUrl}
                        target="_blank"
                        rel="noopener"
                        style={{ color: "#64748b", textDecoration: "underline" }}
                      >
                        {n.heroImage.source}
                      </a>
                    ) : (
                      n.heroImage.source
                    )}
                  </>
                )}
              </figcaption>
            )}
          </figure>
        )}

        <AffiliateDisclosureBlock locale={locale} />

        {n.whoItsFor && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>Who {n.name} is for</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#1e293b" }}>{n.whoItsFor}</p>
          </section>
        )}

        {n.whoShouldSkip && (
          <section style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>Who should skip it</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#1e293b" }}>{n.whoShouldSkip}</p>
          </section>
        )}

        {mapNeighborhoods.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 26, marginBottom: 12 }}>
              {n.name} on the map
            </h2>
            <NeighborhoodMap
              cityCenter={[cityData.lng, cityData.lat]}
              neighborhoods={mapNeighborhoods}
              highlightedSlug={n.slug}
              height={420}
              hasConsent={consent.maps}
            />
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
              {n.nearestMetro.length > 0 && (
                <>Nearest metro: {n.nearestMetro.join(", ")} · </>
              )}
              {n.walkabilityScore != null && <>Walkability: {n.walkabilityScore}/10 · </>}
              {n.safetyScore != null && <>Perceived safety: {n.safetyScore}/10</>}
            </p>
          </section>
        )}

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 26, marginBottom: 8 }}>
            Top-rated places to stay in {n.name}
          </h2>

          {Object.values(priceDistribution).some((v) => v > 0) && (
            <>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
                Price distribution across {Object.values(priceDistribution).reduce((a, b) => a + b, 0)} current properties:
              </p>
              <PriceBandHistogram counts={priceDistribution} compact locale={locale} />
            </>
          )}

          {properties.length === 0 ? (
            <p style={{ marginTop: 16, color: "#64748b" }}>
              No matching properties available right now. Check back after the next sync.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                marginTop: 20,
              }}
            >
              {properties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  locale={locale}
                  pageSlug={n.slug}
                  pageType="neighborhood"
                />
              ))}
            </div>
          )}

          <PriceDisclaimerBlock locale={locale} />
        </section>

        <TiqetsToursWidget
          cityName={cityData.name}
          citySlug={city}
          neighborhoodSlug={n.slug}
          locale={locale}
        />

        {n.stayTips && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>Stay tips</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "#1e293b" }}>{n.stayTips}</p>
          </section>
        )}

        {neighborhoodComparisons.length > 0 && (
          <section style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 22, marginBottom: 12 }}>
              {n.name} compared to other {cityData.name} neighborhoods
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 0, marginBottom: 14 }}>
              Round-by-round head-to-heads — atmosphere, walkability, price, sleep quality.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {neighborhoodComparisons.map((c) => {
                // Show the *other* neighborhood as the primary label.
                const otherLabel = c.aSlug === n.slug ? c.bLabel : c.aLabel;
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/${locale}/${country}/${city}/compare/${c.slug}`}
                      style={{
                        display: "block",
                        padding: "12px 14px",
                        borderRadius: 8,
                        background: "#fff7ed",
                        border: "1px solid #fed7aa",
                        textDecoration: "none",
                        color: "#0f172a",
                      }}
                    >
                      <strong style={{ fontSize: 15 }}>
                        {n.name} <span style={{ color: "#94867a", fontWeight: 400 }}>vs</span> {otherLabel}
                      </strong>
                      <div style={{ fontSize: 13, color: "#9a3412", marginTop: 4 }}>
                        Read the verdict →
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 22, marginBottom: 12 }}>
              Other {cityData.name} neighborhoods worth knowing
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/${locale}/${country}/${city}/${r.slug}`}
                    style={{ textDecoration: "none", color: "#0f172a" }}
                  >
                    <strong style={{ fontSize: 16 }}>{r.name}</strong>
                    {r.summary && (
                      <div style={{ fontSize: 14, color: "#475569", marginTop: 2, lineHeight: 1.5 }}>
                        {r.summary.length > 140 ? `${r.summary.slice(0, 140)}…` : r.summary}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}

function Breadcrumb({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#64748b" }}>
      {items.map((item, i) => (
        <span key={item.url}>
          {i > 0 && <span aria-hidden="true"> › </span>}
          {i === items.length - 1 ? (
            <span aria-current="page" style={{ color: "#334155" }}>
              {item.name}
            </span>
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

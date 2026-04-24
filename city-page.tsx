// apps/web/src/app/(frontend)/[locale]/[country]/[city]/page.tsx
//
// City pillar page — the editorial flagship and SEO primary for queries like
// "where to stay in paris". Reuses 80% of the neighborhood page pattern.
//
// Structure:
//   - Hero + editorial intro (Lexical rich text from Payload)
//   - Neighborhood cheat sheet (list of all mapped neighborhoods with vibe/price)
//   - City-wide map with all neighborhoods outlined
//   - "Top-rated places to stay in [City]" — city-wide property shortlist
//   - Editorial sections: when to visit, getting around, safety (localized strings)
//   - Related trip-type pages (trip_type_city pages linking out)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { AffiliateDisclosureBanner, AffiliateDisclosureBlock } from "@/components/legal/AffiliateDisclosure";
import { PriceDisclaimerBlock } from "@/components/legal/PriceDisclaimer";
import { NeighborhoodMap } from "@/components/maps/NeighborhoodMap";
import { PriceBandHistogram } from "@/components/visualizations/PriceBandHistogram";
import { PropertyCard } from "@/components/affiliate/PropertyCard";
import { LexicalRenderer } from "@/components/content/LexicalRenderer";

import { getConsent } from "@/lib/consent";
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL } from "@/lib/seo/config";
import {
  getCityBySlug,
  getCityNeighborhoods,
  getCityTopProperties,
  getCityPriceDistribution,
  getAllPublishedCityPaths,
} from "./queries";

type RouteParams = {
  locale: "en" | "de" | "fr" | "es";
  country: string;
  city: string;
};

type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Every mapped city + locale combination is pre-rendered at build time —
  // there are far fewer cities than neighborhoods, so this is affordable.
  return getAllPublishedCityPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city } = await params;

  const c = await getCityBySlug({ countrySlug: country, citySlug: city, locale });
  if (!c) return { title: "Not found" };

  const title = c.metaTitle ?? `Where to Stay in ${c.name}: Neighborhood Guide by Trip Type`;
  const description =
    c.metaDescription ??
    `Honest guide to the ${c.name} neighborhoods worth considering — what each is like, who should stay there, and who should skip. Picked by trip type.`;

  const path = `${country}/${city}`;
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
      images: c.heroImage ? [{ url: c.heroImage.url, alt: c.heroImage.alt }] : undefined,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, country, city } = await params;

  const c = await getCityBySlug({ countrySlug: country, citySlug: city, locale });
  if (!c) notFound();

  const [neighborhoods, topProperties, priceDistribution, consent] = await Promise.all([
    getCityNeighborhoods({ cityId: c.id, locale }),
    getCityTopProperties({ cityId: c.id, locale, limit: 8 }),
    getCityPriceDistribution({ cityId: c.id }),
    getConsent(),
  ]);

  const breadcrumbs = [
    { name: c.countryName, url: `/${locale}/${country}` },
    { name: c.name, url: `/${locale}/${country}/${city}` },
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
        "@type": "TouristDestination",
        name: c.name,
        url: `${SITE_URL}/${locale}/${country}/${city}`,
        description: c.metaDescription ?? undefined,
        geo: c.lat && c.lng ? { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng } : undefined,
        containedInPlace: { "@type": "Country", name: c.countryName },
        containsPlace: neighborhoods.slice(0, 10).map((n) => ({
          "@type": "LandmarksOrHistoricalBuildings",
          name: n.name,
          url: `${SITE_URL}/${locale}/${country}/${city}/${n.slug}`,
        })),
      },
    ],
  };

  const mapNeighborhoods = neighborhoods
    .filter((n) => n.polygonGeojson)
    .map((n) => ({ name: n.name, slug: n.slug, polygon: n.polygonGeojson as GeoJSON.Polygon }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <AffiliateDisclosureBanner locale={locale} />

      <article style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
        <Breadcrumb items={breadcrumbs} />

        <header>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: "12px 0 12px", fontWeight: 700 }}>
            Where to Stay in {c.name}: Neighborhood Guide by Trip Type
          </h1>
        </header>

        {c.heroImage && c.heroImage.url && (
          <figure style={{ margin: "12px 0 24px" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <Image
                src={c.heroImage.url}
                alt={c.heroImage.alt}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 960px"
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </div>
            {c.heroImage.credit && (
              <figcaption style={{ fontSize: 12, color: "#64748b", marginTop: 6, textAlign: "right" }}>
                Photo: {c.heroImage.credit}
                {c.heroImage.source && (
                  <>
                    {" "}· via{" "}
                    {c.heroImage.creditUrl ? (
                      <a href={c.heroImage.creditUrl} target="_blank" rel="noopener" style={{ color: "#64748b", textDecoration: "underline" }}>
                        {c.heroImage.source}
                      </a>
                    ) : (
                      c.heroImage.source
                    )}
                  </>
                )}
              </figcaption>
            )}
          </figure>
        )}

        <AffiliateDisclosureBlock locale={locale} />

        <LexicalRenderer
          data={c.introHtml}
          locale={locale}
          className="wts-prose"
        />

        {neighborhoods.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 28, marginBottom: 14 }}>
              The {c.name} neighborhood cheat sheet
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={th}>Neighborhood</th>
                    <th style={th}>Vibe</th>
                    <th style={th}>Best for</th>
                    <th style={th}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {neighborhoods.map((n) => (
                    <tr key={n.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={td}>
                        <Link
                          href={`/${locale}/${country}/${city}/${n.slug}`}
                          style={{ color: "#0f172a", textDecoration: "none", fontWeight: 600 }}
                        >
                          {n.name}
                        </Link>
                      </td>
                      <td style={td}>{n.vibeTags.slice(0, 3).join(", ") || "—"}</td>
                      <td style={td}>{n.tripTypeFit.slice(0, 2).join(", ") || "—"}</td>
                      <td style={td}>{n.priceTier ? "$".repeat(n.priceTier) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {mapNeighborhoods.length > 0 && c.lat != null && c.lng != null && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>{c.name} on the map</h2>
            <NeighborhoodMap
              cityCenter={[c.lng, c.lat]}
              neighborhoods={mapNeighborhoods}
              height={480}
              hasConsent={consent.maps}
            />
          </section>
        )}

        {neighborhoods.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 28, marginBottom: 14 }}>
              The {c.name} neighborhoods worth considering
            </h2>
            <div style={{ display: "grid", gap: 16 }}>
              {neighborhoods.map((n) => (
                <Link
                  key={n.id}
                  href={`/${locale}/${country}/${city}/${n.slug}`}
                  style={{
                    display: "block",
                    padding: "14px 18px",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                    <strong style={{ fontSize: 18 }}>{n.name}</strong>
                    {n.priceTier && <span style={{ color: "#64748b", fontSize: 14 }}>{"$".repeat(n.priceTier)}</span>}
                  </div>
                  {n.summary && (
                    <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: "#475569" }}>
                      {n.summary.length > 240 ? `${n.summary.slice(0, 240)}…` : n.summary}
                    </p>
                  )}
                  <div style={{ marginTop: 8, fontSize: 13, color: "#2563eb" }}>
                    Full {n.name} guide →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {topProperties.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 28, marginBottom: 10 }}>
              Top-rated places to stay in {c.name}
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 0, marginBottom: 12 }}>
              Cross-neighborhood pick — the highest-rated properties anywhere in the city. For a neighborhood-specific list, open the guide for that area above.
            </p>

            {Object.values(priceDistribution).some((v) => v > 0) && (
              <PriceBandHistogram counts={priceDistribution} compact locale={locale} />
            )}

            <div
              style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                marginTop: 20,
              }}
            >
              {topProperties.map((p) => (
                <PropertyCard key={p.id} property={p} locale={locale} pageId={c.id} pageType="city" />
              ))}
            </div>

            <PriceDisclaimerBlock locale={locale} />
          </section>
        )}

        {(c.whenToVisit || c.gettingAround || c.safetyNotes) && (
          <section style={{ marginTop: 48 }}>
            {c.whenToVisit && (
              <>
                <h2 style={{ fontSize: 26, marginBottom: 8 }}>When to visit</h2>
                <p style={prose}>{c.whenToVisit}</p>
              </>
            )}
            {c.gettingAround && (
              <>
                <h2 style={{ fontSize: 26, marginBottom: 8, marginTop: 28 }}>Getting around</h2>
                <p style={prose}>{c.gettingAround}</p>
              </>
            )}
            {c.safetyNotes && (
              <>
                <h2 style={{ fontSize: 26, marginBottom: 8, marginTop: 28 }}>Safety notes</h2>
                <p style={prose}>{c.safetyNotes}</p>
              </>
            )}
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

const th: React.CSSProperties = { padding: "10px 8px", fontWeight: 700, color: "#0f172a" };
const td: React.CSSProperties = { padding: "10px 8px", color: "#334155" };
const prose: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "#1e293b" };

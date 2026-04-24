// apps/web/src/app/(frontend)/[locale]/[country]/page.tsx
//
// Country hub — Tier 1 editorial top of the route hierarchy within a country.
// Navigation spine: points visitors at city hubs + passes link equity to them.
// Lower-content than city pillars; higher authority-routing importance.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { AffiliateDisclosureBanner } from "@/components/legal/AffiliateDisclosure";
import { LexicalRenderer } from "@/components/content/LexicalRenderer";

import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL } from "@/lib/seo/config";
import {
  getCountryBySlug,
  getCitiesInCountry,
  getAllPublishedCountryPaths,
} from "./queries";

type RouteParams = {
  locale: "en" | "de" | "fr" | "es";
  country: string;
};

type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllPublishedCountryPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;

  const c = await getCountryBySlug({ countrySlug: country, locale });
  if (!c) return { title: "Not found" };

  const title = c.metaTitle ?? `Where to Stay in ${c.name} — Country Guide`;
  const description =
    c.metaDescription ??
    `City-by-city, neighborhood-by-neighborhood guide to ${c.name}. Honest picks by trip type.`;

  const path = country;
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
      type: "website",
      locale,
      images: c.heroImage ? [{ url: c.heroImage.url, alt: c.heroImage.alt }] : undefined,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { locale, country } = await params;

  const c = await getCountryBySlug({ countrySlug: country, locale });
  if (!c) notFound();

  const cities = await getCitiesInCountry({ countryId: c.id, locale });

  const breadcrumbs = [
    { name: "Europe", url: `/${locale}` },
    { name: c.name, url: `/${locale}/${country}` },
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
        "@type": "Country",
        name: c.name,
        url: `${SITE_URL}/${locale}/${country}`,
        description: c.metaDescription ?? undefined,
        additionalProperty: [
          c.currencyCode
            ? { "@type": "PropertyValue", name: "currency", value: c.currencyCode }
            : null,
          c.timezone
            ? { "@type": "PropertyValue", name: "timezone", value: c.timezone }
            : null,
          { "@type": "PropertyValue", name: "euMember", value: c.euMember },
          { "@type": "PropertyValue", name: "schengen", value: c.schengen },
        ].filter(Boolean),
      },
      {
        "@type": "ItemList",
        name: `Cities in ${c.name}`,
        numberOfItems: cities.length,
        itemListElement: cities.slice(0, 20).map((city, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "City",
            name: city.name,
            url: `${SITE_URL}/${locale}/${country}/${city.slug}`,
          },
        })),
      },
    ],
  };

  // Group cities by tier for two-column visual hierarchy
  const tier1 = cities.filter((c) => c.tier === "1");
  const tier2 = cities.filter((c) => c.tier === "2");
  const tier3 = cities.filter((c) => c.tier === "3" || !c.tier);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <AffiliateDisclosureBanner locale={locale} />

      <article style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
        <Breadcrumb items={breadcrumbs} />

        <header>
          <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: "12px 0 16px", fontWeight: 700 }}>
            Where to Stay in {c.name}
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", display: "flex", gap: 16, flexWrap: "wrap", margin: 0 }}>
            {c.currencyCode && <span>Currency: <strong style={{ color: "#334155" }}>{c.currencyCode}</strong></span>}
            {c.timezone && <span>Timezone: <strong style={{ color: "#334155" }}>{c.timezone}</strong></span>}
            {c.euMember && <span>🇪🇺 EU member</span>}
            {c.schengen && <span>Schengen area</span>}
          </p>
        </header>

        {c.heroImage && c.heroImage.url && (
          <figure style={{ margin: "20px 0" }}>
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

        <LexicalRenderer data={c.introHtml} locale={locale} className="wts-prose" />

        {tier1.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Major cities in {c.name}</h2>
            <CityGrid cities={tier1} locale={locale} country={country} />
          </section>
        )}

        {tier2.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 24, marginBottom: 12 }}>Other cities worth considering</h2>
            <CityGrid cities={tier2} locale={locale} country={country} />
          </section>
        )}

        {tier3.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 22, marginBottom: 12 }}>More of {c.name}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {tier3.map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/${locale}/${country}/${city.slug}`}
                    style={{
                      display: "inline-block",
                      padding: "8px 14px",
                      borderRadius: 999,
                      border: "1px solid #e2e8f0",
                      color: "#334155",
                      textDecoration: "none",
                      fontSize: 14,
                    }}
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {cities.length === 0 && (
          <section style={{ marginTop: 40 }}>
            <p style={{ color: "#64748b" }}>
              No cities mapped yet for {c.name}. Check back soon — city guides ship in order of tier.
            </p>
          </section>
        )}

        {c.bestTimeToVisit && (
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>When to visit {c.name}</h2>
            <p style={prose}>{c.bestTimeToVisit}</p>
          </section>
        )}

        {c.travelTips && (
          <section style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>Practical tips</h2>
            <dl style={{ margin: 0 }}>
              {Object.entries(c.travelTips).map(([key, value]) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <dt style={{ fontWeight: 600, color: "#0f172a", textTransform: "capitalize" }}>
                    {key.replace(/_/g, " ")}
                  </dt>
                  <dd style={{ margin: "4px 0 0", color: "#334155", fontSize: 15, lineHeight: 1.55 }}>
                    {typeof value === "string" ? value : JSON.stringify(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>
    </>
  );
}

function CityGrid({
  cities,
  locale,
  country,
}: {
  cities: Array<{ id: string; slug: string; name: string; introSnippet: string | null; population: number | null }>;
  locale: string;
  country: string;
}) {
  return (
    <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {cities.map((city) => (
        <Link
          key={city.id}
          href={`/${locale}/${country}/${city.slug}`}
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
            <strong style={{ fontSize: 18 }}>{city.name}</strong>
            {city.population && (
              <span style={{ color: "#94a3b8", fontSize: 12 }}>
                {(city.population / 1_000_000).toFixed(1)}M
              </span>
            )}
          </div>
          {city.introSnippet && (
            <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "#475569" }}>
              {city.introSnippet}
            </p>
          )}
          <div style={{ marginTop: 8, fontSize: 13, color: "#2563eb" }}>
            Where to stay in {city.name} →
          </div>
        </Link>
      ))}
    </div>
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

const prose: React.CSSProperties = { fontSize: 16, lineHeight: 1.6, color: "#1e293b" };

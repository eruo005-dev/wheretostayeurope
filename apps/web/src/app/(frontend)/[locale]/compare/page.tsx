// apps/web/src/app/(frontend)/[locale]/compare/page.tsx
//
// Global comparison index — lists every neighborhood head-to-head, grouped
// by city. The hub for the new content vertical and the link target for
// "compare neighborhoods" CTAs.

import type { Metadata } from "next";
import Link from "next/link";

import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME } from "@/lib/seo/config";
import { COMPARISONS } from "@/lib/data/static-data-comparisons";
import { findCity, findCountry } from "@/lib/data/static-data";

type Props = { params: Promise<{ locale: "en" | "de" | "fr" | "es" }> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const path = `compare`;
  return {
    title: `Neighborhood Comparisons — ${SITE_NAME}`,
    description:
      "Head-to-head, dimension-by-dimension comparisons of European neighborhoods. Marais vs Saint-Germain, Eixample vs Barri Gòtic, and the rest of the questions Booking.com won't answer.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/${path}`,
      languages: buildHreflangTags({ path, locales: [...SUPPORTED_LOCALES] }),
    },
    openGraph: {
      title: `Neighborhood Comparisons — ${SITE_NAME}`,
      description:
        "Honest head-to-head neighborhood comparisons across Europe's top cities.",
      url: `${SITE_URL}/${locale}/${path}`,
      type: "website",
      locale,
    },
  };
}

export default async function CompareIndex({ params }: Props) {
  const { locale } = await params;

  // Group comparisons by city, in city-order matching the site's tier-1 list.
  const byCity = new Map<string, typeof COMPARISONS>();
  for (const c of COMPARISONS) {
    const list = byCity.get(c.citySlug) ?? [];
    list.push(c);
    byCity.set(c.citySlug, list);
  }

  // Stable city order: tier-1 list first, then alpha.
  const tier1Order = ["paris", "rome", "barcelona", "amsterdam", "istanbul", "lisbon", "porto", "berlin"];
  const cityKeys = Array.from(byCity.keys()).sort((x, y) => {
    const xi = tier1Order.indexOf(x);
    const yi = tier1Order.indexOf(y);
    if (xi !== -1 && yi !== -1) return xi - yi;
    if (xi !== -1) return -1;
    if (yi !== -1) return 1;
    return x.localeCompare(y);
  });

  const totalCount = COMPARISONS.length;
  const cityCount = cityKeys.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Neighborhood Comparisons",
    description: "Head-to-head, dimension-by-dimension comparisons of European neighborhoods.",
    url: `${SITE_URL}/${locale}/compare`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalCount,
      itemListElement: COMPARISONS.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/${locale}/${c.countrySlug}/${c.citySlug}/compare/${c.slug}`,
        name: `${c.aLabel} vs ${c.bLabel}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px 60px" }}>
        <header style={{ marginBottom: 32 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#94867a",
              margin: "0 0 10px",
            }}
          >
            Head-to-head · {totalCount} comparisons across {cityCount} cities
          </p>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: "0 0 14px", fontWeight: 700, color: "#0f172a" }}>
            Neighborhood comparisons
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "#334155", margin: "0", maxWidth: 680 }}>
            The decision-mode pages that aggregators don&rsquo;t write. Each comparison is
            round-by-round, names a winner per dimension, and ends with a
            single-paragraph verdict you can act on.
          </p>
        </header>

        <div style={{ display: "grid", gap: 28 }}>
          {cityKeys.map((citySlug) => {
            const list = byCity.get(citySlug)!;
            const first = list[0];
            const cityRecord = findCity(first.countrySlug, citySlug);
            const countryRecord = findCountry(first.countrySlug);
            const cityName = cityRecord?.name ?? citySlug;
            const countryName = countryRecord?.name ?? first.countrySlug;

            return (
              <section key={citySlug}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <h2 style={{ fontSize: 24, margin: 0, color: "#0f172a", fontWeight: 600 }}>
                    {cityName}
                    <span style={{ fontSize: 14, color: "#94867a", marginLeft: 10, fontWeight: 400 }}>
                      {countryName}
                    </span>
                  </h2>
                  <Link
                    href={`/${locale}/${first.countrySlug}/${citySlug}`}
                    style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}
                  >
                    {cityName} city guide →
                  </Link>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${locale}/${c.countrySlug}/${c.citySlug}/compare/${c.slug}`}
                        style={{
                          display: "block",
                          padding: "14px 16px",
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 10,
                          textDecoration: "none",
                          color: "inherit",
                          transition: "border-color 0.15s",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                          <strong style={{ fontSize: 17, color: "#0f172a" }}>
                            {c.aLabel}
                          </strong>
                          <span style={{ fontSize: 13, color: "#94867a" }}>vs</span>
                          <strong style={{ fontSize: 17, color: "#0f172a" }}>
                            {c.bLabel}
                          </strong>
                        </div>
                        <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: "#475569" }}>
                          {c.metaDescription}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

// apps/web/src/app/(frontend)/[locale]/[country]/[city]/compare/page.tsx
//
// Per-city comparison index. Lists every head-to-head for one city.
// Lightweight; the heavy index lives at /[locale]/compare.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL } from "@/lib/seo/config";
import { findCity, findCountry } from "@/lib/data/static-data";
import { comparisonsInCity, COMPARISONS } from "@/lib/data/static-data-comparisons";

type RouteParams = {
  locale: "en" | "de" | "fr" | "es";
  country: string;
  city: string;
};

type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  // One per (city that has at least one comparison) × locale.
  const seen = new Set<string>();
  const out: Array<{ locale: string; country: string; city: string }> = [];
  for (const c of COMPARISONS) {
    const key = `${c.countrySlug}/${c.citySlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    for (const locale of SUPPORTED_LOCALES) {
      out.push({ locale, country: c.countrySlug, city: c.citySlug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city } = await params;
  const cityRecord = findCity(country, city);
  const countryRecord = findCountry(country);
  if (!cityRecord || !countryRecord) return { title: "Not found" };

  const path = `${country}/${city}/compare`;
  return {
    title: `${cityRecord.name} Neighborhood Comparisons — Where to Stay`,
    description: `Head-to-head, dimension-by-dimension comparisons of ${cityRecord.name}'s most-stayed neighborhoods.`,
    alternates: {
      canonical: `${SITE_URL}/${locale}/${path}`,
      languages: buildHreflangTags({ path, locales: [...SUPPORTED_LOCALES] }),
    },
  };
}

export default async function CityCompareIndex({ params }: Props) {
  const { locale, country, city } = await params;

  const cityRecord = findCity(country, city);
  const countryRecord = findCountry(country);
  if (!cityRecord || !countryRecord) notFound();

  const list = comparisonsInCity(city);
  if (list.length === 0) notFound();

  const breadcrumbs = [
    { name: countryRecord.name, url: `/${locale}/${country}` },
    { name: cityRecord.name, url: `/${locale}/${country}/${city}` },
    { name: "Comparisons", url: `/${locale}/${country}/${city}/compare` },
  ];

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px 60px" }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#64748b" }}>
        {breadcrumbs.map((item, i) => (
          <span key={item.url}>
            {i > 0 && <span aria-hidden="true"> › </span>}
            {i === breadcrumbs.length - 1 ? (
              <span aria-current="page" style={{ color: "#334155" }}>{item.name}</span>
            ) : (
              <Link href={item.url} style={{ color: "#64748b", textDecoration: "none" }}>
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <header style={{ marginTop: 16, marginBottom: 28 }}>
        <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: "0 0 12px", fontWeight: 700, color: "#0f172a" }}>
          {cityRecord.name}: head-to-head comparisons
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "#334155", margin: 0 }}>
          {list.length === 1 ? "One " : `${list.length} `}
          dimension-by-dimension comparison{list.length === 1 ? "" : "s"} for picking
          the right {cityRecord.name} neighborhood.
        </p>
      </header>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
        {list.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/${locale}/${country}/${city}/compare/${c.slug}`}
              style={{
                display: "block",
                padding: "16px 18px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <strong style={{ fontSize: 18, color: "#0f172a" }}>
                  {c.aLabel}
                </strong>
                <span style={{ fontSize: 13, color: "#94867a" }}>vs</span>
                <strong style={{ fontSize: 18, color: "#0f172a" }}>
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
    </main>
  );
}

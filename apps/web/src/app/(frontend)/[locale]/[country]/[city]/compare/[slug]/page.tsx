// apps/web/src/app/(frontend)/[locale]/[country]/[city]/compare/[slug]/page.tsx
//
// Head-to-head neighborhood comparison page — the content moat aggregators
// can't write. Renders a single StaticComparison entry as an opinionated
// editorial verdict (round-by-round breakdown, "pick A if…" / "pick B if…",
// optional FAQ, BreadcrumbList + FAQPage JSON-LD).
//
// URL: /[locale]/[country]/[city]/compare/[slug]
// Source of truth: lib/data/static-data-comparisons.ts

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// AffiliateDisclosureBanner is rendered globally by [locale]/layout.tsx
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL } from "@/lib/seo/config";
import { findCity, findCountry } from "@/lib/data/static-data";
import {
  findComparison,
  resolveComparisonNeighborhoods,
  comparisonsInCity,
  COMPARISONS,
} from "@/lib/data/static-data-comparisons";

type RouteParams = {
  locale: "en" | "de" | "fr" | "es";
  country: string;
  city: string;
  slug: string;
};

type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const out: Array<{ locale: string; country: string; city: string; slug: string }> = [];
  for (const c of COMPARISONS) {
    for (const locale of SUPPORTED_LOCALES) {
      out.push({ locale, country: c.countrySlug, city: c.citySlug, slug: c.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city, slug } = await params;
  const comparison = findComparison(country, city, slug);
  if (!comparison) return { title: "Not found" };

  const path = `${country}/${city}/compare/${slug}`;
  const canonical = `${SITE_URL}/${locale}/${path}`;

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: {
      canonical,
      languages: buildHreflangTags({ path, locales: [...SUPPORTED_LOCALES] }),
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: canonical,
      type: "article",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { locale, country, city, slug } = await params;

  const comparison = findComparison(country, city, slug);
  if (!comparison) notFound();

  const cityRecord = findCity(country, city);
  const countryRecord = findCountry(country);
  if (!cityRecord || !countryRecord) notFound();

  const resolved = resolveComparisonNeighborhoods(comparison);
  if (!resolved) notFound();
  const { a, b } = resolved;

  const otherComparisons = comparisonsInCity(city)
    .filter((c) => c.slug !== comparison.slug)
    .slice(0, 4);

  const breadcrumbs = [
    { name: countryRecord.name, url: `/${locale}/${country}` },
    { name: cityRecord.name, url: `/${locale}/${country}/${city}` },
    {
      name: `${comparison.aLabel} vs ${comparison.bLabel}`,
      url: `/${locale}/${country}/${city}/compare/${slug}`,
    },
  ];

  // Schema: BreadcrumbList + (optional) FAQPage
  const schemaGraph: Array<Record<string, unknown>> = [
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((bc, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: bc.name,
        item: `${SITE_URL}${bc.url}`,
      })),
    },
    {
      "@type": "Article",
      headline: comparison.metaTitle,
      description: comparison.metaDescription,
      mainEntityOfPage: `${SITE_URL}/${locale}/${country}/${city}/compare/${slug}`,
      about: [
        { "@type": "TouristDestination", name: `${a.name}, ${cityRecord.name}` },
        { "@type": "TouristDestination", name: `${b.name}, ${cityRecord.name}` },
      ],
    },
  ];

  if (comparison.faq && comparison.faq.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      mainEntity: comparison.faq.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      })),
    });
  }

  const schema = { "@context": "https://schema.org", "@graph": schemaGraph };

  // Tally winner counts (for the "scoreboard" pill at the top)
  const score = { a: 0, b: 0, tied: 0 };
  for (const r of comparison.rounds) score[r.winner] += 1;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px 60px" }}>
        <Breadcrumb items={breadcrumbs} />

        <header style={{ marginTop: 14 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#94867a",
              margin: "0 0 10px",
            }}
          >
            Head-to-head · {cityRecord.name}
          </p>
          <h1 style={{ fontSize: 38, lineHeight: 1.1, margin: "0 0 14px", fontWeight: 700, color: "#0f172a" }}>
            {comparison.aLabel} <span style={{ color: "#94867a" }}>vs</span> {comparison.bLabel}
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "#334155", margin: "0 0 22px" }}>
            {comparison.intro}
          </p>
        </header>

        {/* Scoreboard */}
        <div
          aria-label="Round-by-round summary"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            margin: "12px 0 28px",
            padding: "14px 16px",
            background: "#faf6f0",
            border: "1px solid #ece6dc",
            borderRadius: 12,
          }}
        >
          <Score label={comparison.aLabel} value={score.a} highlight={score.a > score.b} />
          <Score label="Tied" value={score.tied} muted />
          <Score label={comparison.bLabel} value={score.b} highlight={score.b > score.a} />
        </div>

        {/* Quick links to each neighborhood's full page */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 14,
            marginBottom: 32,
          }}
        >
          <NeighborhoodCard
            label={comparison.aLabel}
            summary={a.summary || ""}
            priceTier={a.priceTier}
            href={`/${locale}/${country}/${city}/${a.slug}`}
          />
          <NeighborhoodCard
            label={comparison.bLabel}
            summary={b.summary || ""}
            priceTier={b.priceTier}
            href={`/${locale}/${country}/${city}/${b.slug}`}
          />
        </div>

        {/* Rounds */}
        <section>
          <h2 style={{ fontSize: 26, marginBottom: 14, color: "#0f172a" }}>Round by round</h2>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
            {comparison.rounds.map((r, i) => (
              <li
                key={`${r.question}-${i}`}
                style={{
                  padding: "16px 18px",
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  borderLeft: `4px solid ${winnerColor(r.winner)}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                  <h3 style={{ fontSize: 17, margin: 0, color: "#0f172a", fontWeight: 600 }}>
                    {r.question}
                  </h3>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: winnerColor(r.winner),
                    }}
                  >
                    {r.winner === "a"
                      ? comparison.aLabel
                      : r.winner === "b"
                      ? comparison.bLabel
                      : "Tied"}
                  </span>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "#334155" }}>
                  {r.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Pick-A / Pick-B */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 26, marginBottom: 14, color: "#0f172a" }}>The verdict</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <div style={pickBox(true)}>
              <h3 style={pickHead}>Pick {comparison.aLabel} if…</h3>
              <p style={pickBody}>{comparison.pickA}</p>
              <Link href={`/${locale}/${country}/${city}/${a.slug}`} style={pickLink}>
                Full {comparison.aLabel} guide →
              </Link>
            </div>
            <div style={pickBox(false)}>
              <h3 style={pickHead}>Pick {comparison.bLabel} if…</h3>
              <p style={pickBody}>{comparison.pickB}</p>
              <Link href={`/${locale}/${country}/${city}/${b.slug}`} style={pickLink}>
                Full {comparison.bLabel} guide →
              </Link>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              padding: "16px 18px",
              borderTop: "2px solid #c7553a",
              background: "#fff7ed",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#9a3412",
              }}
            >
              Bottom line
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 17,
                lineHeight: 1.55,
                color: "#1f2937",
                fontWeight: 500,
              }}
            >
              {comparison.bottomLine}
            </p>
          </div>
        </section>

        {/* FAQ */}
        {comparison.faq && comparison.faq.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 22, marginBottom: 12, color: "#0f172a" }}>
              Frequently asked
            </h2>
            <dl style={{ margin: 0 }}>
              {comparison.faq.map((entry, i) => (
                <div
                  key={`${entry.q}-${i}`}
                  style={{ padding: "12px 0", borderBottom: i === comparison.faq!.length - 1 ? "none" : "1px solid #e2e8f0" }}
                >
                  <dt style={{ fontWeight: 600, fontSize: 15, color: "#0f172a", margin: "0 0 4px" }}>
                    {entry.q}
                  </dt>
                  <dd style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#334155" }}>
                    {entry.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Other comparisons in this city */}
        {otherComparisons.length > 0 && (
          <section style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: 20, marginBottom: 12, color: "#0f172a" }}>
              More {cityRecord.name} head-to-heads
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {otherComparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${locale}/${country}/${city}/compare/${c.slug}`}
                    style={{
                      display: "block",
                      padding: "12px 14px",
                      borderRadius: 8,
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      textDecoration: "none",
                      color: "#0f172a",
                    }}
                  >
                    <strong style={{ fontSize: 15 }}>
                      {c.aLabel} <span style={{ color: "#94867a" }}>vs</span> {c.bLabel}
                    </strong>
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

// =============================================================================
// Helpers + presentational
// =============================================================================

function winnerColor(w: "a" | "b" | "tied"): string {
  if (w === "a") return "#2563eb"; // blue for A
  if (w === "b") return "#16a34a"; // green for B
  return "#94867a"; // muted for tied
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

function Score({ label, value, highlight, muted }: { label: string; value: number; highlight?: boolean; muted?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          lineHeight: 1,
          color: muted ? "#94867a" : highlight ? "#c7553a" : "#0f172a",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: muted ? "#94867a" : "#5a5248",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function NeighborhoodCard({
  label,
  summary,
  priceTier,
  href,
}: {
  label: string;
  summary: string;
  priceTier: number | null;
  href: string;
}) {
  return (
    <Link
      href={href}
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <strong style={{ fontSize: 17, color: "#0f172a" }}>{label}</strong>
        {priceTier && <span style={{ color: "#64748b", fontSize: 13 }}>{"$".repeat(priceTier)}</span>}
      </div>
      {summary && (
        <p style={{ margin: "6px 0 8px", fontSize: 13, lineHeight: 1.5, color: "#475569" }}>
          {summary.length > 160 ? `${summary.slice(0, 160)}…` : summary}
        </p>
      )}
      <span style={{ fontSize: 12, color: "#2563eb" }}>Full guide →</span>
    </Link>
  );
}

const pickHead: React.CSSProperties = { fontSize: 17, margin: "0 0 8px", color: "#0f172a", fontWeight: 600 };
const pickBody: React.CSSProperties = { margin: "0 0 12px", fontSize: 15, lineHeight: 1.6, color: "#334155" };
const pickLink: React.CSSProperties = { fontSize: 13, color: "#2563eb", textDecoration: "none", fontWeight: 500 };

function pickBox(isA: boolean): React.CSSProperties {
  return {
    padding: "18px 20px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    borderTop: `3px solid ${isA ? "#2563eb" : "#16a34a"}`,
  };
}

// apps/web/src/app/(frontend)/[locale]/articles/page.tsx
//
// Articles index — lists all evergreen cornerstone pieces.

import type { Metadata } from "next";
import Link from "next/link";

import { ARTICLES } from "@/lib/data/articles";
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME } from "@/lib/seo/config";

type RouteParams = { locale: "en" | "de" | "fr" | "es" };
type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = `Articles — ${SITE_NAME}`;
  const description = "Cornerstone guides on choosing where to stay in Europe — by trip type, by season, by city.";
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/articles`,
      languages: buildHreflangTags({ path: "articles", locales: [...SUPPORTED_LOCALES] }),
    },
  };
}

export default async function ArticlesIndexPage({ params }: Props) {
  const { locale } = await params;
  const articles = [...ARTICLES].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );

  return (
    <article style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 38, lineHeight: 1.15, margin: "0 0 10px", fontWeight: 700 }}>
          Articles
        </h1>
        <p style={{ fontSize: 17, color: "#475569", margin: 0, lineHeight: 1.55 }}>
          Cornerstone guides for choosing where to stay across Europe — by trip type, by season, by what you actually want from the city.
        </p>
      </header>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 18 }}>
        {articles.map((a) => (
          <li
            key={a.slug}
            style={{
              padding: "20px 22px",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <h2 style={{ margin: "0 0 8px", fontSize: 22, lineHeight: 1.3 }}>
              <Link
                href={`/${locale}/articles/${a.slug}`}
                style={{ color: "#0f172a", textDecoration: "none" }}
              >
                {a.title}
              </Link>
            </h2>
            <p style={{ margin: "0 0 10px", fontSize: 15, color: "#475569", lineHeight: 1.55 }}>
              {a.excerpt}
            </p>
            <div style={{ fontSize: 13, color: "#64748b", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span>Reviewed {a.reviewedAt}</span>
              <span>{a.readingTimeMin} min read</span>
              <Link
                href={`/${locale}/articles/${a.slug}`}
                style={{ color: "#2563eb", textDecoration: "none", marginLeft: "auto" }}
              >
                Read →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

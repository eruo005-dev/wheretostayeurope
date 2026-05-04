// apps/web/src/app/(frontend)/[locale]/articles/[slug]/page.tsx
//
// Cornerstone article detail page. Renders pre-written HTML from articles.ts.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { ARTICLES, findArticle } from "@/lib/data/articles";
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME } from "@/lib/seo/config";
// AffiliateDisclosureBanner is rendered globally by [locale]/layout.tsx

type RouteParams = { locale: "en" | "de" | "fr" | "es"; slug: string };
type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const out: Array<{ locale: string; slug: string }> = [];
  for (const a of ARTICLES) {
    for (const locale of SUPPORTED_LOCALES) {
      out.push({ locale, slug: a.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = findArticle(slug);
  if (!a) return { title: "Not found" };

  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/articles/${slug}`,
      languages: buildHreflangTags({ path: `articles/${slug}`, locales: [...SUPPORTED_LOCALES] }),
    },
    openGraph: {
      title: a.metaTitle,
      description: a.metaDescription,
      url: `${SITE_URL}/${locale}/articles/${slug}`,
      type: "article",
      locale,
      publishedTime: a.publishedAt,
      modifiedTime: a.reviewedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const a = findArticle(slug);
  if (!a) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/${locale}/articles/${slug}`,
    headline: a.title,
    description: a.metaDescription,
    datePublished: a.publishedAt,
    dateModified: a.reviewedAt,
    author: {
      "@type": "Person",
      name: "Jay",
      url: `${SITE_URL}/${locale}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}/articles/${slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "24px 20px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#64748b", marginBottom: 14 }}>
          <Link href={`/${locale}`} style={{ color: "#64748b", textDecoration: "none" }}>
            Home
          </Link>
          <span aria-hidden="true"> › </span>
          <Link href={`/${locale}/articles`} style={{ color: "#64748b", textDecoration: "none" }}>
            Articles
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page" style={{ color: "#334155" }}>{a.title}</span>
        </nav>

        <header style={{ marginBottom: 22 }}>
          <h1 style={{ fontSize: 36, lineHeight: 1.15, margin: "0 0 12px", fontWeight: 700 }}>
            {a.title}
          </h1>
          <div style={{ fontSize: 13, color: "#64748b", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <span>By Jay</span>
            <span>Published {a.publishedAt}</span>
            <span>Reviewed {a.reviewedAt}</span>
            <span>{a.readingTimeMin} min read</span>
          </div>
        </header>

        <div
          className="wts-prose"
          style={{ fontSize: 17, lineHeight: 1.7, color: "#1e293b" }}
          dangerouslySetInnerHTML={{ __html: a.html }}
        />

        <footer style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid #e2e8f0", fontSize: 14, color: "#64748b" }}>
          <Link href={`/${locale}/articles`} style={{ color: "#2563eb", textDecoration: "none" }}>
            ← All articles
          </Link>
        </footer>
      </article>
    </>
  );
}

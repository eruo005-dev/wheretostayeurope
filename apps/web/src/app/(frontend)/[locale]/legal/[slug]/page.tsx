// apps/web/src/app/(frontend)/[locale]/legal/[slug]/page.tsx
//
// Single dynamic route serving all 5 legal pages (privacy, terms, disclosure,
// cookies, impressum) in 4 locales = 20 statically generated pages.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  LEGAL_PAGES,
  getLegalPage,
  type LegalSlug,
} from "@/lib/data/legal-content";
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME } from "@/lib/seo/config";

type RouteParams = { locale: "en" | "de" | "fr" | "es"; slug: string };
type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
const VALID_SLUGS = Object.keys(LEGAL_PAGES) as LegalSlug[];

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
  const out: Array<{ locale: string; slug: string }> = [];
  for (const slug of VALID_SLUGS) {
    for (const locale of SUPPORTED_LOCALES) {
      out.push({ locale, slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(VALID_SLUGS as string[]).includes(slug)) return { title: "Not found" };

  const page = getLegalPage(slug as LegalSlug, locale);
  if (!page) return { title: "Not found" };

  return {
    title: `${page.title} — ${SITE_NAME}`,
    description: page.title,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/legal/${slug}`,
      languages: buildHreflangTags({
        path: `legal/${slug}`,
        locales: [...SUPPORTED_LOCALES],
      }),
    },
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!(VALID_SLUGS as string[]).includes(slug)) notFound();

  const page = getLegalPage(slug as LegalSlug, locale);
  if (!page) notFound();

  return (
    <article style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
      <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: "#64748b", marginBottom: 14 }}>
        <Link href={`/${locale}`} style={{ color: "#64748b", textDecoration: "none" }}>
          Home
        </Link>
        <span aria-hidden="true"> › </span>
        <span style={{ color: "#94a3b8" }}>Legal</span>
        <span aria-hidden="true"> › </span>
        <span aria-current="page" style={{ color: "#334155" }}>{page.title}</span>
      </nav>

      <header style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: "0 0 10px", fontWeight: 700 }}>
          {page.title}
        </h1>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
          Last updated: {page.lastUpdated}
        </p>
      </header>

      <div
        className="wts-prose"
        style={{ fontSize: 16, lineHeight: 1.7, color: "#1e293b" }}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      <footer style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid #e2e8f0", fontSize: 14, color: "#64748b" }}>
        <Link href={`/${locale}`} style={{ color: "#2563eb", textDecoration: "none" }}>
          ← Home
        </Link>
      </footer>
    </article>
  );
}

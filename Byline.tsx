// apps/web/src/components/content/Byline.tsx
//
// Visible byline rendered on every editorial article (city pillar, neighborhood
// page, country hub, Tier 3). Pairs with the Article schema emitted in
// lib/seo/article-schema.ts — the visible signal, Google + readers both read it.

import Link from "next/link";
import type { AuthorData } from "@/lib/author";

const COPY: Record<string, { by: string; published: string; updated: string }> = {
  en: { by: "By", published: "Published", updated: "Last reviewed" },
  de: { by: "Von", published: "Veröffentlicht", updated: "Zuletzt überprüft" },
  fr: { by: "Par", published: "Publié", updated: "Dernière révision" },
  es: { by: "Por", published: "Publicado", updated: "Última revisión" },
};

type Props = {
  author: AuthorData;
  locale: "en" | "de" | "fr" | "es";
  publishedAt?: string | Date | null;
  lastReviewedAt?: string | Date | null;
};

function fmt(date: string | Date, locale: string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export function Byline({ author, locale, publishedAt, lastReviewedAt }: Props) {
  const copy = COPY[locale] ?? COPY.en;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        margin: "12px 0 20px",
        fontSize: 13,
        color: "#64748b",
      }}
    >
      <span>
        {copy.by}{" "}
        <Link
          href={`/${locale}/about`}
          style={{ color: "#334155", textDecoration: "none", fontWeight: 600 }}
          rel="author"
        >
          {author.displayName}
        </Link>
      </span>

      {publishedAt && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            {copy.published}{" "}
            <time dateTime={new Date(publishedAt).toISOString()}>
              {fmt(publishedAt, locale)}
            </time>
          </span>
        </>
      )}

      {lastReviewedAt && publishedAt && new Date(lastReviewedAt).getTime() > new Date(publishedAt).getTime() && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            {copy.updated}{" "}
            <time dateTime={new Date(lastReviewedAt).toISOString()}>
              {fmt(lastReviewedAt, locale)}
            </time>
          </span>
        </>
      )}

      {lastReviewedAt && !publishedAt && (
        <span>
          {copy.updated}{" "}
          <time dateTime={new Date(lastReviewedAt).toISOString()}>
            {fmt(lastReviewedAt, locale)}
          </time>
        </span>
      )}
    </div>
  );
}

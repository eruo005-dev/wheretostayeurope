// apps/web/src/lib/seo/article-schema.ts
//
// Emits schema.org Article (or TravelGuide-flavored variant) with author,
// publisher, datePublished, dateModified. Use alongside the entity-specific
// schema (TouristDestination, ItemList, etc.) — they coexist in the same @graph.

import { SITE_URL, SITE_NAME, LEGAL_ENTITY_NAME } from "@/lib/seo/config";
import { buildPersonSchema, type AuthorData } from "@/lib/author";

type Args = {
  author: AuthorData;
  locale: "en" | "de" | "fr" | "es";
  url: string;               // canonical URL of the article
  headline: string;
  description?: string;
  imageUrl?: string | null;
  publishedAt?: string | Date | null;
  lastReviewedAt?: string | Date | null;
  wordCount?: number | null;
  articleSection?: string;   // e.g. "Neighborhood guide", "City guide"
};

export function buildArticleSchema(args: Args) {
  const pub = args.publishedAt ? new Date(args.publishedAt) : null;
  const mod = args.lastReviewedAt ? new Date(args.lastReviewedAt) : null;

  return {
    "@type": "Article",
    "@id": `${args.url}#article`,
    headline: args.headline,
    description: args.description,
    url: args.url,
    inLanguage: args.locale,
    isAccessibleForFree: true,
    image: args.imageUrl ?? undefined,
    datePublished: pub && !isNaN(pub.getTime()) ? pub.toISOString() : undefined,
    dateModified: mod && !isNaN(mod.getTime()) ? mod.toISOString() : (pub && !isNaN(pub.getTime()) ? pub.toISOString() : undefined),
    wordCount: args.wordCount ?? undefined,
    articleSection: args.articleSection,
    author: {
      "@id": `${SITE_URL}/${args.locale}/about#person`,
      ...buildPersonSchema(args.author, args.locale),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: LEGAL_ENTITY_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon`,
        width: 32,
        height: 32,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
  };
}

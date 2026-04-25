// apps/web/src/app/robots.ts
//
// Generates /robots.txt at build/request time.
// Allows all crawlers on content. Blocks /admin (Payload admin UI), /api (server endpoints),
// and /_next (Next.js internals).

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/_vercel/"],
      },
      // Block bots that scrape for AI training without permission.
      // Adjust if you want to allow specific ones (e.g. Google's GoogleOther).
      {
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "CCBot", "PerplexityBot", "Google-Extended"],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/^https?:\/\//, ""),
  };
}

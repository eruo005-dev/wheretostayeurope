// apps/web/src/app/(frontend)/[locale]/about/page.tsx
//
// About page — the E-E-A-T anchor. Every editorial page's byline links here.
// Renders Person schema + the editable fields from the AuthorProfile Global.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { buildHreflangTags } from "@/lib/seo/hreflang";
import { SITE_URL, SITE_NAME } from "@/lib/seo/config";
import { getAuthor, getAuthorProfileFull, buildPersonSchema } from "@/lib/author";
import { LexicalRenderer, type LexicalRoot } from "@/components/content/LexicalRenderer";

type RouteParams = { locale: "en" | "de" | "fr" | "es" };
type Props = { params: Promise<RouteParams> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

const COPY: Record<string, { heading: string; sectionCities: string; sectionCredentials: string; sectionContact: string; sectionHow: string }> = {
  en: { heading: "About", sectionCities: "Cities I've stayed in personally", sectionCredentials: "Background", sectionContact: "Get in touch", sectionHow: "How this site works" },
  de: { heading: "Über", sectionCities: "Städte, in denen ich persönlich übernachtet habe", sectionCredentials: "Hintergrund", sectionContact: "Kontakt", sectionHow: "Wie diese Seite funktioniert" },
  fr: { heading: "À propos", sectionCities: "Villes où j'ai séjourné personnellement", sectionCredentials: "Parcours", sectionContact: "Contact", sectionHow: "Comment ce site fonctionne" },
  es: { heading: "Acerca de", sectionCities: "Ciudades donde me he alojado personalmente", sectionCredentials: "Trayectoria", sectionContact: "Contacto", sectionHow: "Cómo funciona este sitio" },
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const author = await getAuthor(locale);
  const copy = COPY[locale] ?? COPY.en;
  const title = `${copy.heading} ${author.displayName} — ${SITE_NAME}`;
  const description = author.tagline ?? `About ${author.fullName}, the writer behind ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: buildHreflangTags({ path: "about", locales: [...SUPPORTED_LOCALES] }),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/about`,
      type: "profile",
      images: author.photoUrl ? [author.photoUrl] : undefined,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const [author, profile] = await Promise.all([
    getAuthor(locale),
    getAuthorProfileFull(locale),
  ]);
  const copy = COPY[locale] ?? COPY.en;

  const personSchema = {
    "@context": "https://schema.org",
    ...buildPersonSchema(author, locale),
  };

  const credentials = Array.isArray(profile.credentials) ? profile.credentials : [];
  const citiesVisited = Array.isArray(profile.citiesVisited) ? profile.citiesVisited : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
        <header style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap" }}>
          {author.photoUrl && (
            <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0, borderRadius: "50%", overflow: "hidden" }}>
              <Image
                src={author.photoUrl}
                alt={author.photoAlt ?? author.fullName}
                fill
                sizes="120px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
          <div style={{ flex: "1 1 260px" }}>
            <h1 style={{ fontSize: 36, lineHeight: 1.15, margin: "0 0 6px", fontWeight: 700 }}>
              {author.fullName}
            </h1>
            {author.tagline && (
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.5, margin: 0 }}>
                {author.tagline}
              </p>
            )}
            <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13 }}>
              {author.twitter && <a href={`https://twitter.com/${author.twitter.replace(/^@/, "")}`} rel="me noopener" target="_blank" style={socialLink}>Twitter</a>}
              {author.linkedin && <a href={author.linkedin} rel="me noopener" target="_blank" style={socialLink}>LinkedIn</a>}
              {author.instagram && <a href={`https://instagram.com/${author.instagram.replace(/^@/, "")}`} rel="me noopener" target="_blank" style={socialLink}>Instagram</a>}
              {author.website && <a href={author.website} rel="me noopener" target="_blank" style={socialLink}>Website</a>}
            </div>
          </div>
        </header>

        {profile.bio && (
          <section>
            <LexicalRenderer data={profile.bio as LexicalRoot} locale={locale} className="wts-prose" />
          </section>
        )}

        {citiesVisited.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 22, marginBottom: 10 }}>
              {copy.sectionCities}
              <span style={{ fontSize: 14, fontWeight: 400, color: "#64748b", marginLeft: 10 }}>
                ({citiesVisited.length})
              </span>
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {citiesVisited.map((c: { name?: string; country?: string; yearLast?: number }, i: number) => (
                <li key={i} style={chipStyle}>
                  {c.name}{c.country ? `, ${c.country}` : ""}
                  {c.yearLast ? <span style={{ color: "#94a3b8", marginLeft: 4, fontSize: 12 }}>· {c.yearLast}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        )}

        {credentials.length > 0 && (
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 22, marginBottom: 10 }}>{copy.sectionCredentials}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {credentials.map((c: { label?: string; year?: number; url?: string }, i: number) => (
                <li key={i} style={{ fontSize: 15 }}>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener" style={{ color: "#0f172a" }}>
                      {c.label}
                    </a>
                  ) : (
                    <span>{c.label}</span>
                  )}
                  {c.year && <span style={{ color: "#94a3b8", marginLeft: 8 }}>· {c.year}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section style={{ marginTop: 40, padding: "16px 18px", background: "#f8fafc", borderRadius: 8 }}>
          <h2 style={{ fontSize: 18, margin: "0 0 6px" }}>{copy.sectionHow}</h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#334155" }}>
            This site is written and maintained by {author.displayName}. It uses affiliate links for Booking.com, GetYourGuide, and a few other partners — when you book through a link here, {author.displayName} earns a small commission at no extra cost to you. Recommendations are based on editorial judgment, not commission rates.{" "}
            <Link href={`/${locale}/legal/disclosure`} style={{ color: "#2563eb" }}>Full affiliate disclosure →</Link>
          </p>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 18 }}>{copy.sectionContact}</h2>
          <p style={{ margin: "4px 0 0", fontSize: 15 }}>
            <a href={`mailto:${author.email}`} style={{ color: "#2563eb" }}>{author.email}</a>
          </p>
        </section>
      </article>
    </>
  );
}

const socialLink: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
  fontSize: 13,
};

const chipStyle: React.CSSProperties = {
  padding: "5px 10px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "#fff",
  fontSize: 13,
  color: "#334155",
};

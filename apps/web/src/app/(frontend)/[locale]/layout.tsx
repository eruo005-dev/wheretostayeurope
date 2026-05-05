// apps/web/src/app/(frontend)/[locale]/layout.tsx
//
// REPLACES the earlier shipped locale-layout.tsx.
// Now owns <html> and <body> — enables per-locale `lang` attribute (required for
// hreflang cross-validation and assistive-tech language detection).

import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { ConsentProvider } from "@/components/legal/ConsentProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AffiliateDisclosureBanner } from "@/components/legal/AffiliateDisclosure";
import { TravelpayoutsDrive } from "@/components/affiliate/TravelpayoutsDrive";
import { GoogleAdSense } from "@/components/seo/GoogleAdSense";
import { SITE_NAME, SITE_URL, SITE_TAGLINE, LEGAL_ENTITY_NAME } from "@/lib/seo/config";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: LEGAL_ENTITY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  sameAs: [],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  if (!SUPPORTED_LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="description" content={SITE_TAGLINE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.GSC_VERIFICATION_TOKEN && (
          <meta name="google-site-verification" content={process.env.GSC_VERIFICATION_TOKEN} />
        )}
        {/* Non-English locales are not yet professionally translated — content
            currently mirrors the English version. Until per-locale translations
            land, mark non-EN pages noindex so search engines don't see thousands
            of duplicate-content variants (an AdSense thin-content trigger).
            The pages remain accessible to users via the locale switcher. */}
        {locale !== "en" && (
          <meta name="robots" content="noindex,follow" />
        )}
        <GoogleAdSense />
        {/* Favicons / apple-touch-icon are auto-injected by Next.js from
            apps/web/src/app/icon.tsx and apple-icon.tsx — don't add raw <link> tags. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a href="#main" className="wts-skip-link">Skip to content</a>
        <ConsentProvider>
          <AffiliateDisclosureBanner locale={locale} />
          <Header locale={locale} />
          <div id="main">{children}</div>
          <Footer locale={locale} />
        </ConsentProvider>
        <TravelpayoutsDrive />
      </body>
    </html>
  );
}

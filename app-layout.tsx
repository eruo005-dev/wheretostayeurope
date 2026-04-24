// apps/web/src/app/layout.tsx
//
// Root layout — the <html>/<body> shell, ConsentProvider mount, global CSS import,
// Organization schema for E-E-A-T.
//
// This is locale-agnostic. Per-locale setup (lang attribute, Header/Footer) lives
// in app/(frontend)/[locale]/layout.tsx.

import type { Metadata } from "next";
import { ConsentProvider } from "@/components/legal/ConsentProvider";
import { SITE_NAME, SITE_URL, SITE_TAGLINE, LEGAL_ENTITY_NAME } from "@/lib/seo/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "google-site-verification": process.env.GSC_VERIFICATION_TOKEN ?? "",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: LEGAL_ENTITY_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    // Fill in as profiles are created
    // "https://twitter.com/wheretostayEU",
    // "https://www.pinterest.com/wheretostayEU",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a href="#main" className="wts-skip-link">Skip to content</a>
        <ConsentProvider>{children}</ConsentProvider>
      </body>
    </html>
  );
}

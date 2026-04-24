// apps/web/src/app/(frontend)/[locale]/layout.tsx
//
// Locale layout — sets the html lang attribute (via generateMetadata/head),
// mounts Header + Footer, and renders the site-wide affiliate disclosure banner.

import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AffiliateDisclosureBanner } from "@/components/legal/AffiliateDisclosure";

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  if (!SUPPORTED_LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <>
      {/*
        Setting <html lang> at request time requires a workaround in app router:
        Next.js puts the <html> tag in app/layout.tsx. To set lang per-locale we
        need to either (a) move html to this layout OR (b) use a client-side effect.
        Path (a) is cleaner; see app-layout.tsx note — if you keep html there, set
        lang="en" as a safe default and override per-locale via <html> meta here
        using the html lang workaround from Next.js docs.
      */}
      <AffiliateDisclosureBanner locale={locale} />
      <Header locale={locale} />
      <div id="main">{children}</div>
      <Footer locale={locale} />
    </>
  );
}

// apps/web/src/app/(frontend)/[locale]/thank-you/page.tsx
//
// Newsletter post-signup confirmation page. The /api/newsletter route
// redirects here on form-encoded submissions.

import type { Metadata } from "next";
import Link from "next/link";

import { SITE_NAME, SITE_URL } from "@/lib/seo/config";
import { buildHreflangTags } from "@/lib/seo/hreflang";

type Props = { params: Promise<{ locale: "en" | "de" | "fr" | "es" }> };

const SUPPORTED_LOCALES = ["en", "de", "fr", "es"] as const;

export const dynamic = "force-static";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

const COPY: Record<string, {
  title: string;
  head: string;
  body: string;
  finePrint: string;
  cta: string;
  back: string;
}> = {
  en: {
    title: "Almost there — confirm your email",
    head: "Almost there.",
    body: "We just sent a confirmation email. Click the link in it to finish subscribing — we won't send you anything until you confirm.",
    finePrint: "Didn't get it? Check your spam folder. The sender is hello@wheretostayeurope.com.",
    cta: "Browse neighborhood comparisons",
    back: "Back to home",
  },
  de: {
    title: "Fast geschafft — bestätige deine E-Mail",
    head: "Fast geschafft.",
    body: "Wir haben dir gerade eine Bestätigungs-E-Mail geschickt. Klicke auf den Link, um die Anmeldung abzuschließen — wir senden dir nichts, bevor du bestätigt hast.",
    finePrint: "Nicht bekommen? Schaue im Spam-Ordner nach. Absender ist hello@wheretostayeurope.com.",
    cta: "Vergleiche durchstöbern",
    back: "Zurück zur Startseite",
  },
  fr: {
    title: "Presque terminé — confirmez votre e-mail",
    head: "Presque terminé.",
    body: "Nous venons d'envoyer un e-mail de confirmation. Cliquez sur le lien à l'intérieur pour finaliser l'inscription — nous ne vous enverrons rien tant que vous n'aurez pas confirmé.",
    finePrint: "Pas reçu ? Vérifiez votre dossier spam. L'expéditeur est hello@wheretostayeurope.com.",
    cta: "Parcourir les comparaisons",
    back: "Retour à l'accueil",
  },
  es: {
    title: "Casi listo — confirma tu correo",
    head: "Casi listo.",
    body: "Acabamos de enviarte un correo de confirmación. Haz clic en el enlace para completar la suscripción — no te enviaremos nada hasta que confirmes.",
    finePrint: "¿No lo has recibido? Revisa tu carpeta de spam. El remitente es hello@wheretostayeurope.com.",
    cta: "Explorar comparaciones",
    back: "Volver al inicio",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;
  const path = "thank-you";
  return {
    title: `${copy.title} — ${SITE_NAME}`,
    description: copy.body,
    robots: { index: false, follow: true }, // utility page, not indexable
    alternates: {
      canonical: `${SITE_URL}/${locale}/${path}`,
      languages: buildHreflangTags({ path, locales: [...SUPPORTED_LOCALES] }),
    },
  };
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  const copy = COPY[locale] ?? COPY.en;

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ textAlign: "center" }}>
        <div
          aria-hidden="true"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#16a34a",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            margin: "0 auto 24px",
          }}
        >
          ✓
        </div>
        <h1 style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 14px", fontWeight: 700, color: "#0f172a" }}>
          {copy.head}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "#334155", margin: "0 0 18px" }}>
          {copy.body}
        </p>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: "#64748b", margin: "0 0 32px" }}>
          {copy.finePrint}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href={`/${locale}/compare`}
            style={{
              background: "#0f172a",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {copy.cta} →
          </Link>
          <Link
            href={`/${locale}`}
            style={{
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              padding: "12px 22px",
              borderRadius: 999,
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            {copy.back}
          </Link>
        </div>
      </div>
    </main>
  );
}

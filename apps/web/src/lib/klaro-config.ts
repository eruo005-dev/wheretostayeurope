// apps/web/src/lib/klaro-config.ts
//
// Klaro consent manager configuration.
// Categories match the ones read server-side in lib/consent.ts — keep in sync.
//
// Install:
//   pnpm --filter web add klaro
//
// Import in a CLIENT component (see ConsentProvider.tsx). Klaro is browser-only.

export const klaroConfig = {
  version: 1,
  elementID: "klaro",
  storageMethod: "cookie",
  cookieName: "klaro",
  cookieExpiresAfterDays: 180,
  styling: { theme: ["light", "top", "wide"] },

  // Policy: do NOT auto-consent. Opt-in required for all non-essential.
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  noticeAsModal: false,

  // Translations — extend when adding locales to the site
  translations: {
    en: {
      consentModal: {
        title: "Cookie preferences",
        description:
          "We use a minimum of cookies. Analytics is cookie-free. The items below are opt-in — disabling them won't break the site, but interactive maps and affiliate-click attribution will be limited.",
      },
      consentNotice: {
        description:
          "We keep cookies to a minimum. This notice lets you opt in to interactive maps and affiliate click attribution. You can change your choice any time from the footer.",
        learnMore: "Let me choose",
      },
      purposes: {
        maps: "Interactive maps",
        affiliate: "Affiliate click attribution",
      },
      maps: {
        description: "Loads Mapbox tiles for interactive neighborhood maps. Without consent you'll see a static map fallback.",
      },
      affiliate: {
        description: "Tracks your clicks to Booking.com / Expedia / Agoda / Travelpayouts partners (Kiwitaxi, Tiqets, Localrent, Aviasales) so we get credit if you book. You pay the same price.",
      },
      decline: "Decline",
      acceptAll: "Accept all",
      acceptSelected: "Accept selected",
      ok: "OK",
    },
    de: {
      consentModal: { title: "Cookie-Einstellungen", description: "Wir verwenden so wenig Cookies wie möglich. Analytics ist cookie-frei." },
      consentNotice: { description: "Wir setzen Cookies auf ein Minimum. Wähle, was aktiv sein darf.", learnMore: "Auswählen" },
      purposes: { maps: "Interaktive Karten", affiliate: "Affiliate-Tracking" },
      decline: "Ablehnen", acceptAll: "Alle akzeptieren", acceptSelected: "Auswahl speichern", ok: "OK",
    },
    fr: {
      consentModal: { title: "Préférences cookies", description: "Nous utilisons le minimum de cookies. Les statistiques sont sans cookie." },
      consentNotice: { description: "Nous limitons les cookies au strict nécessaire. Choisissez ce que vous acceptez.", learnMore: "Choisir" },
      purposes: { maps: "Cartes interactives", affiliate: "Suivi affilié" },
      decline: "Refuser", acceptAll: "Tout accepter", acceptSelected: "Valider la sélection", ok: "OK",
    },
    es: {
      consentModal: { title: "Preferencias de cookies", description: "Usamos los cookies mínimos. La analítica es sin cookies." },
      consentNotice: { description: "Limitamos los cookies al mínimo. Elige lo que permites.", learnMore: "Elegir" },
      purposes: { maps: "Mapas interactivos", affiliate: "Seguimiento de afiliados" },
      decline: "Rechazar", acceptAll: "Aceptar todo", acceptSelected: "Guardar selección", ok: "OK",
    },
  },

  services: [
    {
      name: "maps",
      title: "Mapbox",
      purposes: ["maps"],
      cookies: [
        // Mapbox cookies — match by regex to catch all variants
        [/^mbox/, "/", ".mapbox.com"],
      ],
      required: false,
      optOut: false,
      onlyOnce: true,
    },
    {
      name: "affiliate",
      title: "Affiliate attribution",
      purposes: ["affiliate"],
      cookies: [
        // Booking / Agoda / Expedia
        [/^_aid/, "/", ".booking.com"],
        [/^aid/, "/", ".agoda.com"],
        [/^impact/, "/", ".expedia.com"],
        // Travelpayouts Drive + brand partners (Kiwitaxi, Tiqets, Localrent, Aviasales, etc.)
        [/.*/, "/", ".emrldtp.com"],
        [/.*/, "/", ".tp.media"],
        [/.*/, "/", ".tpemb.com"],
        [/.*/, "/", ".kiwitaxi.com"],
        [/.*/, "/", ".tiqets.com"],
        [/.*/, "/", ".localrent.com"],
      ],
      required: false,
      optOut: false,
    },
  ],
} as const;

export type KlaroConfig = typeof klaroConfig;

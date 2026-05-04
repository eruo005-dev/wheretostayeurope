// apps/web/src/components/seo/GoogleAdSense.tsx
//
// Google AdSense site verification + loader. Renders both the
//   <script async src="...adsbygoogle.js?client=..." />
// and the
//   <meta name="google-adsense-account" content="..." />
// tags from a single env var, GOOGLE_ADSENSE_CLIENT_ID. When unset
// (preview branches, local dev) nothing renders.
//
// IMPLEMENTATION NOTE: rendered as raw <script>/<meta> in a Server
// Component, not next/script. Same reason as TravelpayoutsDrive —
// next/script's <Script> is a Client Component, and any handler prop
// triggers RSC serialization errors. Raw tags ship clean HTML to
// AdSense's crawler for site verification.
//
// PRIVACY NOTE: this loads adsbygoogle.js from googlesyndication.com
// which can set ad-personalization cookies. Once AdSense approves the
// site and starts serving ads, gate this behind a Klaro `advertising`
// consent category. For now (pre-verification) the script is loaded
// unconditionally so Google's verification crawler sees it; AdSense
// itself can serve non-personalized ads to deny-consent users.

const ADSENSE_CLIENT_ID = process.env.GOOGLE_ADSENSE_CLIENT_ID;

export function GoogleAdSense() {
  if (!ADSENSE_CLIENT_ID) return null;

  // Defensive sanity check — must be ca-pub-NNNNNN format. Reject anything else.
  if (!/^ca-pub-\d+$/.test(ADSENSE_CLIENT_ID)) {
    // eslint-disable-next-line no-console
    console.warn(
      `[adsense] GOOGLE_ADSENSE_CLIENT_ID="${ADSENSE_CLIENT_ID}" looks malformed (expected "ca-pub-NNNNNN"). Skipping.`
    );
    return null;
  }

  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

  return (
    <>
      <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
      <script async src={src} crossOrigin="anonymous" />
    </>
  );
}

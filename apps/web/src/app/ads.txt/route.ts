// apps/web/src/app/ads.txt/route.ts
//
// Authorized digital sellers declaration. Required by Google AdSense (and
// programmatic ad networks generally) for ad inventory to be sold under
// this domain. Spec: https://iabtechlab.com/ads-txt/
//
// Format: <ad system>, <publisher account ID>, DIRECT|RESELLER, <cert auth>
//
// Sourced from `GOOGLE_ADSENSE_CLIENT_ID` env var so the publisher ID can
// be rotated without code changes. Falls back to hardcoded value for the
// current AdSense application.
//
// Served at /ads.txt at the site root. Middleware (`middleware.ts`) skips
// this path so it doesn't get prefixed with a locale.

const ADSENSE_CLIENT_ID = process.env.GOOGLE_ADSENSE_CLIENT_ID ?? "ca-pub-8018173696794576";

/**
 * Strip the "ca-" prefix Google uses on script URLs and meta tags but
 * which doesn't appear in ads.txt entries (which use bare "pub-NNNNNN").
 */
function publisherIdForAdsTxt(clientId: string): string {
  return clientId.replace(/^ca-/, "");
}

export function GET() {
  const publisherId = publisherIdForAdsTxt(ADSENSE_CLIENT_ID);
  const body = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Ad networks re-fetch ads.txt periodically; allow short caching.
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

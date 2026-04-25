# Klaro Consent Manager — Integration Guide

Klaro handles the cookie consent UI. Two shipped files:
- `klaro-config.ts` → `apps/web/src/lib/klaro-config.ts`
- `ConsentProvider.tsx` → `apps/web/src/components/legal/ConsentProvider.tsx`

Server-side consent reading (already shipped) lives in `apps/web/src/lib/consent.ts`. The provider is for client-side reactivity so the map lights up when a user accepts without a page reload.

---

## Install

```bash
pnpm --filter web add klaro
```

## Wire into root layout

Your `apps/web/src/app/layout.tsx` (or `[locale]/layout.tsx` if Klaro needs per-locale copy) mounts the provider at the top of `<body>`:

```tsx
import { ConsentProvider } from "@/components/legal/ConsentProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConsentProvider>
          {children}
        </ConsentProvider>
      </body>
    </html>
  );
}
```

## Add to footer

In your footer component, use the pre-built button so users can re-open preferences:

```tsx
import { ConsentPreferencesButton } from "@/components/legal/ConsentProvider";

export function Footer() {
  return (
    <footer>
      <nav aria-label="Legal">
        <a href="/legal/privacy">Privacy</a>
        <a href="/legal/terms">Terms</a>
        <a href="/legal/cookies">Cookies</a>
        <a href="/legal/disclosure">Affiliate disclosure</a>
        <a href="/legal/impressum">Impressum</a>
        <ConsentPreferencesButton>Cookie preferences</ConsentPreferencesButton>
      </nav>
    </footer>
  );
}
```

## Client-side consent-aware components

The existing `NeighborhoodMap` takes `hasConsent` as a prop — server components already pass this via `getConsent()`. If you need client-side reactivity (map lights up the moment a user accepts without refresh), wrap the map in a small client component:

```tsx
// apps/web/src/components/maps/ConsentAwareNeighborhoodMap.tsx
"use client";

import { useConsent } from "@/components/legal/ConsentProvider";
import { NeighborhoodMap, type NeighborhoodFeature } from "./NeighborhoodMap";

type Props = {
  cityCenter: [number, number];
  neighborhoods: NeighborhoodFeature[];
  highlightedSlug?: string;
  height?: number | string;
  initialConsent: boolean; // from server RSC read — avoids hydration flicker
};

export function ConsentAwareNeighborhoodMap({
  cityCenter,
  neighborhoods,
  highlightedSlug,
  height,
  initialConsent,
}: Props) {
  const { maps, hasInitialized } = useConsent();
  // Before Klaro initializes, use the server-read value to avoid flashing the fallback.
  const hasConsent = hasInitialized ? maps : initialConsent;

  return (
    <NeighborhoodMap
      cityCenter={cityCenter}
      neighborhoods={neighborhoods}
      highlightedSlug={highlightedSlug}
      height={height}
      hasConsent={hasConsent}
    />
  );
}
```

Swap the direct `NeighborhoodMap` import in your city/neighborhood page files for this wrapper, passing `initialConsent={consent.maps}` as the SSR value. This gives you zero-flash consent-reactive maps.

## Styling

Klaro ships minimal default CSS. Import once in your global stylesheet:

```css
/* apps/web/src/app/globals.css */
@import "klaro/dist/klaro.css";

/* Override theme to match your site palette */
.klaro .cookie-modal .cm-modal {
  border-radius: 8px;
  font-family: inherit;
}
.klaro .cookie-notice {
  border-radius: 8px;
  bottom: 16px;
  max-width: 480px;
}
```

## Verifying it works

After a fresh visit:
1. Open DevTools → Application → Cookies. You should see only `klaro` (after interaction).
2. Network tab: Mapbox requests should NOT fire until you accept the "maps" category.
3. Click an affiliate link: `Set-Cookie` from `.booking.com` should NOT appear if "affiliate" was declined. (The affiliate attribution still works server-side via our `aid=` parameter; you're just blocking Booking's client-side cookie.)

## Consent audit cadence

Per the compliance checklist: cookie audit quarterly. Open DevTools on a clean browser profile, click around the site, and confirm no unexpected cookies are set before consent. If you add a new third-party script, update `klaro-config.ts` services list first — don't ship the script live until the category is added.

## Known Klaro gotchas

- **Klaro's `default: false`** means users see no pre-checked boxes. Do NOT change to `default: true` — that's pre-ticked consent, which is illegal under GDPR.
- **Next.js hydration warnings**: Klaro modifies the DOM after mount. The `"use client"` + `useEffect` pattern in the provider avoids SSR hydration mismatches.
- **SSR cookie read race**: server reads the `klaro` cookie via `next/headers`. First-visit users have no cookie → fallback denies. Subsequent visits pick up consent correctly.
- **Klaro global `window.klaro`** is how we call `show()` from the footer button. Don't rename.

## Alternatives considered (and rejected)

- **Cookiebot** — commercial, €20-60/month, not worth it for a solo operator.
- **Osano** — free tier limited to 5k visitors/mo, paid tier expensive.
- **CookieYes** — closed-source, per-page-view pricing, vendor lock-in.
- **Building our own** — technically possible, not worth the ongoing maintenance (consent UI law changes; Klaro tracks that).

Klaro stays free, open-source, self-hosted, and keeps us off a third-party dependency that would itself require a privacy notice line.

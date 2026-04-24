// apps/web/src/app/layout.tsx
//
// REPLACES the earlier shipped app-layout.tsx.
//
// Minimal passthrough root layout. The html/body tags now live in
// app/(frontend)/[locale]/layout.tsx so the `lang` attribute can be set from
// the URL segment at render time (proper hreflang cross-validation).
//
// This requires Next.js 15's "relaxed root layout" rule: a root layout is still
// required, but if it returns children only, downstream layouts can own the
// html/body tree. Keep this file present so Next.js doesn't complain about a
// missing root layout.

import type { ReactNode } from "react";

export const metadata = {
  // Site-wide metadata stays here as fallback; per-locale metadata is set in
  // the locale layout + each page's generateMetadata.
  title: {
    default: "WhereToStayEurope",
    template: "%s · WhereToStayEurope",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

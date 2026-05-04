// apps/web/src/components/affiliate/TravelpayoutsWidget.tsx
//
// Embeds a Travelpayouts widget (Kiwitaxi search form, Tiqets tours, Localrent
// search, etc.) by injecting their `tpemb.com/content?...` script tag. All
// widgets share the same loader URL and differ only by query string.
//
// Privacy: the widget loads third-party JS from tpemb.com which sets cookies.
// We gate the script behind the `affiliate` Klaro consent category. Without
// consent the component renders a thin fallback CTA instead of the widget,
// so users can still convert via a direct deep-link.

"use client";

import { useEffect, useRef, useState } from "react";

export type TPWidgetLoaderParams = Record<string, string | number | boolean | undefined>;

type Props = {
  /** Search params to append to https://tpemb.com/content. Built by per-kind wrappers. */
  params: TPWidgetLoaderParams;
  /** Whether the user has granted affiliate-cookie consent (server-read). */
  hasConsent: boolean;
  /** Pixel/CSS height for the placeholder while the script loads. */
  height?: number | string;
  /** Fallback rendered when consent denied. Usually a deep-link CTA. */
  fallback: React.ReactNode;
  /** aria-label for the embedded widget container (e.g. "Airport transfer search"). */
  ariaLabel: string;
};

export function TravelpayoutsWidget({
  params,
  hasConsent,
  height = 400,
  fallback,
  ariaLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!hasConsent) return;
    if (!containerRef.current) return;
    if (containerRef.current.dataset.tpLoaded === "1") return;

    const url = buildLoaderUrl(params);
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src = url;
    script.onload = () => setLoaded(true);
    script.onerror = () => {
      // eslint-disable-next-line no-console
      console.warn("[TravelpayoutsWidget] script failed to load", url);
    };
    containerRef.current.appendChild(script);
    containerRef.current.dataset.tpLoaded = "1";

    // Note: the TP loader script renders into the container itself; cleaning it
    // up between consent toggles is best-effort because the script registers
    // global handlers we can't fully unwind. Re-rendering the component remounts
    // a fresh container, which is enough for our flows.
    return () => {
      // intentionally minimal — TP widget owns its DOM after load
    };
  }, [hasConsent, params]);

  if (!hasConsent) return <>{fallback}</>;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      aria-busy={!loaded}
      style={{
        width: "100%",
        minHeight: typeof height === "number" ? `${height}px` : height,
        background: "#fafaf9",
        borderRadius: 10,
        overflow: "hidden",
      }}
    />
  );
}

function buildLoaderUrl(params: TPWidgetLoaderParams): string {
  const url = new URL("https://tpemb.com/content");
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    url.searchParams.set(k, String(v));
  }
  return url.toString();
}

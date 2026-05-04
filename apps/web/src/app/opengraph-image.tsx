// apps/web/src/app/opengraph-image.tsx
//
// Default 1200x630 Open Graph image (Twitter/Facebook/LinkedIn link previews).
// Used as the fallback when a page's metadata doesn't set its own og:image.
// Generated dynamically via ImageResponse — no static asset needed.

import { ImageResponse } from "next/og";

export const alt = "WhereToStayEurope — the decision layer for European accommodation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d3e3a 60%, #3a2e24 100%)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.65)",
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          WhereToStayEurope
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            maxWidth: 920,
          }}
        >
          <span>Where to stay in Europe —</span>
          <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>
            by neighborhood, by trip type.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          The decision layer aggregators won&apos;t write.
        </div>
      </div>
    ),
    size
  );
}

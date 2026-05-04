// apps/web/src/app/icon.tsx
//
// Dynamic favicon (Next.js metadata convention). Renders a simple "W" monogram
// at 32x32 — ImageResponse handles raster generation at build time so no
// binary asset is checked into git.

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        W
      </div>
    ),
    size
  );
}

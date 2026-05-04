// apps/web/src/app/apple-icon.tsx
//
// 180x180 apple-touch-icon (iOS home screen / Safari pinned tabs). Same
// monogram as icon.tsx, scaled up.

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 120,
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

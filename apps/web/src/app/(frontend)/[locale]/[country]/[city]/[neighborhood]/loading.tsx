// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/loading.tsx
//
// Skeleton shown while the neighborhood page server-renders (RSC streaming).
// Keep it minimal — layout stability (CLS) matters more than fidelity.

export default function Loading() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }} aria-busy="true" aria-live="polite">
      <div style={{ ...bar, width: "40%", height: 12, marginBottom: 14 }} />
      <div style={{ ...bar, width: "70%", height: 38, marginBottom: 10 }} />
      <div style={{ ...bar, width: "90%", height: 20, marginBottom: 6 }} />
      <div style={{ ...bar, width: "80%", height: 20, marginBottom: 24 }} />

      <div
        style={{
          ...bar,
          width: "100%",
          aspectRatio: "16 / 9",
          height: "auto",
          borderRadius: 8,
          marginBottom: 28,
        }}
      />

      <div style={{ ...bar, width: "30%", height: 28, marginBottom: 12 }} />
      <div style={{ ...bar, width: "100%", height: 16, marginBottom: 6 }} />
      <div style={{ ...bar, width: "95%", height: 16, marginBottom: 6 }} />
      <div style={{ ...bar, width: "60%", height: 16, marginBottom: 32 }} />

      <div style={{ ...bar, width: "100%", height: 420, borderRadius: 8, marginBottom: 32 }} />

      <div style={{ ...bar, width: "45%", height: 28, marginBottom: 12 }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ ...bar, aspectRatio: "4 / 3", height: "auto", borderRadius: 0 }} />
            <div style={{ padding: 12 }}>
              <div style={{ ...bar, width: "80%", height: 18, marginBottom: 8 }} />
              <div style={{ ...bar, width: "50%", height: 14, marginBottom: 8 }} />
              <div style={{ ...bar, width: "95%", height: 14 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const bar: React.CSSProperties = {
  background:
    "linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)",
  backgroundSize: "200% 100%",
  animation: "wts-skeleton-shimmer 1.4s ease-in-out infinite",
  borderRadius: 4,
  display: "block",
};

// Add this to your globals.css (or inject via styled-jsx) once:
//   @keyframes wts-skeleton-shimmer { 0% {background-position: 200% 0;} 100% {background-position: -200% 0;} }

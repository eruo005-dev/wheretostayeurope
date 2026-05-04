// apps/web/src/components/maps/NeighborhoodMap.tsx
//
// Mapbox GL neighborhood boundary map with consent gating.

"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export type NeighborhoodFeature = {
  name: string;
  slug: string;
  polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  centroid?: [number, number];
};

type Props = {
  cityCenter: [number, number];
  neighborhoods: NeighborhoodFeature[];
  highlightedSlug?: string;
  onSelect?: (slug: string) => void;
  height?: number | string;
  staticFallbackUrl?: string;
  hasConsent?: boolean;
};

export function NeighborhoodMap({
  cityCenter,
  neighborhoods,
  highlightedSlug,
  onSelect,
  height = 480,
  staticFallbackUrl,
  hasConsent,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mounted, setMounted] = useState(false);

  // Hooks are unconditionally declared above; consent gates the *effect body*
  // and the JSX branch below. Returning early before the effects below would
  // violate the Rules of Hooks when consent flips mid-session.

  useEffect(() => {
    if (!hasConsent) return;
    if (!containerRef.current || mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      // eslint-disable-next-line no-console
      console.error("[NeighborhoodMap] NEXT_PUBLIC_MAPBOX_TOKEN missing");
      return;
    }
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: cityCenter,
      zoom: 12,
      attributionControl: true,
    });

    map.on("load", () => {
      const fc: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: neighborhoods.map((n) => ({
          type: "Feature",
          properties: { name: n.name, slug: n.slug },
          geometry: n.polygon,
        })),
      };
      map.addSource("neighborhoods", { type: "geojson", data: fc });

      map.addLayer({
        id: "neighborhoods-fill",
        type: "fill",
        source: "neighborhoods",
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "slug"], highlightedSlug ?? ""],
            "#2563eb",
            "#94a3b8",
          ],
          "fill-opacity": [
            "case",
            ["==", ["get", "slug"], highlightedSlug ?? ""],
            0.5,
            0.22,
          ],
        },
      });

      map.addLayer({
        id: "neighborhoods-line",
        type: "line",
        source: "neighborhoods",
        paint: { "line-color": "#1e293b", "line-width": 1.2 },
      });

      map.addLayer({
        id: "neighborhoods-labels",
        type: "symbol",
        source: "neighborhoods",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 13,
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        },
        paint: {
          "text-color": "#0f172a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1.5,
        },
      });

      map.on("click", "neighborhoods-fill", (e) => {
        const slug = e.features?.[0]?.properties?.slug as string | undefined;
        if (slug && onSelect) onSelect(slug);
      });
      map.on("mouseenter", "neighborhoods-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "neighborhoods-fill", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    mapRef.current = map;
    setMounted(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasConsent]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mounted) return;
    try {
      map.setPaintProperty("neighborhoods-fill", "fill-color", [
        "case",
        ["==", ["get", "slug"], highlightedSlug ?? ""],
        "#2563eb",
        "#94a3b8",
      ] as never);
      map.setPaintProperty("neighborhoods-fill", "fill-opacity", [
        "case",
        ["==", ["get", "slug"], highlightedSlug ?? ""],
        0.5,
        0.22,
      ] as never);
    } catch {
      // layer not yet ready
    }
  }, [highlightedSlug, mounted]);

  if (!hasConsent) {
    return <StaticFallback height={height} staticFallbackUrl={staticFallbackUrl} />;
  }

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height, borderRadius: 8, overflow: "hidden" }}
      role="region"
      aria-label="Interactive neighborhood map"
    />
  );
}

function StaticFallback({
  height,
  staticFallbackUrl,
}: {
  height: number | string;
  staticFallbackUrl?: string;
}) {
  return (
    <div
      role="region"
      aria-label="Neighborhood map (consent required)"
      style={{
        width: "100%",
        height,
        borderRadius: 8,
        overflow: "hidden",
        background: staticFallbackUrl
          ? `url(${staticFallbackUrl}) center/cover no-repeat`
          : "#f1f5f9",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        color: "#334155",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          padding: "12px 16px",
          borderRadius: 6,
          maxWidth: 360,
          textAlign: "center",
        }}
      >
        Interactive map needs map cookies.{" "}
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).klaro?.show?.();
          }}
          style={{
            color: "#2563eb",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Enable
        </button>
      </div>
    </div>
  );
}

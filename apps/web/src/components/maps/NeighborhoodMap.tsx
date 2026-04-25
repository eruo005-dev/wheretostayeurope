// apps/web/src/components/maps/NeighborhoodMap.tsx
// Mapbox GL interactive neighborhood boundary map.
// Client component. Requires NEXT_PUBLIC_MAPBOX_TOKEN.
// Expects neighborhoods with GeoJSON polygons (from neighborhoods.polygonGeojson).

"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export type NeighborhoodFeature = {
  name: string;
  slug: string;
  polygon: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  centroid?: [number, number]; // [lng, lat]
};

type Props = {
  cityCenter: [number, number]; // [lng, lat]
  neighborhoods: NeighborhoodFeature[];
  highlightedSlug?: string;
  onSelect?: (slug: string) => void;
  height?: number;
  initialZoom?: number;
};

export function NeighborhoodMap({
  cityCenter,
  neighborhoods,
  highlightedSlug,
  onSelect,
  height = 480,
  initialZoom = 12,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      // eslint-disable-next-line no-console
      console.error("[NeighborhoodMap] NEXT_PUBLIC_MAPBOX_TOKEN is missing.");
      return;
    }
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: cityCenter,
      zoom: initialZoom,
      attributionControl: true,
      cooperativeGestures: true, // mobile-friendly: two-finger pan on mobile, ctrl+scroll on desktop
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      const featureCollection: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: neighborhoods.map((n) => ({
          type: "Feature",
          properties: { name: n.name, slug: n.slug },
          geometry: n.polygon,
        })),
      };

      map.addSource("neighborhoods", { type: "geojson", data: featureCollection });

      map.addLayer({
        id: "neighborhoods-fill",
        type: "fill",
        source: "neighborhoods",
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "slug"], highlightedSlug ?? ""],
            "#2563eb", // blue-600
            "#94a3b8", // slate-400
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
        paint: {
          "line-color": "#1e293b",
          "line-width": 1.2,
        },
      });

      map.addLayer({
        id: "neighborhoods-labels",
        type: "symbol",
        source: "neighborhoods",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 13,
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-allow-overlap": false,
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

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount once; data changes handled in effects below

  // Update highlighted neighborhood without full remount
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const apply = () => {
      if (!map.getLayer("neighborhoods-fill")) return;
      map.setPaintProperty("neighborhoods-fill", "fill-color", [
        "case",
        ["==", ["get", "slug"], highlightedSlug ?? ""],
        "#2563eb",
        "#94a3b8",
      ]);
      map.setPaintProperty("neighborhoods-fill", "fill-opacity", [
        "case",
        ["==", ["get", "slug"], highlightedSlug ?? ""],
        0.5,
        0.22,
      ]);
    };
    if (map.isStyleLoaded()) apply();
    else map.once("load", apply);
  }, [highlightedSlug]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height,
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
      role="region"
      aria-label="Interactive neighborhood map"
    />
  );
}

// apps/web/src/components/visualizations/PriceBandHistogram.tsx

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type PriceBand = "$" | "$$" | "$$$" | "$$$$";

type Props = {
  counts: Record<PriceBand, number>;
  compact?: boolean;
  locale?: "en" | "de" | "fr" | "es";
};

const BAND_LABELS: Record<string, Record<PriceBand, string>> = {
  en: { "$": "Budget", "$$": "Mid", "$$$": "Upper-mid", "$$$$": "Luxury" },
  de: { "$": "Günstig", "$$": "Mittel", "$$$": "Gehoben", "$$$$": "Luxus" },
  fr: { "$": "Économique", "$$": "Moyen", "$$$": "Supérieur", "$$$$": "Luxe" },
  es: { "$": "Económico", "$$": "Medio", "$$$": "Alto", "$$$$": "Lujo" },
};

const COLORS: Record<PriceBand, string> = {
  "$": "#10b981",
  "$$": "#3b82f6",
  "$$$": "#8b5cf6",
  "$$$$": "#ec4899",
};

export function PriceBandHistogram({ counts, compact = false, locale = "en" }: Props) {
  const total = (["$", "$$", "$$$", "$$$$"] as const).reduce((a, b) => a + (counts[b] ?? 0), 0);
  if (total === 0) return null;

  const labels = BAND_LABELS[locale] ?? BAND_LABELS.en;

  const data = (["$", "$$", "$$$", "$$$$"] as const).map((band) => ({
    band,
    label: labels[band],
    count: counts[band] ?? 0,
    pct: Math.round(((counts[band] ?? 0) / total) * 100),
  }));

  if (compact) {
    return (
      <div
        style={{
          display: "flex",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
          marginTop: 8,
          background: "#f1f5f9",
        }}
        role="img"
        aria-label={`Price distribution: ${data.map((d) => `${d.label} ${d.pct}%`).join(", ")}`}
      >
        {data.map((d) =>
          d.count > 0 ? (
            <div
              key={d.band}
              title={`${d.label}: ${d.count} (${d.pct}%)`}
              style={{ flex: d.count, background: COLORS[d.band] }}
            />
          ) : null
        )}
      </div>
    );
  }

  return (
    <div
      style={{ width: "100%", height: 220 }}
      role="img"
      aria-label={`Price band distribution: ${data.map((d) => `${d.label}: ${d.count} properties`).join(", ")}`}
    >
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            formatter={(v: number, _n, p: { payload?: { pct: number } }) => [
              `${v} properties (${p?.payload?.pct ?? 0}%)`,
              "Count",
            ]}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.band} fill={COLORS[d.band]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

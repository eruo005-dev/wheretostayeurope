// apps/web/src/components/visualizations/PriceBandHistogram.tsx
// Two variants:
//   - Full chart for city pillar pages (bars with labels, tooltip)
//   - Compact inline strip for neighborhood H3 blocks (4-segment bar)
// Data source: aggregate COUNT(*) GROUP BY price_band from `properties` table.

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
  heightPx?: number;
};

const BAND_LABEL: Record<PriceBand, string> = {
  "$": "Budget",
  "$$": "Mid",
  "$$$": "Upper-mid",
  "$$$$": "Luxury",
};

const BAND_COLOR: Record<PriceBand, string> = {
  "$": "#10b981",    // emerald-500
  "$$": "#3b82f6",   // blue-500
  "$$$": "#8b5cf6",  // violet-500
  "$$$$": "#ec4899", // pink-500
};

const BANDS: PriceBand[] = ["$", "$$", "$$$", "$$$$"];

export function PriceBandHistogram({ counts, compact = false, heightPx = 200 }: Props) {
  const total = BANDS.reduce((sum, b) => sum + (counts[b] ?? 0), 0);
  if (total === 0) return null;

  const data = BANDS.map((band) => ({
    band,
    label: BAND_LABEL[band],
    count: counts[band] ?? 0,
    pct: Math.round(((counts[band] ?? 0) / total) * 100),
  }));

  if (compact) {
    const aria = data
      .filter((d) => d.count > 0)
      .map((d) => `${d.label} ${d.pct}%`)
      .join(", ");

    return (
      <div
        style={{
          display: "flex",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
          marginTop: 8,
          border: "1px solid #e2e8f0",
        }}
        role="img"
        aria-label={`Price distribution in this neighborhood: ${aria}`}
      >
        {data.map((d) =>
          d.count > 0 ? (
            <div
              key={d.band}
              title={`${d.label} (${d.band}): ${d.count} properties (${d.pct}%)`}
              style={{
                flex: d.count,
                background: BAND_COLOR[d.band],
              }}
            />
          ) : null
        )}
      </div>
    );
  }

  return (
    <div
      style={{ width: "100%", height: heightPx }}
      role="img"
      aria-label={`Price band distribution: ${data
        .map((d) => `${d.label}: ${d.count} properties`)
        .join(", ")}`}
    >
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.12)" }}
            formatter={(v: number, _n, p: { payload: (typeof data)[number] }) => [
              `${v} properties (${p.payload.pct}%)`,
              "Count",
            ]}
            labelFormatter={(label: string) => label}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.band} fill={BAND_COLOR[d.band]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

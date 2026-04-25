// apps/web/src/components/affiliate/PropertyCard.tsx
//
// Standalone affiliate property tile. Rendered in grids on neighborhood,
// city, and Tier 3 pages. Uses Booking deep-link builder for the CTA URL;
// attribute-tagged with rel="sponsored nofollow noopener".

import Image from "next/image";
import { buildHotelUrl, type TrackingLabel } from "@/lib/affiliate/booking";

export type PropertyCardData = {
  id: string;
  bookingId: string | null;
  name: string;
  type: string | null;
  starRating: number | null;
  reviewScore: number | null;
  reviewCount: number | null;
  priceBand: "$" | "$$" | "$$$" | "$$$$" | null;
  priceEstimateEur: number | null;
  imagePrimaryUrl: string | null;
  /** Affiliate URL template from Booking (country slug + hotel slug). */
  affiliateUrlTemplate: string | null;
  shortPitch?: string | null;
};

type Props = {
  property: PropertyCardData;
  locale: "en" | "de" | "fr" | "es";
  pageId: string;
  pageType: TrackingLabel["pageType"];
};

const COPY: Record<string, { book: string; from: string; reviews: string }> = {
  en: { book: "Check rates on Booking", from: "from", reviews: "reviews" },
  de: { book: "Preise auf Booking prüfen", from: "ab", reviews: "Bewertungen" },
  fr: { book: "Voir les tarifs sur Booking", from: "à partir de", reviews: "avis" },
  es: { book: "Ver tarifas en Booking", from: "desde", reviews: "opiniones" },
};

export function PropertyCard({ property, locale, pageId, pageType }: Props) {
  const copy = COPY[locale] ?? COPY.en;

  const urlMatch = property.affiliateUrlTemplate?.match(/\/hotel\/([a-z]{2})\/([^.]+)\.html/);
  const countrySlug = urlMatch?.[1];
  const hotelSlug = urlMatch?.[2];

  const label: TrackingLabel = {
    pageType,
    pageId,
    locale,
    component: "property_card",
  };

  const bookingUrl =
    countrySlug && hotelSlug
      ? buildHotelUrl({ countrySlug, hotelSlug, locale }, label)
      : null;

  return (
    <article
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {property.imagePrimaryUrl ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
          <Image
            src={property.imagePrimaryUrl}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div style={{ background: "#f1f5f9", aspectRatio: "4 / 3" }} aria-hidden="true" />
      )}

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <h3 style={{ fontSize: 16, margin: 0, lineHeight: 1.25 }}>{property.name}</h3>

        <div style={{ fontSize: 13, color: "#475569", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {property.starRating ? <span>{"★".repeat(Math.round(property.starRating))}</span> : null}
          {property.reviewScore ? (
            <span>
              <strong>{property.reviewScore.toFixed(1)}</strong> · {property.reviewCount ?? 0} {copy.reviews}
            </span>
          ) : null}
        </div>

        {property.shortPitch && (
          <p style={{ fontSize: 13, color: "#334155", margin: 0, lineHeight: 1.45 }}>
            {property.shortPitch}
          </p>
        )}

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            {property.priceEstimateEur ? (
              <>
                {copy.from} <strong>€{property.priceEstimateEur}</strong>
                <sup style={{ fontSize: "0.7em", marginLeft: 2 }}>*</sup>
              </>
            ) : property.priceBand ? (
              <strong>{property.priceBand}</strong>
            ) : null}
          </div>

          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              aria-label={`${copy.book} — ${property.name}`}
              style={{
                background: "#0f172a",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 13,
                textDecoration: "none",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {copy.book} →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

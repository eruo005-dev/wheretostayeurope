// apps/web/src/collections/Pages.ts
//
// The Pages collection is the editorial surface for every published URL that isn't
// a directly-generated entity page (country/city/neighborhood hubs render from
// their own collections). It covers:
//   - Comparison pages
//   - Trip-type × city pages
//   - Contrarian / long-form pieces
//   - Seasonal tentpoles
//   - Programmatic (Tier 3) page metadata (content assembled at build from DB)

import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "adminTitle",
    defaultColumns: ["adminTitle", "type", "tier", "status", "publishedAt"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "adminTitle",
      type: "text",
      required: true,
      admin: { description: "Internal label for admin UI (not shown to readers)." },
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Neighborhood comparison", value: "neighborhood_comparison" },
        { label: "Trip-type × city", value: "trip_type_city" },
        { label: "Property shortlist (Tier 3)", value: "property_shortlist" },
        { label: "Price band (Tier 3)", value: "price_band" },
        { label: "Amenity (Tier 3)", value: "amenity" },
        { label: "Near attraction (Tier 3)", value: "near_attraction" },
        { label: "Contrarian", value: "contrarian" },
        { label: "Seasonal", value: "seasonal" },
        { label: "Long-form / feature", value: "feature" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "tier",
      type: "select",
      required: true,
      options: [
        { label: "Tier 1 — editorial flagship", value: "1" },
        { label: "Tier 2 — templated editorial", value: "2" },
        { label: "Tier 3 — programmatic", value: "3" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "AI-drafted (awaiting edit)", value: "ai_drafted" },
        { label: "Editing", value: "editing" },
        { label: "Published", value: "published" },
        { label: "Stale (needs review)", value: "stale" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "entityType",
      type: "select",
      options: [
        { label: "Country", value: "country" },
        { label: "City", value: "city" },
        { label: "Neighborhood", value: "neighborhood" },
        { label: "Property set (Tier 3)", value: "property_set" },
        { label: "Attraction", value: "attraction" },
      ],
      admin: {
        description: "What the page is primarily about — drives schema + breadcrumbs.",
        position: "sidebar",
      },
    },
    {
      name: "country",
      type: "relationship",
      relationTo: "countries",
      admin: { condition: (_, s) => !!s?.entityType },
    },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
      admin: { condition: (_, s) => s?.entityType !== "country" },
    },
    {
      name: "neighborhood",
      type: "relationship",
      relationTo: "neighborhoods",
      admin: { condition: (_, s) => ["neighborhood", "property_set"].includes(s?.entityType) },
    },
    {
      name: "compareNeighborhoods",
      type: "relationship",
      relationTo: "neighborhoods",
      hasMany: true,
      minRows: 2,
      maxRows: 2,
      admin: {
        description: "For neighborhood_comparison type — pick exactly 2.",
        condition: (_, s) => s?.type === "neighborhood_comparison",
      },
    },
    {
      name: "tripType",
      type: "relationship",
      relationTo: "trip-types",
      admin: {
        condition: (_, s) =>
          ["trip_type_city", "property_shortlist"].includes(s?.type),
      },
    },
    {
      name: "programmaticFilters",
      type: "json",
      admin: {
        description:
          'For Tier 3 pages: filter spec used to assemble property list, e.g. {"priceBand":"$$","amenities":["pool","rooftop"],"tripType":"couples"}',
        condition: (_, s) => s?.tier === "3",
      },
    },
    // Content (localized)
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, localized: true, index: true },
    { name: "lede", type: "textarea", localized: true, admin: { description: "Opening 1–2 sentences (SERP description fallback)." } },
    { name: "body", type: "richText", localized: true },
    // SEO
    { name: "metaTitle", type: "text", localized: true, admin: { position: "sidebar" } },
    { name: "metaDescription", type: "textarea", localized: true, admin: { position: "sidebar" } },
    { name: "canonicalOverride", type: "text", admin: { position: "sidebar", description: "Optional custom canonical URL." } },
    {
      name: "schemaMarkup",
      type: "json",
      admin: {
        position: "sidebar",
        description: "Additional JSON-LD. BreadcrumbList + primary entity are generated automatically.",
      },
    },
    {
      name: "hreflangGroupId",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Shared across locale variants of the same logical page. Auto-populated on first locale save.",
      },
    },
    // Editorial tracking
    { name: "wordCount", type: "number", admin: { readOnly: true, description: "Auto-calculated on save." } },
    { name: "qualityScore", type: "number", min: 0, max: 10, admin: { description: "Internal: promote/demote in nav by quality." } },
    { name: "publishedAt", type: "date", admin: { position: "sidebar" } },
    { name: "lastReviewedAt", type: "date", admin: { position: "sidebar" } },
    {
      name: "internalLinks",
      type: "relationship",
      relationTo: "pages",
      hasMany: true,
      admin: {
        description: "Computed + curated outbound internal links. Embedding-driven suggestions later.",
      },
    },
    {
      name: "relatedKeywords",
      type: "relationship",
      relationTo: "keywords",
      hasMany: true,
      admin: { description: "Mapped target queries — enforces one-page-per-primary-intent." },
    },
  ],
  indexes: [
    { fields: ["type", "status"] },
    { fields: ["tier", "status"] },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.slug) data.slug = String(data.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-");
        // Word count from rich-text body (lossy estimate)
        if (data?.body && typeof data.body === "object") {
          try {
            const text = JSON.stringify(data.body);
            data.wordCount = text.split(/\s+/).length;
          } catch {}
        }
        return data;
      },
    ],
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && !data.hreflangGroupId) {
          data.hreflangGroupId = crypto.randomUUID();
        }
        return data;
      },
    ],
  },
  timestamps: true,
};

// apps/web/src/collections/Neighborhoods.ts
// Payload v3 collection. Owns `neighborhoods` + `neighborhoods_locales` tables.
// Geography columns (centroid, polygon) added via 007_postgis_after_payload.sql

import type { CollectionConfig } from "payload";

export const Neighborhoods: CollectionConfig = {
  slug: "neighborhoods",
  labels: { singular: "Neighborhood", plural: "Neighborhoods" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "city", "priceTier", "updatedAt"],
    group: "Geography",
    description: "Unit of editorial depth. Tier 2 pages are built from these rows.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      index: true,
      admin: { position: "sidebar", description: "Kebab-case, unique within city." },
    },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "lat", type: "number", admin: { width: "50%" } },
        { name: "lng", type: "number", admin: { width: "50%" } },
      ],
    },
    {
      name: "polygonGeojson",
      type: "json",
      admin: {
        description:
          "GeoJSON Polygon (4326) for the neighborhood boundary. Drives the Mapbox map. " +
          "Synced to PostGIS `polygon` column via DB trigger.",
      },
    },
    {
      name: "bookingDistrictId",
      type: "number",
      admin: {
        description:
          "Booking.com district ID (optional). If present, affiliate URLs target this district; " +
          "otherwise fall back to city-level search.",
      },
    },
    {
      name: "vibeTags",
      type: "select",
      hasMany: true,
      options: [
        "nightlife",
        "luxury",
        "family-friendly",
        "foodie",
        "romantic",
        "bohemian",
        "historic",
        "quiet",
        "walkable",
        "beach",
        "business",
        "budget",
        "trendy",
        "local-life",
        "touristy",
      ].map((v) => ({ label: v, value: v })),
    },
    {
      name: "tripTypeFit",
      type: "select",
      hasMany: true,
      options: [
        "couples",
        "families",
        "solo",
        "business",
        "luxury",
        "budget",
        "digital-nomads",
        "first-timers",
      ].map((v) => ({ label: v, value: v })),
    },
    {
      type: "row",
      fields: [
        {
          name: "priceTier",
          type: "select",
          admin: { width: "33%" },
          options: [
            { label: "$ (budget)", value: "1" },
            { label: "$$ (mid)", value: "2" },
            { label: "$$$ (upper-mid)", value: "3" },
            { label: "$$$$ (luxury)", value: "4" },
            { label: "$$$$$ (ultra-luxe)", value: "5" },
          ],
        },
        { name: "safetyScore", type: "number", min: 0, max: 10, admin: { width: "33%" } },
        { name: "walkabilityScore", type: "number", min: 0, max: 10, admin: { width: "33%" } },
      ],
    },
    {
      name: "nearestMetro",
      type: "array",
      fields: [{ name: "station", type: "text", required: true }],
    },
    // Localized editorial (auto-creates neighborhoods_locales)
    { name: "summary", type: "textarea", localized: true, admin: { description: "1–2 sentences, used in cheat-sheet tables and meta." } },
    { name: "whoItsFor", type: "textarea", localized: true },
    { name: "whoShouldSkip", type: "textarea", localized: true, admin: { description: "THE differentiator. Required before publish." } },
    { name: "diningNotes", type: "textarea", localized: true },
    { name: "nightlifeNotes", type: "textarea", localized: true },
    { name: "stayTips", type: "textarea", localized: true },
    { name: "metaTitle", type: "text", localized: true, admin: { position: "sidebar" } },
    { name: "metaDescription", type: "textarea", localized: true, admin: { position: "sidebar" } },
    { name: "lastReviewedAt", type: "date", admin: { position: "sidebar" } },
  ],
  indexes: [{ fields: ["city", "slug"], unique: true }],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.slug) data.slug = String(data.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-");
        return data;
      },
    ],
  },
  timestamps: true,
};

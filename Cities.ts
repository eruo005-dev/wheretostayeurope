// apps/web/src/collections/Cities.ts
// Payload v3 collection. Owns the `cities` + `cities_locales` tables.
// Geography columns (centroid, bbox) added via 007_postgis_after_payload.sql

import type { CollectionConfig } from "payload";

export const Cities: CollectionConfig = {
  slug: "cities",
  labels: { singular: "City", plural: "Cities" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "country", "tier", "updatedAt"],
    group: "Geography",
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
      admin: { position: "sidebar", description: "Kebab-case, unique within country." },
    },
    {
      name: "country",
      type: "relationship",
      relationTo: "countries",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "region",
      type: "relationship",
      relationTo: "regions",
      admin: { position: "sidebar", description: "Optional parent region (e.g. Tuscany)." },
    },
    {
      type: "row",
      fields: [
        {
          name: "lat",
          type: "number",
          admin: { width: "50%", description: "Decimal degrees, WGS84." },
        },
        {
          name: "lng",
          type: "number",
          admin: { width: "50%", description: "Decimal degrees, WGS84." },
        },
      ],
    },
    {
      name: "tier",
      type: "select",
      admin: { position: "sidebar" },
      options: [
        { label: "1 — Global top (Paris, Rome, Istanbul)", value: "1" },
        { label: "2 — Major", value: "2" },
        { label: "3 — Secondary", value: "3" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "population", type: "number", admin: { width: "50%" } },
        {
          name: "airportCodes",
          type: "array",
          admin: { width: "50%", description: "IATA codes." },
          fields: [{ name: "code", type: "text", maxLength: 3, required: true }],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "bookingDestId",
          type: "number",
          admin: { width: "50%", description: "Booking.com destination ID for search API." },
        },
        {
          name: "gygLocationId",
          type: "number",
          admin: { width: "50%", description: "GetYourGuide location ID for widget embed." },
        },
      ],
    },
    {
      name: "seasonality",
      type: "json",
      admin: {
        description: `Monthly indices, e.g. { "jan": {"crowd":2,"price":3}, "feb": {...}, ... }`,
      },
    },
    { name: "introHtml", type: "richText", localized: true },
    { name: "whenToVisit", type: "textarea", localized: true },
    { name: "gettingAround", type: "textarea", localized: true },
    { name: "safetyNotes", type: "textarea", localized: true },
    {
      name: "metaTitle",
      type: "text",
      localized: true,
      admin: { position: "sidebar" },
    },
    {
      name: "metaDescription",
      type: "textarea",
      localized: true,
      admin: { position: "sidebar" },
    },
    {
      name: "lastReviewedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
  ],
  indexes: [{ fields: ["country", "slug"], unique: true }],
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

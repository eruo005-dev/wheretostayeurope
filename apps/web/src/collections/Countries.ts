// apps/web/src/collections/Countries.ts
// Payload v3 collection. Owns the `countries` + `countries_locales` tables.

import type { CollectionConfig } from "payload";

export const Countries: CollectionConfig = {
  slug: "countries",
  labels: { singular: "Country", plural: "Countries" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isoCode", "tier", "euMember", "updatedAt"],
    group: "Geography",
    description: "European countries covered by the platform (~44 end-state).",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Localized country name (France / Frankreich / Francia / Francia)" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL slug, kebab-case, not localized (e.g. 'france').",
      },
    },
    {
      name: "isoCode",
      type: "text",
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 2,
      admin: { position: "sidebar", description: "ISO 3166-1 alpha-2 (e.g. 'FR')." },
    },
    {
      type: "row",
      fields: [
        { name: "currencyCode", type: "text", maxLength: 3, admin: { width: "33%" } },
        { name: "timezone", type: "text", admin: { width: "33%" } },
        {
          name: "tier",
          type: "select",
          admin: { width: "33%" },
          options: [
            { label: "1 — Western/primary", value: "1" },
            { label: "2 — Central/Nordic", value: "2" },
            { label: "3 — Balkans/East", value: "3" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "euMember", type: "checkbox", defaultValue: false, admin: { width: "50%" } },
        { name: "schengen", type: "checkbox", defaultValue: false, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "population", type: "number", admin: { width: "50%" } },
        { name: "areaKm2", type: "number", admin: { width: "50%" } },
      ],
    },
    {
      name: "capitalCity",
      type: "relationship",
      relationTo: "cities",
      admin: { position: "sidebar", description: "Set after cities are created." },
    },
    {
      name: "introHtml",
      type: "richText",
      localized: true,
      admin: { description: "Main country-hub editorial intro (Tier 1 content)." },
    },
    {
      name: "bestTimeToVisit",
      type: "textarea",
      localized: true,
    },
    {
      name: "travelTips",
      type: "json",
      localized: true,
      admin: { description: "Free-form JSON: { visa, tipping, transport, scams, power }" },
    },
    {
      name: "metaTitle",
      type: "text",
      localized: true,
      admin: { position: "sidebar", description: "~60 chars for SERP title." },
    },
    {
      name: "metaDescription",
      type: "textarea",
      localized: true,
      admin: { position: "sidebar", description: "~155 chars for SERP snippet." },
    },
    {
      name: "lastReviewedAt",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Last editorial review date. Set 6-month cadence.",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.slug) data.slug = String(data.slug).toLowerCase().replace(/[^a-z0-9-]/g, "-");
        if (data?.isoCode) data.isoCode = String(data.isoCode).toUpperCase();
        return data;
      },
    ],
  },
  timestamps: true,
};

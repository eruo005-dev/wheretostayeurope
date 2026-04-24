// apps/web/src/collections/Keywords.ts
//
// Tracks target queries across locales. Enforces one-page-per-primary-intent.
// Import via CSV from Ahrefs/Semrush/GSC in bulk; keep admin UI usable for manual ops.

import type { CollectionConfig } from "payload";

export const Keywords: CollectionConfig = {
  slug: "keywords",
  labels: { singular: "Keyword", plural: "Keywords" },
  admin: {
    useAsTitle: "query",
    defaultColumns: ["query", "locale", "volumeEstimate", "difficulty", "intent", "mappedPage"],
    group: "SEO",
    description: "Target queries. One row per (query, locale) pair.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: "query", type: "text", required: true, index: true },
    {
      name: "locale",
      type: "select",
      required: true,
      defaultValue: "en",
      options: [
        { label: "English", value: "en" },
        { label: "Deutsch", value: "de" },
        { label: "Français", value: "fr" },
        { label: "Español", value: "es" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "countryTarget",
      type: "text",
      minLength: 2,
      maxLength: 2,
      admin: { position: "sidebar", description: "ISO alpha-2 if intent is country-specific (e.g. 'GB' for UK English)." },
    },
    {
      type: "row",
      fields: [
        { name: "volumeEstimate", type: "number", admin: { width: "50%", description: "Monthly search volume." } },
        {
          name: "volumeConfidence",
          type: "select",
          admin: { width: "50%" },
          options: [
            { label: "Low (gut estimate)", value: "low" },
            { label: "Medium (tool estimate, unverified)", value: "med" },
            { label: "High (verified in multiple tools)", value: "high" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "difficulty", type: "number", min: 0, max: 100, admin: { width: "50%", description: "0–100. From Ahrefs/Semrush." } },
        {
          name: "intent",
          type: "select",
          admin: { width: "50%" },
          options: [
            { label: "Informational", value: "inform" },
            { label: "Comparison", value: "compare" },
            { label: "Transactional", value: "transactional" },
            { label: "Navigational", value: "navigational" },
          ],
        },
      ],
    },
    {
      name: "source",
      type: "select",
      options: [
        { label: "Ahrefs", value: "ahrefs" },
        { label: "Semrush", value: "semrush" },
        { label: "Google Search Console", value: "gsc" },
        { label: "Keywords Everywhere", value: "keywords_everywhere" },
        { label: "Guess (unverified)", value: "guess" },
      ],
      defaultValue: "guess",
      admin: { position: "sidebar" },
    },
    {
      name: "cluster",
      type: "text",
      admin: {
        description: "Cluster identifier (free text for now; graph DB later). Queries in the same cluster map to the same page.",
      },
    },
    {
      name: "mappedPage",
      type: "relationship",
      relationTo: "pages",
      admin: { description: "Single page that targets this primary intent." },
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "SERP observations, competitor dominance, angle to win." },
    },
  ],
  indexes: [
    { fields: ["query", "locale"], unique: true },
    { fields: ["cluster"] },
    { fields: ["locale", "volumeEstimate"] },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.query) data.query = String(data.query).trim().toLowerCase();
        if (data?.countryTarget) data.countryTarget = String(data.countryTarget).toUpperCase();
        return data;
      },
    ],
  },
  timestamps: true,
};

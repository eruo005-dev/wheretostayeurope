// apps/web/src/collections/Media.ts
//
// Media collection with:
//  - Cloudflare R2 storage adapter (zero egress to Cloudflare CDN)
//  - Required attribution fields (UGC-first image strategy = legal obligation)
//  - Source tracking (unsplash|pexels|pixabay|booking|own|commissioned|ai_diagram)
//  - Localized alt text (accessibility + SEO)
//  - Sharp-based image resizing for AVIF/WebP

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "source", "credit", "entityType", "createdAt"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  upload: {
    // Storage adapter (R2) wired in payload.config.ts via @payloadcms/storage-s3
    staticDir: "media",
    mimeTypes: ["image/*", "video/mp4", "video/webm"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre", formatOptions: { format: "webp" } },
      { name: "card", width: 800, height: 600, position: "centre", formatOptions: { format: "webp" } },
      { name: "hero", width: 1600, height: 900, position: "centre", formatOptions: { format: "webp" } },
      { name: "thumbnail_avif", width: 400, height: 300, position: "centre", formatOptions: { format: "avif" } },
      { name: "card_avif", width: 800, height: 600, position: "centre", formatOptions: { format: "avif" } },
      { name: "hero_avif", width: 1600, height: 900, position: "centre", formatOptions: { format: "avif" } },
    ],
  },
  fields: [
    {
      name: "altTextBase",
      type: "text",
      required: true,
      admin: {
        description:
          "Base alt text (English). Used as fallback if locale-specific alt is missing. Describe the image factually — no SEO stuffing.",
      },
    },
    {
      name: "altText",
      type: "text",
      localized: true,
      admin: { description: "Per-locale alt text. Optional; falls back to altTextBase." },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: { description: "Optional caption shown below image." },
    },
    {
      name: "source",
      type: "select",
      required: true,
      options: [
        { label: "Unsplash", value: "unsplash" },
        { label: "Pexels", value: "pexels" },
        { label: "Pixabay", value: "pixabay" },
        { label: "Booking.com (affiliate API)", value: "booking" },
        { label: "Own photo", value: "own" },
        { label: "Commissioned", value: "commissioned" },
        { label: "AI diagram (non-photographic only)", value: "ai_diagram" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description:
          "Photographer name (and handle where applicable). Required for unsplash/pexels/pixabay — attribution is legal obligation under their licenses.",
      },
    },
    {
      name: "creditUrl",
      type: "text",
      admin: { description: "Link back to photographer profile on source platform." },
    },
    {
      name: "license",
      type: "text",
      admin: {
        description: "License identifier (e.g. 'Unsplash License', 'Pexels License', 'CC0', 'All rights reserved').",
      },
    },
    {
      name: "entityType",
      type: "select",
      options: [
        { label: "Country", value: "country" },
        { label: "City", value: "city" },
        { label: "Neighborhood", value: "neighborhood" },
        { label: "Attraction", value: "attraction" },
        { label: "Property", value: "property" },
        { label: "Page", value: "page" },
        { label: "Generic / site chrome", value: "generic" },
      ],
      admin: { position: "sidebar", description: "What the image depicts (for sitemap + admin filtering)." },
    },
    { name: "entityId", type: "text", admin: { position: "sidebar", description: "Entity UUID (loose polymorphic FK)." } },
    {
      type: "row",
      fields: [
        { name: "geoLat", type: "number", admin: { width: "50%", description: "Optional: where photo was taken." } },
        { name: "geoLng", type: "number", admin: { width: "50%" } },
      ],
    },
    {
      name: "reviewStatus",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending review", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected (don't use)", value: "rejected" },
      ],
      admin: {
        position: "sidebar",
        description: "n8n pipeline populates Unsplash results → 'pending'; human approves before publish.",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Enforce: UGC sources must have credit
        if (
          data?.source &&
          ["unsplash", "pexels", "pixabay"].includes(data.source) &&
          !data.credit
        ) {
          throw new Error(
            `Images from ${data.source} require a 'credit' field — attribution is a license obligation.`
          );
        }
        // Warn on AI imagery for non-diagram use
        if (data?.source === "ai_diagram" && data?.entityType && data.entityType !== "generic") {
          // Not a hard error — just flag. Policy: no AI photos of real places.
          console.warn(
            "[media] AI-sourced media tagged to a specific entity. Confirm it's a diagram/chart, not a synthetic photo of a real place."
          );
        }
        return data;
      },
    ],
  },
  timestamps: true,
};

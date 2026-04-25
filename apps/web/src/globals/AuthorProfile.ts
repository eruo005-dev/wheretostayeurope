// apps/web/src/globals/AuthorProfile.ts
//
// Single-instance Payload Global: the one human behind the site.
// Register in payload.config.ts → globals: [AuthorProfile, Header, Footer].
//
// Site is solo-operated → a Global (not a collection) is the right shape:
// one record, edited via admin UI, fallback-localized.

import type { GlobalConfig } from "payload";

export const AuthorProfile: GlobalConfig = {
  slug: "author-profile",
  label: "Author Profile",
  access: { read: () => true },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      admin: { description: "Your full legal name as you want it shown on the site" },
    },
    {
      name: "displayName",
      type: "text",
      admin: { description: "Short name for bylines (e.g. 'Jay'). Falls back to fullName." },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Headshot. 400×400+ recommended, square crop." },
    },
    {
      name: "tagline",
      type: "text",
      localized: true,
      admin: { description: "One sentence shown under your name on the About page." },
    },
    {
      name: "bio",
      type: "richText",
      localized: true,
      admin: { description: "200–400 words in your voice. Why you built this, what you've done." },
    },
    {
      name: "citiesVisited",
      type: "array",
      admin: { description: "Cities you have personally stayed in. Shown on About page; powers 'I visited' claims in content." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "country", type: "text" },
        { name: "yearLast", type: "number" },
        { name: "nightsTotal", type: "number", admin: { description: "Approximate cumulative nights stayed" } },
      ],
    },
    {
      name: "credentials",
      type: "array",
      admin: { description: "Writing background, prior publications, relevant credentials. Optional but strong E-E-A-T signal." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "year", type: "number" },
        { name: "url", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "twitter", type: "text", admin: { width: "33%", description: "@handle (without URL)" } },
        { name: "linkedin", type: "text", admin: { width: "33%", description: "Full URL" } },
        { name: "instagram", type: "text", admin: { width: "33%", description: "@handle" } },
      ],
    },
    {
      name: "website",
      type: "text",
      admin: { description: "Personal site if any; shown on About + in Person schema sameAs" },
    },
    {
      name: "email",
      type: "text",
      defaultValue: "contact@wheretostayeurope.com",
    },
  ],
};

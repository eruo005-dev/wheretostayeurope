# Byline + Article Schema — patches to existing route files

Drop-in edits to the four existing page routes so they render the Byline component and include Article schema alongside their existing entity schema. Everything else in those files stays.

---

## 1. `neighborhood-page.tsx`

### Imports (add)

```ts
import { Byline } from "@/components/content/Byline";
import { getAuthor } from "@/lib/author";
import { buildArticleSchema } from "@/lib/seo/article-schema";
```

### In the page component, fetch the author alongside other data

Find the `Promise.all([...])` block and add `getAuthor(locale)`:

```ts
const [cityData, properties, priceDistribution, related, consent, author] = await Promise.all([
  getCityWithCountry({ citySlug: city, countrySlug: country, locale }),
  getPropertiesByNeighborhood({ neighborhoodId: n.id, locale, limit: 12 }),
  getPriceBandDistribution({ neighborhoodId: n.id }),
  getRelatedNeighborhoods({ cityId: n.cityId, excludeId: n.id, locale, limit: 5 }),
  getConsent(),
  getAuthor(locale),
]);
```

### Extend the JSON-LD graph with the Article schema

Find the existing `const schema = { ... }` block and add `buildArticleSchema(...)` into the `@graph` array (as a sibling to BreadcrumbList + TouristDestination):

```ts
const articleUrl = `${SITE_URL}/${locale}/${country}/${city}/${neighborhood}`;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // ...existing BreadcrumbList block...
    // ...existing TouristDestination block...
    buildArticleSchema({
      author,
      locale,
      url: articleUrl,
      headline: `Where to Stay in ${n.name}, ${cityData.name}`,
      description: n.summary ?? n.metaDescription ?? undefined,
      imageUrl: n.heroImage?.url ?? null,
      publishedAt: undefined,     // add when you have `publishedAt` on neighborhoods
      lastReviewedAt: undefined,  // same — rename the field once exposed on query
      articleSection: "Neighborhood guide",
    }),
  ],
};
```

Note: the `neighborhood-queries.ts` needs to expose `publishedAt` and `lastReviewedAt` from the neighborhood doc. Both fields exist on the Pages collection shipped earlier, not on Neighborhoods directly — you have two options:
- **Option A (fastest):** add `publishedAt` + `lastReviewedAt` to the Neighborhoods collection directly. One migration, two new nullable fields.
- **Option B (cleaner):** use the existing `lastReviewedAt` field on Neighborhoods (already shipped in `Neighborhoods.ts`) as the single date. Byline will render only "Last reviewed X" — fine for editorial content where exact publish date isn't meaningful.

Recommend Option B. Update `neighborhood-queries.ts` to expose `lastReviewedAt`:

```ts
lastReviewedAt: (n.lastReviewedAt as string | null) ?? null,
```

And in the page:
```ts
lastReviewedAt: n.lastReviewedAt,
```

### Render the Byline

Find the `<header>` block. Insert `<Byline />` right after the hero figure, before `<AffiliateDisclosureBlock />`:

```tsx
<Byline author={author} locale={locale} lastReviewedAt={n.lastReviewedAt} />
<AffiliateDisclosureBlock locale={locale} />
```

---

## 2. `city-page.tsx`

Same pattern as above. `city-queries.ts` already exposes nothing named `lastReviewedAt` — add it:

```ts
// in getCityBySlug return value:
lastReviewedAt: (city.lastReviewedAt as string | null) ?? null,
```

Add to `CityPageData` type.

In the page:

```ts
const [neighborhoods, topProperties, priceDistribution, consent, author] = await Promise.all([
  // existing
  getAuthor(locale),
]);
```

```ts
const articleUrl = `${SITE_URL}/${locale}/${country}/${city}`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    // existing BreadcrumbList + TouristDestination
    buildArticleSchema({
      author,
      locale,
      url: articleUrl,
      headline: c.metaTitle ?? `Where to Stay in ${c.name}`,
      description: c.metaDescription ?? undefined,
      imageUrl: c.heroImage?.url ?? null,
      lastReviewedAt: c.lastReviewedAt,
      articleSection: "City guide",
    }),
  ],
};
```

Insert `<Byline />` below the `<h1>` in the header block, before the hero figure.

---

## 3. `country-page.tsx`

Country hubs are less editorial ("mostly navigation") — Byline is optional here. If you include it, it signals author-maintained curation which is still useful.

```ts
const [cities, author] = await Promise.all([
  getCitiesInCountry({ countryId: c.id, locale }),
  getAuthor(locale),
]);
```

Add to schema `@graph`:
```ts
buildArticleSchema({
  author,
  locale,
  url: `${SITE_URL}/${locale}/${country}`,
  headline: c.metaTitle ?? `Where to Stay in ${c.name}`,
  description: c.metaDescription ?? undefined,
  imageUrl: c.heroImage?.url ?? null,
  articleSection: "Country guide",
}),
```

Byline rendering optional. Skip if you want country hubs to feel more index-like than article-like.

---

## 4. `tier3-page.tsx`

Programmatic page — Article schema is valuable (demonstrates curation), Byline is moderate signal.

```ts
const [properties, priceDistribution, author] = await Promise.all([
  getTier3Properties(...),
  getTier3PriceDistribution(...),
  getAuthor(locale),
]);
```

Add to `@graph`:
```ts
buildArticleSchema({
  author,
  locale,
  url: `${SITE_URL}/${locale}/${country}/${city}/${neighborhood}/hotels-for-${tripType}`,
  headline: `Top hotels in ${ctx.neighborhoodName} ${copy.title}`,
  description: intro,
  articleSection: "Property shortlist",
}),
```

Render `<Byline />` near the top (after `<AffiliateDisclosureBlock />`) — gives each Tier 3 page a curated feel.

---

## 5. `home-page.tsx`

Not an article. No Byline, no Article schema. Leave as-is — WebSite schema is already present.

---

## Payload schema adjustments (one migration each)

Neighborhoods, Cities, and Countries collections need date-field exposure in the schema for this to fully light up.

### Neighborhoods.ts
`lastReviewedAt` already exists in the shipped `Neighborhoods.ts`. No change.

### Cities.ts
`lastReviewedAt` already shipped. No change.

### Countries.ts
`lastReviewedAt` already shipped. No change.

### queries.ts files
All three need their query functions updated to include `lastReviewedAt` in the return shape. Small edits in `neighborhood-queries.ts`, `city-queries.ts`, `country-queries.ts`. Example shown above for neighborhoods; same pattern for the other two.

---

## Register the AuthorProfile Global

In `apps/web/src/payload.config.ts`:

```ts
import { AuthorProfile } from "./globals/AuthorProfile";

export default buildConfig({
  // ...
  globals: [AuthorProfile, Header, Footer],
  // ...
});
```

### First run

After the Global is registered and deployed, go to Payload admin → Globals → Author Profile → fill in:
- Full name + display name
- Upload headshot to Media
- Tagline (one sentence)
- Bio (200–400 words)
- At least 3 cities visited (honest — don't pad)
- At least 1 credential or link to existing writing if any
- Twitter / LinkedIn / Instagram / website if applicable

The About page, Byline links, and Person schema all read from here. Re-open after filling to verify.

---

## Verification after deploy

- [ ] `https://wheretostayeurope.com/en/about` → 200, renders photo + bio + cities chips
- [ ] View-source on any neighborhood page → JSON-LD includes `Article` with `author` → `Person` with your name and photo URL
- [ ] Byline visible at top of neighborhood, city page — readable, date formatted in reader's locale
- [ ] Google Rich Results Test on one neighborhood page — validates as Article
- [ ] Footer/header menu includes a link to `/about`

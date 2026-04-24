# Tier 3 Programmatic Page Templates — First Batch

Six template types. Each is a Next.js route + a DB query + a metadata pattern. Generated from the `properties` table with filters; rendered as static pages with ISR revalidation after every property sync.

**Scale check:** at 20k URLs, templates are the only safe way to ship. Every template below is DB-driven end-to-end. Zero manual copy in the content body — editorial layer lives in the template intro/outro paragraphs (localized, single edit cascades across all instances).

Every Tier 3 page includes:
- `<AffiliateDisclosureBlock />` above the first CTA
- `<PriceDisclaimerBlock />` once per page
- Breadcrumbs + Schema.org `ItemList` + `BreadcrumbList`
- Minimum 12 properties in the shortlist (filter-widen if fewer match)
- Canonical URL points at the current-locale slug; hreflang to other locales

---

## Template 1: Top hotels in [neighborhood] for [trip_type]

**Route:** `/{locale}/{country}/{city}/{neighborhood}/hotels-for-{tripType}/`
**Example:** `/en/france/paris/le-marais/hotels-for-couples/`
**Target query:** `best hotels in le marais for couples`, `le marais romantic hotels`

### Query

```sql
SELECT
  p.id, p.name, p.type, p.review_score, p.review_count, p.star_rating,
  p.price_band, p.price_estimate_eur, p.image_primary_url,
  p.booking_id, p.translations->'en'->>'short_pitch' AS short_pitch
FROM properties p
WHERE p.neighborhood_id = $neighborhoodId
  AND p.is_active = true
  AND p.review_score >= CASE
    WHEN $tripType IN ('couples','luxury') THEN 8.5
    ELSE 8.0
  END
  AND (
    -- trip-type affinity via amenities
    CASE $tripType
      WHEN 'couples'    THEN 'spa' = ANY(p.amenities) OR 'rooftop' = ANY(p.amenities) OR p.review_score >= 9.0
      WHEN 'families'   THEN 'family_rooms' = ANY(p.amenities) OR 'kids_club' = ANY(p.amenities)
      WHEN 'business'   THEN 'business_center' = ANY(p.amenities) OR 'wifi' = ANY(p.amenities)
      WHEN 'luxury'     THEN p.star_rating >= 4.5
      WHEN 'budget'     THEN p.price_band IN ('$','$$')
      WHEN 'solo'       THEN p.price_band IN ('$','$$') AND p.review_score >= 8.5
      ELSE true
    END
  )
ORDER BY
  p.review_score DESC NULLS LAST,
  p.review_count DESC NULLS LAST
LIMIT 15;
```

### Page structure

1. H1: "Top-rated [neighborhood] hotels for [tripType]"
2. Template intro (localized, 120 words) — why this neighborhood fits this trip type, with a link back to the neighborhood deep-dive.
3. `<AffiliateDisclosureBlock />`
4. `<PriceBandHistogram />` (compact variant — shows distribution of shortlist)
5. Property cards (15), each:
   - Image (from Booking affiliate)
   - Name, star rating, review score
   - Short pitch (from `translations->en->short_pitch`)
   - Price band
   - Booking CTA → `buildHotelUrl()` with tracking label `wts-property_shortlist-{pageId}-{locale}-property_card`
6. `<PriceDisclaimerBlock />`
7. Template outro (localized, 80 words) — when this neighborhood might NOT be right, linking to alternative neighborhood page.
8. Related: 3 other trip-types for this neighborhood.

### Schema

```jsonld
{ "@type": "ItemList", "numberOfItems": 15,
  "itemListElement": [
    { "@type": "ListItem", "position": 1,
      "item": { "@type": "Hotel", "name": "...", "aggregateRating": {...}, "priceRange": "..." }
    }, ...
  ]
}
```

### Generation count at scale

6 trip_types × ~3,000 neighborhoods = **~18,000 pages per locale**. Build cascade: only generate pages where the query returns ≥ 12 properties. Thinner-match neighborhoods fall back to the city-level version below.

---

## Template 2: [Amenity] hotels in [city]

**Route:** `/{locale}/{country}/{city}/hotels-with-{amenity}/`
**Example:** `/en/france/paris/hotels-with-rooftop/`
**Target query:** `paris hotels with rooftop`, `rooftop bar hotels paris`

### Query

```sql
SELECT p.*, n.slug AS neighborhood_slug, nt.name AS neighborhood_name
FROM properties p
LEFT JOIN neighborhoods n ON n.id = p.neighborhood_id
LEFT JOIN neighborhoods_locales nt ON nt._parent_id = n.id AND nt._locale = $locale
WHERE p.city_id = $cityId
  AND p.is_active = true
  AND $amenity = ANY(p.amenities)
  AND p.review_score >= 8.0
ORDER BY p.review_score DESC, p.review_count DESC
LIMIT 20;
```

### Amenities to ship first (for Paris, ~10 pages):

`rooftop`, `pool`, `spa`, `pet_friendly`, `family_rooms`, `parking`, `airport_shuttle`, `24_hour_desk`, `restaurant`, `breakfast_included`

### Page structure

Similar to Template 1. Includes:
- Map showing which neighborhoods these properties cluster in (uses `<NeighborhoodMap />` with highlighted neighborhoods)
- Neighborhood split: "Most rooftop hotels are in: Le Marais (5), Opéra (4)..."

### Generation count

~10 amenities × 300 cities = **~3,000 pages per locale**.

---

## Template 3: [Price-band] hotels in [city]

**Route:** `/{locale}/{country}/{city}/hotels-under-{priceThreshold}/`
**Example:** `/en/france/paris/hotels-under-150-eur/`
**Target query:** `paris hotels under 150`, `cheap hotels paris`, `budget hotels paris`

### Query

```sql
SELECT p.*, n.slug AS neighborhood_slug
FROM properties p
LEFT JOIN neighborhoods n ON n.id = p.neighborhood_id
WHERE p.city_id = $cityId
  AND p.is_active = true
  AND p.price_estimate_eur <= $threshold
  AND p.review_score >= 7.5
ORDER BY
  p.review_score DESC,
  p.price_estimate_eur ASC
LIMIT 20;
```

### Thresholds per city (locale-aware)

- Budget cities (Porto, Kraków): 50, 80, 120, 180 EUR
- Mid-tier (Valencia, Lisbon, Prague, Istanbul): 80, 120, 180, 250 EUR
- Premium (Paris, London, Amsterdam, Barcelona, Rome): 120, 180, 250, 350 EUR
- Top premium (Zurich, Geneva): 180, 250, 350, 500 EUR

Store per-city thresholds in `cities.seasonality` jsonb or in a separate `price_thresholds` config table.

### Generation count

5 thresholds × 300 cities = **~1,500 pages per locale**.

---

## Template 4: Hotels near [attraction]

**Route:** `/{locale}/{country}/{city}/hotels-near-{attractionSlug}/`
**Example:** `/en/france/paris/hotels-near-eiffel-tower/`
**Target query:** `hotels near eiffel tower`, `hotels by the louvre`

### Query

```sql
-- attraction_id has a centroid; find properties within 1km radius
SELECT p.*, ST_Distance(p.centroid, a.centroid) AS distance_m
FROM properties p, attractions a
WHERE a.id = $attractionId
  AND p.city_id = a.city_id
  AND p.is_active = true
  AND ST_DWithin(p.centroid, a.centroid, 1000)
  AND p.review_score >= 8.0
ORDER BY distance_m ASC, p.review_score DESC
LIMIT 20;
```

### Attractions to ship first (Paris)

Eiffel Tower, Louvre, Notre-Dame, Champs-Élysées, Arc de Triomphe, Montmartre, Disneyland Paris, Gare du Nord, CDG, Versailles, Moulin Rouge, Sacré-Cœur, Musée d'Orsay, Père Lachaise, Île de la Cité

### Generation count

~10 attractions/city × 300 cities = **~3,000 pages per locale**.

---

## Template 5: Neighborhood comparison shortlist

**Route:** `/{locale}/{country}/{city}/compare/{neighborhoodA}-vs-{neighborhoodB}/`
**Example:** `/en/france/paris/compare/le-marais-vs-saint-germain/`

Tier 2 editorial page above, but the property-shortlist section is programmatic. Renders a side-by-side of 5 top properties per neighborhood.

### Query

```sql
SELECT p.*, p.neighborhood_id
FROM properties p
WHERE p.neighborhood_id IN ($nA, $nB)
  AND p.is_active = true
  AND p.review_score >= 8.5
ORDER BY p.neighborhood_id, p.review_score DESC;
-- Take top 5 per neighborhood in application code
```

### Generation count

Editor-curated, not combinatorial. Plan ~2–3 key comparisons per major city, so ~300–500 pages total across locales.

---

## Template 6: Best [type] in [city]

**Route:** `/{locale}/{country}/{city}/best-{type}/`
**Example:** `/en/france/paris/best-aparthotels/`, `/en/spain/valencia/best-hostels/`

### Types

`hostels`, `aparthotels`, `apartments`, `boutique-hotels`, `5-star-hotels`, `bnbs`, `pet-friendly-hotels`

### Query

```sql
SELECT p.*
FROM properties p
WHERE p.city_id = $cityId
  AND p.is_active = true
  AND p.type = $mapped_type
  AND p.review_score >= 8.0
ORDER BY p.review_score DESC, p.review_count DESC
LIMIT 20;
```

### Generation count

7 types × 300 cities = **~2,100 pages per locale**.

---

## Total Tier 3 generation at Phase 3 scale (EN only)

| Template | Pages (EN) |
|---|---|
| Trip-type × neighborhood | 18,000 (thin, many will fall back) |
| Amenity × city | 3,000 |
| Price-band × city | 1,500 |
| Near-attraction | 3,000 |
| Neighborhood comparison (editor-selected) | 300 |
| Type × city | 2,100 |
| **Subtotal** | **~27,900 EN** |

With 4 locales and the 10–15% fallback cull: **~60,000–80,000 indexable Tier 3 URLs**. Add editorial (Tier 1+2 ≈ 5,000 across locales) and you're at ~65k–85k URLs — above the original 30k projection but within Next.js ISR capability on Hetzner CPX41 with proper on-demand revalidation + sitemap splitting.

**Scale triggers requiring revisit:**
- >50k URLs: move Postgres to dedicated instance (CPX31 for DB, CPX41 for web)
- >100k URLs: add a read replica, switch ISR to on-demand only (no background regen)
- >250k URLs: this is Phase 5 territory; revisit architecture

---

## Template intro/outro localization strategy

Each template has ~6 paragraphs of reusable copy (intro, section headers, transitions, outro). Stored in `page_template_copy` table:

```sql
CREATE TABLE page_template_copy (
  template_id text,
  slot text,            -- 'intro' | 'amenities_section' | 'outro' | etc.
  locale text,
  content text,
  variables text[],     -- placeholders: {{neighborhood}}, {{trip_type}}, {{city}}
  PRIMARY KEY (template_id, slot, locale)
);
```

At render time: `content.replace(/\{\{(\w+)\}\}/g, (_, k) => variables[k])`. One copy edit per locale cascades across thousands of pages. DO NOT embed template copy in the Next.js route code — it becomes impossible to localize or A/B test.

**Localization rule per earlier plan:** German template needs different context than Spanish template. For example, a German reader expects more detail on Frühstück (breakfast) and public transport precision; a Spanish reader expects more on neighborhood atmosphere and dining hours. Template `page_template_copy` locales are not translations of English — they're locale-native adaptations. Use DeepL for first draft, human edit pass before publish.

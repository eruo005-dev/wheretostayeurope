# n8n Workflow Spec — Booking.com Property Ingest

Pulls property data from Booking.com's affiliate API into the external `properties` table. Runs nightly. Idempotent via `booking_id` unique constraint.

**Prerequisite:** Booking.com affiliate API credentials (requires approved affiliate account + API access request — not automatic at account approval, apply separately from your partner dashboard once account age > 30 days).

**Fallback if API access not granted:** structured HTML scraping via Puppeteer or Playwright node. Higher maintenance; use only if API is declined. Keep identical schema contract so the downstream code doesn't care where the data came from.

---

## Workflow: `booking-sync-city`

**Trigger:** Cron — daily at 03:00 Europe/Berlin
**Input:** none (reads active cities from Postgres)
**Output:** upserts to `properties` table

### Nodes

**1. Postgres — fetch active cities**

```sql
SELECT id, name, slug, "bookingDestId", "countryId"
FROM cities
WHERE "bookingDestId" IS NOT NULL
ORDER BY tier, name;
```

Rate-limit downstream: process 5 cities per batch with 30-second gap.

**2. HTTP Request — Booking.com Hotels API (per city)**

- Method: `GET`
- URL: `https://distribution-xml.booking.com/json/bookings.getHotels`
- Auth: Basic auth with API user/pass (stored in n8n credentials, not env)
- Query params:
  - `city_ids={{$json["bookingDestId"]}}`
  - `rows=500` (max)
  - `language_code=en`
  - `extras=hotel_info,hotel_description,hotel_photos,hotel_facilities,room_info`
- Pagination: use `offset` until fewer than 500 returned.
- Retry: 3 tries, exponential backoff starting at 10s.
- Rate limit: Booking's API allows ~100 req/min for most affiliate tiers; throttle to 50 req/min.

**3. Function — transform Booking response to properties schema**

```js
// n8n Function node — JavaScript
const items = $input.all()[0].json.hotels ?? [];
const cityId = $('Postgres - fetch active cities').item.json.id;

function priceBand(estimate) {
  if (!estimate) return null;
  if (estimate < 80)  return '$';
  if (estimate < 180) return '$$';
  if (estimate < 350) return '$$$';
  return '$$$$';
}

function typeFromBooking(b) {
  const map = {
    204: 'hotel', 203: 'apartment', 208: 'guesthouse', 216: 'hostel',
    219: 'aparthotel', 220: 'villa', 222: 'bnb',
  };
  return map[b.hoteltype_id] ?? 'hotel';
}

return items.map((h) => ({
  booking_id: String(h.hotel_id),
  city_id: cityId,
  neighborhood_id: null, // matched in next step via ST_Within
  name: h.name,
  type: typeFromBooking(h),
  star_rating: h.class ?? null,
  review_score: h.review_score ?? null,
  review_count: h.number_of_reviews ?? null,
  price_estimate_eur: Math.round(h.min_total_price ?? 0),
  price_band: priceBand(h.min_total_price),
  lat: h.location?.latitude,
  lng: h.location?.longitude,
  amenities: (h.hotel_facilities ?? []).map((f) => f.toLowerCase().replace(/\s+/g, '_')),
  affiliate_url_template: h.url, // we append aid + label at render time
  image_primary_url: h.main_photo_url,
  external_ids: { booking: h.hotel_id },
  last_synced_at: new Date().toISOString(),
  is_active: true,
}));
```

**4. Postgres — match neighborhood via PostGIS**

For each property, find the neighborhood whose polygon contains its centroid:

```sql
UPDATE properties p
SET neighborhood_id = n.id
FROM neighborhoods n
WHERE p.booking_id = $1
  AND n.city_id = p.city_id
  AND ST_Contains(n.polygon::geometry, ST_SetSRID(ST_MakePoint(p.lng, p.lat), 4326));
```

Properties outside any defined neighborhood retain `neighborhood_id = NULL` — they're still queryable at the city level.

**5. Postgres — upsert into properties**

```sql
INSERT INTO properties (
  booking_id, city_id, name, type, star_rating, review_score, review_count,
  price_estimate_eur, price_band, lat, lng, amenities, affiliate_url_template,
  image_primary_url, external_ids, last_synced_at, is_active
)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
ON CONFLICT (booking_id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type,
  star_rating = EXCLUDED.star_rating,
  review_score = EXCLUDED.review_score,
  review_count = EXCLUDED.review_count,
  price_estimate_eur = EXCLUDED.price_estimate_eur,
  price_band = EXCLUDED.price_band,
  lat = EXCLUDED.lat,
  lng = EXCLUDED.lng,
  amenities = EXCLUDED.amenities,
  affiliate_url_template = EXCLUDED.affiliate_url_template,
  image_primary_url = EXCLUDED.image_primary_url,
  external_ids = properties.external_ids || EXCLUDED.external_ids,
  last_synced_at = EXCLUDED.last_synced_at,
  is_active = true,
  updated_at = now();
```

**6. Soft-delete stale properties**

At the end of each city batch, mark properties not seen for 14 days as inactive (keeps Tier 3 pages from citing dead listings):

```sql
UPDATE properties
SET is_active = false, updated_at = now()
WHERE city_id = $1
  AND last_synced_at < now() - interval '14 days'
  AND is_active = true;
```

**7. Revalidate ISR — trigger Next.js on-demand revalidation**

POST to `/api/revalidate?secret=$REVALIDATE_SECRET&type=city&slug={{slug}}` on the Next.js app.

Your Next.js `/api/revalidate/route.ts` handler:
- validates secret
- calls `revalidatePath(/${locale}/${country.slug}/${city.slug})` for all 4 locales
- calls `revalidateTag(city:${cityId})` to invalidate all Tier 3 pages bound to that city

**8. Postgres — log run**

Append a row to `ingest_runs` (add this table if not present):

```sql
CREATE TABLE IF NOT EXISTS ingest_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,           -- 'booking'
  city_id uuid,
  started_at timestamptz NOT NULL,
  finished_at timestamptz,
  properties_seen int,
  properties_upserted int,
  properties_soft_deleted int,
  status text,                    -- 'success'|'partial'|'error'
  error_message text
);
```

---

## Workflow: `booking-sync-neighborhood-districts`

**Purpose:** Populate `neighborhoods.bookingDistrictId` for every neighborhood we care about. Runs ad-hoc (not nightly).

Booking has district IDs for many but not all neighborhoods. For those without, we fall back to city-level search with free-text district filters (less precise but still functional).

**Nodes:**
1. Postgres: fetch neighborhoods WHERE bookingDistrictId IS NULL
2. HTTP Request: Booking's `locations.getDistricts` with `city_ids={{cityBookingDestId}}`
3. Function: fuzzy-match district name to neighborhood name (Levenshtein < 3 or startsWith)
4. Postgres: UPDATE `neighborhoods` SET `bookingDistrictId` = matched
5. Flag unmatched for manual review in an admin collection

---

## Error handling and alerts

- All HTTP nodes: 3-retry with exponential backoff.
- Postgres nodes: `ON CONFLICT` for upserts; transactions for multi-row updates.
- Alert channel: Telegram bot (you already run one per CLAUDE.md context). Post summary to ops channel:
  ```
  ✅ booking-sync nightly complete
  cities: 28 | properties seen: 14,221 | upserted: 13,780 | soft-deleted: 441
  duration: 42 min
  ```
- On failure: post error summary + link to n8n execution detail.

---

## Scale check

At 300 cities × ~500 properties/city = 150,000 rows. Postgres handles this trivially. The ingest runtime scales with: (city count × pagination depth × rate-limit floor). 300 cities × 1 page × 1 req/sec ≈ 5 minutes minimum, more realistically 30–45 minutes with rate-limit headroom. Acceptable nightly window.

At 20k neighborhood pages (end-state), the ST_Contains match step is the hot path. Ensure `neighborhoods.polygon` GIST index exists (shipped in 007_postgis_after_payload.sql).

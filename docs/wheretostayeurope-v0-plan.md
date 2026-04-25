# WhereToStayEurope.com — v0 Operating Plan

Co-founder working doc. Ignore calendar timeframes; work blocks below are dependency-ordered, compress or expand to your real throughput.

---

## Locked decisions (v0)

1. **Hosting:** Hetzner CPX41 VPS + Coolify + Cloudflare. Not Cloudways. Not Vercel.
2. **Stack:** Option B — Next.js 15 + Payload 3 + PostgreSQL/PostGIS + Meilisearch.
3. **Locales (4 max):** EN, DE, FR, ES. Italian conditional on Phase 3 data. Schema supports N; operational plan does not.
4. **Phase 1 countries (7):** France, Spain, Italy, Germany, UK, Netherlands, **Turkey**.
5. **Images:** UGC-first. Unsplash + Pexels + Pixabay via API with auto-attribution. Booking property photos via API on Tier 3 pages (affiliate fair-use). Zero paid stock this year. Hard no on AI-generated images for real places. Visual moat is custom maps/diagrams from your PostGIS data, not photos.
6. **Ads:** None in Phase 1. Skip Ezoic entirely. First ad integration is Mediavine @ 50k sessions.
7. **Translation:** DeepL API for production. NLLB-200 + DeepSeek for drafting only. Every published page = mandatory human edit pass.
8. **First ranking cities alongside Paris:** Porto, Valencia, Kraków, Bruges, Istanbul. Paris proves template; secondaries produce first commissions.
9. **Booking.com affiliate:** 5-sales-in-6-months rule. Apply only once 10+ indexable pages exist (Block 3).

---

## 1. Architecture decision: Option B (Next.js + Payload + Postgres)

### Decision matrix

| Dimension | Option A: WP + WPML + ACF Pro | Option B: Next.js + Payload + Postgres | Winner |
|---|---|---|---|
| Time-to-first-page | 1 weekend (you already know WP) | 3–6 weeks ramp if React fluency is rusty | A |
| Scaling to 30k URLs | WPML DB bloat, admin crawls past 5–10k posts | Native; Postgres + static generation handles 100k+ | **B** |
| Programmatic page generation | Fights the CMS; WP All Import collapses past ~50k rows | `SELECT … WHERE price_band='$$$'` → static route. Trivial. | **B** |
| Multilingual (4–10 locales) | WPML works but permalinks rigid; per-locale overrides painful | `*_translations` tables; hreflang built from `hreflang_groups` | **B** |
| Hreflang integrity at 30k URLs | Manual audits, WPML quirks | Generated; cannot drift | **B** |
| Internal linking at scale | Manual or plugin-based; fragile | Vector embeddings → contextual links computed at build | **B** |
| Hosting cost at 30k URLs | Cloudways Vultr HF 4GB ~$70 + bloat tax | Hetzner CPX41 + Coolify ~€25, Cloudflare free | **B** |
| Translation workflow integration | WPML + WPML Translation Management; workable | DeepL API direct into Postgres via n8n; cleaner | **B** |
| Plugin tax / bloat risk | High (you will need ~15 plugins) | None; all code you own | **B** |
| Data pipeline fit | Booking CSV → WP All Import = fragile at scale | Booking API → Postgres ingest = native | **B** |
| Migration risk if wrong | A→B: painful re-export, hreflang rebuild | B→A: export Postgres → WP import is straightforward | A |
| Fits your existing infra | Underuses your headless Linux box entirely | Headless Linux runs Meilisearch + embeddings + ETL | **B** |

### Recommendation: Option B

**Stack:**
- Next.js 15 (app router), TypeScript, MDX for Tier 1 content
- Payload CMS 3 (in-repo, Postgres-backed) for editorial UI
- PostgreSQL with PostGIS extension (for neighborhood polygons)
- Meilisearch self-hosted on your i7-14700K box
- Cloudflare in front (free tier, DNS + CDN + turnstile)
- Hetzner CPX41 VPS (4 vCPU, 16GB RAM, ~€25/mo) + Coolify for deploys
- Neon Postgres free tier to start ($0), Scale at $19/mo once DB >500MB
- Plausible Analytics self-hosted (€0) or Pirsch (€6/mo)
- DeepL API Pro for translation, NLLB-200 local for drafts/fallback

**Monthly cost realistic projection:**

| Phase | Components | Monthly |
|---|---|---|
| Launch (0–5k URLs) | Hetzner + Neon free + Cloudflare + Plausible | €25–35 |
| Phase 2 (5–15k URLs) | + Neon Scale + DeepL Pro base | €70–90 |
| Phase 3 (15–30k URLs) | + Hetzner CPX51, Meilisearch cloud backup, image CDN | €120–180 |

Compared to Option A Cloudways Vultr HF 4GB + WPML/ACF renewals amortized + Bunny CDN: ~$100–120/mo at launch, similar at Phase 3 but with a soft ceiling.

**Why not Vercel:** At 30k ISR pages with daily revalidation, bandwidth and function-invocations push Pro plan well past €150/mo. Hetzner+Coolify is predictable and gives you the same `next build` pipeline with no edge-function budget anxiety.

**Why Payload (not Sanity):** Sanity is hosted + usage-priced and will surprise you at scale; Payload is self-hosted in the same Postgres you already run, zero extra vendor.

**Break-glass trigger to fall back to Option A:** If you cannot ship a working Paris pillar + one neighborhood page in Option B within 6 working weeks, fall back. Do not sunk-cost-fallacy this.

---

## 2. Phase 1 plan — sequenced work blocks (loosely 1–2 weeks each at 15–20 hrs/week)

Goal end-state: ~300–500 indexable English URLs across 6 countries and 20 cities, with Paris + Porto + Valencia clusters deep enough to earn commissions, and the templating pipeline shipped.

### Block 1 — Infra & skeleton
- Hetzner CPX41 provisioned, Coolify installed, GitHub repo wired
- Next.js 15 + Payload 3 scaffold deployed at whe­retostayeurope.com staging subdomain
- Postgres (Neon) + PostGIS enabled
- Cloudflare DNS, SSL, Turnstile on forms
- Plausible installed, GSC + Bing Webmaster verified
- Sitemap stub live, robots.txt correct
- Dangling: no content yet — **don't apply to any affiliate program**

### Block 2 — Data model + country seed
- Migrate schema from §3 below
- Seed `countries` (44 rows), `regions`, `cities` (Tier 1+2 = ~70 cities across the 7 Phase 1 countries + stubs for the rest)
- Seed `neighborhoods` stub rows for Paris, Porto, Valencia, Kraków, Bruges, Rome, **Istanbul**
- Write 3 country hub drafts: France, Spain, UK (2500+ words each, hand-written, your voice)
- Unsplash + Pexels API keys provisioned, attribution renderer in repo
- Apply: **GetYourGuide Partner** (easy approval), **Agoda Partners**

### Block 3 — Paris reference cluster ships
- Paris city pillar published
- 4 neighborhood deep-dives: Le Marais, Saint-Germain, Montmartre, Latin Quarter
- 2 comparison pages: Marais vs Saint-Germain, Montmartre vs Latin Quarter
- Schema.org markup (TouristDestination, FAQ, BreadcrumbList) baseline
- Apply: **Booking.com affiliate (direct EU program)** — you now have 7+ indexable pages
- First Pinterest account, 3 pin sets (Marais, Montmartre, "Where NOT to stay in Paris")

### Block 4 — Second cluster + template lock-in + visual moat
- Port Paris cluster template to Porto (fewer neighborhoods; 3 deep-dives + 1 comparison)
- Port to Valencia in parallel (3 deep-dives)
- n8n workflow: Booking.com API → Postgres property ingest, cron nightly
- First 10 Tier 3 pages: "Top-rated Paris hotels for couples", "Best Le Marais hotels under €200", etc.
- **Build custom visualization components** (shared across every neighborhood page):
  - Mapbox GL neighborhood boundary map (auto-rendered from `neighborhoods.polygon`)
  - Price-band distribution bar (from `properties.price_band` aggregate)
  - Walkability + safety dial widgets
  - Metro/transit proximity heatmap
- Apply: **Impact Radius** (for Expedia Group: Hotels.com, VRBO, Expedia)

### Block 5 — City volume + editorial breadth
- Kraków cluster (2 deep-dives + comparison)
- Bruges cluster (2 deep-dives)
- Rome city pillar + 2 neighborhoods (Trastevere, Monti)
- **Istanbul city pillar + 2 neighborhoods (Sultanahmet, Beyoğlu)** — high EN+DE search volume, low comp
- 4–6 trip-type flagship pages targeting "where to stay in [city] for families/couples/solo/budget"
- Apply: **SafetyWing** (via Impact), **Airalo Partners**
- Email capture live; 3-email welcome sequence drafted

### Block 6 — Fill in cities 7–14
- Short-form city hubs (500–800 words each, 1 neighborhood each) for: Lisbon, Seville, Madrid, Barcelona, Edinburgh, Dublin, Amsterdam, Berlin
- 60+ Tier 3 programmatic pages across shipped cities (price-band × neighborhood, amenity, trip-type)
- Apply: **CJ Affiliate** (for Viator + overflow programs)
- Internal linking audit: min 50 inbound links to each Tier 1, min 10 to each Tier 2

### Block 7 — Cities 15–20 + hardening
- Short-form hubs for: Venice, Florence, Milan, Naples, Munich, Hamburg, Vienna, Prague (pick 6 to ship deep)
- Core Web Vitals pass — Lighthouse all-green, LCP <2.0s on 4G
- Schema.org audit across all page types
- Apply: **Heymondo** (EU-skewed travel insurance)
- Contrarian tentpoles: "Where NOT to stay in [Paris/Rome/Barcelona]" — 3 pieces; these attract backlinks

### Block 8 — Optimization pass before Phase 2
- Analytics review: which clusters are ranking; which languages to prioritize
- Backlink audit: first round of genuine outreach (niche travel bloggers, 2026-dated "best of" roundups)
- Reddit engagement plan: 6 value-first comments/week across r/travel, r/solotravel, r/europe — no link drops for first 4 weeks
- Decision point: Phase 2 go/no-go. Only add DE+FR if you have ≥15k indexed English sessions/month.

### Dangling-thread register (to kill by end of Phase 1)
- [ ] Email list: capture live but no segmentation by country/language yet
- [ ] Image pipeline: decide between licensed (Shutterstock, Unsplash) vs. user-generated vs. AI-generated + attribution rules
- [ ] Schema markup test coverage — Rich Results test pass required before shipping any template change
- [ ] Sitemap split strategy (by type, by locale) before crossing 10k URLs

**Scale check:** Blocks 4–7 all rely on DB-driven templates. If any manual copy-paste creeps in post-Block 3, stop and fix the template. Manual work does not scale to 20k pages.

---

## 3. Data model spec

PostgreSQL 15+ with PostGIS. All tables UTC. UUID primary keys. `created_at`, `updated_at` on every row — omitted from listings below for brevity.

### Geographic hierarchy

```sql
countries (
  id uuid PK,
  slug text UNIQUE,                      -- 'france'
  iso_code char(2) UNIQUE,               -- 'FR'
  continent text DEFAULT 'europe',
  currency_code char(3),                 -- 'EUR'
  timezone text,
  capital_city_id uuid FK cities NULLABLE,
  population int,
  area_km2 int,
  eu_member bool,
  schengen bool,
  tier int                               -- 1=Western, 2=Central/Nordic, 3=Balkans/east
)

country_translations (
  id uuid PK,
  country_id uuid FK,
  locale text,                           -- 'en', 'de', 'fr', 'es'
  name text,
  intro_html text,
  best_time_to_visit text,
  travel_tips jsonb,
  meta_title text,
  meta_description text,
  last_reviewed_at timestamptz,
  UNIQUE (country_id, locale)
)

regions (
  id uuid PK,
  country_id uuid FK,
  slug text,
  bbox geography(polygon, 4326),
  UNIQUE (country_id, slug)
)

region_translations (
  id uuid PK, region_id uuid FK, locale text, name text, description_html text,
  UNIQUE (region_id, locale)
)

cities (
  id uuid PK,
  country_id uuid FK,
  region_id uuid FK NULLABLE,
  slug text,
  centroid geography(point, 4326),
  bbox geography(polygon, 4326),
  airport_codes text[],
  population int,
  tier int,                              -- 1=global top (Paris, Rome), 2=major, 3=secondary
  booking_dest_id int,                   -- Booking.com destination ID for API calls
  gyg_location_id int,                   -- GetYourGuide location ID
  seasonality jsonb,                     -- monthly crowd/price indices
  UNIQUE (country_id, slug)
)

city_translations (
  id uuid PK, city_id uuid FK, locale text,
  name text, intro_html text, when_to_visit text,
  getting_around text, safety_notes text,
  meta_title text, meta_description text,
  last_reviewed_at timestamptz,
  UNIQUE (city_id, locale)
)

neighborhoods (
  id uuid PK,
  city_id uuid FK,
  slug text,
  centroid geography(point, 4326),
  polygon geography(polygon, 4326),
  vibe_tags text[],                      -- ['nightlife','luxury','family-friendly']
  trip_type_fit text[],                  -- ['couples','solo','business']
  price_tier int,                        -- 1–5
  safety_score numeric(3,2),
  walkability_score numeric(3,2),
  nearest_metro text[],
  UNIQUE (city_id, slug)
)

neighborhood_translations (
  id uuid PK, neighborhood_id uuid FK, locale text,
  name text, summary text, who_its_for text, who_should_skip text,
  dining_notes text, nightlife_notes text, stay_tips text,
  meta_title text, meta_description text,
  last_reviewed_at timestamptz,
  UNIQUE (neighborhood_id, locale)
)
```

### Properties (Booking ingest target)

```sql
properties (
  id uuid PK,
  city_id uuid FK,
  neighborhood_id uuid FK NULLABLE,
  booking_id text UNIQUE,                -- from Booking.com API
  external_ids jsonb,                    -- {hotels_com, expedia, agoda, gyg}
  name text,
  type text,                             -- hotel | hostel | apartment | aparthotel | villa
  star_rating numeric(2,1),
  review_score numeric(3,2),
  review_count int,
  price_band text,                       -- '$','$$','$$$','$$$$'
  price_estimate_eur int,                -- nightly median for indexing
  lat numeric(9,6), lng numeric(9,6),
  amenities text[],
  affiliate_url_template text,           -- deep-link with aid placeholder
  image_primary_url text,
  last_synced_at timestamptz,
  is_active bool DEFAULT true
)
-- indexes:
CREATE INDEX ON properties (city_id, price_band, review_score DESC);
CREATE INDEX ON properties (neighborhood_id, review_score DESC) WHERE is_active;
CREATE INDEX ON properties USING GIN (amenities);
CREATE INDEX ON properties USING GIST (geography(ST_MakePoint(lng, lat)));

property_translations (
  id uuid PK, property_id uuid FK, locale text,
  short_pitch text, why_stay text, why_skip text,
  UNIQUE (property_id, locale)
)
```

### Editorial page surface

```sql
pages (
  id uuid PK,
  type text,                             -- country_hub|city_hub|neighborhood_guide|
                                         -- neighborhood_comparison|trip_type_city|
                                         -- property_shortlist|price_band|amenity|
                                         -- near_attraction|contrarian|seasonal
  entity_type text,                      -- 'country'|'city'|'neighborhood'|'property_set'
  entity_id uuid,
  tier int,                              -- 1|2|3
  status text,                           -- draft|ai_drafted|editing|published|stale
  published_at timestamptz,
  last_reviewed_at timestamptz,
  template_version int,
  schema_markup jsonb,
  hreflang_group_id uuid
)

page_translations (
  id uuid PK, page_id uuid FK, locale text,
  title text, slug text,
  content_mdx text,
  meta_title text, meta_description text,
  quality_score numeric(3,2),            -- internal; promote/demote in nav
  word_count int,
  UNIQUE (page_id, locale),
  UNIQUE (locale, slug)
)

hreflang_groups (
  id uuid PK,                            -- shared across all locale variants of the same logical page
  canonical_locale text
)
```

### Supporting tables

```sql
trip_types (id uuid PK, slug text UNIQUE)   -- couples|families|solo|business|luxury|budget|digital_nomads
trip_type_translations (id, trip_type_id, locale, name, description)

attractions (
  id uuid PK, city_id uuid FK, slug text, centroid geography(point, 4326),
  type text,                             -- monument|museum|district|transit_hub|airport
  booking_dest_id int NULLABLE
)
attraction_translations (id, attraction_id, locale, name, short_desc)

media (
  id uuid PK, type text, url text, alt_text_base text,
  credit text, license text,
  geo geography(point, 4326) NULLABLE,
  entity_type text, entity_id uuid       -- loose polymorphic FK
)
media_translations (id, media_id, locale, alt_text, caption)

keywords (
  id uuid PK, query text, locale text, country_target char(2),
  volume_estimate int, volume_confidence text,  -- 'low'|'med'|'high'
  difficulty int,                               -- 0–100
  intent text,                                  -- inform|compare|transactional
  cluster_id uuid NULLABLE,
  mapped_page_id uuid FK pages NULLABLE,
  source text,                                  -- 'ahrefs'|'semrush'|'gsc'|'guess'
  UNIQUE (query, locale)
)

internal_links (
  from_page_id uuid, to_page_id uuid,
  anchor text, locale text, score numeric(4,3),
  PRIMARY KEY (from_page_id, to_page_id, locale)
)

email_subscribers (
  id uuid PK, email citext UNIQUE, locale text,
  country_pref char(2)[], trip_type_pref text[],
  confirmed_at timestamptz, unsubscribed_at timestamptz
)
```

### Future-proofing notes

- `*_translations` pattern makes adding a locale a migration-free content task.
- `hreflang_groups` decouples logical page identity from URL slug so French slug ≠ English slug without breaking hreflang chain.
- `properties.booking_id` is the single FK to the Booking pipeline; swap or supplement with Expedia/Agoda later without schema change.
- `pages.template_version` lets you bulk-rerun a template change across all pages built from it.
- `keywords.mapped_page_id` enforces one-page-per-primary-intent, kills cannibalization before it starts.

---

## 4. Paris reference cluster

### City pillar (Tier 1, handwritten, 3500+ words)
- **"Where to Stay in Paris: A Neighborhood Guide by Trip Type"**
  - Primary query: `where to stay in paris` (30–50k/mo, HIGH conf, HIGH difficulty)
  - Secondary: `paris neighborhoods map`, `best arrondissements for tourists`, `is paris safe`

### Neighborhood deep-dives (Tier 2, AI-drafted + human-edited, 1800–2500 words each)

| # | Neighborhood | Primary target query | Vol (est) | Conf | Diff |
|---|---|---|---|---|---|
| 1 | Le Marais (3e/4e) | `where to stay in le marais paris` | 2–5k | HIGH | MED |
| 2 | Saint-Germain-des-Prés (6e) | `saint germain hotels paris` | 1–3k | HIGH | MED |
| 3 | Latin Quarter (5e) | `where to stay in latin quarter paris` | 1–3k | HIGH | MED |
| 4 | Montmartre (18e) | `where to stay in montmartre` | 3–7k | HIGH | MED |
| 5 | Opéra / 9e | `hotels near opera paris` | 2–5k | HIGH | MED-HIGH |
| 6 | Batignolles (17e) | `batignolles paris hotels` | <500 | MED | LOW (editorial moat) |

### Comparison pages (Tier 2, 1200–1800 words)
1. **Le Marais vs Saint-Germain: which Paris neighborhood is right for you** — `le marais vs saint germain`
2. **Montmartre vs Latin Quarter for first-time visitors** — `montmartre or latin quarter`
3. **Le Marais vs the 11e: two flavors of trendy Paris** — long-tail, low comp
4. **Where NOT to stay in Paris** — `where not to stay in paris` (1–3k/mo, MED conf, LOW-MED diff — high CTR, backlink magnet)

### Trip-type pages (Tier 2, 1500–2000 words)
1. Where to stay in Paris for couples — `where to stay in paris for couples`
2. Where to stay in Paris for families with kids — `paris for families where to stay`
3. Where to stay in Paris for solo female travelers — `paris solo female travel`
4. Where to stay in Paris on a budget — `cheap places to stay in paris`
5. Best luxury neighborhoods in Paris — `best luxury hotels paris area`

### Tier 3 programmatic specs (Paris scope ≈ 80–120 pages)

Template: **"Top-rated [type] in [neighborhood] for [trip_type] under €[band]"**

Fill combinations:
- Top-rated hotels by neighborhood × price band: 6 neighborhoods × 4 price bands = **24 pages**
- Best Paris hotels with [amenity] × top 10 amenities = **10 pages** (pool, rooftop, spa, family rooms, pet-friendly, airport shuttle, metro access, breakfast included, eiffel view, 24hr desk)
- Hotels under €X in Paris × 5 price thresholds = **5 pages** (€80, €120, €180, €250, €400)
- By property type: aparthotels, hostels, boutique, 5-star, capsule = **5 pages**
- Near attraction: Louvre, Eiffel, Disneyland Paris, Gare du Nord, CDG, Versailles, Père Lachaise, Arc de Triomphe, Champs-Élysées, Moulin Rouge = **10 pages**
- Trip-type × neighborhood (top 3 neighborhoods × 5 trip types): **15 pages**

Every Tier 3 page is a DB query + template. Zero manual copy. Example page spec:

```
template: top_rated_hotels_in_neighborhood_for_trip_type
slug: /en/paris/le-marais/hotels-for-couples/
query: SELECT p.* FROM properties p
       WHERE p.neighborhood_id = '<le-marais-id>'
         AND p.review_score >= 8.5
         AND 'couples' = ANY(
           SELECT UNNEST(vibe_tags) FROM properties WHERE id = p.id
         )
       ORDER BY p.review_score DESC, p.review_count DESC
       LIMIT 12;
schema: [ItemList, Hotel×12, BreadcrumbList, FAQPage]
word_count_target: 900–1200 (template intro + per-property micro-copy from property_translations)
monetization: 12 Booking affiliate CTAs, 1 GYG "things to do in Le Marais" widget
```

### Target query list — full (English, verify volumes before committing)

| Query | Vol est (mo) | Conf | Diff | Page type | Priority |
|---|---|---|---|---|---|
| where to stay in paris | 30–50k | HIGH | HIGH | pillar | P0 |
| best area to stay in paris first time | 5–10k | HIGH | MED-HIGH | pillar + trip-type | P0 |
| le marais paris | 15–30k | HIGH | HIGH | neighborhood | P0 |
| where to stay in montmartre | 3–7k | HIGH | MED | neighborhood | P0 |
| paris neighborhoods map | 2–4k | HIGH | MED | pillar support | P1 |
| hotels near eiffel tower | 10–20k | HIGH | HIGH | Tier 3 near-attraction (tough) | P2 |
| where not to stay in paris | 1–3k | MED | LOW-MED | contrarian | P0 (easy win) |
| is montmartre safe at night | 1–2k | HIGH | LOW | FAQ within neighborhood page | P1 |
| paris for families where to stay | 1–3k | MED | MED | trip-type | P1 |
| saint germain vs le marais | 200–500 | MED | LOW | comparison | P1 (easy win) |
| paris solo female travel | 1–2k | MED | MED | trip-type | P1 |
| best arrondissement for tourists | 500–1k | MED | LOW | pillar support | P1 (easy win) |

All volumes = unverified estimates from query-pattern inference. **Validate in Ahrefs/Semrush/Google Keyword Planner before committing copy spend.**

### Parallel cities to ship alongside Paris
Ship with same template, lower difficulty, faster ranking:

| City | Lead neighborhood | Why this one |
|---|---|---|
| Porto | Ribeira | Low comp, high affiliate AOV, growing traffic |
| Valencia | El Carmen | Low comp, year-round travel, strong EN-audience interest |
| Kraków | Kazimierz | Low comp, backpacker volume, strong insurance/eSIM conv |
| Bruges | Centrum | Low comp, short-break intent = high booking conversion |

---

## 5. Affiliate application sequence

### Apply in this order

| Order | Program | Block | Requirements | Approval difficulty | Phase 1 revenue share (est) | Notes |
|---|---|---|---|---|---|---|
| 1 | GetYourGuide Partner | 2 | Any site with travel content | Easy, automatic | 8–12% | Apply first — widgets placeable from Paris day-1 |
| 2 | Agoda Partners (direct) | 2 | Working site | Easy, 3–5 days | 3–5% | Secondary; better in Asia but keeps budget segment covered |
| 3 | Booking.com Affiliate (EU direct) | 3 | 10+ indexable pages, real content | Automatic but 5-sales/6-mo rule | **60–70%** (workhorse) | Do NOT apply before Block 3 |
| 4 | Impact Radius → Expedia Group | 4 | Screenshots of monetizable pages | Medium, 7–14 days | 15–20% | Covers Hotels.com, VRBO, Expedia in one approval |
| 5 | SafetyWing (via Impact) | 5 | Active profile on Impact | Easy, auto | 1–2% | Pairs with digital-nomad/long-stay pages |
| 6 | Airalo Partners | 5 | Travel site | Easy, 3–7 days | 1–3% | High volume, small per-conv; strong Pinterest/email synergy |
| 7 | CJ Affiliate → Viator + Trip.com | 6 | 3+ months traffic OR strong content, screenshots | Medium-hard, 7–21 days | 2–4% | Needs visible traffic; apply after blocks 1–5 |
| 8 | Heymondo (EU travel insurance) | 7 | Real site, EU traffic | Easy-medium | 1–3% | Better EU short-stay conversion than SafetyWing |

### Do NOT apply in Phase 1
- **Ezoic** — below 10k sessions adds CWV drag and ~$0 revenue. Skip.
- **Mediavine** — 50k sessions minimum. Not yet.
- **Raptive** (ex-AdThrive) — 100k sessions. Not yet.
- **Amazon Associates** — 24hr cookie, travel commissions microscopic. Never unless product content justifies.
- **Skyscanner/Kiwi** — flights have awful affiliate economics and compete with your own Booking traffic by cannibalizing intent.

### Expected Phase 1 revenue contribution by program

Top of stack → bottom:
1. Booking.com direct — 60–70%
2. Expedia Group via Impact — 15–20%
3. GetYourGuide — 8–12%
4. Agoda — 3–5%
5. Viator (via CJ) — 2–4%
6. SafetyWing + Heymondo combined — 2–4%
7. Airalo — 1–3%

**Scale check:** At 300–500 indexed URLs with 3–5k sessions/mo by end of Phase 1, realistic gross affiliate revenue is €150–500/mo. Don't optimize for revenue this phase. Optimize for indexation velocity, template quality, and first ranking wins.

---

## Image strategy — locked

**Sources (in priority order):**
1. **Unsplash API** — primary. Free, CC0-ish license, highest-quality scenics. Auto-attribution renderer required.
2. **Pexels API** — fallback for gaps; same free/attribution pattern.
3. **Pixabay API** — deep-bench fallback for niche queries (e.g. small Polish towns).
4. **Booking.com property photos** — via affiliate API on all Tier 3 programmatic pages. Affiliate fair-use, no extra license needed. Carries 100% of the visual load on property shortlist pages.
5. **Your own photos** — if/when you travel. Slot into `media.credit = 'own'` for authenticity on flagship Tier 1 pages.

**Hard nos:**
- No paid stock (Shutterstock, Adobe Stock) in 2026.
- No AI-generated images of real places. Ever. Google's treating them as a quality signal against, and one fake-looking hotel photo kills reader trust for the whole site.
- No hotlinking. Every image gets pulled to your CDN (Cloudflare R2 or Bunny) with proper attribution baked into the HTML.

**Visual moat (this is how you differentiate without paying for photos):**
Custom data-driven visualizations generated from your PostGIS + properties tables. Every neighborhood page includes:
- Interactive boundary map (Mapbox GL + `neighborhoods.polygon`)
- Price-band histogram (from `properties.price_band` counts)
- Walkability + safety dials
- Metro/transit proximity visualization
- Trip-type fit radar chart (couples/solo/family/luxury/budget scores)

Built once as React components in Block 4. Rendered on all 3,000 neighborhood pages. Booking and Hotels.com don't make these. Competitors using only Unsplash scenics can't match them.

**Pipeline spec:**
- n8n workflow: on new `neighborhood` insert → Unsplash API search by city+neighborhood name → top 3 results downloaded to `media` table with attribution → manual approval queue in Payload.
- Alt-text generated via your local DeepSeek with human spot-check.
- Lazy-load + AVIF/WebP with fallback baked into the Next.js `<Image>` component.

---

## Shipped artifacts (this operating doc + companions)

Strategy + reference
- `wheretostayeurope-v0-plan.md` — this doc (strategy, data model, affiliate sequence, phase plan)
- `repo-scaffold.md` — Next.js + Payload monorepo structure, configs, bootstrap commands
- `paris-pillar-brief.md` — Paris city-pillar brief, outline, draft opening in your voice
- `city-cluster-briefs.md` — Porto + Valencia + Istanbul briefs, parallel cluster production
- `city-briefs-batch-2.md` — Rome, Barcelona, Amsterdam, London, Berlin, Madrid + Cappadocia bonus
- `legal-compliance-pack.md` — privacy, terms, affiliate, visa, insurance, imprint, cookie — drafts + components

Database
- `db-migrations.sql` — **Section 001 + seed only; sections 002–006 superseded by Payload schema ownership**
- `007_postgis_after_payload.sql` — runs after first Payload boot; adds PostGIS geography columns, triggers, and the external `properties` table

TypeScript / React (drop into repo at noted paths)
- `Countries.ts` → `apps/web/src/collections/Countries.ts`
- `Cities.ts` → `apps/web/src/collections/Cities.ts`
- `Neighborhoods.ts` → `apps/web/src/collections/Neighborhoods.ts`
- `Pages.ts` → `apps/web/src/collections/Pages.ts`
- `Keywords.ts` → `apps/web/src/collections/Keywords.ts`
- `Media.ts` → `apps/web/src/collections/Media.ts`
- `seed-phase1-countries.ts` → `apps/web/scripts/seed-phase1-countries.ts`
- `booking.ts` → `apps/web/src/lib/affiliate/booking.ts`
- `NeighborhoodMap.tsx` → `apps/web/src/components/maps/NeighborhoodMap.tsx`
- `PriceBandHistogram.tsx` → `apps/web/src/components/visualizations/PriceBandHistogram.tsx`
- `AffiliateDisclosure.tsx` → `apps/web/src/components/legal/AffiliateDisclosure.tsx`
- `PriceDisclaimer.tsx` → `apps/web/src/components/legal/PriceDisclaimer.tsx`
- `InsuranceDisclaimer.tsx` → `apps/web/src/components/legal/InsuranceDisclaimer.tsx`
- `VisaDisclaimer.tsx` → `apps/web/src/components/legal/VisaDisclaimer.tsx`

Content + Ops
- `tier3-page-templates.md` — 6 programmatic templates with SQL, scale math, localization
- `n8n-booking-ingest.md` — nightly property sync workflow spec

**First integrated page (proves the stack end-to-end)**
- `neighborhood-page.tsx` → `apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/page.tsx`
- `neighborhood-queries.ts` → same route folder, `queries.ts`
- `neighborhood-loading.tsx` → same route folder, `loading.tsx`
- `neighborhood-not-found.tsx` → same route folder, `not-found.tsx`
- `db.ts` → `apps/web/src/lib/db.ts` (pg pool for properties table + aggregates)
- `consent.ts` → `apps/web/src/lib/consent.ts` (server-side Klaro cookie parsing)
- `hreflang.ts` → `apps/web/src/lib/seo/hreflang.ts`
- `seo-config.ts` → `apps/web/src/lib/seo/config.ts`
- `PropertyCard.tsx` → `apps/web/src/components/affiliate/PropertyCard.tsx`
- `LexicalRenderer.tsx` → `apps/web/src/components/content/LexicalRenderer.tsx` (Payload rich-text → React)

**City pillar page (Tier 1 editorial flagship route)**
- `city-page.tsx` → `apps/web/src/app/(frontend)/[locale]/[country]/[city]/page.tsx`
- `city-queries.ts` → same route folder, `queries.ts`

**Klaro consent manager**
- `klaro-config.ts` → `apps/web/src/lib/klaro-config.ts`
- `ConsentProvider.tsx` → `apps/web/src/components/legal/ConsentProvider.tsx`
- `klaro-integration.md` — install + wiring guide (footer button, root layout, global CSS)

**Paris pillar — full editorial draft**
- `paris-pillar-full-draft.md` — ~4,800 words, ready to paste into Payload admin; marked [PROD NOTE] items to strip and inline components to render at specified positions

**Route hierarchy completed**
- `country-page.tsx` → `apps/web/src/app/(frontend)/[locale]/[country]/page.tsx`
- `country-queries.ts` → same route folder, `queries.ts`

**Data pipeline — closure ring**
- `revalidate-route.ts` → `apps/web/src/app/api/revalidate/route.ts` (on-demand ISR invalidator, timing-safe secret check)
- `n8n-booking-sync-workflow.json` — importable n8n workflow (Schedule → Postgres → Booking API → Transform → Upsert → PostGIS match → soft-delete → revalidate → log → loop)

**Homepage + site chrome (domain goes live)**
- `home-page.tsx` → `apps/web/src/app/(frontend)/[locale]/page.tsx`
- `home-queries.ts` → same route folder, `queries.ts`
- `app-layout.tsx` → `apps/web/src/app/layout.tsx` (root shell + ConsentProvider + Organization schema)
- `locale-layout.tsx` → `apps/web/src/app/(frontend)/[locale]/layout.tsx` (Header + Footer + banner)
- `Header.tsx` → `apps/web/src/components/layout/Header.tsx`
- `LocaleSwitcher.tsx` → `apps/web/src/components/layout/LocaleSwitcher.tsx` (client)
- `Footer.tsx` → `apps/web/src/components/layout/Footer.tsx` (all legal links + cookie preferences)
- `globals.css` → `apps/web/src/app/globals.css` (reset, prose, skip-link, Klaro import, print)

**Porto + Valencia full editorial drafts**
- `porto-pillar-full-draft.md` — ~3,100 words in your voice
- `valencia-pillar-full-draft.md` — ~3,400 words in your voice

**Structural gap closure**
- `middleware.ts` → `apps/web/src/middleware.ts` (locale enforcement, root redirect, Accept-Language negotiation)
- `newsletter-route.ts` → `apps/web/src/app/api/newsletter/route.ts` (Listmonk double-opt-in, Turnstile, in-memory rate limit)
- `app-layout-v2.tsx` → REPLACES earlier `app-layout.tsx` at `apps/web/src/app/layout.tsx` (passthrough)
- `locale-layout-v2.tsx` → REPLACES earlier `locale-layout.tsx` at `apps/web/src/app/(frontend)/[locale]/layout.tsx` (owns html/body/lang)

**Tier 3 programmatic route (scaling multiplier)**
- `tier3-page.tsx` → `apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/hotels-for-[tripType]/page.tsx`
- `tier3-queries.ts` → same route folder, `queries.ts` (8 trip-type filter presets, thin-match 404 guard)

**Operating model decision — locked**
- `compliance-natural-person.md` — Jay runs as individual, not registered entity. Updated Block 0 checklist, Impressum variant, tripwires. Supersedes the "register legal entity" blocker in compliance-checklist.md.

**Deployment runbook (ship-to-live)**
- `deployment-runbook.md` — phases A–K, fresh Hetzner box → indexed pages serving. Includes VPS hardening, Coolify setup, Cloudflare DNS, repo bootstrap commands, Payload admin content-entry, legal-placeholder substitution, n8n wiring, GSC + Bing submission, smoke tests, common-failure table.
- `deploy-session-prompt.md` — paste-ready prompt to open a fresh Claude session when Jay is at his desk to run the actual deploy. Defines interactive protocol, references, pushback rules, stopping condition.

**Competitive technical audit**
- `competitive-tech-audit.md` — WTS vs thehotelguru, theistanbulinsider, 22places, moganddogtravels, twofortheworld, farawayworlds, tripiwi. Verdict: we beat them on 12 of 13 technical axes; the actual gaps are domain age, original photography, E-E-A-T author signals, backlinks, community. Defines Ships A–E; Ships A + B are pre-launch blockers.

**E-E-A-T closure (Ships A + B from competitive audit)**
- `AuthorProfile.ts` → `apps/web/src/globals/AuthorProfile.ts` (Payload Global: single-instance author record, admin-editable)
- `author-queries.ts` → `apps/web/src/lib/author.ts` (cached author loader + Person schema builder)
- `about-page.tsx` → `apps/web/src/app/(frontend)/[locale]/about/page.tsx` (routes `/en/about` etc.)
- `Byline.tsx` → `apps/web/src/components/content/Byline.tsx` (visible "By X · Published Y · Last reviewed Z")
- `article-schema.ts` → `apps/web/src/lib/seo/article-schema.ts` (Article + Author + Publisher JSON-LD)
- `article-page-patches.md` — exact edits to weave Byline + Article schema into neighborhood-page / city-page / country-page / tier3-page. Also: register `AuthorProfile` Global in payload.config.ts; surface `lastReviewedAt` in the three query files.

**Istanbul + Cappadocia full editorial drafts (Phase 1 Tier-1 cluster completion)**
- `istanbul-pillar-full-draft.md` — ~4,400 words in your voice; 5 neighborhoods; Europe-vs-Asia framing; 2023 earthquake misconception addressed directly; balloon-safety style caveats avoided
- `cappadocia-pillar-full-draft.md` — ~2,800 words; Göreme/Ürgüp/Uçhisar/Avanos; honest "are balloon-view rooms worth the premium" section; **conservative balloon-flight-safety policy documented inline** — no operator rankings, no incident counts, link to DGCA only

Legal templates (publish at `/legal/*`)
- `compliance-checklist.md` — master register (Block 0 gate)
- `legal-privacy-policy.md` → `/legal/privacy`
- `legal-terms-of-use.md` → `/legal/terms`
- `legal-affiliate-disclosure.md` → `/legal/disclosure`
- `legal-cookie-policy.md` → `/legal/cookies`
- `legal-impressum.md` → `/legal/impressum`
- `legal-gdpr-article-30-record.md` — internal only, NOT published

## Architecture correction (session 3)

Payload v3 owns all entity schema (countries, cities, neighborhoods, pages, keywords, media, users, trip_types, attractions, regions) via its Drizzle adapter. Manually creating the same tables conflicts with Payload's sync.

Revised pattern:
1. Only extensions + seeds run pre-Payload (`001_extensions.sql`)
2. Payload boots, syncs its schema
3. Supplemental SQL (`007_postgis_after_payload.sql`) adds: PostGIS geography columns on Payload tables, a trigger to sync `polygonGeojson` → `polygon` geography, GIST/GIN indexes, and the `properties` table (which stays external because it's API-ingested and high-volume)

The original `db-migrations.sql` has a deprecation banner at the top marking sections 002–006 as superseded.

## Legal / compliance track — hard blocker before first affiliate link

Addressed in `legal-compliance-pack.md`. Summary:
- Privacy Policy, Terms of Use, Affiliate Disclosure, Contact/Imprint pages: required before any affiliate link goes live. All drafted.
- `AffiliateDisclosureBanner` component: renders above first affiliate CTA on every page with affiliate links. Component spec included.
- `CookieNotice` component: minimal notice, no blocking banner (justified by cookie-free analytics stack).
- `VisaDisclaimer`, `PriceDisclaimer`, `InsuranceDisclaimer`: inline components for specific content types.
- All affiliate `<a>` tags get `rel="sponsored nofollow noopener" target="_blank"` — enforced via helper constant.
- Organization schema JSON-LD in root layout.
- **German Impressum** required at `/impressum/` before DE locale launches.
- Business entity: start as sole trader; incorporate before €1k/mo revenue or 10k/mo traffic.

Block 3 gate: no affiliate link goes live until all 4 legal pages + footer imprint + AffiliateDisclosureBanner are deployed.

## Resolved calls (from dangling threads)

- ✅ **Sitemap:** index sitemap + split by type AND locale (e.g. `/sitemap-neighborhoods-en.xml`). 50k URL cap per file.
- ✅ **Email ESP:** Listmonk self-hosted on Hetzner. Free at any scale. Docker-compose in `infra/listmonk/`.
- ✅ **Image CDN:** Cloudflare R2 + Cloudflare CDN. Zero egress fee inside Cloudflare. Bunny deferred to year 2.
- ✅ **Payload v3 + PostGIS:** compatible via Drizzle adapter; geography columns managed in raw SQL migrations, Payload treats them as opaque types. Pattern verified.

## Dangling threads to track across sessions

**Block 0 — compliance blockers (must resolve before first indexed page)** — revised for natural-person operation
- [ ] **Research local natural-person / sole-trader rules** for your country (Germany = Gewerbeanmeldung; France = auto-entrepreneur; UK = Self Assessment > £1k; Spain = autónomo; Turkey = local residency rules; US = Schedule C). 30-min accountant consult = €50–150 and resolves this.
- [ ] **Register for tax / sole-trader status** wherever required — NOT forming a company
- [ ] **Tax residency confirmed** — decides Booking direct-EU vs Impact route
- [ ] **Budget €200–500 for lawyer review** of the 5 legal templates (optional but recommended)
- [ ] **Decide visa content posture**: skip (safer), link-only, or full-disclaimer. Recommendation: skip in Phase 1.
- [ ] **Contact email address working** on your domain (contact@ + privacy@ + dsa-authority@ + dsa-user@)
- [ ] **Physical address for Impressum** — home address or virtual office (€10–30/mo if privacy matters)
- [ ] **Replace `[LEGAL ENTITY NAME]` and `[REGISTERED ADDRESS]`** in all 6 legal templates with your full legal name + physical address
- [ ] **Second personal bank account** dedicated to site finances — not a legal requirement, a sanity requirement when revenue starts

**Operational**
- [ ] Backlink outreach list — niche travel bloggers, "best of 2026" roundup journalists
- [ ] Istanbul's inclusion in `areaServed` schema + footer copy so scope stays clear
- [ ] Mapbox GL token procurement (free tier fine for Phase 1: <50k loads/mo)
- [ ] DeepL API Pro account + API key
- [ ] Unsplash developer app approval (50 req/hr sandbox → 5,000/hr production)
- [ ] Booking.com affiliate API access request (separate from account approval; requires 30+ days account age)
- [ ] GSC property verification for both bare + www (pick one canonical)
- [ ] Decide GA4 vs. Plausible-only (leaning Plausible-only)
- [ ] Author bio + E-E-A-T credentials page — needed before Impact/CJ applications
- [ ] **Verify Booking.com destination IDs** in `seed-phase1-countries.ts` — spot-check 3–5 via actual Booking URL before running the seed
- [ ] Klaro consent manager integration — for Mapbox + affiliate-click cookies
- [ ] Cloudflare Turnstile on contact form (spam prevention)

-- ============================================================================
-- WhereToStayEurope — Database migrations (PostgreSQL 15+ with PostGIS)
-- ============================================================================
-- ⚠️ STATUS (revised): Sections 002–006 below are SUPERSEDED.
--
-- Payload v3 owns entity schema (countries, cities, neighborhoods, pages,
-- keywords, media, users, trip_types, attractions, regions) and auto-generates
-- `*_locales` tables via its localization feature. Creating duplicate tables
-- here causes conflicts with Payload's Drizzle adapter.
--
-- KEEP + RUN from this file:
--   • Section "001_extensions.sql" (extensions + updated_at helper)
--   • Section "Seed data" at the bottom (countries + trip_types seed)
--
-- SKIP sections 002–006 of this file. Use `007_postgis_after_payload.sql`
-- (separate file, delivered alongside) instead — it adds PostGIS geography
-- columns to Payload-created tables and creates the external `properties`
-- table, which is NOT a Payload collection.
--
-- Execution order:
--   1. Run Section 001 (extensions) before first Payload boot
--   2. Boot Payload: `pnpm dev` — this creates entity tables
--   3. Run 007_postgis_after_payload.sql — adds geography + properties + indexes
--   4. Run the seed section at the bottom of this file (countries + trip_types)
-- ============================================================================


-- ============================================================================
-- 001_extensions.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- convenience function for updated_at triggers
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================================
-- 002_geography.sql — countries, regions, cities, neighborhoods + translations
-- ============================================================================

CREATE TABLE countries (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            text UNIQUE NOT NULL,
  iso_code        char(2) UNIQUE NOT NULL,
  continent       text NOT NULL DEFAULT 'europe',
  currency_code   char(3),
  timezone        text,
  capital_city_id uuid,                                 -- deferred FK, added after cities
  population      int,
  area_km2        int,
  eu_member       boolean DEFAULT false,
  schengen        boolean DEFAULT false,
  tier            int CHECK (tier BETWEEN 1 AND 3),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER countries_updated BEFORE UPDATE ON countries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE country_translations (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id          uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  locale              text NOT NULL CHECK (locale IN ('en','de','fr','es','it','tr')),
  name                text NOT NULL,
  intro_html          text,
  best_time_to_visit  text,
  travel_tips         jsonb DEFAULT '{}'::jsonb,
  meta_title          text,
  meta_description    text,
  last_reviewed_at    timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, locale)
);
CREATE TRIGGER country_translations_updated BEFORE UPDATE ON country_translations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE regions (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id  uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  slug        text NOT NULL,
  bbox        geography(polygon, 4326),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, slug)
);
CREATE TRIGGER regions_updated BEFORE UPDATE ON regions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE region_translations (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id        uuid NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  locale           text NOT NULL,
  name             text NOT NULL,
  description_html text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (region_id, locale)
);

CREATE TABLE cities (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id      uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  region_id       uuid REFERENCES regions(id) ON DELETE SET NULL,
  slug            text NOT NULL,
  centroid        geography(point, 4326),
  bbox            geography(polygon, 4326),
  airport_codes   text[],
  population      int,
  tier            int CHECK (tier BETWEEN 1 AND 3),      -- 1=global top, 2=major, 3=secondary
  booking_dest_id int,                                    -- Booking.com destination ID
  gyg_location_id int,                                    -- GetYourGuide location ID
  seasonality     jsonb DEFAULT '{}'::jsonb,              -- { "jan": {"crowd": 2, "price": 3}, ... }
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, slug)
);
CREATE TRIGGER cities_updated BEFORE UPDATE ON cities
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- deferred FK: countries.capital_city_id → cities.id
ALTER TABLE countries
  ADD CONSTRAINT fk_countries_capital_city
  FOREIGN KEY (capital_city_id) REFERENCES cities(id) ON DELETE SET NULL
  DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE city_translations (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id          uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  locale           text NOT NULL,
  name             text NOT NULL,
  intro_html       text,
  when_to_visit    text,
  getting_around   text,
  safety_notes     text,
  meta_title       text,
  meta_description text,
  last_reviewed_at timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (city_id, locale)
);
CREATE TRIGGER city_translations_updated BEFORE UPDATE ON city_translations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE neighborhoods (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id             uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  slug                text NOT NULL,
  centroid            geography(point, 4326),
  polygon             geography(polygon, 4326),
  vibe_tags           text[] DEFAULT ARRAY[]::text[],    -- ['nightlife','luxury','family-friendly']
  trip_type_fit       text[] DEFAULT ARRAY[]::text[],    -- ['couples','solo','business']
  price_tier          int CHECK (price_tier BETWEEN 1 AND 5),
  safety_score        numeric(3,2) CHECK (safety_score BETWEEN 0 AND 10),
  walkability_score   numeric(3,2) CHECK (walkability_score BETWEEN 0 AND 10),
  nearest_metro       text[],
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  UNIQUE (city_id, slug)
);
CREATE TRIGGER neighborhoods_updated BEFORE UPDATE ON neighborhoods
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE neighborhood_translations (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  neighborhood_id   uuid NOT NULL REFERENCES neighborhoods(id) ON DELETE CASCADE,
  locale            text NOT NULL,
  name              text NOT NULL,
  summary           text,
  who_its_for       text,
  who_should_skip   text,
  dining_notes      text,
  nightlife_notes   text,
  stay_tips         text,
  meta_title        text,
  meta_description  text,
  last_reviewed_at  timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (neighborhood_id, locale)
);
CREATE TRIGGER neighborhood_translations_updated BEFORE UPDATE ON neighborhood_translations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ============================================================================
-- 003_properties.sql — hotels/hostels/apartments ingested from Booking API
-- ============================================================================

CREATE TABLE properties (
  id                     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id                uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  neighborhood_id        uuid REFERENCES neighborhoods(id) ON DELETE SET NULL,
  booking_id             text UNIQUE,
  external_ids           jsonb DEFAULT '{}'::jsonb,      -- {hotels_com, expedia, agoda, gyg}
  name                   text NOT NULL,
  type                   text CHECK (type IN ('hotel','hostel','apartment','aparthotel','villa','bnb','guesthouse')),
  star_rating            numeric(2,1),
  review_score           numeric(3,2),
  review_count           int,
  price_band             text CHECK (price_band IN ('$','$$','$$$','$$$$')),
  price_estimate_eur     int,
  lat                    numeric(9,6),
  lng                    numeric(9,6),
  amenities              text[] DEFAULT ARRAY[]::text[],
  affiliate_url_template text,
  image_primary_url      text,
  last_synced_at         timestamptz,
  is_active              boolean DEFAULT true,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER properties_updated BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE property_translations (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  locale      text NOT NULL,
  short_pitch text,
  why_stay    text,
  why_skip    text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (property_id, locale)
);


-- ============================================================================
-- 004_pages.sql — editorial + programmatic pages with hreflang groups
-- ============================================================================

CREATE TABLE hreflang_groups (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  canonical_locale  text NOT NULL DEFAULT 'en',
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pages (
  id                 uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type               text NOT NULL CHECK (type IN (
                       'country_hub','city_hub','neighborhood_guide',
                       'neighborhood_comparison','trip_type_city',
                       'property_shortlist','price_band','amenity',
                       'near_attraction','contrarian','seasonal'
                     )),
  entity_type        text,                               -- 'country'|'city'|'neighborhood'|'property_set'
  entity_id          uuid,
  tier               int CHECK (tier BETWEEN 1 AND 3),
  status             text NOT NULL DEFAULT 'draft' CHECK (status IN (
                       'draft','ai_drafted','editing','published','stale'
                     )),
  published_at       timestamptz,
  last_reviewed_at   timestamptz,
  template_version   int DEFAULT 1,
  schema_markup      jsonb DEFAULT '{}'::jsonb,
  hreflang_group_id  uuid REFERENCES hreflang_groups(id) ON DELETE SET NULL,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER pages_updated BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE page_translations (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id           uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  locale            text NOT NULL,
  title             text NOT NULL,
  slug              text NOT NULL,
  content_mdx       text,
  meta_title        text,
  meta_description  text,
  quality_score     numeric(3,2),
  word_count        int,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page_id, locale),
  UNIQUE (locale, slug)                                  -- no slug collision within a locale
);
CREATE TRIGGER page_translations_updated BEFORE UPDATE ON page_translations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE internal_links (
  from_page_id  uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  to_page_id    uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  anchor        text NOT NULL,
  locale        text NOT NULL,
  score         numeric(4,3) DEFAULT 0,                  -- semantic similarity score
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (from_page_id, to_page_id, locale)
);


-- ============================================================================
-- 005_supporting.sql — trip types, attractions, media, keywords, email
-- ============================================================================

CREATE TABLE trip_types (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        text UNIQUE NOT NULL,                     -- couples|families|solo|business|luxury|budget|digital_nomads
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE trip_type_translations (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_type_id  uuid NOT NULL REFERENCES trip_types(id) ON DELETE CASCADE,
  locale        text NOT NULL,
  name          text NOT NULL,
  description   text,
  UNIQUE (trip_type_id, locale)
);

CREATE TABLE attractions (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id         uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  slug            text NOT NULL,
  centroid        geography(point, 4326),
  type            text CHECK (type IN ('monument','museum','district','transit_hub','airport','park','venue')),
  booking_dest_id int,
  gyg_activity_id int,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (city_id, slug)
);

CREATE TABLE attraction_translations (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  attraction_id   uuid NOT NULL REFERENCES attractions(id) ON DELETE CASCADE,
  locale          text NOT NULL,
  name            text NOT NULL,
  short_desc      text,
  UNIQUE (attraction_id, locale)
);

CREATE TABLE media (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type           text CHECK (type IN ('image','video','map','diagram')),
  url            text NOT NULL,
  r2_key         text,                                   -- Cloudflare R2 object key
  alt_text_base  text,
  source         text CHECK (source IN ('unsplash','pexels','pixabay','booking','own','commissioned','ai_diagram')),
  credit         text,
  license        text,
  geo            geography(point, 4326),
  entity_type    text,
  entity_id      uuid,
  width          int,
  height         int,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE media_translations (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_id   uuid NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  locale     text NOT NULL,
  alt_text   text,
  caption    text,
  UNIQUE (media_id, locale)
);

CREATE TABLE keywords (
  id                 uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  query              text NOT NULL,
  locale             text NOT NULL,
  country_target     char(2),
  volume_estimate    int,
  volume_confidence  text CHECK (volume_confidence IN ('low','med','high')),
  difficulty         int CHECK (difficulty BETWEEN 0 AND 100),
  intent             text CHECK (intent IN ('inform','compare','transactional','navigational')),
  cluster_id         uuid,
  mapped_page_id     uuid REFERENCES pages(id) ON DELETE SET NULL,
  source             text CHECK (source IN ('ahrefs','semrush','gsc','keywords_everywhere','guess')),
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (query, locale)
);
CREATE TRIGGER keywords_updated BEFORE UPDATE ON keywords
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE email_subscribers (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email             citext UNIQUE NOT NULL,
  locale            text NOT NULL DEFAULT 'en',
  country_pref      char(2)[] DEFAULT ARRAY[]::char(2)[],
  trip_type_pref    text[] DEFAULT ARRAY[]::text[],
  source_page_id    uuid REFERENCES pages(id) ON DELETE SET NULL,
  confirmed_at      timestamptz,
  unsubscribed_at   timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);


-- ============================================================================
-- 006_indexes.sql — performance indexes
-- ============================================================================

-- Geographic lookups (PostGIS GiST)
CREATE INDEX idx_cities_centroid       ON cities USING GIST (centroid);
CREATE INDEX idx_cities_bbox           ON cities USING GIST (bbox);
CREATE INDEX idx_neighborhoods_centroid ON neighborhoods USING GIST (centroid);
CREATE INDEX idx_neighborhoods_polygon  ON neighborhoods USING GIST (polygon);
CREATE INDEX idx_attractions_centroid  ON attractions USING GIST (centroid);

-- Properties: most common query shapes
CREATE INDEX idx_properties_city_price_score
  ON properties (city_id, price_band, review_score DESC)
  WHERE is_active = true;
CREATE INDEX idx_properties_neighborhood_score
  ON properties (neighborhood_id, review_score DESC)
  WHERE is_active = true AND neighborhood_id IS NOT NULL;
CREATE INDEX idx_properties_amenities  ON properties USING GIN (amenities);
CREATE INDEX idx_properties_booking_id ON properties (booking_id);

-- Neighborhoods: tag lookups for Tier 3 generation
CREATE INDEX idx_neighborhoods_vibe_tags     ON neighborhoods USING GIN (vibe_tags);
CREATE INDEX idx_neighborhoods_trip_type_fit ON neighborhoods USING GIN (trip_type_fit);

-- Pages + translations: URL resolution
CREATE INDEX idx_page_translations_slug        ON page_translations (locale, slug);
CREATE INDEX idx_pages_entity                  ON pages (entity_type, entity_id);
CREATE INDEX idx_pages_status_type             ON pages (status, type);
CREATE INDEX idx_pages_hreflang_group          ON pages (hreflang_group_id);

-- Trigram search on slugs (for admin autocomplete)
CREATE INDEX idx_cities_slug_trgm         ON cities        USING GIN (slug gin_trgm_ops);
CREATE INDEX idx_neighborhoods_slug_trgm  ON neighborhoods USING GIN (slug gin_trgm_ops);
CREATE INDEX idx_properties_name_trgm     ON properties    USING GIN (name gin_trgm_ops);

-- Keywords: cluster lookups
CREATE INDEX idx_keywords_cluster    ON keywords (cluster_id);
CREATE INDEX idx_keywords_mapped     ON keywords (mapped_page_id);
CREATE INDEX idx_keywords_locale_vol ON keywords (locale, volume_estimate DESC);

-- Internal links: reverse lookup
CREATE INDEX idx_internal_links_to ON internal_links (to_page_id, locale);


-- ============================================================================
-- Seed data: Phase 1 countries + trip_types (safe to rerun with ON CONFLICT)
-- ============================================================================

INSERT INTO countries (slug, iso_code, currency_code, timezone, eu_member, schengen, tier) VALUES
  ('france',      'FR', 'EUR', 'Europe/Paris',      true,  true,  1),
  ('spain',       'ES', 'EUR', 'Europe/Madrid',     true,  true,  1),
  ('italy',       'IT', 'EUR', 'Europe/Rome',       true,  true,  1),
  ('germany',     'DE', 'EUR', 'Europe/Berlin',     true,  true,  1),
  ('united-kingdom','GB','GBP','Europe/London',     false, false, 1),
  ('netherlands', 'NL', 'EUR', 'Europe/Amsterdam',  true,  true,  1),
  ('turkey',      'TR', 'TRY', 'Europe/Istanbul',   false, false, 1)
ON CONFLICT (iso_code) DO NOTHING;

INSERT INTO country_translations (country_id, locale, name)
SELECT id, 'en', CASE iso_code
  WHEN 'FR' THEN 'France'
  WHEN 'ES' THEN 'Spain'
  WHEN 'IT' THEN 'Italy'
  WHEN 'DE' THEN 'Germany'
  WHEN 'GB' THEN 'United Kingdom'
  WHEN 'NL' THEN 'Netherlands'
  WHEN 'TR' THEN 'Turkey'
END
FROM countries
WHERE iso_code IN ('FR','ES','IT','DE','GB','NL','TR')
ON CONFLICT (country_id, locale) DO NOTHING;

INSERT INTO trip_types (slug) VALUES
  ('couples'),('families'),('solo'),('business'),
  ('luxury'),('budget'),('digital-nomads'),('first-timers')
ON CONFLICT (slug) DO NOTHING;

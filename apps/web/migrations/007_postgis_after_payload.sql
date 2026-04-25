-- apps/web/migrations/007_postgis_after_payload.sql
-- Run AFTER the first successful Payload boot (which creates entity tables).
-- Safe to re-run (all statements are idempotent).
--
-- Supersedes sections 002–006 of the original db-migrations.sql.
-- Payload owns table creation; this script adds:
--   1. PostGIS + pg_trgm extensions
--   2. Generated geography columns on Payload-managed tables
--   3. Trigger to sync polygonGeojson -> polygon geography column
--   4. The `properties` table (external to Payload; API-ingested)
--   5. GIST / GIN indexes

CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Cities: centroid (generated) + bbox (nullable, populated by ingest jobs)
-- ---------------------------------------------------------------------------
ALTER TABLE cities
  ADD COLUMN IF NOT EXISTS centroid geography(point, 4326)
  GENERATED ALWAYS AS (
    CASE WHEN lat IS NOT NULL AND lng IS NOT NULL
      THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
      ELSE NULL
    END
  ) STORED;

ALTER TABLE cities ADD COLUMN IF NOT EXISTS bbox geography(polygon, 4326);

-- ---------------------------------------------------------------------------
-- Neighborhoods: centroid (generated) + polygon (synced from polygonGeojson)
-- ---------------------------------------------------------------------------
ALTER TABLE neighborhoods
  ADD COLUMN IF NOT EXISTS centroid geography(point, 4326)
  GENERATED ALWAYS AS (
    CASE WHEN lat IS NOT NULL AND lng IS NOT NULL
      THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
      ELSE NULL
    END
  ) STORED;

ALTER TABLE neighborhoods ADD COLUMN IF NOT EXISTS polygon geography(polygon, 4326);

-- Sync trigger: polygonGeojson (JSON) → polygon (geography)
-- Payload stores JSON fields as jsonb columns with the camelCase field name quoted.
CREATE OR REPLACE FUNCTION neighborhoods_sync_polygon() RETURNS trigger AS $$
BEGIN
  IF NEW."polygonGeojson" IS NOT NULL THEN
    BEGIN
      NEW.polygon := ST_SetSRID(
        ST_GeomFromGeoJSON(NEW."polygonGeojson"::text),
        4326
      )::geography;
    EXCEPTION WHEN OTHERS THEN
      -- If GeoJSON is malformed, null the polygon rather than fail the write.
      NEW.polygon := NULL;
      RAISE WARNING 'neighborhoods_sync_polygon: invalid GeoJSON for id %', NEW.id;
    END;
  ELSE
    NEW.polygon := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS neighborhoods_polygon_sync ON neighborhoods;
CREATE TRIGGER neighborhoods_polygon_sync
  BEFORE INSERT OR UPDATE OF "polygonGeojson" ON neighborhoods
  FOR EACH ROW EXECUTE FUNCTION neighborhoods_sync_polygon();

-- ---------------------------------------------------------------------------
-- Properties: external to Payload. API-ingested (Booking.com), high-volume.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id                uuid NOT NULL,              -- FK enforced at app layer; Payload city uuid
  neighborhood_id        uuid,                        -- nullable; not all Booking properties map to a neighborhood
  booking_id             text UNIQUE,
  external_ids           jsonb NOT NULL DEFAULT '{}'::jsonb,
  name                   text NOT NULL,
  type                   text CHECK (type IN (
                           'hotel','hostel','apartment','aparthotel',
                           'villa','bnb','guesthouse','capsule'
                         )),
  star_rating            numeric(2,1),
  review_score           numeric(3,2),
  review_count           int,
  price_band             text CHECK (price_band IN ('$','$$','$$$','$$$$')),
  price_estimate_eur     int,
  lat                    numeric(9,6),
  lng                    numeric(9,6),
  centroid               geography(point, 4326)
    GENERATED ALWAYS AS (
      CASE WHEN lat IS NOT NULL AND lng IS NOT NULL
        THEN ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
        ELSE NULL
      END
    ) STORED,
  amenities              text[] NOT NULL DEFAULT ARRAY[]::text[],
  affiliate_url_template text,
  image_primary_url      text,
  translations           jsonb NOT NULL DEFAULT '{}'::jsonb,
                           -- { "en": { "shortPitch": "...", "whyStay": "...", "whySkip": "..." }, ... }
  last_synced_at         timestamptz,
  is_active              boolean NOT NULL DEFAULT true,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION properties_set_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_updated ON properties;
CREATE TRIGGER properties_updated BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION properties_set_updated_at();

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_cities_centroid
  ON cities USING GIST (centroid);

CREATE INDEX IF NOT EXISTS idx_neighborhoods_centroid
  ON neighborhoods USING GIST (centroid);

CREATE INDEX IF NOT EXISTS idx_neighborhoods_polygon
  ON neighborhoods USING GIST (polygon);

CREATE INDEX IF NOT EXISTS idx_properties_city_price_score
  ON properties (city_id, price_band, review_score DESC)
  WHERE is_active;

CREATE INDEX IF NOT EXISTS idx_properties_neighborhood_score
  ON properties (neighborhood_id, review_score DESC)
  WHERE is_active AND neighborhood_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_properties_amenities
  ON properties USING GIN (amenities);

CREATE INDEX IF NOT EXISTS idx_properties_centroid
  ON properties USING GIST (centroid);

CREATE INDEX IF NOT EXISTS idx_properties_booking_id
  ON properties (booking_id);

-- Trigram indexes for admin autocomplete
CREATE INDEX IF NOT EXISTS idx_cities_slug_trgm
  ON cities USING GIN (slug gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_neighborhoods_slug_trgm
  ON neighborhoods USING GIN (slug gin_trgm_ops);

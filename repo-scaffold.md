# WhereToStayEurope — Repo Scaffold

Monorepo, pnpm workspaces, Next.js 15 + Payload 3 in one app, ingest workers in another package. Deployed via Coolify on Hetzner. Paste the structure and configs below to bootstrap.

## Directory structure

```
wheretostay/
├── apps/
│   └── web/                              # Next.js + Payload (same app, same Postgres)
│       ├── src/
│       │   ├── app/
│       │   │   ├── (frontend)/
│       │   │   │   └── [locale]/
│       │   │   │       ├── layout.tsx
│       │   │   │       ├── page.tsx                      # home
│       │   │   │       ├── [country]/
│       │   │   │       │   ├── page.tsx                  # country hub
│       │   │   │       │   └── [city]/
│       │   │   │       │       ├── page.tsx              # city pillar
│       │   │   │       │       ├── [neighborhood]/
│       │   │   │       │       │   └── page.tsx          # neighborhood deep-dive
│       │   │   │       │       ├── compare/
│       │   │   │       │       │   └── [a]-vs-[b]/
│       │   │   │       │       │       └── page.tsx      # comparison
│       │   │   │       │       └── for-[tripType]/
│       │   │   │       │           └── page.tsx          # trip-type × city
│       │   │   ├── (payload)/
│       │   │   │   └── admin/[[...segments]]/page.tsx    # Payload admin UI
│       │   │   ├── api/
│       │   │   │   ├── [...slug]/route.ts                # Payload REST
│       │   │   │   ├── revalidate/route.ts               # on-demand ISR
│       │   │   │   └── sitemap/[type]/route.ts           # dynamic sitemaps
│       │   │   ├── layout.tsx
│       │   │   └── globals.css
│       │   ├── collections/
│       │   │   ├── Countries.ts
│       │   │   ├── Cities.ts
│       │   │   ├── Neighborhoods.ts
│       │   │   ├── Properties.ts
│       │   │   ├── Pages.ts
│       │   │   ├── Media.ts
│       │   │   ├── Keywords.ts
│       │   │   └── Users.ts
│       │   ├── globals/
│       │   │   ├── Header.ts
│       │   │   └── Footer.ts
│       │   ├── components/
│       │   │   ├── maps/
│       │   │   │   └── NeighborhoodMap.tsx               # Mapbox GL
│       │   │   ├── visualizations/
│       │   │   │   ├── PriceBandHistogram.tsx
│       │   │   │   ├── WalkabilityDial.tsx
│       │   │   │   ├── TripTypeRadar.tsx
│       │   │   │   └── TransitProximity.tsx
│       │   │   ├── affiliate/
│       │   │   │   ├── BookingCTA.tsx
│       │   │   │   ├── GYGWidget.tsx
│       │   │   │   └── PropertyCard.tsx
│       │   │   └── seo/
│       │   │       ├── SchemaMarkup.tsx
│       │   │       └── Hreflang.tsx
│       │   ├── lib/
│       │   │   ├── affiliate/
│       │   │   │   ├── booking.ts                        # deep-link builder
│       │   │   │   ├── gyg.ts
│       │   │   │   ├── agoda.ts
│       │   │   │   └── impact.ts
│       │   │   ├── translation/
│       │   │   │   └── deepl.ts
│       │   │   ├── images/
│       │   │   │   ├── unsplash.ts
│       │   │   │   ├── pexels.ts
│       │   │   │   └── attribution.ts
│       │   │   ├── seo/
│       │   │   │   ├── schema.ts                         # schema.org builders
│       │   │   │   ├── hreflang.ts
│       │   │   │   └── sitemap.ts
│       │   │   ├── search/
│       │   │   │   └── meilisearch.ts
│       │   │   ├── db.ts                                 # raw pg pool for PostGIS queries
│       │   │   └── payload.ts                            # getPayload client
│       │   ├── payload.config.ts
│       │   └── payload-types.ts                          # generated
│       ├── public/
│       ├── migrations/                                    # raw SQL (PostGIS + schema)
│       │   ├── 001_extensions.sql
│       │   ├── 002_geography.sql
│       │   ├── 003_properties.sql
│       │   ├── 004_pages.sql
│       │   ├── 005_supporting.sql
│       │   └── 006_indexes.sql
│       ├── next.config.ts
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   ├── ingest/                                           # Python + n8n workers
│   │   ├── booking-sync/
│   │   │   ├── main.py
│   │   │   ├── requirements.txt
│   │   │   └── Dockerfile
│   │   ├── unsplash-fetch/
│   │   ├── geojson-builder/
│   │   └── embedding-internal-links/
│   └── shared-types/                                     # TypeScript types shared across web + n8n API callers
├── infra/
│   ├── coolify/
│   │   └── services.yml
│   ├── nginx/
│   │   └── wheretostayeurope.conf
│   ├── meilisearch/
│   │   └── docker-compose.yml                            # runs on headless Linux box
│   └── listmonk/
│       └── docker-compose.yml
├── docker-compose.yml                                    # local dev: postgres + meilisearch + listmonk
├── .env.example
├── .gitignore
├── pnpm-workspace.yaml
├── package.json                                          # workspace root
├── README.md
└── CLAUDE.md                                             # this co-founder operating doc
```

## Root `package.json`

```json
{
  "name": "wheretostayeurope",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "dev": "pnpm --filter web dev",
    "build": "pnpm --filter web build",
    "start": "pnpm --filter web start",
    "migrate": "pnpm --filter web migrate",
    "generate:types": "pnpm --filter web generate:types"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "prettier": "^3.3.0"
  }
}
```

## `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## `apps/web/package.json`

```json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start -p 3000",
    "generate:types": "payload generate:types",
    "migrate": "psql $DATABASE_URL -f migrations/001_extensions.sql && psql $DATABASE_URL -f migrations/002_geography.sql && psql $DATABASE_URL -f migrations/003_properties.sql && psql $DATABASE_URL -f migrations/004_pages.sql && psql $DATABASE_URL -f migrations/005_supporting.sql && psql $DATABASE_URL -f migrations/006_indexes.sql"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "payload": "^3.0.0",
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "@payloadcms/next": "^3.0.0",
    "graphql": "^16.9.0",
    "pg": "^8.13.0",
    "meilisearch": "^0.44.0",
    "mapbox-gl": "^3.7.0",
    "recharts": "^2.13.0",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/pg": "^8.11.0",
    "typescript": "^5.6.0"
  }
}
```

## `apps/web/next.config.ts`

```ts
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "pixabay.com" },
      { protocol: "https", hostname: "cf.bstatic.com" },       // Booking property images
      { protocol: "https", hostname: "r2.wheretostayeurope.com" },
    ],
  },
  experimental: {
    ppr: true,
    reactCompiler: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  i18n: undefined, // handled via [locale] segment manually for full control
};

export default withPayload(nextConfig);
```

## `apps/web/src/payload.config.ts` (skeleton)

```ts
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Countries } from "./collections/Countries";
import { Cities } from "./collections/Cities";
import { Neighborhoods } from "./collections/Neighborhoods";
import { Properties } from "./collections/Properties";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { Keywords } from "./collections/Keywords";
import { Users } from "./collections/Users";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— WhereToStayEurope CMS",
    },
  },
  collections: [
    Countries,
    Cities,
    Neighborhoods,
    Properties,
    Pages,
    Media,
    Keywords,
    Users,
  ],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    // PostGIS tables (geography columns) are managed via raw SQL migrations, not Payload
    // Payload manages its own metadata tables alongside
  }),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Deutsch", code: "de" },
      { label: "Français", code: "fr" },
      { label: "Español", code: "es" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  cors: [process.env.SITE_URL!].filter(Boolean),
  csrf: [process.env.SITE_URL!].filter(Boolean),
});
```

## `.env.example`

```env
# --- Core ---
NODE_ENV=development
SITE_URL=https://wheretostayeurope.com
NEXT_PUBLIC_SITE_URL=https://wheretostayeurope.com

# --- Database (Hetzner-hosted Postgres or Neon) ---
DATABASE_URL=postgres://user:pass@host:5432/wheretostay

# --- Payload ---
PAYLOAD_SECRET=change_me_32_random_chars_min

# --- Meilisearch (self-hosted on headless Linux box) ---
MEILISEARCH_HOST=http://meili.internal:7700
MEILISEARCH_KEY=

# --- Affiliate ---
BOOKING_AFFILIATE_AID=
BOOKING_API_KEY=
GYG_PARTNER_ID=
AGODA_CID=
IMPACT_ACCOUNT_SID=
IMPACT_AUTH_TOKEN=

# --- Images ---
UNSPLASH_ACCESS_KEY=
PEXELS_API_KEY=
PIXABAY_API_KEY=
CF_R2_ACCOUNT_ID=
CF_R2_ACCESS_KEY=
CF_R2_SECRET_KEY=
CF_R2_BUCKET=wheretostay-media

# --- Translation ---
DEEPL_API_KEY=

# --- Maps ---
NEXT_PUBLIC_MAPBOX_TOKEN=

# --- Email (Listmonk self-hosted) ---
LISTMONK_URL=http://listmonk.internal:9000
LISTMONK_USER=
LISTMONK_PASS=
```

## `docker-compose.yml` (local dev)

```yaml
version: "3.9"
services:
  postgres:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_USER: wts
      POSTGRES_PASSWORD: wts
      POSTGRES_DB: wheretostay
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

  meilisearch:
    image: getmeili/meilisearch:v1.10
    environment:
      MEILI_MASTER_KEY: dev_master_key
    ports: ["7700:7700"]
    volumes: ["meilidata:/meili_data"]

  listmonk:
    image: listmonk/listmonk:latest
    ports: ["9000:9000"]
    depends_on: [postgres]
    environment:
      LISTMONK_db__user: wts
      LISTMONK_db__password: wts
      LISTMONK_db__database: listmonk
      LISTMONK_db__host: postgres

volumes:
  pgdata:
  meilidata:
```

## Bootstrap commands

Paste into terminal from empty repo root:

```bash
pnpm init
mkdir -p apps/web packages/ingest packages/shared-types infra/{coolify,nginx,meilisearch,listmonk}
echo "packages:\n  - 'apps/*'\n  - 'packages/*'" > pnpm-workspace.yaml
cd apps/web
pnpm create payload-app@latest . --db postgres --template blank
# Replace generated payload.config.ts with the one above
# Replace next.config.ts with the one above
mkdir -p src/{collections,globals,components/{maps,visualizations,affiliate,seo},lib/{affiliate,translation,images,seo,search},app/(frontend)/[locale],app/(payload)/admin}
mkdir migrations
# Copy the 6 migration SQL files from db-migrations.sql
pnpm install
cp .env.example .env.local  # fill in values
docker-compose up -d postgres
pnpm migrate
pnpm generate:types
pnpm dev
```

Admin UI lives at `http://localhost:3000/admin`.
Frontend at `http://localhost:3000/en`.

## Coolify deployment notes

- Create app in Coolify → GitHub source → auto-deploy on main branch push.
- Build command: `pnpm install --frozen-lockfile && pnpm --filter web build`
- Start command: `pnpm --filter web start`
- Persistent volume for `apps/web/.next/cache` to preserve ISR cache across deploys.
- Health check: `GET /api/health` (add this route).
- Postgres: run the Postgres-PostGIS container as a separate Coolify service, with persistent volume. Or use Neon and point `DATABASE_URL` at it.
- Meilisearch: run on your headless Linux box, expose over Tailscale or Wireguard to Hetzner. Don't expose to public internet.

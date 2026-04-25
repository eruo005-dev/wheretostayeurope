# bootstrap.ps1 — turns the flat artifact dump into a deployable Next.js + Payload app.
#
# Run from the project root in PowerShell:
#   cd "C:\Users\eruo0\Documents\Claude\Projects\wheretostayeurope"
#   .\bootstrap.ps1
#
# Idempotent — safe to re-run. Logs every action.
# Stops on first error so you can fix and resume.

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = $PSScriptRoot
if (-not $Root) { $Root = (Get-Location).Path }
$Web  = Join-Path $Root "apps\web"
$Src  = Join-Path $Web  "src"

function Step($msg) { Write-Host "`n=> $msg" -ForegroundColor Cyan }
function Note($msg) { Write-Host "   $msg" -ForegroundColor DarkGray }
function Ok($msg)   { Write-Host "   OK $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "   ! $msg"  -ForegroundColor Yellow }
function Die($msg)  { Write-Host "   X $msg" -ForegroundColor Red; exit 1 }

# ---------- 1. Prerequisites ----------
Step "Checking prerequisites"

try { $node = (& node --version) } catch { Die "Node.js not found. Install from https://nodejs.org (v20+)." }
$nodeVer = [int]($node -replace '^v(\d+)\..*','$1')
if ($nodeVer -lt 20) { Die "Node $node found; need v20 or higher." }
Ok "Node $node"

try { $pnpm = (& pnpm --version) } catch {
  Warn "pnpm not found — installing via Corepack"
  & corepack enable
  & corepack prepare pnpm@latest --activate
  $pnpm = (& pnpm --version)
}
Ok "pnpm $pnpm"

if (-not (Test-Path (Join-Path $Root ".git"))) { Die "Not a git repo. Run from $Root." }
Ok "git repo present"

# ---------- 2. Create apps/web scaffold ----------
Step "Scaffolding apps/web (Next.js + Payload v3)"

if (-not (Test-Path $Web)) {
  New-Item -ItemType Directory -Path $Web -Force | Out-Null
}

# Workspace root package.json
$wsPkg = Join-Path $Root "package.json"
if (-not (Test-Path $wsPkg)) {
  @'
{
  "name": "wheretostayeurope",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "dev":   "pnpm --filter web dev",
    "build": "pnpm --filter web build",
    "start": "pnpm --filter web start",
    "migrate": "pnpm --filter web migrate",
    "generate:types": "pnpm --filter web generate:types"
  }
}
'@ | Out-File -FilePath $wsPkg -Encoding utf8 -NoNewline
  Ok "wrote workspace package.json"
}

$wsYaml = Join-Path $Root "pnpm-workspace.yaml"
if (-not (Test-Path $wsYaml)) {
  @"
packages:
  - 'apps/*'
  - 'packages/*'
"@ | Out-File -FilePath $wsYaml -Encoding utf8 -NoNewline
  Ok "wrote pnpm-workspace.yaml"
}

# apps/web/package.json
$webPkg = Join-Path $Web "package.json"
if (-not (Test-Path $webPkg)) {
  @'
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev":   "next dev --turbopack",
    "build": "next build",
    "start": "next start -p 3000",
    "generate:types": "payload generate:types",
    "migrate": "node --no-warnings ./scripts/run-sql-migrations.mjs"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "payload": "^3.0.0",
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    "@payloadcms/next": "^3.0.0",
    "graphql": "^16.9.0",
    "pg": "^8.13.0",
    "mapbox-gl": "^3.7.0",
    "recharts": "^2.13.0",
    "sharp": "^0.33.5",
    "klaro": "^0.7.21",
    "server-only": "^0.0.1"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/pg": "^8.11.0",
    "@types/mapbox-gl": "^3.4.0",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0"
  }
}
'@ | Out-File -FilePath $webPkg -Encoding utf8 -NoNewline
  Ok "wrote apps/web/package.json"
}

# apps/web/tsconfig.json
$tsCfg = Join-Path $Web "tsconfig.json"
if (-not (Test-Path $tsCfg)) {
  @'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@ | Out-File -FilePath $tsCfg -Encoding utf8 -NoNewline
  Ok "wrote apps/web/tsconfig.json"
}

# apps/web/next.config.ts
$nextCfg = Join-Path $Web "next.config.ts"
if (-not (Test-Path $nextCfg)) {
  @'
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
      { protocol: "https", hostname: "cf.bstatic.com" },
      { protocol: "https", hostname: "r2.wheretostayeurope.com" },
    ],
  },
  experimental: { reactCompiler: false },
};

export default withPayload(nextConfig);
'@ | Out-File -FilePath $nextCfg -Encoding utf8 -NoNewline
  Ok "wrote apps/web/next.config.ts"
}

# apps/web/src/payload.config.ts
$plCfg = Join-Path $Src "payload.config.ts"
New-Item -ItemType Directory -Path $Src -Force | Out-Null
if (-not (Test-Path $plCfg)) {
  @'
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Countries } from "./collections/Countries";
import { Cities } from "./collections/Cities";
import { Neighborhoods } from "./collections/Neighborhoods";
import { Pages } from "./collections/Pages";
import { Keywords } from "./collections/Keywords";
import { Media } from "./collections/Media";
import { AuthorProfile } from "./globals/AuthorProfile";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: { meta: { titleSuffix: "— WhereToStayEurope CMS" } },
  collections: [Countries, Cities, Neighborhoods, Pages, Keywords, Media],
  globals: [AuthorProfile],
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  localization: {
    locales: [
      { label: "English",  code: "en" },
      { label: "Deutsch",  code: "de" },
      { label: "Français", code: "fr" },
      { label: "Español",  code: "es" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET ?? "change-me-in-production",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
'@ | Out-File -FilePath $plCfg -Encoding utf8 -NoNewline
  Ok "wrote src/payload.config.ts"
}

# apps/web/.env.example
$envEx = Join-Path $Web ".env.example"
if (-not (Test-Path $envEx)) {
  @'
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=https://wheretostayeurope.com
SITE_URL=https://wheretostayeurope.com
LEGAL_ENTITY_NAME=
DATABASE_URL=
PAYLOAD_SECRET=
REVALIDATE_SECRET=
NEXT_PUBLIC_MAPBOX_TOKEN=
DEEPL_API_KEY=
UNSPLASH_ACCESS_KEY=
PEXELS_API_KEY=
PIXABAY_API_KEY=
TURNSTILE_SECRET_KEY=
KIT_API_KEY=
KIT_FORM_ID_EN=
BOOKING_AFFILIATE_AID=
GSC_VERIFICATION_TOKEN=
'@ | Out-File -FilePath $envEx -Encoding utf8 -NoNewline
  Ok "wrote apps/web/.env.example"
}

# ---------- 3. Move shipped files to target paths ----------
Step "Moving shipped artifacts into Next.js structure"

# Define directory structure
$dirs = @(
  "src\app\(frontend)\[locale]",
  "src\app\(frontend)\[locale]\[country]",
  "src\app\(frontend)\[locale]\[country]\[city]",
  "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]",
  "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\hotels-for-[tripType]",
  "src\app\(frontend)\[locale]\about",
  "src\app\api\revalidate",
  "src\app\api\newsletter",
  "src\collections",
  "src\globals",
  "src\components\layout",
  "src\components\maps",
  "src\components\visualizations",
  "src\components\affiliate",
  "src\components\content",
  "src\components\legal",
  "src\lib",
  "src\lib\seo",
  "src\lib\affiliate",
  "scripts",
  "migrations"
)
foreach ($d in $dirs) {
  $full = Join-Path $Web $d
  if (-not (Test-Path $full)) { New-Item -ItemType Directory -Path $full -Force | Out-Null }
}
Ok "directory tree created"

# Mapping: flat-file-name -> target path under apps/web
$moves = @{
  # Collections + Globals
  "Countries.ts"                = "src\collections\Countries.ts"
  "Cities.ts"                   = "src\collections\Cities.ts"
  "Neighborhoods.ts"            = "src\collections\Neighborhoods.ts"
  "Pages.ts"                    = "src\collections\Pages.ts"
  "Keywords.ts"                 = "src\collections\Keywords.ts"
  "Media.ts"                    = "src\collections\Media.ts"
  "AuthorProfile.ts"            = "src\globals\AuthorProfile.ts"

  # Routes — v2 wins
  "home-page-v2.tsx"            = "src\app\(frontend)\[locale]\page.tsx"
  "home-queries.ts"             = "src\app\(frontend)\[locale]\queries.ts"
  "country-page.tsx"            = "src\app\(frontend)\[locale]\[country]\page.tsx"
  "country-queries.ts"          = "src\app\(frontend)\[locale]\[country]\queries.ts"
  "city-page.tsx"               = "src\app\(frontend)\[locale]\[country]\[city]\page.tsx"
  "city-queries.ts"             = "src\app\(frontend)\[locale]\[country]\[city]\queries.ts"
  "neighborhood-page.tsx"       = "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\page.tsx"
  "neighborhood-queries.ts"     = "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\queries.ts"
  "neighborhood-loading.tsx"    = "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\loading.tsx"
  "neighborhood-not-found.tsx"  = "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\not-found.tsx"
  "tier3-page.tsx"              = "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\hotels-for-[tripType]\page.tsx"
  "tier3-queries.ts"            = "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\hotels-for-[tripType]\queries.ts"
  "about-page.tsx"              = "src\app\(frontend)\[locale]\about\page.tsx"

  # Layouts — v2 wins
  "app-layout-v2.tsx"           = "src\app\layout.tsx"
  "locale-layout-v2.tsx"        = "src\app\(frontend)\[locale]\layout.tsx"

  # Layout chrome
  "Header.tsx"                  = "src\components\layout\Header.tsx"
  "Footer.tsx"                  = "src\components\layout\Footer.tsx"
  "LocaleSwitcher.tsx"          = "src\components\layout\LocaleSwitcher.tsx"
  "globals.css"                 = "src\app\globals.css"

  # Lib
  "db.ts"                       = "src\lib\db.ts"
  "consent.ts"                  = "src\lib\consent.ts"
  "hreflang.ts"                 = "src\lib\seo\hreflang.ts"
  "seo-config.ts"               = "src\lib\seo\config.ts"
  "article-schema.ts"           = "src\lib\seo\article-schema.ts"
  "author-queries.ts"           = "src\lib\author.ts"
  "booking.ts"                  = "src\lib\affiliate\booking.ts"
  "klaro-config.ts"             = "src\lib\klaro-config.ts"

  # Components
  "NeighborhoodMap.tsx"         = "src\components\maps\NeighborhoodMap.tsx"
  "PriceBandHistogram.tsx"      = "src\components\visualizations\PriceBandHistogram.tsx"
  "PropertyCard.tsx"            = "src\components\affiliate\PropertyCard.tsx"
  "LexicalRenderer.tsx"         = "src\components\content\LexicalRenderer.tsx"
  "Byline.tsx"                  = "src\components\content\Byline.tsx"
  "AffiliateDisclosure.tsx"     = "src\components\legal\AffiliateDisclosure.tsx"
  "PriceDisclaimer.tsx"         = "src\components\legal\PriceDisclaimer.tsx"
  "InsuranceDisclaimer.tsx"     = "src\components\legal\InsuranceDisclaimer.tsx"
  "VisaDisclaimer.tsx"          = "src\components\legal\VisaDisclaimer.tsx"
  "ConsentProvider.tsx"         = "src\components\legal\ConsentProvider.tsx"

  # API routes + middleware — Kit version wins
  "revalidate-route.ts"         = "src\app\api\revalidate\route.ts"
  "newsletter-route-kit.ts"     = "src\app\api\newsletter\route.ts"
  "middleware.ts"               = "src\middleware.ts"

  # Scripts + migrations
  "seed-phase1-countries.ts"    = "scripts\seed-phase1-countries.ts"
  "db-migrations.sql"           = "migrations\001_extensions_and_seed.sql"
  "007_postgis_after_payload.sql" = "migrations\007_postgis_after_payload.sql"
}

$moved = 0; $skipped = 0; $missing = 0
foreach ($src in $moves.Keys) {
  $srcPath = Join-Path $Root $src
  $dstPath = Join-Path $Web $moves[$src]
  if (-not (Test-Path $srcPath)) {
    Warn "missing: $src"
    $missing += 1
    continue
  }
  if (Test-Path $dstPath) {
    Note "skipped (exists): $($moves[$src])"
    $skipped += 1
    continue
  }
  $dstDir = Split-Path -Parent $dstPath
  if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
  Move-Item -Path $srcPath -Destination $dstPath
  $moved += 1
}
Ok "moved: $moved | skipped: $skipped | missing: $missing"

# ---------- 4. Quarantine deprecated v1 files ----------
Step "Archiving deprecated v1 / superseded files"

$archive = Join-Path $Root "_archive"
New-Item -ItemType Directory -Path $archive -Force | Out-Null

$deprecated = @(
  "home-page.tsx",
  "app-layout.tsx",
  "locale-layout.tsx",
  "newsletter-route.ts",
  "legal-compliance-pack.md",
  "deployment-runbook.md"
)
foreach ($f in $deprecated) {
  $p = Join-Path $Root $f
  if (Test-Path $p) {
    Move-Item -Path $p -Destination (Join-Path $archive $f) -Force
    Note "archived: $f"
  }
}

# ---------- 5. Move docs + workflow JSON ----------
Step "Organizing docs + infra files"

$docs = Join-Path $Root "docs"
$infra = Join-Path $Root "infra\n8n"
New-Item -ItemType Directory -Path $docs -Force | Out-Null
New-Item -ItemType Directory -Path $infra -Force | Out-Null

# n8n workflow JSON
$wf = Join-Path $Root "n8n-booking-sync-workflow.json"
if (Test-Path $wf) {
  Move-Item -Path $wf -Destination (Join-Path $infra "booking-sync.json") -Force
  Note "moved n8n workflow → infra/n8n/"
}

# Doc-style markdown files → docs/
$mdMoves = @(
  "compliance-checklist.md", "compliance-natural-person.md",
  "competitive-tech-audit.md", "deployment-runbook-vercel.md",
  "deploy-session-prompt.md", "klaro-integration.md",
  "article-page-patches.md", "n8n-booking-ingest.md",
  "tier3-page-templates.md", "repo-scaffold.md",
  "wheretostayeurope-v0-plan.md"
)
foreach ($f in $mdMoves) {
  $p = Join-Path $Root $f
  if (Test-Path $p) {
    Move-Item -Path $p -Destination (Join-Path $docs $f) -Force
    Note "moved $f → docs/"
  }
}

# Editorial drafts + briefs → docs/editorial/
$ed = Join-Path $docs "editorial"
New-Item -ItemType Directory -Path $ed -Force | Out-Null
$edFiles = @(
  "paris-pillar-brief.md", "paris-pillar-full-draft.md",
  "porto-pillar-full-draft.md", "valencia-pillar-full-draft.md",
  "istanbul-pillar-full-draft.md", "cappadocia-pillar-full-draft.md",
  "city-cluster-briefs.md", "city-briefs-batch-2.md"
)
foreach ($f in $edFiles) {
  $p = Join-Path $Root $f
  if (Test-Path $p) {
    Move-Item -Path $p -Destination (Join-Path $ed $f) -Force
  }
}

# Legal templates → docs/legal/
$le = Join-Path $docs "legal"
New-Item -ItemType Directory -Path $le -Force | Out-Null
$legalFiles = @(
  "legal-privacy-policy.md", "legal-terms-of-use.md",
  "legal-affiliate-disclosure.md", "legal-cookie-policy.md",
  "legal-impressum.md", "legal-gdpr-article-30-record.md"
)
foreach ($f in $legalFiles) {
  $p = Join-Path $Root $f
  if (Test-Path $p) {
    Move-Item -Path $p -Destination (Join-Path $le $f) -Force
  }
}
Ok "docs organized"

# ---------- 6. .gitignore ----------
$gi = Join-Path $Root ".gitignore"
if (-not (Test-Path $gi) -or -not (Get-Content $gi -Raw -ErrorAction SilentlyContinue) -match "node_modules") {
  @'
# Dependencies
node_modules/
.pnpm-store/

# Next.js
.next/
out/
.turbo/

# Production
build/
dist/

# Env
.env
.env.local
.env.*.local
*.env

# Editor
.vscode/
.idea/
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Payload
src/payload-types.ts

# Archive
_archive/
'@ | Out-File -FilePath $gi -Encoding utf8 -NoNewline
  Ok "wrote .gitignore"
}

# ---------- 7. Install + build ----------
Step "Running pnpm install"
Push-Location $Root
& pnpm install
Pop-Location

if ($LASTEXITCODE -ne 0) { Die "pnpm install failed — fix above errors and re-run." }
Ok "dependencies installed"

Step "Generating Payload types"
Push-Location $Web
& pnpm generate:types
Pop-Location
if ($LASTEXITCODE -ne 0) { Warn "generate:types failed (DATABASE_URL may not be set yet — fine, we'll regen later)" }

Step "Running first build (env vars optional but DATABASE_URL needed for full build)"
Push-Location $Web
& pnpm build
$buildCode = $LASTEXITCODE
Pop-Location

if ($buildCode -ne 0) {
  Warn "Build failed. Most common cause: DATABASE_URL not set, or env vars missing."
  Warn "Set up your .env.local under apps/web with values from your Neon/Vercel/Cloudflare accounts,"
  Warn "then re-run: cd apps/web; pnpm build"
} else {
  Ok "build succeeded"
}

Write-Host "`nBootstrap complete." -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. cd apps/web; cp .env.example .env.local; fill in DATABASE_URL + secrets"
Write-Host "  2. git add -A; git commit -m 'Bootstrap Next.js + Payload scaffold'; git push"
Write-Host "  3. Vercel dashboard -> Import GitHub repo -> Root Directory: apps/web"
Write-Host "  4. Paste env vars into Vercel project settings"
Write-Host "  5. Deploy"

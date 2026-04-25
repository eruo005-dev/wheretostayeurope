# bootstrap-v3.ps1 - fixes parser errors in v2 (variable terminator + non-ASCII).
# ASCII-only, ${var} syntax everywhere a colon follows a variable.
#
#   cd "C:\Users\eruo0\Documents\Claude\Projects\wheretostayeurope"
#   .\bootstrap-v3.ps1

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = (Get-Location).Path
$Web  = Join-Path $Root "apps\web"
$Src  = Join-Path $Web  "src"

function Step($m) { Write-Host "`n=> $m" -ForegroundColor Cyan }
function Ok($m)   { Write-Host "   OK $m" -ForegroundColor Green }
function Note($m) { Write-Host "   $m" -ForegroundColor DarkGray }
function Warn($m) { Write-Host "   ! $m" -ForegroundColor Yellow }
function Die($m)  { Write-Host "   X $m" -ForegroundColor Red; exit 1 }

function Ensure-Dir($path) {
  [void][System.IO.Directory]::CreateDirectory($path)
}

# --- Prereqs ---
Step "Checking prerequisites"
try { $node = & node --version } catch { Die "Node.js not found. Install from https://nodejs.org (v20+)." }
$nodeMajor = [int]($node -replace '^v(\d+)\..*','$1')
if ($nodeMajor -lt 20) { Die "Need Node v20+. Found $node." }
Ok "Node $node"

try { $pnpm = & pnpm --version } catch {
  Warn "pnpm missing. Installing via Corepack..."
  & corepack enable
  & corepack prepare pnpm@latest --activate
  $pnpm = & pnpm --version
}
Ok "pnpm $pnpm"

if (-not (Test-Path -LiteralPath (Join-Path $Root ".git"))) { Die "Not a git repo. cd to $Root first." }
Ok "git repo present"

# --- Workspace + apps/web scaffold ---
Step "Creating Next.js + Payload scaffold under apps/web"

Ensure-Dir $Web
Ensure-Dir $Src

$wsPkg = Join-Path $Root "package.json"
if (-not [System.IO.File]::Exists($wsPkg)) {
  [System.IO.File]::WriteAllText($wsPkg, @'
{
  "name": "wheretostayeurope",
  "private": true,
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "dev":   "pnpm --filter web dev",
    "build": "pnpm --filter web build",
    "start": "pnpm --filter web start",
    "generate:types": "pnpm --filter web generate:types"
  }
}
'@)
  Ok "wrote workspace package.json"
}

$wsYaml = Join-Path $Root "pnpm-workspace.yaml"
if (-not [System.IO.File]::Exists($wsYaml)) {
  [System.IO.File]::WriteAllText($wsYaml, "packages:`n  - 'apps/*'`n  - 'packages/*'`n")
  Ok "wrote pnpm-workspace.yaml"
}

$webPkg = Join-Path $Web "package.json"
if (-not [System.IO.File]::Exists($webPkg)) {
  [System.IO.File]::WriteAllText($webPkg, @'
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start -p 3000",
    "generate:types": "payload generate:types"
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
'@)
  Ok "wrote apps/web/package.json"
}

$tsCfg = Join-Path $Web "tsconfig.json"
if (-not [System.IO.File]::Exists($tsCfg)) {
  [System.IO.File]::WriteAllText($tsCfg, @'
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
'@)
  Ok "wrote tsconfig.json"
}

$nextCfg = Join-Path $Web "next.config.ts"
if (-not [System.IO.File]::Exists($nextCfg)) {
  [System.IO.File]::WriteAllText($nextCfg, @'
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
      { protocol: "https", hostname: "r2.wheretostayeurope.com" }
    ]
  }
};

export default withPayload(nextConfig);
'@)
  Ok "wrote next.config.ts"
}

$plCfg = Join-Path $Src "payload.config.ts"
if (-not [System.IO.File]::Exists($plCfg)) {
  [System.IO.File]::WriteAllText($plCfg, @'
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
  admin: { meta: { titleSuffix: " - WhereToStayEurope CMS" } },
  collections: [Countries, Cities, Neighborhoods, Pages, Keywords, Media],
  globals: [AuthorProfile],
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Deutsch", code: "de" },
      { label: "Francais", code: "fr" },
      { label: "Espanol", code: "es" }
    ],
    defaultLocale: "en",
    fallback: true
  },
  secret: process.env.PAYLOAD_SECRET ?? "change-me",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") }
});
'@)
  Ok "wrote src/payload.config.ts"
}

$envEx = Join-Path $Web ".env.example"
if (-not [System.IO.File]::Exists($envEx)) {
  [System.IO.File]::WriteAllText($envEx, @'
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
TURNSTILE_SECRET_KEY=
KIT_API_KEY=
KIT_FORM_ID_EN=
BOOKING_AFFILIATE_AID=
GSC_VERIFICATION_TOKEN=
'@)
  Ok "wrote .env.example"
}

# --- Directory tree ---
Step "Creating directory tree"
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
foreach ($d in $dirs) { Ensure-Dir (Join-Path $Web $d) }
Ok "directory tree created"

# --- File moves (.NET methods, bracket-safe) ---
Step "Moving shipped files into Next.js structure"

$moves = @{
  "Countries.ts"                = "src\collections\Countries.ts"
  "Cities.ts"                   = "src\collections\Cities.ts"
  "Neighborhoods.ts"            = "src\collections\Neighborhoods.ts"
  "Pages.ts"                    = "src\collections\Pages.ts"
  "Keywords.ts"                 = "src\collections\Keywords.ts"
  "Media.ts"                    = "src\collections\Media.ts"
  "AuthorProfile.ts"            = "src\globals\AuthorProfile.ts"

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

  "app-layout-v2.tsx"           = "src\app\layout.tsx"
  "locale-layout-v2.tsx"        = "src\app\(frontend)\[locale]\layout.tsx"

  "Header.tsx"                  = "src\components\layout\Header.tsx"
  "Footer.tsx"                  = "src\components\layout\Footer.tsx"
  "LocaleSwitcher.tsx"          = "src\components\layout\LocaleSwitcher.tsx"
  "globals.css"                 = "src\app\globals.css"

  "db.ts"                       = "src\lib\db.ts"
  "consent.ts"                  = "src\lib\consent.ts"
  "hreflang.ts"                 = "src\lib\seo\hreflang.ts"
  "seo-config.ts"               = "src\lib\seo\config.ts"
  "article-schema.ts"           = "src\lib\seo\article-schema.ts"
  "author-queries.ts"           = "src\lib\author.ts"
  "booking.ts"                  = "src\lib\affiliate\booking.ts"
  "klaro-config.ts"             = "src\lib\klaro-config.ts"

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

  "revalidate-route.ts"         = "src\app\api\revalidate\route.ts"
  "newsletter-route-kit.ts"     = "src\app\api\newsletter\route.ts"
  "middleware.ts"               = "src\middleware.ts"

  "seed-phase1-countries.ts"    = "scripts\seed-phase1-countries.ts"
  "db-migrations.sql"           = "migrations\001_extensions_and_seed.sql"
  "007_postgis_after_payload.sql" = "migrations\007_postgis_after_payload.sql"
}

$moved = 0; $skipped = 0; $missing = 0
foreach ($srcName in $moves.Keys) {
  $srcPath = Join-Path $Root $srcName
  $dstPath = Join-Path $Web $moves[$srcName]
  if (-not [System.IO.File]::Exists($srcPath)) {
    Warn "missing source: $srcName"
    $missing++
    continue
  }
  if ([System.IO.File]::Exists($dstPath)) {
    Note "exists: $($moves[$srcName])"
    $skipped++
    continue
  }
  $dstDir = [System.IO.Path]::GetDirectoryName($dstPath)
  Ensure-Dir $dstDir
  try {
    [System.IO.File]::Move($srcPath, $dstPath)
    $moved++
  } catch {
    $msg = $_.Exception.Message
    Warn "failed to move ${srcName}: ${msg}"
  }
}
Ok "moved: $moved | skipped: $skipped | missing: $missing"

$criticalChecks = @(
  "src\app\(frontend)\[locale]\page.tsx",
  "src\app\(frontend)\[locale]\[country]\page.tsx",
  "src\app\(frontend)\[locale]\[country]\[city]\[neighborhood]\page.tsx",
  "src\middleware.ts",
  "src\collections\Countries.ts",
  "src\app\layout.tsx"
)
$failed = @()
foreach ($c in $criticalChecks) {
  $full = Join-Path $Web $c
  if (-not [System.IO.File]::Exists($full)) { $failed += $c }
}
if ($failed.Count -gt 0) {
  Warn "Critical files missing AFTER move:"
  foreach ($f in $failed) { Warn "  $f" }
  Die "Aborting. Source files not found in flat folder."
}
Ok "all critical files present"

# --- Archive deprecated v1 files ---
Step "Archiving deprecated v1 files"
$archive = Join-Path $Root "_archive"
Ensure-Dir $archive
$deprecated = @("home-page.tsx", "app-layout.tsx", "locale-layout.tsx", "newsletter-route.ts", "legal-compliance-pack.md", "deployment-runbook.md", "bootstrap.ps1", "bootstrap-v2.ps1")
foreach ($f in $deprecated) {
  $src = Join-Path $Root $f
  if ([System.IO.File]::Exists($src)) {
    $dst = Join-Path $archive $f
    if ([System.IO.File]::Exists($dst)) { [System.IO.File]::Delete($dst) }
    [System.IO.File]::Move($src, $dst)
    Note "archived: $f"
  }
}

# --- Move docs ---
Step "Organizing docs and infra"
$docs = Join-Path $Root "docs"
$infra = Join-Path $Root "infra\n8n"
$ed = Join-Path $docs "editorial"
$le = Join-Path $docs "legal"
foreach ($p in @($docs, $infra, $ed, $le)) { Ensure-Dir $p }

$wf = Join-Path $Root "n8n-booking-sync-workflow.json"
if ([System.IO.File]::Exists($wf)) {
  [System.IO.File]::Move($wf, (Join-Path $infra "booking-sync.json"))
}

$mdMoves = @(
  "compliance-checklist.md", "compliance-natural-person.md",
  "competitive-tech-audit.md", "deployment-runbook-vercel.md",
  "deploy-session-prompt.md", "klaro-integration.md",
  "article-page-patches.md", "n8n-booking-ingest.md",
  "tier3-page-templates.md", "repo-scaffold.md",
  "wheretostayeurope-v0-plan.md"
)
foreach ($f in $mdMoves) {
  $src = Join-Path $Root $f
  $dst = Join-Path $docs $f
  if ([System.IO.File]::Exists($src) -and -not [System.IO.File]::Exists($dst)) {
    [System.IO.File]::Move($src, $dst)
  }
}

$edFiles = @(
  "paris-pillar-brief.md", "paris-pillar-full-draft.md",
  "porto-pillar-full-draft.md", "valencia-pillar-full-draft.md",
  "istanbul-pillar-full-draft.md", "cappadocia-pillar-full-draft.md",
  "city-cluster-briefs.md", "city-briefs-batch-2.md"
)
foreach ($f in $edFiles) {
  $src = Join-Path $Root $f
  $dst = Join-Path $ed $f
  if ([System.IO.File]::Exists($src) -and -not [System.IO.File]::Exists($dst)) {
    [System.IO.File]::Move($src, $dst)
  }
}

$legalFiles = @(
  "legal-privacy-policy.md", "legal-terms-of-use.md",
  "legal-affiliate-disclosure.md", "legal-cookie-policy.md",
  "legal-impressum.md", "legal-gdpr-article-30-record.md"
)
foreach ($f in $legalFiles) {
  $src = Join-Path $Root $f
  $dst = Join-Path $le $f
  if ([System.IO.File]::Exists($src) -and -not [System.IO.File]::Exists($dst)) {
    [System.IO.File]::Move($src, $dst)
  }
}
Ok "docs organized"

# --- .gitignore ---
$gi = Join-Path $Root ".gitignore"
[System.IO.File]::WriteAllText($gi, @'
node_modules/
.pnpm-store/
.next/
out/
.turbo/
build/
dist/
.env
.env.local
.env.*.local
*.env
.vscode/
.idea/
.DS_Store
Thumbs.db
*.log
npm-debug.log*
pnpm-debug.log*
src/payload-types.ts
_archive/
'@)
Ok "wrote .gitignore"

# --- pnpm install ---
Step "Running pnpm install (2-4 min)"
Push-Location -LiteralPath $Root
& pnpm install
$instCode = $LASTEXITCODE
Pop-Location
if ($instCode -ne 0) { Die "pnpm install failed - fix above errors and re-run" }
Ok "dependencies installed"

# --- Verify ---
Step "Verifying critical paths"
$verify = @(
  "package.json",
  "pnpm-workspace.yaml",
  "apps\web\package.json",
  "apps\web\tsconfig.json",
  "apps\web\next.config.ts",
  "apps\web\src\payload.config.ts",
  "apps\web\src\middleware.ts",
  "apps\web\src\collections\Countries.ts",
  "apps\web\src\app\(frontend)\[locale]\page.tsx",
  "apps\web\src\app\(frontend)\[locale]\layout.tsx",
  "apps\web\src\app\layout.tsx"
)
$ok = $true
foreach ($v in $verify) {
  $full = Join-Path $Root $v
  if ([System.IO.File]::Exists($full)) {
    Note "[OK] $v"
  } else {
    Warn "[MISSING] $v"
    $ok = $false
  }
}
if (-not $ok) { Die "Verification failed." }

Write-Host "`n==== Bootstrap-v3 complete ====" -ForegroundColor Green
Write-Host "`nNext:" -ForegroundColor Cyan
Write-Host "  1. git add -A"
Write-Host '  2. git commit -m "Bootstrap v3 - Next.js + Payload scaffold under apps/web"'
Write-Host "  3. git push"
Write-Host "  4. Vercel auto-deploys on push (Root Directory already set to apps/web)"

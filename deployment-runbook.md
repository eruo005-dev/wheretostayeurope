# Deployment Runbook — WhereToStayEurope v0 → Live

From "empty Hetzner box + bought domain" to "indexed pages serving." Work top to bottom, tick each box as you go. Commands assume Ubuntu 22.04 LTS on the VPS and macOS/Linux on your laptop.

Total realistic time: **4–6 hours** of active work spread across two sessions. Split A (infra) and B (content) in different sittings — the DNS propagation wait between makes that natural.

---

## Phase A — Accounts and pre-requisites (do before touching the VPS)

- [ ] **Hetzner Cloud account** — https://console.hetzner.cloud. €20 billing deposit, pay-as-you-go.
- [ ] **Cloudflare account** (free plan) — https://dash.cloudflare.com
- [ ] **Domain already owned:** `wheretostayeurope.com` — verify current registrar and note it.
- [ ] **GitHub repo created** — private, name `wheretostayeurope` or similar. Empty for now.
- [ ] **Mapbox account** — https://account.mapbox.com — grab your default public token.
- [ ] **DeepL API** — https://www.deepl.com/pro-api — free tier enough for Phase 1.
- [ ] **Unsplash developer app** — https://unsplash.com/oauth/applications/new. Submit for production (takes 3–7 days to get past 50 req/hr dev-tier).
- [ ] **Cloudflare Turnstile site** — https://dash.cloudflare.com/?to=/:account/turnstile. Create a site for `wheretostayeurope.com`, note **site key** and **secret key**.
- [ ] **SSH keypair on your laptop** — `ssh-keygen -t ed25519 -C "wts-hetzner"` if you don't already have one. Copy the `.pub` contents; you'll paste it into Hetzner.
- [ ] **REVALIDATE_SECRET value** — generate: `openssl rand -hex 32`. Save it, you'll need it in three places (Next.js env, n8n env, your notes).
- [ ] **PAYLOAD_SECRET value** — generate: `openssl rand -hex 32`. Save.

---

## Phase B — Provision the Hetzner VPS

1. Log into Hetzner Cloud → "+ New Project" → name it `wheretostayeurope`.
2. Inside the project: "Servers" → "+ Add Server":
   - Location: **Falkenstein (FSN1)** or **Nuremberg (NBG1)** — either is fine; Falkenstein is typically €1–2/mo cheaper.
   - Image: **Ubuntu 22.04**
   - Type: **CPX41** (4 vCPU, 16 GB RAM) — ~€25/mo. You can start smaller with CPX31 (~€14/mo) if you want to save and upgrade later.
   - SSH key: paste your `.pub` contents now.
   - Backups: **enable** (adds ~20% to cost, absolutely worth it).
   - Name: `wts-prod-1`
3. Click create. ~30 seconds to provision. Note the public IPv4.
4. From your laptop: `ssh root@<IPv4>` — you should land in the VPS.

### One-time VPS hardening (30 minutes)

```bash
# Create a non-root user
adduser jay
usermod -aG sudo jay
mkdir -p /home/jay/.ssh
cp /root/.ssh/authorized_keys /home/jay/.ssh/
chown -R jay:jay /home/jay/.ssh
chmod 700 /home/jay/.ssh
chmod 600 /home/jay/.ssh/authorized_keys

# Harden SSH — disable root login + password auth
sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

# Basic firewall — only SSH, HTTP, HTTPS open
apt update && apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Set hostname + timezone
hostnamectl set-hostname wts-prod-1
timedatectl set-timezone Europe/Berlin

# Enable automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

Log out, reconnect as `jay`: `ssh jay@<IPv4>`.

---

## Phase C — Install Coolify

```bash
# Install Docker + Coolify in one step
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Takes 2–5 minutes. When done, Coolify prints a URL like `http://<IPv4>:8000`.

- [ ] Open `http://<IPv4>:8000` in your browser.
- [ ] Create admin account on first visit.
- [ ] Set an instance name, timezone, default domain (leave empty for now).

---

## Phase D — Postgres + supporting services via Coolify

You can either run Postgres on the same Hetzner box via Coolify's one-click database, or use **Neon** free tier and point at it. Neon is less ops for Phase 1; self-hosted is free and keeps data in one place. Pick one.

### Option 1 — Neon (recommended for launch simplicity)
- [ ] Sign up https://neon.tech, create project `wheretostayeurope`.
- [ ] Enable PostGIS: in Neon SQL editor, `CREATE EXTENSION IF NOT EXISTS postgis;`
- [ ] Copy the connection string (will look like `postgresql://user:pwd@ep-xxx.neon.tech/wheretostay?sslmode=require`).
- [ ] Save as `DATABASE_URL` in your notes.

### Option 2 — Self-hosted via Coolify
- [ ] In Coolify: "+ New Resource" → Databases → Postgres 16.
- [ ] Name: `wts-postgres`. Version 16. Extensions: PostGIS (add via custom init SQL).
- [ ] Deploy. Copy internal connection URL.
- [ ] Custom init SQL in the resource config:
  ```sql
  CREATE EXTENSION IF NOT EXISTS postgis;
  CREATE EXTENSION IF NOT EXISTS pgcrypto;
  CREATE EXTENSION IF NOT EXISTS citext;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS pg_trgm;
  ```

### Also in Coolify

- [ ] **Meilisearch** (optional, defer to later — you won't need search until you have content)
- [ ] **Listmonk** — "+ New Resource" → Applications → Docker Compose → paste Listmonk's reference compose file. Set an admin user/pass. Note the internal URL.
- [ ] **n8n** — same pattern, one-click from Coolify templates. Point at your Postgres. Note admin credentials.

---

## Phase E — Cloudflare DNS

1. Log into Cloudflare → Add site → `wheretostayeurope.com` → Free plan.
2. Note the two Cloudflare nameservers (e.g. `lana.ns.cloudflare.com`, `walt.ns.cloudflare.com`).
3. Go to your current registrar and change nameservers to Cloudflare's. Propagation: 1–24 hours, usually under 2.
4. Inside Cloudflare DNS for the domain, add:
   - `A @ <Hetzner IPv4>` (proxied — orange cloud on)
   - `A www <Hetzner IPv4>` (proxied)
   - `A coolify <Hetzner IPv4>` (DNS only — grey cloud; Coolify admin)
   - `A n8n <Hetzner IPv4>` (DNS only — grey cloud; n8n admin)
   - `A listmonk <Hetzner IPv4>` (DNS only)
5. Cloudflare SSL/TLS → **Full (strict)**.
6. Cloudflare Rules → Page Rules → Always Use HTTPS.

---

## Phase F — Repo bootstrap (on your laptop, not the VPS)

Follow the exact sequence in `repo-scaffold.md` § "Bootstrap commands":

```bash
# Clone empty GitHub repo
git clone git@github.com:<you>/wheretostayeurope.git
cd wheretostayeurope

# Scaffold
pnpm init
mkdir -p apps/web packages/ingest infra/{coolify,nginx,meilisearch,listmonk}
echo 'packages:\n  - "apps/*"\n  - "packages/*"' > pnpm-workspace.yaml

# Payload + Next scaffold
cd apps/web
pnpm create payload-app@latest . --db postgres --template blank

# Replace the generated files with the shipped versions:
#   src/payload.config.ts    ← replace contents from repo-scaffold.md
#   next.config.ts           ← replace contents
#   package.json             ← merge shipped dependencies
#   .env.example             ← use shipped version

# Drop in the shipped collections / lib / components / app files
mkdir -p src/{collections,globals,components/{maps,visualizations,affiliate,legal,layout,content},lib/{affiliate,seo,images,translation,search}}
mkdir -p src/app/{api/revalidate,api/newsletter}
mkdir -p "src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]"
mkdir -p "src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/hotels-for-[tripType]"
mkdir migrations

# Copy each shipped file to its target path per the 'Path mappings' in plan doc
# (cp Countries.ts src/collections/Countries.ts, etc.)
```

Copy each artifact into place using the **Path mappings** summary that's listed in every session's response. Check the top of each file — I added a path comment to every one.

```bash
# Install + first build
pnpm install
cp .env.example .env.local
# fill .env.local with:
#   DATABASE_URL from Phase D
#   PAYLOAD_SECRET from Phase A
#   NEXT_PUBLIC_SITE_URL=https://wheretostayeurope.com (or the staging subdomain for first deploy)
#   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ...
#   BOOKING_AFFILIATE_AID=<your AID, post-approval>
#   REVALIDATE_SECRET from Phase A
#   TURNSTILE_SECRET_KEY from Phase A

# Run migration 001 (extensions) against the real DB
psql $DATABASE_URL -f migrations/001_extensions.sql

# First local build — catches 90% of problems before you deploy
pnpm --filter web generate:types
pnpm --filter web build
```

If `pnpm build` passes, commit and push:

```bash
cd ../..
git add .
git commit -m "initial scaffold"
git push
```

### Run the seeding + remaining migrations LOCALLY ONCE against prod DB
```bash
# Boot Payload locally, pointed at prod DB — creates tables
pnpm --filter web dev &
# Wait for it to fully start (watch for "Server is ready" in logs)
# Kill it once tables exist: Ctrl+C

# Now apply PostGIS additions
psql $DATABASE_URL -f migrations/007_postgis_after_payload.sql

# Seed Phase 1 countries + cities
pnpm --filter web tsx scripts/seed-phase1-countries.ts
```

---

## Phase G — Deploy via Coolify

1. Coolify → "+ New Resource" → Application → Public Repository (or GitHub Integration if you connected it).
2. Repo URL: your GitHub repo. Branch: `main`.
3. Build pack: **Nixpacks** (auto-detected).
4. Base directory: `/` (root of repo)
5. Build command: `pnpm install --frozen-lockfile && pnpm --filter web build`
6. Start command: `pnpm --filter web start`
7. Port: `3000`
8. Environment variables — paste all values from your `.env.local` into Coolify's env-var UI. **Do NOT put secrets in the repo.**
9. Persistent volumes: add one for `/app/apps/web/.next/cache` → `wts-next-cache` — preserves ISR across deploys.
10. Domain: `wheretostayeurope.com` AND `www.wheretostayeurope.com` (Coolify auto-requests Let's Encrypt cert).
11. Deploy.

First deploy: ~4–8 minutes. Watch the build log. If it fails, most likely causes:
- `generate:types` not run → Payload types out of sync. Run it, commit, push.
- Missing env var → check Coolify env-var list.
- Postgres connection issue → check DATABASE_URL and that PostGIS extension is installed.

When deploy succeeds: visit `https://wheretostayeurope.com`. You should get a 307 redirect to `/en`, then hit the English homepage. Cities grid will show 7 countries with "Coming soon" under each (because no cities are linked to country-hub pages yet? Actually, seed populated cities — should show counts.).

---

## Phase H — Payload admin + first content

- [ ] Go to `https://wheretostayeurope.com/admin`. Create the first admin user (this becomes the super-admin).
- [ ] In admin → Countries → you should see 7 rows (France, Spain, Italy, Germany, UK, Netherlands, Turkey) from the seed. Edit each and fill the localized fields (intro, meta_title, etc.) — start with English.
- [ ] In admin → Cities → you should see ~30 rows. Pick Paris → fill the editorial fields from `paris-pillar-full-draft.md`:
  - `introHtml` → paste the main editorial body (cheat sheet, layout section, neighborhoods, skip section, trip-type section, how-long, getting-around, seasonality)
  - `metaTitle` + `metaDescription` from the brief
  - `lastReviewedAt` = today
- [ ] Same for Porto (`porto-pillar-full-draft.md`), Valencia (`valencia-pillar-full-draft.md`), Istanbul (`istanbul-pillar-full-draft.md`), Cappadocia (`cappadocia-pillar-full-draft.md`).
- [ ] Neighborhoods collection → add Le Marais, Saint-Germain, Latin Quarter, Montmartre, Opéra/9e, Le 11e, Batignolles for Paris. For each, fill: name, slug, city=Paris, lat/lng, summary, whoItsFor, whoShouldSkip, stayTips, metaTitle, metaDescription. Polygon GeoJSON can wait — map works without it.
- [ ] Media collection → upload a few hero images for Paris city + each neighborhood. Source = unsplash, credit = photographer name, creditUrl = Unsplash URL. Set entityType + entityId.

At this point Paris city pillar + 7 Paris neighborhood pages + Porto/Valencia/Istanbul/Cappadocia city pillars are live. Six indexable Tier-1 pages, plus the homepage + 7 country hubs = **~40 indexable URLs.**

---

## Phase I — Fill all `[PLACEHOLDER]` legal values

- [ ] `legal-privacy-policy.md` — substitute `[LEGAL ENTITY NAME]` → your full legal name, `[REGISTERED ADDRESS]` → your physical or virtual address. Paste into Payload Pages as a page of type `feature`, slug `legal/privacy`.
- [ ] Same for `legal-terms-of-use.md` → `/legal/terms`
- [ ] Same for `legal-affiliate-disclosure.md` → `/legal/disclosure`
- [ ] Same for `legal-cookie-policy.md` → `/legal/cookies`
- [ ] Same for `legal-impressum.md` → `/legal/impressum` — use the natural-person variant from `compliance-natural-person.md` (drop company registration lines).
- [ ] Verify footer links from every page render to the 5 live legal pages.

---

## Phase J — n8n Booking sync + revalidation

- [ ] Log into n8n at `https://n8n.<hostname>` (Coolify set this up in Phase D).
- [ ] Set n8n environment variables: `SITE_URL=https://wheretostayeurope.com`, `REVALIDATE_SECRET=<value>`.
- [ ] Create Postgres credential pointing at your DB.
- [ ] Create "Booking.com Affiliate API" HTTP Basic credential (only works once you have Booking affiliate API access — see note below).
- [ ] Workflows → Import from File → upload `n8n-booking-sync-workflow.json`.
- [ ] Find/replace `__POSTGRES_CREDENTIAL_ID__` and `__BOOKING_CREDENTIAL_ID__` with actual IDs.
- [ ] Click "Execute workflow" manually. First run for Paris alone should finish in 30–60 seconds.
- [ ] If it works: activate the cron.
- [ ] If you don't have Booking API access yet: workflow stays disabled. The site still works — property grids will be empty but the editorial content is complete. This is expected for the first 2–4 weeks.

---

## Phase K — Submission + post-launch verification

### Google Search Console

- [ ] Add property: `https://wheretostayeurope.com` (use the URL-prefix version, not Domain property, unless you want DNS verification).
- [ ] Verify via HTML meta tag or DNS TXT record. Paste the verification token into your Next.js env as `GSC_VERIFICATION_TOKEN` and redeploy.
- [ ] Sitemap: submit `https://wheretostayeurope.com/sitemap.xml` (note: your sitemap generator needs to be built — flag as dangling; Payload doesn't auto-generate this).
- [ ] Check for any crawl errors immediately.

### Bing Webmaster Tools

- [ ] https://www.bing.com/webmasters — same pattern, submit sitemap.
- [ ] Often your top traffic source early on; don't skip.

### Smoke tests

- [ ] `curl -I https://wheretostayeurope.com` → 307 to `/en`
- [ ] `curl -I https://wheretostayeurope.com/en` → 200 OK
- [ ] `curl -I https://wheretostayeurope.com/en/france/paris` → 200 OK
- [ ] Open `/en/france/paris/le-marais` in a fresh incognito window. Check:
  - Hero renders
  - Breadcrumbs work
  - Affiliate disclosure banner is at top
  - Affiliate disclosure block is above first Booking CTA
  - Price disclaimer is visible
  - Map either shows (if you accepted Klaro consent) or shows fallback
  - Property cards render (only if Booking API is active; otherwise empty state text)
  - Footer legal links all 200 OK
  - hreflang tags in page source (view-source, look for `<link rel="alternate" hreflang=...>`)
- [ ] Lighthouse audit (Chrome DevTools) on `/en/france/paris` — expect all greens except possibly CLS on first load (Mapbox shifts layout if hydration hiccups).
- [ ] Mobile responsive check (Chrome DevTools device emulation) — content should reflow below 640px.

### Performance + monitoring

- [ ] Set up Cloudflare Web Analytics (free, ships with the Cloudflare plan you already have).
- [ ] Self-host Plausible on Coolify or use Plausible.io paid ($9/mo). Minimum viable analytics.
- [ ] Cloudflare → Rules → Rate limiting on `/api/*` paths. Free tier allows 1 rule; protect `/api/newsletter` at 10 requests/minute per IP.
- [ ] Cloudflare → WAF → Managed rules → Enable "OWASP Core Ruleset". Free.

### First affiliate applications

Per the program sequence in the main plan:
- [ ] Week 1: GetYourGuide (instant), Agoda (3–5 days)
- [ ] Week 1 after 10+ pages live: Booking.com direct EU
- [ ] Week 2: Impact Radius (Hotels.com / Expedia Group)
- [ ] Week 3: SafetyWing (Impact), Airalo Partners
- [ ] Week 5: CJ Affiliate (Viator), Heymondo

---

## Day-after checklist

- [ ] Coolify → is the app healthy? Any restart loops?
- [ ] Hetzner dashboard → server CPU/RAM under 30% idle?
- [ ] Cloudflare Analytics → any requests being served? Any 5xx errors?
- [ ] Search Console → any crawl errors reported?
- [ ] Payload admin → can you log in? Can you edit a city page and see the change reflect within 60 seconds (ISR revalidate)?
- [ ] Klaro cookie consent banner appears on first visit in an incognito window?
- [ ] Newsletter signup form on homepage → actually submits and shows confirmation state?

If all green: congratulations, the site is live. The work from here is content.

---

## Common launch failures + fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| `pnpm build` fails with "Cannot find module '@/...'" | tsconfig paths alias missing | Add `"paths": {"@/*": ["./src/*"]}` to `apps/web/tsconfig.json` → rebuild |
| Payload admin shows "Cannot find table 'countries'" | Schema sync hasn't run | `pnpm --filter web dev` locally once to trigger Payload's schema push, then restart prod |
| Map always shows fallback, even after accepting consent | Klaro cookie name mismatch | Check `lib/consent.ts` cookie parsing matches what Klaro actually writes — log `document.cookie` in browser |
| 500 errors on /api/newsletter | Listmonk not configured | Check env vars `LISTMONK_URL`, `LISTMONK_USER`, `LISTMONK_PASS`, `LISTMONK_LIST_ID_EN` |
| Affiliate CTAs missing on property cards | Regex doesn't match Booking URL shape | Log `property.affiliateUrlTemplate` from a sample row; adjust regex in PropertyCard.tsx if Booking's URL format differs |
| Hreflang tags missing in page source | `buildHreflangTags` not called | Check `generateMetadata` returns include `alternates.languages` |
| `/` returns 404 instead of redirect | Middleware matcher excluded root | Check `middleware.ts` matcher doesn't skip `/` (it shouldn't, but verify) |
| Coolify deploy hangs at "Starting container" | Port mismatch | Coolify expects port 3000; confirm `pnpm start` in package.json uses `next start -p 3000` |

---

## What you still don't have (gracefully)

- **Sitemap generator** — write once, after launch. Queries Payload for all published country/city/neighborhood docs + page types, emits /sitemap-index.xml plus per-type sub-sitemaps.
- **Image pipeline (Unsplash auto-fetch)** — manually upload images via Payload admin until Unsplash production key arrives.
- **Booking.com API access** — 2–4 weeks; your site is fully functional for editorial content meanwhile, property grids empty.
- **Paris / Porto / Valencia / Istanbul / Cappadocia neighborhood deep-dives** — you have briefs shipped, not full drafts. Paris has 7 neighborhood briefs; other cities fewer. Writing these is the next content priority.
- **Tier 3 programmatic pages** — the route renders but requires populated `properties` table to show anything. Blocked on Booking API access.

---

## Revisit cadence

- **Week 1 after launch:** traffic check, error log check, GSC crawl error check. Fix anything red.
- **Week 4:** first commission report check (if Booking approved). Content to priority — write 3 neighborhood deep-dives.
- **Month 3:** ranking check for cluster targets. If Paris pillar ranks ≥ page 5, neighborhood deep-dives are paying off. If not: review on-page + check backlink profile.
- **Month 6:** 50-page scale check. Phase 2 go/no-go on adding German + French locales.

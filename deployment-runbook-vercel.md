# Deployment Runbook — Vercel Path

REPLACES `deployment-runbook.md` (which targeted Hetzner+Coolify). This is the path you're actually using.

From "GitHub repo with shipped files" to "live indexed pages." Realistic time: **2–3 hours** spread across one or two sittings — meaningfully shorter than the Hetzner path because you're not provisioning a VPS or hardening Linux.

---

## Phase A — Accounts (do before anything else)

- [ ] **Vercel** — https://vercel.com — sign up with GitHub. Free Hobby works for testing; **upgrade to Pro ($20/mo) before launch** — affiliate sites are commercial, the Hobby ToS doesn't allow it.
- [ ] **Neon** — https://neon.tech — sign up. Create project `wheretostayeurope`. Postgres 16 with PostGIS support.
- [ ] **Cloudflare** — https://dash.cloudflare.com — sign up. Free plan covers DNS + R2 + Turnstile + WAF.
- [ ] **Kit** (formerly ConvertKit) — https://kit.com — sign up. Free tier good to 10k subscribers. Skip Listmonk entirely.
- [ ] **Mapbox** — https://account.mapbox.com — grab a public token.
- [ ] **DeepL Pro** — https://www.deepl.com/pro-api — free tier 500k chars/mo is enough for Phase 1.
- [ ] **Unsplash Developer** — https://unsplash.com/oauth/applications/new — apply for production access (3–7 days).
- [ ] **Cloudflare Turnstile** — inside the Cloudflare dashboard → Turnstile → create site for `wheretostayeurope.com`. Note site key + secret key.
- [ ] **GitHub** — repo already pushed.
- [ ] **Generate `REVALIDATE_SECRET`** — `openssl rand -hex 32` in Git Bash on Windows (or use https://generate-secret.vercel.app/32). Save.
- [ ] **Generate `PAYLOAD_SECRET`** — same way, separate value. Save.

---

## Phase B — Set up Neon Postgres

1. Log into Neon → your project → **SQL Editor**.
2. Enable required extensions:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
   CREATE EXTENSION IF NOT EXISTS "citext";
   CREATE EXTENSION IF NOT EXISTS "postgis";
   CREATE EXTENSION IF NOT EXISTS "pg_trgm";
   ```
   (Neon supports all four.)
3. Copy the **pooled** connection string from Neon's dashboard. Looks like:
   `postgresql://user:pwd@ep-xxx-pooler.eu-central-1.aws.neon.tech/wheretostay?sslmode=require`
   Save it as `DATABASE_URL`.

---

## Phase C — Bootstrap the Next.js + Payload repo locally

```bash
cd "C:\Users\eruo0\Documents\Claude\Projects\wheretostayeurope"
# repo already has the flat artifacts; we now organize them into Next.js structure

mkdir apps
cd apps
pnpm create payload-app@latest web --db postgres --template blank
cd web

# Replace generated files with our shipped versions per the path mappings:
#   src/payload.config.ts        ← from repo-scaffold.md
#   next.config.ts               ← from repo-scaffold.md
#   .env.example                 ← from repo-scaffold.md

# Move shipped files into target paths (PowerShell from repo root):
# (Run these in PowerShell from C:\Users\eruo0\Documents\Claude\Projects\wheretostayeurope)
```

The full file-moving script is straightforward but tedious. I can write you a PowerShell `bootstrap.ps1` script that does all the moves in one shot — say the word and I'll ship it.

After files are in place:

```bash
pnpm install
cp .env.example .env.local
# Fill .env.local with everything from Phase A
# Most importantly: DATABASE_URL pointing at Neon

pnpm --filter web generate:types
pnpm --filter web build   # Local build must pass before pushing
```

If the build passes, commit and push to GitHub.

---

## Phase D — Connect to Vercel

1. Vercel dashboard → **Add New** → **Project**.
2. Import your GitHub repo.
3. **Framework preset**: Next.js (auto-detected).
4. **Root directory**: `apps/web` (since we're using a monorepo).
5. **Build & Output settings** — leave defaults; Vercel handles it.
6. **Environment variables** — paste everything from `.env.local`:
   - `DATABASE_URL` — Neon pooled connection
   - `PAYLOAD_SECRET` — your generated secret
   - `REVALIDATE_SECRET` — your generated secret
   - `NEXT_PUBLIC_SITE_URL` — `https://wheretostayeurope.com`
   - `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox public token
   - `DEEPL_API_KEY` — DeepL key
   - `UNSPLASH_ACCESS_KEY` — Unsplash key
   - `KIT_API_KEY` — Kit account API key
   - `KIT_FORM_ID_EN` (and per-locale variants) — once you create per-locale Kit forms
   - `TURNSTILE_SECRET_KEY` — from Cloudflare
   - `BOOKING_AFFILIATE_AID` — once approved
   - `CF_R2_*` — Cloudflare R2 credentials for media storage
7. Click **Deploy**.

First build: ~3–5 minutes. If it fails, most likely:
- `generate:types` not run → run it locally, commit, push.
- `DATABASE_URL` rejected → check Neon connection limit; use the **pooled** endpoint, not the direct one.
- Build OOMs → unlikely on Vercel; if it happens, file a ticket.

---

## Phase E — Schema sync

After Vercel deploy succeeds, Payload's database adapter needs to create the tables. Two ways:

**Option 1 (preferred):** trigger schema push by visiting `/admin` once. Payload will create tables on first request.

**Option 2:** run from your laptop:
```bash
DATABASE_URL="<neon-pooled>" pnpm --filter web payload migrate
```

Then run the supplemental PostGIS migration from your laptop:
```bash
psql "$DATABASE_URL" -f apps/web/migrations/007_postgis_after_payload.sql
```

Then seed countries + cities:
```bash
DATABASE_URL="<neon-pooled>" pnpm --filter web tsx scripts/seed-phase1-countries.ts
```

---

## Phase F — Custom domain on Vercel

1. Vercel project → **Settings** → **Domains** → Add `wheretostayeurope.com` and `www.wheretostayeurope.com`.
2. Vercel shows DNS records to add at your registrar. For **Cloudflare DNS** (you're moving to it):
   - Cloudflare dashboard → add `wheretostayeurope.com`
   - At your current registrar: change nameservers to Cloudflare's (~1–24h propagation)
   - Once Cloudflare has the domain, add the A/CNAME records Vercel showed you
3. Cloudflare → **SSL/TLS** → **Full (strict)**.
4. Cloudflare → **Page Rules** → "Always use HTTPS".

Vercel auto-provisions SSL for both domains within a few minutes once DNS resolves.

---

## Phase G — n8n on your headless Linux box

Your i7-14700K headless box is where the Booking sync runs. It's already on, no extra cost.

1. SSH into your box. (You already do this.)
2. Install n8n via Docker or npm:
   ```bash
   docker run -d --name n8n --restart=always \
     -p 5678:5678 \
     -e SITE_URL=https://wheretostayeurope.com \
     -e REVALIDATE_SECRET=<your-secret> \
     -v ~/.n8n:/home/node/.n8n \
     n8nio/n8n
   ```
3. Open `http://<your-box-ip>:5678` from your laptop, set up admin user.
4. Workflows → **Import from File** → upload `n8n-booking-sync-workflow.json`.
5. Find/replace `__POSTGRES_CREDENTIAL_ID__` and `__BOOKING_CREDENTIAL_ID__` with the credential IDs you create in n8n.
6. Activate the cron — runs nightly at 03:00 your timezone.

The workflow ends with an HTTP POST to Vercel's `/api/revalidate` endpoint, so cache invalidation works the same as the Hetzner path. No port forwarding needed — your box only makes outbound HTTPS calls.

If you don't want to run n8n locally:
- **Railway** ($5–20/mo) — single click n8n template
- **n8n Cloud** ($20-50/mo) — official hosted

---

## Phase H — Email forwarding for `contact@wheretostayeurope.com`

Cloudflare → **Email** → **Email Routing** → enable.

Add catch-all rule: forward `*@wheretostayeurope.com` to your real Gmail. Free, takes 5 minutes. Now `contact@`, `privacy@`, `dsa-authority@` all work.

---

## Phase I — Payload admin + first content

- [ ] Open `https://wheretostayeurope.com/admin`
- [ ] Create admin user
- [ ] Author Profile global → fill in your name, photo, bio, cities visited (be honest), socials
- [ ] Cities → Paris → paste content from `paris-pillar-full-draft.md` into `introHtml`. Set `lastReviewedAt = today`.
- [ ] Same for Porto, Valencia, Istanbul, Cappadocia.
- [ ] Neighborhoods → add Le Marais, Saint-Germain, Latin Quarter, Montmartre for Paris (slugs + lat/lng + summary + whoItsFor + whoShouldSkip + stayTips).
- [ ] Media → upload one hero image for the homepage (entityType=generic, entityId=home-hero) + one per Paris neighborhood.
- [ ] Pages collection → create the 5 legal pages by pasting templates with `[LEGAL ENTITY NAME]` swapped for your full legal name and `[REGISTERED ADDRESS]` swapped for your physical/virtual address.

After this you have ~30 indexable URLs live.

---

## Phase J — Verification

- [ ] `https://wheretostayeurope.com/` → redirects to `/en`
- [ ] `https://wheretostayeurope.com/en` → 200, homepage renders with hero
- [ ] `https://wheretostayeurope.com/en/france/paris` → 200, Paris pillar
- [ ] `https://wheretostayeurope.com/en/france/paris/le-marais` → 200, neighborhood page with affiliate disclosure visible at top + map (after consent)
- [ ] `https://wheretostayeurope.com/en/about` → 200, your photo + bio + cities visited
- [ ] All five legal pages 200
- [ ] Footer shows all legal links
- [ ] Newsletter form on homepage submits → returns confirmation copy (until Kit is wired, returns error — wire Kit in Phase K)
- [ ] Lighthouse on `/en/france/paris` — all greens
- [ ] Google Rich Results Test — validates Article + BreadcrumbList + TouristDestination

---

## Phase K — Kit (newsletter) integration

1. In Kit dashboard → **Forms** → Create form per locale (English, German, French, Spanish — start with English).
2. Note each form's ID.
3. Add to Vercel env vars: `KIT_API_KEY`, `KIT_FORM_ID_EN`, etc.
4. Redeploy.
5. Test signup → check Kit subscribers list.

---

## Phase L — GSC + Bing

- [ ] Google Search Console → add property `https://wheretostayeurope.com`
- [ ] Verify via DNS TXT or HTML meta tag (set `GSC_VERIFICATION_TOKEN` in Vercel and redeploy if using meta tag)
- [ ] Submit sitemap URL (you'll need to ship the sitemap generator first — currently dangling)
- [ ] Bing Webmaster Tools — same flow

---

## Phase M — Apply to affiliate programs

Per the original sequence:
- Week 1: GetYourGuide, Agoda
- Once 10+ pages live: Booking.com direct EU
- Week 2: Impact Radius (Expedia Group)
- Week 3: SafetyWing, Airalo
- Week 5–6: CJ Affiliate (Viator), Heymondo

---

## Common Vercel-specific gotchas

| Symptom | Cause | Fix |
|---|---|---|
| Build fails with `Cannot find module '@/...'` | tsconfig paths missing | Add `"paths": {"@/*": ["./src/*"]}` to `apps/web/tsconfig.json` |
| `/admin` cold-starts in 4–6s | Payload v3 serverless cold start | Acceptable — only you use admin. Pro plan has lower cold starts. |
| Function timeout on long requests | Vercel Hobby has 10s, Pro has 60s | Stay on Pro; long-running ops live on n8n, not Vercel |
| ISR pages stale | `/api/revalidate` not hit | Check n8n workflow logs; verify `REVALIDATE_SECRET` matches |
| Image domains rejected | `next.config.ts` `remotePatterns` missing the host | Add the host (Unsplash, Pexels, Booking, R2) |
| Database connection limits | Neon has connection cap on free tier | Use the **pooled** endpoint always; bump to Neon Scale ($19) if you hit limits |
| Build OOM | Rare on Vercel | Increase memory in `vercel.json` or split build steps |

---

## What this path costs you vs Hetzner

You pay ~$30/month more for not learning Linux. That's worth it given your stated context. Re-evaluate when:
- Monthly Vercel + Neon bill crosses $80
- Or revenue crosses €500/mo and you have margin to invest in efficiency

At that point, moving to Hetzner becomes a 1-day migration project. The shipped code works on both — you only swap deployment target.

# WhereToStayEurope — Compliance + Legal Exposure Checklist

**Principle: nothing gets indexed until this list is green.** Affiliate applications (Impact, CJ, Amazon) will also refuse you without most of these in place, so this is a gating item for monetization, not just liability.

**Disclaimer: I am not a lawyer.** These are industry-standard patterns. Get a licensed lawyer familiar with GDPR + affiliate marketing to spot-review the final set before launch (expect €200–500 for review; do not pay for from-scratch drafting).

---

## Block 0 — MUST SHIP before first indexable page

### Entity + identity

- [ ] **Legal entity registered.** LLC (US), sole proprietor registration + VAT number (EU), Ltd (UK), or equivalent in your residency. Personal liability shield. This is the single most important item on this list.
- [ ] **Business bank account** separate from personal.
- [ ] **Registered address** for the Impressum. PO boxes acceptable in most jurisdictions; virtual-office services (€10–30/mo) common for solo operators.
- [ ] **Working contact email** on your domain (contact@wheretostayeurope.com), monitored.

### Legal pages live on site

- [ ] `/legal/privacy` — Privacy Policy (template shipped)
- [ ] `/legal/terms` — Terms of Use (template shipped)
- [ ] `/legal/cookies` — Cookie Policy (template shipped)
- [ ] `/legal/disclosure` — Affiliate Disclosure dedicated page (template shipped)
- [ ] `/legal/impressum` — Impressum / legal notice (template shipped)
- [ ] `/contact` — Contact page with working form and direct email

Every legal page is:
- Linked from the global footer
- Linked from the top-nav "Legal" dropdown
- Dated with "Last updated: YYYY-MM-DD"
- Versioned in Git so changes are traceable (required for GDPR records)

### In-page disclosure patterns (implemented as React components — shipped)

- [ ] **Site-wide affiliate disclosure banner** — top of page, every page, dismissable only per session.
- [ ] **In-page affiliate disclosure block** — rendered above the first affiliate link on every page that has affiliate links. Short, clear, fixed text.
- [ ] **Price disclaimer** — inline next to every price mention. "Indicative — check live price when you click through."
- [ ] **Insurance disclaimer** — visible block next to every insurance affiliate CTA. "We are not licensed insurance agents / this is not financial advice."
- [ ] **Visa disclaimer (if visa content exists)** — prominent alert at top of visa pages. See pushback below: consider skipping visa content in Phase 1.

### Cookie consent

- [ ] **Klaro** (self-hosted, MIT-licensed, free) configured with categories:
  - Strictly necessary (always on) — session cookies, CSRF
  - Analytics (currently off because Plausible is cookie-free; keep category slot for future flexibility)
  - Maps & embeds (Mapbox — opt-in)
  - Affiliate tracking (Booking click-throughs — opt-in)
- [ ] Declined consent → map falls back to a static image, affiliate links still work but without Booking's client-side tracking cookie (their server-side affiliate attribution still fires from our `aid=` parameter, so we still get credited).

### GDPR internal records

- [ ] **Article 30 processing record** — internal one-pager listing data categories, processing purposes, legal basis, retention, recipients. Template shipped. Not published; kept on file.
- [ ] **Data Processing Agreements (DPAs)** on file with every processor:
  - Hetzner (EU provider, standard DPA available)
  - Cloudflare (has EU addendum + SCCs)
  - DeepL (GDPR-compliant, DPA downloadable)
  - Unsplash / Pexels / Pixabay (check each)
  - Booking.com affiliate program (their partner agreement is the DPA)
- [ ] **Records of consent** — Klaro logs consent events to Postgres. Retain minimum 12 months.

### Accessibility (WCAG 2.1 AA baseline)

- [ ] Every image has meaningful `alt` text (auto-generated via DeepSeek + human review for flagship pages)
- [ ] Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text (verified via Lighthouse)
- [ ] All interactive elements keyboard-accessible
- [ ] `<html lang="...">` set per locale
- [ ] Skip-to-content link on every page
- [ ] Form inputs have labels (not placeholder-only)
- [ ] Mapbox map has a static fallback + text alternative describing neighborhood location

### Affiliate program-specific requirements (verify before applying)

- [ ] Booking.com affiliate: terms of use accept disclosure requirement — in your T&Cs
- [ ] Impact Radius (Expedia): screenshots of disclosure will be requested at approval
- [ ] CJ Affiliate: similar — disclosure page link requested at application
- [ ] Amazon Associates (skipping in Phase 1 but for reference): specific disclosure wording required verbatim

---

## Ongoing — after launch

- [ ] **6-month review cadence** on every page with factual claims (flagged via `pages.last_reviewed_at` column)
- [ ] **Privacy policy update** whenever you add a new processor (new affiliate network, new analytics tool, new CDN)
- [ ] **Cookie audit** quarterly — scan with `document.cookie` and network inspector, confirm nothing unconsented is firing
- [ ] **Consent record purge** at 12 months (retain only for legal-basis window)
- [ ] **Accessibility audit** annually + after every major UI change

---

## Explicit pushbacks on original 8-item list

### On #2 (cookie consent)
Plausible alone doesn't legally require a consent banner (no cookies, no PII, DNT-honoring, several EU DPAs have confirmed). **But Mapbox sets cookies and Booking affiliate redirects set cookies.** So consent IS required for your stack. Klaro handles this cleanly with category-based opt-in.

### On #5 (visa page)
**Strong push: don't do visa pages in Phase 1.** Visa rules change monthly, affect people's real travel plans, and expose you to liability on a topic that converts badly for accommodation affiliate. Two alternatives:
1. Skip visa content entirely — link to official government sources from the country hub if needed
2. Ship a single "How to check Schengen visa requirements" page that only lists official sources and says nothing substantive
Both are safer than a full visa guide for every country.

### On #7 (contact / business entity)
The list frames this as "contact info shown." The bigger exposure is **entity registration itself**. Without an LLC/sole-prop/Ltd registered, every lawsuit, every affiliate dispute, every regulatory fine targets you personally. This is the single biggest unforced error to avoid. Budget €200–1,000 for registration + €100/yr for a registered agent depending on jurisdiction. Pay it.

### On Amazon Associates
Your plan correctly skips Amazon. Worth restating: Amazon's program has uniquely strict disclosure requirements ("As an Amazon Associate I earn from qualifying purchases" — exact wording, on every page with Amazon links), aggressive account termination for violations, and 24-hour cookies. Not worth the compliance overhead for a travel site. Don't apply.

---

## What still needs your decision (blockers)

- [ ] **Tax residency** — decides legal entity type and VAT obligations
- [ ] **Budget for entity registration + virtual address** — €200–1,500 one-time + €50–200/yr
- [ ] **Lawyer for final review** — €200–500 one-time before launch. Pick one with travel + GDPR + affiliate experience. I can suggest questions to bring to the review if helpful.
- [ ] **Decision on visa content** — skip, link-only, or full-disclaimer?

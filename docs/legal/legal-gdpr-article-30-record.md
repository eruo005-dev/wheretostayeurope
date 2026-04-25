# GDPR Article 30 — Record of Processing Activities

**Internal document. NOT published.** Kept on file; provided to supervisory authority on request.

**Controller:** [LEGAL ENTITY NAME]
**Controller contact:** privacy@wheretostayeurope.com
**Record maintained from:** [YYYY-MM-DD]
**Last reviewed:** [YYYY-MM-DD]

---

## Processing activity 1 — Site operation and security

| Field | Value |
|---|---|
| Purpose | Serving the website; detecting and preventing abuse |
| Data categories | IP address, user agent, referrer, request path, timestamp |
| Data subjects | Website visitors |
| Legal basis (Art. 6) | Legitimate interest — Art. 6(1)(f) |
| Recipients | Hetzner (hosting), Cloudflare (CDN/WAF) |
| International transfers | Cloudflare (USA) — EU SCCs in place |
| Retention | 14 days |
| Security measures | TLS 1.3, firewall, hashed admin auth, limited internal access |

## Processing activity 2 — Analytics

| Field | Value |
|---|---|
| Purpose | Aggregated understanding of content performance |
| Data categories | Page URLs, referrers, user agent, country (inferred from IP, not stored) — no personal identifiers |
| Data subjects | Website visitors |
| Legal basis | Legitimate interest (aggregated, cookie-less analytics with Plausible — no consent required per EU guidance) |
| Recipients | Plausible Insights OÜ (Estonia) |
| International transfers | None (within EEA) |
| Retention | Aggregated indefinitely; no row-level PII |
| Security measures | Plausible's certifications (ISO 27001 status to verify at review) |

## Processing activity 3 — Newsletter

| Field | Value |
|---|---|
| Purpose | Sending email updates to opt-in subscribers |
| Data categories | Email, language, country-of-interest, opt-in timestamp, opt-in IP, unsubscribe events |
| Data subjects | Newsletter subscribers |
| Legal basis | Consent — Art. 6(1)(a); double opt-in recorded |
| Recipients | Listmonk (self-hosted on our infrastructure) |
| International transfers | None |
| Retention | Until unsubscribe + 30 days (for audit trail); 24 months max thereafter |
| Security measures | Postgres at rest encryption, unique token for unsubscribe |

## Processing activity 4 — Contact form

| Field | Value |
|---|---|
| Purpose | Responding to inquiries |
| Data categories | Email, message content, timestamp, submitting IP (for spam detection) |
| Data subjects | Users who submit the form |
| Legal basis | Legitimate interest + consent |
| Recipients | Operator's email provider |
| International transfers | Depends on email provider |
| Retention | 12 months |
| Security measures | Captcha (Cloudflare Turnstile), rate limiting |

## Processing activity 5 — Cookie consent records

| Field | Value |
|---|---|
| Purpose | Proof of consent (Art. 7 GDPR) |
| Data categories | Consent ID, timestamp, user agent hash, consent categories accepted/declined |
| Legal basis | Legal obligation — Art. 6(1)(c); documenting consent |
| Recipients | First-party only |
| Retention | 24 months |
| Security measures | Stored in Postgres, no plaintext IP |

## Processing activity 6 — Affiliate click tracking (attribution only)

| Field | Value |
|---|---|
| Purpose | Crediting our referral of a user to an affiliate partner |
| Data categories | Outbound click event (page ID, partner, timestamp, anonymized session hash) |
| Data subjects | Users who click an affiliate link |
| Legal basis | Legitimate interest — essential for affiliate attribution and site sustainability |
| Recipients | Affiliate partner (via URL parameter only — no data POST); internal logs |
| International transfers | Varies by partner — documented separately |
| Retention | 90 days internally (for commission reconciliation) |
| Security measures | No PII stored; session hash is non-reversible |

---

## Sub-processors list (review quarterly)

| Sub-processor | Location | Role | DPA status |
|---|---|---|---|
| Hetzner Online GmbH | Germany | Hosting | Standard DPA signed |
| Cloudflare, Inc. | USA | CDN, WAF, DNS | DPA + EU SCCs signed |
| Plausible Insights OÜ | Estonia | Analytics | DPA accepted in ToS |
| DeepL SE | Germany | Translation (no PII sent) | DPA signed |
| Mapbox, Inc. | USA | Map tiles (consent-gated) | DPA + EU SCCs signed |
| Listmonk | Self-hosted | Email delivery | N/A (first-party) |
| Affiliate partners | Various | Commission attribution | Partner agreements act as DPAs |

---

## Data subject rights handling

- Requests arrive at: `privacy@wheretostayeurope.com`
- Logged to internal tracker (spreadsheet initially; moved to Postgres table post-launch)
- Response deadline: 30 days (extendable by 60 in complex cases, with notice)
- Identity verification: for erasure/access requests, match request email to subscriber record
- No fee for first request per year (Art. 12(5))

---

## Breach procedure

- If a personal-data breach occurs: assess within 24 hours.
- Notify supervisory authority within 72 hours if likely to risk user rights (Art. 33).
- Notify affected users without undue delay if high risk (Art. 34).
- Document all breaches, even those not notified.

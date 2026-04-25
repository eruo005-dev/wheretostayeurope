## Operating as a natural person — compliance addendum

**Decision locked:** Jay runs WhereToStayEurope as an individual, not a registered legal entity. No LLC, no GmbH, no Ltd, no sole-trader registration beyond what local tax law strictly requires. Revenue expectation: mid (not launch-scale, not enterprise).

This supersedes the "register legal entity" item in `compliance-checklist.md` Block 0.

---

### What still has to be done (non-negotiable)

1. **Research your country's rules** for earning commercial income as a natural person. Common cases:
   - **Germany:** any commercial activity requires a Gewerbeanmeldung (€20–60 one-time, no ongoing fee if staying below small-business Kleinunternehmer threshold). Not the same as founding a company.
   - **France:** auto-entrepreneur status is the natural-person equivalent; required for affiliate income.
   - **UK:** register for Self Assessment if income exceeds £1,000/year trading allowance.
   - **Spain:** autónomo registration + monthly social security contributions — friction is real here.
   - **Turkey:** income above the exemption threshold requires declaration; specific rules vary by residency status.
   - **US:** file a Schedule C on personal 1040; no separate registration needed below Fed thresholds.
   - If you're genuinely unsure, a 30-minute consultation with a local accountant (€50–150) resolves this cleanly.

2. **Declare affiliate income on your personal tax return.** Not optional anywhere.

3. **Impressum / legal notice** — still required where applicable (Germany, Austria, Switzerland strongly; best practice everywhere). Natural-person variant:
   ```
   [YOUR FULL LEGAL NAME]
   [PHYSICAL ADDRESS — home or virtual office]
   [POSTAL CODE] [CITY], [COUNTRY]
   Email: contact@wheretostayeurope.com
   Responsible for content: [YOUR FULL LEGAL NAME]
   ```
   No registration number, no VAT ID unless you've registered for VAT (usually not until €30–50k/yr turnover).

4. **Virtual office address** if you don't want your home address on the public Impressum. €10–30/month. Anyanswer.de, virtualoffice.eu, similar. Required legally? No. Required for peace of mind? Yes if you value privacy.

5. **Privacy policy and all disclosure components** — unchanged. They're about data handling and affiliate transparency, not entity structure. Keep them.

### What to change in shipped files

- In every template with `[LEGAL ENTITY NAME]`, substitute your full legal name.
- In `[REGISTERED ADDRESS]`, substitute your physical address (home or virtual office).
- Remove any placeholder lines referring to company registration number, VAT ID, commercial register — unless you actually have those.
- `legal-impressum.md`: remove "Legal form" line or set to "Natural person / sole operator." Remove "Registration number" + "Registration authority" lines.
- `legal-gdpr-article-30-record.md`: controller name = you; controller contact = privacy@wheretostayeurope.com — unchanged in structure.

### What this costs you (honest)

- **Narrower affiliate program acceptance.** Expect 1–2 rejections out of 8 partners. Workarounds: apply again with full details when you have indexed content proving legitimacy, or skip the ones that require business entities.
- **Personal liability.** A user who has a bad hotel experience through your affiliate link is the provider's problem, not yours — your Terms of Use say so. But a copyright holder who claims you used their image without attribution can sue you personally. Mitigation: never skip UGC attribution, never use AI-generated images of real places, respond to takedown requests within 24 hours.
- **Revenue ceiling before VAT registration.** €30–50k/year turnover is a common EU threshold. Below that, no VAT registration needed; above it, you register. Reaching that threshold is a good problem, not a launch problem.
- **Credit-card and bank separation pain later.** When the site makes $500+/month, you'll wish you had separate finances. Start a separate account — doesn't have to be a "business" account, just a second personal checking dedicated to the site. Spiral later.

### Tripwires to watch for (revisit in 6 and 12 months)

- Affiliate revenue crosses your local VAT threshold → register for VAT, consider sole-trader status if not already.
- Specific affiliate partner rejects you → note the reason, decide if it's worth forming an LLC for that partner alone (usually no).
- Monthly revenue stable above €1,000 → consider whether a simple sole-trader status reduces your friction with partners and tax.
- Legal letter arrives (copyright, GDPR complaint, defamation) → escalate to a lawyer immediately. Don't self-represent.
- You decide to hire someone, even contractors → entity registration becomes significantly more useful.

### What won't help even if you registered

- **Hiding behind a company name in harassment cases.** The person operating a site is public record via Impressum regardless.
- **Reducing GDPR fines.** Fines scale with revenue; company doesn't shield.
- **Faster affiliate approvals.** Most programs care about site quality, not entity type.

---

### Updated Block 0 compliance checklist (supersedes `compliance-checklist.md` §entity)

- [ ] ~~Register legal entity~~ → **Research local natural-person rules + register for tax/sole-trader status where required**
- [ ] Working contact email on your domain
- [ ] Physical address for Impressum (home or virtual office)
- [ ] Bank account — second personal account dedicated to site finances recommended
- [ ] Natural-person variant of Impressum copy filled in
- [ ] All `[LEGAL ENTITY NAME]` and `[REGISTERED ADDRESS]` placeholders in legal templates substituted
- [ ] Tax calendar set — reminder to declare affiliate income on next personal return

Everything else in the compliance checklist (legal pages, disclosure components, Klaro consent, accessibility baseline, image attribution, affiliate program sequence) stays exactly as shipped.

---

### One-line summary for future you

> Running as a natural person is fine for mid-revenue, solo-operator affiliate travel content — most liability is scoped by disclaimers, GDPR applies either way, and entity registration becomes worthwhile if revenue crosses VAT threshold or you start hiring. Until then, don't.

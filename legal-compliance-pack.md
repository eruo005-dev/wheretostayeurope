# Legal + Compliance Pack — WhereToStayEurope

Owner-operator-hat response to the 8 legal exposures you flagged. Every point gets: (1) what's actually required, (2) concrete implementation (draft copy or component), (3) where it lives on the site, (4) who owns ongoing maintenance.

**Not legal advice — I'm not a lawyer.** Recommendation: once you have the entity set up and traffic >10k/mo, pay a GDPR-specialist lawyer (€500–1,500 one-time) to review the Privacy Policy and Terms. Until then, the templates below are better than nothing and closely patterned on what comparable affiliate travel sites use. Start conservative; tighten with counsel later.

---

## Priority matrix — ship in this order

| # | Item | Why now | Ship by |
|---|---|---|---|
| 1 | **Business entity decision** | Everything else depends on knowing who the "controller" is. Personal liability without an entity. | Before launch |
| 2 | **Affiliate disclosure component (sitewide top + per-link)** | FTC + ASA + EU consumer-protection. Easiest fix. Highest-penalty item if ignored. | Before first affiliate link goes live |
| 3 | **Privacy Policy + contact / imprint section** | GDPR Articles 13–14 (notice at point of collection). Required before email capture or analytics of any kind. | Before launch |
| 4 | **Cookie/consent architecture** | ePrivacy Directive. Simpler than most sites think if you stay cookie-free. | Before launch |
| 5 | **Terms of Use** | Limits liability, governs email list, sets jurisdiction. | Before launch |
| 6 | **Price-claim disclaimer (inline component + Terms clause)** | Misleading-advertising risk. Cheap to fix. | Before first price published |
| 7 | **Visa/border disclaimer block** | "Not professional advice" language at top of any visa/border content. | Before visa content published |
| 8 | **Insurance "not licensed / not advice" disclaimer** | Insurance is regulated; affiliate referrals without licensure are OK only with clear "informational" framing. | Before insurance affiliate links go live |

---

## 0. Business entity — decide before launch

Not one of your 8 but it shapes all the others. Options for a solo EU operator:

| Structure | Pros | Cons | Fit |
|---|---|---|---|
| **Sole trader / self-employed** | Cheapest, fastest setup | Personal liability: a lawsuit reaches your personal assets | OK pre-launch, not OK once affiliate revenue is material |
| **Single-member LLC / Ltd / SRL / UG / EOOD** | Limits liability, separates finances, cleaner tax | ~€300–1,500 setup + annual accounting (~€500–1,500/yr) | Right call once revenue > €1,000/mo or traffic > 10k/mo |
| **Estonian OÜ via e-Residency** | €100–200/yr, EU-domiciled, remote-friendly, clean imprint | Need to understand dividend-only taxation + your home country tax treaty | Good for digital-first solo operators, especially if you travel |

**My call:** start as sole trader to launch, incorporate before crossing €1k/mo revenue or publishing your first paid ad. Don't skip the imprint — even sole traders must list a legal name and contact.

---

## 1. Privacy Policy — draft template

Lives at `/privacy/` (every locale). Linked from footer on every page AND from every form with personal data (email capture, contact form). Last-updated date visible.

```markdown
# Privacy Policy

*Last updated: [YYYY-MM-DD]*

This policy explains what personal data WhereToStayEurope collects, why, how long
we keep it, and what rights you have over it. "We", "us", and "our" refer to
[YOUR LEGAL NAME / ENTITY NAME], the data controller for this site.

## 1. Who we are

- **Controller:** [Legal name, registered address, country]
- **Contact:** privacy@wheretostayeurope.com
- **Website:** https://wheretostayeurope.com
- **Trade register number:** [if applicable]

## 2. What we collect and why

We collect the minimum needed to run the site.

### 2.1 When you visit the site

- **Server logs.** IP address, user agent, requested URL, timestamp, referrer.
  Purpose: security, abuse prevention. Legal basis: legitimate interests
  (GDPR Art. 6(1)(f)). Retention: 30 days.
- **Privacy-friendly analytics (Plausible, self-hosted).** We count visits using
  hashed daily identifiers. We do not set cookies, we do not track you across
  sites, and we do not collect personal data for analytics. Purpose: measuring
  content performance. Legal basis: legitimate interests.

### 2.2 When you subscribe to our email list

- **Email address and locale preference.** Purpose: sending the newsletter you
  requested. Legal basis: consent (GDPR Art. 6(1)(a)). Retention: until you
  unsubscribe or we discontinue the list. Unsubscribe link in every email.

### 2.3 When you click an affiliate link

We earn a commission if you book through partner links on this site (see
Affiliate Disclosure). Clicking an affiliate link takes you to the partner's
site, which has its own privacy policy and may set its own cookies. We do not
share personal data with those partners; they track conversions via anonymous
parameters in the URL.

## 3. Third-party services we use

- **Cloudflare** (CDN, security). Processes IP addresses as part of delivering
  the site. See Cloudflare's privacy policy.
- **Booking.com, Hotels.com, Expedia, Agoda, GetYourGuide, SafetyWing, Airalo,
  and similar affiliate partners.** We link out to them; they operate under
  their own privacy terms.
- **Listmonk** (self-hosted email delivery). Stores your subscription record on
  our server.
- **DeepL** (translation). We do NOT send user data to DeepL. DeepL is used to
  translate our editorial content only.

We do not use Google Analytics, Meta Pixel, or similar tracking-based analytics.
We do not run behavioral advertising.

## 4. International transfers

Our servers are located in [Germany/Finland — fill in once Hetzner region is
chosen]. If you access the site from outside the EU/EEA, your data may be
transferred to us there. For EU/EEA visitors this is within the EU. For non-EU
visitors, the transfer is based on your choice to access the site.

## 5. Your rights

Under GDPR and equivalent laws (UK GDPR, Swiss FADP), you have the right to:

- access the personal data we hold about you;
- request correction of inaccurate data;
- request deletion of your data;
- object to processing based on legitimate interests;
- withdraw consent at any time for consent-based processing;
- request data portability;
- lodge a complaint with your data protection authority.

To exercise any of these rights, email privacy@wheretostayeurope.com. We aim to
respond within 30 days.

## 6. Children

This site is not directed at children under 16. We do not knowingly collect
personal data from children. If you believe we have, contact us and we will
delete it.

## 7. Changes to this policy

We may update this policy. Material changes will be announced via banner on the
site for at least 14 days. The "Last updated" date at the top always reflects
the most recent revision.

## 8. Contact

Questions? Email privacy@wheretostayeurope.com.
```

**Deployment notes:**
- Translate to DE, FR, ES for those locales (DeepL pass + human review — legal text tolerates less freedom than editorial).
- Link from footer on every page with text "Privacy Policy" (localized).
- Link from every email capture form with text: "We'll only email you about Europe travel. See our [Privacy Policy](/privacy)."

---

## 2. Cookie / consent — pragmatic architecture

**Your situation is simpler than most sites because:**

- Self-hosted Plausible sets zero cookies
- No Google Analytics, no Meta Pixel, no retargeting
- Cloudflare's operational cookies are strictly necessary (security)
- Affiliate outbound clicks — the partner's cookies are set on the *partner's* domain, after the user chose to click through

**Under ePrivacy Directive (the rule that triggers cookie banners), you only need consent for storing information on the user's device. If you store nothing non-essential, you don't need a banner.**

However, some EU regulators (France's CNIL, Germany's state DPAs) have broader interpretations. Safer pattern:

### Option A — minimal notice, no banner (my recommendation)

Footer bar on first visit (dismissible, not blocking):

```
This site uses privacy-friendly analytics (Plausible, no cookies, no tracking).
Affiliate links may set cookies on the partner's site once you click through.
See our Privacy Policy and Affiliate Disclosure. [Got it]
```

Store the "dismissed" state in localStorage (not a cookie) so it doesn't reappear.

### Option B — if you add anything that sets a non-essential cookie (e.g., embedded YouTube, Meta Pixel later)

Full consent banner with Accept / Reject / Customize. Use a library:
- **Klaro** (open source, self-hosted, GDPR-friendly) — recommended
- **Cookiebot** (€12–40/mo) — plug-and-play but paid

Never implement "accept by scrolling" — invalidated by EU courts.

### Component spec: `CookieNotice.tsx`

```tsx
// apps/web/src/components/legal/CookieNotice.tsx
"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "wts_cookie_notice_dismissed_v1";

export function CookieNotice({ locale = "en" }: { locale?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  // Simplified copy map — expand with full i18n
  const copy: Record<string, { body: string; cta: string }> = {
    en: {
      body:
        "We use privacy-friendly analytics (no cookies, no tracking). Affiliate partners may set cookies on their site after you click through. See our Privacy Policy and Affiliate Disclosure.",
      cta: "Got it",
    },
    de: {
      body:
        "Diese Seite nutzt datenschutzfreundliches Analytics (keine Cookies, kein Tracking). Partnerseiten können nach dem Klick eigene Cookies setzen. Siehe Datenschutzerklärung und Affiliate-Hinweis.",
      cta: "Verstanden",
    },
    fr: {
      body:
        "Ce site utilise un outil d'analyse sans cookies et sans traçage. Les partenaires affiliés peuvent déposer leurs propres cookies après que vous cliquez. Voir notre Politique de confidentialité et la mention d'affiliation.",
      cta: "Compris",
    },
    es: {
      body:
        "Este sitio utiliza análisis sin cookies ni rastreo. Los socios afiliados pueden establecer sus propias cookies después de hacer clic. Consulta nuestra Política de privacidad y la divulgación de afiliados.",
      cta: "Entendido",
    },
  };

  const { body, cta } = copy[locale] ?? copy.en;

  return (
    <div
      role="region"
      aria-label="Cookie and analytics notice"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0f172a",
        color: "#f1f5f9",
        padding: "12px 16px",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 9999,
      }}
    >
      <p style={{ margin: 0, flex: 1 }}>{body}</p>
      <button
        onClick={dismiss}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 4,
          padding: "8px 14px",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        {cta}
      </button>
    </div>
  );
}
```

---

## 3. Affiliate disclosure — the one you probably underdid last time

FTC, ASA (UK), and most EU consumer-protection frameworks require disclosure that is **clear and conspicuous, near the first affiliate link, not buried in a footer**. This is the enforcement-frequency item.

### Three placements, all required

1. **Sitewide above-the-fold strip** — small, dismissible per-session or permanent thin bar
2. **Page-level top banner** on any page with affiliate links — between intro and first affiliate CTA
3. **Dedicated `/affiliate-disclosure/` page** linked from footer

### Component spec: `AffiliateDisclosureBanner.tsx`

```tsx
// apps/web/src/components/legal/AffiliateDisclosureBanner.tsx
// Render near the top of any page with affiliate links, above first CTA.

type Props = { locale?: string };

const COPY: Record<string, string> = {
  en: "Some links on this page are affiliate links. If you book through them, we earn a commission at no extra cost to you. It never changes what we recommend. Full disclosure →",
  de: "Einige Links auf dieser Seite sind Affiliate-Links. Buchen Sie darüber, erhalten wir eine Provision – ohne Mehrkosten für Sie. Das beeinflusst unsere Empfehlungen nicht. Vollständige Offenlegung →",
  fr: "Certains liens de cette page sont des liens affiliés. Si vous réservez via ces liens, nous touchons une commission, sans coût supplémentaire pour vous. Cela n'influence pas nos recommandations. Mention complète →",
  es: "Algunos enlaces de esta página son enlaces de afiliado. Si reservas a través de ellos, ganamos una comisión sin coste extra para ti. No cambia lo que recomendamos. Divulgación completa →",
};

export function AffiliateDisclosureBanner({ locale = "en" }: Props) {
  const href = `/${locale}/affiliate-disclosure`;
  const text = COPY[locale] ?? COPY.en;
  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      style={{
        background: "#fef3c7",
        borderLeft: "4px solid #f59e0b",
        padding: "10px 14px",
        fontSize: 13,
        color: "#78350f",
        margin: "16px 0",
        borderRadius: 4,
      }}
    >
      <a href={href} style={{ color: "#78350f", textDecoration: "underline" }}>
        {text}
      </a>
    </aside>
  );
}
```

### Full `/affiliate-disclosure/` page draft

```markdown
# How We Make Money (Affiliate Disclosure)

*Last updated: [YYYY-MM-DD]*

WhereToStayEurope is reader-funded through affiliate commissions. If you book
through one of our links, we earn a small commission — at no extra cost to you.
The price you pay is exactly the same as booking directly.

## Which links are affiliate links?

Any link on this site that points to a booking or purchase page on:

- Booking.com
- Hotels.com, Expedia, Vrbo (via Impact Radius)
- Agoda
- GetYourGuide, Viator (via CJ Affiliate)
- SafetyWing, Heymondo (travel insurance)
- Airalo, Holafly (eSIM)

...is an affiliate link. Clicking and completing a booking or purchase pays us
a commission.

## How we decide what to recommend

We recommend places and products we would genuinely suggest to a friend. Our
editorial process:

1. Neighborhood recommendations are based on our own research, reader feedback,
   and (where relevant) personal visits — not commission rates.
2. Property shortlists are filtered by review score (8.0+), review count (100+
   reviews minimum), and price band — then sorted by review score. The
   commission rate does not enter the ranking.
3. We regularly include **"who should skip this"** notes for neighborhoods and
   properties, because honest warnings serve readers better than relentless
   upselling.

## We do not

- Accept payment to review or include specific hotels.
- Modify rankings in exchange for higher commission rates.
- Hide that a link is affiliate.

## Questions?

Email hello@wheretostayeurope.com.
```

### Inline per-link disclosure

For property-card CTAs, append a small icon or "(ad)" tag to affiliate buttons:

```tsx
<a href={bookingUrl} rel="sponsored nofollow" target="_blank">
  Check availability on Booking.com <sup>(affiliate)</sup>
</a>
```

The `rel="sponsored nofollow"` is required by Google for affiliate links — it prevents PageRank leakage AND signals commercial relationship.

---

## 4. Terms of Use — draft template

Lives at `/terms/`. Linked from footer.

```markdown
# Terms of Use

*Last updated: [YYYY-MM-DD]*

By using WhereToStayEurope.com ("the site"), you agree to these terms. If you
don't, please don't use the site.

## 1. Who we are

The site is operated by [YOUR LEGAL NAME / ENTITY], registered in [JURISDICTION]
under [REGISTRATION NUMBER, if applicable]. Contact: hello@wheretostayeurope.com.

## 2. Content is informational, not professional advice

The site publishes editorial guides, reviews, and recommendations about travel
destinations in Europe. All content is for **informational purposes only**. It
does not constitute:

- Legal, financial, tax, or immigration advice
- Professional travel-agency advice
- A guarantee of availability, price, safety, or quality at any destination or
  property

We make good-faith efforts to keep information accurate, but travel conditions
change. You are responsible for verifying any information before acting on it.

## 3. Third-party bookings

When you click a link to a partner (Booking.com, Hotels.com, GetYourGuide, etc.),
you are taken to their site. Your booking or purchase is a contract between you
and that partner — not us. We are not a party to your reservation. If something
goes wrong with a booking, contact the partner directly.

## 4. Affiliate relationships

We earn commissions from some partners. See our [Affiliate Disclosure](/affiliate-disclosure).

## 5. Prices and availability

Prices shown on the site are estimates based on historical or sample data. Actual
prices at the time of booking may differ. Always confirm the live price on the
partner's site before booking.

## 6. User conduct

Don't use the site to:
- scrape content at scale without our permission;
- probe for vulnerabilities;
- impersonate the site or its operators;
- interfere with service delivery.

## 7. Email list

You may subscribe to our email list voluntarily. You can unsubscribe at any time
via the link in every email. We don't share your email with third parties.

## 8. Intellectual property

Editorial content, visualizations, and custom maps on this site are © [YEAR]
[YOUR LEGAL NAME]. You may quote brief passages with attribution and a link
back. You may not republish substantial portions without permission.

User-contributed photos remain the property of their photographers; we display
them under license (Unsplash, Pexels, Pixabay, or direct permission).

## 9. Limitation of liability

To the maximum extent permitted by law, we are not liable for:

- any decisions you make based on content on the site;
- any loss, damage, cancellation, or dispute arising from a booking made through
  a partner linked from the site;
- any interruption, error, or downtime on the site.

Our total liability to you for any claim arising from your use of the site is
limited to €100.

## 10. Governing law

These terms are governed by the laws of [YOUR COUNTRY]. Disputes will be
resolved in the courts of [YOUR CITY / COUNTRY]. EU consumers retain their
rights under local consumer protection law.

## 11. Changes

We may update these terms. We'll post the revised version here with a new
"Last updated" date. Continued use of the site after changes means you accept
the revised terms.

## 12. Contact

Questions about these terms: hello@wheretostayeurope.com
```

---

## 5. Visa / border / entry-requirement disclaimer

Any page that discusses visa status, Schengen days, border rules, nomad visa programs, or entry requirements MUST carry a prominent disclaimer at the top — not the bottom.

### Component: `VisaDisclaimer.tsx`

```tsx
// apps/web/src/components/legal/VisaDisclaimer.tsx

const COPY: Record<string, { title: string; body: string }> = {
  en: {
    title: "This is information, not immigration advice.",
    body:
      "Visa and border rules change frequently and depend on your nationality, purpose, and entry route. We do our best to stay current but cannot guarantee accuracy. Always verify with the official embassy or consulate of your destination before traveling. We are not immigration advisers and are not liable for entry decisions made at borders.",
  },
  de: {
    title: "Dies ist eine Information, keine Einwanderungsberatung.",
    body:
      "Visa- und Einreisevorschriften ändern sich häufig und hängen von Staatsangehörigkeit, Reisezweck und Einreiseweg ab. Wir bemühen uns um Aktualität, können aber keine Richtigkeit garantieren. Prüfe die offizielle Auslandsvertretung deines Ziellandes vor der Reise. Wir sind keine Einwanderungsberater und haften nicht für Entscheidungen an der Grenze.",
  },
  fr: {
    title: "Ceci est une information, pas un conseil en immigration.",
    body:
      "Les règles de visa et de frontière changent souvent et dépendent de votre nationalité, du motif et de l'itinéraire d'entrée. Nous faisons de notre mieux pour rester à jour mais ne pouvons pas garantir l'exactitude. Vérifiez toujours avec l'ambassade ou le consulat officiel de votre destination avant de voyager. Nous ne sommes pas conseillers en immigration et ne sommes pas responsables des décisions prises à la frontière.",
  },
  es: {
    title: "Esto es información, no asesoramiento migratorio.",
    body:
      "Las normas de visa y frontera cambian con frecuencia y dependen de tu nacionalidad, propósito y ruta de entrada. Hacemos nuestro mejor esfuerzo por mantenernos al día pero no podemos garantizar exactitud. Verifica siempre con la embajada o consulado oficial de tu destino antes de viajar. No somos asesores migratorios y no somos responsables de decisiones tomadas en la frontera.",
  },
};

export function VisaDisclaimer({ locale = "en" }: { locale?: string }) {
  const { title, body } = COPY[locale] ?? COPY.en;
  return (
    <aside
      role="note"
      aria-label="Visa and border disclaimer"
      style={{
        background: "#fef2f2",
        borderLeft: "4px solid #dc2626",
        padding: "14px 16px",
        margin: "24px 0",
        borderRadius: 4,
      }}
    >
      <strong style={{ color: "#7f1d1d", display: "block", marginBottom: 6 }}>
        {title}
      </strong>
      <p style={{ color: "#7f1d1d", fontSize: 14, margin: 0, lineHeight: 1.5 }}>{body}</p>
    </aside>
  );
}
```

Rule: if a page mentions any of `visa`, `Schengen`, `border`, `entry requirement`, `nomad visa`, `residence permit` — render this component immediately after the H1.

---

## 6. Price claim disclaimer

The "from €X" problem: if prices are stale, a regulator or a reader can treat it as misleading. Fix with inline language + a sitewide Terms clause (already in §5 above).

### Inline component: `PriceDisclaimer.tsx`

Small badge next to any displayed price:

```tsx
// apps/web/src/components/legal/PriceDisclaimer.tsx

type Props = {
  locale?: string;
  lastUpdated?: Date; // show staleness honestly
};

const COPY: Record<string, (date?: string) => string> = {
  en: (d) => `Estimate${d ? ` (last checked ${d})` : ""} — verify live on booking partner`,
  de: (d) => `Schätzung${d ? ` (zuletzt geprüft ${d})` : ""} — aktuellen Preis beim Partner prüfen`,
  fr: (d) => `Estimation${d ? ` (dernière vérif. ${d})` : ""} — vérifiez le prix réel chez le partenaire`,
  es: (d) => `Estimación${d ? ` (última comprobación ${d})` : ""} — verifica el precio real con el socio`,
};

export function PriceDisclaimer({ locale = "en", lastUpdated }: Props) {
  const date = lastUpdated?.toISOString().slice(0, 10);
  const text = (COPY[locale] ?? COPY.en)(date);
  return (
    <small
      style={{
        color: "#64748b",
        fontSize: 12,
        display: "inline-block",
        marginLeft: 8,
      }}
    >
      {text}
    </small>
  );
}
```

Use next to any rendered price:

```tsx
<span>From €180/night <PriceDisclaimer locale="en" lastUpdated={property.lastSyncedAt} /></span>
```

And in your `properties.price_estimate_eur` rendering, always show `lastSyncedAt`. If `lastSyncedAt` > 30 days old, hide the price entirely and show "Check current price".

---

## 7. Contact / imprint / business identity section

EU DSA (Digital Services Act, applies to any site reachable from the EU) + GDPR require identifiable controller info. Germany specifically requires an Impressum if you market to DE. Even France's LCEN has a similar requirement.

### Footer requirements (every page)

```
WhereToStayEurope is operated by [YOUR LEGAL NAME / ENTITY]
[Registered address, city, country]
[Trade register number, if applicable]
Contact: hello@wheretostayeurope.com
[VAT number, if registered]

Privacy Policy · Terms of Use · Affiliate Disclosure · Contact
```

### `/contact/` page

Dedicated page with:
- Business name and registered address
- Email (hello@ and privacy@)
- Trade register entry if incorporated
- VAT number if registered
- DSA contact point: "Requests under the EU Digital Services Act: dsa@wheretostayeurope.com"
- A simple contact form (with honeypot and rate limit — Turnstile is already in your stack)

### Schema markup for contact

On the contact page AND in sitewide footer JSON-LD:

```jsonld
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WhereToStayEurope",
  "url": "https://wheretostayeurope.com",
  "email": "hello@wheretostayeurope.com",
  "founder": { "@type": "Person", "name": "[Your Name]" },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "hello@wheretostayeurope.com",
      "availableLanguage": ["English", "German", "French", "Spanish"]
    },
    {
      "@type": "ContactPoint",
      "contactType": "privacy",
      "email": "privacy@wheretostayeurope.com"
    }
  ],
  "areaServed": ["Europe", "Turkey"]
}
```

**If you plan to market to Germany at all:** add a full Impressum page at `/impressum/` using eRecht24 or Impressum-Generator to draft. German courts have awarded costs for missing Impressum; it's a cottage-industry legal bully. Don't skip this if you ship DE locale.

---

## 8. Insurance recommendation disclaimer

Insurance is a regulated product in every EU member state (IDD — Insurance Distribution Directive). You can refer readers to insurance providers as an affiliate WITHOUT being licensed, but ONLY if:

1. You don't give advice on which product someone should buy
2. Your content is framed as information/comparison, not recommendation
3. You don't collect information from users to match them to a policy
4. You disclose the affiliate relationship (already covered in §3)

### Inline disclaimer for any insurance content

```tsx
// apps/web/src/components/legal/InsuranceDisclaimer.tsx

const COPY: Record<string, string> = {
  en: "We are not licensed insurance advisers. The content below is informational only and reflects our comparison of publicly available products. Always read the policy document and terms before purchasing. Your needs may differ from ours; consult a licensed adviser if you're unsure.",
  de: "Wir sind keine lizenzierten Versicherungsberater. Der folgende Inhalt dient nur zur Information und spiegelt unseren Vergleich öffentlich zugänglicher Produkte wider. Lies vor dem Kauf immer das Versicherungsdokument und die Bedingungen. Deine Bedürfnisse können abweichen; ziehe im Zweifel einen lizenzierten Berater hinzu.",
  fr: "Nous ne sommes pas conseillers en assurance agréés. Le contenu ci-dessous est uniquement informatif et reflète notre comparaison de produits disponibles publiquement. Lisez toujours la police et les conditions avant l'achat. Vos besoins peuvent différer des nôtres ; consultez un conseiller agréé en cas de doute.",
  es: "No somos asesores de seguros autorizados. El siguiente contenido es solo informativo y refleja nuestra comparación de productos disponibles públicamente. Lee siempre la póliza y los términos antes de comprar. Tus necesidades pueden diferir de las nuestras; consulta con un asesor autorizado si tienes dudas.",
};

export function InsuranceDisclaimer({ locale = "en" }: { locale?: string }) {
  return (
    <aside
      role="note"
      aria-label="Insurance disclaimer"
      style={{
        background: "#eff6ff",
        borderLeft: "4px solid #2563eb",
        padding: "14px 16px",
        margin: "24px 0",
        borderRadius: 4,
        fontSize: 14,
        color: "#1e3a8a",
      }}
    >
      {COPY[locale] ?? COPY.en}
    </aside>
  );
}
```

Render at top of: any travel-insurance comparison page, any "should I buy X insurance" page, every Airalo/eSIM content that drifts into coverage territory.

### Avoid these phrasings in insurance content

- ❌ "We recommend you buy [specific policy]"
- ❌ "This is the right plan for families"
- ❌ "You should buy this before you travel"
- ✅ "Here's how [Product A] and [Product B] compare"
- ✅ "Travelers often choose [X] for [reason]. Read the full policy to confirm fit."
- ✅ "This is what SafetyWing covers, per their published terms."

---

## Implementation sequence (paste into plan)

| Block | Add to work plan |
|---|---|
| **Block 1 (infra)** | Register business entity decision. Set up `hello@`, `privacy@`, `dsa@` email aliases. |
| **Block 2 (data model)** | Create `/privacy`, `/terms`, `/affiliate-disclosure`, `/contact`, `/impressum` (if targeting DE) page stubs in Payload Pages collection. |
| **Block 3 (first cluster)** | **Hard blocker before first affiliate link goes live:** all 4 legal pages published (EN); `AffiliateDisclosureBanner` component on every page with affiliate links; footer imprint live; `CookieNotice` component rendering; Organization schema JSON-LD in root layout. |
| **Block 4 (templating)** | Add `VisaDisclaimer`, `PriceDisclaimer`, `InsuranceDisclaimer` components to relevant templates. Add `rel="sponsored nofollow"` to all affiliate `<a>` tags as a helper in `booking.ts`. |
| **Block 5+ (locales)** | Translate all 4 legal pages into DE/FR/ES as locales come online. **No locale launches without translated legals.** |

---

## Ongoing compliance watchlist

| Item | Review cadence | Owner |
|---|---|---|
| Privacy Policy content | Annually + on any new third-party integration | You |
| Affiliate partner list in disclosure | At each new partner approval | You |
| Cookie notice copy | On any change to analytics stack | You |
| `lastUpdated` dates on legal pages | On every substantive edit | You |
| Insurance content phrasing | Annually | You |
| Visa content pages | Annually (and on Schengen rule changes; currently ETIAS rollout is ongoing) | You |
| Impressum accuracy | On every address / entity change | You |

---

## Updates to `rel` attribute on affiliate links

Add this helper to `lib/affiliate/booking.ts` (and every other affiliate builder):

```ts
// Required attributes for affiliate links (Google Search Essentials + FTC)
export const AFFILIATE_LINK_ATTRS = {
  rel: "sponsored nofollow noopener",
  target: "_blank",
} as const;
```

Every `<a>` that points to a commission URL must use these. Enforce via a `<AffiliateLink>` wrapper component so no one forgets.

---

## Nice-to-have (year 2)

- **DPIA (Data Protection Impact Assessment)** if you ever add behavioral tracking or profiling.
- **SCCs (Standard Contractual Clauses)** if you ever process EU user data via a non-EU processor.
- **ICO registration** if you target UK users — £40/yr, quick online form, required for any site processing UK personal data.
- **Accessibility statement** under EN 301 549 / EAA 2025 — becomes a hard EU requirement in late 2025 for many site categories. Publish one as a matter of course.

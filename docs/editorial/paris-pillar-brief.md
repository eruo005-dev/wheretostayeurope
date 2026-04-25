# Paris City Pillar — Content Brief + Draft

Format: brief at top (intent, queries, links, schema, monetization, unverifiable claims flagged), then the full outline, then a draft opening in your voice.

---

## Brief

**URL:** `/en/france/paris/`
**Title:** Where to Stay in Paris: A Neighborhood Guide by Trip Type
**Meta description:** The 10 Paris neighborhoods worth considering — what each is actually like, who should stay there, and who should skip. Honest guide by arrondissement and trip type. (155 chars)
**Tier:** 1 (editorial flagship, handwritten)
**Word count target:** 3,500–4,500
**Display read time:** show "12 min read" near title

### Target queries

| Query | Vol est (mo) | Conf | Diff | Role |
|---|---|---|---|---|
| where to stay in paris | 30–50k | HIGH | HIGH | primary |
| best area to stay in paris | 10–20k | HIGH | HIGH | secondary |
| best area to stay in paris first time | 5–10k | HIGH | MED-HIGH | secondary |
| best arrondissement paris | 2–5k | HIGH | MED | secondary |
| paris neighborhoods for tourists | 1–3k | MED | MED | secondary |
| paris neighborhoods map | 2–4k | HIGH | MED | supports with custom map |
| where not to stay in paris | 1–3k | MED | LOW-MED | routed to contrarian subpage |

**All volumes: unverified. Validate in Ahrefs / Semrush / GKP before committing.**

### Search intent

Pre-booking decision. Reader has decided to visit Paris and is narrowing 20 arrondissements to a shortlist of 2–3 they'll actually search hotels in. They're not looking for attraction lists, restaurant recs, or packing tips — pure decision-layer content.

### SERP competitors to beat

- **Booking.com** — generic destination page, thin on neighborhood judgement
- **TripAdvisor** — forum snippets, poor structure
- **The Points Guy, Nomadic Matt, Adventurous Kate** — strong affiliate sites, but mostly dated post-2019
- **Condé Nast / Time Out Paris** — editorial authority but light on booking-decision framing

### Angle to win

1. **Honest "who should skip this neighborhood"** for every area (no competitor does this — they all sell every neighborhood as wonderful)
2. **Decision matrix before the scroll-wall.** First screen answers the question; the rest is why.
3. **Post-Olympics-2024 reality.** Call out what's changed. Most competitors are still running 2019 advice.

### Internal links (required, ≥12)

- 6 neighborhood deep-dives (Marais, Saint-Germain, Latin Quarter, Montmartre, Opéra/9e, Batignolles) — in-text contextual anchors
- 5 trip-type pages (couples, families, solo, budget, luxury) — in-text + sidebar
- 2 comparison pages (Marais vs Saint-Germain; Montmartre vs Latin Quarter)
- 1 contrarian: "Where NOT to stay in Paris"
- 1 breadcrumb: France country hub

### Schema markup

```jsonld
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Europe", "item": "/en/" },
        { "@type": "ListItem", "position": 2, "name": "France", "item": "/en/france/" },
        { "@type": "ListItem", "position": 3, "name": "Paris" }
      ]
    },
    {
      "@type": "TouristDestination",
      "name": "Paris",
      "description": "...",
      "touristType": ["first-time visitors","couples","families","solo travelers","luxury","budget"],
      "geo": { "@type": "GeoCoordinates", "latitude": 48.8566, "longitude": 2.3522 },
      "containsPlace": [ /* top 10 neighborhoods as LandmarksOrHistoricalBuildings */ ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [ /* 5 FAQs from the FAQ section */ ]
    }
  ]
}
```

### Monetization slots

| # | Slot | Placement | Partner |
|---|---|---|---|
| 1 | GYG "must-book-ahead Paris" widget | after intro, before neighborhoods | GetYourGuide |
| 2 | Booking "search Paris hotels" CTA | sidebar, sticky on desktop | Booking.com |
| 3 | Per-neighborhood "see hotels in [X]" CTA | end of each H3 | Booking.com (10×) |
| 4 | eSIM affiliate | "Getting around Paris" section | Airalo |
| 5 | Travel insurance | FAQ section or trip-timing | SafetyWing or Heymondo |
| 6 | Email capture: "Paris Neighborhood Cheat Sheet (PDF)" | after cheat-sheet table + after FAQ | own list (Listmonk) |

### Custom visualizations required

From the moat component library:

1. **Paris neighborhoods map** — Mapbox GL, all 10 neighborhoods clickable to deep-dives. Render from `neighborhoods.polygon`.
2. **Trip-type fit matrix** — interactive; pick "couples / families / solo / budget / luxury" → highlights which neighborhoods match (pulls from `neighborhoods.trip_type_fit`).
3. **Price-band distribution strip per neighborhood** — inline in each H3 block (rendered from `properties.price_band` aggregate).

### Images

- 1 hero: Paris scenic via Unsplash. **Avoid Eiffel Tower cliché.** Candidates: rooftops + zinc, Haussmann façades, Canal Saint-Martin, cobblestone Marais.
- 1 per neighborhood H3: Unsplash search by neighborhood name, human-reviewed for accuracy (Unsplash mislabels Paris neighborhoods constantly — flag this).
- 1 cheat-sheet visualization (custom).

All images: attribution rendered via `<figcaption>` with photographer + Unsplash/Pexels link. `media.source` field tracks origin.

### Unverifiable claims to flag for source-check before publish

- Current state of 10e and 18e safety boundaries (post-2024 shifts)
- Whether Porte de Clichy / Porte de la Villette area warnings are still current
- Any specific nightly price ranges mentioned (use "from €X" phrasing or pull live from `properties.price_estimate_eur`)
- Navigo / metro pricing if mentioned — rates change annually
- Post-Olympics 2024 gentrification or infrastructure claims
- Any "recently opened" venue mentions — set a 6-month review cadence

---

## Outline (H1/H2/H3 structure)

**H1:** Where to Stay in Paris: A Neighborhood Guide by Trip Type

**Opening (200–250 words):** TLDR answer upfront. First-timers → Marais or Latin Quarter. Couples → Saint-Germain. Atmosphere → Montmartre. Skip Champs area, skip north of Gare du Nord at night, skip Porte de Clichy.

**H2:** The Paris neighborhood cheat sheet
- Interactive table: 10 neighborhoods × columns [Vibe, Price tier, Best for, Worst for, Nearest metro]
- Email capture CTA below table (offering printable PDF version)

**H2:** How Paris is laid out (the arrondissement system in 90 seconds)
- H3: What the numbers mean (spiral from 1st outward)
- H3: Right bank vs Left bank — does it matter in 2026?
- Paris neighborhoods map (custom Mapbox visualization)

**H2:** The neighborhoods worth considering
- H3: Le Marais (3e + 4e) — for first-timers who want to walk everywhere
- H3: Saint-Germain-des-Prés (6e) — for the "I want old Paris" traveler
- H3: Latin Quarter (5e) — for history, students, budget-conscious first-timers
- H3: Montmartre (18e) — for atmosphere, with caveats
- H3: Opéra / Grands Boulevards (9e) — for shopping + transit convenience
- H3: Le 11e (Oberkampf / Bastille) — for second-time visitors who want local life
- H3: Batignolles (17e) — for the "I'd rather not see another tourist" traveler
- H3: La Défense — if your conference is there and only then

Each H3 block structure (enforce as template):
1. Who it's for (one sentence)
2. Who should skip it (one sentence — this is the differentiator)
3. Price tier + typical hotel band
4. Metro access (nearest stations + airport time)
5. 2–3 specific streets or sub-pockets worth knowing
6. 1 image (Unsplash)
7. CTA: "See hotels in [neighborhood]" → Booking.com affiliate deep-link
8. Internal link: "Full [neighborhood] guide →" to Tier 2 deep-dive

**H2:** Paris neighborhoods to think twice about
- H3: Champs-Élysées area (8e) — expensive, touristy, not that fun
- H3: Gare du Nord / northern 10e — convenient for Eurostar, rough at night
- H3: Porte de Clichy / Porte de la Villette — cheap but don't
- Link to "Where NOT to stay in Paris" contrarian piece for full treatment

**H2:** Where to stay in Paris by trip type
- H3: Couples → Marais, Saint-Germain, Montmartre
- H3: Families → 5e, 6e, 16e
- H3: Solo travelers → Marais, 11e, Latin Quarter
- H3: Budget → 10e (south), 20e, 11e
- H3: Luxury → 1e, 8e, 7e
- H3: Business → Opéra, La Défense
- Each sub-section: 2–3 sentences + link to trip-type flagship page

**H2:** How long should you stay in each area?
- H3: 3 days: one base, stay central
- H3: 5 days: one base still, pick Marais or Saint-Germain
- H3: 7+ days: consider splitting between two neighborhoods

**H2:** Getting around Paris
- H3: Metro — still the answer in 2026
- H3: When walking beats the metro
- H3: Taxis and rideshare (Bolt, Uber) — when it's worth it
- **Slot:** Airalo eSIM CTA

**H2:** Paris trip timing — which neighborhood works in which season
- H3: Spring (April–May)
- H3: Summer (June–August) — crowds + AC reality check
- H3: Fall (September–October)
- H3: Winter (November–February) — why this is actually a good time to book Paris
- **Slot:** travel insurance CTA in winter/shoulder section

**H2:** Frequently asked about Paris neighborhoods
- H3: Which Paris neighborhood is safest at night?
- H3: Is Montmartre safe?
- H3: Where should I NOT stay in Paris?
- H3: How close to the Eiffel Tower should I stay?
- H3: What's the cheapest safe neighborhood in Paris?
- FAQPage schema wraps this section

**Closing:**
- "Still can't decide?" CTA block with links to the 5 trip-type flagships
- Email capture (second instance — different copy from the one after cheat-sheet)

---

## Draft — Opening (to be copy-edited, not replaced)

Paris has 20 arrondissements. You don't need to understand all of them. You need to pick one of about five that'll make your trip good, avoid the two or three that'll make it worse, and ignore the rest.

Here's the short version. If it's your first trip: Le Marais (3e/4e) or the Latin Quarter (5e). Couples who want something quieter: Saint-Germain (6e). Atmosphere hunters with legs that work on hills: Montmartre (18e). Second-time visitors ready to leave the tourist loop: the 11e. Business travelers with a fixed meeting at La Défense: stay at La Défense, not in central Paris pretending the RER A is fine at 8am.

Skip the Champs-Élysées area unless you're specifically there to shop. Skip anything north of Gare du Nord after dark. Don't book near Porte de Clichy no matter how cheap the hotel looks.

That's the whole answer. The rest of this page is why, and how to pick between those shortlisted options based on the kind of trip you're having.

One note on what's changed: Paris post-Olympics 2024 is not the same city it was in 2019. Some neighborhoods cleaned up and prices climbed with them. Others are still catching up. Where I'm calling a neighborhood worth considering or worth skipping, I'm working off 2025–2026 reality — not the pre-pandemic advice you'll find recycled on older sites.

*[Insert: interactive Paris neighborhoods map here — clickable, deep-links to each neighborhood's full guide]*

---

## Draft — Section sample (Le Marais H3, to establish template voice)

### Le Marais (3e + 4e) — for first-timers who want to walk everywhere

**Who it's for:** First-time Paris visitors who want to be able to walk to the Louvre, Notre-Dame, and Place des Vosges without thinking about the metro. Couples on a long weekend. Anyone who cares about design shops, small galleries, and late dinners.

**Who should skip it:** Light sleepers (the 4e gets loud on weekend nights until 2am). Drivers — parking is miserable. Anyone who wants a pool or a hotel gym; Marais hotels are old and small by design.

**Price band:** €€€ — mid-range Marais boutique hotels run €180–280/night in 2026; budget drops off hard below €150 in this area.

**Metro:** Saint-Paul (1), Hôtel de Ville (1/11), Chemin Vert (8), Rambuteau (11). CDG airport: 45–55 min on RER B + metro, or €55–75 taxi.

**Streets worth knowing:** rue des Francs-Bourgeois (shopping spine), rue Vieille-du-Temple (bars, restaurants), rue des Rosiers (historic Jewish quarter, best falafel lines on the continent), rue de Sévigné (quieter residential edge).

*[Image: Unsplash — "marais paris" | alt: "Narrow street in Le Marais with boutique shopfronts"]*

*[Price-band distribution visualization: 4 bars from $ to $$$$ showing where Marais properties cluster]*

→ [Full Marais deep-dive: what to eat, where to drink, neighborhood map](/en/france/paris/le-marais/)
→ [See hotels in Le Marais on Booking.com](affiliate:booking:neighborhood=le-marais)

---

## Production notes

- Entire page is written in one voice pass (you), not assembled from AI drafts. Tier 1 flagship rule.
- Every H3 under "neighborhoods worth considering" uses the exact 8-element template above. Consistency = scale.
- Neighborhood H3 blocks are the unit of content reuse — the same block renders compacted in the cheat-sheet table at the top.
- After publish: set `pages.last_reviewed_at` = publish date, `pages.status` = 'published'. Set 6-month review cadence reminder.
- Before publish: run through the "unverifiable claims" list above with a current source for each flagged item.

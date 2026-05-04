// apps/web/src/lib/data/static-data-comparisons.ts
//
// Head-to-head neighborhood comparison pages — the content moat aggregators
// can't write. Each entry resolves to /[locale]/[country]/[city]/compare/[slug].
//
// Voice rules (match the rest of static-data.ts):
//   - Decisive: name a winner per dimension or say "tied" honestly.
//   - Concrete: minutes-walk, price deltas, specific landmarks, not vibe-talk.
//   - Honest: every entry must have at least one "skip this if" line.
//   - No hedge words ("perhaps", "might be", "for some travelers").

import type { StaticNeighborhood } from "./static-data";
import { ALL_NEIGHBORHOODS, findNeighborhood } from "./static-data";

export type ComparisonRound = {
  /** Short label, shown as the row heading. */
  question: string;
  /** "a" | "b" | "tied" — drives the visual winner badge. */
  winner: "a" | "b" | "tied";
  /** 1-2 sentences of why. Editorial voice — name specifics, not vibe. */
  body: string;
};

export type ComparisonFAQ = { q: string; a: string };

export type StaticComparison = {
  /** URL slug, format: "{a-slug}-vs-{b-slug}" — case-sensitive, lowercase only. */
  slug: string;
  citySlug: string;
  countrySlug: string;
  /** References into ALL_NEIGHBORHOODS — both must resolve. */
  aSlug: string;
  bSlug: string;
  /** Display labels (can be shorter than the neighborhood name). */
  aLabel: string;
  bLabel: string;
  metaTitle: string;
  metaDescription: string;
  /** 2-3 sentence editorial lead, sets the question this page answers. */
  intro: string;
  /** Round-by-round breakdown, ~6 dimensions per page. */
  rounds: ComparisonRound[];
  /** "Pick A if…" — a single decisive paragraph, no list of vague factors. */
  pickA: string;
  pickB: string;
  /** 1-2 sentence final verdict. */
  bottomLine: string;
  /** Optional FAQ for FAQPage schema. */
  faq?: ComparisonFAQ[];
};

export const COMPARISONS: StaticComparison[] = [
  // =========================================================================
  // PARIS
  // =========================================================================
  {
    slug: "le-marais-vs-saint-germain",
    citySlug: "paris",
    countrySlug: "france",
    aSlug: "le-marais",
    bSlug: "saint-germain-des-pres",
    aLabel: "Le Marais",
    bLabel: "Saint-Germain",
    metaTitle: "Le Marais vs Saint-Germain: Where to Stay in Paris",
    metaDescription:
      "Le Marais (3rd/4th) or Saint-Germain (6th)? Honest, dimension-by-dimension comparison: vibe, walkability, restaurants, price, who should pick which.",
    intro:
      "These are the two neighborhoods first-time Paris travelers default to, and they read very differently in person. Le Marais is the Right Bank's design-and-dinner district; Saint-Germain is the Left Bank's literary-and-museum one. Most people pick on instinct from a film. The right pick is more boring than that.",
    rounds: [
      {
        question: "Vibe",
        winner: "tied",
        body: "Marais is younger, livelier, queer-friendly, dinner-dense. Saint-Germain is older, slower, café-and-bookshop, walking-tour-popular. Neither is wrong; they aim at different trips.",
      },
      {
        question: "First-timer convenience",
        winner: "b",
        body: "Saint-Germain wins. The Louvre is a 15-min walk across the Pont du Carrousel, Musée d'Orsay is 10 min along the river, Notre-Dame is 12 min east. Marais is closer to the Pompidou but further from everything Left Bank.",
      },
      {
        question: "Restaurants and evenings",
        winner: "a",
        body: "Marais wins decisively — the rue de Bretagne, rue des Archives and rue Vieille du Temple are dinner-and-cocktail dense; Saint-Germain's restaurants close earlier and lean tourist-priced.",
      },
      {
        question: "Price",
        winner: "a",
        body: "Marais runs €180-€350/night for a decent central hotel; Saint-Germain runs €240-€500 for the same product. The 6th's prestige tax is real.",
      },
      {
        question: "Quiet sleep",
        winner: "b",
        body: "Saint-Germain wins — the bar streets in Marais (rue des Archives especially) stay loud until 2am most nights. Saint-Germain quiets after 11pm even on weekends.",
      },
      {
        question: "Walkability to museums",
        winner: "b",
        body: "Saint-Germain is genuinely closer to the Louvre, Orsay and the Rodin Museum — three of Paris's top five sights. Marais is closer to the Pompidou and Picasso Museum, which most first-timers skip.",
      },
    ],
    pickA:
      "Pick Marais if you're under 45, want dinner and drinks within a 5-minute walk of bed, and don't mind weekend bar noise. The neighborhood is a better experience than Saint-Germain at night, and 25-30% cheaper for an equivalent hotel.",
    pickB:
      "Pick Saint-Germain if you're over 45, are doing a museum-heavy first trip, want quiet evenings, or want the Paris of Hemingway and the cinema. You will pay for the pedigree.",
    bottomLine:
      "Marais is the better trip; Saint-Germain is the better postcard. Most readers under 45 should book Marais. Most readers over 55 should book Saint-Germain.",
    faq: [
      {
        q: "Is Le Marais walkable to the Eiffel Tower?",
        a: "Not really — it's 50+ minutes on foot or 25 minutes by metro (Line 1 to Charles de Gaulle–Étoile, then Line 6). Saint-Germain is closer (40 min walk, 15 min metro).",
      },
      {
        q: "Which has better breakfast?",
        a: "Marais — the Jewish Quarter (rue des Rosiers) is the only place in central Paris where breakfast is treated seriously. Saint-Germain runs on hotel buffets and Café de Flore overpriced croissants.",
      },
      {
        q: "Which is safer for solo female travelers at night?",
        a: "Both are very safe by Paris standards. Saint-Germain is quieter so it feels safer; Marais has more foot traffic late so you're never alone on the street.",
      },
    ],
  },
  {
    slug: "le-marais-vs-bastille",
    citySlug: "paris",
    countrySlug: "france",
    aSlug: "le-marais",
    bSlug: "bastille",
    aLabel: "Le Marais",
    bLabel: "Bastille",
    metaTitle: "Le Marais vs Bastille: Which Paris Neighborhood Wins?",
    metaDescription:
      "Le Marais (3rd/4th) versus Bastille (11th): walkability, restaurants, price, who should pick which. The honest neighborhood comparison.",
    intro:
      "Marais is the polished, design-shop, tourist-on-purpose version of central Paris. Bastille (the 11th) is rougher, younger, and where Parisians actually go out on weekends. The choice is less about which is better and more about which trip you're on.",
    rounds: [
      {
        question: "Central-ness",
        winner: "a",
        body: "Marais is genuinely central — Notre-Dame, the Louvre and Île Saint-Louis are all under 15 minutes on foot. Bastille puts you 20-25 min from any first-time sight; you'll use the metro daily.",
      },
      {
        question: "Restaurants and food",
        winner: "b",
        body: "Bastille wins. Rue de Charonne, rue de la Roquette and the area around Marché d'Aligre have the best mid-priced dinner density in Paris. Marais leans more toward design-restaurant pricing.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Bastille — fewer tourists, more Parisians, weekday evenings feel like a city you live in rather than visit. Marais feels notably touristy by 11am most days.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Bastille hotels run 25-35% cheaper than Marais for equivalent product. A €200 Marais hotel rebrands as €145 in Bastille without a meaningful drop in walkability.",
      },
      {
        question: "Sleep quality",
        winner: "tied",
        body: "Both are loud on weekend nights — Marais on rue des Archives, Bastille around rue de Lappe. Pick a side street in either.",
      },
      {
        question: "Best for short trips",
        winner: "a",
        body: "Marais. If you have 3 nights or fewer, the saved metro time alone justifies the higher price.",
      },
    ],
    pickA:
      "Pick Marais if it's your first time in Paris and you have 3 nights or fewer. The location pays you back in saved metro time, walking-distance sights, and the very high atmospheric quality you came for.",
    pickB:
      "Pick Bastille if it's your second-or-later visit, you're staying 4+ nights, you eat out twice a day, or you want a less touristy stay at noticeably lower prices. The trade is being 20 min from Notre-Dame instead of 10.",
    bottomLine:
      "First trip, short stay, sights-heavy: Marais. Second trip, longer stay, dinner-heavy: Bastille. The 11th is consistently underrated by first-time travelers.",
  },

  // =========================================================================
  // ROME
  // =========================================================================
  {
    slug: "centro-storico-vs-trastevere",
    citySlug: "rome",
    countrySlug: "italy",
    aSlug: "centro-storico",
    bSlug: "trastevere",
    aLabel: "Centro Storico",
    bLabel: "Trastevere",
    metaTitle: "Centro Storico vs Trastevere: Where to Stay in Rome",
    metaDescription:
      "The canonical Rome question. Compare Centro Storico (Pantheon, Piazza Navona) against Trastevere across walkability, dinner, price, and noise.",
    intro:
      "Every first-time-Rome traveler ends up between these two. Centro Storico — the historic center around the Pantheon and Piazza Navona — is the maximum-sights stay. Trastevere is the across-the-Tiber dinner-and-atmosphere stay. The honest answer to which wins depends almost entirely on how many nights you're booking.",
    rounds: [
      {
        question: "Walking distance to sights",
        winner: "a",
        body: "Centro Storico wins by a wide margin. The Pantheon, Piazza Navona, Campo de' Fiori and Trevi Fountain are all under 10 minutes on foot. The Vatican is 20 min west; the Colosseum is 20 min east. Trastevere adds 15-25 min to most trips.",
      },
      {
        question: "Dinner and evenings",
        winner: "b",
        body: "Trastevere wins decisively. The streets behind Piazza Santa Maria are dinner-restaurant dense, prices are 20-30% lower than Centro Storico, and the neighborhood actually empties out and quiets between meals — not the case in Centro Storico, which stays touristy until midnight.",
      },
      {
        question: "Authentic Rome feel",
        winner: "b",
        body: "Trastevere. Centro Storico is overwhelmingly tourist-managed by mid-morning; rents have pushed most Romans out. Trastevere still has working-class residents and trattorias that aren't gimmicks.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Trastevere hotels run €150-€280/night for a comfortable central choice; Centro Storico runs €220-€450 for the same. The Pantheon view is a €100-200/night premium.",
      },
      {
        question: "Transit access",
        winner: "a",
        body: "Centro Storico is closer to most metro stops (Spagna, Barberini). Trastevere has no metro at all — you walk, take a tram, or Uber. Not crippling, but real.",
      },
      {
        question: "Best for first-timers",
        winner: "a",
        body: "Centro Storico. If you have 3 nights or fewer and a sights-heavy list, the saved walking time genuinely changes the trip. Trastevere becomes the right call from night four onward.",
      },
    ],
    pickA:
      "Pick Centro Storico if it's your first Rome trip, you have 3 nights or fewer, you have mobility limits, or you specifically want to step out of your hotel and see the Pantheon. You'll pay for it.",
    pickB:
      "Pick Trastevere if it's your second Rome trip, you're staying 4+ nights, you prioritize dinner over morning sights, or you've heard the words 'tourist trap' and want to avoid one. The 15-20 min walk to Piazza Navona is a real cost; the trade-off is everywhere else.",
    bottomLine:
      "Centro Storico is the better short trip; Trastevere is the better long trip. The third option to know about — Monti — is often the right answer for people who can't decide.",
    faq: [
      {
        q: "Is Trastevere safe at night?",
        a: "Yes. It's the city's evening district — busy, lit, full of people until 1-2am on weekends. The pickpocket density is lower than Centro Storico because the crowd is less tourist-heavy.",
      },
      {
        q: "Can I walk to the Vatican from Trastevere?",
        a: "Yes — 20-25 min along the Tiber, flat. Centro Storico is similar (25-30 min). Both are walkable; neither is right next to it.",
      },
    ],
  },
  {
    slug: "trastevere-vs-monti",
    citySlug: "rome",
    countrySlug: "italy",
    aSlug: "trastevere",
    bSlug: "monti",
    aLabel: "Trastevere",
    bLabel: "Monti",
    metaTitle: "Trastevere vs Monti: The Underrated Rome Question",
    metaDescription:
      "Skip the obvious Centro Storico. Compare Trastevere and Monti — the two neighborhoods Rome regulars actually argue about.",
    intro:
      "When repeat Rome travelers argue about where to stay, this is the argument. Both are central-but-not-too-central. Both are food-dense. The difference is geography: Trastevere is across the river facing the old core; Monti is between the Forum and Termini, hilly, design-shop heavy.",
    rounds: [
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Trastevere is bohemian, restaurant-dense, weekend-loud. Monti is design-led, calmer on weekday nights, with a slightly more curated feel. Both are atmospheric — the contrast is restaurant noise versus hipster boutique.",
      },
      {
        question: "Walking distance to the Colosseum",
        winner: "b",
        body: "Monti wins decisively. The Colosseum is a 5-10 min walk; the Forum entrance is closer. From Trastevere it's 25-30 min on foot or a tram + walk.",
      },
      {
        question: "Walking distance to Centro Storico sights",
        winner: "a",
        body: "Trastevere is 12-15 min to the Pantheon; Monti is 20-25 min. If your sights list is more Pantheon-heavy than Colosseum-heavy, Trastevere wins.",
      },
      {
        question: "Dinner density",
        winner: "a",
        body: "Trastevere — the streets behind Piazza Santa Maria have 5x the restaurants per block of Monti. Monti has good dinner; Trastevere has *more* good dinner.",
      },
      {
        question: "Hills and walkability",
        winner: "a",
        body: "Trastevere is mostly flat. Monti is genuinely hilly — Via Cavour and Via Panisperna both climb. With a heavy suitcase, Monti is annoying on day one.",
      },
      {
        question: "Quiet sleep",
        winner: "b",
        body: "Monti is the calmer night. Trastevere's bar zone runs late on weekends — picking a side street helps but doesn't fully solve it. Monti's noise is mostly weekday-restaurant, ending by 11pm.",
      },
    ],
    pickA:
      "Pick Trastevere if your trip is dinner-and-walking heavy, you're prioritizing the Pantheon and Vatican over the Colosseum, and you don't mind some weekend noise. It's the higher-energy, food-denser option.",
    pickB:
      "Pick Monti if you're prioritizing the Colosseum and Forum, value design hotels and curated boutiques, want quieter weeknights, and don't mind hills. It's the calmer, more orderly option.",
    bottomLine:
      "Roma sights tilted Colosseum/Forum: Monti. Roma trip tilted Pantheon/Vatican/dinner: Trastevere. Most second-time visitors should rotate — one trip each.",
  },

  // =========================================================================
  // BARCELONA
  // =========================================================================
  {
    slug: "eixample-vs-barri-gotic",
    citySlug: "barcelona",
    countrySlug: "spain",
    aSlug: "eixample",
    bSlug: "barri-gotic",
    aLabel: "Eixample",
    bLabel: "Barri Gòtic",
    metaTitle: "Eixample vs Barri Gòtic: Where to Stay in Barcelona",
    metaDescription:
      "The first decision every Barcelona traveler makes. Compare Eixample's grid against Barri Gòtic's medieval streets across price, sleep, walkability and crowds.",
    intro:
      "Most first-time Barcelona travelers choose between these two and make the wrong call. Barri Gòtic looks like the photos — narrow medieval streets, the cathedral, all of it. Eixample looks like nothing — a 19th-century grid. The grid usually wins.",
    rounds: [
      {
        question: "Atmosphere",
        winner: "b",
        body: "Barri Gòtic. If you came to Barcelona to walk through medieval alleys with the cathedral around the corner, you don't get that in Eixample. Eixample looks like Manhattan with better food.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Eixample wins easily. The wide streets and modern apartment buildings have working soundproofing. Barri Gòtic's narrow streets channel bar noise upward and the medieval buildings transmit every voice. Light sleepers should not book Gòtic.",
      },
      {
        question: "Restaurants",
        winner: "a",
        body: "Eixample. The carrer d'Aribau, Esquerra de l'Eixample, and the streets around Mercat de Sant Antoni are where Barcelona actually eats. Barri Gòtic restaurants are mostly tourist menus at tourist prices.",
      },
      {
        question: "Walkability to sights",
        winner: "tied",
        body: "Barri Gòtic puts you walking distance to the cathedral and Picasso Museum. Eixample puts you walking distance to Casa Batlló, La Pedrera and the Sagrada Família. Both work — depends which sights matter more.",
      },
      {
        question: "Pickpocket exposure",
        winner: "a",
        body: "Eixample is dramatically safer for valuables. Barri Gòtic, especially the streets between Plaça Reial and Las Ramblas, is one of Europe's worst pickpocket zones. This is a real consideration, not a stereotype.",
      },
      {
        question: "Price",
        winner: "tied",
        body: "Both run €130-€280/night for a comfortable mid-range hotel. Eixample has more high-end product; Barri Gòtic has more boutique-historic product.",
      },
    ],
    pickA:
      "Pick Eixample if it's a first or second Barcelona trip, you want to actually sleep at night, you eat out twice a day, and you can live with the medieval-streets fix coming from a 10-minute walk rather than your front door. This is the right call for most travelers.",
    pickB:
      "Pick Barri Gòtic if you specifically came for the medieval-alley experience and want to step out of your hotel into it, you're a heavy sleeper, and you carry cash and valuables defensively. Don't book here on a hot summer weekend without earplugs.",
    bottomLine:
      "Eixample is the right answer for ~70% of first-time Barcelona travelers. Barri Gòtic is the right answer for the 30% who specifically want to live inside the postcard and accept the noise + pickpocket cost.",
    faq: [
      {
        q: "Which is closer to Sagrada Família?",
        a: "Eixample, by a wide margin — most Eixample hotels are a 15-25 min walk. From Barri Gòtic it's 35-45 min on foot or 15 min by metro.",
      },
      {
        q: "Which is closer to the beach?",
        a: "Barri Gòtic — Barceloneta is 15 min walk from most Gòtic hotels. From Eixample, it's 25-35 min walk or 10 min metro.",
      },
    ],
  },
  {
    slug: "el-born-vs-gracia",
    citySlug: "barcelona",
    countrySlug: "spain",
    aSlug: "el-born",
    bSlug: "gracia",
    aLabel: "El Born",
    bLabel: "Gràcia",
    metaTitle: "El Born vs Gràcia: The Second-Time Barcelona Stay",
    metaDescription:
      "Already done Eixample? Choose between El Born and Gràcia — two neighborhoods regulars argue about. Honest comparison across vibe, price, walkability.",
    intro:
      "If you've already stayed in Eixample once and want a more local Barcelona, this is the choice. El Born is medieval-narrow and cocktail-dense; Gràcia is village-feel and family-restaurant-dense. They aim at different second trips.",
    rounds: [
      {
        question: "Vibe",
        winner: "tied",
        body: "Born is design-cocktail-late-night. Gràcia is independent-shop-early-dinner. Different ends of cool. Born trends younger; Gràcia trends artsy-thirties.",
      },
      {
        question: "Walking to central sights",
        winner: "a",
        body: "Born is 5 min from the cathedral, 10 min from the harbor. Gràcia is 25-30 min walk from the Gothic Quarter, or 10 min metro. If sights matter, Born wins.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Gràcia. It's a former independent village absorbed by the city, and it shows — small plaças, family-run bars, kids playing in the street. Born is local-ish but tourist-discovered.",
      },
      {
        question: "Restaurants and price",
        winner: "b",
        body: "Gràcia has cheaper, better, more local food. Carrer Verdi and the streets around Plaça del Sol are dense with €15-25 dinner spots. Born tilts toward €30-50 design restaurants.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Gràcia. Born has the same narrow-street acoustic problem as Barri Gòtic on weekends. Gràcia is meaningfully quieter except around the festivals in August.",
      },
      {
        question: "Walking to Sagrada Família",
        winner: "b",
        body: "Gràcia is 10-15 min walk; Born is 25-30 min or metro. Gràcia is also closer to Park Güell.",
      },
    ],
    pickA:
      "Pick Born if you want a more energetic Barcelona — late dinners, cocktail bars, narrow medieval streets — and a 10-minute walk to the cathedral matters. The neighborhood is denser with bars-per-block than anywhere else in the city.",
    pickB:
      "Pick Gràcia if you want a slower, more local trip — especially on a longer stay (5+ nights) where being in a real neighborhood beats being central. The metro into town is 10 minutes and trivial; what you get back is dramatically better dinner-per-euro.",
    bottomLine:
      "Short trip, energy-seeking, sights-prioritized: Born. Longer trip, local-life-seeking, dinner-prioritized: Gràcia. Most repeat Barcelona visitors end up in Gràcia.",
  },

  // =========================================================================
  // AMSTERDAM
  // =========================================================================
  {
    slug: "jordaan-vs-de-pijp",
    citySlug: "amsterdam",
    countrySlug: "netherlands",
    aSlug: "jordaan",
    bSlug: "de-pijp",
    aLabel: "Jordaan",
    bLabel: "De Pijp",
    metaTitle: "Jordaan vs De Pijp: Where to Stay in Amsterdam",
    metaDescription:
      "The two right-answers to the Amsterdam neighborhood question. Compare Jordaan's canal charm against De Pijp's dinner density across price, walkability, vibe.",
    intro:
      "These are the two neighborhoods Amsterdam regulars recommend instead of the Centrum. Jordaan is the canal-belt charm version — narrow streets, brown cafés, the Anne Frank House. De Pijp is the food-and-drinks version — Albert Cuyp Market, the city's best mid-priced dinners. Most travelers will be happy in either; the choice depends on what your trip is built around.",
    rounds: [
      {
        question: "Canal-belt postcard atmosphere",
        winner: "a",
        body: "Jordaan wins by definition — it's inside the canal belt and lives on canals. De Pijp is one tram stop south; the canals there are smaller and feel more like residential streets.",
      },
      {
        question: "Dinner and bars",
        winner: "b",
        body: "De Pijp wins decisively. The Albert Cuyp area, Gerard Doustraat, and the streets around Sarphatipark are the densest mid-priced dinner zone in Amsterdam — and 25-35% cheaper than Jordaan.",
      },
      {
        question: "Walking to museums",
        winner: "tied",
        body: "Jordaan to the Rijksmuseum: 15-20 min. De Pijp to the Rijksmuseum: 10-15 min. De Pijp is slightly closer; Jordaan is closer to the Anne Frank House. Tied with a slight De Pijp edge for the museum-heavy.",
      },
      {
        question: "Price",
        winner: "b",
        body: "De Pijp runs €160-€280/night for a comfortable mid-range hotel. Jordaan runs €220-€380 for the same product. The canal premium is 30-40%.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "De Pijp. It still functions as a working neighborhood — kids on the way to school, locals at Albert Cuyp doing their groceries. Jordaan has been gentrified into a curated experience.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Jordaan wins on weeknights. Canal-side streets are quiet, bar zones are concentrated on a few blocks. De Pijp around Sarphatipark stays animated until 1-2am most nights.",
      },
    ],
    pickA:
      "Pick Jordaan if it's your first Amsterdam trip, you came specifically for the canal-belt experience, and the photos you saw were the reason you booked. The price premium is real but you're paying for a neighborhood that lives inside the postcard.",
    pickB:
      "Pick De Pijp if it's your second Amsterdam trip, you eat out twice a day, you're traveling 4+ nights, or you want substantially more value for the same dinner experience. Closer to the Heineken Experience and the Rijksmuseum, slightly further from canal photos.",
    bottomLine:
      "First trip, short stay: Jordaan. Repeat trip or food-driven trip: De Pijp. Both are correct answers; Centrum is not.",
    faq: [
      {
        q: "Is Jordaan or De Pijp closer to Schiphol?",
        a: "De Pijp by a small margin — about 25 min by train+tram versus 30 min from Jordaan. Either way trivial.",
      },
      {
        q: "Which is better for cycling?",
        a: "Tied. Both are flat (everywhere in Amsterdam is flat) and both have rental shops. Jordaan's narrow streets are slower; De Pijp's grid is faster.",
      },
    ],
  },
  {
    slug: "jordaan-vs-oud-west",
    citySlug: "amsterdam",
    countrySlug: "netherlands",
    aSlug: "jordaan",
    bSlug: "oud-west",
    aLabel: "Jordaan",
    bLabel: "Oud-West",
    metaTitle: "Jordaan vs Oud-West: The Amsterdam Value Question",
    metaDescription:
      "Want Amsterdam canal-belt feel without Jordaan prices? Compare Jordaan and Oud-West — what you give up to save 30-40%.",
    intro:
      "Oud-West is the answer to the question 'is there a Jordaan-equivalent that doesn't cost €350/night?' Mostly yes — the neighborhood is one tram stop west of the canal belt, has kept its restored 1920s housing, sits next to the Vondelpark, and runs at a 25-35% discount. The catch is which version of Amsterdam you wanted.",
    rounds: [
      {
        question: "Canal atmosphere",
        winner: "a",
        body: "Jordaan wins, decisively. Oud-West has streets, parks and trams; it does not have the canal-belt postcard atmosphere. If that's why you booked Amsterdam, Jordaan is what you want.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Oud-West wins. €130-€220/night for the same product that costs €220-€380 in Jordaan. The savings on a 4-night stay can be €600-€800.",
      },
      {
        question: "Walking to the Rijksmuseum",
        winner: "b",
        body: "Oud-West is 10-15 min walk to the Rijksmuseum and Van Gogh Museum. Jordaan is 15-20 min. Marginal but real.",
      },
      {
        question: "Walking to the Anne Frank House",
        winner: "a",
        body: "Jordaan is 5 min walk. Oud-West is 20-25 min walk or 10 min tram.",
      },
      {
        question: "Restaurants",
        winner: "tied",
        body: "Both have the Foodhallen-area dinner density (Foodhallen is in Oud-West; the Jordaan side has Westerstraat). Oud-West's dinner is slightly cheaper; Jordaan's is slightly more atmospheric.",
      },
      {
        question: "Park access",
        winner: "b",
        body: "Oud-West borders the Vondelpark. If you run, walk, picnic or cycle, this is a real benefit you don't get in Jordaan.",
      },
    ],
    pickA:
      "Pick Jordaan if the canal-belt experience is the reason you booked Amsterdam. The premium is the experience.",
    pickB:
      "Pick Oud-West if you want most of the Jordaan trip at meaningfully lower prices, you're traveling longer (4+ nights), or you specifically want Vondelpark access. The 10-min tram ride to canal-belt walking is a small cost.",
    bottomLine:
      "Postcard atmosphere matters most: Jordaan. Value matters most: Oud-West. The choice is genuinely personal here.",
  },

  // =========================================================================
  // ISTANBUL
  // =========================================================================
  {
    slug: "sultanahmet-vs-beyoglu-galata",
    citySlug: "istanbul",
    countrySlug: "turkey",
    aSlug: "sultanahmet",
    bSlug: "beyoglu-galata",
    aLabel: "Sultanahmet",
    bLabel: "Beyoğlu (Galata)",
    metaTitle: "Sultanahmet vs Beyoğlu: Where to Stay in Istanbul",
    metaDescription:
      "Old city or across the Golden Horn? Sultanahmet (Hagia Sophia, Blue Mosque) versus Beyoğlu (Galata, Karaköy) — honest comparison for first-timers vs repeat visitors.",
    intro:
      "Istanbul's stay-versus-stay decision changes the trip more than anywhere in Europe. Sultanahmet is the historical peninsula — Hagia Sophia and the Blue Mosque are at your front door. Beyoğlu (across the Golden Horn, including Galata, Karaköy and Cihangir) is where the food-and-evening Istanbul lives. The right pick depends on which Istanbul you came for.",
    rounds: [
      {
        question: "Walking to Hagia Sophia, Blue Mosque, Topkapı",
        winner: "a",
        body: "Sultanahmet wins by definition — they're at your hotel door. From Beyoğlu it's a 25-35 min walk including a tram, or 20 min by tram alone.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Beyoğlu wins decisively. Karaköy, Cihangir and the streets around Galata Tower are dinner-and-rooftop dense. Sultanahmet quiets after the sights close — most non-hotel restaurants are tourist-priced and shut by 10pm.",
      },
      {
        question: "Hotel quality at the price",
        winner: "b",
        body: "Beyoğlu has Istanbul's design hotels — Soho House, the Six Senses, dozens of mid-range boutiques. Sultanahmet trends older, more atmospheric, often lower quality at the same price. The exception is the high-end Sultanahmet hotels, which are spectacular.",
      },
      {
        question: "First-timer convenience",
        winner: "a",
        body: "Sultanahmet. If your trip is 3-4 nights and built around the historical sights, the saved tram time is genuine. You'll spend 4-6 hours in Sultanahmet daily either way.",
      },
      {
        question: "Sleep quality",
        winner: "tied",
        body: "Sultanahmet has the call to prayer (5 times daily, including dawn) and is otherwise very quiet. Beyoğlu has weekend bar noise around Karaköy. Pick by which one you tolerate.",
      },
      {
        question: "Best for repeat visitors",
        winner: "b",
        body: "Beyoğlu, by a wide margin. Once you've done Hagia Sophia and the Blue Mosque, Sultanahmet has limited repeat-visit content. Beyoğlu has 50+ years of evening exploration.",
      },
    ],
    pickA:
      "Pick Sultanahmet if it's your first Istanbul trip, you have 3-4 nights, you want to walk out of your hotel into the Hagia Sophia, and you're tolerant of (or indifferent to) the dawn call to prayer. The trip is sights-heavy by design here.",
    pickB:
      "Pick Beyoğlu if it's your second Istanbul trip, your trip is built around food and evenings, you're staying 5+ nights, or you want better hotel product per dollar. The 20-30 min commute back to the historical peninsula is real and adds up.",
    bottomLine:
      "First trip, short stay, history-heavy: Sultanahmet. Second trip or food-driven trip: Beyoğlu. Splitting nights between both — 2 in Sultanahmet, then 3 in Beyoğlu — is the move for trips of 5+ nights.",
    faq: [
      {
        q: "Is the call to prayer disruptive in Sultanahmet?",
        a: "Yes for some — the dawn call is around 4-6am depending on season, and Sultanahmet has multiple mosques within audible range. Light sleepers should bring earplugs or pick Beyoğlu.",
      },
      {
        q: "Is Beyoğlu safe at night for solo female travelers?",
        a: "Generally yes in Galata, Karaköy and Cihangir — busy, lit, foreigner-comfortable. The İstiklal Avenue area is fine but more chaotic. Avoid Tarlabaşı after dark.",
      },
    ],
  },
  {
    slug: "sultanahmet-vs-kadikoy",
    citySlug: "istanbul",
    countrySlug: "turkey",
    aSlug: "sultanahmet",
    bSlug: "kadikoy",
    aLabel: "Sultanahmet",
    bLabel: "Kadıköy",
    metaTitle: "Sultanahmet vs Kadıköy: European Side or Asian Side?",
    metaDescription:
      "European vs Asian Istanbul. Compare Sultanahmet's historical peninsula against Kadıköy's local-life across walkability, price, dinner, and ferry logistics.",
    intro:
      "This is the rare Istanbul comparison where the two neighborhoods aim at completely different trips. Sultanahmet is sights-on-your-doorstep, Sultanahmet-or-bust. Kadıköy is the Asian side — no major sights, the city's best market, the version of Istanbul that repeat visitors fall for. The honest answer for first-timers is Sultanahmet; the interesting answer for second-timers is Kadıköy.",
    rounds: [
      {
        question: "Major historical sights",
        winner: "a",
        body: "Sultanahmet wins, decisively. Hagia Sophia, the Blue Mosque, Topkapı Palace, Basilica Cistern and the Grand Bazaar are all walking distance. Kadıköy has no comparable sights — you'll ferry across daily.",
      },
      {
        question: "Food market",
        winner: "b",
        body: "Kadıköy wins decisively. The market around Güneşlibahçe Sokak is the best food shopping in Istanbul. Sultanahmet's market is the Spice Bazaar, which is tourist-managed and significantly more expensive.",
      },
      {
        question: "Local life",
        winner: "b",
        body: "Kadıköy. It's a working Istanbul neighborhood with cafés that aren't tourist-priced, residents who live there, and a ferry-commute culture you don't see in Sultanahmet.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Kadıköy hotels run 30-50% cheaper than equivalent Sultanahmet product. Dinner and drinks are 40-60% cheaper. The savings on a longer trip are substantial.",
      },
      {
        question: "Daily logistics",
        winner: "a",
        body: "Sultanahmet wins. Kadıköy means a 15-20 min ferry across the Bosphorus to anywhere historical. Ferries are reliable and pleasant, but they shape the day.",
      },
      {
        question: "Best for first-timers",
        winner: "a",
        body: "Sultanahmet. If you have 3-4 nights and a sights-heavy itinerary, Kadıköy adds 30-60 min of ferry time per day to your trip. That's 2-4 hours over a week.",
      },
    ],
    pickA:
      "Pick Sultanahmet if it's your first Istanbul trip, your trip is built around historical sights, and you have 4 nights or fewer. The location is the trip.",
    pickB:
      "Pick Kadıköy if it's your second-or-later Istanbul trip, you've already done the major sights, you want a meaningfully different version of the city, and the daily ferry commute sounds appealing rather than annoying. Repeat visitors who book Kadıköy almost never go back to staying in Sultanahmet.",
    bottomLine:
      "Sultanahmet is the sights trip. Kadıköy is the lived-in Istanbul trip. Try Kadıköy on your second visit; it changes how you see the city.",
  },

  // =========================================================================
  // LISBON
  // =========================================================================
  {
    slug: "alfama-vs-bairro-alto",
    citySlug: "lisbon",
    countrySlug: "portugal",
    aSlug: "alfama",
    bSlug: "bairro-alto",
    aLabel: "Alfama",
    bLabel: "Bairro Alto",
    metaTitle: "Alfama vs Bairro Alto: Where to Stay in Lisbon",
    metaDescription:
      "Two of Lisbon's hilltops, two very different stays. Alfama (medieval, fado bars) versus Bairro Alto (nightlife district) — what wins for your trip.",
    intro:
      "Both are hilltop neighborhoods in central Lisbon. Both look spectacular in photos. They function differently: Alfama is the medieval, fado-bar, atmospheric stay; Bairro Alto is the bar district that gets loud after 10pm. Most travelers should know which is which before booking.",
    rounds: [
      {
        question: "Atmosphere",
        winner: "a",
        body: "Alfama wins on atmosphere. Narrow medieval streets, the Castelo de São Jorge above, fado bars in tiled rooms, the Tagus visible at every other corner. Bairro Alto is also atmospheric but in a more curated, less ancient way.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Alfama wins decisively. Bairro Alto is functionally a bar district — between 9pm and 3am the streets fill, music spills out, and most accommodation is in buildings with no soundproofing. Light sleepers should not book Bairro Alto.",
      },
      {
        question: "Hills and walkability",
        winner: "tied",
        body: "Both are punishing. Alfama is genuinely steep with cobblestoned alleys (the tram is a relief, not a luxury). Bairro Alto has fewer extreme grades but the climb up from Baixa is real. Pack lightly either way.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Bairro Alto. Restaurant density is higher and prices run 15-25% lower than Alfama. Alfama's restaurants tilt toward fado-with-dinner tourist sets at €40-60 per person.",
      },
      {
        question: "Walking to Baixa-Chiado",
        winner: "b",
        body: "Bairro Alto is 5-10 min downhill into Chiado. Alfama is 15-25 min depending on which street, and it's a hill climb back. The tram 28 helps but is itself a tourist-managed experience.",
      },
      {
        question: "Sunsets and views",
        winner: "a",
        body: "Alfama has more miradouros (viewpoints) — Santa Luzia, Portas do Sol, Senhora do Monte. The sunset view from any of them is reason enough to stay nearby.",
      },
    ],
    pickA:
      "Pick Alfama if you came to Lisbon for atmosphere, fado, and the medieval-streets experience. Accept the hills, the tram crowds, and the reality that you will sweat carrying anything heavier than a daypack uphill.",
    pickB:
      "Pick Bairro Alto only if you're explicitly there for the nightlife — under 35, party-focused, willing to be loud and to be kept up by it. Anyone else booking Bairro Alto is making a mistake. Príncipe Real, one block north, gives you the location with none of the bar noise.",
    bottomLine:
      "Alfama wins for almost everyone except the under-30 nightlife crowd. The third option — Príncipe Real — is the move if Alfama feels too touristy and Bairro Alto too loud.",
    faq: [
      {
        q: "Is Alfama tourist-trap-y?",
        a: "Mornings are calm and atmospheric; midday to 6pm is heavily tourist-managed (cruise crowds and tram 28 queues); evenings empty out and become beautiful again. The trick is staying overnight rather than visiting only by day.",
      },
      {
        q: "Can I sleep in Bairro Alto if I'm not partying?",
        a: "Not realistically on Friday or Saturday. Tuesday-Thursday is manageable. Sunday-Monday is quiet. Pick a hotel uphill toward Príncipe Real or use earplugs.",
      },
    ],
  },
  {
    slug: "baixa-chiado-vs-principe-real",
    citySlug: "lisbon",
    countrySlug: "portugal",
    aSlug: "baixa-chiado",
    bSlug: "principe-real",
    aLabel: "Baixa-Chiado",
    bLabel: "Príncipe Real",
    metaTitle: "Baixa-Chiado vs Príncipe Real: Lisbon's Underrated Question",
    metaDescription:
      "Stay flat or stay up? Compare Baixa-Chiado's central grid against Príncipe Real's design district across walkability, vibe, dinner and price.",
    intro:
      "If Alfama feels too touristy and Bairro Alto too loud, the choice usually narrows to these two. Baixa-Chiado is the flat central grid — Praça do Comércio, the funicular, the elegant theatre district. Príncipe Real is the design hotel district one hill up — concept stores, leafy plazas, calmer evenings. Both are fundamentally good answers; the differences are subtle.",
    rounds: [
      {
        question: "Walkability and flatness",
        winner: "a",
        body: "Baixa-Chiado is the only flat central neighborhood in Lisbon. If hills are a problem (mobility, kids in strollers, heavy luggage), this is the right call. Príncipe Real requires the climb up from Chiado on the Calçada do Combro or the Glória funicular.",
      },
      {
        question: "Dinner",
        winner: "b",
        body: "Príncipe Real wins. The streets around Praça das Flores and the gardens are dinner-restaurant dense and the prices are 15-20% better than Chiado. Chiado dinner trends touristier and more expensive.",
      },
      {
        question: "Hotel design quality",
        winner: "b",
        body: "Príncipe Real has Lisbon's best design hotels — Memmo Príncipe Real, Casa do Príncipe, the Independente Suites. Chiado has classics (Bairro Alto Hotel, Avenida Palace) but the design-hotel mass is in Príncipe Real.",
      },
      {
        question: "Walking to sights",
        winner: "a",
        body: "Baixa-Chiado wins. You're walking distance to most of central Lisbon — Praça do Comércio, the Tagus, Rossio, the Carmo Convent, the funiculars. Príncipe Real is 10-15 min downhill from most of those.",
      },
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Chiado is elegant-historic-busy. Príncipe Real is leafy-quiet-design. Different aesthetics; both work. Príncipe Real edges ahead for travelers in the 30-50 age band.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Príncipe Real is meaningfully quieter. Chiado has tram noise, late-night Bairro Alto spillover from one street over, and tour group buses on Rua Garrett.",
      },
    ],
    pickA:
      "Pick Baixa-Chiado if you have mobility constraints, you're traveling with kids or luggage, you have a short trip (2-3 nights) sights-heavy, or you want the postcard-historic Lisbon at your door. The flatness is genuinely valuable in this city.",
    pickB:
      "Pick Príncipe Real if you can handle a 10-min hill walk, you eat out twice a day, you value design hotels and quiet evenings, or you're traveling 4+ nights. The neighborhood rewards a longer stay in a way Chiado doesn't.",
    bottomLine:
      "Short trip, mobility-sensitive, sights-driven: Baixa-Chiado. Longer trip, dinner-driven, design-hotel-driven: Príncipe Real. Both are correct answers — which is the rare comparison where you can't really go wrong.",
  },

  // =========================================================================
  // PORTO
  // =========================================================================
  {
    slug: "baixa-vs-cedofeita",
    citySlug: "porto",
    countrySlug: "portugal",
    aSlug: "baixa",
    bSlug: "cedofeita",
    aLabel: "Baixa",
    bLabel: "Cedofeita",
    metaTitle: "Baixa vs Cedofeita: Where to Stay in Porto",
    metaDescription:
      "Skip Ribeira (the postcard hill is a trap). Compare Baixa's central grid and Cedofeita's design district — the two neighborhoods Porto regulars actually recommend.",
    intro:
      "Porto's most-photographed neighborhood (Ribeira) is, on the ground, brutally hilly, tourist-saturated and expensive. Baixa and Cedofeita are the two stays Porto regulars actually recommend. The choice between them is unusually clean — central versus calm, identical price range.",
    rounds: [
      {
        question: "Central-ness",
        winner: "a",
        body: "Baixa wins. You're between São Bento station and Avenida dos Aliados — walking distance to the Lello Bookshop, Clérigos Tower, the Cathedral, and the funicular down to the river. Cedofeita is 10-15 min walk west.",
      },
      {
        question: "Restaurants",
        winner: "b",
        body: "Cedofeita has a higher density of brunch cafés, third-wave coffee, and design-restaurant mid-range dinners. Baixa's restaurants tilt more toward classic Porto — bifanas, francesinhas, tripas — which is fine if that's the trip.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Cedofeita is meaningfully quieter. Baixa has tram noise, drunk Galerias de Paris spillover on weekends, and the loud morning of being above the train station.",
      },
      {
        question: "Hills",
        winner: "tied",
        body: "Both are flatter than the rest of Porto, which is to say: still hilly, but not punishing. Baixa is between two hill climbs; Cedofeita is on a plateau.",
      },
      {
        question: "Price",
        winner: "tied",
        body: "Both run €100-€180/night for a comfortable mid-range hotel. Cedofeita has more design hotels and Airbnb-style apartments; Baixa has more boutique-historic.",
      },
      {
        question: "Best for short trips",
        winner: "a",
        body: "Baixa. If you have 2 nights or fewer, the saved walking time to the major sights is worth it. From night three onward, Cedofeita's calmer evenings start to win.",
      },
    ],
    pickA:
      "Pick Baixa if you have 2-3 nights and a sights-heavy trip, you want classic Porto food (bifanas, francesinhas, tripas) at your door, and you're tolerant of weekend nightlife noise from the Galerias de Paris area.",
    pickB:
      "Pick Cedofeita if you're traveling 4+ nights, your trip is brunch/coffee/design heavy, you want quieter evenings, or you're a digital nomad working in cafés. The neighborhood rewards a longer stay; cafés are genuinely good.",
    bottomLine:
      "Don't book Ribeira on the river — it's beautiful and brutal. Baixa for short, sights-heavy trips; Cedofeita for longer, calmer ones. Either beats Ribeira for actually living in Porto.",
  },

  // =========================================================================
  // BERLIN
  // =========================================================================
  {
    slug: "mitte-vs-kreuzberg",
    citySlug: "berlin",
    countrySlug: "germany",
    aSlug: "mitte",
    bSlug: "kreuzberg",
    aLabel: "Mitte",
    bLabel: "Kreuzberg",
    metaTitle: "Mitte vs Kreuzberg: Where to Stay in Berlin",
    metaDescription:
      "Berlin's two most-recommended neighborhoods aim at completely different trips. Compare Mitte (central, polished, museums) against Kreuzberg (food, nightlife, alternative).",
    intro:
      "Mitte and Kreuzberg are functionally separate cities. Mitte is the polished historical center — Brandenburg Gate, Museum Island, glass-and-steel Friedrichstraße. Kreuzberg is the food-and-nightlife district — Turkish-German cooking, club density, the Berlin most travelers fly here for. Choosing one decides what your week looks like.",
    rounds: [
      {
        question: "Walking to Brandenburg Gate, Museum Island, Reichstag",
        winner: "a",
        body: "Mitte wins by definition — they're at your hotel door. Kreuzberg is 25-35 min east via U-Bahn. If your trip is sights-heavy and short, Mitte's location is the trip.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Kreuzberg wins decisively. The streets around Kottbusser Tor, Görlitzer Park and Bergmannstraße have Berlin's best Turkish, Vietnamese and natural-wine dinner — at meaningfully lower prices than Mitte's tourist tier.",
      },
      {
        question: "Hotel quality",
        winner: "a",
        body: "Mitte. Berlin's design hotels (Hotel de Rome, the SO/, Soho House Mitte) are concentrated here. Kreuzberg has good apartments and quirky boutiques but the polished hotel mass is Mitte.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Kreuzberg, by a wide margin. Mitte is corporate-historical and dies on weeknights after 10pm. Kreuzberg is residential, restaurant-dense, and has actual Berliners living there.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Mitte is dramatically quieter. Kreuzberg around Kottbusser Tor and Schlesisches Tor is loud most weeknights and unrelenting on weekends. Light sleepers should not book Kreuzberg without a side-street hotel.",
      },
      {
        question: "Best for first-timers",
        winner: "a",
        body: "Mitte. The walkable concentration of Berlin's must-see sights makes it the right pragmatic choice for a 3-4 night first trip.",
      },
    ],
    pickA:
      "Pick Mitte if it's your first Berlin trip, you have 3-4 nights, you want walking-distance sights, you value quiet sleep, or you want polished hotel product. The neighborhood does corporate-historical-Berlin well; it does evening-Berlin badly.",
    pickB:
      "Pick Kreuzberg if it's your second-or-later Berlin trip, your trip is food and evenings rather than sights, you're staying 5+ nights, or you specifically came for Berlin's nightlife. Pick a side-street hotel, not one on Kottbusser Damm.",
    bottomLine:
      "Mitte is the better short, polished, sights-heavy trip. Kreuzberg is the better long, food-heavy, nightlife-tolerant trip. Most repeat Berlin visitors switch to Kreuzberg and don't go back.",
    faq: [
      {
        q: "Is Kreuzberg safe at night?",
        a: "Yes, but it's gritty in places — Kottbusser Tor specifically. Stay south of Bergmannstraße or in the western part toward Mitte for the easier version.",
      },
      {
        q: "Which is closer to Berghain?",
        a: "Kreuzberg, by a wide margin. Berghain is in Friedrichshain just across the Spree from Kreuzberg's eastern edge. From Mitte it's 20+ min by U-Bahn.",
      },
    ],
  },
  // =========================================================================
  // MADRID
  // =========================================================================
  {
    slug: "malasana-vs-salamanca",
    citySlug: "madrid",
    countrySlug: "spain",
    aSlug: "malasana",
    bSlug: "salamanca",
    aLabel: "Malasaña",
    bLabel: "Salamanca",
    metaTitle: "Malasaña vs Salamanca: Where to Stay in Madrid",
    metaDescription:
      "Madrid's hipster heart vs the upscale grid. Round-by-round comparison of Malasaña and Salamanca across price, dinner, walkability and sleep.",
    intro:
      "These are the two ends of central Madrid. Malasaña is hipster-young — vintage shops, bar-lined plazas, Madrid's best evenings. Salamanca is calm-old-money — Calle Serrano, Michelin stars, the city's quietest residential streets. Picking one decides what you do after dinner.",
    rounds: [
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Malasaña is loud, indie, under-40, dinner-and-bar-dense. Salamanca is hushed, polished, over-50, late-night-dead. Both are the right answer for someone — just different someones.",
      },
      {
        question: "Walking to the Prado / Reina Sofía",
        winner: "b",
        body: "Salamanca wins. The Prado is a 15-min walk through Retiro Park; Reina Sofía is 25 min. From Malasaña both are 25-30 min walks or one metro change.",
      },
      {
        question: "Restaurants and evenings",
        winner: "a",
        body: "Malasaña wins decisively. Calle de la Palma, Calle del Pez and Conde Duque are dinner-and-cocktail dense; Salamanca after 11pm is a residential ghost town with a few Michelin reservations.",
      },
      {
        question: "Price",
        winner: "a",
        body: "Malasaña runs €130-€220/night for a comfortable mid-range hotel. Salamanca runs €220-€450 for the same product (and €600+ at the top end). The Calle Serrano premium is real.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Salamanca wins easily — quiet wide streets, residential acoustics, almost no late-night noise. Malasaña on weekend nights is loud until 3am.",
      },
      {
        question: "Shopping",
        winner: "tied",
        body: "Salamanca for designer (Loewe, Massimo Dutti, Calle Serrano flagship row). Malasaña for vintage and indie (Calle Fuencarral, Triball). Different shopping trips entirely.",
      },
    ],
    pickA:
      "Pick Malasaña if you're under 45, your trip is built around dinner and bars, and you're comfortable with weekend noise. The neighborhood is denser-per-block with restaurants than anywhere central in Madrid.",
    pickB:
      "Pick Salamanca if you're 50+, you're doing a museum-and-shopping trip, you want quiet residential streets, or you're traveling on business. You will pay for the calm.",
    bottomLine:
      "Malasaña for energy and value. Salamanca for calm and prestige. Most travelers under 45 should book Malasaña; most over 55 should book Salamanca.",
    faq: [
      {
        q: "Which is closer to the Royal Palace?",
        a: "Both are 20-25 min walks. Malasaña edges slightly closer via Plaza de España; Salamanca is one metro change.",
      },
      {
        q: "Which has better breakfast?",
        a: "Malasaña — Conde Duque has the city's best brunch density. Salamanca breakfasts run on hotel buffets and Calle Serrano cafés.",
      },
    ],
  },
  {
    slug: "malasana-vs-la-latina",
    citySlug: "madrid",
    countrySlug: "spain",
    aSlug: "malasana",
    bSlug: "la-latina",
    aLabel: "Malasaña",
    bLabel: "La Latina",
    metaTitle: "Malasaña vs La Latina: Madrid's Two Hipster Stays",
    metaDescription:
      "Cocktail bars or tapas streets? Compare Malasaña and La Latina across price, sleep quality, dinner, walkability — and which weekend you're booking.",
    intro:
      "Both are central, both are old, both are cheaper than Salamanca. The difference is rhythm. Malasaña is a Friday-night cocktail district. La Latina is a Sunday-afternoon tapas crawl. The right pick depends almost entirely on which days of the week you're there.",
    rounds: [
      {
        question: "Weekend rhythm",
        winner: "tied",
        body: "Malasaña peaks Thursday-Saturday nights with bar density. La Latina peaks Sunday afternoons with the Rastro market and Cava Baja tapas. Truly different trips on different weekdays.",
      },
      {
        question: "Tapas density",
        winner: "b",
        body: "La Latina wins decisively. Calle Cava Baja is the densest tapas street in Madrid — 30+ classic taverns in 400 meters. Malasaña has good tapas but not concentrated like that.",
      },
      {
        question: "Cocktail and bar density",
        winner: "a",
        body: "Malasaña, by a wide margin. Plaza del 2 de Mayo, Calle del Pez, Calle de la Palma — three streets with denser late-night options than all of La Latina.",
      },
      {
        question: "Walking to Plaza Mayor / Sol",
        winner: "b",
        body: "La Latina is 5-10 min walk. Malasaña is 10-15 min. Marginal but real if you're sights-prioritized.",
      },
      {
        question: "Sleep quality",
        winner: "tied",
        body: "Both are loud on their peak nights — Malasaña Thursday-Saturday, La Latina Sundays. Pick a side street in either; pick the off-peak nights.",
      },
      {
        question: "Restaurant variety",
        winner: "a",
        body: "Malasaña has more cuisine variety — Mexican, Asian, vegan, brunch. La Latina is overwhelmingly Spanish-classical. Depends if that's a feature or a bug for your trip.",
      },
    ],
    pickA:
      "Pick Malasaña if you're traveling Thursday-Saturday, you want cocktail bars and dinner variety, and you're under 40. It's the higher-energy, more varied option.",
    pickB:
      "Pick La Latina if you're traveling Friday-Sunday and want the Rastro + Cava Baja Sunday classic, you specifically want old-Madrid tapas atmosphere, or you want walking distance to Plaza Mayor. It's the more old-Madrid version.",
    bottomLine:
      "Malasaña on weeknights and Saturdays. La Latina on Sunday-Monday. Both work; the wrong one wastes the trip.",
  },

  // =========================================================================
  // LONDON
  // =========================================================================
  {
    slug: "bloomsbury-vs-shoreditch",
    citySlug: "london",
    countrySlug: "united-kingdom",
    aSlug: "bloomsbury",
    bSlug: "shoreditch",
    aLabel: "Bloomsbury",
    bLabel: "Shoreditch",
    metaTitle: "Bloomsbury vs Shoreditch: Where to Stay in London",
    metaDescription:
      "Central first-timer Bloomsbury or East-London cool Shoreditch? Compare across walkability, food, price, sleep — and what kind of London you're booking.",
    intro:
      "These two aim at completely different London trips. Bloomsbury is West End-adjacent, Georgian, walking distance to museums and theatres. Shoreditch is East London creative — restaurants, cocktail bars, street art, no major sights. Picking decides whether your week is sights-and-shows or food-and-evenings.",
    rounds: [
      {
        question: "Walking to British Museum, West End theatres, Covent Garden",
        winner: "a",
        body: "Bloomsbury wins, decisively. The British Museum is at your front door; West End theatres are 10-15 min walk; Covent Garden is 15 min. From Shoreditch all of those are 20+ min Tube rides.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Shoreditch wins decisively. Brick Lane, Curtain Road, Hoxton Square and Boxpark are dinner-and-cocktail dense at price points Bloomsbury can't match. Bloomsbury restaurants tilt hotel-bar and tourist-trap.",
      },
      {
        question: "Hotel quality",
        winner: "tied",
        body: "Bloomsbury has classics (Russell Hotel, Bedford Hotel) at £180-£280. Shoreditch has design (Boundary, Curtain, Ace) at £200-£350. Different products at similar price; both well-stocked at the mid-range.",
      },
      {
        question: "Tube access",
        winner: "a",
        body: "Bloomsbury wins. You're 5 min walk from 4 Tube lines (Piccadilly, Northern, Central, Victoria via King's Cross). Shoreditch's nearest Tube (Old Street) is 10-15 min walk from most hotels.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Bloomsbury is dramatically quieter — leafy Georgian squares, no nightlife. Shoreditch around Curtain Road and Rivington Street is loud Thursday-Saturday until 2-3am.",
      },
      {
        question: "Best for first-timers",
        winner: "a",
        body: "Bloomsbury, by a wide margin. The walking-distance access to West End sights and theatres is the trip for most first-time London travelers.",
      },
    ],
    pickA:
      "Pick Bloomsbury if it's your first London trip, your trip includes West End theatre, you're prioritizing major museums (British, V&A is a Tube ride), or you have mobility limits. Bloomsbury's location pays for itself in saved Tube time.",
    pickB:
      "Pick Shoreditch if you've already done West End London once, your trip is built around food and bars, you're under 40, and the 20-min Tube ride to central sights is acceptable. Most repeat London visitors choose Shoreditch and never go back to Bloomsbury.",
    bottomLine:
      "First-time, sights-driven London: Bloomsbury. Repeat or food-driven London: Shoreditch. Both are correct answers; Soho or Mayfair are not the right defaults.",
    faq: [
      {
        q: "Which is closer to Heathrow?",
        a: "Bloomsbury, marginally — about 50 min via Piccadilly Line direct. Shoreditch is 60-65 min with one change.",
      },
      {
        q: "Which is safer at night?",
        a: "Bloomsbury, slightly. Both are very safe by London standards. Shoreditch around Old Street can feel rougher late on weekends but is well-lit and busy.",
      },
    ],
  },
  {
    slug: "bloomsbury-vs-covent-garden",
    citySlug: "london",
    countrySlug: "united-kingdom",
    aSlug: "bloomsbury",
    bSlug: "covent-garden",
    aLabel: "Bloomsbury",
    bLabel: "Covent Garden",
    metaTitle: "Bloomsbury vs Covent Garden: Two Central London Stays",
    metaDescription:
      "Quiet Georgian Bloomsbury or theatre-land Covent Garden? Compare across price, sleep, walkability, and which kind of central London actually fits your trip.",
    intro:
      "Both are West End-central, both walking distance to theatres and museums. Covent Garden is the maximum-tourist version — the market, restaurants, performers, energy. Bloomsbury is the quieter, leafier, cheaper version one Tube stop north. Most first-time travelers will be happier in Bloomsbury and not realize it.",
    rounds: [
      {
        question: "Walking to West End theatres",
        winner: "b",
        body: "Covent Garden wins — most theatres are 5-10 min walk. From Bloomsbury it's 10-15 min. Real but not enormous.",
      },
      {
        question: "Walking to British Museum",
        winner: "a",
        body: "Bloomsbury wins — 5 min walk. Covent Garden is 15-20 min.",
      },
      {
        question: "Atmosphere and energy",
        winner: "b",
        body: "Covent Garden, decisively. Pedestrian streets, performers, the market, restaurants spilling onto piazzas. Bloomsbury is library-quiet.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Bloomsbury, decisively. Covent Garden's piazza and surrounding streets are loud until 11pm-midnight on every night, 1am on weekends. Bloomsbury hotels look out on quiet Georgian squares.",
      },
      {
        question: "Price",
        winner: "a",
        body: "Bloomsbury runs £160-£260/night for a comfortable mid-range. Covent Garden runs £240-£400. The premium is the energy, and you do feel it.",
      },
      {
        question: "Restaurants",
        winner: "b",
        body: "Covent Garden has higher density and variety, though prices skew tourist. Bloomsbury has fewer restaurants but Lamb's Conduit Street is genuinely good and locally-priced.",
      },
    ],
    pickA:
      "Pick Bloomsbury if you want quiet sleep, museum-walking, leafy squares and a 25-30% price discount on central London. The 10-15 min walk to West End theatres is trivial.",
    pickB:
      "Pick Covent Garden if your trip is built around theatre and you specifically want to walk out into the energy. Accept the noise, the price, and the tourist density as the price of admission.",
    bottomLine:
      "Most first-timers should book Bloomsbury and walk to Covent Garden, not stay in it. Theatre-trip travelers and short-stay luxury-seekers are the exception.",
  },

  // =========================================================================
  // VIENNA
  // =========================================================================
  {
    slug: "innere-stadt-vs-neubau",
    citySlug: "vienna",
    countrySlug: "austria",
    aSlug: "innere-stadt",
    bSlug: "neubau",
    aLabel: "District 1 (Innere Stadt)",
    bLabel: "District 7 (Neubau)",
    metaTitle: "District 1 vs District 7: Where to Stay in Vienna",
    metaDescription:
      "Vienna's canonical question: stay in pedestrian-only Innere Stadt or in design-heavy Neubau? Compare across price, walkability, sleep, food.",
    intro:
      "Vienna's stay decision usually narrows to these two districts. District 1 (Innere Stadt) is the walled, pedestrian-only historic core — Stephansdom, Hofburg, Albertina at your hotel door. District 7 (Neubau) is the MuseumsQuartier-adjacent design district — indie shops, mid-priced dinners, the right side of the Ring. Most travelers will be happiest in Neubau.",
    rounds: [
      {
        question: "Walking to Stephansdom and Hofburg",
        winner: "a",
        body: "District 1 wins by definition — they're at your hotel door. From Neubau it's 15-20 min walk or 5 min on the U-Bahn. Real but not enormous.",
      },
      {
        question: "Walking to MuseumsQuartier",
        winner: "b",
        body: "Neubau wins — the MQ borders the district. From District 1 it's 10-15 min walk through the Hofburg.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Neubau decisively. Spittelberg, Burggasse and Kirchengasse are dinner-and-bar dense at locally-priced rates. District 1 dinner is hotel-restaurant pricing and tourist sets.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Neubau runs €130-€230/night for a comfortable mid-range hotel. District 1 runs €230-€450 for the same product. The location premium is 40-50%.",
      },
      {
        question: "Hotel character",
        winner: "tied",
        body: "District 1 has the grand-Vienna classics (Sacher, Imperial, Bristol). Neubau has design hotels (25hours, Altstadt, Lamée). Different products; both excellent at the high end.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "District 1 wins, slightly. Pedestrian-only streets, quiet wide squares. Neubau has weekend bar noise around Burggasse but it's manageable.",
      },
    ],
    pickA:
      "Pick District 1 if you're on a 2-3 night first trip, your trip is sights-heavy, you want grand-Vienna grandeur, or you specifically want to step out of your hotel and see Stephansdom. Accept the 40% price premium.",
    pickB:
      "Pick Neubau if you're staying 4+ nights, your trip is dinner and museums (rather than just sights), or you want substantially better value at minimal cost in walkability. Neubau is the right answer for most travelers.",
    bottomLine:
      "District 1 is the better short, sights-heavy, luxury trip. Neubau is the better longer, dinner-heavy, value trip. The third option — Leopoldstadt — is a value alternative if you don't mind crossing the canal.",
  },

  // =========================================================================
  // PRAGUE
  // =========================================================================
  {
    slug: "stare-mesto-vs-vinohrady",
    citySlug: "prague",
    countrySlug: "czech-republic",
    aSlug: "stare-mesto",
    bSlug: "vinohrady",
    aLabel: "Old Town (Staré Město)",
    bLabel: "Vinohrady",
    metaTitle: "Old Town vs Vinohrady: Where to Stay in Prague",
    metaDescription:
      "Prague's medieval core or the lived-in second-city neighborhood? Compare Staré Město and Vinohrady across price, sleep, walkability, dinner.",
    intro:
      "Old Town is the postcard — Old Town Square, the Astronomical Clock, Charles Bridge — and the bachelor-party noise that comes with it. Vinohrady is the leafy, residential, fifteen-minutes-east-by-tram alternative where Prague's locals actually live and eat. The honest answer for repeat visitors is Vinohrady; for first-timers it's complicated.",
    rounds: [
      {
        question: "Walking to Old Town Square, Charles Bridge, Astronomical Clock",
        winner: "a",
        body: "Old Town wins by definition. From Vinohrady it's 15-20 min by tram or a 25 min walk. Real but not crippling.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Vinohrady, decisively. Mánesova, Vinohradská and the streets around Riegrovy Sady have Prague's best non-tourist dinner density. Old Town restaurants are overwhelmingly tourist-priced and tourist-focused.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Vinohrady wins, decisively. Old Town has bachelor parties, stag-dos and tour-group noise nightly. Vinohrady is residential and quiet by 11pm.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Vinohrady runs €70-€140/night for a comfortable mid-range. Old Town runs €120-€240 for the same product. Roughly 40% savings.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Vinohrady, by a wide margin. Real Czech residents, real Czech weeknight dinners, real cafés that aren't gimmicks. Old Town is purpose-built for tourists.",
      },
      {
        question: "Best for short trips",
        winner: "a",
        body: "Old Town. If you have 2 nights and a sights-heavy plan, the saved tram time matters. From night three onward, Vinohrady wins on every dimension.",
      },
    ],
    pickA:
      "Pick Old Town if you have 2 nights or fewer, you specifically want to walk out into the Old Town Square, and you can sleep through bachelor-party noise (or you're part of it). The location is the trip.",
    pickB:
      "Pick Vinohrady if you're staying 3+ nights, you eat dinner out, you want quiet sleep, or you've been to Prague before. The 15-min tram in is trivial; what you get back is dramatically more pleasant evenings and 40% lower prices.",
    bottomLine:
      "First-time, short, sights-prioritized: Old Town. Everything else: Vinohrady. The third option — Žižkov — is for nightlife-prioritized younger travelers.",
  },
  {
    slug: "vinohrady-vs-zizkov",
    citySlug: "prague",
    countrySlug: "czech-republic",
    aSlug: "vinohrady",
    bSlug: "zizkov",
    aLabel: "Vinohrady",
    bLabel: "Žižkov",
    metaTitle: "Vinohrady vs Žižkov: The Lived-In Prague",
    metaDescription:
      "Two adjacent Prague neighborhoods with very different reputations. Compare leafy Vinohrady against rough-edged Žižkov across price, sleep, food.",
    intro:
      "These two share a border but feel like different cities. Vinohrady is leafy, polished, 30-something with kids. Žižkov is bar-dense, rougher, 20-something on a budget — said to have more pubs per capita than anywhere in Europe. The right pick depends entirely on which version of Prague you're after.",
    rounds: [
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Vinohrady is calm-leafy-residential. Žižkov is rough-around-the-edges-bar-density. Different ages and decades of life. Both genuinely Prague.",
      },
      {
        question: "Restaurants",
        winner: "a",
        body: "Vinohrady, by a wide margin. Better restaurants, more variety, better quality at the same price. Žižkov runs on cheap pubs and a few standout food trucks.",
      },
      {
        question: "Bars and nightlife",
        winner: "b",
        body: "Žižkov, decisively. Pub density per block is the highest in Prague. If your trip is built around drinking, this is the right call.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Vinohrady, easily. Žižkov is loud most nights and unrelenting on weekends. Vinohrady is quiet by 11pm.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Žižkov runs €50-€100/night for a comfortable hotel. Vinohrady runs €80-€140 for the same. Roughly 30% savings going to Žižkov, but you give up restaurant quality.",
      },
      {
        question: "Walking to Old Town",
        winner: "tied",
        body: "Both are 20-25 min by tram or 30 min walk. Žižkov is slightly closer geographically; Vinohrady has more direct tram routes.",
      },
    ],
    pickA:
      "Pick Vinohrady if you're 30+ traveling with a partner, you eat well, you sleep at night, and you'd rather pay 30% more for noticeable quality lift across food and accommodation.",
    pickB:
      "Pick Žižkov if you're 20-something on a budget trip, your itinerary is bars and live music, and rough-around-the-edges authenticity is a feature rather than a bug. The cheapest credible Prague stay.",
    bottomLine:
      "Vinohrady for the calm-and-quality version. Žižkov for the budget-and-bars version. They're adjacent enough that you can stay in one and walk to the other for an evening.",
  },

  // =========================================================================
  // BUDAPEST
  // =========================================================================
  {
    slug: "district-v-vs-district-vii",
    citySlug: "budapest",
    countrySlug: "hungary",
    aSlug: "district-v",
    bSlug: "district-vii",
    aLabel: "District V",
    bLabel: "District VII",
    metaTitle: "District V vs District VII: Where to Stay in Budapest",
    metaDescription:
      "The polished tourist district vs the ruin-bar epicenter. Compare District V (Belváros) and District VII (Jewish Quarter) across price, sleep, dinner.",
    intro:
      "Most first-time Budapest travelers narrow to one of these districts and pick on photos. They are spectacularly different in person. District V is the polished central district — Parliament, Chain Bridge, walking distance to everything. District VII is the ruin-bar epicenter — Szimpla Kert, Mazel Tov, the densest weekend nightlife in Central Europe.",
    rounds: [
      {
        question: "Walking to Parliament, Chain Bridge, Vörösmarty Square",
        winner: "a",
        body: "District V wins. They are at your hotel door. From District VII it's 15-20 min walk.",
      },
      {
        question: "Ruin bars and nightlife",
        winner: "b",
        body: "District VII, decisively. Kazinczy and Király utca are the densest weekend nightlife in Central Europe. From District V it's a 15-min walk back to bed.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "District V wins, easily. Quiet, polished, residential evenings. District VII Thursday-Saturday is loud until 4am — pick a side street or use earplugs.",
      },
      {
        question: "Restaurants",
        winner: "tied",
        body: "District V has hotel-bar dining and tourist sets. District VII has a more interesting mid-priced dinner scene at lower prices. Slight edge to District VII for actual eating; slight edge to District V for fine-dining hotel experiences.",
      },
      {
        question: "Hotel quality",
        winner: "a",
        body: "District V has Budapest's polished hotels (Four Seasons Gresham, Aria, Párisi Udvar). District VII has interesting boutiques and apartments but the high-end mass is District V.",
      },
      {
        question: "Best for first-timers",
        winner: "a",
        body: "District V. Walking distance to almost every must-see sight, polished hotel product, quiet sleep — it's the safer pick.",
      },
    ],
    pickA:
      "Pick District V if it's your first Budapest trip, your itinerary is sights-heavy, you value quiet sleep, or you want polished hotels. The premium for a polished Budapest base is real and probably worth it for short trips.",
    pickB:
      "Pick District VII if you're under 40, your trip is the ruin bars and the weekend nightlife, you've been to Budapest before, or you specifically want to live inside the Jewish Quarter. Bring earplugs.",
    bottomLine:
      "First-timer, sights-heavy: District V. Nightlife-heavy or repeat: District VII. The third option — District VI (Andrássy) — is a refined middle ground.",
  },

  // =========================================================================
  // ATHENS
  // =========================================================================
  {
    slug: "plaka-vs-koukaki",
    citySlug: "athens",
    countrySlug: "greece",
    aSlug: "plaka",
    bSlug: "koukaki",
    aLabel: "Plaka",
    bLabel: "Koukaki",
    metaTitle: "Plaka vs Koukaki: Where to Stay in Athens",
    metaDescription:
      "Athens's tourist heartland vs the local-life neighborhood south of the Acropolis. Compare Plaka and Koukaki — and which side of the rock you should sleep on.",
    intro:
      "These two neighborhoods sit on either side of the Acropolis. Plaka is north — the labyrinthine tourist heart, the postcard, the queues. Koukaki is south — quiet residential streets, Athens's best mid-priced dinner, walking distance to the New Acropolis Museum. Most second-time visitors switch from Plaka to Koukaki and don't go back.",
    rounds: [
      {
        question: "Walking to the Acropolis entrance",
        winner: "tied",
        body: "Plaka is closer to the main entrance (5-10 min). Koukaki is closer to the south entrance (5-10 min). Genuinely tied.",
      },
      {
        question: "Restaurants",
        winner: "b",
        body: "Koukaki, decisively. The streets around Drakou and Veikou have Athens's best mid-priced dinner — local prices, real residents, no tourist-menu English signs.",
      },
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Plaka is touristy-but-pretty — narrow alleys, taverna tables, Acropolis views. Koukaki is calmer-but-less-iconic — leafy streets, neighborhood cafés. Both pleasant; different aesthetics.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Koukaki runs €70-€130/night for a comfortable mid-range. Plaka runs €110-€220 for the same. Roughly 30-40% cheaper.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Koukaki, decisively. Plaka tavernas keep their patios loud until midnight; Koukaki is residential after 11pm.",
      },
      {
        question: "Best for first-timers",
        winner: "tied",
        body: "Plaka if you specifically want the medieval-alley experience and Acropolis views. Koukaki if you want a calmer, cheaper, food-better stay with equivalent walking access. Genuine choice.",
      },
    ],
    pickA:
      "Pick Plaka if it's your first Athens trip, you want to walk out of your hotel into the postcard, and the noise + premium are acceptable. The atmosphere is the trip.",
    pickB:
      "Pick Koukaki if you've been to Athens before, you eat dinner out, you want quiet sleep, or you're traveling 4+ nights. Most repeat visitors switch and never go back.",
    bottomLine:
      "First trip, atmosphere-driven: Plaka. Second trip or food-driven: Koukaki. Neither is wrong; the prices and sleep quality favor Koukaki at every other dimension.",
  },

  // =========================================================================
  // MUNICH
  // =========================================================================
  {
    slug: "altstadt-vs-glockenbachviertel",
    citySlug: "munich",
    countrySlug: "germany",
    aSlug: "altstadt",
    bSlug: "glockenbachviertel",
    aLabel: "Altstadt",
    bLabel: "Glockenbachviertel",
    metaTitle: "Altstadt vs Glockenbachviertel: Where to Stay in Munich",
    metaDescription:
      "Munich's medieval old town or the lived-in central neighborhood just south? Compare across price, sleep, dinner, walkability.",
    intro:
      "Altstadt and Glockenbachviertel are adjacent — the latter starts where the medieval ring ends. Altstadt is the maximum-tourist Marienplatz version. Glockenbach is the dinner-and-bars version that locals actually use. The right pick depends almost entirely on whether your trip is sights or evenings.",
    rounds: [
      {
        question: "Walking to Marienplatz",
        winner: "a",
        body: "Altstadt wins — Marienplatz is at your hotel door. From Glockenbach it's 10-15 min walk.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Glockenbach, decisively. The streets around Gärtnerplatz have Munich's best mid-priced dinner — and a meaningful gay-friendly evening scene. Altstadt restaurants are tourist sets and Hofbräuhaus.",
      },
      {
        question: "Hotel quality",
        winner: "a",
        body: "Altstadt has Munich's polished hotels (Bayerischer Hof, Mandarin Oriental, Charles). Glockenbach has good boutiques but the polished mass is Altstadt.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Glockenbach runs €130-€220/night for a comfortable mid-range. Altstadt runs €220-€450 for the same. The Marienplatz premium is real.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Glockenbach, by a wide margin. Real Munich residents, weekday-night dinners, neighborhood cafés. Altstadt is overwhelmingly tourist-managed by 11am.",
      },
      {
        question: "Sleep quality",
        winner: "tied",
        body: "Altstadt is touristy-loud during the day and dead at night. Glockenbach is dinner-loud until 11pm and calm after. Different acoustic profiles, similar overall sleep quality.",
      },
    ],
    pickA:
      "Pick Altstadt if you're on a 2-3 night first trip, your itinerary is sights-heavy, or you want grand-Munich hotels. Accept the 50%+ premium.",
    pickB:
      "Pick Glockenbach if you're staying 4+ nights, you eat dinner out, or you want substantially better value at minimal cost in walkability. The neighborhood is consistently underrated by first-time visitors.",
    bottomLine:
      "Short trip, sights-heavy, polished-hotel: Altstadt. Longer trip, food-heavy, value: Glockenbach. The third option — Schwabing — is a longer-stay leafy alternative.",
  },

  // =========================================================================
  // DUBLIN
  // =========================================================================
  {
    slug: "south-city-centre-vs-stoneybatter",
    citySlug: "dublin",
    countrySlug: "ireland",
    aSlug: "south-city-centre",
    bSlug: "stoneybatter",
    aLabel: "South City Centre",
    bLabel: "Stoneybatter",
    metaTitle: "South City Centre vs Stoneybatter: Where to Stay in Dublin",
    metaDescription:
      "Dublin's polished south side or the hipster northside village? Compare across price, walkability, dinner, sleep.",
    intro:
      "Dublin's hotel scene is small and expensive. South City Centre — Trinity, Grafton Street, Merrion Square — is the polished, walkable, tourist-heavy version. Stoneybatter is the northside hipster-village alternative — craft pubs, brunch, real residents, 15-min walk to Temple Bar. Most first-time Dublin travelers should book South Side. Most repeat visitors should book Stoneybatter.",
    rounds: [
      {
        question: "Walking to Trinity College, Grafton Street, Temple Bar",
        winner: "a",
        body: "South City Centre wins — they're at your hotel door. From Stoneybatter it's 15-20 min walk across the river.",
      },
      {
        question: "Restaurants and evenings",
        winner: "tied",
        body: "South Side has more restaurants and bars but most are tourist-priced. Stoneybatter has fewer but they're consistently better and locally-priced. Even on overall quality.",
      },
      {
        question: "Hotel quality",
        winner: "a",
        body: "South Side has Dublin's polished hotels (Merrion, Westbury, Dawson). Stoneybatter has small boutiques and apartments but the polished mass is South Side.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Stoneybatter runs €130-€220/night for a comfortable mid-range. South Side runs €220-€400+ for the same. Dublin is expensive everywhere; Stoneybatter is the relative value.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Stoneybatter, decisively. Real residents, neighborhood pubs, the weekly market. South Side is overwhelmingly tourist-managed and corporate.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Stoneybatter is meaningfully quieter. South Side hotels near Temple Bar get the late-night noise spillover.",
      },
    ],
    pickA:
      "Pick South City Centre if you're on a 2-3 night first trip, you want walking distance to every major sight, or you're traveling for business. The premium pays for the location.",
    pickB:
      "Pick Stoneybatter if you're staying 4+ nights, you've been to Dublin before, you eat dinner out, or you specifically want a less touristy stay. The 15-20 min walk to Temple Bar is the entire downside.",
    bottomLine:
      "First-timer, short stay: South Side. Repeat or longer stay: Stoneybatter. Skip Temple Bar as a base entirely — the noise is unmanageable.",
  },

  // =========================================================================
  // STOCKHOLM
  // =========================================================================
  {
    slug: "gamla-stan-vs-sodermalm",
    citySlug: "stockholm",
    countrySlug: "sweden",
    aSlug: "gamla-stan",
    bSlug: "sodermalm",
    aLabel: "Gamla Stan",
    bLabel: "Södermalm",
    metaTitle: "Gamla Stan vs Södermalm: Where to Stay in Stockholm",
    metaDescription:
      "Stockholm's medieval old town or the design-shop southern island? Compare across walkability, dinner, price, sleep — and which Stockholm you're booking.",
    intro:
      "Stockholm is a city of islands, and the island you sleep on shapes the whole trip. Gamla Stan is the medieval old town — narrow cobbled alleys, the Royal Palace, the postcard. Södermalm is the southern island — vintage shops, design hotels, the city's best evening culture. Picking decides whether your trip is daytime sights or evening atmosphere.",
    rounds: [
      {
        question: "Walking to the Royal Palace and Gamla Stan sights",
        winner: "a",
        body: "Gamla Stan wins by definition. From Södermalm it's a 15-20 min walk across the bridge or 10 min on the metro.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Södermalm, decisively. Götgatan, SoFo and Hornstull have Stockholm's best evening dinner density. Gamla Stan dies after the day-trippers leave.",
      },
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Gamla Stan is medieval-cobbled-touristy. Södermalm is design-vintage-young. Different aesthetic centuries; both genuinely Stockholm.",
      },
      {
        question: "Price",
        winner: "tied",
        body: "Both run roughly €150-€280/night for a comfortable mid-range. Stockholm is expensive everywhere; the islands are similar.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Gamla Stan is dramatically quieter at night — touristy by day, dead by 10pm. Södermalm has weekend evening noise around Götgatan and Medborgarplatsen.",
      },
      {
        question: "Best for repeat visitors",
        winner: "b",
        body: "Södermalm. Gamla Stan has limited repeat-visit content; Södermalm has neighborhoods within neighborhoods (SoFo, Hornstull, Mariatorget) that reward exploration.",
      },
    ],
    pickA:
      "Pick Gamla Stan if it's your first Stockholm trip, you want to walk out into a medieval old town, and your stay is 2-3 nights. The postcard is the trip.",
    pickB:
      "Pick Södermalm if you've been to Stockholm before, your trip is dinner-and-design rather than sights, or you're staying 4+ nights. Most repeat visitors switch to Söder and don't go back.",
    bottomLine:
      "First trip, sights-driven: Gamla Stan. Repeat or food-driven: Södermalm. Norrmalm is for business travelers and 24-hour stops only.",
  },

  // =========================================================================
  // COPENHAGEN
  // =========================================================================
  {
    slug: "indre-by-vs-vesterbro",
    citySlug: "copenhagen",
    countrySlug: "denmark",
    aSlug: "indre-by",
    bSlug: "vesterbro",
    aLabel: "Indre By",
    bLabel: "Vesterbro",
    metaTitle: "Indre By vs Vesterbro: Where to Stay in Copenhagen",
    metaDescription:
      "Copenhagen's polished inner city or the design-magazine Vesterbro? Compare across price, sleep, dinner — and which side of the station you should sleep on.",
    intro:
      "These two neighborhoods sit on either side of Copenhagen's central station. Indre By is the polished, central, tourist-heavy version — Strøget, Round Tower, the picture-Copenhagen. Vesterbro is the formerly-rough, now-cool food-and-design district where the Meatpacking District (Kødbyen) sits. Most first-time travelers default to Indre By; most repeat visitors prefer Vesterbro.",
    rounds: [
      {
        question: "Walking to Strøget, Round Tower, Nyhavn",
        winner: "a",
        body: "Indre By wins. They're at your hotel door. From Vesterbro it's 15-20 min walk through Tivoli.",
      },
      {
        question: "Restaurants and evenings",
        winner: "b",
        body: "Vesterbro, decisively. Kødbyen is the densest weekend dinner zone in Copenhagen at locally-priced rates. Indre By dinner is hotel-restaurant pricing and tourist sets.",
      },
      {
        question: "Hotel character",
        winner: "tied",
        body: "Indre By has the grand-classics (D'Angleterre, Nimb). Vesterbro has design hotels (Coco, Skt. Petri Annex, Ottilia). Different products at similar prices.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Vesterbro runs €160-€280/night for a comfortable mid-range. Indre By runs €240-€450 for the same. Roughly 25-35% savings.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Vesterbro, by a wide margin. Real Copenhagen residents, weeknight dinners, neighborhood cafés. Indre By is overwhelmingly tourist-managed.",
      },
      {
        question: "Sleep quality",
        winner: "a",
        body: "Indre By is dramatically quieter at night. Vesterbro around Kødbyen runs late on Friday-Saturday — pick a side street.",
      },
    ],
    pickA:
      "Pick Indre By if it's your first Copenhagen trip, you have 2-3 nights, you want walking distance to every major sight, or you specifically want grand-Copenhagen luxury. The premium is real.",
    pickB:
      "Pick Vesterbro if you've been to Copenhagen before, your trip is dinner and design, or you want substantially better value at minimal walkability cost. Most travelers under 50 should consider this first.",
    bottomLine:
      "First-timer, short stay, sights-prioritized: Indre By. Repeat or food-driven: Vesterbro. The third option — Nørrebro — is the calmer, cheaper village version.",
  },

  // =========================================================================
  // FLORENCE
  // =========================================================================
  {
    slug: "santa-croce-vs-oltrarno",
    citySlug: "florence",
    countrySlug: "italy",
    aSlug: "santa-croce",
    bSlug: "oltrarno",
    aLabel: "Santa Croce",
    bLabel: "Oltrarno",
    metaTitle: "Santa Croce vs Oltrarno: Where to Stay in Florence",
    metaDescription:
      "Florence's two right-stays. Compare Santa Croce (east of Duomo, restaurant-dense) against Oltrarno (across the Arno, artisan-quiet) across walkability, food, sleep.",
    intro:
      "Florence is small enough that almost any central stay works, but the choice between these two is the one travelers actually argue about. Santa Croce is east of the Duomo — restaurant-dense, atmospheric, the postcard piazza. Oltrarno (south of the Arno, around Santo Spirito) is the lived-in, artisan-quiet alternative. Both are central walking-wise; the difference is night-and-day on atmosphere.",
    rounds: [
      {
        question: "Walking to the Duomo",
        winner: "a",
        body: "Santa Croce wins — 5-10 min walk to the Duomo. Oltrarno is 10-15 min across the Ponte Vecchio.",
      },
      {
        question: "Walking to the Pitti Palace and Boboli Gardens",
        winner: "b",
        body: "Oltrarno wins — they're at your hotel door. From Santa Croce it's 15-20 min walk.",
      },
      {
        question: "Restaurants",
        winner: "tied",
        body: "Santa Croce has higher density and tourist-leaning. Oltrarno has fewer but consistently better, more local restaurants — Santo Spirito has the city's most interesting evening scene. Even split.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Oltrarno wins. Santa Croce piazza bars run loud until midnight; Oltrarno is residential and quiet by 10pm except in Santo Spirito's small bar zone.",
      },
      {
        question: "Local feel",
        winner: "b",
        body: "Oltrarno, by a wide margin. Artisan workshops (leather, paper, gilding) are still working studios. Santa Croce is heavily tourist-managed.",
      },
      {
        question: "Price",
        winner: "b",
        body: "Oltrarno runs €130-€240/night for a comfortable mid-range. Santa Croce runs €180-€350 for the same. Roughly 20-30% savings.",
      },
    ],
    pickA:
      "Pick Santa Croce if it's your first Florence trip, your trip is Uffizi-and-Duomo prioritized, you want dinner-restaurant density at your door, and 2-3 nights is your stay.",
    pickB:
      "Pick Oltrarno if you've been to Florence before, you're traveling 4+ nights, you want quieter evenings, or you're interested in Florentine craft (leather, paper, gilding). The 10-min walk across the Arno is trivial; what you get back is meaningfully better value and atmosphere.",
    bottomLine:
      "Short, sights-prioritized: Santa Croce. Longer, atmosphere-prioritized: Oltrarno. Don't book near Santa Maria Novella unless you have a 5am train.",
  },

  {
    slug: "kreuzberg-vs-prenzlauer-berg",
    citySlug: "berlin",
    countrySlug: "germany",
    aSlug: "kreuzberg",
    bSlug: "prenzlauer-berg",
    aLabel: "Kreuzberg",
    bLabel: "Prenzlauer Berg",
    metaTitle: "Kreuzberg vs Prenzlauer Berg: The Lived-In Berlin",
    metaDescription:
      "Two neighborhoods Berlin regulars debate. Compare Kreuzberg's nightlife edge against Prenzlauer Berg's leafy family-friendly streets.",
    intro:
      "These are the two neighborhoods that win the 'where would you actually live in Berlin' argument. Kreuzberg is the food-and-nightlife corner — Turkish bakeries, late clubs, restored 1900s tenements with grit. Prenzlauer Berg is the family-friendly corner — leafy streets, playgrounds, restored 1900s tenements without grit. Different decades of life.",
    rounds: [
      {
        question: "Atmosphere",
        winner: "tied",
        body: "Kreuzberg is grittier, more diverse, more 24-hour. Prenzlauer Berg is leafier, calmer, more 30-something. Both are restored Altbau housing; both feel like real neighborhoods. Different ages.",
      },
      {
        question: "Restaurants",
        winner: "a",
        body: "Kreuzberg wins. Wider price range, more cuisine variety, denser per-block. Prenzlauer Berg's restaurants tilt brunchy and family-friendly with less depth at dinner.",
      },
      {
        question: "Sleep quality",
        winner: "b",
        body: "Prenzlauer Berg, decisively. Quiet leafy streets, residential acoustic profile, almost no late-night noise. Kreuzberg is the opposite of this.",
      },
      {
        question: "Best for families",
        winner: "b",
        body: "Prenzlauer Berg. Playgrounds in every other plaza, family-aware restaurants, calmer streets, walkable to the Mauerpark. Kreuzberg with kids is doable but inappropriate.",
      },
      {
        question: "Walking to central sights",
        winner: "a",
        body: "Kreuzberg is closer — Brandenburg Gate is 25-30 min walk or 15 min by U-Bahn. Prenzlauer Berg is 30-40 min walk or 20 min by tram. Marginal but real.",
      },
      {
        question: "Nightlife",
        winner: "a",
        body: "Kreuzberg by a wide margin. Berghain, RSO, Kotti, Görli — all at your front door. Prenzlauer Berg has wine bars and a few music venues; that's it.",
      },
    ],
    pickA:
      "Pick Kreuzberg if you're under 40, your trip is food and nightlife, you're not bringing kids, and you can sleep through some street noise. The neighborhood does evenings better than anywhere in Berlin.",
    pickB:
      "Pick Prenzlauer Berg if you're traveling with kids, you're over 40 and want a calm trip, you value leafy walks and brunches, or you specifically want the prettiest restored Altbau streets in Berlin. The trade-off is paying for an Uber if you go out late.",
    bottomLine:
      "Kreuzberg for the energetic, food-and-nightlife Berlin. Prenzlauer Berg for the calm, leafy, family-friendly Berlin. Both reward longer stays.",
  },
];

// =============================================================================
// EXPANSION BATCH — tier-3 cities (Krakow, Venice, Milan, Naples, Edinburgh,
// Sarajevo, Lyon, Marseille, Seville, Valencia, Hamburg, Santorini, Cappadocia,
// Split, Dubrovnik, Warsaw, Oslo, Helsinki, Salzburg, Zurich, Zagreb, Bordeaux,
// Antwerp, Cologne, Mostar, Nice, Aarhus). Same voice rules as above.
// =============================================================================
COMPARISONS.push(
  // KRAKOW: Stare Miasto vs Kazimierz
  {
    slug: "stare-miasto-vs-kazimierz",
    citySlug: "krakow",
    countrySlug: "poland",
    aSlug: "stare-miasto-krakow",
    bSlug: "kazimierz",
    aLabel: "Stare Miasto",
    bLabel: "Kazimierz",
    metaTitle: "Stare Miasto vs Kazimierz: Where to Stay in Krakow",
    metaDescription:
      "Krakow's Old Town or the Jewish Quarter? Honest comparison of vibe, walkability, restaurants, price and noise — pick the right base for your trip.",
    intro:
      "These are Krakow's two obvious candidates and they answer different questions. Stare Miasto is the postcard — Rynek Główny, Wawel, all the day-trip logistics. Kazimierz is the after-dinner Krakow — bars in courtyards, Jewish heritage walks, the city's best restaurants. Most first-timers default to Stare Miasto by reflex; that's not always right.",
    rounds: [
      { question: "First-timer convenience", winner: "a", body: "Stare Miasto wins. Rynek Główny is at your door, Wawel is 10 min south, the bus to Auschwitz leaves from the western edge. Kazimierz is a 15-20 min walk to the main square — fine, but not central." },
      { question: "Restaurants and bars", winner: "b", body: "Kazimierz, decisively. Plac Nowy, ul. Józefa, ul. Szeroka — denser per-block than anywhere in the Old Town, less tourist-priced, more local crowd at midnight." },
      { question: "Price", winner: "b", body: "Kazimierz averages 20-30% cheaper for equivalent product. A central Old Town hotel runs €120-€220/night; the same in Kazimierz is €90-€160." },
      { question: "Quiet sleep", winner: "tied", body: "Both have noise problems on weekends — stag groups in Stare Miasto's market-side hotels, Plac Nowy bar overflow in Kazimierz. Side streets in either are fine." },
      { question: "Atmosphere after dark", winner: "b", body: "Kazimierz feels alive past 10pm; Stare Miasto thins to tour groups and chain restaurants. The bar courtyards (Alchemia, Singer) are where Krakow's evenings actually happen." },
      { question: "Day-trip logistics", winner: "a", body: "Stare Miasto is closer to the Auschwitz/Wieliczka pickup points and the main bus station. Kazimierz adds 15 min to either departure." },
    ],
    pickA: "Pick Stare Miasto if it's your first trip, you have 2-3 nights, and you want every major sight at walking distance. The premium is real but you'll use it.",
    pickB: "Pick Kazimierz if it's a return visit, your trip is food and bars, you value local feel over postcard convenience, or you're staying 4+ nights. The 15-min walk to the Old Town stops mattering after night one.",
    bottomLine: "Stare Miasto for first-timers on a short trip. Kazimierz for everyone else.",
  },
  // KRAKOW: Kazimierz vs Podgórze
  {
    slug: "kazimierz-vs-podgorze",
    citySlug: "krakow",
    countrySlug: "poland",
    aSlug: "kazimierz",
    bSlug: "podgorze",
    aLabel: "Kazimierz",
    bLabel: "Podgórze",
    metaTitle: "Kazimierz vs Podgórze: Krakow's Two Alt Neighborhoods",
    metaDescription:
      "Lively Kazimierz or post-industrial Podgórze across the river? Real differences in price, food, walkability, and which trip each one fits.",
    intro:
      "Kazimierz is the obvious second choice after Stare Miasto. Podgórze, across the river, is what Kazimierz was 15 years ago — quieter, cheaper, with the Schindler's Factory museum and the Ghetto Heroes Square. Both work. The choice is about energy level, not quality.",
    rounds: [
      { question: "Vibe", winner: "tied", body: "Kazimierz is dense, social, bar-courtyard-driven. Podgórze is leafy, residential, with one or two strong restaurants per block — not a single street where everything is happening." },
      { question: "Price", winner: "b", body: "Podgórze is 15-20% cheaper than Kazimierz for the same product. Apartment rentals especially — full one-bedrooms run €60-€90/night where Kazimierz starts at €100." },
      { question: "Walkability to Stare Miasto", winner: "a", body: "Kazimierz is 15-20 min walk; Podgórze is 25-30 min via the Bernatka footbridge. Both fine for a daily commute, neither close." },
      { question: "Best for repeat visitors", winner: "b", body: "Podgórze, if you've done Kazimierz already. Schindler's Factory, MOCAK, and the Krakus Mound are all here. The whole quarter is unhurried in a way Kazimierz no longer is." },
      { question: "Restaurants", winner: "a", body: "Kazimierz wins — denser, more variety, longer hours. Podgórze has 5-6 strong picks (Zakładka, Pies Czy Suka), but you'll exhaust them in a long weekend." },
    ],
    pickA: "Pick Kazimierz if you want bar-courtyard density, lots of restaurant choice, and a trip where 'walking around at night' is the activity. It's the busier sister.",
    pickB: "Pick Podgórze if you've done Kazimierz, you want a leafier and cheaper base, you're focused on Schindler's Factory and the museum quarter, or you specifically want a calmer Krakow.",
    bottomLine: "Kazimierz for the lively trip. Podgórze for the slower, cheaper, second-time Krakow.",
  },
  // VENICE: Cannaregio vs Dorsoduro
  {
    slug: "cannaregio-vs-dorsoduro",
    citySlug: "venice",
    countrySlug: "italy",
    aSlug: "cannaregio",
    bSlug: "dorsoduro",
    aLabel: "Cannaregio",
    bLabel: "Dorsoduro",
    metaTitle: "Cannaregio vs Dorsoduro: Where to Stay in Venice",
    metaDescription:
      "Two of Venice's best sestieri compared honestly. Cannaregio's local feel and bacari vs Dorsoduro's art-museum quarter — which suits your trip.",
    intro:
      "These are the two sestieri Venice repeat-visitors recommend over San Marco, and they're genuinely different. Cannaregio is residential, Jewish-heritage, with the city's best cicchetti crawl. Dorsoduro is art-and-students — Accademia, Peggy Guggenheim, the Zattere promenade. Both avoid the worst of San Marco's day-tripper crush.",
    rounds: [
      { question: "Local feel", winner: "a", body: "Cannaregio wins — actual Venetians live here, the Strada Nova has neighborhood butchers and bakeries, you'll see kids walking to school. Dorsoduro is mostly students and museum visitors." },
      { question: "Walkability to San Marco", winner: "b", body: "Dorsoduro is closer — the Accademia bridge gets you to San Marco in 12-15 min. Cannaregio is 20-25 min from most addresses, longer if you're near the train station." },
      { question: "Restaurants and bacari", winner: "a", body: "Cannaregio is the cicchetti capital — Vino Vero, Al Timon, the Fondamenta della Misericordia chain are all walkable from each other. Dorsoduro has good picks but less density." },
      { question: "Art museums on foot", winner: "b", body: "Dorsoduro, by a wide margin. The Accademia, Peggy Guggenheim, Punta della Dogana and Ca' Rezzonico are all in the sestiere itself. Cannaregio's main draw (the Ghetto) is heritage, not art." },
      { question: "Quiet sleep", winner: "tied", body: "Both quieter than San Marco. Cannaregio's Fondamenta della Misericordia gets loud on weekends; Dorsoduro's student bars near Campo Santa Margherita do the same. Side calli in either are silent." },
      { question: "Price", winner: "a", body: "Cannaregio runs slightly cheaper — €150-€280 for a decent hotel vs Dorsoduro's €180-€350. The gap shrinks for canal-view rooms." },
    ],
    pickA: "Pick Cannaregio if your priority is dinner, evening bacari crawls, a feel of actual Venice, or you've done San Marco on a previous trip. The 20-min walk to the basilica is fine — it's also the prettiest walk in the city.",
    pickB: "Pick Dorsoduro if your trip is art-and-museums focused, you want a 12-min walk to San Marco, or you're traveling with a partner who wants quiet leafy fondamentas. Both choices are upgrades over San Marco itself.",
    bottomLine: "Cannaregio for the dinner-and-feel Venice. Dorsoduro for the art-and-walk Venice.",
  },
  // VENICE: San Marco vs Cannaregio
  {
    slug: "san-marco-vs-cannaregio",
    citySlug: "venice",
    countrySlug: "italy",
    aSlug: "san-marco-venice",
    bSlug: "cannaregio",
    aLabel: "San Marco",
    bLabel: "Cannaregio",
    metaTitle: "San Marco vs Cannaregio: First-Time Venice Stay",
    metaDescription:
      "San Marco's central convenience or Cannaregio's local feel? Honest take on day-tripper crowds, prices, food, and which to pick for a 2-3 night Venice trip.",
    intro:
      "Almost every first-time Venice traveler picks San Marco by default. It's the sestiere with the basilica, the Doge's Palace and most Instagrammed bridges. Cannaregio sits north of the train station — quieter, residential, the cicchetti capital. The pick depends on whether you can stomach day-tripper crowds for the convenience.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "San Marco wins by definition — basilica, palace, Rialto Bridge, all 5 min walk. Cannaregio is 20-25 min from any of them." },
      { question: "Day-tripper crush", winner: "b", body: "San Marco's main streets are unwalkable 11am-4pm in season. Cannaregio gets none of this — you'll feel like the only tourist on most calli." },
      { question: "Evening atmosphere", winner: "b", body: "After the day-trippers leave (~6pm), San Marco is half-empty and feels staged. Cannaregio's Fondamenta della Misericordia is when it starts to fill up — that's where Venetians have aperitivo." },
      { question: "Price", winner: "b", body: "Cannaregio averages 25-40% cheaper than San Marco. A San Marco hotel near the basilica runs €280-€600+; a similar product in Cannaregio is €150-€280." },
      { question: "Restaurants past 9pm", winner: "b", body: "San Marco's restaurants tilt early-dinner tourist trade and close by 10pm. Cannaregio bacari serve until midnight — that's where the food trip happens." },
    ],
    pickA: "Pick San Marco if it's a single night, your trip is sights-only, mobility is limited, or the basilica-at-dawn experience is the whole point. Pay the premium and use it.",
    pickB: "Pick Cannaregio for any 2+ night stay where dinner matters. The 20-min walk to San Marco passes the prettiest bridges in the city — you'll do it twice a day and not mind.",
    bottomLine: "San Marco for the sights-only flying visit. Cannaregio for everyone else.",
  },
  // MILAN: Brera vs Navigli
  {
    slug: "brera-vs-navigli",
    citySlug: "milan",
    countrySlug: "italy",
    aSlug: "brera",
    bSlug: "navigli",
    aLabel: "Brera",
    bLabel: "Navigli",
    metaTitle: "Brera vs Navigli: Where to Stay in Milan",
    metaDescription:
      "Brera's design-and-cobblestone quarter or Navigli's canal-and-aperitivo strip? Concrete differences in vibe, price, walkability and noise.",
    intro:
      "Milan's two most-recommended bases for short trips. Brera is the picturesque one — narrow streets near the Pinacoteca, the Duomo at 10 min walk. Navigli is south by the canals — aperitivo strip, restaurant-dense, livelier and louder. Same city, very different evenings.",
    rounds: [
      { question: "Walkability to the Duomo", winner: "a", body: "Brera wins. The Duomo is a 10-12 min walk from any Brera address; Navigli is 25-30 min or one metro ride." },
      { question: "Aperitivo and dinner density", winner: "b", body: "Navigli, by a wide margin. The canal banks have 80+ bars on a single weekend night; Brera has 10-15 good picks but less choice." },
      { question: "Quiet sleep", winner: "a", body: "Brera. The streets are residential after midnight. Navigli stays loud until 2-3am on Fri-Sat — the canal-side rooms are unsleepable in summer." },
      { question: "Atmosphere", winner: "tied", body: "Brera is older, quieter, design-and-museum. Navigli is younger, louder, dinner-and-drinks. Both feel distinctly Milan — pick on energy, not quality." },
      { question: "Price", winner: "b", body: "Navigli is 15-25% cheaper than Brera for the same product. Brera commands a Quadrilatero-adjacent premium; Navigli is far enough from the centro to discount." },
      { question: "Best for first-timers", winner: "a", body: "Brera. The Duomo, La Scala, Castello Sforzesco are all under 15 min walk. Navigli is where you go for a meal — Brera is where you stay." },
    ],
    pickA: "Pick Brera if it's a 1-2 night trip, you want the Duomo at walking distance, you sleep light, or your trip is design-and-museum focused. It's the calmer, more central pick.",
    pickB: "Pick Navigli if your evenings are the point of the trip, you want aperitivo at your front door, you're under 35, or you specifically want the canal-side photo. The metro to the Duomo runs every 4 minutes.",
    bottomLine: "Brera for first-timers and quiet sleepers. Navigli for the food-and-aperitivo trip.",
  },
  // NAPLES: Centro Storico vs Chiaia
  {
    slug: "centro-storico-vs-chiaia",
    citySlug: "naples",
    countrySlug: "italy",
    aSlug: "centro-storico-naples",
    bSlug: "chiaia",
    aLabel: "Centro Storico",
    bLabel: "Chiaia",
    metaTitle: "Centro Storico vs Chiaia: Where to Stay in Naples",
    metaDescription:
      "Naples' chaotic UNESCO heart or its quiet seafront? Honest comparison: noise, safety, food, walkability and which suits your trip.",
    intro:
      "Naples is the European city where the neighborhood pick changes the trip the most. Centro Storico is the loud, scooter-dense, pizza-and-Spaccanapoli Naples that shows up in every photo. Chiaia is the calm sea-front Naples nobody warns you about — wide streets, design shops, families with prams. Both are good. They're not the same trip.",
    rounds: [
      { question: "First-timer atmosphere", winner: "a", body: "Centro Storico wins for the cliché Naples — narrow vicoli, hanging laundry, Pizzeria Sorbillo on Via Tribunali. Chiaia is gentle and could be any Mediterranean city." },
      { question: "Quiet sleep", winner: "b", body: "Chiaia, by a huge margin. Scooters and shouting carry through Centro Storico vicoli all night. Chiaia is residential and silent after 11pm." },
      { question: "Walkability to sights", winner: "a", body: "Centro Storico has the duomo, the underground, the museum quarter at 10 min walk. Chiaia is 20-25 min east and feels like a different city." },
      { question: "Best for first-time Naples", winner: "a", body: "Centro Storico, decisively. The point of a first trip is the noise — staying in Chiaia, you're missing the city you came for." },
      { question: "Best for second-time Naples", winner: "b", body: "Chiaia. After you've done the historic core, the sea-front becomes the appeal — sunset on Via Caracciolo, wine bars on Vico Belledonne, easier morning logistics." },
      { question: "Family with kids", winner: "b", body: "Chiaia, no contest. Centro Storico is genuinely hard with a stroller — narrow vicoli, motorbikes, no playgrounds. Villa Comunale in Chiaia is one of the best urban family parks in Italy." },
    ],
    pickA: "Pick Centro Storico if it's your first time in Naples, you want the chaotic-pizza-vicoli cliché, you're under 40 and traveling without kids. The noise is the point.",
    pickB: "Pick Chiaia if you've done Centro Storico, you have kids, you sleep light, or you specifically want a quieter Italian sea-front trip. Naples gentles down considerably west of Piazza del Plebiscito.",
    bottomLine: "Centro Storico for the cliché Naples. Chiaia for the quieter, second-time, family-friendly version.",
  },
  // SARAJEVO: Baščaršija vs Marijin Dvor
  {
    slug: "bascarsija-vs-marijin-dvor",
    citySlug: "sarajevo",
    countrySlug: "bosnia-and-herzegovina",
    aSlug: "bascarsija",
    bSlug: "marijin-dvor",
    aLabel: "Baščaršija",
    bLabel: "Marijin Dvor",
    metaTitle: "Baščaršija vs Marijin Dvor: Where to Stay in Sarajevo",
    metaDescription:
      "Sarajevo's Ottoman bazaar quarter or its quiet 19th-century west? Honest take on first-time pick, noise, walkability and price.",
    intro:
      "Sarajevo's two obvious bases. Baščaršija is the Ottoman heart — the Sebilj fountain, the bazaar, the call to prayer at sunset. Marijin Dvor is 15-20 min west, mostly Austro-Hungarian and post-war architecture, where the parliament and the National Museum sit. Most travelers want Baščaršija. A few specifically don't.",
    rounds: [
      { question: "First-timer atmosphere", winner: "a", body: "Baščaršija wins by definition — this is the Sarajevo of every photo, with copper-smiths, ćevapi grills, and the Latin Bridge 5 min east. Marijin Dvor feels like Vienna with worse traffic." },
      { question: "Walkability", winner: "a", body: "Baščaršija is at the eastern end of Ferhadija, Sarajevo's main pedestrian street. Marijin Dvor is at the western end. From Baščaršija you walk west into the city; from Marijin Dvor you walk east, longer to most things." },
      { question: "Restaurants", winner: "a", body: "Baščaršija has the highest density of ćevapi houses, traditional pivnica, and the bazaar coffee shops. Marijin Dvor has 4-5 strong picks but no cluster." },
      { question: "Quiet sleep", winner: "b", body: "Marijin Dvor, by a meaningful margin. Baščaršija has 6am call to prayer, scooter noise, and tour group churn from 8am. Marijin Dvor is residential calm." },
      { question: "Price", winner: "tied", body: "Both are 30-40% cheaper than Western European equivalents. Baščaršija runs €40-€90 for decent product; Marijin Dvor €40-€80. Effectively a wash." },
      { question: "Best for second-time visitors", winner: "b", body: "Marijin Dvor. The Tunnel Museum and Holiday Inn (Yugoslav-era) sit nearby, the trams to Ilidža start here, and you're closer to the war-history walking routes." },
    ],
    pickA: "Pick Baščaršija if it's your first time, your trip is 1-3 nights, and you want the Ottoman quarter at your door. The noise is the trade-off — light sleepers should go to Marijin Dvor instead.",
    pickB: "Pick Marijin Dvor if you've been to Sarajevo before, you want a calmer base, your trip leans war-history (museums, tunnel), or you sleep light. The 15 min walk to the bazaar takes you down Ferhadija, which is the prettiest street in the city.",
    bottomLine: "Baščaršija for the cliché Sarajevo. Marijin Dvor for the calmer, second-time version.",
  },
  // LYON: Vieux Lyon vs Presqu'île
  {
    slug: "vieux-lyon-vs-presquile",
    citySlug: "lyon",
    countrySlug: "france",
    aSlug: "vieux-lyon",
    bSlug: "presquile",
    aLabel: "Vieux Lyon",
    bLabel: "Presqu'île",
    metaTitle: "Vieux Lyon vs Presqu'île: Where to Stay in Lyon",
    metaDescription:
      "Lyon's Renaissance UNESCO old town or the lively Presqu'île peninsula? Real differences in vibe, food, walkability and price.",
    intro:
      "Vieux Lyon is the postcard — Renaissance facades, traboules, the funicular up to Fourvière. Presqu'île is the lively peninsula between the Rhône and Saône, where most restaurants, shopping, and Place Bellecour sit. The pick comes down to whether you want to sleep inside the photo or where Lyonnais actually go for dinner.",
    rounds: [
      { question: "Pretty factor", winner: "a", body: "Vieux Lyon is the prettiest concentrated stretch in southeast France — Place du Change, the cathedral, the cobblestone alleys are why people come. Presqu'île is handsome but unremarkable in the same lineup." },
      { question: "Restaurants", winner: "b", body: "Presqu'île wins. The Quartier des Halles, rue Mercière (yes, touristy, also good), and the bouchon strips have real density. Vieux Lyon has 30-40 bouchons in a tiny radius — most are tourist-priced and lower quality." },
      { question: "Walkability", winner: "b", body: "Presqu'île is central — you walk to the river either way. Vieux Lyon is across the Saône, fine but adds 10 min to most things." },
      { question: "Price", winner: "a", body: "Vieux Lyon is slightly cheaper — €110-€180 for a Renaissance-era hotel vs €130-€220 on Presqu'île. The cobblestone romance comes with smaller rooms and slow Wi-Fi." },
      { question: "Quiet sleep", winner: "tied", body: "Vieux Lyon's restaurants close by 11pm — quiet after. Presqu'île has bar streets that go later but most stays are off the noisy stretches." },
    ],
    pickA: "Pick Vieux Lyon if you're staying 1-2 nights, the Renaissance setting is the point, and you can accept lower-quality bouchon dinners. It's the prettiest place to wake up in Lyon.",
    pickB: "Pick Presqu'île for any 3+ night stay, dinner-focused trips, or first-time travelers who want everything walkable. Vieux Lyon is 10 min by foot — you'll see it at sunset and not need to sleep there.",
    bottomLine: "Vieux Lyon for the photo. Presqu'île for the food, walkability and longer stays.",
  },
  // MARSEILLE: Le Panier vs Vieux Port
  {
    slug: "le-panier-vs-vieux-port",
    citySlug: "marseille",
    countrySlug: "france",
    aSlug: "le-panier",
    bSlug: "vieux-port",
    aLabel: "Le Panier",
    bLabel: "Vieux Port",
    metaTitle: "Le Panier vs Vieux Port: Where to Stay in Marseille",
    metaDescription:
      "Le Panier's hilltop artisan quarter or Vieux Port's harbor-side convenience? Real-world take on noise, safety, walkability and food.",
    intro:
      "Marseille's two safest, most-recommended bases for a first trip. Le Panier is the hill quarter north of the harbor — narrow streets, ateliers, the Vieille Charité. Vieux Port is the C-shaped harbor with the morning fish market, ferries to Frioul and most of the city's metro intersections. Both work; the choice is hilly-pretty vs flat-and-central.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Le Panier wins on charm — pastel facades, soap shops, neighborhood feel. Vieux Port is broader and grittier; you're staying in a working harbor." },
      { question: "Walkability", winner: "b", body: "Vieux Port is the metro hub — the M1 and M2 cross at Vieux-Port station, and bus 60 to Notre-Dame de la Garde leaves from the south side. Le Panier is uphill from any of this." },
      { question: "Safety perception", winner: "a", body: "Le Panier feels gentler at night — pedestrian, residential, lit. The far side of Vieux Port (toward Belsunce) deteriorates fast after dark; pick a hotel south of the harbor if going Vieux Port." },
      { question: "Restaurants", winner: "tied", body: "Le Panier has small atelier-restaurants and bouillabaisse spots. Vieux Port has the harbor-side seafood (touristy, real fish). Both fine for 2-3 nights." },
      { question: "Day-trip logistics", winner: "b", body: "Vieux Port. Ferries to Frioul/Château d'If leave from the south side, the bus to Cassis-and-calanques starts here, and the train station is a 12-min walk." },
    ],
    pickA: "Pick Le Panier if you want the prettiest Marseille, you're traveling as a couple, the atelier-and-cafe wandering is the point. The hill walk to and from is 10-15 min — fine unless mobility is an issue.",
    pickB: "Pick Vieux Port (specifically the south side, near Quai de Rive Neuve) if you have only 1-2 nights, you're doing day trips, or mobility matters. The metro saves real time over a hilly base.",
    bottomLine: "Le Panier for the postcard Marseille. Vieux Port (south side) for logistics-first short trips.",
  },
  // SEVILLE: Santa Cruz vs Alameda de Hércules
  {
    slug: "santa-cruz-vs-alameda-de-hercules",
    citySlug: "seville",
    countrySlug: "spain",
    aSlug: "santa-cruz",
    bSlug: "alameda-de-hercules",
    aLabel: "Santa Cruz",
    bLabel: "Alameda",
    metaTitle: "Santa Cruz vs Alameda de Hércules: Where to Stay in Seville",
    metaDescription:
      "Seville's whitewashed Jewish quarter or the lively Alameda? Concrete take on tourist crush, food, noise and which neighborhood fits each trip.",
    intro:
      "Santa Cruz is what you imagine — orange trees, narrow whitewashed lanes, the cathedral five minutes away. Alameda de Hércules is 15 min north — a long tree-shaded plaza ringed by tapas bars where Sevillanos actually go. The pick separates first-time tourists from repeat visitors.",
    rounds: [
      { question: "First-timer atmosphere", winner: "a", body: "Santa Cruz wins. The cathedral, Alcázar, and orange-tree alleys are the Seville cliché — staying inside it is what you came for." },
      { question: "Restaurants and bars at night", winner: "b", body: "Alameda, by a wide margin. The plaza ring and side streets (Calle Trajano, Feria) stay alive past midnight with mostly local crowds. Santa Cruz tilts tourist-priced and quiets early." },
      { question: "Walkability", winner: "a", body: "Santa Cruz is 5-10 min to the cathedral. Alameda is 15-20 min from the same. Both walk to the river — Alameda's an extra few minutes." },
      { question: "Tourist crush", winner: "b", body: "Santa Cruz becomes nearly unwalkable mid-day in season. Alameda gets none of this — you'll feel like a local, not a guest." },
      { question: "Price", winner: "b", body: "Alameda runs 15-25% cheaper than Santa Cruz for equivalent product, especially apartments. €70-€130 vs €100-€180 for similar quality." },
      { question: "Best for couples on a romantic trip", winner: "a", body: "Santa Cruz, decisively — the orange-tree-and-balcony cliché works in person. Alameda is fun but unromantic." },
    ],
    pickA: "Pick Santa Cruz for first-time visits, romantic trips, or short stays where every minute saved on walks matters. The premium and tourist crush are real but you're paying for the prettiest setting.",
    pickB: "Pick Alameda for return visits, food-and-bar focused trips, longer stays, or anyone who wants a real Sevillano evening. The 15 min walk to the cathedral becomes a daily ritual you'll enjoy.",
    bottomLine: "Santa Cruz for the cliché. Alameda for the local feel.",
  },
  // VALENCIA: Ciutat Vella vs Ruzafa
  {
    slug: "ciutat-vella-vs-ruzafa",
    citySlug: "valencia",
    countrySlug: "spain",
    aSlug: "ciutat-vella",
    bSlug: "ruzafa",
    aLabel: "Ciutat Vella",
    bLabel: "Ruzafa",
    metaTitle: "Ciutat Vella vs Ruzafa: Where to Stay in Valencia",
    metaDescription:
      "Valencia's medieval old town or the trendy Ruzafa quarter? Honest comparison: cathedral access, food, noise, price and trip fit.",
    intro:
      "Ciutat Vella covers the medieval core — the cathedral, the silk exchange, the central market. Ruzafa is south of the train station, the converted-warehouse food-and-bar quarter where Valencianos under 40 actually go. Both work; the trip changes a lot between them.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Ciutat Vella. Cathedral, Mercado Central, Lonja, Torres de Serranos all walking. Ruzafa is 15-20 min south of any of these." },
      { question: "Restaurants and bars", winner: "b", body: "Ruzafa, decisively. Calle Cádiz, Cuba, Sueca form the densest dinner-and-cocktail strip in the city. Ciutat Vella has touristy paella spots and not much past 11pm." },
      { question: "Best for paella eating", winner: "tied", body: "Both terrible for paella — go to Malvarrosa or Pinedo on the coast. Ciutat Vella's central paella places are tourist traps; Ruzafa's are better but still indoor." },
      { question: "Quiet sleep", winner: "a", body: "Ciutat Vella, marginally. Ruzafa's nightlife streets stay loud Thursday-Saturday until 3am. Both have side streets that stay quiet." },
      { question: "Atmosphere", winner: "tied", body: "Ciutat Vella is medieval-historic-tourist. Ruzafa is converted-warehouse-design-young. Both feel real Valencia. Pick on age and energy, not authenticity." },
    ],
    pickA: "Pick Ciutat Vella for first-time visits, sights-focused trips, anyone over 50, and stays under 3 nights where you don't want to walk twice as much. It's the obvious first choice.",
    pickB: "Pick Ruzafa for return visits, food-and-cocktail trips, anyone under 40 who wants the trendy Valencia, or stays of 4+ nights where the nightlife matters. The walk to the cathedral takes 15 min through the old quarter — worth doing.",
    bottomLine: "Ciutat Vella for the historic Valencia. Ruzafa for the food-and-design Valencia.",
  },
  // EDINBURGH: Old Town vs New Town
  {
    slug: "old-town-vs-new-town",
    citySlug: "edinburgh",
    countrySlug: "united-kingdom",
    aSlug: "old-town-edinburgh",
    bSlug: "new-town-edinburgh",
    aLabel: "Old Town",
    bLabel: "New Town",
    metaTitle: "Old Town vs New Town: Where to Stay in Edinburgh",
    metaDescription:
      "Edinburgh's medieval Royal Mile or its Georgian New Town? Honest comparison: noise, walkability, restaurants, festival timing and price.",
    intro:
      "Old Town runs along the volcanic ridge — the Royal Mile, the castle, Grassmarket. New Town is the Georgian grid north of Princes Street — wider streets, taller hotels, the shopping. They're both UNESCO. The choice is medieval-and-loud vs Georgian-and-calm.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Old Town wins. Castle, Royal Mile, Holyrood, the Vaults, Underground tours — all on a single ridge. New Town has the National Gallery and the shopping; less iconic." },
      { question: "Quiet sleep", winner: "b", body: "New Town, by a wide margin. Old Town's Cowgate and Grassmarket bars run until 3am, and pub-crawl noise spills over into hotel rooms on Cockburn Street and Niddry. New Town is residential after midnight." },
      { question: "Restaurants", winner: "tied", body: "Old Town has high-density tourist restaurants with mixed quality. New Town's Stockbridge edge and Thistle Street have better picks but lower density. Both fine for 2-3 nights." },
      { question: "Festival timing (August)", winner: "a", body: "Old Town wins for the Fringe — venues are at your door, you can do 5-6 shows in a day. New Town adds 10-15 min walking to most venues; doable but a tax." },
      { question: "Price", winner: "tied", body: "Old Town and New Town are roughly equivalent — €150-€280/night for decent product. Festival pricing (August) doubles both." },
      { question: "Best for first-timers", winner: "a", body: "Old Town. The atmosphere is the city's main draw — the Royal Mile lit at night, closes leading off, the volcanic-ridge layout. New Town feels like Bath or Bloomsbury — handsome, generic." },
    ],
    pickA: "Pick Old Town for first-time visits, festival stays, sights-focused trips, anyone who wants the medieval Edinburgh atmosphere. Bring earplugs for weekend nights.",
    pickB: "Pick New Town for return visits, longer stays, families with young kids, or anyone who sleeps light. The Royal Mile is 10 min walk uphill — that's part of the daily routine.",
    bottomLine: "Old Town for the atmosphere. New Town for the calm sleep.",
  },
  // HAMBURG: Sternschanze vs St. Pauli
  {
    slug: "sternschanze-vs-st-pauli",
    citySlug: "hamburg",
    countrySlug: "germany",
    aSlug: "sternschanze",
    bSlug: "st-pauli",
    aLabel: "Sternschanze",
    bLabel: "St. Pauli",
    metaTitle: "Sternschanze vs St. Pauli: Where to Stay in Hamburg",
    metaDescription:
      "Hamburg's punk-leftist Schanze or the Reeperbahn's St. Pauli? Real-world differences in vibe, noise, food and which trip each fits.",
    intro:
      "These are Hamburg's two famous post-industrial quarters and they're not interchangeable. Sternschanze is the punk-leftist quarter — stencil graffiti, vegan döner, the Rote Flora squat. St. Pauli is the Reeperbahn — sex shops, music venues, FC St. Pauli football, more tourist-aware. Both are alive past 3am.",
    rounds: [
      { question: "Vibe", winner: "tied", body: "Schanze is grittier, more political, the bar scene is local-and-leftist. St. Pauli is rowdier, more bachelor parties on weekends, more music-and-bar tourism. Pick on what you want from a night out." },
      { question: "Quiet sleep", winner: "a", body: "Schanze marginally — the bars are quieter than the Reeperbahn, and most are on side streets. St. Pauli's main strip is a wall of noise until 5am Friday and Saturday." },
      { question: "Walkability to the harbor", winner: "b", body: "St. Pauli wins. The Landungsbrücken (harbor) and the Elbphilharmonie are 15-20 min walk. Schanze is 25-30 min from either." },
      { question: "Restaurants", winner: "a", body: "Schanze is the better food quarter — Schulterblatt and Susannenstraße have density of small kitchens, vegan-and-Turkish-and-craft-pizza. St. Pauli's restaurants are mostly bar food." },
      { question: "Family safe", winner: "tied", body: "Both fine during the day. Both inappropriate Friday-Saturday nights, especially around children. Schanze is the safer choice if traveling with teens." },
    ],
    pickA: "Pick Schanze if you want the political, food-focused, Berlin-of-Hamburg version. The vibe rewards 3+ nights.",
    pickB: "Pick St. Pauli if the music venues and Reeperbahn are the point, you're under 35, and you accept that weekend-night sleep is impossible. The Beatles-tour walks start here too.",
    bottomLine: "Schanze for the food-and-leftist Hamburg. St. Pauli for the music-and-Reeperbahn Hamburg.",
  },
  // SANTORINI: Oia vs Fira
  {
    slug: "oia-vs-fira",
    citySlug: "santorini",
    countrySlug: "greece",
    aSlug: "oia",
    bSlug: "fira",
    aLabel: "Oia",
    bLabel: "Fira",
    metaTitle: "Oia vs Fira: Where to Stay in Santorini",
    metaDescription:
      "Oia's famous sunset village or Fira's busy capital? Honest, dimension-by-dimension take on price, crowds, transport and which one to actually book.",
    intro:
      "These are Santorini's two famous towns and the tourism industry funnels everyone toward Oia by default. The reality is messier — Oia gets unbearable at sunset, Fira is the actual transport hub, and the price gap is large. Both are caldera-edge with white-and-blue. The trip changes a lot between them.",
    rounds: [
      { question: "Sunset photo", winner: "a", body: "Oia wins by definition — this is the Santorini-sunset cliché. The catch is you'll share it with 1500 other people on a peak July evening. Plan 90 min ahead for a spot." },
      { question: "Transport hub", winner: "b", body: "Fira is the bus station for the whole island — every line passes through here. From Oia you take a bus to Fira, then transfer. Adds 30-45 min to most day trips." },
      { question: "Price", winner: "b", body: "Fira is 30-50% cheaper than Oia for equivalent product. A caldera-view room in Oia runs €350-€800+ in season; the same view in Fira is €200-€450." },
      { question: "Restaurant choice", winner: "b", body: "Fira has more density — bigger town, more kitchens, more price points. Oia has 30-40 caldera-edge tables, all premium-priced." },
      { question: "Quiet sleep", winner: "a", body: "Oia, by a meaningful margin. Once the sunset crowd disperses (~9:30pm), it's silent. Fira has bar streets that go to 3am in the area near the cable car." },
      { question: "Best for honeymoon photo", winner: "a", body: "Oia, decisively. The blue-domed-church-and-windmill stretch is the photo. Fira's caldera edge is impressive but doesn't have the same iconic frame." },
    ],
    pickA: "Pick Oia if it's a honeymoon, you only have 1-2 nights, you're paying premium and want the cliché. Book a hotel inside the village so you avoid the bus-and-walk to sunset.",
    pickB: "Pick Fira for any 3+ night stay, day-tripping focus, budget-conscious trips, or repeat visits to Santorini. The caldera view is just as good — the marketing focus on Oia masks this.",
    bottomLine: "Oia for the photo and the honeymoon. Fira for everyone else.",
  },
  // SANTORINI: Oia vs Imerovigli
  {
    slug: "oia-vs-imerovigli",
    citySlug: "santorini",
    countrySlug: "greece",
    aSlug: "oia",
    bSlug: "imerovigli",
    aLabel: "Oia",
    bLabel: "Imerovigli",
    metaTitle: "Oia vs Imerovigli: Quietest Caldera Stays in Santorini",
    metaDescription:
      "Famous Oia or quieter Imerovigli on the caldera ridge? Real differences in crowds, sunset viewing, price and walkability.",
    intro:
      "Imerovigli is the Santorini secret most travel-pros recommend over Oia. It sits on the highest point of the caldera, 5 min from Fira, with the same blue-and-white architecture and almost none of the sunset crush. Oia is more famous; Imerovigli is what people who've been twice book.",
    rounds: [
      { question: "Caldera view", winner: "tied", body: "Both are exceptional — Imerovigli is actually the highest point, with a wider angle on the volcano. The view itself is a wash; the experience around it isn't." },
      { question: "Sunset crowd", winner: "b", body: "Imerovigli, by a wide margin. You'll see the same sunset from your terrace with 5-10 other guests, not 1500 strangers. Oia is the most crowded sunset in Greece in July." },
      { question: "Price", winner: "b", body: "Imerovigli runs 15-25% cheaper than Oia for the same product — €280-€650 vs €350-€800 for caldera-suite product." },
      { question: "Restaurants and town life", winner: "a", body: "Oia is a real village — main pedestrian street, dozens of restaurants, shops. Imerovigli is mostly hotels and 3-4 restaurants. You'll drive to Fira or Oia for variety." },
      { question: "Walkability", winner: "tied", body: "Both have the caldera path — you can walk Imerovigli to Fira in 30 min, Imerovigli to Oia in 2-3 hours. Both are heel-killers in summer heat." },
    ],
    pickA: "Pick Oia if it's a 1-2 night peak-season trip and you want the village-life-plus-sunset cliché. Accept that it'll be crowded.",
    pickB: "Pick Imerovigli for honeymoons that prioritize the view-from-your-terrace over the village, longer stays, or anyone who's done Oia and wants the calmer alternative. Best caldera-view-per-dollar on the island.",
    bottomLine: "Oia for the village-and-photo. Imerovigli for the calmest caldera-side luxury.",
  },
  // CAPPADOCIA: Göreme vs Uçhisar
  {
    slug: "goreme-vs-uchisar",
    citySlug: "cappadocia",
    countrySlug: "turkey",
    aSlug: "goreme",
    bSlug: "uchisar",
    aLabel: "Göreme",
    bLabel: "Uçhisar",
    metaTitle: "Göreme vs Uçhisar: Where to Stay in Cappadocia",
    metaDescription:
      "Göreme's central balloon-launch town or Uçhisar's quieter castle ridge? Real take on hot-air balloon viewing, restaurants, transport and price.",
    intro:
      "Almost everyone defaults to Göreme — it's the launch zone for the morning balloons and the closest town to the open-air museums. Uçhisar is 5 km west on a dramatic castle-rock ridge, calmer, with arguably the best cave-hotel views. Both work for a 2-3 night Cappadocia stay.",
    rounds: [
      { question: "Balloon launch zone", winner: "a", body: "Göreme is the launch town — most balloons inflate within 1 km of central hotels. From Uçhisar you see the balloons rising over the valley but you're not inside the launch zone." },
      { question: "Balloon photo from your terrace", winner: "tied", body: "Both excellent. Göreme cave-hotel terraces have balloons directly overhead; Uçhisar has balloons rising in the middle distance with the castle silhouette in foreground. Both Instagram-defining." },
      { question: "Restaurants and town life", winner: "a", body: "Göreme has a real main street with 20+ restaurants, bars, and dozens of cave hotels. Uçhisar has 5-6 restaurants and feels village-quiet at night." },
      { question: "Walkability to museums", winner: "a", body: "Göreme Open-Air Museum is 1.5 km from central Göreme — walkable. From Uçhisar it's 4 km; you'll want a transfer or rental car." },
      { question: "Quiet sleep", winner: "b", body: "Uçhisar, decisively. Göreme has tour group churn from 5am (balloon pickup), restaurant noise until midnight, and main-road traffic. Uçhisar is silent past 9pm." },
      { question: "Cave hotel quality", winner: "tied", body: "Both excellent. Göreme has the cluster — Sultan Cave Suites, Mithra, Kelebek. Uçhisar's properties (Argos in Cappadocia, Museum Hotel) are pricier but tend toward higher-end." },
    ],
    pickA: "Pick Göreme if it's your first Cappadocia trip, you want walkability and restaurant variety, you're ok with 5am tour-group noise. Most balloon photos are taken from Göreme terraces.",
    pickB: "Pick Uçhisar for honeymoons, return visits, or anyone willing to drive 5 min into Göreme for dinner in exchange for calmer sleep and more dramatic exterior settings. The castle and the views are unmatched.",
    bottomLine: "Göreme for first-timers and balloon-launch convenience. Uçhisar for honeymoons and quietest sleep.",
  },
  // SPLIT: Diocletian's Palace vs Veli Varoš
  {
    slug: "diocletians-palace-vs-veli-varos",
    citySlug: "split",
    countrySlug: "croatia",
    aSlug: "diocletians-palace",
    bSlug: "veli-varos",
    aLabel: "Diocletian's Palace",
    bLabel: "Veli Varoš",
    metaTitle: "Diocletian's Palace vs Veli Varoš: Where to Stay in Split",
    metaDescription:
      "Sleeping inside the Roman palace or the local fishermen's quarter? Honest take on noise, atmosphere, food and which Split trip each fits.",
    intro:
      "Diocletian's Palace is exactly what it sounds like — a stay inside the 1700-year-old Roman palace walls, with stone-vaulted apartments and the cathedral 30 seconds from your door. Veli Varoš is the old fishermen's quarter on the slope of Marjan hill, 10 min west — narrow stone lanes, none of the cruise-ship crowds. Both are old Split. They feel different.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Diocletian's Palace, by definition — you sleep inside Roman walls, walk past the Peristyle to coffee, share alleys with cathedral bells. Veli Varoš is pretty but lacks the historical density." },
      { question: "Cruise-ship crowds", winner: "b", body: "The Palace becomes nearly unwalkable 10am-4pm in season. Veli Varoš gets none of this — you walk down to the Riva for the harbor view and back to silence." },
      { question: "Restaurants past 9pm", winner: "tied", body: "Palace has the most density — 20+ konobas in tiny radius — but most are tourist-priced. Veli Varoš has 5-6 strong picks (Konoba Matejuška, Bokeria nearby), better quality, less choice." },
      { question: "Walkability to ferries", winner: "a", body: "Palace wins. The Riva and the ferry port are 5 min south. Veli Varoš adds 10-15 min for any Hvar/Brač day trip." },
      { question: "Quiet sleep", winner: "b", body: "Veli Varoš, decisively. The Palace gets pre-dawn cruise-pickup noise and bar noise on Pjaca; Veli Varoš is residential after 11pm." },
      { question: "Walking to Marjan hill", winner: "b", body: "Veli Varoš is the gateway to Marjan hill — the trailhead is 5 min from any address. Palace is 20 min from the trail." },
    ],
    pickA: "Pick the Palace if it's your first Split trip, your stay is 1-2 nights, the experience-of-sleeping-in-the-palace is the point. Bring earplugs for weekend nights.",
    pickB: "Pick Veli Varoš for return visits, families, hiking-focused trips up Marjan, longer stays, or anyone who wants Split without cruise-ship Friday afternoons.",
    bottomLine: "Diocletian's Palace for the Roman-walls experience. Veli Varoš for the calmer, hike-friendly local Split.",
  },
  // DUBROVNIK: Old Town vs Lapad
  {
    slug: "old-town-vs-lapad",
    citySlug: "dubrovnik",
    countrySlug: "croatia",
    aSlug: "old-town-dubrovnik",
    bSlug: "lapad",
    aLabel: "Old Town",
    bLabel: "Lapad",
    metaTitle: "Old Town vs Lapad: Where to Stay in Dubrovnik",
    metaDescription:
      "The walled city or the beach-side Lapad peninsula? Real-world take on cruise crush, swimming, price and which Dubrovnik trip each suits.",
    intro:
      "Dubrovnik's two real options. Old Town is the walled city — sleeping inside the photo, with the Stradun and the city walls 30 seconds away. Lapad is 4 km west on a leafy peninsula — actual beaches, big resort hotels, none of the cruise-ship daytime crush. Honeymooners often default to Old Town. They're often wrong.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Old Town wins. Stradun at sunrise before the cruise ships, dinner on a stone alley, the city walls lit at midnight — these are the trip. Lapad is pretty but unremarkable." },
      { question: "Cruise crush", winner: "b", body: "Old Town becomes unwalkable 10am-4pm peak season. Lapad gets none of this — you swim, lunch, and arrive at Old Town at 5pm when crowds thin." },
      { question: "Beach access", winner: "b", body: "Lapad has Sunset Beach, Lapad Beach, and Cava Beach all within 10 min walk. Old Town has Banje (small, crowded) and Buža (cliff-jump bar). For a swim-focused trip, Lapad wins easily." },
      { question: "Price", winner: "b", body: "Lapad averages 25-40% cheaper than Old Town. Old Town's tiny stone-vaulted rooms run €250-€500 in season; Lapad's larger sea-view rooms run €150-€300." },
      { question: "Restaurants", winner: "tied", body: "Old Town has more density but most are tourist-priced and mid-quality. Lapad has fewer options but better price-to-quality ratio. Both fine for 3-4 nights." },
      { question: "Walkability to Old Town from Lapad", winner: "tied", body: "Lapad is 4 km — bus 6 takes 15 min. Walking is 45 min along the harbor. Most travelers find this fine after night two." },
    ],
    pickA: "Pick Old Town if your stay is 1-2 nights, you want the walled-city sunrise, and you can sleep through the cathedral bells. The atmosphere is the trip.",
    pickB: "Pick Lapad for any swim-focused stay, longer trips of 4+ nights, families, honeymoons that prioritize sea-view-and-pool, or budget-conscious travelers. The bus to Old Town runs every 15 min — that's not a downside.",
    bottomLine: "Old Town for the walled-city atmosphere. Lapad for the beach-and-pool trip.",
  },
  // WARSAW: Śródmieście vs Powiśle
  {
    slug: "srodmiescie-vs-powisle",
    citySlug: "warsaw",
    countrySlug: "poland",
    aSlug: "srodmiescie-polnocne",
    bSlug: "powisle",
    aLabel: "Śródmieście",
    bLabel: "Powiśle",
    metaTitle: "Śródmieście vs Powiśle: Where to Stay in Warsaw",
    metaDescription:
      "Warsaw's central business district or the leafy riverside Powiśle? Honest take on walkability, food, noise and which Warsaw trip each fits.",
    intro:
      "Śródmieście Północne is the central business core — Palace of Culture, the central station, all the shopping. Powiśle is south of the Old Town along the Vistula — leafy, more residential, the new Warsaw of design hotels and riverside cafes. Old Town gets all the photos but most travel-savvy visitors actually base in one of these two.",
    rounds: [
      { question: "Walkability to Old Town", winner: "tied", body: "Śródmieście is 15-20 min north walk; Powiśle is 10-15 min northeast. Both fine. Both run trams that get you there in 8 min." },
      { question: "Restaurants and bars", winner: "b", body: "Powiśle wins for quality. The riverside strip and the area around Centrum Nauki Kopernik have the best new-Warsaw food. Śródmieście's restaurants tilt corporate-lunch." },
      { question: "Atmosphere", winner: "b", body: "Powiśle feels alive at evenings and weekends — locals walking dogs, riverbank picnics, design shops. Śródmieście empties after office hours." },
      { question: "Train station access", winner: "a", body: "Śródmieście has the central station at its heart — Warsaw to Krakow trains, Berlin trains, Modlin Airport bus. Powiśle is 10 min east." },
      { question: "Price", winner: "tied", body: "Both reasonable for capital-city stays — €70-€140 for decent product. Powiśle's design hotels nudge slightly higher but Śródmieście's chain hotels at the same price are inferior product." },
    ],
    pickA: "Pick Śródmieście Północne for short business-style stays, train-heavy itineraries (Krakow day trips), or stays where you specifically want anonymous chain-hotel comfort. The neighborhood lacks soul but it's efficient.",
    pickB: "Pick Powiśle for any 3+ night stay, food-focused trips, repeat visits, or anyone who wants the leafy riverside Warsaw most travelers don't see. It's where Warsaw's becoming what it'll be.",
    bottomLine: "Śródmieście for transport convenience. Powiśle for the food, river walks and longer stays.",
  },
  // OSLO: Sentrum vs Grünerløkka
  {
    slug: "sentrum-vs-grunerlokka",
    citySlug: "oslo",
    countrySlug: "norway",
    aSlug: "sentrum-oslo",
    bSlug: "grunerlokka",
    aLabel: "Sentrum",
    bLabel: "Grünerløkka",
    metaTitle: "Sentrum vs Grünerløkka: Where to Stay in Oslo",
    metaDescription:
      "Oslo's compact central core or the trendy Grünerløkka quarter? Honest take on sights access, food, atmosphere and price.",
    intro:
      "Oslo is small enough that this is a 15-min walk between bases, but the trips read very differently. Sentrum is the central core — Karl Johans gate, the Royal Palace, Oslo Central Station. Grünerløkka is the post-industrial east-bank quarter where Oslovians under 40 actually live and eat. The pick is sights-first vs food-first.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Sentrum wins. Royal Palace, Parliament, the National Theatre, train station, ferry to Bygdøy — all 5-10 min walk. Grünerløkka adds 15-20 min to most central sights." },
      { question: "Restaurants", winner: "b", body: "Grünerløkka, decisively. Mathallen food hall, Søndre Brun, Olaf Ryes plass — denser per-block than anywhere central. Sentrum's restaurants are mostly hotel restaurants and chain outlets." },
      { question: "Atmosphere after office hours", winner: "b", body: "Grünerløkka stays alive past 11pm; Sentrum thins fast after 9pm. Norwegian capital evenings happen on the east bank, not the west." },
      { question: "Price", winner: "b", body: "Grünerløkka runs 10-15% cheaper than Sentrum for equivalent product. Both are expensive — Norway is Norway — but the gap is real." },
      { question: "Family-friendly", winner: "b", body: "Grünerløkka. Olaf Ryes plass and the riverside are kid-friendly, the cafes are stroller-aware, and the streets are calmer than Sentrum's traffic." },
    ],
    pickA: "Pick Sentrum if you're staying 1 night between flights, your trip is sights-only, or you specifically need the train-station-at-the-door logistics for fjord trips.",
    pickB: "Pick Grünerløkka for any 3+ night stay, food-focused trips, families, or repeat visits. The 15-min walk to the harbor is exactly the right length for an Oslo day to start and end.",
    bottomLine: "Sentrum for sights-only flying visits. Grünerløkka for everyone else.",
  },
  // HELSINKI: Kruununhaka vs Kallio
  {
    slug: "kruununhaka-vs-kallio",
    citySlug: "helsinki",
    countrySlug: "finland",
    aSlug: "kruununhaka",
    bSlug: "kallio",
    aLabel: "Kruununhaka",
    bLabel: "Kallio",
    metaTitle: "Kruununhaka vs Kallio: Where to Stay in Helsinki",
    metaDescription:
      "Helsinki's quiet historic core or the lively Kallio? Real differences in price, food, atmosphere and who each fits.",
    intro:
      "Kruununhaka is the original Helsinki — Senate Square, the cathedral, the old Russian-era stone facades. Kallio is one tram stop north, formerly working-class, now the bar-and-design-shop quarter where most under-30 Helsinki residents actually live. Both walkable to anywhere.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Kruununhaka wins. Senate Square, Helsinki Cathedral, the harbor and the ferry to Suomenlinna are all under 10 min walk. Kallio is 15-20 min from any of these." },
      { question: "Restaurants and bars", winner: "b", body: "Kallio, decisively. Helsinginkatu and Hämeentie have the most bar density per block in Finland — local wine bars, dive bars, late-night pizza, all walkable." },
      { question: "Quiet sleep", winner: "a", body: "Kruununhaka. Residential, cathedral-quiet, almost no late-night noise. Kallio's main strips run loud until 2-3am Friday-Saturday." },
      { question: "Price", winner: "b", body: "Kallio runs 15-25% cheaper than Kruununhaka. Helsinki is expensive across the board — €130-€230 for decent Kruununhaka product, €100-€180 in Kallio." },
      { question: "Atmosphere", winner: "tied", body: "Kruununhaka feels Stockholm-quiet-elegant; Kallio feels Berlin-Kreuzberg-affordable. Both feel real Helsinki — pick on age and what you want from a night out." },
    ],
    pickA: "Pick Kruununhaka if your trip is sights-and-Suomenlinna focused, you're over 40, you sleep light, or you specifically want the Russian-era atmosphere. Most repeat visitors agree it's the prettiest part of Helsinki.",
    pickB: "Pick Kallio for return visits, dinner-focused trips, anyone under 35 who wants the lively side, or stays of 4+ nights where you want a real local feel. The tram to the cathedral runs every 5 min.",
    bottomLine: "Kruununhaka for the sights-and-history Helsinki. Kallio for the food-and-bars Helsinki.",
  },
  // SALZBURG: Altstadt vs Neustadt
  {
    slug: "altstadt-vs-neustadt-salzburg",
    citySlug: "salzburg",
    countrySlug: "austria",
    aSlug: "altstadt-salzburg",
    bSlug: "neustadt",
    aLabel: "Altstadt",
    bLabel: "Neustadt",
    metaTitle: "Altstadt vs Neustadt: Where to Stay in Salzburg",
    metaDescription:
      "Salzburg's UNESCO old town or the right-bank Neustadt? Honest comparison: walkability, price, noise and which side fits your trip.",
    intro:
      "Salzburg's choice is left-bank Altstadt (the Mozart-and-fortress side) or right-bank Neustadt (the Mirabell-and-train-station side). They're connected by 4 short bridges and the city is small enough to walk anywhere. The pick is mostly about price and atmosphere — both work.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Altstadt wins by definition — Mozart's birthplace, the cathedral, Hohensalzburg fortress base, all 5-10 min walk. Neustadt has Mirabell Palace and gardens, the Mozarteum, less iconic." },
      { question: "Walkability", winner: "tied", body: "The Altstadt is car-free pedestrian, charm-dense. Neustadt has wider streets and the train station. Cross the Salzach in 5 min — neither side feels far from anything." },
      { question: "Price", winner: "b", body: "Neustadt runs 20-30% cheaper than Altstadt for equivalent product — €120-€220 vs €170-€350. Altstadt's premium is for the cobblestone setting, not better rooms." },
      { question: "Sound of Music tour", winner: "b", body: "Neustadt — Mirabell Gardens (the Do-Re-Mi steps) are at your door, and bus tours leave from this side." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet after 10pm. Altstadt has dinner-tour-group noise around Getreidegasse until 11pm; Neustadt has occasional train-station noise on Rainerstraße. Side streets in either are silent." },
      { question: "Festival timing", winner: "a", body: "Altstadt — the festival venues (Felsenreitschule, Festspielhaus) are on this side. Festival traffic and pricing nearly double both sides in late July/August." },
    ],
    pickA: "Pick Altstadt for first-time visits, festival-week stays, sights-focused trips, or anyone willing to pay 20-30% premium for the cobblestone-and-fortress setting.",
    pickB: "Pick Neustadt for budget-conscious trips, train-heavy itineraries (Vienna day trips), Sound of Music tours, or longer stays. The 5-min bridge walk to Altstadt is part of the daily routine.",
    bottomLine: "Altstadt for the cliché Salzburg. Neustadt for budget and Sound of Music focus.",
  },
  // ZURICH: Niederdorf vs Kreis 4/5
  {
    slug: "niederdorf-vs-kreis-4-5",
    citySlug: "zurich",
    countrySlug: "switzerland",
    aSlug: "niederdorf",
    bSlug: "kreis-4-5",
    aLabel: "Niederdorf",
    bLabel: "Kreis 4 / 5",
    metaTitle: "Niederdorf vs Kreis 4/5: Where to Stay in Zurich",
    metaDescription:
      "Zurich's medieval Niederdorf or the trendy Kreis 4/5? Real take on walkability, food, vibe and price for a Zurich city break.",
    intro:
      "Niederdorf is the medieval right-bank quarter — narrow lanes, Grossmünster, Lake Zurich at the south end. Kreis 4 (Langstrasse) and Kreis 5 (Zurich-West) are former industrial quarters now turned bar-and-design — Frau Gerolds Garten, Prime Tower, the Viadukt arches. Both are alive at night. The pick depends on whether you want medieval or post-industrial.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Niederdorf is cobblestone, dinner-tourist, lake-adjacent. Kreis 4/5 is converted-warehouse, design-shop, gritty in spots. Both feel genuinely Zurich — pick on what kind of evening you want." },
      { question: "Walkability to lake", winner: "a", body: "Niederdorf wins — Bürkliplatz and the lake promenade are 5-10 min south. Kreis 4/5 is 15-20 min from the lake." },
      { question: "Restaurants and bars", winner: "b", body: "Kreis 4/5, by a wide margin. Im Viadukt and Hardbrücke have the highest density of new-design restaurants in Switzerland. Niederdorf has cluster of touristy fondue-and-rösti places." },
      { question: "Price", winner: "b", body: "Kreis 4/5 runs 10-20% cheaper than Niederdorf. Both expensive — this is Zurich — but the gap is real. €180-€350 in Kreis 4/5 vs €220-€450 in Niederdorf for similar product." },
      { question: "Quiet sleep", winner: "tied", body: "Niederdorf has restaurant noise until 11pm. Langstrasse (in Kreis 4) is the loudest stretch in Zurich on weekends. Pick a side street in either and you're fine." },
      { question: "Best for first-timers", winner: "a", body: "Niederdorf. The medieval-old-town-on-a-lake setting is what people come to Zurich for. Kreis 4/5 reads better on second visits." },
    ],
    pickA: "Pick Niederdorf for first-time visits, sights-and-lake-focused trips, anyone who wants the cobblestone setting. The premium is real but you're paying for the most iconic stretch of Zurich.",
    pickB: "Pick Kreis 4/5 for return visits, food-and-bar trips, design-focused itineraries, or anyone who wants Zurich without paying old-town prices. Hardbrücke station gives you 4-min S-Bahn to the airport.",
    bottomLine: "Niederdorf for the postcard Zurich. Kreis 4/5 for the food, design and second-visit Zurich.",
  },
  // ZAGREB: Donji Grad vs Gornji Grad
  {
    slug: "donji-grad-vs-gornji-grad",
    citySlug: "zagreb",
    countrySlug: "croatia",
    aSlug: "donji-grad",
    bSlug: "gornji-grad",
    aLabel: "Donji Grad",
    bLabel: "Gornji Grad",
    metaTitle: "Donji Grad vs Gornji Grad: Where to Stay in Zagreb",
    metaDescription:
      "Zagreb's lively lower town or the medieval Upper Town? Honest take on walkability, food, sights and which fits your trip.",
    intro:
      "Zagreb's two halves. Donji Grad (Lower Town) is the 19th-century grid — Ban Jelačić Square, Tkalčićeva, the Mimara museum, most of the city's restaurants. Gornji Grad (Upper Town) is the medieval quarter on the hill — St. Mark's Church, the funicular, the Lotrščak Tower. The Lower Town gets the food; the Upper Town gets the photos.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Donji Grad is wide-boulevard 19th-century-Vienna; Gornji Grad is medieval-quiet-cobblestone. Both feel Zagreb. Pick on what you want from your evening." },
      { question: "Restaurants and bars", winner: "a", body: "Donji Grad, decisively. Tkalčićeva alone has 50+ kitchens; Cvjetni trg, Bogovićeva, and Ilica add more. Gornji Grad has 5-6 picks max." },
      { question: "Sights at your door", winner: "tied", body: "Donji Grad has Ban Jelačić Square, Dolac market, Mimara museum, Botanical Garden. Gornji Grad has Cathedral, St. Mark's, the funicular. Both fine for a 2-3 night stay." },
      { question: "Walkability between", winner: "tied", body: "5-10 min walk between any address in either. The funicular is 1 minute and free if you have a city card. Effectively the same neighborhood logistically." },
      { question: "Quiet sleep", winner: "b", body: "Gornji Grad, by a meaningful margin. Donji Grad's Tkalčićeva and Bogovićeva run loud until 1am Thursday-Saturday. Gornji Grad is silent past 10pm." },
      { question: "Price", winner: "tied", body: "Both €70-€130 for decent product. Gornji Grad has fewer hotels (mostly small boutiques); Donji Grad has chains and apartments." },
    ],
    pickA: "Pick Donji Grad for first-time visits, food-and-bar trips, longer stays. It's where Zagreb actually happens — Gornji Grad is mostly a daytime destination from below.",
    pickB: "Pick Gornji Grad for romantic trips, repeat visits, or anyone who wants the medieval-cobblestone setting and quiet sleep. The walk down to dinner takes 5 min — that's the whole tradeoff.",
    bottomLine: "Donji Grad for food, bars and longer stays. Gornji Grad for the medieval quiet.",
  },
  // BORDEAUX: Saint-Pierre vs Chartrons
  {
    slug: "saint-pierre-vs-chartrons",
    citySlug: "bordeaux",
    countrySlug: "france",
    aSlug: "saint-pierre",
    bSlug: "chartrons",
    aLabel: "Saint-Pierre",
    bLabel: "Chartrons",
    metaTitle: "Saint-Pierre vs Chartrons: Where to Stay in Bordeaux",
    metaDescription:
      "Bordeaux's medieval Saint-Pierre or the Chartrons wine quarter? Real comparison of restaurants, walkability, atmosphere and price.",
    intro:
      "Saint-Pierre is the medieval heart — Place du Parlement, Rue Sainte-Catherine, the cathedral 5 min away. Chartrons is the historic wine-merchant quarter on the river just north — antique shops, cellar-door wine bars, the Cité du Vin 15 min further. Both work for first-timers; they read different.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Saint-Pierre is medieval, dinner-dense, cobblestone. Chartrons is wider streets, more village-feeling, with the river walk at the eastern edge. Both feel Bordeaux." },
      { question: "Walkability to Place de la Bourse", winner: "a", body: "Saint-Pierre is 5 min from Place de la Bourse and the water mirror. Chartrons is 15 min north along the river — fine, longer." },
      { question: "Restaurants past 10pm", winner: "a", body: "Saint-Pierre wins. Place du Parlement and Rue Saint-James have density of late kitchens. Chartrons quiets earlier — 10pm last seating common." },
      { question: "Wine bars", winner: "b", body: "Chartrons. The wine-merchant heritage is real — Aux Quatre Coins du Vin, Le Bar à Vin du CIVB nearby, plus dozens of cellar-doors. Saint-Pierre has wine bars but less variety." },
      { question: "Quiet sleep", winner: "b", body: "Chartrons, decisively. Saint-Pierre's Rue Sainte-Catherine and Rue des Bahutiers run loud until 1am weekends. Chartrons is residential calm after 11pm." },
      { question: "Price", winner: "tied", body: "Both €100-€180 for decent product. Chartrons trends slightly cheaper for apartments; Saint-Pierre slightly cheaper for boutique hotels." },
    ],
    pickA: "Pick Saint-Pierre for first-time visits, dinner-focused trips, sights-at-the-door logistics. The cobblestone setting is the city's main draw.",
    pickB: "Pick Chartrons for wine-focused trips, longer stays, families, or anyone who wants quieter sleep with a 15-min walk to the medieval core. The Cité du Vin is 10 min further north — great if it's on your itinerary.",
    bottomLine: "Saint-Pierre for the medieval heart. Chartrons for the wine-quarter and quieter trips.",
  },
  // ANTWERP: Het Eilandje vs Oude Stad
  {
    slug: "het-eilandje-vs-oude-stad",
    citySlug: "antwerp",
    countrySlug: "belgium",
    aSlug: "het-eilandje",
    bSlug: "oude-stad-antwerp",
    aLabel: "Het Eilandje",
    bLabel: "Oude Stad",
    metaTitle: "Het Eilandje vs Oude Stad: Where to Stay in Antwerp",
    metaDescription:
      "Antwerp's converted-port Eilandje or the medieval Oude Stad? Real take on food, walkability, atmosphere and price.",
    intro:
      "Antwerp's two strongest bases. Oude Stad is the medieval centre — Grote Markt, the cathedral, the Rubenshuis. Het Eilandje is the former port quarter just north, with the MAS museum, the Red Star Line museum, and converted-warehouse design hotels. Antwerp is small enough for either to work.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Oude Stad is medieval-cobblestone-cathedral. Het Eilandje is post-industrial, glass-and-brick, more design-focused. Both feel Antwerp. Pick on style preference." },
      { question: "Walkability to cathedral and Grote Markt", winner: "a", body: "Oude Stad wins. Cathedral and Grote Markt are at your door. Het Eilandje is 15-20 min north walk." },
      { question: "Restaurants", winner: "tied", body: "Oude Stad has tourist density; Het Eilandje has fewer but better-quality picks (Le John, Felix Pakhuis cluster). Both fine for 2-3 nights." },
      { question: "Quiet sleep", winner: "b", body: "Het Eilandje, decisively. Oude Stad has bar overflow on Grote Markt and Vrijdagmarkt until 2am weekends. Het Eilandje is residential past 11pm." },
      { question: "Diamond District access", winner: "tied", body: "Both 10-15 min walk from Centraal Station and the Diamond District. Equivalent." },
    ],
    pickA: "Pick Oude Stad for first-time visits, sights-focused short trips, anyone who wants the cathedral lit at night from your hotel window.",
    pickB: "Pick Het Eilandje for design-focused trips, longer stays, or repeat visitors who've done the centre. The MAS rooftop view is one of the best free views in Belgium.",
    bottomLine: "Oude Stad for first-timers. Het Eilandje for design and quieter sleep.",
  },
  // COLOGNE: Altstadt vs Belgisches Viertel
  {
    slug: "altstadt-vs-belgisches-viertel",
    citySlug: "cologne",
    countrySlug: "germany",
    aSlug: "altstadt-cologne",
    bSlug: "belgisches-viertel",
    aLabel: "Altstadt",
    bLabel: "Belgisches Viertel",
    metaTitle: "Altstadt vs Belgisches Viertel: Where to Stay in Cologne",
    metaDescription:
      "Cologne's cathedral-side Altstadt or the trendy Belgian Quarter? Honest take on food, atmosphere, noise and which Cologne trip each fits.",
    intro:
      "Altstadt is the cathedral-and-Hauptbahnhof side — the central tourist strip, Brauhaus density, river-side walks. Belgisches Viertel is 15 min west, the post-war design-shop and Aachener Straße corridor where Cologne's under-40 crowd actually goes for dinner. Both have strengths.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Altstadt wins. Cathedral, Hauptbahnhof, museum quarter, river promenade — 5-10 min walk. Belgisches Viertel is 15-20 min west of any of these." },
      { question: "Restaurants past 10pm", winner: "b", body: "Belgisches Viertel, by a wide margin. Aachener Straße and Rudolfplatz have dense small kitchens, cocktail bars, late-dinner spots. Altstadt's Brauhauses close at 11pm and tilt tourist." },
      { question: "Brauhaus density", winner: "a", body: "Altstadt wins for kölsch-and-traditional. Brauhaus Sion, Päffgen, Früh am Dom — all walkable, dense, the cliché Cologne experience." },
      { question: "Quiet sleep", winner: "b", body: "Belgisches Viertel, decisively. Altstadt's Brauhaus strip and the area around Hauptbahnhof are louder until 1am weekends. Belgisches Viertel is residential calm past midnight." },
      { question: "Price", winner: "tied", body: "Both €100-€170 for decent product. Altstadt's premium is offset by Belgisches Viertel's design-hotel premium." },
    ],
    pickA: "Pick Altstadt for first-time visits, cathedral-focused short trips, train-heavy itineraries, or anyone who wants the cliché Cologne kölsch evening at your front door.",
    pickB: "Pick Belgisches Viertel for return visits, food-focused trips, longer stays, or anyone under 40 who wants the design-and-cocktail Cologne. The 15-min walk to the cathedral is the right length.",
    bottomLine: "Altstadt for the cathedral-and-kölsch Cologne. Belgisches Viertel for the food-and-design version.",
  },
  // MOSTAR: Stari Grad vs Brankovac
  {
    slug: "stari-grad-vs-brankovac",
    citySlug: "mostar",
    countrySlug: "bosnia-and-herzegovina",
    aSlug: "stari-grad-mostar",
    bSlug: "brankovac",
    aLabel: "Stari Grad",
    bLabel: "Brankovac",
    metaTitle: "Stari Grad vs Brankovac: Where to Stay in Mostar",
    metaDescription:
      "Mostar's Old Bridge quarter or the quieter residential Brankovac? Honest comparison of crowds, sleep, walkability and price.",
    intro:
      "Mostar is small — these two neighborhoods are a 5-10 min walk apart, but the trip changes meaningfully. Stari Grad is the photo: Old Bridge, the bazaar, the call to prayer over the Neretva. Brankovac is the residential hill on the west bank, calmer, with the bridge-and-bazaar in walking distance but none of the day-tripper crush.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Stari Grad wins by definition — you sleep within 5 min of the Old Bridge, Koski Mehmed Mosque, the bazaar. Brankovac has views of the bridge from above but lacks the close-up density." },
      { question: "Day-tripper crush", winner: "b", body: "Stari Grad becomes nearly unwalkable 11am-4pm in season — Mostar's a popular Dubrovnik day trip. Brankovac gets none of this." },
      { question: "Sleep", winner: "b", body: "Brankovac, decisively. Bazaar foot traffic and pre-dawn call to prayer carry through Stari Grad guesthouses; Brankovac is residential silence past 9pm." },
      { question: "Restaurants", winner: "a", body: "Stari Grad has 20+ ćevapi and traditional houses in tiny radius. Brankovac has 3-4 picks max — you'll walk to the bazaar for dinner." },
      { question: "Price", winner: "tied", body: "Mostar is cheap across the board. Both €30-€70 for decent product. Brankovac apartments slightly cheaper than Stari Grad guesthouses." },
    ],
    pickA: "Pick Stari Grad if it's your only night, you want the Old Bridge at 6am before tour groups, the cliché atmosphere is the trip.",
    pickB: "Pick Brankovac for any 2+ night stay, light sleepers, anyone who arrived by car (parking is easier), or families. The 5-10 min walk to the bazaar is downhill — you'll do it twice a day.",
    bottomLine: "Stari Grad for the cliché single-night trip. Brankovac for the calmer, longer, second-time Mostar.",
  },
  // NICE: Vieux Nice vs Carré d'Or
  {
    slug: "vieux-nice-vs-carre-dor",
    citySlug: "nice",
    countrySlug: "france",
    aSlug: "vieux-nice",
    bSlug: "carre-dor",
    aLabel: "Vieux Nice",
    bLabel: "Carré d'Or",
    metaTitle: "Vieux Nice vs Carré d'Or: Where to Stay in Nice",
    metaDescription:
      "Nice's Old Town or the elegant Carré d'Or shopping district? Real differences in vibe, food, beach access, noise and price.",
    intro:
      "Vieux Nice is the medieval-Italianate old town — narrow lanes, ochre facades, the daily Cours Saleya market. Carré d'Or is the elegant rectangle between Avenue Jean Médecin and the sea — Belle Époque hotels, designer shopping, Place Masséna. Both walk to the Promenade des Anglais. The trip's character changes a lot between them.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Vieux Nice wins on charm — the cliché Nice of every photo. Carré d'Or is handsome but unremarkable; could be Bordeaux or Lyon." },
      { question: "Restaurants", winner: "a", body: "Vieux Nice, by a wide margin. Cours Saleya, rue Pairolière, rue de l'Abbaye — denser per-block than anywhere on the Riviera. Carré d'Or has chain bistros and hotel restaurants." },
      { question: "Beach access", winner: "tied", body: "Both 5-8 min walk to the Promenade. Vieux Nice's eastern end is closest to Plage Beau Rivage; Carré d'Or is closest to the central beaches." },
      { question: "Quiet sleep", winner: "b", body: "Carré d'Or, decisively. Vieux Nice's Cours Saleya runs loud until 1am summer weekends; the medieval lanes echo. Carré d'Or is residential past 11pm." },
      { question: "Shopping", winner: "b", body: "Carré d'Or wins — rue Paradis, rue de France, Galeries Lafayette nearby. Vieux Nice has artisan shops, no luxury retail." },
      { question: "Price", winner: "a", body: "Vieux Nice runs 10-20% cheaper than Carré d'Or for equivalent product, especially for apartments. Carré d'Or's Belle Époque hotel inventory commands a premium." },
    ],
    pickA: "Pick Vieux Nice for first-time visits, food-focused trips, anyone who wants the cliché ochre-facade Nice at your front door. Bring earplugs for summer weekends.",
    pickB: "Pick Carré d'Or for shopping-focused trips, anyone over 50, light sleepers, or stays that want the elegant Belle-Époque-grand-hotel experience. The 8-min walk to Cours Saleya is exactly enough to feel like a day-trip rather than home.",
    bottomLine: "Vieux Nice for the cliché. Carré d'Or for the shopping and quiet sleep.",
  },
  // AARHUS: Midtbyen vs Aarhus Ø
  {
    slug: "midtbyen-vs-aarhus-o",
    citySlug: "aarhus",
    countrySlug: "denmark",
    aSlug: "midtbyen",
    bSlug: "aarhus-o",
    aLabel: "Midtbyen",
    bLabel: "Aarhus Ø",
    metaTitle: "Midtbyen vs Aarhus Ø: Where to Stay in Aarhus",
    metaDescription:
      "Aarhus' medieval centre or the new harbourfront Aarhus Ø? Honest take on walkability, restaurants, design and price.",
    intro:
      "Aarhus' two strongest bases. Midtbyen is the medieval centre — the Cathedral, the Latin Quarter, ARoS. Aarhus Ø is the new waterfront district built on reclaimed harbor land, with the Iceberg buildings, Dokk1 library, and harbor swimming. Both walk-friendly. The pick is medieval-old vs Scandi-new.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Midtbyen wins for traditional sights — Cathedral, Latin Quarter, ARoS, Den Gamle By all walkable. Aarhus Ø has Dokk1 and the new architecture but less cluster of conventional sights." },
      { question: "Restaurants", winner: "a", body: "Midtbyen, by a wide margin. The Latin Quarter, Frederiksgade, and the area around Strøget have density of small kitchens. Aarhus Ø has 5-6 strong picks (Aarhus Street Food at the harbor edge) but spread out." },
      { question: "Architecture/design fans", winner: "b", body: "Aarhus Ø is the newest waterfront district in Scandinavia — the Iceberg apartments, Pier 2, Z-Huset are the kind of stuff students of architecture come for. Midtbyen has the cathedral and not much else new." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Midtbyen has occasional bar noise on Frederiksgade; Aarhus Ø is silent past 9pm." },
      { question: "Price", winner: "b", body: "Aarhus Ø runs 10-15% cheaper than Midtbyen for equivalent product — newer hotels, less brand premium. Both €120-€220." },
      { question: "Walkability between the two", winner: "tied", body: "Aarhus Ø is 15 min walk from Midtbyen — fine for a daily commute. Bus 18 connects them in 6 min." },
    ],
    pickA: "Pick Midtbyen for first-time visits, sights-focused trips, anyone who wants the traditional Aarhus restaurants and the cathedral at the door.",
    pickB: "Pick Aarhus Ø for design-and-architecture-focused trips, longer stays, or anyone who wants the new-Scandinavia waterfront experience. The harbor swimming pool is exceptional in summer.",
    bottomLine: "Midtbyen for the medieval and food. Aarhus Ø for the new architecture and quieter sleep.",
  },
);

// =============================================================================
// Lookup helpers — same shape as the rest of static-data.ts
// =============================================================================

export function findComparison(
  countrySlug: string,
  citySlug: string,
  slug: string
): StaticComparison | undefined {
  return COMPARISONS.find(
    (c) =>
      c.countrySlug === countrySlug && c.citySlug === citySlug && c.slug === slug
  );
}

export function comparisonsInCity(citySlug: string): StaticComparison[] {
  return COMPARISONS.filter((c) => c.citySlug === citySlug);
}

export function comparisonsInvolvingNeighborhood(
  citySlug: string,
  neighborhoodSlug: string
): StaticComparison[] {
  return COMPARISONS.filter(
    (c) =>
      c.citySlug === citySlug &&
      (c.aSlug === neighborhoodSlug || c.bSlug === neighborhoodSlug)
  );
}

/** Resolve both neighborhood records for a comparison (returns null if either is missing). */
export function resolveComparisonNeighborhoods(
  c: StaticComparison
): { a: StaticNeighborhood; b: StaticNeighborhood } | null {
  const a = findNeighborhood(c.countrySlug, c.citySlug, c.aSlug);
  const b = findNeighborhood(c.countrySlug, c.citySlug, c.bSlug);
  if (!a || !b) return null;
  return { a, b };
}

/** Validate at module load: every COMPARISONS entry references real neighborhoods. */
const _validation = (() => {
  const errors: string[] = [];
  for (const c of COMPARISONS) {
    const resolved = resolveComparisonNeighborhoods(c);
    if (!resolved) {
      errors.push(
        `[static-data-comparisons] Comparison ${c.slug} (${c.citySlug}) references missing neighborhood: aSlug=${c.aSlug} bSlug=${c.bSlug}`
      );
    }
    if (c.aSlug === c.bSlug) {
      errors.push(`[static-data-comparisons] Comparison ${c.slug} compares a neighborhood to itself`);
    }
  }
  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(errors.join("\n"));
  }
  // unused but suppresses linting on the immediately-invoked check
  void ALL_NEIGHBORHOODS;
})();
void _validation;

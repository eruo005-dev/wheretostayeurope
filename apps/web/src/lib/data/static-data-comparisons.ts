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

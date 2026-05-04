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
// EXPANSION BATCH 2 — additional pairs in tier-1 cities (Paris, Rome, London,
// Berlin, Amsterdam, Madrid, Vienna, Prague, Budapest, Athens, Stockholm,
// Lisbon, Porto, Florence, Brussels, Munich, Istanbul, Dublin, Barcelona,
// Copenhagen). Same voice rules.
// =============================================================================
COMPARISONS.push(
  // PARIS: Le Marais vs Latin Quarter
  {
    slug: "le-marais-vs-latin-quarter",
    citySlug: "paris",
    countrySlug: "france",
    aSlug: "le-marais",
    bSlug: "latin-quarter",
    aLabel: "Le Marais",
    bLabel: "Latin Quarter",
    metaTitle: "Le Marais vs Latin Quarter: Where to Stay in Paris",
    metaDescription:
      "Right Bank's Marais or Left Bank's Latin Quarter? Honest take on tourist crush, restaurants, walkability and which Paris trip each fits.",
    intro:
      "These two are first-timers' obvious second-choice pairing after Saint-Germain. Le Marais is design-and-dinner Right Bank; Latin Quarter is the medieval Left Bank with the Sorbonne, the Panthéon, and the worst-quality tourist restaurants in Paris. The right pick rules out one cliché.",
    rounds: [
      { question: "Vibe", winner: "a", body: "Marais is younger, livelier, design-shop dense. Latin Quarter is older, university-town adjacent, mostly tour-group churn between Notre-Dame and the Panthéon." },
      { question: "Restaurants", winner: "a", body: "Marais wins decisively. Rue de Bretagne, rue Vieille du Temple have real kitchens. The Latin Quarter's restaurant strip (rue de la Huchette) is famously the worst-quality dinner block in Paris." },
      { question: "Walkability to Notre-Dame", winner: "b", body: "Latin Quarter is closer — 5-10 min south of the cathedral. Marais is 15 min northeast." },
      { question: "Quiet sleep", winner: "tied", body: "Marais bar streets run late on weekends. Latin Quarter has tour-group buses and Notre-Dame foot traffic until 10pm but quiets after. Side streets in either work." },
      { question: "Price", winner: "tied", body: "Both €180-€350 for decent product. Latin Quarter's near-Notre-Dame premium nearly matches Marais's design-quarter premium." },
    ],
    pickA: "Pick Le Marais for dinner-focused trips, second-time travelers, anyone who wants the design-shop wandering. The 15-min walk to Notre-Dame is fine.",
    pickB: "Pick Latin Quarter only for first-timers laser-focused on Notre-Dame and the Panthéon, or families with teens doing classroom-Europe itineraries. Skip the rue de la Huchette dinners.",
    bottomLine: "Marais wins on dinner, Latin Quarter wins on Notre-Dame proximity. Marais is the better trip overall.",
  },
  // PARIS: Montmartre vs Le Marais
  {
    slug: "montmartre-vs-le-marais",
    citySlug: "paris",
    countrySlug: "france",
    aSlug: "montmartre",
    bSlug: "le-marais",
    aLabel: "Montmartre",
    bLabel: "Le Marais",
    metaTitle: "Montmartre vs Le Marais: Where to Stay in Paris",
    metaDescription:
      "Hilltop Montmartre or central Le Marais? Honest take on walkability, atmosphere, tourist crush and which Paris stay fits each trip.",
    intro:
      "Montmartre is the hill village with Sacré-Cœur, the artists' cliché and most touristy parts of Paris. Le Marais is dense central Right Bank — design-shop, dinner-and-cocktail. They answer different questions: postcard-on-a-hill vs central-walkable.",
    rounds: [
      { question: "Walkability to central sights", winner: "b", body: "Marais wins by a wide margin. Louvre 15 min, Notre-Dame 12 min, Pompidou 5 min. Montmartre is 30+ min metro to anywhere central." },
      { question: "Atmosphere", winner: "a", body: "Montmartre wins for the romantic photo — Sacré-Cœur, Place du Tertre, the steep cobbled lanes. Marais is denser but less iconic." },
      { question: "Tourist crush", winner: "b", body: "Montmartre's main streets become unwalkable by 11am in season. Marais gets crowded but the network of side streets disperses people." },
      { question: "Restaurants past 10pm", winner: "b", body: "Marais, decisively. Montmartre's restaurants close by 10pm and lean tourist-trap on Place du Tertre. Marais runs to midnight." },
      { question: "Quiet sleep", winner: "a", body: "Montmartre is residential after 10pm — most tourists leave the hill. Marais's bar streets run loud weekends until 2am." },
      { question: "Price", winner: "a", body: "Montmartre is 15-25% cheaper than Marais. The hill premium is real but lower than the central-arrondissement premium." },
    ],
    pickA: "Pick Montmartre for romantic stays, photo-focused trips, light sleepers, or budget-conscious travelers willing to ride the metro to dinner.",
    pickB: "Pick Le Marais for first-time visits, dinner-focused trips, anyone who wants every sight at walking distance. The metro-to-anywhere logistics from Montmartre are a daily tax.",
    bottomLine: "Montmartre for the romantic photo. Marais for everything else.",
  },
  // PARIS: Saint-Germain vs Latin Quarter
  {
    slug: "saint-germain-vs-latin-quarter",
    citySlug: "paris",
    countrySlug: "france",
    aSlug: "saint-germain-des-pres",
    bSlug: "latin-quarter",
    aLabel: "Saint-Germain",
    bLabel: "Latin Quarter",
    metaTitle: "Saint-Germain vs Latin Quarter: Where to Stay in Paris",
    metaDescription:
      "Both Left Bank — but very different trips. Honest comparison of tourist crush, restaurants, walkability and which Paris stay fits each.",
    intro:
      "These are the two Left Bank options most first-timers consider. Saint-Germain (6th) is the literary-and-museum Paris — Café de Flore, the Bon Marché, walkable to the Louvre and Orsay. Latin Quarter (5th) is the Sorbonne-and-Notre-Dame quarter just east, denser tourist-trap restaurants, with the Panthéon and the Jardin du Luxembourg shared between them.",
    rounds: [
      { question: "Walkability to Louvre/Orsay", winner: "a", body: "Saint-Germain is 10-15 min walk to Orsay and 12-15 min to the Louvre. Latin Quarter adds 5-10 min." },
      { question: "Walkability to Notre-Dame", winner: "b", body: "Latin Quarter is 5-10 min from the cathedral. Saint-Germain is 12-15 min." },
      { question: "Restaurants", winner: "a", body: "Saint-Germain has actual neighborhood kitchens — rue de Buci, rue de Seine, rue Mabillon have density of real restaurants. Latin Quarter's main strip (rue de la Huchette) is the worst-quality dinner block in Paris." },
      { question: "Tourist crush", winner: "a", body: "Saint-Germain is busier but spreads across the 6th. Latin Quarter funnels everyone onto rue Saint-Séverin and Petit Pont — much denser crush." },
      { question: "Price", winner: "b", body: "Latin Quarter runs 15-25% cheaper than Saint-Germain. The 6th's prestige premium is real." },
    ],
    pickA: "Pick Saint-Germain for romantic trips, first-timers willing to pay the premium, dinner-focused stays. It's the prettier and better-fed Left Bank.",
    pickB: "Pick Latin Quarter only if budget is tight, the Notre-Dame setting is the point, or you specifically want the Sorbonne quarter. Eat outside the rue de la Huchette strip.",
    bottomLine: "Saint-Germain for the literary-Paris cliché. Latin Quarter for budget proximity to Notre-Dame.",
  },
  // PARIS: Latin Quarter vs Montmartre
  {
    slug: "latin-quarter-vs-montmartre",
    citySlug: "paris",
    countrySlug: "france",
    aSlug: "latin-quarter",
    bSlug: "montmartre",
    aLabel: "Latin Quarter",
    bLabel: "Montmartre",
    metaTitle: "Latin Quarter vs Montmartre: Where to Stay in Paris",
    metaDescription:
      "Two of Paris's most touristy quarters compared honestly — sight-access, atmosphere, restaurants, price and noise.",
    intro:
      "Both quarters lean tourist-heavy by reputation. Latin Quarter is Left Bank around the Sorbonne and Notre-Dame; Montmartre is the hill quarter with Sacré-Cœur. They both photograph well and both have restaurant-quality problems if you stay on the wrong street.",
    rounds: [
      { question: "Walkability to central sights", winner: "a", body: "Latin Quarter is 10-15 min from Notre-Dame, the Panthéon, the Louvre. Montmartre is metro-only to anywhere central — 25-35 min door-to-door." },
      { question: "Iconic photo", winner: "b", body: "Montmartre wins. Sacré-Cœur is the iconic dome. Latin Quarter's photo is the Panthéon — handsome but unremarkable." },
      { question: "Restaurants quality", winner: "tied", body: "Both have famous tourist-trap strips (rue de la Huchette, Place du Tertre) and both have real kitchens off them. Either works if you research." },
      { question: "Quiet sleep", winner: "b", body: "Montmartre, by a wide margin. Hill clears of tourists by 8pm; residential after. Latin Quarter has Notre-Dame foot traffic and pub crowds until midnight." },
      { question: "Price", winner: "tied", body: "Both €130-€250 for decent product. Latin Quarter slightly cheaper for chain hotels; Montmartre slightly cheaper for boutiques." },
    ],
    pickA: "Pick Latin Quarter for short trips focused on Notre-Dame, Sorbonne and central walkability. Eat off the main strip.",
    pickB: "Pick Montmartre for romantic stays, light sleepers, anyone who wants the iconic-Paris-on-a-hill photo. Accept the metro to dinner.",
    bottomLine: "Latin Quarter for central walkability. Montmartre for the photo and quiet sleep.",
  },
  // ROME: Centro Storico vs Monti
  {
    slug: "centro-storico-vs-monti",
    citySlug: "rome",
    countrySlug: "italy",
    aSlug: "centro-storico",
    bSlug: "monti",
    aLabel: "Centro Storico",
    bLabel: "Monti",
    metaTitle: "Centro Storico vs Monti: Where to Stay in Rome",
    metaDescription:
      "Rome's tourist-heart Centro Storico or the boho Monti? Honest comparison of walkability, restaurants, noise and price.",
    intro:
      "Centro Storico is the Pantheon-Piazza-Navona-Campo-de'-Fiori cluster — the maximum-tourist core. Monti sits east of the Forum, traditionally working-class, now Rome's design-and-wine-bar quarter. Both walkable to everything central; the trip changes meaningfully between them.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Centro Storico wins. Pantheon, Trevi, Piazza Navona, Spanish Steps all 5-10 min walk. Monti is closer to the Forum/Colosseum but 15-20 min to the Pantheon." },
      { question: "Restaurants", winner: "b", body: "Monti, decisively. Via dei Serpenti, Via del Boschetto have real kitchens — wine bars, design pizza, Roman cucina. Centro Storico's restaurants are mostly tourist-priced." },
      { question: "Quiet sleep", winner: "tied", body: "Monti has bar overflow on Via del Boschetto until 1am weekends. Centro Storico has restaurant-and-tour-group noise until 11pm. Side streets in either are fine." },
      { question: "Price", winner: "b", body: "Monti runs 15-25% cheaper than Centro Storico — €150-€280 vs €200-€400 for similar product." },
      { question: "Atmosphere", winner: "tied", body: "Centro Storico is touristy-pretty; Monti is design-and-wine-bar bohemian. Both feel real Rome. Pick on what kind of evening you want." },
    ],
    pickA: "Pick Centro Storico for first-time visits, sights-focused short trips, anyone who wants every Roman cliché at the door. Pay the premium and use it.",
    pickB: "Pick Monti for return visits, dinner-focused trips, budget-conscious travelers, or anyone who wants quieter mornings. The 15-min walk to the Pantheon is part of the routine.",
    bottomLine: "Centro Storico for first-timers. Monti for second visits and dinner focus.",
  },
  // ROME: Monti vs Prati
  {
    slug: "monti-vs-prati",
    citySlug: "rome",
    countrySlug: "italy",
    aSlug: "monti",
    bSlug: "prati",
    aLabel: "Monti",
    bLabel: "Prati",
    metaTitle: "Monti vs Prati: Where to Stay in Rome",
    metaDescription:
      "Rome's bohemian Monti or the upmarket Prati near Vatican? Real take on walkability, food, atmosphere and Vatican access.",
    intro:
      "Monti is east of the Forum — design-and-wine-bar bohemian. Prati is across the Tiber north of Vatican City — wide grid streets, upscale shopping, residential-feeling. Both are good. They answer different questions.",
    rounds: [
      { question: "Walkability to Vatican", winner: "b", body: "Prati wins by definition — St. Peter's is 5-10 min walk. Monti is 30+ min west of the Vatican." },
      { question: "Walkability to ancient Rome", winner: "a", body: "Monti is 5 min from the Forum and Colosseum. Prati is 30 min east." },
      { question: "Restaurants", winner: "tied", body: "Both have real kitchens. Monti has cluster around Via dei Serpenti; Prati has via Cola di Rienzo and the wine bars near Castel Sant'Angelo. Slightly different price points." },
      { question: "Atmosphere", winner: "a", body: "Monti is denser, livelier, design-quarter feel. Prati is grid-pattern residential — feels more Milan than Rome." },
      { question: "Quiet sleep", winner: "b", body: "Prati is residential — silent past 11pm. Monti's bar streets run loud weekends." },
      { question: "Price", winner: "b", body: "Prati slightly cheaper — €130-€220 vs Monti's €150-€280. Both reasonable for central Rome." },
    ],
    pickA: "Pick Monti for atmosphere-and-dinner trips, Forum-and-Colosseum focus, anyone who wants the bohemian Rome.",
    pickB: "Pick Prati for Vatican-focused stays, families, light sleepers, or anyone wanting quiet residential evenings within walking distance of central sights.",
    bottomLine: "Monti for ancient-Rome focus and atmosphere. Prati for Vatican focus and quiet.",
  },
  // LONDON: Shoreditch vs Covent Garden
  {
    slug: "shoreditch-vs-covent-garden",
    citySlug: "london",
    countrySlug: "united-kingdom",
    aSlug: "shoreditch",
    bSlug: "covent-garden",
    aLabel: "Shoreditch",
    bLabel: "Covent Garden",
    metaTitle: "Shoreditch vs Covent Garden: Where to Stay in London",
    metaDescription:
      "London's east-end creative quarter or the central Covent Garden? Real take on walkability, food, atmosphere and which trip each fits.",
    intro:
      "Shoreditch is the east-end former-industrial creative quarter — bars, design hotels, street art. Covent Garden is the West End theatre-and-shopping core. The trip changes a lot between them — one is design-and-evenings, the other is musicals-and-museums.",
    rounds: [
      { question: "Walkability to West End theatres", winner: "b", body: "Covent Garden wins by definition — most theatres are 5-10 min walk. Shoreditch is 25-35 min by tube to the West End." },
      { question: "Restaurants past 10pm", winner: "a", body: "Shoreditch wins. The whole quarter is open past midnight — Pizza East, Lyle's, dozens of cocktail bars. Covent Garden's restaurants tilt pre-theatre and close by 10:30pm." },
      { question: "Atmosphere", winner: "a", body: "Shoreditch feels alive — markets, bars, late-night kitchens, design hotels. Covent Garden is tourist-and-theatre-goer dense, quieter at night." },
      { question: "Family-friendly", winner: "b", body: "Covent Garden, decisively. Buskers, the piazza, Theatre Royal nearby. Shoreditch's streets are inappropriate for kids on weekends." },
      { question: "Price", winner: "tied", body: "Both £200-£400 for decent product. Shoreditch's design hotels run premium; Covent Garden's central premium matches." },
    ],
    pickA: "Pick Shoreditch for evening-focused trips, design-conscious travelers, anyone over 25 who wants the creative London. Late-night kitchens at the door.",
    pickB: "Pick Covent Garden for theatre-focused trips, families with kids, first-time visitors who want the central tourist London. The West End logistics from anywhere else cost real time.",
    bottomLine: "Shoreditch for evenings. Covent Garden for theatre and families.",
  },
  // LONDON: South Kensington vs Bloomsbury
  {
    slug: "south-kensington-vs-bloomsbury",
    citySlug: "london",
    countrySlug: "united-kingdom",
    aSlug: "south-kensington",
    bSlug: "bloomsbury",
    aLabel: "South Kensington",
    bLabel: "Bloomsbury",
    metaTitle: "South Kensington vs Bloomsbury: Where to Stay in London",
    metaDescription:
      "London's museum quarter or the literary Bloomsbury? Honest take on walkability, food, families and which fits each trip.",
    intro:
      "South Ken is the museum quarter — V&A, Natural History Museum, Hyde Park edge. Bloomsbury is the literary district north of the Strand — British Museum, garden squares, university-adjacent. Both are first-timer favorites and quieter alternatives to the West End.",
    rounds: [
      { question: "Walkability to museums", winner: "tied", body: "South Ken has 3 major museums at the door (V&A, Natural History, Science). Bloomsbury has the British Museum and Soane's. Equivalent in volume; different in subject." },
      { question: "Walkability to West End", winner: "b", body: "Bloomsbury is 10-15 min walk to Covent Garden and theatres. South Ken is 25-30 min by tube." },
      { question: "Restaurants", winner: "tied", body: "Both fine, neither outstanding. South Ken has French bistros and gastropubs near Old Brompton Road. Bloomsbury has Lamb's Conduit Street and Marchmont Street with real density." },
      { question: "Best for families", winner: "a", body: "South Ken wins. Three kid-friendly museums, Hyde Park, residential calm, Princess Diana playground 10 min walk." },
      { question: "Atmosphere", winner: "tied", body: "South Ken is wealthy-residential, garden-square calm. Bloomsbury is literary-academic, calmer than tourist London but with more independent shops." },
      { question: "Price", winner: "b", body: "Bloomsbury slightly cheaper — £180-£320 vs South Ken's £220-£400. Both expensive, gap is real." },
    ],
    pickA: "Pick South Ken for families with young kids, museum-focused trips, anyone who wants Hyde Park access and quiet residential evenings.",
    pickB: "Pick Bloomsbury for theatre-and-museum trips combined, longer stays, or anyone who wants closer access to Covent Garden and the British Museum.",
    bottomLine: "South Ken for families and museums. Bloomsbury for theatre access and literary atmosphere.",
  },
  // LONDON: Covent Garden vs Bloomsbury
  {
    slug: "covent-garden-vs-bloomsbury",
    citySlug: "london",
    countrySlug: "united-kingdom",
    aSlug: "covent-garden",
    bSlug: "bloomsbury",
    aLabel: "Covent Garden",
    bLabel: "Bloomsbury",
    metaTitle: "Covent Garden vs Bloomsbury: Where to Stay in London",
    metaDescription:
      "London's theatre core or quieter Bloomsbury? Real take on noise, walkability, families, and which suits each trip.",
    intro:
      "Both are zone-1 central. Covent Garden is the theatre-and-shopping core. Bloomsbury sits 10 min north — quieter, garden-squares, the British Museum. The pick is busy-central vs quiet-central.",
    rounds: [
      { question: "Walkability to theatres", winner: "a", body: "Covent Garden wins. Most West End theatres are 2-5 min walk. Bloomsbury is 10-15 min — fine but adds time." },
      { question: "Quiet sleep", winner: "b", body: "Bloomsbury, by a wide margin. Garden-square residential calm past 10pm. Covent Garden has theatre crowd, restaurant noise, busker noise until midnight." },
      { question: "Restaurants past 10pm", winner: "a", body: "Covent Garden has wider late-dinner choice. Bloomsbury's kitchens lean academic-pub and close by 10:30pm." },
      { question: "Tourist crush", winner: "b", body: "Bloomsbury escapes the worst of West End density. Covent Garden's Piazza is unwalkable mid-day in season." },
      { question: "Price", winner: "b", body: "Bloomsbury runs 15-25% cheaper than Covent Garden for equivalent product." },
    ],
    pickA: "Pick Covent Garden for theatre-focused stays, short trips where every walking-minute matters, anyone who wants the West End atmosphere as your evening.",
    pickB: "Pick Bloomsbury for longer stays, families, light sleepers, anyone whose trip is museum-and-theatre and willing to walk 10 min south for theatre. The savings are real.",
    bottomLine: "Covent Garden for theatre access. Bloomsbury for quiet sleep and longer stays.",
  },
  // BERLIN: Mitte vs Prenzlauer Berg
  {
    slug: "mitte-vs-prenzlauer-berg",
    citySlug: "berlin",
    countrySlug: "germany",
    aSlug: "mitte",
    bSlug: "prenzlauer-berg",
    aLabel: "Mitte",
    bLabel: "Prenzlauer Berg",
    metaTitle: "Mitte vs Prenzlauer Berg: Where to Stay in Berlin",
    metaDescription:
      "Berlin's central Mitte or the leafy Prenzlauer Berg? Honest take on sights, food, families, and which trip each suits.",
    intro:
      "Mitte is the central tourist quarter — Brandenburg Gate, Museum Island, Hackescher Markt. Prenzlauer Berg is the leafy quarter just north — restored Altbau, family-friendly, Mauerpark. The pick is sights-first vs slow-life.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Mitte wins. Brandenburg Gate, Museum Island, Reichstag, Holocaust Memorial — all 5-15 min walk. Prenzlauer Berg is 20-30 min by tram or U-Bahn." },
      { question: "Quiet sleep", winner: "b", body: "Prenzlauer Berg, decisively. Residential, leafy, tree-lined streets. Mitte has hotel-tour-group churn from 7am and bar noise on Hackescher Markt until 1am." },
      { question: "Restaurants", winner: "b", body: "Prenzlauer Berg has better neighborhood density — Schönhauser Allee, Kollwitzplatz markets. Mitte's restaurants tilt corporate-lunch and tourist-priced." },
      { question: "Best for families", winner: "b", body: "Prenzlauer Berg by a wide margin. Mauerpark, playgrounds in every plaza, family-aware restaurants. Mitte is doable but unfocused for families." },
      { question: "Price", winner: "b", body: "Prenzlauer Berg runs 15-20% cheaper than Mitte for equivalent product." },
    ],
    pickA: "Pick Mitte for short first-time trips, sights-focused itineraries, anyone willing to pay premium for central walkability.",
    pickB: "Pick Prenzlauer Berg for families, longer stays, anyone over 35 who wants leafy calm. The 20-min tram to Mitte runs every 4 min and you'll use it twice a day.",
    bottomLine: "Mitte for sights-first short trips. Prenzlauer Berg for families and longer Berlin.",
  },
  // BERLIN: Friedrichshain vs Kreuzberg
  {
    slug: "friedrichshain-vs-kreuzberg",
    citySlug: "berlin",
    countrySlug: "germany",
    aSlug: "friedrichshain",
    bSlug: "kreuzberg",
    aLabel: "Friedrichshain",
    bLabel: "Kreuzberg",
    metaTitle: "Friedrichshain vs Kreuzberg: Where to Stay in Berlin",
    metaDescription:
      "Berlin's two famous post-industrial bar quarters compared — real differences in nightlife, food, walkability and atmosphere.",
    intro:
      "Both are former East/West-divide quarters that turned into Berlin's nightlife capitals. Kreuzberg is south of the river — Turkish-and-techno, Görli, Kotti. Friedrichshain is east of Kreuzberg — even later-bar, Berghain, RAW Gelände. They're often grouped but read different in person.",
    rounds: [
      { question: "Nightlife depth", winner: "tied", body: "Friedrichshain has Berghain, RAW Gelände, Boxhagener Platz. Kreuzberg has Kotti, Görli, the bar streets near U-Bahn Schlesisches Tor. Both serious." },
      { question: "Restaurants", winner: "b", body: "Kreuzberg, by a margin. Markthalle Neun, the Turkish food on Kottbusser Damm, the dense Vietnamese-Turkish-craft strip. Friedrichshain has good kitchens but less variety." },
      { question: "Walkability to central sights", winner: "b", body: "Kreuzberg is 25-30 min walk or 15 min U-Bahn to Brandenburg Gate. Friedrichshain is 35-40 min — further east." },
      { question: "Atmosphere", winner: "tied", body: "Kreuzberg leans Turkish-and-creative. Friedrichshain leans punk-and-techno. Both feel alive, both grittier than central Berlin." },
      { question: "Price", winner: "a", body: "Friedrichshain runs slightly cheaper than Kreuzberg — €100-€180 vs €120-€220 for equivalent product." },
    ],
    pickA: "Pick Friedrichshain for techno-focused trips (Berghain queue is 20 min walk), longer stays, or anyone wanting the deepest late-night Berlin.",
    pickB: "Pick Kreuzberg for food-focused trips, anyone who wants markets and Turkish-Berlin density, slightly closer to Mitte. The defaults overlap heavily.",
    bottomLine: "Kreuzberg for food. Friedrichshain for techno and budget. Both serve the same trip.",
  },
  // AMSTERDAM: Jordaan vs Centrum
  {
    slug: "jordaan-vs-centrum",
    citySlug: "amsterdam",
    countrySlug: "netherlands",
    aSlug: "jordaan",
    bSlug: "centrum",
    aLabel: "Jordaan",
    bLabel: "Centrum",
    metaTitle: "Jordaan vs Centrum: Where to Stay in Amsterdam",
    metaDescription:
      "Amsterdam's leafy Jordaan or the touristy Centrum? Honest take on canals, restaurants, noise, stag groups and which fits each trip.",
    intro:
      "Centrum is the medieval heart with Dam Square, the Royal Palace, and the Red Light District. Jordaan is the canal-and-galleries quarter just west — leafy, less touristy, locals' choice. The price gap is small. The atmosphere gap is large.",
    rounds: [
      { question: "Tourist/stag crush", winner: "a", body: "Jordaan wins, decisively. Centrum is the loudest stag-do destination in Europe — most central streets are unwalkable Friday-Saturday nights. Jordaan gets none of this." },
      { question: "Restaurants", winner: "a", body: "Jordaan has actual neighborhood kitchens. Centrum's central blocks are mostly tourist-trap waffle stands and pub food. Real Centrum restaurants exist but require research." },
      { question: "Sights at your door", winner: "b", body: "Centrum has Royal Palace, Dam Square, Anne Frank House (10 min). Jordaan is 5 min from Anne Frank but 15 min from Dam." },
      { question: "Quiet sleep", winner: "a", body: "Jordaan is residential calm past 11pm. Centrum's central blocks have Red Light District foot traffic and stag noise until 4am." },
      { question: "Price", winner: "tied", body: "Both €180-€350 for decent product. Jordaan slightly cheaper for canal-house apartments; Centrum cheaper for chain hotels." },
    ],
    pickA: "Pick Jordaan for any 2+ night stay, anyone who wants the cliché Amsterdam canals and quiet sleep. The 15-min walk to Dam is part of the routine.",
    pickB: "Pick Centrum only for short business trips, single-night stays, or anyone who needs central station logistics and accepts stag-night noise.",
    bottomLine: "Jordaan, almost always. Centrum is the wrong default.",
  },
  // AMSTERDAM: De Pijp vs Centrum
  {
    slug: "de-pijp-vs-centrum",
    citySlug: "amsterdam",
    countrySlug: "netherlands",
    aSlug: "de-pijp",
    bSlug: "centrum",
    aLabel: "De Pijp",
    bLabel: "Centrum",
    metaTitle: "De Pijp vs Centrum: Where to Stay in Amsterdam",
    metaDescription:
      "Amsterdam's hipster De Pijp or the touristy Centrum? Real take on food, walkability, stag-noise and which to pick.",
    intro:
      "Centrum is the medieval tourist core. De Pijp is south of the Singelgracht — Albert Cuyp market, restaurant-dense, where younger Amsterdammers actually eat. The trip reads completely different between them.",
    rounds: [
      { question: "Restaurants", winner: "a", body: "De Pijp, decisively. Albert Cuypstraat, Eerste van der Helststraat have density of real kitchens. Centrum's restaurants are mostly tourist-priced." },
      { question: "Walkability to central sights", winner: "b", body: "Centrum has Dam Square at your door. De Pijp is 20-25 min walk or 10 min tram to Centrum." },
      { question: "Quiet sleep", winner: "a", body: "De Pijp residential, silent past 11pm. Centrum has Red Light District and stag-night noise until 4am." },
      { question: "Atmosphere", winner: "a", body: "De Pijp feels lived-in — locals shop the market, families walk dogs, real cafes. Centrum is tourist-and-stag party-with-museums." },
      { question: "Price", winner: "a", body: "De Pijp 15-20% cheaper than Centrum for equivalent product. Both expensive — Amsterdam is Amsterdam." },
    ],
    pickA: "Pick De Pijp for 3+ night stays, food-focused trips, anyone who wants the lived-in Amsterdam. The tram to Centrum runs every 4 min.",
    pickB: "Pick Centrum only for sights-first single nights or business trips needing station logistics. Otherwise the stag noise is a real cost.",
    bottomLine: "De Pijp, almost always. Centrum should be a tactical pick, not a default.",
  },
  // AMSTERDAM: De Pijp vs Oud-West
  {
    slug: "de-pijp-vs-oud-west",
    citySlug: "amsterdam",
    countrySlug: "netherlands",
    aSlug: "de-pijp",
    bSlug: "oud-west",
    aLabel: "De Pijp",
    bLabel: "Oud-West",
    metaTitle: "De Pijp vs Oud-West: Where to Stay in Amsterdam",
    metaDescription:
      "Two of Amsterdam's best non-Centrum quarters compared. Real differences in food, price, walkability and trip fit.",
    intro:
      "These are Amsterdam's two strongest under-the-radar bases. De Pijp is south of the Singelgracht — market-and-restaurants. Oud-West is west of the Vondelpark — leafier, slightly cheaper, walkable to Vondelpark and the museums. Both serve the same kind of traveler. The pick is granular.",
    rounds: [
      { question: "Restaurants", winner: "a", body: "De Pijp slightly wins — Albert Cuyp area is denser. Oud-West's Bilderdijkstraat is good but less variety." },
      { question: "Walkability to museums", winner: "b", body: "Oud-West wins. Rijksmuseum is 10 min walk, Van Gogh Museum 12 min. De Pijp is 15-20 min from same." },
      { question: "Walkability to Vondelpark", winner: "b", body: "Oud-West is at the park's edge. De Pijp is 10 min walk." },
      { question: "Atmosphere", winner: "tied", body: "De Pijp is denser, livelier, market-and-bar. Oud-West is leafier, more residential. Both feel real Amsterdam." },
      { question: "Price", winner: "b", body: "Oud-West 5-10% cheaper than De Pijp. Both €130-€220 for decent product." },
    ],
    pickA: "Pick De Pijp for food-and-bar focus, market-loving travelers, anyone who wants the densest non-Centrum Amsterdam.",
    pickB: "Pick Oud-West for museum-focused trips, families with young kids, light sleepers, or anyone who wants Vondelpark at the door.",
    bottomLine: "De Pijp for food density. Oud-West for park access and museums. Both excellent.",
  },
  // MADRID: Salamanca vs La Latina
  {
    slug: "salamanca-vs-la-latina",
    citySlug: "madrid",
    countrySlug: "spain",
    aSlug: "salamanca",
    bSlug: "la-latina",
    aLabel: "Salamanca",
    bLabel: "La Latina",
    metaTitle: "Salamanca vs La Latina: Where to Stay in Madrid",
    metaDescription:
      "Madrid's upscale Salamanca or the Sunday-tapas-crawl La Latina? Honest take on shopping, food, atmosphere and price.",
    intro:
      "Salamanca is the upmarket grid east of Retiro — designer shopping, Calle Serrano, residential prestige. La Latina is the medieval-tapas-and-flea-market quarter south of Plaza Mayor — Cava Baja, Sunday Rastro market. They're at opposite ends of the city's character spectrum.",
    rounds: [
      { question: "Shopping", winner: "a", body: "Salamanca by definition — Calle Serrano is Madrid's luxury strip. La Latina has antiques and the Rastro market on Sundays only." },
      { question: "Tapas crawl", winner: "b", body: "La Latina, decisively. Cava Baja and Cava Alta are the Sunday-tapas tradition. Salamanca's restaurants are upscale dining, not bar crawl." },
      { question: "Quiet sleep", winner: "a", body: "Salamanca is residential, calm past 11pm. La Latina runs loud Thursday-Sunday until 2am — tapas crawl is the whole point." },
      { question: "Walkability to Prado", winner: "tied", body: "Salamanca is 10-15 min walk; La Latina is 12-15 min. Equivalent." },
      { question: "Price", winner: "b", body: "La Latina 15-20% cheaper than Salamanca for equivalent product." },
    ],
    pickA: "Pick Salamanca for shopping-focused trips, families, anyone over 50 wanting calmer evenings, or business-style stays.",
    pickB: "Pick La Latina for food-focused trips, weekend stays focused on the Rastro, anyone under 40 who wants the Sunday-tapas-crawl Madrid.",
    bottomLine: "Salamanca for shopping and quiet. La Latina for the tapas trip.",
  },
  // MADRID: Chueca vs Malasaña
  {
    slug: "chueca-vs-malasana",
    citySlug: "madrid",
    countrySlug: "spain",
    aSlug: "chueca",
    bSlug: "malasana",
    aLabel: "Chueca",
    bLabel: "Malasaña",
    metaTitle: "Chueca vs Malasaña: Where to Stay in Madrid",
    metaDescription:
      "Madrid's two famous central nightlife quarters compared honestly. Real differences in vibe, food, noise and price.",
    intro:
      "Chueca and Malasaña are next-door — both central, both restaurant-and-bar dense, both north of Gran Vía. Chueca is Madrid's LGBTQ+ heart and design quarter. Malasaña is the indie-rock-and-vintage-shops quarter. They share the same trip but feel different.",
    rounds: [
      { question: "Restaurants", winner: "tied", body: "Both excellent, both dense. Chueca leans design-and-cocktail. Malasaña leans casual-and-tapas. Pick on energy, not quality." },
      { question: "Atmosphere", winner: "tied", body: "Chueca is queer-friendly, design-shop, slightly older crowd. Malasaña is younger, indie-rock, vintage-shop. Both fundamentally Madrid." },
      { question: "Quiet sleep", winner: "tied", body: "Both run loud weekends until 3am. Chueca's main strip (Calle Hortaleza) and Malasaña's Plaza Dos de Mayo are equally bar-overflow-loud. Side streets in either work." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
      { question: "Walkability", winner: "tied", body: "Both 10 min walk to Sol/Plaza Mayor and 5 min to each other. Effectively the same neighborhood logistically." },
    ],
    pickA: "Pick Chueca for LGBTQ+-friendly stays, design-focused travelers, slightly older crowd wanting cocktail-and-dinner.",
    pickB: "Pick Malasaña for younger trips, indie-rock-and-vintage focus, anyone whose ideal trip is bar-crawl-with-vermouth.",
    bottomLine: "Chueca for cocktails-and-design. Malasaña for casual-and-vintage. Tour the other on foot.",
  },
  // VIENNA: Innere Stadt vs Leopoldstadt
  {
    slug: "innere-stadt-vs-leopoldstadt",
    citySlug: "vienna",
    countrySlug: "austria",
    aSlug: "innere-stadt",
    bSlug: "leopoldstadt",
    aLabel: "Innere Stadt",
    bLabel: "Leopoldstadt",
    metaTitle: "Innere Stadt vs Leopoldstadt: Where to Stay in Vienna",
    metaDescription:
      "Vienna's UNESCO inner city or the under-rated Leopoldstadt across the Danube canal? Honest take on price, food, and trip fit.",
    intro:
      "Innere Stadt (District 1) is the imperial core — Stephansdom, Hofburg, the opera. Leopoldstadt (District 2) is across the Danube canal — formerly Jewish, now lively-and-affordable, with the Prater and the Karmelitermarkt. Most travelers default to District 1. Many shouldn't.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Innere Stadt wins by definition — every imperial sight is 5-10 min walk. Leopoldstadt is 10-15 min across the canal." },
      { question: "Restaurants past 10pm", winner: "b", body: "Leopoldstadt, decisively. Karmelitermarkt area and the streets around Praterstern have real density. Innere Stadt's restaurants close by 10pm and lean tourist-priced." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Innere Stadt has Stephansplatz tour-group churn; Leopoldstadt is residential past midnight." },
      { question: "Price", winner: "b", body: "Leopoldstadt runs 25-35% cheaper than Innere Stadt for equivalent product. €120-€220 vs €180-€350." },
      { question: "Atmosphere", winner: "tied", body: "Innere Stadt is imperial-formal-tourist. Leopoldstadt is lively-affordable-real. Pick on what kind of evening you want." },
    ],
    pickA: "Pick Innere Stadt for first-time visits, sights-focused short trips, anyone willing to pay 30%+ premium for central walkability.",
    pickB: "Pick Leopoldstadt for return visits, food-focused trips, families, longer stays, budget-conscious travelers. The 10-min walk into Innere Stadt is downhill across the canal.",
    bottomLine: "Innere Stadt for first-timers. Leopoldstadt for everyone else.",
  },
  // PRAGUE: Old Town vs Mala Strana
  {
    slug: "stare-mesto-vs-mala-strana",
    citySlug: "prague",
    countrySlug: "czech-republic",
    aSlug: "stare-mesto",
    bSlug: "mala-strana",
    aLabel: "Staré Město",
    bLabel: "Malá Strana",
    metaTitle: "Staré Město vs Malá Strana: Where to Stay in Prague",
    metaDescription:
      "Prague's Old Town or the castle-side Malá Strana? Honest take on tourist crush, walkability, charm and price.",
    intro:
      "Staré Město is the medieval Old Town with the Astronomical Clock and Old Town Square. Malá Strana is the Lesser Town across the Charles Bridge — castle-side, leafier, more village-feeling. Both UNESCO. Both touristy. The trip changes meaningfully.",
    rounds: [
      { question: "Atmosphere", winner: "b", body: "Malá Strana wins on charm — narrower lanes, the Lennon Wall, the gardens below the castle. Staré Město is bigger and more obvious." },
      { question: "Tourist crush", winner: "b", body: "Malá Strana is busy near the bridge but disperses fast. Staré Město's Old Town Square is unwalkable mid-day in season." },
      { question: "Walkability to castle", winner: "b", body: "Malá Strana is at the castle's foot — 10-min uphill walk. Staré Město adds 20-25 min via the bridge." },
      { question: "Restaurants", winner: "tied", body: "Both have tourist-priced central restaurants and quality places off-strip. Staré Město has more variety; Malá Strana has prettier settings." },
      { question: "Price", winner: "tied", body: "Both €130-€280 for decent product. Equivalent." },
      { question: "Quiet sleep", winner: "b", body: "Malá Strana wins. Staré Město has bar-overflow-and-stag noise on weekends. Malá Strana is residential past midnight." },
    ],
    pickA: "Pick Staré Město for first-time visits, sights-density focus, anyone wanting the densest restaurant-and-bar walkability.",
    pickB: "Pick Malá Strana for romantic trips, light sleepers, castle-focused itineraries, or anyone wanting the prettier and quieter Prague.",
    bottomLine: "Staré Město for first-timers. Malá Strana for romance and quiet.",
  },
  // PRAGUE: Žižkov vs Vinohrady (different from existing)
  {
    slug: "stare-mesto-vs-zizkov",
    citySlug: "prague",
    countrySlug: "czech-republic",
    aSlug: "stare-mesto",
    bSlug: "zizkov",
    aLabel: "Staré Město",
    bLabel: "Žižkov",
    metaTitle: "Staré Město vs Žižkov: Where to Stay in Prague",
    metaDescription:
      "Prague's UNESCO Old Town or the indie-bar Žižkov? Real take on price, food, atmosphere and which trip each fits.",
    intro:
      "Staré Město is the postcard. Žižkov is the indie-bar quarter east of the Old Town — the most pubs per capita in the Czech Republic, the TV tower, real local life. The pick is tourist-and-pretty vs local-and-cheap.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Staré Město is iconic. Žižkov has the local-bar density most travelers don't see. Both interesting; pick on what you want from a night out." },
      { question: "Tourist crush", winner: "b", body: "Staré Město becomes unwalkable mid-day. Žižkov gets none of this." },
      { question: "Restaurants and bars", winner: "b", body: "Žižkov has the highest pub density in Czech Republic. Staré Město has volume but mostly tourist-priced." },
      { question: "Price", winner: "b", body: "Žižkov 30-40% cheaper than Staré Město. €60-€120 vs €130-€280 for similar product." },
      { question: "Walkability to Old Town Square", winner: "a", body: "Staré Město is 5 min. Žižkov is 25-30 min walk or 10 min tram." },
    ],
    pickA: "Pick Staré Město for first-time visits, short trips, sights-density focus.",
    pickB: "Pick Žižkov for return visits, food-and-pub-focused trips, longer stays, budget travelers. The tram into the Old Town runs every 5 min.",
    bottomLine: "Staré Město for tourists. Žižkov for local pub-Prague at half the price.",
  },
  // BUDAPEST: District V vs District VI
  {
    slug: "district-v-vs-district-vi",
    citySlug: "budapest",
    countrySlug: "hungary",
    aSlug: "district-v",
    bSlug: "district-vi",
    aLabel: "District V",
    bLabel: "District VI",
    metaTitle: "District V vs District VI: Where to Stay in Budapest",
    metaDescription:
      "Budapest's polished Belváros or the Andrássy-Avenue District VI? Real take on walkability, food, atmosphere and price.",
    intro:
      "District V (Belváros) is the central polished quarter along the Danube. District VI (Terézváros) is northeast — Andrássy Avenue, the State Opera, the Jewish Quarter overlap. Both walkable to the Parliament. The pick is calm-classic vs lively-liberal.",
    rounds: [
      { question: "Walkability to Parliament", winner: "a", body: "District V is at Parliament's door. District VI is 10-15 min walk." },
      { question: "Restaurants past 10pm", winner: "b", body: "District VI wins. The streets around Liszt Ferenc tér and the area near the State Opera have density of late kitchens. District V is more lunch-and-business." },
      { question: "Atmosphere", winner: "b", body: "District V is polished-and-quiet — central business stays. District VI feels alive — restaurants, bars, the avenue." },
      { question: "Quiet sleep", winner: "a", body: "District V quieter. District VI has bar streets that run loud Thursday-Sunday." },
      { question: "Price", winner: "b", body: "District VI 10-15% cheaper than District V for similar product." },
    ],
    pickA: "Pick District V for business stays, families, anyone over 50 wanting central-and-calm.",
    pickB: "Pick District VI for food-focused trips, opera-going stays, anyone under 40. The Andrássy walk is the city's prettiest.",
    bottomLine: "District V for business and quiet. District VI for food and opera.",
  },
  // BUDAPEST: District VI vs District VII
  {
    slug: "district-vi-vs-district-vii",
    citySlug: "budapest",
    countrySlug: "hungary",
    aSlug: "district-vi",
    bSlug: "district-vii",
    aLabel: "District VI",
    bLabel: "District VII",
    metaTitle: "District VI vs District VII: Where to Stay in Budapest",
    metaDescription:
      "Budapest's Andrássy Avenue District or the Jewish Quarter ruin-bar District VII? Real take on noise, food and which fits each trip.",
    intro:
      "District VI is Andrássy Avenue — opera house, polished restaurants, slightly upmarket. District VII is the Jewish Quarter — the ruin bars (Szimpla Kert, Instant), party-and-food. They blur together near the synagogue but are different at night.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "District VI is opera-and-restaurant; District VII is ruin-bars-and-party. Both feel central Budapest. Pick on age and what you want from a night out." },
      { question: "Quiet sleep", winner: "a", body: "District VI quieter. District VII is the loudest stretch in central Budapest — Szimpla Kert overflow until 4am every weekend." },
      { question: "Restaurants", winner: "tied", body: "Both dense, different price points. District VI tilts polished; District VII tilts casual-and-Jewish-Hungarian." },
      { question: "Best for night out", winner: "b", body: "District VII, decisively. The ruin bars are the trip if that's what you came for." },
      { question: "Price", winner: "tied", body: "Both €80-€150 for decent product." },
    ],
    pickA: "Pick District VI for couples on romantic trips, families, anyone over 35 wanting calmer evenings with food access.",
    pickB: "Pick District VII for under-30 trips, ruin-bar-focused stays, anyone whose Budapest is the bar trip. Bring earplugs.",
    bottomLine: "District VI for calmer trips. District VII for the ruin bars.",
  },
  // ATHENS: Plaka vs Psyrri
  {
    slug: "plaka-vs-psyrri",
    citySlug: "athens",
    countrySlug: "greece",
    aSlug: "plaka",
    bSlug: "psyrri",
    aLabel: "Plaka",
    bLabel: "Psyrri",
    metaTitle: "Plaka vs Psyrri: Where to Stay in Athens",
    metaDescription:
      "Athens' Acropolis-side Plaka or the lively Psyrri? Honest take on tourist crush, food, atmosphere and noise.",
    intro:
      "Plaka is the old quarter under the Acropolis — whitewashed lanes, taverna-dense, the quintessential Athens postcard. Psyrri is the formerly-industrial-now-bar quarter just north — converted warehouses, mezedopoleia, late kitchens. The pick is sights-first vs food-first.",
    rounds: [
      { question: "Walkability to Acropolis", winner: "a", body: "Plaka is at the foot of the Acropolis. Psyrri is 10-15 min walk north." },
      { question: "Restaurants past 11pm", winner: "b", body: "Psyrri, decisively. The bar-and-mezedopolio strip runs to 2am. Plaka's tavernas close by 11:30pm and lean tourist-priced." },
      { question: "Atmosphere", winner: "tied", body: "Plaka is whitewashed-tourist-postcard. Psyrri is converted-warehouse-bar. Both feel real Athens. Pick on energy." },
      { question: "Quiet sleep", winner: "a", body: "Plaka quieter — most tourists leave by 11pm. Psyrri has bar overflow on weekends until 3am." },
      { question: "Price", winner: "b", body: "Psyrri 10-15% cheaper than Plaka. Both reasonable for European capital — €80-€150." },
    ],
    pickA: "Pick Plaka for first-time visits, sights-focused trips, anyone over 40 wanting quieter evenings with the Acropolis at the door.",
    pickB: "Pick Psyrri for food-and-bar focus, return visitors, anyone under 35 who wants the lively Athens evening.",
    bottomLine: "Plaka for sights. Psyrri for food.",
  },
  // STOCKHOLM: Gamla Stan vs Norrmalm
  {
    slug: "gamla-stan-vs-norrmalm",
    citySlug: "stockholm",
    countrySlug: "sweden",
    aSlug: "gamla-stan",
    bSlug: "norrmalm",
    aLabel: "Gamla Stan",
    bLabel: "Norrmalm",
    metaTitle: "Gamla Stan vs Norrmalm: Where to Stay in Stockholm",
    metaDescription:
      "Stockholm's medieval old town or the central Norrmalm? Honest take on transport, food, atmosphere and tourist crush.",
    intro:
      "Gamla Stan is the medieval island — Royal Palace, Stortorget, the postcard. Norrmalm is the central business core north of the bridge — Central Station, T-Centralen metro hub, the shopping. The trip changes meaningfully.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Gamla Stan is medieval-cobblestone-iconic. Norrmalm is generic-business-grid. Pick on whether you want the photo." },
      { question: "Transport hub", winner: "b", body: "Norrmalm wins by definition. T-Centralen is the metro intersection, Central Station is here, Arlanda Express terminates here." },
      { question: "Tourist crush", winner: "b", body: "Gamla Stan's main streets are unwalkable mid-day in season. Norrmalm gets central foot traffic but spreads across wider streets." },
      { question: "Restaurants", winner: "tied", body: "Gamla Stan tilts touristy-priced. Norrmalm has chains and a few real picks. Neither is the best Stockholm food — that's Södermalm." },
      { question: "Price", winner: "b", body: "Norrmalm 10-15% cheaper than Gamla Stan for equivalent product." },
    ],
    pickA: "Pick Gamla Stan for short stays, romantic trips, sights-focused first-timers willing to pay the premium for the postcard setting.",
    pickB: "Pick Norrmalm only if you need station logistics or it's a single-night business trip. Most travelers should pick Gamla Stan or Södermalm instead.",
    bottomLine: "Gamla Stan for the photo. Norrmalm only for transport-first stays.",
  },
  // LISBON: Baixa-Chiado vs Alfama
  {
    slug: "baixa-chiado-vs-alfama",
    citySlug: "lisbon",
    countrySlug: "portugal",
    aSlug: "baixa-chiado",
    bSlug: "alfama",
    aLabel: "Baixa-Chiado",
    bLabel: "Alfama",
    metaTitle: "Baixa-Chiado vs Alfama: Where to Stay in Lisbon",
    metaDescription:
      "Lisbon's flat central Baixa-Chiado or the steep medieval Alfama? Real take on walkability, atmosphere, mobility and price.",
    intro:
      "Baixa-Chiado is the flat central grid — Rossio, Praça do Comércio, the shopping. Alfama is the medieval Moorish quarter east — narrow stair-streets, fado houses, the cliché Lisbon photo. The pick depends a lot on mobility and what kind of evening you want.",
    rounds: [
      { question: "Mobility", winner: "a", body: "Baixa-Chiado is flat. Alfama is one of Europe's hilliest neighborhoods — stair-streets, no elevators, brutal with luggage." },
      { question: "Atmosphere", winner: "b", body: "Alfama is the postcard — narrow lanes, hanging laundry, fado at night. Baixa is grid-pattern handsome but unremarkable." },
      { question: "Restaurants", winner: "a", body: "Baixa-Chiado has the densest cluster — real kitchens, rooftop bars, daily-price meals. Alfama's fado houses are tourist-priced; the real food is harder to find." },
      { question: "Quiet sleep", winner: "b", body: "Alfama is residential-quiet past 11pm (fado houses close by 12). Baixa-Chiado has bar overflow on weekends." },
      { question: "Tourist crush", winner: "tied", body: "Both crowded mid-day. Alfama's tour-groups dissipate by 5pm. Baixa-Chiado sustains foot traffic until late." },
    ],
    pickA: "Pick Baixa-Chiado for first-time visits, anyone with luggage or mobility issues, dinner-focused trips, families with strollers.",
    pickB: "Pick Alfama for romantic stays, return visitors, anyone able to handle steep stairs, fado-focused trips. The cliché photo is at your door.",
    bottomLine: "Baixa-Chiado for walkability and food. Alfama for the photo and quiet, if you can handle the stairs.",
  },
  // LISBON: Príncipe Real vs Bairro Alto
  {
    slug: "principe-real-vs-bairro-alto",
    citySlug: "lisbon",
    countrySlug: "portugal",
    aSlug: "principe-real",
    bSlug: "bairro-alto",
    aLabel: "Príncipe Real",
    bLabel: "Bairro Alto",
    metaTitle: "Príncipe Real vs Bairro Alto: Where to Stay in Lisbon",
    metaDescription:
      "Lisbon's design-shop Príncipe Real or the bar-crawl Bairro Alto? Honest take on atmosphere, sleep, food and price.",
    intro:
      "Bairro Alto is the famous bar quarter west of Chiado — narrow lanes, dozens of bars, a wall of noise on weekends. Príncipe Real sits just north — calmer, design-shop and concept-store quarter, where Lisbon's design crowd actually lives. They share the same hill but read very different.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Príncipe Real is leafy, design-quarter, calm. Bairro Alto is narrow-lane bar overflow. Pick on what kind of evening you want." },
      { question: "Quiet sleep", winner: "a", body: "Príncipe Real, by a wide margin. Bairro Alto runs loud Thursday-Sunday until 3am — sleep on the main lanes is impossible weekends." },
      { question: "Restaurants", winner: "a", body: "Príncipe Real wins — design restaurants, the Embaixada market, real kitchens. Bairro Alto's restaurants are mostly bar food and tourist-priced." },
      { question: "Bars at night", winner: "b", body: "Bairro Alto, decisively. The whole quarter is the bar — that's the trip." },
      { question: "Price", winner: "b", body: "Bairro Alto 10-15% cheaper than Príncipe Real for equivalent product." },
    ],
    pickA: "Pick Príncipe Real for couples, families, anyone over 35 wanting calm with food access. The 5-min walk to Bairro Alto for one bar night is the right routine.",
    pickB: "Pick Bairro Alto for under-30 trips, bar-focused stays, anyone who wants the cliché loud-bar Lisbon evening at the door. Bring earplugs.",
    bottomLine: "Príncipe Real for couples and food. Bairro Alto for the bar trip.",
  },
  // PORTO: Baixa vs Ribeira
  {
    slug: "baixa-vs-ribeira",
    citySlug: "porto",
    countrySlug: "portugal",
    aSlug: "baixa",
    bSlug: "ribeira",
    aLabel: "Baixa",
    bLabel: "Ribeira",
    metaTitle: "Baixa vs Ribeira: Where to Stay in Porto",
    metaDescription:
      "Porto's central Baixa or the photogenic Ribeira on the river? Real take on walkability, mobility, tourist crush and price.",
    intro:
      "Ribeira is the famous river-front photo with the colorful tile facades. Baixa sits above it — flatter, walkable, with the train station and the major shopping. Most first-timers want Ribeira. Most should not.",
    rounds: [
      { question: "Pretty factor", winner: "b", body: "Ribeira is the postcard. Baixa is handsome but unremarkable in photos." },
      { question: "Mobility", winner: "a", body: "Baixa is flat. Ribeira is at the bottom of one of Porto's steepest slopes — every walk back is uphill." },
      { question: "Tourist crush", winner: "a", body: "Ribeira's main strip is unwalkable mid-day. Baixa is busy but spreads across wider streets." },
      { question: "Restaurants past 9pm", winner: "a", body: "Baixa wins. The restaurants on Rua Cândido dos Reis and Rua Galeria de Paris run later. Ribeira's restaurants are mostly tourist-priced and close by 10pm." },
      { question: "Price", winner: "tied", body: "Both €100-€180 for decent product. Equivalent." },
    ],
    pickA: "Pick Baixa for first-time visits, longer stays, families with strollers, mobility-limited travelers. The 10-min downhill walk to Ribeira is part of the daily ritual.",
    pickB: "Pick Ribeira only for short stays where the river-view-from-your-window is the trip. Accept the steep walks back uphill every night.",
    bottomLine: "Baixa, almost always. Ribeira looks better in photos than it lives in person.",
  },
  // FLORENCE: Santa Maria Novella vs Santa Croce
  {
    slug: "santa-maria-novella-vs-santa-croce",
    citySlug: "florence",
    countrySlug: "italy",
    aSlug: "santa-maria-novella",
    bSlug: "santa-croce",
    aLabel: "Santa Maria Novella",
    bLabel: "Santa Croce",
    metaTitle: "Santa Maria Novella vs Santa Croce: Where to Stay in Florence",
    metaDescription:
      "Florence's train-station-side or the Santa Croce quarter east of the Duomo? Real take on noise, food, walkability.",
    intro:
      "Both are central. Santa Maria Novella is around the train station — the cheapest sector for hotels, with the basilica of the same name. Santa Croce is east of the Duomo — the historic artisan quarter, food-dense, with the Basilica di Santa Croce. They serve different trips.",
    rounds: [
      { question: "Walkability to Duomo and Uffizi", winner: "b", body: "Santa Croce is 5-10 min from Duomo and Uffizi. Santa Maria Novella is 10-15 min." },
      { question: "Restaurants", winner: "b", body: "Santa Croce wins — Sant'Ambrogio Market, traditional trattorias, the densest non-tourist food in Florence." },
      { question: "Train logistics", winner: "a", body: "Santa Maria Novella is at the train station's door — fine for early Bologna/Rome connections." },
      { question: "Price", winner: "a", body: "Santa Maria Novella 15-25% cheaper than Santa Croce. The cheapest central sector — for a reason." },
      { question: "Quiet sleep", winner: "b", body: "Santa Croce residential past 11pm. Santa Maria Novella has station-area noise and inconsistent quality." },
    ],
    pickA: "Pick Santa Maria Novella only for budget-sensitive single nights or trips with very early train connections. The price is a tax for a reason.",
    pickB: "Pick Santa Croce for any 2+ night stay, food-focused trips, anyone who wants the lived-in artisan Florence. The default if budget allows.",
    bottomLine: "Santa Croce, almost always. Santa Maria Novella for budget-only trips.",
  },
  // BRUSSELS: Saint-Gilles vs Ixelles
  {
    slug: "saint-gilles-vs-ixelles",
    citySlug: "brussels",
    countrySlug: "belgium",
    aSlug: "saint-gilles",
    bSlug: "ixelles",
    aLabel: "Saint-Gilles",
    bLabel: "Ixelles",
    metaTitle: "Saint-Gilles vs Ixelles: Where to Stay in Brussels",
    metaDescription:
      "Brussels' Saint-Gilles or the Châtelain Ixelles? Real take on food, atmosphere, price and which trip each fits.",
    intro:
      "These are the two southern Brussels quarters most travel-savvy visitors choose over Grand Place. Saint-Gilles has the Hôtel de Ville, the Parvis market, immigrant-influenced food. Ixelles around Place du Châtelain is the design-shop-and-cocktail quarter where younger Brusseleers actually go.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Saint-Gilles is multicultural-grit-pretty Art Nouveau. Ixelles is design-and-cocktail-bourgeois. Both feel real Brussels. Pick on what you want." },
      { question: "Restaurants", winner: "b", body: "Ixelles has Châtelain's denser cocktail-and-bistro cluster. Saint-Gilles has cheaper and more diverse picks but spread out." },
      { question: "Walkability to Grand Place", winner: "tied", body: "Both 25-30 min walk or 10-15 min metro. Equivalent." },
      { question: "Price", winner: "a", body: "Saint-Gilles 10-15% cheaper than Ixelles for equivalent product." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Châtelain has weekend bar overflow; Saint-Gilles has occasional Parvis market noise." },
    ],
    pickA: "Pick Saint-Gilles for budget-conscious trips, food-diversity focus, anyone who wants the multicultural Brussels.",
    pickB: "Pick Ixelles for design-focused trips, cocktail-and-bistro evenings, slightly upmarket stays. Châtelain Sundays are excellent.",
    bottomLine: "Both excellent over Grand Place. Saint-Gilles for budget. Ixelles for design.",
  },
  // MUNICH: Glockenbachviertel vs Schwabing
  {
    slug: "glockenbachviertel-vs-schwabing",
    citySlug: "munich",
    countrySlug: "germany",
    aSlug: "glockenbachviertel",
    bSlug: "schwabing",
    aLabel: "Glockenbachviertel",
    bLabel: "Schwabing",
    metaTitle: "Glockenbachviertel vs Schwabing: Where to Stay in Munich",
    metaDescription:
      "Munich's queer-friendly Glockenbach or the leafy Schwabing? Real take on food, atmosphere, families and which fits each trip.",
    intro:
      "Glockenbachviertel is south of Marienplatz — Munich's queer-friendly evening quarter, cocktail-and-restaurant dense. Schwabing is north — leafy student-quarter near the Englischer Garten, calmer, family-aware. Both walkable to Altstadt.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "a", body: "Glockenbach wins. Müllerstraße and Hans-Sachs-Straße run loud and dense until midnight. Schwabing's restaurants close by 10:30pm." },
      { question: "Atmosphere", winner: "tied", body: "Glockenbach is queer-friendly-cocktail. Schwabing is leafy-student-park. Both real Munich. Pick on energy." },
      { question: "Walkability to Englischer Garten", winner: "b", body: "Schwabing wins by definition — the park is at your door. Glockenbach is 25-30 min walk or 10 min U-Bahn." },
      { question: "Best for families", winner: "b", body: "Schwabing — playgrounds, park access, family-aware restaurants. Glockenbach is doable but appropriate for adults." },
      { question: "Price", winner: "b", body: "Schwabing 10-15% cheaper than Glockenbach during non-Oktoberfest weeks." },
    ],
    pickA: "Pick Glockenbach for evening-focused trips, cocktail-and-dinner stays, LGBTQ+-friendly trips, anyone under 40.",
    pickB: "Pick Schwabing for families, park-focused trips, longer stays, light sleepers. The U-Bahn into Marienplatz takes 6 min.",
    bottomLine: "Glockenbach for evenings. Schwabing for families and park.",
  },
  // ISTANBUL: Beyoğlu vs Kadıköy
  {
    slug: "beyoglu-vs-kadikoy",
    citySlug: "istanbul",
    countrySlug: "turkey",
    aSlug: "beyoglu-galata",
    bSlug: "kadikoy",
    aLabel: "Beyoğlu",
    bLabel: "Kadıköy",
    metaTitle: "Beyoğlu vs Kadıköy: Where to Stay in Istanbul",
    metaDescription:
      "Istanbul's European-side Beyoğlu or the Asian-side Kadıköy? Real take on food, atmosphere, ferry logistics and price.",
    intro:
      "Both are the locals' Istanbul over Sultanahmet. Beyoğlu (European side, includes Galata and Karaköy) has the Galata Tower, İstiklal Avenue, food-and-cocktail density. Kadıköy is across the Bosphorus on the Asian side — Moda neighborhood, market, where most under-40 İstanbullus actually live.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Beyoğlu wins. Galata Tower, İstiklal, the museums of the Beyoğlu side, ferry to Sultanahmet — all walkable. Kadıköy needs the ferry to reach the historical sights." },
      { question: "Restaurants and atmosphere", winner: "tied", body: "Beyoğlu is dense-and-touristy. Kadıköy is dense-and-local. Both excellent food. Pick on whether you want to be in or away from the tourist current." },
      { question: "Quiet sleep", winner: "b", body: "Kadıköy quieter — Moda is residential past midnight. Beyoğlu's bar streets near İstiklal run loud weekends until 3am." },
      { question: "Price", winner: "b", body: "Kadıköy 20-30% cheaper than Beyoğlu for equivalent product." },
      { question: "Ferry/transport logistics", winner: "a", body: "Beyoğlu is on the European side — most sights are within 5-15 min. Kadıköy means a ferry ride for everything central — pleasant but adds time." },
    ],
    pickA: "Pick Beyoğlu for first-time visits, longer trips combining sights and evenings, anyone who wants the densest İstanbul without Sultanahmet's tourist focus.",
    pickB: "Pick Kadıköy for return visits, food-focused trips, anyone who wants real local life, longer stays where the ferry is part of the trip.",
    bottomLine: "Beyoğlu for first-timers. Kadıköy for the local Istanbul.",
  },
  // ISTANBUL: Sultanahmet vs Beşiktaş
  {
    slug: "sultanahmet-vs-besiktas",
    citySlug: "istanbul",
    countrySlug: "turkey",
    aSlug: "sultanahmet",
    bSlug: "besiktas",
    aLabel: "Sultanahmet",
    bLabel: "Beşiktaş",
    metaTitle: "Sultanahmet vs Beşiktaş: Where to Stay in Istanbul",
    metaDescription:
      "Istanbul's tourist-heavy Sultanahmet or the locals' Beşiktaş? Real take on sights, food, atmosphere and price.",
    intro:
      "Sultanahmet is the historical core — Hagia Sophia, Blue Mosque, Topkapi. Beşiktaş is north along the Bosphorus — football-stadium quarter, locals' shopping, less tourist-aware. Pick on whether sights or local life is the priority.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Sultanahmet wins by definition — every imperial sight is 5-10 min walk. Beşiktaş has Dolmabahçe Palace nearby and not much else iconic." },
      { question: "Restaurants past 10pm", winner: "b", body: "Beşiktaş wins. Iskele Caddesi has real food and bars. Sultanahmet's restaurants are tourist-priced and close by 10:30pm." },
      { question: "Atmosphere", winner: "tied", body: "Sultanahmet feels Disney-tourist by 4pm. Beşiktaş feels local-Turkish — football fans, market shopping, real evenings." },
      { question: "Bosphorus access", winner: "b", body: "Beşiktaş is on the Bosphorus — ferries up the strait leave from here. Sultanahmet is inland from the Sea of Marmara." },
      { question: "Price", winner: "b", body: "Beşiktaş 25-35% cheaper than Sultanahmet for equivalent product." },
    ],
    pickA: "Pick Sultanahmet for first-time visits, sights-focused short trips, anyone who wants every imperial cliché at the door. Pay the premium and use it.",
    pickB: "Pick Beşiktaş for return visits, food-focused trips, anyone wanting the Bosphorus-side neighborhood Istanbul. Combines well with Galata stays.",
    bottomLine: "Sultanahmet for first-timers. Beşiktaş for return visits and food.",
  },
  // BARCELONA: Eixample vs El Born
  {
    slug: "eixample-vs-el-born",
    citySlug: "barcelona",
    countrySlug: "spain",
    aSlug: "eixample",
    bSlug: "el-born",
    aLabel: "Eixample",
    bLabel: "El Born",
    metaTitle: "Eixample vs El Born: Where to Stay in Barcelona",
    metaDescription:
      "Barcelona's Modernisme grid Eixample or the medieval El Born? Real take on architecture, food, atmosphere and which fits each trip.",
    intro:
      "Eixample is the wide-grid 19th-century quarter with most of Gaudí's work — Casa Batlló, La Pedrera, Sagrada Família. El Born is the medieval lane-quarter east of the Gothic Quarter — Picasso Museum, design shops, dinner-and-cocktail dense. Both are first-timer favorites.",
    rounds: [
      { question: "Architecture/sights", winner: "a", body: "Eixample wins — Gaudí's masterpieces are on its blocks. El Born has the Picasso Museum and Santa Maria del Mar but lacks the Modernisme density." },
      { question: "Restaurants past 10pm", winner: "b", body: "El Born wins. The medieval lanes (Carrer del Rec, Carrer de l'Argenteria) have the densest restaurant strip in Barcelona. Eixample's restaurants tilt slightly more business-and-tourist." },
      { question: "Atmosphere", winner: "b", body: "El Born is medieval-cobblestone-romantic. Eixample is wide-boulevard-handsome. Pick on what kind of evening you want." },
      { question: "Quiet sleep", winner: "a", body: "Eixample is wider and quieter past 11pm. El Born's bar streets run loud Thursday-Sunday until 2am." },
      { question: "Price", winner: "tied", body: "Both €150-€280 for decent product. Equivalent." },
    ],
    pickA: "Pick Eixample for first-time visits, Gaudí-focused trips, light sleepers, families. The Modernisme architecture is the trip.",
    pickB: "Pick El Born for food-and-cocktail trips, return visitors, romantic stays, anyone who wants the medieval Barcelona evening.",
    bottomLine: "Eixample for sights and quiet. El Born for food and atmosphere.",
  },
  // BARCELONA: Barceloneta vs Barri Gòtic
  {
    slug: "barceloneta-vs-barri-gotic",
    citySlug: "barcelona",
    countrySlug: "spain",
    aSlug: "barceloneta",
    bSlug: "barri-gotic",
    aLabel: "Barceloneta",
    bLabel: "Barri Gòtic",
    metaTitle: "Barceloneta vs Barri Gòtic: Where to Stay in Barcelona",
    metaDescription:
      "Barcelona's beach-side Barceloneta or the medieval Barri Gòtic? Real take on beach access, walkability, tourist crush and which fits each.",
    intro:
      "Barceloneta is the 18th-century fisherman's quarter on the beach — narrow grid, seafood restaurants, the city's only walkable beach. Barri Gòtic is the medieval Gothic Quarter behind Las Ramblas — cathedral, narrow lanes, the ground-zero tourist core. Different trips.",
    rounds: [
      { question: "Beach access", winner: "a", body: "Barceloneta is on the beach. Barri Gòtic is 15-20 min walk." },
      { question: "Atmosphere", winner: "b", body: "Barri Gòtic is medieval-iconic. Barceloneta is grid-of-3-story-blocks and not photogenic." },
      { question: "Tourist/stag crush", winner: "tied", body: "Both heavily touristy. Barri Gòtic has Las Ramblas overflow; Barceloneta has cruise-passenger and beach-day churn. Both inappropriate Friday-Saturday nights." },
      { question: "Restaurants", winner: "a", body: "Barceloneta wins for seafood — paella spots, the beach-front restaurants. Barri Gòtic has variety but mostly tourist-priced." },
      { question: "Price", winner: "a", body: "Barceloneta 10-15% cheaper than Barri Gòtic for equivalent product." },
    ],
    pickA: "Pick Barceloneta for beach-focused trips, paella-and-seafood focus, summer trips where swimming is the point.",
    pickB: "Pick Barri Gòtic for sights-focused first-timers, anyone wanting the medieval-cathedral cliché. The 15-min walk to the beach is fine.",
    bottomLine: "Barceloneta for beach. Barri Gòtic for sights. Most travelers pick neither — Eixample or El Born are better defaults.",
  },
  // COPENHAGEN: Indre By vs Nørrebro
  {
    slug: "indre-by-vs-norrebro",
    citySlug: "copenhagen",
    countrySlug: "denmark",
    aSlug: "indre-by",
    bSlug: "norrebro",
    aLabel: "Indre By",
    bLabel: "Nørrebro",
    metaTitle: "Indre By vs Nørrebro: Where to Stay in Copenhagen",
    metaDescription:
      "Copenhagen's central Indre By or the multicultural Nørrebro? Real take on food, atmosphere, families and price.",
    intro:
      "Indre By is the central tourist-and-shopping core — Strøget, Nyhavn, Tivoli at the southern edge. Nørrebro is the multicultural quarter northwest — Jægersborggade design strip, the Assistens Cemetery, immigrant-influenced food. They answer different questions.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Indre By wins by definition — Nyhavn, Tivoli, Strøget, Round Tower all walkable. Nørrebro is 15-20 min walk to Indre By." },
      { question: "Restaurants past 10pm", winner: "b", body: "Nørrebro wins. Jægersborggade and the streets around Sankt Hans Torv have density of late kitchens. Indre By's restaurants close earlier and lean tourist-priced." },
      { question: "Atmosphere", winner: "b", body: "Nørrebro is multicultural-design-real. Indre By is generic-Scandinavian-tourist." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Nørrebro's main strips have weekend bar overflow; Indre By's tourist core has occasional noise." },
      { question: "Price", winner: "b", body: "Nørrebro 15-25% cheaper than Indre By for equivalent product." },
    ],
    pickA: "Pick Indre By for first-time visits, sights-focused trips, anyone over 50 wanting central walkability.",
    pickB: "Pick Nørrebro for food-focused trips, return visitors, longer stays, budget-conscious travelers. The 15-min walk to Strøget is part of the routine.",
    bottomLine: "Indre By for first-timers. Nørrebro for food and longer stays.",
  },
  // COPENHAGEN: Vesterbro vs Nørrebro
  {
    slug: "vesterbro-vs-norrebro",
    citySlug: "copenhagen",
    countrySlug: "denmark",
    aSlug: "vesterbro",
    bSlug: "norrebro",
    aLabel: "Vesterbro",
    bLabel: "Nørrebro",
    metaTitle: "Vesterbro vs Nørrebro: Where to Stay in Copenhagen",
    metaDescription:
      "Copenhagen's two famous post-industrial quarters compared. Real differences in food, atmosphere, walkability and price.",
    intro:
      "Both are ex-industrial converted creative quarters and travel-magazine favorites. Vesterbro is just west of the central station — Meatpacking District (Kødbyen) is here, with Noma 1.0's old neighborhood. Nørrebro is northwest — Jægersborggade, the cemetery, multicultural-and-design. They overlap in voice but serve different trips.",
    rounds: [
      { question: "Walkability to Tivoli/centre", winner: "a", body: "Vesterbro is 5-10 min walk from Tivoli and Central Station. Nørrebro is 15-20 min." },
      { question: "Restaurants", winner: "tied", body: "Vesterbro has Kødbyen's design-quarter restaurants. Nørrebro has Jægersborggade's small kitchens. Both excellent — no clear winner." },
      { question: "Atmosphere", winner: "tied", body: "Vesterbro leans converted-warehouse-design. Nørrebro leans multicultural-and-cemetery-park. Both feel real Copenhagen." },
      { question: "Quiet sleep", winner: "tied", body: "Both have weekend bar overflow. Vesterbro near Kødbyen runs loud; Nørrebro near Sankt Hans Torv runs loud. Side streets in either work." },
      { question: "Price", winner: "tied", body: "Both €150-€260 for equivalent product." },
    ],
    pickA: "Pick Vesterbro for design-focused trips, train-heavy itineraries (station at your door), Meatpacking District restaurant focus.",
    pickB: "Pick Nørrebro for food-focused trips, longer stays, anyone wanting the multicultural Copenhagen.",
    bottomLine: "Both excellent. Vesterbro for design and station logistics. Nørrebro for food and culture.",
  },
  // SEVILLE: Santa Cruz vs Alfalfa
  {
    slug: "santa-cruz-vs-alfalfa",
    citySlug: "seville",
    countrySlug: "spain",
    aSlug: "santa-cruz",
    bSlug: "alfalfa",
    aLabel: "Santa Cruz",
    bLabel: "Alfalfa",
    metaTitle: "Santa Cruz vs Alfalfa: Where to Stay in Seville",
    metaDescription:
      "Seville's Santa Cruz or the Alfalfa quarter just north? Real take on tourist crush, food, walkability and price.",
    intro:
      "Santa Cruz is the postcard Jewish quarter under the cathedral. Alfalfa sits just north — same medieval lanes, less tourist density, where Sevillanos actually drink in the evening. The 5-min walk between them changes the whole trip.",
    rounds: [
      { question: "Walkability to cathedral", winner: "a", body: "Santa Cruz is at the cathedral's wall. Alfalfa is 5-10 min north." },
      { question: "Restaurants past 10pm", winner: "b", body: "Alfalfa wins. The plaza and surrounding streets stay alive past 1am with mostly local crowds. Santa Cruz tilts tourist-priced and quiets earlier." },
      { question: "Tourist crush", winner: "b", body: "Santa Cruz becomes nearly unwalkable mid-day. Alfalfa gets none of this — the line is invisible but real, just a few blocks north." },
      { question: "Quiet sleep", winner: "b", body: "Alfalfa quieter — bar overflow stays on the plaza, side streets are residential. Santa Cruz has tour group churn from 8am." },
      { question: "Price", winner: "b", body: "Alfalfa 10-15% cheaper than Santa Cruz for equivalent product." },
    ],
    pickA: "Pick Santa Cruz only for romantic 1-2 night stays where the orange-tree-cliché-at-your-door is the trip.",
    pickB: "Pick Alfalfa for any 2+ night stay, food-focused trips, return visits, or anyone wanting Sevillano evenings without paying the tourist premium.",
    bottomLine: "Santa Cruz for the cliché single night. Alfalfa for everything else.",
  },
  // VALENCIA: Ruzafa vs El Cabanyal
  {
    slug: "ruzafa-vs-el-cabanyal",
    citySlug: "valencia",
    countrySlug: "spain",
    aSlug: "ruzafa",
    bSlug: "el-cabanyal",
    aLabel: "Ruzafa",
    bLabel: "El Cabanyal",
    metaTitle: "Ruzafa vs El Cabanyal: Where to Stay in Valencia",
    metaDescription:
      "Valencia's hipster Ruzafa or the beach-side El Cabanyal? Real take on food, beach access, walkability and price.",
    intro:
      "Ruzafa is the central converted-warehouse food-and-bar quarter south of the train station. El Cabanyal is the beach-side former fisherman's quarter east — tile facades, paella restaurants, walkable to Malvarrosa beach. They serve very different Valencias.",
    rounds: [
      { question: "Walkability to old town", winner: "a", body: "Ruzafa is 15-20 min walk from Ciutat Vella. El Cabanyal is 30+ min — needs the metro or tram." },
      { question: "Beach access", winner: "b", body: "El Cabanyal is at the beach. Ruzafa is 25-30 min by bus or metro." },
      { question: "Restaurants", winner: "tied", body: "Ruzafa has the densest cocktail-and-design restaurant cluster. El Cabanyal has the best paella restaurants in Valencia (the actual ones, on the sand)." },
      { question: "Atmosphere", winner: "tied", body: "Ruzafa is design-converted-warehouse. El Cabanyal is fisherman-village-tile-facade. Both feel real Valencia. Pick on what kind of trip." },
      { question: "Price", winner: "b", body: "El Cabanyal 15-20% cheaper than Ruzafa for equivalent product." },
    ],
    pickA: "Pick Ruzafa for food-and-cocktail focus, central walkability to the old town, anyone who wants the design Valencia.",
    pickB: "Pick El Cabanyal for beach-focused trips, paella-on-the-sand stays, summer trips where swimming is the point.",
    bottomLine: "Ruzafa for food and central. El Cabanyal for beach and paella.",
  },
  // ZAGREB nothing more, but do POLAND tier-3 more
  // KRAKOW: Stare Miasto vs Podgórze
  {
    slug: "stare-miasto-vs-podgorze",
    citySlug: "krakow",
    countrySlug: "poland",
    aSlug: "stare-miasto-krakow",
    bSlug: "podgorze",
    aLabel: "Stare Miasto",
    bLabel: "Podgórze",
    metaTitle: "Stare Miasto vs Podgórze: Where to Stay in Krakow",
    metaDescription:
      "Krakow's Old Town or post-industrial Podgórze across the river? Honest take on price, sights, food and atmosphere.",
    intro:
      "Stare Miasto is the postcard. Podgórze is across the river — Schindler's Factory museum, MOCAK, formerly working-class, now quiet-affordable. The pick is tourist-central vs local-cheap.",
    rounds: [
      { question: "Walkability to Rynek Główny", winner: "a", body: "Stare Miasto is at the square. Podgórze is 25-30 min walk via the Bernatka footbridge." },
      { question: "Tourist crush", winner: "b", body: "Stare Miasto's main square is unwalkable mid-day. Podgórze gets none of this." },
      { question: "Schindler's Factory access", winner: "b", body: "Podgórze is 5-10 min walk from Schindler's Factory and MOCAK. Stare Miasto is 25 min." },
      { question: "Price", winner: "b", body: "Podgórze 30-40% cheaper than Stare Miasto. €60-€100 vs €100-€180 for similar product." },
      { question: "Restaurants", winner: "a", body: "Stare Miasto has volume but tourist-priced. Kazimierz next door is the food quarter for both — Podgórze has 5-6 picks." },
    ],
    pickA: "Pick Stare Miasto for first-time visits, single-night trips, sights-density focus.",
    pickB: "Pick Podgórze for return visits, museum-focused stays (Schindler's Factory), longer Krakow visits, budget travelers. The walk over the bridge is a daily routine.",
    bottomLine: "Stare Miasto for tourists. Podgórze for return visits and museum focus.",
  },
  // WARSAW: Powiśle vs Praga
  {
    slug: "powisle-vs-praga",
    citySlug: "warsaw",
    countrySlug: "poland",
    aSlug: "powisle",
    bSlug: "praga-warsaw",
    aLabel: "Powiśle",
    bLabel: "Praga",
    metaTitle: "Powiśle vs Praga: Where to Stay in Warsaw",
    metaDescription:
      "Warsaw's leafy riverside Powiśle or the gritty post-industrial Praga? Real take on atmosphere, food, walkability and price.",
    intro:
      "Powiśle sits along the Vistula on the central side — design hotels, riverside walks, Centrum Nauki Kopernik. Praga is across the river — formerly working-class, now Warsaw's converted-warehouse art-and-bar quarter. Both serve travelers tired of Stare Miasto.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Powiśle is leafy-design-riverside. Praga is gritty-post-industrial-creative. Both feel real Warsaw. Pick on what you want." },
      { question: "Walkability to Old Town", winner: "a", body: "Powiśle is 10-15 min walk. Praga is 20-25 min via the bridge or 8 min by tram." },
      { question: "Restaurants", winner: "tied", body: "Powiśle has riverside design restaurants. Praga has converted-warehouse food halls (Koneser). Both excellent." },
      { question: "Price", winner: "b", body: "Praga 20-30% cheaper than Powiśle for equivalent product." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Praga's bar streets near Konesera run loud weekends; Powiśle is residential past midnight." },
    ],
    pickA: "Pick Powiśle for romantic stays, longer trips, families, slightly more polished hotel inventory, riverside-walk focus.",
    pickB: "Pick Praga for art-and-converted-warehouse trips, return visitors, budget-conscious travelers wanting the gritty Warsaw.",
    bottomLine: "Powiśle for romance and walks. Praga for art and budget.",
  },
  // GDANSK: Główne Miasto vs Wrzeszcz
  {
    slug: "glowne-miasto-vs-wrzeszcz",
    citySlug: "gdansk",
    countrySlug: "poland",
    aSlug: "glowne-miasto",
    bSlug: "wrzeszcz",
    aLabel: "Główne Miasto",
    bLabel: "Wrzeszcz",
    metaTitle: "Główne Miasto vs Wrzeszcz: Where to Stay in Gdańsk",
    metaDescription:
      "Gdańsk's reconstructed Main Town or the residential Wrzeszcz? Real take on sights, food, transport and price.",
    intro:
      "Główne Miasto is the rebuilt main town — Długi Targ, the Crane, Mariacka Street. Wrzeszcz is north along the tram line — residential, where Gdańszczanie actually live, with the railway station for trips to Gdynia and Sopot. Most travelers default to Główne Miasto. A few specifically don't.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Główne Miasto wins by definition — the reconstructed gothic core is the trip. Wrzeszcz has the museum to Lech Wałęsa nearby and not much else iconic." },
      { question: "Tri-City logistics", winner: "b", body: "Wrzeszcz wins for tram/train access — Sopot is 8 min by SKM train, Gdynia is 20 min. Główne Miasto needs a tram or 25 min walk to the station." },
      { question: "Price", winner: "b", body: "Wrzeszcz 25-35% cheaper than Główne Miasto for equivalent product." },
      { question: "Restaurants", winner: "a", body: "Główne Miasto has the dense central cluster. Wrzeszcz has 5-6 strong picks but spread out." },
      { question: "Quiet sleep", winner: "b", body: "Wrzeszcz residential past 11pm. Główne Miasto has tour-group and bar noise on Długi Targ until midnight." },
    ],
    pickA: "Pick Główne Miasto for first-time visits, sights-focused short trips, anyone who wants the rebuilt-gothic atmosphere at the door.",
    pickB: "Pick Wrzeszcz for Tri-City focused trips (Sopot/Gdynia day trips), longer stays, budget-conscious travelers, anyone with a flight from Gdańsk airport.",
    bottomLine: "Główne Miasto for first-timers. Wrzeszcz for Tri-City focus and budget.",
  },
  // SARAJEVO: Baščaršija vs Centar
  {
    slug: "bascarsija-vs-centar",
    citySlug: "sarajevo",
    countrySlug: "bosnia-and-herzegovina",
    aSlug: "bascarsija",
    bSlug: "centar-sarajevo",
    aLabel: "Baščaršija",
    bLabel: "Centar",
    metaTitle: "Baščaršija vs Centar: Where to Stay in Sarajevo",
    metaDescription:
      "Sarajevo's Ottoman bazaar or the central Centar quarter? Real take on atmosphere, sleep, walkability and price.",
    intro:
      "Baščaršija is the Ottoman bazaar — Sebilj, copper-smiths, ćevapi houses. Centar sits just west along Ferhadija, the main pedestrian street, where Austro-Hungarian buildings start replacing Ottoman ones. The pick is bazaar-immersion vs main-street-walkable.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Baščaršija wins for the Ottoman cliché — bazaar, mosques, the call to prayer. Centar is handsome Austro-Hungarian but lacks the iconic density." },
      { question: "Walkability", winner: "b", body: "Centar is at the middle of Ferhadija — 5 min east to Baščaršija, 10 min west to Marijin Dvor. The most central position." },
      { question: "Quiet sleep", winner: "b", body: "Centar quieter — Baščaršija has 6am call to prayer and bazaar churn from 8am. Centar is residential calm past midnight." },
      { question: "Restaurants", winner: "a", body: "Baščaršija has the densest ćevapi-and-traditional cluster. Centar has 5-6 picks but spread across Ferhadija." },
      { question: "Price", winner: "tied", body: "Both €40-€80 for decent product. Sarajevo cheap across the board." },
    ],
    pickA: "Pick Baščaršija for first-time visits, atmosphere-focused short trips, anyone who wants the Ottoman quarter at your door.",
    pickB: "Pick Centar for stays of 3+ nights, light sleepers, anyone who wants central walkability between Baščaršija and Marijin Dvor.",
    bottomLine: "Baščaršija for the photo. Centar for walkability and sleep.",
  },
  // SPLIT: Diocletian's Palace vs Manuš
  {
    slug: "diocletians-palace-vs-manus",
    citySlug: "split",
    countrySlug: "croatia",
    aSlug: "diocletians-palace",
    bSlug: "manus",
    aLabel: "Diocletian's Palace",
    bLabel: "Manuš",
    metaTitle: "Diocletian's Palace vs Manuš: Where to Stay in Split",
    metaDescription:
      "Sleeping inside the Roman palace or the residential Manuš quarter? Real take on tourist crush, food, walkability and price.",
    intro:
      "Diocletian's Palace is the photographed core — sleeping inside Roman walls. Manuš is the residential quarter east of the Palace — narrow stone lanes, none of the cruise-ship crush, slightly cheaper. Both are old Split.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Diocletian's Palace wins — the Roman walls, the Peristyle, the 1700-year-old setting. Manuš is pretty stone but lacks the historic density." },
      { question: "Cruise-ship crush", winner: "b", body: "The Palace becomes nearly unwalkable 10am-4pm. Manuš gets none of this." },
      { question: "Walkability", winner: "a", body: "Palace is at the Riva. Manuš is 5-10 min east. Both walkable to ferries." },
      { question: "Restaurants", winner: "tied", body: "Palace has volume but tourist-priced; Manuš has 4-5 strong picks (Konoba Korta) at better prices." },
      { question: "Price", winner: "b", body: "Manuš 15-25% cheaper than Palace for equivalent apartments." },
    ],
    pickA: "Pick Diocletian's Palace for the sleep-inside-Roman-walls experience, single-night stays, sights-density focus. Pay the premium and use it.",
    pickB: "Pick Manuš for any 2+ night stay, families, light sleepers, budget-conscious travelers. The 5-min walk to the Riva is part of the daily routine.",
    bottomLine: "Palace for the experience. Manuš for everything else.",
  },
  // DUBROVNIK: Old Town vs Ploče
  {
    slug: "old-town-vs-ploce",
    citySlug: "dubrovnik",
    countrySlug: "croatia",
    aSlug: "old-town-dubrovnik",
    bSlug: "ploce",
    aLabel: "Old Town",
    bLabel: "Ploče",
    metaTitle: "Old Town vs Ploče: Where to Stay in Dubrovnik",
    metaDescription:
      "Dubrovnik's walled city or the elegant Ploče just east? Real take on cruise crush, swimming, walkability and price.",
    intro:
      "Old Town is the walled city. Ploče is the elegant peninsula just east of the Pile Gate — boutique hotels with Old Town walls views, Banje Beach, calmer evenings. The pick is sleep-inside-the-walls vs view-the-walls-from-outside.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Old Town wins — the walled-city sunrise, the Stradun, the cathedral bells. Ploče has the views but lacks the in-the-walls experience." },
      { question: "Cruise crush", winner: "b", body: "Old Town becomes unwalkable 10am-4pm in season. Ploče gets none of this." },
      { question: "Beach access", winner: "b", body: "Ploče has Banje Beach 5 min walk — small but the closest swim to Old Town." },
      { question: "Walkability to Old Town", winner: "a", body: "Old Town is at the door. Ploče is 5-10 min walk via the Pile Gate." },
      { question: "Price", winner: "b", body: "Ploče 15-25% cheaper than Old Town for equivalent product. Old Town's tiny stone-vaulted rooms run €250-€500 in season." },
      { question: "Walls view", winner: "b", body: "Ploče's hillside hotels have the famous Old Town walls view from the room. Old Town hotels look at stone alleys." },
    ],
    pickA: "Pick Old Town for single-night stays, anyone who wants the walled-city sunrise, sights-focused short trips. Bring earplugs for the cathedral bells.",
    pickB: "Pick Ploče for stays of 3+ nights, honeymoons, families, anyone who wants the iconic walls-view-from-the-room. The 5-min walk to the gate is the daily ritual.",
    bottomLine: "Old Town for the sunrise. Ploče for the view and longer stays.",
  },
  // CAPPADOCIA: Göreme vs Ürgüp
  {
    slug: "goreme-vs-urgup",
    citySlug: "cappadocia",
    countrySlug: "turkey",
    aSlug: "goreme",
    bSlug: "urgup",
    aLabel: "Göreme",
    bLabel: "Ürgüp",
    metaTitle: "Göreme vs Ürgüp: Where to Stay in Cappadocia",
    metaDescription:
      "Cappadocia's busy Göreme or the elegant Ürgüp? Real take on balloon viewing, restaurants, transport and price.",
    intro:
      "Göreme is the central balloon-launch town. Ürgüp is 8 km east — older, more elegant, with cluster of high-end cave hotels and a real main street. Pick on whether you want the balloon launch zone or a quieter base.",
    rounds: [
      { question: "Balloon launch zone", winner: "a", body: "Göreme is the launch town. Ürgüp watches balloons from a distance — beautiful but not inside the launch zone." },
      { question: "Cave hotel quality at top end", winner: "b", body: "Ürgüp has the highest-end cave hotels — Yunak Evleri, Sacred House, Kayakapi. Göreme's top hotels are excellent but smaller." },
      { question: "Restaurants and town life", winner: "tied", body: "Göreme has more variety. Ürgüp has fewer picks but better quality (Ziggy Cafe, Han Çırağan)." },
      { question: "Walkability to museums", winner: "a", body: "Göreme is 1.5 km from the open-air museum. Ürgüp is 8 km — needs a transfer or rental car." },
      { question: "Quiet sleep", winner: "b", body: "Ürgüp quieter — older town, less tour churn. Göreme has 5am balloon-pickup and tour-group noise from 8am." },
      { question: "Price at mid range", winner: "a", body: "Göreme is cheaper for mid-range cave hotels — €100-€180 vs Ürgüp's €130-€250." },
    ],
    pickA: "Pick Göreme for balloon-focused first trips, sights-walking-distance focus, mid-range budgets. The 5am noise is the price.",
    pickB: "Pick Ürgüp for honeymoons, high-end cave hotel focus, return visits, anyone with a rental car. The town feels real Turkey rather than tourist-Cappadocia.",
    bottomLine: "Göreme for first-timers and balloons. Ürgüp for honeymoons and quieter elegance.",
  },
  // CAPPADOCIA: Uçhisar vs Ürgüp
  {
    slug: "uchisar-vs-urgup",
    citySlug: "cappadocia",
    countrySlug: "turkey",
    aSlug: "uchisar",
    bSlug: "urgup",
    aLabel: "Uçhisar",
    bLabel: "Ürgüp",
    metaTitle: "Uçhisar vs Ürgüp: Quietest Cappadocia Stays",
    metaDescription:
      "Uçhisar's castle ridge or Ürgüp's old town? Real take on views, balloon viewing, hotels and which fits each trip.",
    intro:
      "Uçhisar is on the dramatic castle ridge — best balloon-rising views, dramatic exterior settings. Ürgüp is the old town 5 km east — elegant cave hotels, real main street, less drama but more village life. Both are quieter than Göreme.",
    rounds: [
      { question: "View dramatic", winner: "a", body: "Uçhisar wins by definition — castle ridge with the highest point in the region. Ürgüp has views but no castle silhouette." },
      { question: "Balloon photo", winner: "tied", body: "Both excellent — Uçhisar has the castle in foreground; Ürgüp has the town with balloons rising over Üzengi valley." },
      { question: "Town life", winner: "b", body: "Ürgüp has a real main street with restaurants, shops, daily life. Uçhisar is quieter — mostly hotels and 4-5 restaurants." },
      { question: "High-end hotels", winner: "tied", body: "Both have outstanding picks. Uçhisar has Argos in Cappadocia, Museum Hotel. Ürgüp has Yunak Evleri, Sacred House. Pick on style." },
      { question: "Walkability to balloons launch", winner: "tied", body: "Both 5-10 min by transfer to Göreme launch zones. Equivalent." },
      { question: "Price", winner: "b", body: "Ürgüp slightly cheaper at mid-range — €130-€250 vs Uçhisar's €180-€350. High-end is equivalent." },
    ],
    pickA: "Pick Uçhisar for honeymoons, view-focused stays, anyone who wants the most dramatic exterior setting. The view from your terrace is the trip.",
    pickB: "Pick Ürgüp for repeat visits, anyone who wants real town life with hotel options, slightly cheaper mid-range stays.",
    bottomLine: "Uçhisar for the dramatic castle setting. Ürgüp for town life and real Turkey.",
  },
  // ATHENS: Koukaki vs Psyrri
  {
    slug: "koukaki-vs-psyrri",
    citySlug: "athens",
    countrySlug: "greece",
    aSlug: "koukaki",
    bSlug: "psyrri",
    aLabel: "Koukaki",
    bLabel: "Psyrri",
    metaTitle: "Koukaki vs Psyrri: Where to Stay in Athens",
    metaDescription:
      "Athens' quiet Koukaki south of the Acropolis or the lively Psyrri? Real take on atmosphere, sleep, food and walkability.",
    intro:
      "These are Athens' two most-recommended bases for repeat visitors. Koukaki sits south of the Acropolis — residential, leafy, locals-and-Airbnb. Psyrri is just north of Monastiraki — converted-warehouse bar quarter with the late kitchens. Different trips.",
    rounds: [
      { question: "Walkability to Acropolis", winner: "a", body: "Koukaki is 10 min south. Psyrri is 10 min north. Both equivalent." },
      { question: "Quiet sleep", winner: "a", body: "Koukaki residential past 10pm. Psyrri has bar overflow weekends until 3am." },
      { question: "Restaurants past 10pm", winner: "b", body: "Psyrri wins — converted-warehouse mezedopoleia run to 2am. Koukaki has 5-6 strong picks (Sushimou nearby) but quiet." },
      { question: "Atmosphere", winner: "tied", body: "Koukaki is leafy-residential-quiet. Psyrri is converted-warehouse-bar-loud. Pick on what you want from a night out." },
      { question: "Price", winner: "tied", body: "Both €70-€140 for decent product." },
    ],
    pickA: "Pick Koukaki for couples, families, light sleepers, return visitors. The leafy quiet is the trip.",
    pickB: "Pick Psyrri for under-35 trips, food-focused stays, anyone who wants the lively converted-warehouse Athens evening.",
    bottomLine: "Koukaki for couples and quiet. Psyrri for food and bars.",
  },
);

// =============================================================================
// EXPANSION BATCH 4 — pairs leveraging new tier-1 neighborhoods (Paris,
// Rome, London, Berlin, Madrid, Barcelona, Amsterdam, Lisbon, Prague, Naples).
// =============================================================================
COMPARISONS.push(
  // PARIS
  {
    slug: "le-marais-vs-canal-saint-martin",
    citySlug: "paris", countrySlug: "france",
    aSlug: "le-marais", bSlug: "canal-saint-martin",
    aLabel: "Le Marais", bLabel: "Canal Saint-Martin",
    metaTitle: "Le Marais vs Canal Saint-Martin: Where to Stay in Paris",
    metaDescription: "Paris's design-and-dinner Marais or the canal-side 10th? Real take on price, walkability, food and which trip each fits.",
    intro: "Marais is the central design-and-dinner Right Bank. Canal Saint-Martin is the lived-in 10th north of Bastille — picnic-on-the-locks, design-shop-and-bar dense, where Parisian under-35s actually go. The pick is central-cliché vs local-favorite.",
    rounds: [
      { question: "Walkability to central sights", winner: "a", body: "Marais is 12-15 min walk to Notre-Dame, Louvre, Pompidou. Canal Saint-Martin is 25-30 min from any of these." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Marais runs late on Vieille du Temple. Canal has Bichat-and-Quai-de-Valmy density. Different price points — Canal cheaper." },
      { question: "Atmosphere", winner: "b", body: "Canal feels alive in a non-tourist way — actual locals on the locks, design shops, real evenings. Marais is denser but more visitor-aware." },
      { question: "Quiet sleep", winner: "a", body: "Marais bar streets run loud weekends; the Canal banks are loud Friday-Saturday too. Side streets in either are fine." },
      { question: "Price", winner: "b", body: "Canal Saint-Martin 20-30% cheaper than Marais for equivalent product." },
    ],
    pickA: "Pick Le Marais for first-time visits, sights-density focus, anyone willing to pay premium for central walkability.",
    pickB: "Pick Canal Saint-Martin for return visits, food-and-design-focused trips, longer stays, anyone wanting Parisian under-35 evenings.",
    bottomLine: "Marais for first-timers and central. Canal Saint-Martin for repeat visits and design.",
  },
  {
    slug: "montmartre-vs-pigalle",
    citySlug: "paris", countrySlug: "france",
    aSlug: "montmartre", bSlug: "pigalle",
    aLabel: "Montmartre", bLabel: "Pigalle / SoPi",
    metaTitle: "Montmartre vs Pigalle (SoPi): Where to Stay in Paris",
    metaDescription: "Paris's hilltop Montmartre or the converted Pigalle? Real take on noise, food, romance and which area fits each trip.",
    intro: "Montmartre is the hilltop village with Sacré-Cœur. Pigalle (SoPi) sits at its foot — converted from red-light to cocktail-and-dinner quarter. The pick is romantic-photo vs central-cocktail.",
    rounds: [
      { question: "Walkability to Sacré-Cœur", winner: "a", body: "Montmartre is at the hilltop. Pigalle is 10-15 min uphill walk." },
      { question: "Walkability to central", winner: "b", body: "Pigalle is closer — 20-25 min walk or 10 min metro to most central sights. Montmartre is 30-40 min metro to anywhere central." },
      { question: "Cocktail and dinner density", winner: "b", body: "Pigalle is the cocktail strip — Lulu White, Dirty Dick, dozens more. Montmartre's restaurants close earlier and lean tourist-priced near Place du Tertre." },
      { question: "Quiet sleep", winner: "a", body: "Montmartre quieter — most tourists leave the hill by 9pm. Pigalle has bar overflow weekends until 2am." },
      { question: "Romance", winner: "a", body: "Montmartre wins — the iconic-Paris-on-a-hill photo, the steep cobbled lanes." },
    ],
    pickA: "Pick Montmartre for romantic stays, photo-focused trips, light sleepers willing to climb the hill twice a day.",
    pickB: "Pick Pigalle for cocktail-and-dinner focus, central-ish access, return Paris visitors.",
    bottomLine: "Montmartre for the photo. Pigalle for the cocktails.",
  },
  // ROME
  {
    slug: "trastevere-vs-testaccio",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "trastevere", bSlug: "testaccio",
    aLabel: "Trastevere", bLabel: "Testaccio",
    metaTitle: "Trastevere vs Testaccio: Where to Stay in Rome",
    metaDescription: "Rome's tourist-favorite Trastevere or the locals' Testaccio? Real take on food, atmosphere, walkability and price.",
    intro: "Trastevere is the famous evening quarter across the river. Testaccio sits south — former-slaughterhouse working-class quarter, the food market most Romans actually shop, the trattorias least touristed. They're 15 min walk apart but answer different questions.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Trastevere is the pretty cliché — narrow lanes, ivy, evening crowds. Testaccio is plainer — grid streets, market, real Roman life." },
      { question: "Food authenticity", winner: "b", body: "Testaccio, decisively. The market and trattorias (Flavio al Velavevodetto, Da Felice) serve real Roman cucina. Trastevere has volume, mostly tourist-priced." },
      { question: "Tourist crush", winner: "b", body: "Trastevere fills with tour groups by 7pm. Testaccio sees almost no tourists." },
      { question: "Walkability to Forum/Colosseum", winner: "tied", body: "Both 25-30 min walk. Equivalent." },
      { question: "Price", winner: "b", body: "Testaccio 20-30% cheaper than Trastevere for equivalent product." },
    ],
    pickA: "Pick Trastevere for first-time visits, evening-atmosphere focus, anyone wanting the Roman cliché.",
    pickB: "Pick Testaccio for food-focused trips, return visits, anyone who wants real Roman dinners without the tourist premium.",
    bottomLine: "Trastevere for the photo. Testaccio for the food.",
  },
  {
    slug: "centro-storico-vs-aventino",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "centro-storico", bSlug: "aventino",
    aLabel: "Centro Storico", bLabel: "Aventino",
    metaTitle: "Centro Storico vs Aventino: Where to Stay in Rome",
    metaDescription: "Rome's tourist heart or the leafy Aventine hill? Real take on noise, walkability, romance and price.",
    intro: "Centro Storico is the maximum-tourist core. Aventino is the leafy residential hill south of the Forum — Orange Garden, the Knights of Malta keyhole, where wealthy Romans actually live. The pick is sights-density vs calm-and-leafy.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Centro Storico has Pantheon, Trevi, Piazza Navona, Spanish Steps within 10 min walk. Aventino is 15-20 min from any." },
      { question: "Quiet sleep", winner: "b", body: "Aventino is residential-silent past 10pm. Centro Storico has restaurant noise until 11pm and bar overflow weekends." },
      { question: "Romance", winner: "b", body: "Aventino wins — the Orange Garden at sunset, the Knights of Malta keyhole at dusk, leafy quiet. Centro Storico is too busy for romance." },
      { question: "Restaurants", winner: "a", body: "Centro Storico has volume; Aventino has 5-6 strong picks. Testaccio (15 min) is the Aventino food complement." },
      { question: "Price", winner: "tied", body: "Both €200-€400 for decent product. Equivalent at top end." },
    ],
    pickA: "Pick Centro Storico for first-time visits, sights-density short trips, anyone willing to pay premium for central walkability.",
    pickB: "Pick Aventino for honeymoons, romantic stays, anyone over 50 wanting calmer Rome with central proximity.",
    bottomLine: "Centro Storico for sights. Aventino for romance and quiet.",
  },
  // LONDON
  {
    slug: "soho-vs-covent-garden",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "soho", bSlug: "covent-garden",
    aLabel: "Soho", bLabel: "Covent Garden",
    metaTitle: "Soho vs Covent Garden: Where to Stay in London",
    metaDescription: "London's Soho or Covent Garden? Real take on theatre, food, noise and which suits each trip.",
    intro: "These are London's two most-central West End neighborhoods. Soho is the dinner-and-bar core. Covent Garden is the theatre-and-piazza core. They blur at the edges but feel different at night.",
    rounds: [
      { question: "Theatre access", winner: "b", body: "Covent Garden is at the centre of the West End theatres. Soho is 5-10 min walk." },
      { question: "Restaurants past 10pm", winner: "a", body: "Soho wins — late kitchens, Chinatown adjacent, dense bar strip. Covent Garden's restaurants tilt pre-theatre and close earlier." },
      { question: "Quiet sleep", winner: "tied", body: "Both noisy weekends until 2-3am. Soho louder on bar streets; Covent Garden busier with tourists. Side streets in either work." },
      { question: "Price", winner: "tied", body: "Both £250-£500 for decent product. Equivalent." },
      { question: "Family-friendly", winner: "b", body: "Covent Garden — buskers, the piazza, Theatre Royal. Soho is inappropriate for kids on weekends." },
    ],
    pickA: "Pick Soho for food-and-cocktail focus, anyone over 25, dinner-density priority.",
    pickB: "Pick Covent Garden for theatre-focused trips, families with kids, first-timers wanting central tourist atmosphere.",
    bottomLine: "Soho for dinner and bars. Covent Garden for theatre and family.",
  },
  {
    slug: "mayfair-vs-marylebone",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "mayfair", bSlug: "marylebone",
    aLabel: "Mayfair", bLabel: "Marylebone",
    metaTitle: "Mayfair vs Marylebone: Where to Stay in London",
    metaDescription: "London's luxury Mayfair or village-feeling Marylebone? Real take on price, atmosphere and which suits each trip.",
    intro: "Mayfair is London's luxury core — Bond Street, the grand hotels. Marylebone is just north — village-feeling, Regent's Park-adjacent, real residential life. Both walkable to Hyde Park and Oxford Street.",
    rounds: [
      { question: "Luxury at top end", winner: "a", body: "Mayfair has the Connaught, Claridge's, the Ritz nearby. Marylebone has good boutique hotels but no top-tier flagships." },
      { question: "Village feeling", winner: "b", body: "Marylebone wins — independent shops, Marylebone High Street's Sunday food market, real residential calm. Mayfair feels institutional." },
      { question: "Restaurants", winner: "tied", body: "Both excellent at high end. Marylebone has more casual variety. Mayfair has more starred kitchens." },
      { question: "Walkability to West End", winner: "tied", body: "Both 10-15 min walk to Soho/Covent Garden. Equivalent." },
      { question: "Price", winner: "b", body: "Marylebone 30-40% cheaper than Mayfair at equivalent quality." },
    ],
    pickA: "Pick Mayfair for luxury-focused trips, anniversary stays, business expense accounts.",
    pickB: "Pick Marylebone for couples wanting central calm with food access, families, anyone wanting village-London at half the Mayfair price.",
    bottomLine: "Mayfair for luxury and prestige. Marylebone for village-feeling and value.",
  },
  {
    slug: "shoreditch-vs-camden",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "shoreditch", bSlug: "camden",
    aLabel: "Shoreditch", bLabel: "Camden",
    metaTitle: "Shoreditch vs Camden: Where to Stay in London",
    metaDescription: "London's east-end Shoreditch or north-London Camden? Real take on food, atmosphere, music and price.",
    intro: "Both are alternative-London bases. Shoreditch is the east-end creative quarter — design hotels, late kitchens, street art. Camden is north — the famous market, music venues, the canal. They overlap in voice but feel different.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Shoreditch is converted-warehouse-design. Camden is market-and-music-venue. Both real London. Pick on what kind of evening you want." },
      { question: "Restaurants past 10pm", winner: "a", body: "Shoreditch wins. Camden's restaurants are mostly bar food and tourist-priced market stalls. Shoreditch has Pizza East, Lyle's, dense bistros." },
      { question: "Music venues", winner: "b", body: "Camden has the Roundhouse, Jazz Cafe, Electric Ballroom. Shoreditch has fewer dedicated music venues." },
      { question: "Price", winner: "b", body: "Camden 15-25% cheaper than Shoreditch for equivalent product." },
      { question: "Walkability to West End", winner: "tied", body: "Both 25 min by tube. Camden's Northern Line connection is direct; Shoreditch needs Liverpool Street or Old Street." },
    ],
    pickA: "Pick Shoreditch for food-and-design focus, design hotels, anyone over 25 wanting creative London with late kitchens.",
    pickB: "Pick Camden for music-focused trips, market visitors, budget-conscious under-30s, weekend trips.",
    bottomLine: "Shoreditch for design and food. Camden for music and budget.",
  },
  // BERLIN
  {
    slug: "kreuzberg-vs-neukolln",
    citySlug: "berlin", countrySlug: "germany",
    aSlug: "kreuzberg", bSlug: "neukolln",
    aLabel: "Kreuzberg", bLabel: "Neukölln",
    metaTitle: "Kreuzberg vs Neukölln: Where to Stay in Berlin",
    metaDescription: "Berlin's famous Kreuzberg or the cheaper Neukölln? Real take on food, atmosphere, transport and which suits each trip.",
    intro: "These are next-door neighborhoods that share the same trip type. Kreuzberg is the famous Turkish-and-creative quarter. Neukölln sits south — the Kreuzberg-spillover, Tempelhofer Feld at the western edge, dramatically cheaper for equivalent product.",
    rounds: [
      { question: "Restaurants and food density", winner: "a", body: "Kreuzberg wins for variety — Markthalle Neun, Maybachufer markt. Neukölln has dense Sonnenallee Turkish/Lebanese strip but less variety overall." },
      { question: "Walkability to central", winner: "a", body: "Kreuzberg is 25-30 min walk or 15 min U-Bahn to Mitte. Neukölln is 35-40 min — further south." },
      { question: "Atmosphere", winner: "tied", body: "Kreuzberg leans Turkish-creative. Neukölln is multicultural-and-creative-spillover. Both feel alive. Pick on price." },
      { question: "Price", winner: "b", body: "Neukölln 25-35% cheaper than Kreuzberg for equivalent product. The cheapest creative-Berlin option." },
      { question: "Tempelhofer Feld access", winner: "b", body: "Neukölln is at the field's eastern edge — best urban park access in central Berlin." },
    ],
    pickA: "Pick Kreuzberg for first-time creative-Berlin trips, food-density priority, anyone willing to pay 30% premium.",
    pickB: "Pick Neukölln for budget-conscious creative-Berlin trips, long stays, digital nomads. Same trip 30% cheaper.",
    bottomLine: "Kreuzberg for first-time variety. Neukölln for budget and longer stays.",
  },
  {
    slug: "mitte-vs-charlottenburg",
    citySlug: "berlin", countrySlug: "germany",
    aSlug: "mitte", bSlug: "charlottenburg",
    aLabel: "Mitte", bLabel: "Charlottenburg",
    metaTitle: "Mitte vs Charlottenburg: Where to Stay in Berlin",
    metaDescription: "Berlin's central Mitte or the wealthy West Berlin Charlottenburg? Real take on sights, atmosphere and which suits each trip.",
    intro: "Mitte is the central tourist-and-business core. Charlottenburg is West Berlin's wealthy quarter — Kurfürstendamm shopping, the palace, calm tree-lined streets. Different cities in the same metro area.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Mitte wins. Brandenburg Gate, Museum Island, Reichstag — 5-15 min walk. Charlottenburg's main sight is the palace, 20 min from anywhere central." },
      { question: "Atmosphere", winner: "tied", body: "Mitte is touristy-polished. Charlottenburg is wealthy-residential-quiet. Pick on whether you want the cliché Berlin or the un-Berlin." },
      { question: "Quiet sleep", winner: "b", body: "Charlottenburg is residential-silent past 10pm. Mitte has hotel-tour churn from 7am." },
      { question: "Shopping", winner: "b", body: "Charlottenburg's Kurfürstendamm is Berlin's flagship shopping strip — KaDeWe nearby." },
      { question: "Price", winner: "tied", body: "Both €130-€250 for decent product. Equivalent." },
    ],
    pickA: "Pick Mitte for first-time visits, sights-focused trips, anyone wanting cliché central Berlin.",
    pickB: "Pick Charlottenburg for shopping-focused trips, anyone over 50, light sleepers, anyone specifically wanting the un-cliché West-Berlin trip.",
    bottomLine: "Mitte for first-timers. Charlottenburg for shopping and quiet.",
  },
  // MADRID
  {
    slug: "malasana-vs-lavapies",
    citySlug: "madrid", countrySlug: "spain",
    aSlug: "malasana", bSlug: "lavapies",
    aLabel: "Malasaña", bLabel: "Lavapiés",
    metaTitle: "Malasaña vs Lavapiés: Where to Stay in Madrid",
    metaDescription: "Madrid's hipster Malasaña or the multicultural Lavapiés? Real take on food, atmosphere, walkability and price.",
    intro: "Both are central-but-not-tourist Madrid. Malasaña is the indie-rock-and-vintage quarter north of Gran Vía. Lavapiés is the multicultural quarter south of La Latina — Indian/Senegalese/Moroccan food density, working-class real. They overlap in voice but feel different.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Malasaña is indie-rock-vintage. Lavapiés is multicultural-working-class. Both feel central Madrid. Pick on what kind of Madrid you want." },
      { question: "Restaurants", winner: "tied", body: "Both dense, different cuisines. Malasaña has casual Spanish/tapas. Lavapiés has Indian/Senegalese/Moroccan most diverse in Madrid." },
      { question: "Quiet sleep", winner: "tied", body: "Both have weekend bar overflow. Side streets in either are fine." },
      { question: "Walkability to Sol/Plaza Mayor", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "b", body: "Lavapiés 15-25% cheaper than Malasaña for equivalent product." },
    ],
    pickA: "Pick Malasaña for indie-rock focus, vintage shopping, anyone under 40 wanting the cliché hipster Madrid.",
    pickB: "Pick Lavapiés for food-diversity focus, longer stays, budget-conscious travelers, anyone wanting the multicultural Madrid.",
    bottomLine: "Malasaña for indie-rock-vintage. Lavapiés for multicultural food.",
  },
  // BARCELONA
  {
    slug: "eixample-vs-poble-sec",
    citySlug: "barcelona", countrySlug: "spain",
    aSlug: "eixample", bSlug: "poble-sec",
    aLabel: "Eixample", bLabel: "Poble Sec",
    metaTitle: "Eixample vs Poble Sec: Where to Stay in Barcelona",
    metaDescription: "Barcelona's Modernisme grid or the cheap Poble Sec? Real take on architecture, food, walkability and price.",
    intro: "Eixample is the wide-grid Modernisme quarter with most of Gaudí's work. Poble Sec is south — Carrer de Blai's pintxos strip, students-and-locals, dramatically cheaper. The pick is sights-density vs budget-and-food.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Eixample has Casa Batlló, La Pedrera, Sagrada Família walkable. Poble Sec has Montjuïc and the Magic Fountain but less sights density." },
      { question: "Restaurants past 10pm", winner: "b", body: "Poble Sec wins. Carrer de Blai is the densest pintxos strip in Barcelona. Eixample's restaurants tilt business-and-tourist." },
      { question: "Atmosphere", winner: "tied", body: "Eixample is wide-boulevard-handsome. Poble Sec is foot-of-Montjuïc local. Pick on what you want." },
      { question: "Price", winner: "b", body: "Poble Sec 30-40% cheaper than Eixample for equivalent product." },
      { question: "Walkability to Las Ramblas", winner: "tied", body: "Both 15-20 min walk. Equivalent." },
    ],
    pickA: "Pick Eixample for first-time visits, Gaudí-focused trips, anyone willing to pay premium for Modernisme architecture at the door.",
    pickB: "Pick Poble Sec for food-focused trips, budget-conscious travelers, students, longer stays.",
    bottomLine: "Eixample for sights. Poble Sec for food and budget.",
  },
  {
    slug: "el-born-vs-sant-antoni",
    citySlug: "barcelona", countrySlug: "spain",
    aSlug: "el-born", bSlug: "sant-antoni",
    aLabel: "El Born", bLabel: "Sant Antoni",
    metaTitle: "El Born vs Sant Antoni: Where to Stay in Barcelona",
    metaDescription: "Barcelona's medieval Born or the Sant Antoni market quarter? Real take on food, atmosphere and which suits each trip.",
    intro: "El Born is the medieval lane-quarter east of the Gothic. Sant Antoni is just west of the Raval — recently-gentrified market quarter, dense food and design shops, less tourist-clogged. Both excellent for food.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Born wins on charm — medieval cobblestone, Santa Maria del Mar, the design-shop lanes. Sant Antoni is grid-pattern with the market as the focal point." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Born has cluster around Carrer del Rec/Argenteria. Sant Antoni has Tomaquera market-area density." },
      { question: "Tourist crush", winner: "b", body: "Sant Antoni gets less tourist density than Born. Born's main lanes are unwalkable mid-day in season." },
      { question: "Price", winner: "b", body: "Sant Antoni 15-20% cheaper than Born for equivalent product." },
      { question: "Quiet sleep", winner: "tied", body: "Both have weekend bar overflow. Side streets work in either." },
    ],
    pickA: "Pick Born for first-time visits, medieval-atmosphere focus, romantic stays.",
    pickB: "Pick Sant Antoni for repeat visits, food-focused trips, longer stays, anyone wanting Born-quality food without the tourist crush.",
    bottomLine: "Born for medieval atmosphere. Sant Antoni for food and value.",
  },
  // AMSTERDAM
  {
    slug: "de-pijp-vs-oost",
    citySlug: "amsterdam", countrySlug: "netherlands",
    aSlug: "de-pijp", bSlug: "oost",
    aLabel: "De Pijp", bLabel: "Oost",
    metaTitle: "De Pijp vs Oost: Where to Stay in Amsterdam",
    metaDescription: "Amsterdam's market-quarter De Pijp or multicultural Oost? Real take on food, walkability, families and price.",
    intro: "De Pijp is the food-and-bar quarter south of Singelgracht. Oost is east of Centrum — Oosterpark, Tropenmuseum, dense Javastraat food strip, dramatically cheaper. Both serve travelers tired of Centrum.",
    rounds: [
      { question: "Walkability to central", winner: "a", body: "De Pijp is 20-25 min walk to Centrum. Oost is 25-30 min — slightly further east." },
      { question: "Restaurants and markets", winner: "tied", body: "De Pijp has Albert Cuyp market and dense Spanish/tapas/restaurants. Oost has Javastraat (Surinamese, Turkish, Moroccan) and Dappermarkt. Different cuisines, equivalent depth." },
      { question: "Atmosphere", winner: "tied", body: "De Pijp is market-and-bar dense. Oost is leafy-multicultural. Pick on what you want." },
      { question: "Family-friendly", winner: "b", body: "Oost wins — Oosterpark playgrounds, Artis zoo nearby, calmer streets, family-aware cafes." },
      { question: "Price", winner: "b", body: "Oost 20-30% cheaper than De Pijp for equivalent product." },
    ],
    pickA: "Pick De Pijp for food-and-bar focus, market shopping, anyone who wants the densest Amsterdam evening south of the canals.",
    pickB: "Pick Oost for families, longer stays, budget-conscious travelers, anyone wanting multicultural Amsterdam at lower prices.",
    bottomLine: "De Pijp for market-and-bar density. Oost for families and value.",
  },
  // LISBON
  {
    slug: "alfama-vs-mouraria",
    citySlug: "lisbon", countrySlug: "portugal",
    aSlug: "alfama", bSlug: "mouraria",
    aLabel: "Alfama", bLabel: "Mouraria",
    metaTitle: "Alfama vs Mouraria: Where to Stay in Lisbon",
    metaDescription: "Lisbon's famous Alfama or the un-touristed Mouraria? Real take on tourist crush, food, atmosphere and price.",
    intro: "Alfama is the famous Moorish quarter east of the castle. Mouraria is the original Moorish quarter just north — narrow stair-streets, multicultural-and-fado, the Alfama atmosphere without the tour groups. Same hill, different reputation.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Both have the cliché — narrow lanes, hanging laundry, fado at night. Mouraria feels rougher and more real; Alfama is more polished." },
      { question: "Tourist crush", winner: "b", body: "Mouraria gets dramatically fewer tourists than Alfama. The line on the map is invisible but real." },
      { question: "Restaurants", winner: "b", body: "Mouraria has multicultural food density (Indian, Chinese, North African) plus fado houses. Alfama tilts tourist-priced fado restaurants." },
      { question: "Walkability to Baixa", winner: "tied", body: "Both 5-10 min downhill walk. Equivalent." },
      { question: "Price", winner: "b", body: "Mouraria 20-30% cheaper than Alfama for equivalent product." },
    ],
    pickA: "Pick Alfama for first-time visits, fado-focused trips, anyone willing to pay for the polished Moorish-quarter cliché.",
    pickB: "Pick Mouraria for repeat visits, food-focused trips, longer stays, anyone who wants Alfama atmosphere without tour groups.",
    bottomLine: "Alfama for the cliché. Mouraria for the same trip without crowds.",
  },
  // PRAGUE
  {
    slug: "mala-strana-vs-letna",
    citySlug: "prague", countrySlug: "czech-republic",
    aSlug: "mala-strana", bSlug: "letna",
    aLabel: "Malá Strana", bLabel: "Letná",
    metaTitle: "Malá Strana vs Letná: Where to Stay in Prague",
    metaDescription: "Prague's castle-side Malá Strana or the leafy Letná? Real take on castle access, food, atmosphere and price.",
    intro: "Malá Strana is the lesser-town below the castle — UNESCO cobblestone, Lennon Wall, gardens. Letná is north on the leafy plateau — beer-garden views over the river, residential calm, the underrated Prague stay. They share the river bank but feel very different.",
    rounds: [
      { question: "Castle access", winner: "a", body: "Malá Strana is at the castle's foot. Letná is 10-15 min walk to the castle entrance." },
      { question: "Quiet sleep", winner: "b", body: "Letná is residential-silent past 11pm. Malá Strana has tour-group churn from 9am and dinner noise on Karmelitská." },
      { question: "Restaurants", winner: "a", body: "Malá Strana has tourist-priced cluster. Letná has 4-5 strong picks (Letenský zámeček beer garden) but less variety." },
      { question: "Walkability to Old Town", winner: "a", body: "Malá Strana is 10 min via Charles Bridge. Letná is 15-20 min walk." },
      { question: "Price", winner: "b", body: "Letná 25-35% cheaper than Malá Strana for equivalent product." },
    ],
    pickA: "Pick Malá Strana for first-time visits, romantic trips, sights-density priority.",
    pickB: "Pick Letná for repeat visits, beer-and-park focused stays, light sleepers, budget-conscious travelers.",
    bottomLine: "Malá Strana for first-timers. Letná for repeat visits and value.",
  },
  // NAPLES
  {
    slug: "centro-storico-vs-quartieri-spagnoli",
    citySlug: "naples", countrySlug: "italy",
    aSlug: "centro-storico-naples", bSlug: "quartieri-spagnoli",
    aLabel: "Centro Storico", bLabel: "Quartieri Spagnoli",
    metaTitle: "Centro Storico vs Quartieri Spagnoli: Where to Stay in Naples",
    metaDescription: "Naples' UNESCO old town or the Spanish Quarter? Real take on chaos, food, atmosphere and which fits each trip.",
    intro: "Both are the cliché chaotic Naples. Centro Storico is the UNESCO old town with Spaccanapoli running through it — pizzerie, narrow vicoli, Duomo. Quartieri Spagnoli is the grid west of Via Toledo — Maradona murals, hanging laundry, scooter-density. The pick is dense-tourist vs dense-real.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Both deliver the chaotic Naples cliché. Centro Storico is denser-tourist; Quartieri Spagnoli is denser-real. Pick on what you want." },
      { question: "Pizza density", winner: "a", body: "Centro Storico wins by definition — Sorbillo, Da Michele, Di Matteo all on Via Tribunali. Quartieri has good pizza but less famous." },
      { question: "Quiet sleep", winner: "tied", body: "Both terrible weekends. Both fine on side alleys. The chaos is the trip." },
      { question: "Sights at your door", winner: "a", body: "Centro Storico has the Duomo, Cappella Sansevero, the underground. Quartieri has Maradona murals and street life — equivalent in atmosphere, less in named sights." },
      { question: "Price", winner: "b", body: "Quartieri Spagnoli 15-20% cheaper than Centro Storico for equivalent product." },
    ],
    pickA: "Pick Centro Storico for first-time visits, pizza-focused trips, anyone wanting UNESCO sights with the chaos.",
    pickB: "Pick Quartieri Spagnoli for return visits, photographers, anyone who wants the cliché Naples without the tour groups. Maradona murals are at every corner.",
    bottomLine: "Centro Storico for first-timers. Quartieri Spagnoli for the photo-trip and second visits.",
  },
);

// =============================================================================
// EXPANSION BATCH 5 — pairs leveraging new mid-tier and tier-1 nbhds
// (Florence, Stockholm, Copenhagen, Munich, Dublin, Brussels, Athens, Porto,
// Edinburgh, Bratislava, Galway, Tallinn, Reykjavik).
// =============================================================================
COMPARISONS.push(
  // FLORENCE
  {
    slug: "oltrarno-vs-san-frediano",
    citySlug: "florence", countrySlug: "italy",
    aSlug: "oltrarno", bSlug: "san-frediano",
    aLabel: "Oltrarno (Santo Spirito)", bLabel: "San Frediano",
    metaTitle: "Oltrarno vs San Frediano: Where to Stay in Florence",
    metaDescription: "Florence's Santo Spirito-side or the artisan San Frediano slice? Real take on food, walkability, romance and atmosphere.",
    intro: "Oltrarno around Santo Spirito is the famous Left Bank Florence. San Frediano is the slice west of it — same Oltrarno hill, more artisan workshops, less tour-group churn. They share the same trip with different texture.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Santo Spirito has the piazza and dinner-density. San Frediano has narrow lanes with leather and silver workshops. Both feel real Florence." },
      { question: "Tourist crush", winner: "b", body: "Santo Spirito's piazza fills with day-trippers by 7pm. San Frediano gets none of this — you'll feel like you found Florence." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Santo Spirito has dinner-cluster around the piazza. San Frediano has 5-6 strong picks with denser wine bars per block." },
      { question: "Walkability to Duomo", winner: "a", body: "Both 15-20 min walk via Ponte Vecchio. San Frediano slightly further west." },
      { question: "Price", winner: "b", body: "San Frediano 10-20% cheaper than Santo Spirito for equivalent product." },
    ],
    pickA: "Pick Oltrarno (Santo Spirito) for first-time visits, evening-piazza atmosphere, dinner density at the door.",
    pickB: "Pick San Frediano for repeat visits, food-and-wine focus, anyone who wants Oltrarno without the tour groups.",
    bottomLine: "Santo Spirito for first-timers and piazzas. San Frediano for repeat visits and artisans.",
  },
  {
    slug: "santa-croce-vs-santambrogio",
    citySlug: "florence", countrySlug: "italy",
    aSlug: "santa-croce", bSlug: "santambrogio",
    aLabel: "Santa Croce", bLabel: "Sant'Ambrogio",
    metaTitle: "Santa Croce vs Sant'Ambrogio: Where to Stay in Florence",
    metaDescription: "Florence's Santa Croce or the local Sant'Ambrogio? Real take on tourist crush, food markets, and which suits each trip.",
    intro: "Santa Croce is the basilica neighborhood east of the Duomo. Sant'Ambrogio is just east of Santa Croce — the food market, neighborhood-trattoria density, where most non-tourist Florentines actually shop. Same trip, different tourist density.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Santa Croce has the basilica, leather school, dinner-cluster around the piazza. Sant'Ambrogio's main draw is the market and food." },
      { question: "Restaurants and food authenticity", winner: "b", body: "Sant'Ambrogio wins. Cibrèo, the market, neighborhood trattorias. Santa Croce is increasingly tourist-priced." },
      { question: "Walkability to Duomo", winner: "tied", body: "Both 5-10 min walk. Santa Croce slightly closer to the Duomo; Sant'Ambrogio slightly further east." },
      { question: "Quiet sleep", winner: "b", body: "Sant'Ambrogio is residential past 10pm. Santa Croce piazza runs loud weekends with bar overflow." },
      { question: "Price", winner: "b", body: "Sant'Ambrogio 15-20% cheaper than Santa Croce." },
    ],
    pickA: "Pick Santa Croce for first-time visits, basilica-focused trips, anyone wanting the central Florence atmosphere.",
    pickB: "Pick Sant'Ambrogio for repeat visits, food-focused trips, longer stays. The market is the trip.",
    bottomLine: "Santa Croce for first-timers. Sant'Ambrogio for food and value.",
  },
  // STOCKHOLM
  {
    slug: "sodermalm-vs-vasastan",
    citySlug: "stockholm", countrySlug: "sweden",
    aSlug: "sodermalm", bSlug: "vasastan",
    aLabel: "Södermalm", bLabel: "Vasastan",
    metaTitle: "Södermalm vs Vasastan: Where to Stay in Stockholm",
    metaDescription: "Stockholm's lively Söder or the leafy Vasastan? Real take on food, atmosphere, families and price.",
    intro: "Södermalm is the southern island — Stockholm's bar-and-design hill, where most under-40 Stockholmers want to live. Vasastan is north of central — leafy residential, Odenplan dinner cluster, where Stockholmers actually live with kids.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Söder is dense-creative-bar-design. Vasastan is leafy-residential-family. Pick on what kind of Stockholm you want." },
      { question: "Restaurants past 10pm", winner: "a", body: "Söder wins. Götgatan, SoFo, the dense bar grid. Vasastan has Odenplan cluster but quieter and earlier." },
      { question: "Family-friendly", winner: "b", body: "Vasastan, decisively. Calmer streets, Vasaparken, family-aware restaurants. Söder is doable but appropriate for adults." },
      { question: "Walkability to Gamla Stan", winner: "a", body: "Söder is 10 min walk via Slussen. Vasastan is 20-25 min south." },
      { question: "Price", winner: "b", body: "Vasastan 10-20% cheaper than Söder for equivalent product." },
    ],
    pickA: "Pick Södermalm for food-and-bar focus, anyone under 40, design-conscious travelers.",
    pickB: "Pick Vasastan for families, longer stays, calmer evenings, light sleepers.",
    bottomLine: "Söder for food and bars. Vasastan for families and quiet.",
  },
  {
    slug: "ostermalm-vs-sodermalm",
    citySlug: "stockholm", countrySlug: "sweden",
    aSlug: "ostermalm", bSlug: "sodermalm",
    aLabel: "Östermalm", bLabel: "Södermalm",
    metaTitle: "Östermalm vs Södermalm: Where to Stay in Stockholm",
    metaDescription: "Stockholm's wealthy Östermalm or the creative Söder? Real take on shopping, food, atmosphere and price.",
    intro: "Östermalm is the wealthy quarter on the central island — designer shopping, Stureplan, the polished Stockholm. Söder is across the water — bar-and-design hill, the un-Östermalm. Both walkable to Gamla Stan but answer different questions.",
    rounds: [
      { question: "Shopping", winner: "a", body: "Östermalm wins by definition — the designer flagship strip. Söder has independent shops but no luxury retail." },
      { question: "Restaurants", winner: "tied", body: "Östermalm has high-end dining. Söder has dense casual-and-creative. Different price points." },
      { question: "Atmosphere", winner: "tied", body: "Östermalm is wealthy-elegant. Söder is creative-bar. Both feel Stockholm." },
      { question: "Walkability to Gamla Stan", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "b", body: "Söder 25-35% cheaper than Östermalm for equivalent product." },
    ],
    pickA: "Pick Östermalm for shopping-focused trips, luxury stays, anyone over 50 wanting the polished elegant Stockholm.",
    pickB: "Pick Söder for food-and-bar focus, anyone under 40, the creative side of Stockholm.",
    bottomLine: "Östermalm for luxury and shopping. Söder for food and creative atmosphere.",
  },
  // COPENHAGEN
  {
    slug: "indre-by-vs-christianshavn",
    citySlug: "copenhagen", countrySlug: "denmark",
    aSlug: "indre-by", bSlug: "christianshavn",
    aLabel: "Indre By", bLabel: "Christianshavn",
    metaTitle: "Indre By vs Christianshavn: Where to Stay in Copenhagen",
    metaDescription: "Copenhagen's central Indre By or the canal-houseboat Christianshavn? Real take on romance, restaurants, walkability and price.",
    intro: "Indre By is the central tourist-and-shopping core. Christianshavn is across the harbor — canal-houseboat quarter, the spiral of Vor Frelsers, Christiania commune at the eastern edge. The pick is central-and-touristy vs canal-and-romantic.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Indre By has Strøget, Nyhavn, Tivoli, Round Tower. Christianshavn has the spiral church and Christiania." },
      { question: "Romance", winner: "b", body: "Christianshavn's canals beat Indre By's Strøget for couples. The houseboat-canals atmosphere is the trip." },
      { question: "Restaurants", winner: "tied", body: "Indre By has volume but tourist-priced. Christianshavn has 5-6 strong design-restaurant picks." },
      { question: "Walkability to Indre By", winner: "tied", body: "Christianshavn is 10-15 min walk via the Inner Harbor Bridge. Manageable." },
      { question: "Price", winner: "b", body: "Christianshavn 10-15% cheaper than Indre By for equivalent product." },
    ],
    pickA: "Pick Indre By for first-time visits, sights-density focus, families wanting Tivoli at the door.",
    pickB: "Pick Christianshavn for honeymoons, romantic stays, repeat Copenhagen visitors. The canal-houseboat photo is the trip.",
    bottomLine: "Indre By for first-timers. Christianshavn for romance.",
  },
  {
    slug: "norrebro-vs-osterbro",
    citySlug: "copenhagen", countrySlug: "denmark",
    aSlug: "norrebro", bSlug: "osterbro",
    aLabel: "Nørrebro", bLabel: "Østerbro",
    metaTitle: "Nørrebro vs Østerbro: Where to Stay in Copenhagen",
    metaDescription: "Copenhagen's multicultural Nørrebro or family-friendly Østerbro? Real take on food, atmosphere, families and price.",
    intro: "Both are north of Indre By and serve travelers wanting non-central Copenhagen. Nørrebro is the multicultural-design quarter — Jægersborggade, the cemetery, dense international food. Østerbro is the family-friendly residential quarter east — the Lakes, leafy streets.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "a", body: "Nørrebro wins. Jægersborggade and Sankt Hans Torv have dense late kitchens. Østerbro is residential and earlier." },
      { question: "Family-friendly", winner: "b", body: "Østerbro wins. Lakes path, Fælledparken, family-aware cafes. Nørrebro is doable but better for adults." },
      { question: "Walkability to Indre By", winner: "tied", body: "Both 15-20 min walk south. Equivalent." },
      { question: "Atmosphere", winner: "tied", body: "Nørrebro is multicultural-design. Østerbro is leafy-residential. Pick on what you want." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Nørrebro for food-focused trips, design-conscious travelers, anyone under 40 wanting the multicultural Copenhagen.",
    pickB: "Pick Østerbro for families, longer stays, anyone over 35 wanting park-and-lake calm.",
    bottomLine: "Nørrebro for food. Østerbro for families.",
  },
  // MUNICH
  {
    slug: "altstadt-vs-maxvorstadt",
    citySlug: "munich", countrySlug: "germany",
    aSlug: "altstadt", bSlug: "maxvorstadt",
    aLabel: "Altstadt", bLabel: "Maxvorstadt",
    metaTitle: "Altstadt vs Maxvorstadt: Where to Stay in Munich",
    metaDescription: "Munich's Altstadt or the museum-quarter Maxvorstadt? Real take on sights, food and which fits each trip.",
    intro: "Altstadt is Munich's central tourist core — Marienplatz, Frauenkirche, Hofbräuhaus. Maxvorstadt sits north — the Pinakotheken museum cluster, university quarter, dense student-and-curator food.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Altstadt has Marienplatz, Viktualienmarkt, Hofbräuhaus. Maxvorstadt has 3 major museums (Alte/Neue/Moderne Pinakothek)." },
      { question: "Atmosphere", winner: "tied", body: "Altstadt is touristy-medieval. Maxvorstadt is academic-and-museum. Both feel Munich." },
      { question: "Restaurants past 10pm", winner: "b", body: "Maxvorstadt's student-quarter density wins. Altstadt's tourist-priced restaurants close earlier." },
      { question: "Quiet sleep", winner: "b", body: "Maxvorstadt residential past 11pm. Altstadt has Hofbräuhaus tour-bus noise and tourist crush." },
      { question: "Price", winner: "b", body: "Maxvorstadt 15-25% cheaper than Altstadt for equivalent product." },
    ],
    pickA: "Pick Altstadt for first-time visits, Marienplatz-and-beer focus, sights-density priority. Pay the premium and use it.",
    pickB: "Pick Maxvorstadt for museum-focused trips, longer stays, food-focused travelers. Walking distance to Altstadt is 10-15 min.",
    bottomLine: "Altstadt for first-timers. Maxvorstadt for museums and longer stays.",
  },
  {
    slug: "glockenbachviertel-vs-haidhausen",
    citySlug: "munich", countrySlug: "germany",
    aSlug: "glockenbachviertel", bSlug: "haidhausen",
    aLabel: "Glockenbachviertel", bLabel: "Haidhausen",
    metaTitle: "Glockenbachviertel vs Haidhausen: Where to Stay in Munich",
    metaDescription: "Munich's queer-friendly Glockenbach or the leafy Haidhausen? Real take on food, atmosphere, families and price.",
    intro: "Glockenbachviertel is south of Altstadt — Munich's queer-friendly cocktail-and-dinner quarter. Haidhausen is east of the Isar — leafy residential, the underrated quiet alternative with central proximity. Both serve travelers wanting non-Altstadt Munich.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "a", body: "Glockenbach wins. Müllerstraße, Hans-Sachs-Straße cocktail-and-dinner density. Haidhausen has 5-6 strong picks but quiet." },
      { question: "Family-friendly", winner: "b", body: "Haidhausen, decisively. Leafy streets, Wiener Platz market, family-aware. Glockenbach is for adults." },
      { question: "Atmosphere", winner: "tied", body: "Glockenbach is queer-cocktail. Haidhausen is leafy-residential. Pick on what kind of evening you want." },
      { question: "Walkability to Altstadt", winner: "a", body: "Glockenbach is 10-15 min walk. Haidhausen is 15-20 min plus crossing the Isar." },
      { question: "Price", winner: "b", body: "Haidhausen 15-25% cheaper than Glockenbach for equivalent product." },
    ],
    pickA: "Pick Glockenbach for cocktail-and-dinner focus, LGBTQ+-friendly trips, anyone under 40.",
    pickB: "Pick Haidhausen for families, longer stays, light sleepers, anyone over 35 wanting calm with central proximity.",
    bottomLine: "Glockenbach for evenings. Haidhausen for families.",
  },
  // DUBLIN
  {
    slug: "south-city-centre-vs-the-liberties",
    citySlug: "dublin", countrySlug: "ireland",
    aSlug: "south-city-centre", bSlug: "the-liberties",
    aLabel: "South City Centre", bLabel: "The Liberties",
    metaTitle: "South City Centre vs The Liberties: Where to Stay in Dublin",
    metaDescription: "Dublin's polished South Side or the historic Liberties? Real take on price, pubs, walkability and atmosphere.",
    intro: "South City Centre is the polished tourist-and-business core — Trinity College, Grafton Street, Merrion Square. The Liberties is just west — Guinness Storehouse, dense pubs, working-class history, recently-gentrifying. The pick is polished-central vs historic-and-cheap.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "South City Centre has Trinity, the Book of Kells, the National Gallery, Stephen's Green. Liberties has Guinness Storehouse and Christ Church." },
      { question: "Pubs", winner: "tied", body: "Both excellent. South Side has Davy Byrne's and the literary pubs. Liberties has more historic-working-class pub density." },
      { question: "Atmosphere", winner: "tied", body: "South Side is polished-tourist. Liberties is historic-working-class. Both feel Dublin." },
      { question: "Walkability between", winner: "tied", body: "10-15 min walk between any address in either. Effectively the same neighborhood for getting around." },
      { question: "Price", winner: "b", body: "Liberties 25-35% cheaper than South City Centre for equivalent product." },
    ],
    pickA: "Pick South City Centre for first-time visits, sights-and-Trinity focus, anyone willing to pay premium for polished walkability.",
    pickB: "Pick The Liberties for budget-conscious trips, beer-focused stays, anyone wanting historic Dublin atmosphere.",
    bottomLine: "South City Centre for first-timers. Liberties for budget and Guinness.",
  },
  {
    slug: "stoneybatter-vs-smithfield",
    citySlug: "dublin", countrySlug: "ireland",
    aSlug: "stoneybatter", bSlug: "smithfield",
    aLabel: "Stoneybatter", bLabel: "Smithfield",
    metaTitle: "Stoneybatter vs Smithfield: Where to Stay in Dublin",
    metaDescription: "Dublin's hip Stoneybatter or design-quarter Smithfield? Real take on food, atmosphere, walkability and price.",
    intro: "Both are north-of-the-Liffey alternatives to the South Side. Stoneybatter is the hip-residential quarter — narrow Georgian rows, dense brunch-and-bar strip on Manor Street. Smithfield sits south of it — the Jameson Distillery, design-quarter feel, the converted-warehouse hotels.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Stoneybatter is hip-residential-village. Smithfield is design-warehouse-creative. Both feel non-tourist Dublin." },
      { question: "Restaurants", winner: "tied", body: "Both have dense food strips. Stoneybatter on Manor Street; Smithfield around the Jameson. Equivalent quality." },
      { question: "Walkability to Trinity / South Side", winner: "b", body: "Smithfield is 15 min walk. Stoneybatter is 20-25 min — slightly further west." },
      { question: "Price", winner: "tied", body: "Both €130-€220. Equivalent." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Stoneybatter has weekend bar overflow on Manor Street; Smithfield is usually silent." },
    ],
    pickA: "Pick Stoneybatter for repeat Dublin visitors, food-focused stays, anyone wanting the hip-residential Dublin.",
    pickB: "Pick Smithfield for design-focused trips, longer stays, anyone wanting converted-warehouse atmosphere with central proximity.",
    bottomLine: "Both excellent. Stoneybatter for residential village-feel. Smithfield for design and central walkability.",
  },
  // BRUSSELS
  {
    slug: "ilot-sacre-vs-sablon",
    citySlug: "brussels", countrySlug: "belgium",
    aSlug: "ilot-sacre", bSlug: "sablon",
    aLabel: "Îlot Sacré", bLabel: "Sablon",
    metaTitle: "Îlot Sacré vs Sablon: Where to Stay in Brussels",
    metaDescription: "Brussels' Grand Place tourist core or the elegant Sablon? Real take on tourist crush, food, antiques and price.",
    intro: "Îlot Sacré is the Grand Place tourist core — restaurants on Rue des Bouchers, the Manneken Pis, dense central. Sablon is just south — antiques quarter, Sunday market, polished-elegant. The pick is touristy-loud vs polished-quiet.",
    rounds: [
      { question: "Atmosphere", winner: "b", body: "Sablon wins on elegance — antiques shops, chocolate flagships, the Place du Grand Sablon Sunday market. Îlot Sacré is tourist-restaurant-trap-dense." },
      { question: "Restaurants", winner: "tied", body: "Sablon has chocolate-and-bistro picks. Îlot Sacré has volume but Rue des Bouchers is the most-warned-against tourist trap in Brussels." },
      { question: "Walkability to Grand Place", winner: "a", body: "Îlot Sacré is at the Grand Place. Sablon is 5-10 min walk south." },
      { question: "Quiet sleep", winner: "b", body: "Sablon residential past 10pm. Îlot Sacré has tourist-restaurant noise until 11pm." },
      { question: "Price", winner: "tied", body: "Both €180-€350. Equivalent." },
    ],
    pickA: "Pick Îlot Sacré only if you specifically want Grand Place at the door for one night and accept the restaurant-trap reality.",
    pickB: "Pick Sablon for any 2+ night stay, polished-quiet evenings, antiques shopping, anyone over 40.",
    bottomLine: "Sablon, almost always. Îlot Sacré is the wrong default.",
  },
  // ATHENS
  {
    slug: "plaka-vs-pangrati",
    citySlug: "athens", countrySlug: "greece",
    aSlug: "plaka", bSlug: "pangrati",
    aLabel: "Plaka", bLabel: "Pangrati",
    metaTitle: "Plaka vs Pangrati: Where to Stay in Athens",
    metaDescription: "Athens' tourist Plaka or local Pangrati? Real take on tourist crush, food, walkability and price.",
    intro: "Plaka is the famous Acropolis-side old quarter. Pangrati sits east beyond the National Garden — leafy residential, dense neighborhood-tavernas, where Athenians actually live. The pick is tourist-cliché vs local-real.",
    rounds: [
      { question: "Walkability to Acropolis", winner: "a", body: "Plaka is at the Acropolis foot. Pangrati is 20-25 min walk west." },
      { question: "Tourist crush", winner: "b", body: "Plaka becomes nearly unwalkable mid-day in season. Pangrati gets none of this." },
      { question: "Restaurants past 10pm", winner: "b", body: "Pangrati wins. Neighborhood-tavernas serve real Athenian food at local prices. Plaka tilts tourist-priced." },
      { question: "Price", winner: "b", body: "Pangrati 25-35% cheaper than Plaka for equivalent product." },
      { question: "Sleep", winner: "b", body: "Pangrati residential-quiet past 10pm. Plaka has tour group churn from 8am." },
    ],
    pickA: "Pick Plaka only for 1-2 night first-time visits where the Acropolis-at-the-door cliché is the trip.",
    pickB: "Pick Pangrati for any 3+ night stay, food-focused trips, return visits, longer stays. The 20-min walk to the Acropolis is fine.",
    bottomLine: "Plaka for first-time short trips. Pangrati for everything else.",
  },
  {
    slug: "psyrri-vs-exarcheia",
    citySlug: "athens", countrySlug: "greece",
    aSlug: "psyrri", bSlug: "exarcheia",
    aLabel: "Psyrri", bLabel: "Exarcheia",
    metaTitle: "Psyrri vs Exarcheia: Where to Stay in Athens",
    metaDescription: "Athens' converted-warehouse Psyrri or anarchist-political Exarcheia? Real take on food, atmosphere, safety and which suits each trip.",
    intro: "Both are alternative-Athens bases. Psyrri is the converted-warehouse bar quarter just north of Monastiraki. Exarcheia is north of Syntagma — anarchist-political quarter, dense bookshops, late-night bars, gritty in spots. The pick is converted-design vs raw-political.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Psyrri is design-warehouse-bar. Exarcheia is anarchist-bookshop-late-night. Pick on tolerance for grit." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Psyrri has converted-warehouse mezedopoleia. Exarcheia has neighborhood-tavernas plus political-themed bars." },
      { question: "Walkability to Acropolis", winner: "a", body: "Psyrri is 10 min walk. Exarcheia is 20-25 min south." },
      { question: "Safety perception", winner: "a", body: "Psyrri feels safe and polished. Exarcheia has anarchist graffiti, occasional protest activity, drug-paraphernalia visible — comfortable for many travelers but not all." },
      { question: "Price", winner: "b", body: "Exarcheia 20-30% cheaper than Psyrri for equivalent product." },
    ],
    pickA: "Pick Psyrri for first-time alternative-Athens trips, food-focused stays, anyone wanting converted-warehouse atmosphere with central proximity.",
    pickB: "Pick Exarcheia for repeat visits, solo travelers comfortable with grit, anyone wanting raw-political-Athens.",
    bottomLine: "Psyrri for first-time alternatives. Exarcheia for repeat visits comfortable with grit.",
  },
  // PORTO
  {
    slug: "ribeira-vs-vila-nova-de-gaia",
    citySlug: "porto", countrySlug: "portugal",
    aSlug: "ribeira", bSlug: "vila-nova-de-gaia",
    aLabel: "Ribeira", bLabel: "Vila Nova de Gaia",
    metaTitle: "Ribeira vs Vila Nova de Gaia: Where to Stay in Porto",
    metaDescription: "Porto's photogenic Ribeira or the port-cellar Gaia across the river? Real take on view, mobility, restaurants and price.",
    intro: "Ribeira is the colored-tile riverfront in Porto. Vila Nova de Gaia is the city across the Douro — port-wine cellars, panoramic views back at the Ribeira tile facades. They share the river but answer different questions.",
    rounds: [
      { question: "View of Ribeira", winner: "b", body: "Gaia wins by definition — the famous Ribeira-tile-facade photo is taken FROM Gaia. Ribeira's view is across to Gaia (less iconic)." },
      { question: "Mobility", winner: "tied", body: "Ribeira at river level needs steep climbs back to Baixa. Gaia has both lower and upper roads, plus the cable car. Equivalent." },
      { question: "Wine focus", winner: "b", body: "Gaia, decisively. The port-wine cellars (Sandeman, Taylor's, Graham's) are all in Gaia. Ribeira has wine bars but no cellars." },
      { question: "Restaurants past 9pm", winner: "tied", body: "Both have tourist-priced river-side restaurants. Gaia's upper-road has slightly better value." },
      { question: "Price", winner: "b", body: "Gaia 15-25% cheaper than Ribeira for equivalent product, especially for view-rooms." },
    ],
    pickA: "Pick Ribeira only for short stays where sleeping inside the postcard is the point. Accept the steep walks.",
    pickB: "Pick Gaia for wine-focused trips, anyone wanting the iconic Ribeira-view-from-the-window, longer stays. Cross the bridge daily for Porto-side dinners.",
    bottomLine: "Ribeira for the postcard. Gaia for the photo and the wine.",
  },
  // EDINBURGH
  {
    slug: "new-town-vs-stockbridge",
    citySlug: "edinburgh", countrySlug: "united-kingdom",
    aSlug: "new-town-edinburgh", bSlug: "stockbridge",
    aLabel: "New Town", bLabel: "Stockbridge",
    metaTitle: "New Town vs Stockbridge: Where to Stay in Edinburgh",
    metaDescription: "Edinburgh's Georgian New Town or village-feeling Stockbridge? Real take on shopping, families, walkability and price.",
    intro: "New Town is the Georgian flagship — Princes Street, the National Gallery, polished elegant. Stockbridge sits north — village-feeling residential, Sunday farmers' market, Royal Botanic Garden. Both are quieter alternatives to Old Town.",
    rounds: [
      { question: "Walkability to Old Town", winner: "a", body: "New Town is 5-10 min walk to Old Town. Stockbridge is 15-20 min." },
      { question: "Shopping", winner: "a", body: "New Town has Princes Street, George Street, the upmarket flagships. Stockbridge has independent boutiques only." },
      { question: "Family-friendly", winner: "b", body: "Stockbridge wins. Botanic Garden, the village atmosphere, family-aware cafes. New Town is doable but less family-focused." },
      { question: "Atmosphere", winner: "tied", body: "New Town is Georgian-elegant-shopping. Stockbridge is village-residential. Both calm." },
      { question: "Price", winner: "b", body: "Stockbridge 15-25% cheaper than New Town for equivalent product, especially during festival." },
    ],
    pickA: "Pick New Town for shopping-focused trips, festival stays needing central walkability, anyone wanting the Georgian-elegant Edinburgh.",
    pickB: "Pick Stockbridge for families, longer stays, anyone wanting the village-Edinburgh away from festival crush.",
    bottomLine: "New Town for shopping and festival. Stockbridge for families and value.",
  },
  // DUBROVNIK
  {
    slug: "old-town-vs-pile",
    citySlug: "dubrovnik", countrySlug: "croatia",
    aSlug: "old-town-dubrovnik", bSlug: "pile",
    aLabel: "Old Town", bLabel: "Pile",
    metaTitle: "Old Town vs Pile: Where to Stay in Dubrovnik",
    metaDescription: "Dubrovnik's walled city or the Pile fortress-side? Real take on cruise crush, walkability, walls views and price.",
    intro: "Old Town is the walled city. Pile sits just outside the Pile Gate — fortress-side, walkable to the walls in 30 seconds, calmer than inside, with hotels offering walls views.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Old Town wins — sleeping inside the walls, sunrise on Stradun. Pile has views but lacks the in-the-walls experience." },
      { question: "Cruise crush", winner: "b", body: "Old Town becomes unwalkable 10am-4pm. Pile gets less of this since you're outside the gate." },
      { question: "Walkability to Old Town", winner: "tied", body: "Pile is 30 seconds to the gate. Effectively equivalent walking-wise." },
      { question: "Walls view", winner: "b", body: "Pile's hillside hotels have the famous walls-from-outside view. Old Town hotels look at stone alleys." },
      { question: "Price", winner: "b", body: "Pile 15-25% cheaper than Old Town for equivalent product." },
    ],
    pickA: "Pick Old Town for single-night stays, sunrise-on-Stradun focus, sights-density. Bring earplugs for cathedral bells.",
    pickB: "Pick Pile for stays of 3+ nights, anyone who wants walls-view-from-the-room without the in-walls premium.",
    bottomLine: "Old Town for the experience. Pile for the view and value.",
  },
);

// =============================================================================
// EXPANSION BATCH 6 — additional cross-pair comparisons in tier-1 cities
// =============================================================================
COMPARISONS.push(
  // PARIS
  {
    slug: "bastille-vs-saint-germain",
    citySlug: "paris", countrySlug: "france",
    aSlug: "bastille", bSlug: "saint-germain-des-pres",
    aLabel: "Bastille", bLabel: "Saint-Germain",
    metaTitle: "Bastille vs Saint-Germain: Where to Stay in Paris",
    metaDescription: "Paris's lively Bastille or polished Saint-Germain? Real take on price, food, atmosphere and which fits each trip.",
    intro: "Bastille is the 11th-arrondissement evening quarter — restaurants, bars, lived-in. Saint-Germain is Left Bank polished — cafés, museums, premium pricing. The pick is lived-in vs polished.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "a", body: "Bastille wins — rue de la Roquette, rue de Charonne dense with late kitchens. Saint-Germain quiets earlier and tilts tourist-priced." },
      { question: "Walkability to Louvre/Orsay", winner: "b", body: "Saint-Germain is 10-15 min walk to Orsay/Louvre. Bastille is 25-30 min." },
      { question: "Atmosphere", winner: "tied", body: "Bastille is lived-in-east-Paris. Saint-Germain is literary-Left-Bank. Both feel real Paris. Pick on what kind of evening you want." },
      { question: "Price", winner: "a", body: "Bastille 25-35% cheaper than Saint-Germain. The 6th's prestige premium is real." },
    ],
    pickA: "Pick Bastille for evening-focused trips, food-density priority, anyone under 40 wanting the lived-in Paris.",
    pickB: "Pick Saint-Germain for first-time visits, museum-focused trips, anyone willing to pay premium for Left-Bank polish.",
    bottomLine: "Bastille for evenings and value. Saint-Germain for museums and prestige.",
  },
  {
    slug: "le-marais-vs-montmartre",
    citySlug: "paris", countrySlug: "france",
    aSlug: "le-marais", bSlug: "montmartre",
    aLabel: "Le Marais", bLabel: "Montmartre",
    metaTitle: "Le Marais vs Montmartre: Where to Stay in Paris",
    metaDescription: "Paris's Marais or Montmartre? Real take on walkability, romance, atmosphere and which fits each trip.",
    intro: "Marais is central design-and-dinner Right Bank. Montmartre is the hilltop village in the 18th — Sacré-Cœur, narrow lanes, distant from central. The pick is dense-central vs romantic-photo.",
    rounds: [
      { question: "Walkability to central", winner: "a", body: "Marais is 12-15 min to Notre-Dame and Louvre. Montmartre is 30-40 min metro." },
      { question: "Romance", winner: "b", body: "Montmartre wins. Sacré-Cœur, the hilltop village, the cobblestone lanes — the iconic Paris-on-a-hill photo." },
      { question: "Restaurants past 10pm", winner: "a", body: "Marais wins — rue Vieille du Temple, rue de Bretagne dense late. Montmartre's restaurants close earlier and tilt tourist-priced near Place du Tertre." },
      { question: "Quiet sleep", winner: "b", body: "Montmartre quieter — most tourists leave the hill by 9pm. Marais bar streets run loud weekends." },
      { question: "Price", winner: "b", body: "Montmartre 15-25% cheaper than Marais." },
    ],
    pickA: "Pick Le Marais for first-time visits, food-focused trips, anyone wanting central walkability.",
    pickB: "Pick Montmartre for romantic stays, photo-focused trips, light sleepers willing to climb the hill.",
    bottomLine: "Marais for central and food. Montmartre for romance and photo.",
  },
  // ROME
  {
    slug: "trastevere-vs-monti",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "trastevere", bSlug: "monti",
    aLabel: "Trastevere", bLabel: "Monti",
    metaTitle: "Trastevere vs Monti: Where to Stay in Rome",
    metaDescription: "Rome's evening Trastevere or design Monti? Real take on tourist crush, food, atmosphere and price.",
    intro: "Trastevere is the famous evening quarter across the river. Monti is east of the Forum — design-and-wine-bar bohemian, the locals' alternative to Centro Storico. Both serve travelers who want non-Centro Rome.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Trastevere is medieval-narrow-evening-crowd. Monti is design-bar-bohemian. Both feel Rome." },
      { question: "Tourist crush", winner: "b", body: "Trastevere fills with tour groups by 7pm. Monti gets crowds during the day but disperses at night." },
      { question: "Walkability to Forum/Colosseum", winner: "b", body: "Monti is 5 min from the Forum. Trastevere is 25-30 min walk." },
      { question: "Restaurants", winner: "tied", body: "Both excellent. Trastevere has volume (mostly tourist-priced); Monti has wine-bar density and better quality at slightly higher prices." },
      { question: "Price", winner: "tied", body: "Both €150-€280 for decent product. Equivalent." },
    ],
    pickA: "Pick Trastevere for first-time visits, evening-atmosphere focus, anyone wanting the cliché Roman dinner.",
    pickB: "Pick Monti for return visits, design-and-wine-bar focus, ancient-Rome day-tripper convenience.",
    bottomLine: "Trastevere for evenings. Monti for ancient Rome and wine.",
  },
  // LONDON
  {
    slug: "soho-vs-marylebone",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "soho", bSlug: "marylebone",
    aLabel: "Soho", bLabel: "Marylebone",
    metaTitle: "Soho vs Marylebone: Where to Stay in London",
    metaDescription: "London's lively Soho or village-feeling Marylebone? Real take on noise, food, families and price.",
    intro: "Soho is the West End theatre-and-dinner core. Marylebone is just north — village-feeling residential, Regent's Park-adjacent. Both walk to Oxford Street but feel completely different.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "a", body: "Soho wins. Late kitchens, Chinatown adjacent, dense bar strip. Marylebone restaurants close earlier and lean residential." },
      { question: "Quiet sleep", winner: "b", body: "Marylebone residential past 11pm. Soho runs loud Thursday-Saturday until 3am." },
      { question: "Family-friendly", winner: "b", body: "Marylebone, decisively. Independent shops, Regent's Park, family-aware cafés. Soho is for adults." },
      { question: "Walkability to Oxford Street", winner: "tied", body: "Both 5-10 min walk. Equivalent." },
      { question: "Price", winner: "tied", body: "Both £250-£500 for decent product. Equivalent at top end." },
    ],
    pickA: "Pick Soho for evening-focused trips, theatre-and-dinner stays, anyone under 40.",
    pickB: "Pick Marylebone for families, couples, light sleepers, anyone wanting central calm with shopping access.",
    bottomLine: "Soho for evenings. Marylebone for families and quiet.",
  },
  {
    slug: "notting-hill-vs-south-kensington",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "notting-hill", bSlug: "south-kensington",
    aLabel: "Notting Hill", bLabel: "South Kensington",
    metaTitle: "Notting Hill vs South Kensington: Where to Stay in London",
    metaDescription: "London's pastel-mews Notting Hill or museum-quarter South Ken? Real take on walkability, market, families and price.",
    intro: "Notting Hill is West London's pastel-mews quarter — Portobello market, weekend buskers, the village photo. South Kensington is just south — V&A, Natural History Museum, garden squares. Both quiet alternatives to the West End.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Notting Hill wins on charm — pastel houses, mews, the Portobello market. South Ken is wealthier but less photogenic." },
      { question: "Walkability to museums", winner: "b", body: "South Ken has 3 museums at the door (V&A, NHM, Science). Notting Hill is 15-20 min walk to any." },
      { question: "Saturday market", winner: "a", body: "Notting Hill — Portobello market is at your door Saturday. South Ken has nothing equivalent." },
      { question: "Family-friendly", winner: "b", body: "South Ken, decisively. Three kid-friendly museums, Hyde Park, Princess Diana playground. Notting Hill weekend market is brutal with strollers." },
      { question: "Price", winner: "tied", body: "Both £250-£500 for decent product. Equivalent at top end." },
    ],
    pickA: "Pick Notting Hill for romantic trips, weekend market visitors, repeat London visitors wanting a quieter base.",
    pickB: "Pick South Ken for families with young kids, museum-focused trips, anyone wanting calm residential with sights at the door.",
    bottomLine: "Notting Hill for the photo and market. South Ken for families and museums.",
  },
  // BERLIN
  {
    slug: "schoneberg-vs-mitte",
    citySlug: "berlin", countrySlug: "germany",
    aSlug: "schoneberg", bSlug: "mitte",
    aLabel: "Schöneberg", bLabel: "Mitte",
    metaTitle: "Schöneberg vs Mitte: Where to Stay in Berlin",
    metaDescription: "Berlin's queer-history Schöneberg or central Mitte? Real take on sights, atmosphere, history and price.",
    intro: "Mitte is the central tourist-and-business core. Schöneberg sits south — queer-history quarter (Nollendorfplatz, the original Bowie-era West Berlin), residential calm. The pick is sights-central vs historical-residential.",
    rounds: [
      { question: "Sights at your door", winner: "b", body: "Mitte wins — Brandenburg Gate, Museum Island, Reichstag 5-15 min. Schöneberg has Nollendorfplatz history and KaDeWe nearby but less iconic." },
      { question: "LGBTQ+ history", winner: "a", body: "Schöneberg, decisively — the original queer Berlin, where Christopher Isherwood lived. Mitte has none of this layer." },
      { question: "Walkability to Mitte", winner: "tied", body: "Schöneberg is 15 min U-Bahn or 25 min walk. Manageable." },
      { question: "Quiet sleep", winner: "a", body: "Schöneberg residential past 10pm. Mitte has hotel-tour churn from 7am." },
      { question: "Price", winner: "a", body: "Schöneberg 15-25% cheaper than Mitte for equivalent product." },
    ],
    pickA: "Pick Schöneberg for LGBTQ+ trips, history-focused stays, longer trips, anyone over 35 wanting calm.",
    pickB: "Pick Mitte for first-time visits, sights-density focus, short stays.",
    bottomLine: "Mitte for first-timers. Schöneberg for queer history and quiet.",
  },
  // MADRID
  {
    slug: "lavapies-vs-la-latina",
    citySlug: "madrid", countrySlug: "spain",
    aSlug: "lavapies", bSlug: "la-latina",
    aLabel: "Lavapiés", bLabel: "La Latina",
    metaTitle: "Lavapiés vs La Latina: Where to Stay in Madrid",
    metaDescription: "Madrid's multicultural Lavapiés or tapas-tradition La Latina? Real take on food, atmosphere and price.",
    intro: "Both are central Madrid south of the touristy Sol. La Latina is the medieval-tapas quarter — Cava Baja, the Sunday Rastro market. Lavapiés sits just south — multicultural quarter, Indian/Senegalese/Moroccan food density. Same trip type, different cuisines.",
    rounds: [
      { question: "Tapas crawl", winner: "b", body: "La Latina wins by definition. Cava Baja and Cava Alta are the Sunday-tapas tradition. Lavapiés has tapas but not the same density." },
      { question: "Food diversity", winner: "a", body: "Lavapiés wins. The most diverse food block in Madrid — Indian, Senegalese, Moroccan, plus Spanish. La Latina is all-Spanish." },
      { question: "Atmosphere", winner: "tied", body: "La Latina is medieval-Spanish-tapas. Lavapiés is multicultural-real-working-class. Pick on what you want." },
      { question: "Walkability to Sol", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "a", body: "Lavapiés 15-20% cheaper than La Latina for equivalent product." },
    ],
    pickA: "Pick Lavapiés for food-diversity focus, longer stays, anyone wanting multicultural Madrid.",
    pickB: "Pick La Latina for tapas-tradition trips, Sunday Rastro visitors, anyone wanting the cliché Sunday-vermouth Madrid.",
    bottomLine: "Lavapiés for food diversity. La Latina for the tapas tradition.",
  },
  {
    slug: "chamberi-vs-malasana",
    citySlug: "madrid", countrySlug: "spain",
    aSlug: "chamberi", bSlug: "malasana",
    aLabel: "Chamberí", bLabel: "Malasaña",
    metaTitle: "Chamberí vs Malasaña: Where to Stay in Madrid",
    metaDescription: "Madrid's leafy Chamberí or hipster Malasaña? Real take on food, atmosphere, families and price.",
    intro: "Malasaña is the indie-rock-vintage quarter north of Gran Vía. Chamberí sits just north — leafy residential, dense restaurant strip on Ponzano, where well-off Madrileños actually live. Both serve travelers wanting non-tourist Madrid but answer different questions.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "tied", body: "Both dense. Malasaña has casual indie-and-tapas. Chamberí has Ponzano dense restaurant strip with slightly higher price points." },
      { question: "Family-friendly", winner: "a", body: "Chamberí wins. Leafy residential, calmer streets, family-aware. Malasaña doable but better for adults." },
      { question: "Atmosphere", winner: "tied", body: "Malasaña is indie-rock-vintage. Chamberí is wealthy-residential-leafy. Pick on what you want." },
      { question: "Walkability to Sol", winner: "b", body: "Malasaña is 10 min walk. Chamberí is 15-20 min north." },
      { question: "Price", winner: "tied", body: "Both €130-€220. Chamberí slightly higher for hotels; Malasaña higher for short-term apartments." },
    ],
    pickA: "Pick Chamberí for families, longer stays, anyone over 35 wanting calmer Madrid with food access.",
    pickB: "Pick Malasaña for indie-rock focus, vintage shopping, anyone under 40 wanting hipster Madrid.",
    bottomLine: "Chamberí for families and food. Malasaña for indie energy.",
  },
  // LISBON
  {
    slug: "baixa-chiado-vs-bairro-alto",
    citySlug: "lisbon", countrySlug: "portugal",
    aSlug: "baixa-chiado", bSlug: "bairro-alto",
    aLabel: "Baixa-Chiado", bLabel: "Bairro Alto",
    metaTitle: "Baixa-Chiado vs Bairro Alto: Where to Stay in Lisbon",
    metaDescription: "Lisbon's flat central Baixa-Chiado or the bar-crawl Bairro Alto? Real take on noise, walkability and which fits each trip.",
    intro: "Baixa-Chiado is the flat central grid. Bairro Alto sits just west on the hill — narrow lanes, dozens of bars, the famous Lisbon bar quarter. Walkable to each other in 10 min but completely different evenings.",
    rounds: [
      { question: "Walkability", winner: "a", body: "Baixa-Chiado is flat. Bairro Alto is on a steep hill — every walk back is uphill." },
      { question: "Bars at night", winner: "b", body: "Bairro Alto wins by definition — the whole quarter is the bar." },
      { question: "Quiet sleep", winner: "a", body: "Bairro Alto runs loud Thursday-Sunday until 3am — sleep on the main lanes is impossible. Baixa-Chiado has bar overflow but quieter overall." },
      { question: "Restaurants past 10pm", winner: "a", body: "Baixa-Chiado has more density and quality. Bairro Alto's restaurants are mostly bar food." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Baixa-Chiado for first-time visits, dinner-focused trips, anyone with luggage or mobility concerns, families.",
    pickB: "Pick Bairro Alto for under-30 trips, bar-focused stays, anyone whose Lisbon is the bar trip. Bring earplugs.",
    bottomLine: "Baixa-Chiado for walkability and food. Bairro Alto for the bars.",
  },
  // STOCKHOLM
  {
    slug: "norrmalm-vs-sodermalm",
    citySlug: "stockholm", countrySlug: "sweden",
    aSlug: "norrmalm", bSlug: "sodermalm",
    aLabel: "Norrmalm", bLabel: "Södermalm",
    metaTitle: "Norrmalm vs Södermalm: Where to Stay in Stockholm",
    metaDescription: "Stockholm's central Norrmalm or creative Södermalm? Real take on transport, food, atmosphere and price.",
    intro: "Norrmalm is the central business core north of Gamla Stan — Central Station, T-Centralen metro, shopping. Söder is the southern island — bar-and-design hill, where most Stockholmers under 40 want to live.",
    rounds: [
      { question: "Transport hub", winner: "a", body: "Norrmalm wins by definition. T-Centralen, Arlanda Express, all metro lines. Söder is 8-10 min by metro from same." },
      { question: "Restaurants past 10pm", winner: "b", body: "Söder wins. SoFo, Götgatan, Mariatorget have late kitchens. Norrmalm has chains and tourist-restaurant strips." },
      { question: "Atmosphere", winner: "b", body: "Söder is creative-and-real. Norrmalm is generic-business-grid. Söder feels Stockholm; Norrmalm feels any-European-capital." },
      { question: "Walkability to Gamla Stan", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "tied", body: "Both €170-€280 for decent product. Söder slightly cheaper for boutiques; Norrmalm cheaper for chains." },
    ],
    pickA: "Pick Norrmalm only for short business trips needing station logistics or single-night stays.",
    pickB: "Pick Söder for any 2+ night stay, food-focused trips, anyone wanting real Stockholm.",
    bottomLine: "Söder for the trip. Norrmalm for tactical short-stay logistics.",
  },
  // ATHENS
  {
    slug: "plaka-vs-petralona",
    citySlug: "athens", countrySlug: "greece",
    aSlug: "plaka", bSlug: "petralona",
    aLabel: "Plaka", bLabel: "Petralona",
    metaTitle: "Plaka vs Petralona: Where to Stay in Athens",
    metaDescription: "Athens' tourist Plaka or local Petralona? Real take on tourist crush, food, walkability and price.",
    intro: "Plaka is the famous tourist quarter under the Acropolis. Petralona sits southwest at the foot of Filopappou — leafy residential, Sunday market, where most under-40 Athenians actually live. Same Acropolis access, completely different trip.",
    rounds: [
      { question: "Walkability to Acropolis", winner: "a", body: "Plaka is at the Acropolis foot. Petralona is 15-20 min walk via Filopappou." },
      { question: "Tourist crush", winner: "b", body: "Plaka becomes nearly unwalkable mid-day. Petralona gets none of this." },
      { question: "Restaurants and price", winner: "b", body: "Petralona has neighborhood-tavernas at local prices. Plaka tilts tourist-priced." },
      { question: "Atmosphere", winner: "b", body: "Petralona feels real Athens — kids walking to school, market on weekends. Plaka feels staged." },
      { question: "Price", winner: "b", body: "Petralona 30-40% cheaper than Plaka." },
    ],
    pickA: "Pick Plaka only for short first-time visits where the Acropolis-at-the-door cliché is the trip.",
    pickB: "Pick Petralona for any 3+ night stay, food-focused trips, return visits, longer stays. The 15-min walk is the daily routine.",
    bottomLine: "Plaka for first-timers. Petralona for everything else.",
  },
  // BARCELONA
  {
    slug: "gracia-vs-eixample",
    citySlug: "barcelona", countrySlug: "spain",
    aSlug: "gracia", bSlug: "eixample",
    aLabel: "Gràcia", bLabel: "Eixample",
    metaTitle: "Gràcia vs Eixample: Where to Stay in Barcelona",
    metaDescription: "Barcelona's village-feeling Gràcia or the Modernisme Eixample? Real take on sights, food, atmosphere and price.",
    intro: "Eixample is the wide-grid Modernisme quarter with Gaudí's masterpieces. Gràcia is north — village-feeling, plaza-life, locals-and-students. Both serve travelers tired of Las Ramblas. Different trips.",
    rounds: [
      { question: "Architecture/sights", winner: "b", body: "Eixample wins — Casa Batlló, La Pedrera, Sagrada Família. Gràcia has Casa Vicens (a smaller Gaudí) but lacks the Modernisme density." },
      { question: "Atmosphere", winner: "a", body: "Gràcia wins for village-feel — plaza-life, locals-and-students, Festa Major in August. Eixample is wide-boulevard handsome." },
      { question: "Restaurants past 10pm", winner: "a", body: "Gràcia wins — dense neighborhood-tapas-and-bar strip. Eixample's restaurants tilt business-and-tourist." },
      { question: "Walkability to old town", winner: "b", body: "Eixample is 10-15 min walk to Plaça Catalunya. Gràcia is 25-30 min walk south." },
      { question: "Price", winner: "a", body: "Gràcia 15-25% cheaper than Eixample for equivalent product." },
    ],
    pickA: "Pick Gràcia for longer stays, food-focused trips, anyone wanting village-feel Barcelona at lower prices.",
    pickB: "Pick Eixample for first-time visits, Gaudí-focused trips, central walkability priority.",
    bottomLine: "Eixample for sights. Gràcia for village-feel and value.",
  },
  // VENICE
  {
    slug: "dorsoduro-vs-san-marco",
    citySlug: "venice", countrySlug: "italy",
    aSlug: "dorsoduro", bSlug: "san-marco-venice",
    aLabel: "Dorsoduro", bLabel: "San Marco",
    metaTitle: "Dorsoduro vs San Marco: Where to Stay in Venice",
    metaDescription: "Venice's art-quarter Dorsoduro or central San Marco? Real take on tourist crush, museums, walkability and price.",
    intro: "San Marco is the central tourist core — basilica, palace, Rialto. Dorsoduro is south across the Accademia bridge — art-and-students, the Peggy Guggenheim, Punta della Dogana. Walkable to San Marco in 12-15 min.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "San Marco wins — basilica, palace, bridges, all 5 min. Dorsoduro is 12-15 min walk via Accademia." },
      { question: "Day-tripper crush", winner: "b", body: "San Marco's main streets are unwalkable 11am-4pm. Dorsoduro gets less crush." },
      { question: "Art museums on foot", winner: "b", body: "Dorsoduro wins — Accademia, Peggy Guggenheim, Punta della Dogana, Ca' Rezzonico all in the sestiere." },
      { question: "Quiet sleep", winner: "b", body: "Dorsoduro residential past 11pm. San Marco has tourist churn." },
      { question: "Price", winner: "b", body: "Dorsoduro 15-25% cheaper than San Marco for equivalent product." },
    ],
    pickA: "Pick San Marco only for single-night sights-only trips. Otherwise the day-tripper crush is a real cost.",
    pickB: "Pick Dorsoduro for art-focused trips, longer stays, anyone wanting calmer Venice with central proximity.",
    bottomLine: "San Marco for one-night sights focus. Dorsoduro for art and quiet.",
  },
  // PRAGUE
  {
    slug: "stare-mesto-vs-letna",
    citySlug: "prague", countrySlug: "czech-republic",
    aSlug: "stare-mesto", bSlug: "letna",
    aLabel: "Staré Město", bLabel: "Letná",
    metaTitle: "Staré Město vs Letná: Where to Stay in Prague",
    metaDescription: "Prague's UNESCO Old Town or leafy Letná? Real take on noise, walkability, beer-and-park and price.",
    intro: "Staré Město is the medieval Old Town. Letná sits across the Vltava on the leafy plateau — Letenský zámeček beer garden, residential calm, castle views. The pick is tourist-cliché vs leafy-quiet.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Staré Město is medieval-tourist-iconic. Letná is leafy-park-residential. Different trips." },
      { question: "Walkability to Old Town Square", winner: "a", body: "Staré Město is at the square. Letná is 15-20 min walk via Štefánik Bridge." },
      { question: "Quiet sleep", winner: "b", body: "Letná residential-silent past 11pm. Staré Město has bar overflow on Old Town Square weekends." },
      { question: "Beer garden", winner: "b", body: "Letná wins — the Letenský zámeček beer garden is one of Prague's best, with castle views." },
      { question: "Price", winner: "b", body: "Letná 30-40% cheaper than Staré Město for equivalent product." },
    ],
    pickA: "Pick Staré Město for first-time short trips, sights-density focus.",
    pickB: "Pick Letná for repeat visits, beer-garden focus, longer stays, families wanting park calm.",
    bottomLine: "Staré Město for first-timers. Letná for value and calm.",
  },
  // COPENHAGEN
  {
    slug: "vesterbro-vs-frederiksberg",
    citySlug: "copenhagen", countrySlug: "denmark",
    aSlug: "vesterbro", bSlug: "frederiksberg",
    aLabel: "Vesterbro", bLabel: "Frederiksberg",
    metaTitle: "Vesterbro vs Frederiksberg: Where to Stay in Copenhagen",
    metaDescription: "Copenhagen's design Vesterbro or wealthy Frederiksberg? Real take on food, atmosphere, families and price.",
    intro: "Vesterbro is the post-industrial converted creative quarter west of Central Station. Frederiksberg is just west of Vesterbro — leafy wealthy residential, Frederiksberg Have park, where well-off Copenhageners actually live.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Vesterbro is design-warehouse-Meatpacking. Frederiksberg is wealthy-leafy-residential. Pick on what you want." },
      { question: "Restaurants past 10pm", winner: "a", body: "Vesterbro wins — Kødbyen design district, dense bars and kitchens. Frederiksberg has 5-6 strong picks but quieter." },
      { question: "Family-friendly", winner: "b", body: "Frederiksberg wins. Frederiksberg Have, Zoo nearby, family-aware streets, calm. Vesterbro is more adult-focused." },
      { question: "Walkability to Central Station / Indre By", winner: "a", body: "Vesterbro is 5-10 min walk. Frederiksberg is 15-20 min east." },
      { question: "Price", winner: "tied", body: "Both €150-€280 for decent product. Equivalent at top end." },
    ],
    pickA: "Pick Vesterbro for design-focused trips, food-and-Meatpacking focus, central walkability.",
    pickB: "Pick Frederiksberg for families, longer stays, anyone over 40 wanting wealthy-leafy residential.",
    bottomLine: "Vesterbro for design and food. Frederiksberg for families and leafy calm.",
  },
);

// =============================================================================
// EXPANSION BATCH 7 — pairs in tier-2/3 cities with neighborhoods I added but
// no comparisons yet (Manchester, Bilbao, San Sebastián, Granada, Bologna,
// Genoa, Strasbourg, Toulouse, Dresden, Frankfurt, Marseille, Lyon, Ghent,
// Cappadocia, Salzburg, Innsbruck).
// =============================================================================
COMPARISONS.push(
  // MANCHESTER
  {
    slug: "northern-quarter-vs-spinningfields",
    citySlug: "manchester", countrySlug: "united-kingdom",
    aSlug: "northern-quarter", bSlug: "spinningfields",
    aLabel: "Northern Quarter", bLabel: "Spinningfields",
    metaTitle: "Northern Quarter vs Spinningfields: Where to Stay in Manchester",
    metaDescription: "Manchester's creative Northern Quarter or business Spinningfields? Real take on food, atmosphere, families and price.",
    intro: "Northern Quarter is the creative converted-warehouse quarter — bars, music venues, the Affleck's vintage market. Spinningfields is the business district just west — glass-and-steel, polished restaurants. Both walkable to each other in 10 min.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Northern Quarter is creative-bar-music. Spinningfields is corporate-and-restaurant. Pick on what you want from the trip." },
      { question: "Restaurants past 10pm", winner: "a", body: "Northern Quarter wins for variety and late kitchens. Spinningfields has high-end restaurants but quieter overall." },
      { question: "Quiet sleep", winner: "b", body: "Spinningfields residential past 11pm. Northern Quarter has bar overflow weekends." },
      { question: "Walkability to Piccadilly Station", winner: "a", body: "Northern Quarter is 5-10 min walk. Spinningfields is 15-20 min." },
      { question: "Price", winner: "a", body: "Northern Quarter 15-20% cheaper than Spinningfields for equivalent product." },
    ],
    pickA: "Pick Northern Quarter for evening-focused trips, music-and-bar focus, anyone under 35.",
    pickB: "Pick Spinningfields for business stays, families wanting calmer evenings, anyone over 40.",
    bottomLine: "Northern Quarter for evenings. Spinningfields for business and quiet.",
  },
  // BILBAO
  {
    slug: "casco-viejo-vs-ensanche",
    citySlug: "bilbao", countrySlug: "spain",
    aSlug: "casco-viejo", bSlug: "ensanche",
    aLabel: "Casco Viejo", bLabel: "Ensanche",
    metaTitle: "Casco Viejo vs Ensanche: Where to Stay in Bilbao",
    metaDescription: "Bilbao's medieval old town or modern Ensanche? Real take on pintxos, Guggenheim access, families and price.",
    intro: "Casco Viejo is the medieval old town on the right bank — Las Siete Calles, dense pintxos crawl, the cathedral. Ensanche is the 19th-century grid on the left bank — Guggenheim 10 min north, design hotels, the polished modern Bilbao. Both walkable to each other in 10 min.",
    rounds: [
      { question: "Pintxos crawl", winner: "a", body: "Casco Viejo wins. Calle Sombrerería, Calle Somera, Calle Jardines have the densest pintxos density in the Basque Country. Ensanche has high-end pintxos but less variety." },
      { question: "Walkability to Guggenheim", winner: "b", body: "Ensanche is 10 min walk. Casco Viejo is 15-20 min." },
      { question: "Atmosphere", winner: "a", body: "Casco Viejo is medieval-pintxos-old-quarter. Ensanche is grid-design-modern. Pick on what you want." },
      { question: "Quiet sleep", winner: "b", body: "Ensanche residential past 11pm. Casco Viejo has bar overflow weekends until 3am." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Casco Viejo for first-time visits, pintxos focus, anyone wanting cliché Basque atmosphere.",
    pickB: "Pick Ensanche for Guggenheim focus, business stays, anyone over 50 wanting calmer evenings.",
    bottomLine: "Casco Viejo for pintxos and atmosphere. Ensanche for Guggenheim and quiet.",
  },
  // SAN SEBASTIAN
  {
    slug: "parte-vieja-vs-gros",
    citySlug: "san-sebastian", countrySlug: "spain",
    aSlug: "parte-vieja", bSlug: "gros",
    aLabel: "Parte Vieja", bLabel: "Gros",
    metaTitle: "Parte Vieja vs Gros: Where to Stay in San Sebastián",
    metaDescription: "San Sebastián's pintxos old town or surfer Gros? Real take on food, beach, atmosphere and price.",
    intro: "Parte Vieja is the old town between Mount Urgull and the Urumea — the densest pintxos crawl in Europe. Gros is across the river — Zurriola surf beach, where San Sebastián locals actually live. Walkable in 10 min.",
    rounds: [
      { question: "Pintxos crawl", winner: "a", body: "Parte Vieja wins by definition. Calle 31 de Agosto, Calle Fermín Calbetón — dense pintxos, every door is a bar." },
      { question: "Beach", winner: "tied", body: "Parte Vieja is 5 min from La Concha. Gros is at Zurriola (surfer beach). Both excellent for swimmers, different swells." },
      { question: "Quiet sleep", winner: "b", body: "Gros residential past 11pm. Parte Vieja has bar overflow Thursday-Sunday until 3am." },
      { question: "Atmosphere", winner: "tied", body: "Parte Vieja is medieval-pintxos-tourist. Gros is surfer-residential-local. Pick on tourist tolerance." },
      { question: "Price", winner: "b", body: "Gros 20-30% cheaper than Parte Vieja for equivalent product." },
    ],
    pickA: "Pick Parte Vieja for first-time visits, pintxos-focused trips, anyone wanting the cliché Basque evening.",
    pickB: "Pick Gros for surfers, longer stays, light sleepers, anyone wanting La Concha access without the tourist crush.",
    bottomLine: "Parte Vieja for pintxos. Gros for surf and quiet.",
  },
  // GRANADA
  {
    slug: "albaicin-vs-realejo",
    citySlug: "granada", countrySlug: "spain",
    aSlug: "albaicin", bSlug: "realejo",
    aLabel: "Albaicín", bLabel: "Realejo",
    metaTitle: "Albaicín vs Realejo: Where to Stay in Granada",
    metaDescription: "Granada's Moorish hilltop Albaicín or quieter Realejo? Real take on Alhambra access, mobility, food and atmosphere.",
    intro: "Albaicín is the Moorish hill quarter facing the Alhambra. Realejo is the former Jewish quarter on the slope below — quieter, walkable to the Alhambra entrance, real restaurants. Both reward different trips.",
    rounds: [
      { question: "Alhambra view", winner: "a", body: "Albaicín wins by definition — the Mirador de San Nicolás sunset is the photo. Realejo has Alhambra views from some hotel rooms but less iconic." },
      { question: "Walkability to Alhambra entrance", winner: "b", body: "Realejo is 10-15 min uphill walk. Albaicín is 15-25 min — also uphill but on different slope." },
      { question: "Mobility", winner: "b", body: "Realejo is steep but more walkable. Albaicín is the steepest cobbles in Andalucía — brutal with luggage." },
      { question: "Restaurants past 10pm", winner: "b", body: "Realejo wins. Campo del Príncipe and the streets around it have real restaurants. Albaicín has tourist-priced tea-houses and few late kitchens." },
      { question: "Price", winner: "b", body: "Realejo 15-20% cheaper than Albaicín for equivalent product." },
    ],
    pickA: "Pick Albaicín for first-time visits, sunset-photo focus, romantic stays. Light luggage essential.",
    pickB: "Pick Realejo for repeat visits, food-focused trips, longer stays, mobility-aware travelers.",
    bottomLine: "Albaicín for the photo. Realejo for food and walkability.",
  },
  // BOLOGNA
  {
    slug: "centro-storico-bologna-vs-university-quarter",
    citySlug: "bologna", countrySlug: "italy",
    aSlug: "centro-storico-bologna", bSlug: "university-quarter",
    aLabel: "Centro Storico", bLabel: "University Quarter",
    metaTitle: "Centro Storico vs University Quarter: Where to Stay in Bologna",
    metaDescription: "Bologna's UNESCO old town or the lively university quarter? Real take on food, noise, atmosphere and price.",
    intro: "Centro Storico is Bologna's porticoed historic centre. The University Quarter is the northeast slice around Via Zamboni — student bars, late-night pizza, cheaper. Both are inside the historic core but feel different.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Centro Storico is porticoed-and-touristy. University Quarter is student-and-late. Pick on age and energy." },
      { question: "Quiet sleep", winner: "a", body: "Centro Storico (away from Piazza Maggiore) is residential past midnight. University Quarter is loud Thursday-Sunday until 2am." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Centro Storico has Quadrilatero food market and traditional kitchens. University Quarter has cheap student-friendly density." },
      { question: "Walkability to Piazza Maggiore", winner: "a", body: "Centro Storico is at the piazza. University Quarter is 5-10 min walk." },
      { question: "Price", winner: "b", body: "University Quarter 20-30% cheaper than Centro Storico for equivalent product." },
    ],
    pickA: "Pick Centro Storico for first-time visits, sights-density focus, anyone over 35.",
    pickB: "Pick University Quarter for under-35 trips, budget-conscious stays, anyone wanting late-night density.",
    bottomLine: "Centro Storico for first-timers. University Quarter for budget and late nights.",
  },
  // GENOA
  {
    slug: "centro-storico-genoa-vs-porto-antico",
    citySlug: "genoa", countrySlug: "italy",
    aSlug: "centro-storico-genoa", bSlug: "porto-antico",
    aLabel: "Centro Storico", bLabel: "Porto Antico",
    metaTitle: "Centro Storico vs Porto Antico: Where to Stay in Genoa",
    metaDescription: "Genoa's medieval port-quarter or modern Porto Antico? Real take on safety, atmosphere, families and price.",
    intro: "Centro Storico is Genoa's medieval lane-quarter — the densest old town in Europe, narrow caruggi, gritty in spots. Porto Antico is the redeveloped waterfront just south — Aquarium, polished hotel inventory, family-friendly. The pick is atmosphere vs polish.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Centro Storico wins for atmosphere — palazzi dei Rolli, narrow caruggi, real medieval. Porto Antico is redeveloped-modern, less character." },
      { question: "Safety perception", winner: "b", body: "Porto Antico is fully polished. Centro Storico has caruggi that feel sketchy after dark. Pick south of Piazza De Ferrari for Centro Storico safety." },
      { question: "Family-friendly", winner: "b", body: "Porto Antico, decisively. Aquarium, Galata Maritime Museum, polished waterfront. Centro Storico is hard with strollers (steep stairs)." },
      { question: "Restaurants past 10pm", winner: "a", body: "Centro Storico has dense focacceria-and-trattoria density. Porto Antico has tourist-priced waterfront restaurants." },
      { question: "Price", winner: "tied", body: "Both €100-€180 for decent product. Equivalent." },
    ],
    pickA: "Pick Centro Storico for atmosphere-focused trips, foodies, anyone over Italian medieval-grit comfort.",
    pickB: "Pick Porto Antico for families, first-timers wanting polished safety, anyone less comfortable with caruggi.",
    bottomLine: "Centro Storico for atmosphere. Porto Antico for families and polish.",
  },
  // STRASBOURG
  {
    slug: "grande-ile-vs-petite-france",
    citySlug: "strasbourg", countrySlug: "france",
    aSlug: "grande-ile", bSlug: "petite-france",
    aLabel: "Grande Île", bLabel: "Petite France",
    metaTitle: "Grande Île vs Petite France: Where to Stay in Strasbourg",
    metaDescription: "Strasbourg's central Grande Île or photogenic Petite France? Real take on tourist crush, food, and which fits each trip.",
    intro: "Both are inside Strasbourg's UNESCO core. Grande Île is the wider island with the cathedral and Place Kléber. Petite France is the southwest corner — canals, half-timbered tanner houses, the most-photographed stretch.",
    rounds: [
      { question: "Pretty factor", winner: "b", body: "Petite France wins — the canal-and-half-timbered photo is the trip. Grande Île is handsome but less iconic." },
      { question: "Tourist crush", winner: "a", body: "Petite France's main lanes are unwalkable mid-day. Grande Île has tourist density too but spreads across more streets." },
      { question: "Restaurants past 9pm", winner: "tied", body: "Both have winstub density. Petite France's are mostly tourist-priced; Grande Île has more variety." },
      { question: "Walkability to cathedral", winner: "a", body: "Grande Île has the cathedral at its centre. Petite France is 8-10 min walk." },
      { question: "Price", winner: "tied", body: "Both €150-€280 for decent product. Equivalent." },
    ],
    pickA: "Pick Grande Île for first-time visits, sights-focused trips, anyone wanting central walkability.",
    pickB: "Pick Petite France for romantic stays, photo-focused trips. Accept the day-tripper crush 11am-4pm.",
    bottomLine: "Grande Île for first-timers. Petite France for romance and photos.",
  },
  {
    slug: "grande-ile-vs-krutenau",
    citySlug: "strasbourg", countrySlug: "france",
    aSlug: "grande-ile", bSlug: "krutenau",
    aLabel: "Grande Île", bLabel: "Krutenau",
    metaTitle: "Grande Île vs Krutenau: Where to Stay in Strasbourg",
    metaDescription: "Strasbourg's UNESCO Grande Île or the lived-in Krutenau? Real take on tourist crush, food, and which fits each trip.",
    intro: "Grande Île is the UNESCO tourist core. Krutenau is east of the Ill — student-and-design quarter, food trucks, dense bar strip. Both walkable to the cathedral but feel different.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Grande Île has cathedral, Place Kléber, Petite France. Krutenau has the Vauban Barrage and not much iconic." },
      { question: "Restaurants past 10pm", winner: "b", body: "Krutenau wins. Dense student-quarter food density runs late. Grande Île's restaurants close by 10pm and tilt tourist-priced." },
      { question: "Walkability to cathedral", winner: "a", body: "Grande Île is at the cathedral. Krutenau is 10-15 min walk via the bridge." },
      { question: "Price", winner: "b", body: "Krutenau 25-35% cheaper than Grande Île for equivalent product." },
      { question: "Atmosphere", winner: "tied", body: "Grande Île is tourist-cliché. Krutenau is lived-in-student. Pick on what you want." },
    ],
    pickA: "Pick Grande Île for first-time visits, sights focus, Christmas-market visits.",
    pickB: "Pick Krutenau for repeat visits, food-focused stays, longer trips, budget-conscious travelers.",
    bottomLine: "Grande Île for sights. Krutenau for food and value.",
  },
  // TOULOUSE
  {
    slug: "capitole-vs-saint-cyprien",
    citySlug: "toulouse", countrySlug: "france",
    aSlug: "capitole-carmes", bSlug: "saint-cyprien",
    aLabel: "Capitole / Carmes", bLabel: "Saint-Cyprien",
    metaTitle: "Capitole vs Saint-Cyprien: Where to Stay in Toulouse",
    metaDescription: "Toulouse's central Capitole or the across-Garonne Saint-Cyprien? Real take on food, walkability and price.",
    intro: "Capitole/Carmes is the central pink-brick core. Saint-Cyprien is across the Garonne — lively, cheaper, where younger Toulousains actually go for dinner. Walkable in 10 min.",
    rounds: [
      { question: "Walkability to Place du Capitole", winner: "a", body: "Capitole/Carmes is at the square. Saint-Cyprien is 10 min walk via the Pont Neuf." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both dense. Capitole has tourist-priced central; Saint-Cyprien has cheaper local-food density." },
      { question: "Atmosphere", winner: "tied", body: "Capitole is tourist-historic-shopping. Saint-Cyprien is lived-in-local. Both feel Toulouse." },
      { question: "Quiet sleep", winner: "tied", body: "Both have weekend bar overflow. Side streets in either work." },
      { question: "Price", winner: "b", body: "Saint-Cyprien 15-25% cheaper than Capitole for equivalent product." },
    ],
    pickA: "Pick Capitole for first-time visits, sights-density focus.",
    pickB: "Pick Saint-Cyprien for repeat visits, food-focused trips, longer stays, value.",
    bottomLine: "Capitole for first-timers. Saint-Cyprien for value and locals.",
  },
  // DRESDEN
  {
    slug: "altstadt-dresden-vs-neustadt-dresden",
    citySlug: "dresden", countrySlug: "germany",
    aSlug: "altstadt-dresden", bSlug: "neustadt-dresden",
    aLabel: "Altstadt", bLabel: "Neustadt",
    metaTitle: "Altstadt vs Neustadt: Where to Stay in Dresden",
    metaDescription: "Dresden's rebuilt baroque Altstadt or alternative Neustadt? Real take on sights, food, atmosphere and price.",
    intro: "Altstadt is the rebuilt baroque centre — Frauenkirche, Zwinger, Semperoper. Neustadt is across the Elbe — the alternative-and-bar quarter where Dresden's under-35 crowd actually drinks. Walkable to each other in 10-15 min via Augustusbrücke.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Altstadt wins — Frauenkirche, Zwinger, Semperoper, all 5-10 min walk. Neustadt has Kunsthof Passage but less iconic." },
      { question: "Restaurants past 10pm", winner: "b", body: "Neustadt wins. Alaunstraße and the area around Martin-Luther-Platz have dense late kitchens. Altstadt's restaurants tilt tourist and close earlier." },
      { question: "Atmosphere", winner: "tied", body: "Altstadt is rebuilt-baroque-tourist. Neustadt is alternative-art-loud. Pick on age and energy." },
      { question: "Quiet sleep", winner: "a", body: "Altstadt residential past 10pm. Neustadt has bar overflow Friday-Saturday until 3am." },
      { question: "Price", winner: "b", body: "Neustadt 15-25% cheaper than Altstadt for equivalent product." },
    ],
    pickA: "Pick Altstadt for first-time visits, sights-focused trips, anyone over 40.",
    pickB: "Pick Neustadt for repeat visits, alternative-Dresden trips, under-35 travelers, food-focused stays.",
    bottomLine: "Altstadt for sights. Neustadt for alternative and food.",
  },
  // FRANKFURT
  {
    slug: "altstadt-innenstadt-vs-sachsenhausen",
    citySlug: "frankfurt", countrySlug: "germany",
    aSlug: "altstadt-innenstadt", bSlug: "sachsenhausen",
    aLabel: "Altstadt / Innenstadt", bLabel: "Sachsenhausen",
    metaTitle: "Altstadt vs Sachsenhausen: Where to Stay in Frankfurt",
    metaDescription: "Frankfurt's central Innenstadt or apple-wine Sachsenhausen? Real take on sights, traditional food, business and price.",
    intro: "Innenstadt is the rebuilt centre — Römerberg, the museums on the Main, walkable to the train station. Sachsenhausen is across the Main — apple-wine taverns, the Museum Embankment, residential streets, the actual Frankfurt evening quarter.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Innenstadt has Römerberg and the financial-district sights. Sachsenhausen has the Museum Embankment (multiple museums)." },
      { question: "Traditional food", winner: "b", body: "Sachsenhausen wins. The apple-wine taverns (Adolf Wagner, Atschel) are the cliché Frankfurt evening. Innenstadt has chains and corporate restaurants." },
      { question: "Walkability to Hauptbahnhof", winner: "a", body: "Innenstadt is 5-10 min walk. Sachsenhausen is 15-20 min via the bridge." },
      { question: "Quiet sleep", winner: "b", body: "Sachsenhausen residential past 11pm. Innenstadt has trade-fair noise during fairs." },
      { question: "Price", winner: "b", body: "Sachsenhausen 15-25% cheaper than Innenstadt for equivalent product. Trade-fair weeks even more." },
    ],
    pickA: "Pick Innenstadt for business stays, single-night transit, anyone needing the train station at the door.",
    pickB: "Pick Sachsenhausen for stays of 2+ nights, traditional-food focus, longer Frankfurt trips, museum-focused itineraries.",
    bottomLine: "Innenstadt for business and transit. Sachsenhausen for traditional Frankfurt evenings.",
  },
  // MARSEILLE
  {
    slug: "le-panier-vs-cours-julien",
    citySlug: "marseille", countrySlug: "france",
    aSlug: "le-panier", bSlug: "cours-julien",
    aLabel: "Le Panier", bLabel: "Cours Julien",
    metaTitle: "Le Panier vs Cours Julien: Where to Stay in Marseille",
    metaDescription: "Marseille's pretty Le Panier or the alternative Cours Julien? Real take on atmosphere, art, food and which fits each trip.",
    intro: "Le Panier is the hill quarter north of the harbor — narrow streets, ateliers, pastel facades. Cours Julien is east of the Vieux Port — alternative quarter with street art, music venues, dense bar scene. Different Marseilles.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Le Panier is pretty-pastel-artisan. Cours Julien is street-art-music-loud. Pick on what kind of evening you want." },
      { question: "Walkability to Vieux Port", winner: "a", body: "Le Panier is 5-10 min walk downhill. Cours Julien is 15-20 min walk east." },
      { question: "Music venues and bars", winner: "b", body: "Cours Julien wins. Live music, dense bars, creative-and-alternative. Le Panier quiets early." },
      { question: "Quiet sleep", winner: "a", body: "Le Panier residential past 10pm. Cours Julien has bar overflow weekends until 2am." },
      { question: "Price", winner: "b", body: "Cours Julien 10-15% cheaper than Le Panier for equivalent product." },
    ],
    pickA: "Pick Le Panier for couples, romantic stays, anyone over 35 wanting calmer evenings with the cliché Marseille atmosphere.",
    pickB: "Pick Cours Julien for music-focused trips, anyone under 35, alternative-art focus.",
    bottomLine: "Le Panier for romance. Cours Julien for music and alt.",
  },
  // LYON
  {
    slug: "presquile-vs-croix-rousse",
    citySlug: "lyon", countrySlug: "france",
    aSlug: "presquile", bSlug: "croix-rousse",
    aLabel: "Presqu'île", bLabel: "Croix-Rousse",
    metaTitle: "Presqu'île vs Croix-Rousse: Where to Stay in Lyon",
    metaDescription: "Lyon's lively Presqu'île or the silk-workers' Croix-Rousse? Real take on food, mobility, atmosphere and price.",
    intro: "Presqu'île is the central peninsula between the Rhône and Saône. Croix-Rousse is the hill quarter just north — historic silk-weaver district, residential, dense local restaurants. The pick is central-walkable vs hill-residential.",
    rounds: [
      { question: "Walkability to Vieux Lyon and the river", winner: "a", body: "Presqu'île is at the centre — both rivers within 5 min. Croix-Rousse is 15-25 min downhill (and an uphill walk back)." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Presqu'île has the bouchon density. Croix-Rousse has neighborhood-bistro density at lower prices." },
      { question: "Mobility", winner: "a", body: "Presqu'île is flat. Croix-Rousse is one of Lyon's steepest neighborhoods." },
      { question: "Atmosphere", winner: "tied", body: "Presqu'île is central-shopping-restaurant. Croix-Rousse is residential-village-feel." },
      { question: "Price", winner: "b", body: "Croix-Rousse 15-25% cheaper than Presqu'île for equivalent product." },
    ],
    pickA: "Pick Presqu'île for first-time visits, food-focused trips, anyone with luggage, central walkability priority.",
    pickB: "Pick Croix-Rousse for repeat visits, longer stays, anyone wanting village-feel Lyon at lower prices.",
    bottomLine: "Presqu'île for first-timers and walkability. Croix-Rousse for village-feel and value.",
  },
  // GHENT
  {
    slug: "patershol-vs-korenmarkt",
    citySlug: "ghent", countrySlug: "belgium",
    aSlug: "patershol", bSlug: "korenmarkt",
    aLabel: "Patershol", bLabel: "Korenmarkt",
    metaTitle: "Patershol vs Korenmarkt: Where to Stay in Ghent",
    metaDescription: "Ghent's medieval Patershol or central Korenmarkt? Real take on tourist crush, food and which fits each trip.",
    intro: "Both are inside Ghent's medieval core. Patershol is the dense narrow-lane quarter east of Sint-Michiels — restaurant-and-bar density, locals' favorite. Korenmarkt sits west — wider square, Belfry tower, denser tourist crush.",
    rounds: [
      { question: "Tourist crush", winner: "a", body: "Patershol is residential past tourists. Korenmarkt has the Belfry/Sint-Niklaas tour-group density mid-day." },
      { question: "Restaurants past 10pm", winner: "a", body: "Patershol wins for late kitchens. Korenmarkt has volume but tourist-priced." },
      { question: "Walkability between sights", winner: "tied", body: "Both 5 min from the iconic Graslei canal. Equivalent." },
      { question: "Atmosphere", winner: "a", body: "Patershol's narrow lanes feel village-medieval. Korenmarkt's wider square feels generic-tourist." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Patershol for any 2+ night stay, food-focused trips, anyone wanting village-medieval atmosphere.",
    pickB: "Pick Korenmarkt only for short single-night stays where central proximity to all sights matters.",
    bottomLine: "Patershol for the trip. Korenmarkt for tactical short-stays.",
  },
  // CAPPADOCIA additional pair (already have Göreme-vs-Uçhisar, Göreme-vs-Ürgüp)
  {
    slug: "fira-vs-imerovigli",
    citySlug: "santorini", countrySlug: "greece",
    aSlug: "fira", bSlug: "imerovigli",
    aLabel: "Fira", bLabel: "Imerovigli",
    metaTitle: "Fira vs Imerovigli: Quietest Caldera Stay in Santorini",
    metaDescription: "Santorini's central Fira or quieter Imerovigli? Real take on transport, view, sleep and price.",
    intro: "Fira is the central transport hub. Imerovigli is on the highest point of the caldera 5 min north — same view, dramatically calmer. The pick is logistics-vs-quiet.",
    rounds: [
      { question: "Caldera view", winner: "tied", body: "Both excellent. Imerovigli is actually the highest point. The view is a wash." },
      { question: "Transport hub", winner: "a", body: "Fira is the bus station. From Imerovigli you take a bus to Fira, then transfer." },
      { question: "Quiet sleep", winner: "b", body: "Imerovigli, decisively. Fira has bar streets near the cable car. Imerovigli is silent past 9pm." },
      { question: "Restaurants and town life", winner: "a", body: "Fira has more density — bigger town. Imerovigli has 3-4 restaurants and feels hotel-only." },
      { question: "Price", winner: "tied", body: "Both €280-€500 for caldera-view product. Equivalent." },
    ],
    pickA: "Pick Fira for budget-conscious visits, day-tripping focus, anyone wanting town life with caldera view.",
    pickB: "Pick Imerovigli for honeymoons, calmer-luxury focus, anyone willing to bus into Fira for variety.",
    bottomLine: "Fira for logistics and town life. Imerovigli for calm luxury.",
  },
);

// =============================================================================
// EXPANSION BATCH 8 — additional cross-pair comparisons in tier-1 cities
// =============================================================================
COMPARISONS.push(
  // PARIS
  {
    slug: "canal-saint-martin-vs-bastille",
    citySlug: "paris", countrySlug: "france",
    aSlug: "canal-saint-martin", bSlug: "bastille",
    aLabel: "Canal Saint-Martin", bLabel: "Bastille",
    metaTitle: "Canal Saint-Martin vs Bastille: Where to Stay in Paris",
    metaDescription: "Paris's lived-in Canal or evening Bastille? Real take on food, atmosphere, walkability and price.",
    intro: "Both are east-Paris alternatives to central Right Bank. Canal Saint-Martin is the 10th-arrondissement design-and-picnic quarter. Bastille is the 11th — restaurant-and-bar dense, lived-in. The pick is canal-design vs evening-density.",
    rounds: [
      { question: "Restaurants past 10pm", winner: "b", body: "Bastille wins. Rue de la Roquette and rue de Charonne are dense with late kitchens. Canal has good restaurants but slightly less density." },
      { question: "Atmosphere", winner: "a", body: "Canal is leafier, picnic-on-the-locks, design shops. Bastille is denser-restaurant-bar." },
      { question: "Walkability to central", winner: "tied", body: "Both 25-30 min walk to Notre-Dame. Equivalent." },
      { question: "Quiet sleep", winner: "a", body: "Canal residential past 11pm. Bastille has weekend bar overflow." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Canal Saint-Martin for design-focused trips, leafier evenings, anyone under 35.",
    pickB: "Pick Bastille for evening-density priority, food-focused trips, anyone wanting the lived-in east-Paris.",
    bottomLine: "Canal for design and quiet. Bastille for evenings.",
  },
  {
    slug: "montorgueil-vs-le-marais",
    citySlug: "paris", countrySlug: "france",
    aSlug: "montorgueil", bSlug: "le-marais",
    aLabel: "Montorgueil", bLabel: "Le Marais",
    metaTitle: "Montorgueil vs Le Marais: Where to Stay in Paris",
    metaDescription: "Paris's pedestrian Montorgueil or design Marais? Real take on food, walkability and price.",
    intro: "Both are central Right-Bank Paris with food density. Montorgueil is the 2nd-arrondissement pedestrian strip — pastries, oysters, walkable to the Louvre. Marais is the design-and-dinner quarter east. Same trip type, different texture.",
    rounds: [
      { question: "Walkability to Louvre", winner: "a", body: "Montorgueil is 8-10 min walk to the Louvre. Marais is 15-20 min." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Montorgueil dense pastry-and-oyster. Marais wider variety with cocktail bars." },
      { question: "Design shopping", winner: "b", body: "Marais wins by definition. Montorgueil has food shops; Marais has fashion-and-design." },
      { question: "Quiet sleep", winner: "tied", body: "Both have weekend bar overflow. Montorgueil street itself runs loud. Side streets in either fine." },
      { question: "Price", winner: "tied", body: "Both €200-€350. Equivalent." },
    ],
    pickA: "Pick Montorgueil for food-focused trips, central Louvre walkability priority.",
    pickB: "Pick Le Marais for design-focused trips, evening cocktails, LGBTQ+-friendly atmosphere.",
    bottomLine: "Montorgueil for food and Louvre. Marais for design and bars.",
  },
  // ROME
  {
    slug: "trastevere-vs-aventino",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "trastevere", bSlug: "aventino",
    aLabel: "Trastevere", bLabel: "Aventino",
    metaTitle: "Trastevere vs Aventino: Where to Stay in Rome",
    metaDescription: "Rome's evening Trastevere or romantic Aventino? Real take on noise, walkability, families and price.",
    intro: "Trastevere is the famous evening quarter. Aventino is the leafy hill south of the Forum — Orange Garden, residential calm, where wealthy Romans actually live. The pick is dinner-density vs leafy-romance.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Trastevere is medieval-evening-cliché. Aventino is leafy-elegant-quiet. Both feel Rome." },
      { question: "Restaurants past 10pm", winner: "a", body: "Trastevere has dense late kitchens. Aventino has 5-6 strong picks but quieter." },
      { question: "Quiet sleep", winner: "b", body: "Aventino, decisively. Residential silence past 10pm. Trastevere has tour-group churn." },
      { question: "Romance", winner: "b", body: "Aventino — the Orange Garden at sunset, Knights of Malta keyhole at dusk." },
      { question: "Price", winner: "a", body: "Trastevere 15-25% cheaper than Aventino for equivalent product." },
    ],
    pickA: "Pick Trastevere for evening-focused trips, food-density priority, anyone under 40.",
    pickB: "Pick Aventino for romantic stays, families, light sleepers, anyone over 50 wanting calmer Rome.",
    bottomLine: "Trastevere for evenings. Aventino for romance and quiet.",
  },
  // LONDON
  {
    slug: "soho-vs-shoreditch",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "soho", bSlug: "shoreditch",
    aLabel: "Soho", bLabel: "Shoreditch",
    metaTitle: "Soho vs Shoreditch: Where to Stay in London",
    metaDescription: "London's central Soho or east-end Shoreditch? Real take on theatre, design, food and price.",
    intro: "Both are evening-focused London bases. Soho is the central West End theatre-and-dinner core. Shoreditch is the east-end creative quarter — design hotels, late kitchens, street art. They serve different trips.",
    rounds: [
      { question: "Theatre access", winner: "a", body: "Soho is at the West End theatres. Shoreditch is 25-35 min by tube." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Soho has Chinatown adjacent and dense cocktail bars. Shoreditch has design-warehouse restaurants and late kitchens." },
      { question: "Atmosphere", winner: "tied", body: "Soho is central-theatre-tourist. Shoreditch is creative-warehouse-design. Pick on what kind of London you want." },
      { question: "Quiet sleep", winner: "tied", body: "Both noisy on weekend. Side streets in either work." },
      { question: "Price", winner: "tied", body: "Both £250-£500. Equivalent at top end." },
    ],
    pickA: "Pick Soho for theatre-focused trips, single-night stays needing central walkability.",
    pickB: "Pick Shoreditch for design-focused trips, longer stays, evening-and-design priority. Tube to West End is 15-20 min.",
    bottomLine: "Soho for theatre. Shoreditch for design.",
  },
  {
    slug: "mayfair-vs-soho",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "mayfair", bSlug: "soho",
    aLabel: "Mayfair", bLabel: "Soho",
    metaTitle: "Mayfair vs Soho: Where to Stay in London",
    metaDescription: "London's luxury Mayfair or lively Soho? Real take on price, atmosphere, families and which suits each trip.",
    intro: "Mayfair is London's luxury core — Bond Street, the grand hotels. Soho is just east — theatre-and-dinner core. Walkable to each other in 5 min but completely different evenings.",
    rounds: [
      { question: "Luxury at top end", winner: "a", body: "Mayfair has Connaught, Claridge's, the Ritz nearby. Soho's hotels are mid-tier boutique." },
      { question: "Restaurants past 10pm", winner: "b", body: "Soho wins for late density. Mayfair tilts upscale-and-formal." },
      { question: "Quiet sleep", winner: "a", body: "Mayfair residential past 11pm. Soho runs loud Thursday-Saturday until 3am." },
      { question: "Family-friendly", winner: "a", body: "Mayfair, decisively. Soho is for adults." },
      { question: "Price", winner: "b", body: "Soho 30-40% cheaper than Mayfair for equivalent product." },
    ],
    pickA: "Pick Mayfair for luxury-focused trips, anniversary stays, families, anyone over 45.",
    pickB: "Pick Soho for theatre-and-dinner focus, anyone under 35, evening-density priority.",
    bottomLine: "Mayfair for luxury and quiet. Soho for evenings.",
  },
  // BERLIN
  {
    slug: "schoneberg-vs-charlottenburg",
    citySlug: "berlin", countrySlug: "germany",
    aSlug: "schoneberg", bSlug: "charlottenburg",
    aLabel: "Schöneberg", bLabel: "Charlottenburg",
    metaTitle: "Schöneberg vs Charlottenburg: Where to Stay in Berlin",
    metaDescription: "Berlin's queer-history Schöneberg or wealthy Charlottenburg? Real take on shopping, atmosphere and price.",
    intro: "Both are West Berlin alternatives. Schöneberg is the queer-history quarter — Nollendorfplatz, Bowie-era. Charlottenburg is the wealthy quarter further west — Kurfürstendamm shopping, the palace. Both calmer than central.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Schöneberg is queer-history-residential. Charlottenburg is wealthy-shopping-old-West-Berlin. Different traditions." },
      { question: "Shopping", winner: "b", body: "Charlottenburg wins by definition — Kurfürstendamm, KaDeWe nearby." },
      { question: "Walkability to Mitte", winner: "a", body: "Schöneberg is 15 min U-Bahn or 25 min walk. Charlottenburg is 25 min U-Bahn — slightly further west." },
      { question: "Price", winner: "a", body: "Schöneberg 10-15% cheaper than Charlottenburg for equivalent product." },
      { question: "LGBTQ+ history", winner: "a", body: "Schöneberg, decisively. The original queer Berlin." },
    ],
    pickA: "Pick Schöneberg for LGBTQ+ trips, history-focused stays, slightly closer to central.",
    pickB: "Pick Charlottenburg for shopping-focused trips, anyone over 50 wanting wealthy West-Berlin.",
    bottomLine: "Schöneberg for queer history. Charlottenburg for shopping.",
  },
  {
    slug: "friedrichshain-vs-prenzlauer-berg",
    citySlug: "berlin", countrySlug: "germany",
    aSlug: "friedrichshain", bSlug: "prenzlauer-berg",
    aLabel: "Friedrichshain", bLabel: "Prenzlauer Berg",
    metaTitle: "Friedrichshain vs Prenzlauer Berg: Where to Stay in Berlin",
    metaDescription: "Berlin's techno Friedrichshain or leafy Prenzlauer Berg? Real take on nightlife, families and price.",
    intro: "Both are East Berlin neighborhoods. Friedrichshain is the techno-and-late-bar quarter (Berghain, RAW Gelände). Prenzlauer Berg is the leafy family-and-brunch quarter (restored Altbau, Mauerpark). Different trips entirely.",
    rounds: [
      { question: "Nightlife", winner: "a", body: "Friedrichshain wins by definition — Berghain queue is 20 min walk. Prenzlauer Berg has wine bars and that's it." },
      { question: "Families", winner: "b", body: "Prenzlauer Berg, decisively. Mauerpark, playgrounds, family-aware. Friedrichshain is for clubbers." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both have density. Friedrichshain leans cheaper-late; P-Berg leans brunchy-restaurant-quality." },
      { question: "Quiet sleep", winner: "b", body: "Prenzlauer Berg residential past 11pm. Friedrichshain has weekend club-overflow noise." },
      { question: "Price", winner: "a", body: "Friedrichshain 15-20% cheaper than Prenzlauer Berg for equivalent product." },
    ],
    pickA: "Pick Friedrichshain for techno-focused trips, anyone under 35, budget-conscious nightlife stays.",
    pickB: "Pick Prenzlauer Berg for families, longer stays, anyone over 35 wanting leafy calm.",
    bottomLine: "Friedrichshain for techno. Prenzlauer Berg for families.",
  },
  // MADRID
  {
    slug: "salamanca-vs-chamberi",
    citySlug: "madrid", countrySlug: "spain",
    aSlug: "salamanca", bSlug: "chamberi",
    aLabel: "Salamanca", bLabel: "Chamberí",
    metaTitle: "Salamanca vs Chamberí: Where to Stay in Madrid",
    metaDescription: "Madrid's wealthy Salamanca or leafy Chamberí? Real take on shopping, food, families and price.",
    intro: "Both are northern Madrid wealthy residential quarters. Salamanca is the designer-shopping quarter east of Retiro. Chamberí is leafy-and-food-focused north of Malasaña. Both calm. Both expensive.",
    rounds: [
      { question: "Shopping", winner: "a", body: "Salamanca wins by definition — Calle Serrano luxury strip." },
      { question: "Restaurants past 10pm", winner: "b", body: "Chamberí wins. Calle Ponzano is the densest restaurant strip in Madrid for under-€80 dinners. Salamanca tilts upscale-formal." },
      { question: "Atmosphere", winner: "tied", body: "Salamanca is designer-shopping-elegant. Chamberí is leafy-residential-food. Both wealthy." },
      { question: "Walkability to Sol/Plaza Mayor", winner: "tied", body: "Both 15-20 min walk south. Equivalent." },
      { question: "Price", winner: "b", body: "Chamberí 10-15% cheaper than Salamanca for equivalent product." },
    ],
    pickA: "Pick Salamanca for shopping-focused trips, luxury stays, anyone over 50.",
    pickB: "Pick Chamberí for food-focused trips, longer stays, anyone over 35 wanting leafy residential with dense restaurants.",
    bottomLine: "Salamanca for shopping. Chamberí for food.",
  },
  // BARCELONA
  {
    slug: "eixample-vs-sant-antoni",
    citySlug: "barcelona", countrySlug: "spain",
    aSlug: "eixample", bSlug: "sant-antoni",
    aLabel: "Eixample", bLabel: "Sant Antoni",
    metaTitle: "Eixample vs Sant Antoni: Where to Stay in Barcelona",
    metaDescription: "Barcelona's Modernisme grid or Sant Antoni market quarter? Real take on architecture, food, walkability and price.",
    intro: "Eixample is the wide-grid Modernisme quarter. Sant Antoni sits west — recently-gentrified market quarter, dense food and design shops. Both walk to Plaça Catalunya in 10-15 min. Different trips.",
    rounds: [
      { question: "Architecture/sights", winner: "a", body: "Eixample wins by definition — Casa Batlló, La Pedrera, Sagrada Família walking." },
      { question: "Restaurants past 10pm", winner: "b", body: "Sant Antoni wins. Tomaquera market area and dense food strips. Eixample tilts business-and-tourist." },
      { question: "Atmosphere", winner: "tied", body: "Eixample is wide-boulevard. Sant Antoni is market-and-design quarter. Pick on what you want." },
      { question: "Walkability to Las Ramblas", winner: "b", body: "Sant Antoni is 5-10 min walk. Eixample 10-15 min." },
      { question: "Price", winner: "b", body: "Sant Antoni 10-20% cheaper than Eixample for equivalent product." },
    ],
    pickA: "Pick Eixample for first-time visits, Gaudí-focused trips, architecture-at-the-door priority.",
    pickB: "Pick Sant Antoni for repeat visits, food-focused stays, longer trips, slightly closer to old town.",
    bottomLine: "Eixample for sights. Sant Antoni for food and value.",
  },
  // VIENNA
  {
    slug: "neubau-vs-mariahilf",
    citySlug: "vienna", countrySlug: "austria",
    aSlug: "neubau", bSlug: "mariahilf-d6",
    aLabel: "Neubau (D7)", bLabel: "Mariahilf (D6)",
    metaTitle: "Neubau vs Mariahilf: Where to Stay in Vienna",
    metaDescription: "Vienna's design District 7 or shopping District 6? Real take on food, atmosphere and which fits each trip.",
    intro: "Both are western Vienna alternatives to District 1. Neubau (D7) is the design-and-cocktail quarter with Spittelberg and the MuseumsQuartier on its eastern edge. Mariahilf (D6) is along Mariahilfer Straße — the main shopping spine. Walkable to each other in 5 min.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Neubau is design-cocktail-bohemian. Mariahilf is shopping-strip-busy. Pick on what you want." },
      { question: "Restaurants past 10pm", winner: "a", body: "Neubau wins. Spittelberg has dense narrow-lane kitchens. Mariahilf has volume but more chains." },
      { question: "Shopping", winner: "b", body: "Mariahilf, decisively. Mariahilfer Straße is Vienna's main shopping spine." },
      { question: "Walkability to Innere Stadt", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Neubau for design-focused trips, food-and-cocktail evenings, repeat Vienna visits.",
    pickB: "Pick Mariahilf for shopping-focused trips, longer stays needing transport access (U3 metro line).",
    bottomLine: "Neubau for design. Mariahilf for shopping.",
  },
  // LISBON
  {
    slug: "alfama-vs-baixa-chiado",
    citySlug: "lisbon", countrySlug: "portugal",
    aSlug: "alfama", bSlug: "baixa-chiado",
    aLabel: "Alfama", bLabel: "Baixa-Chiado",
    metaTitle: "Alfama vs Baixa-Chiado: Where to Stay in Lisbon",
    metaDescription: "Lisbon's hilly Moorish Alfama or flat central Baixa-Chiado? Real take on mobility, food, atmosphere and price.",
    intro: "Alfama is the medieval Moorish quarter east of the castle — narrow stair-streets, fado houses, the cliché photo. Baixa-Chiado is the flat central grid. The pick depends a lot on mobility and what kind of evening you want.",
    rounds: [
      { question: "Mobility", winner: "b", body: "Baixa-Chiado is flat. Alfama is one of Europe's hilliest neighborhoods — stair-streets, no elevators, brutal with luggage." },
      { question: "Atmosphere", winner: "a", body: "Alfama is the postcard — narrow lanes, hanging laundry, fado at night. Baixa is grid-handsome but unremarkable." },
      { question: "Restaurants", winner: "b", body: "Baixa-Chiado has the densest cluster — real kitchens, rooftop bars, daily-price meals. Alfama's fado houses are tourist-priced." },
      { question: "Quiet sleep", winner: "a", body: "Alfama is residential-quiet past 11pm. Baixa-Chiado has bar overflow on weekends." },
      { question: "Tourist crush", winner: "tied", body: "Both crowded mid-day. Alfama tour-groups dissipate by 5pm. Baixa-Chiado sustains foot traffic until late." },
    ],
    pickA: "Pick Alfama for romantic stays, photo-focused trips, return visitors, anyone able to handle steep stairs.",
    pickB: "Pick Baixa-Chiado for first-time visits, anyone with luggage, dinner-focused trips, families with strollers.",
    bottomLine: "Alfama for the photo. Baixa-Chiado for walkability and food.",
  },
  // DUBROVNIK
  {
    slug: "lapad-vs-pile",
    citySlug: "dubrovnik", countrySlug: "croatia",
    aSlug: "lapad", bSlug: "pile",
    aLabel: "Lapad", bLabel: "Pile",
    metaTitle: "Lapad vs Pile: Where to Stay in Dubrovnik",
    metaDescription: "Dubrovnik's beach Lapad or fortress-side Pile? Real take on walls views, swimming, walkability and price.",
    intro: "Both are outside-the-walls alternatives. Lapad is on the leafy peninsula 4 km west — actual beaches, swim-focused. Pile is just outside the Pile Gate — fortress-side hotels with walls views, calmer than inside.",
    rounds: [
      { question: "Beach access", winner: "a", body: "Lapad has Sunset Beach, Lapad Beach, Cava Beach all within 10 min walk. Pile has nothing equivalent." },
      { question: "Walkability to Old Town", winner: "b", body: "Pile is 30 seconds to the gate. Lapad needs bus 6 (15 min) or a 45-min walk." },
      { question: "Walls view", winner: "b", body: "Pile's hillside hotels have the famous walls-view-from-room. Lapad has sea-views (different draw)." },
      { question: "Price", winner: "a", body: "Lapad 10-15% cheaper than Pile for equivalent product." },
      { question: "Family-friendly", winner: "a", body: "Lapad — beach access, calmer evenings, family-aware hotels. Pile is mostly couples-focused boutiques." },
    ],
    pickA: "Pick Lapad for beach-focused trips, families, longer stays, anyone wanting swim-and-Old-Town combination.",
    pickB: "Pick Pile for short stays where Old Town walkability and walls-view are priorities.",
    bottomLine: "Lapad for swim and family. Pile for the view and walkability.",
  },
  // SANTORINI
  {
    slug: "fira-vs-pyrgos",
    citySlug: "santorini", countrySlug: "greece",
    aSlug: "fira", bSlug: "pyrgos",
    aLabel: "Fira", bLabel: "Pyrgos",
    metaTitle: "Fira vs Pyrgos: Where to Stay in Santorini",
    metaDescription: "Santorini's caldera-side Fira or inland village Pyrgos? Real take on view, price, transport and which fits each trip.",
    intro: "Fira is the central caldera-edge town — view, transport hub, restaurants. Pyrgos is the inland village — no caldera view but real Greek-village life, dramatically cheaper. The pick is view-and-tourism vs authentic-and-budget.",
    rounds: [
      { question: "Caldera view", winner: "a", body: "Fira has the famous view. Pyrgos is inland — no view, no compromise on that." },
      { question: "Transport hub", winner: "a", body: "Fira is the central bus station. From Pyrgos every trip starts with a 15-min bus to Fira." },
      { question: "Greek-village authenticity", winner: "b", body: "Pyrgos is a real Greek village locals actually live in. Fira is fully tourist-driven." },
      { question: "Price", winner: "b", body: "Pyrgos 50-60% cheaper than Fira for equivalent product. €80-€140 vs €200-€450." },
      { question: "Restaurants", winner: "a", body: "Fira has volume. Pyrgos has 4-5 strong picks (Selene) but quieter." },
    ],
    pickA: "Pick Fira for first-time visits, anyone wanting caldera view at the door, sights focus.",
    pickB: "Pick Pyrgos for repeat Santorini visitors, budget-conscious trips, anyone wanting authentic village life with a rental car.",
    bottomLine: "Fira for the view. Pyrgos for value and authenticity.",
  },
  // CAPPADOCIA
  {
    slug: "uchisar-vs-goreme",
    citySlug: "cappadocia", countrySlug: "turkey",
    aSlug: "uchisar", bSlug: "goreme",
    aLabel: "Uçhisar", bLabel: "Göreme",
    metaTitle: "Uçhisar vs Göreme: Where to Stay in Cappadocia",
    metaDescription: "Cappadocia's quiet Uçhisar or central Göreme? Real take on balloon launches, restaurants and which fits each trip.",
    intro: "Göreme is the central balloon-launch town — most balloons inflate within 1 km of central hotels. Uçhisar is 5 km west on a dramatic castle-rock ridge — quieter, with arguably the best cave-hotel views.",
    rounds: [
      { question: "Balloon launch zone", winner: "b", body: "Göreme is the launch town. Uçhisar has views of balloons rising over the valley but you're not in the launch zone." },
      { question: "Cave hotel quality at top end", winner: "a", body: "Uçhisar has the highest-end (Argos in Cappadocia, Museum Hotel). Göreme has excellent mid-range." },
      { question: "Restaurants and town life", winner: "b", body: "Göreme has a real main street with 20+ restaurants. Uçhisar has 5-6 and feels village-quiet." },
      { question: "Walkability to museums", winner: "b", body: "Göreme is 1.5 km from the open-air museum. Uçhisar is 4 km — needs a transfer." },
      { question: "Quiet sleep", winner: "a", body: "Uçhisar quieter — Göreme has 5am tour-pickup noise." },
    ],
    pickA: "Pick Uçhisar for honeymoons, view-from-terrace focus, high-end cave hotel.",
    pickB: "Pick Göreme for first-time visits, balloon-launch focus, restaurant variety.",
    bottomLine: "Uçhisar for honeymoons. Göreme for first-timers.",
  },
  // ISTANBUL
  {
    slug: "kadikoy-vs-besiktas",
    citySlug: "istanbul", countrySlug: "turkey",
    aSlug: "kadikoy", bSlug: "besiktas",
    aLabel: "Kadıköy", bLabel: "Beşiktaş",
    metaTitle: "Kadıköy vs Beşiktaş: Where to Stay in Istanbul",
    metaDescription: "Istanbul's Asian-side Kadıköy or European-side Beşiktaş? Real take on local life, food, ferries and price.",
    intro: "Both are non-Sultanahmet, non-Galata Istanbul bases for repeat visitors. Kadıköy is across the Bosphorus on the Asian side — Moda, food markets, real local life. Beşiktaş is on the European side north of Galata — football quarter, Bosphorus ferries up the strait.",
    rounds: [
      { question: "Sights at your door", winner: "tied", body: "Both lack iconic sights. Beşiktaş has Dolmabahçe Palace; Kadıköy has the markets and Moda. Equivalent in non-tourist density." },
      { question: "Food density", winner: "a", body: "Kadıköy wins — Moda's seafood and meyhane-and-fish-market density beats Beşiktaş's." },
      { question: "Walkability to historical core", winner: "b", body: "Beşiktaş is on the European side — 15-20 min via Karaköy. Kadıköy needs a 20-min ferry to the European side." },
      { question: "Atmosphere", winner: "a", body: "Kadıköy is the most-real Istanbul of any guidebook neighborhood. Beşiktaş is residential-football-quarter." },
      { question: "Price", winner: "tied", body: "Both 25-35% cheaper than Sultanahmet. Equivalent to each other." },
    ],
    pickA: "Pick Kadıköy for repeat visits, food-focused trips, anyone wanting real local life.",
    pickB: "Pick Beşiktaş for European-side proximity, Bosphorus-ferry focus, football-fan trips.",
    bottomLine: "Kadıköy for food and local. Beşiktaş for European-side and ferries.",
  },
  // PRAGUE
  {
    slug: "vinohrady-vs-zizkov",
    citySlug: "prague", countrySlug: "czech-republic",
    aSlug: "vinohrady", bSlug: "zizkov",
    aLabel: "Vinohrady", bLabel: "Žižkov",
    metaTitle: "Vinohrady vs Žižkov: Where to Stay in Prague",
    metaDescription: "Prague's leafy Vinohrady or indie-bar Žižkov? Real take on food, families, atmosphere and price.",
    intro: "Both are east-of-centre Prague alternatives to Old Town. Vinohrady is leafy residential — Riegrovy Sady, dense food cluster, family-friendly. Žižkov is east of Vinohrady — the most pubs per capita in Czech Republic, indie-and-cheap. Same trip type, different energy.",
    rounds: [
      { question: "Family-friendly", winner: "a", body: "Vinohrady wins. Riegrovy Sady, leafy residential, family-aware. Žižkov is for adults." },
      { question: "Pub density", winner: "b", body: "Žižkov wins by definition — most pubs per capita anywhere in Czech Republic." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Vinohrady has higher-quality restaurants. Žižkov has cheaper and later." },
      { question: "Walkability to Old Town", winner: "a", body: "Vinohrady is 15 min walk or 10 min tram. Žižkov is 25 min walk or 12 min tram." },
      { question: "Price", winner: "b", body: "Žižkov 20-30% cheaper than Vinohrady for equivalent product." },
    ],
    pickA: "Pick Vinohrady for families, longer stays, anyone over 35 wanting calmer Prague with central proximity.",
    pickB: "Pick Žižkov for budget-conscious trips, beer-focused stays, anyone under 35.",
    bottomLine: "Vinohrady for families. Žižkov for beer and budget.",
  },
);

// =============================================================================
// EXPANSION BATCH 9 — additional cross-pair comparisons
// =============================================================================
COMPARISONS.push(
  // FLORENCE
  {
    slug: "santa-maria-novella-vs-oltrarno",
    citySlug: "florence", countrySlug: "italy",
    aSlug: "santa-maria-novella", bSlug: "oltrarno",
    aLabel: "Santa Maria Novella", bLabel: "Oltrarno",
    metaTitle: "Santa Maria Novella vs Oltrarno: Where to Stay in Florence",
    metaDescription: "Florence's train-side Santa Maria Novella or the Oltrarno Left Bank? Real take on price, atmosphere, food and walkability.",
    intro: "Both are non-Duomo-side bases. Santa Maria Novella is the train-station-adjacent quarter — cheaper hotels, transit logistics, basilica of the same name. Oltrarno is across the Arno — Pitti Palace, Santo Spirito, the artisan-and-evening Florence. Different trips entirely.",
    rounds: [
      { question: "Atmosphere", winner: "b", body: "Oltrarno wins — artisan workshops, Santo Spirito piazza, real Florence neighborhood. Santa Maria Novella is station-adjacent and unromantic." },
      { question: "Walkability to Duomo", winner: "a", body: "Santa Maria Novella is 10 min walk. Oltrarno is 15-20 min via Ponte Vecchio." },
      { question: "Train logistics", winner: "a", body: "Santa Maria Novella is at the train station. Oltrarno needs a 15-20 min walk for Bologna/Rome connections." },
      { question: "Restaurants past 10pm", winner: "b", body: "Oltrarno wins. Santo Spirito and San Frediano have dense neighborhood density. Santa Maria Novella has tourist-and-station restaurants." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Santa Maria Novella only for early-train-out trips or budget-conscious 1-night stays.",
    pickB: "Pick Oltrarno for any 2+ night stay, atmosphere-focused trips, food-and-artisan focus.",
    bottomLine: "Oltrarno, almost always. Santa Maria Novella for tactical short-stays.",
  },
  // MADRID
  {
    slug: "chueca-vs-salamanca",
    citySlug: "madrid", countrySlug: "spain",
    aSlug: "chueca", bSlug: "salamanca",
    aLabel: "Chueca", bLabel: "Salamanca",
    metaTitle: "Chueca vs Salamanca: Where to Stay in Madrid",
    metaDescription: "Madrid's queer-friendly Chueca or wealthy Salamanca? Real take on shopping, food, atmosphere and price.",
    intro: "Both are central Madrid. Chueca is the LGBTQ+-friendly cocktail-and-design quarter just north of Gran Vía. Salamanca is the wealthy designer-shopping quarter east of Retiro. They're walkable to each other in 15 min and serve very different trips.",
    rounds: [
      { question: "Shopping", winner: "b", body: "Salamanca wins by definition — Calle Serrano luxury strip." },
      { question: "Restaurants past 10pm", winner: "a", body: "Chueca wins. The cocktail-and-dinner streets around Hortaleza have late density. Salamanca tilts upscale-formal." },
      { question: "Atmosphere", winner: "tied", body: "Chueca is queer-cocktail-design. Salamanca is wealthy-shopping-elegant. Different trips." },
      { question: "Walkability to Sol", winner: "a", body: "Chueca is 5-10 min walk. Salamanca is 15-20 min." },
      { question: "Price", winner: "a", body: "Chueca 15-20% cheaper than Salamanca for equivalent product." },
    ],
    pickA: "Pick Chueca for cocktail-and-design focus, LGBTQ+ trips, anyone under 40.",
    pickB: "Pick Salamanca for shopping focus, luxury stays, families, anyone over 50.",
    bottomLine: "Chueca for cocktails. Salamanca for shopping.",
  },
  // ATHENS
  {
    slug: "koukaki-vs-pangrati",
    citySlug: "athens", countrySlug: "greece",
    aSlug: "koukaki", bSlug: "pangrati",
    aLabel: "Koukaki", bLabel: "Pangrati",
    metaTitle: "Koukaki vs Pangrati: Where to Stay in Athens",
    metaDescription: "Athens' quiet Koukaki or local Pangrati? Real take on Acropolis access, food, atmosphere and price.",
    intro: "Both are non-tourist Athens bases for repeat visitors. Koukaki sits south of the Acropolis — leafy residential, Airbnb-density. Pangrati is east beyond the National Garden — neighborhood-tavernas, real local life. The pick is south-of-Acropolis vs east-of-Garden.",
    rounds: [
      { question: "Walkability to Acropolis", winner: "a", body: "Koukaki is 10 min south. Pangrati is 20-25 min west via the National Garden." },
      { question: "Restaurants past 10pm", winner: "b", body: "Pangrati wins. Real neighborhood-tavernas. Koukaki has fewer picks but quality." },
      { question: "Atmosphere", winner: "tied", body: "Both are leafy residential. Koukaki has more Airbnb tourism; Pangrati has more local Greek life." },
      { question: "Price", winner: "tied", body: "Both 25-30% cheaper than Plaka. Equivalent to each other." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 10pm. Equivalent." },
    ],
    pickA: "Pick Koukaki for Acropolis-focused trips, anyone wanting close access with calm.",
    pickB: "Pick Pangrati for food-focused trips, longer stays, anyone wanting real Athenian life.",
    bottomLine: "Koukaki for Acropolis access. Pangrati for food and locals.",
  },
  // LISBON
  {
    slug: "principe-real-vs-mouraria",
    citySlug: "lisbon", countrySlug: "portugal",
    aSlug: "principe-real", bSlug: "mouraria",
    aLabel: "Príncipe Real", bLabel: "Mouraria",
    metaTitle: "Príncipe Real vs Mouraria: Where to Stay in Lisbon",
    metaDescription: "Lisbon's design Príncipe Real or multicultural Mouraria? Real take on atmosphere, food, mobility and price.",
    intro: "Both are repeat-visitor Lisbon picks. Príncipe Real is north of Bairro Alto — leafy, design-shop, where Lisbon's design crowd lives. Mouraria is the original Moorish quarter east — multicultural, fado, narrow stair-streets. Different Lisbons.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Príncipe Real is design-leafy-wealthy. Mouraria is multicultural-stair-streets. Pick on what you want." },
      { question: "Mobility", winner: "a", body: "Príncipe Real is on a hill but with proper streets. Mouraria is steep stair-streets — brutal with luggage." },
      { question: "Restaurants", winner: "a", body: "Príncipe Real has design restaurants and Embaixada. Mouraria has multicultural variety (Indian, Chinese, fado) but less polish." },
      { question: "Tourist density", winner: "b", body: "Mouraria gets dramatically fewer tourists than Príncipe Real." },
      { question: "Price", winner: "b", body: "Mouraria 20-30% cheaper than Príncipe Real for equivalent product." },
    ],
    pickA: "Pick Príncipe Real for couples, design-focused trips, anyone wanting polished-design Lisbon.",
    pickB: "Pick Mouraria for repeat visits, food-and-fado focus, budget-conscious travelers, anyone able to handle stair-streets.",
    bottomLine: "Príncipe Real for design and polish. Mouraria for value and authenticity.",
  },
  {
    slug: "alfama-vs-bairro-alto-direct",
    citySlug: "lisbon", countrySlug: "portugal",
    aSlug: "mouraria", bSlug: "bairro-alto",
    aLabel: "Mouraria", bLabel: "Bairro Alto",
    metaTitle: "Mouraria vs Bairro Alto: Where to Stay in Lisbon",
    metaDescription: "Lisbon's Mouraria or the bar-quarter Bairro Alto? Real take on atmosphere, sleep, food and which suits each trip.",
    intro: "Both are hill quarters in Lisbon. Mouraria is the Moorish quarter east of the castle — narrow stair-streets, fado, multicultural-quiet. Bairro Alto is west of Chiado on the hill — narrow lanes, dozens of bars. Same hill-difficulty, opposite evening character.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Mouraria is multicultural-fado-residential. Bairro Alto is bar-strip-touristy. Pick on what you want from a night." },
      { question: "Quiet sleep", winner: "a", body: "Mouraria residential past 11pm. Bairro Alto runs loud Thursday-Sunday until 3am — sleep on the main lanes is impossible." },
      { question: "Restaurants past 10pm", winner: "a", body: "Mouraria has multicultural food density. Bairro Alto has bar food and tourist-priced restaurants." },
      { question: "Walkability to Baixa", winner: "tied", body: "Both 10 min downhill walk. Equivalent." },
      { question: "Price", winner: "a", body: "Mouraria 20-30% cheaper than Bairro Alto for equivalent product." },
    ],
    pickA: "Pick Mouraria for repeat visits, food-focused trips, anyone wanting calmer Lisbon evenings.",
    pickB: "Pick Bairro Alto only for under-30 trips where the bar quarter is the point. Bring earplugs.",
    bottomLine: "Mouraria for everything except the bar-trip. Bairro Alto for the bars.",
  },
  // NAPLES
  {
    slug: "chiaia-vs-quartieri-spagnoli",
    citySlug: "naples", countrySlug: "italy",
    aSlug: "chiaia", bSlug: "quartieri-spagnoli",
    aLabel: "Chiaia", bLabel: "Quartieri Spagnoli",
    metaTitle: "Chiaia vs Quartieri Spagnoli: Where to Stay in Naples",
    metaDescription: "Naples' calm Chiaia or chaotic Quartieri Spagnoli? Real take on atmosphere, families, photo and price.",
    intro: "Naples' opposite poles. Chiaia is the calm sea-front Naples — wide streets, design shops, families with prams. Quartieri Spagnoli is the grid west of Via Toledo — Maradona murals, scooter-density, the cliché chaotic Naples.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Chiaia is calm-elegant-residential. Quartieri Spagnoli is chaotic-photogenic-real. Different trips entirely." },
      { question: "Family-friendly", winner: "a", body: "Chiaia, decisively. Villa Comunale park, design shops, calm streets. Quartieri Spagnoli is brutal with kids (motorbikes, narrow lanes)." },
      { question: "Photo cliché", winner: "b", body: "Quartieri Spagnoli wins — Maradona murals, hanging laundry, the cliché Naples photo." },
      { question: "Quiet sleep", winner: "a", body: "Chiaia residential past 11pm. Quartieri Spagnoli has scooter noise until 2am." },
      { question: "Price", winner: "b", body: "Quartieri Spagnoli 25-35% cheaper than Chiaia for equivalent product." },
    ],
    pickA: "Pick Chiaia for families, anyone over 50, light sleepers, calm-Naples focus.",
    pickB: "Pick Quartieri Spagnoli for first-time visits, photographers, anyone under 35 wanting cliché chaotic Naples.",
    bottomLine: "Chiaia for calm. Quartieri Spagnoli for the cliché.",
  },
  // SARAJEVO
  {
    slug: "marijin-dvor-vs-centar",
    citySlug: "sarajevo", countrySlug: "bosnia-and-herzegovina",
    aSlug: "marijin-dvor", bSlug: "centar-sarajevo",
    aLabel: "Marijin Dvor", bLabel: "Centar",
    metaTitle: "Marijin Dvor vs Centar: Where to Stay in Sarajevo",
    metaDescription: "Sarajevo's western Marijin Dvor or central Centar? Real take on history, food, walkability and price.",
    intro: "Both are non-Baščaršija Sarajevo bases. Marijin Dvor is the western Austro-Hungarian quarter — Parliament, National Museum. Centar sits between the bazaar and Marijin Dvor — Ferhadija central pedestrian street. Walkable to each other in 10 min.",
    rounds: [
      { question: "War-history sites", winner: "a", body: "Marijin Dvor wins. Tunnel Museum trams start here, Holiday Inn (Yugoslav-era), the National Museum and Parliament." },
      { question: "Walkability to Baščaršija", winner: "b", body: "Centar is 5 min east. Marijin Dvor is 15-20 min east." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both have Ferhadija-cluster density. Equivalent." },
      { question: "Atmosphere", winner: "tied", body: "Marijin Dvor is calm-residential-historic. Centar is central-pedestrian-walkable. Pick on what you want." },
      { question: "Price", winner: "tied", body: "Both €40-€80 for decent product." },
    ],
    pickA: "Pick Marijin Dvor for war-history-focused trips, calm sleep priority, repeat Sarajevo visits.",
    pickB: "Pick Centar for first-time visits, central walkability, anyone wanting Ferhadija street at the door.",
    bottomLine: "Marijin Dvor for war history. Centar for first-time central walkability.",
  },
  // STOCKHOLM
  {
    slug: "kungsholmen-vs-sodermalm",
    citySlug: "stockholm", countrySlug: "sweden",
    aSlug: "kungsholmen", bSlug: "sodermalm",
    aLabel: "Kungsholmen", bLabel: "Södermalm",
    metaTitle: "Kungsholmen vs Södermalm: Where to Stay in Stockholm",
    metaDescription: "Stockholm's water-front Kungsholmen or creative Söder? Real take on families, food, atmosphere and price.",
    intro: "Both are Stockholm's residential islands. Kungsholmen is west of the central island — water-front walks, leafy residential, Stadshuset (city hall) at its eastern tip. Södermalm is south — bar-and-design hill where most under-40 Stockholmers want to live.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Kungsholmen is leafy-water-front-quiet. Söder is creative-bar-design. Pick on age and energy." },
      { question: "Restaurants past 10pm", winner: "b", body: "Söder wins. Kungsholmen has 5-6 picks; Söder has dense bar-and-restaurant grid." },
      { question: "Family-friendly", winner: "a", body: "Kungsholmen wins. Water-walks, leafy residential, calmer streets. Söder is doable but more adult." },
      { question: "Walkability to Gamla Stan", winner: "b", body: "Söder is 10 min walk via Slussen. Kungsholmen is 15-20 min via the Stadshuset side." },
      { question: "Price", winner: "tied", body: "Both €170-€280 for decent product." },
    ],
    pickA: "Pick Kungsholmen for families, longer stays, water-walk-focused trips.",
    pickB: "Pick Söder for food-and-bar focus, anyone under 40, design-conscious travelers.",
    bottomLine: "Kungsholmen for families and water. Söder for food and creative.",
  },
  // COPENHAGEN
  {
    slug: "christianshavn-vs-vesterbro",
    citySlug: "copenhagen", countrySlug: "denmark",
    aSlug: "christianshavn", bSlug: "vesterbro",
    aLabel: "Christianshavn", bLabel: "Vesterbro",
    metaTitle: "Christianshavn vs Vesterbro: Where to Stay in Copenhagen",
    metaDescription: "Copenhagen's canal Christianshavn or design Vesterbro? Real take on atmosphere, food, families and price.",
    intro: "Both are non-Indre-By Copenhagen bases. Christianshavn is across the harbor — canal-houseboat quarter, design-restaurants. Vesterbro is just west of Central Station — Meatpacking District, dense design hotels. Different trips.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Christianshavn is canal-houseboat-romantic. Vesterbro is converted-warehouse-design. Both feel Copenhagen." },
      { question: "Restaurants past 10pm", winner: "b", body: "Vesterbro wins. Kødbyen (Meatpacking District) has dense design-restaurant cluster. Christianshavn has 5-6 strong picks." },
      { question: "Romance", winner: "a", body: "Christianshavn wins — the canal-houseboat photo. Vesterbro is design-but-gritty in spots." },
      { question: "Walkability to Indre By", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "tied", body: "Both €150-€280." },
    ],
    pickA: "Pick Christianshavn for honeymoons, romantic stays, repeat visits.",
    pickB: "Pick Vesterbro for design-focused trips, food-density priority, train-heavy itineraries.",
    bottomLine: "Christianshavn for romance. Vesterbro for design and food.",
  },
  // EDINBURGH
  {
    slug: "old-town-vs-leith",
    citySlug: "edinburgh", countrySlug: "united-kingdom",
    aSlug: "old-town-edinburgh", bSlug: "leith",
    aLabel: "Old Town", bLabel: "Leith",
    metaTitle: "Old Town vs Leith: Where to Stay in Edinburgh",
    metaDescription: "Edinburgh's medieval Old Town or harborside Leith? Real take on atmosphere, food, walkability and price.",
    intro: "Old Town is the medieval ridge with the castle and Royal Mile. Leith is the harbor quarter 3 km north — recently-gentrified, dense restaurants and bars, the Royal Yacht Britannia. The pick is medieval-tourist vs harborside-cheap.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Old Town wins for atmosphere — castle, closes, Royal Mile. Leith is handsome but ordinary harborside." },
      { question: "Walkability to sights", winner: "a", body: "Old Town is at the sights. Leith is 25 min by tram or bus." },
      { question: "Restaurants past 10pm", winner: "b", body: "Leith wins. The Shore and Constitution Street have dense modern food. Old Town tilts tourist." },
      { question: "Quiet sleep", winner: "b", body: "Leith residential past 11pm. Old Town has bar-overflow and pub-crawl noise." },
      { question: "Price", winner: "b", body: "Leith 30-40% cheaper than Old Town, especially during festival." },
    ],
    pickA: "Pick Old Town for first-time visits, festival stays, atmosphere-focused trips.",
    pickB: "Pick Leith for repeat visits, food-focused trips, budget-conscious stays.",
    bottomLine: "Old Town for atmosphere. Leith for food and value.",
  },
  // MUNICH
  {
    slug: "schwabing-vs-altstadt",
    citySlug: "munich", countrySlug: "germany",
    aSlug: "schwabing", bSlug: "altstadt",
    aLabel: "Schwabing", bLabel: "Altstadt",
    metaTitle: "Schwabing vs Altstadt: Where to Stay in Munich",
    metaDescription: "Munich's leafy Schwabing or central Altstadt? Real take on park access, families, beer-tradition and price.",
    intro: "Altstadt is Munich's central tourist core — Marienplatz, Hofbräuhaus. Schwabing is north — Englischer Garten at the door, leafy student-quarter. Walkable in 15-20 min.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Altstadt has Marienplatz, Frauenkirche, Viktualienmarkt, Hofbräuhaus. Schwabing has Englischer Garten." },
      { question: "Park access", winner: "b", body: "Schwabing wins by definition — the park is at your door." },
      { question: "Family-friendly", winner: "b", body: "Schwabing — playgrounds, park, family-aware restaurants. Altstadt is touristy and crowded." },
      { question: "Beer tradition", winner: "a", body: "Altstadt has Hofbräuhaus and the central beer-hall density." },
      { question: "Price", winner: "b", body: "Schwabing 10-20% cheaper than Altstadt for equivalent product (non-Oktoberfest)." },
    ],
    pickA: "Pick Altstadt for first-time visits, beer-tradition focus, sights-at-the-door priority.",
    pickB: "Pick Schwabing for families, longer stays, park-focused trips, anyone over 35.",
    bottomLine: "Altstadt for sights and beer. Schwabing for families and park.",
  },
  // FLORENCE — Oltrarno vs Sant'Ambrogio
  {
    slug: "oltrarno-vs-santambrogio",
    citySlug: "florence", countrySlug: "italy",
    aSlug: "oltrarno", bSlug: "santambrogio",
    aLabel: "Oltrarno", bLabel: "Sant'Ambrogio",
    metaTitle: "Oltrarno vs Sant'Ambrogio: Where to Stay in Florence",
    metaDescription: "Florence's Left Bank Oltrarno or local Sant'Ambrogio? Real take on food, atmosphere, walkability.",
    intro: "Both are repeat-visitor Florence picks beyond Centro/Santa Croce. Oltrarno is across the Arno around Santo Spirito — artisan workshops, piazza-evenings. Sant'Ambrogio is east of Santa Croce — the food market, neighborhood-trattoria density.",
    rounds: [
      { question: "Walkability to Duomo", winner: "b", body: "Sant'Ambrogio is 5-10 min walk. Oltrarno is 15-20 min via Ponte Vecchio." },
      { question: "Food markets", winner: "b", body: "Sant'Ambrogio wins by definition — the eponymous market is the trip-anchor." },
      { question: "Atmosphere", winner: "tied", body: "Oltrarno is artisan-and-piazza-evening. Sant'Ambrogio is market-and-trattoria. Both feel real Florence." },
      { question: "Quiet sleep", winner: "b", body: "Sant'Ambrogio residential past 10pm. Oltrarno's Santo Spirito has bar overflow weekends." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Oltrarno for evenings-on-piazza focus, artisan-shop wandering, repeat visits.",
    pickB: "Pick Sant'Ambrogio for food-market focus, longer stays, anyone wanting central proximity with locals' Florence.",
    bottomLine: "Oltrarno for evenings. Sant'Ambrogio for food and walkability.",
  },
  // ROME
  {
    slug: "centro-storico-vs-prati",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "centro-storico", bSlug: "prati",
    aLabel: "Centro Storico", bLabel: "Prati",
    metaTitle: "Centro Storico vs Prati: Where to Stay in Rome",
    metaDescription: "Rome's tourist core or Vatican-side Prati? Real take on sights, walkability, families and price.",
    intro: "Centro Storico is the tourist core — Pantheon, Trevi, Piazza Navona. Prati is across the Tiber north of Vatican City — wide grid streets, residential, walkable to St. Peter's. Different trips.",
    rounds: [
      { question: "Walkability to Vatican", winner: "b", body: "Prati wins — St. Peter's is 5-10 min walk. Centro Storico is 25-30 min west." },
      { question: "Walkability to Pantheon/Trevi/Navona", winner: "a", body: "Centro Storico is at all of these. Prati is 25-30 min east." },
      { question: "Family-friendly", winner: "b", body: "Prati wins — calm residential, less tour-group crush, the Cola di Rienzo shopping strip." },
      { question: "Restaurants", winner: "tied", body: "Both have density. Prati has via Cola di Rienzo and wine bars near Castel Sant'Angelo. Centro Storico has volume but mostly tourist-priced." },
      { question: "Price", winner: "b", body: "Prati 20-30% cheaper than Centro Storico for equivalent product." },
    ],
    pickA: "Pick Centro Storico for first-time visits, sights-density focus, anyone willing to pay premium for central walkability.",
    pickB: "Pick Prati for Vatican-focused stays, families, light sleepers, anyone wanting calm with central proximity.",
    bottomLine: "Centro Storico for first-timers. Prati for Vatican focus and quiet.",
  },
  // GALWAY
  {
    slug: "latin-quarter-vs-salthill",
    citySlug: "galway", countrySlug: "ireland",
    aSlug: "latin-quarter-galway", bSlug: "salthill",
    aLabel: "Latin Quarter", bLabel: "Salthill",
    metaTitle: "Latin Quarter vs Salthill: Where to Stay in Galway",
    metaDescription: "Galway's central pub-walk Latin Quarter or seaside Salthill? Real take on atmosphere, families, walkability and price.",
    intro: "Latin Quarter is Galway's central medieval pub-walk quarter — Quay Street, the Spanish Arch, dense pubs. Salthill sits 2 km west along the bay — promenade walks, residential, family-friendly. Walkable in 25-30 min or 8 min bus.",
    rounds: [
      { question: "Pub crawl", winner: "a", body: "Latin Quarter wins by definition. The densest pub strip in the west of Ireland." },
      { question: "Walkability to centre", winner: "a", body: "Latin Quarter is at the centre. Salthill needs the bus or 25-30 min walk." },
      { question: "Family-friendly", winner: "b", body: "Salthill wins. Beach, promenade, family-aware. Latin Quarter is a pub crawl with kids." },
      { question: "Quiet sleep", winner: "b", body: "Salthill residential past 11pm. Latin Quarter has pub-overflow until midnight." },
      { question: "Price", winner: "b", body: "Salthill 15-20% cheaper than Latin Quarter for equivalent product." },
    ],
    pickA: "Pick Latin Quarter for first-time visits, pub-focused trips, anyone under 40.",
    pickB: "Pick Salthill for families, longer stays, anyone over 50 wanting bay-walk-and-beach focus.",
    bottomLine: "Latin Quarter for pubs. Salthill for families and bay.",
  },
  // BARCELONA
  {
    slug: "el-born-vs-poble-sec",
    citySlug: "barcelona", countrySlug: "spain",
    aSlug: "el-born", bSlug: "poble-sec",
    aLabel: "El Born", bLabel: "Poble Sec",
    metaTitle: "El Born vs Poble Sec: Where to Stay in Barcelona",
    metaDescription: "Barcelona's medieval Born or pintxos Poble Sec? Real take on food, atmosphere, walkability and price.",
    intro: "Both are non-Eixample non-Gòtic Barcelona bases. El Born is the medieval lane-quarter east of the Gothic — Picasso Museum, dense restaurants. Poble Sec is south at the foot of Montjuïc — Carrer de Blai pintxos strip, students-and-locals. Different trips.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Born wins on charm — medieval cobblestone, Santa Maria del Mar. Poble Sec is grid-pattern handsome." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Born has medieval-lane density. Poble Sec has Carrer de Blai pintxos density." },
      { question: "Walkability to Las Ramblas", winner: "a", body: "Born is 5 min walk. Poble Sec is 15-20 min." },
      { question: "Price", winner: "b", body: "Poble Sec 25-35% cheaper than Born for equivalent product." },
      { question: "Tourist crush", winner: "b", body: "Born is unwalkable on main lanes mid-day. Poble Sec gets none of this." },
    ],
    pickA: "Pick Born for first-time visits, romantic stays, anyone wanting medieval atmosphere with central proximity.",
    pickB: "Pick Poble Sec for budget-conscious trips, food-focused stays, longer trips, students.",
    bottomLine: "Born for medieval atmosphere. Poble Sec for value and pintxos.",
  },
  // PRAGUE
  {
    slug: "mala-strana-vs-vinohrady",
    citySlug: "prague", countrySlug: "czech-republic",
    aSlug: "mala-strana", bSlug: "vinohrady",
    aLabel: "Malá Strana", bLabel: "Vinohrady",
    metaTitle: "Malá Strana vs Vinohrady: Where to Stay in Prague",
    metaDescription: "Prague's castle-side Malá Strana or leafy Vinohrady? Real take on romance, food, families and price.",
    intro: "Both are quieter Prague alternatives to Old Town. Malá Strana is the castle-foot Lesser Town — UNESCO cobblestone, Lennon Wall. Vinohrady is east of the centre — leafy residential, real restaurants. Different trips.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Malá Strana wins on charm — castle, gardens, narrow lanes. Vinohrady is leafy-residential without the iconic Old-Prague look." },
      { question: "Romance", winner: "a", body: "Malá Strana wins — Charles Bridge at sunrise, Lennon Wall, the gardens. Vinohrady is calm but unromantic." },
      { question: "Family-friendly", winner: "b", body: "Vinohrady wins. Riegrovy Sady, leafy streets, family-aware. Malá Strana is doable but cobbles are stroller hell." },
      { question: "Walkability to Old Town", winner: "a", body: "Malá Strana is 10 min via Charles Bridge. Vinohrady is 15-20 min." },
      { question: "Price", winner: "b", body: "Vinohrady 20-30% cheaper than Malá Strana for equivalent product." },
    ],
    pickA: "Pick Malá Strana for romantic stays, castle-focused trips, first-time visits, photo-focused stays.",
    pickB: "Pick Vinohrady for families, longer stays, anyone wanting leafy calm with central proximity.",
    bottomLine: "Malá Strana for romance. Vinohrady for families.",
  },
  // EDINBURGH — New Town vs Leith
  {
    slug: "new-town-vs-leith",
    citySlug: "edinburgh", countrySlug: "united-kingdom",
    aSlug: "new-town-edinburgh", bSlug: "leith",
    aLabel: "New Town", bLabel: "Leith",
    metaTitle: "New Town vs Leith: Where to Stay in Edinburgh",
    metaDescription: "Edinburgh's Georgian New Town or harborside Leith? Real take on shopping, food, atmosphere and price.",
    intro: "New Town is the Georgian-elegance flagship — Princes Street, the National Gallery, polished restaurants. Leith is the harbor quarter 3 km north — recently-gentrified, dense food and bars, the Royal Yacht Britannia. The pick is shopping-elegant vs harborside-cheaper.",
    rounds: [
      { question: "Walkability to Old Town", winner: "a", body: "New Town is 5-10 min walk to Old Town. Leith is 25 min by tram or bus." },
      { question: "Shopping", winner: "a", body: "New Town wins by definition — Princes Street, George Street." },
      { question: "Restaurants past 10pm", winner: "b", body: "Leith wins. The Shore and Constitution Street have dense modern food and late kitchens. New Town is more bistro-and-business." },
      { question: "Atmosphere", winner: "tied", body: "New Town is Georgian-elegant. Leith is harborside-recently-cool. Pick on what you want." },
      { question: "Price", winner: "b", body: "Leith 30-40% cheaper than New Town, especially during festival." },
    ],
    pickA: "Pick New Town for shopping-focused trips, festival stays needing central walkability, anyone over 40.",
    pickB: "Pick Leith for food-focused trips, repeat visits, budget-conscious travelers.",
    bottomLine: "New Town for shopping and elegance. Leith for food and value.",
  },
);

// =============================================================================
// EXPANSION BATCH 10 — final cross-pair comparisons in tier-1 cities
// =============================================================================
COMPARISONS.push(
  // PARIS
  {
    slug: "belleville-vs-bastille",
    citySlug: "paris", countrySlug: "france",
    aSlug: "belleville", bSlug: "bastille",
    aLabel: "Belleville", bLabel: "Bastille",
    metaTitle: "Belleville vs Bastille: Where to Stay in Paris",
    metaDescription: "Paris's multicultural Belleville or evening Bastille? Real take on food, atmosphere, walkability and price.",
    intro: "Both are east-Paris non-tourist alternatives. Belleville is the 20th — Asian-and-North-African food density, working-class real, where Parisians who can't afford the centre actually live. Bastille is the 11th — restaurant-and-bar dense, lived-in but more polished. Different east-Parises.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Belleville is multicultural-real-cheap. Bastille is restaurant-bar-lived-in. Pick on what you want." },
      { question: "Walkability to central", winner: "b", body: "Bastille is 25-30 min walk to Notre-Dame. Belleville is 30-40 min — further northeast." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Bastille has cocktail-bistro density. Belleville has Asian/North-African density. Equivalent depth, different cuisines." },
      { question: "Quiet sleep", winner: "a", body: "Belleville is residential-real past 11pm. Bastille has weekend bar overflow." },
      { question: "Price", winner: "a", body: "Belleville 30-40% cheaper than Bastille for equivalent product." },
    ],
    pickA: "Pick Belleville for budget-conscious longer stays, food-diversity focus, anyone wanting non-tourist Paris.",
    pickB: "Pick Bastille for evening-focused trips, food-density priority, anyone over 35.",
    bottomLine: "Belleville for value and diversity. Bastille for evenings.",
  },
  // LONDON
  {
    slug: "mayfair-vs-south-kensington",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "mayfair", bSlug: "south-kensington",
    aLabel: "Mayfair", bLabel: "South Kensington",
    metaTitle: "Mayfair vs South Kensington: Where to Stay in London",
    metaDescription: "London's luxury Mayfair or museum-quarter South Ken? Real take on shopping, museums, families and price.",
    intro: "Both are wealthy West London bases. Mayfair is the luxury core — Bond Street, the grand hotels. South Ken is just southwest — V&A, Natural History Museum, Hyde Park edge. Walkable to each other in 15-20 min. Different trips.",
    rounds: [
      { question: "Luxury at top end", winner: "a", body: "Mayfair has Connaught, Claridge's, the Ritz nearby. South Ken has good boutiques but no top-tier flagships." },
      { question: "Family-friendly", winner: "b", body: "South Ken, decisively — three kid-friendly museums, Hyde Park, Princess Diana playground." },
      { question: "Walkability to West End", winner: "a", body: "Mayfair is 5-10 min walk to Soho/Covent Garden. South Ken is 25-30 min by tube." },
      { question: "Quiet sleep", winner: "b", body: "South Ken is residential garden-square calm. Mayfair has central tour-bus noise on Park Lane." },
      { question: "Price", winner: "b", body: "South Ken 25-35% cheaper than Mayfair for equivalent product." },
    ],
    pickA: "Pick Mayfair for luxury-focused trips, theatre-walking-distance priority, anniversary stays.",
    pickB: "Pick South Ken for families with young kids, museum-focused trips, anyone wanting calm with sights at the door.",
    bottomLine: "Mayfair for luxury. South Ken for families and museums.",
  },
  {
    slug: "camden-vs-bloomsbury",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "camden", bSlug: "bloomsbury",
    aLabel: "Camden", bLabel: "Bloomsbury",
    metaTitle: "Camden vs Bloomsbury: Where to Stay in London",
    metaDescription: "London's market-quarter Camden or literary Bloomsbury? Real take on music, sights, families and price.",
    intro: "Both are north of central London. Camden is the market-and-music quarter — buskers, Camden Lock, dense bar strip. Bloomsbury is the literary district closer to Trinity-and-Soho — British Museum, garden squares, university-adjacent.",
    rounds: [
      { question: "Walkability to West End", winner: "b", body: "Bloomsbury is 10-15 min walk to Covent Garden. Camden is 25 min by tube." },
      { question: "Music venues", winner: "a", body: "Camden wins by definition — Roundhouse, Jazz Cafe, Electric Ballroom." },
      { question: "Atmosphere", winner: "tied", body: "Camden is market-music-tourist. Bloomsbury is literary-academic-calm. Different trips." },
      { question: "Family-friendly", winner: "b", body: "Bloomsbury wins. British Museum, garden squares, calmer streets. Camden weekend market is brutal with kids." },
      { question: "Price", winner: "a", body: "Camden 15-25% cheaper than Bloomsbury for equivalent product." },
    ],
    pickA: "Pick Camden for music-focused trips, market visitors, budget-conscious under-30s.",
    pickB: "Pick Bloomsbury for first-time visits, museum-and-theatre trips, families.",
    bottomLine: "Camden for music. Bloomsbury for families and central proximity.",
  },
  // BERLIN
  {
    slug: "kreuzberg-vs-schoneberg",
    citySlug: "berlin", countrySlug: "germany",
    aSlug: "kreuzberg", bSlug: "schoneberg",
    aLabel: "Kreuzberg", bLabel: "Schöneberg",
    metaTitle: "Kreuzberg vs Schöneberg: Where to Stay in Berlin",
    metaDescription: "Berlin's creative Kreuzberg or queer-history Schöneberg? Real take on food, atmosphere and price.",
    intro: "Both are West Berlin alternatives but with different histories. Kreuzberg is the famous Turkish-and-creative quarter. Schöneberg is the queer-history quarter — Nollendorfplatz, original Bowie-era West Berlin, residential calm.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Kreuzberg is dense-Turkish-creative. Schöneberg is residential-queer-history. Different histories." },
      { question: "Restaurants past 10pm", winner: "a", body: "Kreuzberg wins for variety and density. Schöneberg has 5-6 strong picks but quieter overall." },
      { question: "Quiet sleep", winner: "b", body: "Schöneberg residential past 11pm. Kreuzberg has bar streets that run loud." },
      { question: "Walkability to Mitte", winner: "tied", body: "Both 25-30 min walk or 15 min U-Bahn. Equivalent." },
      { question: "Price", winner: "tied", body: "Both €120-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Kreuzberg for food-focused trips, creative-Berlin focus, anyone under 40.",
    pickB: "Pick Schöneberg for LGBTQ+ trips, history-focused stays, light sleepers.",
    bottomLine: "Kreuzberg for food and creative. Schöneberg for queer history and calm.",
  },
  // ROME
  {
    slug: "trastevere-vs-prati",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "trastevere", bSlug: "prati",
    aLabel: "Trastevere", bLabel: "Prati",
    metaTitle: "Trastevere vs Prati: Where to Stay in Rome",
    metaDescription: "Rome's evening Trastevere or Vatican-side Prati? Real take on tourist crush, families and price.",
    intro: "Both are non-Centro-Storico Rome alternatives. Trastevere is the famous evening quarter across the Tiber. Prati is north of Vatican City — wide grid streets, residential, walkable to St. Peter's. Different rivers, different trips.",
    rounds: [
      { question: "Walkability to Vatican", winner: "b", body: "Prati is 5-10 min from St. Peter's. Trastevere is 30+ min — opposite side of the Tiber." },
      { question: "Walkability to ancient Rome", winner: "a", body: "Trastevere is 25 min walk to the Forum. Prati is 30+ min." },
      { question: "Atmosphere", winner: "a", body: "Trastevere is medieval-evening-cliché. Prati is grid-residential-Milan-feeling." },
      { question: "Quiet sleep", winner: "b", body: "Prati residential past 11pm. Trastevere has weekend tour-group churn." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Trastevere for evening-focused trips, anyone wanting the iconic medieval Rome feel.",
    pickB: "Pick Prati for Vatican-focused stays, families, light sleepers.",
    bottomLine: "Trastevere for evenings. Prati for Vatican focus and quiet.",
  },
  // MADRID
  {
    slug: "chamberi-vs-la-latina",
    citySlug: "madrid", countrySlug: "spain",
    aSlug: "chamberi", bSlug: "la-latina",
    aLabel: "Chamberí", bLabel: "La Latina",
    metaTitle: "Chamberí vs La Latina: Where to Stay in Madrid",
    metaDescription: "Madrid's leafy Chamberí or tapas La Latina? Real take on food, atmosphere, families and price.",
    intro: "Both are non-Sol Madrid bases. Chamberí is leafy-residential north of Malasaña — Calle Ponzano restaurants, where well-off Madrileños actually live. La Latina is south of Plaza Mayor — Cava Baja tapas crawl, Sunday Rastro market.",
    rounds: [
      { question: "Tapas crawl", winner: "b", body: "La Latina wins by definition. Cava Baja and Cava Alta on Sunday afternoon." },
      { question: "Restaurants quality", winner: "a", body: "Chamberí's Ponzano strip wins for restaurant-quality. La Latina is more bar-and-tapas." },
      { question: "Atmosphere", winner: "tied", body: "Chamberí is leafy-residential-restaurant. La Latina is medieval-tapas-Sunday. Different trips." },
      { question: "Walkability to Sol", winner: "b", body: "La Latina is 10-15 min walk. Chamberí is 15-20 min north." },
      { question: "Price", winner: "b", body: "La Latina 10-15% cheaper than Chamberí for equivalent product." },
    ],
    pickA: "Pick Chamberí for restaurant-focused trips, families, longer stays, anyone over 35.",
    pickB: "Pick La Latina for tapas-and-Sunday-Rastro focus, anyone wanting cliché Sunday-vermouth Madrid.",
    bottomLine: "Chamberí for restaurants. La Latina for tapas tradition.",
  },
  // STOCKHOLM
  {
    slug: "ostermalm-vs-vasastan",
    citySlug: "stockholm", countrySlug: "sweden",
    aSlug: "ostermalm", bSlug: "vasastan",
    aLabel: "Östermalm", bLabel: "Vasastan",
    metaTitle: "Östermalm vs Vasastan: Where to Stay in Stockholm",
    metaDescription: "Stockholm's wealthy Östermalm or leafy Vasastan? Real take on shopping, families and price.",
    intro: "Both are wealthy north Stockholm. Östermalm is the central designer-shopping quarter (Stureplan, Östermalmstorg). Vasastan is just northwest — leafy residential, Odenplan dinner cluster. Walkable to each other in 10-15 min.",
    rounds: [
      { question: "Shopping", winner: "a", body: "Östermalm wins — designer flagship strip." },
      { question: "Family-friendly", winner: "b", body: "Vasastan wins. Vasaparken, calmer streets, family-aware. Östermalm is for adults." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both have dense restaurant clusters. Östermalm tilts upscale; Vasastan more casual." },
      { question: "Walkability to Gamla Stan", winner: "tied", body: "Both 15-20 min walk south. Equivalent." },
      { question: "Price", winner: "b", body: "Vasastan 15-25% cheaper than Östermalm for equivalent product." },
    ],
    pickA: "Pick Östermalm for shopping-focused trips, luxury stays, anyone over 50.",
    pickB: "Pick Vasastan for families, longer stays, anyone over 35 wanting leafier residential.",
    bottomLine: "Östermalm for shopping. Vasastan for families.",
  },
  // COPENHAGEN
  {
    slug: "christianshavn-vs-frederiksberg",
    citySlug: "copenhagen", countrySlug: "denmark",
    aSlug: "christianshavn", bSlug: "frederiksberg",
    aLabel: "Christianshavn", bLabel: "Frederiksberg",
    metaTitle: "Christianshavn vs Frederiksberg: Where to Stay in Copenhagen",
    metaDescription: "Copenhagen's canal Christianshavn or wealthy Frederiksberg? Real take on romance, families and price.",
    intro: "Both are non-Indre-By Copenhagen alternatives. Christianshavn is across the harbor — canal-houseboat quarter, design-restaurants. Frederiksberg is west — leafy wealthy residential, Frederiksberg Have park.",
    rounds: [
      { question: "Romance", winner: "a", body: "Christianshavn wins — canal-houseboat photo. Frederiksberg is wealthy-leafy but unromantic." },
      { question: "Family-friendly", winner: "b", body: "Frederiksberg wins. Park, Zoo nearby, family-aware. Christianshavn is for couples." },
      { question: "Walkability to Indre By", winner: "a", body: "Christianshavn is 10 min walk via the bridge. Frederiksberg is 15-20 min east." },
      { question: "Restaurants past 10pm", winner: "a", body: "Christianshavn has design-restaurant cluster. Frederiksberg has 5-6 strong picks but quieter." },
      { question: "Price", winner: "tied", body: "Both €150-€280 for decent product. Equivalent." },
    ],
    pickA: "Pick Christianshavn for honeymoons, romantic stays, repeat visits.",
    pickB: "Pick Frederiksberg for families, longer stays, anyone over 40 wanting wealthy-leafy residential.",
    bottomLine: "Christianshavn for romance. Frederiksberg for families.",
  },
  // MUNICH
  {
    slug: "maxvorstadt-vs-glockenbach",
    citySlug: "munich", countrySlug: "germany",
    aSlug: "maxvorstadt", bSlug: "glockenbachviertel",
    aLabel: "Maxvorstadt", bLabel: "Glockenbachviertel",
    metaTitle: "Maxvorstadt vs Glockenbach: Where to Stay in Munich",
    metaDescription: "Munich's museum Maxvorstadt or queer Glockenbach? Real take on food, families and price.",
    intro: "Both are non-Altstadt Munich alternatives. Maxvorstadt is the museum-and-university quarter north of Altstadt. Glockenbachviertel is south — Munich's queer-friendly cocktail-and-dinner quarter. Different trips.",
    rounds: [
      { question: "Museum access", winner: "a", body: "Maxvorstadt wins — Alte/Neue/Pinakothek der Moderne all walkable." },
      { question: "Restaurants past 10pm", winner: "b", body: "Glockenbach wins. Hans-Sachs-Straße runs late and dense. Maxvorstadt has student-quarter density but quieter." },
      { question: "Atmosphere", winner: "tied", body: "Maxvorstadt is academic-museum. Glockenbach is queer-cocktail. Different trips." },
      { question: "Walkability to Altstadt", winner: "tied", body: "Both 10-15 min walk. Equivalent." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Maxvorstadt for museum-focused trips, longer stays, repeat Munich visits.",
    pickB: "Pick Glockenbach for evening-focused trips, LGBTQ+ travelers, anyone under 40.",
    bottomLine: "Maxvorstadt for museums. Glockenbach for evenings.",
  },
  // NAPLES
  {
    slug: "vomero-vs-quartieri-spagnoli",
    citySlug: "naples", countrySlug: "italy",
    aSlug: "vomero", bSlug: "quartieri-spagnoli",
    aLabel: "Vomero", bLabel: "Quartieri Spagnoli",
    metaTitle: "Vomero vs Quartieri Spagnoli: Where to Stay in Naples",
    metaDescription: "Naples' elegant hill Vomero or chaotic Quartieri Spagnoli? Real take on atmosphere, families and price.",
    intro: "Both are alternatives to central Naples. Vomero is the elegant residential hill above Chiaia — Castel Sant'Elmo, calm streets. Quartieri Spagnoli is the grid west of Via Toledo — Maradona murals, scooter-density, the cliché chaotic Naples.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Vomero is elegant-residential-hill. Quartieri Spagnoli is chaotic-photogenic-real. Opposite Naples." },
      { question: "Family-friendly", winner: "a", body: "Vomero, decisively. Calm streets, residential. Quartieri Spagnoli is brutal with kids." },
      { question: "Walkability to centro", winner: "b", body: "Quartieri Spagnoli is 5-10 min walk to centro. Vomero needs the funicular (15 min total)." },
      { question: "Photo cliché", winner: "b", body: "Quartieri Spagnoli wins — Maradona murals, hanging laundry." },
      { question: "Price", winner: "a", body: "Vomero 10-15% cheaper than Quartieri Spagnoli for equivalent product." },
    ],
    pickA: "Pick Vomero for families, longer stays, anyone over 50 wanting elegant-residential Naples.",
    pickB: "Pick Quartieri Spagnoli for first-time chaos focus, photographers, anyone under 35.",
    bottomLine: "Vomero for families. Quartieri Spagnoli for the cliché.",
  },
  // LISBON
  {
    slug: "belem-vs-baixa-chiado",
    citySlug: "lisbon", countrySlug: "portugal",
    aSlug: "belem", bSlug: "baixa-chiado",
    aLabel: "Belém", bLabel: "Baixa-Chiado",
    metaTitle: "Belém vs Baixa-Chiado: Where to Stay in Lisbon",
    metaDescription: "Lisbon's museum Belém or central Baixa-Chiado? Real take on transport, museums, families and price.",
    intro: "Belém is the maritime quarter 6 km west of central Lisbon — Jerónimos Monastery, Tower of Belém, the original pastel de nata. Baixa-Chiado is the flat central grid. The pick is museum-focus vs central-walkability.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Baixa-Chiado wins — central Lisbon at your door. Belém has Jerónimos and Torre but you'd visit those during the day anyway." },
      { question: "Transport", winner: "a", body: "Baixa-Chiado is at the central transport hub. Belém needs 25 min by tram from central." },
      { question: "Museum focus", winner: "b", body: "Belém wins for museum-focused stays — MAAT, Jerónimos, Tower of Belém all at the door." },
      { question: "Family-friendly", winner: "b", body: "Belém wins — flat residential, river-park, kid-friendly museums, less crowded." },
      { question: "Price", winner: "b", body: "Belém 15-25% cheaper than Baixa-Chiado for equivalent product." },
    ],
    pickA: "Pick Baixa-Chiado for first-time visits, central-walkability priority, anyone with luggage.",
    pickB: "Pick Belém for museum-focused stays, families, longer trips, anyone willing to take the tram for nightlife.",
    bottomLine: "Baixa-Chiado for first-timers. Belém for museums and families.",
  },
  // ATHENS
  {
    slug: "pangrati-vs-petralona",
    citySlug: "athens", countrySlug: "greece",
    aSlug: "pangrati", bSlug: "petralona",
    aLabel: "Pangrati", bLabel: "Petralona",
    metaTitle: "Pangrati vs Petralona: Where to Stay in Athens",
    metaDescription: "Athens' east Pangrati or southwest Petralona? Real take on Acropolis access, food, atmosphere.",
    intro: "Both are leafy non-tourist Athens bases. Pangrati is east of Plaka beyond the National Garden. Petralona is southwest at the foot of Filopappou Hill. Both 15-20 min walk to the Acropolis from different directions. Local-favorite picks.",
    rounds: [
      { question: "Walkability to Acropolis", winner: "tied", body: "Both 15-20 min walk. Pangrati via the National Garden; Petralona via Filopappou. Equivalent." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both have neighborhood-tavernas at local prices. Pangrati slightly more variety." },
      { question: "Atmosphere", winner: "tied", body: "Both leafy residential. Pangrati is east-side-wealthy. Petralona is hill-foot-residential. Pick on direction preference." },
      { question: "Walkability to Plaka", winner: "a", body: "Pangrati is 15 min walk through the Garden. Petralona is 20-25 min via Thissio." },
      { question: "Price", winner: "tied", body: "Both 25-35% cheaper than Plaka. Equivalent to each other." },
    ],
    pickA: "Pick Pangrati for east-side National-Garden access, slightly more restaurant variety.",
    pickB: "Pick Petralona for southwest hill-foot setting, Filopappou access, slightly cheaper apartments.",
    bottomLine: "Both excellent. Pangrati for east-side; Petralona for hill-foot.",
  },
  // ZURICH additional
  {
    slug: "niederdorf-vs-enge",
    citySlug: "zurich", countrySlug: "switzerland",
    aSlug: "niederdorf", bSlug: "enge",
    aLabel: "Niederdorf", bLabel: "Enge / Wollishofen",
    metaTitle: "Niederdorf vs Enge: Where to Stay in Zurich",
    metaDescription: "Zurich's medieval Niederdorf or lakeside Enge? Real take on atmosphere, families, lake-walks and price.",
    intro: "Both are non-business Zurich. Niederdorf is the medieval right-bank quarter. Enge is south along the lake's western shore — leafy wealthy residential, lake-walks. Pick on atmosphere preference.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Niederdorf is medieval-cobblestone-old-town. Enge is wealthy-leafy-lake-residential." },
      { question: "Lake walks", winner: "b", body: "Enge wins by definition — lakeside walks at the door." },
      { question: "Walkability to centre", winner: "a", body: "Niederdorf is at the centre. Enge needs 15-min tram or lake-walk into Bahnhofstrasse." },
      { question: "Family-friendly", winner: "b", body: "Enge wins. Quiet residential, lake-park access, family-aware." },
      { question: "Price", winner: "b", body: "Enge 10-20% cheaper than Niederdorf for equivalent product. Both Switzerland-expensive." },
    ],
    pickA: "Pick Niederdorf for first-time visits, sights-density priority, medieval atmosphere.",
    pickB: "Pick Enge for families, longer stays, lake-walk-focused trips, anyone over 50.",
    bottomLine: "Niederdorf for atmosphere. Enge for lake and families.",
  },
  // BLED
  {
    slug: "bled-lakefront-vs-bled-village",
    citySlug: "bled", countrySlug: "slovenia",
    aSlug: "bled-lakefront", bSlug: "bled-village",
    aLabel: "Lakefront", bLabel: "Village",
    metaTitle: "Lakefront vs Village: Where to Stay in Bled",
    metaDescription: "Bled's lakefront luxury or village-side budget? Real take on view, walkability, families and price.",
    intro: "Bled has a small set of accommodation options. The lakefront is the postcard view position. The village is just inland — calmer, dramatically cheaper, walkable to the lake in 5 min.",
    rounds: [
      { question: "Lake view", winner: "a", body: "Lakefront wins by definition — the postcard view from your hotel window." },
      { question: "Walkability to lake", winner: "tied", body: "Both 5-10 min walk to the water. Equivalent for daytime." },
      { question: "Atmosphere", winner: "a", body: "Lakefront is luxury-and-tourist. Village is residential-and-real. Pick on what you want." },
      { question: "Family-friendly", winner: "b", body: "Village wins — quieter, cheaper, family-aware accommodation." },
      { question: "Price", winner: "b", body: "Village 30-40% cheaper than Lakefront for equivalent product." },
    ],
    pickA: "Pick Lakefront for honeymoons, photo-focused short stays, anyone willing to pay premium for the view.",
    pickB: "Pick Village for families, longer stays, budget-conscious travelers. The 5-min walk to the lake is part of the trip.",
    bottomLine: "Lakefront for the view. Village for families and value.",
  },
);

// =============================================================================
// EXPANSION BATCH 11 — final cross-pairs to cross 3000 sitemap URLs
// =============================================================================
COMPARISONS.push(
  // HAMBURG
  {
    slug: "sternschanze-vs-hafencity",
    citySlug: "hamburg", countrySlug: "germany",
    aSlug: "sternschanze", bSlug: "hafencity",
    aLabel: "Sternschanze", bLabel: "HafenCity",
    metaTitle: "Sternschanze vs HafenCity: Where to Stay in Hamburg",
    metaDescription: "Hamburg's creative Sternschanze or modern HafenCity? Real take on atmosphere, food, families and price.",
    intro: "Sternschanze is the punk-leftist creative quarter — graffiti, vegan döner, dense food density. HafenCity is the new harbor-side district — Elbphilharmonie, glass-and-steel architecture, polished modern. Different Hamburgs.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Sternschanze is gritty-creative-leftist. HafenCity is polished-modern-architecture. Pick on what you want." },
      { question: "Restaurants past 10pm", winner: "a", body: "Sternschanze wins. Schulterblatt and Susannenstraße are dense late kitchens. HafenCity has 5-6 strong picks but quieter." },
      { question: "Family-friendly", winner: "b", body: "HafenCity wins — modern, walkable, family-aware. Sternschanze is for adults." },
      { question: "Walkability to centre", winner: "tied", body: "Both 15-20 min walk. Equivalent." },
      { question: "Price", winner: "a", body: "Sternschanze 15-25% cheaper than HafenCity for equivalent product." },
    ],
    pickA: "Pick Sternschanze for food-and-creative focus, anyone under 40, evening-density priority.",
    pickB: "Pick HafenCity for families, design-focused trips, anyone wanting modern Hamburg.",
    bottomLine: "Sternschanze for food and creative. HafenCity for design and families.",
  },
  {
    slug: "st-pauli-vs-hafencity",
    citySlug: "hamburg", countrySlug: "germany",
    aSlug: "st-pauli", bSlug: "hafencity",
    aLabel: "St. Pauli", bLabel: "HafenCity",
    metaTitle: "St. Pauli vs HafenCity: Where to Stay in Hamburg",
    metaDescription: "Hamburg's Reeperbahn St. Pauli or modern HafenCity? Real take on noise, families, atmosphere and price.",
    intro: "St. Pauli is the Reeperbahn-and-music quarter — sex shops, music venues, FC St. Pauli. HafenCity is the new harbor-side district — Elbphilharmonie, modern-polished. Walkable to each other in 10-15 min.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "St. Pauli is rowdy-music-Reeperbahn. HafenCity is polished-modern. Opposite trips." },
      { question: "Music venues", winner: "a", body: "St. Pauli wins by definition — Beatles tour starts here." },
      { question: "Family-friendly", winner: "b", body: "HafenCity, decisively. St. Pauli is inappropriate for kids on weekends." },
      { question: "Quiet sleep", winner: "b", body: "HafenCity residential past 11pm. St. Pauli runs loud Friday-Saturday until 5am." },
      { question: "Price", winner: "a", body: "St. Pauli 15-25% cheaper than HafenCity for equivalent product." },
    ],
    pickA: "Pick St. Pauli for music-focused trips, anyone under 35, Reeperbahn-experience priority.",
    pickB: "Pick HafenCity for families, light sleepers, design-focused trips.",
    bottomLine: "St. Pauli for music. HafenCity for families and quiet.",
  },
  // LUXEMBOURG
  {
    slug: "ville-haute-vs-grund",
    citySlug: "luxembourg-city", countrySlug: "luxembourg",
    aSlug: "ville-haute", bSlug: "grund",
    aLabel: "Ville Haute", bLabel: "Grund",
    metaTitle: "Ville Haute vs Grund: Where to Stay in Luxembourg City",
    metaDescription: "Luxembourg's upper Ville Haute or lower Grund? Real take on walkability, atmosphere and price.",
    intro: "Luxembourg City is dramatically built on cliffs above two river valleys. Ville Haute is the polished upper town — central walkability, designer shopping. Grund is the lower town along the river — atmospheric, with the panoramic elevator (or steep walks) connecting them.",
    rounds: [
      { question: "Atmosphere", winner: "b", body: "Grund is medieval-river-valley. Ville Haute is polished-business-tourist. Pick on what you want." },
      { question: "Walkability to sights", winner: "a", body: "Ville Haute is at the central sights. Grund needs the panoramic elevator or 15-min steep walk." },
      { question: "Restaurants past 10pm", winner: "a", body: "Ville Haute has central density. Grund has 5-6 strong picks but quieter." },
      { question: "Family-friendly", winner: "a", body: "Ville Haute is flatter and more accessible. Grund's elevation difference is brutal with strollers." },
      { question: "Price", winner: "tied", body: "Both expensive — Luxembourg is Luxembourg. Equivalent." },
    ],
    pickA: "Pick Ville Haute for first-time visits, central walkability priority, families.",
    pickB: "Pick Grund for romantic stays, photographers, anyone willing to handle the elevation difference.",
    bottomLine: "Ville Haute for first-timers and walkability. Grund for atmosphere.",
  },
  // BRNO
  {
    slug: "stred-vs-veveri",
    citySlug: "brno", countrySlug: "czech-republic",
    aSlug: "stred", bSlug: "veveri",
    aLabel: "Střed", bLabel: "Veveří",
    metaTitle: "Střed vs Veveří: Where to Stay in Brno",
    metaDescription: "Brno's central Střed or student-quarter Veveří? Real take on atmosphere, food and price.",
    intro: "Both are central Brno bases. Střed is the central old town — Náměstí Svobody, the cathedral, walkable to everything. Veveří is west — student quarter near the university, dense cafe-and-pub strip, lived-in.",
    rounds: [
      { question: "Walkability to Náměstí Svobody", winner: "a", body: "Střed is at the square. Veveří is 10-15 min walk." },
      { question: "Restaurants past 10pm", winner: "b", body: "Veveří wins — student-quarter density runs late. Střed has tourist-priced central restaurants." },
      { question: "Atmosphere", winner: "tied", body: "Střed is tourist-historic. Veveří is student-and-lived-in. Pick on what you want." },
      { question: "Quiet sleep", winner: "tied", body: "Both quiet past 11pm. Equivalent." },
      { question: "Price", winner: "b", body: "Veveří 20-30% cheaper than Střed for equivalent product." },
    ],
    pickA: "Pick Střed for first-time visits, sights focus, anyone over 35.",
    pickB: "Pick Veveří for longer stays, food-focused trips, anyone under 35 wanting student-quarter density.",
    bottomLine: "Střed for first-timers. Veveří for value and food.",
  },
  // DUBROVNIK
  {
    slug: "lapad-vs-ploce",
    citySlug: "dubrovnik", countrySlug: "croatia",
    aSlug: "lapad", bSlug: "ploce",
    aLabel: "Lapad", bLabel: "Ploče",
    metaTitle: "Lapad vs Ploče: Where to Stay in Dubrovnik",
    metaDescription: "Dubrovnik's beach Lapad or elegant Ploče? Real take on swimming, walkability, romance and price.",
    intro: "Both are outside-the-walls Dubrovnik options. Lapad is on the leafy peninsula 4 km west — actual beaches, swim-focused, family-friendly. Ploče is just east of the Pile Gate — elegant peninsula with walls views, boutique hotels.",
    rounds: [
      { question: "Beach access", winner: "a", body: "Lapad has Sunset Beach, Lapad Beach within walking. Ploče has Banje Beach (small)." },
      { question: "Walkability to Old Town", winner: "b", body: "Ploče is 5-10 min walk via the Pile Gate. Lapad needs bus 6 (15 min) or 45-min walk." },
      { question: "Walls view", winner: "b", body: "Ploče's hillside hotels have the famous walls-view-from-room. Lapad has sea-views." },
      { question: "Family-friendly", winner: "a", body: "Lapad wins — beaches, calmer, family-aware hotels. Ploče is mostly couples-focused." },
      { question: "Price", winner: "a", body: "Lapad 10-20% cheaper than Ploče for equivalent product." },
    ],
    pickA: "Pick Lapad for beach-focused trips, families, longer stays, swim-and-Old-Town combination.",
    pickB: "Pick Ploče for short stays where walls-view and Old Town walkability are priorities.",
    bottomLine: "Lapad for swim and family. Ploče for view and walkability.",
  },
  // SPLIT
  {
    slug: "veli-varos-vs-manus",
    citySlug: "split", countrySlug: "croatia",
    aSlug: "veli-varos", bSlug: "manus",
    aLabel: "Veli Varoš", bLabel: "Manuš",
    metaTitle: "Veli Varoš vs Manuš: Where to Stay in Split",
    metaDescription: "Split's western Veli Varoš or eastern Manuš? Real take on atmosphere, walkability and price.",
    intro: "Both are old-Split alternatives just outside Diocletian's Palace. Veli Varoš is west — narrow stone lanes, the gateway to Marjan hill. Manuš is east — also stone, slightly quieter, walkable to ferries.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Both feel old Split with narrow stone lanes. Veli Varoš has Marjan-hill setting; Manuš is plainer residential." },
      { question: "Marjan hill access", winner: "a", body: "Veli Varoš wins by definition — the trailhead is 5 min away." },
      { question: "Walkability to Riva", winner: "tied", body: "Both 5-10 min walk. Equivalent." },
      { question: "Restaurants past 10pm", winner: "a", body: "Veli Varoš has Konoba Matejuška and a few strong picks. Manuš has 3-4 picks." },
      { question: "Price", winner: "tied", body: "Both 15-20% cheaper than Diocletian's Palace. Equivalent to each other." },
    ],
    pickA: "Pick Veli Varoš for hiking-focused trips up Marjan, atmosphere-focused stays.",
    pickB: "Pick Manuš for budget-conscious longer stays, anyone wanting calmer residential.",
    bottomLine: "Veli Varoš for Marjan and atmosphere. Manuš for value and quiet.",
  },
  // LONDON
  {
    slug: "notting-hill-vs-marylebone",
    citySlug: "london", countrySlug: "united-kingdom",
    aSlug: "notting-hill", bSlug: "marylebone",
    aLabel: "Notting Hill", bLabel: "Marylebone",
    metaTitle: "Notting Hill vs Marylebone: Where to Stay in London",
    metaDescription: "London's pastel-mews Notting Hill or village Marylebone? Real take on shopping, families, walkability and price.",
    intro: "Both are quieter West London bases for couples and families. Notting Hill is West London's pastel-mews quarter with Portobello market. Marylebone is closer to Oxford Street — village-feeling, Regent's Park-adjacent.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Notting Hill wins on charm — pastel houses, mews, the iconic London-village photo." },
      { question: "Walkability to Oxford Street / West End", winner: "b", body: "Marylebone is 5-10 min walk to Oxford Street. Notting Hill is 25 min by tube." },
      { question: "Saturday market", winner: "a", body: "Notting Hill — Portobello market is at your door Saturday." },
      { question: "Family-friendly", winner: "tied", body: "Both work. Marylebone has Regent's Park access. Notting Hill has Holland Park." },
      { question: "Price", winner: "tied", body: "Both £250-£500 for decent product. Equivalent." },
    ],
    pickA: "Pick Notting Hill for romantic trips, weekend market focus, photo-focused stays.",
    pickB: "Pick Marylebone for shopping focus, longer stays, central walkability priority.",
    bottomLine: "Notting Hill for the photo. Marylebone for shopping and central proximity.",
  },
  // STOCKHOLM
  {
    slug: "vasastan-vs-norrmalm",
    citySlug: "stockholm", countrySlug: "sweden",
    aSlug: "vasastan", bSlug: "norrmalm",
    aLabel: "Vasastan", bLabel: "Norrmalm",
    metaTitle: "Vasastan vs Norrmalm: Where to Stay in Stockholm",
    metaDescription: "Stockholm's leafy Vasastan or central Norrmalm? Real take on transport, food, families and price.",
    intro: "Both are central Stockholm. Vasastan is northwest — leafy residential, Odenplan dinner cluster. Norrmalm is the central business core with the train station. The pick is leafy-residential vs business-central.",
    rounds: [
      { question: "Transport hub", winner: "b", body: "Norrmalm wins by definition — T-Centralen, Arlanda Express." },
      { question: "Restaurants past 10pm", winner: "a", body: "Vasastan wins. Odenplan has neighborhood restaurant density. Norrmalm has chains and tourist-restaurant strips." },
      { question: "Family-friendly", winner: "a", body: "Vasastan wins — leafy, calmer streets, Vasaparken. Norrmalm is generic-business-grid." },
      { question: "Walkability to Gamla Stan", winner: "tied", body: "Both 15-20 min walk. Equivalent." },
      { question: "Price", winner: "a", body: "Vasastan 10-20% cheaper than Norrmalm for equivalent product, especially for non-chain hotels." },
    ],
    pickA: "Pick Vasastan for families, longer stays, food-focused trips, calmer residential.",
    pickB: "Pick Norrmalm only for tactical short business stays needing station logistics.",
    bottomLine: "Vasastan, almost always. Norrmalm only for tactical transport-first.",
  },
  // ATHENS — Plaka vs Exarcheia
  {
    slug: "plaka-vs-exarcheia",
    citySlug: "athens", countrySlug: "greece",
    aSlug: "plaka", bSlug: "exarcheia",
    aLabel: "Plaka", bLabel: "Exarcheia",
    metaTitle: "Plaka vs Exarcheia: Where to Stay in Athens",
    metaDescription: "Athens' tourist Plaka or anarchist Exarcheia? Real take on tourist crush, atmosphere, safety and price.",
    intro: "Plaka is the famous tourist quarter. Exarcheia is north of Syntagma — anarchist-political quarter, dense bookshops, late-night bars, gritty in spots. The pick is tourist-cliché vs raw-political.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Plaka is whitewashed-tourist. Exarcheia is anarchist-bookshop-bar. Opposite Athens." },
      { question: "Walkability to Acropolis", winner: "a", body: "Plaka is at the Acropolis. Exarcheia is 25-30 min south." },
      { question: "Safety perception", winner: "a", body: "Plaka feels safe and polished. Exarcheia has anarchist graffiti, occasional protest activity, drug-paraphernalia visible — comfortable for many but not all." },
      { question: "Price", winner: "b", body: "Exarcheia 30-40% cheaper than Plaka for equivalent product." },
      { question: "Tourist crush", winner: "b", body: "Plaka becomes nearly unwalkable mid-day. Exarcheia gets none." },
    ],
    pickA: "Pick Plaka for first-time visits, sights focus, anyone over 50, anyone uncomfortable with grit.",
    pickB: "Pick Exarcheia for repeat visits, solo travelers comfortable with rough edges, raw-political-Athens focus.",
    bottomLine: "Plaka for first-timers. Exarcheia for repeat visits comfortable with grit.",
  },
  // BARCELONA
  {
    slug: "gracia-vs-poble-sec",
    citySlug: "barcelona", countrySlug: "spain",
    aSlug: "gracia", bSlug: "poble-sec",
    aLabel: "Gràcia", bLabel: "Poble Sec",
    metaTitle: "Gràcia vs Poble Sec: Where to Stay in Barcelona",
    metaDescription: "Barcelona's village-feeling Gràcia or pintxos Poble Sec? Real take on food, atmosphere, walkability and price.",
    intro: "Both are non-tourist Barcelona alternatives. Gràcia is north of Eixample — village-feeling, plaza-life. Poble Sec is south at the foot of Montjuïc — Carrer de Blai pintxos strip, students-and-locals. Different sides.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Gràcia is village-plaza-locals. Poble Sec is foot-of-Montjuïc-pintxos. Pick on side." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Gràcia has plaza-side density. Poble Sec has Carrer de Blai pintxos." },
      { question: "Walkability to old town", winner: "b", body: "Poble Sec is 15-20 min walk to Las Ramblas. Gràcia is 25-30 min south." },
      { question: "Family-friendly", winner: "a", body: "Gràcia wins — plaza-life is family-aware. Poble Sec is more student-and-bar." },
      { question: "Price", winner: "tied", body: "Both 25-30% cheaper than central Barcelona. Equivalent to each other." },
    ],
    pickA: "Pick Gràcia for families, plaza-life focus, anyone over 35.",
    pickB: "Pick Poble Sec for under-35 trips, pintxos focus, slightly closer to old town.",
    bottomLine: "Gràcia for families and plaza. Poble Sec for pintxos and budget.",
  },
  // ROME
  {
    slug: "monti-vs-prati",
    citySlug: "rome", countrySlug: "italy",
    aSlug: "monti", bSlug: "prati",
    aLabel: "Monti", bLabel: "Prati",
    metaTitle: "Monti vs Prati: Where to Stay in Rome",
    metaDescription: "Rome's bohemian Monti or Vatican-side Prati? Real take on ancient Rome, Vatican access, families and price.",
    intro: "Both are non-Centro-Storico Rome alternatives. Monti is east of the Forum — design-and-wine-bar bohemian. Prati is north of Vatican City — wide grid streets, residential, Vatican-walkable.",
    rounds: [
      { question: "Walkability to ancient Rome", winner: "a", body: "Monti is 5 min from the Forum. Prati is 30+ min east." },
      { question: "Walkability to Vatican", winner: "b", body: "Prati wins — St. Peter's 5-10 min. Monti is 30 min west." },
      { question: "Atmosphere", winner: "a", body: "Monti is denser, livelier, design-quarter feel. Prati is grid-residential — feels more Milan than Rome." },
      { question: "Family-friendly", winner: "b", body: "Prati wins — calm residential, less tour-group crush." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product. Equivalent." },
    ],
    pickA: "Pick Monti for atmosphere-focused trips, ancient-Rome focus, anyone wanting bohemian Rome.",
    pickB: "Pick Prati for Vatican-focused stays, families, anyone wanting calm residential.",
    bottomLine: "Monti for ancient Rome and atmosphere. Prati for Vatican.",
  },
  // PARIS — Pigalle vs Bastille
  {
    slug: "pigalle-vs-bastille",
    citySlug: "paris", countrySlug: "france",
    aSlug: "pigalle", bSlug: "bastille",
    aLabel: "Pigalle / SoPi", bLabel: "Bastille",
    metaTitle: "Pigalle vs Bastille: Where to Stay in Paris",
    metaDescription: "Paris's converted Pigalle or evening Bastille? Real take on cocktails, food, atmosphere and price.",
    intro: "Both are non-cliché Paris bases for evenings. Pigalle (SoPi) is south of Montmartre — converted from red-light to cocktail-and-dinner quarter. Bastille is the 11th — restaurant-and-bar dense lived-in. Different evenings.",
    rounds: [
      { question: "Cocktail bars", winner: "a", body: "Pigalle wins — Lulu White, Dirty Dick, the cocktail-strip. Bastille has cocktails but more wine-bistro density." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both excellent. Pigalle has cocktail-cluster. Bastille has rue de la Roquette dense kitchens." },
      { question: "Atmosphere", winner: "tied", body: "Pigalle is converted-Pigalle-cocktail. Bastille is lived-in-east. Pick on what you want." },
      { question: "Walkability to central", winner: "b", body: "Bastille is 25-30 min walk to Notre-Dame. Pigalle is 30-35 min." },
      { question: "Price", winner: "tied", body: "Both €130-€220. Equivalent." },
    ],
    pickA: "Pick Pigalle for cocktail-focused trips, design-conscious travelers.",
    pickB: "Pick Bastille for food-density priority, repeat Paris visits.",
    bottomLine: "Pigalle for cocktails. Bastille for food.",
  },
  // REYKJAVÍK
  {
    slug: "reykjavik-101-vs-laugardalur",
    citySlug: "reykjavik", countrySlug: "iceland",
    aSlug: "101-reykjavik", bSlug: "laugardalur",
    aLabel: "101 Reykjavík", bLabel: "Laugardalur",
    metaTitle: "101 Reykjavík vs Laugardalur: Where to Stay in Reykjavík",
    metaDescription: "Reykjavík's central 101 or pool-valley Laugardalur? Real take on dinners, families and price.",
    intro: "101 is the central downtown — Hallgrímskirkja, Harpa, dense restaurants and bars. Laugardalur is east — geothermal pool, family park, dramatically cheaper. The pick is dinner-focus vs family-and-pool.",
    rounds: [
      { question: "Restaurants past 9pm", winner: "a", body: "101 wins by definition — every Reykjavík dinner happens here." },
      { question: "Family-friendly", winner: "b", body: "Laugardalur wins — pool, park, family-aware. 101 is for adults." },
      { question: "Walkability to centre", winner: "a", body: "101 is the centre. Laugardalur is 25 min walk or 10 min bus." },
      { question: "Geothermal pool", winner: "b", body: "Laugardalur — Laugardalslaug is the city's main pool, walkable from any Laugardalur address." },
      { question: "Price", winner: "b", body: "Laugardalur 25-35% cheaper than 101 for equivalent product." },
    ],
    pickA: "Pick 101 for dinner-focused stays, anyone wanting central walkability.",
    pickB: "Pick Laugardalur for families with rental cars, longer stays, budget-conscious travelers.",
    bottomLine: "101 for dinner. Laugardalur for families and value.",
  },
  // ZAGREB additional pair within same nbhds — done already, skip
  // Try Tbilisi: nope, no Georgia coverage
  // CRACOW already covered
  // BUCHAREST
  {
    slug: "lipscani-vs-dorobanti",
    citySlug: "bucharest", countrySlug: "romania",
    aSlug: "lipscani", bSlug: "dorobanti",
    aLabel: "Lipscani", bLabel: "Dorobanți",
    metaTitle: "Lipscani vs Dorobanți: Where to Stay in Bucharest",
    metaDescription: "Bucharest's old-town Lipscani or wealthy Dorobanți? Real take on atmosphere, food, families and price.",
    intro: "Lipscani is Bucharest's Old Town — walkable, lively, historical-but-touristy. Dorobanți is north of central — embassy quarter, dense restaurants, where wealthy Bucharestians actually live.",
    rounds: [
      { question: "Atmosphere", winner: "tied", body: "Lipscani is medieval-tourist-lively. Dorobanți is wealthy-residential-restaurant. Different trips." },
      { question: "Restaurants past 10pm", winner: "tied", body: "Both dense. Lipscani has tourist-priced; Dorobanți has high-end residential." },
      { question: "Walkability to sights", winner: "a", body: "Lipscani is at the centre. Dorobanți needs Uber or 25-min walk." },
      { question: "Family-friendly", winner: "b", body: "Dorobanți wins — calmer, residential, family-aware. Lipscani has weekend bar overflow." },
      { question: "Price", winner: "tied", body: "Both reasonable for Eastern Europe. Equivalent at top end." },
    ],
    pickA: "Pick Lipscani for first-time visits, sights focus, anyone under 40.",
    pickB: "Pick Dorobanți for business stays, families, longer trips, anyone over 40.",
    bottomLine: "Lipscani for first-timers. Dorobanți for business and quiet.",
  },
  // EDINBURGH — Old Town vs Stockbridge
  {
    slug: "old-town-vs-stockbridge",
    citySlug: "edinburgh", countrySlug: "united-kingdom",
    aSlug: "old-town-edinburgh", bSlug: "stockbridge",
    aLabel: "Old Town", bLabel: "Stockbridge",
    metaTitle: "Old Town vs Stockbridge: Where to Stay in Edinburgh",
    metaDescription: "Edinburgh's medieval Old Town or village Stockbridge? Real take on atmosphere, families and festival.",
    intro: "Old Town is the medieval ridge with the castle. Stockbridge is the village-feeling residential quarter north of New Town — Sunday farmers' market, Royal Botanic Garden. Different Edinburgh trips.",
    rounds: [
      { question: "Atmosphere", winner: "a", body: "Old Town wins — medieval Royal Mile, castle, closes. Stockbridge is village-residential, calm." },
      { question: "Family-friendly", winner: "b", body: "Stockbridge wins. Botanic Garden, calmer streets, family-aware. Old Town crowds and steep cobbles are stroller-hostile." },
      { question: "Walkability to sights", winner: "a", body: "Old Town is at the sights. Stockbridge is 15-20 min walk south." },
      { question: "Festival access", winner: "a", body: "Old Town venues are at your door during Fringe." },
      { question: "Price", winner: "b", body: "Stockbridge 15-25% cheaper than Old Town, especially during festival." },
    ],
    pickA: "Pick Old Town for first-time visits, festival stays, anyone wanting medieval atmosphere.",
    pickB: "Pick Stockbridge for families, longer stays, anyone wanting Edinburgh village-feel.",
    bottomLine: "Old Town for atmosphere. Stockbridge for families and value.",
  },
  // Munich — Maxvorstadt vs Schwabing
  {
    slug: "maxvorstadt-vs-schwabing",
    citySlug: "munich", countrySlug: "germany",
    aSlug: "maxvorstadt", bSlug: "schwabing",
    aLabel: "Maxvorstadt", bLabel: "Schwabing",
    metaTitle: "Maxvorstadt vs Schwabing: Where to Stay in Munich",
    metaDescription: "Munich's museum Maxvorstadt or park-side Schwabing? Real take on museums, families and price.",
    intro: "Both are northern Munich alternatives. Maxvorstadt is the museum-and-university quarter. Schwabing is north — Englischer Garten at the door, leafy student-quarter. Walkable to each other in 10-15 min.",
    rounds: [
      { question: "Museum access", winner: "a", body: "Maxvorstadt wins — Pinakotheken cluster." },
      { question: "Park access", winner: "b", body: "Schwabing wins by definition — Englischer Garten." },
      { question: "Family-friendly", winner: "b", body: "Schwabing wins. Park, playgrounds, family-aware." },
      { question: "Restaurants past 10pm", winner: "a", body: "Maxvorstadt has student-quarter density. Schwabing closes earlier." },
      { question: "Walkability to Altstadt", winner: "a", body: "Maxvorstadt is 10-15 min. Schwabing is 15-20 min." },
    ],
    pickA: "Pick Maxvorstadt for museum-focused trips, food-density priority, repeat Munich visits.",
    pickB: "Pick Schwabing for families, park-focused trips, longer stays.",
    bottomLine: "Maxvorstadt for museums. Schwabing for park and family.",
  },
  // Florence — Santa Maria Novella vs San Frediano
  {
    slug: "santa-maria-novella-vs-san-frediano",
    citySlug: "florence", countrySlug: "italy",
    aSlug: "santa-maria-novella", bSlug: "san-frediano",
    aLabel: "Santa Maria Novella", bLabel: "San Frediano",
    metaTitle: "Santa Maria Novella vs San Frediano: Where to Stay in Florence",
    metaDescription: "Florence's train-side Santa Maria Novella or artisan San Frediano? Real take on transit, atmosphere and price.",
    intro: "Both are non-Centro Florence alternatives. Santa Maria Novella is train-station-adjacent — basilica, transit logistics. San Frediano is across the Arno — artisan-and-wine-bar quarter, the lived-in Oltrarno slice.",
    rounds: [
      { question: "Train logistics", winner: "a", body: "Santa Maria Novella is at the train station. San Frediano is 20 min walk." },
      { question: "Atmosphere", winner: "b", body: "San Frediano wins — leather workshops, dense wine bars, real artisan-Florence." },
      { question: "Restaurants past 10pm", winner: "b", body: "San Frediano has dense neighborhood food. Santa Maria Novella is mostly tourist-and-transit restaurants." },
      { question: "Walkability to Duomo", winner: "a", body: "Santa Maria Novella is 10 min walk. San Frediano is 15-20 min via Ponte Vecchio." },
      { question: "Price", winner: "tied", body: "Both €130-€220 for decent product." },
    ],
    pickA: "Pick Santa Maria Novella only for very early-train-out trips.",
    pickB: "Pick San Frediano for any 2+ night stay focused on atmosphere and food.",
    bottomLine: "San Frediano, almost always.",
  },
  // MALAGA
  {
    slug: "centro-historico-malaga-vs-soho-malaga",
    citySlug: "malaga", countrySlug: "spain",
    aSlug: "centro-historico-malaga", bSlug: "soho-malaga",
    aLabel: "Centro Histórico", bLabel: "Soho",
    metaTitle: "Centro Histórico vs Soho: Where to Stay in Málaga",
    metaDescription: "Málaga's old town or design Soho? Real take on sights, food, atmosphere and price.",
    intro: "Centro Histórico is Málaga's old town — Picasso Museum, cathedral, dense pedestrian streets. Soho is the formerly-industrial design quarter just south — converted-warehouse cocktail bars, street art. Walkable in 10 min.",
    rounds: [
      { question: "Sights at your door", winner: "a", body: "Centro Histórico has Picasso Museum, cathedral, Alcazaba. Soho has the Centre Pompidou Málaga and street art." },
      { question: "Restaurants past 10pm", winner: "b", body: "Soho has dense converted-warehouse cocktail-and-dinner cluster. Centro Histórico has tourist-priced." },
      { question: "Atmosphere", winner: "tied", body: "Centro Histórico is medieval-tourist. Soho is design-warehouse. Different trips." },
      { question: "Walkability to beach", winner: "tied", body: "Both 10-15 min walk to La Malagueta beach. Equivalent." },
      { question: "Price", winner: "b", body: "Soho 15-25% cheaper than Centro Histórico for equivalent product." },
    ],
    pickA: "Pick Centro Histórico for first-time visits, museum-focused trips, anyone over 40.",
    pickB: "Pick Soho for design-focused trips, evening cocktails, anyone under 40.",
    bottomLine: "Centro Histórico for sights. Soho for design and food.",
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

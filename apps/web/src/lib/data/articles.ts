// apps/web/src/lib/data/articles.ts
//
// Cornerstone evergreen articles. These cross-link into city/neighborhood pages
// and capture long-tail "or" / "vs" / "by trip type" / "off-season" queries that
// individual city pages can't.

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  reviewedAt: string;  // ISO date — freshness signal
  readingTimeMin: number;
  metaTitle: string;
  metaDescription: string;
  /** HTML content. Hand-written, not auto-translated. */
  html: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "where-to-stay-in-paris-by-arrondissement",
    title: "Where to Stay in Paris: The Arrondissement Decision Tree",
    excerpt: "Paris has 20 arrondissements and most travelers pick the wrong one. Here is how to choose by trip type, budget, and what you actually want from the city.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 9,
    metaTitle: "Where to Stay in Paris by Arrondissement — Honest Decision Tree",
    metaDescription: "An honest, opinionated guide to choosing the right Paris arrondissement by trip type. Marais, Saint-Germain, Latin Quarter, Montmartre, Bastille, the 7th — pros, cons, who should skip.",
    html: `
<p>Paris is the European city where the difference between a great trip and a mediocre one is which arrondissement you sleep in. Get it right and the city feels yours. Get it wrong and you spend an extra hour a day on the metro and never quite figure out why everyone's so romantic about Paris.</p>

<p>The 20 arrondissements spiral outward from the Louvre like a snail. The lower the number, the more central, the more touristy, the more expensive. Here is how to actually pick.</p>

<h2>Start with the question: what is this trip about?</h2>

<p>Almost every Paris trip is one of five archetypes. Pick yours first; the arrondissement follows.</p>

<h3>"It's our first time and we want to walk to everything"</h3>

<p>Stay in the <strong>4th (Marais)</strong> or the <strong>1st (around the Louvre)</strong>. The Marais is the better answer for almost everyone — restaurants are denser, the streets are more interesting, and you can walk to Notre-Dame, the Louvre, the Centre Pompidou, the Picasso Museum, and Place des Vosges all inside 15 minutes. The 1st is theatrical and central but feels emptier in the evenings.</p>

<p>Skip the 1st if you want any local life at all after 9pm. Skip the Marais if you are a light sleeper — the bar streets (Rue Vieille du Temple, Rue des Archives) stay loud until 2am most nights.</p>

<h3>"We're here for the postcard romance — Eiffel Tower, Seine, the whole thing"</h3>

<p>Stay in the <strong>7th</strong>. This is the arrondissement that contains the Eiffel Tower, the Musée d'Orsay, Les Invalides, and Rue Cler. It's quiet, residential, expensive, and slightly dull — which for a 4-day romantic trip is exactly what you want. You'll have the Champ de Mars at sunrise.</p>

<p>Skip the 7th if your trip is more than 5 days. By day three you'll be tired of how quiet it gets after 10pm.</p>

<h3>"I want the Paris I see in films — cafes, books, intellectual energy"</h3>

<p>Stay in the <strong>6th (Saint-Germain-des-Prés)</strong> or the <strong>5th (Latin Quarter)</strong>. The 6th is more polished, more expensive, more grown-up. The 5th is more student-coded, more chaotic, more fun in your 20s. Both put you on the Left Bank, walking distance to the Luxembourg Gardens and the Seine.</p>

<p>Skip the 5th if you want quiet — Rue Mouffetard runs noisy until late. Skip the 6th if you are on a budget; this is among the most expensive central districts.</p>

<h3>"It's our second trip and we want the Paris locals actually live in"</h3>

<p>Stay in the <strong>11th (Bastille / Oberkampf)</strong> or the <strong>10th (Canal Saint-Martin)</strong>. These are where Parisians under 40 actually go out. The 11th is restaurant-dense; the 10th is the canal-walking, brunch-spot district. You'll be on the metro to most major sights, but you'll also have a real neighborhood you can come back to.</p>

<p>Skip these if your trip is short and museum-heavy — you'll lose 30+ minutes a day in transit.</p>

<h3>"I want the iconic, distinct, village-inside-the-city stay"</h3>

<p>Stay in the <strong>18th (Montmartre)</strong>. Hilly, atmospheric, the postcard view from Sacré-Cœur, the painters' square. It is genuinely a different neighborhood than the rest of Paris and you'll feel that.</p>

<p>Skip Montmartre if you have a heavy suitcase, mobility issues, or no patience for tourist density during the day. The funicular only solves part of the climb. Pickpocketing around the basilica is real.</p>

<h2>Three arrondissements that look like a deal and aren't</h2>

<p><strong>The 9th near Pigalle</strong> often comes up cheap on Booking. The northern half is fine; the southern half (Boulevard de Clichy) is loud, neon, and full of strip clubs.</p>

<p><strong>Anything advertised as "near Gare du Nord"</strong> is the 10th around the train stations. Convenient if you have a 6am Eurostar. Otherwise grim, particularly after dark.</p>

<p><strong>The 19th and 20th</strong> are residential and cheap, but you'll be 35-45 minutes by metro to most central sights. Worth it for a long stay; punishing for a 3-day trip.</p>

<h2>The simple version</h2>

<p>If you only remember one thing: <strong>4th (Marais) for first-timers, 11th (Bastille) for repeat visitors, 7th for the Eiffel-Tower trip, 6th for the romance.</strong> Almost everyone fits one of those four buckets.</p>

<p>For per-neighborhood deep dives, see the individual guides for <a href="/en/france/paris/le-marais">Le Marais</a>, <a href="/en/france/paris/saint-germain-des-pres">Saint-Germain-des-Prés</a>, <a href="/en/france/paris/latin-quarter">the Latin Quarter</a>, <a href="/en/france/paris/montmartre">Montmartre</a>, and <a href="/en/france/paris/bastille">Bastille</a>.</p>
    `.trim(),
  },

  {
    slug: "why-train-station-hotels-are-usually-a-mistake",
    title: "Why Hotels Near the Train Station Are Usually a Mistake",
    excerpt: "Booking.com sorts by 'distance to city center' and many travelers proxy that with 'near the main station.' That's almost always the wrong call.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 6,
    metaTitle: "Why Train-Station Hotels Are Usually a Mistake (Europe)",
    metaDescription: "The pattern that catches first-time European travelers: train stations look 'central' on a map but the surrounding neighborhoods are usually the worst stays in the city. Here's the rule and the exceptions.",
    html: `
<p>Open Booking.com for any major European city. Sort by "distance to city center." You'll see a cluster of cheap-looking hotels near the main train station. They look central — they ARE central, geographically — and they're $40-60 less than comparable hotels two metro stops away.</p>

<p>Almost without exception, those hotels are a mistake. Here's why.</p>

<h2>Train stations attract bad neighborhood economics</h2>

<p>European train stations were built in the late 1800s and the neighborhoods around them have spent 150 years adapting to a constant inflow and outflow of strangers. That produces a specific kind of urban texture: cheap chain hotels, kebab shops, currency exchanges, fluorescent-lit pharmacies, and a non-trivial street-drug and sex-work presence. Locals don't live there if they can help it. Locals don't eat there. Locals don't drink there.</p>

<p>The result: a neighborhood that's geographically central but socially peripheral. Your hotel is "5 minutes from the center" on a map, but the 5 minutes between your front door and anything good are the 5 minutes you least want to walk after dark.</p>

<h2>Specific examples</h2>

<ul>
<li><strong>Paris — Gare du Nord</strong>: The benchmark bad station-hotel area. Loud, scammy, surrounded by cheap chains, sketchy after dark.</li>
<li><strong>Brussels — Gare du Midi / Bruxelles-Midi</strong>: The Eurostar terminus and the area you most want to leave the moment you step out. Stay in Saint-Gilles or Ixelles instead.</li>
<li><strong>Barcelona — Sants Estació</strong>: 15 minutes by metro from anything you came to Barcelona for. The neighborhood around the station is residential and dull.</li>
<li><strong>Rome — Termini</strong>: The cluster of hotels here is the largest in central Rome and consistently the worst-reviewed. Neighborhood is grim. The metro from Termini to anywhere good takes 10+ minutes anyway.</li>
<li><strong>Madrid — Atocha</strong>: Newer than most, less grim than Termini, but still surrounded by chain hotels and tourist-trap restaurants. Stay in Malasaña or La Latina.</li>
<li><strong>London — Paddington / King's Cross / Euston</strong>: All three terminals are bad central neighborhoods. King's Cross has improved significantly since 2010 (Coal Drops Yard, Granary Square) but the immediately-adjacent hotels are still grim.</li>
</ul>

<h2>The exception: when you SHOULD stay near the station</h2>

<p>There are exactly three scenarios where a station hotel is the right call:</p>

<ol>
<li><strong>Very early or very late train.</strong> If you're catching a 5:45am Eurostar, a hotel two minutes from the platform is worth the bad neighborhood for one night.</li>
<li><strong>You have multiple cities in one trip.</strong> If you're in Paris for one night between Lyon and London, a station hotel saves transit time. Don't optimize for the neighborhood you'll barely see.</li>
<li><strong>Specific stations that gentrified.</strong> A few European stations sit in actually nice neighborhoods now: <strong>Berlin Hauptbahnhof</strong> (the area around it is sterile but safe), <strong>Vienna Hauptbahnhof</strong> (modern, walkable), <strong>Antwerpen-Centraal</strong> (the station building is so beautiful it dragged the neighborhood up). For these, "near the station" is fine.</li>
</ol>

<h2>What to do instead</h2>

<p>For any trip longer than two nights, ignore Booking's "distance to city center" sort. Pick the neighborhood first, then the hotel inside it. Most cities have a polished central district (Marais in Paris, Eixample in Barcelona, Indre By in Copenhagen) and a lived-in lower-priced district (Bastille, Gracia, Nørrebro respectively). One of those is almost always the right answer.</p>

<p>The €40-60 you save on a station hotel goes directly into a worse trip. €60 across 4 nights is €15 a night. €15 a night is a glass of wine you would drink anyway. Pay the difference, sleep in a real neighborhood.</p>
    `.trim(),
  },

  {
    slug: "europe-in-november-the-honest-off-season-guide",
    title: "Europe in November: The Honest Off-Season Guide",
    excerpt: "November is the most underrated month to travel in Europe — half the prices, a quarter of the crowds. It's also the wettest. Here is which cities win and which to skip.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 7,
    metaTitle: "Europe in November — Which Cities Are Worth It (and Which Aren't)",
    metaDescription: "November is the cheapest month to fly to Europe. But weather and daylight vary wildly across the continent — here is which cities win the off-season trade-off and which are punishing.",
    html: `
<p>November in Europe is a real bargain. Flights from North America are 30-50% off summer prices. Hotels in Paris, Rome, Barcelona drop 25-40%. Museum lines vanish. Restaurants take walk-ins again. The same trip that cost you $5,000 in July costs $3,200 in November.</p>

<p>You also get rain, short days, and in northern Europe a level of darkness that genuinely affects mood. Here is which cities win that trade-off and which don't.</p>

<h2>November winners</h2>

<h3>Lisbon and Porto (Portugal)</h3>

<p>Daytime highs of 16-18°C, sunshine roughly half the days. Lisbon in November is genuinely pleasant — light enough to wear a sweater, warm enough to sit outside for coffee at noon. Hotels are 35-50% off summer rates. Restaurants you couldn't book in May take walk-ins. The food is heavier (caldo verde, stewed cod, port) and matches the season. <a href="/en/portugal/lisbon">Where to stay in Lisbon →</a></p>

<h3>Andalusia (Seville, Granada, Málaga)</h3>

<p>Daytime highs of 18-21°C, almost no rain in some years. Seville in particular is borderline-perfect in November — warm enough for outdoor lunch, cool enough to walk all day, no tourist crowds. The orange trees are still green. The Alhambra in Granada has its smallest crowds of the year. <a href="/en/spain/seville">Where to stay in Seville →</a></p>

<h3>Rome and Naples</h3>

<p>Highs of 15-18°C, more rain than Andalusia but still warm enough for shoulder-season clothing. Rome's tourist density drops by ~60% from summer; you can walk into the Pantheon without queueing. Restaurants in Trastevere take same-day reservations. Naples is the food trip that no one else is doing. <a href="/en/italy/rome">Where to stay in Rome →</a></p>

<h3>Istanbul</h3>

<p>Highs of 14-16°C, the city's best month for walking long days. Istanbul in November is also when locals reclaim the city — Beyoğlu's bars and Kadıköy's markets feel less performative without the cruise crowds. Pack a rain jacket. <a href="/en/turkey/istanbul">Where to stay in Istanbul →</a></p>

<h3>Budapest and Vienna</h3>

<p>The thermal-bath cities. Both peak in November because the cold makes the outdoor pools at Széchenyi (Budapest) and the saunas of Vienna's Therme Wien deeply pleasant. Cafe culture runs indoors and the Christmas markets start opening in the last week of November. <a href="/en/hungary/budapest">Where to stay in Budapest →</a></p>

<h2>November middle ground</h2>

<h3>Paris</h3>

<p>Highs of 9-12°C, a lot of rain, short days (sunset around 5pm by month's end). Paris in November is workable but not beautiful — the trees are bare, the gray skies don't flatter the limestone. Museums and restaurants are excellent without queues. Hotels are 25-35% off summer. Worth it if you have specific museum priorities; skip if you came for the romance. <a href="/en/france/paris">Where to stay in Paris →</a></p>

<h3>London</h3>

<p>Same weather as Paris, slightly worse in some weeks, slightly better in others. London is pub-and-museum coded and both work fine in November. Hotels are 30-40% off summer. Theatre season is at peak. <a href="/en/united-kingdom/london">Where to stay in London →</a></p>

<h3>Berlin</h3>

<p>Highs of 6-9°C, gray, often wet. Berlin's winter is long and Berliners adapt by going inside — to bars, to galleries, to long restaurant dinners. If you like that mode, November is fine. If you came to walk the East Side Gallery and bike the Spree, come in May instead. <a href="/en/germany/berlin">Where to stay in Berlin →</a></p>

<h2>November losers — wait for spring</h2>

<p><strong>Stockholm, Copenhagen, Oslo, Helsinki:</strong> Sunset is at 3:30pm. Daylight is 6-7 hours of overcast gray. The cities are beautifully designed but built around long summer days; in November they feel like a tunnel. Wait for May or come in late December for proper darkness-and-light Christmas atmosphere.</p>

<p><strong>Edinburgh:</strong> Same problem as Scandinavia, plus more rain. Beautiful city, wrong month.</p>

<p><strong>Amsterdam:</strong> Workable but punishing. Wet cobblestones plus bicycles plus 9-hour days. Come in April or September.</p>

<p><strong>Dublin and Galway:</strong> Atlantic rain in horizontal sheets. Skip November; pick May.</p>

<p><strong>Coastal Croatia (Dubrovnik, Split):</strong> Restaurants close. Ferries reduce. Half the city shuts. Lovely in May or September; dead in November.</p>

<h2>The packing rule</h2>

<p>For winners (southern Europe): a sweater, a rain jacket, comfortable walking shoes. You won't need a heavy coat.</p>

<p>For middle ground (Paris/London/Berlin): a proper waterproof coat, a wool sweater, sturdy waterproof shoes (this is where most travelers under-pack — sneakers fail by day three in November Paris).</p>

<p>For losers: book Andalusia instead.</p>

<p>For the broader question of how to choose a base in any of these cities, see <a href="/en/articles/where-to-stay-in-paris-by-arrondissement">our Paris arrondissement guide</a> and <a href="/en/articles/why-train-station-hotels-are-usually-a-mistake">why station hotels are usually a mistake</a>.</p>
    `.trim(),
  },
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

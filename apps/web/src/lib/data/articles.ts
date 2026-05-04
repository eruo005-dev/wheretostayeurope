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

ARTICLES.push(
  {
    slug: "paris-vs-london-for-first-time-europe",
    title: "Paris vs London for First-Time Europe Travelers",
    excerpt: "If you have one week and have never been to Europe, both Paris and London are good answers — but they answer different questions. Here is how to choose.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 8,
    metaTitle: "Paris vs London for First-Time Europe — Honest Comparison",
    metaDescription: "If it's your first European trip and you're choosing between Paris and London: walkability, cost, language, food, museums, weather, and the trip type each one is best for.",
    html: `
<p>If you have one week, no European trips behind you, and you're choosing between Paris and London — both are good answers. They are also dramatically different cities answering dramatically different questions. Here is the actual decision.</p>

<h2>The fast answer</h2>

<p><strong>Pick Paris</strong> if your trip is romance-coded, food is the priority, you want to walk a lot, you're under 40, you're traveling as a couple, or you want the European-postcard experience.</p>

<p><strong>Pick London</strong> if you're traveling with kids, English-language comfort is non-negotiable, you have a long museum priority list, you're a theatre or music person, you're 50+, or you want to combine the city trip with a few days in the British countryside.</p>

<p>Now the why.</p>

<h2>Walkability</h2>

<p>Paris wins decisively. Central Paris (the 1st through 11th arrondissements) is a 25-minute walk across, and the metro is for distance only — most days you'll walk 10-15 km without realizing it. The Seine is a constant orientation aid; the streets are at human scale; the cobblestones are real but not punishing.</p>

<p>London is bigger and walking-hostile in patches. The Tube is genuinely necessary across central London, and £6-8 per ride adds up fast (get an Oyster card or use contactless, which caps at £8.90/day in zones 1-2). The good walking is concentrated: Westminster to Covent Garden, Hyde Park to Notting Hill, Shoreditch east. Outside those, you're underground.</p>

<h2>Cost</h2>

<p>London is now significantly more expensive than Paris. A mid-range hotel in central London runs £200-300/night; the equivalent in Paris is €150-220. A pub lunch in London is £15-20; a bistrot lunch (prix fixe) in Paris is €18-25 and includes wine. Coffee at a café is £4 in London, €2 in Paris. Theatre tickets and museums largely break the trend (London's big museums are free; Paris's aren't), but day-to-day the gap is real.</p>

<p>Currency: Paris is Euros, London is Pounds Sterling. Both take contactless cards everywhere; cash is barely used in either city.</p>

<h2>Language</h2>

<p>London wins, obviously, if English-language comfort is the trip-maker. But Paris is much easier than its reputation suggests if you open with "Bonjour" before any request — see <a href="/en/articles/where-to-stay-in-paris-by-arrondissement">our Paris arrondissement guide</a> on this. Almost everyone in central Paris speaks enough English to handle a restaurant order, a museum ticket, a metro question. The myth of rude Parisians is mostly a myth about tourists who skip the bonjour.</p>

<h2>Food</h2>

<p>Paris wins decisively. The bistrot prix fixe at €25 is the cheapest serious meal in Western Europe. The bakeries are still real bakeries (sourdough, real butter, the croissants are the croissants). Wine by the glass is €5-7 for something genuinely good. London's food scene has caught up impressively in the last 15 years — the new wave (Lyle's, Brat, Lyon's Corner House, the Sri Lankan and Pakistani scenes in East London) is genuinely world-class — but it's expensive and you have to know where to look. The default London pub meal is fine but not memorable.</p>

<h2>Museums</h2>

<p>London wins. The British Museum, the V&A, the Natural History Museum, the Tate Modern, the National Gallery — all free, all world-class. Paris has the Louvre and the Musée d'Orsay (both €17, both worth it) plus dozens of smaller specialized museums. London's free big museums make a 7-day trip with kids dramatically more affordable.</p>

<h2>Weather</h2>

<p>Roughly the same — both cities are at similar latitudes with similar maritime climates. Paris is slightly warmer and slightly drier on average. London's rain is famously light and intermittent; Paris's is more dramatic but less frequent. Both are workable year-round; both are best April-June and September-October. See <a href="/en/articles/europe-in-november-the-honest-off-season-guide">our Europe in November guide</a> for off-season planning.</p>

<h2>What about both?</h2>

<p>The Eurostar between London and Paris takes 2h20m and lands you in central Paris (Gare du Nord) and central London (St. Pancras). Round-trip tickets booked 2-3 months ahead are £100-150. If you have 7+ days, three nights in each city is the right combination for a first-time European trip — it lets you compare, gives you two distinct experiences, and avoids the "must see everything in Paris in five days" rush.</p>

<p>Where to base in each: in London, <a href="/en/united-kingdom/london">our London neighborhood picks</a> point to Bloomsbury or Shoreditch. In Paris, <a href="/en/articles/where-to-stay-in-paris-by-arrondissement">the arrondissement decision tree</a> walks through every option.</p>
    `.trim(),
  },
  {
    slug: "best-european-cities-for-solo-female-travelers",
    title: "Best European Cities for Solo Female Travelers",
    excerpt: "Solo female travel in Europe is overwhelmingly safe — but cities still vary in how welcoming, walkable, and easy-to-be-alone-in they feel. Here is the honest ranking.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 9,
    metaTitle: "Best European Cities for Solo Female Travelers — Honest Ranking",
    metaDescription: "An honest ranking of European cities for solo female travelers. Safety stats, walkability, easy-to-be-alone-in cafes and restaurants, neighborhood picks, and where to actually stay.",
    html: `
<p>Solo female travel in Europe is overwhelmingly safe and overwhelmingly common — half the people in your hostel dorm or boutique hotel are women traveling on their own. The OECD safety statistics back this up: most European capitals have lower violent-crime rates than equivalent North American cities.</p>

<p>That said, cities vary widely in three things solo female travelers care about: how easy it is to eat dinner alone without feeling stared at, how walkable the city is at night, and how welcoming the local culture is to a woman alone with a book or laptop in a café. Here is an honest ranking.</p>

<h2>Tier 1 — Easiest cities</h2>

<h3>Copenhagen</h3>

<p>The benchmark. Solo female travelers consistently rate Copenhagen as the easiest European city to be alone in. The cafés are full of single women working, eating, reading. Public transit runs late, well-lit, and is genuinely safe. Locals are reserved but never intrusive — you can sit alone at a bar and no one bothers you. <a href="/en/denmark/copenhagen">Stay in Vesterbro or Nørrebro</a>; both are residential, walkable, café-dense.</p>

<h3>Amsterdam</h3>

<p>The bike infrastructure means you don't need taxis. The Dutch directness extends to a pleasant non-intrusiveness — no one tries to talk to you on the train. The areas to actually avoid are smaller than the rest of the city: the Red Light District itself can feel performative, but the surrounding neighborhoods (Jordaan, De Pijp, Oud-West) are excellent solo bases. <a href="/en/netherlands/amsterdam">Where to stay in Amsterdam →</a></p>

<h3>Reykjavík</h3>

<p>Iceland has the lowest violent-crime rate in Europe and the smallest urban population. Solo women walking home at 2am is unremarkable. The downside: Reykjavík is small (140k) and gets dark from October to March; if you need urban energy, this is not it. <a href="/en/iceland/reykjavik">Where to stay in Reykjavík →</a></p>

<h3>Vienna</h3>

<p>Conservative-by-design and that helps here — late-night transit is excellent, cafés explicitly welcome solo readers, the city's Coffeehouse culture is built around people sitting alone for hours. Lederhosen-tourist energy is minimal compared to Munich. <a href="/en/austria/vienna">Stay in Neubau (District 7)</a> for the best mix of central and lived-in.</p>

<h3>Edinburgh</h3>

<p>Compact, walkable, English-speaking, packed with bookstore cafés and university energy. Old Town gets stag-party noise on weekends; pick New Town for sleep. <a href="/en/united-kingdom/edinburgh">Where to stay in Edinburgh →</a></p>

<h2>Tier 2 — Easy with neighborhood discipline</h2>

<h3>Lisbon and Porto</h3>

<p>Both are excellent for solo women, with one specific caveat: avoid Bairro Alto (Lisbon) on weekend nights if loud bachelor-party energy isn't your thing. Príncipe Real (Lisbon) and Cedofeita (Porto) are the right solo bases — design-shop cafés, brunch culture, nothing menacing. <a href="/en/portugal/lisbon">Lisbon picks →</a> · <a href="/en/portugal/porto">Porto picks →</a></p>

<h3>Berlin</h3>

<p>Excellent if you pick the right neighborhood. Prenzlauer Berg and parts of Mitte are calm and café-rich. Friedrichshain at 3am is fine but male-coded. Berliners are direct to the point of bluntness — nobody will hit on you in a café, and that's the feature. <a href="/en/germany/berlin">Where to stay in Berlin →</a></p>

<h3>London</h3>

<p>Big, expensive, English-speaking. Walking alone in central London at night is fine in zones 1-2; outer zones vary. The Tube is safe and ubiquitous. Pubs in London are easier to enter alone than in many European cities — single-woman-at-the-bar is not a thing anyone notices. <a href="/en/united-kingdom/london">Where to stay in London →</a></p>

<h2>Tier 3 — Workable with planning</h2>

<h3>Paris</h3>

<p>Safer than its reputation by a wide margin, but the catcalling phenomenon is real, particularly in the 18th and 19th. Stay in the Marais (4th), Saint-Germain (6th), or the 11th — all easy to walk alone. The metro after 10pm is fine if you pick the well-lit lines (1, 4, 14). Solo women dining at bistrot counters is normal. <a href="/en/articles/where-to-stay-in-paris-by-arrondissement">Paris arrondissement guide →</a></p>

<h3>Barcelona</h3>

<p>Workable but pickpocket-paranoid. The Las Ramblas area in particular is the European pickpocket capital — keep bags zipped and across your body. Eixample, Gràcia and Born are dramatically safer than the Gothic Quarter at night. Late-night trains stop at midnight; budget for taxis or stay central. <a href="/en/spain/barcelona">Where to stay in Barcelona →</a></p>

<h3>Rome</h3>

<p>Safe but loud. Roman men are vocal in their attention; this is more performative than threatening but can wear thin. The dress-up rule helps: looking polished gets you treated more politely than looking touristy. Stay in Monti or Trastevere — both excellent solo bases. <a href="/en/italy/rome">Where to stay in Rome →</a></p>

<h2>Tier 4 — Possible but requires more planning</h2>

<h3>Istanbul</h3>

<p>Genuinely safe in the European sense, but requires respect for local norms. Cover shoulders and knees in mosques. Avoid Beyoğlu's late-night bar streets alone after 1am. The Asian side (Kadıköy) is dramatically more relaxed than the European tourist zones. Stay in Cihangir (Beyoğlu) or Kadıköy. <a href="/en/turkey/istanbul">Where to stay in Istanbul →</a></p>

<h2>The practical kit</h2>

<ul>
<li>A cross-body bag with zippers (not a tote).</li>
<li>The local emergency number saved (112 across the EU).</li>
<li>Offline maps downloaded for Google Maps before you arrive.</li>
<li>The first café you'll visit picked before you arrive — first-day decision fatigue is the actual obstacle, not safety.</li>
<li>Hotels with 24-hour reception in cities you don't know yet.</li>
</ul>

<p>For broader neighborhood-by-neighborhood selection, see the city guides linked above. For the off-season trade-off, see <a href="/en/articles/europe-in-november-the-honest-off-season-guide">our November guide</a>.</p>
    `.trim(),
  },
  {
    slug: "where-to-stay-in-rome-by-rione",
    title: "Where to Stay in Rome: Centro Storico vs Trastevere vs Monti vs Prati",
    excerpt: "Rome's neighborhoods (rioni) feel like different cities. The wrong base costs you an hour a day; the right one transforms the trip.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 7,
    metaTitle: "Where to Stay in Rome by Neighborhood — The Decision Tree",
    metaDescription: "Centro Storico, Trastevere, Monti, Prati, Testaccio — the four-plus-one Rome neighborhood decision tree, with honest takes on who each one is for.",
    html: `
<p>Rome is the city where the difference between a great trip and a frustrating one is which side of the river you sleep on. Pick wrong and you spend an extra hour a day on transit; pick right and the city unfolds around you.</p>

<p>Rome divides into rioni (historic neighborhoods). For where-to-stay purposes, four-plus-one matter: Centro Storico, Trastevere, Monti, Prati, plus Testaccio for a longer or repeat stay.</p>

<h2>The fast answer</h2>

<p><strong>Centro Storico</strong> if it's your first Rome trip and you have 3-4 days. Maximum sights per minute walked.</p>

<p><strong>Trastevere</strong> if it's your second Rome trip, or if your trip is built around dinner. The best evenings in Rome happen here.</p>

<p><strong>Monti</strong> if you want central without tourist saturation, and you don't mind hills. The under-recommended right answer for many.</p>

<p><strong>Prati</strong> if you have a Vatican priority, are traveling with family (the apartments are bigger), or want quieter evenings.</p>

<p><strong>Testaccio</strong> if you're staying a week+, want a real Roman neighborhood, or your Rome trip is the food.</p>

<h2>Centro Storico — for the first-time Rome trip</h2>

<p>The historical core: Pantheon, Piazza Navona, Campo de' Fiori, Trevi Fountain. Walking distance to almost everything that brought you to Rome. Restaurants are tourist-managed (and overpriced) but you can walk yourself out of that with 10 minutes' deliberate effort. Hotels at the top end are exceptional; mid-range is solid; budget is rough.</p>

<p>Stay here if: it's your first Rome trip, you have a tight 3-4 day schedule, you want to stumble out of your hotel into the Pantheon at 7am before the queues. Skip if: you want any local life, you're on a budget, you're staying a week (you'll get tired of the tourist density). <a href="/en/italy/rome/centro-storico">Centro Storico guide →</a></p>

<h2>Trastevere — for the second Rome trip</h2>

<p>Across the Tiber from Centro Storico. Cobblestoned, atmospheric, restaurant-dense, the place Romans actually go on weekend nights. The walk to the Vatican is 25 minutes; the walk to the Roman Forum is 20. You'll cross the river at least twice a day.</p>

<p>Stay here if: you've done Rome before and want a more lived-in stay, your trip is built around evenings, you want both atmosphere and decent prices. Skip if: you're a light sleeper (the bars run loud on weekends), you have no patience for cobblestones, you need metro access (Trastevere has none — buses and walking only). <a href="/en/italy/rome/trastevere">Trastevere guide →</a></p>

<h2>Monti — the under-recommended middle</h2>

<p>Between the Colosseum and Termini. Hilly, design-shop heavy, restaurant-dense in a way that's not yet completely tourist-coded. You can walk to the Colosseum in 10 minutes, the Forum in 12, the Trevi in 15. Cavour is the metro stop.</p>

<p>Stay here if: you want central but real, the Colosseum is a priority, you're on a 4-7 day trip and don't want to feel saturated by tourists. Skip if: you have mobility issues (Monti is genuinely hilly), or you want a quiet stay (the bar streets stay loud Thursday-Sunday). <a href="/en/italy/rome/monti">Monti guide →</a></p>

<h2>Prati — the value play</h2>

<p>Just north of the Vatican. Wide grid streets, mid-range restaurants, fewer tourists, more apartments-with-actual-kitchens than the historic center. You can walk to the Vatican in 10 minutes; to Centro Storico in 20.</p>

<p>Stay here if: the Vatican is your priority sight, you're traveling with family and want apartment space, you want quieter evenings, you want value over location-bragging-rights. Skip if: your trip is dinner-built (Prati closes earlier than the historic center), you want maximum walking access to the Pantheon and Trevi areas. <a href="/en/italy/rome/prati">Prati guide →</a></p>

<h2>Testaccio — for the food trip and longer stays</h2>

<p>South of Trastevere, the historic working-class neighborhood. The Mercato Testaccio is the best food market in central Rome. The trattorias here (Felice, Flavio al Velavevodetto, Da Cesare) are where Roman food traditions actually live. Few hotels; many apartments.</p>

<p>Stay here if: you're in Rome for a week or more, your trip is the food, you've done Rome's main sights and want a real neighborhood. Skip if: you're on a 3-day trip (transit time to major sights eats your day), or you want hotel infrastructure (most stays here are apartments).</p>

<h2>Where NOT to stay</h2>

<p><strong>Termini</strong>: Rome's largest cluster of cheap hotels and consistently the worst-reviewed neighborhood for tourists. See <a href="/en/articles/why-train-station-hotels-are-usually-a-mistake">our piece on why train station hotels are a mistake</a>. Stay here only if you have a 5am train.</p>

<p><strong>Anywhere outside the metro/tram network</strong>: Rome's transit is patchy compared to Paris or London. Hotels in suburban districts (Tiburtina, Pigneto further out, EUR) sell themselves on price but cost you 30+ min each way to anywhere worth visiting.</p>

<p><strong>Vatican-adjacent budget hotels with no neighborhood</strong>: There's a cluster of cheap-looking hotels on Via Crescenzio and similar streets right next to Vatican City. Convenient on day one of your trip; you'll never want to eat there.</p>

<h2>The simple version</h2>

<p>If it's your first trip and you have less than a week: Centro Storico. If it's your second trip, or your first is 5+ days: Trastevere or Monti. If you're with kids or want value: Prati. For everything else, see <a href="/en/articles/where-to-stay-in-paris-by-arrondissement">how the same logic applies to Paris</a>.</p>
    `.trim(),
  },
  {
    slug: "europe-in-deep-winter",
    title: "Europe in Deep Winter (December, January, February): Where to Actually Go",
    excerpt: "Deep winter in Europe is the most polarized travel season — Christmas-market magic in some cities, depressing 4pm sunsets in others. Here is the honest map.",
    publishedAt: "2026-04-28",
    reviewedAt: "2026-04-28",
    readingTimeMin: 8,
    metaTitle: "Europe in Deep Winter (Dec-Feb) — The Honest City Map",
    metaDescription: "An honest guide to traveling Europe in December, January, and February. Christmas markets, deep cold, sunset at 3:30pm, ski-base towns, off-season Mediterranean — what works and what doesn't.",
    html: `
<p>Deep winter in Europe — December through February — is the most polarized travel season. Some cities turn into fairy tales (Christmas markets, snow on baroque facades, mulled wine at 4pm darkness). Others become 9-hour-day endurance tests where you're indoors by 4 and asleep by 9.</p>

<p>The two variables that shape every trip in this window: <strong>daylight hours</strong> (Stockholm has 6, Lisbon has 9.5) and <strong>indoor culture density</strong> (cities with strong café/coffeehouse/pub traditions handle short days; cities built around outdoor life don't).</p>

<p>Here is the honest map. For November specifically — the shoulder month — see <a href="/en/articles/europe-in-november-the-honest-off-season-guide">our November guide</a>.</p>

<h2>December: Christmas markets and warm cities</h2>

<h3>Christmas markets — peak window late Nov to Dec 23</h3>

<p>The proper Christmas market belt: Vienna, Salzburg, Munich, Nuremberg, Strasbourg, Cologne, Prague, Budapest, Krakow. These cities turn on between mid-November and the first weekend of December and run until December 23 or 24. After Christmas they wind down fast; by December 28 most are gone.</p>

<p><strong>Best for first-timers:</strong> Vienna (multiple markets, classical-music backdrop, manageable winter weather). <a href="/en/austria/vienna">Vienna picks →</a></p>

<p><strong>Best for atmosphere:</strong> Salzburg (small, baroque, snowy, the actual Sound of Music backdrop). <a href="/en/austria/salzburg">Salzburg picks →</a></p>

<p><strong>Best for budget:</strong> Krakow or Budapest (the markets are real, hotel prices are 40-60% of Vienna). <a href="/en/poland/krakow">Krakow picks →</a> · <a href="/en/hungary/budapest">Budapest picks →</a></p>

<p><strong>Best for German-Christmas full immersion:</strong> Nuremberg's Christkindlesmarkt is the most traditional. Munich's Christkindlmarkt on Marienplatz is excellent and combines well with a side-trip to Salzburg.</p>

<h3>Mediterranean winter — the secret bargain</h3>

<p><strong>Lisbon and Porto in December and January:</strong> highs of 14-16°C, sunshine roughly half the days, hotels at 40-50% off summer. You can sit outside for coffee at noon. Lisbon's Christmas decorations are tasteful rather than spectacular. The food (caldo verde, roasted chestnuts on every street corner, port at 3pm) is at its best in winter. <a href="/en/portugal/lisbon">Lisbon picks →</a></p>

<p><strong>Andalusia (Seville, Granada, Málaga):</strong> highs of 16-19°C in January. The Alhambra in Granada has its smallest crowds of the year. Seville's December-January is genuinely pleasant for walking all day. <a href="/en/spain/seville">Seville picks →</a></p>

<p><strong>Sicily and southern Italy:</strong> Palermo, Catania, Naples. December highs of 14-18°C, January 12-15. Heating in older buildings is spotty (this is the catch); pick hotels deliberately. The food peaks in winter — citrus season, wild greens, oranges and almonds in everything.</p>

<h2>January: the Christmas-market hangover, then ski season</h2>

<p>The first half of January is Europe's deadest travel window. The Christmas markets are gone. Many restaurants close for staff vacations. Weather is cold and gray almost everywhere north of the Alps. Hotel prices are at their annual lowest.</p>

<p>If you must travel mid-January:</p>

<ul>
<li><strong>Vienna's coffeehouse season</strong> peaks now — long indoor afternoons in Café Sperl with a Melange and the newspapers is the Vienna trip you couldn't do in summer. <a href="/en/austria/vienna">Vienna picks →</a></li>
<li><strong>Reykjavík for Northern Lights</strong> — January is peak season, daylight is around 5 hours, and the ice cave tours from south Iceland start running. <a href="/en/iceland/reykjavik">Reykjavík picks →</a></li>
<li><strong>Alpine ski bases</strong> — Innsbruck, Salzburg, Geneva, Zurich are all good launch pads for skiing during the late-January through mid-February peak. <a href="/en/austria/innsbruck">Innsbruck picks →</a> · <a href="/en/switzerland/zurich">Zurich picks →</a></li>
<li><strong>Athens and Istanbul</strong> — both are at their lowest tourist density and lowest prices. Athens highs of 13-15°C, Istanbul 8-10°C. Wear layers, expect rain, plan an indoor-museum heavy itinerary. <a href="/en/greece/athens">Athens picks →</a> · <a href="/en/turkey/istanbul">Istanbul picks →</a></li>
</ul>

<h2>February: the same calculus, plus Carnival</h2>

<p>February is January with marginally more daylight and the Carnival weekend (variable date, usually mid-Feb to early March) which transforms specific cities:</p>

<ul>
<li><strong>Venice Carnival</strong> — the famous one, 2 weeks of masked balls and processions. Hotels triple in price; book a year ahead. <a href="/en/italy/venice">Venice picks →</a></li>
<li><strong>Cologne Karneval</strong> — Germany's biggest party, week culminating in Rosenmontag. The city is genuinely insane for a week; bars close at random hours; hotel prices triple. <a href="/en/germany/cologne">Cologne picks →</a></li>
<li><strong>Nice Carnaval</strong> — the French Riviera version, two weeks of parades and the famous flower battles. Combines well with a Provence side trip. <a href="/en/france/nice">Nice picks →</a></li>
</ul>

<h2>What to skip in deep winter</h2>

<p><strong>Stockholm, Oslo, Copenhagen in January-February:</strong> sunset at 3:30pm, daylight is 6 hours of overcast gray. Beautifully designed cities built around long summer days. Wait for May.</p>

<p><strong>Coastal Croatia (Dubrovnik, Split, Hvar):</strong> restaurants close, ferries reduce, half the city shuts. Lovely in May or September.</p>

<p><strong>Greek islands (Santorini, Mykonos):</strong> 70% of accommodations close November to April. The few that stay open charge winter prices but the islands are functionally empty.</p>

<p><strong>Anywhere coastal with no indoor culture:</strong> a mid-sized Italian beach town in January is depressing in a specific way that summer travelers don't anticipate.</p>

<h2>The packing rule</h2>

<p>For Christmas markets in northern Europe: real winter coat (not "warm jacket"), warm hat, gloves, waterproof shoes that handle slush. Layers underneath because every interior is heated to 22°C.</p>

<p>For Mediterranean winter: a sweater, a rain jacket, comfortable walking shoes. Maybe one warm layer for indoor evenings if heating is patchy.</p>

<p>For ski bases: this is its own packing question and your ski-rental shop has the rest.</p>

<p>For broader off-season planning, see <a href="/en/articles/europe-in-november-the-honest-off-season-guide">November</a>. For where to stay once you've picked the city, the country and city guides are linked above.</p>
    `.trim(),
  },
);

// =============================================================================
// Wave 2 articles — Europe-wide cornerstone content. Each piece capable of
// ranking on its own primary keyword and seeding internal links to country/
// city/neighborhood pages.
// =============================================================================
ARTICLES.push(
  {
    slug: "best-european-cities-for-a-long-weekend",
    title: "The Best European Cities for a Long Weekend (3-4 Nights)",
    excerpt: "If you have a Friday-to-Monday and want a real European city without the airport-time-to-actual-city-time being a joke, these are the cities the math actually works for.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 9,
    metaTitle: "Best European Cities for a Long Weekend — 3-4 Nights",
    metaDescription: "Honest ranking of European cities for a 3-4 night weekend trip. Walkability, transit time from the airport, evening density, and whether the city actually opens up in three days.",
    html: `
<p>The long-weekend European trip — Thursday-Sunday, Friday-Monday, four nights at most — has a different math than a one-week trip. The cost of a slow airport-to-city transit, a boring central neighborhood, or a city you can't dent in 72 hours is much higher when 72 hours is all you have.</p>

<p>The cities that actually work for this format share three properties: the airport is fast to the center, the city's "best of" fits in three full days, and there's enough evening density that you don't waste your one Saturday night.</p>

<h2>Tier 1 — the cities that were almost designed for this</h2>

<p><strong>Lisbon.</strong> The airport metro takes 25 minutes to the center. The city is small enough that 3 days is generous; 4 days lets you do Sintra without rushing. Stay in <a href="/en/portugal/lisbon/baixa-chiado">Baixa-Chiado</a> if you want flat walking, <a href="/en/portugal/lisbon/principe-real">Príncipe Real</a> if you want the design-shop scene.</p>

<p><strong>Porto.</strong> Smaller than Lisbon, even more concentrated. A single day in <a href="/en/portugal/porto/cedofeita">Cedofeita</a> covers the food scene; a half-day handles the port-tasting trip. The wine valleys are 90 minutes by train if you want a fourth day.</p>

<p><strong>Budapest.</strong> The transit from BUD airport is the slow part (40-60 min), but once you're in <a href="/en/hungary/budapest/district-v">District V</a> the city unfolds quickly. Budapest is denser per square kilometer than most western European capitals.</p>

<p><strong>Copenhagen.</strong> 15-min metro from the airport. The center is bike-able end-to-end in 30 minutes. <a href="/en/denmark/copenhagen/vesterbro">Vesterbro</a> for food-focused trips; <a href="/en/denmark/copenhagen/indre-by">Indre By</a> for first-timers.</p>

<p><strong>Krakow.</strong> 20-min train from the airport, the entire <a href="/en/poland/krakow/kazimierz">Kazimierz</a> + <a href="/en/poland/krakow/stare-miasto-krakow">Stare Miasto</a> circuit takes two days, the third is for Auschwitz or Wieliczka.</p>

<h2>Tier 2 — work great if you stay in the right neighborhood</h2>

<p><strong>Berlin.</strong> Big enough to overwhelm a long weekend if you try to do everything. Pick a corner of the city — <a href="/en/germany/berlin/kreuzberg">Kreuzberg</a> for food and nightlife, <a href="/en/germany/berlin/mitte">Mitte</a> for sights — and stay in it.</p>

<p><strong>Vienna.</strong> The airport train (CAT) is fast but expensive. Stay in <a href="/en/austria/vienna/neubau">Neubau</a> rather than District 1 unless you're prepared to pay a premium for the doorstep-Stephansdom thing.</p>

<p><strong>Prague.</strong> The catch is the airport — there's no train, just a bus or taxi. Once in town, <a href="/en/czech-republic/prague/vinohrady">Vinohrady</a> beats Old Town for almost every long-weekend traveler.</p>

<p><strong>Amsterdam.</strong> Fast train from Schiphol (15 min). The city is small but the canal-belt walks fill 3-4 days easily. <a href="/en/netherlands/amsterdam/jordaan">Jordaan</a> for first-timers; <a href="/en/netherlands/amsterdam/de-pijp">De Pijp</a> for food-focused.</p>

<h2>Tier 3 — possible but tight</h2>

<p><strong>Rome.</strong> Three days is too short for first-time Rome and too long for repeat Rome at this rhythm. If you must, stay in <a href="/en/italy/rome/centro-storico">Centro Storico</a> and accept the price premium.</p>

<p><strong>Paris.</strong> The metro from CDG is doable but exhausting on a Friday night. Three days only works for second-time Paris travelers who already know the city.</p>

<p><strong>Barcelona.</strong> The airport is fast but the city is genuinely big. Stay in <a href="/en/spain/barcelona/eixample">Eixample</a> and resist the urge to do everything.</p>

<h2>The cities that DON'T work as long weekends</h2>

<p><strong>London.</strong> The airport-to-center time alone eats half a day, prices punish short stays, and the museum list demands a full week.</p>

<p><strong>Istanbul.</strong> The airport is far, the city is enormous, and split-continent geography means you'll lose hours on every plan.</p>

<p><strong>Madrid.</strong> Too big for three days, too sprawling for the long-weekend rhythm. Save Madrid for a five-day minimum.</p>

<h2>The bottom line</h2>

<p>If you're picking purely on long-weekend friendliness: <strong>Lisbon, Porto, Copenhagen, Krakow.</strong> Each one rewards the format. Each one leaves you wanting more, which is the right outcome.</p>
    `.trim(),
  },
  {
    slug: "where-to-stay-in-eastern-europe-by-country",
    title: "Where to Stay in Eastern Europe: A Country-by-Country Guide",
    excerpt: "Eastern Europe rewards travelers who pick the right city per country. Czechia is not Hungary; Poland is not Romania. Here's how to think about each.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 11,
    metaTitle: "Where to Stay in Eastern Europe — Country-by-Country Guide",
    metaDescription: "Honest country-by-country guide to Eastern Europe: Czechia, Hungary, Poland, Romania, Bulgaria, the Baltics, the Balkans. Best base city, second city worth visiting, common mistakes.",
    html: `
<p>"Eastern Europe" as a category is misleading. The countries inside it have less in common with each other than first-timers expect. Czechia is industrial-Habsburg-cool. Romania is Latin-mountain. Hungary is its own thing. The Baltics are nordic-influenced. The Balkans are something else entirely.</p>

<p>This guide is per-country: which city to base, which second city is worth a side trip, the most common mistake travelers make.</p>

<h2>Czechia</h2>

<p><strong>Base city:</strong> Prague. Stay in <a href="/en/czech-republic/prague/vinohrady">Vinohrady</a> rather than the Old Town. Same train access, dramatically cheaper, far less stag-do noise.</p>

<p><strong>Second city:</strong> <a href="/en/czech-republic/brno">Brno</a>. Smaller, modernist architecture, fraction of Prague prices.</p>

<p><strong>Common mistake:</strong> Booking inside Old Town Square. The acoustics, prices, and bachelor-party density punish you.</p>

<h2>Hungary</h2>

<p><strong>Base city:</strong> Budapest. <a href="/en/hungary/budapest/district-v">District V</a> for first-timers, <a href="/en/hungary/budapest/district-vii">District VII</a> for ruin-bar nightlife, <a href="/en/hungary/budapest/district-vi">District VI</a> for the Andrássy Avenue middle ground.</p>

<p><strong>Second city:</strong> Debrecen or Pécs, but realistically Budapest is most of the Hungary trip.</p>

<p><strong>Common mistake:</strong> Booking on the Buda side for a short trip. Buda is for honeymoons and quiet stays; the action is on the Pest side.</p>

<h2>Poland</h2>

<p><strong>Base city:</strong> Krakow. <a href="/en/poland/krakow/kazimierz">Kazimierz</a> is the local-life answer; <a href="/en/poland/krakow/stare-miasto-krakow">Stare Miasto</a> is the postcard answer.</p>

<p><strong>Second city:</strong> Gdańsk. Architecturally distinct from Krakow — Hanseatic, on the Baltic — and 3 hours by train.</p>

<p><strong>Common mistake:</strong> Treating Warsaw as the natural "capital tour" answer. Warsaw is fine but Krakow is more rewarding for short trips.</p>

<h2>Romania</h2>

<p><strong>Base city:</strong> Brașov. The Saxon old town inside the medieval walls is beautiful and walkable; <a href="/en/romania/brasov/piata-sfatului">Piața Sfatului</a> is the obvious base.</p>

<p><strong>Second city:</strong> Sibiu. Smaller, more atmospheric, the Saxon "eyes-of-Sibiu" rooftops.</p>

<p><strong>Common mistake:</strong> Bucharest-only itineraries. Bucharest is rough and rewarding in equal measure, but Transylvania is most of why people go to Romania.</p>

<h2>The Baltics</h2>

<p><strong>Tallinn:</strong> Stay in the Old Town (Vanalinn) for one night, then <a href="/en/estonia/tallinn">Telliskivi</a> if you want the creative quarter. The Old Town is heavily tourist-managed in summer.</p>

<p><strong>Riga:</strong> Old Town is the obvious base. Skip if you've done Tallinn and Vilnius.</p>

<p><strong>Vilnius:</strong> The Old Town is large, atmospheric, and the underrated entry of the three.</p>

<p><strong>Common mistake:</strong> Trying to see all three in 5 days. Pick one, possibly two with the bus between them.</p>

<h2>The Balkans</h2>

<p><strong>Bosnia & Herzegovina:</strong> <a href="/en/bosnia-and-herzegovina/sarajevo/bascarsija">Sarajevo's Baščaršija</a> for the Ottoman-era atmosphere, <a href="/en/bosnia-and-herzegovina/mostar/stari-grad-mostar">Mostar's Stari Grad</a> for one night by the bridge.</p>

<p><strong>Croatia:</strong> Already covered extensively elsewhere. Don't sleep inside Diocletian's Palace in Split (loud); don't sleep inside Dubrovnik's walls (overpriced).</p>

<p><strong>Slovenia:</strong> <a href="/en/slovenia/ljubljana">Ljubljana</a>, then either <a href="/en/slovenia/bled">Bled</a> or <a href="/en/slovenia/piran">Piran</a> depending on whether you prefer mountains or sea.</p>

<p><strong>Montenegro/Albania/North Macedonia:</strong> Worth their own dedicated guides. Generally: stay where the mid-priced car-rental is (Localrent has strong coverage in all three) because public transit between sights is thin.</p>

<h2>Bulgaria</h2>

<p><strong>Base city:</strong> Sofia is fine; Plovdiv is more rewarding. Most weekend trips work better with Plovdiv as the base and a Sofia day-trip than the reverse.</p>

<h2>The cross-cutting advice</h2>

<p>Eastern European cities reward staying just outside the most-recommended neighborhood. The price gap is bigger than in Western Europe, the walkability gap is smaller. Vinohrady not Old Town, Kazimierz not Stare Miasto, Beyoğlu not Sultanahmet. The rule has held for a decade and isn't changing.</p>
    `.trim(),
  },
  {
    slug: "europe-by-train-which-city-pairs-actually-work",
    title: "Europe by Train: Which City Pairs Actually Work",
    excerpt: "The train romance of Europe is real, but only on certain routes. Some pairs are 2-hour scenic dreams. Others are 11-hour budget-airline-but-worse. Here's the difference.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "Europe by Train: City Pairs Worth Booking — Honest Guide",
    metaDescription: "Which European city pairs work great by train (Paris-Amsterdam, Vienna-Prague, Munich-Salzburg) and which don't (Barcelona-Rome, Athens-anywhere). Honest assessment with actual times.",
    html: `
<p>The "Europe by train" fantasy is real, but it works on certain corridors and fails on others. The difference is whether the route is one of the legacy high-speed networks or whether you're stitching together regional lines that take twice as long as flying.</p>

<p>This is a directional guide: pairs where the train is genuinely faster, scenic, or both — and pairs where you should fly.</p>

<h2>Pairs where the train wins decisively</h2>

<p><strong>Paris ↔ London (2h20).</strong> Eurostar from city center to city center. No question.</p>

<p><strong>Paris ↔ Amsterdam (3h20).</strong> Thalys / Eurostar. Center to center, faster than flying once you count the airport hassle.</p>

<p><strong>Paris ↔ Brussels (1h22).</strong> Same network. Worth the train every time.</p>

<p><strong>Paris ↔ Lyon (2h).</strong> TGV. Almost a commuter line.</p>

<p><strong>Vienna ↔ Prague (4h).</strong> Railjet through Czech and Austrian countryside. Beautiful, fast enough, pleasant.</p>

<p><strong>Munich ↔ Salzburg (1h30).</strong> Regional but quick. The natural side trip from either base.</p>

<p><strong>Berlin ↔ Prague (4h).</strong> EuroCity through pretty Czech towns. The Prague airport bus negotiation alone makes the train worth it.</p>

<p><strong>Florence ↔ Rome (1h35).</strong> Frecciarossa. The platonic Italian-train experience.</p>

<p><strong>Madrid ↔ Seville (2h30).</strong> AVE high-speed. Genuinely fast; airports here add an hour each side.</p>

<h2>Pairs where the train still wins, scenically</h2>

<p><strong>Zurich ↔ Milan (3h30).</strong> Through the Gotthard Base Tunnel. The trip is the experience — Lake Lucerne, Alps, Italian-speaking south.</p>

<p><strong>Bergen ↔ Oslo (7h).</strong> The Bergensbanen. Long, slow, gorgeous; this IS the Norway trip.</p>

<p><strong>Brașov ↔ Sinaia (40min) ↔ Bucharest (2h).</strong> The Carpathian regional line. Cheap, slow, deeply atmospheric.</p>

<h2>Pairs where the train technically works but you should fly</h2>

<p><strong>Barcelona ↔ Rome.</strong> No direct route. By train it's an overnight or a 14-hour transfer through Marseille. Flight is 1h45.</p>

<p><strong>Lisbon ↔ Madrid.</strong> Used to have a sleeper; now it's a fragmented 9+ hour trip. Flight is 1h15.</p>

<p><strong>Athens ↔ anywhere not in Greece.</strong> Greek rail is sparse and slow. Fly to Greece; trains within are mostly local.</p>

<p><strong>Helsinki ↔ Stockholm.</strong> The ferry is the better answer than any rail-based combination, but flying beats both for time.</p>

<p><strong>Anywhere ↔ Istanbul.</strong> The Bosphorus crossing means you're on multi-day trips through the Balkans. Beautiful in theory; impractical in practice.</p>

<h2>The strategic move: base in a rail hub</h2>

<p>If you want to do multi-city train travel, base out of <strong>Paris</strong>, <strong>Munich</strong>, <strong>Vienna</strong>, or <strong>Milan</strong>. From any of these you can hit 4-5 great cities by train without a single airport.</p>

<p>The Paris hub gets you Amsterdam, Brussels, London, Lyon, and the south of France. The Munich hub gets you Salzburg, Vienna, and Switzerland. Vienna gets you Prague, Budapest, and Salzburg.</p>

<h2>Where to stay near the station (vs near the center)</h2>

<p>This is its own decision and we covered it in detail in <a href="/en/articles/why-train-station-hotels-are-usually-a-mistake">why train-station hotels are usually a mistake</a>. The summary: stay near the station only if you have a 6am train. Otherwise, the central neighborhood is worth the extra 10-min walk on day one.</p>
    `.trim(),
  },
  {
    slug: "european-cities-where-locals-actually-live",
    title: "Where Locals Actually Live in Europe's Top Cities",
    excerpt: "Every guide tells you to stay in the historical center. The locals don't live in the historical center. Here are the neighborhoods second-time visitors discover and don't go back from.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 9,
    metaTitle: "Where Locals Actually Live in Europe's Top Cities — Honest Guide",
    metaDescription: "The neighborhoods Europeans actually live in — Vinohrady not Old Town, Kazimierz not Rynek, De Pijp not Centrum. Where to stay on your second European trip.",
    html: `
<p>The first European trip is about the postcard — the cathedral, the palace, the medieval square. The second trip is about figuring out where the locals actually live and discovering that you'd rather have stayed there the first time.</p>

<p>This is a per-city tour of the neighborhoods that fit that pattern: the place residents go on Saturday mornings, the place where rent has been climbing for the last decade, the place that quietly has the best food.</p>

<h2>Paris — the 11th and 10th</h2>

<p>The 4th, 6th, and 1st arrondissements are the postcard answers. The 11th and 10th are where Parisians under 40 go out on Friday. <a href="/en/france/paris/bastille">Bastille</a> in the 11th has restaurant density that the 4th can't match at half the prices.</p>

<h2>Berlin — Kreuzberg and Neukölln</h2>

<p>Mitte is the museum-island answer. <a href="/en/germany/berlin/kreuzberg">Kreuzberg</a> is where the food, the nightlife, and the actual Berliners are. Neukölln (further out, no neighborhood page yet) is where the gentrification frontier is currently pushing.</p>

<h2>Lisbon — Príncipe Real and Estrela</h2>

<p>Bairro Alto is the loud-bar district; Alfama is the postcard hill. <a href="/en/portugal/lisbon/principe-real">Príncipe Real</a> is where you actually want to live — design shops, leafy plazas, weekend brunches. Estrela (no neighborhood page yet) is the slightly quieter older sibling.</p>

<h2>Madrid — Malasaña and La Latina</h2>

<p>Sol/Centro is for tourists. <a href="/en/spain/madrid/malasana">Malasaña</a> is for under-40 Madrileños. <a href="/en/spain/madrid/la-latina">La Latina</a> is for everyone on Sunday afternoons (Cava Baja, the rastro).</p>

<h2>Barcelona — Gràcia and El Born</h2>

<p>Las Ramblas is a tourist trap. The Gothic Quarter is overrun. <a href="/en/spain/barcelona/gracia">Gràcia</a> is the village-feel residential district; <a href="/en/spain/barcelona/el-born">El Born</a> is the cooler younger sibling of the Gothic Quarter.</p>

<h2>Rome — Trastevere and Monti</h2>

<p>Centro Storico is for first-timers. <a href="/en/italy/rome/trastevere">Trastevere</a> is for second-timers (and most Romans on Saturday nights). <a href="/en/italy/rome/monti">Monti</a> is the design-shop, hilly underrated middle option.</p>

<h2>Amsterdam — Jordaan and De Pijp</h2>

<p>The Centrum is partial-stag-do hell. <a href="/en/netherlands/amsterdam/jordaan">Jordaan</a> is the canal-belt charm answer; <a href="/en/netherlands/amsterdam/de-pijp">De Pijp</a> is the food-and-evenings answer.</p>

<h2>Istanbul — Beyoğlu and Kadıköy</h2>

<p>Sultanahmet is the historical-sights answer for first-timers. <a href="/en/turkey/istanbul/beyoglu-galata">Beyoğlu</a> (Galata, Karaköy, Cihangir) is where second-time travelers stay. <a href="/en/turkey/istanbul/kadikoy">Kadıköy</a> on the Asian side is where Istanbul actually lives.</p>

<h2>Prague — Vinohrady and Žižkov</h2>

<p>Old Town is loud and overpriced. <a href="/en/czech-republic/prague/vinohrady">Vinohrady</a> is leafy, residential, the city's best dinner radius. <a href="/en/czech-republic/prague/zizkov">Žižkov</a> is rougher and the bar-density capital of central Europe.</p>

<h2>Vienna — Neubau and Leopoldstadt</h2>

<p>District 1 is grand-Vienna. <a href="/en/austria/vienna/neubau">Neubau</a> (District 7) is design-shop-creative-mid-priced. <a href="/en/austria/vienna/leopoldstadt">Leopoldstadt</a> across the canal is the underrated calm-and-cheap answer.</p>

<h2>Budapest — District VI and Erzsébetváros</h2>

<p>District V is the polished-tourist answer. <a href="/en/hungary/budapest/district-vi">District VI</a> is the Andrássy Avenue mid-tier. <a href="/en/hungary/budapest/district-vii">District VII</a> is the ruin-bar epicenter (loud).</p>

<h2>Stockholm — Södermalm</h2>

<p>Gamla Stan is the postcard. <a href="/en/sweden/stockholm/sodermalm">Södermalm</a> is where the design-magazine version of Stockholm actually lives.</p>

<h2>Copenhagen — Vesterbro and Nørrebro</h2>

<p>Indre By is the polished tourist core. <a href="/en/denmark/copenhagen/vesterbro">Vesterbro</a> is the food-and-design answer. <a href="/en/denmark/copenhagen/norrebro">Nørrebro</a> is the calmer, more diverse, cheaper alternative.</p>

<h2>The pattern</h2>

<p>In every case the local neighborhood is 5-15 minutes by tram or metro from the postcard center. The trade-off is real but small. The reward — better food, lower prices, calmer evenings, actual Europe rather than tourist-Europe — is large.</p>

<p>Pick the postcard for trip one. Pick the locals' neighborhood for trip two. By trip three, you've found your own rhythm.</p>
    `.trim(),
  },
  {
    slug: "solo-travel-europe-best-base-cities",
    title: "Solo Travel in Europe: The Best Base Cities",
    excerpt: "Some European cities are joyful solo. Some make you feel like the only single person at a wedding. The difference isn't accidental — and the right city varies by what you want from the trip.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "Solo Travel in Europe: Best Base Cities — Honest Picks",
    metaDescription: "Which European cities are great for solo travelers (Lisbon, Berlin, Krakow, Porto) and which feel awkward (Venice, Bruges, Mykonos). Honest assessment based on cafe culture, evening density, walkability.",
    html: `
<p>Solo travel in Europe works dramatically better in some cities than others. The variables aren't mysterious. A solo traveler thrives where there are: cafes you can sit alone in without feeling watched, evenings where dinner-for-one isn't a stigma, walkable scale, and enough fellow solo travelers that you can either find conversation or comfortably not.</p>

<p>This is a per-city honest assessment.</p>

<h2>Tier 1 — designed for solo</h2>

<p><strong>Lisbon.</strong> Cafe density per block is unreal, the city is small enough that you'll cross paths with the same people across days, and a Portuguese seat-yourself-at-the-counter culture means dinner alone is normal. Stay in <a href="/en/portugal/lisbon/principe-real">Príncipe Real</a> or <a href="/en/portugal/lisbon/baixa-chiado">Chiado</a>.</p>

<p><strong>Berlin.</strong> Probably the most solo-friendly major European city. The food culture is built around walking-up-to-a-counter (currywurst, döner, falafel), nobody cares what anyone else is doing, and <a href="/en/germany/berlin/kreuzberg">Kreuzberg</a> alone could fill a week.</p>

<p><strong>Porto.</strong> Smaller and friendlier than Lisbon. The wine-tasting tour culture means you'll naturally meet people. <a href="/en/portugal/porto/cedofeita">Cedofeita</a> is the natural base.</p>

<p><strong>Krakow.</strong> Cheap, walkable, and the bar-and-cafe scene in <a href="/en/poland/krakow/kazimierz">Kazimierz</a> is solo-friendly in a way most other historical centers aren't.</p>

<p><strong>Edinburgh.</strong> Pub culture in Scotland is generationally welcoming to solo travelers. <a href="/en/united-kingdom/edinburgh/new-town-edinburgh">New Town</a> is the calm-and-walkable base.</p>

<h2>Tier 2 — work great with the right neighborhood</h2>

<p><strong>Amsterdam.</strong> Solo-friendly food culture (lots of single-seat counter spots), bike-able. Stay in <a href="/en/netherlands/amsterdam/de-pijp">De Pijp</a> rather than the Centrum.</p>

<p><strong>Copenhagen.</strong> Reserved Scandinavian energy at first but the city opens up. <a href="/en/denmark/copenhagen/vesterbro">Vesterbro</a> for evenings, <a href="/en/denmark/copenhagen/norrebro">Nørrebro</a> for daytime.</p>

<p><strong>Athens.</strong> Underrated for solo. <a href="/en/greece/athens/koukaki">Koukaki</a> in particular has a cafe-table-on-sidewalk culture that's perfect.</p>

<p><strong>Vienna.</strong> The cafe culture (sit for hours with a single coffee and a book) was practically invented for solo travelers. Stay in <a href="/en/austria/vienna/neubau">Neubau</a>.</p>

<p><strong>Madrid.</strong> The tapa-bar-counter culture is solo-friendly; entire restaurants are designed for stand-and-eat dinners. <a href="/en/spain/madrid/malasana">Malasaña</a>.</p>

<h2>Tier 3 — possible but not the easy choice</h2>

<p><strong>Paris.</strong> Beautiful for solo walking but the dinner-restaurant culture leans table-for-two. Cafes are fine; full dinner alone gets a few raised eyebrows. Stay in <a href="/en/france/paris/le-marais">Marais</a> or the 11th.</p>

<p><strong>Rome.</strong> Walkable and cafe-friendly during the day. Trastevere evenings work for solo. Centro Storico evenings can feel awkward at a 2-person table for 1.</p>

<p><strong>London.</strong> Pubs are great solo. Restaurants are anonymous-friendly. The cost is the issue more than the social texture.</p>

<h2>Tier 4 — actively awkward solo</h2>

<p><strong>Venice.</strong> Built for couples. Restaurants overwhelmingly seat for two. Romantic-coded everywhere you look.</p>

<p><strong>Bruges.</strong> Same problem as Venice but smaller.</p>

<p><strong>Santorini, Mykonos, the Greek islands generally.</strong> Honeymoon-coded culture. Cafe-counter eating exists but you'll feel out of place.</p>

<p><strong>Most ski-towns in winter.</strong> Group-and-couple culture; solo skiing is a thing but solo après-ski is harder.</p>

<h2>The base-city strategy</h2>

<p>If you have 7-10 days solo and want to hop, base in <strong>Lisbon</strong>, <strong>Berlin</strong>, or <strong>Vienna</strong>. From any of these you can do 4-night anchors with shorter trips out, and your home base feels welcoming whenever you return.</p>

<p>For trip-type-specific accommodation logic, see the city pages — most pull <code>tripTypeFit: solo</code> on the right neighborhoods.</p>
    `.trim(),
  },
  {
    slug: "family-friendly-european-city-breaks",
    title: "Family-Friendly European City Breaks: An Honest Ranking",
    excerpt: "Some European cities work brilliantly with kids. Some are exhausting in ways the guidebooks don't admit. Here's the honest ranking, with the neighborhood that makes the difference per city.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 9,
    metaTitle: "Family-Friendly European City Breaks — Honest Ranking",
    metaDescription: "Which European cities actually work with kids — Copenhagen, Amsterdam, Vienna, Berlin — and which don't (Venice, Dubrovnik, Santorini). With the right neighborhood per city.",
    html: `
<p>"Family-friendly" in city-trip terms means more than "has a playground." The variables that actually matter: stroller-walkable streets, public transit you can navigate with a kid, restaurants that don't sneer at children, parks within reach, and a hotel-room culture where families fit.</p>

<p>This is the honest ranking, with the neighborhood that makes each pick work.</p>

<h2>Tier 1 — the natural choices</h2>

<p><strong>Copenhagen.</strong> The single most family-friendly major European city. Bike infrastructure means even kids can pedal alongside; Tivoli Gardens is a working amusement park; the food culture is permissive of children. Stay in <a href="/en/denmark/copenhagen/indre-by">Indre By</a> for first-time central, <a href="/en/denmark/copenhagen/norrebro">Nørrebro</a> for a longer stay with playgrounds.</p>

<p><strong>Amsterdam.</strong> Bike infrastructure again, plus the Vondelpark, plus a culture of family meals out. Stay in <a href="/en/netherlands/amsterdam/oud-west">Oud-West</a> (next to the park) or <a href="/en/netherlands/amsterdam/jordaan">Jordaan</a> for canal walks.</p>

<p><strong>Vienna.</strong> The Schönbrunn zoo, the Prater amusement park, family-aware restaurants throughout the inner districts. <a href="/en/austria/vienna/leopoldstadt">Leopoldstadt</a> (next to the Prater) is the practical family pick over District 1.</p>

<p><strong>Berlin.</strong> Big enough that boredom-with-kids isn't a worry, plus the Tiergarten, Museum Island, and a famously accommodating attitude toward kids in restaurants. Stay in <a href="/en/germany/berlin/prenzlauer-berg">Prenzlauer Berg</a> — playgrounds in every other plaza, and "Pregnancy Hill" became a meme for good reason.</p>

<h2>Tier 2 — work great with the right strategy</h2>

<p><strong>Lisbon.</strong> The trams are a kid magnet. The hills are punishing with strollers (Alfama is essentially impassable). Stay flat in <a href="/en/portugal/lisbon/baixa-chiado">Baixa-Chiado</a>.</p>

<p><strong>Barcelona.</strong> Beach + zoo + Park Güell + Sagrada Família — a city built for the kid-trip. <a href="/en/spain/barcelona/eixample">Eixample</a> for the grid-walkability; <a href="/en/spain/barcelona/barceloneta">Barceloneta</a> for the beach trip.</p>

<p><strong>Stockholm.</strong> Skansen, Gröna Lund, the archipelago. Family-friendly restaurants. Stay in <a href="/en/sweden/stockholm/norrmalm">Norrmalm</a> for transit access.</p>

<p><strong>Munich.</strong> The English Garden alone earns the visit. <a href="/en/germany/munich/altstadt">Altstadt</a> is genuinely family-friendly; the Glockenbach is hipper but works too.</p>

<p><strong>London.</strong> Free major museums (Natural History, V&A, Science) make a 4-day London trip practically free of cultural costs. <a href="/en/united-kingdom/london/south-kensington">South Kensington</a> puts you 5 minutes from all three.</p>

<h2>Tier 3 — possible but harder</h2>

<p><strong>Paris.</strong> Manageable but not effortless. The metro is uneven on accessibility; the dinner culture is less kid-friendly than other European capitals. Stay in <a href="/en/france/paris/le-marais">Marais</a> for walking and the Picasso garden, but accept tighter restaurants.</p>

<p><strong>Rome.</strong> Beautiful but exhausting with strollers (cobbles, hills). The Centro Storico is genuinely impractical with a stroller. Try <a href="/en/italy/rome/prati">Prati</a> instead — it's wider, calmer, the apartments are bigger.</p>

<p><strong>Madrid.</strong> The Retiro park is wonderful; the rest of the city is less child-coded than Barcelona. Stay near <a href="/en/spain/madrid/salamanca">Salamanca</a> for quiet and parks.</p>

<h2>Tier 4 — skip with kids</h2>

<p><strong>Venice.</strong> Bridges and stroller-impossibility make this exhausting. Save for a couple's trip.</p>

<p><strong>Dubrovnik.</strong> The walled old town has stairs everywhere. Better to stay in <a href="/en/croatia/dubrovnik/lapad">Lapad</a> and day-trip into the walls if you must.</p>

<p><strong>Santorini.</strong> Cliff-side villages with hundreds of steps and minimal stroller-access. Pick another Greek island (Crete works) or another country.</p>

<p><strong>Mostar's old town.</strong> One of the most photogenic places in Europe and one of the worst for kids and strollers. Stay <a href="/en/bosnia-and-herzegovina/mostar/brankovac">just east</a> instead.</p>

<h2>The neighborhood rule</h2>

<p>For families, the neighborhood matters even more than the city. A "kid-friendly city" with the wrong neighborhood is exhausting; a "harder" city with the right neighborhood (flat, parks, big apartments, calmer evenings) works fine. Look for tripTypeFit including "families" on the city pages — those are the verified ones.</p>
    `.trim(),
  },
  {
    slug: "european-beach-towns-worth-staying-in",
    title: "European Beach Towns Worth Staying In (Not Just Day-Tripping)",
    excerpt: "Most European beach towns are better as day trips than overnight stays. A small set are dramatically better as bases. Here's the difference and the picks.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "European Beach Towns Worth Staying In — Honest Picks",
    metaDescription: "Which European coastal towns reward an overnight stay (Sliema, Piran, Lapad, Antalya's Kaleiçi) and which are better as day trips. Honest assessment.",
    html: `
<p>The European beach-town stay is a specific kind of trip. Done well, it's the postcard — wake up to the sea, walk to dinner, return to the sound of waves. Done badly, it's a charmless resort strip with chain hotels, and you'd have been happier in the nearest city day-tripping out.</p>

<p>The difference is whether the town has a real life beyond the beach. Here are the picks where the answer is yes.</p>

<h2>Worth staying in</h2>

<p><strong>Piran, Slovenia.</strong> A medieval Venetian-era town on a peninsula. No cars in the old town, every alley leads to the Adriatic, the cathedral square is the social center. Almost any stay <a href="/en/slovenia/piran/piran-old-town">inside the walls</a> works.</p>

<p><strong>Valletta + Sliema, Malta.</strong> Valletta is a UNESCO peninsula city; Sliema is the modern resort strip across the harbor. Combine: stay <a href="/en/malta/sliema/sliema-strand">Sliema</a> for the pool and beach, ferry to Valletta in 5 minutes for the historical city.</p>

<p><strong>Antalya's Kaleiçi, Turkey.</strong> The Ottoman-era walled old town on the bluff above the harbor — narrow stone streets, boutique guesthouses, and a 10-minute walk down to the marina. <a href="/en/turkey/antalya/kaleici">Kaleiçi</a>. Skip the resort strip 30 minutes east unless you specifically want all-inclusive.</p>

<p><strong>Lapad, Dubrovnik.</strong> Most Dubrovnik visitors stay inside the walls and are exhausted by the cruise crowds. <a href="/en/croatia/dubrovnik/lapad">Lapad</a> is 10-15 minutes by bus, has actual beaches, and dramatically better prices.</p>

<p><strong>Salthill, Galway.</strong> The seaside village 15 minutes' walk along the bay from Galway's old town. <a href="/en/ireland/galway/salthill">Quieter, cheaper, with a 2km promenade</a>.</p>

<p><strong>El Cabanyal, Valencia.</strong> The fishing-village neighborhood east of the city center — colored facades, paella restaurants, two minutes to the sand. <a href="/en/spain/valencia/el-cabanyal">El Cabanyal</a> is the rare beach base inside a major city.</p>

<p><strong>Scheveningen, The Hague.</strong> The North Sea beach 15 minutes from the city by tram. <a href="/en/netherlands/the-hague/scheveningen">Scheveningen</a> is the rare Dutch beach town with city access.</p>

<p><strong>Pyrgos, Santorini.</strong> Skip Oia — go inland. <a href="/en/greece/santorini/pyrgos">Pyrgos</a> is a real Greek village in the middle of the island. No caldera view, but dramatically lower prices and the local-life Santorini that the cliff-villages no longer have.</p>

<h2>Better as day trips than overnight stays</h2>

<p><strong>The Cinque Terre.</strong> The five villages are stunning but each is small enough that a single day covers the highlights. Better to base in La Spezia or even Genoa and visit by train.</p>

<p><strong>Hallstatt, Austria.</strong> Famously beautiful and the day-tripper crowds dominate any overnight. La Hallstatt is overrun by 11am and quiet by 6pm — but in the calm hours the village is small enough that two hours covers it.</p>

<p><strong>Capri.</strong> Same problem as Hallstatt at a larger scale. Stay in Naples or Sorrento and ferry over.</p>

<p><strong>Mykonos's Little Venice.</strong> Photogenic but better as a sunset visit than a base. The island is bigger than Santorini; pick a different beach.</p>

<p><strong>Saint-Tropez.</strong> The town itself is small, expensive, and entirely tourist-managed in summer. Base in Nice or Cannes and day-trip.</p>

<h2>The pattern</h2>

<p>The towns that reward an overnight all share two features: they have a year-round local population, and they're close enough to a real city that you can easily extend the trip if needed. The towns that fail as overnight bases are the famous-for-photogenic-postcard kind — beautiful in 2-3 hours, exhausting in 2-3 days.</p>

<p>If you're picking purely on overnight value: <strong>Piran, Sliema, Kaleiçi, Lapad, El Cabanyal</strong>. Each one has a real life beyond what brings tourists to it.</p>
    `.trim(),
  },
  {
    slug: "christmas-markets-where-to-stay",
    title: "European Christmas Markets: Where to Stay for the Best Ones",
    excerpt: "The Christmas market is one of Europe's last genuinely seasonal travel experiences. Some cities do it better than others, and the neighborhood you book changes the trip entirely.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "European Christmas Markets: Where to Stay — Honest Picks",
    metaDescription: "Best European cities for Christmas market trips — Vienna, Strasbourg, Nuremberg, Prague — with the right neighborhood per city. Avoid Munich's tourist trap. Late-November to mid-December is the sweet spot.",
    html: `
<p>The European Christmas market is the rare seasonal trip that's still genuinely seasonal — the markets open late November and close before Christmas (most by December 23), the décor is real, the mulled wine is real. The catch is that Booking prices triple, hotels sell out in October, and some of the famous markets are heavily tourist-managed.</p>

<p>This is a per-city guide to where to actually stay.</p>

<h2>The classics</h2>

<p><strong>Vienna.</strong> Multiple markets — Rathausplatz is the biggest and most touristy, but Spittelberg in <a href="/en/austria/vienna/neubau">Neubau</a> and Karlsplatz are smaller and better. Stay in <a href="/en/austria/vienna/neubau">Neubau</a> to walk to all three.</p>

<p><strong>Strasbourg.</strong> The most famous Christmas market in Europe, in part because Strasbourg has been doing it since 1570. The entire city center transforms. Stay near the cathedral and accept the price premium — this is one of the few places where being in the historical core is worth it for the market trip.</p>

<p><strong>Nuremberg.</strong> The Christkindlesmarkt in the main square is the most traditional German market. Stay near the Hauptmarkt; the city is small enough that any central hotel works.</p>

<p><strong>Prague.</strong> Old Town Square and Wenceslas Square. Both touristy. <a href="/en/czech-republic/prague/vinohrady">Vinohrady</a> works better as a base — has its own small market and you tram into the center for the bigger ones.</p>

<p><strong>Tallinn.</strong> The Old Town Square market is small, romantic, often snow-covered. The whole city is walkable to it.</p>

<h2>Underrated</h2>

<p><strong>Krakow.</strong> The Rynek Główny market is among the largest in central Europe and gets a fraction of Vienna's crowds. Stay in <a href="/en/poland/krakow/stare-miasto-krakow">Stare Miasto</a> or <a href="/en/poland/krakow/kazimierz">Kazimierz</a>.</p>

<p><strong>Budapest.</strong> The Vörösmarty Square market is small but the city's thermal baths in winter is the second reason to be there. <a href="/en/hungary/budapest/district-v">District V</a>.</p>

<p><strong>Bratislava.</strong> The Hlavné Námestie market is small, atmospheric, and you can combine it with Vienna's markets in a single 4-day train trip.</p>

<p><strong>Riga and Tallinn.</strong> Either Baltic capital is a good Christmas market trip; combining both in one trip works because the bus between them is 4 hours and cheap.</p>

<h2>Skip these</h2>

<p><strong>Munich's main market.</strong> The Marienplatz market is heavily tourist-managed, expensive, and not as atmospheric as smaller German markets. If you must, stay in <a href="/en/germany/munich/altstadt">Altstadt</a>.</p>

<p><strong>Cologne.</strong> Multiple markets but overlapping with cruise tourism. Skip in favor of Nuremberg or Aachen.</p>

<p><strong>Rome and other Italian markets.</strong> Italy has Christmas markets but they're not the cultural anchor they are in German-speaking Europe. Visit Italy in winter for other reasons.</p>

<h2>The booking timing</h2>

<p>Christmas markets prices spike from mid-October. By early November, the central neighborhoods of any famous market city are 60-100% above off-season prices. Book in September if you can. After November 1, expect to either pay through the nose or stay further out.</p>

<p>For winter Europe more broadly, see <a href="/en/articles/europe-in-january-the-honest-off-season-guide">our January off-season guide</a>.</p>

<h2>The packing rule</h2>

<p>The markets are outdoor. By 8pm in central Europe in December, it's around -2°C to 4°C. Real winter coat, hat, gloves, waterproof shoes that handle slush. Layers underneath because every interior is heated to 22°C, including the trams.</p>
    `.trim(),
  },
  {
    slug: "europe-on-a-budget-where-money-still-stretches",
    title: "Europe on a Budget in 2026: Where Your Money Still Goes Far",
    excerpt: "European prices have climbed for a decade. A handful of cities still deliver European-grade history, food, and walkability at non-Western-European prices. Here's the honest list.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 9,
    metaTitle: "Europe on a Budget 2026 — Where Your Money Still Goes Far",
    metaDescription: "Honest 2026 ranking of European cities where the dollar/euro/pound still goes far. Belgrade, Sarajevo, Sibiu, Ljubljana, Tirana, Krakow, Porto. Stays under €80/night with European character.",
    html: `
<p>"Cheap Europe" is a moving target. Prague was a backpacker capital in 2010; it's not in 2026. Lisbon was the budget alternative to Paris until about 2018. The real budget Europe in 2026 lives in a smaller set of cities — and the gap between them and the famous capitals is wider than most travelers realize.</p>

<p>This is the honest list. Numbers are typical mid-range double-room prices for off-peak nights.</p>

<h2>Genuinely cheap (€40-€80/night, central, decent quality)</h2>

<p><strong>Sibiu, Romania.</strong> Saxon-walled old town, "eyes of Sibiu" rooftops, walking-everywhere small. <a href="/en/romania/sibiu/piata-mare">Piața Mare</a> hotels run €50-€80.</p>

<p><strong>Brașov, Romania.</strong> Same story as Sibiu. <a href="/en/romania/brasov/piata-sfatului">Piața Sfatului</a> works at €60-€90.</p>

<p><strong>Cluj-Napoca, Romania.</strong> University city, modern energy. <a href="/en/romania/cluj-napoca/piata-unirii">Piața Unirii</a> at €50-€80.</p>

<p><strong>Sarajevo, Bosnia.</strong> Ottoman-era atmosphere, dramatic mountain setting. <a href="/en/bosnia-and-herzegovina/sarajevo/bascarsija">Baščaršija</a> guesthouses at €40-€70.</p>

<p><strong>Mostar, Bosnia.</strong> Single-night stay-just-east-of-the-bridge plays at €40-€60. <a href="/en/bosnia-and-herzegovina/mostar/brankovac">Brankovac</a>.</p>

<p><strong>Košice, Slovakia.</strong> Underrated eastern Slovak city, the long pedestrian Hlavná boulevard. <a href="/en/slovakia/kosice/hlavna-kosice">Stays at €60-€90</a>.</p>

<h2>Still affordable (€80-€130/night)</h2>

<p><strong>Krakow, Poland.</strong> No longer dirt-cheap but 30-50% below Western European peers. <a href="/en/poland/krakow/kazimierz">Kazimierz</a> hotels run €80-€130.</p>

<p><strong>Wroclaw, Poland.</strong> Smaller than Krakow, dramatically prettier than Warsaw, the dwarfs are charming. €70-€110 in <a href="/en/poland/wroclaw/stare-miasto-wroclaw">Stare Miasto</a>.</p>

<p><strong>Tartu, Estonia.</strong> University-town energy, dramatically cheaper than Tallinn. €60-€100 in <a href="/en/estonia/tartu/tartu-old-town">the old town</a>.</p>

<p><strong>Lisbon and Porto.</strong> Still cheaper than Paris/London/Amsterdam but the gap has closed since 2018. Expect €100-€160 for a central mid-range hotel. <a href="/en/portugal/porto/cedofeita">Cedofeita</a> is the value pick in Porto.</p>

<p><strong>Budapest.</strong> Mid-tier in this list. €90-€150 for central. <a href="/en/hungary/budapest/district-vii">District VII</a> for the cheaper end.</p>

<h2>Mid-priced — Western European feel without Western prices</h2>

<p><strong>Athens.</strong> Major European capital pricing is well below Paris/Madrid/Rome. €100-€170 in <a href="/en/greece/athens/koukaki">Koukaki</a>.</p>

<p><strong>Valencia.</strong> Cheaper than Barcelona, almost as good. €100-€160 in <a href="/en/spain/valencia/ruzafa">Ruzafa</a>.</p>

<p><strong>Seville.</strong> Andalusia in general is cheaper than Mediterranean Spain. €100-€160 in <a href="/en/spain/seville/alfalfa">Alfalfa</a>.</p>

<h2>Where it doesn't work</h2>

<p>Anywhere in Switzerland, Norway, Iceland, or Denmark — the budget version doesn't really exist. The cheapest mid-range hotel in Reykjavík still runs €180. The hostel scene is the only true budget play in those countries.</p>

<p>Major Western European capitals (Paris, London, Amsterdam) — even the budget neighborhoods are €120+/night for anything decent.</p>

<h2>The transit rule</h2>

<p>In every cheap-Europe city, the central neighborhood is a 5-15 minute walk or single tram ride. The pattern of "stay 30 minutes out for the deal" doesn't apply — the city centers themselves are affordable, so you don't gain enough by going to the periphery to justify the lost time.</p>

<p>Budget Europe in 2026 is real. It's just smaller than it was in 2010. Pick from the list above and you'll have a genuinely European experience without the Paris-pricing.</p>
    `.trim(),
  },
  {
    slug: "spain-or-portugal-which-and-why",
    title: "Spain or Portugal? Honest Differences for Your First Iberian Trip",
    excerpt: "If you have a week and have never been to Iberia, both work. They are also dramatically different countries with different ideal trip types. Here's how to actually choose.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "Spain or Portugal — How to Choose Your First Iberian Trip",
    metaDescription: "Honest Spain vs Portugal comparison: walkability, food, cost, weather, language, ideal trip type. Lisbon vs Madrid, Porto vs Barcelona, the rural side, where to start.",
    html: `
<p>Spain and Portugal are tourist-marketing-adjacent but culturally distant. Both are Iberian; that's most of what they share. Spain is bigger, more varied, more dramatic in its food and rhythms. Portugal is smaller, gentler, more melancholic in its tone, dramatically cheaper.</p>

<p>If you have one week for your first Iberian trip, here's how to actually pick.</p>

<h2>Pick Portugal if</h2>

<p>You're newly into European travel, want a slow rhythm, prioritize food over sights, are traveling solo or as a couple, are budget-conscious, or want a calmer trip. Lisbon and Porto can carry a 7-day trip with a Sintra side-trip and have you wishing you'd booked 10. <a href="/en/portugal/lisbon/principe-real">Príncipe Real</a> in Lisbon and <a href="/en/portugal/porto/cedofeita">Cedofeita</a> in Porto are the bases.</p>

<h2>Pick Spain if</h2>

<p>You want variety, the trip has multiple cities, you're a foodie who wants the dinner-at-10pm rhythm, you're traveling with a group, you want both cities and beaches, or this is your second European trip and you want range. A 7-day Spain trip can credibly cover Madrid + Barcelona + a third stop (Granada or San Sebastián).</p>

<h2>The food argument</h2>

<p>Both countries are food destinations. Spain is more varied — Basque, Catalan, Andalusian, and central Spanish cuisines are genuinely different. Portugal is more focused — pastéis de nata, bacalhau, octopus, port — but everything is excellent at all price points.</p>

<p>If your trip is heavily food-driven, Spain offers more variety and more depth at the high end. Portugal offers more consistency and value across the price range.</p>

<h2>The walkability and pace</h2>

<p>Lisbon and Porto are smaller and more walkable than Madrid and Barcelona. Lisbon hills are punishing; Porto hills are punishing. Madrid is flat; Barcelona is flat. If walkability matters and you don't mind hills, both Iberian options work. If you want flat walking, Madrid or Barcelona.</p>

<h2>The cost</h2>

<p>Portugal is meaningfully cheaper. Mid-range central hotels in Lisbon: €100-€160. In Porto: €80-€140. Madrid mid-range: €130-€200. Barcelona mid-range: €140-€220. Restaurant prices follow the same pattern; Portuguese dinners average 25-40% below Spanish equivalents.</p>

<h2>The English-language comfort</h2>

<p>Portugal has higher English-comfort than Spain. Portuguese hospitality workers under 50 generally speak fluent English; Spanish workers vary widely by region (better in Barcelona, worse in Madrid, surprisingly variable in Andalusia).</p>

<h2>The rural side trips</h2>

<p>Portugal: Sintra, the Douro Valley (port country), the Algarve coast in shoulder season. All accessible by train or 90-minute drive.</p>

<p>Spain: dramatically more varied. The Basque coast, Andalusia, the Pyrenees, the Camino, Mallorca and the islands. A second Spain trip could easily fill another two weeks.</p>

<h2>The split-trip option</h2>

<p>If you have 10+ days, do both. The natural route is Lisbon → Porto → fly or bus to Madrid → Barcelona, or reverse. Madrid-Lisbon by rail is fragmented (the old sleeper is gone); flying between them is 1h15.</p>

<p>The single-week version: pick one country and commit. Spain rewards the multi-city approach; Portugal rewards going slow.</p>

<h2>The simple version</h2>

<p>Calmer trip, food-focused, budget-conscious, first European trip: <strong>Portugal</strong>.</p>

<p>Variety, multiple cities, second-or-later European trip, group travel: <strong>Spain</strong>.</p>

<p>Most travelers should do Portugal first and Spain second. The reverse works but Spain often spoils Portugal slightly with its dramatic scale.</p>
    `.trim(),
  },
  {
    slug: "italy-vs-greece-summer-decision",
    title: "Italy vs Greece for a Summer Trip: The Honest Decision",
    excerpt: "Both are Mediterranean summer classics. Both have islands. Both have ancient history. But the trips are dramatically different, and a wrong pick costs you the kind of trip you actually wanted.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "Italy vs Greece for Summer — Honest Comparison",
    metaDescription: "Italy or Greece for your summer trip: islands, food, walkability, cost, ancient history, beach vs city focus. Honest assessment to pick the right country for your specific trip type.",
    html: `
<p>Italy and Greece are both Mediterranean summer classics that get marketed interchangeably. They aren't. The trip type each rewards is different, the mistakes you can make are different, and the right pick depends almost entirely on what you actually want.</p>

<p>Here's how to choose.</p>

<h2>Pick Italy if</h2>

<p>You want cities and history first, beaches second. You're traveling with someone who needs more variety than just sea-and-relax. You want walkable old towns where you can do dinners-out for a week without repeating cuisine. You have 2+ weeks and want range. The trip is built around food and art rather than swimming.</p>

<p>Italian summer cities are punishingly hot but they have indoor culture (museums, churches, restaurants with AC) that Greek islands don't. Rome and Florence in July are doable; Mykonos in July is sea-and-sun-and-not-much-else.</p>

<h2>Pick Greece if</h2>

<p>The trip is about the islands. You want a slower pace, a single island for a week. You're a couple on a romantic stay or honeymoon. You don't mind that food variety is narrower (the Greek-island restaurant menu is fairly consistent across the Aegean — and that's a feature, not a bug). Beach quality is paramount.</p>

<h2>The cities argument</h2>

<p>Italy wins overwhelmingly. Rome, Florence, Venice, Naples, Milan, Bologna — every Italian city has a distinctive identity, dense food scene, and walkable old town. Athens is the only Greek city that comparably rewards a multi-day stay; Thessaloniki is great but smaller. The Greek mainland's other cities are more functional than charming.</p>

<h2>The islands argument</h2>

<p>Greece wins decisively. Italian islands (Capri, Sicily, Sardinia) are wonderful, but the Greek archipelago has scale Italy can't match — hundreds of islands, a dozen of which are world-class, with a reliable ferry network.</p>

<p>The Italian island trip is one or two destinations. The Greek island trip is hopping.</p>

<h2>The food</h2>

<p>Italy wins on variety. Twenty regions with distinct cuisines, the world's most influential food culture, dinner-table consistency at every price point.</p>

<p>Greece is narrower and excellent at what it does. Grilled fish, octopus, dakos, mezze, fresh tomatoes, tzatziki. The repetition is part of the experience.</p>

<h2>The cost</h2>

<p>Roughly equivalent at the high end. Greece is cheaper at the mid-range, especially on the lesser-known islands. Italian cities run €130-€220 for a central mid-range. Greek islands run €80-€160 outside Mykonos and Santorini (which are punitive — Mykonos in July is luxury-pricing only).</p>

<h2>The walkability and heat</h2>

<p>Italian cities in July-August are 32-38°C. Walking three hours through Rome at midday is genuinely dangerous. Plan for early-morning sights and late dinners.</p>

<p>Greek islands have sea breezes and shade isn't an emergency the way it is in Roman streets. The walking is shorter (most island towns are villages) and the climate is more pleasant.</p>

<h2>The wrong-pick costs</h2>

<p>Going to Italy when you wanted islands: you'll spend the trip feeling exhausted by city heat and resenting the lack of clear water.</p>

<p>Going to Greece when you wanted history and variety: by day five you'll feel restless and the menu repetition will start to grate.</p>

<h2>The combined trip</h2>

<p>If you have 2+ weeks, do both. Italian week first (Rome-Florence-Venice or Rome-Naples-Amalfi), then a flight to Athens, then an island for the second week. The pacing works — you do the high-stimulation city week first, then the slow-island week.</p>

<p>For specific city neighborhoods see <a href="/en/italy/rome">Rome</a>, <a href="/en/italy/florence">Florence</a>, <a href="/en/italy/venice">Venice</a> on the Italian side; <a href="/en/greece/athens">Athens</a> and <a href="/en/greece/santorini">Santorini</a> on the Greek side.</p>
    `.trim(),
  },
  {
    slug: "scandinavia-which-capital-to-pick",
    title: "Stockholm, Copenhagen, or Oslo: Which Scandinavian Capital to Pick",
    excerpt: "All three are excellent. They are also expensive enough that you'll likely pick one rather than all three for a first trip. Here's how to choose.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "Stockholm vs Copenhagen vs Oslo — Honest Pick for Your Trip",
    metaDescription: "Honest comparison of the three Scandinavian capitals. Stockholm for design and water, Copenhagen for food and bikes, Oslo for nature access. Costs, neighborhoods, ideal trip types.",
    html: `
<p>Stockholm, Copenhagen, and Oslo each get marketed as "the design capital" and "the most livable city" and "the food destination." They're all true to varying degrees, but the cities have meaningfully different identities. If you're picking one — and at Scandinavian prices most travelers pick one — here's how to choose.</p>

<h2>Pick Copenhagen if</h2>

<p>You want bike infrastructure, dense food scene, and the easiest Scandinavian first-trip. Copenhagen is flat, walkable, English-fluent, and family-friendly in a way the other two capitals are not. Tivoli Gardens for kids, the Meatpacking District for foodies, restaurants in <a href="/en/denmark/copenhagen/vesterbro">Vesterbro</a> that beat anything Stockholm has.</p>

<p>Best for: families, foodies, first-time Scandinavia, summer trips.</p>

<h2>Pick Stockholm if</h2>

<p>You want islands, design, and the most beautiful capital city in Scandinavia (probably). Stockholm is built on 14 islands; the geography is the experience. Skansen, Vasa, Gamla Stan — each is a destination. <a href="/en/sweden/stockholm/sodermalm">Södermalm</a> is the design-and-evening base; <a href="/en/sweden/stockholm/gamla-stan">Gamla Stan</a> is the postcard.</p>

<p>Best for: design-trip travelers, repeat-Scandinavia visitors, summer.</p>

<h2>Pick Oslo if</h2>

<p>Your trip is really about Norwegian nature and Oslo is the gateway. Oslo itself is the smallest of the three capitals and probably the least-rewarding as a pure city stay — but the access to the fjords, the Bergensbanen train, the winter ski areas, makes it the right base if your trip is multi-stop Norway. <a href="/en/norway/oslo/grunerlokka">Grünerløkka</a> for the food scene; <a href="/en/norway/oslo/sentrum-oslo">Sentrum</a> for transit access.</p>

<p>Best for: nature-trip travelers using Norway as the focus, winter (skiing), repeat-Scandinavia visitors with a fjord priority.</p>

<h2>The cost</h2>

<p>All three are expensive. Norway is the most expensive (Oslo dinners run €30-€50 for mid-range). Sweden is the next; Denmark slightly cheaper. None are budget destinations.</p>

<p>Hotel mid-range central: Oslo €180-€280, Stockholm €150-€250, Copenhagen €160-€280.</p>

<h2>The food</h2>

<p>Copenhagen is the food destination, hands-down. Noma's influence, the New Nordic movement, an entire generation of young chefs. Stockholm is excellent but a tier below. Oslo has bright spots but isn't a food trip in itself.</p>

<h2>The walkability</h2>

<p>Copenhagen is the easiest city to navigate — flat, compact, bike-able. Stockholm requires some boat or bridge traverses to get the most out of it. Oslo is small and walkable but the city-only experience is limited.</p>

<h2>The transit hub strategy</h2>

<p>If you want multiple cities, Copenhagen is the natural hub. Trains to Stockholm (5 hours), trains south to Hamburg, ferries to the Baltic. Stockholm is more isolated — flights are usually faster than rail to most non-Swedish destinations.</p>

<p>Helsinki is excellent and underrated; if you're considering all four Nordic capitals, do Copenhagen → Stockholm → ferry to Helsinki, with Oslo as a separate fjord-focused trip.</p>

<h2>The simple version</h2>

<p>First Scandinavia trip with the standard checklist: <strong>Copenhagen</strong>.</p>

<p>Second Scandinavia trip wanting design and water: <strong>Stockholm</strong>.</p>

<p>Trip really about Norway's nature: <strong>Oslo</strong> as a base, then Bergen.</p>

<p>For specific neighborhood picks see <a href="/en/denmark/copenhagen">Copenhagen</a>, <a href="/en/sweden/stockholm">Stockholm</a>, <a href="/en/norway/oslo">Oslo</a>.</p>
    `.trim(),
  },
  {
    slug: "germany-beyond-berlin-where-to-go",
    title: "Germany Beyond Berlin: Where to Go on Your Second German Trip",
    excerpt: "Berlin is a good first answer. Germany has a half-dozen other cities worth a 4-day trip in their own right. Here's how to pick the second one.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 8,
    metaTitle: "Germany Beyond Berlin — Honest Picks for Your Second Trip",
    metaDescription: "Munich, Hamburg, Cologne, Dresden, Heidelberg, the Black Forest. Honest second-trip German city ranking with the right neighborhood per city.",
    html: `
<p>Berlin is the right first German trip — wide, weird, walkable, English-friendly, deep enough for a full week. Once you've done Berlin, the rest of Germany unfolds: Bavaria's beer culture, Hamburg's port-city character, the Rhineland, the Schwarzwald.</p>

<p>This is a guide to picking the second one based on what you want.</p>

<h2>Munich</h2>

<p>The most-visited German city after Berlin, in part because of Oktoberfest, in part because Munich is the gateway to the Alps. The city itself is more polished and conservative than Berlin — Bavaria is its own thing — and the food culture is heavier (sausages, pretzels, beer halls).</p>

<p>Stay in <a href="/en/germany/munich/glockenbachviertel">Glockenbachviertel</a> rather than Altstadt. Same walking distances, dramatically more interesting evenings, and the gay-friendly scene is one of central Europe's best.</p>

<p>Best for: beer-and-pretzel weekends, first-time Bavaria, Alps base.</p>

<h2>Hamburg</h2>

<p>Northern German port city, dramatically different from southern Germany — colder, sharper, more Hanseatic. The Reeperbahn nightlife is famous; the Elbphilharmonie is the architectural icon; the Sternschanze food district is excellent.</p>

<p>Stay in <a href="/en/germany/hamburg/sternschanze">Sternschanze</a>. Walking distance to the Reeperbahn but vastly nicer at street level.</p>

<p>Best for: water-and-architecture trips, music and indie food scene, North Sea / Baltic combination travel.</p>

<h2>Cologne</h2>

<p>Most underrated of the German big-five for travelers. Cathedral is dramatic; the city itself is mid-tier-interesting. The catch: the Belgian Quarter is one of Germany's coolest neighborhoods.</p>

<p>Stay in <a href="/en/germany/cologne/belgisches-viertel">Belgisches Viertel</a>, not Altstadt. Same train access; vastly better evenings.</p>

<p>Best for: combined Cologne + Düsseldorf trips, Rhine river trips, weekenders from London/Paris.</p>

<h2>Dresden</h2>

<p>Saxon Baroque elegance, rebuilt from scratch after WWII, the Frauenkirche, the Zwinger. Smaller than Munich/Hamburg/Cologne and more focused as a sights trip. Genuinely one of the most beautiful cities in Germany.</p>

<p>Best for: art-and-architecture trips, classical music focus, eastern Germany road trips.</p>

<h2>Heidelberg</h2>

<p>Small (160k), university town, the romantic-Germany cliché in concentrated form. Castle, riverside walks, Old Town. Best as a 2-day stop on a longer trip, not as a sole destination.</p>

<p>Best for: family trips, retirees on a romantic short stay, students.</p>

<h2>Frankfurt and Stuttgart</h2>

<p>Both are functional rather than charming. Stay only if you're working there or have a specific reason. Frankfurt's Sachsenhausen has a small Old Town worth a single dinner. Stuttgart is car-industry-functional.</p>

<h2>The Schwarzwald (Black Forest)</h2>

<p>Not a city but a region. Freiburg as the city base, then drive or train to the smaller towns (Triberg, Baden-Baden). Beautiful, unusual for Germany — wine and cuckoo clocks rather than beer and pretzels.</p>

<p>Best for: rental-car trips, hiking weekends, autumn travel.</p>

<h2>The simple version</h2>

<p>Active beer-culture weekend: <strong>Munich</strong>.</p>

<p>Port-city character and indie food: <strong>Hamburg</strong>.</p>

<p>Underrated value with great neighborhood: <strong>Cologne</strong>.</p>

<p>Beauty over scale: <strong>Dresden</strong>.</p>

<p>Region over city: <strong>Schwarzwald</strong>, with Freiburg as base.</p>
    `.trim(),
  },
  {
    slug: "off-season-romance-cities-honest-list",
    title: "Cities That Are Best Off-Season: An Honest Romance List",
    excerpt: "The most romantic European cities are also the most overrun. A handful of them transform when the day-trippers leave. Here's the list of who that's true for.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 7,
    metaTitle: "European Cities Best Off-Season — Honest Romance Picks",
    metaDescription: "Which famous European cities transform off-season — Bruges, Venice, Mostar, Dubrovnik, Florence — and which are just the same minus the heat. Where to actually go for shoulder-season romance.",
    html: `
<p>The famous European honeymoon cities have a problem: in season they're overrun. Bruges in summer is a stag-do hellscape. Venice in July is shoulder-to-shoulder. Dubrovnik between May and October is a cruise-ship parking lot.</p>

<p>The fix isn't a different city. It's the same city in November. Here's the list of where that's true and where it isn't.</p>

<h2>Transformative off-season</h2>

<p><strong>Bruges, late October to early March.</strong> The day-trippers vanish. The canals are quiet by 6pm. The chocolate shops are still open and you can stand in front of the Madonna and Child without queuing. <a href="/en/belgium/bruges/binnenstad-bruges">Binnenstad</a>.</p>

<p><strong>Venice, mid-November to mid-March (excluding Carnival).</strong> The fog is the experience. Cannaregio empties of cruise traffic. Restaurants take reservations again. Acqua alta floods your boots in October-November but the rest of the off-season is dry and dramatic. <a href="/en/italy/venice/cannaregio">Cannaregio</a>.</p>

<p><strong>Mostar, October to April.</strong> The day-trippers leave by 6pm in any season, but the off-season multiplies that effect. The bridge at dawn with no other tourists is the trip. <a href="/en/bosnia-and-herzegovina/mostar/stari-grad-mostar">Stari Grad</a>.</p>

<p><strong>Dubrovnik, November to early April.</strong> Same logic — the cruise ships dock from May to October. November Dubrovnik is empty walls, your own afternoon view from Mt. Srđ. <a href="/en/croatia/dubrovnik/old-town-dubrovnik">Old Town</a>.</p>

<p><strong>Cinque Terre, late October to March.</strong> The villages become real towns again. Shopkeepers have time to talk. Some restaurants close but enough stay open. The hiking trails are quiet.</p>

<p><strong>Český Krumlov, October to April.</strong> Day-tripper density peaks May-September, drops 80% off-season. The town becomes itself again.</p>

<h2>Year-round more or less the same</h2>

<p><strong>Paris.</strong> Crowded year-round; the seasons matter for weather more than density. February is genuinely quiet but cold and damp; June is busy but pleasant.</p>

<p><strong>Rome.</strong> Same — overrun in any season the average tourist would consider going. November rain is the off-season trade.</p>

<p><strong>London.</strong> Year-round busy. Christmas decorations are nice; April daffodils are nice; otherwise pick on weather.</p>

<p><strong>Amsterdam.</strong> Same — if anything more crowded in November (truffle season, less queue management at the Anne Frank House but more concentrated tourists in the few months without rain).</p>

<h2>Off-season makes them worse</h2>

<p><strong>Anywhere on the Greek islands.</strong> Most ferries reduce to weekly. Most restaurants close. The villages can be 70% shuttered in February.</p>

<p><strong>Coastal Croatia, Albania, Montenegro.</strong> Same problem. Beautiful in shoulder season; basically closed in deep off-season.</p>

<p><strong>Mediterranean beach towns generally.</strong> The rule: cities transform off-season; resorts close.</p>

<h2>The shoulder seasons are usually the answer</h2>

<p>For most of these cities, the perfect window is <strong>late September to mid-October</strong> or <strong>April to mid-May</strong>. Mostly empty of summer tourists, weather still pleasant, restaurants open. November is the dramatic-empty window if you're willing to take rain and cold.</p>

<p>For winter Europe specifically, see <a href="/en/articles/europe-in-january-the-honest-off-season-guide">the January guide</a> and <a href="/en/articles/europe-in-november-the-honest-off-season-guide">November guide</a>.</p>

<p>The romance-trip-with-no-crowds itinerary: pick one of the above transformative cities, go in early November, book a hotel that has a fireplace or canal-view, accept that some restaurants will be closed, and have one of the better trips of your life.</p>
    `.trim(),
  },
  {
    slug: "underrated-european-cities-most-travelers-miss",
    title: "Underrated European Cities Most Travelers Miss",
    excerpt: "Not every European city benefits from a marketing budget. A handful of cities are objectively excellent and chronically under-visited. Here's the list, with the right neighborhood per city.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 9,
    metaTitle: "Underrated European Cities — Honest List of Hidden Gems",
    metaDescription: "Cities most travelers miss — Antwerp, Tartu, Cluj, Wroclaw, Brno, Aarhus, Bilbao, Coimbra, Sibiu — with honest assessment of what they offer and where to stay.",
    html: `
<p>Some European cities are objectively excellent and chronically under-visited. The reason isn't quality — it's marketing budgets, airline routes, and what your friend who went to Europe in 1998 told you to do.</p>

<p>Here are the cities that consistently surprise travelers who've already done the obvious. Each is worth a 3-4 day trip in its own right.</p>

<h2>Antwerp, Belgium</h2>

<p>Often overshadowed by Brussels and Bruges, Antwerp is the better stay than either. Het Eilandje (the redeveloped old harbor) has the MAS museum and design hotels; the Old Town has a beautiful main square. Plus the Antwerp Six fashion legacy gives it a creative edge other Belgian cities don't have.</p>

<p>Stay in <a href="/en/belgium/antwerp/het-eilandje">Het Eilandje</a> for the new architecture or <a href="/en/belgium/antwerp/oude-stad-antwerp">Oude Stad</a> for the medieval center.</p>

<h2>Cluj-Napoca, Romania</h2>

<p>Romania's most modern city — a university hub with a dense café scene, the Saint Michael's Church on Piața Unirii, and dramatically lower prices than any Western European peer. The city has the energy of a smaller Budapest.</p>

<p>Stay in <a href="/en/romania/cluj-napoca/piata-unirii">Piața Unirii</a>.</p>

<h2>Tartu, Estonia</h2>

<p>Estonia's university city, two hours south of Tallinn by bus. Dramatically smaller than Tallinn, dramatically cheaper, dramatically more local-feeling. Mid-range hotels run €60-€100. The whole city is walkable in 30 minutes.</p>

<p>Stay in <a href="/en/estonia/tartu/tartu-old-town">Old Town</a>.</p>

<h2>Brno, Czechia</h2>

<p>Prague gets the tourism, Brno gets the modernist architecture. Villa Tugendhat alone is worth the trip; the city itself is small but well-designed; prices are about half of Prague.</p>

<p>Stay in <a href="/en/czech-republic/brno/stred">Střed</a>.</p>

<h2>Aarhus, Denmark</h2>

<p>Denmark's second city, three hours west of Copenhagen by train. ARoS Art Museum (the rainbow panorama is unforgettable), the Latin Quarter, the Aarhus Ø harbor architecture. Functions as a Copenhagen alternative or a 4-day add-on.</p>

<p>Stay in <a href="/en/denmark/aarhus/midtbyen">Midtbyen</a> or <a href="/en/denmark/aarhus/aarhus-o">Aarhus Ø</a>.</p>

<h2>Sibiu, Romania</h2>

<p>Saxon-walled Transylvanian city. The "eyes of Sibiu" rooftops are unmistakable; the main square is one of central Europe's prettiest. Compact enough for two days, dramatically cheaper than any famous-Saxon-walled equivalent (Tallinn, Talavera, etc.).</p>

<p>Stay in <a href="/en/romania/sibiu/piata-mare">Piața Mare</a>.</p>

<h2>Wrocław, Poland</h2>

<p>Possibly Poland's most underrated city. The dwarfs (300+ small bronze statues scattered across the city), the colorful merchant-house Rynek, and dramatically cheaper than Krakow. A 4-day Wrocław weekend can rival a 4-day Krakow weekend on most metrics.</p>

<p>Stay in <a href="/en/poland/wroclaw/stare-miasto-wroclaw">Stare Miasto</a>.</p>

<h2>Bilbao, Spain</h2>

<p>The Basque north — the Guggenheim, dramatic architecture, a serious food scene that gives Madrid a run. Often overshadowed by San Sebastián (which is also wonderful but more expensive). Three days easily filled.</p>

<h2>Sarajevo, Bosnia</h2>

<p>The user-friendly Balkans capital. Ottoman-era Baščaršija, the dramatic mountain setting, rich and difficult 20th-century history, and prices that put it in the cheap-Europe tier. Almost everyone who visits leaves saying "I wish I'd given it more days."</p>

<p>Stay in <a href="/en/bosnia-and-herzegovina/sarajevo/bascarsija">Baščaršija</a>.</p>

<h2>Coimbra, Portugal</h2>

<p>Portugal's old university city between Lisbon and Porto. Historical, walkable, dramatically less touristy than either bigger sister. The university itself is UNESCO-listed.</p>

<h2>Bologna, Italy</h2>

<p>Often skipped between Florence and Venice. The food capital of Italy by most rankings — meaning that itself in a country of food capitals is a genuine claim. Walkable, atmospheric, cheaper than Florence.</p>

<h2>Bratislava, Slovakia</h2>

<p>Often dismissed as a "Vienna day-trip." It's small, but a single overnight stay reveals a charming compact old town that's worth the time. Stay in <a href="/en/slovakia/bratislava/stare-mesto-bratislava">Staré Mesto</a>.</p>

<h2>The pattern</h2>

<p>The underrated cities share a pattern: they're not on the standard 14-day Western European loop, they don't have a major budget airline hub, and the dominant English-language guidebook coverage is sparse. None of those are quality signals.</p>

<p>If you've done the standard rounds and want something genuinely different, pick from the above. None will disappoint.</p>
    `.trim(),
  },
  {
    slug: "how-many-days-each-european-city",
    title: "How Many Days for Each European City: An Honest Guide",
    excerpt: "Some European cities are fully 3-day trips. Some need a week to make the math work. Some are exhausting after 4 days. Here's the honest answer for each major European city.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 9,
    metaTitle: "How Many Days for Each European City — Honest Guide",
    metaDescription: "Honest day-count guide for European cities. How many nights you actually need in Paris, Rome, Lisbon, Berlin, Istanbul, Amsterdam. Avoiding the trap of one-night-everywhere.",
    html: `
<p>The single most common European-trip mistake is the wrong day-count per city. Three days in Rome is not enough. Six days in Bruges is too many. Two days in London is a waste. The right number per city depends on what's there to see and how much the city rewards slow time.</p>

<p>This is a per-city honest answer for the 30 cities most travelers consider.</p>

<h2>Cities that need 6+ days</h2>

<p><strong>Rome.</strong> The Vatican alone is a half-day. The Forum + Colosseum is a half-day. Trastevere evenings need their own night. Roman day-trips (Tivoli, Frascati) deserve a day. 7 days is generous; 5 is the floor.</p>

<p><strong>London.</strong> The free major museums alone (British, V&A, Natural History, Tate Modern, Tate Britain, National Gallery) are six half-days. Plus West End theatre. Plus day-trips to Bath/Windsor/Cambridge. 5 days minimum.</p>

<p><strong>Istanbul.</strong> Big enough that even one section (the historical peninsula) is 2 full days. Add Beyoğlu, the Bosphorus, an Asian-side ferry day, and you're at 5-7. 6 days is right.</p>

<p><strong>Berlin.</strong> Wide-spread, with Museum Island, the Wall memorials, multiple worth-it neighborhoods. 5-6 days for first-time, 7+ if your trip is dinner-and-nightlife focused.</p>

<h2>4-5 day cities</h2>

<p><strong>Paris.</strong> 4 days is enough for first-timers focused on the major sights and a couple of neighborhoods. 5 if you add Versailles. Less than 4 leaves you exhausted.</p>

<p><strong>Madrid.</strong> 3 full days is the museum minimum (Prado, Reina Sofía, Thyssen). 4 with a tapas-walking weekend.</p>

<p><strong>Barcelona.</strong> 3-4 days for sights + beach. 5 if you add Montserrat or a wine-tour day.</p>

<p><strong>Florence.</strong> 3 days for the Uffizi-Pitti-cathedral circuit. 4 if you add Fiesole or a wine tour. Florence empties faster than expected.</p>

<p><strong>Vienna.</strong> 4 days for the imperial-Vienna circuit + the cafés. 5 if you add Schönbrunn at leisure or a day-trip to Bratislava.</p>

<p><strong>Amsterdam.</strong> 3-4 days. The city is small but the canal-walking + museums + bike-around fills the time.</p>

<p><strong>Athens.</strong> 3 days for the central archaeology + Plaka + at least one neighborhood like <a href="/en/greece/athens/koukaki">Koukaki</a>. 4 if you add Cape Sounion.</p>

<h2>3-day cities</h2>

<p><strong>Lisbon.</strong> 3 days covers the major hilltops (Alfama, Príncipe Real, Bairro Alto). Add Sintra as day-trip 4.</p>

<p><strong>Porto.</strong> 2-3 days. Smaller and more concentrated than Lisbon.</p>

<p><strong>Prague.</strong> 3 days. After that the central old-town wears thin.</p>

<p><strong>Budapest.</strong> 3-4 days. The two sides of the river plus the thermal baths plus dinner culture.</p>

<p><strong>Krakow.</strong> 3 days. Plus a day for Auschwitz.</p>

<p><strong>Copenhagen.</strong> 3 days, 4 if you add Helsingør or Roskilde.</p>

<p><strong>Stockholm.</strong> 3-4 days. The island-hopping is part of it.</p>

<p><strong>Dublin.</strong> 3 days. After that you're really doing Ireland not Dublin.</p>

<h2>2-day cities</h2>

<p><strong>Bruges.</strong> One full day + an evening + breakfast. Anything more is repeat-walking.</p>

<p><strong>Sibiu.</strong> Two days max for the city itself.</p>

<p><strong>Mostar.</strong> One night at most. The city is one square + the bridge. Better as a Sarajevo-Dubrovnik stopover.</p>

<p><strong>Cesky Krumlov.</strong> One night.</p>

<p><strong>Salzburg.</strong> 2 days for the city + Festung + Mirabell. 3 only during the festival.</p>

<p><strong>Galway.</strong> 2-3 days, primarily as a base for the Cliffs of Moher.</p>

<p><strong>Reykjavík.</strong> 2 days for the city itself; everything else is the rest of Iceland.</p>

<h2>1-night cities</h2>

<p><strong>Pisa.</strong> The leaning tower is 90 minutes and you've seen the highlights. Don't sleep there if you can avoid it.</p>

<p><strong>Bratislava.</strong> 1-2 nights as a Vienna add-on.</p>

<p><strong>San Marino.</strong> A long day-trip.</p>

<p><strong>Most ski-villages.</strong> If you're not skiing, one night.</p>

<h2>The rule</h2>

<p>If a city has fewer than 3 worth-it days, you're better off as a day-tripper from a real city. If a city has more than 4 worth-it days, you're robbing yourself by trying to "fit it into a one-week loop."</p>

<p>The classic mistake is the 14-day, 7-city European loop. Almost no European trip benefits from changing hotels every other night. Pick 3-4 cities for a 14-day trip, with 3-5 nights each. The rest is wasted on transit.</p>
    `.trim(),
  },
  {
    slug: "european-train-vs-flight-how-to-decide",
    title: "Train vs Flight Within Europe: A Decision Guide",
    excerpt: "Romance says train. Math sometimes says flight. Here's the actual decision tree, with concrete corridors where each one wins.",
    publishedAt: "2026-05-04",
    reviewedAt: "2026-05-04",
    readingTimeMin: 7,
    metaTitle: "Train vs Flight in Europe — How to Decide",
    metaDescription: "When to take the train and when to fly within Europe. Concrete corridor analysis, time math, what to do about luggage, comfort, scenery, and cost.",
    html: `
<p>The default assumption — "Europe by train" — is correct on certain corridors and wrong on others. The variables are simple: total door-to-door time, cost, and whether the journey itself is part of the trip.</p>

<p>Here's the decision tree.</p>

<h2>The 4-hour rule</h2>

<p>Within Europe, if the train journey is under 4 hours, take the train. Always. Door-to-door it'll beat flying once you account for airport transit, security, and boarding.</p>

<p>4-hour-or-less corridors include: Paris-London, Paris-Amsterdam, Madrid-Seville, Florence-Rome, Munich-Salzburg, Vienna-Prague (just over 4), Barcelona-Madrid, Berlin-Hamburg.</p>

<h2>The 6-hour question</h2>

<p>Train trips between 4 and 6 hours are case-by-case:</p>

<p><strong>Take the train if</strong> the route is scenic (Zurich-Milan, Bergen-Oslo), the cities are city-center to city-center, you can work on the train, or your luggage situation is awkward for budget airlines.</p>

<p><strong>Take the flight if</strong> the train requires multiple changes, the route is uninteresting, or you're coordinating with other travelers' schedules.</p>

<h2>Beyond 6 hours: usually fly</h2>

<p>For most travelers, 6+ hour train trips are exhausting. The exceptions are scenic flagship routes (Bergensbanen, Glacier Express) where the train IS the trip.</p>

<p>Otherwise: fly. Examples — Madrid to Rome (no direct train, 14+ hours via France; flight is 2h30), London to Berlin (10+ hours by Eurostar+local; flight is 1h45), Lisbon to anywhere not in Portugal (rail connections are sparse).</p>

<h2>The cost analysis</h2>

<p>Train fares in Europe vary wildly. Booking 2+ weeks in advance, the prices are usually competitive with budget airlines (Eurostar Paris-London £40-£80; TGV Paris-Lyon €30-€60). Same-day they're often more expensive than flying.</p>

<p>Budget airlines (Ryanair, Wizz Air, EasyJet) have hidden costs: airport taxis, baggage fees, seat-selection fees. A €25 Wizz Air ticket is often €70 by the time you've added everything.</p>

<h2>The luggage rule</h2>

<p>Budget airlines penalize luggage punitively. If you're traveling for 10+ days with checked bags, the train usually wins on cost once you've factored that in.</p>

<p>Trains in continental Europe accept luggage without fees up to ridiculous limits. UK domestic and Eurostar are stricter but still better than budget airlines.</p>

<h2>The work argument</h2>

<p>If you can work on the trip — say, you're a digital nomad — train wins almost always. WiFi is unreliable but the desk space is real, the seats are usable as a laptop workstation, and 4 hours of train work is a productive afternoon.</p>

<p>Plane work is fragmented (boarding, cramped, no real desk).</p>

<h2>The strategic move</h2>

<p>If you have 10-14 days for a multi-city European trip, base the itinerary on train-friendly hubs:</p>

<p><strong>Paris hub:</strong> reach Amsterdam, Brussels, London, Lyon, the south of France by train. Hop a flight only to reach Iberia or Italy.</p>

<p><strong>Munich hub:</strong> reach Vienna, Salzburg, Switzerland by train.</p>

<p><strong>Vienna hub:</strong> reach Prague, Budapest, Salzburg, Bratislava by train.</p>

<p><strong>Milan hub:</strong> reach Switzerland, Florence, Rome, Venice by train.</p>

<p>An entire 14-day trip without a single airport is realistic from any of these hubs.</p>

<h2>The sleeper-train question</h2>

<p>Sleeper trains in Europe are having a renaissance — Nightjet (Vienna-Brussels, Vienna-Amsterdam, Berlin-Paris), Snälltåget (Stockholm-Hamburg-Berlin), and others. They're slower than flying but save a hotel night.</p>

<p>Worth it for: budget travelers, romance-of-the-train trips, anyone wanting a story.</p>

<p>Skip if: you sleep poorly on trains, you have a tight schedule, or you're prone to motion sickness.</p>

<p>For specific city-pair recommendations see <a href="/en/articles/europe-by-train-which-city-pairs-actually-work">our train-pair guide</a>.</p>
    `.trim(),
  }
);

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

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

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

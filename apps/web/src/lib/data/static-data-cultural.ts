// apps/web/src/lib/data/static-data-cultural.ts
//
// Cultural / lived-in texture for top featured cities.
// Pattern (from competitor research): name the dish not the restaurant,
// name the street not the neighborhood, name the ritual hour, kill the cliches.

export const CITY_CULTURAL_NOTES: Record<string, string> = {
  paris: `
Parisians eat dinner between 7:30 and 9:30pm and most kitchens close between services — walk in at 5pm and you get the bad table by the bathroom. Lunch is 12:30 to 2pm sharp; the prix fixe at any neighborhood bistrot is the cheapest serious meal in the city. Coffee is a 1.50 EUR espresso standing at the counter — sitting at an outside table doubles the price and that's the deal, you've rented the table for two hours. Service is included; rounding up 1-2 EUR is the local norm and the American 18% marks you immediately.

Say "Bonjour" before you ask for anything in a shop, "Bonsoir" after about 6pm. This single rule is why tourists think Parisians are cold and Parisians think tourists are rude. Skip "Parlez-vous anglais?" and just open with bonjour and a smile — the response is dramatically warmer.

A working Sunday in Paris means the brocante (open-air antique market) on Boulevard Richard-Lenoir, the Marche Bastille at the same address (Thursday and Sunday mornings, finishes 2pm), and most non-touristy restaurants closed. Mondays many Marais shops are also closed. August: half the city leaves for the south and you'll find your favorite boulangerie shuttered with a hand-written note.

Listen for the sound that means Paris: the rolling shutter coming up on a corner cafe at 7:30am, the hiss of the espresso machine, the pigeons in Place des Vosges, the metro accordion player on Line 6 between Bir-Hakeim and Passy. The visual rule is simple — Parisian women wear flat shoes, dark colors, no logos. Show up in shorts and a baseball cap and you'll be seated near the kitchen.
  `.trim(),

  rome: `
Romans eat dinner late by Northern European standards — restaurants fill at 8:30pm and stay full until 11. Aperitivo (a drink with a small free snack) runs roughly 6:30 to 8pm; Campari spritz, negroni, or a glass of white. Lunch is the lighter meal, often a single primo (pasta course) at the corner trattoria for 10-12 EUR. Coffee is a standing-at-the-bar transaction: order "un caffe" and you get an espresso, drink it in 90 seconds, pay 1.20 EUR. Sit at a table and the price doubles. After 11am, Romans don't drink cappuccino — order one at lunch and the waiter will judge you (politely).

The dish-by-neighborhood rule: cacio e pepe and amatriciana in Trastevere, supplì (fried risotto balls) anywhere with a fryer, carbonara done correctly only in restaurants that look slightly grumpy about it (no cream, ever). Tipping is not expected; service is included. If the bill says "coperto 2 EUR" that's the bread/cover charge — pay it and don't tip on top.

The August ritual: Ferragosto (August 15) shutters half the city. The other half goes to the beach. Sundays are for slow lunches, often closing at 4pm and reopening at 7. Sunday morning is when locals walk the dog around their neighborhood piazza and the day-trippers haven't yet arrived in Centro Storico.

The sound that means Rome: scooters on cobblestones at 11pm, church bells overlapping at 7am from three different directions, fountains in every other piazza you walk past. The dress rule for the Vatican (and any major church) is real — shoulders and knees covered, or you're turned away at the door, even in 35-degree heat.
  `.trim(),

  barcelona: `
Catalans eat later than the rest of Spain and that's saying something — lunch from 2pm, dinner from 9:30pm, restaurants empty before 9. Vermut hour (vermouth on the rocks with a slice of orange and an olive) is roughly noon on Sundays in Gracia and Born; this is the one drinking ritual most worth showing up for. Tapas is not a dinner format here the way it is in Andalusia — Catalans typically order a few raciones (full plates) to share. Tipping is minimal; round up or leave coins. American 15-20% is unnecessary.

The greeting in Catalonia is "Bon dia" until early afternoon, then "Bona tarda" — this is Catalan, not Spanish. Hosts and shopkeepers warm visibly when you use it. Spanish (Castilian) is universal but Catalan is the local one and people notice the courtesy.

The week shape: most museums closed Mondays, including Picasso. Sant Jordi (April 23) is the city's defining day — books and roses exchanged in the streets, La Rambla becomes a continuous open-air bookshop. La Merce (mid-September) has correfocs (fire-runs) and human-tower competitions in Placa de Sant Jaume. Sundays the Born and Gracia squares fill with families until late afternoon, then quiet.

The sound that means Barcelona: the metal shutter coming up on a tapas bar at 8pm, gulls over the port, Tramuntana wind in the plane trees of the Eixample. The dress rule is loose — Barcelona is more casual than Madrid — but bare-chested tourists wandering inland from the beach get fined; keep a shirt on past Passeig de Joan de Borbo.
  `.trim(),

  amsterdam: `
The Dutch eat dinner early — restaurants are full by 6:30pm and many kitchens close at 9:30 or 10. Reserve in advance for anywhere good; walk-ins after 8 are roulette. Borrel is the Dutch happy hour — 5 to 7pm, a cold beer or jenever, bitterballen (deep-fried meat-ragu spheres) on the table. This is when Amsterdam's social rhythm actually happens.

Cycling rules everything. Pedestrians who wander into the bike lane get rung at, then sworn at, then potentially hit. The bike lane is the red asphalt strip between the sidewalk and the road. Look both ways twice; bikes come from every direction and they will not stop. Don't rent a bike in your first 24 hours unless you've biked in a European city before.

The Dutch love directness — they will tell you the restaurant is full, your idea is bad, your Dutch is incomprehensible. This is not rudeness; it's efficiency. Match it. Tipping is not expected; round up 5-10% if service was good.

Koningsdag (April 27) is the year's largest party — the entire city wears orange and drinks on the canals from 9am. Sinterklaas (December 5) is when families exchange gifts, not Christmas. King's Day, Liberation Day (May 5), and the Pride canal parade (early August) are the three days to either book a year ahead or avoid entirely.

The sound: bicycle bells outlasting any conversation, church carillons every 15 minutes from the Westerkerk, gulls in the canals, the constant low hum of motorboats in summer. The dress rule is functional — rain jacket always, jeans always, sneakers always. Amsterdam dresses for cycling regardless of where it's going.
  `.trim(),

  istanbul: `
Istanbul wakes up early. The first call to prayer (sabah) is before dawn and you'll hear it from your hotel; the muezzin from one mosque triggers the next, rolling across the city in waves. Breakfast (kahvaltı) is the meal of the day here — a long table of cheeses, olives, tomatoes, cucumbers, eggs, honey, jams, fresh bread, served until late morning. Skip the hotel buffet and find a kahvaltı salonu (Çakmak, Privato, or any in Beşiktaş) on a weekend — this is the city's defining meal.

Tea (çay) is the universal social transaction. It arrives in a tulip-shaped glass on a small saucer with two sugar cubes. Carpet shops, hotel lobbies, bus stations — accepting çay does not commit you to buying anything. Refusing is mildly rude. Coffee here means Türk kahvesi, served in a tiny cup with grounds on the bottom; never stir, sip slowly.

The Bosphorus is functional infrastructure, not a tourist boat ride. The cheap public ferries (Şehir Hatları) cross between Eminönü and Üsküdar, between Beşiktaş and Kadıköy, all day; the ride costs the price of a bus ticket and gives you the postcard for free. Take one at sunset.

Tipping: leave 10% in restaurants, round up taxis. Hammam attendants get 15-20% and you tip them in cash directly, not on the bill.

Friday lunchtime around the major mosques the streets fill with worshippers — Sultanahmet, Eminönü, the Süleymaniye area; politely give way. Ramadan changes the city's daily rhythm completely (restaurants in residential areas may not serve before sunset), and the iftar (sunset breaking-fast) meal in places like Sultanahmet square becomes a community picnic.

The sound: the call to prayer five times a day, ferry horns on the Bosphorus, simit sellers calling "taze simit" (fresh simit — a sesame-coated bread ring) on every busy street, seagulls following every ferry.
  `.trim(),

  lisbon: `
Lisbon eats dinner late — 8 to 10pm — but lunch is the long meal. The prato do dia (dish of the day) at any neighborhood tasca runs 8-12 EUR including soup, main, bread, drink, and sometimes coffee. Pingo doce (literally "sweet drop"), a coffee with a splash of milk, is the morning order; bica is a straight espresso. Both come with a small biscuit and cost 80 cents standing at the counter.

Pasteis de nata everywhere are good; the ones at Pasteis de Belem are the original (since 1837), the ones at Manteigaria in Chiado are the best modern version. Eat them warm with cinnamon and powdered sugar, standing at the counter. Sardines are seasonal — fresh and grilled outdoors during Santo Antonio (June 12-13), the city's defining festival, when every neighborhood association sets up grills on the streets and sells them with a glass of wine for 5 EUR.

Fado is real but most of what you'll see in tourist Alfama is performance. The genuine version happens late (after 11pm) in small rooms in Mouraria and Bairro Alto where you stop talking when the singer starts. Don't applaud between verses.

Trams 28 and 12 are functional public transport that became tourist attractions; they're now consistently overcrowded and pickpocketed. Locals take the metro or walk. The hills are real — Lisbon will physically wear you out. Wear shoes with grip; the calçada portuguesa (mosaic limestone paving) becomes a skating rink when wet.

Tipping: small change in cafes, 10% in restaurants if service was attentive. Greeting is "Bom dia" until 1pm, "Boa tarde" until dusk, "Boa noite" after — Portuguese greeting is a real ritual and shopkeepers warm visibly when you use it. The afternoon sound is canaries singing from balcony cages above the streets in the older neighborhoods; the evening sound is laughter from open restaurant windows.
  `.trim(),

  porto: `
Porto eats heavier than Lisbon and earlier — dinner from 7:30, often a francesinha (a sandwich-stew of meats, cheese, beer-tomato sauce) with a beer that will defeat most tourists by 9pm. Tripas a moda do Porto (tripe stew) is the city's namesake dish and yes, locals do eat it, particularly on Sundays. Bacalhau (cod) appears in 1001 forms; bacalhau a Bras (with shredded potatoes and egg) is the safest first try.

Coffee here is taken seriously. Order "uma bica" for a straight espresso. Cafe Majestic is theatrical and expensive; the everyday coffee in any cafe in Cedofeita is better and a third of the price.

Port wine: the houses are across the river in Vila Nova de Gaia, not in Porto proper. Cross the lower deck of the Dom Luis I bridge on foot (the upper deck is for the metro and pedestrians; the lower for cars and a vertiginous walkway). Most tasting tours are honest and worth doing once. Buy the bottle you actually liked at any grocery; the markup at the houses is significant.

Sao Joao (June 23-24) is the year's defining night — Porto goes outdoors, hits each other on the head with squeaky plastic hammers (yes, really), grills sardines on every corner, and watches fireworks over the river around midnight. Book accommodation a year in advance.

Greeting is "Bom dia" / "Boa tarde" / "Boa noite" — same as Lisbon, just spoken faster and harder. Tipping: round up coffee and beer, 10% in restaurants if you ordered a real meal. The Portuguese north considers Lisbon soft; expect playful rivalry if you mention it. Locals call themselves tripeiros (tripe-eaters), proudly.

The sound: Sao Bento station's tile echoes, gulls over the Douro, the Sao Bento and Sao Francisco bells overlapping at noon, the tram on Avenida da Boavista. Porto rains often — bring a rain jacket year-round, even in July.
  `.trim(),

  berlin: `
Berlin eats late and informally. Dinner from 8 onwards in Kreuzberg and Neukolln; many of the best places are walk-in only and have no website. Doner kebab is the city's defining street food (invented in Berlin by a Turkish-German cook in 1972) — the line at Mustafa's Gemuese Kebap on Mehringdamm is famous; the one at Imren on Oranienstrasse is just as good and shorter. Currywurst is German tradition, mostly tourist food now; eat one once, then move on.

Coffee: Berlin's third-wave scene is among Europe's strongest — Bonanza in Kreuzberg, Five Elephant in Mitte, The Barn in Mitte all serve coffee that takes 4 minutes to make. The German cafe filter coffee in any neighborhood bakery is also fine and costs 2 EUR.

Cash is king in surprising places — many Spätis (corner stores), small bars, even some restaurants are cash only. Carry 50-100 EUR. The card machine being broken (or not present) is a Berlin classic; have backup.

Berliners are blunt. They will tell you the seat next to them is taken without smiling, then move their bag without looking at you. This is not aggression; it is communication efficiency. Match it.

Sundays the city closes — supermarkets, most shops, almost all services. Plan around it. The big exceptions are gas stations (which sell groceries at marked-up prices) and tourist areas. Tag der Arbeit (May 1) is May Day and the demonstrations in Kreuzberg can be raucous; the Karneval der Kulturen (Pentecost weekend) shuts down Kreuzberg to traffic for a parade and street party.

Tipping: round up to the next Euro for coffee, 5-10% in restaurants. Tell the waiter the total amount you want to pay including tip when they bring the card machine — saying "stimmt so" (keep the change) leaves the rest as tip.

The sound: U-Bahn doors chiming closed, Spaeti fridges humming, the Friday night sirens, the spring-and-summer outdoor-bar laughter that runs until 4am. Berlin dresses functionally — black, layered, with a coat that handles rain. Anyone in a suit is either at a wedding or visiting from Munich.
  `.trim(),

  madrid: `
Madrid eats later than anywhere in Europe — lunch from 2pm, dinner from 9:30 (10pm in summer), bars and tapas counters busiest from 11pm onwards. Restaurants attempting earlier service are tourist-coded. The plan that works: a coffee and tostada con tomate around 10am, vermouth (vermut) and aceitunas at 1pm, the menú del día (3-course set lunch, 12-15 EUR) at 2:30, a long siesta or museum visit, then tapas with friends starting at 9pm.

Tapas in Madrid is not a meal format the way it is in Andalusia. Madrileños eat raciones (full plates) shared, or run a tapas crawl — one drink, one tapa, walk to the next bar. La Latina's Calle Cava Baja and Calle de Almendro are the Sunday tapas-crawl spine. Order a caña (small beer) so you can finish it and keep moving.

The two cultural lenses you cannot avoid: bullfighting (Las Ventas, season runs March to October — opinions are sharp on both sides; just be aware before bringing it up) and football (Real Madrid at the Bernabéu, Atlético at the Metropolitano — match days dominate the city's mood and bar economics).

Greeting is "Buenos días" until lunch, "Buenas tardes" after lunch until dark, "Buenas noches" after. Tipping: small change in cafés, 5-10% in restaurants only if service was attentive. American 18-20% is not expected and will mark you.

Sundays: the Rastro flea market in La Latina (9am-3pm) is the city's defining Sunday morning, followed by vermut at any nearby corner. Most museums are free in the late afternoon (Prado: free 6-8pm Mon-Sat, 5-7pm Sun) — the queues are long but real.

The sound: bottle-stoppers being pulled in tapas bars, the metro's announcement chime, motorbikes on Calle Mayor at 2am, the basilica bells from San Francisco el Grande. Madrid dresses up — significantly more formal than Barcelona. Wear shorts in the city center and you'll feel under-dressed by 8pm.
  `.trim(),

  vienna: `
Vienna runs on coffeehouse culture — and "coffeehouse" here means the institution UNESCO recognized, not Starbucks. Order a Melange (espresso with steamed milk, like a flat white) or a Verlängerter (espresso lengthened with hot water, like an Americano). It comes on a small silver tray with a glass of tap water. You can sit for three hours with a single coffee, reading a newspaper from the wooden rack — this is not rude, this is the entire point. Café Central, Café Sperl, Café Hawelka are the famous ones; almost any neighborhood Kaffeehaus does the same thing without the queue.

Lunch is 12 to 2pm, dinner 6:30 to 9 — earlier than Spain, later than Germany. Schnitzel comes only with potato salad or parsleyed potatoes (never fries — Italian/American tourist tells). Tafelspitz (boiled beef with horseradish and apple-chive sauce) is the dish you order when you want to eat like a 1900 Viennese. Sachertorte is theatrical and fine; the Apfelstrudel is the better bet at any coffeehouse.

The Viennese are formally polite — "Grüß Gott" (formal hello, literally "God greet you") in shops, "Servus" between friends and people under 40. Always greet on entering a small shop. Tipping: round up café orders, 10% at restaurants — say the total amount including tip when paying ("Vierzehn Euro, bitte" if the bill is 12.50).

The Naschmarkt (Saturdays) is the city's defining open-air market. Christmas markets (mid-November to December 23) are real, particularly Spittelberg and Karlsplatz. The Opera Ball season (January-February) means the Staatsoper does evening tours that swap normal access for ballroom-floor walks; book ahead.

The sound: tram bells on the Ringstrasse, Stephansdom's Pummerin bell at noon and at New Year, café-newspaper pages turning, Strauss waltzes coming from a thousand horse-drawn fiakers around the Hofburg. Vienna dresses better than Berlin — closer to Milan than to Hamburg. Smart casual at minimum after 6pm.
  `.trim(),

  prague: `
Czechs have a beer culture that defines daily life — Pilsner Urquell or Staropramen on draft is 50-70 CZK (€2-3) for a 0.5L glass, served cold and unhurried. Beer is faster than water in many pubs (and often cheaper). Order "jedno pivo" (one beer); the waiter will mark a tally on your beer mat and bring another when you're getting low — to stop, place the mat over the empty glass.

Lunch (oběd) is the warm meal — most pubs serve a daily menu (denní menu) of 3 courses for 150-200 CZK (€6-8) between 11am and 2pm. Dinner is lighter and later. Czech food is honest and heavy: svíčková (beef in cream sauce with bread dumplings), guláš (goulash with bread dumplings), smažený sýr (fried cheese with tartar sauce). Do not skip the dumplings — they are the point.

The greeting is "Dobrý den" (formal hello) until evening, "Dobrý večer" after about 6pm. Czechs are reserved with strangers but warm once introductions happen. Tipping: round up coffee and beer to the next 10 CZK, 10% in restaurants if service was attentive — tell the server the rounded-up total when paying.

The Old Town Square in Prague is overwhelmingly tourist-managed by 10am; locals avoid it. The same square at 7am is empty, the astronomical clock chimes for nobody, and you can have it to yourself. Same trick works at Charles Bridge — cross at sunrise.

Sundays many shops close (this changed less in Czechia than in Germany or Austria, but still applies). Easter (Velikonoce) involves men and boys playfully whipping women with woven willow branches in exchange for painted eggs — culturally insider and not for tourists to participate in unless invited.

The sound: tram bells (the trams in Prague are both transport and tourist attraction), the Old Town clock striking the hour with the apostle parade, beer-glass rims clinking, the Vltava lapping under Charles Bridge at dawn. Prague dresses casually but neatly — jeans and a sweater work everywhere, gym clothes look out of place outside the gym.
  `.trim(),

  budapest: `
Hungarians eat lunch (ebéd) as the warm meal — most restaurants do a 3-course "menü" between noon and 3pm for 2,500-3,500 HUF (€7-9). Dinner is later, 7 to 9pm. Goulash here (gulyás) is a soup, not a stew — what English-speakers call goulash is closer to pörkölt. Order both at least once. Lángos (deep-fried dough with sour cream and cheese) is the street-food classic; the best is at the Great Market Hall upstairs.

Coffee comes in tiny cups — "egy presszó" gets you an espresso for 400-600 HUF. The grand café tradition (New York Café, Centrál Kávéház) is theatrical and worth doing once for the room. Everyday coffee is fine in any neighborhood place.

Hungarian thermal baths are functional infrastructure, not a tourist activity. Széchenyi (the big yellow one in the City Park) is the one most tourists visit; Gellért is more Art Nouveau and elegant; Rudas is the most local and has men-only days. Bring flip-flops, a towel, and 10 EUR cash for the locker. The outdoor pools at Széchenyi at 7am in February with snow on the pool deck and chess players in the steam — that's the postcard.

The greeting is "Jó napot kívánok" (formal good day) or "Szia" (informal hi). Tipping: 10-15% in restaurants is the norm here, tell the server the total amount when paying — leaving cash on the table is unusual. The exchange rate is the trap — many tourist-zone places quote in EUR with bad rates; pay in HUF when possible.

The Jewish Quarter (District VII) ruin bars run late. Szimpla Kert is the famous one and the queue tells you so. The smaller ones around Kazinczy and Király streets are better. Sundays mid-morning the neighborhood quiets and the markets (especially Szimpla's farmers' market) come out.

The sound: Hungarian itself (it sounds like nothing in your language family — the rhythm is genuinely different from anything Indo-European), the Yellow Line metro's vintage carriages, tram 4/6 along the Grand Boulevard, the splash of the Chain Bridge's pedestrian deck on summer nights.
  `.trim(),

  athens: `
Athenians eat dinner late — 9 to 11pm in summer, 8 to 10 in winter. Lunch is later than Northern Europe (1:30 to 3pm). Don't try to eat dinner at 7; you'll be alone in the restaurant and it'll show. Mezedes (small plates) shared with ouzo or tsipouro is the most Greek dinner format. A proper meal is a long table with 8-10 small plates, bread, lemon wedges, and a bottle of house wine that arrives in a copper pitcher.

Coffee is freddo espresso (espresso shaken with ice) or freddo cappuccino — both invented for the Greek climate. Order from any kafenio (traditional café) for €2.50; from Starbucks for €5 and a worse drink. Frappé (instant coffee shaken with cold water) is the older generation's choice and tastes exactly like its history.

The greeting is "Yia sou" (informal) or "Kalimera" (good morning, until early afternoon), "Kalispera" (good evening, after about 4pm). Hand gestures matter — the upraised flat palm (moutza) is a serious insult; never use it to indicate "stop" or "five."

Greeks are warm to strangers until you cross a tribal line — football (Olympiacos vs Panathinaikos), politics (the Greek civil war's wounds aren't closed), or the recent past (the financial crisis is still raw). Avoid bringing these up unless invited.

Tipping: round up taxi fares, 10% in restaurants. Greek service is unhurried — being asked for the bill before you ask is considered rude. Ask for "to logariasmo" when you're ready.

Athenian Sundays: the Monastiraki flea market is the obvious tourist Sunday; the Varvakios Agora (central food market) on a Saturday morning is the local equivalent. Easter (Greek Orthodox, usually a week or two after Catholic Easter) is the year's biggest holiday and the city empties — most restaurants and museums close from Holy Friday to Easter Monday.

The sound: bouzouki music drifting from any neighborhood taverna, the koulouri seller's call ("KOOOO-loori!"), motorbikes on Adrianou, cicadas in summer that override conversation, the church bells that overlap from a dozen Orthodox churches every Sunday morning.
  `.trim(),

  london: `
Londoners eat dinner early by Continental standards — restaurants fill at 6:30pm, last orders typically 9:30 or 10. The British pub lunch (12:30 to 2pm) is a real institution: a roast on Sundays, a pie or fish and chips on weekdays, a pint with it. Pubs stop serving food before they stop serving drinks; if you arrive at 9pm hungry, you're often into chip-shop or kebab territory.

Tea is the universal social transaction. "Cup of tea" almost always means English Breakfast with milk. Refusing tea offered in a London office is mildly weird; refusing the second cup is fine. "Builders' tea" is strong and milky. In a café, "tea" without specification usually gets you a teabag in a mug and you're expected to put the milk in yourself.

The pub round (each person buys a round of drinks for the whole group in turn) is sacred. Skip your turn and you'll be remembered. If you don't drink, get involved in the round anyway — buy a round of soft drinks for the group when it's your turn.

Tipping: 12.5% is often added to restaurant bills as "service charge" — that IS the tip, you don't add more. Pubs don't tip for ordinary drinks at the bar but do tip waiters in gastropubs (5-10%). Black cab drivers expect 10% rounded up; minicab/Uber drivers don't.

Greeting: "Hi" or "Hello" — not the kissing of cheeks you'll get in France or Italy. Personal space is wider than Continental Europe. Queueing is a national religion; jumping a queue is a serious offense.

Sundays many shops have shorter hours (Sunday Trading Act limits big shops to 6 hours). The Sunday roast at 1pm is the pub ritual most worth showing up for. Pre-book — good roasts sell out by Friday.

London weather: the joke is that you can have four seasons in a day. The reality is that the rain is often light and intermittent rather than dramatic — pack a thin waterproof jacket year-round and don't bother with an umbrella unless going to a wedding.

The sound: black cab diesel engines idling, the distinctive Tube door-closing chime ("Mind the gap"), Big Ben's bongs (when it's working), the seagulls along the Thames, "Sorry" said by literally everyone all day for almost everything.
  `.trim(),

  munich: `
Bavarians eat lunch as the warm meal — Mittagessen between 11:30 and 2pm — and dinner (Abendessen) often as a colder spread of bread, cheese and cold cuts (Brotzeit). Restaurants do serve full dinners but pubs and beer gardens are often the evening default. The classic order: Schweinshaxe (roasted pork knuckle, served with potato dumpling and sauerkraut), or Weisswurst (white veal sausages, eaten ONLY before noon — never after, this is a Bavarian rule) with sweet mustard, a soft pretzel and a Weissbier (wheat beer).

Beer gardens (Biergärten) are the city's defining institution. The rule: at any beer garden with a Selbstbedienung (self-service) section, you can bring your own food. Order beer at the counter, find a table outside, unpack your bread and cheese. The Englischer Garten's Chinesischer Turm is the largest; Augustiner-Keller is the most local. Order a Maß (1 liter) or a Halbe (0.5 liter); "small beer" doesn't really exist.

Greeting in Bavaria is "Grüß Gott" (literally "greet God"), not the standard German "Guten Tag." Locals warm visibly when tourists use it. "Servus" is informal hi/bye between friends. Bavarians are friendlier than Northern Germans but still formal — Sie (formal you) until you're invited to use Du.

Tipping: round up cafés, 5-10% in restaurants — say the total including tip when paying. "Stimmt so" means "keep the change."

Oktoberfest (mid-September to first weekend in October) doubles every hotel price within 5 km of the Theresienwiese. Book a year ahead or visit at a different time. Christkindlmarkt (the Christmas market on Marienplatz) runs late November to December 24 and is the most Bavarian thing the city does.

Sundays: most shops closed (German national rule), the city quiets, the Englischer Garten fills with families, the beer gardens fill from noon.

The sound: church bells overlapping from the Frauenkirche, the U-Bahn doors chiming, Maß glasses clinking on wooden beer-garden tables, the Glockenspiel on Marienplatz at 11am and 5pm (mostly tourists watching, but charming once). Munich dresses up more than Berlin — particularly during Oktoberfest, when wearing a non-Bavarian costume Lederhosen marks you. Buy real ones from Angermaier or skip the costume entirely.
  `.trim(),

  dublin: `
Dubliners eat dinner from 6pm onwards, often early by Continental standards — book ahead for anywhere good after 7. The pub lunch (carvery: roast beef, potatoes, cabbage, gravy) at 12:30 is the most Irish weekday eating. The Sunday roast at any decent gastropub at 1pm is a non-negotiable ritual. Arrive at noon if you want a table.

The pint of Guinness is sacred. It takes 119.5 seconds to pour properly (the "two-part pour"), and a Dubliner will judge any bartender who hurries it. Order "a pint" without specifying brand and you'll get a Guinness; order anything else by name. Don't tip on bar service of pints — leave coins for table service or for a bartender doing exceptional work.

The "round" works like London — each person buys one for the whole group in turn. Skipping your turn is a memorable offense. Irish pubs are social rather than transactional; striking up a conversation with the people next to you is welcomed.

Greeting: "How're ya" or "Hi there" — informal Ireland. "Grand" means everything from "fine" to "enthusiastically agreeing." "Sound" means good or trustworthy. "Yer man" means a third person being talked about. The accent and slang shift dramatically every 50 km.

Tipping: 10-12% in restaurants if service charge isn't already added. Taxis: round up, no need to add more.

The trad music sessions (live traditional Irish music in pubs) happen most nights of the week — Cobblestone in Stoneybatter, Hughes' on Chancery Street, O'Donoghue's on Merrion Row are the real ones. Temple Bar's pubs play trad too but it's louder and tourist-focused.

Dublin weather: light persistent rain for most of the year. Pack a waterproof jacket; an umbrella is a tourist tell. "Soft day" is Irish for "drizzle, but warm enough that you don't really mind."

Sundays: pubs open late morning, shops mostly open, museums free at the National Museum sites. The Dublin Sunday is built around the long roast lunch with two-three pints, then a long walk in Phoenix Park or along the River Liffey.

The sound: Guinness being poured (the pause for the head to settle, then the top-off), seagulls along the quays, fiddle and bodhrán from any open pub door, the Luas (tram) bells, "Cheers, thanks" said by everyone for everything.
  `.trim(),
};

export function getCulturalNotes(citySlug: string): string | null {
  return CITY_CULTURAL_NOTES[citySlug] ?? null;
}

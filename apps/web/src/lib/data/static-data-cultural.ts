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
};

export function getCulturalNotes(citySlug: string): string | null {
  return CITY_CULTURAL_NOTES[citySlug] ?? null;
}

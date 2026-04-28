// apps/web/src/lib/data/static-data-country-details.ts
//
// Per-country editorial details: what the country is known for,
// the named tourist attractions worth ranking, and a season-by-season
// best-time-to-visit summary. All hand-written, all opinionated.

export type CountryAttraction = {
  name: string;
  city?: string;
  type: "city" | "landmark" | "museum" | "natural" | "religious" | "neighborhood" | "experience";
  why: string;
};

export type CountryDetails = {
  knownFor: string;
  topAttractions: CountryAttraction[];
  bestTimeToVisit: string;
};

export const COUNTRY_DETAILS: Record<string, CountryDetails> = {
  france: {
    knownFor:
      "France is known for the Eiffel Tower silhouette and Provence lavender fields, but the country travels widest on three things tourists underestimate: the food (every village has a baker, a cheesemonger, and a wine list), the museum density (the Louvre alone holds 35,000 pieces; smaller towns have Picassos and Matisses), and the regional difference (Normandy reads nothing like Provence, the Alps read nothing like Bordeaux).",
    topAttractions: [
      { name: "Eiffel Tower", city: "Paris", type: "landmark", why: "The 1889 World's Fair tower that nearly got demolished. Best at sunset from Trocadéro; worst at midday with a 90-minute queue." },
      { name: "Louvre Museum", city: "Paris", type: "museum", why: "The world's most-visited museum. Buy a timed ticket online and head to the Mona Lisa first thing or last thing — never midday." },
      { name: "Versailles", city: "Versailles (near Paris)", type: "landmark", why: "Louis XIV's palace, hugely crowded. The gardens are arguably the better experience and free." },
      { name: "Mont Saint-Michel", type: "landmark", why: "Tidal-island abbey off Normandy. Stay overnight on the island after the day-trippers leave for the magic." },
      { name: "Côte d'Azur (French Riviera)", type: "natural", why: "Nice, Antibes, Cannes, Saint-Tropez — Mediterranean coast that defined 20th-century glamour." },
      { name: "Provence villages (Gordes, Roussillon, Lourmarin)", type: "natural", why: "Hilltop stone villages, lavender fields in late June/July, markets that locals still use." },
      { name: "Châteaux of the Loire Valley", type: "landmark", why: "Chenonceau, Chambord, Villandry — Renaissance châteaux strung along the Loire River." },
      { name: "D-Day beaches and Bayeux Tapestry", city: "Normandy", type: "experience", why: "Omaha, Utah, the American cemetery at Colleville. The 70-meter 11th-century tapestry is in Bayeux, 30 minutes inland." },
    ],
    bestTimeToVisit:
      "Best windows: late April through June (long days, mild weather, gardens at peak, avoiding August closures), and September through early October (warm enough for everything, no school holidays). Paris and the north are workable year-round; Provence and the Riviera punish January (cold, much closed) and August (overcrowded, 35°C+, tourists everywhere). The August trap is real — half the country leaves for vacation and your favorite Paris restaurant will be shut for three weeks. Christmas markets in Strasbourg and Colmar peak late November to December 23.",
  },

  spain: {
    knownFor:
      "Spain is known for paella and flamenco, but the actual story is regional — Catalonia, Basque Country, Andalusia, Galicia, and Madrid feel like five different countries with five different cuisines. The other two things Spain quietly leads Europe in: late-night culture (dinner at 10pm, bars until 3am as a Tuesday baseline) and the world's best museum collection per square meter (Prado, Reina Sofía, Thyssen all in one Madrid avenue).",
    topAttractions: [
      { name: "Sagrada Família", city: "Barcelona", type: "religious", why: "Gaudí's basilica, under construction since 1882, expected to finish in the 2030s. Book the timed ticket weeks ahead; sunset light through the stained glass is the moment." },
      { name: "Alhambra", city: "Granada", type: "landmark", why: "Moorish palace complex, the most-visited monument in Spain. Tickets sell out 2-3 months ahead in summer; book Nasrid Palace specifically." },
      { name: "Prado Museum", city: "Madrid", type: "museum", why: "Velázquez, Goya, El Greco, Bosch's Garden of Earthly Delights. Free 6-8pm Mon-Sat (queues are real)." },
      { name: "Park Güell", city: "Barcelona", type: "landmark", why: "Gaudí's mosaic park overlooking Barcelona. Book the monumental zone ticket; the surrounding park is free." },
      { name: "Mezquita-Cathedral of Córdoba", type: "religious", why: "Mosque-turned-cathedral with the famous striped arches. Genuinely unique." },
      { name: "Plaza Mayor & Royal Palace", city: "Madrid", type: "landmark", why: "Madrid's central square plus the largest functioning royal palace in Europe." },
      { name: "Camino de Santiago", type: "experience", why: "The 800km pilgrimage to Santiago de Compostela. The French Way is the classic; the Portuguese Way is shorter and quieter." },
      { name: "Andalusian white villages (Ronda, Mijas, Frigiliana)", type: "natural", why: "Whitewashed hilltop pueblos in the mountains above the Costa del Sol." },
    ],
    bestTimeToVisit:
      "May, June, September, and October are Spain's sweet spots — warm sunshine, manageable crowds, no Andalusian heat death. July-August in southern Spain (Seville, Córdoba) regularly hits 40°C+; the locals leave. Coastal Spain (Barcelona, Costa Brava, Costa del Sol) peaks July-August and prices triple. November-March is mild on the south coast (15-19°C) and Madrid stays dry but cold. Holy Week (Semana Santa, mid-March to mid-April) is dramatic in Seville and Málaga but books out a year ahead.",
  },

  italy: {
    knownFor:
      "Italy is known for pasta, the Colosseum, and Renaissance art, but the country runs deepest on three less-marketed things: the regional food specificity (carbonara is Roman; cacio e pepe is Roman; pesto is Genoese; risotto is Milanese — order them in the wrong city and a real Italian will quietly judge you), the small-town density (a 90-minute train from Rome lands you in five towns each older than most countries), and coffee culture done at a level no one else matches.",
    topAttractions: [
      { name: "Colosseum", city: "Rome", type: "landmark", why: "The 80-AD amphitheater. Combined ticket with the Roman Forum and Palatine Hill saves the second queue. Underground/arena access is a separate booking." },
      { name: "Vatican Museums and Sistine Chapel", city: "Rome", type: "religious", why: "Michelangelo's ceiling. Book the earliest morning entry (8am) — by 11am the Sistine Chapel is shoulder-to-shoulder." },
      { name: "Uffizi Gallery", city: "Florence", type: "museum", why: "Botticelli's Birth of Venus, da Vinci's Annunciation. Pre-book; the standby line takes 90 minutes." },
      { name: "Venice canals + St. Mark's Basilica", city: "Venice", type: "landmark", why: "Stay overnight; day-tripping Venice misses the city's evening empty-out." },
      { name: "Pompeii & Herculaneum", type: "landmark", why: "Roman cities buried by Vesuvius in 79 AD. Combined ticket; bring water and a hat." },
      { name: "Cinque Terre", type: "natural", why: "Five Ligurian fishing villages strung along cliffs. Train between them, walk the trails between them, swim from the rocks." },
      { name: "Amalfi Coast (Positano, Amalfi, Ravello)", type: "natural", why: "Cliffside villages above the Tyrrhenian Sea. The road is famously dramatic; book a small-car driver." },
      { name: "Lake Como & Lake Garda", type: "natural", why: "Alpine lakes ringed with villas and vineyards. Bellagio and Varenna are the postcard towns on Como." },
    ],
    bestTimeToVisit:
      "May, September, and October are Italy's best weeks — warm enough for everything, light enough for long days, before/after the August Italian holiday and summer tourist deluge. June is good but Rome and Florence start getting hot. July-August is heat-and-crowds maximum (Rome regularly 38°C, restaurants closed for ferragosto around August 15). Venice in February for Carnival is theatrical but expensive. The Italian winter (November-March) in coastal areas and Naples is mild and dramatically cheaper. Christmas markets in Trentino-Alto Adige (Bolzano, Trento) are German-Tyrolean tradition.",
  },

  germany: {
    knownFor:
      "Germany is known for beer halls, Christmas markets, and BMWs, but the country's actual range is much wider — Berlin's club scene, Bavarian alpine villages, Hamburg's harbor, the Rhine valley castles, the Black Forest. Germans take three things more seriously than most travelers expect: bread (a German bakery has 30 kinds and they all matter), Sunday rest (everything closed, plan accordingly), and queueing in an orderly line (skip ahead at your peril).",
    topAttractions: [
      { name: "Brandenburg Gate & Reichstag", city: "Berlin", type: "landmark", why: "The reunification icon. Reichstag dome access is free but requires booking 2-3 weeks ahead." },
      { name: "Neuschwanstein Castle", type: "landmark", why: "The Disney-castle-inspiration in Bavaria. Day-trip from Munich; book the tour ticket online." },
      { name: "Cologne Cathedral", city: "Cologne", type: "religious", why: "The Gothic cathedral that took 632 years to build. Climb the 533 steps for the city view." },
      { name: "Berlin Wall (East Side Gallery + Mauerpark + Checkpoint Charlie)", city: "Berlin", type: "experience", why: "1.3km of preserved wall painted by 100+ artists in 1990. The Documentation Center on Bernauer Strasse is the more honest history." },
      { name: "Munich's Marienplatz + Hofbräuhaus", city: "Munich", type: "landmark", why: "Bavaria's central square and the most famous beer hall in the world. Order a Maß and a pretzel." },
      { name: "Romantic Road (Würzburg to Füssen)", type: "experience", why: "350km of medieval towns including Rothenburg ob der Tauber, the most-photographed German town." },
      { name: "Berlin's Museum Island", city: "Berlin", type: "museum", why: "Five museums on a single Spree island including the Pergamon Altar and Nefertiti bust." },
      { name: "Black Forest (Schwarzwald)", type: "natural", why: "Dense pine forest with cuckoo-clock villages. The Triberg waterfalls are the obvious sight; the smaller villages are the actual experience." },
    ],
    bestTimeToVisit:
      "May through September are Germany's best months — long days, beer-garden weather, Bavarian alps walkable, festivals everywhere. Oktoberfest is mid-September to first weekend of October (book Munich a year ahead). Christmas markets late November to December 23 are the country's defining winter draw — Nuremberg, Munich, Cologne, Dresden are the famous ones. January-February is genuinely cold and gray; consider Bavaria for skiing or skip. Berlin works year-round because its energy is indoor.",
  },

  "united-kingdom": {
    knownFor:
      "The UK is known for London's pomp (Buckingham Palace, the Tube, the Tower), pubs, and pop culture (Beatles, Premier League, Doctor Who), but travelers consistently underestimate two things: the green of the countryside (the Cotswolds, Lake District, Scottish Highlands genuinely stop you), and how much weather defines daily life (the British 'soft day' of light persistent rain is real and you adapt to it).",
    topAttractions: [
      { name: "Tower of London", city: "London", type: "landmark", why: "1000-year-old fortress with the Crown Jewels. The Yeoman Warder tour is included and worth waiting for." },
      { name: "British Museum", city: "London", type: "museum", why: "Free, world-class, the Rosetta Stone and Parthenon Marbles. Allow 3 hours minimum." },
      { name: "Stonehenge", type: "landmark", why: "5000-year-old Neolithic monument. Combine with Bath (45 minutes away) for a day trip from London." },
      { name: "Edinburgh Castle + Royal Mile", city: "Edinburgh", type: "landmark", why: "Castle on a volcanic plug. The Royal Mile from castle to Holyroodhouse is the medieval spine of the city." },
      { name: "Lake District", type: "natural", why: "Northwest England's mountains and lakes. Windermere is the famous town; Keswick is quieter." },
      { name: "Scottish Highlands + Loch Ness", type: "natural", why: "Drive the NC500 (North Coast 500) for the loop, or take the Caledonian Sleeper from London to Fort William." },
      { name: "Cotswolds villages (Bibury, Bourton-on-the-Water, Castle Combe)", type: "natural", why: "Honey-stone villages 90 minutes west of London. Hire a car or take a tour — public transport is patchy." },
      { name: "Westminster Abbey + Houses of Parliament", city: "London", type: "religious", why: "Coronation site since 1066. Book tower tours of Big Ben (Elizabeth Tower) months ahead." },
    ],
    bestTimeToVisit:
      "May, June, and September are the UK's most reliable months — long daylight (16+ hours in June), mild temperatures, fewer rain days. July-August is peak tourist season; expect crowds at Stonehenge, Edinburgh during Festival/Fringe, the Lake District. Edinburgh in August is at peak energy and peak hotel prices. November-February in London works fine (museums, pubs, theatres) but Scotland gets dark fast — sunset around 3:45pm in late December.",
  },

  netherlands: {
    knownFor:
      "The Netherlands is known for canals, tulips, and famously liberal social policies, but the country's underrated draws are the cycling infrastructure (you can bike across the country on dedicated paths), the modern architecture (Rotterdam after WWII rebuilt itself as Europe's modern-architecture lab), and the Dutch directness that makes locals refreshing or shocking depending on what you're used to.",
    topAttractions: [
      { name: "Anne Frank House", city: "Amsterdam", type: "museum", why: "The annex where Anne Frank wrote her diary. Tickets release exactly 6 weeks ahead — set a calendar reminder." },
      { name: "Rijksmuseum", city: "Amsterdam", type: "museum", why: "Vermeer, Rembrandt's Night Watch, the Dutch Golden Age. Don't try to do it alongside the Van Gogh Museum in one day." },
      { name: "Van Gogh Museum", city: "Amsterdam", type: "museum", why: "200+ Van Gogh paintings, the world's largest collection. Book a timed entry." },
      { name: "Keukenhof Gardens", type: "natural", why: "32 hectares of tulips, open mid-March to mid-May only. The bulb fields outside the gardens are free and equally photogenic." },
      { name: "Amsterdam canal cruise", city: "Amsterdam", type: "experience", why: "The UNESCO canal belt seen from water level. Sunset cruises are the best version." },
      { name: "Kinderdijk windmills", type: "landmark", why: "19 working windmills in a UNESCO landscape. Day-trip from Rotterdam." },
      { name: "Rotterdam architecture (Cube Houses, Markthal, Erasmus Bridge)", city: "Rotterdam", type: "landmark", why: "Modern architecture pilgrimage. The Markthal's interior mural is the photo." },
      { name: "Hague: Mauritshuis (Vermeer's Girl with a Pearl Earring)", city: "The Hague", type: "museum", why: "Small but world-class, in a 17th-century mansion across from the Dutch parliament." },
    ],
    bestTimeToVisit:
      "April-May is peak tulip season and the Netherlands' most magical window — Keukenhof opens, the bulb fields bloom, the weather warms enough for canal-side dinners. June-September are the long-daylight months for cycling and outdoor terraces. King's Day (April 27) is the year's biggest party; the entire country wears orange. November-February gets gray, wet, and dark by 4:30pm; museums and bars handle this fine but outdoor sights become punishing.",
  },

  turkey: {
    knownFor:
      "Türkiye is known for Istanbul straddling two continents, Cappadocia balloons, and the Mediterranean coast. The country's underrated qualities: hospitality (tea is offered everywhere and accepting it does not commit you to anything), bath culture (the hammam is functional infrastructure, not a tourist gimmick), and cuisine depth (Turkish food extends far beyond kebab — meze culture, breakfast as the meal of the day, regional specialties from Gaziantep to the Black Sea).",
    topAttractions: [
      { name: "Hagia Sophia", city: "Istanbul", type: "religious", why: "1500 years old, formerly church then mosque then museum then mosque again. Free entry; non-Muslims welcomed outside prayer times." },
      { name: "Topkapı Palace", city: "Istanbul", type: "landmark", why: "Ottoman sultans' palace with the Imperial Treasury and Harem. The Harem is a separate ticket but worth it." },
      { name: "Cappadocia balloon flight at sunrise", type: "experience", why: "100+ balloons launching simultaneously over the fairy-chimney landscape. €150-250 per person; book through your hotel for weather flexibility." },
      { name: "Pamukkale travertines + Hierapolis", type: "natural", why: "White calcium pools cascading down a hillside, plus a 2nd-century BC Roman city above. Half-day; the pools' water is genuinely warm." },
      { name: "Ephesus", type: "landmark", why: "Ancient Greek and Roman city near Selçuk on the Aegean. The Library of Celsus façade is the photo." },
      { name: "Grand Bazaar + Spice Bazaar", city: "Istanbul", type: "experience", why: "Two of the world's oldest covered markets. Bargain expected; tea offered constantly." },
      { name: "Antalya Old Town (Kaleiçi)", city: "Antalya", type: "neighborhood", why: "Ottoman-era walled neighborhood above a Roman harbor on the Mediterranean." },
      { name: "Bosphorus ferry crossing", city: "Istanbul", type: "experience", why: "The cheapest scenic ride in Europe — public ferries between European and Asian Istanbul cost the price of a bus ticket." },
    ],
    bestTimeToVisit:
      "April-May and September-October are Türkiye's sweet spots — warm but not Mediterranean-summer-brutal, Istanbul comfortable for walking. Cappadocia in winter (December-February) is genuinely magical with snow on the fairy chimneys, but balloon flights cancel often due to weather. June-August on the south coast (Antalya, Bodrum) is hot beach season. Ramadan changes restaurant rhythms in residential areas — tourist zones operate normally. Tulip season in Istanbul is mid-April; the Sultanahmet park beds are stunning.",
  },

  portugal: {
    knownFor:
      "Portugal is known for port wine, fado, pasteis de nata, and the Algarve coast. What travelers don't expect: the country's affordability relative to the rest of Western Europe (a serious dinner with wine for €15-20 in Lisbon or Porto), the surf culture (Ericeira and Nazaré are world-class), and how much the Portuguese language itself shapes the trip — locals warm visibly when you try Bom dia.",
    topAttractions: [
      { name: "Belém Tower + Jerónimos Monastery + Pasteis de Belém", city: "Lisbon", type: "landmark", why: "The 16th-century departure point for Portuguese exploration, plus the original pasteis de nata bakery (since 1837) next door." },
      { name: "São Bento Station", city: "Porto", type: "landmark", why: "20,000 azulejo tiles depicting Portuguese history line the station's vestibule. Free to walk through." },
      { name: "Sintra (Pena Palace + Quinta da Regaleira)", type: "landmark", why: "Romantic-era palaces in the hills above Lisbon. Pena Palace is the technicolor one; Quinta da Regaleira has the famous initiation well." },
      { name: "Douro Valley wine region", type: "natural", why: "Terraced vineyards along the Douro River, source of port wine. Train from Porto to Pinhão for the scenic version." },
      { name: "Alfama walking + fado evening", city: "Lisbon", type: "neighborhood", why: "The medieval hilltop neighborhood. Fado in a small tavern after 11pm is the genuine version." },
      { name: "Algarve coast (Lagos, Benagil, Sagres)", type: "natural", why: "Limestone cliffs and sea caves along southern Portugal. Benagil cave by kayak is the postcard." },
      { name: "Coimbra University library", city: "Coimbra", type: "landmark", why: "18th-century Joanina Library at one of Europe's oldest universities." },
      { name: "Évora's bone chapel + Roman temple", type: "religious", why: "Capela dos Ossos is decorated entirely with human bones; nearby is a 1st-century AD Roman temple." },
    ],
    bestTimeToVisit:
      "March-May and September-November are Portugal's sweet spots — warm sunshine, mild evenings, no peak-summer crowds. June-August on the Algarve is beach-resort high season; Lisbon and Porto are warm and lively. November in Lisbon is among Europe's best budget travel weeks — 16-18°C daytime, hotels at 40-50% off summer. December-January are mild on the coast (12-15°C). Carnival in Madeira (mid-Feb) is theatrical.",
  },

  greece: {
    knownFor:
      "Greece is known for the Acropolis, the islands, and the food. What travelers underestimate: the mainland (Meteora's monasteries, Delphi's ruins, Thessaloniki's food scene rival anything on the islands), the Greek Easter ritual (the year's biggest festival, an entire week), and the different islands feeling like different countries (Santorini reads nothing like Crete reads nothing like Naxos).",
    topAttractions: [
      { name: "Acropolis + Parthenon", city: "Athens", type: "landmark", why: "The 5th-century BC marble citadel. Visit early morning (8am opening) or late afternoon to avoid heat and crowds." },
      { name: "Acropolis Museum", city: "Athens", type: "museum", why: "Modern museum at the foot of the Acropolis, designed around the Parthenon sculptures." },
      { name: "Santorini caldera (Oia and Imerovigli)", type: "natural", why: "The blue-domed white village postcards. Sunset in Oia is overcrowded but real — go up to Imerovigli instead for the view without the crowd." },
      { name: "Meteora monasteries", type: "religious", why: "Six Eastern Orthodox monasteries built atop sandstone pillars. Sunset from the Holy Trinity overlook is the moment." },
      { name: "Delphi", type: "landmark", why: "Ancient site of the Oracle. The treasury and theater on the slope of Mount Parnassus." },
      { name: "Mykonos beach clubs and old town", type: "experience", why: "The party island. Hora (the old town) is whitewashed and walkable; the beaches and clubs are the real reason to come." },
      { name: "Crete (Knossos + Samaria Gorge)", type: "natural", why: "Greece's biggest island. Knossos is the Minoan palace; Samaria Gorge is the 16km hike to the south coast." },
      { name: "Rhodes Old Town", type: "landmark", why: "UNESCO medieval city, Crusader-era walls, the largest medieval town in Europe." },
    ],
    bestTimeToVisit:
      "Late April through June and September through October are Greece's best windows — warm enough for swimming, not punishing-hot for the islands, fewer crowds at the Acropolis and Santorini. July-August is peak beach season and peak prices on Mykonos and Santorini (4x off-season rates). Athens in summer hits 40°C regularly; locals leave for the islands. Greek Easter (variable, usually April-May, week after Catholic Easter) shuts down most restaurants and museums Holy Friday through Easter Monday — book accordingly.",
  },

  croatia: {
    knownFor:
      "Croatia is known for Game of Thrones (Dubrovnik = King's Landing), the Dalmatian coast, and Plitvice Lakes. The country's quieter draws: island-hopping in the Adriatic (Hvar, Vis, Korčula are dramatically less crowded than Dubrovnik), the truffle and olive oil tradition in Istria, and Roman ruins (Diocletian's Palace in Split is still inhabited).",
    topAttractions: [
      { name: "Dubrovnik Old Town walls walk", city: "Dubrovnik", type: "landmark", why: "1.9km of intact medieval walls with views over terracotta rooftops and the Adriatic. Go at 8am opening or 6pm to avoid heat and cruise crowds." },
      { name: "Diocletian's Palace", city: "Split", type: "landmark", why: "Roman emperor's retirement palace, still inhabited 1700 years later. The Old Town is built inside it." },
      { name: "Plitvice Lakes National Park", type: "natural", why: "16 terraced turquoise lakes connected by waterfalls. Wooden walkways thread between them." },
      { name: "Hvar town and Pakleni Islands", type: "natural", why: "The party island for Croatia. Hvar town's harbor; the Pakleni Islands by water taxi for swimming." },
      { name: "Krka Waterfalls", type: "natural", why: "Croatia's other waterfall park, less crowded than Plitvice. Skradinski Buk is the iconic falls." },
      { name: "Zagreb's Upper Town", city: "Zagreb", type: "neighborhood", why: "St. Mark's Church with the patterned tile roof; the funicular up; the Museum of Broken Relationships." },
      { name: "Istrian truffle hunt (Motovun)", type: "experience", why: "Northwest Croatia. Truffle hunting with dogs, plus the hilltop town of Motovun." },
      { name: "Korčula Old Town", type: "landmark", why: "Marco Polo's reputed birthplace. Walled island town often described as a quieter Dubrovnik." },
    ],
    bestTimeToVisit:
      "Late May through June and September through early October are Croatia's best windows — Adriatic warm enough for swimming, before/after the July-August crush. Dubrovnik in July-August is genuinely crowded (5+ cruise ships docking simultaneously); avoid if possible. Plitvice Lakes works April-October but the autumn colors in October are spectacular. Winter (November-March) on the coast is mild but ferries reduce, restaurants close, the islands empty. Zagreb works year-round.",
  },

  "bosnia-and-herzegovina": {
    knownFor:
      "Bosnia and Herzegovina is known for the Mostar bridge, the legacy of the 1990s war, and as one of Europe's most underrated value destinations. The country's draws beyond the obvious: Ottoman heritage that survived (Sarajevo's Baščaršija is real and lived-in), Byzantine-meets-Mediterranean food culture, and dramatic mountain landscapes most travelers don't realize exist here.",
    topAttractions: [
      { name: "Stari Most (Old Bridge)", city: "Mostar", type: "landmark", why: "16th-century Ottoman bridge, destroyed in 1993, rebuilt in 2004. Local divers leap from it; you can pay them to do so on demand." },
      { name: "Sarajevo's Baščaršija", city: "Sarajevo", type: "neighborhood", why: "The Ottoman bazaar quarter with the Sebilj fountain, copper-smiths still working, ćevapi grills everywhere." },
      { name: "Tunnel of Hope (Sarajevo War Tunnel)", city: "Sarajevo", type: "experience", why: "The 800m tunnel built under the airport during the 1992-1995 siege. 25m is preserved." },
      { name: "Latin Bridge", city: "Sarajevo", type: "landmark", why: "Where Archduke Franz Ferdinand was assassinated in 1914, triggering World War I." },
      { name: "Blagaj Tekija (Dervish monastery)", type: "religious", why: "16th-century Sufi house built into a cliff face at the source of the Buna River, 12km from Mostar." },
      { name: "Kravice Waterfalls", type: "natural", why: "25-meter waterfalls in a natural amphitheater. Swimming allowed in the pool below; an hour from Mostar." },
      { name: "Pocitelj", type: "landmark", why: "Ottoman-era walled hilltop town between Mostar and Mostar's airport. Worth an hour to climb the Sahat Kula tower." },
      { name: "Sutjeska National Park", type: "natural", why: "Bosnia's largest national park; primeval forest at Perućica, Mount Maglić (Bosnia's highest peak)." },
    ],
    bestTimeToVisit:
      "May-June and September-October are Bosnia's best months — pleasant temperatures, lush landscapes, no peak-summer crowds at Mostar's bridge. July-August are hot and Mostar fills with bus tours. Sarajevo Film Festival (mid-August) is the country's biggest cultural event. Winter (December-March) brings skiing in the mountains around Sarajevo (the 1984 Olympics venues at Bjelašnica and Jahorina), and Sarajevo itself becomes magical with snow.",
  },

  "czech-republic": {
    knownFor:
      "Czechia is known for Prague's medieval Old Town, beer (the highest per-capita consumption in the world), and bohemian glass. What travelers underestimate: how much of the country worth seeing is outside Prague (Český Krumlov, Karlovy Vary, Brno's modernist architecture), and how good the rural pension and pub culture is once you leave the capital.",
    topAttractions: [
      { name: "Charles Bridge", city: "Prague", type: "landmark", why: "14th-century stone bridge with 30 baroque statues. Cross at sunrise to have it to yourself; by 10am it's a permanent traffic jam." },
      { name: "Prague Castle + St. Vitus Cathedral", city: "Prague", type: "landmark", why: "Largest ancient castle complex in the world (70,000 m²). The cathedral interior with the Mucha stained glass is the highlight." },
      { name: "Old Town Square + Astronomical Clock", city: "Prague", type: "landmark", why: "The 1410 astronomical clock chimes hourly with apostles parading. Crowds gather; the clock face itself is the real art." },
      { name: "Český Krumlov", type: "landmark", why: "UNESCO medieval town with a castle on a horseshoe bend in the Vltava. 3 hours by bus from Prague; stay overnight to see it after day-trippers leave." },
      { name: "Karlovy Vary", type: "experience", why: "19th-century spa town with thermal springs and grand colonnades. Try the bitter mineral water from a porcelain sipping cup." },
      { name: "Pilsner Urquell Brewery (Plzeň)", type: "experience", why: "The original pilsner, brewed since 1842. Tour ends in the cellars with unfiltered Pilsner straight from the barrel." },
      { name: "Brno's Villa Tugendhat", city: "Brno", type: "landmark", why: "Mies van der Rohe's 1930 modernist house, UNESCO-listed. Book the tour weeks ahead." },
      { name: "Kutná Hora (Sedlec Ossuary)", type: "religious", why: "Chapel decorated with the bones of 40,000 people. Macabre and small; the nearby St. Barbara's Church is worth a full hour." },
    ],
    bestTimeToVisit:
      "May, June, September are Prague's sweetest months — warm enough for outdoor terraces, light enough for long days, not yet flooded with summer tour groups. July-August in Prague is heavy with tourists and heat (up to 35°C in the city). November-March is genuinely cold (-5 to 5°C) but Prague is among Europe's most magical Christmas-market cities (late November to December 23 in the Old Town Square and Wenceslas Square).",
  },

  hungary: {
    knownFor:
      "Hungary is known for Budapest, thermal baths, paprika, and ruin bars. Less marketed: the country's wine regions (Tokaj for sweet wine, Eger for bull's blood reds), the puszta (the Great Hungarian Plain with traditional cowboys), and the unique non-Indo-European Hungarian language that sounds like nothing else in Europe.",
    topAttractions: [
      { name: "Hungarian Parliament Building", city: "Budapest", type: "landmark", why: "Gothic Revival on the Danube, third-largest parliament in the world. Tour tickets sell out same-day in summer; book online ahead." },
      { name: "Széchenyi Thermal Bath", city: "Budapest", type: "experience", why: "Yellow neo-baroque thermal complex in the City Park. Outdoor pools at 7am with steam rising in winter is the postcard." },
      { name: "Buda Castle + Fisherman's Bastion", city: "Budapest", type: "landmark", why: "Castle complex on the Buda hill with the panoramic Fisherman's Bastion (free) overlooking the Danube and Pest." },
      { name: "Chain Bridge + Margaret Island walk", city: "Budapest", type: "landmark", why: "1849 suspension bridge, the first permanent crossing over the Danube in Budapest. Margaret Island in the river is car-free and good for picnics." },
      { name: "St. Stephen's Basilica", city: "Budapest", type: "religious", why: "Neoclassical basilica named for Hungary's first king. Climb the dome for the city view." },
      { name: "Heroes' Square + City Park", city: "Budapest", type: "landmark", why: "Monumental square with statues of Hungary's seven founding tribes. Vajdahunyad Castle in the park is photogenic." },
      { name: "Ruin bars in District VII (Szimpla Kert)", city: "Budapest", type: "experience", why: "Bars built in derelict pre-war buildings with mismatched furniture and Trabant cars. Szimpla Kert is the famous one." },
      { name: "Eger (castle + wine cellars)", type: "experience", why: "Two-hour drive from Budapest. The Valley of the Beautiful Women has 50+ wine cellars carved into a hillside." },
    ],
    bestTimeToVisit:
      "May-June and September-October are Budapest's best months — pleasant temperatures, lively outdoor terraces, the thermal baths still warm. July-August is hot (35°C+) and tourist-heavy. November-March is properly cold but the thermal baths peak (steam-and-snow) and the Christmas markets at Vörösmarty Square run late November to early January. Sziget Festival (early August) is one of Europe's biggest music festivals; the city fills.",
  },

  poland: {
    knownFor:
      "Poland is known for Auschwitz, pierogi, the Solidarity movement, and Pope John Paul II. The country's underrated qualities: how cheap it remains relative to Western Europe, the Old Town reconstructions (Warsaw was 85% destroyed in WWII and rebuilt brick-by-brick), and the food culture beyond pierogi (smoked sheep cheese in the Tatras, Baltic cod in Gdańsk, Jewish-Polish bagels in Kraków).",
    topAttractions: [
      { name: "Auschwitz-Birkenau Memorial", type: "experience", why: "Former Nazi concentration camps near Kraków. Tours include both sites; book weeks ahead and allow a full day." },
      { name: "Wawel Castle + Royal Cathedral", city: "Kraków", type: "landmark", why: "The seat of Polish kings for 500 years, on a limestone hill above the Vistula." },
      { name: "Kraków Main Square + Cloth Hall", city: "Kraków", type: "landmark", why: "Largest medieval square in Europe (200m × 200m). The Renaissance Cloth Hall in the center now sells souvenirs and amber." },
      { name: "Wieliczka Salt Mine", type: "natural", why: "Underground salt cathedral carved by miners. UNESCO-listed, 30 minutes from Kraków." },
      { name: "Warsaw Old Town (rebuilt)", city: "Warsaw", type: "landmark", why: "Painstakingly reconstructed after WWII destruction. The reconstruction itself is UNESCO-listed for its faithfulness." },
      { name: "Warsaw Uprising Museum", city: "Warsaw", type: "museum", why: "Powerful, immersive museum on the 1944 uprising against Nazi occupation. Allow 3 hours." },
      { name: "Gdańsk Old Town (Long Market + Crane)", city: "Gdańsk", type: "neighborhood", why: "Hanseatic League trading city on the Baltic. The Solidarity movement was born at the nearby shipyard." },
      { name: "Białowieża Forest", type: "natural", why: "Last remaining primeval forest in Europe, home to European bison. Border park between Poland and Belarus." },
    ],
    bestTimeToVisit:
      "May-June and September are Poland's best months — long days, warm temperatures, the Tatras green and the cities lively. July-August is hot and Auschwitz/Wieliczka book out fast. November-March in Polish cities is genuinely cold (-5 to 5°C) but Kraków's Christmas markets in December and January's Tatra skiing are real winter draws. The Polish Sea (Baltic) is too cold for swimming year-round to most travelers.",
  },

  austria: {
    knownFor:
      "Austria is known for Vienna's coffeehouses, Mozart, the Sound of Music, and Alpine skiing. Less obvious: how dramatically Tyrol differs from Vienna (mountain villages, lederhosen-as-everyday-wear, completely different food culture from the eastern half), the Wachau wine region along the Danube, and Vienna's role as the world's most livable city by multiple rankings.",
    topAttractions: [
      { name: "Schönbrunn Palace", city: "Vienna", type: "landmark", why: "Habsburg summer palace with 1,441 rooms. The Gloriette atop the gardens has the panoramic Vienna view." },
      { name: "Hofburg Palace + Spanish Riding School", city: "Vienna", type: "landmark", why: "Imperial winter palace, today the Austrian president's office. The Spanish Riding School trains Lipizzaner horses; morning training is the affordable view." },
      { name: "St. Stephen's Cathedral (Stephansdom)", city: "Vienna", type: "religious", why: "Vienna's central Gothic cathedral with the patterned tile roof. Climb the south tower (343 steps) for views; the catacombs tour is short and fascinating." },
      { name: "Salzburg Old Town + Mozart's Birthplace", city: "Salzburg", type: "landmark", why: "Birthplace of Mozart, setting of much of Sound of Music. The Hohensalzburg fortress above the town is the postcard." },
      { name: "Hallstatt", type: "natural", why: "Alpine village on a lake, the most-photographed small town in Austria. Day-trip from Salzburg or stay overnight to see it without day-trippers." },
      { name: "Innsbruck + Bergisel ski jump", city: "Innsbruck", type: "natural", why: "Tyrolean capital surrounded by Alps. The Zaha Hadid-designed Bergisel ski jump has a top-floor restaurant and observation deck." },
      { name: "Wachau Valley (Melk Abbey + Dürnstein)", type: "natural", why: "UNESCO Danube wine region. Melk Abbey is baroque-yellow and dramatic; Dürnstein is where Richard the Lionheart was imprisoned." },
      { name: "Vienna State Opera (standing-room tickets)", city: "Vienna", type: "experience", why: "World-class opera at €13 for standing-room tickets sold from 80 minutes before each performance." },
    ],
    bestTimeToVisit:
      "May-September is Austria's broadest sweet spot — Vienna's outdoor terraces open, Salzburg festival season (mid-July to end of August), Alps walkable. December (Christmas markets late November to December 24) and January-March (skiing) are the winter draws. November and early April are the dead months — warmth gone, snow not yet reliable. Vienna's coffeehouse culture works year-round; the city is always indoors-rich.",
  },

  switzerland: {
    knownFor:
      "Switzerland is known for the Alps, chocolate, watches, and being expensive. Less marketed: the four-language country shape (German in Zurich, French in Geneva, Italian in Ticino, Romansh in pockets — these are different cultures, not just different languages), and the public transport perfection (a SBB train pass and you can reach any village by rail/bus/boat).",
    topAttractions: [
      { name: "Matterhorn (Zermatt)", type: "natural", why: "The most-photographed mountain in the world. Zermatt is car-free; ride the Gornergrat railway up for the front-on view." },
      { name: "Jungfraujoch (Top of Europe)", type: "natural", why: "3,454m railway station between Mönch and Jungfrau. Day-trip from Interlaken; book the Eiger Express gondola for the modern fast version." },
      { name: "Lake Geneva + Chillon Castle", type: "natural", why: "Castle on a rock in Lake Geneva, immortalized by Lord Byron. Combine with Lavaux vineyard terraces (UNESCO)." },
      { name: "Glacier Express (Zermatt to St. Moritz)", type: "experience", why: "8-hour panoramic train through the Alps. The slowest express train in the world by design." },
      { name: "Lucerne Old Town + Chapel Bridge", city: "Lucerne", type: "landmark", why: "14th-century covered wooden bridge over the Reuss River. Mount Pilatus and Rigi above town; both have cable cars." },
      { name: "Bern Old Town (UNESCO)", type: "neighborhood", why: "Medieval arcaded streets along the Aare River. The Zytglogge clock tower and the bear pit are the obvious sights." },
      { name: "Lauterbrunnen Valley + Trümmelbach Falls", type: "natural", why: "U-shaped valley with 72 waterfalls. The Trümmelbach Falls are inside the mountain and accessed via a funicular." },
      { name: "Schilthorn (Piz Gloria)", type: "natural", why: "James Bond's lair from On Her Majesty's Secret Service. The revolving restaurant at 2,970m has a 360° view of the Bernese Alps." },
    ],
    bestTimeToVisit:
      "June through September is the prime mountain-walking season — Alpine paths open, cable cars running, lakes warm enough to swim. December-March is ski season (Verbier, Zermatt, St. Moritz, Davos). April-May and October-November are the in-between months when many mountain destinations partially close (cable cars under maintenance, restaurants shut). Cities (Zurich, Geneva, Bern, Basel) work year-round.",
  },

  belgium: {
    knownFor:
      "Belgium is known for chocolate, beer, waffles, and being the boring administrative center of the EU. The country's underrated draws: Bruges and Ghent (medieval cities preserved better than almost anything in France or Germany), Antwerp's diamond and fashion scene, and Belgian beer's actual depth (Trappist monasteries still brew commercially; lambic and gueuze are unique to Belgium).",
    topAttractions: [
      { name: "Grand Place (Grote Markt)", city: "Brussels", type: "landmark", why: "UNESCO central square ringed by guild houses with gilded facades. Light shows at night during summer." },
      { name: "Manneken Pis", city: "Brussels", type: "landmark", why: "The famous tiny pissing-boy statue. Smaller than you expect; he has 1,000+ outfits in the City Museum." },
      { name: "Bruges canals + Belfry", city: "Bruges", type: "landmark", why: "Medieval city preserved more or less intact. Climb the 366-step Belfry for the rooftop view." },
      { name: "Ghent (Gravensteen Castle + Saint Bavo's Cathedral)", city: "Ghent", type: "landmark", why: "Gravensteen is a 12th-century moated castle; Saint Bavo's holds Van Eyck's Ghent Altarpiece (1432)." },
      { name: "Antwerp's Cathedral of Our Lady + MAS Museum", city: "Antwerp", type: "museum", why: "Cathedral holds four Rubens paintings; the MAS is a modern stacked-block museum with a free rooftop view." },
      { name: "Flanders Fields (Ypres / Ieper)", type: "experience", why: "WWI battlefields, the Menin Gate Last Post ceremony every evening at 8pm since 1928 (interrupted only by Nazi occupation)." },
      { name: "Trappist beer monasteries (Westvleteren, Chimay, Orval)", type: "experience", why: "Belgium has 6 of the world's 14 Trappist breweries. Westvleteren is the famous one — sold only at the abbey itself." },
      { name: "Belgian chocolate tasting (Brussels, Bruges, Antwerp)", type: "experience", why: "Pierre Marcolini, Mary, and Wittamer in Brussels; The Chocolate Line in Bruges and Antwerp." },
    ],
    bestTimeToVisit:
      "May-September is Belgium's broadest window — outdoor cafés open, daylight long, weather mild (15-22°C). July-August are warmest but Bruges and Brussels can fill with tour groups. November-March is properly cold and gray; the Christmas markets (late November to December 30) in Brussels and Bruges are real winter draws. Belgium's beer festivals (ZBF in Bruges in February, Wood & Spelt in March, Belgian Beer Weekend in Brussels September) are scattered through the year.",
  },

  denmark: {
    knownFor:
      "Denmark is known for Copenhagen, hygge, design (Bang & Olufsen, Royal Copenhagen, Bjarke Ingels), and bicycle culture. The country's quieter selling points: the food scene (Noma + the dozen restaurants its alumni opened), the LEGO origin story (Billund), and the Faroe Islands (technically Danish, increasingly the destination for European travelers wanting a Nordic outpost).",
    topAttractions: [
      { name: "Nyhavn", city: "Copenhagen", type: "neighborhood", why: "The 17th-century waterfront with colored townhouses. Touristy and overpriced but the photo is the photo." },
      { name: "Tivoli Gardens", city: "Copenhagen", type: "experience", why: "The world's second-oldest amusement park (1843). Walt Disney visited and got the idea for Disneyland." },
      { name: "The Little Mermaid", city: "Copenhagen", type: "landmark", why: "1.25m bronze mermaid by Edvard Eriksen. Famously underwhelming in person; visit and tick the box." },
      { name: "Christiansborg Palace + Tower", city: "Copenhagen", type: "landmark", why: "Seat of the Danish Parliament. The tower has free entry and the highest open viewpoint in central Copenhagen." },
      { name: "Rosenborg Castle + Crown Jewels", city: "Copenhagen", type: "landmark", why: "Renaissance summer palace, now a museum holding the Danish Crown Jewels." },
      { name: "Louisiana Museum of Modern Art", type: "museum", why: "Coastal modern-art museum 35km north of Copenhagen. Train to Humlebæk; the sculpture garden by the sea is the experience." },
      { name: "Aarhus (Aros Museum + Den Gamle By)", city: "Aarhus", type: "museum", why: "Aros has Olafur Eliasson's rooftop rainbow walkway; Den Gamle By is an open-air historical-Denmark village." },
      { name: "Kronborg Castle (Hamlet's Castle)", type: "landmark", why: "Setting of Shakespeare's Hamlet, in Helsingør, an hour north of Copenhagen by train." },
    ],
    bestTimeToVisit:
      "May through September is Denmark's broadest window — long daylight (17 hours in June), mild weather, all the outdoor cafés open. June-August is peak tourist season; book Copenhagen hotels months ahead. December's Christmas markets at Tivoli (open mid-November to early January) are real winter destinations. January-March are short and dark (sunset around 4pm in December); the Danes adapt with hygge candle-and-blanket culture. November is Denmark's deadest tourist month.",
  },

  sweden: {
    knownFor:
      "Sweden is known for IKEA, ABBA, meatballs, and lagom (the cultural concept of 'just enough'). The country's underrated qualities: the archipelago of 30,000 islands off Stockholm, the Sami culture in the far north (Kiruna, Abisko), and the food revolution (Swedish smörgåsbord and the new-Nordic restaurant scene).",
    topAttractions: [
      { name: "Vasa Museum", city: "Stockholm", type: "museum", why: "A 17th-century warship that sank on its maiden voyage in 1628 and was raised in 1961, now displayed in a purpose-built museum. Unmissable." },
      { name: "Gamla Stan + Royal Palace", city: "Stockholm", type: "neighborhood", why: "Stockholm's medieval island. Tourist-managed but genuinely beautiful; the Royal Palace changing-of-the-guard at noon." },
      { name: "Stockholm Archipelago", type: "natural", why: "30,000 islands off Stockholm. Day-trip to Vaxholm or Sandhamn; week-long sailing trips for the deeper version." },
      { name: "ABBA Museum", city: "Stockholm", type: "museum", why: "On Djurgården island. Theatrical and unironic; you can sing Dancing Queen at a virtual karaoke booth." },
      { name: "Drottningholm Palace", type: "landmark", why: "UNESCO 17th-century royal residence on Lovön island, 30 minutes from Stockholm. The court theatre still stages baroque opera." },
      { name: "Gothenburg's Liseberg amusement park + archipelago", city: "Gothenburg", type: "experience", why: "Scandinavia's largest amusement park; the south-coast archipelago is gentler than Stockholm's." },
      { name: "Kiruna + Abisko (Northern Lights)", type: "natural", why: "Far north Swedish Lapland. Abisko is statistically the world's best place to see the aurora due to a microclimate." },
      { name: "Icehotel (Jukkasjärvi)", type: "experience", why: "Hotel rebuilt entirely from ice every year, 200km north of the Arctic Circle. Daytime tour or overnight stay." },
    ],
    bestTimeToVisit:
      "June-August is Sweden's main tourist window — long daylight (the Midnight Sun in the far north), warm enough for swimming in the archipelago, festivals everywhere. Midsummer (around June 21) is the country's biggest holiday and worth planning around. December-March in the south is mild-but-dark; in the north is full polar night and prime Northern Lights season. April-May and September-October are the dead months for most tourist infrastructure; many archipelago boats run summer-only.",
  },

  norway: {
    knownFor:
      "Norway is known for fjords, oil wealth, Vikings, and being expensive. What travelers underestimate: the dramatic length of the country (Oslo to Kirkenes is the same as Oslo to Rome), the road and rail engineering (the Atlantic Road, the Flåm Railway), and the contrast between cosmopolitan Oslo and coastal villages reachable only by ferry.",
    topAttractions: [
      { name: "Geirangerfjord + Nærøyfjord", type: "natural", why: "Two UNESCO fjords. Nærøyfjord is the narrow dramatic one; Geirangerfjord has the Seven Sisters waterfalls." },
      { name: "Bergen + Bryggen wharf", city: "Bergen", type: "landmark", why: "UNESCO Hanseatic wharf. Take the Fløibanen funicular up Mount Fløyen for the city view." },
      { name: "Pulpit Rock (Preikestolen)", type: "natural", why: "604-meter cliff above Lysefjord. 4-hour return hike from Stavanger; weather-dependent." },
      { name: "Trolltunga", type: "natural", why: "The 'troll's tongue' rock platform 700m above Ringedalsvatnet lake. 12-hour return hike, serious commitment." },
      { name: "Lofoten Islands", type: "natural", why: "Arctic Circle archipelago with red-painted fishing huts and dramatic peaks. 3-4 hours by flight from Oslo." },
      { name: "Atlantic Road", type: "experience", why: "8.3km coastal road north of Kristiansund, 8 bridges over open Atlantic waves. The Storseisundet Bridge is the famous photo." },
      { name: "Flåm Railway", type: "experience", why: "20km mountain railway from Myrdal to Flåm with a 1:18 gradient. Combine with the Norway in a Nutshell route." },
      { name: "Tromsø (Northern Lights + Polar Museum)", type: "natural", why: "Above the Arctic Circle. The Aurora season runs September-March; the Polar Museum tells the story of Roald Amundsen and Fridtjof Nansen." },
    ],
    bestTimeToVisit:
      "June-August for fjords, hiking, and the Midnight Sun in the north. September-October for autumn colors and reasonable Northern Lights chances in the north. November-March for Northern Lights peak (October-March in Tromsø), skiing, and polar night. April-May is shoulder; many roads in the high country still closed by snow. Norwegian winters in coastal areas (Bergen, Stavanger) are mild-but-rainy; in the interior (Lillehammer, Oslo) properly cold.",
  },

  ireland: {
    knownFor:
      "Ireland is known for Guinness, traditional music, the Cliffs of Moher, and the literary heritage (Joyce, Yeats, Beckett, Heaney all from this small island). The country's underrated draws: the food scene's transformation in the last decade (Dublin and Cork are now serious restaurant cities), the surprisingly accessible wild landscape (the Wild Atlantic Way), and the regional accent variation that shifts every 50km.",
    topAttractions: [
      { name: "Cliffs of Moher", type: "natural", why: "214-meter Atlantic cliffs in County Clare. Day-trip from Galway; sunset is the best light." },
      { name: "Trinity College + Book of Kells", city: "Dublin", type: "experience", why: "9th-century illuminated Gospels at Ireland's oldest university. The Long Room library above is the photo." },
      { name: "Guinness Storehouse", city: "Dublin", type: "experience", why: "7-story tour ending in the Gravity Bar with a free pint and 360° city view." },
      { name: "Ring of Kerry / Killarney National Park", type: "natural", why: "179km coastal driving loop in southwest Ireland. Killarney is the best base; Skellig Michael (the Star Wars island) is offshore." },
      { name: "Giant's Causeway", type: "natural", why: "Hexagonal basalt columns on the Northern Irish coast (UK, technically). Combine with a Belfast trip." },
      { name: "Galway + Latin Quarter", city: "Galway", type: "neighborhood", why: "Traditional music in pubs every night. Salthill Promenade for the Atlantic walk." },
      { name: "Aran Islands", type: "natural", why: "Three Irish-speaking islands off Galway. Inishmore is the largest; Dún Aonghasa cliff fort is the postcard." },
      { name: "Kilmainham Gaol", city: "Dublin", type: "experience", why: "Former prison where the 1916 Easter Rising leaders were executed. Dark and powerful; book ahead." },
    ],
    bestTimeToVisit:
      "May-September is Ireland's broadest window — long daylight, less rain (less, not little), warmer temperatures (15-19°C). June and July have the longest evenings; August has the most rain. St. Patrick's Day (March 17) brings parades to Dublin and most cities. October has dramatic light and autumn colors but the wind off the Atlantic intensifies. November-February is dark, wet, mild — workable for Dublin pub culture, punishing for the Wild Atlantic Way.",
  },

  iceland: {
    knownFor:
      "Iceland is known for the Blue Lagoon, the Northern Lights, Björk, and as the country that bankrupted itself spectacularly in 2008 then rebuilt around tourism. The under-marketed draws: the food scene in Reykjavík (Dill restaurant; the new-Nordic adoption); the geothermal pool culture (every village has one, and locals use them daily); and the road-trip infrastructure (Ring Road = 1,332km).",
    topAttractions: [
      { name: "Blue Lagoon", type: "experience", why: "Geothermal spa near the airport. Pre-book; arriving without a ticket is impossible. Sky Lagoon (closer to Reykjavík) is a quieter alternative." },
      { name: "Golden Circle (Þingvellir, Geysir, Gullfoss)", type: "natural", why: "Iceland's classic day-trip from Reykjavík. Þingvellir is where the European and North American plates meet (and where the Vikings held the world's first parliament in 930)." },
      { name: "South Coast (Seljalandsfoss, Skógafoss, Vík beach)", type: "natural", why: "Day-trip or overnight from Reykjavík. Black sand beaches at Reynisfjara; the Sólheimajökull glacier hike option." },
      { name: "Jökulsárlón Glacier Lagoon + Diamond Beach", type: "natural", why: "Iceberg-filled lagoon at the foot of Vatnajökull glacier. Adjacent black-sand beach with washed-up ice chunks ('diamonds')." },
      { name: "Northern Lights tour (September-March)", type: "experience", why: "Hunt for the aurora from Reykjavík or further north. Boat tours and bus tours both work; weather flexibility is key." },
      { name: "Hallgrímskirkja", city: "Reykjavík", type: "religious", why: "73-meter expressionist concrete church inspired by basalt columns. Take the elevator to the tower for the city view." },
      { name: "Westfjords (Dynjandi waterfall, Látrabjarg cliffs)", type: "natural", why: "Iceland's least-visited region. 7+ days of road tripping required." },
      { name: "Húsavík (whale watching)", type: "experience", why: "Northern Iceland; some of the world's best chances of seeing humpback whales (April-October)." },
    ],
    bestTimeToVisit:
      "June-August has the Midnight Sun (sunsets at 11:30pm in Reykjavík), all roads open, hiking accessible. September-March is Northern Lights season (October-February for highest probability). December has 4 hours of daylight and is genuinely difficult; February has 9 hours and is much easier. The Ring Road requires June-September for a full clockwise drive; in winter the F-roads (interior highland) close completely.",
  },

  finland: {
    knownFor:
      "Finland is known for saunas, Nokia, Angry Birds, and being consistently ranked the world's happiest country. The travel draws: Helsinki's design heritage (Marimekko, Iittala, Alvar Aalto), Lapland in winter (Santa Claus Village in Rovaniemi, the Arctic husky-sled trip), and the lake-and-forest summer culture (Finland is 75% forest and 10% lakes).",
    topAttractions: [
      { name: "Helsinki Cathedral + Senate Square", city: "Helsinki", type: "landmark", why: "Neoclassical white cathedral above a granite square. Free entry; the steps are a popular photo spot." },
      { name: "Suomenlinna Sea Fortress", type: "landmark", why: "UNESCO 18th-century fortress on islands off Helsinki, 15 minutes by ferry." },
      { name: "Helsinki saunas (Löyly, Kotiharju)", city: "Helsinki", type: "experience", why: "Löyly is the modern waterfront design sauna; Kotiharju is the 1928 wood-fired traditional version. Both let you swim in the Baltic between sauna sessions." },
      { name: "Rovaniemi (Santa Claus Village)", type: "experience", why: "On the Arctic Circle. Open year-round; meet Santa, get the Arctic Circle certificate, sleep in a glass igloo." },
      { name: "Northern Lights in Saariselkä or Levi", type: "natural", why: "Finnish Lapland aurora hunting. September-March; glass-roofed igloos at Kakslauttanen are the famous (expensive) option." },
      { name: "Lake Saimaa + the Saimaa Ringed Seal", type: "natural", why: "Finland's largest lake. The freshwater Saimaa ringed seal is critically endangered (~400 left); summer boat tours from Savonlinna." },
      { name: "Olavinlinna Castle (Savonlinna)", type: "landmark", why: "15th-century medieval castle on an island. Hosts the Savonlinna Opera Festival in July." },
      { name: "Husky safari (Kemi or Rovaniemi)", type: "experience", why: "Half-day to multi-day dogsledding through Finnish forest. Best November-March." },
    ],
    bestTimeToVisit:
      "December-March for winter activities — Northern Lights, husky safaris, Christmas in Lapland, frozen lakes. The midwinter sun barely rises in the far north (polar night around Christmas). June-August for the Midnight Sun, lake culture, and the brief intense Finnish summer. April-May and September-November are the dead months — the snow is gone but the lakes aren't yet warm; the autumn 'ruska' colors in Lapland in September are the exception.",
  },

  slovenia: {
    knownFor:
      "Slovenia is known for Lake Bled and being the country other travelers underestimate — small (the size of New Jersey), green (60% forested), and split between Mediterranean (Piran), Alpine (Triglav National Park), and Pannonian (the eastern wine country) influences. Ljubljana is among Europe's most livable small capitals.",
    topAttractions: [
      { name: "Lake Bled + Bled Castle + Island", city: "Bled", type: "natural", why: "Glacial lake with a baroque church on an island and a medieval castle on a cliff. Row out to the island in a pletna boat." },
      { name: "Lake Bohinj", type: "natural", why: "Bigger and quieter than Bled. Inside Triglav National Park. The starting point for Triglav summit hikes." },
      { name: "Postojna Cave", type: "natural", why: "The most-visited cave system in Europe. An electric train takes you 4km in; you walk another 1.5km." },
      { name: "Predjama Castle", type: "landmark", why: "Castle built into the mouth of a cave. Combine with Postojna (15 minutes apart)." },
      { name: "Ljubljana Old Town + Triple Bridge", city: "Ljubljana", type: "neighborhood", why: "Car-free historic center along the Ljubljanica River. The Triple Bridge is Jože Plečnik's signature work." },
      { name: "Piran", city: "Piran", type: "neighborhood", why: "Former Venetian fishing town on the Adriatic. Tartini Square and the bell tower; the salt pans of Sečovlje just south." },
      { name: "Vintgar Gorge", type: "natural", why: "1.6km wooden walkway above the Radovna River through a steep gorge. Near Bled." },
      { name: "Kobarid + Soča Valley", type: "natural", why: "Turquoise river valley, WWI battlefield, base for whitewater rafting and zip-lining." },
    ],
    bestTimeToVisit:
      "May-June and September-October for the perfect combination of warm weather, lush green landscapes, and manageable crowds. July-August is high season at Bled and Bohinj; book ahead. Winter (December-March) is ski season at Kranjska Gora and Vogel above Bohinj. Ljubljana's Christmas market (December) is small but excellent. The Piran summer is genuinely Mediterranean (warm, swimmable Adriatic).",
  },

  romania: {
    knownFor:
      "Romania is known for Dracula (Bran Castle), Transylvania, and being one of the cheapest EU members. The country's underrated draws: the painted monasteries of Bucovina, the wooden churches of Maramureș, the Danube Delta (one of Europe's largest wetland reserves), and the Saxon walled towns in Transylvania (Sibiu, Brașov, Sighișoara) that read more like medieval Germany than Eastern Europe.",
    topAttractions: [
      { name: "Bran Castle ('Dracula's Castle')", type: "landmark", why: "The castle marketed as Dracula's home. Vlad the Impaler's actual connection is thin; the castle itself is small and worth an hour." },
      { name: "Peleș Castle", type: "landmark", why: "Neo-Renaissance summer royal residence, dramatically more impressive than Bran. In Sinaia, an hour from Bran." },
      { name: "Brașov Old Town + Black Church", city: "Brașov", type: "neighborhood", why: "Saxon-fortified central square with Europe's narrowest street. The Black Church is the largest Gothic church in Romania." },
      { name: "Sibiu Old Town", city: "Sibiu", type: "neighborhood", why: "Saxon walled city with the famous 'eyes of Sibiu' rooftop windows. Three squares all in walking distance." },
      { name: "Sighișoara citadel", type: "landmark", why: "The only inhabited medieval citadel in Europe. Vlad the Impaler's birthplace. UNESCO-listed." },
      { name: "Bucharest's Palace of Parliament", city: "Bucharest", type: "landmark", why: "World's heaviest administrative building. Ceaușescu's monument; the tour is fascinating and slightly absurd." },
      { name: "Painted monasteries of Bucovina (Voroneț, Moldovița, Sucevița)", type: "religious", why: "15th-16th century Orthodox monasteries with exterior frescoes preserved on every wall. UNESCO." },
      { name: "Danube Delta", type: "natural", why: "Europe's largest river delta. Boat trips from Tulcea; 300+ bird species, including pelicans." },
    ],
    bestTimeToVisit:
      "May-June and September-October are Romania's best months — pleasant temperatures, lush Transylvanian landscapes, Bucharest's outdoor terraces in full swing. July-August is hot and Bran Castle fills with tour groups. Winter (December-March) brings skiing in Poiana Brașov and Sinaia. Christmas markets in Sibiu and Brașov are small but real (December). The Danube Delta works April-October; spring is best for birdwatching.",
  },

  estonia: {
    knownFor:
      "Estonia is known for Tallinn's medieval Old Town, being the world's most digital society (you can renew passports online), and singing revolutions (1987 Singing Revolution helped end Soviet rule). Less marketed: the country's island culture (Saaremaa, Hiiumaa), the food scene's recent transformation, and the dense forests that cover half the country.",
    topAttractions: [
      { name: "Tallinn Old Town (Vanalinn)", city: "Tallinn", type: "neighborhood", why: "UNESCO medieval city walls and the Town Hall Square. Toompea Hill above for the rooftop view." },
      { name: "Telliskivi Creative City", city: "Tallinn", type: "neighborhood", why: "Former industrial complex turned design district. Restaurants, the Fotografiska photography museum, weekend flea markets." },
      { name: "Kadriorg Palace + KUMU Art Museum", city: "Tallinn", type: "museum", why: "Peter the Great's Estonian palace (1718) and the modern KUMU art museum in the same park." },
      { name: "Lahemaa National Park", type: "natural", why: "Largest national park in Estonia, an hour east of Tallinn. Forests, bog walks, and 18th-century manor houses." },
      { name: "Tartu Old Town + Old University", city: "Tartu", type: "neighborhood", why: "Estonia's intellectual capital. Town Hall Square with the kissing-students fountain." },
      { name: "Saaremaa (Kuressaare Castle)", type: "natural", why: "Estonia's largest island. The 13th-century Kuressaare Castle is the only Estonian medieval castle preserved intact." },
      { name: "Pärnu beach", type: "natural", why: "Estonia's summer-resort town. Wide white-sand beach; warm-water bathing in July-August." },
      { name: "Soomaa National Park (bog-shoeing)", type: "experience", why: "Bog walks in summer; canoeing during the 'fifth season' spring floods (March-April)." },
    ],
    bestTimeToVisit:
      "June-August is Estonia's main tourist window — long daylight (the white nights in June with twilight at midnight), warm-enough weather (18-23°C), all the islands accessible. May and September are shoulder months with cool temperatures and good light. November-March is properly cold and dark; Tallinn's Christmas market (mid-November to early January) in the Old Town Square is among Europe's most atmospheric. Winter sea-ice swimming in the saunas of Pärnu is a real local thing.",
  },

  malta: {
    knownFor:
      "Malta is known for being a tiny island nation (316 km², half a million people), its Knights of St. John heritage, and the cinematic Game of Thrones / Gladiator filming locations. Less marketed: the prehistoric temples (older than Stonehenge or the Pyramids), the unique Maltese language (Semitic root with Italian/English overlay), and the fact you can drive across the country in 45 minutes.",
    topAttractions: [
      { name: "Valletta (UNESCO city)", city: "Valletta", type: "neighborhood", why: "16th-century Knights of St. John fortress city. Compact enough to walk in 30 minutes." },
      { name: "St. John's Co-Cathedral", city: "Valletta", type: "religious", why: "Baroque interior decorated by Mattia Preti. Two original Caravaggios in the oratory." },
      { name: "Mdina (the Silent City)", type: "neighborhood", why: "Walled medieval town in the island's interior. Limited car access; loud during day, genuinely silent at night." },
      { name: "Blue Lagoon (Comino)", type: "natural", why: "Turquoise swimming lagoon between Malta and Gozo. Day-trip by boat; arrive early or late to avoid crowds." },
      { name: "Hagar Qim + Mnajdra Temples", type: "landmark", why: "5,000-year-old megalithic temples. Older than Stonehenge. UNESCO." },
      { name: "Hypogeum of Hal Saflieni", type: "landmark", why: "Underground prehistoric burial complex. Visitors limited to 80/day; book 2-3 months ahead." },
      { name: "Gozo (Citadel + Azure Window site + Ramla Bay)", type: "natural", why: "Malta's quieter sister island. The Azure Window collapsed in 2017 but the cliff is still dramatic." },
      { name: "Marsaxlokk fishing village", type: "experience", why: "Sunday fish market with the brightly-painted luzzu boats in the harbor." },
    ],
    bestTimeToVisit:
      "April-June and September-October are Malta's best windows — warm sunshine, swimmable Mediterranean, no peak-summer heat. July-August hits 35°C+ and the beaches and Blue Lagoon fill with day-trippers. November-March is mild (15-18°C daytime) — too cool to swim but perfect for walking the temples and the Three Cities. Carnival in Valletta (February) is colorful and small. Easter brings dramatic processions.",
  },

  luxembourg: {
    knownFor:
      "Luxembourg is known for being small (the size of Rhode Island), wealthy (highest per-capita GDP in the EU), trilingual (French, German, Luxembourgish), and an EU institutional center. The travel draw: a UNESCO old town built on dramatic cliffs above two river valleys, with a network of casemates (defensive tunnels) you can walk inside.",
    topAttractions: [
      { name: "Luxembourg City Old Town (Ville Haute)", city: "Luxembourg City", type: "neighborhood", why: "UNESCO upper town on cliffs above the Alzette and Pétrusse valleys. Place d'Armes is the central square." },
      { name: "Bock Casemates", city: "Luxembourg City", type: "landmark", why: "17th-century underground defensive tunnels carved into the cliff. 17km total; 1.6km open to visitors." },
      { name: "Grund (lower town)", city: "Luxembourg City", type: "neighborhood", why: "Atmospheric lower town along the Alzette River. The panoramic elevator from upper to lower town is free." },
      { name: "Mudam (Museum of Modern Art)", city: "Luxembourg City", type: "museum", why: "I.M. Pei-designed modern art museum on the Kirchberg plateau. Combine with the European Court of Justice nearby." },
      { name: "Vianden Castle", type: "landmark", why: "11th-century castle in the Ardennes. 30 minutes north of the capital; Victor Hugo lived here in exile." },
      { name: "Mullerthal trail (Little Switzerland)", type: "natural", why: "112km hiking trail through dramatic sandstone formations. The Schiessentümpel waterfall is the postcard." },
      { name: "Moselle wine valley (Remich, Schengen, Wormeldange)", type: "natural", why: "Luxembourg's wine country along the German border. Schengen is where the EU border-free agreement was signed in 1985." },
      { name: "American Cemetery and Memorial", type: "experience", why: "Resting place of 5,000 American WWII soldiers including General Patton. East of the capital." },
    ],
    bestTimeToVisit:
      "May-September is Luxembourg's broadest window — long daylight, mild weather, the Mullerthal hiking accessible, the Moselle wine festivals. The country is workable year-round; January-February is cold (-1 to 4°C) but the Christmas markets at Place d'Armes (late November to December 24) are real. Schueberfouer (the country's biggest fair, late August to early September) takes over the city.",
  },

  slovakia: {
    knownFor:
      "Slovakia is known as the country travelers visit on a day trip from Vienna or Budapest and miss. The actual draws: the High Tatras (Slovakia's share of the Carpathian peaks), Bratislava's compact Old Town, the medieval cities of central and eastern Slovakia (Levoča, Bardejov, Banská Štiavnica), and dozens of well-preserved castles.",
    topAttractions: [
      { name: "Bratislava Old Town + Castle", city: "Bratislava", type: "neighborhood", why: "Compact Old Town walkable in 20 minutes. Bratislava Castle on the hill above; the strange Cumil ('the Watcher') sculpture peeking out of a manhole on Panská Street." },
      { name: "Spiš Castle", type: "landmark", why: "Largest castle complex in Central Europe (4 hectares). UNESCO. In eastern Slovakia near Levoča." },
      { name: "High Tatras (Štrbské Pleso, Tatranská Lomnica)", type: "natural", why: "The Carpathian Mountains' highest peaks. Hiking in summer, skiing in winter. Mountain lakes at Štrbské Pleso." },
      { name: "Banská Štiavnica", type: "landmark", why: "UNESCO mining town, once the third-largest in the Habsburg Empire. Cobblestone streets and renaissance houses." },
      { name: "Bojnice Castle", type: "landmark", why: "Romantic 12th-century castle with a fairy-tale silhouette. Day-trip from Bratislava." },
      { name: "Levoča (UNESCO town + St. James's altar)", type: "religious", why: "Walled medieval town. Master Pavol of Levoča's altarpiece (1517) is the tallest wooden Gothic altar in the world (18.6m)." },
      { name: "Slovak Paradise National Park (Slovenský Raj)", type: "natural", why: "Hiking through gorges with ladders and chains. The Suchá Belá gorge is the famous route." },
      { name: "Bardejov", type: "neighborhood", why: "UNESCO Renaissance town in eastern Slovakia. Largely undiscovered; the Town Hall Square is intact." },
    ],
    bestTimeToVisit:
      "May-September for hiking the Tatras, exploring eastern Slovakia, and Bratislava's outdoor terraces. June-August is Tatra peak season with the cable cars running. December-March is ski season in the High Tatras (Jasná, Tatranská Lomnica) and Christmas markets in Bratislava (late November to December 23). January-February is the deadest tourist month outside ski areas — Bratislava is workable but cold.",
  },
};

export function getCountryDetails(slug: string): CountryDetails | undefined {
  return COUNTRY_DETAILS[slug];
}

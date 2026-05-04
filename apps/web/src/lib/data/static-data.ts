// apps/web/src/lib/data/static-data.ts
//
// Single source of truth for the static blog. No DB, no Payload.
// Add countries/cities/neighborhoods here; they appear in routes immediately.

import { TIER2_NEIGHBORHOODS } from "./static-data-tier2-neighborhoods";
import { TIER3_NEIGHBORHOODS } from "./static-data-tier3-neighborhoods";
export { CITY_CULTURAL_NOTES, getCulturalNotes } from "./static-data-cultural";

export type StaticCountry = {
  slug: string;
  name: string;
  isoCode: string;
  currency: string;
  timezone: string;
  euMember: boolean;
  schengen: boolean;
  tier: "1" | "2" | "3";
  metaTitle: string;
  metaDescription: string;
  intro: string;
};

export type StaticCity = {
  slug: string;
  name: string;
  countrySlug: string;
  lat: number;
  lng: number;
  population: number | null;
  tier: "1" | "2" | "3";
  bookingDestId: number | null;
  intro: string;
};

export type StaticNeighborhood = {
  slug: string;
  name: string;
  citySlug: string;
  countrySlug: string;
  summary: string;
  whoItsFor: string;
  whoShouldSkip: string;
  priceTier: number;
  vibeTags: string[];
  tripTypeFit: string[];
};

export const COUNTRIES: StaticCountry[] = [
  {
    slug: "france",
    name: "France",
    isoCode: "FR",
    currency: "EUR",
    timezone: "Europe/Paris",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in France — Honest Neighborhood Guides",
    metaDescription: "Paris arrondissements, Riviera towns, Lyon and Bordeaux — picks by neighborhood and trip type, not by hotel-chain ad budget.",
    intro: "France rewards travelers who pick the right base before they pick the hotel. Paris alone has 20 arrondissements that feel like different cities; outside the capital, a Provence village stay reads completely different from a Riviera resort. The guides below sort that out by neighborhood first, then by who's traveling.",
  },
  {
    slug: "spain",
    name: "Spain",
    isoCode: "ES",
    currency: "EUR",
    timezone: "Europe/Madrid",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Spain — City and Neighborhood Picks",
    metaDescription: "Madrid, Barcelona, Seville, Valencia and the Costa del Sol — neighborhood-by-neighborhood guides that flag the tourist traps.",
    intro: "Spain is where most travelers overpay for a Las Ramblas hotel and miss what makes Barcelona great. The fix is choosing a neighborhood that matches the trip — Eixample for first-timers, Gràcia for a slower local rhythm, Born for nightlife. Same logic applies in Madrid, Seville and the rest.",
  },
  {
    slug: "italy",
    name: "Italy",
    isoCode: "IT",
    currency: "EUR",
    timezone: "Europe/Rome",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Italy — Honest Neighborhood Guides",
    metaDescription: "Rome, Florence, Venice, Milan, Naples — picks by neighborhood and trip type for travelers who don't want to stay near the train station.",
    intro: "Italy is the country where the difference between a great trip and a mediocre one is which side of the river you sleep on. Rome's Trastevere walks differently than Centro Storico. Venice past Cannaregio empties out after sunset. Florence north of the Arno is a different city than south. These guides explain which side to pick.",
  },
  {
    slug: "germany",
    name: "Germany",
    isoCode: "DE",
    currency: "EUR",
    timezone: "Europe/Berlin",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Germany — Berlin, Munich, Hamburg, Cologne",
    metaDescription: "Practical neighborhood guides to Germany's four most-stayed cities, sorted by trip type and budget.",
    intro: "German cities punish bad neighborhood choices more than most. Berlin's Mitte feels nothing like Kreuzberg or Prenzlauer Berg, and Munich's tourist-zone hotels charge a premium for the privilege of being far from anything fun. The guides below sort what's worth the price tag.",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    isoCode: "GB",
    currency: "GBP",
    timezone: "Europe/London",
    euMember: false,
    schengen: false,
    tier: "1",
    metaTitle: "Where to Stay in the UK — London, Edinburgh, Manchester",
    metaDescription: "London neighborhoods, Edinburgh's Old vs New Town, Manchester's Northern Quarter — guides that match neighborhood to trip type.",
    intro: "The UK's accommodation market is brutal at peak season — London hotels in Zone 1 routinely clear £400 a night for rooms that wouldn't fetch €120 in Lisbon. The right neighborhood (Bloomsbury over Leicester Square, Shoreditch over Oxford Street) saves you money and time on the Tube.",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    isoCode: "NL",
    currency: "EUR",
    timezone: "Europe/Amsterdam",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in the Netherlands — Amsterdam, Rotterdam, The Hague",
    metaDescription: "Amsterdam neighborhood guides plus Rotterdam and The Hague picks — by canal belt, by Jordaan, by trip type.",
    intro: "Amsterdam's hotel scene is small, expensive, and centered on a Centrum that most locals avoid. Picking Jordaan, De Pijp, or Oud-West instead gives you the city travelers actually come back for. Rotterdam and The Hague are easier — but easier doesn't mean obvious.",
  },
  {
    slug: "turkey",
    name: "Turkey",
    isoCode: "TR",
    currency: "TRY",
    timezone: "Europe/Istanbul",
    euMember: false,
    schengen: false,
    tier: "1",
    metaTitle: "Where to Stay in Turkey — Istanbul, Cappadocia, Antalya",
    metaDescription: "Honest, Türkiye-locale guides to Istanbul neighborhoods, Cappadocia cave hotels, and the Mediterranean coast.",
    intro: "Turkey is the European trip that breaks first-time travelers' hotel assumptions. Istanbul is split across two continents and the wrong side of the Bosphorus adds an hour to every plan. Cappadocia is about the right cave hotel in the right village, not the famous one. These guides keep you on the right side of those choices.",
  },
  {
    slug: "portugal",
    name: "Portugal",
    isoCode: "PT",
    currency: "EUR",
    timezone: "Europe/Lisbon",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Portugal — Lisbon and Porto",
    metaDescription: "Honest neighborhood picks for Lisbon and Porto: Alfama vs Bairro Alto, Ribeira vs Cedofeita.",
    intro: "Portugal is the cheapest of the Tier-1 European destinations and the price gap shows up most clearly in accommodation. The trick is picking a neighborhood that's lived-in rather than tourist-managed — Alfama and Príncipe Real in Lisbon, Cedofeita and Bonfim in Porto, instead of the postcard streets.",
  },
  {
    slug: "greece",
    name: "Greece",
    isoCode: "GR",
    currency: "EUR",
    timezone: "Europe/Athens",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Greece — Athens, Thessaloniki, Santorini",
    metaDescription: "Athens neighborhoods, Thessaloniki's old town, and which side of Santorini's caldera to actually book.",
    intro: "Greece divides cleanly between cities (Athens, Thessaloniki — pick a walkable central neighborhood and ignore the airport hotels) and islands (Santorini, Mykonos — caldera-side or village-side, the difference is €200/night). These guides cover both.",
  },
  {
    slug: "croatia",
    name: "Croatia",
    isoCode: "HR",
    currency: "EUR",
    timezone: "Europe/Zagreb",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Croatia — Zagreb, Split, Dubrovnik",
    metaDescription: "Old-town vs harbor stays in Croatia's three big draws, with honest takes on cruise-port crowding.",
    intro: "Croatia became expensive fast after EU and Schengen entry, and its three big-name cities each have one trap that catches first-timers — Dubrovnik's old town in summer is brutally crowded, Split's Diocletian's Palace gets the same treatment, and Zagreb's hotel district is dull. The right base flips the trip.",
  },
  {
    slug: "bosnia-and-herzegovina",
    name: "Bosnia and Herzegovina",
    isoCode: "BA",
    currency: "BAM",
    timezone: "Europe/Sarajevo",
    euMember: false,
    schengen: false,
    tier: "2",
    metaTitle: "Where to Stay in Bosnia and Herzegovina — Sarajevo and Mostar",
    metaDescription: "Practical guides to Sarajevo's Baščaršija and Mostar's old town, with honest notes on which guesthouses are actually quiet.",
    intro: "Bosnia is one of the best-value trips in Europe — Sarajevo and Mostar both deliver dense, walkable old towns at a fraction of Croatian prices. The catch is that the most Instagrammed guesthouses (looking at you, anywhere on Mostar's bridge) get loud. The picks below skew toward neighborhoods locals actually live in.",
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    isoCode: "CZ",
    currency: "CZK",
    timezone: "Europe/Prague",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Czech Republic — Prague and Brno",
    metaDescription: "Prague neighborhood picks (Vinohrady, Žižkov, Malá Strana) plus Brno for travelers who want fewer crowds.",
    intro: "Prague is the city where booking the wrong neighborhood costs you a lot of bachelor-party noise. Vinohrady and Žižkov give you the Prague that locals actually live in, at half the Old Town Square price. Brno is the lower-key alternative that's earning its own crowd of repeat visitors.",
  },
  {
    slug: "hungary",
    name: "Hungary",
    isoCode: "HU",
    currency: "HUF",
    timezone: "Europe/Budapest",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Hungary — Budapest Neighborhoods",
    metaDescription: "Pest vs Buda, District V vs District VII — honest picks for where to stay in Budapest by trip type.",
    intro: "Budapest is two cities — flat, walkable, party-loud Pest and quiet, hilly, residential Buda. Most travelers should be in Pest, specifically District V, VI or VII. Which of those three you pick depends entirely on whether you want to sleep through the ruin-bar weekends.",
  },
  {
    slug: "poland",
    name: "Poland",
    isoCode: "PL",
    currency: "PLN",
    timezone: "Europe/Warsaw",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Poland — Kraków, Warsaw, Gdańsk, Wrocław",
    metaDescription: "Honest neighborhood guides to Poland's four most-stayed cities, with notes on which are still cheap and which aren't.",
    intro: "Poland's four major cities each have a strong central core and a cheap-but-thin periphery. Kraków's Kazimierz, Warsaw's Śródmieście, Gdańsk's Old Town, Wrocław's Stare Miasto — that's where the trip is. The price gap between center and outskirts is smaller here than most of Europe, so paying up for location is usually right.",
  },
  {
    slug: "austria",
    name: "Austria",
    isoCode: "AT",
    currency: "EUR",
    timezone: "Europe/Vienna",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Austria — Vienna, Salzburg, Innsbruck",
    metaDescription: "Vienna's Inner Stadt vs Neubau, Salzburg old town vs the right bank, and honest Innsbruck ski-base picks.",
    intro: "Austria is a country where 'central' has a precise meaning — Vienna's Innere Stadt (District 1) is genuinely the center, but Districts 6 and 7 (Mariahilf, Neubau) are both walkable and dramatically cheaper. Salzburg and Innsbruck reward picking the right side of the river.",
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    isoCode: "CH",
    currency: "CHF",
    timezone: "Europe/Zurich",
    euMember: false,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Switzerland — Zurich, Geneva, Lucerne",
    metaDescription: "Switzerland is expensive everywhere — these guides pinpoint which neighborhoods actually justify the price.",
    intro: "Switzerland is the European country where every neighborhood is expensive, so the question becomes which one is worth the spend. Zurich's Niederdorf, Geneva's Eaux-Vives, Lucerne's old town — the picks below skew toward stays that justify Swiss prices through walkability and location, not amenities you won't use.",
  },
  {
    slug: "belgium",
    name: "Belgium",
    isoCode: "BE",
    currency: "EUR",
    timezone: "Europe/Brussels",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Belgium — Brussels, Bruges, Ghent, Antwerp",
    metaDescription: "Practical neighborhood guides to Belgium's four most-stayed cities — fewer tourist traps than the Grand Place.",
    intro: "Belgium rewards small-city stays more than big-city ones. Bruges and Ghent each have compact, walkable old towns where almost any central hotel works. Brussels needs more careful neighborhood selection — Saint-Gilles or Ixelles over the EU Quarter — and Antwerp's Het Eilandje is quietly the best new district in the country.",
  },
  {
    slug: "denmark",
    name: "Denmark",
    isoCode: "DK",
    currency: "DKK",
    timezone: "Europe/Copenhagen",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Denmark — Copenhagen and Aarhus",
    metaDescription: "Copenhagen's Vesterbro vs Nørrebro vs Indre By, plus the Aarhus picks worth the train ride.",
    intro: "Copenhagen is one of Europe's most expensive city stays and the neighborhood matters more than the hotel star rating. Vesterbro and Nørrebro are where the design-magazine version of Copenhagen actually exists. Aarhus is half the price for two-thirds of the experience.",
  },
  {
    slug: "sweden",
    name: "Sweden",
    isoCode: "SE",
    currency: "SEK",
    timezone: "Europe/Stockholm",
    euMember: true,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Sweden — Stockholm, Gothenburg, Malmö",
    metaDescription: "Stockholm by island, Gothenburg by district, plus the Malmö neighborhoods worth the bridge crossing.",
    intro: "Stockholm is a city of islands and the island you sleep on shapes the whole trip — Södermalm for evening life, Gamla Stan for first-time atmosphere, Norrmalm for transit access. Gothenburg and Malmö are both more compact and more forgiving.",
  },
  {
    slug: "norway",
    name: "Norway",
    isoCode: "NO",
    currency: "NOK",
    timezone: "Europe/Oslo",
    euMember: false,
    schengen: true,
    tier: "1",
    metaTitle: "Where to Stay in Norway — Oslo and Bergen",
    metaDescription: "Norway is expensive everywhere — these picks zero in on the central neighborhoods that earn the spend.",
    intro: "Norway is the European country where staying outside the central core actively damages the trip — Oslo and Bergen are both walkable enough that picking a peripheral 'value' hotel costs you more in transit than it saves. The picks below stay close in.",
  },
  {
    slug: "ireland",
    name: "Ireland",
    isoCode: "IE",
    currency: "EUR",
    timezone: "Europe/Dublin",
    euMember: true,
    schengen: false,
    tier: "1",
    metaTitle: "Where to Stay in Ireland — Dublin and Galway",
    metaDescription: "Dublin neighborhood guides plus Galway old-city picks — which side of the Liffey, and where to skip Temple Bar.",
    intro: "Ireland's hotel market is small and Dublin's is genuinely scarce, which means booking early matters more than picking a smart neighborhood — but neighborhood still matters. South of the Liffey for first-timers, Temple Bar only if you want to be woken up nightly. Galway is small enough that almost any old-city stay works.",
  },
  {
    slug: "iceland",
    name: "Iceland",
    isoCode: "IS",
    currency: "ISK",
    timezone: "Atlantic/Reykjavik",
    euMember: false,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Iceland — Reykjavík",
    metaDescription: "Reykjavík neighborhood picks for travelers using the city as a Ring Road or Golden Circle base.",
    intro: "Iceland trips usually use Reykjavík as the launch point for everything else, so the right city stay is one within walking distance of the bus stops and rental-car returns. The picks below center on 101 Reykjavík, the one neighborhood that earns the price tag.",
  },
  {
    slug: "finland",
    name: "Finland",
    isoCode: "FI",
    currency: "EUR",
    timezone: "Europe/Helsinki",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Finland — Helsinki",
    metaDescription: "Helsinki neighborhood picks — the central district that's worth it, and the cheaper one that's still walkable.",
    intro: "Helsinki is compact enough that almost any central stay works, but the price gap between Kruununhaka and Kallio is wider than most travelers expect. The picks below sort which is right for which trip.",
  },
  {
    slug: "slovenia",
    name: "Slovenia",
    isoCode: "SI",
    currency: "EUR",
    timezone: "Europe/Ljubljana",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Slovenia — Ljubljana, Bled, Piran",
    metaDescription: "Slovenia is small and the three stays that matter are Ljubljana, Bled and Piran. Honest picks for each.",
    intro: "Slovenia is the European country you can cross in three hours. Most trips are some combination of Ljubljana (the small, walkable capital), Bled (the lake-and-castle cliche that earns it), and Piran (the Adriatic former-Venetian town). The picks below sort which combination fits which trip.",
  },
  {
    slug: "romania",
    name: "Romania",
    isoCode: "RO",
    currency: "RON",
    timezone: "Europe/Bucharest",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Romania — Bucharest, Brașov, Cluj, Sibiu",
    metaDescription: "Romanian city stays from Bucharest's Old Town to Transylvania's Saxon-fortified Brașov, Cluj and Sibiu.",
    intro: "Romania rewards travelers who skip Bucharest-only itineraries and head north into Transylvania. Brașov and Sibiu are the Saxon-walled cities that look medieval-German more than Eastern European. Cluj is the young, university-town energy. Bucharest itself is rough and rewarding in roughly equal measure.",
  },
  {
    slug: "estonia",
    name: "Estonia",
    isoCode: "EE",
    currency: "EUR",
    timezone: "Europe/Tallinn",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Estonia — Tallinn and Tartu",
    metaDescription: "Tallinn's UNESCO Old Town and the underrated university city of Tartu — practical neighborhood picks.",
    intro: "Estonia is one of the cheapest Schengen-zone city stays in Europe. Tallinn's medieval Old Town is the obvious draw and is stunning despite being heavily tourist-managed in summer. Tartu (the university town two hours south) is the under-recommended second stop.",
  },
  {
    slug: "malta",
    name: "Malta",
    isoCode: "MT",
    currency: "EUR",
    timezone: "Europe/Malta",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Malta — Valletta and Sliema",
    metaDescription: "Valletta's UNESCO peninsula vs Sliema's resort strip — practical picks for first-time Malta travelers.",
    intro: "Malta is small enough to base anywhere and bus everywhere, but where you sleep changes the trip. Valletta is atmospheric and historical; Sliema and St. Julian's across the bay are resort-coded with better restaurants. Stay in Valletta if you want history; Sliema if you want hotels with pools.",
  },
  {
    slug: "luxembourg",
    name: "Luxembourg",
    isoCode: "LU",
    currency: "EUR",
    timezone: "Europe/Luxembourg",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Luxembourg City",
    metaDescription: "Luxembourg City's Ville Haute (upper town) vs Grund (lower town) — neighborhood picks for the small but stunning capital.",
    intro: "Luxembourg City is small (115k people) and dramatically beautiful — a UNESCO old town built on cliffs above two river valleys. One night is short; three nights covers it well. The choice is Ville Haute (upper town, polished, central) or Grund (lower town, atmospheric, requires the lift or a steep walk).",
  },
  {
    slug: "slovakia",
    name: "Slovakia",
    isoCode: "SK",
    currency: "EUR",
    timezone: "Europe/Bratislava",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Slovakia — Bratislava and Košice",
    metaDescription: "Bratislava's compact old town and the underrated eastern city of Košice — honest picks.",
    intro: "Slovakia is most often a day trip from Vienna (Bratislava is an hour by train) but the country deserves more than that. Bratislava's old town is small and walkable; Košice in the east is genuinely beautiful and almost free of tourists. Both city stays are among Europe's cheapest.",
  },
  {
    slug: "lithuania",
    name: "Lithuania",
    isoCode: "LT",
    currency: "EUR",
    timezone: "Europe/Vilnius",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Lithuania — Vilnius and the Baltic",
    metaDescription: "Vilnius's UNESCO old town and the underrated Baltic capital scene — honest picks for stays.",
    intro: "Lithuania's capital Vilnius has Europe's largest baroque old town. Most travelers combine it with Riga and Tallinn for a Baltic loop. Stays are among Europe's cheapest and the city is dramatically photogenic — narrow lanes, churches at every corner.",
  },
  {
    slug: "latvia",
    name: "Latvia",
    isoCode: "LV",
    currency: "EUR",
    timezone: "Europe/Riga",
    euMember: true,
    schengen: true,
    tier: "2",
    metaTitle: "Where to Stay in Latvia — Riga and the Baltic",
    metaDescription: "Riga's Art Nouveau quarter and UNESCO old town — honest picks for the Baltic capital.",
    intro: "Latvia's capital Riga has Europe's densest concentration of Art Nouveau architecture, plus a UNESCO medieval old town. Stays are dramatically cheap. The country combines well with Lithuania and Estonia for a Baltic loop.",
  },
  {
    slug: "bulgaria",
    name: "Bulgaria",
    isoCode: "BG",
    currency: "BGN",
    timezone: "Europe/Sofia",
    euMember: true,
    schengen: false,
    tier: "2",
    metaTitle: "Where to Stay in Bulgaria — Sofia and Plovdiv",
    metaDescription: "Sofia's Eastern Orthodox heritage and Plovdiv's Roman ruins — honest picks for Bulgaria stays.",
    intro: "Bulgaria's two main cities are dramatically different. Sofia is the modern capital with Eastern Orthodox cathedrals; Plovdiv is one of Europe's oldest continuously-inhabited cities (Roman amphitheater, Old Town). Stays are among Europe's cheapest.",
  },
  {
    slug: "montenegro",
    name: "Montenegro",
    isoCode: "ME",
    currency: "EUR",
    timezone: "Europe/Podgorica",
    euMember: false,
    schengen: false,
    tier: "2",
    metaTitle: "Where to Stay in Montenegro — Kotor, Budva, Perast",
    metaDescription: "Montenegro's UNESCO Bay of Kotor and the dramatic Adriatic coast — honest picks for stays.",
    intro: "Montenegro is small but dramatic — UNESCO Bay of Kotor, walled medieval towns, beaches, mountains an hour inland. Most travelers combine it with Croatia (Dubrovnik is 2h drive away). Stays are dramatically cheap by Adriatic standards.",
  },
  {
    slug: "cyprus",
    name: "Cyprus",
    isoCode: "CY",
    currency: "EUR",
    timezone: "Asia/Nicosia",
    euMember: true,
    schengen: false,
    tier: "2",
    metaTitle: "Where to Stay in Cyprus — Limassol, Paphos, Larnaca",
    metaDescription: "Cyprus's beach towns and historic Paphos — honest picks for Mediterranean stays.",
    intro: "Cyprus runs a year-round Mediterranean season. Limassol is the modern beach city; Paphos is the historic UNESCO town with Roman mosaics; Larnaca is the budget arrival point with the airport. Stays are 30-40% cheaper than Greek islands at peak.",
  },
  {
    slug: "albania",
    name: "Albania",
    isoCode: "AL",
    currency: "ALL",
    timezone: "Europe/Tirane",
    euMember: false,
    schengen: false,
    tier: "2",
    metaTitle: "Where to Stay in Albania — Tirana, Berat, Saranda",
    metaDescription: "Albania's emerging tourism scene — Tirana, Berat's Ottoman houses, the Riviera. Honest picks.",
    intro: "Albania is Europe's last under-touristed country. Tirana is the rapidly-changing capital; Berat and Gjirokastër are UNESCO Ottoman towns; the Albanian Riviera (Sarandë, Dhërmi, Himarë) has Greek-island-quality beaches at half the price. Stays are dramatically cheap.",
  },
];

export const CITIES: StaticCity[] = [
  // ========== France ==========
  { slug: "paris",     name: "Paris",     countrySlug: "france",   lat: 48.8566, lng:  2.3522, population: 2_100_000, tier: "1", bookingDestId: -1456928, intro: "Paris hotels divide cleanly by arrondissement, and the right one depends entirely on whether you want a first-timer's view of the Seine (1st, 4th, 6th), a slower local rhythm (11th, 10th, 18th), or a Right Bank business stay (8th, 16th). Skip anything advertised as 'near Gare du Nord' unless you have a 6am train." },
  { slug: "nice",        name: "Nice",        countrySlug: "france",   lat: 43.7102, lng:  7.2620, population:   340_000, tier: "2", bookingDestId: -1449447, intro: "Nice is the Riviera city where the choice is Vieux Nice (atmospheric, loud, walkable to the beach) or the Carré d'Or near the Promenade (quieter, more expensive, still walkable). Both beat the western beach resorts most travelers default to." },
  { slug: "lyon",        name: "Lyon",        countrySlug: "france",   lat: 45.7640, lng:  4.8357, population:   520_000, tier: "2", bookingDestId: -1447688, intro: "Lyon's Vieux Lyon (UNESCO old town) is where the food trip happens, but Presqu'île across the river puts you closer to the train station and the dinner spots locals actually use. Confluence is the new district that's still cheap." },
  { slug: "marseille",   name: "Marseille",   countrySlug: "france",   lat: 43.2965, lng:  5.3698, population:   870_000, tier: "2", bookingDestId: -1449077, intro: "Marseille is the city where neighborhood selection has the highest stakes in France. Le Panier and the Vieux Port are the right-stays. Avoid anything marketed as 'near the train station' that doesn't say which side." },
  { slug: "bordeaux",    name: "Bordeaux",    countrySlug: "france",   lat: 44.8378, lng: -0.5792, population:   260_000, tier: "2", bookingDestId: -1418435, intro: "Bordeaux is small enough that almost any central stay works, but Saint-Pierre and Chartrons both deliver the wine-trip atmosphere most travelers come for. The right bank is up-and-coming and a third cheaper." },

  // ========== Spain ==========
  { slug: "madrid",      name: "Madrid",      countrySlug: "spain",    lat: 40.4168, lng: -3.7038, population: 3_300_000, tier: "1", bookingDestId:  -390625, intro: "Madrid's neighborhood split is Sol/Centro (touristy, central, loud) vs Malasaña/Chueca (lived-in, hip, slightly removed) vs Salamanca (upscale, quieter, far from nightlife). Most first-timers want Malasaña or Las Letras." },
  { slug: "barcelona",   name: "Barcelona",   countrySlug: "spain",    lat: 41.3874, lng:  2.1686, population: 1_620_000, tier: "1", bookingDestId:  -372490, intro: "Barcelona's Las Ramblas hotels are a tourist trap. Eixample (especially Esquerra de l'Eixample) is the right central pick — wide streets, Modernisme buildings, real restaurants. El Born is where the design-trip travelers stay. Gràcia is the slow local choice." },
  { slug: "valencia",    name: "Valencia",    countrySlug: "spain",    lat: 39.4699, lng: -0.3763, population:   790_000, tier: "2", bookingDestId:  -406893, intro: "Valencia's Ciutat Vella (old city) and Ruzafa (the hipster district just south) are the two stays worth considering. The City of Arts and Sciences is photogenic but a long walk from anything good to eat." },
  { slug: "seville",     name: "Seville",     countrySlug: "spain",    lat: 37.3891, lng: -5.9845, population:   680_000, tier: "2", bookingDestId:  -402849, intro: "Seville's Santa Cruz is the postcard neighborhood and gets crowded accordingly. Alfalfa and the area around Alameda de Hércules give you a more local stay that's still walkable to the cathedral." },
  { slug: "malaga",      name: "Málaga",      countrySlug: "spain",    lat: 36.7213, lng: -4.4213, population:   580_000, tier: "2", bookingDestId:  -390874, intro: "Málaga's old town (Centro Histórico) is genuinely good and the Soho district just south of it is where the city's recent food scene happens. Skip anything marketed as 'near the airport' or 'beach resort' if you want the city, not Costa del Sol." },

  // ========== Italy ==========
  { slug: "rome",        name: "Rome",        countrySlug: "italy",    lat: 41.9028, lng: 12.4964, population: 2_870_000, tier: "1", bookingDestId:  -126693, intro: "Rome's Centro Storico is the maximum-tourist stay and rewards the price tag for first-timers. Trastevere (across the river) is the second-time choice — same walking distance to most sights, dramatically better evenings. Monti is the underrated middle option." },
  { slug: "florence",    name: "Florence",    countrySlug: "italy",    lat: 43.7696, lng: 11.2558, population:   380_000, tier: "1", bookingDestId:  -117543, intro: "Florence is small enough that almost everything central works. Santa Croce and the area around Santo Spirito (Oltrarno) split between 'classic' and 'lived-in'. The neighborhoods near Santa Maria Novella station are cheap for a reason." },
  { slug: "venice",      name: "Venice",      countrySlug: "italy",    lat: 45.4408, lng: 12.3155, population:   260_000, tier: "1", bookingDestId:  -132007, intro: "Venice empties dramatically after the day-trippers leave, so where you sleep determines whether you experience the real city. Cannaregio is the local choice. Dorsoduro is the academic/quiet stay. Avoid Mestre unless you are deliberately doing a budget trip." },
  { slug: "milan",       name: "Milan",       countrySlug: "italy",    lat: 45.4642, lng:  9.1900, population: 1_350_000, tier: "1", bookingDestId:  -121726, intro: "Milan's neighborhoods read very differently. Brera is for the design/shopping trip. Navigli for nightlife and dinner. Porta Nuova for business stays. Stay near Centrale only if you have a very early train." },
  { slug: "naples",      name: "Naples",      countrySlug: "italy",    lat: 40.8518, lng: 14.2681, population:   960_000, tier: "2", bookingDestId:  -122902, intro: "Naples rewards a deliberate central choice — Centro Storico for the chaotic version, Chiaia for a calmer waterfront stay. Avoid hotels far from the metro; Naples' walkability drops fast outside the historic core." },

  // ========== Germany ==========
  { slug: "berlin",      name: "Berlin",      countrySlug: "germany",  lat: 52.5200, lng: 13.4050, population: 3_700_000, tier: "1", bookingDestId: -1746443, intro: "Berlin's neighborhoods are functionally separate cities. Mitte is where first-timers stay (central, polished). Kreuzberg and Neukölln for nightlife/food. Prenzlauer Berg for a slower, family-friendly stay. Pick before booking — switching mid-trip wastes a day." },
  { slug: "munich",      name: "Munich",      countrySlug: "germany",  lat: 48.1351, lng: 11.5820, population: 1_490_000, tier: "1", bookingDestId: -1829149, intro: "Munich's Altstadt (old town) is compact enough that anywhere inside the ring works. Glockenbachviertel is the better-evening choice. During Oktoberfest, anything within walking distance of Theresienwiese triples in price — book six months out." },
  { slug: "hamburg",     name: "Hamburg",     countrySlug: "germany",  lat: 53.5511, lng:  9.9937, population: 1_900_000, tier: "2", bookingDestId: -1785434, intro: "Hamburg splits between St. Pauli/Reeperbahn (loud, central, party district), Sternschanze (hip, calmer, walkable to the action) and HafenCity (modern, glossy, less character). Sternschanze is the under-recommended right answer for most trips." },
  { slug: "cologne",     name: "Cologne",     countrySlug: "germany",  lat: 50.9375, lng:  6.9603, population: 1_100_000, tier: "2", bookingDestId: -1759694, intro: "Cologne's Altstadt is touristy and overpriced. The Belgian Quarter (Belgisches Viertel) is the right local stay — same train access, much better evenings, half the cathedral-noise problem." },

  // ========== UK ==========
  { slug: "london",      name: "London",      countrySlug: "united-kingdom", lat: 51.5074, lng: -0.1278, population: 9_000_000, tier: "1", bookingDestId: -2601889, intro: "London is the city where the wrong neighborhood costs you an extra hour of Tube time per day. Bloomsbury and Fitzrovia are the underrated central picks. Shoreditch and Hackney for evenings. Avoid 'near Paddington' deals unless you are going to Heathrow at 5am." },
  { slug: "edinburgh",   name: "Edinburgh",   countrySlug: "united-kingdom", lat: 55.9533, lng: -3.1883, population:   520_000, tier: "2", bookingDestId: -2595386, intro: "Edinburgh splits between Old Town (atmospheric, hilly, hilly, hilly) and New Town (Georgian, flat, walkable). Pick New Town unless you specifically want the Royal Mile feel; the cardio savings alone justify it." },
  { slug: "manchester",  name: "Manchester",  countrySlug: "united-kingdom", lat: 53.4808, lng: -2.2426, population:   550_000, tier: "2", bookingDestId: -2602510, intro: "Manchester's Northern Quarter is the right central stay. Spinningfields for business. Avoid hotels by Piccadilly Station unless you have a very early train — the area is loud and undistinguished." },

  // ========== Netherlands ==========
  { slug: "amsterdam",   name: "Amsterdam",   countrySlug: "netherlands", lat: 52.3676, lng:  4.9041, population: 920_000, tier: "1", bookingDestId: -2140479, intro: "Amsterdam's Centrum is touristy, expensive, and partially run as a stag-do destination. The Jordaan and De Pijp are the right answers for almost every trip. Oud-West is the cheaper alternative that still feels like Amsterdam." },
  { slug: "rotterdam",   name: "Rotterdam",   countrySlug: "netherlands", lat: 51.9244, lng:  4.4777, population: 660_000, tier: "2", bookingDestId: -2154642, intro: "Rotterdam is the architecture trip and the neighborhoods feel modern accordingly — Cool district (central, walkable to the Markthal) or Kop van Zuid (across the river, the new architecture corridor)." },
  { slug: "the-hague",   name: "The Hague",   countrySlug: "netherlands", lat: 52.0705, lng:  4.3007, population: 550_000, tier: "2", bookingDestId: -2143696, intro: "The Hague is the diplomatic-stay city. Centrum for the business/conference trip. Scheveningen for the beach version. Both are well-connected to Amsterdam by train if you want to combine." },

  // ========== Turkey ==========
  { slug: "istanbul",    name: "Istanbul",    countrySlug: "turkey",   lat: 41.0082, lng: 28.9784, population: 15_600_000, tier: "1", bookingDestId:  -755070, intro: "Istanbul's neighborhood choice changes the trip more than anywhere else in Europe. Sultanahmet is the maximum-history first-time stay. Beyoğlu (Galata, Karaköy, Cihangir) is the second-time, food-and-evening choice. Kadıköy across the Bosphorus is the local-life version. Pick deliberately." },
  { slug: "cappadocia",  name: "Cappadocia",  countrySlug: "turkey",   lat: 38.6431, lng: 34.8289, population:     80_000, tier: "2", bookingDestId:  -747468, intro: "Cappadocia is about which village your cave hotel is in. Göreme is central, photographable, busy. Uçhisar is quieter and has the best balloon views. Ürgüp is the elegant-stay choice. The famous hotels in Göreme aren't always the right answer." },
  { slug: "antalya",     name: "Antalya",     countrySlug: "turkey",   lat: 36.8969, lng: 30.7133, population:  1_330_000, tier: "2", bookingDestId:  -745231, intro: "Antalya's Kaleiçi (old town) is the only sensible central stay. The big resort strip 30+ minutes east of the city is a different trip — don't accidentally book it expecting walkable Antalya." },
  { slug: "izmir",       name: "İzmir",       countrySlug: "turkey",   lat: 38.4192, lng: 27.1287, population:  3_020_000, tier: "2", bookingDestId:  -752955, intro: "İzmir is most travelers' base for Ephesus and the Aegean coast. Alsancak is the central, walkable, evening-out neighborhood. Konak is closer to the historical core. Both work; the rest of the city is sprawl." },

  // ========== Portugal ==========
  { slug: "lisbon",      name: "Lisbon",      countrySlug: "portugal", lat: 38.7223, lng: -9.1393, population:   545_000, tier: "1", bookingDestId: -2167973, intro: "Lisbon's neighborhoods read like a stack — Baixa/Chiado (flat, central, touristy), Alfama (steep, atmospheric, the postcard), Bairro Alto (loud nights), Príncipe Real (calmer, design-shop heavy). Most first-timers want Chiado or Príncipe Real." },
  { slug: "porto",       name: "Porto",       countrySlug: "portugal", lat: 41.1579, lng: -8.6291, population:   215_000, tier: "1", bookingDestId: -2174884, intro: "Porto is small enough that the wrong choice is hard, but the right one matters. Baixa and Cedofeita are the central, walkable stays. Ribeira looks beautiful in photos and is brutal at street level — steep, crowded, far from late dinner. Don't book on the river." },

  // ========== Greece ==========
  { slug: "athens",      name: "Athens",      countrySlug: "greece",   lat: 37.9838, lng: 23.7275, population:   664_000, tier: "1", bookingDestId:  -814876, intro: "Athens divides between Plaka/Monastiraki (Acropolis-adjacent, touristy, the right stay for first-timers) and Koukaki (one neighborhood south of the Acropolis, quieter, walkable, locals' favorite). Skip Omonia after dark." },
  { slug: "thessaloniki",name: "Thessaloniki",countrySlug: "greece",   lat: 40.6401, lng: 22.9444, population:   325_000, tier: "2", bookingDestId:  -823352, intro: "Thessaloniki's Ladadika district (former olive-oil warehouses, now restaurants and bars) is the central evening stay. Ano Poli (Upper Town) is the atmospheric, hilly version. Both within easy walk of the waterfront." },
  { slug: "santorini",   name: "Santorini",   countrySlug: "greece",   lat: 36.3932, lng: 25.4615, population:    15_000, tier: "1", bookingDestId: -3402032, intro: "Santorini's caldera-side villages (Oia, Imerovigli, Fira) cost 3-5x the inland ones (Pyrgos, Megalochori) — the price is the view. Pyrgos is where you stay if the photo isn't the point. Oia in summer is a permanent traffic jam." },

  // ========== Croatia ==========
  { slug: "zagreb",      name: "Zagreb",      countrySlug: "croatia",  lat: 45.8150, lng: 15.9819, population:   770_000, tier: "1", bookingDestId:   -97179, intro: "Zagreb's Donji Grad (Lower Town) is the walkable central stay. Gornji Grad (Upper Town) is more atmospheric but cobbled and steep. The neighborhoods around the train station are dull but cheap." },
  { slug: "split",       name: "Split",       countrySlug: "croatia",  lat: 43.5081, lng: 16.4402, population:   178_000, tier: "1", bookingDestId:   -94908, intro: "Split's accommodation inside Diocletian's Palace is theatrical but loud. Veli Varoš and Manuš (just outside the walls) give you the same morning walk to coffee with quiet nights. Avoid anything advertised as 'cruise port adjacent.'" },
  { slug: "dubrovnik",   name: "Dubrovnik",   countrySlug: "croatia",  lat: 42.6507, lng: 18.0944, population:    41_000, tier: "1", bookingDestId:   -90930, intro: "Dubrovnik's Old Town in summer is a queue of cruise passengers and the apartments inside are wildly overpriced. Pile, Lapad and Ploče all give you 10-15 min walks in with significantly more space and lower prices." },

  // ========== Bosnia ==========
  { slug: "sarajevo",    name: "Sarajevo",    countrySlug: "bosnia-and-herzegovina", lat: 43.8563, lng: 18.4131, population: 275_000, tier: "1", bookingDestId: -91450, intro: "Sarajevo's Baščaršija (old Ottoman bazaar) is the central, atmospheric stay. Marijin Dvor and Centar are walkable to it and quieter at night. The hilltop hotels with views are a pain without a car." },
  { slug: "mostar",      name: "Mostar",      countrySlug: "bosnia-and-herzegovina", lat: 43.3438, lng: 17.8078, population: 113_000, tier: "2", bookingDestId: -90989, intro: "Mostar is small enough that almost any old-town stay works, but the guesthouses literally on Stari Most are loud all summer. One street back is the move." },

  // ========== Czech Republic ==========
  { slug: "prague",      name: "Prague",      countrySlug: "czech-republic", lat: 50.0755, lng: 14.4378, population: 1_320_000, tier: "1", bookingDestId: -553173, intro: "Prague's Old Town (Staré Město) is where everyone stays the first time. Vinohrady is the right second choice — leafy, residential, walkable to everything within 15 min. Žižkov for the indie-bar version. Skip Karlín if you want pretty streets." },
  { slug: "brno",        name: "Brno",        countrySlug: "czech-republic", lat: 49.1951, lng: 16.6068, population:   379_000, tier: "2", bookingDestId: -552933, intro: "Brno is small enough that any central stay works. Stay within the inner ring (around Náměstí Svobody) and you can walk everywhere worth walking to." },

  // ========== Hungary ==========
  { slug: "budapest",    name: "Budapest",    countrySlug: "hungary",  lat: 47.4979, lng: 19.0402, population: 1_750_000, tier: "1", bookingDestId:  -850553, intro: "Budapest's District V (Belváros) is the central, polished stay. District VI (Terézváros, includes the Jewish Quarter) is where dinner happens. District VII has the ruin bars and the hangover. Buda is for honeymoons and quiet trips." },

  // ========== Poland ==========
  { slug: "krakow",      name: "Kraków",      countrySlug: "poland",   lat: 50.0647, lng: 19.9450, population:   779_000, tier: "1", bookingDestId:  -522619, intro: "Kraków's Old Town (Stare Miasto) is the central historical stay. Kazimierz (the former Jewish Quarter, now the city's food and bar district) is the second-time-traveler choice. Both are walkable to each other in 15 min." },
  { slug: "warsaw",      name: "Warsaw",      countrySlug: "poland",   lat: 52.2297, lng: 21.0122, population: 1_790_000, tier: "1", bookingDestId:  -528429, intro: "Warsaw's Śródmieście Północne (north central, near Old Town) is the first-time stay. Powiśle and Praga (across the river) are the lived-in alternatives that locals will tell you are more interesting." },
  { slug: "gdansk",      name: "Gdańsk",      countrySlug: "poland",   lat: 54.3520, lng: 18.6466, population:   470_000, tier: "2", bookingDestId:  -513678, intro: "Gdańsk's Główne Miasto (Main Town) is compact, photogenic, and the obvious central stay. Wrzeszcz is where you go if you want a quieter trip with easy tram access in." },
  { slug: "wroclaw",     name: "Wrocław",     countrySlug: "poland",   lat: 51.1079, lng: 17.0385, population:   640_000, tier: "2", bookingDestId:  -528658, intro: "Wrocław is one of Europe's most-underrated weekend cities. Stare Miasto (Old Town) for the central stay — the city is small enough that almost any hotel inside it puts you in the middle of dinner." },

  // ========== Austria ==========
  { slug: "vienna",      name: "Vienna",      countrySlug: "austria",  lat: 48.2082, lng: 16.3738, population: 1_950_000, tier: "1", bookingDestId: -1995499, intro: "Vienna's District 1 (Innere Stadt) is the maximum-history central stay. Districts 6 and 7 (Mariahilf and Neubau) are the cheaper, more lived-in choices that are still walkable to everything. Don't book in District 2-22 unless you have a specific reason." },
  { slug: "salzburg",    name: "Salzburg",    countrySlug: "austria",  lat: 47.8095, lng: 13.0550, population:   155_000, tier: "1", bookingDestId: -1991765, intro: "Salzburg's Altstadt (left bank) is where the postcards are taken. Neustadt (right bank) is where most travelers actually want to sleep — same 5-min walk in, much quieter." },
  { slug: "innsbruck",   name: "Innsbruck",   countrySlug: "austria",  lat: 47.2692, lng: 11.4041, population:   132_000, tier: "2", bookingDestId: -1989166, intro: "Innsbruck's Altstadt is small enough that any central stay works. The choice is really between city stays (Altstadt or Wilten) and the higher-altitude ski-village hotels above town." },

  // ========== Switzerland ==========
  { slug: "zurich",      name: "Zurich",      countrySlug: "switzerland", lat: 47.3769, lng:  8.5417, population: 415_000, tier: "1", bookingDestId: -2554866, intro: "Zurich's Niederdorf (right bank) is the central historical stay. Kreis 4 and 5 (former industrial, now bars and design hotels) are the under-the-radar alternative. Both walkable to the lake." },
  { slug: "geneva",      name: "Geneva",      countrySlug: "switzerland", lat: 46.2044, lng:  6.1432, population: 200_000, tier: "1", bookingDestId: -2548602, intro: "Geneva's Eaux-Vives (left bank, near the lake) and Pâquis (right bank, near the train station) are the two stays. Pâquis is rougher around the edges and cheaper. Eaux-Vives is the polished version." },
  { slug: "lucerne",     name: "Lucerne",     countrySlug: "switzerland", lat: 47.0502, lng:  8.3093, population:  82_000, tier: "2", bookingDestId: -2549770, intro: "Lucerne is small enough that almost any central stay works. The Old Town (Altstadt) on the right bank of the Reuss is the postcard choice. Cross the bridge for a quieter sleep." },

  // ========== Belgium ==========
  { slug: "brussels",    name: "Brussels",    countrySlug: "belgium",  lat: 50.8503, lng:  4.3517, population: 1_220_000, tier: "1", bookingDestId: -1955860, intro: "Brussels' Grand Place area is touristy and the EU Quarter is dead at night. Sablon, Saint-Gilles and Ixelles (especially around Place du Châtelain) are where the better evenings are." },
  { slug: "bruges",      name: "Bruges",      countrySlug: "belgium",  lat: 51.2093, lng:  3.2247, population:   118_000, tier: "1", bookingDestId: -1955684, intro: "Bruges is small enough that any stay inside the canal ring works. The day-tripper crowds vanish after 6pm, so being central is a gift in the evenings rather than a curse." },
  { slug: "ghent",       name: "Ghent",       countrySlug: "belgium",  lat: 51.0543, lng:  3.7174, population:   263_000, tier: "2", bookingDestId: -1956611, intro: "Ghent's Patershol and Korenmarkt areas are the central, walkable stays. The city is a 30-minute train from Brussels and a much better base for a Flanders trip." },
  { slug: "antwerp",     name: "Antwerp",     countrySlug: "belgium",  lat: 51.2194, lng:  4.4025, population:   530_000, tier: "2", bookingDestId: -1955536, intro: "Antwerp's Het Eilandje (the redeveloped harbor district) is quietly the best new neighborhood in Belgium. Otherwise the Old Town (around Grote Markt) is the obvious central choice." },

  // ========== Denmark ==========
  { slug: "copenhagen",  name: "Copenhagen",  countrySlug: "denmark",  lat: 55.6761, lng: 12.5683, population:   660_000, tier: "1", bookingDestId: -2745636, intro: "Copenhagen's Indre By (Inner City) is the central tourist stay. Vesterbro and Nørrebro are where the design-magazine version of the city lives. Christianshavn for the canal-houseboat trip." },
  { slug: "aarhus",      name: "Aarhus",      countrySlug: "denmark",  lat: 56.1629, lng: 10.2039, population:   285_000, tier: "2", bookingDestId: -2745476, intro: "Aarhus is small enough that a central stay anywhere within walking distance of the river works. Latin Quarter is the most atmospheric choice; the area near the harbor (Aarhus Ø) is the new architecture corridor." },

  // ========== Sweden ==========
  { slug: "stockholm",   name: "Stockholm",   countrySlug: "sweden",   lat: 59.3293, lng: 18.0686, population:   980_000, tier: "1", bookingDestId: -2710422, intro: "Stockholm is a city of islands. Gamla Stan for the postcard stay (cobblestoned, tourist-managed). Norrmalm for transit access. Södermalm is where the best evenings happen — pick this one if you can." },
  { slug: "gothenburg",  name: "Gothenburg",  countrySlug: "sweden",   lat: 57.7089, lng: 11.9746, population:   583_000, tier: "2", bookingDestId: -2697453, intro: "Gothenburg's Vasastaden and Linnéstaden are the central, walkable, evening-out neighborhoods. Inom Vallgraven (the historical center) is the postcard stay." },
  { slug: "malmo",       name: "Malmö",       countrySlug: "sweden",   lat: 55.6050, lng: 13.0038, population:   350_000, tier: "2", bookingDestId: -2705349, intro: "Malmö is the Copenhagen-day-trip city. Gamla Staden is the central, walkable stay. Västra Hamnen is the new architecture corridor with sea views." },

  // ========== Norway ==========
  { slug: "oslo",        name: "Oslo",        countrySlug: "norway",   lat: 59.9139, lng: 10.7522, population:   700_000, tier: "1", bookingDestId: -3232853, intro: "Oslo's Sentrum (central) is the obvious stay; the city is compact enough that almost anywhere within Ring 1 works. Grünerløkka is the Brooklyn-equivalent district with the better food." },
  { slug: "bergen",      name: "Bergen",      countrySlug: "norway",   lat: 60.3913, lng:  5.3221, population:   290_000, tier: "2", bookingDestId: -3217090, intro: "Bergen's Bryggen (the UNESCO wharf) area is the central historical stay. The city is small enough that you can comfortably stay anywhere within 10 min walk of the fish market." },

  // ========== Ireland ==========
  { slug: "dublin",      name: "Dublin",      countrySlug: "ireland",  lat: 53.3498, lng: -6.2603, population:   590_000, tier: "1", bookingDestId: -1567851, intro: "Dublin's South Side (Trinity, Merrion Square, Grafton Street) is the polished central stay. Temple Bar is loud every night. Stoneybatter and the Liberties are the lived-in alternatives." },
  { slug: "galway",      name: "Galway",      countrySlug: "ireland",  lat: 53.2707, lng: -9.0568, population:    85_000, tier: "2", bookingDestId: -1567869, intro: "Galway is small. Latin Quarter is the central pub-walk stay; Salthill (along the bay) is the quieter, more residential alternative." },

  // ========== Iceland ==========
  { slug: "reykjavik",   name: "Reykjavík",   countrySlug: "iceland",  lat: 64.1466, lng: -21.9426, population:  140_000, tier: "1", bookingDestId: -2641913, intro: "Reykjavík's 101 (downtown) is the only central stay that makes sense. Anything outside it costs you taxis to dinner and to the bus station for tours. Don't be tempted by the slightly cheaper hotels in 105 or 107." },

  // ========== Finland ==========
  { slug: "helsinki",    name: "Helsinki",    countrySlug: "finland",  lat: 60.1699, lng: 24.9384, population:   660_000, tier: "1", bookingDestId: -1376301, intro: "Helsinki's Kruununhaka and Kluuvi are the central, polished stays. Kallio is the cheaper, hipper, slightly removed alternative — still on the metro, dramatically cheaper for dinner." },

  // ========== Slovenia ==========
  { slug: "ljubljana",   name: "Ljubljana",   countrySlug: "slovenia", lat: 46.0569, lng: 14.5058, population: 295_000, tier: "1", bookingDestId: -98277,  intro: "Ljubljana is small enough that any old-town stay works. The car-free historic center along the Ljubljanica river is the obvious choice; the city is among Europe's most walkable capital cores." },
  { slug: "bled",        name: "Bled",        countrySlug: "slovenia", lat: 46.3683, lng: 14.1146, population:   8_000, tier: "1", bookingDestId: -97934,  intro: "Bled is one lake, one castle, one island church. Stay on the lake itself for the postcard view; in the village for the price." },
  { slug: "piran",       name: "Piran",       countrySlug: "slovenia", lat: 45.5283, lng: 13.5683, population:   4_000, tier: "2", bookingDestId: -98086,  intro: "Piran is a former Venetian fishing town on a peninsula in the Adriatic — small, atmospheric, mostly car-free. Almost any stay inside the old town works." },

  // ========== Romania ==========
  { slug: "bucharest",   name: "Bucharest",   countrySlug: "romania",  lat: 44.4268, lng: 26.1025, population: 1_830_000, tier: "1", bookingDestId: -1153951, intro: "Bucharest divides between Lipscani (the Old Town, walkable, lively, somewhat seedy) and the wider city which sprawls. Stay in or just adjacent to the Old Town; venturing far makes everything an Uber ride." },
  { slug: "brasov",      name: "Brașov",      countrySlug: "romania",  lat: 45.6427, lng: 25.5887, population:  290_000, tier: "1", bookingDestId: -1153758, intro: "Brașov's Saxon old town is one of Transylvania's most photogenic — pastel buildings, a black church, mountains looming overhead. Stay inside Piața Sfatului for maximum atmosphere." },
  { slug: "cluj-napoca", name: "Cluj-Napoca", countrySlug: "romania",  lat: 46.7712, lng: 23.6236, population:  325_000, tier: "2", bookingDestId: -1153776, intro: "Cluj is Transylvania's young university city — restaurant-dense, café-rich, the most modern energy in the country. Stay near Piața Unirii." },
  { slug: "sibiu",       name: "Sibiu",       countrySlug: "romania",  lat: 45.7983, lng: 24.1256, population:  150_000, tier: "2", bookingDestId: -1153935, intro: "Sibiu's Saxon old town has the famous 'eyes of Sibiu' rooftop windows. Compact, walkable, and genuinely beautiful — almost any old-town stay works." },

  // ========== Estonia ==========
  { slug: "tallinn",     name: "Tallinn",     countrySlug: "estonia",  lat: 59.4370, lng: 24.7536, population:  450_000, tier: "1", bookingDestId: -2738503, intro: "Tallinn's Old Town (Vanalinn) is UNESCO-listed and overwhelmingly the right central stay. Telliskivi (former industrial, now creative quarter) is the cooler second-time choice." },
  { slug: "tartu",       name: "Tartu",       countrySlug: "estonia",  lat: 58.3776, lng: 26.7290, population:   95_000, tier: "2", bookingDestId: -2737988, intro: "Tartu is Estonia's university town — small, cheap, café-dense. Stay near Town Hall Square (Raekoja plats); the city is small enough to walk anywhere." },

  // ========== Malta ==========
  { slug: "valletta",    name: "Valletta",    countrySlug: "malta",    lat: 35.8989, lng: 14.5146, population:    6_000, tier: "1", bookingDestId: -1216898, intro: "Valletta is a UNESCO peninsula city — golden limestone, fortifications, dramatic harbor views. The whole city is walkable in 30 minutes; almost any central stay works." },
  { slug: "sliema",      name: "Sliema",      countrySlug: "malta",    lat: 35.9122, lng: 14.5022, population:   23_000, tier: "2", bookingDestId: -1216872, intro: "Sliema is the modern resort strip across the harbor from Valletta — bigger hotels with pools, restaurant chains, ferry across to Valletta in 5 minutes." },

  // ========== Luxembourg ==========
  { slug: "luxembourg-city", name: "Luxembourg City", countrySlug: "luxembourg", lat: 49.6116, lng: 6.1319, population: 130_000, tier: "1", bookingDestId: -1801422, intro: "Luxembourg City is dramatically built on cliffs above two river valleys. Ville Haute (upper town) is the polished central stay; Grund (lower town) is atmospheric but requires the panoramic elevator or a steep walk." },

  // ========== Slovakia ==========
  { slug: "bratislava",  name: "Bratislava",  countrySlug: "slovakia", lat: 48.1486, lng: 17.1077, population:  475_000, tier: "1", bookingDestId: -2871661, intro: "Bratislava's Old Town (Staré Mesto) is small enough to walk in 20 minutes. Stay inside it; venture beyond and the city becomes communist-era apartment blocks." },
  { slug: "kosice",      name: "Košice",      countrySlug: "slovakia", lat: 48.7164, lng: 21.2611, population:  240_000, tier: "2", bookingDestId: -2871794, intro: "Košice in eastern Slovakia is the country's most underrated city — a long pedestrian boulevard (Hlavná) lined with cafes, the Cathedral of St. Elisabeth, almost no tourists. Stay on or just off Hlavná." },

  // ========== EXPANSION BATCH (tier-3) ==========
  // France
  { slug: "strasbourg", name: "Strasbourg", countrySlug: "france", lat: 48.5734, lng: 7.7521, population: 285_000, tier: "2", bookingDestId: null, intro: "Strasbourg's Grande Île is the UNESCO core — the cathedral, half-timbered houses of Petite France, the Ill river loop. A small enough city that any stay inside the island works. The Krutenau quarter just east is the food-and-bar local choice." },
  { slug: "toulouse", name: "Toulouse", countrySlug: "france", lat: 43.6047, lng: 1.4442, population: 480_000, tier: "2", bookingDestId: null, intro: "Toulouse — the pink city — divides between Capitole/Carmes (central, walkable, restaurant-dense) and Saint-Cyprien across the Garonne (lively, cheaper, where younger Toulousains actually go). Both walk to Place du Capitole in 5-15 min." },
  { slug: "aix-en-provence", name: "Aix-en-Provence", countrySlug: "france", lat: 43.5297, lng: 5.4474, population: 145_000, tier: "2", bookingDestId: null, intro: "Aix's Vieil Aix (old town) is the only sensible central stay — fountains, café terraces, the Cours Mirabeau. The whole town is walkable in 20 min. Skip the western edge near the TGV station." },

  // Spain
  { slug: "bilbao", name: "Bilbao", countrySlug: "spain", lat: 43.2627, lng: -2.9253, population: 345_000, tier: "2", bookingDestId: null, intro: "Bilbao's Casco Viejo (old town) is the pintxos-and-cobblestone stay; Ensanche on the river is the polished-Guggenheim-side base. Most travelers want one or the other — pick on whether you want medieval food crawl or modern museum proximity." },
  { slug: "granada", name: "Granada", countrySlug: "spain", lat: 37.1773, lng: -3.5986, population: 230_000, tier: "2", bookingDestId: null, intro: "Granada's Albaicín (the Moorish hill quarter) and Realejo (the former Jewish quarter just below the Alhambra) are the right stays. Both walk to the Alhambra in 15-25 min. Avoid hotels far from the centre — the city is hilly and taxis are slow." },
  { slug: "san-sebastian", name: "San Sebastián", countrySlug: "spain", lat: 43.3183, lng: -1.9812, population: 187_000, tier: "2", bookingDestId: null, intro: "San Sebastián's Parte Vieja (old town) is the pintxos-bar capital and the obvious central stay. Gros across the river is the surfer-and-locals quarter with quieter sleep and cheaper rooms." },

  // Italy
  { slug: "bologna", name: "Bologna", countrySlug: "italy", lat: 44.4949, lng: 11.3426, population: 390_000, tier: "2", bookingDestId: null, intro: "Bologna's Centro Storico — the porticoed historic centre — is the only stay worth considering for a 2-3 night trip. The university quarter just east is where the food and wine bars are. Avoid hotels near the train station unless you have a Florence-or-Venice early connection." },
  { slug: "verona", name: "Verona", countrySlug: "italy", lat: 45.4384, lng: 10.9916, population: 260_000, tier: "2", bookingDestId: null, intro: "Verona's Città Antica (within the Adige river loop) is the only sensible stay. Compact, walkable, every sight is 5-10 min from any address. The opera season (June-September) doubles prices." },
  { slug: "genoa", name: "Genoa", countrySlug: "italy", lat: 44.4056, lng: 8.9463, population: 580_000, tier: "2", bookingDestId: null, intro: "Genoa's Centro Storico is the densest medieval port-quarter in Europe — atmospheric, gritty, food-rich. Pick hotels south of Piazza De Ferrari for safety and walkability. The Porto Antico (waterfront) is the polished alternative." },

  // UK
  { slug: "bath", name: "Bath", countrySlug: "united-kingdom", lat: 51.3811, lng: -2.3590, population: 95_000, tier: "2", bookingDestId: null, intro: "Bath is small enough that any central stay works. Anywhere within 10 min walk of the Roman Baths puts you in the Georgian core — that's the entire point of the trip. Skip outer Bathwick unless you have a car." },
  { slug: "york", name: "York", countrySlug: "united-kingdom", lat: 53.9590, lng: -1.0815, population: 153_000, tier: "2", bookingDestId: null, intro: "York's Within the Walls — the medieval core encircled by the city walls — is the central stay. Hotels along The Shambles or near York Minster put you 5 min from everything. The wider city outside the walls is suburban and not worth booking." },

  // Germany
  { slug: "dresden", name: "Dresden", countrySlug: "germany", lat: 51.0504, lng: 13.7373, population: 555_000, tier: "2", bookingDestId: null, intro: "Dresden's Altstadt (left bank) is the rebuilt-baroque postcard — Frauenkirche, Zwinger, the opera. Neustadt across the Elbe is the alternative-and-bar quarter where younger Dresdeners actually drink. Pick on what kind of evening you want." },
  { slug: "heidelberg", name: "Heidelberg", countrySlug: "germany", lat: 49.3988, lng: 8.6724, population: 159_000, tier: "2", bookingDestId: null, intro: "Heidelberg's Altstadt is essentially one long pedestrian street between the Hauptstraße and the Neckar river. Stay anywhere along it. The neighborhoods west of the train station are sterile new builds — skip those." },
  { slug: "frankfurt", name: "Frankfurt", countrySlug: "germany", lat: 50.1109, lng: 8.6821, population: 760_000, tier: "2", bookingDestId: null, intro: "Frankfurt's Altstadt/Innenstadt is the central business stay — the rebuilt Römerberg, the museums on the Main. Sachsenhausen across the river is the apple-wine-and-restaurant evening quarter. For airport-only stays, skip both and book at the airport." },

  // Netherlands
  { slug: "utrecht", name: "Utrecht", countrySlug: "netherlands", lat: 52.0907, lng: 5.1214, population: 360_000, tier: "2", bookingDestId: null, intro: "Utrecht's Binnenstad (city centre, organized around the canal-with-wharves Oudegracht) is the only sensible stay. The whole centre is walkable in 20 min. Skip the area around the train station for sleeping — book it for transport access only if needed." },

  // ========== EXPANSION BATCH 17 (more tier-3 cities) ==========
  // Spain
  { slug: "cordoba", name: "Córdoba", countrySlug: "spain", lat: 37.8882, lng: -4.7794, population: 325_000, tier: "2", bookingDestId: null, intro: "Córdoba's Judería (Jewish Quarter) around the Mezquita is the only sensible stay. The whole historic core is walkable in 15 min. Avoid summer (July-August daytime highs over 40°C); spring is the trip." },

  // Italy
  { slug: "pisa", name: "Pisa", countrySlug: "italy", lat: 43.7228, lng: 10.4017, population: 90_000, tier: "2", bookingDestId: null, intro: "Pisa is small enough that the area around the Leaning Tower (Piazza dei Miracoli) is the only sensible stay for sights focus. Most travelers day-trip from Florence; an overnight is worth it for the dawn at the tower without crowds." },
  { slug: "turin", name: "Turin", countrySlug: "italy", lat: 45.0703, lng: 7.6869, population: 870_000, tier: "2", bookingDestId: null, intro: "Turin's Centro Storico around Via Roma and Piazza San Carlo is the polished central stay. Quadrilatero Romano just north is where the aperitivo crowds actually go. Skip neighborhoods outside the historic core." },

  // France
  { slug: "avignon", name: "Avignon", countrySlug: "france", lat: 43.9493, lng: 4.8055, population: 95_000, tier: "2", bookingDestId: null, intro: "Avignon is small enough that any stay inside the city walls works. The Palais des Papes area gives you the Avignon Festival venues; the southern half of the walled city is calmer. Skip anywhere outside the walls for sleeping." },

  // ========== EXPANSION BATCH 18 (Mediterranean islands + Sicily) ==========
  // Spain
  { slug: "palma-de-mallorca", name: "Palma de Mallorca", countrySlug: "spain", lat: 39.5696, lng: 2.6502, population: 415_000, tier: "2", bookingDestId: null, intro: "Palma's Centre Antic (old town) around the cathedral is the only sensible stay. Santa Catalina just west is the food-and-bar quarter. Skip the package-resort strips along the southern coast — they're a different trip entirely." },
  { slug: "salamanca", name: "Salamanca", countrySlug: "spain", lat: 40.9701, lng: -5.6635, population: 145_000, tier: "2", bookingDestId: null, intro: "Salamanca's Casco Histórico — Plaza Mayor, the cathedrals, the university — is the only sensible stay. The whole walkable centre fits in 1.5 km. Skip anywhere outside the historic core." },

  // Italy
  { slug: "catania", name: "Catania", countrySlug: "italy", lat: 37.5079, lng: 15.0830, population: 310_000, tier: "2", bookingDestId: null, intro: "Catania's central quarter around Via Etnea and Piazza Duomo is the only sensible Sicilian-east-coast stay. Mount Etna day-trips and Taormina are 1h drives. Skip the suburban beach strips for the city trip." },

  // Greece
  { slug: "chania", name: "Chania", countrySlug: "greece", lat: 35.5138, lng: 24.0180, population: 55_000, tier: "2", bookingDestId: null, intro: "Chania's Venetian harbor is the obvious central stay — narrow lanes, the lighthouse, dense restaurants. Splanzia just east is the lived-in Cretan quarter. Skip the resort strips along the western coast for the city trip." },
  { slug: "heraklion", name: "Heraklion", countrySlug: "greece", lat: 35.3387, lng: 25.1442, population: 175_000, tier: "2", bookingDestId: null, intro: "Heraklion's old town within the Venetian walls is the central stay — Knossos 20 min away, dense restaurants. Most travelers prefer Chania for atmosphere; Heraklion works for Knossos focus and ferry connections." },

  // Portugal
  { slug: "funchal", name: "Funchal", countrySlug: "portugal", lat: 32.6669, lng: -16.9241, population: 105_000, tier: "2", bookingDestId: null, intro: "Funchal (Madeira) is a year-round Atlantic-island city. The Old Town (Zona Velha) and Sé area are the central stays. Skip the big resort hotels along the Estrada Monumental unless your trip is pool-and-package." },

  // ========== EXPANSION BATCH 19 (Baltics + Bulgaria) ==========
  // Lithuania
  { slug: "vilnius", name: "Vilnius", countrySlug: "lithuania", lat: 54.6872, lng: 25.2797, population: 590_000, tier: "1", bookingDestId: null, intro: "Vilnius's Senamiestis (Old Town) is Europe's largest baroque historic centre — and surprisingly under-touristed. Užupis, the bohemian republic-within-a-republic, is across the river. Both walkable to each other in 10 min." },

  // Latvia
  { slug: "riga", name: "Riga", countrySlug: "latvia", lat: 56.9496, lng: 24.1052, population: 605_000, tier: "1", bookingDestId: null, intro: "Riga's Vecrīga (Old Town) is the medieval UNESCO core. The Centrs district just east has Europe's densest Art Nouveau architecture. Most travelers stay in Vecrīga; Centrs is the second-time choice." },

  // Bulgaria
  { slug: "sofia", name: "Sofia", countrySlug: "bulgaria", lat: 42.6977, lng: 23.3219, population: 1_250_000, tier: "2", bookingDestId: null, intro: "Sofia's centre around the Alexander Nevsky Cathedral is the obvious central stay. Vitosha Boulevard is the pedestrian shopping spine. Skip anywhere outside the central core for short trips." },
  { slug: "plovdiv", name: "Plovdiv", countrySlug: "bulgaria", lat: 42.1354, lng: 24.7453, population: 345_000, tier: "2", bookingDestId: null, intro: "Plovdiv's Old Town (Stariya Grad) is one of Europe's oldest continuously-inhabited urban areas — Roman amphitheater, Bulgarian Revival houses. Kapana (the Trap), the artist quarter just below, is the food-and-evening side." },

  // ========== EXPANSION BATCH 20 (Montenegro + Cyprus + Albania) ==========
  // Montenegro
  { slug: "kotor", name: "Kotor", countrySlug: "montenegro", lat: 42.4247, lng: 18.7712, population: 23_000, tier: "2", bookingDestId: null, intro: "Kotor's Stari Grad (Old Town) within the medieval walls is the only sensible stay. The bay is the trip — UNESCO setting, mountains rising directly from the water. Avoid late-July through August (cruise-ship overflow)." },
  { slug: "budva", name: "Budva", countrySlug: "montenegro", lat: 42.2911, lng: 18.8403, population: 18_000, tier: "2", bookingDestId: null, intro: "Budva is Montenegro's beach-resort capital — the Stari Grad is small but real, the beach strips are a 1990s package-resort throwback. Stay in the Old Town for atmosphere, on the beach for pool-and-package." },

  // Cyprus
  { slug: "limassol", name: "Limassol", countrySlug: "cyprus", lat: 34.6786, lng: 33.0413, population: 240_000, tier: "2", bookingDestId: null, intro: "Limassol is Cyprus's modern beach-and-business city. The Old Town is small; the marina and seafront promenade are the centre. Stay near the Old Town for atmosphere, the marina for polished modern, eastern-coast resort strips for pool-and-package." },
  { slug: "paphos", name: "Paphos", countrySlug: "cyprus", lat: 34.7720, lng: 32.4297, population: 35_000, tier: "2", bookingDestId: null, intro: "Paphos's Kato Paphos (lower town near the harbor) has the UNESCO Roman mosaics. The Old Town up the hill is more residential. Most travelers stay in Kato Paphos for the mosaics and harbor restaurants." },

  // Albania
  { slug: "tirana", name: "Tirana", countrySlug: "albania", lat: 41.3275, lng: 19.8187, population: 420_000, tier: "2", bookingDestId: null, intro: "Tirana is rapidly-changing — the Blloku district was the Communist-era closed elite zone, now the city's restaurant-and-bar quarter. Skanderbeg Square and the central area are the obvious base. Skip anywhere outside the central core." },

  // ========== EXPANSION BATCH 21 (Adriatic + Greek islands) ==========
  // Croatia
  { slug: "hvar", name: "Hvar", countrySlug: "croatia", lat: 43.1729, lng: 16.4413, population: 11_000, tier: "2", bookingDestId: null, intro: "Hvar Town's Old Town is the centre — Venetian-era square, harbor, dense restaurants. Stari Grad on the north coast is the calmer alternative. Pakleni Islands a short boat ride away are the real swim trip." },
  { slug: "korcula", name: "Korčula", countrySlug: "croatia", lat: 42.9613, lng: 17.1349, population: 5_500, tier: "2", bookingDestId: null, intro: "Korčula's Old Town on the peninsula is the only sensible stay — narrow medieval lanes, Marco Polo birthplace claim, walkable to swimming. Less touristed than Hvar, more atmospheric than Brač." },

  // Greece
  { slug: "rhodes", name: "Rhodes", countrySlug: "greece", lat: 36.4341, lng: 28.2176, population: 50_000, tier: "2", bookingDestId: null, intro: "Rhodes Old Town is one of Europe's largest medieval inhabited cities — UNESCO walls, knight-era architecture. Lindos on the south coast is the calmer beach village. Stay in the Old Town for atmosphere, Lindos for the postcard." },
  { slug: "corfu", name: "Corfu", countrySlug: "greece", lat: 39.6243, lng: 19.9217, population: 32_000, tier: "2", bookingDestId: null, intro: "Corfu Town's Old Fortress and Liston arcade are the central stay — Venetian-influenced, more Italian-feeling than other Greek islands. The west coast (Paleokastritsa) is the beach trip; the north (Sidari) the resort version." },

  // ========== EXPANSION BATCH 22 (more Greek + day-trip cities) ==========
  // Greece
  { slug: "naxos", name: "Naxos", countrySlug: "greece", lat: 37.1036, lng: 25.3766, population: 18_000, tier: "2", bookingDestId: null, intro: "Naxos is the Cyclades' food island. Naxos Town (Chora) is the central stay — Venetian castle, Portara temple gate, dense restaurants. The mountain villages (Apeiranthos, Filoti) are the calmer alternative for repeat visitors." },
  { slug: "paros", name: "Paros", countrySlug: "greece", lat: 37.0853, lng: 25.1485, population: 14_000, tier: "2", bookingDestId: null, intro: "Paros has two main towns — Parikia is the central port (busy), Naoussa is the boutique fishing-harbor village. Most travelers prefer Naoussa for the photo and atmosphere; Parikia for ferry connections." },
  { slug: "mykonos", name: "Mykonos", countrySlug: "greece", lat: 37.4467, lng: 25.3289, population: 10_000, tier: "2", bookingDestId: null, intro: "Mykonos Town (Chora) is the famous whitewashed-and-bougainvillea quarter. Platis Gialos and Ornos are the calmer south-coast beaches. Skip Mykonos in summer if budget matters — €25 cocktails are normal." },

  // Spain
  { slug: "toledo", name: "Toledo", countrySlug: "spain", lat: 39.8628, lng: -4.0273, population: 85_000, tier: "2", bookingDestId: null, intro: "Toledo's Casco Histórico inside the medieval walls is the only sensible stay. Most travelers day-trip from Madrid (33 min by AVE); an overnight is worth it for sunset and dawn without crowds." },

  // France
  { slug: "annecy", name: "Annecy", countrySlug: "france", lat: 45.8992, lng: 6.1294, population: 130_000, tier: "2", bookingDestId: null, intro: "Annecy's Vieille Ville (old town) along the canals is the obvious central stay. The lake-front promenade is the trip. Skip suburban hotels — the canals are the atmosphere." },

  // ========== EXPANSION BATCH 23 (Italian South + French North) ==========
  // Italy
  { slug: "bari", name: "Bari", countrySlug: "italy", lat: 41.1171, lng: 16.8719, population: 320_000, tier: "2", bookingDestId: null, intro: "Bari's Bari Vecchia (Old Town) is the only sensible stay — UNESCO-tentative tangle of narrow lanes, the Basilica di San Nicola, dense seafood restaurants. Murat (the 19th-century grid west) is the modern alternative for shopping and chains." },
  { slug: "lecce", name: "Lecce", countrySlug: "italy", lat: 40.3515, lng: 18.1750, population: 95_000, tier: "2", bookingDestId: null, intro: "Lecce — the 'Florence of the South' — has Italy's densest baroque architecture. The Centro Storico inside the city walls is the only sensible stay. Day-trips to Otranto, Gallipoli, and Alberobello (trulli) are essential." },

  // France
  { slug: "lille", name: "Lille", countrySlug: "france", lat: 50.6292, lng: 3.0573, population: 235_000, tier: "2", bookingDestId: null, intro: "Lille's Vieux Lille (old town) is the central Flemish-influenced quarter — gabled houses, dense restaurants. The new Centre is the train-station-and-shopping side. Stay in Vieux Lille for atmosphere, Centre for transit." },

  // Germany
  { slug: "nuremberg", name: "Nuremberg", countrySlug: "germany", lat: 49.4521, lng: 11.0767, population: 520_000, tier: "2", bookingDestId: null, intro: "Nuremberg's Altstadt inside the medieval walls is the obvious central stay — the imperial castle, the cathedrals, dense restaurants. Christmas market season (late November to 23 December) is the trip; off-season Nuremberg is calmer but still rewards." },
];

export const NEIGHBORHOODS: StaticNeighborhood[] = [
  // ========== Paris ==========
  { slug: "le-marais", name: "Le Marais", citySlug: "paris", countrySlug: "france",
    summary: "The 3rd and 4th arrondissements — central, walkable, packed with restaurants and design shops. The default 'Paris feels like Paris' stay.",
    whoItsFor: "First-timers who want to walk everywhere. Couples on a long weekend. Anyone who values being five minutes from the Picasso Museum and Place des Vosges.",
    whoShouldSkip: "Light sleepers — the bar streets are busy until 2am most nights. Travelers on a tight budget — Marais hotels are 20-30% above neighboring arrondissements.",
    priceTier: 3, vibeTags: ["historic", "lively", "walkable", "design", "lgbtq-friendly"],
    tripTypeFit: ["couples", "first-timers", "luxury", "solo"] },
  { slug: "saint-germain-des-pres", name: "Saint-Germain-des-Prés", citySlug: "paris", countrySlug: "france",
    summary: "The 6th arrondissement — Left Bank, literary cafes, art galleries, expensive. The classic Paris of films.",
    whoItsFor: "Travelers willing to pay for the postcard. Walkers who want the Louvre and Musée d'Orsay both inside 20 minutes. Anyone over 50 doing a romantic trip.",
    whoShouldSkip: "Budget travelers — this is among the most expensive central districts. Anyone wanting a lived-in, modern Paris vibe.",
    priceTier: 4, vibeTags: ["literary", "elegant", "central", "walkable"],
    tripTypeFit: ["couples", "luxury", "first-timers"] },
  { slug: "latin-quarter", name: "Latin Quarter", citySlug: "paris", countrySlug: "france",
    summary: "The 5th arrondissement — Sorbonne, Panthéon, narrow medieval streets. Tourist-heavy but real.",
    whoItsFor: "First-timers who want history at every corner. Solo travelers — lots of cafés to sit alone in. Anyone with a Notre-Dame priority.",
    whoShouldSkip: "Travelers who want quiet — Rue Mouffetard and the side streets stay loud. Light sleepers.",
    priceTier: 3, vibeTags: ["historic", "tourist", "walkable", "academic"],
    tripTypeFit: ["first-timers", "solo", "couples"] },
  { slug: "montmartre", name: "Montmartre", citySlug: "paris", countrySlug: "france",
    summary: "The 18th arrondissement — Sacré-Cœur, hilly cobblestones, the postcard view of Paris from up top. A village inside the city.",
    whoItsFor: "Travelers who don't mind hills and want a distinct neighborhood feel. Photographers. Anyone with a Sacré-Cœur on their must-list.",
    whoShouldSkip: "Anyone with a heavy suitcase — the funicular only solves part of the climb. Travelers with mobility issues. Anyone wanting central-Paris walking distances to other neighborhoods.",
    priceTier: 2, vibeTags: ["bohemian", "hilly", "iconic", "tourist"],
    tripTypeFit: ["first-timers", "couples", "solo"] },
  { slug: "bastille", name: "Bastille", citySlug: "paris", countrySlug: "france",
    summary: "The 11th arrondissement — younger, livelier, where Parisians actually go out. Less polished than Marais, more honest.",
    whoItsFor: "Second-time visitors who want a more local stay. Solo travelers with an evening agenda. Couples who want dinner-spot density.",
    whoShouldSkip: "First-timers who want every monument inside 10 minutes — most major sights are 20+ min away. Light sleepers in summer.",
    priceTier: 2, vibeTags: ["lively", "local", "nightlife", "food"],
    tripTypeFit: ["solo", "couples", "digital-nomads"] },

  // ========== Rome ==========
  { slug: "centro-storico", name: "Centro Storico", citySlug: "rome", countrySlug: "italy",
    summary: "The historic center — Pantheon, Piazza Navona, Campo de' Fiori. Walking distance to almost everything that brought you to Rome.",
    whoItsFor: "First-timers — there's no better stay if you have 3-4 days and a long sights list. Couples on a romantic short trip.",
    whoShouldSkip: "Travelers wanting authentic local life — the area is overwhelmingly tourist-managed. Anyone trying to spend less than €200/night centrally.",
    priceTier: 4, vibeTags: ["historic", "central", "tourist", "walkable"],
    tripTypeFit: ["first-timers", "couples", "luxury"] },
  { slug: "trastevere", name: "Trastevere", citySlug: "rome", countrySlug: "italy",
    summary: "Across the Tiber — cobbled, atmospheric, restaurant-dense, the second-time-Rome neighborhood of choice.",
    whoItsFor: "Second-time visitors. Anyone whose Rome trip is built around dinner. Couples who want the romance without the Spanish Steps crowd.",
    whoShouldSkip: "Light sleepers — the bar scene runs late on weekends. Anyone with metro-only mobility (Trastevere has no metro stop).",
    priceTier: 3, vibeTags: ["bohemian", "lively", "food", "atmospheric"],
    tripTypeFit: ["couples", "solo", "digital-nomads"] },
  { slug: "monti", name: "Monti", citySlug: "rome", countrySlug: "italy",
    summary: "The under-recommended right answer — between the Colosseum and Termini, hilly, design-shop heavy, walkable to Centro Storico.",
    whoItsFor: "Travelers who want central-but-not-tourist-trap. Anyone with a Colosseum priority. Solo travelers — easy to be alone here without feeling alone.",
    whoShouldSkip: "Travelers who want flat walking — Monti is genuinely hilly. Anyone who needs zero nightlife noise on weekends.",
    priceTier: 3, vibeTags: ["hip", "central", "design", "walkable"],
    tripTypeFit: ["solo", "couples", "first-timers"] },
  { slug: "prati", name: "Prati", citySlug: "rome", countrySlug: "italy",
    summary: "Just north of the Vatican — wide streets, mid-range restaurants, quieter evenings, easier value for the price.",
    whoItsFor: "Families — the apartments here are bigger and cheaper. Anyone with the Vatican as the priority sight. Travelers who want quieter nights.",
    whoShouldSkip: "Anyone whose trip is built around evenings out — Prati closes early. Travelers wanting picturesque cobblestones.",
    priceTier: 2, vibeTags: ["residential", "quieter", "value", "vatican-adjacent"],
    tripTypeFit: ["families", "first-timers", "business"] },

  // ========== Barcelona ==========
  { slug: "eixample", name: "Eixample", citySlug: "barcelona", countrySlug: "spain",
    summary: "The grid district — wide streets, Modernisme buildings (Casa Batlló, La Pedrera), excellent restaurants, the right central stay for most trips.",
    whoItsFor: "First-timers — central but not tourist-ghetto. Couples on a 4-day trip. Anyone who wants the Sagrada Família walkable.",
    whoShouldSkip: "Travelers who want narrow medieval streets — Eixample is grid-pattern modern. Anyone seeking a beach stay.",
    priceTier: 3, vibeTags: ["central", "modernisme", "walkable", "shopping"],
    tripTypeFit: ["first-timers", "couples", "business", "luxury"] },
  { slug: "barri-gotic", name: "Barri Gòtic", citySlug: "barcelona", countrySlug: "spain",
    summary: "The Gothic Quarter — narrow medieval streets, the cathedral, intense tourism, the postcard Barcelona.",
    whoItsFor: "First-timers who specifically want the medieval-streets experience. Photographers. Travelers on short stays who prioritize sights over evenings.",
    whoShouldSkip: "Light sleepers — the streets are loud until late. Anyone with a wheeled suitcase that hates cobblestones. Pickpocket-shy travelers.",
    priceTier: 3, vibeTags: ["historic", "medieval", "tourist", "walkable"],
    tripTypeFit: ["first-timers", "couples", "solo"] },
  { slug: "el-born", name: "El Born", citySlug: "barcelona", countrySlug: "spain",
    summary: "Just east of the Gothic Quarter — narrower streets, cooler bars, the Picasso Museum, the design-trip choice.",
    whoItsFor: "Second-time visitors. Couples who want dinner-spot density without the cathedral crowd. Anyone who wants both Gothic atmosphere and modern food.",
    whoShouldSkip: "Light sleepers in summer. Travelers who want supermarket access — Born is restaurant-only.",
    priceTier: 3, vibeTags: ["hip", "medieval", "food", "nightlife"],
    tripTypeFit: ["couples", "solo", "digital-nomads"] },
  { slug: "gracia", name: "Gràcia", citySlug: "barcelona", countrySlug: "spain",
    summary: "Above Eixample — village-feel within the city, family-run restaurants, the right second-time, slow-Barcelona stay.",
    whoItsFor: "Repeat visitors. Anyone wanting a less-touristed stay that's still walkable. Solo travelers who want neighborhood familiarity.",
    whoShouldSkip: "First-timers with a 3-day trip — too far from the cathedral for short stays. Anyone needing beach proximity.",
    priceTier: 2, vibeTags: ["local", "village", "residential", "food"],
    tripTypeFit: ["solo", "couples", "digital-nomads", "families"] },
  { slug: "barceloneta", name: "Barceloneta", citySlug: "barcelona", countrySlug: "spain",
    summary: "The beach neighborhood — narrow grid of fishermen's apartments turned tourist rentals. Walkable to the sea, less so to the cathedral.",
    whoItsFor: "Travelers whose trip is mostly beach. Summer visitors who don't want air-conditioning bills inland. Anyone with a swimmer's priority.",
    whoShouldSkip: "Anyone allergic to crowds — Barceloneta in July is shoulder-to-shoulder. Light sleepers.",
    priceTier: 2, vibeTags: ["beach", "tourist", "summer", "lively"],
    tripTypeFit: ["families", "couples", "first-timers"] },

  // ========== Amsterdam ==========
  { slug: "jordaan", name: "Jordaan", citySlug: "amsterdam", countrySlug: "netherlands",
    summary: "Canal-belt charm without the Centrum chaos — narrow streets, brown cafés, the Anne Frank House. The default Amsterdam right answer.",
    whoItsFor: "First-timers who don't want stag-do central. Couples. Anyone who wants the canal photos without the queueing.",
    whoShouldSkip: "Budget travelers — Jordaan is among Amsterdam's most expensive. Anyone wanting nightlife density.",
    priceTier: 4, vibeTags: ["canals", "charming", "central", "residential"],
    tripTypeFit: ["couples", "first-timers", "luxury", "families"] },
  { slug: "de-pijp", name: "De Pijp", citySlug: "amsterdam", countrySlug: "netherlands",
    summary: "Just south of the canal belt — Albert Cuyp Market, the cheapest dinner spots in the city, a young energy without tourist saturation.",
    whoItsFor: "Second-time visitors. Solo travelers. Anyone whose trip is built around food and drinks rather than museums.",
    whoShouldSkip: "Travelers wanting walking distance to the Rijksmuseum — De Pijp is 15-20 min in. Anyone needing peaceful nights.",
    priceTier: 3, vibeTags: ["food", "lively", "diverse", "young"],
    tripTypeFit: ["solo", "digital-nomads", "couples"] },
  { slug: "centrum", name: "Centrum", citySlug: "amsterdam", countrySlug: "netherlands",
    summary: "The historical center including the Red Light District — touristy, loud, often unpleasant after 8pm. Stay only if maximum convenience matters.",
    whoItsFor: "Travelers on a 36-hour stopover. Anyone arriving late and leaving early. First-timers with high tolerance for chaos.",
    whoShouldSkip: "Almost everyone else. Light sleepers. Anyone who wants to like Amsterdam after the trip.",
    priceTier: 3, vibeTags: ["touristy", "central", "loud", "convenient"],
    tripTypeFit: ["first-timers", "business"] },
  { slug: "oud-west", name: "Oud-West", citySlug: "amsterdam", countrySlug: "netherlands",
    summary: "Just west of the canal belt — restored 1920s housing, Foodhallen, the Vondelpark next door. The cheaper-but-still-Amsterdam choice.",
    whoItsFor: "Travelers who want a real Amsterdam neighborhood at a 25% discount to Jordaan. Joggers — the Vondelpark is right there. Solo travelers.",
    whoShouldSkip: "Travelers prioritizing canal photos. Anyone needing zero tram travel.",
    priceTier: 2, vibeTags: ["residential", "park-adjacent", "value", "food"],
    tripTypeFit: ["solo", "couples", "digital-nomads", "families"] },

  // ========== Istanbul ==========
  { slug: "sultanahmet", name: "Sultanahmet", citySlug: "istanbul", countrySlug: "turkey",
    summary: "The historical peninsula — Hagia Sophia, Blue Mosque, Topkapı Palace, Grand Bazaar all walkable. The first-time-Istanbul default.",
    whoItsFor: "First-timers with 3-4 days. Travelers whose trip is sights-heavy. Anyone over 60 — the area is flat enough to walk all day.",
    whoShouldSkip: "Repeat visitors who already saw the major sights. Anyone wanting evening density — Sultanahmet quiets after dinner. Travelers over-sensitive to mosque calls to prayer.",
    priceTier: 2, vibeTags: ["historic", "tourist", "iconic", "walkable"],
    tripTypeFit: ["first-timers", "families", "couples"] },
  { slug: "beyoglu-galata", name: "Beyoğlu (Galata & Karaköy)", citySlug: "istanbul", countrySlug: "turkey",
    summary: "Across the Golden Horn — Galata Tower, design hotels, the food and bar density, the under-50 traveler's right answer.",
    whoItsFor: "Solo travelers. Couples on a second Istanbul trip. Anyone whose trip is built around restaurants and rooftop drinks.",
    whoShouldSkip: "First-timers focused on the Hagia Sophia and Blue Mosque (you'll be crossing the bridge several times daily). Light sleepers — Karaköy and Cihangir nights run late.",
    priceTier: 3, vibeTags: ["hip", "food", "design", "view"],
    tripTypeFit: ["couples", "solo", "digital-nomads", "luxury"] },
  { slug: "besiktas", name: "Beşiktaş", citySlug: "istanbul", countrySlug: "turkey",
    summary: "Up the Bosphorus from Beyoğlu — Dolmabahçe Palace, ferry terminals, the right base for Bosphorus-focused trips.",
    whoItsFor: "Travelers who want easy ferry access to the Asian side and up the Bosphorus. Repeat visitors. Anyone with a palace and waterfront priority.",
    whoShouldSkip: "First-timers focused on Sultanahmet sights — the tram from Beşiktaş takes time. Anyone wanting dense evening walks.",
    priceTier: 3, vibeTags: ["waterfront", "residential", "ferry-access"],
    tripTypeFit: ["couples", "luxury", "business"] },
  { slug: "kadikoy", name: "Kadıköy", citySlug: "istanbul", countrySlug: "turkey",
    summary: "Across the Bosphorus on the Asian side — no major sights, the city's best food market, the local-life Istanbul that repeat visitors fall for.",
    whoItsFor: "Repeat visitors. Solo travelers and digital nomads. Anyone whose trip is about food, walking, and being in a city rather than ticking sights.",
    whoShouldSkip: "First-timers — the ferry crossings to European-side sights add up. Anyone with a Hagia Sophia / Blue Mosque must-list.",
    priceTier: 2, vibeTags: ["local", "food", "asian-side", "ferry-access"],
    tripTypeFit: ["solo", "digital-nomads", "couples"] },

  // ========== Lisbon ==========
  { slug: "baixa-chiado", name: "Baixa & Chiado", citySlug: "lisbon", countrySlug: "portugal",
    summary: "The flat central grid (Baixa) and the elegant theatre district above it (Chiado) — central, walkable, restaurant-heavy.",
    whoItsFor: "First-timers. Travelers with mobility constraints — Baixa is genuinely flat. Anyone wanting maximum sights-per-day.",
    whoShouldSkip: "Travelers wanting a less-touristed stay. Light sleepers in summer.",
    priceTier: 3, vibeTags: ["central", "flat", "elegant", "tourist"],
    tripTypeFit: ["first-timers", "couples", "luxury", "business"] },
  { slug: "alfama", name: "Alfama", citySlug: "lisbon", countrySlug: "portugal",
    summary: "The medieval hilltop — narrow steep streets, fado bars, the postcard Lisbon. Atmospheric in the morning, queue-managed by midday.",
    whoItsFor: "Photographers. Travelers willing to sweat for atmosphere. Anyone whose Lisbon priorities include fado and the castle.",
    whoShouldSkip: "Anyone with a heavy suitcase or mobility limitations — the streets are 20% gradients. Travelers wanting quiet residential nights.",
    priceTier: 3, vibeTags: ["historic", "hilly", "atmospheric", "tourist"],
    tripTypeFit: ["couples", "first-timers", "solo"] },
  { slug: "bairro-alto", name: "Bairro Alto", citySlug: "lisbon", countrySlug: "portugal",
    summary: "The hilltop bar district — quiet by day, packed by 11pm, loud until 3am. Stay only if you're part of the crowd making the noise.",
    whoItsFor: "Travelers in their 20s and 30s on a party-focused trip. Bachelor/bachelorette parties.",
    whoShouldSkip: "Anyone over 35 who wants sleep. Families. First-timers who don't realize they're booking on top of a bar street.",
    priceTier: 2, vibeTags: ["nightlife", "loud", "central", "young"],
    tripTypeFit: ["solo", "couples"] },
  { slug: "principe-real", name: "Príncipe Real", citySlug: "lisbon", countrySlug: "portugal",
    summary: "Above Bairro Alto — design hotels, concept stores, leafy plazas, the right second-time-Lisbon stay.",
    whoItsFor: "Repeat visitors. Couples on a quieter, design-focused trip. Solo travelers who want walkability without the bar-street noise.",
    whoShouldSkip: "Budget travelers — this is the priciest non-Avenida district. Anyone wanting historical-Lisbon atmosphere.",
    priceTier: 3, vibeTags: ["design", "hip", "leafy", "residential"],
    tripTypeFit: ["couples", "solo", "luxury", "digital-nomads"] },

  // ========== Porto ==========
  { slug: "baixa", name: "Baixa", citySlug: "porto", countrySlug: "portugal",
    summary: "The central flat district between São Bento station and Avenida dos Aliados — walkable, restaurant-dense, the obvious central stay.",
    whoItsFor: "First-timers. Anyone whose Porto trip is short. Travelers who want flat walking access to most sights.",
    whoShouldSkip: "Travelers wanting riverfront atmosphere — Ribeira is a 10-min walk down (and a brutal walk back up). Light sleepers near Galerias de Paris.",
    priceTier: 2, vibeTags: ["central", "flat", "walkable", "shopping"],
    tripTypeFit: ["first-timers", "couples", "business", "solo"] },
  { slug: "cedofeita", name: "Cedofeita", citySlug: "porto", countrySlug: "portugal",
    summary: "Just west of Baixa — design shops, brunch cafés, calmer streets. The right local stay without losing walking distance to the center.",
    whoItsFor: "Repeat visitors. Couples wanting quieter nights. Digital nomads — café density is genuinely high.",
    whoShouldSkip: "First-timers prioritizing the Ribeira riverfront photo. Anyone wanting nightlife.",
    priceTier: 2, vibeTags: ["design", "calmer", "creative", "residential"],
    tripTypeFit: ["digital-nomads", "couples", "solo"] },
  { slug: "ribeira", name: "Ribeira", citySlug: "porto", countrySlug: "portugal",
    summary: "The UNESCO riverfront — the postcard but also the biggest day-tripper queue in Porto. Beautiful, brutal hills, expensive.",
    whoItsFor: "Photographers. Travelers willing to pay for the river view. Anyone planning a port-tasting trip.",
    whoShouldSkip: "Anyone with mobility issues — the hills are extreme. Light sleepers — fado bars and tourist crowds run late.",
    priceTier: 3, vibeTags: ["historic", "riverfront", "tourist", "hilly"],
    tripTypeFit: ["couples", "first-timers", "luxury"] },

  // ========== Berlin ==========
  { slug: "mitte", name: "Mitte", citySlug: "berlin", countrySlug: "germany",
    summary: "The historical center — Brandenburg Gate, Museum Island, Hackescher Markt. Polished, central, the first-time default.",
    whoItsFor: "First-timers with a museum-heavy itinerary. Business travelers. Anyone wanting maximum sights-per-day.",
    whoShouldSkip: "Repeat visitors who already saw Mitte. Travelers wanting authentic Berlin nightlife (it's elsewhere).",
    priceTier: 3, vibeTags: ["central", "historic", "polished", "tourist"],
    tripTypeFit: ["first-timers", "business", "couples", "luxury"] },
  { slug: "kreuzberg", name: "Kreuzberg", citySlug: "berlin", countrySlug: "germany",
    summary: "The food and nightlife heart — Turkish-German cooking, club density, the Berlin most people fly here for.",
    whoItsFor: "Solo travelers. Anyone whose trip is built around evenings. Repeat visitors who already did the museums.",
    whoShouldSkip: "Light sleepers. Families with small children. First-timers with a tight sights list — Kreuzberg is 20+ min from Mitte.",
    priceTier: 2, vibeTags: ["nightlife", "food", "alternative", "diverse"],
    tripTypeFit: ["solo", "digital-nomads", "couples"] },
  { slug: "prenzlauer-berg", name: "Prenzlauer Berg", citySlug: "berlin", countrySlug: "germany",
    summary: "Former East Berlin, now the leafy family-friendly district — restored 1900s housing, playgrounds, the calm-Berlin choice.",
    whoItsFor: "Families. Travelers in their 30s and 40s. Anyone wanting Berlin character without nightlife noise.",
    whoShouldSkip: "Travelers prioritizing nightlife. Anyone wanting walking distance to Brandenburg Gate.",
    priceTier: 2, vibeTags: ["residential", "leafy", "family-friendly", "calm"],
    tripTypeFit: ["families", "couples", "digital-nomads"] },
  { slug: "friedrichshain", name: "Friedrichshain", citySlug: "berlin", countrySlug: "germany",
    summary: "East of Mitte — East Side Gallery, Berghain, the harder-edged nightlife district. Younger and rougher than Kreuzberg.",
    whoItsFor: "Travelers in their 20s on a club-trip. Solo travelers comfortable with a less polished neighborhood.",
    whoShouldSkip: "Almost anyone over 35. Families. First-timers focused on sights.",
    priceTier: 2, vibeTags: ["nightlife", "alternative", "young", "edgy"],
    tripTypeFit: ["solo", "digital-nomads"] },
];

// ===== Combined neighborhoods (top-8 inline + tier-2 + tier-3) =====
export const ALL_NEIGHBORHOODS: StaticNeighborhood[] = [
  ...NEIGHBORHOODS,
  ...TIER2_NEIGHBORHOODS,
  ...TIER3_NEIGHBORHOODS,
];

// ===== Lookup helpers =====
export function findCountry(slug: string): StaticCountry | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
export function findCity(countrySlug: string, citySlug: string): StaticCity | undefined {
  return CITIES.find((c) => c.countrySlug === countrySlug && c.slug === citySlug);
}
export function findNeighborhood(countrySlug: string, citySlug: string, slug: string): StaticNeighborhood | undefined {
  return ALL_NEIGHBORHOODS.find((n) => n.countrySlug === countrySlug && n.citySlug === citySlug && n.slug === slug);
}
export function citiesInCountry(countrySlug: string): StaticCity[] {
  return CITIES.filter((c) => c.countrySlug === countrySlug);
}
export function neighborhoodsInCity(citySlug: string): StaticNeighborhood[] {
  return ALL_NEIGHBORHOODS.filter((n) => n.citySlug === citySlug);
}

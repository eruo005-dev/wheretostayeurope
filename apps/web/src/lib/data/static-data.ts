// apps/web/src/lib/data/static-data.ts
//
// Single source of truth for the static blog. No DB, no Payload.
// Add countries/cities/neighborhoods here; they appear in routes immediately.

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
  { slug: "france",                  name: "France",                 isoCode: "FR", currency: "EUR", timezone: "Europe/Paris",     euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in France",        metaDescription: "City and neighborhood guides for France.",        intro: "City and neighborhood guides across France." },
  { slug: "spain",                   name: "Spain",                  isoCode: "ES", currency: "EUR", timezone: "Europe/Madrid",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Spain",         metaDescription: "City and neighborhood guides for Spain.",         intro: "City and neighborhood guides across Spain." },
  { slug: "italy",                   name: "Italy",                  isoCode: "IT", currency: "EUR", timezone: "Europe/Rome",      euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Italy",         metaDescription: "City and neighborhood guides for Italy.",         intro: "City and neighborhood guides across Italy." },
  { slug: "germany",                 name: "Germany",                isoCode: "DE", currency: "EUR", timezone: "Europe/Berlin",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Germany",       metaDescription: "City and neighborhood guides for Germany.",       intro: "City and neighborhood guides across Germany." },
  { slug: "united-kingdom",          name: "United Kingdom",         isoCode: "GB", currency: "GBP", timezone: "Europe/London",    euMember: false, schengen: false, tier: "1", metaTitle: "Where to Stay in the UK",        metaDescription: "City and neighborhood guides for the UK.",        intro: "City and neighborhood guides across the UK." },
  { slug: "netherlands",             name: "Netherlands",            isoCode: "NL", currency: "EUR", timezone: "Europe/Amsterdam", euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in the Netherlands",metaDescription:"City and neighborhood guides for the Netherlands.",intro: "City and neighborhood guides across the Netherlands." },
  { slug: "turkey",                  name: "Turkey",                 isoCode: "TR", currency: "TRY", timezone: "Europe/Istanbul",  euMember: false, schengen: false, tier: "1", metaTitle: "Where to Stay in Turkey",        metaDescription: "City and neighborhood guides for Turkey.",        intro: "City and neighborhood guides across Turkey." },
  { slug: "portugal",                name: "Portugal",               isoCode: "PT", currency: "EUR", timezone: "Europe/Lisbon",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Portugal",      metaDescription: "City and neighborhood guides for Portugal.",      intro: "City and neighborhood guides across Portugal." },
  { slug: "greece",                  name: "Greece",                 isoCode: "GR", currency: "EUR", timezone: "Europe/Athens",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Greece",        metaDescription: "City and neighborhood guides for Greece.",        intro: "City and neighborhood guides across Greece." },
  { slug: "croatia",                 name: "Croatia",                isoCode: "HR", currency: "EUR", timezone: "Europe/Zagreb",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Croatia",       metaDescription: "City and neighborhood guides for Croatia.",       intro: "City and neighborhood guides across Croatia." },
  { slug: "bosnia-and-herzegovina",  name: "Bosnia and Herzegovina", isoCode: "BA", currency: "BAM", timezone: "Europe/Sarajevo",  euMember: false, schengen: false, tier: "2", metaTitle: "Where to Stay in Bosnia and Herzegovina", metaDescription: "City and neighborhood guides for Bosnia and Herzegovina.", intro: "City and neighborhood guides across Bosnia and Herzegovina." },
  { slug: "czech-republic",          name: "Czech Republic",         isoCode: "CZ", currency: "CZK", timezone: "Europe/Prague",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Czech Republic",metaDescription: "City and neighborhood guides for Czech Republic.",intro: "City and neighborhood guides across Czech Republic." },
  { slug: "hungary",                 name: "Hungary",                isoCode: "HU", currency: "HUF", timezone: "Europe/Budapest",  euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Hungary",       metaDescription: "City and neighborhood guides for Hungary.",       intro: "City and neighborhood guides across Hungary." },
  { slug: "poland",                  name: "Poland",                 isoCode: "PL", currency: "PLN", timezone: "Europe/Warsaw",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Poland",        metaDescription: "City and neighborhood guides for Poland.",        intro: "City and neighborhood guides across Poland." },
  { slug: "austria",                 name: "Austria",                isoCode: "AT", currency: "EUR", timezone: "Europe/Vienna",    euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Austria",       metaDescription: "City and neighborhood guides for Austria.",       intro: "City and neighborhood guides across Austria." },
  { slug: "switzerland",             name: "Switzerland",            isoCode: "CH", currency: "CHF", timezone: "Europe/Zurich",    euMember: false, schengen: true,  tier: "1", metaTitle: "Where to Stay in Switzerland",   metaDescription: "City and neighborhood guides for Switzerland.",   intro: "City and neighborhood guides across Switzerland." },
  { slug: "belgium",                 name: "Belgium",                isoCode: "BE", currency: "EUR", timezone: "Europe/Brussels",  euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Belgium",       metaDescription: "City and neighborhood guides for Belgium.",       intro: "City and neighborhood guides across Belgium." },
  { slug: "denmark",                 name: "Denmark",                isoCode: "DK", currency: "DKK", timezone: "Europe/Copenhagen",euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Denmark",       metaDescription: "City and neighborhood guides for Denmark.",       intro: "City and neighborhood guides across Denmark." },
  { slug: "sweden",                  name: "Sweden",                 isoCode: "SE", currency: "SEK", timezone: "Europe/Stockholm", euMember: true,  schengen: true,  tier: "1", metaTitle: "Where to Stay in Sweden",        metaDescription: "City and neighborhood guides for Sweden.",        intro: "City and neighborhood guides across Sweden." },
  { slug: "norway",                  name: "Norway",                 isoCode: "NO", currency: "NOK", timezone: "Europe/Oslo",      euMember: false, schengen: true,  tier: "1", metaTitle: "Where to Stay in Norway",        metaDescription: "City and neighborhood guides for Norway.",        intro: "City and neighborhood guides across Norway." },
  { slug: "ireland",                 name: "Ireland",                isoCode: "IE", currency: "EUR", timezone: "Europe/Dublin",    euMember: true,  schengen: false, tier: "1", metaTitle: "Where to Stay in Ireland",       metaDescription: "City and neighborhood guides for Ireland.",       intro: "City and neighborhood guides across Ireland." },
  { slug: "iceland",                 name: "Iceland",                isoCode: "IS", currency: "ISK", timezone: "Atlantic/Reykjavik",euMember: false,schengen: true,  tier: "2", metaTitle: "Where to Stay in Iceland",       metaDescription: "City and neighborhood guides for Iceland.",       intro: "City and neighborhood guides across Iceland." },
  { slug: "finland",                 name: "Finland",                isoCode: "FI", currency: "EUR", timezone: "Europe/Helsinki",  euMember: true,  schengen: true,  tier: "2", metaTitle: "Where to Stay in Finland",       metaDescription: "City and neighborhood guides for Finland.",       intro: "City and neighborhood guides across Finland." },
];

export const CITIES: StaticCity[] = [
  // France
  { slug: "paris",       name: "Paris",       countrySlug: "france",   lat: 48.8566, lng:  2.3522, population: 2_100_000, tier: "1", bookingDestId: -1456928, intro: "Pick the right arrondissement before you book." },
  { slug: "nice",        name: "Nice",        countrySlug: "france",   lat: 43.7102, lng:  7.2620, population:   340_000, tier: "2", bookingDestId: -1449447, intro: "" },
  { slug: "lyon",        name: "Lyon",        countrySlug: "france",   lat: 45.7640, lng:  4.8357, population:   520_000, tier: "2", bookingDestId: -1447688, intro: "" },
  { slug: "marseille",   name: "Marseille",   countrySlug: "france",   lat: 43.2965, lng:  5.3698, population:   870_000, tier: "2", bookingDestId: -1449077, intro: "" },
  { slug: "bordeaux",    name: "Bordeaux",    countrySlug: "france",   lat: 44.8378, lng: -0.5792, population:   260_000, tier: "2", bookingDestId: -1418435, intro: "" },
  // Spain
  { slug: "madrid",      name: "Madrid",      countrySlug: "spain",    lat: 40.4168, lng: -3.7038, population: 3_300_000, tier: "1", bookingDestId:  -390625, intro: "" },
  { slug: "barcelona",   name: "Barcelona",   countrySlug: "spain",    lat: 41.3874, lng:  2.1686, population: 1_620_000, tier: "1", bookingDestId:  -372490, intro: "" },
  { slug: "valencia",    name: "Valencia",    countrySlug: "spain",    lat: 39.4699, lng: -0.3763, population:   790_000, tier: "2", bookingDestId:  -406893, intro: "" },
  { slug: "seville",     name: "Seville",     countrySlug: "spain",    lat: 37.3891, lng: -5.9845, population:   680_000, tier: "2", bookingDestId:  -402849, intro: "" },
  { slug: "malaga",      name: "Málaga",      countrySlug: "spain",    lat: 36.7213, lng: -4.4213, population:   580_000, tier: "2", bookingDestId:  -390874, intro: "" },
  // Italy
  { slug: "rome",        name: "Rome",        countrySlug: "italy",    lat: 41.9028, lng: 12.4964, population: 2_870_000, tier: "1", bookingDestId:  -126693, intro: "" },
  { slug: "florence",    name: "Florence",    countrySlug: "italy",    lat: 43.7696, lng: 11.2558, population:   380_000, tier: "1", bookingDestId:  -117543, intro: "" },
  { slug: "venice",      name: "Venice",      countrySlug: "italy",    lat: 45.4408, lng: 12.3155, population:   260_000, tier: "1", bookingDestId:  -132007, intro: "" },
  { slug: "milan",       name: "Milan",       countrySlug: "italy",    lat: 45.4642, lng:  9.1900, population: 1_350_000, tier: "1", bookingDestId:  -121726, intro: "" },
  { slug: "naples",      name: "Naples",      countrySlug: "italy",    lat: 40.8518, lng: 14.2681, population:   960_000, tier: "2", bookingDestId:  -122902, intro: "" },
  // Germany
  { slug: "berlin",      name: "Berlin",      countrySlug: "germany",  lat: 52.5200, lng: 13.4050, population: 3_700_000, tier: "1", bookingDestId: -1746443, intro: "" },
  { slug: "munich",      name: "Munich",      countrySlug: "germany",  lat: 48.1351, lng: 11.5820, population: 1_490_000, tier: "1", bookingDestId: -1829149, intro: "" },
  { slug: "hamburg",     name: "Hamburg",     countrySlug: "germany",  lat: 53.5511, lng:  9.9937, population: 1_900_000, tier: "2", bookingDestId: -1785434, intro: "" },
  { slug: "cologne",     name: "Cologne",     countrySlug: "germany",  lat: 50.9375, lng:  6.9603, population: 1_100_000, tier: "2", bookingDestId: -1759694, intro: "" },
  // UK
  { slug: "london",      name: "London",      countrySlug: "united-kingdom", lat: 51.5074, lng: -0.1278, population: 9_000_000, tier: "1", bookingDestId: -2601889, intro: "" },
  { slug: "edinburgh",   name: "Edinburgh",   countrySlug: "united-kingdom", lat: 55.9533, lng: -3.1883, population:   520_000, tier: "2", bookingDestId: -2595386, intro: "" },
  { slug: "manchester",  name: "Manchester",  countrySlug: "united-kingdom", lat: 53.4808, lng: -2.2426, population:   550_000, tier: "2", bookingDestId: -2602510, intro: "" },
  // Netherlands
  { slug: "amsterdam",   name: "Amsterdam",   countrySlug: "netherlands", lat: 52.3676, lng:  4.9041, population: 920_000, tier: "1", bookingDestId: -2140479, intro: "" },
  { slug: "rotterdam",   name: "Rotterdam",   countrySlug: "netherlands", lat: 51.9244, lng:  4.4777, population: 660_000, tier: "2", bookingDestId: -2154642, intro: "" },
  { slug: "the-hague",   name: "The Hague",   countrySlug: "netherlands", lat: 52.0705, lng:  4.3007, population: 550_000, tier: "2", bookingDestId: -2143696, intro: "" },
  // Turkey
  { slug: "istanbul",    name: "Istanbul",    countrySlug: "turkey",   lat: 41.0082, lng: 28.9784, population: 15_600_000, tier: "1", bookingDestId:  -755070, intro: "" },
  { slug: "cappadocia",  name: "Cappadocia",  countrySlug: "turkey",   lat: 38.6431, lng: 34.8289, population:     80_000, tier: "2", bookingDestId:  -747468, intro: "" },
  { slug: "antalya",     name: "Antalya",     countrySlug: "turkey",   lat: 36.8969, lng: 30.7133, population:  1_330_000, tier: "2", bookingDestId:  -745231, intro: "" },
  { slug: "izmir",       name: "İzmir",       countrySlug: "turkey",   lat: 38.4192, lng: 27.1287, population:  3_020_000, tier: "2", bookingDestId:  -752955, intro: "" },
  // Portugal
  { slug: "lisbon",      name: "Lisbon",      countrySlug: "portugal", lat: 38.7223, lng: -9.1393, population:   545_000, tier: "1", bookingDestId: -2167973, intro: "" },
  { slug: "porto",       name: "Porto",       countrySlug: "portugal", lat: 41.1579, lng: -8.6291, population:   215_000, tier: "1", bookingDestId: -2174884, intro: "" },
  // Greece
  { slug: "athens",      name: "Athens",      countrySlug: "greece",   lat: 37.9838, lng: 23.7275, population:   664_000, tier: "1", bookingDestId:  -814876, intro: "" },
  { slug: "thessaloniki",name: "Thessaloniki",countrySlug: "greece",   lat: 40.6401, lng: 22.9444, population:   325_000, tier: "2", bookingDestId:  -823352, intro: "" },
  { slug: "santorini",   name: "Santorini",   countrySlug: "greece",   lat: 36.3932, lng: 25.4615, population:    15_000, tier: "1", bookingDestId: -3402032, intro: "" },
  // Croatia
  { slug: "zagreb",      name: "Zagreb",      countrySlug: "croatia",  lat: 45.8150, lng: 15.9819, population:   770_000, tier: "1", bookingDestId:   -97179, intro: "" },
  { slug: "split",       name: "Split",       countrySlug: "croatia",  lat: 43.5081, lng: 16.4402, population:   178_000, tier: "1", bookingDestId:   -94908, intro: "" },
  { slug: "dubrovnik",   name: "Dubrovnik",   countrySlug: "croatia",  lat: 42.6507, lng: 18.0944, population:    41_000, tier: "1", bookingDestId:   -90930, intro: "" },
  // Bosnia and Herzegovina
  { slug: "sarajevo",    name: "Sarajevo",    countrySlug: "bosnia-and-herzegovina", lat: 43.8563, lng: 18.4131, population: 275_000, tier: "1", bookingDestId: -91450, intro: "" },
  { slug: "mostar",      name: "Mostar",      countrySlug: "bosnia-and-herzegovina", lat: 43.3438, lng: 17.8078, population: 113_000, tier: "2", bookingDestId: -90989, intro: "" },
  // Czech Republic
  { slug: "prague",      name: "Prague",      countrySlug: "czech-republic", lat: 50.0755, lng: 14.4378, population: 1_320_000, tier: "1", bookingDestId: -553173, intro: "" },
  { slug: "brno",        name: "Brno",        countrySlug: "czech-republic", lat: 49.1951, lng: 16.6068, population:   379_000, tier: "2", bookingDestId: -552933, intro: "" },
  // Hungary
  { slug: "budapest",    name: "Budapest",    countrySlug: "hungary",  lat: 47.4979, lng: 19.0402, population: 1_750_000, tier: "1", bookingDestId:  -850553, intro: "" },
  // Poland
  { slug: "krakow",      name: "Kraków",      countrySlug: "poland",   lat: 50.0647, lng: 19.9450, population:   779_000, tier: "1", bookingDestId:  -522619, intro: "" },
  { slug: "warsaw",      name: "Warsaw",      countrySlug: "poland",   lat: 52.2297, lng: 21.0122, population: 1_790_000, tier: "1", bookingDestId:  -528429, intro: "" },
  { slug: "gdansk",      name: "Gdańsk",      countrySlug: "poland",   lat: 54.3520, lng: 18.6466, population:   470_000, tier: "2", bookingDestId:  -513678, intro: "" },
  { slug: "wroclaw",     name: "Wrocław",     countrySlug: "poland",   lat: 51.1079, lng: 17.0385, population:   640_000, tier: "2", bookingDestId:  -528658, intro: "" },
  // Austria
  { slug: "vienna",      name: "Vienna",      countrySlug: "austria",  lat: 48.2082, lng: 16.3738, population: 1_950_000, tier: "1", bookingDestId: -1995499, intro: "" },
  { slug: "salzburg",    name: "Salzburg",    countrySlug: "austria",  lat: 47.8095, lng: 13.0550, population:   155_000, tier: "1", bookingDestId: -1991765, intro: "" },
  { slug: "innsbruck",   name: "Innsbruck",   countrySlug: "austria",  lat: 47.2692, lng: 11.4041, population:   132_000, tier: "2", bookingDestId: -1989166, intro: "" },
  // Switzerland
  { slug: "zurich",      name: "Zurich",      countrySlug: "switzerland", lat: 47.3769, lng:  8.5417, population: 415_000, tier: "1", bookingDestId: -2554866, intro: "" },
  { slug: "geneva",      name: "Geneva",      countrySlug: "switzerland", lat: 46.2044, lng:  6.1432, population: 200_000, tier: "1", bookingDestId: -2548602, intro: "" },
  { slug: "lucerne",     name: "Lucerne",     countrySlug: "switzerland", lat: 47.0502, lng:  8.3093, population:  82_000, tier: "2", bookingDestId: -2549770, intro: "" },
  // Belgium
  { slug: "brussels",    name: "Brussels",    countrySlug: "belgium",  lat: 50.8503, lng:  4.3517, population: 1_220_000, tier: "1", bookingDestId: -1955860, intro: "" },
  { slug: "bruges",      name: "Bruges",      countrySlug: "belgium",  lat: 51.2093, lng:  3.2247, population:   118_000, tier: "1", bookingDestId: -1955684, intro: "" },
  { slug: "ghent",       name: "Ghent",       countrySlug: "belgium",  lat: 51.0543, lng:  3.7174, population:   263_000, tier: "2", bookingDestId: -1956611, intro: "" },
  { slug: "antwerp",     name: "Antwerp",     countrySlug: "belgium",  lat: 51.2194, lng:  4.4025, population:   530_000, tier: "2", bookingDestId: -1955536, intro: "" },
  // Denmark
  { slug: "copenhagen",  name: "Copenhagen",  countrySlug: "denmark",  lat: 55.6761, lng: 12.5683, population:   660_000, tier: "1", bookingDestId: -2745636, intro: "" },
  { slug: "aarhus",      name: "Aarhus",      countrySlug: "denmark",  lat: 56.1629, lng: 10.2039, population:   285_000, tier: "2", bookingDestId: -2745476, intro: "" },
  // Sweden
  { slug: "stockholm",   name: "Stockholm",   countrySlug: "sweden",   lat: 59.3293, lng: 18.0686, population:   980_000, tier: "1", bookingDestId: -2710422, intro: "" },
  { slug: "gothenburg",  name: "Gothenburg",  countrySlug: "sweden",   lat: 57.7089, lng: 11.9746, population:   583_000, tier: "2", bookingDestId: -2697453, intro: "" },
  { slug: "malmo",       name: "Malmö",       countrySlug: "sweden",   lat: 55.6050, lng: 13.0038, population:   350_000, tier: "2", bookingDestId: -2705349, intro: "" },
  // Norway
  { slug: "oslo",        name: "Oslo",        countrySlug: "norway",   lat: 59.9139, lng: 10.7522, population:   700_000, tier: "1", bookingDestId: -3232853, intro: "" },
  { slug: "bergen",      name: "Bergen",      countrySlug: "norway",   lat: 60.3913, lng:  5.3221, population:   290_000, tier: "2", bookingDestId: -3217090, intro: "" },
  // Ireland
  { slug: "dublin",      name: "Dublin",      countrySlug: "ireland",  lat: 53.3498, lng: -6.2603, population:   590_000, tier: "1", bookingDestId: -1567851, intro: "" },
  { slug: "galway",      name: "Galway",      countrySlug: "ireland",  lat: 53.2707, lng: -9.0568, population:    85_000, tier: "2", bookingDestId: -1567869, intro: "" },
  // Iceland
  { slug: "reykjavik",   name: "Reykjavík",   countrySlug: "iceland",  lat: 64.1466, lng: -21.9426, population:  140_000, tier: "1", bookingDestId: -2641913, intro: "" },
  // Finland
  { slug: "helsinki",    name: "Helsinki",    countrySlug: "finland",  lat: 60.1699, lng: 24.9384, population:   660_000, tier: "1", bookingDestId: -1376301, intro: "" },
];

export const NEIGHBORHOODS: StaticNeighborhood[] = [
  // Add neighborhood entries here as you publish editorial content for them.
  // Until then country/city pages render with city lists, no neighborhood lists.
];

// ===== Lookup helpers =====
export function findCountry(slug: string): StaticCountry | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}
export function findCity(countrySlug: string, citySlug: string): StaticCity | undefined {
  return CITIES.find((c) => c.countrySlug === countrySlug && c.slug === citySlug);
}
export function findNeighborhood(countrySlug: string, citySlug: string, slug: string): StaticNeighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.countrySlug === countrySlug && n.citySlug === citySlug && n.slug === slug);
}
export function citiesInCountry(countrySlug: string): StaticCity[] {
  return CITIES.filter((c) => c.countrySlug === countrySlug);
}
export function neighborhoodsInCity(citySlug: string): StaticNeighborhood[] {
  return NEIGHBORHOODS.filter((n) => n.citySlug === citySlug);
}

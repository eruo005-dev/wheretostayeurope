// apps/web/scripts/seed-phase1-countries.ts
//
// Seeds the 7 Phase 1 countries + all of their major cities with Booking.com
// destination IDs. Idempotent — uses findOrCreate via Payload Local API.
//
// Run with: pnpm --filter web tsx scripts/seed-phase1-countries.ts

import { getPayload } from "payload";
import config from "../src/payload.config";

type CountrySeed = {
  slug: string;
  isoCode: string;
  name: string;
  currencyCode: string;
  timezone: string;
  euMember: boolean;
  schengen: boolean;
  tier: "1" | "2" | "3";
  population: number;
  areaKm2: number;
  metaTitle: string;
  metaDescription: string;
};

type CitySeed = {
  countryIso: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  tier: "1" | "2" | "3";
  population: number;
  airportCodes: string[];
  bookingDestId: number;      // Booking.com destination ID
  gygLocationId?: number;     // GetYourGuide location ID (fill in later if known)
};

const COUNTRIES: CountrySeed[] = [
  {
    slug: "france",
    isoCode: "FR",
    name: "France",
    currencyCode: "EUR",
    timezone: "Europe/Paris",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 68_000_000,
    areaKm2: 643_801,
    metaTitle: "Where to Stay in France — Country Guide",
    metaDescription:
      "Neighborhood-level guides to France's top cities. Pick the right arrondissement, quartier, or village for your trip.",
  },
  {
    slug: "spain",
    isoCode: "ES",
    name: "Spain",
    currencyCode: "EUR",
    timezone: "Europe/Madrid",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 48_000_000,
    areaKm2: 505_990,
    metaTitle: "Where to Stay in Spain — Country Guide",
    metaDescription:
      "Neighborhood-level guides to Spain's top cities. Pick the right barrio for your trip.",
  },
  {
    slug: "italy",
    isoCode: "IT",
    name: "Italy",
    currencyCode: "EUR",
    timezone: "Europe/Rome",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 58_500_000,
    areaKm2: 301_340,
    metaTitle: "Where to Stay in Italy — Country Guide",
    metaDescription:
      "Neighborhood-level guides to Italy's top cities. Pick the right quartiere for your trip.",
  },
  {
    slug: "germany",
    isoCode: "DE",
    name: "Germany",
    currencyCode: "EUR",
    timezone: "Europe/Berlin",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 84_000_000,
    areaKm2: 357_022,
    metaTitle: "Where to Stay in Germany — Country Guide",
    metaDescription:
      "Neighborhood-level guides to Germany's top cities. Pick the right Kiez or Viertel for your trip.",
  },
  {
    slug: "united-kingdom",
    isoCode: "GB",
    name: "United Kingdom",
    currencyCode: "GBP",
    timezone: "Europe/London",
    euMember: false,
    schengen: false,
    tier: "1",
    population: 67_500_000,
    areaKm2: 243_610,
    metaTitle: "Where to Stay in the UK — Country Guide",
    metaDescription:
      "Neighborhood-level guides to UK cities. Pick the right area for your trip.",
  },
  {
    slug: "netherlands",
    isoCode: "NL",
    name: "Netherlands",
    currencyCode: "EUR",
    timezone: "Europe/Amsterdam",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 17_800_000,
    areaKm2: 41_850,
    metaTitle: "Where to Stay in the Netherlands — Country Guide",
    metaDescription:
      "Neighborhood-level guides to Dutch cities. Pick the right buurt for your trip.",
  },
  {
    slug: "turkey",
    isoCode: "TR",
    name: "Turkey",
    currencyCode: "TRY",
    timezone: "Europe/Istanbul",
    euMember: false,
    schengen: false,
    tier: "1",
    population: 85_300_000,
    areaKm2: 783_562,
    metaTitle: "Where to Stay in Turkey — Country Guide",
    metaDescription:
      "Neighborhood-level guides to Turkey's top cities. From Sultanahmet to Beyoğlu to Kadıköy.",
  },
  // ===== Phase 1 expansion (massively grow coverage) =====
  {
    slug: "bosnia-and-herzegovina",
    isoCode: "BA",
    name: "Bosnia and Herzegovina",
    currencyCode: "BAM",
    timezone: "Europe/Sarajevo",
    euMember: false,
    schengen: false,
    tier: "2",
    population: 3_200_000,
    areaKm2: 51_209,
    metaTitle: "Where to Stay in Bosnia and Herzegovina — Country Guide",
    metaDescription:
      "Sarajevo, Mostar, and Banja Luka — neighborhood-level picks for Balkans-bound travelers.",
  },
  {
    slug: "croatia",
    isoCode: "HR",
    name: "Croatia",
    currencyCode: "EUR",
    timezone: "Europe/Zagreb",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 3_870_000,
    areaKm2: 56_594,
    metaTitle: "Where to Stay in Croatia — Country Guide",
    metaDescription:
      "Dubrovnik, Split, Zagreb, Hvar — coastal versus inland Croatia, by neighborhood and trip type.",
  },
  {
    slug: "greece",
    isoCode: "GR",
    name: "Greece",
    currencyCode: "EUR",
    timezone: "Europe/Athens",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 10_400_000,
    areaKm2: 131_957,
    metaTitle: "Where to Stay in Greece — Country Guide",
    metaDescription:
      "Athens, Santorini, Mykonos, Thessaloniki — mainland and islands, neighborhood by neighborhood.",
  },
  {
    slug: "czech-republic",
    isoCode: "CZ",
    name: "Czech Republic",
    currencyCode: "CZK",
    timezone: "Europe/Prague",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 10_500_000,
    areaKm2: 78_867,
    metaTitle: "Where to Stay in Czech Republic — Country Guide",
    metaDescription:
      "Prague, Brno, Český Krumlov — picked by neighborhood and trip type.",
  },
  {
    slug: "hungary",
    isoCode: "HU",
    name: "Hungary",
    currencyCode: "HUF",
    timezone: "Europe/Budapest",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 9_700_000,
    areaKm2: 93_028,
    metaTitle: "Where to Stay in Hungary — Country Guide",
    metaDescription:
      "Budapest by district, plus Eger, Pécs, Lake Balaton stays.",
  },
  {
    slug: "poland",
    isoCode: "PL",
    name: "Poland",
    currencyCode: "PLN",
    timezone: "Europe/Warsaw",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 38_000_000,
    areaKm2: 312_696,
    metaTitle: "Where to Stay in Poland — Country Guide",
    metaDescription:
      "Kraków, Warsaw, Gdańsk, Wrocław — neighborhood guides for Poland's biggest cities.",
  },
  {
    slug: "portugal",
    isoCode: "PT",
    name: "Portugal",
    currencyCode: "EUR",
    timezone: "Europe/Lisbon",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 10_300_000,
    areaKm2: 92_212,
    metaTitle: "Where to Stay in Portugal — Country Guide",
    metaDescription:
      "Lisbon, Porto, Algarve, Madeira — bairros that match your trip, not Booking's defaults.",
  },
  {
    slug: "switzerland",
    isoCode: "CH",
    name: "Switzerland",
    currencyCode: "CHF",
    timezone: "Europe/Zurich",
    euMember: false,
    schengen: true,
    tier: "1",
    population: 8_700_000,
    areaKm2: 41_277,
    metaTitle: "Where to Stay in Switzerland — Country Guide",
    metaDescription:
      "Zurich, Geneva, Lucerne, Interlaken — city stays and Alpine bases.",
  },
  {
    slug: "austria",
    isoCode: "AT",
    name: "Austria",
    currencyCode: "EUR",
    timezone: "Europe/Vienna",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 9_100_000,
    areaKm2: 83_879,
    metaTitle: "Where to Stay in Austria — Country Guide",
    metaDescription:
      "Vienna, Salzburg, Innsbruck — Bezirk by Bezirk and Alpine valleys, picked by trip type.",
  },
  {
    slug: "belgium",
    isoCode: "BE",
    name: "Belgium",
    currencyCode: "EUR",
    timezone: "Europe/Brussels",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 11_700_000,
    areaKm2: 30_528,
    metaTitle: "Where to Stay in Belgium — Country Guide",
    metaDescription:
      "Brussels, Bruges, Ghent, Antwerp — small country, big neighborhood differences.",
  },
  {
    slug: "denmark",
    isoCode: "DK",
    name: "Denmark",
    currencyCode: "DKK",
    timezone: "Europe/Copenhagen",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 5_900_000,
    areaKm2: 42_933,
    metaTitle: "Where to Stay in Denmark — Country Guide",
    metaDescription:
      "Copenhagen by neighborhood, plus Aarhus and Odense — honest picks for Denmark trips.",
  },
  {
    slug: "sweden",
    isoCode: "SE",
    name: "Sweden",
    currencyCode: "SEK",
    timezone: "Europe/Stockholm",
    euMember: true,
    schengen: true,
    tier: "1",
    population: 10_500_000,
    areaKm2: 450_295,
    metaTitle: "Where to Stay in Sweden — Country Guide",
    metaDescription:
      "Stockholm, Gothenburg, Malmö — picked by neighborhood and season.",
  },
  {
    slug: "norway",
    isoCode: "NO",
    name: "Norway",
    currencyCode: "NOK",
    timezone: "Europe/Oslo",
    euMember: false,
    schengen: true,
    tier: "1",
    population: 5_500_000,
    areaKm2: 385_207,
    metaTitle: "Where to Stay in Norway — Country Guide",
    metaDescription:
      "Oslo, Bergen, Tromsø — city neighborhoods plus fjord-base picks.",
  },
];

// Booking.com dest IDs verified as of publish; spot-check before trusting for affiliate links.
const CITIES: CitySeed[] = [
  // France
  { countryIso: "FR", slug: "paris",       name: "Paris",       lat: 48.8566, lng: 2.3522,  tier: "1", population: 2_100_000, airportCodes: ["CDG","ORY","BVA"], bookingDestId: -1456928 },
  { countryIso: "FR", slug: "nice",        name: "Nice",        lat: 43.7102, lng: 7.2620,  tier: "2", population: 340_000,   airportCodes: ["NCE"],              bookingDestId: -1449447 },
  { countryIso: "FR", slug: "lyon",        name: "Lyon",        lat: 45.7640, lng: 4.8357,  tier: "2", population: 520_000,   airportCodes: ["LYS"],              bookingDestId: -1447688 },
  { countryIso: "FR", slug: "marseille",   name: "Marseille",   lat: 43.2965, lng: 5.3698,  tier: "2", population: 870_000,   airportCodes: ["MRS"],              bookingDestId: -1449077 },
  { countryIso: "FR", slug: "bordeaux",    name: "Bordeaux",    lat: 44.8378, lng: -0.5792, tier: "2", population: 260_000,   airportCodes: ["BOD"],              bookingDestId: -1418435 },
  // Spain
  { countryIso: "ES", slug: "madrid",      name: "Madrid",      lat: 40.4168, lng: -3.7038, tier: "1", population: 3_300_000, airportCodes: ["MAD"],              bookingDestId: -390625 },
  { countryIso: "ES", slug: "barcelona",   name: "Barcelona",   lat: 41.3874, lng: 2.1686,  tier: "1", population: 1_620_000, airportCodes: ["BCN"],              bookingDestId: -372490 },
  { countryIso: "ES", slug: "valencia",    name: "Valencia",    lat: 39.4699, lng: -0.3763, tier: "2", population: 790_000,   airportCodes: ["VLC"],              bookingDestId: -406893 },
  { countryIso: "ES", slug: "seville",     name: "Seville",     lat: 37.3891, lng: -5.9845, tier: "2", population: 680_000,   airportCodes: ["SVQ"],              bookingDestId: -402849 },
  { countryIso: "ES", slug: "malaga",      name: "Málaga",      lat: 36.7213, lng: -4.4213, tier: "2", population: 580_000,   airportCodes: ["AGP"],              bookingDestId: -390874 },
  // Italy
  { countryIso: "IT", slug: "rome",        name: "Rome",        lat: 41.9028, lng: 12.4964, tier: "1", population: 2_870_000, airportCodes: ["FCO","CIA"],        bookingDestId: -126693 },
  { countryIso: "IT", slug: "florence",    name: "Florence",    lat: 43.7696, lng: 11.2558, tier: "1", population: 380_000,   airportCodes: ["FLR","PSA"],        bookingDestId: -117543 },
  { countryIso: "IT", slug: "venice",      name: "Venice",      lat: 45.4408, lng: 12.3155, tier: "1", population: 260_000,   airportCodes: ["VCE","TSF"],        bookingDestId: -132007 },
  { countryIso: "IT", slug: "milan",       name: "Milan",       lat: 45.4642, lng: 9.1900,  tier: "1", population: 1_350_000, airportCodes: ["MXP","LIN","BGY"],  bookingDestId: -121726 },
  { countryIso: "IT", slug: "naples",      name: "Naples",      lat: 40.8518, lng: 14.2681, tier: "2", population: 960_000,   airportCodes: ["NAP"],              bookingDestId: -122902 },
  // Germany
  { countryIso: "DE", slug: "berlin",      name: "Berlin",      lat: 52.5200, lng: 13.4050, tier: "1", population: 3_700_000, airportCodes: ["BER"],              bookingDestId: -1746443 },
  { countryIso: "DE", slug: "munich",      name: "Munich",      lat: 48.1351, lng: 11.5820, tier: "1", population: 1_490_000, airportCodes: ["MUC"],              bookingDestId: -1829149 },
  { countryIso: "DE", slug: "hamburg",     name: "Hamburg",     lat: 53.5511, lng: 9.9937,  tier: "2", population: 1_900_000, airportCodes: ["HAM"],              bookingDestId: -1785434 },
  { countryIso: "DE", slug: "cologne",     name: "Cologne",     lat: 50.9375, lng: 6.9603,  tier: "2", population: 1_100_000, airportCodes: ["CGN"],              bookingDestId: -1759694 },
  // UK
  { countryIso: "GB", slug: "london",      name: "London",      lat: 51.5074, lng: -0.1278, tier: "1", population: 9_000_000, airportCodes: ["LHR","LGW","STN","LTN","LCY"], bookingDestId: -2601889 },
  { countryIso: "GB", slug: "edinburgh",   name: "Edinburgh",   lat: 55.9533, lng: -3.1883, tier: "2", population: 520_000,   airportCodes: ["EDI"],              bookingDestId: -2595386 },
  { countryIso: "GB", slug: "manchester",  name: "Manchester",  lat: 53.4808, lng: -2.2426, tier: "2", population: 550_000,   airportCodes: ["MAN"],              bookingDestId: -2602510 },
  // Netherlands
  { countryIso: "NL", slug: "amsterdam",   name: "Amsterdam",   lat: 52.3676, lng: 4.9041,  tier: "1", population: 920_000,   airportCodes: ["AMS"],              bookingDestId: -2140479 },
  { countryIso: "NL", slug: "rotterdam",   name: "Rotterdam",   lat: 51.9244, lng: 4.4777,  tier: "2", population: 660_000,   airportCodes: ["RTM"],              bookingDestId: -2154642 },
  { countryIso: "NL", slug: "the-hague",   name: "The Hague",   lat: 52.0705, lng: 4.3007,  tier: "2", population: 550_000,   airportCodes: [],                   bookingDestId: -2143696 },
  // Turkey
  { countryIso: "TR", slug: "istanbul",    name: "Istanbul",    lat: 41.0082, lng: 28.9784, tier: "1", population: 15_600_000, airportCodes: ["IST","SAW"],        bookingDestId: -755070 },
  { countryIso: "TR", slug: "cappadocia",  name: "Cappadocia",  lat: 38.6431, lng: 34.8289, tier: "2", population: 80_000,    airportCodes: ["NAV","ASR"],        bookingDestId: -747468 },
  { countryIso: "TR", slug: "antalya",     name: "Antalya",     lat: 36.8969, lng: 30.7133, tier: "2", population: 1_330_000, airportCodes: ["AYT"],              bookingDestId: -745231 },
  { countryIso: "TR", slug: "izmir",       name: "İzmir",       lat: 38.4192, lng: 27.1287, tier: "2", population: 3_020_000, airportCodes: ["ADB"],              bookingDestId: -752955 },
  // ===== Phase 1 expansion city seeds (booking IDs left null where unverified — add later) =====
  // Bosnia and Herzegovina
  { countryIso: "BA", slug: "sarajevo",    name: "Sarajevo",    lat: 43.8563, lng: 18.4131, tier: "1", population: 275_000,    airportCodes: ["SJJ"],         bookingDestId: -91450 },
  { countryIso: "BA", slug: "mostar",      name: "Mostar",      lat: 43.3438, lng: 17.8078, tier: "2", population: 113_000,    airportCodes: ["OMO"],         bookingDestId: -90989 },
  // Croatia
  { countryIso: "HR", slug: "zagreb",      name: "Zagreb",      lat: 45.8150, lng: 15.9819, tier: "1", population: 770_000,    airportCodes: ["ZAG"],         bookingDestId: -97179 },
  { countryIso: "HR", slug: "split",       name: "Split",       lat: 43.5081, lng: 16.4402, tier: "1", population: 178_000,    airportCodes: ["SPU"],         bookingDestId: -94908 },
  { countryIso: "HR", slug: "dubrovnik",   name: "Dubrovnik",   lat: 42.6507, lng: 18.0944, tier: "1", population: 41_000,     airportCodes: ["DBV"],         bookingDestId: -90930 },
  // Greece
  { countryIso: "GR", slug: "athens",      name: "Athens",      lat: 37.9838, lng: 23.7275, tier: "1", population: 664_000,    airportCodes: ["ATH"],         bookingDestId: -814876 },
  { countryIso: "GR", slug: "thessaloniki",name: "Thessaloniki",lat: 40.6401, lng: 22.9444, tier: "2", population: 325_000,    airportCodes: ["SKG"],         bookingDestId: -823352 },
  { countryIso: "GR", slug: "santorini",   name: "Santorini",   lat: 36.3932, lng: 25.4615, tier: "1", population: 15_000,     airportCodes: ["JTR"],         bookingDestId: -3402032 },
  // Czech Republic
  { countryIso: "CZ", slug: "prague",      name: "Prague",      lat: 50.0755, lng: 14.4378, tier: "1", population: 1_320_000,  airportCodes: ["PRG"],         bookingDestId: -553173 },
  { countryIso: "CZ", slug: "brno",        name: "Brno",        lat: 49.1951, lng: 16.6068, tier: "2", population: 379_000,    airportCodes: ["BRQ"],         bookingDestId: -552933 },
  // Hungary
  { countryIso: "HU", slug: "budapest",    name: "Budapest",    lat: 47.4979, lng: 19.0402, tier: "1", population: 1_750_000,  airportCodes: ["BUD"],         bookingDestId: -850553 },
  // Poland
  { countryIso: "PL", slug: "krakow",      name: "Kraków",      lat: 50.0647, lng: 19.9450, tier: "1", population: 779_000,    airportCodes: ["KRK"],         bookingDestId: -522619 },
  { countryIso: "PL", slug: "warsaw",      name: "Warsaw",      lat: 52.2297, lng: 21.0122, tier: "1", population: 1_790_000,  airportCodes: ["WAW","WMI"],   bookingDestId: -528429 },
  { countryIso: "PL", slug: "gdansk",      name: "Gdańsk",      lat: 54.3520, lng: 18.6466, tier: "2", population: 470_000,    airportCodes: ["GDN"],         bookingDestId: -513678 },
  { countryIso: "PL", slug: "wroclaw",     name: "Wrocław",     lat: 51.1079, lng: 17.0385, tier: "2", population: 640_000,    airportCodes: ["WRO"],         bookingDestId: -528658 },
  // Portugal
  { countryIso: "PT", slug: "lisbon",      name: "Lisbon",      lat: 38.7223, lng: -9.1393, tier: "1", population: 545_000,    airportCodes: ["LIS"],         bookingDestId: -2167973 },
  { countryIso: "PT", slug: "porto",       name: "Porto",       lat: 41.1579, lng: -8.6291, tier: "1", population: 215_000,    airportCodes: ["OPO"],         bookingDestId: -2174884 },
  // Switzerland
  { countryIso: "CH", slug: "zurich",      name: "Zurich",      lat: 47.3769, lng:  8.5417, tier: "1", population: 415_000,    airportCodes: ["ZRH"],         bookingDestId: -2554866 },
  { countryIso: "CH", slug: "geneva",      name: "Geneva",      lat: 46.2044, lng:  6.1432, tier: "1", population: 200_000,    airportCodes: ["GVA"],         bookingDestId: -2548602 },
  { countryIso: "CH", slug: "lucerne",     name: "Lucerne",     lat: 47.0502, lng:  8.3093, tier: "2", population: 82_000,     airportCodes: ["ZRH"],         bookingDestId: -2549770 },
  // Austria
  { countryIso: "AT", slug: "vienna",      name: "Vienna",      lat: 48.2082, lng: 16.3738, tier: "1", population: 1_950_000,  airportCodes: ["VIE"],         bookingDestId: -1995499 },
  { countryIso: "AT", slug: "salzburg",    name: "Salzburg",    lat: 47.8095, lng: 13.0550, tier: "1", population: 155_000,    airportCodes: ["SZG"],         bookingDestId: -1991765 },
  { countryIso: "AT", slug: "innsbruck",   name: "Innsbruck",   lat: 47.2692, lng: 11.4041, tier: "2", population: 132_000,    airportCodes: ["INN"],         bookingDestId: -1989166 },
  // Belgium
  { countryIso: "BE", slug: "brussels",    name: "Brussels",    lat: 50.8503, lng:  4.3517, tier: "1", population: 1_220_000,  airportCodes: ["BRU","CRL"],   bookingDestId: -1955860 },
  { countryIso: "BE", slug: "bruges",      name: "Bruges",      lat: 51.2093, lng:  3.2247, tier: "1", population: 118_000,    airportCodes: ["BRU"],         bookingDestId: -1955684 },
  { countryIso: "BE", slug: "ghent",       name: "Ghent",       lat: 51.0543, lng:  3.7174, tier: "2", population: 263_000,    airportCodes: ["BRU"],         bookingDestId: -1956611 },
  { countryIso: "BE", slug: "antwerp",     name: "Antwerp",     lat: 51.2194, lng:  4.4025, tier: "2", population: 530_000,    airportCodes: ["ANR","BRU"],   bookingDestId: -1955536 },
  // Denmark
  { countryIso: "DK", slug: "copenhagen",  name: "Copenhagen",  lat: 55.6761, lng: 12.5683, tier: "1", population: 660_000,    airportCodes: ["CPH"],         bookingDestId: -2745636 },
  { countryIso: "DK", slug: "aarhus",      name: "Aarhus",      lat: 56.1629, lng: 10.2039, tier: "2", population: 285_000,    airportCodes: ["AAR"],         bookingDestId: -2745476 },
  // Sweden
  { countryIso: "SE", slug: "stockholm",   name: "Stockholm",   lat: 59.3293, lng: 18.0686, tier: "1", population: 980_000,    airportCodes: ["ARN","BMA"],   bookingDestId: -2710422 },
  { countryIso: "SE", slug: "gothenburg",  name: "Gothenburg",  lat: 57.7089, lng: 11.9746, tier: "2", population: 583_000,    airportCodes: ["GOT"],         bookingDestId: -2697453 },
  { countryIso: "SE", slug: "malmo",       name: "Malmö",       lat: 55.6050, lng: 13.0038, tier: "2", population: 350_000,    airportCodes: ["MMX","CPH"],   bookingDestId: -2705349 },
  // Norway
  { countryIso: "NO", slug: "oslo",        name: "Oslo",        lat: 59.9139, lng: 10.7522, tier: "1", population: 700_000,    airportCodes: ["OSL"],         bookingDestId: -3232853 },
  { countryIso: "NO", slug: "bergen",      name: "Bergen",      lat: 60.3913, lng:  5.3221, tier: "2", population: 290_000,    airportCodes: ["BGO"],         bookingDestId: -3217090 },
];

async function main() {
  const payload = await getPayload({ config });

  // Countries
  for (const c of COUNTRIES) {
    const existing = await payload.find({
      collection: "countries",
      where: { isoCode: { equals: c.isoCode } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "countries",
        locale: "en",
        data: {
          slug: c.slug,
          isoCode: c.isoCode,
          name: c.name,
          currencyCode: c.currencyCode,
          timezone: c.timezone,
          euMember: c.euMember,
          schengen: c.schengen,
          tier: c.tier,
          population: c.population,
          areaKm2: c.areaKm2,
          metaTitle: c.metaTitle,
          metaDescription: c.metaDescription,
        },
      });
      console.log(`✓ country: ${c.slug}`);
    } else {
      console.log(`· country exists: ${c.slug}`);
    }
  }

  // Cities
  for (const ci of CITIES) {
    const country = await payload.find({
      collection: "countries",
      where: { isoCode: { equals: ci.countryIso } },
      limit: 1,
    });
    if (!country.docs[0]) {
      console.warn(`! country missing for city ${ci.slug}: ${ci.countryIso}`);
      continue;
    }
    const countryId = country.docs[0].id;
    const existing = await payload.find({
      collection: "cities",
      where: {
        and: [{ country: { equals: countryId } }, { slug: { equals: ci.slug } }],
      },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "cities",
        locale: "en",
        data: {
          slug: ci.slug,
          name: ci.name,
          country: countryId,
          lat: ci.lat,
          lng: ci.lng,
          tier: ci.tier,
          population: ci.population,
          airportCodes: ci.airportCodes.map((code) => ({ code })),
          bookingDestId: ci.bookingDestId,
          gygLocationId: ci.gygLocationId,
        },
      });
      console.log(`✓ city: ${ci.slug}`);
    } else {
      console.log(`· city exists: ${ci.slug}`);
    }
  }

  console.log("\nSeeding complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

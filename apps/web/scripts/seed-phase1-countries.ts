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

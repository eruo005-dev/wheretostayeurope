import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Countries } from "./collections/Countries";
import { Cities } from "./collections/Cities";
import { Neighborhoods } from "./collections/Neighborhoods";
import { Pages } from "./collections/Pages";
import { Keywords } from "./collections/Keywords";
import { Media } from "./collections/Media";
import { AuthorProfile } from "./globals/AuthorProfile";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: { meta: { titleSuffix: " - WhereToStayEurope CMS" } },
  collections: [Countries, Cities, Neighborhoods, Pages, Keywords, Media],
  globals: [AuthorProfile],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      // Stub URL during build if DATABASE_URL is missing - prevents adapter
      // construction errors. Real connections only attempted at request time.
      connectionString:
        process.env.DATABASE_URL ??
        "postgresql://stub:stub@127.0.0.1:5432/stub",
    },
  }),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Deutsch", code: "de" },
      { label: "Francais", code: "fr" },
      { label: "Espanol", code: "es" }
    ],
    defaultLocale: "en",
    fallback: true
  },
  secret: process.env.PAYLOAD_SECRET ?? "change-me",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") }
});
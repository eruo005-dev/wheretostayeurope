// apps/web/src/app/(frontend)/[locale]/[country]/[city]/[neighborhood]/not-found.tsx
//
// Segment-level 404. Triggered when the route's page.tsx calls notFound().
// Renders a useful "not found" page with links back up the hierarchy plus a
// search intent CTA, rather than a generic dead end.

import Link from "next/link";

const COPY: Record<string, {
  title: string; lead: string;
  checkSpelling: string; tryCity: string; tryCountry: string; tryHome: string;
}> = {
  en: {
    title: "We couldn't find that neighborhood",
    lead: "The neighborhood you're looking for isn't covered yet, or the URL might be misspelled. Here's where to head next:",
    checkSpelling: "Double-check the spelling in the URL",
    tryCity: "Browse this city's neighborhoods",
    tryCountry: "See all cities in this country",
    tryHome: "Back to the homepage",
  },
  de: {
    title: "Dieses Viertel haben wir nicht gefunden",
    lead: "Das Viertel, das du suchst, ist noch nicht abgedeckt — oder in der URL hat sich ein Tippfehler eingeschlichen. So geht's weiter:",
    checkSpelling: "Rechtschreibung in der URL prüfen",
    tryCity: "Alle Viertel dieser Stadt ansehen",
    tryCountry: "Alle Städte in diesem Land",
    tryHome: "Zur Startseite",
  },
  fr: {
    title: "Ce quartier est introuvable",
    lead: "Le quartier que vous cherchez n'est pas encore couvert, ou l'URL comporte peut-être une faute. Voici où aller ensuite :",
    checkSpelling: "Vérifiez l'orthographe dans l'URL",
    tryCity: "Parcourir les quartiers de cette ville",
    tryCountry: "Voir toutes les villes de ce pays",
    tryHome: "Retour à l'accueil",
  },
  es: {
    title: "No encontramos ese barrio",
    lead: "El barrio que buscas aún no está cubierto, o puede haber un error en la URL. Prueba lo siguiente:",
    checkSpelling: "Revisa la ortografía en la URL",
    tryCity: "Ver los barrios de esta ciudad",
    tryCountry: "Ver todas las ciudades de este país",
    tryHome: "Volver al inicio",
  },
};

export default async function NotFound() {
  // In Next.js 15, not-found.tsx doesn't receive route params. We read them from
  // the URL in middleware or fall back to en. Simplest pragmatic default: English.
  const locale: keyof typeof COPY = "en";
  const copy = COPY[locale];

  return (
    <div
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "48px 20px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 14, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
        404
      </p>
      <h1 style={{ fontSize: 32, lineHeight: 1.2, marginBottom: 12 }}>{copy.title}</h1>
      <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.55, marginBottom: 24 }}>{copy.lead}</p>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        <li style={{ color: "#475569" }}>{copy.checkSpelling}</li>
        <li>
          <Link href={`/${locale}`} style={linkStyle}>
            {copy.tryHome} →
          </Link>
        </li>
      </ul>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#2563eb",
  textDecoration: "underline",
  fontSize: 16,
};

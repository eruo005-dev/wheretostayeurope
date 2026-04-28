// apps/web/src/lib/data/legal-content.ts
//
// Plain-English legal copy for the footer pages. Multilingual (en, de, fr, es).
// NOT legal advice — Jay should have a lawyer review before launching paid ads
// or operating in regulated markets.

type Locale = "en" | "de" | "fr" | "es";

export type LegalPage = {
  title: string;
  lastUpdated: string;
  html: string;
};

// ============================================================================
// PRIVACY
// ============================================================================
export const PRIVACY: Record<Locale, LegalPage> = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "2026-04-28",
    html: `
<p>This Privacy Policy explains what data wheretostayeurope.com (the "Site") collects, why, and how to exercise your rights under the EU General Data Protection Regulation (GDPR) and the UK Data Protection Act 2018.</p>

<h2>1. Who we are</h2>
<p>The Site is operated by Jay (sole operator) — contact: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>. The Site is hosted on Vercel (USA) with edge regions in Frankfurt, Germany.</p>

<h2>2. What we collect, and the lawful basis</h2>
<ul>
<li><strong>Server logs</strong> (IP address, user agent, requested URL, referrer, timestamp). Lawful basis: <em>legitimate interest</em> (security, debugging, abuse prevention). Retained 30 days.</li>
<li><strong>Privacy-preserving analytics</strong> via Plausible Analytics. We collect aggregated, cookieless page-view data only — no individual user tracking. Lawful basis: <em>legitimate interest</em>.</li>
<li><strong>Newsletter sign-ups</strong>. If you submit your email, we store your address, the locale you signed up in, and the timestamp. Lawful basis: <em>consent</em>. You can unsubscribe at any time.</li>
<li><strong>Cookie preferences</strong> stored in your browser via the Klaro consent manager. Lawful basis: <em>consent</em> (essential cookies are <em>legitimate interest</em>).</li>
</ul>

<h2>3. Cookies and tracking</h2>
<p>The Site uses one essential cookie (<code>klaro</code>) to remember your consent choices. Optional cookies for maps (Mapbox) load only after explicit consent. We do not run advertising trackers, social-media pixels, or Google Analytics. See the <a href="/en/legal/cookies">Cookie Notice</a> for details.</p>

<h2>4. Affiliate links</h2>
<p>Some outbound links to Booking.com, GetYourGuide and other booking partners include an affiliate identifier so we earn a commission if you book through them. Clicking these links does not transmit any personal data from this Site to the partner — the partner's own privacy policy applies once you arrive on their site. See the <a href="/en/legal/disclosure">Affiliate Disclosure</a>.</p>

<h2>5. International transfers</h2>
<p>Vercel (our hosting provider) and Plausible (our analytics provider) operate servers in the EU; non-EU access is governed by the EU Standard Contractual Clauses. We do not sell your data to anyone, ever.</p>

<h2>6. Your rights</h2>
<p>Under GDPR you may: request access to your personal data; request correction or deletion; withdraw consent at any time; object to processing; lodge a complaint with your national data-protection authority. Exercise any of these by emailing <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>.</p>

<h2>7. Changes</h2>
<p>We will post material changes to this policy at the top of this page with an updated "last updated" date.</p>
    `.trim(),
  },
  de: {
    title: "Datenschutzerklärung",
    lastUpdated: "2026-04-28",
    html: `
<p>Diese Datenschutzerklärung erläutert, welche Daten wheretostayeurope.com (die "Website") erhebt und wie Sie Ihre Rechte nach der EU-Datenschutz-Grundverordnung (DSGVO) ausüben können.</p>

<h2>1. Verantwortlicher</h2>
<p>Die Website wird von Jay (Einzelunternehmer) betrieben — Kontakt: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>. Hosting durch Vercel mit Edge-Servern in Frankfurt am Main.</p>

<h2>2. Erhobene Daten und Rechtsgrundlage</h2>
<ul>
<li><strong>Server-Logs</strong> (IP-Adresse, User-Agent, aufgerufene URL, Referrer, Zeitstempel). Rechtsgrundlage: <em>berechtigtes Interesse</em> (Sicherheit, Fehlerdiagnose). Speicherdauer 30 Tage.</li>
<li><strong>Datensparsame Analyse</strong> via Plausible Analytics — nur aggregierte, cookielose Seitenaufrufe. Rechtsgrundlage: <em>berechtigtes Interesse</em>.</li>
<li><strong>Newsletter-Anmeldungen</strong>. Wir speichern E-Mail-Adresse, Sprachauswahl und Zeitstempel. Rechtsgrundlage: <em>Einwilligung</em>. Abmeldung jederzeit möglich.</li>
<li><strong>Cookie-Präferenzen</strong> werden im Browser via Klaro Consent Manager gespeichert.</li>
</ul>

<h2>3. Cookies</h2>
<p>Die Website verwendet ein notwendiges Cookie (<code>klaro</code>) zur Speicherung Ihrer Einwilligung. Optionale Cookies (Mapbox-Karten) werden nur nach ausdrücklicher Einwilligung geladen. Siehe <a href="/de/legal/cookies">Cookie-Hinweis</a>.</p>

<h2>4. Affiliate-Links</h2>
<p>Einige Links zu Buchungspartnern (Booking.com, GetYourGuide u.a.) enthalten eine Affiliate-Kennung. Siehe <a href="/de/legal/disclosure">Affiliate-Hinweis</a>.</p>

<h2>5. Ihre Rechte</h2>
<p>Nach DSGVO haben Sie Recht auf Auskunft, Berichtigung, Löschung, Widerspruch und Beschwerde bei einer Aufsichtsbehörde. Anfragen bitte an <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>.</p>
    `.trim(),
  },
  fr: {
    title: "Politique de confidentialité",
    lastUpdated: "2026-04-28",
    html: `
<p>Cette politique de confidentialité explique quelles données wheretostayeurope.com (le "Site") collecte et comment exercer vos droits au titre du RGPD.</p>

<h2>1. Responsable du traitement</h2>
<p>Le Site est exploité par Jay (entrepreneur individuel) — contact : <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>. Hébergement Vercel avec serveurs edge à Francfort.</p>

<h2>2. Données collectées et base légale</h2>
<ul>
<li><strong>Journaux serveur</strong> (IP, user-agent, URL, referrer, horodatage). Base légale : <em>intérêt légitime</em> (sécurité, débogage). Conservation 30 jours.</li>
<li><strong>Analyses respectueuses de la vie privée</strong> via Plausible Analytics — pages vues agrégées sans cookies. Base légale : <em>intérêt légitime</em>.</li>
<li><strong>Inscriptions newsletter</strong>. E-mail, langue, horodatage. Base légale : <em>consentement</em>.</li>
</ul>

<h2>3. Cookies</h2>
<p>Un cookie technique (<code>klaro</code>) mémorise vos choix de consentement. Voir <a href="/fr/legal/cookies">Avis sur les cookies</a>.</p>

<h2>4. Liens affiliés</h2>
<p>Voir <a href="/fr/legal/disclosure">Divulgation affiliée</a>.</p>

<h2>5. Vos droits</h2>
<p>Au titre du RGPD : accès, rectification, effacement, opposition, réclamation auprès de la CNIL. Demandes : <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>.</p>
    `.trim(),
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "2026-04-28",
    html: `
<p>Esta Política de Privacidad explica qué datos recopila wheretostayeurope.com (el "Sitio") y cómo ejercer sus derechos bajo el RGPD de la UE.</p>

<h2>1. Responsable del tratamiento</h2>
<p>El Sitio es operado por Jay (autónomo) — contacto: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>. Alojamiento por Vercel con servidores edge en Frankfurt.</p>

<h2>2. Datos recopilados y base jurídica</h2>
<ul>
<li><strong>Registros del servidor</strong> (IP, user-agent, URL, referrer, marca de tiempo). Base jurídica: <em>interés legítimo</em>. Conservación 30 días.</li>
<li><strong>Análisis sin cookies</strong> vía Plausible Analytics — solo datos agregados. Base jurídica: <em>interés legítimo</em>.</li>
<li><strong>Suscripciones al boletín</strong>. Email, idioma, marca de tiempo. Base jurídica: <em>consentimiento</em>.</li>
</ul>

<h2>3. Cookies</h2>
<p>Una cookie esencial (<code>klaro</code>) recuerda sus preferencias de consentimiento. Ver <a href="/es/legal/cookies">Aviso de cookies</a>.</p>

<h2>4. Enlaces de afiliados</h2>
<p>Ver <a href="/es/legal/disclosure">Divulgación de afiliados</a>.</p>

<h2>5. Sus derechos</h2>
<p>Bajo el RGPD: acceso, rectificación, supresión, oposición, reclamación ante la AEPD. Solicitudes: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>.</p>
    `.trim(),
  },
};

// ============================================================================
// TERMS
// ============================================================================
export const TERMS: Record<Locale, LegalPage> = {
  en: {
    title: "Terms of Use",
    lastUpdated: "2026-04-28",
    html: `
<p>By accessing wheretostayeurope.com (the "Site") you agree to these terms.</p>

<h2>1. Editorial nature of content</h2>
<p>All content on the Site — country, city, and neighborhood guides; articles; recommendations — is editorial opinion. Recommendations are based on personal judgment, not paid placement. Information may become outdated; always verify with the relevant business or authority before traveling.</p>

<h2>2. No warranty</h2>
<p>Content is provided "as is" without warranty of any kind. We do not guarantee accuracy, completeness, or current relevance. Travel involves inherent risks; you alone are responsible for your travel decisions.</p>

<h2>3. Affiliate links</h2>
<p>The Site contains affiliate links. We may earn a commission when you book or purchase through these links, at no additional cost to you. See the <a href="/en/legal/disclosure">Affiliate Disclosure</a>.</p>

<h2>4. Intellectual property</h2>
<p>All text on the Site is © Jay / wheretostayeurope.com. You may share short quotes (under 50 words) with a clear link back to the source page. Bulk reproduction, scraping, or republication without written permission is prohibited.</p>

<h2>5. Third-party content</h2>
<p>Photos may be sourced from Unsplash, Pexels, or similar services under their respective licenses, or licensed from individual photographers. Map data is © Mapbox / OpenStreetMap contributors.</p>

<h2>6. Liability limitation</h2>
<p>To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from use of the Site or reliance on its content. Nothing here limits any non-waivable consumer rights you have under applicable law.</p>

<h2>7. Governing law</h2>
<p>These terms are governed by the laws of [Jay's country of residence — to be filled in by Jay]. Disputes will be resolved in the competent courts of that jurisdiction.</p>

<h2>8. Changes</h2>
<p>We may update these terms; continued use of the Site after changes are posted constitutes acceptance of the updated terms.</p>
    `.trim(),
  },
  de: {
    title: "Nutzungsbedingungen",
    lastUpdated: "2026-04-28",
    html: `
<p>Mit dem Zugriff auf wheretostayeurope.com (die "Website") erklären Sie sich mit diesen Bedingungen einverstanden.</p>

<h2>1. Redaktioneller Charakter</h2>
<p>Alle Inhalte sind redaktionelle Meinung, nicht bezahlte Empfehlungen. Informationen können veralten; bitte vor der Reise stets verifizieren.</p>

<h2>2. Kein Gewährleistungsanspruch</h2>
<p>Inhalte werden ohne Gewähr bereitgestellt. Sie sind allein verantwortlich für Ihre Reiseentscheidungen.</p>

<h2>3. Affiliate-Links</h2>
<p>Siehe <a href="/de/legal/disclosure">Affiliate-Hinweis</a>.</p>

<h2>4. Urheberrecht</h2>
<p>Alle Texte sind © Jay / wheretostayeurope.com. Kurze Zitate (unter 50 Wörter) mit Quellenlink sind erlaubt; Massenkopien ohne schriftliche Erlaubnis verboten.</p>

<h2>5. Haftung</h2>
<p>Die Haftung ist im gesetzlich zulässigen Rahmen ausgeschlossen.</p>

<h2>6. Geltendes Recht</h2>
<p>Es gilt das Recht des Wohnsitzlandes des Betreibers.</p>
    `.trim(),
  },
  fr: {
    title: "Conditions d'utilisation",
    lastUpdated: "2026-04-28",
    html: `
<p>L'accès à wheretostayeurope.com (le "Site") implique l'acceptation de ces conditions.</p>

<h2>1. Nature éditoriale du contenu</h2>
<p>Tous les contenus sont des opinions éditoriales et non des recommandations rémunérées. Les informations peuvent devenir obsolètes ; vérifier avant le voyage.</p>

<h2>2. Aucune garantie</h2>
<p>Le contenu est fourni "en l'état" sans garantie. Vous êtes seul responsable de vos décisions de voyage.</p>

<h2>3. Liens affiliés</h2>
<p>Voir <a href="/fr/legal/disclosure">Divulgation affiliée</a>.</p>

<h2>4. Propriété intellectuelle</h2>
<p>Tous les textes sont © Jay / wheretostayeurope.com.</p>

<h2>5. Limitation de responsabilité</h2>
<p>Dans la mesure permise par la loi, nous n'assumons aucune responsabilité pour les dommages indirects.</p>
    `.trim(),
  },
  es: {
    title: "Términos de Uso",
    lastUpdated: "2026-04-28",
    html: `
<p>Al acceder a wheretostayeurope.com (el "Sitio") usted acepta estos términos.</p>

<h2>1. Naturaleza editorial del contenido</h2>
<p>Todo el contenido es opinión editorial, no recomendaciones pagadas. La información puede quedar desactualizada; verifique antes de viajar.</p>

<h2>2. Sin garantía</h2>
<p>El contenido se proporciona "tal cual" sin garantía. Usted es el único responsable de sus decisiones de viaje.</p>

<h2>3. Enlaces de afiliados</h2>
<p>Ver <a href="/es/legal/disclosure">Divulgación de afiliados</a>.</p>

<h2>4. Propiedad intelectual</h2>
<p>Todos los textos son © Jay / wheretostayeurope.com.</p>

<h2>5. Limitación de responsabilidad</h2>
<p>Dentro de lo permitido por la ley, no nos responsabilizamos por daños indirectos.</p>
    `.trim(),
  },
};

// ============================================================================
// AFFILIATE DISCLOSURE
// ============================================================================
export const DISCLOSURE: Record<Locale, LegalPage> = {
  en: {
    title: "Affiliate Disclosure",
    lastUpdated: "2026-04-28",
    html: `
<h2>The short version</h2>
<p><strong>Some links on this site are affiliate links.</strong> If you book a hotel through a Booking.com link or a tour through GetYourGuide, the operator earns a small commission at no additional cost to you. We never accept payment in exchange for a recommendation, and recommendations would not change if commissions disappeared tomorrow.</p>

<h2>Why this disclosure exists</h2>
<p>FTC, EU consumer-protection, and ASA (UK) rules require commercial relationships with linked partners to be disclosed prominently. We disclose at three levels: a banner on every page that contains affiliate links; a small disclosure block within the article body; and this dedicated page.</p>

<h2>What we earn</h2>
<p>Booking.com pays the operator a percentage of the property's commission (typically 25-40%) on completed stays. GetYourGuide pays a percentage of activity bookings. We do not earn anything if you cancel.</p>

<h2>What this changes about our recommendations</h2>
<p><strong>Nothing.</strong> Recommendations are based on:</p>
<ol>
<li>Personal experience where possible.</li>
<li>Verified reviews on Booking.com (minimum 8.0 review score and 50+ reviews).</li>
<li>Independent editorial judgment about neighborhoods, locations, and trip-type fit.</li>
</ol>
<p>We do not rank by commission rate. We are happy to recommend a property that pays no commission to us if it's the right answer to your question.</p>

<h2>Questions</h2>
<p>If you ever feel a recommendation seems commercially motivated, please email <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a> and we will review.</p>
    `.trim(),
  },
  de: {
    title: "Affiliate-Hinweis",
    lastUpdated: "2026-04-28",
    html: `
<h2>Die Kurzfassung</h2>
<p><strong>Einige Links auf dieser Website sind Affiliate-Links.</strong> Wenn Sie ein Hotel über Booking.com oder eine Tour über GetYourGuide buchen, erhält der Betreiber eine geringe Provision — ohne zusätzliche Kosten für Sie.</p>

<h2>Warum wir das offenlegen</h2>
<p>EU-Verbraucherschutzbestimmungen verlangen die Offenlegung kommerzieller Beziehungen.</p>

<h2>Was sich an unseren Empfehlungen ändert</h2>
<p><strong>Nichts.</strong> Empfehlungen basieren auf persönlicher Erfahrung, geprüften Bewertungen und redaktionellem Urteil — nie auf Provisionssatz.</p>

<h2>Fragen?</h2>
<p><a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a></p>
    `.trim(),
  },
  fr: {
    title: "Divulgation affiliée",
    lastUpdated: "2026-04-28",
    html: `
<h2>En résumé</h2>
<p><strong>Certains liens sur ce site sont des liens affiliés.</strong> Si vous réservez via Booking.com ou GetYourGuide, l'opérateur perçoit une petite commission — sans coût supplémentaire pour vous.</p>

<h2>Pourquoi cette divulgation</h2>
<p>La législation européenne sur la protection des consommateurs exige la divulgation des relations commerciales.</p>

<h2>Ce que cela change à nos recommandations</h2>
<p><strong>Rien.</strong> Les recommandations reposent sur l'expérience personnelle, les avis vérifiés et le jugement éditorial — jamais sur le taux de commission.</p>

<h2>Questions ?</h2>
<p><a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a></p>
    `.trim(),
  },
  es: {
    title: "Divulgación de Afiliados",
    lastUpdated: "2026-04-28",
    html: `
<h2>La versión corta</h2>
<p><strong>Algunos enlaces de este sitio son enlaces de afiliados.</strong> Si reserva a través de Booking.com o GetYourGuide, el operador recibe una pequeña comisión — sin costo adicional para usted.</p>

<h2>Por qué esta divulgación</h2>
<p>La normativa europea de protección al consumidor exige la divulgación de relaciones comerciales.</p>

<h2>Qué cambia en nuestras recomendaciones</h2>
<p><strong>Nada.</strong> Las recomendaciones se basan en experiencia personal, reseñas verificadas y criterio editorial — nunca en la tasa de comisión.</p>

<h2>¿Preguntas?</h2>
<p><a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a></p>
    `.trim(),
  },
};

// ============================================================================
// COOKIES
// ============================================================================
export const COOKIES: Record<Locale, LegalPage> = {
  en: {
    title: "Cookie Notice",
    lastUpdated: "2026-04-28",
    html: `
<p>This notice explains the cookies and similar technologies used on wheretostayeurope.com.</p>

<h2>What is a cookie?</h2>
<p>A cookie is a small text file stored in your browser that helps a website remember things between visits — your language preference, your consent choices, whether you're signed in.</p>

<h2>Cookies on this site</h2>

<h3>Essential (always active)</h3>
<ul>
<li><strong>klaro</strong> — stores your consent preferences. Set by the Klaro consent manager. First-party. Expires after 12 months.</li>
</ul>

<h3>Optional (loaded only after consent)</h3>
<ul>
<li><strong>Mapbox map tiles</strong> — when you accept "maps", Mapbox loads tile images and may set its own functional cookies for smooth panning. Required for the interactive city maps. Mapbox privacy policy: <a href="https://www.mapbox.com/legal/privacy" target="_blank" rel="noopener">mapbox.com/legal/privacy</a></li>
</ul>

<h3>What we DON'T use</h3>
<ul>
<li>No Google Analytics, Adobe Analytics, or similar tracking analytics.</li>
<li>No Facebook Pixel, TikTok Pixel, or other social-media tracking.</li>
<li>No advertising cookies.</li>
<li>No cross-site tracking of any kind.</li>
</ul>

<h2>Managing your preferences</h2>
<p>You can change your cookie preferences at any time using the "Cookie preferences" link in the footer of every page. To delete cookies entirely, use your browser's settings.</p>

<h2>Analytics — privacy-preserving</h2>
<p>We use Plausible Analytics, which provides aggregate page-view statistics without individual tracking and without setting cookies. No personal data is collected.</p>
    `.trim(),
  },
  de: {
    title: "Cookie-Hinweis",
    lastUpdated: "2026-04-28",
    html: `
<p>Dieser Hinweis erläutert die auf wheretostayeurope.com verwendeten Cookies.</p>

<h2>Cookies auf dieser Website</h2>

<h3>Notwendig (immer aktiv)</h3>
<ul>
<li><strong>klaro</strong> — speichert Ihre Einwilligungseinstellungen. Erstanbieter-Cookie, 12 Monate Laufzeit.</li>
</ul>

<h3>Optional (nur nach Einwilligung)</h3>
<ul>
<li><strong>Mapbox-Kartenkacheln</strong> — bei Einwilligung in "Karten" lädt Mapbox die Karten und setzt eigene funktionale Cookies. Erforderlich für interaktive Stadtkarten.</li>
</ul>

<h3>Was wir NICHT verwenden</h3>
<ul>
<li>Kein Google Analytics, kein Facebook Pixel, keine Werbe-Cookies, kein Tracking über Websites hinweg.</li>
</ul>

<h2>Einstellungen verwalten</h2>
<p>Sie können Ihre Einstellungen jederzeit über "Cookie-Einstellungen" im Footer ändern.</p>
    `.trim(),
  },
  fr: {
    title: "Avis sur les cookies",
    lastUpdated: "2026-04-28",
    html: `
<p>Cet avis explique les cookies utilisés sur wheretostayeurope.com.</p>

<h2>Cookies sur ce site</h2>

<h3>Essentiels (toujours actifs)</h3>
<ul>
<li><strong>klaro</strong> — mémorise vos préférences de consentement. Cookie tiers, 12 mois.</li>
</ul>

<h3>Optionnels (chargés après consentement)</h3>
<ul>
<li><strong>Tuiles Mapbox</strong> — Mapbox charge les cartes et peut définir ses propres cookies fonctionnels.</li>
</ul>

<h3>Ce que nous N'utilisons PAS</h3>
<ul>
<li>Pas de Google Analytics, pas de pixel Facebook, pas de cookies publicitaires, pas de suivi inter-sites.</li>
</ul>

<h2>Gérer vos préférences</h2>
<p>Modifiez vos préférences à tout moment via "Préférences cookies" dans le pied de page.</p>
    `.trim(),
  },
  es: {
    title: "Aviso de Cookies",
    lastUpdated: "2026-04-28",
    html: `
<p>Este aviso explica las cookies utilizadas en wheretostayeurope.com.</p>

<h2>Cookies en este sitio</h2>

<h3>Esenciales (siempre activas)</h3>
<ul>
<li><strong>klaro</strong> — almacena sus preferencias de consentimiento. Cookie propia, 12 meses.</li>
</ul>

<h3>Opcionales (solo tras consentimiento)</h3>
<ul>
<li><strong>Mosaicos de Mapbox</strong> — Mapbox carga los mapas y puede establecer sus propias cookies funcionales.</li>
</ul>

<h3>Lo que NO usamos</h3>
<ul>
<li>Ni Google Analytics, ni píxel de Facebook, ni cookies publicitarias, ni seguimiento entre sitios.</li>
</ul>

<h2>Gestionar sus preferencias</h2>
<p>Modifique sus preferencias en cualquier momento con "Preferencias de cookies" en el pie de página.</p>
    `.trim(),
  },
};

// ============================================================================
// IMPRESSUM (legal-entity disclosure — required in DE/AT/CH)
// ============================================================================
export const IMPRESSUM: Record<Locale, LegalPage> = {
  en: {
    title: "Impressum / Legal Notice",
    lastUpdated: "2026-04-28",
    html: `
<p>Required disclosure under § 5 TMG (Germany), § 25 MedienG (Austria), and § 5 ECG (Switzerland).</p>

<h2>Operator</h2>
<p>
Jay (sole operator)<br/>
[Address — to be filled in by operator before launch in DACH markets]<br/>
Email: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>
</p>

<h2>Responsible for content under § 55 RStV</h2>
<p>Jay (address as above)</p>

<h2>EU Online Dispute Resolution</h2>
<p>The European Commission provides a platform for online dispute resolution: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>. We are not obliged or willing to participate in dispute-resolution proceedings before a consumer arbitration board.</p>

<h2>Liability for content</h2>
<p>As a service provider, we are responsible for our own content under general law. We are not obliged to monitor third-party information transmitted or stored. Liability for any infringing content begins from the date we obtain knowledge of a specific infringement; such content will be removed promptly.</p>

<h2>Liability for links</h2>
<p>External links are checked at the time of linking. We have no influence on the future content of linked sites and accept no liability for them. Specific infringements will be removed upon notice.</p>

<h2>Copyright</h2>
<p>All content created by the operator is subject to copyright. Reproduction, modification, distribution or any kind of use beyond what is permitted by copyright law requires written consent of the operator.</p>
    `.trim(),
  },
  de: {
    title: "Impressum",
    lastUpdated: "2026-04-28",
    html: `
<p>Angaben gemäß § 5 TMG.</p>

<h2>Betreiber</h2>
<p>
Jay (Einzelunternehmer)<br/>
[Anschrift — vor Marktstart im DACH-Raum vom Betreiber einzutragen]<br/>
E-Mail: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>
</p>

<h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
<p>Jay (Anschrift wie oben)</p>

<h2>EU-Streitschlichtung</h2>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

<h2>Haftung für Inhalte</h2>
<p>Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Wir sind nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Bei Bekanntwerden konkreter Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

<h2>Haftung für Links</h2>
<p>Externe Links werden zum Zeitpunkt der Verlinkung geprüft. Auf die zukünftige Gestaltung haben wir keinen Einfluss; eine ständige inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.</p>

<h2>Urheberrecht</h2>
<p>Vom Betreiber erstellte Inhalte unterliegen dem Urheberrecht. Vervielfältigung, Bearbeitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des Betreibers.</p>
    `.trim(),
  },
  fr: {
    title: "Mentions légales",
    lastUpdated: "2026-04-28",
    html: `
<p>Conformément à la loi française pour la confiance dans l'économie numérique (LCEN).</p>

<h2>Éditeur</h2>
<p>
Jay (entrepreneur individuel)<br/>
[Adresse à renseigner par l'opérateur avant lancement commercial en France]<br/>
E-mail : <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>
</p>

<h2>Hébergeur</h2>
<p>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — avec serveurs edge à Francfort, Allemagne.</p>

<h2>Médiateur de la consommation</h2>
<p>Conformément à l'article L.616-1 du Code de la consommation, vous pouvez recourir gratuitement au service de médiation pour tout litige.</p>
    `.trim(),
  },
  es: {
    title: "Aviso Legal",
    lastUpdated: "2026-04-28",
    html: `
<p>Información en cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE).</p>

<h2>Titular</h2>
<p>
Jay (autónomo)<br/>
[Dirección a completar por el operador antes del lanzamiento comercial en España]<br/>
Email: <a href="mailto:contact@wheretostayeurope.com">contact@wheretostayeurope.com</a>
</p>

<h2>Alojamiento</h2>
<p>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — con servidores edge en Frankfurt, Alemania.</p>

<h2>Resolución de litigios en línea</h2>
<p>La Comisión Europea proporciona una plataforma de resolución de litigios en línea: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.</p>
    `.trim(),
  },
};

export const LEGAL_PAGES = {
  privacy: PRIVACY,
  terms: TERMS,
  disclosure: DISCLOSURE,
  cookies: COOKIES,
  impressum: IMPRESSUM,
} as const;

export type LegalSlug = keyof typeof LEGAL_PAGES;

export function getLegalPage(slug: LegalSlug, locale: Locale): LegalPage | undefined {
  return LEGAL_PAGES[slug]?.[locale] ?? LEGAL_PAGES[slug]?.en;
}

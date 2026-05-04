// apps/web/src/components/affiliate/TravelpayoutsDrive.tsx
//
// Travelpayouts "Drive" tracking script. Loaded on every page so cross-page
// affiliate clicks attribute correctly back to the WhereToStayEurope project.
//
// Project: 525153 (Wheretostayeurope.com). The base64 prefix `NTI1MTUz` in the
// script URL decodes to that ID; the `t=` query param matches.
//
// Privacy: this script sets first-party tracking cookies on `emrldtp.com` and
// is therefore gated behind the Klaro `affiliate` consent category. Consent
// denied → script never loads, the page renders with zero TP cookies.
//
// IMPLEMENTATION NOTE: We render a raw <script async> rather than next/script's
// <Script>. The <Script> component would invite us to attach an onLoad/onError
// handler — those are functions, and passing them as props from a Server
// Component to a Client Component throws "Event handlers cannot be passed to
// Client Component props" at render time. Raw <script> in a Server Component
// renders directly into the HTML; the browser fetches and executes it without
// any RSC serialization step.

import { getConsent } from "@/lib/consent";

const DRIVE_PROJECT_ID = process.env.TRAVELPAYOUTS_MARKER ?? "525153";

/** Base64-encoded project ID embedded in the script URL by Travelpayouts. */
function encodeProjectId(id: string): string {
  // Node 18+ has Buffer; this runs at request time on the server.
  return Buffer.from(id, "utf8").toString("base64").replace(/=+$/, "");
}

export async function TravelpayoutsDrive() {
  const consent = await getConsent();
  if (!consent.affiliate) return null;

  const encoded = encodeProjectId(DRIVE_PROJECT_ID);
  const src = `https://emrldtp.com/${encoded}.js?t=${DRIVE_PROJECT_ID}`;

  return <script async src={src} />;
}

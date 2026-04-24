// apps/web/src/components/legal/ConsentProvider.tsx
//
// Client component that mounts Klaro, listens for consent changes, and exposes
// a `useConsent()` hook + an imperative `openConsentModal()` helper.
//
// Place inside <body> in the root layout.tsx, ABOVE <main>. Klaro expects a DOM
// target element (id="klaro"); we render it here.
//
// Server components read consent from the cookie directly (see lib/consent.ts).
// This client provider is only needed for client-side conditional rendering
// (e.g. re-rendering the map when the user changes preference mid-session).

"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { klaroConfig } from "@/lib/klaro-config";

type ConsentState = {
  maps: boolean;
  affiliate: boolean;
  analytics: boolean;
};

type ConsentContextValue = ConsentState & {
  openConsentModal: () => void;
  hasInitialized: boolean;
};

const DEFAULT: ConsentState = { maps: false, affiliate: false, analytics: false };

const ConsentContext = createContext<ConsentContextValue>({
  ...DEFAULT,
  openConsentModal: () => {},
  hasInitialized: false,
});

export function useConsent() {
  return useContext(ConsentContext);
}

type KlaroManager = {
  updated: () => void;
  watch: (watcher: { update: (obj: unknown, name: string, data: unknown) => void }) => void;
  getConsent: (name: string) => boolean;
  show: () => void;
};

type KlaroGlobal = {
  setup: (config: unknown) => void;
  getManager: (config: unknown) => KlaroManager;
  show: (config?: unknown) => void;
};

declare global {
  interface Window {
    klaro?: KlaroGlobal;
    klaroConfig?: unknown;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>(DEFAULT);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const klaro = (await import("klaro/dist/klaro-no-css")) as unknown as KlaroGlobal;
        if (cancelled) return;
        window.klaro = klaro;
        window.klaroConfig = klaroConfig;

        klaro.setup(klaroConfig);
        const manager = klaro.getManager(klaroConfig);

        const syncFromManager = () => {
          setState({
            maps: manager.getConsent("maps"),
            affiliate: manager.getConsent("affiliate"),
            analytics: false, // Plausible is cookie-free; always false here
          });
          setHasInitialized(true);
        };

        manager.watch({
          update: () => syncFromManager(),
        });

        syncFromManager();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[ConsentProvider] failed to init Klaro:", err);
        setHasInitialized(true); // don't block render forever
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const openConsentModal = () => {
    window.klaro?.show?.(klaroConfig);
  };

  return (
    <>
      <div id="klaro" />
      <ConsentContext.Provider value={{ ...state, openConsentModal, hasInitialized }}>
        {children}
      </ConsentContext.Provider>
    </>
  );
}

/** Button suitable for the footer "Cookie Preferences" link. */
export function ConsentPreferencesButton({ children }: { children?: ReactNode }) {
  const { openConsentModal } = useConsent();
  return (
    <button
      type="button"
      onClick={openConsentModal}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        color: "inherit",
        textDecoration: "underline",
        cursor: "pointer",
        font: "inherit",
      }}
    >
      {children ?? "Cookie preferences"}
    </button>
  );
}

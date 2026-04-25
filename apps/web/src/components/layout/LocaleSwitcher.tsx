// apps/web/src/components/layout/LocaleSwitcher.tsx

"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

const LOCALES = [
  { code: "en", label: "EN", full: "English" },
  { code: "de", label: "DE", full: "Deutsch" },
  { code: "fr", label: "FR", full: "Français" },
  { code: "es", label: "ES", full: "Español" },
] as const;

type Locale = (typeof LOCALES)[number]["code"];

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const params = useParams();

  function switchLocale(next: Locale) {
    if (next === currentLocale) return;
    // Replace the locale segment in the path. First segment after "/" is locale.
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] && LOCALES.some((l) => l.code === parts[0])) {
      parts[0] = next;
    } else {
      parts.unshift(next);
    }
    router.push(`/${parts.join("/")}`);
  }

  return (
    <div style={{ display: "inline-flex", gap: 4, alignItems: "center", fontSize: 14 }} role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchLocale(l.code)}
          aria-pressed={currentLocale === l.code}
          aria-label={l.full}
          style={{
            padding: "4px 8px",
            borderRadius: 4,
            border: "none",
            background: currentLocale === l.code ? "#0f172a" : "transparent",
            color: currentLocale === l.code ? "#fff" : "#64748b",
            cursor: "pointer",
            fontWeight: currentLocale === l.code ? 600 : 400,
            fontSize: 13,
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

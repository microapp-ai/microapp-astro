/**
 * LanguageSwitcher.tsx — Language selector island
 *
 * Reads the current URL, strips the locale prefix, and offers links to all
 * supported locales for the same page.
 *
 * Renders in two modes:
 *   mode="dropdown"  — compact globe button + popover (desktop nav)
 *   mode="list"      — full list of language options (mobile drawer)
 */
import { useState, useEffect, useRef } from "react";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "../i18n/config";
import { stripLocale, localizeUrl } from "../i18n/utils";

interface Props {
  currentLang: Locale;
  mode?: "dropdown" | "list";
  /** Called after the user selects a language (for closing mobile drawer) */
  onSelect?: () => void;
}

export default function LanguageSwitcher({ currentLang, mode = "dropdown", onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Build the URL for each locale based on the current pathname
  function getLocaleUrl(locale: Locale): string {
    if (typeof window === "undefined") return "/";
    const clean = stripLocale(window.location.pathname);
    return localizeUrl(clean, locale);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    if (mode !== "dropdown") return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mode]);

  const localeEntries = Object.entries(LOCALES) as [Locale, typeof LOCALES[Locale]][];

  if (mode === "list") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {localeEntries.map(([code, info]) => {
          const isCurrent = code === currentLang;
          return (
            <a
              key={code}
              href={getLocaleUrl(code)}
              onClick={onSelect}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 0.75rem",
                borderRadius: "0.75rem",
                background: isCurrent ? "#E8F5EE" : "transparent",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                fontWeight: isCurrent ? 600 : 400,
                color: isCurrent ? "#1B6B45" : "#374151",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{info.flag}</span>
              <span style={{ flex: 1 }}>{info.nativeName}</span>
              {isCurrent && (
                <svg width="14" height="14" fill="none" stroke="#1B6B45" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </a>
          );
        })}
      </div>
    );
  }

  // Dropdown mode
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        id="lang-btn"
        onClick={() => setOpen(v => !v)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.375rem 0.625rem",
          borderRadius: "0.625rem",
          border: "1px solid #E5E7EB",
          background: "white",
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#374151",
          transition: "border-color 0.15s, background 0.15s",
        }}
      >
        <span style={{ fontSize: "1rem" }}>{LOCALES[currentLang].flag}</span>
        <span>{LOCALES[currentLang].nativeName}</span>
        <svg
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 0.5rem)",
            width: "220px",
            background: "white",
            border: "1px solid #E5E7EB",
            borderRadius: "1rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
            padding: "0.5rem",
            zIndex: 200,
          }}
        >
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#9CA3AF",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0.25rem 0.5rem 0.5rem",
            margin: 0,
          }}>
            Language
          </p>
          {localeEntries.map(([code, info]) => {
            const isCurrent = code === currentLang;
            return (
              <a
                key={code}
                href={getLocaleUrl(code)}
                role="option"
                aria-selected={isCurrent}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.5rem 0.625rem",
                  borderRadius: "0.625rem",
                  background: isCurrent ? "#E8F5EE" : "transparent",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: isCurrent ? 600 : 400,
                  color: isCurrent ? "#1B6B45" : "#374151",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{info.flag}</span>
                <span style={{ flex: 1 }}>{info.nativeName}</span>
                <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{code.toUpperCase()}</span>
                {isCurrent && (
                  <svg width="13" height="13" fill="none" stroke="#1B6B45" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * useVisitorHash
 * Returns a stable, anonymous visitor identifier stored in localStorage.
 * This is NOT a tracking cookie — it is used purely to prevent duplicate
 * ratings from the same browser session and is never tied to PII.
 */
import { useState, useEffect } from "react";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const STORAGE_KEY = "microapp_visitor_id";

export function useVisitorHash(): string {
  const [hash, setHash] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
      const id = generateId();
      localStorage.setItem(STORAGE_KEY, id);
      return id;
    } catch {
      return generateId();
    }
  });

  return hash;
}

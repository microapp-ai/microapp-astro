/**
 * supabase-browser.ts — Browser-safe Supabase client for client-side auth
 *
 * This file is safe to import from React islands (client:load, client:visible).
 * It uses VITE_SUPABASE_ANON_KEY which is exposed to the browser by Vite.
 *
 * NEVER import supabase.ts (service role key) from client-side code.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  "";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[Supabase Browser] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
    "Auth operations will fail. Set these in your .env file."
  );
}

export const supabaseBrowser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "microapp-auth",
  },
});

export type { User, Session } from "@supabase/supabase-js";

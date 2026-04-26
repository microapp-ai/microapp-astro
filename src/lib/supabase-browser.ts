/**
 * supabase-browser.ts — Browser-safe Supabase client for client-side auth
 *
 * This file is safe to import from React islands (client:load, client:visible).
 * It uses VITE_SUPABASE_ANON_KEY which is exposed to the browser by Vite.
 *
 * The client is created lazily so that importing this file during SSR/prerender
 * does NOT throw even when the env vars are absent in the build environment.
 *
 * NEVER import supabase.ts (service role key) from client-side code.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type { User, Session } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (_client) return _client;

  const url =
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
    (import.meta.env.SUPABASE_URL as string | undefined) ||
    "";

  const key =
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
    (import.meta.env.SUPABASE_ANON_KEY as string | undefined) ||
    "";

  if (!url || !key) {
    console.warn(
      "[Supabase Browser] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
        "Auth operations will fail. Set these in your Cloudflare Pages environment variables."
    );
  }

  _client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "microapp-auth",
    },
  });

  return _client;
}

/**
 * Convenience re-export for code that already uses `supabaseBrowser` directly.
 * This is a getter so the client is still created lazily.
 */
export const supabaseBrowser = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseBrowser() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

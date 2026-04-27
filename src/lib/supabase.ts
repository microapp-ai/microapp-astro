/**
 * supabase.ts — Supabase client for Astro build-time data fetching
 * 
 * In Astro SSG mode, this runs at BUILD TIME on the server.
 * It fetches tool metadata from Supabase to generate static HTML pages.
 * The browser never talks to Supabase directly.
 * 
 * Env vars: Astro uses import.meta.env for both server and client.
 * For server-only (build-time) access, we use the service role key.
 */
import { createClient } from "@supabase/supabase-js";
import type { ToolMetadata } from "./types";

// Astro SSG: these run at build time on the server
// Use SUPABASE_SERVICE_ROLE_KEY for build-time access (server-only, never exposed to browser)
// Fall back to anon key if service role not available
const SUPABASE_URL = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY =
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn(
    "[Supabase] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
    "Build-time tool metadata fetch will fail. " +
    "Set these in your .env file."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Fetch all tool metadata from Supabase at build time.
 * Called by getStaticPaths() in [slug].astro to generate all tool pages.
 */
export async function getAllTools(): Promise<ToolMetadata[]> {
  const { data, error } = await supabase
    .from("tool_metadata")
    .select("*")
    .order("slug", { ascending: true });

  if (error) {
    console.error("[Supabase] Error fetching all tools:", error.message);
    return [];
  }

  return (data || []) as ToolMetadata[];
}

/**
 * Fetch a single tool's metadata by slug at build time.
 */
export async function getToolBySlug(slug: string): Promise<ToolMetadata | null> {
  const { data, error } = await supabase
    .from("tool_metadata")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`[Supabase] Error fetching tool ${slug}:`, error.message);
    return null;
  }

  return data as ToolMetadata;
}

/**
 * Fetch a translated version of a tool's metadata for a given locale.
 * Returns null if no translation exists (caller should fall back to English).
 *
 * Table: tool_metadata_translations
 *   slug TEXT, locale TEXT, label TEXT, short_desc TEXT, title TEXT,
 *   description TEXT, intro TEXT, how_to JSONB, faqs JSONB, keywords TEXT[]
 *
 * Column name mapping:
 *   short_desc → desc   (desc is a reserved word in PostgreSQL)
 *   how_to     → howTo  (snake_case → camelCase for ToolMetadata)
 */
export async function getToolTranslation(
  slug: string,
  locale: string
): Promise<Partial<ToolMetadata> | null> {
  try {
    const { data, error } = await supabase
      .from("tool_metadata_translations")
      .select("slug, locale, label, short_desc, title, description, intro, how_to, faqs, keywords")
      .eq("slug", slug)
      .eq("locale", locale)
      .single();

    if (error || !data) return null;

    // Map DB column names → ToolMetadata field names
    const { short_desc, how_to, ...rest } = data as Record<string, unknown>;
    return {
      ...rest,
      ...(short_desc != null ? { desc: short_desc as string } : {}),
      ...(how_to != null ? { howTo: how_to as string[] } : {}),
    } as Partial<ToolMetadata>;
  } catch {
    // Table doesn't exist yet — return null so caller falls back to English
    return null;
  }
}

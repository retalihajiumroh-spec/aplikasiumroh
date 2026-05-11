export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

/** Used by Pages-router auth helpers + merged dashboard shell code paths. */
export function isSupabaseConfigured(): boolean {
  return hasSupabaseConfig;
}

/** Shape expected by `lib/supabase/browser.ts` (resolved after `./src/*`). */
export function getSupabasePublicEnv(): { url: string; anonKey: string } | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return { url: supabaseUrl, anonKey: supabaseAnonKey };
}

export function assertSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    );
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
}

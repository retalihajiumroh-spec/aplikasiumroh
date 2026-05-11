import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "@/lib/supabase/config";
import { supabaseTimedFetch } from "@/lib/supabase/fetch-with-timeout";

export function getSupabaseBrowser(): SupabaseClient | null {
  const env = getSupabasePublicEnv();
  if (!env) return null;
  return createBrowserClient(env.url, env.anonKey, {
    global: { fetch: supabaseTimedFetch },
  });
}

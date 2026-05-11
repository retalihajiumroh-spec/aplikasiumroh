"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assertSupabaseConfig, getSupabasePublicEnv } from "@/lib/supabase/config";

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = assertSupabaseConfig();

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

let plainBrowserClient: SupabaseClient | null = null;

/** Lightweight browser client for modules that opt out of cookie-backed SSR refresh (e.g. social scheduling demo). */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  const env = getSupabasePublicEnv();
  if (!env) return null;
  if (!plainBrowserClient) {
    plainBrowserClient = createClient(env.url, env.anonKey);
  }
  return plainBrowserClient;
}

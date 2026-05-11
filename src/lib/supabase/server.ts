import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { assertSupabaseConfig } from "@/lib/supabase/config";
import { supabaseTimedFetch } from "@/lib/supabase/fetch-with-timeout";

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = assertSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server Components cannot write cookies; middleware refreshes sessions.
        }
      },
      remove(name: string, options) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // Server Components cannot write cookies; middleware refreshes sessions.
        }
      }
    },
    global: { fetch: supabaseTimedFetch },
  });
}

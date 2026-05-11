import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { assertSupabaseConfig } from "@/lib/supabase/config";

export function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = assertSupabaseConfig();
  const cookieStore = cookies();

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
    }
  });
}

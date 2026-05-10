import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import type { AppRole } from "@/lib/supabase/database.types";
import { dashboardPathForRole } from "@/lib/auth/dashboard-routes";

export async function fetchProfileRole(client: SupabaseClient): Promise<AppRole | null> {
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return null;
  const { data, error } = await client.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (error || !data || typeof data !== "object" || !("role" in data)) return null;
  return data.role as AppRole;
}

export type SignInResult =
  | { kind: "demo"; redirectTo: string }
  | { kind: "live"; redirectTo: string }
  | { kind: "live"; error: string };

export async function signInWithRoleRedirect(
  email: string,
  password: string,
  demoRedirectTo: string,
): Promise<SignInResult> {
  const sb = getSupabaseBrowser();
  if (!sb) {
    return { kind: "demo", redirectTo: demoRedirectTo };
  }
  const { error } = await sb.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (error) {
    return { kind: "live", error: error.message };
  }
  const role = await fetchProfileRole(sb);
  return { kind: "live", redirectTo: dashboardPathForRole(role ?? "jamaah") };
}

export type SignUpResult =
  | { kind: "demo" }
  | { kind: "live"; needsEmailConfirmation: boolean }
  | { kind: "live"; error: string };

export async function signUpWithMetadata(
  email: string,
  password: string,
  metadata: Record<string, string>,
): Promise<SignUpResult> {
  const sb = getSupabaseBrowser();
  if (!sb) {
    return { kind: "demo" };
  }
  const { data, error } = await sb.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { data: metadata },
  });
  if (error) {
    return { kind: "live", error: error.message };
  }
  return { kind: "live", needsEmailConfirmation: !data.session };
}

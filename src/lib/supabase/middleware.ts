import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { hasSupabaseConfig, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";
import { dashboardPathForRole } from "@/lib/auth/dashboard-routes";
import { isDashboardPathAllowedForRole, normalizeRole } from "@/lib/auth/role-access";
import type { AppRole } from "@/lib/supabase/database.types";

const protectedRoutes = ["/dashboard"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request
  });

  if (!hasSupabaseConfig || !supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ request });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({ request });
        response.cookies.set({ name, value: "", ...options });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtected && user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role =
      profile && typeof profile === "object" && "role" in profile && typeof (profile as { role: string }).role === "string"
        ? normalizeRole((profile as { role: AppRole }).role)
        : normalizeRole("jamaah_free");

    if (!isDashboardPathAllowedForRole(role, request.nextUrl.pathname)) {
      const nextPath = dashboardPathForRole(role);
      if (nextPath !== request.nextUrl.pathname) {
        const deniedUrl = request.nextUrl.clone();
        deniedUrl.pathname = nextPath;
        deniedUrl.searchParams.set("denied", "1");
        return NextResponse.redirect(deniedUrl);
      }
    }
  }

  return response;
}

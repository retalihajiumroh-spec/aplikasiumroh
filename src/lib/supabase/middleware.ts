import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { hasSupabaseConfig, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";
import { supabaseTimedFetch } from "@/lib/supabase/fetch-with-timeout";

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
    },
    global: { fetch: supabaseTimedFetch },
  });

  let user: Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"] = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    return response;
  }

  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

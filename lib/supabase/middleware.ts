import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicEnv } from "@/lib/supabase/config";
import type { CookieToSet } from "@/lib/supabase/cookie-types";

/**
 * Refreshes the auth session and returns the response with updated cookies.
 * Optionally redirects unauthenticated users away from `protectedPrefix`.
 */
export async function handleAuthMiddleware(
  request: NextRequest,
  options?: { protectedPrefix?: string; loginPath?: string },
): Promise<NextResponse> {
  const env = getSupabasePublicEnv();
  if (!env) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const prefix = options?.protectedPrefix;
  const loginPath = options?.loginPath ?? "/login";
  if (prefix && request.nextUrl.pathname.startsWith(prefix) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

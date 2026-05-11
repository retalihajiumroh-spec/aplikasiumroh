import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

/**
 * Hanya jalankan middleware di area yang butuh auth Supabase.
 * Matcher global membuat *setiap* navigasi (termasuk `/`) menunggu `getUser()` — dev terasa sangat lambat.
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};

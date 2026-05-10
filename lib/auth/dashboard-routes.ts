import type { AppRole } from "@/lib/supabase/database.types";

export function dashboardPathForRole(role: AppRole | string | undefined | null): string {
  switch (role) {
    case "mitra":
      return "/dashboard/reseller";
    case "cabang":
      return "/dashboard";
    case "owner":
      return "/dashboard/owner";
    case "jamaah":
    default:
      return "/dashboard/jamaah-experience";
  }
}

import type { AppRole } from "@/lib/supabase/database.types";
import { normalizeRole } from "@/lib/auth/role-access";

export function dashboardPathForRole(role: AppRole | string | undefined | null): string {
  switch (normalizeRole(role)) {
    case "mitra":
      return "/dashboard/reseller";
    case "cabang":
    case "admin_head_office":
      return "/dashboard";
    case "owner":
      return "/dashboard/owner";
    case "jamaah_pro":
      return "/dashboard/jamaah/pro";
    case "jamaah_free":
    default:
      return "/dashboard/jamaah/free";
  }
}

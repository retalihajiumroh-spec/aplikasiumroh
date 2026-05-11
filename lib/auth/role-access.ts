import type { AppRole } from "@/lib/supabase/database.types";

export type NormalizedRole = Exclude<AppRole, "jamaah">;

export function normalizeRole(role: AppRole | string | null | undefined): NormalizedRole {
  switch (role) {
    case "owner":
    case "admin_head_office":
    case "cabang":
    case "mitra":
    case "jamaah_pro":
    case "jamaah_free":
      return role;
    case "jamaah":
    default:
      return "jamaah_free";
  }
}

export function roleLabel(role: AppRole | string | null | undefined): string {
  switch (normalizeRole(role)) {
    case "owner":
      return "owner";
    case "admin_head_office":
      return "admin head office";
    case "cabang":
      return "cabang";
    case "mitra":
      return "mitra";
    case "jamaah_pro":
      return "jamaah pro";
    case "jamaah_free":
    default:
      return "jamaah free";
  }
}

const OWNER_ADMIN_ALLOW = ["/dashboard"];
const CABANG_ALLOW = [
  "/dashboard",
  "/dashboard/jamaah",
  "/dashboard/jamaah-experience",
  "/dashboard/jamaah/input",
  "/dashboard/paket",
  "/dashboard/booking",
  "/dashboard/pembayaran",
  "/dashboard/dokumen",
  "/dashboard/inventory",
  "/dashboard/departure",
  "/dashboard/reports",
  "/dashboard/tasks",
  "/dashboard/settings",
];
const MITRA_ALLOW = [
  "/dashboard/reseller",
  "/dashboard/campaign",
  "/dashboard/content",
  "/dashboard/community",
  "/dashboard/social-media",
  "/dashboard/settings",
];
const JAMAAH_FREE_ALLOW = ["/dashboard/jamaah/free", "/dashboard/jamaah-experience", "/dashboard/paket", "/dashboard/settings"];
const JAMAAH_PRO_ALLOW = [
  "/dashboard/jamaah/pro",
  "/dashboard/jamaah/free",
  "/dashboard/jamaah-experience",
  "/dashboard/paket",
  "/dashboard/booking",
  "/dashboard/content",
  "/dashboard/community",
  "/dashboard/settings",
];

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isDashboardPathAllowedForRole(role: AppRole | string | null | undefined, pathname: string): boolean {
  const normalized = normalizeRole(role);
  const allow =
    normalized === "owner" || normalized === "admin_head_office"
      ? OWNER_ADMIN_ALLOW
      : normalized === "cabang"
        ? CABANG_ALLOW
        : normalized === "mitra"
          ? MITRA_ALLOW
          : normalized === "jamaah_pro"
            ? JAMAAH_PRO_ALLOW
            : JAMAAH_FREE_ALLOW;

  return allow.some((prefix) => matchesPrefix(pathname, prefix));
}

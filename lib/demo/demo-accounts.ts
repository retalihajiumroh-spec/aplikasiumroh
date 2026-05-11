import type { AppRole } from "@/lib/supabase/database.types";
import { normalizeRole } from "@/lib/auth/role-access";

/** Staging-only demo logins. Buat user ini di Supabase Auth, lalu jalankan SQL di `supabase/demo-profiles.sql`. */
export type DemoAccount = {
  role: AppRole;
  email: string;
  password: string;
  fullName: string;
  loginPath: string;
};

export const DEMO_ACCOUNT_PASSWORD = "SayaDemo2026!";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "owner",
    email: "demo-owner@sayaumroh.local",
    password: DEMO_ACCOUNT_PASSWORD,
    fullName: "Demo Owner",
    loginPath: "/login/head-office",
  },
  {
    role: "admin_head_office",
    email: "demo-admin-ho@sayaumroh.local",
    password: DEMO_ACCOUNT_PASSWORD,
    fullName: "Demo Admin HO",
    loginPath: "/login/head-office",
  },
  {
    role: "cabang",
    email: "demo-cabang@sayaumroh.local",
    password: DEMO_ACCOUNT_PASSWORD,
    fullName: "Demo Cabang Jakarta",
    loginPath: "/login/cabang",
  },
  {
    role: "mitra",
    email: "demo-mitra@sayaumroh.local",
    password: DEMO_ACCOUNT_PASSWORD,
    fullName: "Demo Mitra",
    loginPath: "/login/mitra",
  },
  {
    role: "jamaah_free",
    email: "demo-jamaah-free@sayaumroh.local",
    password: DEMO_ACCOUNT_PASSWORD,
    fullName: "Demo Jamaah Free",
    loginPath: "/login/jamaah-free",
  },
  {
    role: "jamaah_pro",
    email: "demo-jamaah-pro@sayaumroh.local",
    password: DEMO_ACCOUNT_PASSWORD,
    fullName: "Demo Jamaah Pro",
    loginPath: "/login/jamaah-pro",
  },
];

/** Prefer akun yang cocok portal login (expectedRoles). */
export function pickDemoCredentialForPortal(expectedRoles: AppRole[]): Pick<DemoAccount, "email" | "password"> | null {
  if (!expectedRoles.length) return null;
  const normalizedExpected = new Set(expectedRoles.map((r) => normalizeRole(r)));
  const preferred = DEMO_ACCOUNTS.find((a) => normalizedExpected.has(normalizeRole(a.role)));
  return preferred ? { email: preferred.email, password: preferred.password } : null;
}

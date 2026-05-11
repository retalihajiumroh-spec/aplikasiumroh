import { redirect } from "next/navigation";
import { DashboardAppShell } from "@/components/common/dashboard-app-shell";
import type { ShellUser } from "@/components/sidebar";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/supabase/database.types";

const demoUser: ShellUser = {
  displayName: "Admin Demo",
  email: "demo@sayaumroh.id",
  role: "owner",
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return <DashboardAppShell user={demoUser}>{children}</DashboardAppShell>;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <DashboardAppShell user={demoUser}>{children}</DashboardAppShell>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const role: AppRole =
    profile && typeof profile === "object" && "role" in profile && typeof (profile as { role: string }).role === "string"
      ? ((profile as { role: AppRole }).role as AppRole)
      : "jamaah";

  const fullName =
    profile && typeof profile === "object" && "full_name" in profile && typeof (profile as { full_name: string | null }).full_name === "string"
      ? (profile as { full_name: string }).full_name
      : null;

  const shellUser: ShellUser = {
    displayName: fullName?.trim() || user.email?.split("@")[0] || "Pengguna",
    email: user.email,
    role,
  };

  return <DashboardAppShell user={shellUser}>{children}</DashboardAppShell>;
}

import { redirect } from "next/navigation";
import { DashboardAppShell } from "@/components/common/dashboard-app-shell";
import type { ShellUser } from "@/components/sidebar";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/supabase/database.types";
import { DEMO_ACCOUNTS } from "@/lib/demo/demo-accounts";
import { normalizeRole, roleDisplayTitle } from "@/lib/auth/role-access";

const demoOwner = DEMO_ACCOUNTS.find((a) => a.role === "owner") ?? DEMO_ACCOUNTS[0]!;

const demoUser: ShellUser = {
  displayName: demoOwner.fullName,
  email: demoOwner.email,
  role: "owner",
  roleDisplay: roleDisplayTitle("owner"),
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <DashboardAppShell user={demoUser} demoMode>
        {children}
      </DashboardAppShell>
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return (
      <DashboardAppShell user={demoUser} demoMode>
        {children}
      </DashboardAppShell>
    );
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
      : "jamaah_free";

  const fullName =
    profile && typeof profile === "object" && "full_name" in profile && typeof (profile as { full_name: string | null }).full_name === "string"
      ? (profile as { full_name: string }).full_name
      : null;

  const normalizedRole = normalizeRole(role);

  const shellUser: ShellUser = {
    displayName: fullName?.trim() || user.email?.split("@")[0] || "Pengguna",
    email: user.email,
    role: normalizedRole,
    roleDisplay: roleDisplayTitle(normalizedRole),
  };

  return <DashboardAppShell user={shellUser}>{children}</DashboardAppShell>;
}

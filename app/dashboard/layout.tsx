import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseSessionBar } from "@/components/dashboard/supabase-session-bar";
import type { AppRole } from "@/lib/supabase/database.types";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return <>{children}</>;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <>{children}</>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role: AppRole =
    profile && typeof profile === "object" && "role" in profile && typeof (profile as { role: string }).role === "string"
      ? ((profile as { role: AppRole }).role as AppRole)
      : "jamaah";

  return (
    <div className="min-h-dvh">
      <SupabaseSessionBar email={user.email} role={role} />
      {children}
    </div>
  );
}

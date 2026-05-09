import { hasSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { JamaahDashboard } from "@/features/dashboard/jamaah-dashboard";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Dashboard Jamaah"
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let userEmail = "demo@retaliumroh.id";

  if (hasSupabaseConfig) {
    const supabase = createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? userEmail;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {!hasSupabaseConfig ? (
        <Card className="mb-6 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          Supabase belum dikonfigurasi. Dashboard menampilkan data demo sampai environment tersedia.
        </Card>
      ) : null}
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Akun aktif: {userEmail}</p>
      <JamaahDashboard />
    </main>
  );
}

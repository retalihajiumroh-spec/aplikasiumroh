import { ShieldCheck } from "lucide-react";
import { LoginForm } from "@/features/auth/login-form";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Login Jamaah"
};

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="h-4 w-4" />
          Portal aman untuk jamaah
        </span>
        <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Masuk dan pantau semua persiapan umroh dalam satu dashboard.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Kelola dokumen, jadwal manasik, itinerary, dan materi perjalanan dengan akun jamaah Retali Umroh.
        </p>
      </section>

      <Card className="p-6 sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
            Login User
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
            Selamat datang kembali
          </h2>
        </div>
        <LoginForm />
      </Card>
    </main>
  );
}

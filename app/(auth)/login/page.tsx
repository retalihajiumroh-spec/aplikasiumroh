import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Role Login Hub",
};

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-500/20 bg-zinc-600/10 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <ShieldCheck className="h-4 w-4" />
          Login sesuai role
        </span>
        <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Pilih portal login yang sesuai dengan akses Anda.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Owner/admin head office, cabang, mitra, serta jamaah free/pro memiliki halaman login dan akses dashboard
          yang berbeda.
        </p>
      </section>

      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-600 dark:text-zinc-300">Portal Login</p>
          <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">Pilih peran</h2>
        </div>

        <div className="grid gap-3">
          <Link href="/login/head-office" className="rounded-xl border border-zinc-300/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
            Owner / Admin Head Office
          </Link>
          <Link href="/login/cabang" className="rounded-xl border border-zinc-300/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
            Cabang
          </Link>
          <Link href="/login/mitra" className="rounded-xl border border-zinc-300/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
            Mitra
          </Link>
          <Link href="/login/jamaah-free" className="rounded-xl border border-zinc-300/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
            Jamaah Free
          </Link>
          <Link href="/login/jamaah-pro" className="rounded-xl border border-zinc-300/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10">
            Jamaah Pro
          </Link>
        </div>
      </section>
    </main>
  );
}

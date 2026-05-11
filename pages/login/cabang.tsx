import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, type FormEvent } from "react";
import { signInWithRoleRedirect } from "@/lib/auth/session-client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function CabangLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      const em = email.trim().toLowerCase();
      if (!em || !password) {
        setError("Email dan kata sandi wajib diisi.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        setError("Format email tidak valid.");
        return;
      }
      setLoading(true);
      try {
        const demo = "/dashboard";
        const res = await signInWithRoleRedirect(em, password, demo);
        if (res.kind === "live") {
          if ("error" in res) {
            setError(res.error);
            return;
          }
          await router.push(res.redirectTo);
          return;
        }
        await new Promise((r) => setTimeout(r, 400));
        await router.push(res.redirectTo);
      } finally {
        setLoading(false);
      }
    },
    [email, password, router],
  );

  return (
    <>
      <Head>
        <title>Login Cabang | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Masuk ke portal operasional kantor cabang SA'YA Umroh OS." />
      </Head>
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(230, 230, 250, 0.1), transparent 42%), radial-gradient(circle at 85% 50%, rgba(156, 77, 204, 0.1), transparent 40%)",
          }}
        />

        <div className="glass-panel w-full max-w-md rounded-2xl border border-zinc-500/25 p-6 shadow-2xl sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400/85">SA&apos;YA Umroh OS</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-zinc-50">Login Cabang</h1>
          <p className="mt-2 text-center text-sm text-zinc-300/55">Portal staf kantor cabang — jamaah, booking, dan laporan harian.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/45 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                placeholder="staf.cabang@sayaumroh.id"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Kata sandi</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/45 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                placeholder="••••••••"
              />
            </label>

            {error ? (
              <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100/95" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-500/45 bg-gradient-to-r from-zinc-600/20 to-zinc-600/15 py-2.5 text-sm font-semibold text-zinc-50 shadow-lg shadow-zinc-950/30 transition hover:border-zinc-500/65 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Memproses…" : "Masuk"}
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center gap-3 text-center text-sm">
            <Link href="/forgot-password" className="text-zinc-300/95 underline-offset-2 hover:text-zinc-200 hover:underline">
              Lupa kata sandi?
            </Link>
            <p className="text-zinc-300/55">
              Belum punya akun cabang?{" "}
              <Link
                href="/register/cabang"
                className="font-semibold text-zinc-300/95 underline-offset-2 hover:text-zinc-200 hover:underline"
              >
                Daftar cabang
              </Link>
            </p>
          </div>

          <p className="mt-8 border-t border-zinc-600/10 pt-6 text-center text-[11px] text-zinc-600/50">
            {isSupabaseConfigured()
              ? "Supabase aktif: redirect mengikuti peran di profiles."
              : "Mode demo: tanpa Supabase, login simulasi menuju Dashboard."}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          <Link href="/login" className="text-zinc-400/75 transition hover:text-zinc-300">
            Login Jamaah
          </Link>
          <Link href="/login/mitra" className="text-sky-300/80 transition hover:text-sky-200">
            Login Mitra
          </Link>
          <Link href="/" className="text-zinc-400/75 transition hover:text-zinc-300">
            ← Hub
          </Link>
        </div>
      </main>
    </>
  );
}

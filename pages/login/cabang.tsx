import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, type FormEvent } from "react";

export default function CabangLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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
      window.setTimeout(() => {
        setLoading(false);
        void router.push("/dashboard");
      }, 450);
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
              "radial-gradient(circle at 20% 0%, rgba(251, 191, 36, 0.1), transparent 42%), radial-gradient(circle at 85% 50%, rgba(52, 211, 153, 0.1), transparent 40%)",
          }}
        />

        <div className="glass-panel w-full max-w-md rounded-2xl border border-amber-400/25 p-6 shadow-2xl sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/85">SA&apos;YA Umroh OS</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-emerald-50">Login Cabang</h1>
          <p className="mt-2 text-center text-sm text-emerald-200/55">Portal staf kantor cabang — jamaah, booking, dan laporan harian.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-amber-400/45 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                placeholder="staf.cabang@sayaumroh.id"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Kata sandi</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-amber-400/45 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
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
              className="w-full rounded-xl border border-amber-400/45 bg-gradient-to-r from-amber-500/20 to-emerald-600/15 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/30 transition hover:border-amber-400/65 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Memproses…" : "Masuk"}
            </button>
          </form>

          <div className="mt-5 flex flex-col items-center gap-3 text-center text-sm">
            <Link href="/forgot-password" className="text-amber-200/95 underline-offset-2 hover:text-amber-100 hover:underline">
              Lupa kata sandi?
            </Link>
            <p className="text-emerald-200/55">
              Belum punya akun cabang?{" "}
              <Link
                href="/register/cabang"
                className="font-semibold text-amber-200/95 underline-offset-2 hover:text-amber-100 hover:underline"
              >
                Daftar cabang
              </Link>
            </p>
          </div>

          <p className="mt-8 border-t border-emerald-500/10 pt-6 text-center text-[11px] text-emerald-500/50">
            Demo: setelah login Anda akan diarahkan ke Dashboard. Tidak ada autentikasi server.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          <Link href="/login" className="text-emerald-300/75 transition hover:text-emerald-200">
            Login Jamaah
          </Link>
          <Link href="/login/mitra" className="text-sky-300/80 transition hover:text-sky-200">
            Login Mitra
          </Link>
          <Link href="/" className="text-emerald-300/75 transition hover:text-emerald-200">
            ← Hub
          </Link>
        </div>
      </main>
    </>
  );
}

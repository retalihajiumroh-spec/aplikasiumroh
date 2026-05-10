import Head from "next/head";
import Link from "next/link";
import { useCallback, useState, type FormEvent } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const em = email.trim().toLowerCase();
    if (!em) {
      setError("Masukkan email terdaftar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError("Format email tidak valid.");
      return;
    }
    setSent(true);
  }, [email]);

  return (
    <>
      <Head>
        <title>Lupa kata sandi | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Reset kata sandi portal jamaah SA'YA Umroh OS." />
      </Head>
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 22% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 80% 45%, rgba(56, 189, 248, 0.07), transparent 40%)",
          }}
        />

        <div className="glass-panel w-full max-w-md rounded-2xl border border-emerald-500/15 p-6 shadow-2xl sm:p-8">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-emerald-50">Lupa kata sandi</h1>
          <p className="mt-2 text-center text-sm text-emerald-200/55">
            Kami akan mengirim tautan reset ke email Anda (fitur nyata memerlukan backend).
          </p>

          {sent ? (
            <p className="mt-8 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-100/90" role="status">
              Jika email terdaftar, instruksi reset telah dikirim (simulasi).
            </p>
          ) : (
            <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="nama@email.com"
                />
              </label>
              {error ? (
                <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100/95" role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/25 to-teal-600/15 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/30 transition hover:border-emerald-400/55"
              >
                Kirim tautan reset
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm">
            <Link href="/login" className="text-emerald-300/90 underline-offset-2 hover:text-emerald-200 hover:underline">
              ← Kembali ke login
            </Link>
          </p>
        </div>

        <Link href="/" className="mt-8 text-sm text-emerald-300/75 transition hover:text-emerald-200">
          ← Kembali ke hub
        </Link>
      </main>
    </>
  );
}

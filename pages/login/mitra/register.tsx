import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, type FormEvent } from "react";

export default function MitraRegisterPage() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      const c = company.trim();
      const em = email.trim().toLowerCase();
      const ph = phone.trim();
      if (!c || !em || !ph || !password) {
        setError("Nama perusahaan, email, telepon, dan kata sandi wajib diisi.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        setError("Format email tidak valid.");
        return;
      }
      const digits = ph.replace(/\D/g, "");
      if (digits.length < 10) {
        setError("Nomor telepon tidak valid (minimal 10 digit).");
        return;
      }
      if (password.length < 8) {
        setError("Kata sandi minimal 8 karakter.");
        return;
      }
      setLoading(true);
      window.setTimeout(() => {
        setLoading(false);
        void router.push("/login/mitra");
      }, 500);
    },
    [company, email, phone, password, router],
  );

  return (
    <>
      <Head>
        <title>Daftar Mitra | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Registrasi akun mitra SA'YA Umroh OS." />
      </Head>
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.12), transparent 42%), radial-gradient(circle at 85% 48%, rgba(52, 211, 153, 0.09), transparent 40%)",
          }}
        />

        <div className="glass-panel w-full max-w-md rounded-2xl border border-sky-500/20 p-6 shadow-2xl sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/80">SA&apos;YA Umroh OS</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-emerald-50">Registrasi Mitra</h1>
          <p className="mt-2 text-center text-sm text-emerald-200/55">Ajukan akun mitra — tim pusat akan meninjau (simulasi).</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Nama perusahaan / brand</span>
              <input
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-sky-400/40 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="PT / CV / travel"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-sky-400/40 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="mitra@perusahaan.id"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Nomor telepon (WhatsApp)</span>
              <input
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-sky-400/40 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="0812xxxxxxxx"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Kata sandi</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-sky-400/40 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="Minimal 8 karakter"
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
              className="w-full rounded-xl border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-emerald-600/15 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/30 transition hover:border-sky-400/60 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Mengirim…" : "Ajukan pendaftaran"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-emerald-200/55">
            Sudah punya akun?{" "}
            <Link href="/login/mitra" className="font-semibold text-sky-300 underline-offset-2 hover:text-sky-200 hover:underline">
              Login mitra
            </Link>
          </p>

          <p className="mt-6 border-t border-emerald-500/10 pt-5 text-center text-[11px] text-emerald-500/50">
            Simulasi — tidak ada penyimpanan di server. Setelah ajuan Anda diarahkan ke halaman login mitra.
          </p>
        </div>

        <Link href="/" className="mt-8 text-sm text-emerald-300/75 transition hover:text-emerald-200">
          ← Kembali ke hub
        </Link>
      </main>
    </>
  );
}

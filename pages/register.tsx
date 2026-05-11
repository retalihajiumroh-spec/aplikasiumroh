import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, type FormEvent } from "react";
import { signUpWithMetadata } from "@/lib/auth/session-client";

export default function JamaahRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setInfo(null);
      const n = name.trim();
      const em = email.trim().toLowerCase();
      const ph = phone.trim();
      if (!n || !em || !ph || !password) {
        setError("Nama, email, telepon, dan kata sandi wajib diisi.");
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
      try {
        const res = await signUpWithMetadata(em, password, {
          role: "jamaah_free",
          full_name: n,
          phone: ph,
        });
        if (res.kind === "live") {
          if ("error" in res) {
            setError(res.error);
            return;
          }
          if (res.needsEmailConfirmation) {
            setInfo("Periksa email Anda untuk menyelesaikan konfirmasi akun, lalu login.");
            return;
          }
          await router.push("/login");
          return;
        }
        await new Promise((r) => setTimeout(r, 400));
        await router.push("/login");
      } finally {
        setLoading(false);
      }
    },
    [name, email, phone, password, router],
  );

  return (
    <>
      <Head>
        <title>Daftar Jamaah | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Buat akun portal jamaah SA'YA Umroh OS." />
      </Head>
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 88% 50%, rgba(156, 77, 204, 0.07), transparent 40%)",
          }}
        />

        <div className="glass-panel w-full max-w-md rounded-2xl border border-zinc-600/15 p-6 shadow-2xl sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">SA&apos;YA Umroh OS</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-zinc-50">Registrasi Jamaah</h1>
          <p className="mt-2 text-center text-sm text-zinc-300/55">Lengkapi data untuk membuat akun portal perjalanan Anda.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Nama lengkap</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                placeholder="Sesuai KTP / paspor"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                placeholder="nama@email.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Nomor telepon (WhatsApp)</span>
              <input
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 font-mono text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                placeholder="0812xxxxxxxx"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Kata sandi</span>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
                placeholder="Minimal 8 karakter"
              />
            </label>

            {error ? (
              <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100/95" role="alert">
                {error}
              </p>
            ) : null}
            {info ? (
              <p className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-sm text-sky-100/95" role="status">
                {info}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl border border-zinc-500/40 bg-gradient-to-r from-zinc-600/25 to-zinc-900/15 py-2.5 text-sm font-semibold text-zinc-50 shadow-lg shadow-zinc-950/30 transition hover:border-zinc-500/55 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Mendaftar…" : "Daftar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-300/55">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-zinc-400 underline-offset-2 hover:text-zinc-300 hover:underline">
              Masuk ke halaman login
            </Link>
          </p>

          <p className="mt-6 border-t border-zinc-600/10 pt-5 text-center text-[11px] text-zinc-600/50">
            Simulasi registrasi — tidak ada penyimpanan akun di server. Setelah daftar Anda akan diarahkan ke login.
          </p>
        </div>

        <Link href="/" className="mt-8 text-sm text-zinc-400/75 transition hover:text-zinc-300">
          ← Kembali ke hub
        </Link>
      </main>
    </>
  );
}

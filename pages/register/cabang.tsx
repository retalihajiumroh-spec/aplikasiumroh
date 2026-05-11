import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, type FormEvent } from "react";
import { signUpWithMetadata } from "@/lib/auth/session-client";

export default function CabangRegisterPage() {
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
          role: "cabang",
          full_name: n,
          phone: ph,
          branch_name: n,
        });
        if (res.kind === "live") {
          if ("error" in res) {
            setError(res.error);
            return;
          }
          if (res.needsEmailConfirmation) {
            setInfo("Periksa email untuk konfirmasi akun, lalu login cabang.");
            return;
          }
          await router.push("/login/cabang");
          return;
        }
        await new Promise((r) => setTimeout(r, 400));
        await router.push("/login/cabang");
      } finally {
        setLoading(false);
      }
    },
    [name, email, phone, password, router],
  );

  return (
    <>
      <Head>
        <title>Registrasi Cabang | SA&apos;YA Umroh OS</title>
        <meta name="description" content="Ajukan akun staf kantor cabang SA'YA Umroh OS." />
      </Head>
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 0%, rgba(230, 230, 250, 0.1), transparent 42%), radial-gradient(circle at 88% 48%, rgba(156, 77, 204, 0.09), transparent 40%)",
          }}
        />

        <div className="glass-panel w-full max-w-md rounded-2xl border border-violet-400/25 p-6 shadow-2xl sm:p-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/85">SA&apos;YA Umroh OS</p>
          <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-purple-50">Registrasi Cabang</h1>
          <p className="mt-2 text-center text-sm text-purple-200/55">Ajukan akun staf — persetujuan pusat (simulasi).</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Nama lengkap</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-600/45 focus:border-violet-400/45 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                placeholder="Nama staf cabang"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Email</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-600/45 focus:border-violet-400/45 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                placeholder="staf.cabang@sayaumroh.id"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Nomor telepon (WhatsApp)</span>
              <input
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 font-mono text-sm text-purple-50 placeholder:text-purple-600/45 focus:border-violet-400/45 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                placeholder="0812xxxxxxxx"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">Kata sandi</span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-600/45 focus:border-violet-400/45 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
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
              className="w-full rounded-xl border border-violet-400/45 bg-gradient-to-r from-violet-500/20 to-purple-600/15 py-2.5 text-sm font-semibold text-purple-50 shadow-lg shadow-purple-950/30 transition hover:border-violet-400/65 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Mendaftar…" : "Registrasi"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-purple-200/55">
            Sudah punya akun?{" "}
            <Link href="/login/cabang" className="font-semibold text-violet-200/95 underline-offset-2 hover:text-violet-100 hover:underline">
              Login cabang
            </Link>
          </p>

          <p className="mt-6 border-t border-purple-500/10 pt-5 text-center text-[11px] text-purple-500/50">
            Simulasi — tidak ada penyimpanan di server. Setelah daftar Anda diarahkan ke login cabang.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/register" className="text-purple-300/75 transition hover:text-purple-200">
            Registrasi Jamaah
          </Link>
          <Link href="/register/mitra" className="text-sky-300/80 transition hover:text-sky-200">
            Registrasi Mitra
          </Link>
          <Link href="/" className="text-purple-300/75 transition hover:text-purple-200">
            ← Hub
          </Link>
        </div>
      </main>
    </>
  );
}

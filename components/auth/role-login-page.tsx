"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, type FormEvent } from "react";
import { signInWithRoleRedirect } from "@/lib/auth/session-client";
import type { AppRole } from "@/lib/supabase/database.types";
import { pickDemoCredentialForPortal } from "@/lib/demo/demo-accounts";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type QuickLink = { href: string; label: string };

export function RoleLoginPage({
  title,
  description,
  emailPlaceholder,
  expectedRoles,
  demoRedirectTo,
  accentClassName,
  helperText,
  quickLinks,
}: {
  title: string;
  description: string;
  emailPlaceholder: string;
  expectedRoles: AppRole[];
  demoRedirectTo: string;
  accentClassName?: string;
  helperText?: string;
  quickLinks: QuickLink[];
}) {
  const router = useRouter();
  const demoCred = pickDemoCredentialForPortal(expectedRoles);
  const [email, setEmail] = useState(demoCred?.email ?? "");
  const [password, setPassword] = useState(demoCred?.password ?? "");
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
        const res = await signInWithRoleRedirect(em, password, demoRedirectTo, expectedRoles);
        if (res.kind === "live" && "error" in res) {
          setError(res.error);
          return;
        }
        await new Promise((r) => setTimeout(r, 250));
        await router.push(res.redirectTo);
      } finally {
        setLoading(false);
      }
    },
    [demoRedirectTo, email, expectedRoles, password, router],
  );

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-zinc-500/25 p-6 shadow-2xl sm:p-8">
        <p className={`text-center text-xs font-semibold uppercase tracking-[0.2em] ${accentClassName ?? "text-zinc-400/85"}`}>
          SA&apos;YA Umroh OS
        </p>
        <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-zinc-50">{title}</h1>
        <p className="mt-2 text-center text-sm text-zinc-300/60">{description}</p>

        {demoCred ? (
          <div className="mt-6 rounded-xl border border-zinc-500/25 bg-zinc-950/35 px-4 py-3 text-left text-xs leading-relaxed text-zinc-300/90 light:border-zinc-300/70 light:bg-zinc-100 light:text-slate-700">
            <p className="font-semibold text-zinc-200 light:text-slate-900">Akun contoh (staging)</p>
            <p className="mt-2 font-mono text-[11px]">
              <span className="text-zinc-500 light:text-slate-500">Email</span> {demoCred.email}
            </p>
            <p className="mt-1 font-mono text-[11px]">
              <span className="text-zinc-500 light:text-slate-500">Sandi</span> {demoCred.password}
            </p>
            <p className="mt-2 text-[10px] text-zinc-500 light:text-slate-500">
              Buat user ini di Supabase Auth lalu jalankan pemetaan role di{" "}
              <code className="rounded bg-zinc-900/80 px-1 py-0.5 light:bg-white">supabase/demo-profiles.sql</code>.
            </p>
          </div>
        ) : null}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/45 focus:border-zinc-500/45 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
              placeholder={emailPlaceholder}
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
            className="w-full rounded-xl border border-zinc-500/45 bg-gradient-to-r from-zinc-700/30 to-zinc-600/20 py-2.5 text-sm font-semibold text-zinc-50 shadow-lg shadow-zinc-950/30 transition hover:border-zinc-500/65 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memproses…" : "Masuk"}
          </button>
        </form>

        <p className="mt-6 border-t border-zinc-600/10 pt-4 text-center text-[11px] text-zinc-600/70">
          {helperText ??
            (isSupabaseConfigured()
              ? "Supabase aktif: validasi role dilakukan otomatis saat login."
              : "Mode demo: tanpa Supabase, login simulasi tetap mengikuti role halaman ini.")}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="text-zinc-400/80 transition hover:text-zinc-200">
            {item.label}
          </Link>
        ))}
      </div>
    </main>
  );
}

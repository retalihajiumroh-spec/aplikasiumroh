"use client";

import { LinkButton } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-500">Error</p>
      <h1 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">
        Terjadi kendala pada aplikasi.
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Silakan muat ulang halaman atau kembali ke beranda.
      </p>
      <LinkButton className="mt-8" href="/">
        Kembali ke Beranda
      </LinkButton>
    </main>
  );
}

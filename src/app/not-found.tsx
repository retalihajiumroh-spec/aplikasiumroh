import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
        404
      </p>
      <h1 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">
        Halaman tidak ditemukan.
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Kembali ke beranda untuk melihat paket dan panduan umroh terbaru.
      </p>
      <LinkButton className="mt-8" href="/">
        Kembali ke Beranda
      </LinkButton>
    </main>
  );
}

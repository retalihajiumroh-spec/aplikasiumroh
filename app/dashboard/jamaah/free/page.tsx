import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jamaah Free | SA'YA Umroh OS",
  description: "Portal jamaah free dengan akses fitur dasar perjalanan dan persiapan umroh.",
};

export default function JamaahFreePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400/80">Role portal</p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-50">Jamaah Free</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300/80">
          Kamu masuk sebagai <strong>Jamaah Free</strong>. Akses difokuskan ke paket, status persiapan, dan ringkasan
          perjalanan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard/jamaah-experience" className="rounded-xl border border-zinc-500/35 bg-zinc-700/20 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/30">
            Lihat Jamaah Experience
          </Link>
          <Link href="/dashboard/paket" className="rounded-xl border border-zinc-500/35 bg-zinc-700/20 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/30">
            Lihat Paket
          </Link>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jamaah Pro | SA'YA Umroh OS",
  description: "Portal jamaah pro dengan akses fitur premium dan kolaborasi komunitas.",
};

export default function JamaahProPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-2xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400/80">Role portal</p>
        <h1 className="mt-2 text-2xl font-bold text-zinc-50">Jamaah Pro</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300/80">
          Kamu masuk sebagai <strong>Jamaah Pro</strong>. Role ini mendapat akses fitur premium seperti booking lanjutan,
          konten premium, dan komunitas.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard/booking" className="rounded-xl border border-zinc-500/35 bg-zinc-700/20 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/30">
            Booking & Payment
          </Link>
          <Link href="/dashboard/community" className="rounded-xl border border-zinc-500/35 bg-zinc-700/20 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/30">
            Community
          </Link>
          <Link href="/dashboard/content" className="rounded-xl border border-zinc-500/35 bg-zinc-700/20 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700/30">
            Content
          </Link>
        </div>
      </div>
    </main>
  );
}

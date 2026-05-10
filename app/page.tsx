import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-emerald-100">
        SA&apos;YA Umroh OS
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard/owner"
          className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/20"
        >
          Owner Dashboard
        </Link>
        <Link
          href="/dashboard/social-media"
          className="rounded-xl border border-[color:var(--color-social-maroon-border)] px-6 py-3 text-sm font-semibold text-emerald-50 transition hover:brightness-110"
          style={{ backgroundColor: "var(--color-social-maroon)" }}
        >
          Social Media Hub
        </Link>
      </div>
    </main>
  );
}

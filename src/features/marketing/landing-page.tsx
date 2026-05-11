import { ArrowRight, CheckCircle2, Gem, Globe2, Headphones, Star } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContentLibrary } from "@/features/content/content-library";
import { PackageGrid } from "@/features/packages/package-grid";

const stats = [
  { label: "Jamaah dibimbing", value: "12K+" },
  { label: "Pembimbing aktif", value: "40+" },
  { label: "Kepuasan layanan", value: "4.9/5" }
];

const benefits = [
  {
    icon: Gem,
    title: "Pengalaman premium",
    description: "Akomodasi pilihan, itinerary rapi, dan pendampingan sejak pendaftaran."
  },
  {
    icon: Globe2,
    title: "Operasional transparan",
    description: "Pantau dokumen, jadwal, dan materi perjalanan langsung dari dashboard."
  },
  {
    icon: Headphones,
    title: "Support responsif",
    description: "Tim jamaah siap membantu sebelum, selama, dan setelah perjalanan."
  }
];

export function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.24),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.05),_transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_32%),linear-gradient(135deg,_rgba(16,185,129,0.07),_transparent_40%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
              <Star className="h-4 w-4" />
              Platform perjalanan ibadah modern
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Umroh lebih tenang dengan layanan digital premium.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Pilih paket, pelajari manasik, dan pantau persiapan jamaah melalui ekosistem Retali Umroh yang rapi dan responsif.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/paket">
                Lihat Paket
                <ArrowRight className="ml-2 h-4 w-4" />
              </LinkButton>
              <LinkButton href="/artikel" variant="ghost">
                Baca Panduan
              </LinkButton>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden bg-slate-950 p-8 text-white dark:bg-white dark:text-slate-950">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl" />
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300 dark:text-emerald-700">
              Smart Jamaah
            </p>
            <h2 className="mt-5 text-3xl font-black">Persiapan lengkap dalam satu portal.</h2>
            <div className="mt-8 grid gap-4">
              {["Dokumen & visa", "Jadwal manasik", "Materi artikel & ebook", "Itinerary harian"].map((item) => (
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 dark:bg-slate-950/5" key={item}>
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 dark:text-emerald-600" />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <Card key={benefit.title}>
                <Icon className="h-9 w-9 text-emerald-500" />
                <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
              Paket Umroh
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
              Pilihan keberangkatan terbaik
            </h2>
          </div>
          <LinkButton href="/paket" variant="ghost">
            Semua paket
          </LinkButton>
        </div>
        <PackageGrid />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
            Artikel & Ebook
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">
            Bekal ilmu sebelum berangkat
          </h2>
        </div>
        <ContentLibrary />
      </section>
    </>
  );
}

import { PackageGrid } from "@/features/packages/package-grid";

export const metadata = {
  title: "Paket Umroh"
};

export default function PaketPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
          Paket Umroh
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Paket fleksibel untuk berbagai kebutuhan jamaah.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          Mulai dari paket hemat hingga premium family, semua disiapkan dengan standar layanan modern.
        </p>
      </div>
      <PackageGrid />
    </main>
  );
}

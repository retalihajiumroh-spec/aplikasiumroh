import { ContentLibrary } from "@/features/content/content-library";

export const metadata = {
  title: "Artikel & Ebook",
};

export default function ArtikelPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
          Artikel & Ebook
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Perpustakaan digital untuk bekal ibadah.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          Materi ringkas, praktis, dan mudah diakses dari mobile maupun desktop.
        </p>
      </div>
      <ContentLibrary />
    </main>
  );
}

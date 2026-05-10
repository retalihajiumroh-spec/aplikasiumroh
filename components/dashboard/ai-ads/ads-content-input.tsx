"use client";

import { motion } from "framer-motion";

export function AdsContentInput({
  socialUrl,
  onSocialUrlChange,
  ideaText,
  onIdeaChange,
  onGenerate,
  loading,
}: {
  socialUrl: string;
  onSocialUrlChange: (v: string) => void;
  ideaText: string;
  onIdeaChange: (v: string) => void;
  onGenerate: () => void;
  loading: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-emerald-50">Input kampanye</h2>
      <p className="mt-1 text-sm text-emerald-200/55">
        Referensi konten organik + brief singkat untuk menghasilkan copy iklan, struktur adset Meta/TikTok
        (demo), dan pratinjau kreatif.
      </p>

      <label className="mt-6 block">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
          Link Instagram / TikTok
        </span>
        <input
          type="url"
          value={socialUrl}
          onChange={(e) => onSocialUrlChange(e.target.value)}
          placeholder="https://www.instagram.com/reel/… atau https://www.tiktok.com/@…/video/…"
          className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-500/35 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">
          Ide konten / brief iklan
        </span>
        <textarea
          value={ideaText}
          onChange={(e) => onIdeaChange(e.target.value)}
          rows={5}
          placeholder="Contoh: promosi Ramadan Premium untuk audiens keluarga muda di Jabodetabek; ton profesional-hangat; highlight cicilan 0% & manasik."
          className="mt-2 w-full resize-y rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-500/35 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </label>

      <motion.button
        type="button"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        disabled={loading}
        onClick={onGenerate}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-600/20 px-4 py-3 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/30 transition disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-200/30 border-t-emerald-200" />
            Membangun struktur iklan…
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Generate ads lab
          </>
        )}
      </motion.button>
      <p className="mt-3 text-center text-[11px] text-emerald-500/50">Simulasi lokal — tidak ada panggilan API.</p>
    </motion.section>
  );
}

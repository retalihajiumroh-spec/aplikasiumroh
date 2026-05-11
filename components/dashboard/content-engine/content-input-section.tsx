"use client";

import { motion } from "framer-motion";

export function ContentInputSection({
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
      <h2 className="text-lg font-semibold text-purple-50">Input konten</h2>
      <p className="mt-1 text-sm text-purple-200/55">
        Tempel tautan referensi Instagram atau TikTok, lalu tulis ide atau brief singkat untuk
        menghasilkan paket konten siap pakai.
      </p>

      <label className="mt-6 block">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">
          Link Instagram / TikTok
        </span>
        <input
          type="url"
          value={socialUrl}
          onChange={(e) => onSocialUrlChange(e.target.value)}
          placeholder="https://www.instagram.com/reel/… atau https://www.tiktok.com/@…/video/…"
          className="mt-2 w-full rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-500/35 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/60">
          Ide / brief konten baru
        </span>
        <textarea
          value={ideaText}
          onChange={(e) => onIdeaChange(e.target.value)}
          rows={5}
          placeholder="Contoh: promosi paket Ramadan Premium untuk keluarga muda, tonanya hangat dan tidak menekan; sertakan manfaat manasik & dokter pendamping."
          className="mt-2 w-full resize-y rounded-xl border border-purple-500/15 bg-purple-950/40 px-3 py-2.5 text-sm text-purple-50 placeholder:text-purple-500/35 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
      </label>

      <motion.button
        type="button"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        disabled={loading}
        onClick={onGenerate}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/35 bg-gradient-to-r from-purple-500/25 to-violet-900/20 px-4 py-3 text-sm font-semibold text-purple-50 shadow-lg shadow-purple-950/30 transition disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-purple-200/30 border-t-purple-200" />
            Menganalisis referensi…
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Generate paket konten
          </>
        )}
      </motion.button>
      <p className="mt-3 text-center text-[11px] text-purple-500/50">
        Demo lokal — tidak ada data yang dikirim ke server.
      </p>
    </motion.section>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { demoContentPreview } from "@/lib/content-system/dummy-data";
import { CopyTextButton } from "@/components/dashboard/ai-sales/copy-text-button";

export function ContentSystemDashboard() {
  const [reelsUrl, setReelsUrl] = useState("https://www.instagram.com/reel/DCxSampleSaya/");
  const [tiktokUrl, setTiktokUrl] = useState("https://www.tiktok.com/@sayaumroh/video/7123456789");
  const [brief, setBrief] = useState(
    "Fokus: Ramadan Premium, audiens keluarga muda, ton hangat-profesional, ajak DM INFO.",
  );
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const handleGenerate = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 900);
  }, []);

  const preview = demoContentPreview;

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 80% 40%, rgba(196, 163, 165, 0.1), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-zinc-600/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Content System</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300/55 sm:text-base">
              Tempel link Reels &amp; TikTok, tambahkan brief — lalu pratinjau caption, skrip iklan, dan CTA (demo tanpa backend).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300/80 transition hover:border-zinc-500/25 hover:bg-zinc-600/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-zinc-50">Input konten</h2>
            <p className="mt-1 text-sm text-zinc-300/55">Link referensi Instagram Reels dan TikTok, plus brief singkat.</p>

            <label className="mt-6 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Link Instagram Reels</span>
              <input
                type="url"
                value={reelsUrl}
                onChange={(e) => setReelsUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/…"
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/35 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Link TikTok</span>
              <input
                type="url"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@…/video/…"
                className="mt-2 w-full rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/35 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">Brief (opsional)</span>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={4}
                placeholder="Tone, paket, CTA yang diinginkan…"
                className="mt-2 w-full resize-y rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-600/35 focus:border-zinc-500/40 focus:outline-none focus:ring-2 focus:ring-zinc-600/20"
              />
            </label>

            <motion.button
              type="button"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
              onClick={handleGenerate}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-500/35 bg-gradient-to-r from-zinc-600/25 to-zinc-900/20 px-4 py-3 text-sm font-semibold text-zinc-50 shadow-lg shadow-zinc-950/30 disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300/30 border-t-zinc-300" />
                  Menyiapkan pratinjau…
                </>
              ) : (
                "Generate pratinjau"
              )}
            </motion.button>
            <p className="mt-3 text-center text-[11px] text-zinc-600/50">Output berikut contoh statis (tidak memanggil API).</p>
          </motion.section>

          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {!ready ? (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-600/20 p-8 text-center"
                >
                  <p className="text-sm font-medium text-zinc-200/90">Pratinjau belum tampil</p>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-zinc-300/45">
                    Isi link Reels &amp; TikTok, lalu ketuk <span className="text-zinc-400/80">Generate pratinjau</span> untuk melihat
                    caption, skrip iklan, dan CTA.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="pv"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <section className="glass-panel rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-zinc-50">Caption</h2>
                      <CopyTextButton text={preview.caption} />
                    </div>
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-200/90">{preview.caption}</p>
                  </section>

                  <section className="glass-panel rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-zinc-50">Ad script</h2>
                      <CopyTextButton text={preview.adScript} label="Salin skrip" />
                    </div>
                    <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-200/85">{preview.adScript}</pre>
                  </section>

                  <section className="glass-panel rounded-2xl border border-zinc-500/20 bg-zinc-600/[0.06] p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-lg font-semibold text-zinc-50">CTA</h2>
                      <CopyTextButton text={preview.cta} label="Salin CTA" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-50/95">{preview.cta}</p>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

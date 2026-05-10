"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdsContentInput } from "./ads-content-input";
import { AdsContentOutput } from "./ads-content-output";
import { AdsetGeneration } from "./adset-generation";
import { AdsPerformancePanel } from "./ads-performance-panel";
import {
  demoAdSets,
  demoGeneratedContent,
  demoPerformanceRows,
  demoPerformanceSummary,
} from "@/lib/ai-ads/dummy-data";

export function AiAdsLabDashboard() {
  const [socialUrl, setSocialUrl] = useState("https://www.tiktok.com/@sayaumroh/video/7123456789");
  const [ideaText, setIdeaText] = useState(
    "Kampanye Ramadan Premium — audiens keluarga muda 28–40, Jabodetabek; ton hangat-profesional; tekan cicilan 0% & manasik intensif.",
  );
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const handleGenerate = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 1000);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-45"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 90% 0%, rgba(167, 243, 208, 0.1), transparent 38%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="border-b border-emerald-500/10 pb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
            SA&apos;YA Umroh OS · Growth
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">AI Ads Lab</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
            Laboratorium iklan berbasis AI: dari referensi sosial dan brief, hasilkan copy, struktur adset broad vs
            targeted, pratinjau kreatif, dan dasbor performa simulasi dengan kontrol scale / pause.
          </p>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <AdsContentInput
            socialUrl={socialUrl}
            onSocialUrlChange={setSocialUrl}
            ideaText={ideaText}
            onIdeaChange={setIdeaText}
            onGenerate={handleGenerate}
            loading={loading}
          />

          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {!ready ? (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="glass-panel flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-500/20 p-8 text-center"
                >
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                    <svg className="text-emerald-300/90" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <p className="mt-5 max-w-xs text-sm font-medium text-emerald-100/90">Siap generate kampanye?</p>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-emerald-200/45">
                    Isi tautan referensi & brief, lalu ketuk <span className="text-emerald-300/80">Generate ads lab</span>{" "}
                    untuk melihat output konten, pasangan adset broad/targeted (3 iklan masing-masing), dan metrik
                    performa demo.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="out"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AdsContentOutput data={demoGeneratedContent} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {ready ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-10 space-y-10"
            >
              <AdsetGeneration packs={demoAdSets} />
              <AdsPerformancePanel summary={demoPerformanceSummary} rows={demoPerformanceRows} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

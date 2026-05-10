"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContentInputSection } from "./content-input-section";
import { ContentOutputSection } from "./content-output-section";
import { EngagementOptimizationSection } from "./engagement-optimization-section";
import {
  demoContentOutput,
  demoViralScore,
  engagementRecommendations,
} from "@/lib/content-engine/dummy-data";

export function ContentEngineDashboard() {
  const [socialUrl, setSocialUrl] = useState("https://www.instagram.com/reel/DCxSampleUmroh/");
  const [ideaText, setIdeaText] = useState(
    "Brief: Ramadan Premium 1447H — ton hangat, tekankan manasik & dokter pendamping. Target: keluarga muda profesional.",
  );
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1100);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-45"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(52, 211, 153, 0.14), transparent 40%), radial-gradient(circle at 85% 60%, rgba(45, 212, 191, 0.1), transparent 45%)",
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
            SA&apos;YA Umroh OS · Marketing
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">
            AI Content Engine
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
            Hasilkan caption, skrip iklan, carousel, headline, dan optimasi engagement untuk kampanye
            umroh — dari satu tautan referensi dan brief singkat.
          </p>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <ContentInputSection
            socialUrl={socialUrl}
            onSocialUrlChange={setSocialUrl}
            ideaText={ideaText}
            onIdeaChange={setIdeaText}
            onGenerate={handleGenerate}
            loading={loading}
          />

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {!generated ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-500/20 p-8 text-center"
                >
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                    <svg
                      className="text-emerald-300/80"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M12 18V5M8 9l4-4 4 4" />
                      <rect x="4" y="14" width="16" height="6" rx="2" />
                    </svg>
                  </div>
                  <p className="mt-5 max-w-xs text-sm font-medium text-emerald-100/85">
                    Siap generate?
                  </p>
                  <p className="mt-2 max-w-sm text-xs leading-relaxed text-emerald-200/45">
                    Isi tautan referensi dan brief, lalu ketuk{" "}
                    <span className="text-emerald-300/80">Generate paket konten</span> untuk melihat
                    caption, skrip iklan, carousel, skor viral, dan rekomendasi optimasi (data demo).
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <ContentOutputSection data={demoContentOutput} />
                  <EngagementOptimizationSection
                    viralScore={demoViralScore}
                    recommendations={engagementRecommendations}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

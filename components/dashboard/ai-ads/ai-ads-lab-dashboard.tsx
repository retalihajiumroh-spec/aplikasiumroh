"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdsContentInput } from "./ads-content-input";
import { AdsContentOutput } from "./ads-content-output";
import { AdsetCreationPanel } from "./adset-creation-panel";
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

  const [broadAudience, setBroadAudience] = useState(demoAdSets[0]?.audienceSummary ?? "");
  const [targetedAudience, setTargetedAudience] = useState(demoAdSets[1]?.audienceSummary ?? "");

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
            "radial-gradient(circle at 10% 20%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 90% 0%, rgba(230, 230, 250, 0.1), transparent 38%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="border-b border-zinc-600/10 pb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">
            SA&apos;YA Umroh OS · Growth
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">AI Ads Lab</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300/55 sm:text-base">
            Buat pasangan adset <strong className="text-zinc-300/85">Broad</strong> &amp;{" "}
            <strong className="text-zinc-300/85">Targeted</strong>, pantau{" "}
            <strong className="text-zinc-300/85">CTR, CPL, ROI</strong>, lalu generate materi kampanye dari referensi
            sosial (opsional).
          </p>
        </motion.header>

        <div className="mt-10">
          <AdsPerformancePanel summary={demoPerformanceSummary} rows={demoPerformanceRows} />
        </div>

        <div className="mt-10 space-y-8">
          <AdsetCreationPanel
            broadAudience={broadAudience}
            targetedAudience={targetedAudience}
            onBroadChange={setBroadAudience}
            onTargetedChange={setTargetedAudience}
          />
          <AdsetGeneration packs={demoAdSets} audienceBroad={broadAudience} audienceTargeted={targetedAudience} />
        </div>

        <div className="mt-12 border-t border-zinc-600/10 pt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500/60">Konten kampanye</p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-50">Referensi &amp; materi iklan</h2>
          <p className="mt-1 text-sm text-zinc-300/55">
            Opsional: tautan Reels/TikTok + brief untuk caption, skrip, dan CTA setelah generate.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
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
                    className="glass-panel flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-600/20 p-8 text-center"
                  >
                    <p className="text-sm font-medium text-zinc-200/90">Pratinjau konten</p>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-zinc-300/45">
                      Ketuk <span className="text-zinc-400/80">Generate ads lab</span> untuk caption, hashtag, skrip iklan, dan CTA (demo).
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
        </div>
      </div>
    </div>
  );
}

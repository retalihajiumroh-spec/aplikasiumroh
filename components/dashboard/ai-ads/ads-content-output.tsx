"use client";

import { motion } from "framer-motion";
import type { GeneratedAdsContent } from "@/lib/ai-ads/dummy-data";
import { CopyTextButton } from "@/components/dashboard/ai-sales/copy-text-button";

export function AdsContentOutput({ data }: { data: GeneratedAdsContent }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-emerald-50">Output konten</h2>
          <p className="mt-1 text-sm text-emerald-200/55">
            Caption, hashtag, skrip iklan ringkas, CTA lembut, dan headline untuk uji A/B.
          </p>
        </div>
        <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300/90">
          AI draft
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Caption utama</h3>
            <CopyTextButton text={data.primaryCaption} />
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-emerald-100/90">{data.primaryCaption}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Caption alternatif</h3>
            <CopyTextButton text={data.altCaption} label="Salin" />
          </div>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-emerald-100/85">{data.altCaption}</p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Suggested hashtags</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-200/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Ad script preview</h3>
            <CopyTextButton text={data.adScriptPreview} label="Salin skrip" />
          </div>
          <p className="mt-3 whitespace-pre-line font-mono text-xs leading-relaxed text-emerald-100/85">
            {data.adScriptPreview}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-card rounded-xl border border-emerald-400/15 bg-emerald-500/[0.06] p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-200/70">Soft CTA</h3>
              <CopyTextButton text={data.softCta} label="Salin CTA" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-emerald-50/95">{data.softCta}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Headline</h3>
              <CopyTextButton text={data.headline} />
            </div>
            <p className="mt-2 text-sm font-medium leading-snug text-emerald-50">{data.headline}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

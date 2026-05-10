"use client";

import { motion } from "framer-motion";
import type { AdCreative, AdSetPack } from "@/lib/ai-ads/dummy-data";

function MediaPreview({ ad }: { ad: AdCreative }) {
  const aspect =
    ad.mediaAspect === "9:16" ? "aspect-[9/16] max-h-[200px]" : ad.mediaAspect === "4:5" ? "aspect-[4/5] max-h-[200px]" : "aspect-square max-h-[180px]";
  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-emerald-500/15 ${aspect}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${ad.gradient}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </div>
      </div>
      <span className="absolute bottom-2 left-2 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
        {ad.mediaAspect} · pratinjau
      </span>
      <span className="absolute right-2 top-2 rounded-md bg-emerald-950/60 px-2 py-0.5 text-[9px] font-semibold text-emerald-200/90 backdrop-blur-sm">
        SA&apos;YA
      </span>
    </div>
  );
}

function AdSetColumn({
  pack,
  index,
  audienceDisplay,
}: {
  pack: AdSetPack;
  index: number;
  audienceDisplay: string;
}) {
  const targeted = pack.kind === "targeted";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      className={`glass-panel rounded-2xl p-5 sm:p-6 ${targeted ? "ring-1 ring-teal-400/20" : "ring-1 ring-emerald-400/15"}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span
            className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              targeted ? "border-teal-400/30 bg-teal-500/15 text-teal-100" : "border-emerald-400/30 bg-emerald-500/12 text-emerald-200"
            }`}
          >
            {targeted ? "Targeted" : "Broad"}
          </span>
          <h3 className="mt-3 text-base font-semibold text-emerald-50">{pack.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-emerald-200/50">{audienceDisplay}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-emerald-300/70">
          3 ads
        </span>
      </div>

      <ul className="mt-6 space-y-4">
        {pack.ads.map((ad, i) => (
          <motion.li
            key={ad.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 + index * 0.06 }}
            className="glass-card overflow-hidden rounded-xl"
          >
            <MediaPreview ad={ad} />
            <div className="p-3.5">
              <p className="text-xs font-medium text-emerald-400/70">{ad.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-100/90">{ad.primaryText}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                  CTA: {ad.cta}
                </span>
                <span className="font-mono text-[10px] text-emerald-500/45">{ad.id}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function AdsetGeneration({
  packs,
  audienceBroad,
  audienceTargeted,
}: {
  packs: AdSetPack[];
  audienceBroad: string;
  audienceTargeted: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-emerald-50">Pratinjau struktur adset</h2>
          <p className="mt-1 max-w-2xl text-sm text-emerald-200/55">
            Broad &amp; Targeted — masing-masing tiga variasi kreatif (copy + CTA + pratinjau media). Ringkasan audiensi
            mengikuti input di atas.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {packs.map((pack, index) => (
          <AdSetColumn
            key={pack.id}
            pack={pack}
            index={index}
            audienceDisplay={pack.kind === "broad" ? audienceBroad : audienceTargeted}
          />
        ))}
      </div>
    </motion.section>
  );
}

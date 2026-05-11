"use client";

import { motion } from "framer-motion";
import type { ContentEngineOutput } from "@/lib/content-engine/dummy-data";
import { CopyTextButton } from "@/components/dashboard/ai-sales/copy-text-button";
import { CarouselPreview } from "./carousel-preview";

function formatLabel(format: ContentEngineOutput["headlines"][number]["format"]) {
  if (format === "feed") return "Feed";
  if (format === "reels") return "Reels";
  return "Ads";
}

export function ContentOutputSection({ data }: { data: ContentEngineOutput }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-50">Output konten</h2>
            <p className="mt-1 text-sm text-zinc-300/55">
              Caption, skrip iklan, hashtag, CTA lembut, carousel, dan headline siap tayang.
            </p>
          </div>
          <span className="rounded-full border border-zinc-500/25 bg-zinc-600/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400/90">
            Auto-generated
          </span>
        </div>

        <div className="mt-6 space-y-6">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">
                Caption
              </h3>
              <CopyTextButton text={data.caption} />
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-200/90">{data.caption}</p>
          </div>

          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">
                Ad script (30s)
              </h3>
              <CopyTextButton text={data.adScript} label="Salin skrip" />
            </div>
            <p className="mt-3 whitespace-pre-line font-mono text-xs leading-relaxed text-zinc-200/85">
              {data.adScript}
            </p>
          </div>

          <div className="glass-card rounded-xl p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">
              Suggested hashtags
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-zinc-600/15 bg-zinc-600/10 px-2.5 py-1 font-mono text-xs text-zinc-300/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl border border-zinc-500/20 bg-zinc-600/[0.08] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300/70">Soft CTA</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-50/95">{data.softCta}</p>
          </div>

          <div className="glass-card rounded-xl p-4">
            <CarouselPreview slides={data.carouselSlides} />
          </div>

          <div className="glass-card rounded-xl p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400/60">
              Headline preview
            </h3>
            <ul className="mt-4 space-y-3">
              {data.headlines.map((h, i) => (
                <motion.li
                  key={h.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="flex flex-col gap-2 rounded-lg border border-zinc-600/10 bg-zinc-950/30 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-sm font-medium leading-snug text-zinc-50/95">{h.text}</p>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-400/70">
                      {formatLabel(h.format)}
                    </span>
                    <CopyTextButton text={h.text} label="Salin" />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

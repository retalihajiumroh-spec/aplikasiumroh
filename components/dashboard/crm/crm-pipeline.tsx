"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BroadcastWaModal } from "@/components/crm/broadcast-wa-modal";
import { PIPELINE_STAGES, broadcastSegments } from "@/lib/crm/dummy-data";
import { PipelineColumn } from "./pipeline-column";

export function CrmPipeline() {
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(56, 189, 248, 0.12), transparent 42%), radial-gradient(circle at 90% 20%, rgba(52, 211, 153, 0.12), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              SA&apos;YA Umroh OS · CRM
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">
              Pipeline lead
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
              Kanban 5 tahap dengan skor, engagement, aktivitas terakhir, dan saran tindak lanjut dari asisten AI
              untuk tim sales.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setBroadcastOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/20 to-teal-600/15 px-4 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-950/40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8.5z" />
              </svg>
              Broadcast WA
            </motion.button>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-emerald-200/55">
              Mode demo · tanpa sinkron API
            </span>
          </div>
        </motion.header>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-500/25">
          {PIPELINE_STAGES.map((col, index) => (
            <PipelineColumn
              key={col.id}
              stageId={col.id}
              label={col.label}
              short={col.short}
              accent={col.accent}
              index={index}
            />
          ))}
        </div>
      </div>

      <BroadcastWaModal open={broadcastOpen} onClose={() => setBroadcastOpen(false)} segments={broadcastSegments} />
    </div>
  );
}

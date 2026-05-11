"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BroadcastWaModal } from "@/components/crm/broadcast-wa-modal";
import { broadcastSegments } from "@/lib/crm/dummy-data";
import {
  activeLead,
  automatedFollowUps,
  chatMessages,
  salesScriptPacks,
  voiceCallLog,
  voiceScheduledCalls,
  voiceScriptPreview,
} from "@/lib/ai-sales/dummy-data";
import { WaChatInterface } from "./wa-chat-interface";
import { WaFollowupQueue } from "./wa-followup-queue";
import { AiSalesScriptsSection } from "./ai-sales-scripts-section";
import { VoiceCallPanel } from "./voice-call-panel";

export function AiSalesDashboard() {
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-45"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(230, 230, 250, 0.12), transparent 40%), radial-gradient(circle at 15% 50%, rgba(196, 163, 165, 0.1), transparent 42%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 border-b border-zinc-600/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500/70">
              SA&apos;YA Umroh OS · AI Sales Bot
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Asisten penjualan AI
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300/55 sm:text-base">
              Chat ala WhatsApp dengan profil lead, otomatisasi follow-up, skrip AI untuk closing & objection, serta
              simulasi panggilan suara dengan log dan jadwal.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setBroadcastOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-500/35 bg-gradient-to-r from-zinc-600/20 to-zinc-900/15 px-4 py-2.5 text-sm font-semibold text-zinc-50 shadow-lg shadow-zinc-950/40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8.5z" />
              </svg>
              Broadcast WA
            </motion.button>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-300/55">
              Demo · tanpa backend
            </span>
          </div>
        </motion.header>

        <div className="mt-10 grid gap-8 xl:grid-cols-12">
          <div className="space-y-8 xl:col-span-7">
            <WaChatInterface lead={activeLead} messages={chatMessages} />
            <VoiceCallPanel log={voiceCallLog} scheduled={voiceScheduledCalls} scriptPreview={voiceScriptPreview} />
          </div>
          <div className="space-y-8 xl:col-span-5">
            <WaFollowupQueue items={automatedFollowUps} />
            <AiSalesScriptsSection packs={salesScriptPacks} />
          </div>
        </div>
      </div>

      <BroadcastWaModal open={broadcastOpen} onClose={() => setBroadcastOpen(false)} segments={broadcastSegments} />
    </div>
  );
}

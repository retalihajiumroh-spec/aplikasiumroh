"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BroadcastWaModal } from "@/components/crm/broadcast-wa-modal";
import { CopyTextButton } from "./copy-text-button";
import { VoiceReminderSimulation } from "./voice-reminder-simulation";
import {
  broadcastSegments,
  highIntentLeads,
  leadScoreFactors,
  suggestedAiReplies,
  waAutoFollowUps,
} from "@/lib/crm/dummy-data";

function statusStyle(status: (typeof waAutoFollowUps)[number]["status"]) {
  if (status === "scheduled") return "border-sky-400/30 bg-sky-500/10 text-sky-100";
  if (status === "sent") return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
  return "border-amber-400/25 bg-amber-500/10 text-amber-100";
}

function statusLabel(status: (typeof waAutoFollowUps)[number]["status"]) {
  if (status === "scheduled") return "Terjadwal";
  if (status === "sent") return "Terkirim";
  return "Dijeda";
}

export function AiSalesDashboard() {
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const avgScore = useMemo(
    () => Math.round(leadScoreFactors.reduce((a, f) => a + f.value, 0)),
    [],
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-45"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(167, 243, 208, 0.14), transparent 38%), radial-gradient(circle at 10% 40%, rgba(45, 212, 191, 0.1), transparent 45%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">
              SA&apos;YA Umroh OS · AI Sales
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">
              Asisten penjualan AI
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-200/55 sm:text-base">
              Otomasi follow-up WhatsApp, skoring lead, balasan yang disarankan, deteksi minat tinggi, dan
              pratinjau pengingat suara untuk tim sales.
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
              Model: SA&apos;YA-Sales-Lite (dummy)
            </span>
          </div>
        </motion.header>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "High intent aktif", value: `${highIntentLeads.length}`, hint: "Skor ≥ 85 · prioritas CS" },
            { label: "Auto follow-up WA", value: `${waAutoFollowUps.filter((w) => w.status === "scheduled").length}`, hint: "Antrian terjadwal" },
            { label: "Komposit skor AI", value: `${avgScore}`, hint: "Agregat faktor perilaku" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-card rounded-2xl p-4 sm:p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-200/45">{s.label}</p>
              <p className="mt-2 font-mono text-2xl font-semibold text-emerald-50">{s.value}</p>
              <p className="mt-1 text-xs text-emerald-300/55">{s.hint}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-50">Auto follow-up WhatsApp</h2>
            <p className="mt-1 text-sm text-emerald-200/55">
              Pesan terjadwal melalui WhatsApp Business API (placeholder) dengan status kirim.
            </p>
            <ul className="mt-5 space-y-3">
              {waAutoFollowUps.map((row, i) => (
                <motion.li
                  key={row.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-emerald-50">{row.leadName}</p>
                      <p className="font-mono text-[11px] text-emerald-400/50">{row.phoneMasked}</p>
                    </div>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyle(row.status)}`}>
                      {statusLabel(row.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-emerald-300/55">{row.runAt}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-emerald-100/75">{row.snippet}</p>
                  <p className="mt-2 text-[10px] text-emerald-500/45">{row.channel}</p>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-50">Lead scoring</h2>
            <p className="mt-1 text-sm text-emerald-200/55">
              Bobot perilaku dan respons — ringkasan agregat untuk demo (bukan per-lead).
            </p>
            <div className="mt-6 space-y-4">
              {leadScoreFactors.map((f, i) => (
                <div key={f.label}>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-medium text-emerald-100/90">{f.label}</span>
                    <span className="font-mono text-emerald-300/70">
                      {f.value}/{f.weightPct}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-emerald-950/60">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500/80 to-teal-400/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${(f.value / f.weightPct) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-500/55">{f.note}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-50">Balasan AI untuk tim sales</h2>
            <p className="mt-1 text-sm text-emerald-200/55">
              Usulan copy siap kirim — disesuaikan dengan nada percakapan terakhir.
            </p>
            <div className="mt-5 space-y-4">
              {suggestedAiReplies.map((block, i) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + i * 0.05 }}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-emerald-50">{block.leadName}</p>
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-200/60">
                      {block.tone}
                    </span>
                  </div>
                  <p className="mt-2 text-xs italic text-emerald-300/55">&ldquo;{block.lastMessagePreview}&rdquo;</p>
                  <ul className="mt-3 space-y-2">
                    {block.replies.map((reply, j) => (
                      <li
                        key={j}
                        className="flex flex-col gap-2 rounded-lg border border-emerald-500/10 bg-emerald-950/30 p-3 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <p className="text-sm leading-relaxed text-emerald-100/90">{reply}</p>
                        <CopyTextButton text={reply} />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="glass-panel rounded-2xl p-5 sm:p-6"
          >
            <h2 className="text-lg font-semibold text-emerald-50">Deteksi minat tinggi</h2>
            <p className="mt-1 text-sm text-emerald-200/55">
              Sinyal perilaku real-time (dummy) dengan rekomendasi tindakan.
            </p>
            <ul className="mt-5 space-y-3">
              {highIntentLeads.map((h, i) => (
                <motion.li
                  key={h.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16 + i * 0.05 }}
                  className="glass-card rounded-xl border border-emerald-400/15 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-emerald-50">{h.name}</p>
                      <p className="font-mono text-xs text-emerald-400/60">{h.id}</p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-emerald-500/20 px-2 py-1 font-mono text-sm font-bold text-emerald-100 ring-1 ring-emerald-400/30">
                      {h.score}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {h.signals.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-emerald-500/15 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200/85"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs leading-relaxed text-emerald-100/80">
                    <span className="font-semibold text-emerald-300/90">AI: </span>
                    {h.recommendedAction}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        <div className="mt-8">
          <VoiceReminderSimulation />
        </div>
      </div>

      <BroadcastWaModal open={broadcastOpen} onClose={() => setBroadcastOpen(false)} segments={broadcastSegments} />
    </div>
  );
}

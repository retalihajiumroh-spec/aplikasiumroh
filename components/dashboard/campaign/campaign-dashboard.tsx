"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BroadcastWaModal } from "@/components/crm/broadcast-wa-modal";
import { broadcastSegments } from "@/lib/crm/dummy-data";
import {
  campaignObjectives,
  focusPackageOptions,
  recentCampaigns,
} from "@/lib/campaign/dummy-data";
import { formatIdr } from "@/lib/ai-ads/format-idr";

export function CampaignDashboard() {
  const [name, setName] = useState("");
  const [objectiveId, setObjectiveId] = useState(campaignObjectives[0]?.id ?? "leads");
  const [packageId, setPackageId] = useState(focusPackageOptions[0]?.id ?? "ramadan_premium");
  const [startDate, setStartDate] = useState("2026-03-15");
  const [endDate, setEndDate] = useState("2026-04-28");
  const [dailyBudget, setDailyBudget] = useState("2500000");
  const [channelWa, setChannelWa] = useState(true);
  const [channelMeta, setChannelMeta] = useState(true);
  const [notes, setNotes] = useState("");

  const [segmentOn, setSegmentOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(broadcastSegments.map((s) => [s.id, s.id === "high_intent" || s.id === "interested"])),
  );

  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [savedPulse, setSavedPulse] = useState(false);

  const recipientEstimate = useMemo(() => {
    return broadcastSegments.filter((s) => segmentOn[s.id]).reduce((a, s) => a + s.leadCount, 0);
  }, [segmentOn]);

  const toggleSegment = useCallback((id: string) => {
    setSegmentOn((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const openBroadcastModal = useCallback(() => {
    setModalKey((k) => k + 1);
    setBroadcastOpen(true);
  }, []);

  const handleSaveDraft = useCallback(() => {
    setSavedPulse(true);
    window.setTimeout(() => setSavedPulse(false), 700);
  }, []);

  const budgetNum = Number(dailyBudget.replace(/\D/g, "")) || 0;

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(52, 211, 153, 0.14), transparent 45%), radial-gradient(circle at 85% 60%, rgba(45, 212, 191, 0.08), transparent 42%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-emerald-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Campaign &amp; Broadcast</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Buat kampanye pemasaran dan atur segmentasi broadcast WhatsApp — data demo, tanpa backend.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-emerald-500/10 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-emerald-50">Buat kampanye</h2>
                <p className="mt-1 text-sm text-emerald-200/50">Definisikan tujuan, jadwal, dan anggaran harian.</p>
              </div>
              <span className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300/90">
                Draft lokal
              </span>
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveDraft();
              }}
            >
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Nama kampanye</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: Ramadan Premium · push DP"
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-500/35 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Tujuan</span>
                  <select
                    value={objectiveId}
                    onChange={(e) => setObjectiveId(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    {campaignObjectives.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-emerald-200/45">
                    {campaignObjectives.find((o) => o.id === objectiveId)?.hint}
                  </p>
                </label>

                <label className="block sm:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Paket fokus</span>
                  <select
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    {focusPackageOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Mulai</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Selesai</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Budget harian (IDR)</span>
                <input
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(e.target.value)}
                  inputMode="numeric"
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <p className="mt-1.5 text-xs text-emerald-200/45">Pratinjau: {formatIdr(budgetNum)} / hari</p>
              </label>

              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Saluran</legend>
                <div className="mt-3 flex flex-wrap gap-4">
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-emerald-500/15 bg-emerald-950/25 px-3 py-2.5 text-sm text-emerald-100 transition hover:border-emerald-400/25">
                    <input
                      type="checkbox"
                      checked={channelWa}
                      onChange={(e) => setChannelWa(e.target.checked)}
                      className="h-4 w-4 rounded border-emerald-500/40 bg-emerald-950 text-emerald-500 focus:ring-emerald-500/30"
                    />
                    WhatsApp &amp; CRM
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-emerald-500/15 bg-emerald-950/25 px-3 py-2.5 text-sm text-emerald-100 transition hover:border-emerald-400/25">
                    <input
                      type="checkbox"
                      checked={channelMeta}
                      onChange={(e) => setChannelMeta(e.target.checked)}
                      className="h-4 w-4 rounded border-emerald-500/40 bg-emerald-950 text-emerald-500 focus:ring-emerald-500/30"
                    />
                    Meta Ads
                  </label>
                </div>
              </fieldset>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Catatan tim</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="CTA, kode promo, atau arahan kreatif…"
                  className="mt-2 w-full resize-y rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-500/40 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>

              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                <motion.button
                  type="submit"
                  animate={savedPulse ? { scale: [1, 1.02, 1] } : undefined}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-white/10"
                >
                  {savedPulse ? "Disimpan (demo)" : "Simpan draf"}
                </motion.button>
                <button
                  type="button"
                  onClick={openBroadcastModal}
                  className="rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-900/25 transition hover:border-emerald-400/55"
                >
                  Lanjut ke broadcast WA
                </button>
              </div>
            </form>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-emerald-50">Segmentasi broadcast WhatsApp</h2>
              <p className="mt-1 text-sm text-emerald-200/50">
                Pilih kombinasi audiens lead. Estimasi berikut tidak menghitung overlap antar segmen.
              </p>

              <ul className="mt-5 space-y-2">
                {broadcastSegments.map((seg, i) => {
                  const on = !!segmentOn[seg.id];
                  return (
                    <motion.li
                      key={seg.id}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.04 }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSegment(seg.id)}
                        className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                          on
                            ? "border-emerald-400/35 bg-emerald-500/12 ring-1 ring-emerald-400/15"
                            : "border-emerald-500/10 bg-emerald-950/20 hover:border-emerald-400/20"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                            on ? "border-emerald-400/50 bg-emerald-400/20" : "border-emerald-500/25"
                          }`}
                          aria-hidden
                        >
                          {on ? (
                            <svg className="text-emerald-100" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : null}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="font-medium text-emerald-50">{seg.label}</span>
                            <span className="font-mono text-xs text-emerald-300/80">~{seg.leadCount} lead</span>
                          </span>
                          <span className="mt-0.5 block text-xs text-emerald-200/50">{seg.description}</span>
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-3 py-3 text-sm text-emerald-200/70">
                Estimasi penerima (dummy):{" "}
                <span className="font-mono font-semibold text-emerald-100">{recipientEstimate}</span> kontak
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={openBroadcastModal}
                  className="flex-1 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2.5 text-sm font-semibold text-emerald-50 transition hover:border-emerald-400/50 hover:bg-emerald-500/25"
                >
                  Buka composer WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSegmentOn(Object.fromEntries(broadcastSegments.map((s) => [s.id, s.id === "high_intent"])))
                  }
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-emerald-200/75 transition hover:bg-white/5"
                >
                  Reset segmen
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-emerald-50">Kampanye terbaru (demo)</h3>
              <ul className="mt-4 space-y-3">
                {recentCampaigns.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-col gap-1 rounded-xl border border-emerald-500/10 bg-emerald-950/25 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-emerald-100">{c.name}</p>
                      <p className="text-xs text-emerald-200/45">
                        {c.objective} · mulai {c.startLabel}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          c.status === "active"
                            ? "border border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
                            : c.status === "scheduled"
                              ? "border border-sky-400/25 bg-sky-500/15 text-sky-200/90"
                              : "border border-white/10 bg-white/5 text-emerald-200/60"
                        }`}
                      >
                        {c.status}
                      </span>
                      {c.reachEstimate > 0 ? (
                        <span className="font-mono text-[10px] text-emerald-300/70">
                          ~{c.reachEstimate.toLocaleString("id-ID")} reach
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        </div>
      </div>

      <BroadcastWaModal key={modalKey} open={broadcastOpen} onClose={() => setBroadcastOpen(false)} segments={broadcastSegments} />
    </div>
  );
}

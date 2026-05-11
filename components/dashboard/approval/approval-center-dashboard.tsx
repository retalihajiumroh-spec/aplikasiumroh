"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialApprovalRequests, type ApprovalRequest } from "@/lib/approval/dummy-data";
import { formatIdr } from "@/lib/ai-ads/format-idr";

type Decision = "pending" | "approved" | "rejected";

function sectionTitle(kind: ApprovalRequest["kind"]) {
  return kind === "cabang" ? "Cabang" : "Mitra";
}

function ApprovalCard({
  item,
  onApprove,
  onReject,
  index,
}: {
  item: ApprovalRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-xl border border-purple-500/12 bg-purple-950/30 p-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-purple-50 sm:text-base">{item.title}</h3>
        {item.amountIdr != null ? (
          <span className="shrink-0 rounded-lg border border-purple-400/25 bg-purple-500/10 px-2 py-1 font-mono text-xs text-purple-100">
            {formatIdr(item.amountIdr)}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-purple-200/55 sm:text-sm">{item.summary}</p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-purple-400/60">
        <span>{item.submittedBy}</span>
        <span className="font-mono text-purple-300/70">{item.submittedAtLabel}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onApprove(item.id)}
          className="rounded-xl border border-purple-400/40 bg-gradient-to-r from-purple-500/25 to-violet-900/15 px-4 py-2 text-xs font-semibold text-purple-50 sm:text-sm"
        >
          Setujui
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onReject(item.id)}
          className="rounded-xl border border-rose-400/35 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-100/95 sm:text-sm"
        >
          Tolak
        </motion.button>
      </div>
    </motion.article>
  );
}

export function ApprovalCenterDashboard() {
  const [decisionById, setDecisionById] = useState<Record<string, Decision>>(() =>
    Object.fromEntries(initialApprovalRequests.map((r) => [r.id, "pending" as const])),
  );

  const setDecision = useCallback((id: string, d: Exclude<Decision, "pending">) => {
    setDecisionById((prev) => ({ ...prev, [id]: d }));
  }, []);

  const { cabangPending, mitraPending, recentResolved } = useMemo(() => {
    const pending = initialApprovalRequests.filter((r) => decisionById[r.id] === "pending");
    const cabangPending = pending.filter((r) => r.kind === "cabang");
    const mitraPending = pending.filter((r) => r.kind === "mitra");
    const resolved = initialApprovalRequests
      .filter((r) => decisionById[r.id] !== "pending")
      .map((r) => ({ ...r, decision: decisionById[r.id] as "approved" | "rejected" }))
      .sort((a, b) => b.id.localeCompare(a.id))
      .slice(0, 4);
    return { cabangPending, mitraPending, recentResolved: resolved };
  }, [decisionById]);

  const pendingCabangCount = cabangPending.length;
  const pendingMitraCount = mitraPending.length;

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 88% 40%, rgba(156, 77, 204, 0.07), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 border-b border-purple-500/10 pb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400/70">SA&apos;YA Umroh OS</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-purple-50 sm:text-4xl">Approval Center</h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-200/55 sm:text-base">
              Antrian persetujuan untuk <strong className="font-medium text-purple-100/90">Cabang</strong> dan{" "}
              <strong className="font-medium text-purple-100/90">Mitra</strong> — tombol Setujui / Tolak tersimpan lokal (demo).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-purple-200/80 transition hover:border-purple-400/25 hover:bg-purple-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-panel rounded-2xl border border-purple-500/10 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2 border-b border-purple-500/10 pb-4">
              <h2 className="text-lg font-semibold text-purple-50">Antrian Cabang</h2>
              <span className="rounded-full border border-purple-400/25 bg-purple-500/15 px-2.5 py-1 font-mono text-xs text-purple-200">
                {pendingCabangCount} menunggu
              </span>
            </div>
            <p className="mt-3 text-sm text-purple-200/50">Permohonan dari kantor cabang yang memerlukan persetujuan pusat.</p>
            <div className="mt-5 space-y-4">
              <AnimatePresence mode="popLayout">
                {cabangPending.length === 0 ? (
                  <p className="py-8 text-center text-sm text-purple-200/45">Tidak ada antrian cabang.</p>
                ) : (
                  cabangPending.map((item, i) => (
                    <ApprovalCard
                      key={item.id}
                      item={item}
                      index={i}
                      onApprove={(id) => setDecision(id, "approved")}
                      onReject={(id) => setDecision(id, "rejected")}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="glass-panel rounded-2xl border border-purple-500/10 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2 border-b border-purple-500/10 pb-4">
              <h2 className="text-lg font-semibold text-purple-50">Antrian Mitra</h2>
              <span className="rounded-full border border-sky-400/25 bg-sky-500/12 px-2.5 py-1 font-mono text-xs text-sky-100/95">
                {pendingMitraCount} menunggu
              </span>
            </div>
            <p className="mt-3 text-sm text-purple-200/50">Registrasi, tier, diskon khusus, dan permintaan mitra.</p>
            <div className="mt-5 space-y-4">
              <AnimatePresence mode="popLayout">
                {mitraPending.length === 0 ? (
                  <p className="py-8 text-center text-sm text-purple-200/45">Tidak ada antrian mitra.</p>
                ) : (
                  mitraPending.map((item, i) => (
                    <ApprovalCard
                      key={item.id}
                      item={item}
                      index={i}
                      onApprove={(id) => setDecision(id, "approved")}
                      onReject={(id) => setDecision(id, "rejected")}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        </div>

        {recentResolved.length > 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-10 glass-panel rounded-2xl border border-purple-500/10 p-5 sm:p-6"
          >
            <h2 className="text-sm font-semibold text-purple-50">Riwayat singkat (sesi ini)</h2>
            <p className="mt-1 text-xs text-purple-200/45">Maks. 4 entri terakhir setelah Setujui atau Tolak.</p>
            <ul className="mt-4 divide-y divide-purple-500/10">
              {recentResolved.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-purple-100/90">{r.title}</p>
                    <p className="text-xs text-purple-400/55">
                      {sectionTitle(r.kind)} · {r.submittedBy}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      r.decision === "approved"
                        ? "border-purple-400/35 bg-purple-500/15 text-purple-200"
                        : "border-rose-400/35 bg-rose-500/12 text-rose-100/90"
                    }`}
                  >
                    {r.decision === "approved" ? "Disetujui" : "Ditolak"}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}
      </div>
    </div>
  );
}

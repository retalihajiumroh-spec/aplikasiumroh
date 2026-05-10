"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { financialSummary, topPackageCashflow } from "@/lib/reports/dummy-data";
import { formatIdr } from "@/lib/ai-ads/format-idr";

type ExportKind = "pdf" | "xlsx" | "csv" | null;

function downloadTextFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildFinancialCsv(): string {
  const s = financialSummary;
  const header = "metric,value,unit";
  const lines = [
    header,
    `period,"${s.periodLabel}",text`,
    `total_revenue,${s.totalRevenueIdr},idr`,
    `total_cost,${s.totalCostIdr},idr`,
    `gross_margin_pct,${s.grossMarginPct},percent`,
    `net_profit,${s.netProfitIdr},idr`,
    `outstanding_ar,${s.outstandingArIdr},idr`,
    `cash_on_hand,${s.cashOnHandIdr},idr`,
    `bookings_closed,${s.bookingsClosed},count`,
    `avg_ticket,${s.avgTicketIdr},idr`,
    "",
    "package,revenue_idr,cost_idr,margin_pct,pax",
    ...topPackageCashflow.map(
      (r) =>
        `"${r.packageName.replace(/"/g, '""')}",${r.revenueIdr},${r.costIdr},${r.marginPct.toFixed(1)},${r.pax}`,
    ),
  ];
  return "\uFEFF" + lines.join("\n");
}

export function ReportsDashboard() {
  const [exporting, setExporting] = useState<ExportKind>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const runSimulatedExport = useCallback((kind: Exclude<ExportKind, null | "csv">, label: string) => {
    setExporting(kind);
    setLastMessage(null);
    window.setTimeout(() => {
      setExporting(null);
      setLastMessage(`${label} — berkas contoh akan dihasilkan server nanti (simulasi selesai).`);
    }, 900);
  }, []);

  const handleCsv = useCallback(() => {
    setExporting("csv");
    setLastMessage(null);
    window.setTimeout(() => {
      downloadTextFile(`saya-laporan-keuangan-${new Date().toISOString().slice(0, 10)}.csv`, buildFinancialCsv(), "text/csv;charset=utf-8");
      setExporting(null);
      setLastMessage("CSV ringkasan keuangan berhasil diunduh (lokal).");
    }, 400);
  }, []);

  const s = financialSummary;

  const cards = [
    { label: "Total revenue", value: formatIdr(s.totalRevenueIdr), hint: "Bruto paket tercatat" },
    { label: "Total biaya operasi", value: formatIdr(s.totalCostIdr), hint: "Maskapai, hotel, visa, TL" },
    { label: "Margin kotor", value: `${s.grossMarginPct.toFixed(1)}%`, hint: "Atas revenue tercatat" },
    { label: "Laba bersih (est.)", value: formatIdr(s.netProfitIdr), hint: "Setelah overhead pusat" },
    { label: "Piutang (AR)", value: formatIdr(s.outstandingArIdr), hint: "Belum jatuh tempo lunas" },
    { label: "Kas & bank", value: formatIdr(s.cashOnHandIdr), hint: "Posisi likuid" },
  ] as const;

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(156, 77, 204, 0.12), transparent 42%), radial-gradient(circle at 85% 40%, rgba(196, 163, 165, 0.08), transparent 40%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-purple-50 sm:text-4xl">Reports</h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-200/55 sm:text-base">
              Ringkasan keuangan agregat dan ekspor laporan — CSV diunduh lokal; PDF/XLSX disimulasikan tanpa backend.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-purple-200/80 transition hover:border-purple-400/25 hover:bg-purple-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-8 glass-panel rounded-2xl border border-purple-500/10 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-purple-50">Ekspor laporan</h2>
              <p className="mt-0.5 text-xs text-purple-200/50">Pilih format unduhan atau simulasi generate berkas.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={exporting !== null}
                onClick={() => runSimulatedExport("pdf", "PDF executive summary")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-100/95 transition hover:border-rose-400/40 hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {exporting === "pdf" ? "Menyiapkan…" : "Ekspor PDF"}
              </button>
              <button
                type="button"
                disabled={exporting !== null}
                onClick={() => runSimulatedExport("xlsx", "Excel detail transaksi")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-400/25 bg-purple-500/12 px-4 py-2.5 text-sm font-medium text-purple-50 transition hover:border-purple-400/45 hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {exporting === "xlsx" ? "Menyiapkan…" : "Ekspor Excel"}
              </button>
              <button
                type="button"
                disabled={exporting !== null}
                onClick={handleCsv}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/12 px-4 py-2.5 text-sm font-semibold text-sky-50 transition hover:border-sky-400/50 hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-45"
              >
                {exporting === "csv" ? "Membuat CSV…" : "Ekspor CSV"}
              </button>
            </div>
          </div>
          {lastMessage ? (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-lg border border-purple-500/15 bg-purple-950/40 px-3 py-2 text-xs text-purple-200/80"
              role="status"
            >
              {lastMessage}
            </motion.p>
          ) : null}
        </motion.section>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-purple-500/10 pb-3">
          <h2 className="text-lg font-semibold text-purple-50">Ringkasan keuangan</h2>
          <p className="font-mono text-xs text-purple-300/70">{s.periodLabel}</p>
        </div>
        <p className="mt-2 text-xs text-purple-200/50">
          Rata tiket {formatIdr(s.avgTicketIdr)} · {s.bookingsClosed} booking closed (demo).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.04 }}
              className="glass-card rounded-2xl border border-purple-500/10 p-4 sm:p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/65">{c.label}</p>
              <p className="mt-2 font-mono text-xl font-semibold tracking-tight text-purple-50 sm:text-2xl">{c.value}</p>
              <p className="mt-2 text-xs text-purple-200/45">{c.hint}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-10 glass-panel rounded-2xl border border-purple-500/10 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-2 border-b border-purple-500/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-purple-50">Arus per paket (top)</h2>
              <p className="mt-1 text-sm text-purple-200/50">Revenue, biaya langsing, margin — untuk lampiran laporan manajemen.</p>
            </div>
            <button
              type="button"
              disabled={exporting !== null}
              onClick={handleCsv}
              className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-purple-100 transition hover:bg-white/10 disabled:opacity-45"
            >
              Sertakan di CSV
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-purple-500/15 text-[10px] font-semibold uppercase tracking-wider text-purple-400/70">
                  <th className="py-3 pr-4 font-medium">Paket</th>
                  <th className="py-3 pr-4 font-medium text-right">Revenue</th>
                  <th className="py-3 pr-4 font-medium text-right">Biaya</th>
                  <th className="py-3 pr-4 font-medium text-right">Margin</th>
                  <th className="py-3 font-medium text-right">Pax</th>
                </tr>
              </thead>
              <tbody>
                {topPackageCashflow.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.04 * i }}
                    className="border-b border-purple-500/10 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-purple-100/95">{row.packageName}</td>
                    <td className="py-3 pr-4 text-right font-mono text-purple-200/90">{formatIdr(row.revenueIdr)}</td>
                    <td className="py-3 pr-4 text-right font-mono text-purple-200/70">{formatIdr(row.costIdr)}</td>
                    <td className="py-3 pr-4 text-right font-mono text-purple-300/90">{row.marginPct.toFixed(1)}%</td>
                    <td className="py-3 text-right font-mono text-purple-200/75">{row.pax}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

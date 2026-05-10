"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Fragment, useMemo, useRef, useState } from "react";
import type { DashboardJamaahRow } from "@/lib/dashboard/premium-dashboard-data";

const PAGE_SIZE = 5;

export function JamaahDataTable({ rows }: { rows: DashboardJamaahRow[] }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.branch.toLowerCase().includes(s) ||
        r.package.toLowerCase().includes(s) ||
        r.status.toLowerCase().includes(s),
    );
  }, [rows, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const slice = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-4 border-b border-emerald-500/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-emerald-50">Data jamaah</h2>
          <p className="mt-1 text-sm text-emerald-200/55">Tabel ringkas dengan pencarian, pagination, dan detail per baris.</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400/55" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder="Cari nama, cabang, paket…"
            className="w-full rounded-xl border border-emerald-500/15 bg-emerald-950/50 py-2.5 pl-10 pr-3 text-sm text-emerald-50 placeholder:text-emerald-600/45 focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-500/15"
          />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-emerald-500/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-emerald-500/10 bg-emerald-950/40 text-[11px] font-semibold uppercase tracking-wide text-emerald-400/70">
            <tr>
              <th className="w-10 px-2 py-3" scope="col" />
              <th className="px-3 py-3" scope="col">
                Nama
              </th>
              <th className="px-3 py-3" scope="col">
                Status
              </th>
              <th className="px-3 py-3" scope="col">
                Paket
              </th>
              <th className="px-3 py-3" scope="col">
                Pembayaran
              </th>
              <th className="px-3 py-3" scope="col">
                Cabang
              </th>
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => {
              const expanded = openId === row.id;
              return (
                <Fragment key={row.id}>
                  <motion.tr
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setOpenId(expanded ? null : row.id)}
                    className="cursor-pointer border-b border-emerald-500/10 bg-emerald-950/20 transition hover:bg-white/[0.04]"
                  >
                    <td className="px-2 py-2.5 align-middle text-emerald-400/70">
                      {expanded ? <ChevronDown className="mx-auto h-4 w-4" /> : <ChevronRight className="mx-auto h-4 w-4" />}
                    </td>
                    <td className="px-3 py-2.5 font-medium text-emerald-50">{row.name}</td>
                    <td className="px-3 py-2.5 text-emerald-200/75">{row.status}</td>
                    <td className="px-3 py-2.5 text-emerald-200/75">{row.package}</td>
                    <td className="px-3 py-2.5 text-amber-200/85">{row.paymentStatus}</td>
                    <td className="px-3 py-2.5 text-emerald-200/70">{row.branch}</td>
                  </motion.tr>
                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.tr
                        key={`${row.id}-detail`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-b border-emerald-500/10 bg-black/25"
                      >
                        <td colSpan={6} className="px-4 py-3 text-sm leading-relaxed text-emerald-200/65">
                          {row.detail}
                        </td>
                      </motion.tr>
                    ) : null}
                  </AnimatePresence>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-200/55">
        <p>
          Menampilkan{" "}
          <span className="font-mono text-emerald-200/85">
            {filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)}
          </span>{" "}
          dari <span className="font-mono text-emerald-200/85">{filtered.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-lg border border-emerald-500/20 px-3 py-1.5 font-medium text-emerald-200/90 transition enabled:hover:border-amber-400/35 enabled:hover:bg-amber-500/10 disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span className="font-mono text-emerald-400/70">
            {safePage + 1} / {pageCount}
          </span>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="rounded-lg border border-emerald-500/20 px-3 py-1.5 font-medium text-emerald-200/90 transition enabled:hover:border-amber-400/35 enabled:hover:bg-amber-500/10 disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </motion.section>
  );
}

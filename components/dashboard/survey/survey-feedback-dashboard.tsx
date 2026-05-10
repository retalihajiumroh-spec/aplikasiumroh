"use client";

import Link from "next/link";
import { useCallback, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  aspectDefinitions,
  recentSurveySnippets,
  satisfactionSummary,
  starDistribution,
  surveyTopics,
  type RespondentRole,
} from "@/lib/survey/dummy-data";

const STAR_LABELS = ["", "Sangat kurang", "Kurang", "Cukup", "Puas", "Sangat puas"] as const;

function StarButton({
  value,
  selected,
  hovering,
  onSelect,
  onHover,
}: {
  value: number;
  selected: number;
  hovering: number;
  onSelect: (n: number) => void;
  onHover: (n: number) => void;
}) {
  const lit = hovering > 0 ? value <= hovering : value <= selected;
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover(0)}
      onFocus={() => onHover(value)}
      onBlur={() => onHover(0)}
      onClick={() => onSelect(value)}
      className="p-1 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 rounded-lg"
      aria-label={`Beri nilai ${value} dari 5`}
    >
      <svg width="36" height="36" viewBox="0 0 24 24" className={lit ? "text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]" : "text-emerald-800/80"}>
        <path
          fill="currentColor"
          d="M12 3.09l2.06 4.18 4.61.67-3.34 3.25.79 4.59L12 15.9l-4.12 2.17.79-4.59-3.34-3.25 4.61-.67L12 3.09z"
        />
      </svg>
    </button>
  );
}

export function SurveyFeedbackDashboard() {
  const [role, setRole] = useState<RespondentRole>("jamaah");
  const [topicId, setTopicId] = useState(surveyTopics[0]?.id ?? "post_trip");
  const [overall, setOverall] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [aspects, setAspects] = useState<Record<string, number>>(() =>
    Object.fromEntries(aspectDefinitions.map((a) => [a.id, 0])),
  );
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const activeLabel = useMemo(() => {
    const n = hoverStar || overall;
    return n ? STAR_LABELS[n] : "Pilih bintang";
  }, [hoverStar, overall]);

  const setAspect = useCallback((id: string, n: number) => {
    setAspects((prev) => ({ ...prev, [id]: n }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (overall < 1) return;
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 1600);
    },
    [overall],
  );

  const aspectsComplete = aspectDefinitions.every((a) => (aspects[a.id] ?? 0) > 0);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 88% 35%, rgba(251, 191, 36, 0.06), transparent 38%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Survey &amp; Feedback</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Form umpan balik dengan sistem rating kepuasan bintang dan aspek layanan — pengiriman nyata belum terhubung backend.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6 lg:col-span-7"
          >
            <h2 className="text-lg font-semibold text-emerald-50">Form feedback</h2>
            <p className="mt-1 text-sm text-emerald-200/50">Bagikan pengalaman Anda agar kami bisa terus memperbaiki layanan.</p>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Peran</span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as RespondentRole)}
                    className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="jamaah">Jamaah</option>
                    <option value="wali">Wali / keluarga</option>
                    <option value="mitra">Mitra / reseller</option>
                    <option value="internal">Tim internal</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Topik</span>
                  <select
                    value={topicId}
                    onChange={(e) => setTopicId(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    {surveyTopics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-xl border border-amber-400/15 bg-amber-500/[0.06] px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-200/80">Kepuasan keseluruhan</span>
                  <span className="text-sm font-medium text-amber-100/95">{activeLabel}</span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-0.5 sm:justify-start" role="group" aria-label="Rating 1 sampai 5 bintang">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <StarButton
                      key={n}
                      value={n}
                      selected={overall}
                      hovering={hoverStar}
                      onSelect={setOverall}
                      onHover={setHoverStar}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-emerald-200/45">Wajib: pilih 1–5 bintang sebelum mengirim.</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Detail aspek (opsional)</p>
                <p className="mt-1 text-xs text-emerald-200/45">Tap angka 1–5 untuk tiap aspek — membantu tim QA memilah prioritas.</p>
                <ul className="mt-4 space-y-4">
                  {aspectDefinitions.map((a) => (
                    <li key={a.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-sm text-emerald-100/90">{a.label}</span>
                      <div className="flex gap-1.5" role="group" aria-label={`Rating ${a.label}`}>
                        {[1, 2, 3, 4, 5].map((n) => {
                          const on = (aspects[a.id] ?? 0) >= n;
                          return (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setAspect(a.id, n)}
                              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                                on
                                  ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-50"
                                  : "border-emerald-500/15 bg-emerald-950/40 text-emerald-300/50 hover:border-emerald-400/25"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
                {aspectsComplete ? (
                  <p className="mt-3 text-xs font-medium text-emerald-400/85">Semua aspek terisi — terima kasih.</p>
                ) : null}
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Saran &amp; cerita</span>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Yang paling berkesan, atau yang perlu kami perbaiki…"
                  className="mt-2 w-full resize-y rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50 placeholder:text-emerald-500/40 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </label>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <motion.button
                  type="submit"
                  disabled={overall < 1}
                  animate={submitted ? { scale: [1, 1.03, 1] } : undefined}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-50 shadow-lg shadow-emerald-900/25 transition hover:border-emerald-400/55 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitted ? "Tersimpan (simulasi)" : "Kirim feedback"}
                </motion.button>
              </div>
            </form>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 lg:col-span-5"
          >
            <section className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-emerald-50">Sistem rating kepuasan</h2>
              <p className="mt-1 text-sm text-emerald-200/50">Ringkasan agregat {satisfactionSummary.periodLabel} (data demo).</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/30 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/55">Rata-rata bintang</p>
                  <p className="mt-1 flex items-baseline gap-1">
                    <span className="font-mono text-3xl font-semibold text-amber-200">{satisfactionSummary.averageStars.toFixed(1)}</span>
                    <span className="text-sm text-emerald-200/50">/ 5</span>
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/30 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300/55">Respon tercatat</p>
                  <p className="mt-1 font-mono text-3xl font-semibold text-emerald-100">{satisfactionSummary.responseCount}</p>
                  <p className="mt-0.5 text-xs text-emerald-200/45">NPS perkiraan {satisfactionSummary.npsApprox}+</p>
                </div>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Distribusi bintang</p>
              <ul className="mt-3 space-y-2.5">
                {starDistribution.map((row) => (
                  <li key={row.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-14 shrink-0 font-mono text-emerald-200/70">
                      {row.stars}★
                    </span>
                    <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-emerald-950/70">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400/70 to-amber-300/40"
                        initial={{ width: 0 }}
                        animate={{ width: `${row.pct}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.05 + row.stars * 0.04 }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-emerald-300/80">{row.pct}%</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-emerald-200/45">
                Skala bintang mengikuti label: {STAR_LABELS[1]} … {STAR_LABELS[5]}.
              </p>
            </section>

            <section className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-emerald-50">Cuplikan terbaru</h3>
              <ul className="mt-4 space-y-3">
                {recentSurveySnippets.map((s) => (
                  <li key={s.id} className="rounded-xl border border-emerald-500/10 bg-emerald-950/25 px-3 py-2.5">
                    <div className="flex items-start gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold text-emerald-200">
                        {s.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-emerald-100/90">{s.topicLabel}</span>
                          <span className="text-amber-300/90" aria-hidden>
                            {"★".repeat(s.stars)}
                            <span className="sr-only">{s.stars} dari 5 bintang</span>
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-emerald-200/55">{s.excerpt}</p>
                        <p className="mt-1 text-[10px] text-emerald-400/50">{s.whenLabel}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  experienceProfile,
  journeySteps,
  lmsModules,
  reminderTimeline,
  type LmsModule,
  type ReminderItem,
} from "@/lib/jamaah-experience/dummy-data";

function channelLabel(c: ReminderItem["channel"]) {
  if (c === "whatsapp") return "WhatsApp";
  if (c === "app") return "Aplikasi";
  return "Email";
}

function channelIcon(c: ReminderItem["channel"]) {
  if (c === "whatsapp")
    return (
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.92 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm6.16 14.14c-.25.71-1.47 1.38-2.04 1.47-.52.08-1.19.1-1.93-.1-.44-.12-1.02-.29-1.76-.57-3.1-1.34-5.1-4.47-5.25-4.68-.15-.21-1.25-1.66-1.25-3.17 0-1.51.79-2.25 1.07-2.56.28-.31.6-.35.8-.35.2 0 .41.01.59.01.19 0 .44-.07.69.53.25.62.86 2.14.94 2.3.08.15.13.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.45.54-.15.16-.31.34-.13.66.17.31.78 1.28 1.68 2.08 1.16 1.03 2.14 1.35 2.44 1.5.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.21-.3.41-.25.69-.15.28.1 1.78.84 2.09.99.31.15.52.23.6.35.08.13.08.75-.17 1.46z"
      />
    );
  if (c === "app")
    return <path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" />;
  return <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />;
}

export function JamaahExperienceDashboard() {
  const [steps, setSteps] = useState(() => journeySteps.map((s) => ({ ...s })));
  const [modules, setModules] = useState<LmsModule[]>(() => lmsModules.map((m) => ({ ...m })));

  const journeyDone = useMemo(() => steps.filter((s) => s.completed).length, [steps]);
  const journeyTotal = steps.length;

  const lmsAgg = useMemo(() => {
    const lessonsTotal = modules.reduce((a, m) => a + m.lessonsTotal, 0);
    const lessonsDone = modules.reduce((a, m) => a + Math.min(m.lessonsDone, m.lessonsTotal), 0);
    const pct = lessonsTotal ? Math.round((lessonsDone / lessonsTotal) * 100) : 0;
    return { lessonsTotal, lessonsDone, pct };
  }, [modules]);

  const toggleStep = useCallback((id: string) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)));
  }, []);

  const bumpLesson = useCallback((id: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const next = Math.min(m.lessonsTotal, m.lessonsDone + 1);
        return { ...m, lessonsDone: next };
      }),
    );
  }, []);

  const sortedReminders = useMemo(
    () => [...reminderTimeline].sort((a, b) => a.whenSort.localeCompare(b.whenSort)),
    [],
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(52, 211, 153, 0.14), transparent 42%), radial-gradient(circle at 92% 40%, rgba(56, 189, 248, 0.08), transparent 40%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Jamaah Experience</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Perjalanan praktis menuju Tanah Suci: checklist perjalanan, progres LMS, dan jadwal pengingat (demo lokal).
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-emerald-200/60">
              <span className="rounded-lg border border-emerald-500/15 bg-emerald-950/30 px-2.5 py-1 font-medium text-emerald-100/90">
                {experienceProfile.name}
              </span>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1">{experienceProfile.packageLabel}</span>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1">Berangkat {experienceProfile.departureLabel}</span>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1">{experienceProfile.branch}</span>
            </div>
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
            className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6 lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-3 border-b border-emerald-500/10 pb-4">
              <div>
                <h2 className="text-lg font-semibold text-emerald-50">Journey checklist</h2>
                <p className="mt-1 text-sm text-emerald-200/50">Langkah persiapan hingga hari-H — ketuk untuk menandai (simulasi).</p>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-500/15 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-200">
                {journeyDone}/{journeyTotal}
              </span>
            </div>

            <ol className="relative mt-6 space-y-0 pl-1">
              <span
                className="pointer-events-none absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-400/35 via-emerald-500/15 to-emerald-500/5"
                aria-hidden
              />
              {steps.map((step, i) => (
                <li key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className="relative z-[1] mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                    aria-pressed={step.completed}
                    aria-label={`${step.completed ? "Batalkan" : "Selesaikan"}: ${step.title}`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                        step.completed
                          ? "border-emerald-400/45 bg-emerald-500/25 text-emerald-50"
                          : "border-emerald-500/20 bg-emerald-950/50 text-emerald-400/70"
                      }`}
                    >
                      {step.completed ? "✓" : i + 1}
                    </span>
                  </button>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className={`font-medium ${step.completed ? "text-emerald-200/75 line-through decoration-emerald-500/40" : "text-emerald-50"}`}>
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-emerald-200/45">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6 lg:col-span-4"
          >
            <div className="border-b border-emerald-500/10 pb-4">
              <h2 className="text-lg font-semibold text-emerald-50">LMS progress</h2>
              <p className="mt-1 text-sm text-emerald-200/50">Modul pembelajaran pra-keberangkatan.</p>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-500/10 bg-emerald-950/25 p-4">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Total pembelajaran</p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-emerald-50">{lmsAgg.pct}%</p>
                  <p className="mt-0.5 text-xs text-emerald-200/45">
                    {lmsAgg.lessonsDone} / {lmsAgg.lessonsTotal} pelajaran
                  </p>
                </div>
                <div className="relative h-16 w-16 shrink-0">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <path
                      className="text-emerald-500/15"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400/90"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${lmsAgg.pct}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-950/80">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400/80 to-teal-400/70"
                  initial={false}
                  animate={{ width: `${lmsAgg.pct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                />
              </div>
            </div>

            <ul className="mt-5 space-y-4">
              {modules.map((m, idx) => {
                const pct = m.lessonsTotal ? Math.round((m.lessonsDone / m.lessonsTotal) * 100) : 0;
                const done = m.lessonsDone >= m.lessonsTotal;
                return (
                  <motion.li
                    key={m.id}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + idx * 0.04 }}
                    className="rounded-xl border border-emerald-500/10 bg-emerald-950/20 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-emerald-50">{m.title}</p>
                        <p className="mt-0.5 text-xs text-emerald-200/45">{m.description}</p>
                        <p className="mt-1.5 text-[11px] text-emerald-300/55">~{m.estMinutes} menit estimasi</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-emerald-300/85">
                        {m.lessonsDone}/{m.lessonsTotal}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-950/70">
                      <div
                        className={`h-full rounded-full transition-all ${done ? "bg-emerald-400/70" : "bg-emerald-500/45"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {!done ? (
                      <button
                        type="button"
                        onClick={() => bumpLesson(m.id)}
                        className="mt-2 text-xs font-medium text-emerald-300/90 underline-offset-2 hover:text-emerald-200 hover:underline"
                      >
                        +1 pelajaran selesai (demo)
                      </button>
                    ) : (
                      <p className="mt-2 text-xs font-medium text-emerald-400/80">Modul selesai</p>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6 lg:col-span-3"
          >
            <div className="border-b border-emerald-500/10 pb-4">
              <h2 className="text-lg font-semibold text-emerald-50">Reminder timeline</h2>
              <p className="mt-1 text-sm text-emerald-200/50">Urutan kronologis notifikasi penting.</p>
            </div>

            <ul className="relative mt-6 space-y-0 pl-1">
              <span
                className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px bg-emerald-500/15"
                aria-hidden
              />
              {sortedReminders.map((r) => {
                const isDone = r.status === "done";
                const isUpcoming = r.status === "upcoming";
                return (
                  <li key={r.id} className="relative flex gap-3 pb-6 last:pb-0">
                    <div
                      className={`relative z-[1] mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        isDone
                          ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-200"
                          : isUpcoming
                            ? "border-amber-400/35 bg-amber-500/15 text-amber-100"
                            : "border-emerald-500/25 bg-emerald-950/60 text-emerald-300/70"
                      }`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90">
                        {channelIcon(r.channel)}
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300/55">
                          {channelLabel(r.channel)}
                        </span>
                        {isDone ? (
                          <span className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-200/90">
                            Selesai
                          </span>
                        ) : isUpcoming ? (
                          <span className="rounded-md border border-amber-400/25 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-100/90">
                            Mendatang
                          </span>
                        ) : (
                          <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-200/65">
                            Terjadwal
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-emerald-50">{r.title}</p>
                      <p className="mt-0.5 font-mono text-xs text-emerald-300/75">{r.whenLabel}</p>
                      {r.note ? <p className="mt-1.5 text-xs text-emerald-200/45">{r.note}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

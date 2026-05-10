"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  initialReminders,
  initialTasks,
  type ReminderItem,
  type TaskItem,
  type TaskPriority,
} from "@/lib/tasks/dummy-data";

const priorityOrder: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };

function priorityStyles(p: TaskPriority) {
  if (p === "high") return "border-rose-400/35 bg-rose-500/12 text-rose-100";
  if (p === "medium") return "border-amber-400/30 bg-amber-500/10 text-amber-100";
  return "border-emerald-500/25 bg-emerald-500/10 text-emerald-100/90";
}

function priorityLabel(p: TaskPriority) {
  if (p === "high") return "Tinggi";
  if (p === "medium") return "Sedang";
  return "Rendah";
}

function channelLabel(c: ReminderItem["channel"]) {
  if (c === "whatsapp") return "WhatsApp";
  if (c === "app") return "Aplikasi";
  return "Kalender";
}

export function TasksDashboard() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => initialTasks.map((t) => ({ ...t })));
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
  const [hideCompleted, setHideCompleted] = useState(false);
  const [dismissedReminderIds, setDismissedReminderIds] = useState<Record<string, boolean>>({});
  const [snoozeFlash, setSnoozeFlash] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (priorityFilter !== "all") list = list.filter((t) => t.priority === priorityFilter);
    if (hideCompleted) list = list.filter((t) => !t.completed);
    return [...list].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const pr = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (pr !== 0) return pr;
      return a.dueSort.localeCompare(b.dueSort);
    });
  }, [tasks, priorityFilter, hideCompleted]);

  const activeReminders = useMemo(() => {
    return [...initialReminders]
      .filter((r) => !dismissedReminderIds[r.id])
      .sort((a, b) => a.whenSort.localeCompare(b.whenSort));
  }, [dismissedReminderIds]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const dismissReminder = useCallback((id: string) => {
    setDismissedReminderIds((prev) => ({ ...prev, [id]: true }));
  }, []);

  const snoozeReminder = useCallback((id: string) => {
    setSnoozeFlash(id);
    window.setTimeout(() => setSnoozeFlash(null), 1200);
  }, []);

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-20 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 88% 45%, rgba(56, 189, 248, 0.07), transparent 40%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Tasks &amp; Reminder</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Daftar tugas dengan prioritas dan tenggat, plus jadwal pengingat saluran — semua penyimpanan lokal (demo).
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
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
              <div className="flex flex-col gap-4 border-b border-emerald-500/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-emerald-50">Task list</h2>
                  <p className="mt-1 text-sm text-emerald-200/50">Prioritas, deadline, dan penanggung jawab.</p>
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-emerald-200/70">
                  <input
                    type="checkbox"
                    checked={hideCompleted}
                    onChange={(e) => setHideCompleted(e.target.checked)}
                    className="h-4 w-4 rounded border-emerald-500/40 bg-emerald-950 text-emerald-500"
                  />
                  Sembunyikan selesai
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(["all", "high", "medium", "low"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setPriorityFilter(f)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      priorityFilter === f
                        ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-50"
                        : "border-emerald-500/15 bg-emerald-950/30 text-emerald-200/65 hover:border-emerald-400/25"
                    }`}
                  >
                    {f === "all" ? "Semua" : priorityLabel(f)}
                  </button>
                ))}
              </div>

              <ul className="mt-6 space-y-3">
                <AnimatePresence initial={false}>
                  {filteredTasks.map((task, i) => (
                    <motion.li
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`rounded-xl border px-4 py-3 transition ${
                        task.completed
                          ? "border-emerald-500/10 bg-emerald-950/20 opacity-70"
                          : "border-emerald-500/15 bg-emerald-950/30"
                      }`}
                    >
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => toggleTask(task.id)}
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                            task.completed
                              ? "border-emerald-400/50 bg-emerald-500/25 text-emerald-100"
                              : "border-emerald-500/30 bg-emerald-950/50 text-transparent hover:border-emerald-400/40"
                          }`}
                          aria-pressed={task.completed}
                          aria-label={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
                        >
                          {task.completed ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : null}
                        </button>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${priorityStyles(task.priority)}`}>
                              {priorityLabel(task.priority)}
                            </span>
                            <span className="font-mono text-[11px] text-emerald-300/75">{task.dueLabel}</span>
                          </div>
                          <h3
                            className={`mt-1.5 text-sm font-semibold sm:text-base ${task.completed ? "text-emerald-200/50 line-through" : "text-emerald-50"}`}
                          >
                            {task.title}
                          </h3>
                          <p className="mt-1 text-xs text-emerald-200/50">{task.detail}</p>
                          <p className="mt-2 text-[11px] text-emerald-400/55">@{task.assignee}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {filteredTasks.length === 0 ? (
                <p className="mt-8 text-center text-sm text-emerald-200/45">Tidak ada tugas untuk filter ini.</p>
              ) : null}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-emerald-50">Reminder system</h2>
              <p className="mt-1 text-sm text-emerald-200/50">
                Pengingat otomatis terjadwal (simulasi). Abaikan atau tunda — tidak mengirim pesan nyata.
              </p>

              <ul className="relative mt-6 space-y-0 pl-1">
                <span className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px bg-emerald-500/15" aria-hidden />
                <AnimatePresence initial={false}>
                  {activeReminders.map((r) => (
                    <motion.li
                      key={r.id}
                      layout
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative flex gap-3 pb-6 last:pb-0"
                    >
                      <div
                        className="relative z-[1] mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-[10px] font-bold text-emerald-200"
                        aria-hidden
                      >
                        {r.channel === "whatsapp" ? "WA" : r.channel === "app" ? "In" : "Cal"}
                      </div>
                      <div className="min-w-0 flex-1 rounded-xl border border-emerald-500/10 bg-emerald-950/25 px-3 py-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400/65">
                            {channelLabel(r.channel)}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-300/75">{r.whenLabel}</span>
                          {snoozeFlash === r.id ? (
                            <span className="rounded-md border border-sky-400/30 bg-sky-500/15 px-1.5 py-0.5 text-[10px] text-sky-100">
                              Ditunda 24 jam (demo)
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-emerald-50">{r.title}</p>
                        {r.note ? <p className="mt-1 text-xs text-emerald-200/45">{r.note}</p> : null}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => snoozeReminder(r.id)}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-emerald-200/85 transition hover:bg-white/10"
                          >
                            Tunda 24 jam
                          </button>
                          <button
                            type="button"
                            onClick={() => dismissReminder(r.id)}
                            className="rounded-lg border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300/90 transition hover:bg-emerald-500/10"
                          >
                            Abaikan
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {activeReminders.length === 0 ? (
                <p className="mt-6 text-center text-sm text-emerald-200/45">Tidak ada pengingat aktif.</p>
              ) : null}

              {Object.keys(dismissedReminderIds).length > 0 ? (
                <button
                  type="button"
                  onClick={() => setDismissedReminderIds({})}
                  className="mt-5 w-full rounded-xl border border-white/10 py-2 text-xs font-medium text-emerald-200/70 transition hover:bg-white/5"
                >
                  Pulihkan pengingat yang diabaikan
                </button>
              ) : null}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

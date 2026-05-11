import { CheckCircle2, Clock3, Plane, Route } from "lucide-react";
import { Card } from "@/components/ui/card";
import { jamaahOverview } from "@/data/dashboard";

export function JamaahDashboard() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Card className="p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">
              Dashboard Jamaah
            </p>
            <h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">
              Assalamu&apos;alaikum, {jamaahOverview.name}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Paket aktif: {jamaahOverview.packageName}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
            <Plane className="h-6 w-6 text-emerald-400" />
            <p className="mt-4 text-sm opacity-70">Keberangkatan</p>
            <p className="font-bold">{jamaahOverview.departureDate}</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Progress persiapan</span>
            <span>{jamaahOverview.progress}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${jamaahOverview.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {jamaahOverview.tasks.map((task) => (
            <div
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
              key={task.label}
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <p className="mt-3 font-semibold text-slate-950 dark:text-white">{task.label}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{task.status}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-3">
          <Route className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Itinerary</h2>
        </div>
        <div className="mt-6 grid gap-5">
          {jamaahOverview.itinerary.map((item) => (
            <div className="flex gap-4" key={item.day}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{item.day}</p>
                <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.city}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

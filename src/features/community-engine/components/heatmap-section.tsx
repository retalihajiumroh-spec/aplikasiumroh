import { OwnerPanel, SectionHeader, StatusPill } from "@/features/owner-dashboard/components/owner-panel";
import type { HeatmapDay, HeatmapHour, InteractionSpike } from "@/data/community-engine";

function heatColor(intensity: number) {
  const t = intensity / 100;
  const r = Math.round(2 + (45 - 2) * (1 - t));
  const g = Math.round(16 + (209 - 16) * t);
  const b = Math.round(52 + (148 - 52) * t);
  return `rgba(${r},${g},${b},${0.25 + t * 0.65})`;
}

export function HeatmapSection({
  days,
  hours,
  spikes
}: {
  days: HeatmapDay[];
  hours: HeatmapHour[];
  spikes: InteractionSpike[];
}) {
  const maxDay = Math.max(...days.map((d) => d.intensity), 1);
  const maxHour = Math.max(...hours.map((h) => h.intensity), 1);

  const hourSparkPath = (() => {
    const w = 520;
    const h = 110;
    const values = hours.map((hour) => hour.intensity);
    const path = values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * w;
        const y = h - (value / maxHour) * (h - 12) - 6;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    return { path, w, h };
  })();

  return (
    <OwnerPanel className="community-animate-in xl:col-span-8 [animation-delay:160ms]">
      <SectionHeader
        eyebrow="Temporal intelligence"
        title="Community heatmap"
        description="Lihat jam padat, hari paling hidup, dan lonjakan interaksi yang bisa dipetakan ke kampanye."
        action={<StatusPill>Normalized · local timezone</StatusPill>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Busiest days</p>
              <p className="text-xs text-slate-500">Relatif volume interaksi · rolling 14 hari</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-300">
              Jumat memimpin narasi komunitas
            </span>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div className="flex flex-col items-center gap-2" key={day.day}>
                <div
                  className="flex w-full items-end justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-2"
                  style={{ height: "140px" }}
                >
                  <div
                    className="w-full rounded-xl border border-white/10 shadow-[0_12px_40px_rgba(16,185,129,0.18)] transition hover:scale-[1.02]"
                    style={{
                      height: `${(day.intensity / maxDay) * 100}%`,
                      minHeight: "18%",
                      background: `linear-gradient(180deg, ${heatColor(day.intensity)}, rgba(15,23,42,0.15))`
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {spikes.map((spike) => (
            <div
              className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-emerald-400/10 via-slate-950/60 to-slate-950/30 p-4"
              key={spike.id}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-200/80">Interaction spike</p>
              <p className="mt-2 text-base font-black text-white">{spike.title}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-200">{spike.window}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{spike.detail}</p>
              <div className="mt-4 inline-flex rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-100">
                {spike.lift}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-white">Active hours fingerprint</p>
            <p className="text-xs text-slate-500">24 jam · tinggi rendahnya gelombang pesan & reaksi</p>
          </div>
          <div className="flex gap-4 text-[11px] font-semibold text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-lime-300" />
              Intensity
            </span>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <svg className="min-w-[640px] w-full" height="140" role="img" viewBox={`0 0 ${hourSparkPath.w} ${hourSparkPath.h}`} aria-label="Grafik aktivitas per jam">
            <defs>
              <linearGradient id="communityHourFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((line) => (
              <line
                key={line}
                stroke="rgba(148,163,184,0.12)"
                strokeWidth="1"
                x1="0"
                x2={hourSparkPath.w}
                y1={line * 28 + 18}
                y2={line * 28 + 18}
              />
            ))}
            <path
              d={`${hourSparkPath.path} L ${hourSparkPath.w} ${hourSparkPath.h} L 0 ${hourSparkPath.h} Z`}
              fill="url(#communityHourFill)"
            />
            <path
              className="community-draw-line"
              d={hourSparkPath.path}
              fill="none"
              stroke="#6ee7b7"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-x-2 text-[10px] font-semibold text-slate-500">
          {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => (
            <span className="tabular-nums" key={hour}>
              {hour.toString().padStart(2, "0")}:00
            </span>
          ))}
        </div>
      </div>
    </OwnerPanel>
  );
}

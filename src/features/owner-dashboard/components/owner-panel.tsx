import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function OwnerPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-emerald-950/20 backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.34em] text-emerald-300/80">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-white md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatusPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-bold text-emerald-200",
        className
      )}
    >
      {children}
    </span>
  );
}

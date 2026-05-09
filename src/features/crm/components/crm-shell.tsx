import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CrmPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-white/10 bg-white/[0.055] shadow-2xl shadow-emerald-950/20 backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  );
}

export function CrmSectionHeader({
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
    <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.34em] text-emerald-300/80">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function CrmPill({ children, className }: { children: ReactNode; className?: string }) {
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

import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400",
  secondary:
    "border border-white/15 bg-white/10 text-white hover:bg-white/15 dark:border-white/10",
  ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
};

const baseClass =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(baseClass, variants[variant], className)} {...props} />;
}

export function LinkButton({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={cn(baseClass, variants[variant], className)} href={href} {...props}>
      {children}
    </Link>
  );
}

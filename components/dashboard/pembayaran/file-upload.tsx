"use client";

import { useId, useRef } from "react";
import { motion } from "framer-motion";

const ACCEPT = "image/jpeg,image/png,.jpg,.jpeg,.png";

function isAllowedImage(f: File): boolean {
  const okType = f.type === "image/jpeg" || f.type === "image/png";
  const okExt = /\.(jpe?g|png)$/i.test(f.name);
  return okType || okExt;
}

export function PaymentProofUpload({
  files,
  onChange,
  error,
  label = "Upload bukti pembayaran",
  hint = "Beberapa file JPG/PNG sekaligus.",
}: {
  files: File[];
  onChange: (next: File[]) => void;
  error?: string;
  label?: string;
  hint?: string;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  function addFromList(list: FileList | null) {
    if (!list?.length) return;
    const next = [...files];
    const rejected: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const f = list[i]!;
      if (!isAllowedImage(f)) {
        rejected.push(f.name);
        continue;
      }
      next.push(f);
    }
    onChange(next);
    if (rejected.length && inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-zinc-400/65">
        {label}
      </label>
      <p className="mt-0.5 text-[11px] text-slate-500/85">{hint}</p>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPT}
        multiple
        onChange={(e) => {
          addFromList(e.target.files);
          e.target.value = "";
        }}
        className={
          "mt-2 block w-full cursor-pointer rounded-xl border border-zinc-600/15 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-300/80 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-zinc-600/20 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-zinc-200 " +
          (error ? "ring-1 ring-rose-400/40" : "")
        }
      />
      {files.length > 0 ? (
        <ul className="mt-2 space-y-1.5">
          {files.map((f, i) => (
            <motion.li
              key={`${f.name}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between gap-2 rounded-lg border border-zinc-600/10 bg-zinc-950/35 px-2 py-1.5 text-[11px]"
            >
              <span className="min-w-0 truncate font-mono text-zinc-300/90">{f.name}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, j) => j !== i))}
                className="shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-rose-200/90 hover:bg-rose-500/15"
              >
                Hapus
              </button>
            </motion.li>
          ))}
        </ul>
      ) : null}
      {error ? (
        <p className="mt-1 text-xs font-medium text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

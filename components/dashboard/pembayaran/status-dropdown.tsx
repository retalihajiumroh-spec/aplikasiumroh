"use client";

import { PAYMENT_ADMIN_STATUS, paymentStatusLabel, type PaymentAdminStatus } from "@/lib/pembayaran/payment-types";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-purple-500/15 bg-purple-950/45 px-3 py-2.5 text-sm text-purple-50 outline-none focus:border-violet-400/45 focus:ring-2 focus:ring-violet-500/15";

export function PaymentStatusDropdown({
  id,
  value,
  onChange,
  label = "Status pembayaran",
  error,
  disabled,
}: {
  id?: string;
  value: PaymentAdminStatus;
  onChange: (v: PaymentAdminStatus) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}) {
  const fid = id ?? "payment-status";

  return (
    <label htmlFor={fid}>
      <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/65">{label}</span>
      <select
        id={fid}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as PaymentAdminStatus)}
        className={inputClass + (error ? " border-rose-400/45 ring-1 ring-rose-500/25" : "") + (disabled ? " opacity-60" : "")}
      >
        {PAYMENT_ADMIN_STATUS.map((s) => (
          <option key={s} value={s} className="bg-purple-950">
            {paymentStatusLabel(s)}
          </option>
        ))}
      </select>
      {error ? (
        <p className="mt-1 text-xs text-rose-300" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

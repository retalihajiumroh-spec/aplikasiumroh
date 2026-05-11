"use client";

import { useFormState, useFormStatus } from "react-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { loginWithPassword, type LoginState } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";

const initialState: LoginState = {
  message: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? "Memproses..." : "Masuk Dashboard"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginWithPassword, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        Email
        <span className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
            name="email"
            placeholder="nama@email.com"
            required
            type="email"
          />
        </span>
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        Password
        <span className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
            name="password"
            placeholder="Password akun jamaah"
            required
            type="password"
          />
        </span>
      </label>

      {state.message ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

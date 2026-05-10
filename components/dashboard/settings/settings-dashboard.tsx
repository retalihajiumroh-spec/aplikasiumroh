"use client";

import Link from "next/link";
import { useCallback, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  branchConfigs,
  defaultNotificationSettings,
  defaultPricingDefaults,
  initialUsers,
  roleLabels,
  type BranchConfig,
  type NotificationSettings,
  type PricingDefaults,
  type SettingsUser,
  type UserRole,
  type UserStatus,
} from "@/lib/settings/dummy-data";
import { formatIdr } from "@/lib/ai-ads/format-idr";

function statusStyles(s: UserStatus) {
  if (s === "active") return "border-emerald-400/30 bg-emerald-500/12 text-emerald-100";
  if (s === "invited") return "border-sky-400/30 bg-sky-500/12 text-sky-100/95";
  return "border-rose-400/30 bg-rose-500/10 text-rose-100/90";
}

function statusLabel(s: UserStatus) {
  if (s === "active") return "Aktif";
  if (s === "invited") return "Diundang";
  return "Nonaktif";
}

export function SettingsDashboard() {
  const [users, setUsers] = useState<SettingsUser[]>(() => initialUsers.map((u) => ({ ...u })));
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("marketing");
  const [inviteBranch, setInviteBranch] = useState("Pusat");

  const [branchDrafts, setBranchDrafts] = useState<Record<string, BranchConfig>>(() =>
    Object.fromEntries(branchConfigs.map((b) => [b.id, { ...b }])),
  );
  const [selectedBranchId, setSelectedBranchId] = useState(branchConfigs[0]?.id ?? "br-pusat");

  const [pricing, setPricing] = useState<PricingDefaults>(() => ({ ...defaultPricingDefaults }));
  const [notif, setNotif] = useState<NotificationSettings>(() => ({ ...defaultNotificationSettings }));

  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const currentBranch = branchDrafts[selectedBranchId];

  const branchOptions = useMemo(() => branchConfigs.map((b) => ({ id: b.id, label: `${b.name} · ${b.city}` })), []);

  const updateBranchField = useCallback(
    <K extends keyof BranchConfig>(field: K, value: BranchConfig[K]) => {
      setBranchDrafts((prev) => ({
        ...prev,
        [selectedBranchId]: { ...prev[selectedBranchId], [field]: value },
      }));
    },
    [selectedBranchId],
  );

  const setUserRole = useCallback((id: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }, []);

  const toggleUserSuspend = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        if (u.status === "suspended") return { ...u, status: "active" as const };
        if (u.status === "active") return { ...u, status: "suspended" as const };
        return u;
      }),
    );
  }, []);

  const handleInvite = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = inviteEmail.trim().toLowerCase();
      if (!email || !email.includes("@")) return;
      const id = `u-${Date.now()}`;
      setUsers((prev) => [
        ...prev,
        {
          id,
          name: email.split("@")[0] ?? "Pengguna baru",
          email,
          role: inviteRole,
          status: "invited",
          branchLabel: inviteBranch,
        },
      ]);
      setInviteEmail("");
      showToast("Undangan ditambahkan ke daftar (demo).");
    },
    [inviteEmail, inviteRole, inviteBranch, showToast],
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden pb-24 pt-6 sm:pt-10">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(52, 211, 153, 0.12), transparent 42%), radial-gradient(circle at 88% 40%, rgba(56, 189, 248, 0.07), transparent 40%)",
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
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-50 sm:text-4xl">Settings</h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-200/55 sm:text-base">
              Kelola pengguna, profil cabang, serta default harga dan notifikasi — perubahan disimpan lokal (demo).
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-200/80 transition hover:border-emerald-400/25 hover:bg-emerald-500/10"
          >
            ← Hub
          </Link>
        </motion.header>

        {toast ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl border border-emerald-400/30 bg-emerald-950/95 px-4 py-2 text-sm text-emerald-100 shadow-xl backdrop-blur-md"
            role="status"
          >
            {toast}
          </motion.p>
        ) : null}

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-10 glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
        >
          <h2 className="text-lg font-semibold text-emerald-50">User management</h2>
          <p className="mt-1 text-sm text-emerald-200/50">Peran, cabang, dan status akses pengguna.</p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-emerald-500/10">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-emerald-500/15 bg-emerald-950/40 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/70">
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Peran</th>
                  <th className="px-4 py-3 font-medium">Cabang</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-emerald-500/10 last:border-0">
                    <td className="px-4 py-3 font-medium text-emerald-50">{u.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-emerald-200/70">{u.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        disabled={u.status === "suspended" || u.role === "owner"}
                        onChange={(e) => setUserRole(u.id, e.target.value as UserRole)}
                        className="max-w-[160px] cursor-pointer rounded-lg border border-emerald-500/20 bg-emerald-950/50 px-2 py-1.5 text-xs text-emerald-50 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                          <option key={r} value={r}>
                            {roleLabels[r]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-emerald-200/70">{u.branchLabel}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyles(u.status)}`}>
                        {statusLabel(u.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.role !== "owner" ? (
                        <button
                          type="button"
                          onClick={() => toggleUserSuspend(u.id)}
                          className="text-xs font-medium text-emerald-300/90 underline-offset-2 hover:text-emerald-200 hover:underline"
                        >
                          {u.status === "suspended" ? "Aktifkan" : "Nonaktifkan"}
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-500/45">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form onSubmit={handleInvite} className="mt-6 rounded-xl border border-emerald-500/10 bg-emerald-950/25 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Undang pengguna</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
              <label className="block min-w-[200px] flex-1">
                <span className="text-[10px] text-emerald-400/60">Email</span>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="nama@perusahaan.id"
                  className="mt-1 w-full rounded-lg border border-emerald-500/15 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-50 placeholder:text-emerald-600/50"
                />
              </label>
              <label className="block w-full sm:w-40">
                <span className="text-[10px] text-emerald-400/60">Peran</span>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as UserRole)}
                  className="mt-1 w-full rounded-lg border border-emerald-500/15 bg-emerald-950/40 px-2 py-2 text-sm text-emerald-50"
                >
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                    <option key={r} value={r}>
                      {roleLabels[r]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block w-full sm:w-36">
                <span className="text-[10px] text-emerald-400/60">Cabang</span>
                <input
                  value={inviteBranch}
                  onChange={(e) => setInviteBranch(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-emerald-500/15 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-50"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-500/25"
              >
                Kirim undangan
              </button>
            </div>
          </form>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-8 glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
        >
          <h2 className="text-lg font-semibold text-emerald-50">Branch settings</h2>
          <p className="mt-1 text-sm text-emerald-200/50">Kontak, zona waktu, dan alamat tampil di dokumen &amp; WA bisnis.</p>

          <label className="mt-5 block max-w-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Pilih cabang</span>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
            >
              {branchOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          {currentBranch ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Alamat</span>
                <input
                  value={currentBranch.addressLine}
                  onChange={(e) => updateBranchField("addressLine", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Telepon kantor</span>
                <input
                  value={currentBranch.phone}
                  onChange={(e) => updateBranchField("phone", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Zona waktu</span>
                <input
                  value={currentBranch.timezone}
                  onChange={(e) => updateBranchField("timezone", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">WhatsApp Business</span>
                <input
                  value={currentBranch.waBusinessLine}
                  onChange={(e) => updateBranchField("waBusinessLine", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50"
                />
              </label>
            </div>
          ) : null}

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => showToast(`Profil cabang disimpan (demo): ${currentBranch?.name ?? ""}`)}
              className="rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-600/15 px-5 py-2.5 text-sm font-semibold text-emerald-50"
            >
              Simpan cabang
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.11 }}
          className="mt-8 glass-panel rounded-2xl border border-emerald-500/10 p-5 sm:p-6"
        >
          <h2 className="text-lg font-semibold text-emerald-50">Pricing &amp; notification settings</h2>
          <p className="mt-1 text-sm text-emerald-200/50">Default margin publik, pembulatan harga, dan saluran notifikasi otomatis.</p>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-emerald-100/90">Harga</h3>
              <label className="mt-4 block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Markup default (%)</span>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  max={99}
                  value={pricing.defaultMarkupPct}
                  onChange={(e) => setPricing((p) => ({ ...p, defaultMarkupPct: Number(e.target.value) || 0 }))}
                  className="mt-2 w-full max-w-xs rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50"
                />
              </label>
              <label className="mt-4 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={pricing.showTaxInclusive}
                  onChange={(e) => setPricing((p) => ({ ...p, showTaxInclusive: e.target.checked }))}
                  className="h-4 w-4 rounded border-emerald-500/40 bg-emerald-950 text-emerald-500"
                />
                <span className="text-sm text-emerald-200/80">Tampilkan harga termasuk PPN 11% di penawaran</span>
              </label>
              <label className="mt-4 block">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Pembulatan harga publik</span>
                <select
                  value={pricing.roundToNearest}
                  onChange={(e) => setPricing((p) => ({ ...p, roundToNearest: Number(e.target.value) }))}
                  className="mt-2 w-full max-w-xs rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-50"
                >
                  {[10_000, 25_000, 50_000, 100_000, 250_000].map((n) => (
                    <option key={n} value={n}>
                      {formatIdr(n)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-emerald-100/90">Notifikasi</h3>
              <ul className="mt-4 space-y-3">
                {(
                  [
                    { key: "waNewLead" as const, label: "WhatsApp: lead baru masuk CRM" },
                    { key: "waPaymentReceived" as const, label: "WhatsApp: pembayaran diterima" },
                    { key: "emailDailyDigest" as const, label: "Email: ringkasan harian performa" },
                    { key: "pushDepartureReminder" as const, label: "Push app: pengingat H-7 keberangkatan" },
                  ] as const
                ).map((row) => (
                  <li key={row.key}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-1 py-1 transition hover:border-emerald-500/10">
                      <input
                        type="checkbox"
                        checked={notif[row.key]}
                        onChange={(e) => setNotif((n) => ({ ...n, [row.key]: e.target.checked }))}
                        className="h-4 w-4 rounded border-emerald-500/40 bg-emerald-950 text-emerald-500"
                      />
                      <span className="text-sm text-emerald-200/80">{row.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <label className="mt-4 block max-w-xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/60">Jam kirim digest (WIB)</span>
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={notif.emailDigestHour}
                  onChange={(e) => setNotif((n) => ({ ...n, emailDigestHour: Math.min(23, Math.max(0, Number(e.target.value) || 0)) }))}
                  className="mt-2 w-full rounded-xl border border-emerald-500/15 bg-emerald-950/40 px-3 py-2.5 font-mono text-sm text-emerald-50"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-emerald-500/10 pt-5">
            <button
              type="button"
              onClick={() => showToast("Pengaturan harga & notifikasi disimpan (demo).")}
              className="rounded-xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/25 to-teal-600/15 px-5 py-2.5 text-sm font-semibold text-emerald-50"
            >
              Simpan harga &amp; notifikasi
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

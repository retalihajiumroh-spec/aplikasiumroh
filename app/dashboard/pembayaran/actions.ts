"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PaymentEntryPayload = {
  package_id: string;
  package_label: string;
  jamaah_id: string;
  jamaah_name: string;
  amount_idr: number;
  payment_type: string;
  status: string;
  proof_filenames: string[];
};

export type InsertPaymentResult =
  | { ok: true; rows: { id: string; created_at: string }[] }
  | { ok: false; error: string };

export async function insertPaymentEntriesAction(entries: PaymentEntryPayload[]): Promise<InsertPaymentResult> {
  if (entries.length === 0) return { ok: false, error: "Tidak ada data pembayaran." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Supabase tidak dikonfigurasi." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Sesi tidak valid. Silakan login ulang." };
  }

  const payload = entries.map((e) => ({
    created_by: user.id,
    package_id: e.package_id,
    package_label: e.package_label,
    jamaah_id: e.jamaah_id,
    jamaah_name: e.jamaah_name,
    amount_idr: e.amount_idr,
    payment_type: e.payment_type,
    status: e.status,
    proof_filenames: e.proof_filenames,
  }));

  const { data, error } = await supabase.from("payment_entries").insert(payload).select("id, created_at");

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Gagal menyimpan pembayaran." };
  }

  const rows = data.map((r) => ({ id: r.id as string, created_at: r.created_at as string }));

  revalidatePath("/dashboard/pembayaran");
  return { ok: true, rows };
}

export async function deletePaymentEntryAction(id: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase tidak dikonfigurasi." };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("payment_entries").delete().eq("id", id).eq("created_by", user.id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard/pembayaran");
  return { ok: true };
}

export async function updatePaymentEntryStatusAction(
  id: string,
  status: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "Supabase tidak dikonfigurasi." };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Unauthorized" };

  const { error } = await supabase.from("payment_entries").update({ status }).eq("id", id).eq("created_by", user.id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard/pembayaran");
  return { ok: true };
}

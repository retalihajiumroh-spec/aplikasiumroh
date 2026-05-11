import type { SavedPaymentEntry } from "@/lib/pembayaran/payment-types";

const KEY = "saya_payment_entries_v1";

function parse(json: string | null): unknown {
  if (!json) return null;
  try {
    return JSON.parse(json) as unknown;
  } catch {
    return null;
  }
}

export function loadLocalPaymentEntries(): SavedPaymentEntry[] {
  if (typeof window === "undefined") return [];
  const raw = parse(window.localStorage.getItem(KEY));
  if (!Array.isArray(raw)) return [];
  return raw.filter((x): x is SavedPaymentEntry => x && typeof x === "object" && "id" in x && "amountIdr" in x) as SavedPaymentEntry[];
}

export function appendLocalPaymentEntries(entries: SavedPaymentEntry[]): void {
  if (typeof window === "undefined") return;
  const cur = loadLocalPaymentEntries();
  window.localStorage.setItem(KEY, JSON.stringify([...entries, ...cur]));
}

export function replaceLocalPaymentEntries(all: SavedPaymentEntry[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateLocalPaymentEntry(id: string, patch: Partial<SavedPaymentEntry>): void {
  const cur = loadLocalPaymentEntries();
  const next = cur.map((e) => (e.id === id ? { ...e, ...patch } : e));
  replaceLocalPaymentEntries(next);
}

export function deleteLocalPaymentEntry(id: string): void {
  replaceLocalPaymentEntries(loadLocalPaymentEntries().filter((e) => e.id !== id));
}

export function isLikelyServerPaymentId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

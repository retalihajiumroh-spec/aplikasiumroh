import type { UmrohPackage } from "@/lib/paket/dummy-data";
import type { PackageFormValues } from "@/lib/paket/package-form-types";

const PKG_KEY = "saya_umroh_user_packages_v1";
const DRAFT_KEY = "saya_umroh_package_form_draft_v1";

function safeParse(json: string | null): unknown {
  if (!json) return null;
  try {
    return JSON.parse(json) as unknown;
  } catch {
    return null;
  }
}

export interface StoredUserPackage extends UmrohPackage {
  formSnapshot?: PackageFormValues;
  /** Total estimated modal (IDR), demo pricing. */
  totalModalIdr?: number;
}

export function loadUserPackages(): StoredUserPackage[] {
  if (typeof window === "undefined") return [];
  const raw = safeParse(window.localStorage.getItem(PKG_KEY));
  if (!Array.isArray(raw)) return [];
  return raw.filter((x): x is StoredUserPackage => x !== null && typeof x === "object" && "id" in x && "name" in x) as StoredUserPackage[];
}

export function saveUserPackages(list: StoredUserPackage[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PKG_KEY, JSON.stringify(list));
}

export function appendUserPackage(pkg: StoredUserPackage): void {
  const cur = loadUserPackages();
  saveUserPackages([pkg, ...cur]);
}

export function loadFormDraft(): PackageFormValues | null {
  if (typeof window === "undefined") return null;
  const raw = safeParse(window.localStorage.getItem(DRAFT_KEY));
  if (!raw || typeof raw !== "object") return null;
  return raw as PackageFormValues;
}

export function saveFormDraft(values: PackageFormValues): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
}

export function clearFormDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

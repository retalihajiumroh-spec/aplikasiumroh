/** Options for Jamaah input form (aligns with catalog & registry demos). */

import type { PaymentStatus } from "@/lib/jamaah/dummy-data";
import { umrohPackages } from "@/lib/paket/dummy-data";

export const jamaahInputPackageOptions = umrohPackages.map((p) => ({ id: p.id, label: p.name }));

export const jamaahInputBranchOptions = [
  "Jakarta Pusat",
  "Bandung",
  "Surabaya",
  "Medan",
  "Makassar",
  "Bali",
] as const;

export const paymentStatusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "paid", label: "Lunas" },
  { value: "partial", label: "DP / cicilan" },
  { value: "unpaid", label: "Belum bayar" },
];

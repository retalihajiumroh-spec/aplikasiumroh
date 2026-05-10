export const PAYMENT_TYPES = [
  "DP (Down Payment)",
  "Pembayaran Tahap 1",
  "Pembayaran Tahap 2",
  "Pembayaran Tahap 3",
  "Pelunasan (Full Payment)",
] as const;
export type PaymentType = (typeof PAYMENT_TYPES)[number];

export const PAYMENT_ADMIN_STATUS = ["approved", "pending", "rejected"] as const;
export type PaymentAdminStatus = (typeof PAYMENT_ADMIN_STATUS)[number];

export function paymentStatusLabel(s: PaymentAdminStatus): string {
  switch (s) {
    case "approved":
      return "Approved";
    case "pending":
      return "Pending";
    case "rejected":
      return "Rejected";
    default:
      return s;
  }
}

/** Serializable saved row (storage / API). */
export interface SavedPaymentEntry {
  id: string;
  packageId: string;
  packageLabel: string;
  jamaahId: string;
  jamaahName: string;
  amountIdr: number;
  paymentType: PaymentType;
  status: PaymentAdminStatus;
  proofFileNames: string[];
  createdAt: string;
}

/** Draft line in the batch form (includes File objects). */
export interface PaymentLineDraft {
  localId: string;
  packageId: string;
  jamaahId: string;
  amountIdr: string;
  paymentType: PaymentType;
  status: PaymentAdminStatus;
  files: File[];
}

export function emptyPaymentLine(): PaymentLineDraft {
  return {
    localId: `L-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
    packageId: "",
    jamaahId: "",
    amountIdr: "",
    paymentType: PAYMENT_TYPES[0],
    status: "pending",
    files: [],
  };
}

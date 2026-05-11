import type { Metadata } from "next";
import { PembayaranDashboard } from "@/components/dashboard/pembayaran/pembayaran-dashboard";

export const metadata: Metadata = {
  title: "Pembayaran | SA'YA Umroh OS",
  description: "Payment queue and settlement status for SA'YA Umroh OS.",
};

export default function PembayaranPage() {
  return <PembayaranDashboard />;
}

import type { Metadata } from "next";
import { DokumenDashboard } from "@/components/dashboard/dokumen/dokumen-dashboard";

export const metadata: Metadata = {
  title: "Dokumen & Visa | SA'YA Umroh OS",
  description: "Passport and visa status with visa progress and embassy approval indicators.",
};

export default function DokumenPage() {
  return <DokumenDashboard />;
}

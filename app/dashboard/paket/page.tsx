import type { Metadata } from "next";
import { PaketDashboard } from "@/components/dashboard/paket/paket-dashboard";

export const metadata: Metadata = {
  title: "Paket Umroh | SA'YA Umroh OS",
  description: "Umroh package catalog with seat availability and create-package flow (demo).",
};

export default function PaketPage() {
  return <PaketDashboard />;
}

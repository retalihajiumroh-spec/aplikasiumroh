import type { Metadata } from "next";
import { JamaahDashboard } from "@/components/dashboard/jamaah/jamaah-dashboard";

export const metadata: Metadata = {
  title: "Jamaah | SA'YA Umroh OS",
  description: "Jamaah registry with payment and document status, visa, passport, and vaccination checklist.",
};

export default function JamaahPage() {
  return <JamaahDashboard />;
}

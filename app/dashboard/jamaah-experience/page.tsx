import type { Metadata } from "next";
import { JamaahExperienceDashboard } from "@/components/dashboard/jamaah-experience/jamaah-experience-dashboard";

export const metadata: Metadata = {
  title: "Jamaah Experience | SA'YA Umroh OS",
  description: "Journey checklist, LMS progress, and reminder timeline for jamaah.",
};

export default function JamaahExperiencePage() {
  return <JamaahExperienceDashboard />;
}

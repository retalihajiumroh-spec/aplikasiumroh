import type { Metadata } from "next";
import { SettingsDashboard } from "@/components/dashboard/settings/settings-dashboard";

export const metadata: Metadata = {
  title: "Settings | SA'YA Umroh OS",
  description: "User management, branch configuration, and pricing & notification settings.",
};

export default function SettingsPage() {
  return <SettingsDashboard />;
}

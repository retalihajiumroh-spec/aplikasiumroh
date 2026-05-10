import type { Metadata } from "next";
import { ApprovalCenterDashboard } from "@/components/dashboard/approval/approval-center-dashboard";

export const metadata: Metadata = {
  title: "Approval Center | SA'YA Umroh OS",
  description: "Approval queue for branch and partner requests with approve and reject actions.",
};

export default function ApprovalPage() {
  return <ApprovalCenterDashboard />;
}

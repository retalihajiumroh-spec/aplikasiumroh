import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Banknote,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  FileText,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  LineChart,
  Megaphone,
  Package,
  Settings,
  Store,
  Target,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Optional count badge (e.g. pending items). */
  badge?: number;
}

/** Sidebar order per product spec (premium SaaS shell). */
export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/jamaah", label: "Jamaah", icon: Users },
  { href: "/dashboard/paket", label: "Paket Umroh", icon: Package },
  { href: "/dashboard/booking", label: "Booking & Payment", icon: Wallet, badge: 3 },
  { href: "/dashboard/pembayaran", label: "Pembayaran", icon: Banknote, badge: 5 },
  { href: "/dashboard/dokumen", label: "Dokumen & Visa", icon: FileText, badge: 7 },
  { href: "/dashboard/inventory", label: "Inventory", icon: ClipboardList },
  { href: "/dashboard/departure", label: "Departure", icon: CalendarDays },
  { href: "/dashboard/crm", label: "CRM & Leads", icon: FolderKanban, badge: 12 },
  { href: "/dashboard/reseller", label: "Reseller / Mitra", icon: Store },
  { href: "/dashboard/content", label: "Content System", icon: ImageIcon },
  { href: "/dashboard/community", label: "Community Engine", icon: UsersRound },
  { href: "/dashboard/ai-ads", label: "AI Ads Lab", icon: Megaphone },
  { href: "/dashboard/ai-sales", label: "AI Sales Bot", icon: Bot },
  { href: "/dashboard/campaign", label: "Campaign & Broadcast", icon: Target },
  { href: "/dashboard/survey", label: "Survey & Feedback", icon: CheckCircle2 },
  { href: "/dashboard/tl", label: "TL & Muthowif", icon: Building2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/tasks", label: "Tasks & Reminder", icon: Activity, badge: 4 },
  { href: "/dashboard/approval", label: "Approval Center", icon: ShieldCheck, badge: 2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const brandMark = {
  title: "SA'YA",
  subtitle: "Umroh OS",
} as const;

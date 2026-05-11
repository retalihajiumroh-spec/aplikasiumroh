import type { LucideIcon } from "lucide-react";
import type { AppRole } from "@/lib/supabase/database.types";
import { normalizeRole } from "@/lib/auth/role-access";
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
  roles?: AppRole[];
}

/** Sidebar order per product spec (premium SaaS shell). */
export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/owner", label: "Owner Dashboard", icon: BarChart3, roles: ["owner"] },
  { href: "/dashboard/jamaah", label: "Jamaah", icon: Users, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/jamaah/free", label: "Jamaah Free", icon: Users, roles: ["jamaah_free", "jamaah_pro"] },
  { href: "/dashboard/jamaah/pro", label: "Jamaah Pro", icon: ShieldCheck, roles: ["jamaah_pro"] },
  { href: "/dashboard/paket", label: "Paket Umroh", icon: Package, roles: ["owner", "admin_head_office", "cabang", "jamaah_free", "jamaah_pro"] },
  { href: "/dashboard/booking", label: "Booking & Payment", icon: Wallet, badge: 3, roles: ["owner", "admin_head_office", "cabang", "jamaah_pro"] },
  { href: "/dashboard/pembayaran", label: "Pembayaran", icon: Banknote, badge: 5, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/dokumen", label: "Dokumen & Visa", icon: FileText, badge: 7, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/inventory", label: "Inventory", icon: ClipboardList, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/departure", label: "Departure", icon: CalendarDays, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/crm", label: "CRM & Leads", icon: FolderKanban, badge: 12, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/reseller", label: "Reseller / Mitra", icon: Store, roles: ["owner", "admin_head_office", "mitra"] },
  { href: "/dashboard/content", label: "Content System", icon: ImageIcon, roles: ["owner", "admin_head_office", "mitra", "jamaah_pro"] },
  { href: "/dashboard/community", label: "Community Engine", icon: UsersRound, roles: ["owner", "admin_head_office", "mitra", "jamaah_pro"] },
  { href: "/dashboard/ai-ads", label: "AI Ads Lab", icon: Megaphone, roles: ["owner", "admin_head_office"] },
  { href: "/dashboard/ai-sales", label: "AI Sales Bot", icon: Bot, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/campaign", label: "Campaign & Broadcast", icon: Target, roles: ["owner", "admin_head_office", "mitra"] },
  { href: "/dashboard/survey", label: "Survey & Feedback", icon: CheckCircle2, roles: ["owner", "admin_head_office"] },
  { href: "/dashboard/tl", label: "TL & Muthowif", icon: Building2, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart, roles: ["owner", "admin_head_office"] },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/tasks", label: "Tasks & Reminder", icon: Activity, badge: 4, roles: ["owner", "admin_head_office", "cabang"] },
  { href: "/dashboard/approval", label: "Approval Center", icon: ShieldCheck, badge: 2, roles: ["owner", "admin_head_office"] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function getDashboardNavItemsForRole(role: AppRole | string | null | undefined): DashboardNavItem[] {
  const normalized = normalizeRole(role);
  return dashboardNavItems.filter((item) => !item.roles || item.roles.map((r) => normalizeRole(r)).includes(normalized));
}

export const brandMark = {
  title: "SA'YA",
  subtitle: "Umroh OS",
} as const;

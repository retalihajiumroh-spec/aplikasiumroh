/** Settings — demo seed data (no backend). */

export type UserRole = "owner" | "admin_cabang" | "finance" | "ops" | "marketing";
export type UserStatus = "active" | "invited" | "suspended";

export interface SettingsUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  branchLabel: string;
}

export const roleLabels: Record<UserRole, string> = {
  owner: "Owner",
  admin_cabang: "Admin cabang",
  finance: "Finance",
  ops: "Operasional",
  marketing: "Marketing",
};

export const initialUsers: SettingsUser[] = [
  {
    id: "u1",
    name: "Ayu Lestari",
    email: "ayu@sayaumroh.id",
    role: "owner",
    status: "active",
    branchLabel: "Pusat",
  },
  {
    id: "u2",
    name: "Bima Pratama",
    email: "bima.pratama@sayaumroh.id",
    role: "admin_cabang",
    status: "active",
    branchLabel: "Bandung",
  },
  {
    id: "u3",
    name: "Clara Anggraini",
    email: "clara.finance@sayaumroh.id",
    role: "finance",
    status: "active",
    branchLabel: "Pusat",
  },
  {
    id: "u4",
    name: "Doni Wijaya",
    email: "doni.ops@sby.sayaumroh.id",
    role: "ops",
    status: "invited",
    branchLabel: "Surabaya",
  },
];

export interface BranchConfig {
  id: string;
  name: string;
  city: string;
  phone: string;
  timezone: string;
  waBusinessLine: string;
  addressLine: string;
}

export const branchConfigs: BranchConfig[] = [
  {
    id: "br-pusat",
    name: "Kantor Pusat",
    city: "Jakarta",
    phone: "+62 21 5000 1200",
    timezone: "Asia/Jakarta",
    waBusinessLine: "+62 812-0000-8899",
    addressLine: "Jl. Protokol No. 8, Menteng",
  },
  {
    id: "br-bdg",
    name: "Cabang Bandung",
    city: "Bandung",
    phone: "+62 22 7000 3300",
    timezone: "Asia/Jakarta",
    waBusinessLine: "+62 812-0000-9901",
    addressLine: "Jl. Asia Afrika No. 120",
  },
  {
    id: "br-sby",
    name: "Cabang Surabaya",
    city: "Surabaya",
    phone: "+62 31 6000 4400",
    timezone: "Asia/Jakarta",
    waBusinessLine: "+62 812-0000-9902",
    addressLine: "Jl. Pemuda No. 45",
  },
];

export interface PricingDefaults {
  defaultMarkupPct: number;
  /** Show prices including PPN 11% in quotes */
  showTaxInclusive: boolean;
  /** Round published prices to nearest (IDR) */
  roundToNearest: number;
}

export const defaultPricingDefaults: PricingDefaults = {
  defaultMarkupPct: 18.5,
  showTaxInclusive: true,
  roundToNearest: 50_000,
};

export interface NotificationSettings {
  waNewLead: boolean;
  waPaymentReceived: boolean;
  emailDailyDigest: boolean;
  emailDigestHour: number;
  pushDepartureReminder: boolean;
}

export const defaultNotificationSettings: NotificationSettings = {
  waNewLead: true,
  waPaymentReceived: true,
  emailDailyDigest: true,
  emailDigestHour: 7,
  pushDepartureReminder: true,
};

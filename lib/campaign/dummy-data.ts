export interface CampaignObjective {
  id: string;
  label: string;
  hint: string;
}

export const campaignObjectives: CampaignObjective[] = [
  { id: "leads", label: "Lead generation", hint: "Form WA & landing page" },
  { id: "awareness", label: "Brand awareness", hint: "Reach & recall Ramadan" },
  { id: "remarketing", label: "Remarketing", hint: "Audiens yang sudah engage" },
  { id: "booking", label: "Booking acceleration", hint: "Push DP & seat countdown" },
];

export interface FocusPackageOption {
  id: string;
  label: string;
}

export const focusPackageOptions: FocusPackageOption[] = [
  { id: "ramadan_premium", label: "Ramadan Premium · 12 hari" },
  { id: "ekonomi_plus", label: "Ekonomi Plus · 9 hari" },
  { id: "private_family", label: "Private Family · custom" },
  { id: "corporate", label: "Corporate / Yayasan" },
];

export interface CampaignRecord {
  id: string;
  name: string;
  objective: string;
  status: "draft" | "scheduled" | "active";
  startLabel: string;
  reachEstimate: number;
}

export const recentCampaigns: CampaignRecord[] = [
  {
    id: "c-1",
    name: "Early Bird Ramadan · WA + Reels",
    objective: "Lead generation",
    status: "active",
    startLabel: "3 Mar 2026",
    reachEstimate: 48_200,
  },
  {
    id: "c-2",
    name: "Remarketing kalkulator DP",
    objective: "Remarketing",
    status: "scheduled",
    startLabel: "12 Mar 2026",
    reachEstimate: 12_400,
  },
  {
    id: "c-3",
    name: "Awareness cabang Bandung",
    objective: "Brand awareness",
    status: "draft",
    startLabel: "—",
    reachEstimate: 0,
  },
];

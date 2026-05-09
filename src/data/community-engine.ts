import type { LucideIcon } from "lucide-react";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  UserPlus,
  Zap
} from "lucide-react";

export type OverviewMetric = {
  label: string;
  value: string;
  hint: string;
  delta: string;
  trend: "up" | "down" | "flat";
  accent: "emerald" | "cyan" | "amber" | "violet" | "rose";
  pulseLabel: string;
};

export type WhatsAppGroup = {
  id: string;
  name: string;
  members: number;
  engagementPct: number;
  activeTopic: string;
  unreadCount: number;
  growthLabel: string;
  trend: "up" | "down";
};

export type HeatmapDay = {
  day: string;
  intensity: number;
};

export type HeatmapHour = {
  hour: number;
  label: string;
  intensity: number;
};

export type InteractionSpike = {
  id: string;
  title: string;
  window: string;
  lift: string;
  detail: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  interactions: number;
  badge: string;
};

export type HighIntentUser = {
  id: string;
  name: string;
  signals: string[];
  recommendation: string;
  score: number;
};

export type ContentPerformance = {
  topKajian: { title: string; saves: number; reactions: number; lift: string };
  topSaved: { title: string; format: string; saves: number };
  topReel: { title: string; shares: number; completionRate: string };
  emotionalScore: number;
  emotionalLabel: string;
};

export type AiCommunityInsight = {
  id: string;
  text: string;
  tone: "positive" | "warning" | "neutral" | "urgent";
  metric?: string;
};

export type TimelineEvent = {
  id: string;
  type: string;
  title: string;
  detail: string;
  time: string;
  icon: LucideIcon;
};

export type AutomationCard = {
  id: string;
  title: string;
  description: string;
  status: "live" | "paused" | "scheduled";
  statLabel: string;
  statValue: string;
};

export const communityOverviewMetrics: OverviewMetric[] = [
  {
    label: "Active members",
    value: "18,946",
    hint: "Across owned WA groups & broadcast lists",
    delta: "+6.2%",
    trend: "up",
    accent: "emerald",
    pulseLabel: "Retention membaik · cohort Ramadhan kuat"
  },
  {
    label: "Engaged users",
    value: "6,204",
    hint: "Reacted, replied, or saved in 7 days",
    delta: "+11.4%",
    trend: "up",
    accent: "cyan",
    pulseLabel: "Diskusi manasik memimpin aktivitas"
  },
  {
    label: "Silent users",
    value: "9,881",
    hint: "Seen-only — prime for gentle nudges",
    delta: "-3.1%",
    trend: "down",
    accent: "amber",
    pulseLabel: "Automation nurture siap menyapa halus"
  },
  {
    label: "High intent",
    value: "642",
    hint: "Package clicks + umroh Q&A detected",
    delta: "+28%",
    trend: "up",
    accent: "violet",
    pulseLabel: "Sales queue prioritas otomatis terisi"
  },
  {
    label: "Daily interactions",
    value: "24.8K",
    hint: "Messages, reactions, forwards today",
    delta: "+4.7%",
    trend: "up",
    accent: "rose",
    pulseLabel: "Micro-moments terdistribusi merata"
  }
];

export const whatsAppGroups: WhatsAppGroup[] = [
  {
    id: "g1",
    name: "Manasik Alumni Ramadhan",
    members: 2840,
    engagementPct: 41,
    activeTopic: "Doa thawaf & sai practical tips",
    unreadCount: 127,
    growthLabel: "+184 minggu ini",
    trend: "up"
  },
  {
    id: "g2",
    name: "Premium Family Umroh Circle",
    members: 942,
    engagementPct: 56,
    activeTopic: "Paket Syawal — upgrade hotel Madinah",
    unreadCount: 54,
    growthLabel: "+61 minggu ini",
    trend: "up"
  },
  {
    id: "g3",
    name: "Bandung KBIH Nurul Huda",
    members: 1612,
    engagementPct: 33,
    activeTopic: "Visa biometrik & checklist dokumen",
    unreadCount: 203,
    trend: "down",
    growthLabel: "-12 minggu ini"
  },
  {
    id: "g4",
    name: "Retali VIP Concierge",
    members: 388,
    engagementPct: 72,
    activeTopic: "Private konsultasi itinerary Turki",
    unreadCount: 19,
    growthLabel: "+27 minggu ini",
    trend: "up"
  }
];

export const heatmapByDay: HeatmapDay[] = [
  { day: "Sen", intensity: 62 },
  { day: "Sel", intensity: 71 },
  { day: "Rab", intensity: 58 },
  { day: "Kam", intensity: 84 },
  { day: "Jum", intensity: 92 },
  { day: "Sab", intensity: 76 },
  { day: "Min", intensity: 69 }
];

export const heatmapByHour: HeatmapHour[] = Array.from({ length: 24 }, (_, hour) => {
  const peaks = [5, 6, 12, 13, 18, 19, 20, 21, 22];
  const base = [1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 23].includes(hour) ? 28 : 42;
  const bump = peaks.includes(hour) ? 38 : 0;
  const noise = (hour % 5) * 3;
  return {
    hour,
    label: `${hour.toString().padStart(2, "0")}:00`,
    intensity: Math.min(100, base + bump + noise)
  };
});

export const interactionSpikes: InteractionSpike[] = [
  {
    id: "s1",
    title: "Maghrib surge",
    window: "18:10 — 19:40",
    lift: "+44% vs baseline",
    detail: "Replies & sticker reactions spike after kajian singkat voice note."
  },
  {
    id: "s2",
    title: "Jumat khutbah hook",
    window: "11:30 — 13:15",
    lift: "+31%",
    detail: "Forward shares ke keluarga naik saat link paket disematkan setelah ceramah."
  },
  {
    id: "s3",
    title: "Late-night planners",
    window: "21:20 — 23:50",
    lift: "+22%",
    detail: "DM privat bertanya tabungan & cicilan — ideal untuk follow-up sales."
  }
];

export const engagementLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Ustadzah Laila Rahma", score: 982, interactions: 612, badge: "Community pillar" },
  { rank: 2, name: "Hj. Siska Permata", score: 914, interactions: 538, badge: "Referral magnet" },
  { rank: 3, name: "Bpk. Agung Wijaya", score: 887, interactions: 501, badge: "Family advocate" },
  { rank: 4, name: "Kak Intan — Young Hajj", score: 856, interactions: 472, badge: "Content amplifier" },
  { rank: 5, name: "Komunitas Muslim Creative JKT", score: 829, interactions: 455, badge: "Group catalyst" },
  { rank: 6, name: "Ibu Ratna — PAUD Teachers", score: 798, interactions: 441, badge: "Warm nurturer" }
];

export const highIntentUsers: HighIntentUser[] = [
  {
    id: "h1",
    name: "Muhammad Raffasya",
    signals: ["Asked visa validity rules", "Opened Premium Madinah package 4x", "Active in diskusi manasik"],
    recommendation: "Kirim ringkasan biaya & jadwal Zoom konsultasi besok malam.",
    score: 94
  },
  {
    id: "h2",
    name: "Keluarga Prasetyo (4 pax)",
    signals: ["Clicked cicilan 12 bulan", "Saved reel packing list", "Reacted on all Syawal posts"],
    recommendation: "Tawarkan bundle asuransi + city tour — interest keluarga tinggi.",
    score: 91
  },
  {
    id: "h3",
    name: "Cut Nova — Aceh",
    signals: ["Repeated question maskapai", "Forwarded brochure ke grup keluarga"],
    recommendation: "Follow-up voice note singkat + form booking ringkas.",
    score: 88
  },
  {
    id: "h4",
    name: "Yusuf Hartono",
    signals: ["Asked tentang hotel jarak Masjid Nabawi", "DM privat setelah kajian"],
    recommendation: "Highlight map walking distance & upgrade kamar.",
    score: 86
  }
];

export const contentPerformance: ContentPerformance = {
  topKajian: {
    title: "Khuluq Jamaah: sabar di titik padat",
    saves: 1840,
    reactions: 4260,
    lift: "+36% vs avg"
  },
  topSaved: {
    title: "Checklist dokumen 72 jam sebelum berangkat",
    format: "Carousel PDF",
    saves: 2394
  },
  topReel: {
    title: "First steps di Masjidil Haram — 38 detik",
    shares: 912,
    completionRate: "81%"
  },
  emotionalScore: 8.7,
  emotionalLabel: "Reflective & hopeful tone resonates strongest after Isya."
};

export const aiCommunityInsights: AiCommunityInsight[] = [
  {
    id: "a1",
    text: "Engagement rising after Maghrib — voice notes outperform text by 27%.",
    tone: "positive",
    metric: "+27%"
  },
  {
    id: "a2",
    text: "Users respond better to reels under 45s; completion up 19% week-on-week.",
    tone: "positive",
    metric: "+19%"
  },
  {
    id: "a3",
    text: "Silent users inching up in Bandung cluster — trigger reminder cadence Jumat.",
    tone: "warning",
    metric: "+6.4%"
  },
  {
    id: "a4",
    text: "Topik sabar & rezeki drives highest thread depth — consider series continuation.",
    tone: "neutral",
    metric: "Top topic"
  },
  {
    id: "a5",
    text: "Package link CTR spikes when paired with testimonial voice note under 90s.",
    tone: "urgent",
    metric: "CTR peak"
  }
];

export const communityTimeline: TimelineEvent[] = [
  {
    id: "t1",
    type: "Reaction wave",
    title: "182 reactions on kajian snippet #maghribflow",
    detail: "Heart & amin stickers dominate — emotional resonance tinggi.",
    time: "Baru saja",
    icon: Heart
  },
  {
    id: "t2",
    type: "Member baru",
    title: "22 orang bergabung ke Manasik Alumni Ramadhan",
    detail: "68% dari undangan referral internal — pertumbuhan organik stabil.",
    time: "3 menit lalu",
    icon: UserPlus
  },
  {
    id: "t3",
    type: "Diskusi aktif",
    title: "Thread visa biometrik membuka 94 balasan baru",
    detail: "Moderator menjawab dalam median 6 menit — SLA hijau.",
    time: "7 menit lalu",
    icon: MessageCircle
  },
  {
    id: "t4",
    type: "Share spike",
    title: "Reel packing list dibagikan 312 kali ke grup keluarga",
    detail: "Forward chain mendalam — awareness paket premium naik.",
    time: "14 menit lalu",
    icon: Share2
  },
  {
    id: "t5",
    type: "Chat privat",
    title: "19 percakapan WA dimulai dari tombol konsultasi cepat",
    detail: "13 menuju booking pipeline — intent kuat pada jam malam.",
    time: "21 menit lalu",
    icon: Zap
  },
  {
    id: "t6",
    type: "AI highlight",
    title: "Model mendeteksi cluster pertanyaan tentang maskapai pagi ini",
    detail: "Siapkan FAQ voice note 70s untuk menjawab pola yang sama.",
    time: "29 menit lalu",
    icon: Sparkles
  }
];

export const automationCards: AutomationCard[] = [
  {
    id: "au1",
    title: "Auto welcome message",
    description: "Personalized salam + manasik PDF berdasarkan kota & referral source.",
    status: "live",
    statLabel: "Activation rate",
    statValue: "94%"
  },
  {
    id: "au2",
    title: "Auto group assignment",
    description: "Routes new joins by cohort travel window & bahasa preferensi.",
    status: "live",
    statLabel: "Mis-route rate",
    statValue: "0.6%"
  },
  {
    id: "au3",
    title: "Inactive user reminder",
    description: "Soft nudge setelah 9 hari tanpa interaksi — rotation 3 template AI.",
    status: "scheduled",
    statLabel: "Next batch",
    statValue: "Besok 08:30"
  },
  {
    id: "au4",
    title: "Smart follow-up trigger",
    description: "Sales ping saat intent score >82 & klik paket dalam 24 jam.",
    status: "live",
    statLabel: "Meetings booked",
    statValue: "37 minggu ini"
  }
];

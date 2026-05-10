export type RespondentRole = "jamaah" | "wali" | "mitra" | "internal";

export interface SurveyTopicOption {
  id: string;
  label: string;
}

export const surveyTopics: SurveyTopicOption[] = [
  { id: "post_trip", label: "Pasca perjalanan umroh" },
  { id: "briefing", label: "Briefing & manasik" },
  { id: "app", label: "Aplikasi & portal jamaah" },
  { id: "hotel_transport", label: "Hotel & transportasi" },
  { id: "other", label: "Lainnya" },
];

export interface AspectRatingDef {
  id: string;
  label: string;
}

export const aspectDefinitions: AspectRatingDef[] = [
  { id: "service", label: "Keramahan tim" },
  { id: "clarity", label: "Kejelasan informasi" },
  { id: "timeliness", label: "Ketepatan jadwal" },
];

/** Demo aggregate for the satisfaction summary panel. */
export const satisfactionSummary = {
  averageStars: 4.6,
  responseCount: 428,
  npsApprox: 62,
  /** Share of 5-star ratings among last 200 responses (percent). */
  fiveStarSharePct: 58,
  periodLabel: "30 hari terakhir",
};

export interface RecentSurveySnippet {
  id: string;
  initials: string;
  topicLabel: string;
  stars: number;
  excerpt: string;
  whenLabel: string;
}

export const starDistribution: { stars: number; pct: number }[] = [
  { stars: 5, pct: 58 },
  { stars: 4, pct: 24 },
  { stars: 3, pct: 12 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 2 },
];

export const recentSurveySnippets: RecentSurveySnippet[] = [
  {
    id: "s1",
    initials: "AS",
    topicLabel: "Pasca perjalanan",
    stars: 5,
    excerpt: "TL sangat membantu saat delay maskapai…",
    whenLabel: "2 jam lalu",
  },
  {
    id: "s2",
    initials: "RK",
    topicLabel: "Briefing & manasik",
    stars: 4,
    excerpt: "Materi bagus, durasi Zoom agak panjang.",
    whenLabel: "Kemarin",
  },
  {
    id: "s3",
    initials: "MI",
    topicLabel: "Aplikasi & portal",
    stars: 5,
    excerpt: "Upload dokumen jadi lebih mudah.",
    whenLabel: "3 hari lalu",
  },
];

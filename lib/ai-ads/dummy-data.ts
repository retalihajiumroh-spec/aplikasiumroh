/** AI Ads Lab — demo payloads (no backend). */

export interface GeneratedAdsContent {
  primaryCaption: string;
  altCaption: string;
  hashtags: string[];
  adScriptPreview: string;
  softCta: string;
  headline: string;
}

export interface AdCreative {
  id: string;
  name: string;
  primaryText: string;
  cta: string;
  mediaAspect: "9:16" | "1:1" | "4:5";
  gradient: string;
}

export interface AdSetPack {
  id: string;
  kind: "broad" | "targeted";
  title: string;
  audienceSummary: string;
  ads: AdCreative[];
}

/** Local UI state for Scale / Pause demo controls. */
export type AdRuntimeStatus = "active" | "paused" | "scaling";

export interface AdPerformanceRow {
  id: string;
  adSetLabel: string;
  adName: string;
  ctrPct: number;
  cplIdr: number;
  roiPct: number;
  spendIdr: number;
}

export const demoGeneratedContent: GeneratedAdsContent = {
  primaryCaption:
    "Ramadan di Tanah Suci tanpa drama logistik — SA'YA Umroh urus manasik, hotel dekat Haram, dan tim medis pendamping.\n\nKuota terbatas untuk paket Ramadan Premium 1447H. Konsultasi 15 menit, tanpa tekanan.",
  altCaption:
    "Mulai dari persiapan yang tenang: briefing visa, packing list, dan grup jamaah eksklusif. DM *INFO* untuk jadwal keberangkatan & simulasi cicilan.",
  hashtags: [
    "#UmrohRamadan",
    "#SAYAUmroh",
    "#IbadahNyaman",
    "#TravelUmroh",
    "#MakkahMadinah",
    "#ManasikUmroh",
    "#Ramadan1447H",
    "#UmrohPremium",
  ],
  adScriptPreview:
    "[0–4s] HOOK: teks layar \"Tenang berangkat.\" + cuplikan jamaah menuju Haram.\n[4–14s] VALUE: VO paket premium, manasik, dokter.\n[14–22s] PROOF: testimoni + sertifikasi.\n[22–30s] CTA: DM INFO — kuota Ramadan.",
  softCta: "Balas *CEK JADWAL* untuk slot konsultasi & pratinjau cicilan tanpa komitmen.",
  headline: "Umroh Ramadan Premium — kuota terbatas, pengalaman tenang.",
};

export const demoAdSets: AdSetPack[] = [
  {
    id: "as-broad",
    kind: "broad",
    title: "Broad · awareness",
    audienceSummary: "Indonesia · minat travel & religi · lookalike 2% pembeli musim lalu",
    ads: [
      {
        id: "b1",
        name: "Hook emosional · Reels",
        primaryText:
          "Rindu Ramadan di Makkah? SA'YA Umroh bantu persiapan dari nol — konsultasi gratis, tanpa tekanan.",
        cta: "Pelajari lebih lanjut",
        mediaAspect: "9:16",
        gradient: "from-purple-600 via-violet-800 to-purple-950",
      },
      {
        id: "b2",
        name: "Manfaat terkurasi",
        primaryText:
          "Hotel walking distance, manasik intensif, dan tim medis siaga — fokus Anda hanya ibadah.",
        cta: "Daftar sekarang",
        mediaAspect: "9:16",
        gradient: "from-violet-600 via-violet-900 to-black",
      },
      {
        id: "b3",
        name: "Social proof",
        primaryText:
          "2.800+ jamaah telah berangkat bersama SA'YA. Gabung grup info keberangkatan terbaru.",
        cta: "Kirim pesan",
        mediaAspect: "1:1",
        gradient: "from-purple-500 via-purple-900 to-purple-950",
      },
    ],
  },
  {
    id: "as-targeted",
    kind: "targeted",
    title: "Targeted · konversi",
    audienceSummary: "Usia 28–45 · Jakarta & sekitar · remarketing website 30 hari + lead form WA",
    ads: [
      {
        id: "t1",
        name: "Kalkulator DP",
        primaryText:
          "Hitung cicilan 0% hingga 6 bulan untuk DP 30%+ — lihat simulasi dalam 1 menit.",
        cta: "Lihat penawaran",
        mediaAspect: "4:5",
        gradient: "from-rose-600/90 via-purple-900 to-purple-950",
      },
      {
        id: "t2",
        name: "Ramadan countdown",
        primaryText:
          "Sisa kuota maskapai untuk pekan pertama Ramadan — amankan seat sebelum harga naik.",
        cta: "Hubungi kami",
        mediaAspect: "9:16",
        gradient: "from-fuchsia-900/80 via-purple-800 to-purple-950",
      },
      {
        id: "t3",
        name: "Keluarga & private",
        primaryText:
          "Paket private family dengan jadwal fleksibel — cocok untuk rombongan kantor & yayasan.",
        cta: "Book sekarang",
        mediaAspect: "4:5",
        gradient: "from-slate-800 via-purple-900 to-black",
      },
    ],
  },
];

export const demoPerformanceRows: AdPerformanceRow[] = [
  { id: "b1", adSetLabel: "Broad", adName: "Hook emosional · Reels", ctrPct: 2.84, cplIdr: 418_000, roiPct: 3.2, spendIdr: 12_400_000 },
  { id: "b2", adSetLabel: "Broad", adName: "Manfaat terkurasi", ctrPct: 1.92, cplIdr: 512_000, roiPct: 2.1, spendIdr: 8_200_000 },
  { id: "b3", adSetLabel: "Broad", adName: "Social proof", ctrPct: 1.45, cplIdr: 604_000, roiPct: 1.6, spendIdr: 5_100_000 },
  { id: "t1", adSetLabel: "Targeted", adName: "Kalkulator DP", ctrPct: 4.12, cplIdr: 286_000, roiPct: 4.8, spendIdr: 18_900_000 },
  { id: "t2", adSetLabel: "Targeted", adName: "Ramadan countdown", ctrPct: 3.67, cplIdr: 302_000, roiPct: 4.1, spendIdr: 14_200_000 },
  { id: "t3", adSetLabel: "Targeted", adName: "Keluarga & private", ctrPct: 2.98, cplIdr: 355_000, roiPct: 3.5, spendIdr: 9_800_000 },
];

export const demoPerformanceSummary = {
  ctrPct: 2.83,
  cplIdr: 413_000,
  roiPct: 3.22,
  spendIdr: 68_600_000,
  impressions: 2_420_000,
  leads: 166,
};

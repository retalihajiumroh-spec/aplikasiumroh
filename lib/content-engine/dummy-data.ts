/** AI Content Engine — demo payloads (no backend). */

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
}

export interface HeadlineVariant {
  id: string;
  text: string;
  format: "feed" | "reels" | "ads";
}

export interface ContentEngineOutput {
  caption: string;
  adScript: string;
  hashtags: string[];
  softCta: string;
  carouselSlides: CarouselSlide[];
  headlines: HeadlineVariant[];
}

export const demoContentOutput: ContentEngineOutput = {
  caption:
    "Ramadan sebentar lagi — perjalanan spiritual yang tenang dimulai dari persiapan yang matang. ✨\n\nDi SA'YA Umroh, kami dampingi setiap langkah: manasik intensif, tim dokter pendamping, dan hotel jarak dekat ke Masjidil Haram & Nabawi.\n\nKuota Ramadan Premium 1447H terbatas. Konsultasi gratis, tanpa tekanan — karena keputusan terbaik datang dari hati yang tenang.\n\n📩 DM *INFO* atau klik link di bio untuk jadwalkan call 15 menit bersama konsultan kami.",
  adScript:
    "[HOOK · 0–3s]\nVisual: cuplikan jamaah berjalan tenang menuju Masjidil Haram saat fajar. Teks layar: \"Tenang berangkat, tenang ibadah.\"\n\n[VALUE · 3–12s]\nVO: \"Ramadan kali ini, SA'YA Umroh hadirkan paket premium dengan manasik lengkap, tim medis, dan akomodasi terkurasi — supaya fokus Anda hanya satu: ibadah.\"\n\n[PROOF · 12–20s]\nCut: testimoni singkat + sertifikasi + jumlah jamaah yang telah berangkat.\n\n[CTA · 20–30s]\nVO + teks: \"DM INFO sekarang — slot Ramadan terbatas.\" + logo SA'YA.",
  hashtags: [
    "#UmrohRamadan",
    "#SAYAUmroh",
    "#UmrohPremium",
    "#ManasikUmroh",
    "#TravelHajiUmroh",
    "#IbadahNyaman",
    "#MakkahMadinah",
    "#TipsUmroh",
    "#KeluargaUmroh",
    "#Ramadan1447H",
  ],
  softCta: "Mau cek jadwal keberangkatan & simulasi cicilan tanpa komitmen dulu? Balas *CEK JADWAL* — tim kami bantu dalam 1×24 jam.",
  carouselSlides: [
    {
      id: "c1",
      title: "3 hal yang sering dilupakan",
      subtitle: "Checklist pra-keberangkatan",
      gradient: "from-purple-600/90 via-violet-700/80 to-purple-950",
    },
    {
      id: "c2",
      title: "Hotel dekat Haram",
      subtitle: "Arti waktu ibadah maksimal",
      gradient: "from-violet-600/85 via-violet-800/70 to-purple-950",
    },
    {
      id: "c3",
      title: "Manasik intensif",
      subtitle: "Panduan praktis per sesi",
      gradient: "from-purple-500/80 via-purple-900/75 to-black/80",
    },
    {
      id: "c4",
      title: "Kuota Ramadan",
      subtitle: "Segera amankan seat",
      gradient: "from-rose-600/70 via-purple-900/80 to-purple-950",
    },
  ],
  headlines: [
    { id: "h1", text: "Ramadan di Tanah Suci — mulai dari persiapan yang tenang.", format: "feed" },
    { id: "h2", text: "Umroh premium tanpa drama logistik.", format: "reels" },
    { id: "h3", text: "Konsultasi 15 menit: pahami paket & cicilan 0% DP 30%.", format: "ads" },
  ],
};

export interface EngagementRecommendation {
  id: string;
  title: string;
  detail: string;
  impact: "high" | "medium";
}

export const engagementRecommendations: EngagementRecommendation[] = [
  {
    id: "r1",
    title: "Buka dengan pertanyaan emosional",
    detail: "Pertanyaan ringan di kalimat pertama meningkatkan save rate +12% pada konten serupa.",
    impact: "high",
  },
  {
    id: "r2",
    title: "Tambahkan hook visual slide 1",
    detail: "Carousel slide pertama dengan wajah jamaah + teks besar meningkatkan swipe-through rata-rata 18%.",
    impact: "high",
  },
  {
    id: "r3",
    title: "Kurangi hashtag di atas 12",
    detail: "10 tag relevan + 2 branded cenderung lebih rapi untuk algoritma discovery TikTok/Reels.",
    impact: "medium",
  },
  {
    id: "r4",
    title: "CTA lembut + deadline halus",
    detail: "Gabungkan urgensi halus (kuota) tanpa huruf kapital berlebihan — terasa lebih premium.",
    impact: "medium",
  },
];

export const demoViralScore = 78;

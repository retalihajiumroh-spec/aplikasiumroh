export type SocialPlatform = "instagram" | "facebook" | "twitter" | "linkedin";

export type PostStatus = "draft" | "scheduled" | "publishing" | "published" | "failed";

export type Recurrence = "none" | "weekly" | "monthly";

export interface SocialPostMetrics {
  likes: number;
  shares: number;
  comments: number;
}

export interface SocialMediaAttachment {
  url: string;
  type: "image" | "video";
  name: string;
}

export interface SocialPost {
  id: string;
  caption: string;
  media: SocialMediaAttachment[];
  platforms: SocialPlatform[];
  scheduledAt: string;
  recurrence: Recurrence;
  status: PostStatus;
  metrics: Partial<Record<SocialPlatform, SocialPostMetrics>>;
  createdAt: string;
  updatedAt: string;
  lastError?: string;
}

export interface CreateSocialPostInput {
  caption: string;
  media: SocialMediaAttachment[];
  platforms: SocialPlatform[];
  scheduledAt: string;
  recurrence: Recurrence;
}

export interface PlatformSpec {
  id: SocialPlatform;
  label: string;
  accentClass: string;
  recommendedMedia: string;
}

export const PLATFORM_SPECS: PlatformSpec[] = [
  {
    id: "instagram",
    label: "Instagram",
    accentClass: "from-fuchsia-500/25 to-pink-600/10",
    recommendedMedia: "1080×1350 (4:5) atau 1080×1080 (1:1)",
  },
  {
    id: "facebook",
    label: "Facebook",
    accentClass: "from-blue-500/20 to-indigo-600/10",
    recommendedMedia: "1200×630 (link) · posting fleksibel",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    accentClass: "from-sky-500/20 to-slate-600/10",
    recommendedMedia: "1200×675 (16:9) disarankan",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    accentClass: "from-sky-700/25 to-blue-900/15",
    recommendedMedia: "1200×627 (share image)",
  },
];

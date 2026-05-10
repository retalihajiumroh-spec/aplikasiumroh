import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  CreateSocialPostInput,
  PostStatus,
  SocialPlatform,
  SocialPost,
  SocialPostMetrics,
} from "@/lib/types/socialMedia";

const STORAGE_KEY = "saya_social_posts_v1";

type DbSocialPost = {
  id: string;
  caption: string;
  media: unknown;
  platforms: SocialPlatform[];
  scheduled_at: string;
  recurrence: SocialPost["recurrence"];
  status: PostStatus;
  metrics: SocialPost["metrics"];
  created_at: string;
  updated_at: string;
  last_error: string | null;
};

function nowIso() {
  return new Date().toISOString();
}

function mockMetrics(): SocialPostMetrics {
  return {
    likes: Math.floor(80 + Math.random() * 400),
    shares: Math.floor(10 + Math.random() * 120),
    comments: Math.floor(5 + Math.random() * 80),
  };
}

function mapDb(row: DbSocialPost): SocialPost {
  return {
    id: row.id,
    caption: row.caption,
    media: Array.isArray(row.media) ? (row.media as SocialPost["media"]) : [],
    platforms: row.platforms ?? [],
    scheduledAt: row.scheduled_at,
    recurrence: row.recurrence,
    status: row.status,
    metrics: row.metrics ?? {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastError: row.last_error ?? undefined,
  };
}

function mapToDb(post: SocialPost): DbSocialPost {
  return {
    id: post.id,
    caption: post.caption,
    media: post.media,
    platforms: post.platforms,
    scheduled_at: post.scheduledAt,
    recurrence: post.recurrence,
    status: post.status,
    metrics: post.metrics,
    created_at: post.createdAt,
    updated_at: post.updatedAt,
    last_error: post.lastError ?? null,
  };
}

function readLocal(): SocialPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SocialPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocal(posts: SocialPost[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

async function listFromSupabase(): Promise<SocialPost[] | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("social_posts").select("*").order("scheduled_at", {
    ascending: true,
  });
  if (error) return null;
  return (data as DbSocialPost[]).map(mapDb);
}

async function upsertSupabase(post: SocialPost): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return false;
  const row = mapToDb(post);
  const { error } = await supabase.from("social_posts").upsert(row, { onConflict: "id" });
  return !error;
}

async function deleteSupabase(id: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return false;
  const { error } = await supabase.from("social_posts").delete().eq("id", id);
  return !error;
}

async function persist(posts: SocialPost[]) {
  writeLocal(posts);
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  for (const p of posts) {
    await upsertSupabase(p);
  }
}

export async function listPosts(): Promise<SocialPost[]> {
  const remote = await listFromSupabase();
  if (remote && remote.length >= 0) {
    writeLocal(remote);
    return remote;
  }
  return readLocal();
}

export async function createPost(input: CreateSocialPostInput): Promise<SocialPost> {
  const posts = await listPosts();
  const ts = nowIso();
  const post: SocialPost = {
    id: crypto.randomUUID(),
    caption: input.caption.trim(),
    media: input.media,
    platforms: input.platforms,
    scheduledAt: input.scheduledAt,
    recurrence: input.recurrence,
    status: "scheduled",
    metrics: {},
    createdAt: ts,
    updatedAt: ts,
  };

  const next = [post, ...posts];
  await persist(next);
  return post;
}

export async function updatePost(id: string, input: CreateSocialPostInput): Promise<SocialPost | null> {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const prev = posts[idx];
  const ts = nowIso();
  const updated: SocialPost = {
    ...prev,
    caption: input.caption.trim(),
    media: input.media,
    platforms: input.platforms,
    scheduledAt: input.scheduledAt,
    recurrence: input.recurrence,
    updatedAt: ts,
    status: prev.status === "failed" ? "scheduled" : prev.status,
    lastError: undefined,
  };
  posts[idx] = updated;
  await persist(posts);
  const ok = await upsertSupabase(updated);
  if (!ok && getSupabaseBrowserClient()) {
    /* sync retry harmless via persist batch above */
  }
  return updated;
}

export async function deletePost(id: string): Promise<void> {
  const posts = (await listPosts()).filter((p) => p.id !== id);
  writeLocal(posts);
  await deleteSupabase(id);
}

/** Simulate publishing pipeline when scheduled time passes (demo — replace with Supabase Edge Function / worker). */
export async function tickScheduler(onPublish?: (post: SocialPost, outcome: "ok" | "fail") => void) {
  const posts = await listPosts();
  const now = Date.now();
  const recurringNext: SocialPost[] = [];

  const updated = posts.map((post) => {
    if (post.status !== "scheduled") return post;
    if (new Date(post.scheduledAt).getTime() > now) return post;

    const ts = nowIso();
    if (post.platforms.length === 0) {
      const failed: SocialPost = {
        ...post,
        status: "failed",
        lastError: "Pilih minimal satu platform sebelum jadwal dikirim.",
        updatedAt: ts,
      };
      onPublish?.(failed, "fail");
      return failed;
    }

    const metrics: SocialPost["metrics"] = {};
    for (const p of post.platforms) {
      metrics[p] = mockMetrics();
    }

    const published: SocialPost = {
      ...post,
      status: "published",
      metrics,
      updatedAt: ts,
      lastError: undefined,
    };
    onPublish?.(published, "ok");

    if (post.recurrence !== "none") {
      const nextRun = new Date(post.scheduledAt);
      if (post.recurrence === "weekly") nextRun.setDate(nextRun.getDate() + 7);
      if (post.recurrence === "monthly") nextRun.setMonth(nextRun.getMonth() + 1);
      recurringNext.push({
        id: crypto.randomUUID(),
        caption: post.caption,
        media: post.media,
        platforms: post.platforms,
        scheduledAt: nextRun.toISOString(),
        recurrence: post.recurrence,
        status: "scheduled",
        metrics: {},
        createdAt: ts,
        updatedAt: ts,
      });
    }

    return published;
  });

  const merged = [...recurringNext, ...updated];
  if (JSON.stringify(merged) === JSON.stringify(posts)) {
    return;
  }

  writeLocal(merged);
  const supabase = getSupabaseBrowserClient();
  if (supabase) {
    for (const p of merged) {
      await upsertSupabase(p);
    }
  }
}

/** OAuth wiring — redirect user through provider consent screens (implement per platform in production). */
export function getOAuthConnectUrl(platform: SocialPlatform): string | null {
  void platform;
  return null;
}

export async function syncMetricsFromApis(postId: string): Promise<void> {
  void postId;
  /* Meta / X / LinkedIn insights — requires server-side tokens & cron */
}

/**
 * Bound Supabase HTTP calls so a bad or unreachable host cannot hang
 * Next.js middleware / RSC indefinitely (symptom: tab “loading” forever).
 */
export const SUPABASE_FETCH_TIMEOUT_MS = 12_000;

export function createFetchWithTimeout(timeoutMs: number = SUPABASE_FETCH_TIMEOUT_MS): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(input, {
        ...init,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(id);
    }
  };
}

export const supabaseTimedFetch = createFetchWithTimeout();

/**
 * Small in-memory sliding-window rate limiter.
 *
 * It protects a single server process. On serverless or multi-instance
 * hosting each instance keeps its own counters, so treat this as a first line
 * of defence and add a shared store (for example Redis) or a platform-level
 * rule if the form attracts sustained abuse.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)) };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

import "server-only";

const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

// ponytail: fixed window held in process memory. Fine for one instance; on
// Vercel each lambda has its own counter, so move this to Redis if it matters.
export function checkRateLimit(key: string, limit = 10) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return {
      limited: true,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { limited: false, retryAfter: 0 };
}

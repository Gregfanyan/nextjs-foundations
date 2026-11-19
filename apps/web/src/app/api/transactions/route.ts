import { z } from "zod";
import { verifyAuth } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

const TransactionSchema = z.object({
  userId: z.string().min(1),
  amount: z.number().positive().max(10_000),
});

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  try {
    const user = verifyAuth(request);
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { limited, retryAfter } = checkRateLimit(
      `tx:${user.id}:${clientIp(request)}`
    );
    if (limited) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const body = await request.json().catch(() => null);
    const result = TransactionSchema.safeParse(body);
    if (!result.success) {
      // details stay in the logs, the client just gets a generic message
      console.error(`[${requestId}] Validation failed:`, result.error.issues);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    // can only create transactions for yourself
    if (result.data.userId !== user.id) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    return Response.json({
      success: true,
      transactionId: crypto.randomUUID(),
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error(`[${requestId}] Transaction failed:`, error);
    return Response.json({ error: "Server error", requestId }, { status: 500 });
  }
}

export function GET(request: Request) {
  if (!verifyAuth(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({
    transactions: [
      { id: "1", amount: 100, status: "completed" },
      { id: "2", amount: 250, status: "pending" },
    ],
  });
}

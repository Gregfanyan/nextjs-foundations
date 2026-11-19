import "server-only";

// Placeholder auth: a single shared bearer token. Swap for real sessions
// (cookies / JWT) before this guards anything that matters.
export function verifyAuth(request: Request) {
  const expected = process.env.API_TOKEN;
  const header = request.headers.get("authorization");

  if (!expected || header !== `Bearer ${expected}`) {
    return null;
  }

  return { id: "user-123" };
}

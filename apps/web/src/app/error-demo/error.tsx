"use client";

import { useEffect, useMemo } from "react";

// Correlation ID: give it to users for support tickets, match it against the server log
function generateCorrelationId(): string {
  return `err-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ErrorDemoBoundary({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  // memoized so the ID stays the same across re-renders
  const correlationId = useMemo(() => generateCorrelationId(), []);

  const message = error instanceof Error ? error.message : String(error);
  const digest =
    error instanceof Error && "digest" in error
      ? String(error.digest)
      : undefined;

  useEffect(() => {
    console.error("Error demo boundary caught:", {
      correlationId,
      digest,
      message,
      timestamp: new Date().toISOString(),
      location: "/error-demo",
    });
  }, [digest, message, correlationId]);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-6">
        <h2 className="mb-2 font-bold text-orange-800 text-xl">
          Demo Error Caught!
        </h2>
        <p className="mb-4 text-orange-700">
          This error was caught by the nested error boundary in /error-demo.
        </p>
        <p className="mb-4 font-mono text-orange-600 text-sm">{message}</p>
        <p className="mb-4 font-mono text-orange-400 text-xs">
          Correlation ID: {correlationId}
        </p>
        {digest && (
          <p className="mb-4 font-mono text-orange-400 text-xs">
            Digest: {digest}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            Try Again
          </button>
          <a
            href="/error-demo"
            className="rounded border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-100"
          >
            Reload Page
          </a>
        </div>
      </div>
    </div>
  );
}

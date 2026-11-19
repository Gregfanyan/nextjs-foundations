'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const digest =
    error instanceof Error && 'digest' in error
      ? String(error.digest)
      : undefined;

  useEffect(() => {
    console.error('[blog] error boundary', { digest, error });
  }, [digest, error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="font-bold text-2xl">Application error</h2>
      <p className="text-gray-600">Something broke while loading the blog.</p>
      {digest && (
        <p className="font-mono text-gray-400 text-xs">Error ID: {digest}</p>
      )}
      <button
        type="button"
        onClick={() => retry()}
        className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
      >
        Retry
      </button>
    </div>
  );
}

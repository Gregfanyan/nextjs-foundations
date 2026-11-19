'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function PostError({
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
    console.error('[blog/post] error boundary', { digest, error });
  }, [digest, error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded border border-orange-200 bg-orange-50 p-8">
      <h2 className="font-bold text-orange-800 text-xl">
        This post is unavailable
      </h2>
      <p className="text-orange-700 text-sm">
        We hit a problem loading it. The rest of the blog still works.
      </p>
      {digest && (
        <p className="font-mono text-orange-400 text-xs">Error ID: {digest}</p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Retry
        </button>
        <Link
          href="/"
          className="rounded border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-100"
        >
          All posts
        </Link>
      </div>
    </div>
  );
}

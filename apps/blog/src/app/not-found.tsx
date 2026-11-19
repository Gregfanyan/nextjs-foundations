import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-5xl">404</h1>
      <p className="text-gray-600">We couldn't find that page.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Back to the blog
      </Link>
    </div>
  );
}

import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-3xl">Post not found</h1>
      <p className="text-gray-600">
        This post may have been removed or the link is wrong.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Browse all posts
      </Link>
    </div>
  );
}

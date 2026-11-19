import { fetchPosts } from '@repo/api/blog';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LikeButton } from '@/components/like-button';
import { ShareDialog } from '@/components/share-dialog';
import { getPost } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = await fetchPosts(10);

  return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  // generateMetadata runs even for slugs that 404, so don't assume a post
  if (!post) {
    return { title: 'Post not found', robots: { index: false } };
  }

  // the blog lives under /blog on the main domain
  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: [
        { url: post.coverImage, width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  // the mock API makes up a post for any slug, so these two give us
  // something to hit for testing the 404 / error surfaces
  if (slug === 'test-error') {
    throw new Error('Post failed to load (test)');
  }

  const post = await getPost(slug);

  if (!post || slug === 'test-not-found') {
    notFound();
  }

  return (
    <main className="flex flex-col gap-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back to posts
      </Link>

      <article className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{post.title}</h1>
          <p className="text-sm text-gray-500">
            {post.category} · {post.readingTime} min read ·{' '}
            {post.publishedAt.toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">By {post.author.name}</p>
          <div className="flex gap-2">
            <LikeButton initialLikes={post.likes} />
            <ShareDialog title={post.title} slug={post.slug} />
          </div>
        </header>

        <div className="prose max-w-none">
          {post.content.split('\n\n').map((paragraph) => (
            <p key={paragraph} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="flex flex-wrap gap-2 border-t pt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </footer>
      </article>
    </main>
  );
}

import {
  type BlogPost,
  fetchCategories,
  fetchPosts,
  fetchPostsByCategory,
} from '@repo/api/blog';
import Link from 'next/link';
import { Suspense } from 'react';
import { PostFilters } from '@/components/post-filters';

const PAGE_SIZE = 5;

type SearchParams = Promise<{
  category?: string;
  sort?: string;
  page?: string;
}>;

function sortPosts(posts: BlogPost[], sort: string) {
  const sorted = [...posts];

  if (sort === 'oldest') {
    sorted.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime());
  } else if (sort === 'popular') {
    sorted.sort((a, b) => b.views - a.views);
  } else {
    sorted.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  return sorted;
}

export default async function BlogHomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category, sort = 'recent', page } = await searchParams;
  const currentPage = Math.max(1, Number.parseInt(page ?? '1', 10) || 1);

  const [categories, allPosts] = await Promise.all([
    fetchCategories(),
    category ? fetchPostsByCategory(category, 50) : fetchPosts(50),
  ]);

  const sorted = sortPosts(allPosts, sort);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const posts = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // keep the current filters when linking to another page
  function pageHref(target: number) {
    const query = new URLSearchParams();
    if (category) query.set('category', category);
    if (sort !== 'recent') query.set('sort', sort);
    if (target > 1) query.set('page', String(target));
    const qs = query.toString();
    return qs ? `/?${qs}` : '/';
  }

  return (
    <main className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">
        Blog{category ? ` · ${category}` : ''}
      </h1>

      <Suspense>
        <PostFilters categories={categories} />
      </Suspense>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <article key={post.id} className="flex flex-col gap-2 border-b pb-6">
            <Link href={`/${post.slug}`} className="hover:underline">
              <h2 className="font-semibold text-2xl">{post.title}</h2>
            </Link>
            <p className="text-gray-500 text-sm">
              {post.category} · {post.readingTime} min read ·{' '}
              {post.publishedAt.toLocaleDateString()}
            </p>
            <p className="text-gray-700">{post.excerpt}</p>
            <Link
              href={`/${post.slug}`}
              className="text-blue-600 text-sm hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>

      <nav className="flex items-center gap-4 text-sm" aria-label="Pagination">
        {currentPage > 1 && (
          <Link
            href={pageHref(currentPage - 1)}
            className="text-blue-600 hover:underline"
          >
            ← Previous
          </Link>
        )}
        <span className="text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={pageHref(currentPage + 1)}
            className="text-blue-600 hover:underline"
          >
            Next →
          </Link>
        )}
      </nav>
    </main>
  );
}

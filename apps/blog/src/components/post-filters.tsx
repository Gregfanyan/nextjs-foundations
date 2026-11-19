'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Most popular' },
];

export function PostFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // copy what's already in the URL, change one key, send it back
  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    // a different filter means the old page number may not exist anymore
    next.delete('page');

    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-end gap-4 text-sm">
      <label className="flex flex-col gap-1">
        Category
        <select
          className="rounded border px-2 py-1"
          value={searchParams.get('category') ?? ''}
          onChange={(e) => update('category', e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        Sort
        <select
          className="rounded border px-2 py-1"
          value={searchParams.get('sort') ?? 'recent'}
          onChange={(e) => update('sort', e.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {searchParams.toString() !== '' && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="py-1 text-red-600 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchForm({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const category = params.get("category") ?? "";
  const submit = (nextQuery = query, nextCategory = category) => {
    const next = new URLSearchParams();
    if (nextQuery.trim()) next.set("q", nextQuery.trim());
    if (nextCategory) next.set("category", nextCategory);
    router.replace(`/search${next.size ? `?${next}` : ""}`);
  };
  useEffect(() => {
    if (query.length >= 3) {
      const timer = setTimeout(() => {
        const next = new URLSearchParams();
        next.set("q", query.trim());
        if (category) next.set("category", category);
        router.replace(`/search?${next}`);
      }, 350);
      return () => clearTimeout(timer);
    }
    if (!query)
      router.replace(category ? `/search?category=${category}` : "/search");
  }, [category, query, router]);
  return (
    <form action={() => submit()} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="min-w-0 flex-1 rounded-md border border-zinc-300 px-4 py-3"
      />
      <select
        value={category}
        onChange={(event) => submit(query, event.target.value)}
        aria-label="Category"
        className="rounded-md border border-zinc-300 px-4 py-3"
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-md bg-zinc-950 px-5 py-3 font-medium text-white"
      >
        Search
      </button>
    </form>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchForm({ categories }: { categories: { slug: string; name: string }[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const [query, setQuery] = useState(urlQuery);

  const submit = (nextQuery = query, nextCategory = category) => {
    const next = new URLSearchParams();
    const trimmed = nextQuery.trim();
    if (trimmed) next.set("q", trimmed);
    if (nextCategory) next.set("category", nextCategory);
    router.replace(`/search${next.size ? `?${next}` : ""}`);
  };

  useEffect(() => setQuery(urlQuery), [urlQuery]);
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      submit("", category);
      return;
    }
    if (trimmed.length < 3) return;
    const timer = setTimeout(() => submit(trimmed, category), 350);
    return () => clearTimeout(timer);
  }, [category, query]); // submit intentionally reads the current URL category

  return (
    <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="flex flex-col gap-3 sm:flex-row">
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" className="min-w-0 flex-1 rounded-md border border-zinc-300 px-4 py-3" />
      <select value={category} onChange={(event) => submit(query, event.target.value)} aria-label="Category" className="rounded-md border border-zinc-300 px-4 py-3">
        <option value="">All categories</option>
        {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
      </select>
      <button type="submit" className="rounded-md bg-zinc-950 px-5 py-3 font-medium text-white">Search</button>
    </form>
  );
}

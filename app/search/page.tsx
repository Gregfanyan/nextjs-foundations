import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product-grid";
import { SearchForm } from "@/components/search-form";
import { getCategories, getProducts } from "@/lib/store";

export const metadata: Metadata = { title: "Search products" };
type Props = { searchParams: Promise<{ q?: string; category?: string }> };

async function SearchContent({ searchParams }: Props) {
  const { q = "", category = "" } = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      search: q || undefined,
      category: category || undefined,
      limit: q ? 5 : 6,
    }),
  ]);
  return (
    <>
      <SearchForm categories={categories} />
      <section className="mt-12">
        <h2 className="mb-7 font-semibold text-xl">
          {q ? `Results for “${q}”` : "Popular products"}
        </h2>
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <p className="rounded-lg bg-zinc-100 p-6 text-zinc-600">
            No products match that search.
          </p>
        )}
      </section>
    </>
  );
}

export default function SearchPage({ searchParams }: Props) {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-12 sm:px-8">
      <h1 className="font-semibold text-4xl tracking-tight">Search products</h1>
      <p className="mt-3 text-zinc-600">Find gear for your next build.</p>
      <div className="mt-8">
        <Suspense fallback={<p className="animate-pulse">Loading products…</p>}>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

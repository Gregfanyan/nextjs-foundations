import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "@/lib/products";

async function ProductList() {
  const products = await getProducts();

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`} className="group block">
            <div className="flex aspect-square items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-zinc-200">
              <span
                aria-hidden="true"
                className="size-0 border-x-[44px] border-b-[78px] border-x-transparent border-b-zinc-950 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h2 className="mt-4 font-medium group-hover:underline">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ProductsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-sm text-zinc-600 hover:underline">
        ← Home
      </Link>
      <h1 className="mt-6 font-semibold text-4xl tracking-tight">
        All products
      </h1>
      <p className="mt-3 max-w-xl text-zinc-600">
        Useful gear for the people building the web.
      </p>
      <section className="mt-12">
        <Suspense fallback={<p className="animate-pulse">Loading products…</p>}>
          <ProductList />
        </Suspense>
      </section>
    </main>
  );
}

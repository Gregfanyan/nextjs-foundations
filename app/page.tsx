import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product-grid";
import { getProducts, getPromotion } from "@/lib/store";

export const metadata: Metadata = {
  title: "Premium developer gear",
  description: "Premium developer apparel, accessories, and gear.",
  openGraph: { title: "Premium developer gear" },
};

async function Promotion() {
  const promotion = await getPromotion();
  return (
    <p className="bg-zinc-950 px-4 py-3 text-center text-sm text-white">
      {promotion.title} — {promotion.description}
      {promotion.code ? <> Code: <strong>{promotion.code}</strong></> : null}
    </p>
  );
}

async function FeaturedProducts() {
  return <ProductGrid products={await getProducts({ featured: true, limit: 6 })} />;
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div className="h-11 bg-zinc-950" />}><Promotion /></Suspense>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="mb-4 font-medium text-sm uppercase tracking-[.18em] text-zinc-500">Built for builders</p>
          <h1 className="max-w-xl font-semibold text-5xl tracking-tight sm:text-7xl">Wear the framework you ship with.</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600">Premium developer apparel, accessories, and gear.</p>
          <Link href="/search" className="mt-8 inline-flex rounded-md bg-zinc-950 px-5 py-3 font-medium text-sm text-white">Browse products <span className="ml-3">→</span></Link>
        </div>
        <div aria-hidden="true" className="flex aspect-square items-center justify-center rounded-2xl bg-zinc-100"><span className="size-0 border-x-[90px] border-b-[155px] border-x-transparent border-b-zinc-950" /></div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="mb-8 flex items-baseline justify-between"><h2 className="font-semibold text-2xl tracking-tight">Featured products</h2><Link href="/search" className="text-sm text-zinc-600 hover:underline">View all</Link></div>
        <Suspense fallback={<p className="animate-pulse">Loading featured products…</p>}><FeaturedProducts /></Suspense>
      </section>
    </main>
  );
}

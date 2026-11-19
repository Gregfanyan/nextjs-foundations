import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { getProduct, getStock } from "@/lib/store";
import { money, type Product } from "@/lib/store-types";

type Props = { params: Promise<{ id: string }> };

// Product identifiers arrive at request time; render the route on demand.
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  return product
    ? {
        title: product.name,
        description: product.description,
        openGraph: { images: product.images },
      }
    : { title: "Product not found" };
}

async function PurchaseControls({ product }: { product: Product }) {
  const stock = await getStock(product.id);
  return (
    <>
      <p
        className={`mt-6 text-sm font-medium ${stock.inStock ? "text-emerald-700" : "text-red-700"}`}
      >
        {stock.inStock
          ? `${stock.stock} in stock${stock.lowStock ? " — low stock" : ""}`
          : "Out of stock"}
      </p>
      <AddToCart productId={product.id} stock={stock.stock} />
    </>
  );
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  if (!product) notFound();
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={product.images[0] ?? ""}
          alt={product.name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-medium text-sm uppercase tracking-[.18em] text-zinc-500">
          {product.category}
        </p>
        <h1 className="mt-3 font-semibold text-4xl tracking-tight">
          {product.name}
        </h1>
        <p className="mt-4 text-xl">{money(product.price, product.currency)}</p>
        <p className="mt-6 leading-7 text-zinc-600">{product.description}</p>
        <Suspense
          fallback={
            <p className="mt-6 animate-pulse text-sm">Checking stock…</p>
          }
        >
          <PurchaseControls product={product} />
        </Suspense>
      </div>
    </main>
  );
}

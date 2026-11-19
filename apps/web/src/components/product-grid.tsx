import Image from "next/image";
import Link from "next/link";
import { money, type Product } from "@/lib/store-types";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
              <Image
                src={product.images[0] ?? ""}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-medium group-hover:underline">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              {money(product.price, product.currency)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

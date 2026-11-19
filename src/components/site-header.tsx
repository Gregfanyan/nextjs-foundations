import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { getCart } from "@/lib/store";

async function CartBadge() {
  const token = (await cookies()).get("swag-cart")?.value;
  const cart = token ? await getCart(token).catch(() => null) : null;
  return cart?.totalItems ? (
    <span className="absolute -right-2 -top-2 inline-flex size-5 items-center justify-center rounded-full bg-zinc-950 text-[11px] text-white">
      {cart.totalItems}
    </span>
  ) : null;
}

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span aria-hidden="true" className="size-0 border-x-[11px] border-b-[20px] border-x-transparent border-b-zinc-950" />
          Vercel Swag Store
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm text-zinc-600">
          <Link href="/" className="hover:text-zinc-950">Home</Link>
          <Link href="/search" className="hover:text-zinc-950">Search</Link>
          <Link href="/cart" aria-label="Cart" className="relative font-medium text-zinc-950">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2"><path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L21 7H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
            <Suspense fallback={null}><CartBadge /></Suspense>
          </Link>
        </nav>
      </div>
    </header>
  );
}

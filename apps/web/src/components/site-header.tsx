import { cookies } from "next/headers";
import Link from "next/link";
import { getCart } from "@/lib/store";

export async function SiteHeader() {
  const token = (await cookies()).get("swag-cart")?.value;
  const cart = token ? await getCart(token).catch(() => null) : null;

  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span
            aria-hidden="true"
            className="size-0 border-x-[11px] border-b-[20px] border-x-transparent border-b-zinc-950"
          />
          Vercel Swag Store
        </Link>
        <nav
          aria-label="Main"
          className="flex items-center gap-5 text-sm text-zinc-600"
        >
          <Link href="/" className="hover:text-zinc-950">
            Home
          </Link>
          <Link href="/search" className="hover:text-zinc-950">
            Search
          </Link>
          <Link href="/cart" className="relative font-medium text-zinc-950">
            Cart
            {cart?.totalItems ? (
              <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-zinc-950 text-[11px] text-white">
                {cart.totalItems}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}

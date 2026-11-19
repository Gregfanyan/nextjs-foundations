import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { CartItems } from "@/components/cart-items";
import { getCart } from "@/lib/store";
import { money } from "@/lib/store-types";

export const metadata: Metadata = { title: "Your cart" };

async function CartContent() {
  const token = (await cookies()).get("swag-cart")?.value;
  const cart = token ? await getCart(token).catch(() => null) : null;
  if (!cart)
    return (
      <p className="mt-8 rounded-lg bg-zinc-100 p-6 text-zinc-600">
        Your cart is empty.
      </p>
    );
  return (
    <>
      <CartItems cart={cart} />
      <div className="mt-6 flex justify-between border-t pt-5 font-semibold">
        <span>Subtotal</span>
        <span>{money(cart.subtotal, cart.currency)}</span>
      </div>
    </>
  );
}

export default function CartPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-semibold text-4xl tracking-tight">Your cart</h1>
      <Suspense fallback={<p className="mt-8 animate-pulse">Loading cart…</p>}>
        <CartContent />
      </Suspense>
    </main>
  );
}

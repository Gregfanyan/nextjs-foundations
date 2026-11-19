"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { changeCartItem } from "@/actions/cart";
import { type Cart, money } from "@/lib/store-types";

export function CartItems({ cart }: { cart: Cart }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const update = (productId: string, quantity: number) => {
    setError("");
    startTransition(async () => {
      const result = await changeCartItem(productId, quantity);
      if (result.error) setError(result.error);
    });
  };

  if (!cart.items.length)
    return <p className="rounded-lg bg-zinc-100 p-6 text-zinc-600">Your cart is empty.</p>;

  return (
    <>
      {error ? <p className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <div className="divide-y divide-zinc-200">
        {cart.items.map((item) => (
          <article key={item.productId} className="flex gap-4 py-5">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-zinc-100">
              <Image src={item.product.images[0] ?? ""} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-medium">{item.product.name}</h2>
              <p className="mt-1 text-sm text-zinc-600">{money(item.product.price, item.product.currency)}</p>
              <div className="mt-3 flex items-center gap-3">
                <button type="button" aria-label={`Decrease ${item.product.name} quantity`} disabled={pending} onClick={() => update(item.productId, item.quantity - 1)} className="size-8 rounded border">−</button>
                <span aria-live="polite">{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.product.name} quantity`} disabled={pending} onClick={() => update(item.productId, item.quantity + 1)} className="size-8 rounded border">+</button>
                <button type="button" disabled={pending} onClick={() => update(item.productId, 0)} className="ml-2 text-sm text-zinc-600 underline">Remove</button>
              </div>
            </div>
            <p className="font-medium">{money(item.lineTotal, cart.currency)}</p>
          </article>
        ))}
      </div>
    </>
  );
}

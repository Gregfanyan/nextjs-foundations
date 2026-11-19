"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { addToCart } from "@/app/actions/cart";

function Submit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-md bg-zinc-950 px-5 py-3 font-medium text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? "Adding…" : "Add to cart"}
    </button>
  );
}

export function AddToCart({
  productId,
  stock,
}: {
  productId: string;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);
  return (
    <form action={addToCart} className="mt-8 flex items-end gap-3">
      <input type="hidden" name="productId" value={productId} />
      <label className="flex flex-col gap-1 text-sm font-medium">
        Quantity
        <input
          name="quantity"
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          disabled={!stock}
          className="w-20 rounded-md border border-zinc-300 px-3 py-3"
        />
      </label>
      <Submit disabled={!stock} />
    </form>
  );
}

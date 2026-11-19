"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { addToCart, type CartActionState } from "@/actions/cart";

const initialState: CartActionState = {};

function Submit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-md bg-zinc-950 px-5 py-3 font-medium text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? "Adding…" : "Add to Cart"}
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
  const [state, action] = useActionState(addToCart, initialState);
  const unavailable = stock < 1;

  return (
    <form action={action} className="mt-8 flex flex-wrap items-end gap-3">
      <input type="hidden" name="productId" value={productId} />
      <label className="flex flex-col gap-1 text-sm font-medium">
        Quantity
        <input
          name="quantity"
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={(event) =>
            setQuantity(Math.max(1, Math.min(stock, Number(event.target.value) || 1)))
          }
          disabled={unavailable}
          className="w-20 rounded-md border border-zinc-300 px-3 py-3"
        />
      </label>
      <Submit disabled={unavailable} />
      {state.error ? <p className="w-full text-sm text-red-700">{state.error}</p> : null}
      {state.success ? <p className="w-full text-sm text-emerald-700">{state.success}</p> : null}
    </form>
  );
}

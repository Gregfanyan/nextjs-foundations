"use client";

import { useState, useTransition } from "react";
import { updateProduct } from "@/app/actions/products";
import type { Product } from "@/lib/products-db";

export function ProductForm({ product }: { product: Product }) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await updateProduct(product.id, formData);
      setMessage(result.success ? "Product updated" : result.error);
    });
  }

  return (
    <form action={handleSubmit} className="flex max-w-sm flex-col gap-3">
      <input
        name="name"
        defaultValue={product.name}
        aria-label="Name"
        className="rounded border px-3 py-2"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        defaultValue={product.price}
        aria-label="Price"
        className="rounded border px-3 py-2"
      />
      <input
        name="inventory"
        type="number"
        defaultValue={product.inventory}
        aria-label="Inventory"
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}

"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { dbUpdateProduct } from "@/lib/products-db";

const updateSchema = z.object({
  name: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  inventory: z.coerce.number().int().min(0),
});

export async function updateProduct(id: string, formData: FormData) {
  const parsed = updateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false as const, error: "Invalid product data" };
  }

  const product = await dbUpdateProduct(id, parsed.data);
  if (!product) {
    return { success: false as const, error: "Product not found" };
  }

  // the person editing should see their change on the very next render
  updateTag(`product-${id}`);
  updateTag("products");

  return { success: true as const };
}

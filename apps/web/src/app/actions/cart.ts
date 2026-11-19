"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  addCartItem,
  createCart,
  removeCartItem,
  updateCartItem,
} from "@/lib/store";

const CART_COOKIE = "swag-cart";

async function cartToken() {
  const jar = await cookies();
  const existing = jar.get(CART_COOKIE)?.value;
  if (existing) return existing;

  const cart = await createCart();
  jar.set(CART_COOKIE, cart.token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return cart.token;
}

export async function addToCart(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const quantity = Number(formData.get("quantity"));
  if (!productId || !Number.isInteger(quantity) || quantity < 1) return;

  await addCartItem(await cartToken(), productId, quantity);
  revalidatePath("/", "layout");
}

export async function changeCartItem(productId: string, quantity: number) {
  const token = await cartToken();
  if (quantity < 1) await removeCartItem(token, productId);
  else await updateCartItem(token, productId, quantity);
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

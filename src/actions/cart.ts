"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  addCartItem,
  createCart,
  getStock,
  removeCartItem,
  updateCartItem,
} from "@/lib/store";

const CART_COOKIE = "swag-cart";
export type CartActionState = { error?: string; success?: string };

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

function message(error: unknown) {
  return error instanceof Error ? error.message : "Unable to update your cart.";
}

function refreshCart() {
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function addToCart(
  _previous: CartActionState,
  formData: FormData
): Promise<CartActionState> {
  const productId = String(formData.get("productId") ?? "");
  const quantity = Number(formData.get("quantity"));
  if (!productId || !Number.isInteger(quantity) || quantity < 1)
    return { error: "Choose a valid quantity." };

  try {
    const stock = await getStock(productId);
    if (!stock.inStock || quantity > stock.stock)
      return { error: "That quantity is no longer available." };
    await addCartItem(await cartToken(), productId, quantity);
    refreshCart();
    return { success: "Added to cart." };
  } catch (error) {
    return { error: message(error) };
  }
}

export async function changeCartItem(
  productId: string,
  quantity: number
): Promise<CartActionState> {
  if (!productId || !Number.isInteger(quantity) || quantity < 0)
    return { error: "Choose a valid quantity." };

  try {
    const token = await cartToken();
    if (quantity === 0) await removeCartItem(token, productId);
    else {
      const stock = await getStock(productId);
      if (!stock.inStock || quantity > stock.stock)
        return { error: "That quantity is no longer available." };
      await updateCartItem(token, productId, quantity);
    }
    refreshCart();
    return {};
  } catch (error) {
    return { error: message(error) };
  }
}

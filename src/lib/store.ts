import "server-only";
import { cacheLife } from "next/cache";
import type { Cart, Category, Product, Promotion, Stock } from "./store-types";

const baseUrl = "https://vercel-swag-store-api.vercel.app/api";

type ApiResponse<T> = { success: true; data: T };

export type { Cart, Category, Product, Promotion, Stock } from "./store-types";

function headers(cartToken?: string) {
  const token = process.env.SWAG_STORE_API_TOKEN;
  if (!token) throw new Error("Missing SWAG_STORE_API_TOKEN");
  return {
    "x-vercel-protection-bypass": token,
    ...(cartToken ? { "x-cart-token": cartToken } : {}),
  };
}

async function request<T>(
  path: string,
  init?: RequestInit,
  cartToken?: string
) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { ...headers(cartToken), ...init?.headers },
  });
  if (!response.ok) throw new Error(`Store API failed: ${response.status}`);
  const body = (await response.json()) as ApiResponse<T>;
  return body.data;
}

async function cachedProducts(query: string) {
  "use cache";
  cacheLife("products");
  return request<Product[]>(`/products?${query}`);
}

export function getProducts(
  options: {
    featured?: boolean;
    search?: string;
    category?: string;
    limit?: number;
  } = {}
) {
  const query = new URLSearchParams();
  if (options.featured) query.set("featured", "true");
  if (options.search) query.set("search", options.search);
  if (options.category) query.set("category", options.category);
  query.set("limit", String(options.limit ?? 20));
  return cachedProducts(query.toString());
}

export async function getProduct(id: string) {
  "use cache";
  cacheLife("products");
  return request<Product>(`/products/${id}`);
}

export function getStock(id: string) {
  return request<Stock>(`/products/${id}/stock`, { cache: "no-store" });
}

export function getPromotion() {
  return request<Promotion>("/promotions", { cache: "no-store" });
}

export async function getCategories() {
  "use cache";
  cacheLife("products");
  return request<Category[]>("/categories");
}

export async function createCart() {
  return request<Cart>("/cart/create", { method: "POST" });
}

export function getCart(token: string) {
  return request<Cart>("/cart", { cache: "no-store" }, token);
}

export function addCartItem(
  token: string,
  productId: string,
  quantity: number
) {
  return request<Cart>(
    "/cart",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    },
    token
  );
}

export function updateCartItem(
  token: string,
  itemId: string,
  quantity: number
) {
  return request<Cart>(
    `/cart/${itemId}`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quantity }),
    },
    token
  );
}

export function removeCartItem(token: string, itemId: string) {
  return request<Cart>(`/cart/${itemId}`, { method: "DELETE" }, token);
}

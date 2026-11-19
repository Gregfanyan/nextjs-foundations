import { cacheLife, cacheTag } from "next/cache";
import { dbGetProduct, dbListProducts } from "./products-db";

export async function getProducts() {
  "use cache";
  cacheLife("products");
  cacheTag("products");

  return dbListProducts();
}

export async function getProduct(id: string) {
  "use cache";
  cacheLife("products");
  cacheTag("products", `product-${id}`);

  return dbGetProduct(id);
}

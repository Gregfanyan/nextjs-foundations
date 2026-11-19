import "server-only";

export type Product = {
  id: string;
  name: string;
  price: number;
  inventory: number;
};

// stand-in for a real database; lives in memory of the server process
const products = new Map<string, Product>([
  [
    "123",
    { id: "123", name: "Mechanical Keyboard", price: 129, inventory: 14 },
  ],
  ["456", { id: "456", name: '27" Monitor', price: 349, inventory: 6 }],
  ["789", { id: "789", name: "USB-C Dock", price: 89, inventory: 31 }],
]);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function dbListProducts(): Promise<Product[]> {
  await delay(300);
  return [...products.values()];
}

export async function dbGetProduct(id: string): Promise<Product | null> {
  await delay(300);
  return products.get(id) ?? null;
}

export async function dbUpdateProduct(
  id: string,
  data: Partial<Pick<Product, "name" | "price" | "inventory">>
): Promise<Product | null> {
  await delay(200);
  const existing = products.get(id);
  if (!existing) return null;

  const updated = { ...existing, ...data };
  products.set(id, updated);
  return updated;
}

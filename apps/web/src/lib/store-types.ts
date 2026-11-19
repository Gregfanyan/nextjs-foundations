export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
};

export type Category = { slug: string; name: string; productCount: number };
export type Promotion = { title: string; description: string; code?: string };
export type Stock = { stock: number; inStock: boolean; lowStock: boolean };
export type Cart = {
  token: string;
  totalItems: number;
  subtotal: number;
  currency: string;
  items: Array<{
    productId: string;
    quantity: number;
    lineTotal: number;
    product: Product;
  }>;
};

export const money = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    cents / 100
  );

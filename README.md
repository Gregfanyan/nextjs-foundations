# Vercel Swag Store

Next.js 16 storefront using App Router, TypeScript, Cache Components, Suspense, and Server Actions.

## Run

```bash
pnpm dev
```

Set `SWAG_STORE_API_TOKEN` in `.env.local` before running. Then visit [http://localhost:3000](http://localhost:3000).

## Implementation log

- Catalog products and categories use `use cache` with the `products` cache life; promotion, stock, and cart data stay dynamic.
- Suspense streams promotion, featured products, stock controls, and cookie-dependent cart content independently from their static shells.
- Cart identity is an HTTP-only, same-site cookie. Mutations validate product IDs, integer quantities, and current stock server-side, return inline feedback, and only revalidate the cart/header paths.
- Search keeps query and category in the URL, debounces valid three-character queries, clears stale results on empty input, and limits search results to five.

## Verification

```bash
pnpm check-types
pnpm build
```

Both pass locally. Check the home, product, search, and cart pages at desktop and narrow viewport widths before release.

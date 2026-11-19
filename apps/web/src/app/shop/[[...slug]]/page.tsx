import { Suspense } from "react";

async function ShopContent({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: categories = [] } = await params;

  if (categories.length === 0) {
    return (
      <>
        <h1 className="mb-4 font-bold text-2xl">All Products</h1>
        <p>Showing all categories</p>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">Filtered Products</h1>
      <p className="mb-2">Category path: /{categories.join("/")}</p>
      <p className="mb-4">Depth: {categories.length}</p>
      <ul className="list-disc pl-6">
        {categories.map((category, i) => (
          <li key={categories.slice(0, i + 1).join("/")}>
            Level {i + 1}: {category}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ShopPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  return (
    <div className="p-8">
      <Suspense fallback={<p className="animate-pulse">Loading…</p>}>
        <ShopContent params={params} />
      </Suspense>
    </div>
  );
}

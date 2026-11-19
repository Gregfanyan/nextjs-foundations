import { Suspense } from "react";

async function DocsContent({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return (
    <>
      <p className="mb-2">Full path: /docs/{slug.join("/")}</p>
      <p className="mb-4">Segments: {slug.length}</p>
      <ul className="list-disc pl-6">
        {slug.map((segment, i) => (
          <li key={slug.slice(0, i + 1).join("/")}>
            Segment {i}: {segment}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <div className="p-8">
      <h1 className="mb-4 font-bold text-2xl">Documentation</h1>
      <Suspense fallback={<p className="animate-pulse">Loading…</p>}>
        <DocsContent params={params} />
      </Suspense>
    </div>
  );
}

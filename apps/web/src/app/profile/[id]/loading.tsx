export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl animate-pulse space-y-6 p-8">
      <div className="space-y-2">
        <div className="h-7 w-48 rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-200" />
      </div>
      <div className="flex gap-4">
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded bg-gray-200" />
        <div className="h-5 w-24 rounded bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="h-6 w-40 rounded bg-gray-200" />
        <div className="h-4 w-56 rounded bg-gray-200" />
      </div>
    </main>
  );
}

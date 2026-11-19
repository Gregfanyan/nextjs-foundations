import { fetchCompanyStats } from "@repo/api/brand";
import { Suspense } from "react";

async function Stats() {
  const stats = await fetchCompanyStats();

  return (
    <dl className="grid grid-cols-2 gap-4">
      <div className="rounded border p-4">
        <dt className="text-gray-500 text-sm">Clients</dt>
        <dd className="font-semibold text-2xl">{stats.clientCount}</dd>
      </div>
      <div className="rounded border p-4">
        <dt className="text-gray-500 text-sm">Projects completed</dt>
        <dd className="font-semibold text-2xl">{stats.projectsCompleted}</dd>
      </div>
    </dl>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Overview</h1>
      <Suspense fallback={<p className="animate-pulse">Loading stats…</p>}>
        <Stats />
      </Suspense>
    </div>
  );
}

import { fetchTeamMembers } from "@repo/api/brand";
import { Suspense } from "react";
import { ExpandableCard } from "@/components/expandable-card";

async function Members() {
  // data fetching stays on the server, the client wrapper never sees fetchTeamMembers
  const members = await fetchTeamMembers(4);

  return members.map((member) => (
    <ExpandableCard key={member.id} title={member.name}>
      <p className="text-gray-600 text-sm">
        {member.role} · {member.department}
      </p>
      <p className="mt-2 text-sm">{member.bio}</p>
    </ExpandableCard>
  ));
}

export default function CardsDemoPage() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold text-2xl">Server children, client wrapper</h1>
      <Suspense fallback={<p className="animate-pulse">Loading team…</p>}>
        <Members />
      </Suspense>
    </main>
  );
}

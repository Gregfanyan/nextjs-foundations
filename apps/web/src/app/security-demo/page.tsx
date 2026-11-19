import { UserCard } from "@/components/user-card";
import { getUserDTO } from "@/lib/server/user-dto";

export default function SecurityDemoPage() {
  const user = getUserDTO("user-123");

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold text-2xl">Security Demo</h1>
      <p className="text-gray-600">
        This page demonstrates secure data fetching patterns.
      </p>
      <UserCard user={user} />
    </main>
  );
}

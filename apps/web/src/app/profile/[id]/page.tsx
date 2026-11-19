import { Suspense } from "react";

// Mock data fetching functions (simulate API calls)
async function fetchUserProfile(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    id,
    name: "Demo User",
    email: "demo@example.com",
    joinedAt: new Date("2024-01-15"),
  };
}

async function fetchUserStats(_id: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { posts: 42, followers: 1234, following: 567 };
}

async function fetchUserActivity(_id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return [
    { type: "post", title: "My first post", date: new Date() },
    { type: "comment", title: "Great article!", date: new Date() },
  ];
}

// Each section fetches on its own. Rendered as siblings, so the requests all
// start together (no waterfall) and each one streams in as soon as it's done.

async function ProfileHeader({ id }: { id: string }) {
  const profile = await fetchUserProfile(id);

  return (
    <section>
      <h1 className="font-bold text-2xl">{profile.name}</h1>
      <p className="text-gray-600">{profile.email}</p>
    </section>
  );
}

async function ProfileStats({ id }: { id: string }) {
  const stats = await fetchUserStats(id);

  return (
    <section className="flex gap-4">
      <div>
        <strong>{stats.posts}</strong> posts
      </div>
      <div>
        <strong>{stats.followers}</strong> followers
      </div>
      <div>
        <strong>{stats.following}</strong> following
      </div>
    </section>
  );
}

async function ProfileActivity({ id }: { id: string }) {
  const activity = await fetchUserActivity(id);

  return (
    <section>
      <h2 className="mb-2 font-semibold text-xl">Recent Activity</h2>
      <ul className="space-y-2">
        {activity.map((item) => (
          <li key={`${item.type}-${item.title}`} className="text-gray-700">
            {item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

function HeaderSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-7 w-48 rounded bg-gray-200" />
      <div className="h-4 w-64 rounded bg-gray-200" />
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="flex animate-pulse gap-4">
      <div className="h-5 w-20 rounded bg-gray-200" />
      <div className="h-5 w-24 rounded bg-gray-200" />
      <div className="h-5 w-24 rounded bg-gray-200" />
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-6 w-40 rounded bg-gray-200" />
      <div className="h-4 w-56 rounded bg-gray-200" />
      <div className="h-4 w-48 rounded bg-gray-200" />
    </div>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // loading.tsx wraps the page, so waiting on params here is fine
  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-8">
      <Suspense fallback={<HeaderSkeleton />}>
        <ProfileHeader id={id} />
      </Suspense>
      <Suspense fallback={<StatsSkeleton />}>
        <ProfileStats id={id} />
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <ProfileActivity id={id} />
      </Suspense>
    </main>
  );
}

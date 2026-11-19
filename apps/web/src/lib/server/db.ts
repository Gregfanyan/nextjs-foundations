import "server-only";

// Fake DB call - stands in for something that would read DATABASE_URL
export function getUserFromDB(userId: string) {
  const config = process.env.INTERNAL_CONFIG ?? "default";

  return {
    id: userId,
    email: "user@example.com",
    passwordHash: "bcrypt$2b$10$...",
    internalNotes: `VIP customer (config: ${config})`,
    name: "Jane Developer",
    createdAt: "2024-01-15T09:30:00.000Z",
  };
}

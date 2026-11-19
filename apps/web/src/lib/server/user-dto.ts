import "server-only";
import { getUserFromDB } from "./db";

// Only the fields that are safe to send to the browser
export function getUserDTO(userId: string) {
  const user = getUserFromDB(userId);

  return {
    id: user.id,
    name: user.name,
    createdAt: user.createdAt,
  };
}

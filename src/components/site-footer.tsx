import { connection } from "next/server";

export async function SiteFooter() {
  // the current year is request-time data under Cache Components
  await connection();

  return (
    <footer className="border-t border-zinc-200 px-5 py-8 text-center text-sm text-zinc-600">
      © {new Date().getFullYear()} Vercel Swag Store
    </footer>
  );
}

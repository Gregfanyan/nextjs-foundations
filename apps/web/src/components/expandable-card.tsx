"use client";

import { type ReactNode, useState } from "react";

// Client wrapper that only owns the open/closed state.
// `children` is rendered on the server and passed in already-rendered.
export function ExpandableCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left font-semibold hover:bg-gray-50"
      >
        {title} {open ? "−" : "+"}
      </button>
      {open && <div className="border-t p-4">{children}</div>}
    </div>
  );
}

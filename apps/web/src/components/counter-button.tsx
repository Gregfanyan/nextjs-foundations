"use client";

import { useState } from "react";

// Client on purpose: needs useState + onClick. Nothing else lives in here.
export function CounterButton() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setCount((c) => c + 1)}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Count: {count}
    </button>
  );
}

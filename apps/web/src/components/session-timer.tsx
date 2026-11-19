"use client";

import { useEffect, useState } from "react";

// lives in the dashboard layout, so the seconds keep counting when you
// move between dashboard pages (layouts don't remount)
export function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p className="text-gray-500 text-xs">Time on dashboard: {seconds}s</p>;
}

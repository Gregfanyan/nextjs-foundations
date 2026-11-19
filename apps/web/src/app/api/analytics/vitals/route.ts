import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const vitals = await request.json();

    // stand-in for a real sink (database, analytics service)
    console.log("Core Web Vitals:", vitals);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to record vitals" },
      { status: 500 }
    );
  }
}

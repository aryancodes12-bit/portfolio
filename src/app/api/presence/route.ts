import { NextResponse } from "next/server";

// In-memory visitor store — resets on server restart
// For production, use Redis or Supabase Realtime
const visitors = new Map<string, number>();

function cleanStale() {
  const now = Date.now();
  for (const [id, ts] of visitors) {
    if (now - ts > 60_000) visitors.delete(id);
  }
}

export async function POST(req: Request) {
  try {
    const { visitorId } = await req.json();
    if (!visitorId) return NextResponse.json({ count: 0 });

    visitors.set(visitorId, Date.now());
    cleanStale();

    return NextResponse.json({ count: visitors.size });
  } catch {
    return NextResponse.json({ count: 1 });
  }
}

export async function GET() {
  cleanStale();
  return NextResponse.json({ count: visitors.size });
}

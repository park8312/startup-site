import { NextResponse } from "next/server";
import { readSnapshot, writeSnapshot } from "@/lib/admin/therapyStore";

export async function GET() {
  const snap = await readSnapshot();
  return NextResponse.json({ ok: true, snapshot: snap });
}

export async function POST(req: Request) {
  const body = await req.json();
  const saved = await writeSnapshot(body);
  return NextResponse.json({ ok: true, snapshot: saved });
}

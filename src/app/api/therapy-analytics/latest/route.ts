import { NextResponse } from "next/server";
import { readSnapshot } from "@/lib/admin/therapyStore";

export async function GET() {
  const snap = await readSnapshot();
  return NextResponse.json({ ok: true, snapshot: snap });
}

import { NextResponse } from "next/server";
import { setAdminCookie } from "@/lib/admin/auth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ ok: false, error: "Missing env: ADMIN_PASSWORD" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  setAdminCookie();
  return NextResponse.json({ ok: true });
}

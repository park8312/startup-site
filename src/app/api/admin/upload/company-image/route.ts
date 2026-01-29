import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { isAdminAuthed } from "@/lib/admin/auth";

export const runtime = "nodejs"; // ✅ fs 쓰려면 필요
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeExt(mime: string) {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return null;
}

export async function POST(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }

  const ext = safeExt(file.type);
  if (!ext || !ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  const dir = path.join(process.cwd(), "public", "company");
  await fs.mkdir(dir, { recursive: true });

  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const abs = path.join(dir, name);

  await fs.writeFile(abs, bytes);

  // 브라우저에서 접근할 URL
  const url = `/company/${name}`;
  return NextResponse.json({ ok: true, url });
}

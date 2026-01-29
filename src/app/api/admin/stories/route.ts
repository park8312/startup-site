// src/app/api/admin/stories/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.storyItem.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();

  const year = String(body.year ?? "").trim();
  const title = String(body.title ?? "").trim();
  const text = String(body.body ?? "").trim();

  if (!year || !title || !text) {
    return NextResponse.json(
      { error: "year/title/body are required" },
      { status: 400 }
    );
  }

  const maxOrder = await prisma.storyItem.aggregate({
    _max: { order: true },
  });

  const created = await prisma.storyItem.create({
    data: {
      year,
      title,
      body: text,
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : null,
      videoUrl: body.videoUrl ? String(body.videoUrl).trim() : null,
      isPublished: body.isPublished ?? true,
      order: (maxOrder._max.order ?? 0) + 10,
    },
  });

  return NextResponse.json({ item: created });
}

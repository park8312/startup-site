// src/app/api/stories/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get("published") === "1";

  const items = await prisma.storyItem.findMany({
    where: publishedOnly ? { isPublished: true } : undefined,
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ items });
}

// src/app/api/admin/stories/reorder/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Payload = { idsInOrder: string[] };

export async function PATCH(req: Request) {
  const body = (await req.json()) as Payload;

  if (!Array.isArray(body.idsInOrder) || body.idsInOrder.length === 0) {
    return NextResponse.json({ error: "idsInOrder required" }, { status: 400 });
  }

  // 10, 20, 30... 으로 재정렬
  await prisma.$transaction(
    body.idsInOrder.map((id, idx) =>
      prisma.storyItem.update({
        where: { id },
        data: { order: (idx + 1) * 10 },
      })
    )
  );

  return NextResponse.json({ ok: true });
}

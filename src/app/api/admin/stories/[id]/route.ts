// src/app/api/admin/stories/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  console.log("🔧 PATCH /api/admin/stories/[id] 요청:", { id: params.id, data });

  const updated = await prisma.storyItem.update({
    where: { id: params.id },
    data: {
      year: data.year !== undefined ? String(data.year).trim() : undefined,
      title: data.title !== undefined ? String(data.title).trim() : undefined,
      body: data.body !== undefined ? String(data.body).trim() : undefined,
      imageUrl:
        data.imageUrl !== undefined
          ? data.imageUrl
            ? String(data.imageUrl).trim()
            : null
          : undefined,
      videoUrl:
        data.videoUrl !== undefined
          ? data.videoUrl
            ? String(data.videoUrl).trim()
            : null
          : undefined,
      isPublished:
        data.isPublished !== undefined ? Boolean(data.isPublished) : undefined,
      order: data.order !== undefined ? Number(data.order) : undefined,
    },
  });

  console.log("✅ 저장 완료:", { id: params.id, updated });
  return NextResponse.json({ item: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.storyItem.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

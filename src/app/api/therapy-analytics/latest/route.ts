import { readSnapshot } from "@/lib/admin/therapyStore";

export async function GET() {
  const snapshot = await readSnapshot();

  return Response.json(
    { ok: true, snapshot },
    {
      headers: {
        // ✅ 캐시 완전 끄기 (Hero 반영 핵심)
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}

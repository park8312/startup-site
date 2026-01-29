// prisma/seed.ts
import { prisma } from "../src/lib/prisma";

async function main() {
  const count = await prisma.storyItem.count();
  if (count > 0) return;

  await prisma.storyItem.createMany({
    data: [
      {
        year: "2024",
        title: "Foundations",
        body: "사람의 수행(움직임/행동)을 ‘측정 가능한 데이터’로 만들기 위한 첫 프로토타입과 검증을 시작했습니다.",
        imageUrl: "/company/ACESO-Intro.jpg",
        order: 10,
        isPublished: true,
      },
      {
        year: "2025",
        title: "Early applications",
        body: "의료·재활 환경에서 실제 사용자(보호자/의료진)의 워크플로우를 기준으로 제품 루프를 정제했습니다.",
        order: 20,
        isPublished: true,
      },
      {
        year: "2026 – present",
        title: "Evidence-ready systems",
        body: "연구/임상/운영에서 검토 가능한 출력물을 만드는 시스템으로 확장하고, 수평적 적용 영역을 넓히고 있습니다.",
        order: 30,
        isPublished: true,
      },
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

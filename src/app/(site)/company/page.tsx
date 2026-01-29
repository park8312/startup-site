import { prisma } from "@/lib/prisma";
import PageBackdrop from "@/components/ui/PageBackdrop";
import StoryStack from "@/components/sections/company/StoryStack";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getCompanyContent() {
  const row = await prisma.companyPageContent.findUnique({
    where: { key: "company" },
  });
  // 없으면 fallback (지금 하드코딩한 기본값)
  return (
    row?.data ?? {
      hero: {
        eyebrow: "ABOUT",
        title: "현실에서 작동하는 인간을 위한 AI를 만듭니다.",
        desc:
          "사람의 움직임과 행동을 정량화해, 의료·재활·퍼포먼스 영역에서 “검토 가능한 출력물”로 제공합니다.",
      },
      mission: {
        title: "AI의 목적은,\n인간의 삶을 더 안전하고 더 나아지게 만드는 것.",
        body:
          "우리는 ‘모델의 화려함’보다 ‘현장에서의 신뢰’를 우선합니다.\n측정 가능하고, 해석 가능하고, 책임 있게 쓰일 수 있는 AI를 만듭니다.",
        image: "/company/ACESO-Intro.jpg",
      },
      storyItems: [
        {
          year: "2017",
          title: "Foundations",
          body: " ...",
          image: "/company/2017-year-01.jpg",
        },
      ],
    }
  );
}

async function getStoryItemsFromDb() {
  const rows = await prisma.storyItem.findMany({
    where: { isPublished: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const result = rows.map((r) => ({
    year: r.year,
    title: r.title,
    // ✅ 줄바꿈/앞 공백 정리 (…만 보이는 문제 방지)
    body: (r.body ?? "").replace(/\r\n/g, "\n").trimStart(),
    image: r.imageUrl ?? undefined,
    video: r.videoUrl ?? undefined,
  }));

  return result;
}

function Hr() {
  return <div className="border-t border-[hsl(var(--border))]" />;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
      {children}
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full px-5 md:px-9">{children}</div>;
}

function FauxImage({ tall }: { tall?: boolean }) {
  return (
    <div
      className={[
        "rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7",
        "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.06),transparent_60%)]",
        "bg-[hsl(var(--background))]/30",
        tall ? "h-64 md:h-80" : "h-56 md:h-72",
      ].join(" ")}
    />
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/35 px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
      {children}
    </span>
  );
}

export default async function CompanyPage() {
  const content = await getCompanyContent();
  const storyItems = await getStoryItemsFromDb();
  return (
    <main className="w-full">
      <section className="relative min-h-[65vh] pt-40 pb-32 text-foreground">
        <PageBackdrop />
        <div className="w-full px-5 md:px-9 mt-12 md:mt-16">
          <div className="relative z-10 text-center">
            <div className="font-mono text-[11px] tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
              <Eyebrow>ABOUT</Eyebrow>
              <br />
            </div>

            <h1 className="mt-4 text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-tight leading-[1.02]">
              현실에서 작동하는 인간을 위한 AI를 만듭니다.
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-[88ch] mx-auto text-center">
              사람의 움직임과 행동을 정량화해, 의료·재활·퍼포먼스 영역에서 
              “검토 가능한 출력물”로 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* OUR MISSION (Cohere처럼: 제목 + 굵은 짧은 신념 + 장식 이미지 2장) */}
      <section className="py-20 md:py-24 scroll-mt-16">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:items-start">
            <div className="md:col-span-7 max-w-2xl">
              <Eyebrow>OUR MISSION</Eyebrow>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight leading-[1.15]">
                AI의 목적은,
                <br />
                인간의 삶을 더 안전하고 더 나아지게 만드는 것.
              </h2>

              <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                우리는 ‘모델의 화려함’보다 ‘현장에서의 신뢰’를 우선합니다.
                <br />
                측정 가능하고, 해석 가능하고, 책임 있게 쓰일 수 있는 AI를 만듭니다.
              </p>

              <div className="mt-8 flex gap-5">
                <a
                  href="/clinical-evidence"
                  className="text-sm underline underline-offset-4 hover:opacity-90"
                >
                  임상 신뢰 보기
                </a>
                <a
                  href="/aceso"
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]/90 transition"
                >
                  ACESO (의료 적용 사례) →
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
                {/* ✅ 사진 */}
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/company/ACESO-Intro.jpg"
                    alt="사람을 향하는 AI"
                    fill
                    className="object-cover brightness-[0.92] contrast-[1.05]"
                    priority={false}
                  />
                </div>

                {/* ✅ 다크 톤에 맞게 살짝 눌러주기(과하지 않게) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      
      
      {/* OUR STORY (DB) */}
      <section className="py-20 md:py-24 relative">
        <div className="sticky top-24 z-40 w-full px-5 md:px-9 bg-gradient-to-b from-[hsl(var(--background))] to-transparent pb-6">
          <Eyebrow>OUR STORY</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            작게 시작해,
            <br />
            현장에서 쓰이는 AI로.
          </h2>
        </div>

        <div className="w-full px-5 md:px-9 mt-28 md:mt-50">
          {storyItems.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 text-sm text-[hsl(var(--muted-foreground))]">
              아직 공개된 히스토리 카드가 없습니다. (Admin → Story 수정에서 Published 체크)
            </div>
          ) : (
            <StoryStack items={storyItems} />
          )}
        </div>
      </section>

      {/* QUOTES */}
      <section className="text-white py-32 md:py-40">
        <div className="mx-auto w-full max-w-[90rem] px-2 md:px-6">
          {/* Quote 1: author left, quote right */}
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="order-2 md:order-1 md:col-span-4 space-y-1 text-sm text-white/80">
              <div className="font-semibold text-white">Andrew Ng</div>
              <div className="text-xs text-white/60">Stanford University Professor, Coursera Founder</div>
            </div>
            <div className="order-1 md:order-2 md:col-span-8">
              <p className="text-2xl md:text-4xl leading-tight md:leading-[1.25] font-semibold">
                “AI는 새로운 전기(Electricity)입니다. 100년 전 전기가 모든 산업을 바꿨듯이, AI와 시각 지능은 의료 영상 분석에서 인간이 볼 수 없는 패턴을 찾아내며 진단의 표준을 바꿀 것입니다.”
              </p>
            </div>
          </div>

          {/* Quote 2: quote left, author right */}
          <div className="mt-28 md:mt-32 grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-2xl md:text-4xl leading-tight md:leading-[1.25] font-semibold">
                “미래의 의사들은 환자에게 알약이나 주사기 대신, 소프트웨어 앱을 처방하게 될 것입니다. 이것은 단순한 '웰니스'가 아니라, 임상적으로 검증된 '치료'의 영역입니다.”
              </p>
            </div>
            <div className="md:col-span-4 text-sm text-white/80 md:text-right space-y-1">
              <div className="font-semibold text-white">Eddie Martucci</div>
              <div className="text-xs text-white/60">Akili Interactive CEO</div>
            </div>
          </div>
        </div>
      </section>

      <Hr />

      {/* TEAM (Cohere처럼: Founders 카드) */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>MEET OUR TEAM</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Founders</h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3 w-fit">
            {[
              { 
                name: "Gwangyeul Yun", 
                role: "Co-founder and CEO",
                image: "/company/YunGY.jpg"
              },
              { 
                name: "Haeyoon Park", 
                role: "Co-founder and CEO",
                image: "/company/ParkHY.jpg"
              },
              { 
                name: "Sanki Lee", 
                role: "Co-founder and CTO",
                image: "/company/LeeSK.png"
              },
            ].map((p) => (
              <div
                key={p.name}
                className="flex flex-col"
              >
                <div className="relative w-44 h-60 overflow-hidden rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain transition-transform duration-200 ease-in-out hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <div className="mt-4">
                  <div className="text-base font-semibold">{p.name}</div>
                  <div className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                    {p.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      

      {/* EXECUTIVE TEAM (리스트형 좌/우 정렬) */}
      <section className="py-12">
        <Container>
          <Eyebrow>EXECUTIVE TEAM</Eyebrow>
          <h3 className="mt-4 text-xl font-semibold tracking-tight">Executive team</h3>

          <ul className="mt-6 border-y border-[hsl(var(--border))] divide-y divide-[hsl(var(--border))]">
            {[
              { name: "Youguk Kwon", title: "Clinical Operations Lead" },
              { name: "Wooil Jang", title: "Head of Research & Models" },
              { name: "Myeonghyeon Kim", title: "Head of Research & Platform" },
              { name: "Juhan Kim", title: "Medical Data Advisor, Seoul National University Hospital(SNUH)" },
              { name: "Aram Kim", title: "Rehabilitation Medicine Advisor, Myongji Hospital" },
              { name: "Jonggeol Do", title: "Rehabilitation Medicine Advisor, Samsung Medical Center(SMC)" },
            ].map((x) => (
              <li key={x.name} className="flex items-center justify-between py-4">
                <span className="text-sm font-medium">{x.name}</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{x.title}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* LOCATIONS */}
      <section className="py-20 md:py-24">
        <Container>
          <Eyebrow>WHERE WE WORK</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            한국에서 시작해,
            <br />
            전 세계로 확장합니다.
          </h2>
        </Container>

        {/* --- Horizontally scrollable container --- */}
        <div className="mt-10 pl-5 md:pl-9">
          <div className="flex space-x-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              {
                city: "대구",
                image: "/company/daegu.jpg",
                desc: "HQ",
              },
              {
                city: "서울",
                image: "/company/seoul.png",
                desc: "R&D Center",
              },
              {
                city: "태국",
                image: "/company/thailand.jpg",
                desc: "Global Partner",
              },
              {
                city: "샌프란시스코",
                image: "/company/sanfrancisco.jpg",
                desc: "Global Partner",
              },
            ].map((loc) => (
              <div
                key={loc.city}
                className="relative h-96 w-72 flex-shrink-0 overflow-hidden rounded-2xl group"
              >
                <Image
                  src={loc.image}
                  alt={loc.city}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-2xl font-semibold text-white">{loc.city}</h3>
                  <p className="mt-1 text-sm text-white/80">{loc.desc}</p>
                </div>
              </div>
            ))}
            {/* Add a spacer at the end */}
            <div className="w-1 flex-shrink-0 md:w-3" />
          </div>
        </div>
      </section>

      {/* CTA (Cohere처럼: 큰 CTA + 조용한 버튼/링크) */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-7">
            <h2 className="text-3xl font-semibold tracking-tight">
              함께 현실에서 쓰이는 AI를 만들어요.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] max-w-2xl">
              연구/임상 협력, 파일럿, 파트너십, 투자.
              필요 자료는 요청 시 공유합니다.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="/contact"
                className="inline-flex items-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]
                           px-5 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                문의하기
              </a>
              <a
                href="/clinical-evidence"
                className="text-sm underline underline-offset-4 hover:opacity-90"
              >
                임상 신뢰 →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

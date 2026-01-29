"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

type Item = {
  year: string;
  title: string;
  body: string;
  image?: string;
  video?: string;
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export default function StoryStack({ items }: { items: Item[] }) {
  const HEADER_H = 64;              // Header.tsx h-16
  const TITLE_H = 80;               // OUR STORY 제목 영역 높이
  const PIN_TOP = 240;              // 헤더 + 제목에 대한 단차 (여백 확대)
  const STEP_VH = 85;               // 카드 한 장당 스크롤 길이(조절 포인트)
  const SECTION_H = Math.max(1, items.length) * STEP_VH;

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Cohere 느낌: 앞 카드일수록 더 크게 펼쳐지고, 뒤로 갈수록 살짝 덜 펼쳐짐
  const expandHeights = useMemo(() => {
    return items.map((_, i) => Math.max(220, 320 - i * 20));
  }, [items]);

  // 비디오 자동재생 시도
  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.play().catch(() => {
        // 자동재생 차단된 경우 무시
      });
    });
  }, [items]);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = sectionRef.current;
        if (!sec) return;

        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;

        // 섹션 전체 진행률 t (0~1)
        // - 섹션 top이 PIN_TOP에 닿을 때부터 진행 시작
        // - 섹션이 끝나서 pin이 풀릴 때 진행 1
        const total = (SECTION_H / 100) * vh; // section 높이(px)
        const pinWindow = total - (vh - PIN_TOP);
        const t = clamp01((PIN_TOP - r.top) / Math.max(1, pinWindow));

        // 카드별 progress:
        // t * N 을 기준으로 (i번째 카드) 0~1 구간을 차지하도록
        const N = items.length;
        const progressValues = items.map((_, i) => clamp01(t * N - i));
        // 1. onScroll 내부의 slot 로직 수정
        cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const p = progressValues[i];
            el.style.setProperty("--p", p.toFixed(4));
            
            const slot = el.closest("[data-slot]") as HTMLElement | null;
            if (slot) {
                // 💡 핵심: offset을 150 -> 40으로 줄여서 "미리 살짝 겹쳐 대기"하게 합니다.
                // p가 0일 때(자기 순서 전) 40px 아래에 대기하다가, p가 시작되면 0으로 안착.
                const offset = (1 - p) * 40; 
                slot.style.transform = `translateY(${offset}px)`;
                
                // 💡 투명도는 조금 더 빨리 나타나게 (p가 0.2만 되어도 거의 보이게) 조절
                slot.style.opacity = `${clamp01(p * 5)}`;
            }
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length, SECTION_H, PIN_TOP]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible z-20"
      style={{ height: `${SECTION_H}vh` }}
    >
      {/* ✅ pin: 히스토리 구간에서는 이 wrapper가 계속 고정 */}
      <div
        className="sticky overflow-visible z-30"
        style={{
          top: PIN_TOP,
          // 화면 전체 높이에서 PIN_TOP과 하단 여백(예: 40px)을 제외한 높이
          height: `calc(100vh - ${PIN_TOP}px - 40px)`,
        }}
      >
        {/* z-index 싸움 방지 */}
        <div className="relative h-full overflow-visible isolate">
            {/* // 2. JSX 내부의 baseTop 및 스타일 수정 */}
            {items.map((x, i) => {
            // 💡 계단식 간격: 60~70px (연도와 타이틀 일부가 보임)
            const baseTop = i * 70; 

            return (
                <div
                key={`${x.year}-${i}`}
                data-slot
                className="absolute left-0 right-0 will-change-transform"
                style={{ 
                    top: baseTop,
                    zIndex: i,
                    // 💡 트랜지션을 transform에만 주고, 시간을 0.4s로 줄여 반응성을 높입니다.
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out'
                }}
                >
                <div
                    ref={(node) => { cardRefs.current[i] = node; }}
                    className={[
                        "relative rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
                        "shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.8)]",
                        "overflow-hidden flex flex-col", // flex-col 추가
                    ].join(" ")}
                    style={{
                    // ✅ 카드 높이를 현재 화면 높이에 거의 맞춤
                        height: `calc(100vh - ${PIN_TOP}px - 100px)`,
                        maxHeight: '800px' // 너무 길어지는 것 방지 (선택 사항)
                    }}
                >
                  {/* 헤더(항상 보임) */}
                  <div className="relative h-[76px] px-7 py-5">
                    <div className="text-[10px] font-mono tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                      {x.year}
                    </div>
                    <div className="mt-2 text-lg font-semibold">{x.title}</div>
                  </div>

                  {/* 본문 영역: 이미지가 잘리지 않도록 flex-1과 overflow-y-auto 활용 */}
                  <div className="flex-1 min-h-0 px-7 pb-7 overflow-hidden">
                    <div className="grid h-full gap-6 md:grid-cols-2">
                      <div className="flex flex-col justify-start">
                        <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))] whitespace-pre-line">
                          {x.body}
                        </p>
                      </div>

                      {(x.video || x.image) && (
                        <div className="w-full">
                            <div className="relative w-full overflow-hidden rounded-2xl bg-black/20 aspect-video">
                            {x.video ? (
                                <video
                                src={x.video}
                                autoPlay
                                muted
                                loop
                                controls
                                playsInline
                                preload="metadata"
                                className="h-full w-full object-contain"
                                />
                            ) : (
                                <Image
                                src={x.image!}
                                alt={x.title}
                                fill
                                className="object-contain"
                                sizes="(min-width: 768px) 50vw, 90vw"
                                />
                            )}
                            </div>
                        </div>
                        )}
                    </div>
                  </div>

                  {/* 하단 페이드 효과 (내용이 길 때 대비) */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[hsl(var(--card))] to-transparent opacity-50" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  key: string;
  title: string;
  desc: string;
  icon: string;
  screen: {
    src: string;
    alt: string;
    callout: string;
  };
};

const items: Item[] = [
  {
    key: "gap",
    title: "공백",
    desc: "병원 방문 사이, 집에서 운동이 끊기기 쉬워요.",
    icon: "⏳",
    screen: {
      src: "/product/intro.jpg",
      alt: "Practices",
      callout: "오늘 해야 할 운동이 자동으로 정리돼요",
    },
  },
  {
    key: "uncertain",
    title: "불확실",
    desc: "자세/손 위치가 맞는지 확신하기 어려워요.",
    icon: "❓",
    screen: {
      src: "/product/practices.jpg",
      alt: "Guide",
      callout: "영상 + 단계 설명으로 실수를 줄여요",
    },
  },
  {
    key: "record",
    title: "기록",
    desc: "변화 추적이 번거롭고 꾸준히 남기기 힘들어요.",
    icon: "📝",
    screen: {
      src: "/product/diary.jpg",
      alt: "Diary",
      callout: "캘린더로 기록을 간단히 남길 수 있어요",
    },
  },
  {
    key: "adherence",
    title: "순응도",
    desc: "루틴이 무너지면 장기 재활이 흔들려요.",
    icon: "📉",
    screen: {
      src: "/product/status.jpg",
      alt: "Progress",
      callout: "진행 추이를 시각화해 꾸준함을 돕습니다",
    },
  },
];

export default function ProductProblem() {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const shownIdx = hoverIdx ?? activeIdx;
  const shown = items[shownIdx];

  // ✅ 스크롤에 따라 활성 카드 자동 변경
  useEffect(() => {
    const els = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // 화면에 가장 많이 들어온 카드 선택
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;

        const idx = els.findIndex((el) => el === visible.target);
        if (idx >= 0) setActiveIdx(idx);
      },
      {
        root: null,
        // 카드가 화면 중앙 부근에 들어오면 활성화되도록 튜닝
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left: Cards */}
        <div>
          <h2 className="text-2xl font-semibold text-white">왜 ACESO가 필요한가</h2>
          <p className="mt-2 text-white/60">
            소아 사경 재활은 “꾸준함”이 핵심이지만, 현실에서는 쉽게 끊깁니다.
          </p>

          <div className="mt-8 grid gap-3">
            {items.map((p, idx) => {
              const isActive = idx === shownIdx;
              return (
                <div
                  key={p.key}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  className={[
                    "rounded-2xl border p-5 transition",
                    isActive
                      ? "border-white/25 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/18 hover:bg-white/8",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-lg">
                      {p.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">{p.title}</div>
                      <div className="mt-1 text-sm text-white/60">{p.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sticky Phone (scroll-linked) */}
        <div className="md:pt-6">
          <div className="sticky top-24 max-h-[70vh] flex items-center justify-center">
            <div
              className={[
                "rounded-[2rem] border bg-black/40 p-4 transition",
                // ✅ 활성 강조(글로우)
                "border-white/10",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
                "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.10)]",
              ].join(" ")}
            >
              <PhoneFrame
                src={shown.screen.src}
                alt={shown.screen.alt}
                callout={shown.screen.callout}
                highlight={true}
              />

              <div className="mt-4 text-sm font-semibold text-white/85">{shown.title}</div>
              <div className="mt-1 text-sm text-white/60">{shown.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({
  src,
  alt,
  callout,
  highlight,
}: {
  src: string;
  alt: string;
  callout: string;
  highlight?: boolean;
}) {
  return (
    <div className="relative rounded-[1.8rem] bg-zinc-900/60 p-3">
      {/* ✅ 글로우 레이어 */}
      <div
        className={[
          "pointer-events-none absolute -inset-2 rounded-[2.1rem] opacity-0 transition",
          highlight ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          boxShadow: "0 0 50px rgba(168, 85, 247, 0.18), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      />

      <div className="relative overflow-hidden rounded-[1.4rem] bg-black">
        {/* 노치 */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-2 w-16 -translate-x-1/2 rounded-full bg-white/10" />

        {/* ✅ 콜아웃 오버레이 */}
        <div className="absolute left-3 top-3 z-20 max-w-[85%] rounded-xl border border-white/10 bg-black/55 px-3 py-2 text-xs text-white/85 backdrop-blur">
          {callout}
        </div>

        {/* ✅ 화면 크기 과하지 않게 max-h 제한 */}
        <Image
          src={src}
          alt={alt}
          width={390}
          height={844}
          className="h-auto max-h-[56vh] w-full object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type ScreenTag = "Core" | "Guide" | "Tracking" | "Account";

type ScreenItem = {
  src: string;
  title: string;
  tag: ScreenTag;
  caption: {
    headline: string;
    bullets: [string, string, string];
  };
  // 이 화면은 “영상 데모”로 연결할지
  demo?: { label: string; href: string };
};

const screens: ScreenItem[] = [
  {
    src: "/product/practices.jpg",
    title: "Practices",
    tag: "Core",
    caption: {
      headline: "핸드폰 카메라만으로 간단하게",
      bullets: [
        "안내멘트, 영상, AI 자세인식으로 정확한 가이드",
        "진행 상태와 다음 운동을 직관적으로 안내",
        "올바른 운동으로 재활 효과 극대화",
      ],
    },
  },
  {
    src: "/product/execise_list.jpg",
    title: "Daily Exercise List",
    tag: "Core",
    caption: {
      headline: "단계별 수행 흐름이 명확",
      bullets: [
        "운동별 진행/잠금 조건을 명확히 표시",
        "순서대로 따라하면 자연스럽게 완료",
        "보호자 부담을 줄이는 UX",
      ],
    },
  },
  {
    src: "/product/execise_guide.jpg",
    title: "Guide",
    tag: "Guide",
    caption: {
      headline: "영상 + 텍스트 가이드로 실수 최소화",
      bullets: [
        "자세/손 위치를 영상으로 바로 확인",
        "단계별 설명으로 안전하게 수행",
        "클릭 한 번으로 데모 영상 보기",
      ],
    },
    demo: { label: "데모 보기", href: "#demo" }, // ✅ 여기 Play 뱃지/링크 연결
  },
  {
    src: "/product/diary.jpg",
    title: "Diary",
    tag: "Tracking",
    caption: {
      headline: "기록을 남겨 변화 추적",
      bullets: [
        "달력 기반으로 수행 기록 확인",
        "일별 메모/상태를 간단히 정리",
        "꾸준함을 만드는 습관화 동선",
      ],
    },
  },
  {
    src: "/product/status.jpg",
    title: "Progress",
    tag: "Tracking",
    caption: {
      headline: "각도/수행 데이터를 시각화",
      bullets: [
        "진행 추이를 그래프로 직관적으로",
        "누적 수행량을 빠르게 파악",
        "치료 흐름 공유에 유리",
      ],
    },
  },
  {
    src: "/product/setting.jpg",
    title: "Setting",
    tag: "Account",
    caption: {
      headline: "계정/알림/설정 관리",
      bullets: [
        "공지/문의/알림 설정을 한 곳에서",
        "아동 추가 및 계정 전환 지원",
        "사용 환경을 손쉽게 조정",
      ],
    },
  },
];

const tabs: Array<ScreenTag | "All"> = ["All", "Core", "Guide", "Tracking", "Account"];

export default function ProductScreens() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (active === "All") return screens;
    return screens.filter((s) => s.tag === active);
  }, [active]);

  return (
    <section id="screens" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">실제 화면</h2>
          <p className="mt-2 max-w-2xl text-white/60">
            모바일에서는 좌우로 넘기고, 클릭하면 크게 볼 수 있어요.
          </p>
        </div>

        {/* 탭 필터 */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const isActive = active === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  isActive
                    ? "border-white/20 bg-white text-zinc-950"
                    : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {/* ✅ Mobile carousel */}
        <div className="md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
            {filtered.map((s, idx) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setOpenIdx(idx)}
                className="snap-start shrink-0 w-[78%] rounded-2xl border border-white/10 bg-black/40 p-3 text-left"
              >
                <PhoneFrame src={s.src} title={s.title} demo={s.demo} />

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">{s.title}</div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
                    {s.tag}
                  </span>
                </div>

                <CaptionBlock item={s} />
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/50">← 좌우로 넘겨보세요</p>
        </div>

        {/* ✅ Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {filtered.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setOpenIdx(idx)}
              className="group rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-white/20"
            >
              <div className="transition group-hover:scale-[1.01]">
                <PhoneFrame src={s.src} title={s.title} demo={s.demo} />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">{s.title}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
                  {s.tag}
                </span>
              </div>

              <CaptionBlock item={s} />
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox(확대) + 키보드 지원 */}
      {openIdx !== null && (
        <Lightbox
          items={filtered}
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          onPrev={() => setOpenIdx((v) => (v! - 1 + filtered.length) % filtered.length)}
          onNext={() => setOpenIdx((v) => (v! + 1) % filtered.length)}
        />
      )}
    </section>
  );
}

/** 폰 프레임 + 잘림 없는 contain + (옵션) Play 뱃지 */
function PhoneFrame({
  src,
  title,
  demo,
}: {
  src: string;
  title: string;
  demo?: { label: string; href: string };
}) {
  return (
    <div className="relative rounded-[1.8rem] bg-zinc-900/60 p-3">
      <div className="relative overflow-hidden rounded-[1.4rem] bg-black">
        {/* 노치 느낌 */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-2 w-16 -translate-x-1/2 rounded-full bg-white/10" />

        <Image
          src={src}
          alt={title}
          width={390}
          height={844}
          className="h-auto w-full object-contain"
          priority={false}
        />

        {/* ✅ Play 배지: 화면 클릭은 라이트박스인데, 배지는 데모로 이동 */}
        {demo && (
          <a
            href={demo.href}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur hover:bg-black/65"
            aria-label={demo.label}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/90 text-[10px] font-black text-black">
              ▶
            </span>
            {demo.label}
          </a>
        )}
      </div>
    </div>
  );
}

/** ✅ 화면별 “3줄 요약 캡션” */
function CaptionBlock({ item }: { item: ScreenItem }) {
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs font-semibold text-white/85">{item.caption.headline}</div>
      <ul className="mt-2 space-y-1 text-xs text-white/60">
        {item.caption.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/35" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: ScreenItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const cur = items[index];

  // ✅ 키보드 지원: Esc 닫기, ←/→ 이동
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto grid h-full max-w-5xl place-items-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-full rounded-2xl border border-white/10 bg-black/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white/90">
                {cur.title} <span className="ml-2 text-xs text-white/50">({cur.tag})</span>
              </div>
              <div className="mt-1 text-xs text-white/50">Esc 닫기 · ←/→ 이동</div>
            </div>

            <div className="flex items-center gap-2">
              {cur.demo && (
                <a
                  href={cur.demo.href}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
                >
                  ▶ {cur.demo.label}
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
              >
                닫기
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-black">
            <Image
              src={cur.src}
              alt={cur.title}
              width={900}
              height={1800}
              className="mx-auto h-[72vh] w-auto object-contain"
              priority={false}
            />

            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 hover:bg-black/55"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80 hover:bg-black/55"
              aria-label="Next"
            >
              →
            </button>
          </div>

          <div className="mt-4">
            <div className="text-xs font-semibold text-white/85">{cur.caption.headline}</div>
            <ul className="mt-2 space-y-1 text-xs text-white/60">
              {cur.caption.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-white/35" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

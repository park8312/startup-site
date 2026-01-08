"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/motion/FadeIn";

type Step = {
  k: string;
  title: string;
  desc: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    k: "capture",
    title: "움직임 데이터 수집",
    desc: "스마트폰/태블릿 기반 센서·영상으로 아이의 경추 움직임을 정량화합니다.",
    bullets: ["자세·가동범위 지표화", "세션/일자별 추적", "개인별 기준선 설정"],
  },
  {
    k: "analyze",
    title: "AI 분석 · 개인화 처방",
    desc: "패턴을 학습하고 변화량을 계산해, 아이별 맞춤 루틴을 구성합니다.",
    bullets: ["비대칭/편향 변화 감지", "난이도 자동 조정", "콘텐츠/루틴 추천"],
  },
  {
    k: "feedback",
    title: "치료 피드백 · 순응도 개선",
    desc: "진행 상황을 데이터로 제공해 치료를 이어가도록 돕습니다.",
    bullets: ["순응도/완료율 제공", "보호자/임상진 리포트", "반복 루프 최적화"],
  },
];

export default function TherapyLoopSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // 섹션이 화면에 들어왔을 때 0~1로 정규화
      const progress = clamp01((vh * 0.75 - rect.top) / (rect.height * 0.75));
      const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(progress * STEPS.length)));
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative bg-background">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-160px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-[-180px] top-[140px] h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <FadeIn delay={0.02}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI Motion → Therapy Loop
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            기술을 “설명”하기보다, <span className="text-white/80">“이해”되게</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/70">
            데이터 수집 → AI 분석 → 치료 피드백이 하나의 루프로 연결됩니다.
            스크롤하면 단계별 핵심이 강조됩니다.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* LEFT: timeline */}
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10" />

            <div className="space-y-6">
              {STEPS.map((s, i) => (
                <StepCard key={s.k} step={s} index={i} active={active} />
              ))}
            </div>

            {/* loop arrow */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70 backdrop-blur">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                  Loop
                </span>
                <span className="text-white/80">
                  피드백은 다음 세션의 개인화에 반영됩니다.
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                즉, “한 번의 치료”가 아니라 “지속적으로 학습되는 치료 경험”을 설계합니다.
              </p>
            </div>
          </div>

          {/* RIGHT: sticky preview */}
          <div className="lg:sticky lg:top-24">
            <PreviewCard active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index, active }: { step: Step; index: number; active: number }) {
  const isActive = index === active;
  const isPast = index < active;

  return (
    <div
      className={[
        "relative pl-12",
        "transition-opacity duration-300",
        isPast ? "opacity-60" : "opacity-100",
      ].join(" ")}
    >
      {/* dot */}
      <div
        className={[
          "absolute left-2 top-5 h-5 w-5 rounded-full border",
          "transition-all duration-300",
          isActive
            ? "border-emerald-400/60 bg-emerald-400/20 shadow-[0_0_0_6px_rgba(16,185,129,0.10)]"
            : "border-white/15 bg-white/5",
        ].join(" ")}
      />

      <div
        className={[
          "rounded-2xl border p-5 backdrop-blur",
          "transition-all duration-300",
          isActive
            ? "border-white/15 bg-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
            : "border-white/10 bg-white/5",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white">
            <span className="mr-2 text-white/50">{index + 1}.</span>
            {step.title}
          </div>
          {isActive ? (
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">
              ACTIVE
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-white/65">{step.desc}</p>

        <ul className="mt-4 grid gap-2 text-sm text-white/60">
          {step.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-white/25" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PreviewCard({ active }: { active: number }) {
  const a = STEPS[active];

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/12 to-white/6 p-6 text-white/80 backdrop-blur shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-white/70">Loop Preview</p>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
          step {active + 1}/3
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-white">{a.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{a.desc}</p>

      <div className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] text-white/50">Key signal</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {active === 0 && "가동범위 변화 추적"}
            {active === 1 && "비대칭 패턴 분석"}
            {active === 2 && "순응도 기반 루틴 조정"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] text-white/50">Output</p>
          <p className="mt-1 text-sm font-semibold text-white">
            {active === 0 && "정량 지표 + 기준선"}
            {active === 1 && "개인화 처방 루틴"}
            {active === 2 && "리포트 + 다음 목표"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] text-white/50">Confidence</p>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-emerald-400/50"
              style={{ width: `${active === 0 ? 55 : active === 1 ? 72 : 88}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-white/55">
            {active === 0 && "초기 세션에서 기준선을 형성합니다."}
            {active === 1 && "패턴이 안정화되며 추천 정확도가 높아집니다."}
            {active === 2 && "피드백 루프로 지속 최적화됩니다."}
          </p>
        </div>
      </div>
    </div>
  );
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

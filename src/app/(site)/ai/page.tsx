"use client";

// src/app/(site)/ai/page.tsx

import { useState } from "react";
import FadeIn from "@/components/motion/FadeIn";
import Image from "next/image";

const capabilities = [
  {
    t: "Motion AI",
    d: "영상 기반 움직임 추적·정량화로 치료 경과를 설명 가능한 형태로 제공합니다.",
    meta: "Tracking · Metrics",
  },
  {
    t: "Therapy Analytics",
    d: "세션·순응도·개선 추이를 구조화해 치료사의 판단과 환자/보호자 이해를 돕습니다.",
    meta: "Progress · Insights",
  },
  {
    t: "Personalization Loop",
    d: "측정 → 피드백 → 난이도 조절이 반복되며, 치료 흐름에 맞춘 루틴을 설계합니다.",
    meta: "Plan · Adjust",
  },
  {
    t: "Data Governance",
    d: "의료 데이터 기준으로 최소 수집·접근 통제·로그/감사 체계를 우선 설계합니다.",
    meta: "Privacy · Control",
  },
];

const pipeline = [
  { key: "capture", t: "Capture", d: "세션 중 움직임/사용 데이터를 수집(최소화 원칙)" },
  { key: "normalize", t: "Normalize", d: "노이즈 제거·정규화로 비교 가능한 지표 생성" },
  { key: "score", t: "Score", d: "치료 목표에 맞는 핵심 지표로 상태/변화 정량화" },
  { key: "feedback", t: "Feedback", d: "이해 가능한 피드백으로 치료 지속/순응도 지원" },
  { key: "adjust", t: "Adjust", d: "난이도·루틴을 조절해 다음 세션에 반영" },
] as const;

type Step = "all" | (typeof pipeline)[number]["key"];


const principles = [
  {
    t: "설명 가능한 지표",
    d: "의료진과 보호자가 이해할 수 있는 형태로만 지표를 제공합니다.",
  },
  {
    t: "사람 중심 의사결정",
    d: "AI는 판단을 보조하며, 임상적 결정은 사람이 통제할 수 있게 설계합니다.",
  },
  {
    t: "단계별 표현/기능",
    d: "임상·인허가 진행 상황에 맞춰 기능/표현을 제한하고 정확히 표기합니다.",
  },
];

export default function AiPage() {
  const [activeStep, setActiveStep] = useState<Step>("all");
  return (
    <div className="relative isolate bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative min-h-[65vh] pt-40 pb-32">
        <div className="relative z-10 mx-auto w-full px-5 md:px-9 mt-12 md:mt-16">
          {/* Hero */}
          <FadeIn>
            <div className="flex flex-col gap-3 text-center">
              <p className="font-mono text-[11px] tracking-[0.18em] text-white/60">AI Core</p>
            <h1 className="mt-4 text-balance text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-tight leading-[1.02] text-white">
              치료 흐름을 이해하는 AI 엔진
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-[88ch] mx-auto text-center">
              NextDoor Inc.의 기술은 모델 성능 자체보다, 임상 맥락에서 "어떤 결정을 돕는가"를 중심으로 설계됩니다. 측정 가능한 지표와 피드백 루프를 통해 치료 경험을 더 정확하고 지속 가능하게 만듭니다.
            </p>
          </div>
        </FadeIn>
        </div>
        </section>

      <div className="relative z-10 mx-auto w-full">
        {/* Capabilities */}
        <section className="py-20 md:py-24 px-5 md:px-9">
          <FadeIn>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight leading-[1.4] text-white sm:text-4xl">
                Core Capabilities
              </h2>
              <p className="mt-12 w-full text-pretty text-base leading-[2] text-white/70 sm:text-lg">
                움직임 정량화, 치료 분석, 개인화 루프, 데이터 거버넌스—의료 도메인에서 "설명 가능한 근거"를 만들기 위한 핵심 기술 구성입니다.
              </p>
            </div>
          </FadeIn>

          <div className="mx-auto w-full px-5 md:px-9 mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, idx) => (
              <FadeIn key={c.t} delay={0.04 * idx}>
                <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur transition hover:bg-white/7 hover:shadow-md">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70">
                    {c.meta}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{c.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{c.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="py-20 md:py-24 px-5 md:px-9">
          <FadeIn>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight leading-[1.4] text-white sm:text-4xl">
                Architecture Overview
              </h2>
              <p className="mt-12 w-full text-pretty text-base leading-[2] text-white/70 sm:text-lg">
                입력된 움직임/사용 데이터는 정규화·지표화 과정을 거쳐, 치료 난이도 조절과 피드백 생성에 사용됩니다. "측정 → 설명 → 조절"이 반복되는 구조가 핵심입니다.
              </p>
            </div>
          </FadeIn>

          <div className="mt-20 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-5">
            {pipeline.map((p, idx) => (
              <FadeIn key={p.key} delay={0.03 * idx}>
                <div
                  onMouseEnter={() => setActiveStep(p.key)}
                  onMouseLeave={() => setActiveStep("all")}
                  className="cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/10"
                >
                  <div className="text-xs font-medium text-white/60">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">{p.t}</div>
                  <div className="mt-2 text-xs leading-relaxed text-white/60">{p.d}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.18}>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="mb-4 text-sm font-medium text-white/70">
                MindTrip™ AI Architecture
              </div>

              <div className="overflow-hidden rounded-2xl bg-black/40 transition-all duration-300">
                {activeStep === "all" && (
                  <Image
                    src="/architecture/mindtrip-architecture_v2.png"
                    alt="MindTrip AI Architecture Diagram"
                    width={1600}
                    height={900}
                    className="w-full max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain mx-auto"
                    priority
                  />
                )}

                {activeStep === "capture" && (
                  <Image
                    src="/architecture/capture-3d.png"
                    alt="Capture Stage"
                    width={1600}
                    height={900}
                    className="w-full max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain mx-auto"
                  />
                )}

                {activeStep === "normalize" && (
                  <Image
                    src="/architecture/Normalize.png"
                    alt="Normalize Stage"
                    width={1600}
                    height={900}
                    className="w-full max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain mx-auto"
                  />
                )}

                {activeStep === "score" && (
                  <Image
                    src="/architecture/score.png"
                    alt="Score Stage"
                    width={1600}
                    height={900}
                    className="w-full max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain mx-auto"
                  />
                )}

                {activeStep === "feedback" && (
                  <Image
                    src="/architecture/feedback_2.png"
                    alt="Feedback Stage"
                    width={1600}
                    height={900}
                    className="w-full max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain mx-auto"
                  />
                )}

                {activeStep === "adjust" && (
                  <Image
                    src="/architecture/adjust.png"
                    alt="Adjust Stage"
                    width={1600}
                    height={900}
                    className="w-full max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] object-contain mx-auto"
                  />
                )}
              </div>

              <p className="mt-4 text-xs text-white/50">
                {activeStep === "capture" &&
                  "특수 카메라가 아닌, 범용적인 스마트폰, 태블릿 등으로 부터 수집된 신체 움직임을 3D 구조로 추정하고 관절 데이터를 생성합니다."}
                {activeStep === "all" &&
                  "본 아키텍처는 다중 입력을 통합 분석하여 치료 맥락에 맞는 피드백을 생성합니다."}
                {activeStep === "normalize" &&
                  "입력된 2D이미지는 노이즈를 제거하고, 정규화되어 3D로 재구성되며 의료진에게 새로운 Inside를 제공합니다."}
                {activeStep === "score" &&
                  "분석된 3D 이미지로부터 분석된 Inside는 치료 목표에 맞는 핵심 지표로 정량화되어 제공됩니다."}
                {activeStep === "feedback" &&
                  "의료진은 정량화되고 객관화된 결과를 제공함으로써 고객에게 치료효과를 정확히 설명할 수 있습니다."}
                {activeStep === "adjust" &&
                  "의료진은 정량화되고 객관화된 결과를 통해 재활운동 난이도, 루틴을 조절할 수 있으며, 다음 세션에 맞춤화된 재활운동을 처방할 수 있습니다."}                
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Clinical principles */}
        <section className="py-20 md:py-24 px-5 md:px-9">
          <FadeIn>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight leading-[1.4] text-white sm:text-4xl">
                임상 맥락에서의 AI
              </h2>
              <p className="mt-12 w-full text-pretty text-base leading-[2] text-white/70 sm:text-lg">
                NextDoor Inc.의 AI는 진단을 대체하지 않으며, 치료사의 판단과 보호자의 이해를 돕는 보조 수단으로 설계됩니다. 의료 환경에서 필요한 원칙을 먼저 지킵니다.
              </p>
            </div>
          </FadeIn>

          <div className="mx-auto w-full px-5 md:px-9 mt-20 grid gap-4 sm:grid-cols-3">
            {principles.map((it, idx) => (
              <FadeIn key={it.t} delay={0.04 * idx}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <h3 className="text-xl font-semibold text-white">{it.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{it.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Evidence pack / links placeholder */}
          <div className="mx-auto w-full px-5 md:px-9 mt-8">
            <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="text-xl font-semibold text-white">Evidence Pack</h3>
              <p className="mt-3 w-full text-pretty text-base leading-[2] text-white/70">
                임상/보안/지표 정의 문서는 준비 단계에 맞춰 순차적으로 공개됩니다.
                (병원·연구기관 협업 및 인허가 진행 상황에 따라 업데이트)
              </p>

              <div className="mt-8 grid gap-2 sm:grid-cols-3">
                {[
                  { t: "Protocol (준비중)", d: "치료 흐름/측정 설계 문서" },
                  { t: "Outcome Metrics (준비중)", d: "설명 가능한 지표 정의" },
                  { t: "Data Governance (준비중)", d: "접근 통제/로그/감사 정책" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="text-sm font-semibold text-white">{x.t}</div>
                    <div className="mt-1 text-xs text-white/60">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-64 md:pt-72 pb-10 md:pb-12 px-5 md:px-9">
          <FadeIn>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="text-4xl font-semibold tracking-tight leading-[1.4] text-white sm:text-6xl">
                기술은 치료 경험을 바꾸기 위한 수단입니다
              </h3>
              <p className="mt-12 w-full text-pretty text-base leading-[2] text-white/70 sm:text-lg">
                NextDoor Inc.는 임상 근거 위에서만 확장되는 AI를 만듭니다. 데모/협업이 필요하면 문의로 연락 주세요.
              </p>
              <div className="mt-16 flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  문의하기
                </a>
                <a
                  href="/product"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  제품 보기
                </a>
              </div>
              <p className="mt-6 text-xs text-white/50">
                ※ 의료 관련 표현/효과는 임상 및 인허가 진행 상황에 맞춰 정확히 표기합니다.
              </p>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}

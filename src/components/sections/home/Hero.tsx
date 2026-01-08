"use client";

import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import { motion } from "framer-motion";


export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-background" />
        {/* glow blobs */}
        <motion.div
          className="absolute -left-32 top-[-120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-2xl"
          animate={{ x: [0, 18, 0], y: [0, 10, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-[-220px] top-[40px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.28),transparent_60%)] blur-2xl"
          animate={{ x: [0, -22, 0], y: [0, 14, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-[220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] blur-3xl"
          animate={{ x: [0, 14, 0], y: [0, -10, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:grid-cols-2 lg:items-center">
        <div>
          <FadeIn delay={0.08}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              임상 기반 소아 재활 · 디지털 치료기기(DTx)
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              아이의 움직임을 이해하는 AI,
              <span className="text-white/80"> 치료 경험을 더 정확하게</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              NEXTDOOR.AI는 소아사경 디지털 치료기기를 중심으로, 움직임 데이터를 정밀하게 분석하고
              개인화된 재활 루틴을 설계합니다. 병원·연구기관과 함께 임상 근거를 쌓아갑니다.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary CTA */}
              <a
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                데모·협업 문의
              </a>

              {/* Secondary CTA */}
              <a
                href="/product"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                제품 알아보기
              </a>

              <p className="ml-1 text-xs text-white/50">
                ※ 의료 관련 표현/효과는 임상 및 인허가 진행 상황에 맞춰 정확히
                표기됩니다.
              </p>
            </div>

          </FadeIn>

          {/* stats / mini proof */}
          <FadeIn delay={0.08}>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <MiniStat title="움직임 데이터" desc="정량화된 모션 지표로 상태 변화를 추적" />
              <MiniStat title="개인화 루틴" desc="아이별 패턴 기반 처방형 콘텐츠 설계" />
              <MiniStat title="치료 피드백" desc="순응도·진행을 데이터로 제공" />
            </div>
          </FadeIn>
        </div>
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/15 to-white/5 p-6 backdrop-blur shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium text-white/70">Therapy Analytics</p>
              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] text-emerald-300">
                LIVE
              </span>
            </div>

            <div className="space-y-4">
              <div className="h-28 rounded-xl bg-gradient-to-r from-indigo-500/20 via-sky-400/20 to-emerald-400/20" />
              <div className="grid grid-cols-3 gap-3">
                <Stat label="좌·우 편향" value="↓ 12%" />
                <Stat label="순응도" value="94%" />
                <Stat label="세션 완료" value="28회" />
              </div>
            </div>
          </div>

          <div className="absolute -inset-6 -z-10 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function MiniStat({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/65">{desc}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] text-white/50">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}


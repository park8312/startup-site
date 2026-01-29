"use client";

import Link from "next/link";

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-zinc-950 to-background" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* copy */}
          <div>
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              ACESO · Pediatric Rehab
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              AI-guided torticollis rehabilitation,
              <span className="block text-white/70">made simple at home.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              보호자가 집에서도 안전하게 재활 운동을 수행할 수 있도록,
              임상 기준의 운동 가이드와 진행 기록을 제공합니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#demo"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-white/90"
              >
                데모 보기
              </Link>
              <Link
                href="#screens"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                화면 미리보기
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-white/70">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xl font-semibold text-white">AI</div>
                <div className="mt-1 text-xs">자세/각도 기반 가이드</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xl font-semibold text-white">Guide</div>
                <div className="mt-1 text-xs">임상 기준 운동 흐름</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xl font-semibold text-white">Track</div>
                <div className="mt-1 text-xs">기록/추적/리포트</div>
              </div>
            </div>
          </div>

          {/* video card */}
          <div className="mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
              <div className="relative aspect-[9/16] w-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "50% 35%" }}
                  src="/product/hero-guide-web_v3.mp4"
                  poster="/product/hero-guide-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-white/60">
              전체 영상은 아래 데모 섹션에서 확인
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

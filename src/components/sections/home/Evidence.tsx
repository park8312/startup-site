import FadeIn from "@/components/motion/FadeIn";

const items = [
  {
    title: "임상 기반 설계",
    desc: "병원·연구기관과 함께 프로토콜을 설계하고, 치료 흐름에 맞춘 측정·피드백 구조를 만듭니다.",
    meta: "IRB/임상 준비",
  },
  {
    title: "안전한 데이터 처리",
    desc: "개인정보 최소화, 접근 통제, 로그/감사 체계 등 의료 데이터 요구사항을 기준으로 설계합니다.",
    meta: "보안·거버넌스",
  },
  {
    title: "재현 가능한 지표",
    desc: "움직임을 정량화해 경과를 설명하고, 치료 순응도/진행 상황을 이해 가능한 형태로 제공합니다.",
    meta: "측정·리포트",
  },
];

const stats = [
  { k: "DTx", v: "임상 기반", d: "치료 맥락에 맞춘 설계" },
  { k: "Motion", v: "정량화", d: "경과/변화 추적" },
  { k: "Feedback", v: "순응도", d: "치료 지속을 돕는 구조" },
];

export default function Evidence() {
  return (
    <section className="relative z-10 isolate min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      </div>
      <div className="mx-auto w-full px-6 py-16 sm:py-20">
        <FadeIn>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-medium text-white/60">임상 · 신뢰</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight leading-[1.4] text-white sm:text-6xl">
                근거를 쌓는 방식으로, 제품을 만듭니다
              </h2>
              <p className="mt-6 w-full text-pretty text-base leading-[2] text-white/70 sm:text-lg">
                의료 도메인에서는 "멋져 보이는 기능"보다 "설명 가능한 근거"가 먼저입니다. NextDoor Inc.는 임상 흐름과 측정 지표를 함께 설계합니다.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.k}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur"
            >
              <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70">
                {s.k}
              </div>
              <div className="mt-4 text-xl font-semibold text-white">{s.v}</div>
              <div className="mt-2 text-sm text-white/60">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {items.map((it, idx) => (
            <FadeIn key={it.title} delay={0.04 * idx}>
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur transition hover:bg-white/7 hover:shadow-md">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70">
                  {it.meta}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{it.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

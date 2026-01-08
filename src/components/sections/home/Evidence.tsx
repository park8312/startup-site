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
    <section className="relative z-10 bg-white isolate">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <FadeIn>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">임상 · 신뢰</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                근거를 쌓는 방식으로, 제품을 만듭니다
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                의료 도메인에서는 “멋져 보이는 기능”보다 “설명 가능한 근거”가 먼저입니다.
                NEXTDOOR.AI는 임상 흐름과 측정 지표를 함께 설계합니다.
              </p>
            </div>

            <div className="mt-4 grid w-full grid-cols-3 gap-2 sm:mt-0 sm:w-auto sm:min-w-[420px]">
              {stats.map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <div className="text-xs font-medium text-zinc-500">{s.k}</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900">{s.v}</div>
                  <div className="mt-1 text-xs text-zinc-500">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map((it, idx) => (
            <FadeIn key={it.title} delay={0.04 * idx}>
              <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
                  {it.meta}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{it.desc}</p>

                <div className="mt-5 h-px w-full bg-zinc-100" />

                <p className="mt-4 text-xs text-zinc-500">
                  ※ 의료 관련 표현/효과는 임상 및 인허가 진행 상황에 맞춰 정확히 표기합니다.
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

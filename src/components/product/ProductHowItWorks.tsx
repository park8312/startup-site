export default function ProductHowItWorks() {
  const steps = [
    ["1", "병원 처방", "전문의를 통해 ACESO를 처방받습니다."],
    ["2", "운동 확인", "오늘 해야 할 운동 리스트를 확인합니다."],
    ["3", "가이드 수행", "영상과 단계 안내에 따라 운동을 수행합니다."],
    ["4", "기록/추적", "수행 결과가 기록되고 진행을 확인합니다."],
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold">사용 흐름</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map(([n, t, d]) => (
          <div key={n} className="rounded-2xl border bg-card p-6">
            <div className="text-sm font-semibold text-muted-foreground">
              Step {n}
            </div>
            <div className="mt-2 text-lg font-semibold">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

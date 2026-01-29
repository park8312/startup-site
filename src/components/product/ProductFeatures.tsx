export default function ProductFeatures() {
  const features = [
    ["🎥 운동 가이드", "tilt/turn 등 핵심 운동을 영상과 단계로 안내"],
    ["📊 진행 추적", "각도/수행 기록을 시각화해 변화 확인"],
    ["📔 다이어리", "운동 수행 이력을 날짜별로 저장"],
    ["🔔 알림", "루틴을 유지하도록 알림 제공"],
    ["🔒 계정/프로필", "아이 등록/프로필/설정"],
    ["🏥 확장성", "향후 의료진 공유/리포트로 확장 가능"],
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold">핵심 기능</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map(([t, d]) => (
          <div key={t} className="rounded-2xl border bg-card p-6">
            <div className="text-base font-semibold">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

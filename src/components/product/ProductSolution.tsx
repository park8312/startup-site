export default function ProductSolution() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="text-2xl font-semibold">ACESO의 해결 방식</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        임상 기준의 운동 가이드 + 수행 기록 + (향후) AI 기반 동작 인식으로
        집에서도 “안전하고 일관된 재활”을 돕습니다.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["운동 가이드", "영상과 단계별 안내로 보호자가 따라하기 쉽게"],
          ["진행 추적", "일별 기록/그래프를 통해 변화 확인"],
          ["루틴 유지", "알림과 리스트로 꾸준한 수행을 지원"],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border bg-card p-6">
            <div className="text-lg font-semibold">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

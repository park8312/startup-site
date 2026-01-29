export default function ProductDemo() {
  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-2xl font-semibold">운동 가이드 데모</h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        실제 가이드 흐름을 영상으로 확인하세요.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-black">
        <video
          className="w-full"
          src="/product/ACESO-exercise-guide_web.mp4"
          controls
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}

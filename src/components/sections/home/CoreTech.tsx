import Container from "@/components/layout/Container";
import FadeIn from "@/components/motion/FadeIn";

const items = [
  {
    title: "Data",
    desc: "물리치료, 재활운동 비디오, 의학적 근거를 포함하는 영상, 3D 데이터 처리와 Calibration",
  },
  {
    title: "AI",
    desc: "3D 신체/행동 추론 AI모델, 단안카메라에서의 3D 이미지 추론",
  },
  {
    title: "Business",
    desc: "재활운동의 개인화된 HomeCare, 영유아를 위한 서비스 개발",
  },
];

export default function CoreTech() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <FadeIn>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                우리의 Key Tech, Key Value
              </h2>
              <p className="mt-3 max-w-2xl text-foreground/70">
                우리는 좋은 데이터로, 인공지능을 통해, 사람을 위한 비즈니스를 합니다.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it, idx) => (
            <FadeIn key={it.title} delay={0.05 * idx}>
              <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6">
                <div className="text-sm font-semibold">{it.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {it.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

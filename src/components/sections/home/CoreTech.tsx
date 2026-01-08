import Container from "@/components/layout/Container";
import FadeIn from "@/components/motion/FadeIn";

const items = [
  {
    title: "움직임 인식",
    desc: "아이의 경추 움직임을 정량화하여 상태 변화를 더 명확하게 봅니다.",
  },
  {
    title: "개인화 알고리즘",
    desc: "아이별 패턴에 맞춘 재활 콘텐츠/루틴을 설계합니다.",
  },
  {
    title: "치료 피드백",
    desc: "순응도·진행 상황을 데이터로 제공해 치료를 이어가도록 돕습니다.",
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
                기술을 “설명”하기보다, “이해”되게
              </h2>
              <p className="mt-3 max-w-2xl text-foreground/70">
                복잡한 AI를 한 줄로 요약하고, 시각적으로 전달합니다.
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

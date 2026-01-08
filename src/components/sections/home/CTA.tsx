import Container from "@/components/layout/Container";
import FadeIn from "@/components/motion/FadeIn";
import ButtonLink from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeIn>
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 md:p-10">
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
              파트너십/데모가 필요하신가요?
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">
              병원·연구기관·공공기관 협업 및 제품 데모 문의를 환영합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                문의하기
              </ButtonLink>
              <ButtonLink href="/product" variant="secondary">
                제품 보기
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

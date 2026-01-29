import FadeIn from "@/components/motion/FadeIn";
import ButtonLink from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="bg-gradient-to-b from-black via-zinc-950 to-black py-20 sm:py-24">
      <div className="mx-auto w-full px-6">
        <FadeIn>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur shadow-sm">
            <h3 className="text-4xl font-semibold tracking-tight leading-[1.4] text-white sm:text-6xl">
              파트너십/데모가 필요하신가요?
            </h3>
            <p className="mt-12 w-full text-base leading-[2] text-white/70 sm:text-lg">
              병원·연구기관·공공기관 협업 및 제품 데모 문의를 환영합니다.
            </p>
            <div className="mt-16 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="primary">
                문의하기
              </ButtonLink>
              <ButtonLink href="/product" variant="secondary">
                제품 보기
              </ButtonLink>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

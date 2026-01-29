import FadeIn from "@/components/motion/FadeIn";
import Image from "next/image";

const items = [
  {
    title: "Data",
    desc: "물리치료, 재활운동 비디오, 의학적 근거를 포함하는 영상, 3D 데이터 처리와 Calibration",
    image: "/architecture/Normalize.png",
  },
  {
    title: "AI",
    desc: "3D 신체/행동 추론 AI모델, 단안카메라에서의 3D 이미지 추론",
    image: "/architecture/capture-3d.png",
  },
  {
    title: "Business",
    desc: "재활운동의 개인화된 HomeCare, 영유아를 위한 서비스 개발",
    image: "/architecture/feedback_2.png",
  },
];

export default function CoreTech() {
  return (
    <section className="relative z-10 isolate min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      </div>
      <div className="mx-auto w-full px-6 py-16 sm:py-20">
        <FadeIn>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-medium text-white/60">기술 · 혁신</p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight leading-[1.4] text-white sm:text-6xl">
                우리의 Key Tech, Key Value
              </h2>
              <p className="mt-12 w-full text-pretty text-base leading-[2] text-white/70 sm:text-lg">
                우리는 좋은 데이터로, 인공지능을 통해, 사람을 위한 비즈니스를 합니다.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {items.map((it, idx) => (
            <FadeIn key={it.title} delay={0.04 * idx}>
              <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur transition hover:bg-white/7 hover:shadow-md">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-white/70">
                  {it.title}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {it.desc}
                </p>
                {it.image && (
                  <div className="relative mt-6 h-64 w-full">
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

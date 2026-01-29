import Link from "next/link";

export default function ProductCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl border bg-card p-10">
        <h2 className="text-2xl font-semibold">ACESO를 도입해보세요</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          보호자/기관 모두를 위한 데모 및 도입 상담을 제공합니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            도입 문의
          </Link>
          <Link
            href="#screens"
            className="rounded-xl border bg-background px-5 py-3 text-sm font-semibold"
          >
            화면 다시 보기
          </Link>
        </div>
      </div>
    </section>
  );
}

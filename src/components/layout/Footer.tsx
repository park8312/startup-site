import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="w-full px-5 md:px-9">
        <div className="py-10 text-sm text-foreground/70">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="font-medium text-foreground">{site.name}</div>
            <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          </div>

          <div className="mt-6 text-xs leading-relaxed text-foreground/60">
            대표자: 윤광열,박해윤 | 사업자등록번호: 397-86-00795 | 주소: 대구시 달성군 유가읍 테크노남로 140, 202호 | 이메일: contact@thenextdoor.co.kr
          </div>
        </div>
      </div>
    </footer>
  );
}

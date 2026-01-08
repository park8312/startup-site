import Container from "./Container";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <Container>
        <div className="py-10 text-sm text-foreground/70">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="font-medium text-foreground">{site.name}</div>
            <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          </div>

          <div className="mt-6 text-xs leading-relaxed text-foreground/60">
            ※ 의료 관련 표현/효과는 임상 및 인허가 진행 상황에 맞춰 정확히 표기하세요.
          </div>
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";

function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))] hover:text-[hsl(var(--foreground))]"
    >
      {label}
    </Link>
  );
}

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <div className="mx-auto w-full px-5 md:px-9 pt-24 pb-10">
         <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 h-fit sticky top-24">
            <div className="text-xs font-mono tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
              ADMIN
            </div>

            <div className="mt-3 space-y-1">
              <NavItem href="/admin/story" label="Story 수정" />
              <NavItem href="/admin/therapy-analytics" label="Therapy Analytics" />
            </div>

            <div className="mt-4 border-t border-[hsl(var(--border))] pt-4">
              <Link
                href="/company"
                className="block rounded-xl px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))]"
              >
                ← 사이트로
              </Link>
            </div>
          </aside>

          {/* Main */}
          <section className="min-w-0 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 md:p-7">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/ai", label: "기술" },
  { href: "/product", label: "제품" },
  { href: "/evidence", label: "임상·신뢰" },
  { href: "/company", label: "회사" },
  { href: "/contact", label: "문의" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full",
        "transition-colors duration-300",
        scrolled
          ? "bg-[hsl(var(--background))]/70 text-[hsl(var(--foreground))] backdrop-blur border-b border-[hsl(var(--border))]"
          : "bg-transparent text-[hsl(var(--foreground))]",
      ].join(" ")}
    >
      <div className="flex h-16 w-full items-center justify-between px-5 md:px-9">
        <Link href="/" className="flex items-center">
          <Image
            src="/company/ND.png"
            alt="NextDoor Inc."
            width={190}
            height={38}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-sm transition",
                scrolled
                  ? "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-lg border border-[hsl(var(--border))] px-3 py-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))]"
          >
            문의
          </Link>
          <Link
            href="/admin/login"
            className="rounded-lg border border-[hsl(var(--border))] px-3 py-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))]"
          >
            Admin
          </Link>

        </div>
      </div>
    </header>
  );
}

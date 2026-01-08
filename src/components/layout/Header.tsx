"use client";

import Link from "next/link";
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
          ? "bg-white/85 text-zinc-900 backdrop-blur border-b border-black/10"
          : "bg-transparent text-white",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className={[
            "text-sm font-semibold tracking-wide",
            scrolled ? "text-zinc-900" : "text-white",
          ].join(" ")}
        >
          NEXTDOOR.AI
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-sm transition",
                scrolled ? "text-zinc-700 hover:text-zinc-900" : "text-white/70 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={[
              "inline-flex h-9 items-center justify-center rounded-xl px-4 text-sm font-medium transition",
              scrolled
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-white/10 text-white backdrop-blur hover:bg-white/15 border border-white/15",
            ].join(" ")}
          >
            문의
          </Link>
        </div>
      </div>
    </header>
  );
}

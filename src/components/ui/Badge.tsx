import * as React from "react";
import { cn } from "@/components/ui/cn";

type BadgeVariant = "default" | "secondary" | "outline";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight";

  const variants: Record<BadgeVariant, string> = {
    // primary 대비: 배지는 너무 번쩍이지 않게 'secondary' 계열 권장
    default:
      "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
    secondary:
      "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    outline:
      "border border-[hsl(var(--border))] text-[hsl(var(--foreground))]/80",
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}

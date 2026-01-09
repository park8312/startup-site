"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Point = { t: number; v: number };

function makeMockSeries(n = 42): Point[] {
  // 완만하게 좋아지는 형태(초반 변동, 후반 안정)
  const out: Point[] = [];
  let v = 62;
  for (let i = 0; i < n; i++) {
    const trend = (i / (n - 1)) * 18; // 0 -> +18
    const noise = (Math.sin(i * 0.65) + Math.sin(i * 0.17) * 0.6) * 1.6;
    const damp = 1 - i / (n - 1); // 초반 노이즈 크게
    v = 62 + trend + noise * damp;
    out.push({ t: i, v });
  }
  return out;
}

function toPath(points: Point[], w: number, h: number, pad = 8) {
  const xs = points.map((p) => p.t);
  const ys = points.map((p) => p.v);
  const xmin = Math.min(...xs);
  const xmax = Math.max(...xs);
  const ymin = Math.min(...ys);
  const ymax = Math.max(...ys);

  const sx = (x: number) =>
    pad + ((x - xmin) / (xmax - xmin || 1)) * (w - pad * 2);
  const sy = (y: number) =>
    h - pad - ((y - ymin) / (ymax - ymin || 1)) * (h - pad * 2);

  // 단순 polyline → 부드럽게 보이도록 quadratic smoothing
  const pts = points.map((p) => [sx(p.t), sy(p.v)] as const);
  if (pts.length < 2) return "";

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    d += ` Q ${x1} ${y1} ${cx} ${cy}`;
  }
  const last = pts[pts.length - 1];
  d += ` T ${last[0]} ${last[1]}`;
  return d;
}

function toAreaPath(linePath: string, w: number, h: number, pad = 8) {
  // linePath 끝점/시작점 좌표를 알기 어렵기 때문에,
  // 여기서는 "clipPath + rect" 로 영역 채움을 처리함(더 단순).
  // (그래서 areaPath는 사용 안 함)
  return "";
}

export default function TherapyAnalyticsPanel({
  height = 108,
  className = "",
  data,
  caption = "Preview (mock)",
}: {
  height?: number;
  className?: string;
  data?: Point[];
  caption?: string;
}) {
  const W = 460; // viewBox 기준 폭(반응형으로 늘어남)
  const H = height;

  const series = useMemo(() => data ?? makeMockSeries(), [data]);
  const line = useMemo(() => toPath(series, W, H, 10), [series, W, H]);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-white/8 to-white/4",
        "border border-white/10",
        className,
      ].join(" ")}
    >
      {/* subtle noise/glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* animated scan line */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-white/0 via-white/10 to-white/0 blur-md"
        initial={{ y: -40, opacity: 0.0 }}
        animate={{ y: H + 40, opacity: [0.0, 0.45, 0.0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[11px] text-white/70">{caption}</div>
          <div className="text-[11px] text-white/60">Session trend</div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[108px] w-full"
          aria-label="Therapy analytics preview chart"
          role="img"
        >
          <defs>
            <linearGradient id="ta_line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.35)" />
            </linearGradient>

            <linearGradient id="ta_fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
            </linearGradient>

            {/* line로 clip 만든 뒤 rect로 area 느낌 */}
            <clipPath id="ta_clip">
              <path d={line} />
            </clipPath>
          </defs>

          {/* grid */}
          {[0.2, 0.4, 0.6, 0.8].map((p, i) => (
            <line
              key={i}
              x1="10"
              x2={W - 10}
              y1={H * p}
              y2={H * p}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* area fill (under curve 느낌) */}
          <path
            d={`${line} L ${W - 10} ${H - 10} L 10 ${H - 10} Z`}
            fill="url(#ta_fill)"
            opacity="0.9"
          />

          {/* main line */}
          <path d={line} fill="none" stroke="url(#ta_line)" strokeWidth="2.2" />

          {/* moving dot */}
          <motion.circle
            r="4.3"
            fill="rgba(255,255,255,0.85)"
            initial={{ cx: 18, cy: H * 0.55, opacity: 0.6 }}
            animate={{
              cx: [18, W - 18],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

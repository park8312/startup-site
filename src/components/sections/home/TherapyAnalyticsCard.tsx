"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Point = { t: number; v: number };

type Props = {
  xLabels: string[];
  dt: number[];
  se: number[];
  yLabel?: string; // "Torticollis overall score"
};

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

export default function TherapyAnalyticsCard({
  xLabels,
  dt,
  se,
  yLabel = "Torticollis overall score",
}: Props) {
  // --- chart sizing ---
  const W = 560;
  const H = 260;
  const pad = { l: 56, r: 16, t: 16, b: 56 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const n = Math.max(xLabels.length, dt.length, se.length);

  const all = [...dt, ...se].filter((v) => Number.isFinite(v));
  const minY0 = Math.min(...all);
  const maxY0 = Math.max(...all);

  // y축 여유 조금
  const yPad = Math.max(0.5, (maxY0 - minY0) * 0.12);
  const minY = Math.floor((minY0 - yPad) * 2) / 2;
  const maxY = Math.ceil((maxY0 + yPad) * 2) / 2;

  const xAt = (i: number) =>
    pad.l + (n <= 1 ? innerW / 2 : (innerW * i) / (n - 1));
  const yAt = (v: number) =>
    pad.t + (1 - (v - minY) / (maxY - minY || 1)) * innerH;

  const toPath = (arr: number[]) =>
    arr
      .slice(0, n)
      .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(2)} ${yAt(v).toFixed(2)}`)
      .join(" ");

  const dtPath = toPath(dt);
  const sePath = toPath(se);

  // y ticks (5줄 정도)
  const ticks = 5;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => {
    const t = i / ticks;
    return minY + (maxY - minY) * (1 - t);
  });

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* background */}
        <rect x="0" y="0" width={W} height={H} rx="14" fill="rgba(0,0,0,0.18)" />

        {/* grid + y ticks */}
        {tickVals.map((v, idx) => {
          const y = yAt(v);
          return (
            <g key={idx}>
              <line
                x1={pad.l}
                x2={W - pad.r}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x={pad.l - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="rgba(255,255,255,0.55)"
              >
                {v.toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* axes */}
        <line
          x1={pad.l}
          x2={pad.l}
          y1={pad.t}
          y2={H - pad.b}
          stroke="rgba(255,255,255,0.18)"
        />
        <line
          x1={pad.l}
          x2={W - pad.r}
          y1={H - pad.b}
          y2={H - pad.b}
          stroke="rgba(255,255,255,0.18)"
        />

        {/* y label (rotate) */}
        <text
          x={16}
          y={H / 2}
          transform={`rotate(-90 16 ${H / 2})`}
          fontSize="11"
          fill="rgba(255,255,255,0.60)"
        >
          {yLabel}
        </text>

        {/* x labels */}
        {xLabels.slice(0, n).map((lab, i) => (
          <text
            key={i}
            x={xAt(i)}
            y={H - 24}
            textAnchor="middle"
            fontSize="10"
            fill="rgba(255,255,255,0.65)"
          >
            {lab}
          </text>
        ))}

        {/* DT line */}
        <path d={dtPath} fill="none" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
        {/* SE line */}
        <path d={sePath} fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />

        {/* points */}
        {dt.slice(0, n).map((v, i) => (
          <circle key={`dt-${i}`} cx={xAt(i)} cy={yAt(v)} r="4.5" fill="#ef4444" />
        ))}
        {se.slice(0, n).map((v, i) => (
          <circle key={`se-${i}`} cx={xAt(i)} cy={yAt(v)} r="4.5" fill="#3b82f6" />
        ))}

        {/* legend */}
        <g transform={`translate(${W / 2 - 90}, ${H - 10})`}>
          <g>
            <line x1="0" x2="24" y1="0" y2="0" stroke="#ef4444" strokeWidth="4" />
            <text x="30" y="4" fontSize="10" fill="rgba(255,255,255,0.75)">
              DT group(avg)
            </text>
          </g>
          <g transform="translate(110, 0)">
            <line x1="0" x2="24" y1="0" y2="0" stroke="#3b82f6" strokeWidth="4" />
            <text x="30" y="4" fontSize="10" fill="rgba(255,255,255,0.75)">
              SE group(avg)
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
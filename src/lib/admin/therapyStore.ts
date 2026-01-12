import fs from "fs/promises";
import path from "path";

export type TherapyPoint = { t: number; v: number };

export type TherapyAnalyticsSnapshot = {
  caption: string;
  isLive: boolean;
  biasPct: number;
  adherencePct: number;
  sessionsDone: number;
  updatedAt: string;

  // 2-line chart (DT vs SE)
  xLabels: string[]; // e.g. ["T0 (baseline)", "T1 (4 weeks)", "T2 (8 weeks)", "T3 (12 weeks)"]
  dt: number[];      // DT group
  se: number[];      // SE group
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "therapy-analytics.json");

const DEFAULT_SNAPSHOT: TherapyAnalyticsSnapshot = {
  updatedAt: new Date().toISOString(),
  isLive: true,
  caption: "Preview (mock)",
  biasPct: 12,
  adherencePct: 94,
  sessionsDone: 28,
  xLabels: ["T0 (baseline)", "T1 (4 weeks)", "T2 (8 weeks)", "T3 (12 weeks)"],
  dt: [12.5, 14.5, 15.5, 16.3],
  se: [14.5, 15.0, 16.0, 16.0],
};

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function numArray(v: unknown): number[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => Number(x))
    .filter((x) => Number.isFinite(x));
}

function strArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => String(x));
}

function clampLengths(s: TherapyAnalyticsSnapshot): TherapyAnalyticsSnapshot {
  // xLabels length is the source of truth
  const n = Math.max(1, s.xLabels.length || 0);
  const xLabels = s.xLabels.length ? s.xLabels : DEFAULT_SNAPSHOT.xLabels.slice();
  const nn = xLabels.length;

  const dt = (s.dt.length ? s.dt : DEFAULT_SNAPSHOT.dt).slice(0, nn);
  const se = (s.se.length ? s.se : DEFAULT_SNAPSHOT.se).slice(0, nn);

  // pad if shorter
  while (dt.length < nn) dt.push(dt.at(-1) ?? 0);
  while (se.length < nn) se.push(se.at(-1) ?? 0);

  return { ...s, xLabels, dt, se };
}

function migrateFromOld(parsed: any): Partial<TherapyAnalyticsSnapshot> {
  // If old file contains "series": [{t,v}...] (single line)
  // We'll convert into 4 points (T0~T3) by sampling near start/end.
  const series = Array.isArray(parsed?.series) ? parsed.series : null;
  if (!series || series.length < 4) return {};

  const vals = series
    .map((p: any) => Number(p?.v))
    .filter((x: number) => Number.isFinite(x));
  if (vals.length < 4) return {};

  const pick = (i: number) => vals[Math.min(vals.length - 1, Math.max(0, i))];
  const t0 = pick(0);
  const t1 = pick(Math.floor(vals.length * 0.33));
  const t2 = pick(Math.floor(vals.length * 0.66));
  const t3 = pick(vals.length - 1);

  // Create DT/SE with slight offset so two lines are visible (mock)
  return {
    xLabels: DEFAULT_SNAPSHOT.xLabels.slice(),
    dt: [t0 - 2.0, t1 - 0.5, t2 - 0.3, t3 + 0.2],
    se: [t0, t1, t2, t3],
  };
}

export async function readSnapshot(): Promise<TherapyAnalyticsSnapshot> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    const migrated = migrateFromOld(parsed);
    const merged: TherapyAnalyticsSnapshot = {
      ...DEFAULT_SNAPSHOT,
      ...parsed,
      ...migrated,
      // hard-coerce arrays
      xLabels: strArray(parsed?.xLabels ?? migrated?.xLabels ?? DEFAULT_SNAPSHOT.xLabels),
      dt: numArray(parsed?.dt ?? migrated?.dt ?? DEFAULT_SNAPSHOT.dt),
      se: numArray(parsed?.se ?? migrated?.se ?? DEFAULT_SNAPSHOT.se),
      caption: String(parsed?.caption ?? DEFAULT_SNAPSHOT.caption),
      isLive: Boolean(parsed?.isLive ?? DEFAULT_SNAPSHOT.isLive),
      biasPct: Number(parsed?.biasPct ?? DEFAULT_SNAPSHOT.biasPct),
      adherencePct: Number(parsed?.adherencePct ?? DEFAULT_SNAPSHOT.adherencePct),
      sessionsDone: Number(parsed?.sessionsDone ?? DEFAULT_SNAPSHOT.sessionsDone),
      updatedAt: String(parsed?.updatedAt ?? DEFAULT_SNAPSHOT.updatedAt),
    };
    return clampLengths(merged);
  } catch {
    await ensureDir();
    await fs.writeFile(FILE_PATH, JSON.stringify(DEFAULT_SNAPSHOT, null, 2), "utf-8");
    return DEFAULT_SNAPSHOT;
  }
}

export async function writeSnapshot(next: TherapyAnalyticsSnapshot) {
  await ensureDir();
  const normalized: TherapyAnalyticsSnapshot = clampLengths({
    ...DEFAULT_SNAPSHOT,
    ...next,
    caption: String(next.caption ?? DEFAULT_SNAPSHOT.caption),
    isLive: Boolean(next.isLive),
    biasPct: Number(next.biasPct),
    adherencePct: Number(next.adherencePct),
    sessionsDone: Number(next.sessionsDone),
    xLabels: strArray(next.xLabels),
    dt: numArray(next.dt),
    se: numArray(next.se),
    updatedAt: new Date().toISOString(),
  });

  // atomic write
  const tmp = FILE_PATH + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(normalized, null, 2), "utf-8");
  await fs.rename(tmp, FILE_PATH);

  return normalized;
}

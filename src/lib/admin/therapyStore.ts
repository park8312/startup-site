import fs from "fs/promises";
import path from "path";

export type TherapyPoint = { t: number; v: number };

export type TherapyAnalyticsSnapshot = {
  updatedAt: string; // ISO
  isLive: boolean;
  caption: string;
  biasPct: number;
  adherencePct: number;
  sessionsDone: number;
  series: TherapyPoint[];
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
  series: Array.from({ length: 42 }).map((_, i) => ({ t: i, v: 62 + i * 0.35 })),
};

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readSnapshot(): Promise<TherapyAnalyticsSnapshot> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    // 최소 보정
    return {
      ...DEFAULT_SNAPSHOT,
      ...parsed,
      series: Array.isArray(parsed?.series) ? parsed.series : DEFAULT_SNAPSHOT.series,
    };
  } catch {
    await ensureDir();
    await fs.writeFile(FILE_PATH, JSON.stringify(DEFAULT_SNAPSHOT, null, 2), "utf-8");
    return DEFAULT_SNAPSHOT;
  }
}

export async function writeSnapshot(next: TherapyAnalyticsSnapshot) {
  await ensureDir();
  const payload: TherapyAnalyticsSnapshot = {
    ...next,
    updatedAt: new Date().toISOString(),
    series: (next.series ?? []).map((p) => ({ t: Number(p.t), v: Number(p.v) })),
  };

  // atomic write
  const tmp = FILE_PATH + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(payload, null, 2), "utf-8");
  await fs.rename(tmp, FILE_PATH);

  return payload;
}

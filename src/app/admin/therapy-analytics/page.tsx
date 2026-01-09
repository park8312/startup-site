"use client";

import { useEffect, useState } from "react";
import type { TherapyAnalyticsSnapshot } from "@/lib/admin/therapyStore";
import TherapyAnalyticsCard from "@/components/sections/home/TherapyAnalyticsCard";

function updatePoint(
  series: { t: number; v: number }[],
  idx: number,
  key: "t" | "v",
  value: number
) {
  return series.map((p, i) =>
    i === idx ? { ...p, [key]: value } : p
  );
}

function removePoint(series: { t: number; v: number }[], idx: number) {
  return series.filter((_, i) => i !== idx);
}

function addPoint(series: { t: number; v: number }[]) {
  const last = series[series.length - 1];
  const nextT = last ? last.t + 1 : 0;
  const nextV = last ? last.v : 70;
  return [...series, { t: nextT, v: nextV }];
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] text-white/50">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}


export default function TherapyAnalyticsAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snapshot, setSnapshot] = useState<TherapyAnalyticsSnapshot | null>(null);
  const [seriesText, setSeriesText] = useState("[]");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/admin/therapy-analytics");
      const j = await resp.json();
      setSnapshot(j.snapshot);
      setLoading(false);
    })();
  }, []);

  async function save() {
    if (!snapshot) return;

    setMsg(null);
    setSaving(true);

    const payload = snapshot;

    const resp = await fetch("/api/admin/therapy-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const j = await resp.json().catch(() => ({}));
    setSaving(false);

    if (!resp.ok || !j.ok) {
      setMsg(j?.error ?? "저장 실패");
      return;
    }

    setSnapshot(j.snapshot);
    setSeriesText(JSON.stringify(j.snapshot.series ?? [], null, 2));
    setMsg("저장 완료");
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!snapshot) return <div className="p-6">No data</div>;

  return (
    <div className="min-h-dvh bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-6 space-y-4">
            <h1 className="text-xl font-semibold">Therapy Analytics Admin</h1>
            <p className="mt-1 text-sm text-white/60">
                홈에 표시되는 Therapy Analytics(그래프 + KPI)를 편집합니다.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* LEFT: PREVIEW (sticky) */}
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm font-medium text-white/70">Home Preview</p>
                            <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[10px] text-sky-300">
                                PREVIEW
                            </span>
                        </div>

                        <div className="space-y-4">
                            <TherapyAnalyticsPanel data={snapshot.series} caption={snapshot.caption} />

                            <div className="grid grid-cols-3 gap-3">
                                <Stat label="좌·우 편향" value={`↓ ${snapshot.biasPct}%`} />
                                <Stat label="순응도" value={`${snapshot.adherencePct}%`} />
                                <Stat label="세션 완료" value={`${snapshot.sessionsDone}회`} />
                            </div>

                            <div className="text-xs text-white/50">
                                updatedAt: {snapshot.updatedAt}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white/70">Edit Data</p>
                        <button
                            onClick={save}
                            disabled={saving}
                            className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>

                    {msg && <div className="mt-3 text-sm text-emerald-300">{msg}</div>}

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* inputs ... */}
                    </div>

                    <div className="mt-6">
                        {/* series table ... */}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="space-y-1">
                    <div className="text-sm text-white/70">Caption</div>
                    <input
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
                    value={snapshot.caption}
                    onChange={(e) => setSnapshot({ ...snapshot, caption: e.target.value })}
                    />
                </label>

                <label className="space-y-1">
                    <div className="text-sm text-white/70">LIVE</div>
                    <select
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
                    value={snapshot.isLive ? "true" : "false"}
                    onChange={(e) => setSnapshot({ ...snapshot, isLive: e.target.value === "true" })}
                    >
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </select>
                </label>

                <label className="space-y-1">
                    <div className="text-sm text-white/70">좌·우 편향(%)</div>
                    <input
                    type="number"
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
                    value={snapshot.biasPct}
                    onChange={(e) => setSnapshot({ ...snapshot, biasPct: Number(e.target.value) })}
                    />
                </label>

                <label className="space-y-1">
                    <div className="text-sm text-white/70">순응도(%)</div>
                    <input
                    type="number"
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
                    value={snapshot.adherencePct}
                    onChange={(e) => setSnapshot({ ...snapshot, adherencePct: Number(e.target.value) })}
                    />
                </label>

                <label className="space-y-1">
                    <div className="text-sm text-white/70">세션 완료(회)</div>
                    <input
                    type="number"
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
                    value={snapshot.sessionsDone}
                    onChange={(e) => setSnapshot({ ...snapshot, sessionsDone: Number(e.target.value) })}
                    />
                </label>
            </div>

            {/* === SERIES TABLE === */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">
                    Therapy Series (t, v)
                    </div>
                    <button
                    type="button"
                    onClick={() =>
                        setSnapshot({
                        ...snapshot,
                        series: addPoint(snapshot.series),
                        })
                    }
                    className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
                    >
                    + 행 추가
                    </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-sm">
                    <thead className="bg-white/5 text-white/70">
                        <tr>
                        <th className="px-3 py-2 w-24">t</th>
                        <th className="px-3 py-2">value</th>
                        <th className="px-3 py-2 w-16"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {snapshot.series.map((p, idx) => (
                        <tr key={idx} className="border-t border-white/10">
                            <td className="px-3 py-1.5">
                            <input
                                type="number"
                                className="w-full rounded-md bg-black/30 border border-white/10 px-2 py-1"
                                value={p.t}
                                onChange={(e) =>
                                setSnapshot({
                                    ...snapshot,
                                    series: updatePoint(
                                    snapshot.series,
                                    idx,
                                    "t",
                                    Number(e.target.value)
                                    ),
                                })
                                }
                            />
                            </td>

                            <td className="px-3 py-1.5">
                            <input
                                type="number"
                                step="0.1"
                                className="w-full rounded-md bg-black/30 border border-white/10 px-2 py-1"
                                value={p.v}
                                onChange={(e) =>
                                setSnapshot({
                                    ...snapshot,
                                    series: updatePoint(
                                    snapshot.series,
                                    idx,
                                    "v",
                                    Number(e.target.value)
                                    ),
                                })
                                }
                            />
                            </td>

                            <td className="px-3 py-1.5 text-center">
                            <button
                                type="button"
                                onClick={() =>
                                setSnapshot({
                                    ...snapshot,
                                    series: removePoint(snapshot.series, idx),
                                })
                                }
                                className="text-xs text-red-300 hover:underline"
                            >
                                삭제
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={save}
                    disabled={saving}
                    className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2"
                >
                    {saving ? "Saving..." : "Save"}
                </button>
                <div className="text-sm text-white/60">
                    updatedAt: {snapshot.updatedAt}
                </div>
            </div>

                {msg && <div className="text-sm text-emerald-300">{msg}</div>}
            </div>
        </div>
    </div>
  );
}

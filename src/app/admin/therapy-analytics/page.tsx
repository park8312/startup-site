"use client";

import { useEffect, useState } from "react";
import type { TherapyAnalyticsSnapshot } from "@/lib/admin/therapyStore";
import TherapyAnalyticsCard from "@/components/sections/home/TherapyAnalyticsCard";

function updateAt(arr: number[], idx: number, value: number) {
    return arr.map((v, i) => (i === idx ? value : v));
}

function removeAt<T>(arr: T[], idx: number) {
    return arr.filter((_, i) => i !== idx);
}

function addValue(arr: number[], value = 0) {
    return [...arr, value];
}

function addValueLabel(labels: string[]) {
    const i = labels.length;
    // 기본값: T0~T3 스타일
    const presets = [
        "T0 (baseline)",
        "T1 (4 weeks)",
        "T2 (8 weeks)",
        "T3 (12 weeks)",
    ];
    return [...labels, presets[i] ?? `T${i}`];
}

function normalizeLengths(s: TherapyAnalyticsSnapshot): TherapyAnalyticsSnapshot {
    // xLabels length is source of truth
    const n = Math.max(1, s.xLabels.length);
    const dt = s.dt.slice(0, n);
    const se = s.se.slice(0, n);
    while (dt.length < n) dt.push(dt.at(-1) ?? 0);
    while (se.length < n) se.push(se.at(-1) ?? 0);
    return { ...s, dt, se };
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
    const [msg, setMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch("/api/admin/therapy-analytics");
            const j = await resp.json();
            // 혹시 서버 데이터 길이가 꼬여있으면 바로 보정
            setSnapshot(j.snapshot ? normalizeLengths(j.snapshot) : null);
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
        setMsg("저장 완료");
    }

    if (loading) return <div className="p-6">Loading...</div>;
    if (!snapshot) return <div className="p-6">No data</div>;

    return (
        <div className="min-h-dvh text-white">
            {/* 강제 다크 배경 */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black" />
            <div className="fixed inset-0 -z-10 opacity-40 [background:radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(45%_35%_at_85%_35%,rgba(16,185,129,0.14),transparent_55%)]" />
            <div className="mx-auto max-w-6xl p-6">
                <h1 className="text-xl font-semibold">Therapy Analytics Admin</h1>
                <p className="mt-1 text-sm text-white/60">
                    홈에 표시되는 Therapy Analytics(그래프 + KPI)를 편집합니다.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* LEFT: PREVIEW (sticky) */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-white/70">Home Preview</p>
                                <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[10px] text-sky-300">
                                    PREVIEW
                                </span>
                            </div>

                            <div className="space-y-4">
                                <TherapyAnalyticsCard
                                    xLabels={snapshot.xLabels}
                                    dt={snapshot.dt}
                                    se={snapshot.se}
                                />
                                <div className="grid grid-cols-3 gap-3">
                                    <Stat label="좌·우 편향" value={`↓ ${snapshot.biasPct}%`} />
                                    <Stat label="순응도" value={`${snapshot.adherencePct}%`} />
                                    <Stat label="세션 완료" value={`${snapshot.sessionsDone}회`} />
                                </div>

                                <div className="text-xs text-white/50">updatedAt: {snapshot.updatedAt}</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: FORM */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
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
                            <label className="space-y-1 md:col-span-2">
                                <div className="text-sm text-white/70">Caption</div>
                                <input
                                    className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/20"
                                    value={snapshot.caption}
                                    onChange={(e) =>
                                        setSnapshot((prev) => (prev ? { ...prev, caption: e.target.value } : prev))
                                    }
                                />
                            </label>

                            <label className="space-y-1">
                                <div className="text-sm text-white/70">LIVE</div>
                                <select
                                    className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/20"
                                    value={snapshot.isLive ? "true" : "false"}
                                    onChange={(e) =>
                                        setSnapshot((prev) => (prev ? { ...prev, isLive: e.target.value === "true" } : prev))
                                    }
                                >
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </select>
                            </label>

                            <label className="space-y-1">
                                <div className="text-sm text-white/70">좌·우 편향(%)</div>
                                <input
                                    type="number"
                                    className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/20"
                                    value={snapshot.biasPct}
                                    onChange={(e) =>
                                        setSnapshot((prev) => (prev ? { ...prev, biasPct: Number(e.target.value) } : prev))
                                    }
                                />
                            </label>

                            <label className="space-y-1">
                                <div className="text-sm text-white/70">순응도(%)</div>
                                <input
                                    type="number"
                                    className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/20"
                                    value={snapshot.adherencePct}
                                    onChange={(e) =>
                                        setSnapshot((prev) => (prev ? { ...prev, adherencePct: Number(e.target.value) } : prev))
                                    }
                                />
                            </label>

                            <label className="space-y-1">
                                <div className="text-sm text-white/70">세션 완료(회)</div>
                                <input
                                    type="number"
                                    className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400/20"
                                    value={snapshot.sessionsDone}
                                    onChange={(e) =>
                                        setSnapshot((prev) => (prev ? { ...prev, adherencePct: Number(e.target.value) } : prev))
                                    }
                                />
                            </label>
                        </div>

                        {/* === DT / SE TABLES === */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-white/70">Scores (DT / SE)</div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSnapshot((prev) => {
                                                if (!prev) return prev;
                                                const next = {
                                                    ...prev,
                                                    xLabels: addValueLabel(prev.xLabels),
                                                    dt: addValue(prev.dt, prev.dt.at(-1) ?? 0),
                                                    se: addValue(prev.se, prev.se.at(-1) ?? 0),
                                                };
                                                return normalizeLengths(next);
                                            })
                                        }
                                        className="rounded-lg bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
                                    >
                                        + 시점 추가
                                    </button>
                                </div>
                            </div>

                            {/* DT/SE table */}
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="text-sm text-white/70">DT / SE groups</div>
                                    <span className="text-xs text-white/50">DT=red, SE=blue</span>
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/5 text-white/70">
                                            <tr>
                                                <th className="px-3 py-2 text-left">time</th>
                                                <th className="px-3 py-2 text-left">label</th>
                                                <th className="px-3 py-2 text-left">DT</th>
                                                <th className="px-3 py-2 text-left">SE</th>
                                                <th className="px-3 py-2 w-16"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {snapshot.xLabels.map((lab, idx) => (
                                                <tr key={idx} className="border-t border-white/10">
                                                    <td className="px-3 py-2 text-white/60">{`T${idx}`}</td>

                                                    <td className="px-3 py-2">
                                                        <input
                                                            className="w-full rounded-md bg-black/30 border border-white/10 px-2 py-1 outline-none focus:ring-2 focus:ring-sky-400/20"
                                                            value={lab}
                                                            onChange={(e) =>
                                                                setSnapshot((prev) => {
                                                                    if (!prev) return prev;
                                                                    const next = {
                                                                        ...prev,
                                                                        xLabels: prev.xLabels.map((v, i) =>
                                                                            i === idx ? e.target.value : v
                                                                        ),
                                                                    };
                                                                    return normalizeLengths(next);
                                                                })
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-3 py-2">
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            className="w-full rounded-md bg-black/30 border border-white/10 px-2 py-1 outline-none focus:ring-2 focus:ring-sky-400/20"
                                                            value={snapshot.dt[idx] ?? 0}
                                                            onChange={(e) =>
                                                                setSnapshot((prev) => {
                                                                    if (!prev) return prev;
                                                                    const next = {
                                                                        ...prev,
                                                                        dt: updateAt(prev.dt, idx, Number(e.target.value)),
                                                                    };
                                                                    return normalizeLengths(next);
                                                                })
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-3 py-2">
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            className="w-full rounded-md bg-black/30 border border-white/10 px-2 py-1 outline-none focus:ring-2 focus:ring-sky-400/20"
                                                            value={snapshot.se[idx] ?? 0}
                                                            onChange={(e) =>
                                                                setSnapshot((prev) => {
                                                                    if (!prev) return prev;
                                                                    const next = {
                                                                        ...prev,
                                                                        se: updateAt(prev.se, idx, Number(e.target.value)),
                                                                    };
                                                                    return normalizeLengths(next);
                                                                })
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-3 py-2 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setSnapshot((prev) => {
                                                                    if (!prev) return prev;
                                                                    const next = {
                                                                        ...prev,
                                                                        xLabels: removeAt(prev.xLabels, idx),
                                                                        dt: removeAt(prev.dt, idx),
                                                                        se: removeAt(prev.se, idx),
                                                                    };
                                                                    return normalizeLengths(next);
                                                                })
                                                            }
                                                            className="text-xs text-white/60 hover:text-red-300 hover:underline"
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
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-white/60">updatedAt: {snapshot.updatedAt}</div>
                            <button
                                onClick={save}
                                disabled={saving}
                                className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

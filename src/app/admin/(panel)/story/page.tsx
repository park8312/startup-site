// src/app/admin/story/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StoryItem = {
  id: string;
  year: string;
  title: string;
  body: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  order: number;
  isPublished: boolean;
  updatedAt: string;
};

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `Request failed: ${res.status}`);
  }
  return res.json();
}

export default function AdminStoryPage() {
  const [items, setItems] = useState<StoryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(
    () => items.find((x) => x.id === selectedId) ?? null,
    [items, selectedId]
  );

  const imageFileRef = useRef<HTMLInputElement | null>(null);
  const videoFileRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    year: "",
    title: "",
    body: "",
    imageUrl: "",
    videoUrl: "",
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const data = await api<{ items: StoryItem[] }>("/api/admin/stories");
      setItems(data.items);
      setSelectedId((prev) => {
        if (prev && data.items.some((x) => x.id === prev)) return prev;
        return data.items[0]?.id ?? null;
      });
    } finally {
      setLoading(false);
    }
  }

  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    refresh();
    setInitialLoadDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // selectedId가 **실제로 변경**되었을 때만 form을 리셋 (초기 로드 후)
  useEffect(() => {
    if (!initialLoadDone || !selected || !selectedId) return;
    
    console.log("🔄 Form 리셋됨:", selectedId);
    setForm({
      year: selected.year ?? "",
      title: selected.title ?? "",
      body: selected.body ?? "",
      imageUrl: selected.imageUrl ?? "",
      videoUrl: selected.videoUrl ?? "",
      isPublished: selected.isPublished ?? true,
    });
  }, [selectedId, initialLoadDone]);

  async function createNew() {
    setSaving(true);
    try {
      const created = await api<{ item: StoryItem }>("/api/admin/stories", {
        method: "POST",
        body: JSON.stringify({
          year: "YYYY",
          title: "New story",
          body: "내용을 입력하세요.",
          imageUrl: "",
          videoUrl: "",
          isPublished: true,
        }),
      });
      await refresh();
      setSelectedId(created.item.id);
    } finally {
      setSaving(false);
    }
  }

  async function save() {
    if (!selected) return;
    console.log("💾 저장 시작:", { id: selected.id, videoUrl: form.videoUrl });
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/stories/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl: form.imageUrl.trim() ? form.imageUrl.trim() : null,
          videoUrl: form.videoUrl.trim() ? form.videoUrl.trim() : null,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 에러 (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ 저장 완료:", { videoUrl: form.videoUrl, result });
      alert("✅ 저장되었습니다!");
      await refresh();
    } catch (err: any) {
      console.error("❌ 저장 실패:", err);
      alert(`❌ 저장 실패: ${err?.message ?? "알 수 없는 에러"}`);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!selected) return;
    if (!confirm("삭제할까?")) return;
    setSaving(true);
    try {
      await api(`/api/admin/stories/${selected.id}`, { method: "DELETE" });
      setSelectedId(null);
      await refresh();
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(id: string, next: boolean) {
    await api(`/api/admin/stories/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isPublished: next }),
    });
    await refresh();
  }

  async function move(id: string, dir: -1 | 1) {
    const idx = items.findIndex((x) => x.id === id);
    if (idx < 0) return;
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;

    const next = [...items];
    const tmp = next[idx];
    next[idx] = next[j];
    next[j] = tmp;

    setItems(next);

    await api("/api/admin/stories/reorder", {
      method: "PATCH",
      body: JSON.stringify({ idsInOrder: next.map((x) => x.id) }),
    });

    await refresh();
    setSelectedId(id);
  }

  async function uploadImage(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload/company-image", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || "Upload failed");
    }

    const j = await res.json();
    return j.url as string; // "/company/xxx.jpg"
  }

  async function uploadVideo(file: File) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload/company-video", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) throw new Error((await res.text()) || "Upload failed");
    const j = await res.json();
    return j.url as string; // "/company/videos/xxx.mp4"
  }

  if (loading) return <div className="p-6 text-sm">Loading…</div>;

  return (
    <div className="text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-white/50">ADMIN</div>
          <h1 className="mt-1 text-2xl font-semibold">Story / History</h1>
          <p className="mt-1 text-sm text-white/60">
            Company 히스토리 카드 CRUD + 순서
          </p>
        </div>
        <button
          onClick={createNew}
          disabled={saving}
          className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 disabled:opacity-50"
        >
          + 새 카드
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[420px_1fr]">
        {/* Left: list */}
        <div className="rounded-2xl border border-white/10 bg-white/5 min-h-[calc(100dvh-260px)] overflow-hidden">
          <div className="border-b border-white/10 px-4 py-3 text-sm text-white/70">
            Cards ({items.length})
          </div>

          <ul className="divide-y divide-white/10 max-h-[calc(100dvh-320px)] overflow-auto">
            {items.map((x) => {
              const active = x.id === selectedId;
              return (
                <li
                  key={x.id}
                  className={[
                    "px-4 py-3 cursor-pointer",
                    active ? "bg-white/10" : "hover:bg-white/5",
                  ].join(" ")}
                  onClick={() => setSelectedId(x.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-white/50">{x.year}</div>
                      <div className="mt-1 font-medium">{x.title}</div>
                      <div className="mt-1 line-clamp-2 text-xs text-white/60 whitespace-pre-wrap">
                        {x.body}
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-end gap-2"
                      onClick={(e) => e.stopPropagation()} // ⭐ 중요
                    >
                      <label className="flex items-center gap-2 text-xs text-white/60">
                        <input
                          type="checkbox"
                          checked={x.isPublished}
                          onChange={(e) =>
                            togglePublished(x.id, e.target.checked)
                          }
                        />
                        공개
                      </label>

                      <div className="flex gap-1">
                        <button
                          onClick={() => move(x.id, -1)}
                          className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => move(x.id, 1)}
                          className="rounded-lg border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: editor */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 min-h-[calc(100dvh-260px)] overflow-auto">
          {!selected ? (
            <div className="text-sm text-white/60">카드를 선택해줘.</div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/50">EDIT</div>
                  <div className="mt-1 font-semibold">
                    {selected.year} · {selected.title}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={remove}
                    disabled={saving}
                    className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm hover:bg-red-500/15 disabled:opacity-50"
                  >
                    삭제
                  </button>
                  <button
                    onClick={save}
                    disabled={saving}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                  >
                    {saving ? "저장중..." : "저장"}
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-xs text-white/60">Year</span>
                    <input
                      value={form.year}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, year: e.target.value }))
                      }
                      className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-xs text-white/60">Title</span>
                    <input
                      value={form.title}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, title: e.target.value }))
                      }
                      className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                    />
                  </label>
                </div>

                <label className="grid gap-1">
                  <span className="text-xs text-white/60">Body</span>
                  <textarea
                    value={form.body}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, body: e.target.value }))}
                    rows={7}
                    className="w-full min-h-[240px] rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none whitespace-pre-wrap"
                  />
                  <span className="text-xs text-white/40">
                    여러 줄 OK. Cohere처럼 2~4줄 정도 권장.
                  </span>
                </label>

                <label className="grid gap-2">
                  <span className="text-xs text-white/60">Image</span>
                  {/* 1) 파일 선택 */}
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="block w-full text-sm text-white/70
                              file:mr-3 file:rounded-xl file:border-0
                              file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white
                              hover:file:bg-white/15"
                    onChange={async () => {
                      const file = imageFileRef.current?.files?.[0];
                      if (!file) return;

                      try {
                        setSaving(true);
                        const url = await uploadImage(file);
                        setForm((s) => ({ ...s, imageUrl: url }));
                      } catch (err: any) {
                        alert(err?.message ?? "Upload failed");
                      } finally {
                        setSaving(false);
                        if (imageFileRef.current) imageFileRef.current.value = ""; // ✅ 안전
                      }
                    }}
                  />

                  {/* 2) URL 직접 입력도 유지 */}
                  <input
                    value={form.imageUrl}
                    onChange={(e) => setForm((s) => ({ ...s, imageUrl: e.target.value }))}
                    placeholder="/company/ACESO-Intro.jpg"
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                  />

                  <span className="text-xs text-white/40">
                    파일 업로드 시 public/company에 저장되고 URL이 자동 입력됩니다.
                  </span>

                  {/* 3) 미리보기 */}
                  {form.imageUrl?.trim() ? (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <img src={form.imageUrl} alt="preview" className="w-full max-h-64 object-cover" />
                    </div>
                  ) : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-xs text-white/60">Video (optional)</span>

                  <input
                    ref={videoFileRef}
                    type="file"
                    accept="video/mp4,video/webm"
                    className="block w-full text-sm text-white/70 file:mr-3 file:rounded-xl file:border-0
                              file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white
                              hover:file:bg-white/15"
                    onChange={async () => {
                      const file = videoFileRef.current?.files?.[0];
                      if (!file) return;
                      try {
                        setSaving(true);
                        const url = await uploadVideo(file);
                        setForm((s) => ({ ...s, videoUrl: url }));
                      } catch (err: any) {
                        alert(err?.message ?? "Upload failed");
                      } finally {
                        setSaving(false);
                        if (videoFileRef.current) videoFileRef.current.value = "";
                      }
                    }}
                  />

                  <input
                    value={form.videoUrl}
                    onChange={(e) => setForm((s) => ({ ...s, videoUrl: e.target.value }))}
                    placeholder="/company/videos/demo.mp4"
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/25"
                  />

                  {form.videoUrl?.trim() ? (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <video
                        src={form.videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full max-h-64 object-contain"
                      />
                    </div>
                  ) : null}
                </label>

                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        isPublished: e.target.checked,
                      }))
                    }
                  />
                  Published
                </label>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs text-white/50">Preview (raw)</div>
                <div className="mt-2 text-xs text-white/60">
                  {form.year} · {form.title}
                </div>
                <div className="mt-2 text-sm whitespace-pre-wrap">{form.body}</div>
                {form.imageUrl?.trim() ? (
                  <div className="mt-3 text-xs text-white/50">
                    image: {form.imageUrl}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

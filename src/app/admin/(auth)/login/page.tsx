"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const resp = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!resp.ok) {
      const j = await resp.json().catch(() => ({}));
      setErr(j?.error ?? "Login failed");
      return;
    }

    router.replace("/admin/therapy-analytics");
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-lg font-semibold">Admin Login</h1>
        <p className="mt-1 text-sm text-white/60">비밀번호로 접근을 제한합니다.</p>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            type="password"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 outline-none"
            placeholder="ADMIN_PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <div className="text-sm text-red-300">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError(data.error ?? "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-line bg-card p-7 shadow-sm"
    >
      <h1 className="text-xl font-extrabold tracking-tight text-ink">SEO Admin</h1>
      <p className="mt-1.5 text-sm text-muted">
        Enter the admin password to manage page SEO.
      </p>

      {!configured && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
          No <code>ADMIN_PASSWORD</code> is set on the server. Add it to your environment
          and restart to enable login.
        </p>
      )}

      <label htmlFor="admin-password" className="mt-6 block text-sm font-medium text-ink">
        Password
      </label>
      <input
        id="admin-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        disabled={!configured || busy}
        className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-accent disabled:opacity-50"
      />

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!configured || busy || !password}
        className="mt-6 w-full rounded-xl bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

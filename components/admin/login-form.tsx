"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/admin-auth";
import { ADMIN_PATH } from "@/constants/admin";
import { ADMIN_LIMITS } from "@/validations/admin";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await login({ username, password });
      if (result.ok) {
        // The session cookie is set server-side; refresh so the proxy and the
        // dashboard both see it before we navigate.
        router.refresh();
        router.replace(ADMIN_PATH);
      } else {
        setError(result.error);
        setPassword("");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-g-rule bg-white px-8 py-9 flex flex-col gap-7"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-username"
          className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid"
        >
          Username
        </label>
        <input
          id="admin-username"
          type="text"
          required
          autoFocus
          autoComplete="username"
          value={username}
          maxLength={ADMIN_LIMITS.usernameMax}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-g-rule bg-g-off px-3.5 py-2.5 text-sm text-g-ink rounded outline-none focus:border-g-accent transition-colors"
          placeholder="admin"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-password"
          className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid"
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          maxLength={ADMIN_LIMITS.passwordMax}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-g-rule bg-g-off px-3.5 py-2.5 text-sm text-g-ink rounded outline-none focus:border-g-accent transition-colors"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-sm text-g-accent" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start inline-flex items-center gap-2.5 px-6 py-3 bg-g-ink text-white text-[13px] font-semibold rounded no-underline transition-opacity duration-200 disabled:opacity-50"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}

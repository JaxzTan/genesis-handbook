"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

/**
 * Re-fetches the dashboard's server data in place.
 *
 * router.refresh() keeps the current URL — and therefore the active filters —
 * while re-running the server component, so new feedback appears without
 * resetting the view.
 */
export function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      aria-label="Refresh feedback"
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-g-rule bg-white font-mono text-[10px] tracking-[0.12em] uppercase text-g-mid hover:text-g-ink hover:border-g-accent transition-all duration-150 disabled:opacity-50"
    >
      <span
        aria-hidden
        className={`text-[12px] leading-none ${pending ? "animate-spin" : ""}`}
      >
        ↻
      </span>
      {pending ? "Refreshing…" : "Refresh"}
    </button>
  );
}

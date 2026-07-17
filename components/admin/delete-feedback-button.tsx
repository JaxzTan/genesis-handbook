"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteFeedback } from "@/actions/admin-feedback";

/** Two-step delete — one click arms it, the second confirms. No modal, no undo. */
export function DeleteFeedbackButton({ id }: { id: string }) {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!armed) {
      setArmed(true);
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await deleteFeedback({ id });
      if (result.ok) {
        router.refresh();
      } else {
        setError(result.error);
        setArmed(false);
      }
    });
  }

  return (
    <div className="flex items-center gap-3">
      {error && (
        <span className="text-[11px] text-g-accent" role="alert">
          {error}
        </span>
      )}
      {armed && !pending && (
        <button
          type="button"
          onClick={() => setArmed(false)}
          className="font-mono text-[10px] tracking-[0.08em] uppercase text-g-mid hover:text-g-ink transition-colors"
        >
          Cancel
        </button>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        aria-label={armed ? "Confirm delete" : "Delete this feedback"}
        className={`px-3 py-1.5 rounded border font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-150 disabled:opacity-50 ${
          armed
            ? "bg-g-accent text-white border-g-accent"
            : "bg-transparent text-g-muted border-g-rule hover:text-g-accent hover:border-g-accent"
        }`}
      >
        {pending ? "Deleting…" : armed ? "Confirm" : "Delete"}
      </button>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_PATH } from "@/constants/admin";
import { LIMIT_OPTIONS } from "@/validations/admin";
import type { FeedbackFilter } from "@/validations/admin";

const RATING_OPTIONS = [
  { value: "all", label: "All" },
  { value: "5", label: "5" },
  { value: "4", label: "4" },
  { value: "3", label: "3" },
  { value: "2", label: "2" },
  { value: "1", label: "1" },
  { value: "none", label: "Unrated" },
] as const;

const EMAIL_OPTIONS = [
  { value: "all", label: "Everyone" },
  { value: "yes", label: "Has email" },
  { value: "no", label: "Anonymous" },
] as const;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
] as const;

/**
 * Toolbar that sits directly on top of the table.
 *
 * Filters live in the URL rather than component state, so a filtered view is
 * shareable, survives a reload, and works with the back button.
 */
export function FeedbackFilters({ filter }: { filter: FeedbackFilter }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(filter.q);
  const [pending, startTransition] = useTransition();

  function applyParam(key: string, value: string) {
    // Copy rather than mutate — the hook's params object is shared.
    const next = new URLSearchParams(searchParams.toString());
    if (value === "" || value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    // Any filter change invalidates the current page — page 3 of the old result
    // set is meaningless against the new one, so start over at the first page.
    next.delete("page");
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `${ADMIN_PATH}?${qs}` : ADMIN_PATH, { scroll: false });
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    applyParam("q", query);
  }

  const showReset =
    filter.rating !== "all" || filter.hasEmail !== "all" || filter.q !== "";

  return (
    <div className="border border-g-rule border-b-0 bg-white px-5 py-5 flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[240px]">
          <input
            type="search"
            value={query}
            maxLength={200}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search feedback messages and names"
            placeholder="Search messages or names…"
            className="flex-1 border border-g-rule bg-g-off px-3.5 py-2 text-sm text-g-ink rounded outline-none focus:border-g-accent transition-colors"
          />
          <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 bg-g-ink text-white text-[12px] font-semibold rounded transition-opacity duration-200 disabled:opacity-50"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-muted">
              Rows
            </span>
            <select
              value={filter.limit}
              onChange={(e) => applyParam("limit", e.target.value)}
              className="border border-g-rule bg-g-off px-2.5 py-1.5 rounded font-mono text-[10px] text-g-ink outline-none focus:border-g-accent transition-colors cursor-pointer"
            >
              {LIMIT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {showReset && (
            <button
              type="button"
              onClick={() => startTransition(() => router.push(ADMIN_PATH))}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-g-mid hover:text-g-accent transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <FilterGroup
          legend="Rating"
          options={RATING_OPTIONS}
          active={filter.rating}
          onSelect={(v) => applyParam("rating", v)}
        />
        <FilterGroup
          legend="Contact"
          options={EMAIL_OPTIONS}
          active={filter.hasEmail}
          onSelect={(v) => applyParam("hasEmail", v)}
        />
        <FilterGroup
          legend="Sort"
          options={SORT_OPTIONS}
          active={filter.sort}
          onSelect={(v) => applyParam("sort", v)}
        />
      </div>
    </div>
  );
}

function FilterGroup({
  legend,
  options,
  active,
  onSelect,
}: {
  legend: string;
  options: readonly { value: string; label: string }[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset className="flex items-center gap-2 border-0 p-0 m-0 flex-wrap">
      <legend className="sr-only">{legend}</legend>
      <span
        aria-hidden
        className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-muted mr-1"
      >
        {legend}
      </span>
      {options.map((option) => {
        const isActive = active === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(option.value)}
            className={`px-3 py-1.5 rounded border font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-150 ${
              isActive
                ? "bg-g-ink text-white border-g-ink"
                : "bg-g-off text-g-mid border-g-rule hover:border-g-accent hover:text-g-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </fieldset>
  );
}

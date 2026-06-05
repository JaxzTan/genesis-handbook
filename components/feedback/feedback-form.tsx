"use client";

import { useState, useTransition } from "react";
import { submitFeedback } from "@/actions/feedback";
import { FEEDBACK_LIMITS } from "@/validations/feedback";

const RATINGS = [1, 2, 3, 4, 5];

export function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await submitFeedback({
        name,
        email,
        rating: rating ?? undefined,
        message,
        website,
      });
      if (result.ok) {
        setDone(true);
      } else {
        setError(result.error);
      }
    });
  }

  if (done) {
    return (
      <div className="border border-g-rule bg-g-off px-8 py-12 text-center">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-g-accent mb-3">
          Received
        </div>
        <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] text-g-ink mb-3">
          Thank you.
        </h2>
        <p className="text-sm text-g-mid max-w-[42ch] mx-auto leading-relaxed">
          Your feedback helps shape the next edition of Genesis. We read every
          submission.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-g-rule bg-white px-8 py-9 flex flex-col gap-7"
    >
      {/* Rating */}
      <div className="flex flex-col gap-3">
        <label className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid">
          How was your experience? (optional)
        </label>
        <div className="flex gap-2">
          {RATINGS.map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`Rate ${n} of 5`}
              aria-pressed={rating === n}
              onClick={() => setRating(rating === n ? null : n)}
              className={`w-10 h-10 rounded font-serif text-lg font-bold border transition-all duration-150 ${
                rating !== null && n <= rating
                  ? "bg-g-accent text-white border-g-accent"
                  : "bg-g-off text-g-mid border-g-rule hover:border-g-accent"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fb-name"
            className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid"
          >
            Name (optional)
          </label>
          <input
            id="fb-name"
            type="text"
            value={name}
            maxLength={FEEDBACK_LIMITS.nameMax}
            onChange={(e) => setName(e.target.value)}
            className="border border-g-rule bg-g-off px-3.5 py-2.5 text-sm text-g-ink rounded outline-none focus:border-g-accent transition-colors"
            placeholder="Jane Builder"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fb-email"
            className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid"
          >
            Email (optional)
          </label>
          <input
            id="fb-email"
            type="email"
            value={email}
            maxLength={FEEDBACK_LIMITS.emailMax}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-g-rule bg-g-off px-3.5 py-2.5 text-sm text-g-ink rounded outline-none focus:border-g-accent transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="fb-message"
          className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid"
        >
          Your feedback
        </label>
        <textarea
          id="fb-message"
          required
          value={message}
          maxLength={FEEDBACK_LIMITS.messageMax}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="border border-g-rule bg-g-off px-3.5 py-3 text-sm text-g-ink leading-relaxed rounded outline-none focus:border-g-accent transition-colors resize-y"
          placeholder="What worked, what didn't, what you'd want to see in the handbook…"
        />
        <div className="text-right font-mono text-[9px] text-g-mid">
          {message.length} / {FEEDBACK_LIMITS.messageMax}
        </div>
      </div>

      {/* Honeypot — visually hidden, off-screen, ignored by real users */}
      <div aria-hidden className="hidden">
        <label htmlFor="fb-website">Website</label>
        <input
          id="fb-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
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
        {pending ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}

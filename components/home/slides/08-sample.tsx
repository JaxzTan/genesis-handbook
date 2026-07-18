const META = [
  { label: "Submitted by", value: "Hana Tang" },
  { label: "Phase", value: "02 · Describe It" },
  { label: "Topic", value: "Time management & deadlines" },
];

const TAGS = ["Timeline", "Scoping", "Zero Pivots"];

const FOOTER_STATS = [
  { value: "~80", label: "words" },
  { value: "~2 min", label: "to write" },
  { value: "Submitted via", label: "Google Form" },
];

export function SampleSlide() {
  return (
    <section id="s8" data-slide-id="8" className="slide bg-white">
      <div
        className="sample-head grid items-end mb-14"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "80px" }}
      >
        <h2
          className="em-accent fade-up font-bold"
          style={{ fontSize: "clamp(34px, 4.2vw, 54px)" }}
          dangerouslySetInnerHTML={{
            __html: "What a contribution<br><em>looks like.</em>",
          }}
        />
        <p className="fade-up d1 text-[16px] leading-[1.75] text-[#3a3a38] max-w-[48ch]">
          A contribution is a small, focused unit: one person sharing one thing
          they know well. Below is a real submission from Phase 02, Describe
          It: one tip per box, action + reason, like you&apos;re telling a
          teammate.
        </p>
      </div>

      <div className="sample-card fade-up d2">
        <div className="sample-meta">
          {META.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-g-mid">
                {m.label}
              </div>
              <div className="text-[15px] text-g-ink font-medium">{m.value}</div>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-g-mid">
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 border border-g-rule rounded-full text-g-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sample-body">
          <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-g-accent mb-3.5">
            Phase 02 · One Tip Per Box
          </div>
          <h3
            className="em-card font-serif text-[28px] font-bold tracking-[-0.02em] mb-[22px]"
            dangerouslySetInnerHTML={{
              __html: "Figure out the timeline first. <em>Zero pivots.</em>",
            }}
          />
          <p className="text-[16px] leading-[1.75] text-[#2a2a28] max-w-[62ch]">
            We do not rush. We figure out the timeline first, even before
            writing a line of code. Hour 0-4: pick an idea and stick to it,
            zero pivots. Hour 4-12: the designer does wireframes. Hour 12-24:
            core feature development.
          </p>
          <p className="text-[16px] leading-[1.75] text-[#2a2a28] max-w-[62ch] mt-3.5">
            Hour 24-30:{" "}
            <strong className="font-semibold text-g-ink">
              stop adding features.
            </strong>{" "}
            Start integrating. Hour 30-36: bug fixing, UI polishing, and
            recording the demo. The last hours belong to the pitch, not the
            code.
          </p>

          <div className="sample-quote">
            &quot;Post your stack and timezone 48 hours before kickoff:
            specificity gets replies.&quot; The gold standard: action +
            reason, a couple of sentences, done.
          </div>

          <div className="mt-7 flex gap-6 items-center flex-wrap">
            {FOOTER_STATS.map((s) => (
              <div
                key={s.label}
                className="text-sm text-g-mid flex items-center gap-1.5"
              >
                <strong className="text-g-ink font-semibold">{s.value}</strong>{" "}
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

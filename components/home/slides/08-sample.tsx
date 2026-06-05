const META = [
  { label: "Submitted by", value: "Anonymous Contributor" },
  { label: "Phase", value: "02 — Describe It" },
  { label: "Topic", value: "Demo Day" },
];

const TAGS = ["Pitching", "Judges", "Live Demos"];

const FOOTER_STATS = [
  { value: "312", label: "words" },
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
        <p className="fade-up d1 text-sm leading-[1.75] text-[#3a3a38] max-w-[48ch]">
          A contribution is a small, focused unit — one person sharing one thing
          they know well. Below is a real submission from Phase 02 — Describe It,
          showing exactly what we ask for.
        </p>
      </div>

      <div className="sample-card fade-up d2">
        <div className="sample-meta">
          {META.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid">
                {m.label}
              </div>
              <div className="text-[13px] text-g-ink font-medium">{m.value}</div>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid">
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border border-g-rule rounded-full text-g-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sample-body">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-g-accent mb-3.5">
            Phase 02 · Describe the Topic
          </div>
          <h3
            className="em-card font-serif text-[28px] font-bold tracking-[-0.02em] mb-[22px]"
            dangerouslySetInnerHTML={{
              __html: "Demo Day is a <em>performance,</em> not a presentation.",
            }}
          />
          <p className="text-[14.5px] leading-[1.75] text-[#2a2a28] max-w-[62ch]">
            By the time judges reach your booth, they&apos;ve already seen ten
            demos. They&apos;re tired, they&apos;re hungry, and their
            pattern-matching is on autopilot. The hackathon doesn&apos;t end when
            you stop coding — it ends when you make a fatigued stranger care
            about your project in under three minutes.
          </p>
          <p className="text-[14.5px] leading-[1.75] text-[#2a2a28] max-w-[62ch] mt-3.5">
            A demo isn&apos;t a feature tour. It&apos;s a story arc. Open with the
            problem so the judges feel it. Then show the fix — but only the parts
            that actually matter.{" "}
            <strong className="font-semibold text-g-ink">
              Cut everything else.
            </strong>{" "}
            If your live demo can break, assume it will, and have a 30-second
            recording ready as backup. Own the failure if it happens; judges
            respect composure more than perfection.
          </p>

          <div className="sample-quote">
            &quot;The best demos I&apos;ve ever seen weren&apos;t the most
            technical. They were the ones where, three minutes in, the judges
            leaned forward.&quot;
          </div>

          <div className="mt-7 flex gap-6 items-center flex-wrap">
            {FOOTER_STATS.map((s) => (
              <div
                key={s.label}
                className="text-xs text-g-mid flex items-center gap-1.5"
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

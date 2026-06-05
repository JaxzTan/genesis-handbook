const TOPICS = [
  {
    delay: "d1",
    label: "What is a hackathon and how it's structured",
    icon: (
      <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <line x1="5" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="5" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    delay: "d2",
    label: "Judging criteria and how to think like a judge",
    icon: (
      <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 5.5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    delay: "d3",
    label: "Team management and defining roles",
    icon: (
      <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
        <circle cx="6" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="13" cy="11" r="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 7.5c1.5 0 4 1 4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      </svg>
    ),
  },
  {
    delay: "d4",
    label: "From idea to pitch",
    icon: (
      <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
        <path d="M2 14L6 5l4.5 6.5L13 8l3 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    delay: "d5",
    label: "Tech stacks by role",
    icon: (
      <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
        <polyline points="3,12 7,7 10,10 14,5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="13" width="14" height="2" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    delay: "d5",
    label: "Web3-specific tracks, tooling, and culture",
    icon: (
      <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
        <polygon points="9,2 16,5.5 16,12.5 9,16 2,12.5 2,5.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export function CoveredSlide() {
  return (
    <section id="s6" data-slide-id="6" className="slide bg-g-ink text-white">
      <div
        className="covered-wrap grid items-center"
        style={{ gridTemplateColumns: "1fr 1.3fr", gap: "100px" }}
      >
        <div>
          <h2
            className="em-white fade-up font-bold text-white mb-5"
            style={{ fontSize: "clamp(36px, 4.5vw, 58px)" }}
            dangerouslySetInnerHTML={{
              __html: "Everything that <em>actually</em> matters.",
            }}
          />
          <p className="fade-up d1 text-sm text-white/40 leading-[1.7] max-w-[36ch]">
            Topics evolve each year based on what contributors surface. Year 1 —
            shaped by real experience, not assumptions.
          </p>
        </div>
        <div className="flex flex-col">
          {TOPICS.map((t) => (
            <div key={t.label} className={`topic-row fade-up ${t.delay}`}>
              {t.icon}
              {t.label}
            </div>
          ))}
          <div className="mt-5 font-mono text-[9px] tracking-[0.14em] text-white/70 uppercase">
            Topics evolve each year based on contributor input
          </div>
        </div>
      </div>
    </section>
  );
}

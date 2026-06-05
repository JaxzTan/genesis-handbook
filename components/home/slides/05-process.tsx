const PHASES = [
  {
    num: "01",
    delay: "d1",
    titleHtml: "<em>Map</em> It",
    blurb:
      "Contributors propose topics they believe belong in the guide. Everything is on the table.",
  },
  {
    num: "02",
    delay: "d2",
    titleHtml: "<em>Describe</em> It",
    blurb:
      "Contributors write descriptions for each topic compiled from Phase 1.",
  },
  {
    num: "03",
    delay: "d3",
    titleHtml: "<em>Advise</em> It",
    blurb:
      "For each topic, contributors selectively add their tips, insights, and real-world advice.",
  },
];

export function ProcessSlide() {
  return (
    <section id="s5" data-slide-id="5" className="slide bg-g-off">
      <p className="fade-up text-[15px] text-[#3a3a38] leading-[1.75] max-w-[60ch] mb-[52px]">
        Each year, contributions open to anyone with hackathon experience.
        Together, they write the handbook through three structured phases.
      </p>
      <div className="phases">
        {PHASES.map((p) => (
          <div key={p.num} className={`phase fade-up ${p.delay}`}>
            <div className="font-mono text-[9px] tracking-[0.15em] text-g-mid mb-5">
              Phase {p.num}
            </div>
            <div
              className="em-accent font-serif text-[26px] font-bold mb-3 tracking-[-0.02em]"
              dangerouslySetInnerHTML={{ __html: p.titleHtml }}
            />
            <p className="text-sm leading-[1.7] text-[#555553] max-w-[26ch]">
              {p.blurb}
            </p>
          </div>
        ))}
      </div>
      <p className="fade-up d4 mt-9 text-[13px] text-g-mid leading-[1.65] max-w-[64ch] pl-4 border-l-2 border-g-rule">
        Each phase runs with 3–5 days between them to consolidate. After each
        phase, submissions are reviewed and synthesized by AI into a single,
        balanced unified voice.
      </p>
    </section>
  );
}

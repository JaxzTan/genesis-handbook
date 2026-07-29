const PHASES = [
  {
    num: "01",
    delay: "d1",
    dates: "7-13 Jun",
    titleHtml: "<em>Propose</em> It",
    blurb:
      "Structure first. Contributors lock the topic list: which topics actually matter, what's missing, and what every first-timer needs to know.",
  },
  {
    num: "02",
    delay: "d2",
    dates: "15 Jun-4 Jul",
    titleHtml: "<em>Describe</em> It",
    blurb:
      "The advice. Each locked topic gets the real, tactical tips: the stuff you learned the hard way and wish someone had told you.",
  },
  {
    num: "03",
    delay: "d3",
    dates: "6-11 Jul",
    titleHtml: "The <em>Extras</em>",
    blurb:
      "The fun round. Everything that didn't fit a box: one-liners, do's and don'ts, war stories, and the tool that saved you at 3am.",
  },
  {
    num: "04",
    delay: "d4",
    dates: "13-28 Jul",
    titleHtml: "<em>Finalize</em> It",
    blurb:
      "On the team, not the contributors. Final triage, clean-up, and sign-off, then the handbook goes live on 29 July.",
  },
];

export function ProcessSlide() {
  return (
    <section id="s5" data-slide-id="5" className="slide bg-g-off">
      <p className="fade-up text-[17px] text-[#3a3a38] leading-[1.75] max-w-[60ch] mb-[52px]">
        Each year, contributions open to anyone with hackathon experience.
        Contributors write the handbook through three structured phases, then
        the team finalizes it and publishes.
      </p>
      <div className="phases">
        {PHASES.map((p) => (
          <div key={p.num} className={`phase fade-up ${p.delay}`}>
            <div className="font-mono text-[11px] tracking-[0.15em] text-g-mid mb-5">
              Phase {p.num} · {p.dates}
            </div>
            <div
              className="em-accent font-serif text-[26px] font-bold mb-3 tracking-[-0.02em]"
              dangerouslySetInnerHTML={{ __html: p.titleHtml }}
            />
            <p className="text-[15px] leading-[1.7] text-[#555553] max-w-[26ch]">
              {p.blurb}
            </p>
          </div>
        ))}
      </div>
      <p className="fade-up d4 mt-9 text-[15px] text-g-mid leading-[1.65] max-w-[64ch] pl-4 border-l-2 border-g-rule">
        Every submission runs the same flow: submit (form) → review → clean up
        → publish. The golden rule: humans decide what goes in. Nothing
        reaches the page without a person reading it first.
      </p>
    </section>
  );
}

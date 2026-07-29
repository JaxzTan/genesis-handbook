import { Fragment } from "react";

type FlowColumn = {
  phase: string;
  title: string;
  items: Array<{ label: string; body: React.ReactNode }>;
};

const COLUMNS: FlowColumn[] = [
  {
    phase: "Phase 01 · Propose It",
    title: "Topics Proposed",
    items: [
      {
        label: "Contributor A",
        body: (
          <div className="flow-topic-list">
            <span>Where to find hackathons</span>
            <span>Finding a good team</span>
            <span>Judging criteria</span>
          </div>
        ),
      },
      {
        label: "Contributor B",
        body: (
          <div className="flow-topic-list">
            <span>Roles: who does what</span>
            <span>Time management & deadlines</span>
            <span>Submission criteria</span>
          </div>
        ),
      },
      {
        label: "Contributor C",
        body: (
          <div className="flow-topic-list">
            <span>Brainstorming ideas</span>
            <span>How to pitch</span>
            <span>Tech stack</span>
          </div>
        ),
      },
    ],
  },
  {
    phase: "Phase 02 · Describe It",
    title: "Real Advice Added",
    items: [
      {
        label: 'On "Submission criteria" · Nizar',
        body: '"Always read the judging rubric before writing any code."',
      },
      {
        label: 'On "Time & deadlines" · Nizar',
        body: '"Try to complete a working MVP at least one day before the deadline."',
      },
      {
        label: 'On "Brainstorming ideas" · Hana Tang',
        body: '"Never build a solution looking for a problem."',
      },
    ],
  },
  {
    phase: "Phase 03 · The Extras",
    title: "The Fun Stuff Collected",
    items: [
      {
        label: "One-liner · Hana Tang",
        body: '"Stop trying to write flawless, production-ready enterprise code."',
      },
      {
        label: "Never do this · Gan Jayci",
        body: '"Don\'t overcomplicate the project. Start from the core."',
      },
      {
        label: "Tool drop · Gan Jayci",
        body: '"Trello / Discord, for tracking each member\'s responsibilities."',
      },
    ],
  },
];

export function FlowSlide() {
  return (
    <section id="s7" data-slide-id="7" className="slide bg-g-off">
      <div className="mb-12">
        <h2
          className="em-accent font-bold"
          style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          dangerouslySetInnerHTML={{
            __html: "From raw input<br>to <em>refined</em> guidance.",
          }}
        />
      </div>
      <div className="flow-cols d1">
        {COLUMNS.map((col, idx) => (
          <Fragment key={col.phase}>
            <div className="flow-col bg-white border border-g-rule px-[22px] py-[26px]">
              <div className="font-mono text-[11px] tracking-[0.15em] text-g-accent mb-3 uppercase">
                {col.phase}
              </div>
              <div className="font-serif text-lg font-bold mb-4">
                {col.title}
              </div>
              <div className="flex flex-col gap-2">
                {col.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-g-off border border-g-rule px-3.5 py-2.5"
                  >
                    <span className="font-mono text-[11px] text-g-mid block mb-1.5 uppercase tracking-[0.1em]">
                      {item.label}
                    </span>
                    <div className="text-sm leading-[1.65] text-g-ink">
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {idx < COLUMNS.length - 1 && (
              <div className="flow-arrow flex items-center justify-center pt-[52px] text-g-rule">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10h12M12 6l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="d3 mt-9 px-[22px] py-[18px] bg-g-ink text-white/60 text-[15px] leading-[1.6] flex gap-3.5 items-start max-w-[680px]">
        <span className="text-g-accent flex-shrink-0 mt-0.5">✦</span>
        Every submission is reviewed by a person before it moves on. Accepted
        material is cleaned up, synthesized, and published to the live handbook.
        Humans decide what goes in.
      </div>
    </section>
  );
}

import { Fragment } from "react";

type FlowColumn = {
  phase: string;
  title: string;
  items: Array<{ label: string; body: React.ReactNode }>;
};

const COLUMNS: FlowColumn[] = [
  {
    phase: "Phase 01 · Map It",
    title: "Topics Proposed",
    items: [
      {
        label: "Contributor A",
        body: (
          <div className="flow-topic-list">
            <span>How to find a team</span>
            <span>Judging criteria</span>
            <span>Roles</span>
            <span>Time management</span>
          </div>
        ),
      },
      {
        label: "Contributor B",
        body: (
          <div className="flow-topic-list">
            <span>Team management</span>
            <span>What roles will we need</span>
            <span>Managing deadlines</span>
          </div>
        ),
      },
      {
        label: "Contributor C",
        body: (
          <div className="flow-topic-list">
            <span>Ideation</span>
            <span>Demo day</span>
            <span>Tech stack</span>
          </div>
        ),
      },
    ],
  },
  {
    phase: "Phase 02 · Describe It",
    title: "Descriptions Written",
    items: [
      {
        label: "How to Find a Team",
        body: "Finding a team means more than filling seats. It's about identifying complementary skills, aligning on ambition, and establishing trust fast — ideally before the clock even starts.",
      },
      {
        label: "Managing Roles & Deadlines",
        body: "Without clear ownership, hackathon teams stall. This covers role assignment based on strengths, setting internal milestones, and what to do when someone goes quiet at hour 18.",
      },
      {
        label: "Demo Day",
        body: "Demo day is a performance. Judges are fatigued by demo 10. This covers how to structure your 3 minutes and how to hold the room even when your live demo decides to break.",
      },
    ],
  },
  {
    phase: "Phase 03 · Advise It",
    title: "Real Advice Added",
    items: [
      {
        label: 'On "Find a Team" — 3 contributors',
        body: '"Post in team-finding channels 48h before kickoff, not on the day. Include your stack, timezone, and what you want to build — specificity gets replies. Vague posts get ignored."',
      },
      {
        label: 'On "Roles & Deadlines" — 4 contributors',
        body: '"Set a hard internal deadline 3 hours before submission. The last stretch is for polish only — not new features. Scope creep at hour 20 kills otherwise strong projects."',
      },
      {
        label: 'On "Demo Day" — 3 contributors',
        body: '"Open with the problem, not the solution. Make judges feel the pain before you show the fix. If your live demo might break, have a recording ready and own it upfront."',
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
              <div className="font-mono text-[9px] tracking-[0.15em] text-g-accent mb-3 uppercase">
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
                    <span className="font-mono text-[9px] text-g-mid block mb-1.5 uppercase tracking-[0.1em]">
                      {item.label}
                    </span>
                    <div className="text-xs leading-[1.65] text-g-ink">
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
      <div className="d3 mt-9 px-[22px] py-[18px] bg-g-ink text-white/60 text-[13px] leading-[1.6] flex gap-3.5 items-start max-w-[680px]">
        <span className="text-g-accent flex-shrink-0 mt-0.5">✦</span>
        After each phase, AI synthesizes all contributions into a single balanced
        voice — preserving depth while removing redundancy.
      </div>
    </section>
  );
}

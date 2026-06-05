const COLUMNS = [
  {
    yearLabel: <>Y1</>,
    title: "Lay the Foundation",
    milestones: [
      { delay: "d1", text: "20–30 contributors for the inaugural edition" },
      { delay: "d2", text: "Publish the first edition of Genesis" },
      {
        delay: "d3",
        text: "Promote through hackathon communities to build awareness and grow the contributor base",
      },
      {
        delay: "d4",
        text: "Bring in developers to help maintain and build the platform",
      },
    ],
  },
  {
    yearLabel: (
      <>
        Y2{" "}
        <span className="text-[22px] align-middle tracking-[-0.02em] font-light italic">
          &amp; beyond
        </span>
      </>
    ),
    title: "Grow the Community",
    milestones: [
      {
        delay: "d1",
        text: "Story feed for contributors and participants to share their hackathon experiences",
      },
      { delay: "d2", text: "Voting system introduced across all three phases" },
      { delay: "d3", text: "Platform goes open source" },
    ],
  },
];

export function RoadmapSlide() {
  return (
    <section id="s10" data-slide-id="10" className="slide bg-white">
      <div className="fade-up mb-[52px]">
        <h2
          className="em-accent font-bold"
          style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
          dangerouslySetInnerHTML={{ __html: "Built to <em>last.</em>" }}
        />
      </div>
      <div className="rm-cols">
        {COLUMNS.map((col, i) => (
          <div key={i} className="rm-col">
            <div className="font-serif text-[56px] font-black tracking-[-0.05em] leading-none text-g-ink/30 mb-4">
              {col.yearLabel}
            </div>
            <div className="font-serif text-xl font-bold mb-7 tracking-[-0.02em]">
              {col.title}
            </div>
            <div className="flex flex-col gap-3.5">
              {col.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className={`fade-up ${m.delay} flex gap-3.5 items-start text-sm leading-[1.6] text-[#555553]`}
                >
                  <div className="w-[5px] h-[5px] bg-g-accent rounded-full flex-shrink-0 mt-[7px]" />
                  <span>{m.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

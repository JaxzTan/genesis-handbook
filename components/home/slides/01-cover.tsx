const COVER_PILLS = [
  "Community-vetted",
  "Annually updated",
  "3-phase model",
  "AI-synthesized",
];

export function CoverSlide() {
  return (
    <section
      id="s1"
      data-slide-id="1"
      className="slide bg-g-ink text-white !p-0 !border-b-0"
    >
      <div className="cover-wrap">
        <div
          className="cover-l flex flex-col justify-between"
          style={{
            padding: "64px 5vw 64px 8vw",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70">
            Genesis · 2026 · Annual Hackathon Handbook
          </div>
          <div>
            <h1
              className="cover-h1 font-bold text-white leading-[0.92] tracking-[-0.04em]"
              style={{ fontSize: "clamp(64px, 8.5vw, 120px)" }}
              dangerouslySetInnerHTML={{ __html: "Gene<em>sis</em>" }}
            />
            <p className="text-[13px] text-white/40 leading-relaxed max-w-[38ch] mt-5">
              An Annual Hackathon Handbook, Written by the Community, for the
              Community.
            </p>
          </div>
          <div
            className="pt-6 flex justify-between items-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="font-mono text-[9px] tracking-[0.15em] text-white/20 uppercase">
              genesis - handbook
            </span>
          </div>
        </div>
        <div
          className="cover-r flex flex-col justify-end relative overflow-hidden"
          style={{ padding: "64px 8vw 64px 5vw" }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-120px",
              right: "-120px",
              width: "540px",
              height: "540px",
              background:
                "radial-gradient(circle, rgba(26,86,219,0.22) 0%, transparent 65%)",
            }}
          />
          <p
            className="font-serif italic font-light text-white/50 leading-snug relative z-10"
            style={{ fontSize: "clamp(20px, 2.4vw, 32px)" }}
          >
            No single voice.
            <br />
            No outdated guides.
            <br />
            Just builders,
            <br />
            helping builders.
          </p>
          <div className="flex flex-wrap gap-2 mt-10 relative z-10">
            {COVER_PILLS.map((pill) => (
              <span
                key={pill}
                className="border border-white/20 text-white/55 font-mono text-[9px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

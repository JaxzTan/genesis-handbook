export function ResultSlide() {
  return (
    <section
      id="s9"
      data-slide-id="9"
      className="slide bg-g-accent text-white !border-b-0 items-center text-center"
    >
      <div className="fade-up">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 mb-8">
          The Result
        </div>
        <h2
          className="em-white-bright font-serif font-bold text-white leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: "clamp(56px, 9vw, 130px)" }}
          dangerouslySetInnerHTML={{
            __html: "The Genesis<br><em>Hackathon</em><br>Handbook.",
          }}
        />
        <p className="text-[15px] text-white/70 mt-7 max-w-[50ch] mx-auto">
          Written by the community. For the community. Every year.
        </p>
        <a
          href="#"
          aria-disabled="true"
          className="handbook-cta disabled inline-flex items-center gap-2.5 mt-9 px-6 py-3.5 bg-white text-g-accent text-[13px] font-semibold no-underline transition-opacity duration-200"
        >
          Read Edition 01
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8M8 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/55 mt-4">
          Releasing after Phase 03 closes
        </div>
      </div>
    </section>
  );
}

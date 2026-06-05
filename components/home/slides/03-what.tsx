const FEATURES = [
  {
    delay: "d3",
    title: "Annual",
    blurb: "Always current — never left to go stale",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <rect x="5" y="8" width="30" height="26" rx="3" stroke="#1a56db" strokeWidth="1.4" />
        <line x1="5" y1="15" x2="35" y2="15" stroke="#1a56db" strokeWidth="1.4" />
        <line x1="13" y1="4" x2="13" y2="12" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="27" y1="4" x2="27" y2="12" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="20" cy="25" r="2.5" fill="#1a56db" />
      </svg>
    ),
  },
  {
    delay: "d4",
    title: "Many voices",
    blurb: "Not one person trying to cover everything",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="13" r="5" stroke="#1a56db" strokeWidth="1.4" />
        <circle cx="27" cy="13" r="5" stroke="#1a56db" strokeWidth="1.4" />
        <path d="M4 34c0-5.523 4.477-10 10-10" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M24 34c0-5.523 4.477-10 10-10" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 24a10 10 0 0 1 13 0" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    delay: "d5",
    title: "3 phases",
    blurb: "Structured contribution → unified voice",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <path d="M20 5L36 13L20 21L4 13L20 5Z" stroke="#1a56db" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M4 20L20 28L36 20" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 28L20 36L36 28" stroke="#1a56db" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function WhatSlide() {
  return (
    <section id="s3" data-slide-id="3" className="slide bg-g-off">
      <div
        className="what-wrap grid items-center"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "96px" }}
      >
        <div>
          <h2
            className="em-accent fade-up font-bold mb-7"
            style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
            dangerouslySetInnerHTML={{
              __html:
                'One living,<br><em>community-vetted</em><br>handbook, <span class="text-g-accent">GENESIS</span>',
            }}
          />
        </div>
        <div>
          <p className="fade-up d1 text-[15px] leading-[1.75] text-[#3a3a38]">
            Genesis is an annual hackathon handbook where the community converges
            to architect and compile a definitive guide. Instead of a single
            voice attempting to cover everything, we crowdsource expertise, each
            contributor documenting exactly what they know best.
          </p>
          <p className="fade-up d2 text-[15px] leading-[1.75] text-[#3a3a38] mt-5">
            The result is a resource that&apos;s more comprehensive, balanced,
            and current than any individual could ever produce. It&apos;s updated
            annually, forged from real hackathon experience, and entirely owned
            by the community.
          </p>
          <div className="flex flex-col mt-10">
            {FEATURES.map((s) => (
              <div key={s.title} className={`stat-row fade-up ${s.delay}`}>
                {s.icon}
                <div>
                  <div className="font-serif text-[28px] font-bold text-g-ink tracking-[-0.03em] leading-none">
                    {s.title}
                  </div>
                  <div className="text-xs text-g-mid leading-relaxed mt-1">
                    {s.blurb}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

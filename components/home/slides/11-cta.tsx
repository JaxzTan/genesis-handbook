import { DISCORD_INVITE } from "@/constants/site";

const ROLES = [
  {
    delay: "d2",
    name: "Contributors",
    blurb:
      "Anyone with hackathon experience. You don't need to know everything. You just need to have been there. Pick a task in Discord and submit when you're ready.",
  },
  {
    delay: "d3",
    name: "Committee Members",
    blurb:
      "People who believe in this problem and want to help shape how Genesis grows, operates, and sustains. From designers to developers — DM us in Discord.",
  },
];

export function CtaSlide() {
  return (
    <section
      id="s11"
      data-slide-id="11"
      className="slide bg-g-accent text-white !border-b-0"
    >
      <div className="flex flex-col">
        <div className="flex">
          <div
            className="cta-l pr-20"
            style={{ borderRight: "1px solid rgba(255,255,255,0.14)" }}
          >
            <h2
              className="em-white-bright fade-up font-bold text-white leading-[1.05] mb-6"
              style={{ fontSize: "clamp(36px, 4.5vw, 58px)" }}
              dangerouslySetInnerHTML={{
                __html: "Join the<br><em>build.</em>",
              }}
            />
          </div>
          <div className="cta-r">
            <div
              className="fade-up d1 px-[30px] py-7 mb-9 max-w-[540px]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mb-3.5 flex items-center gap-2.5">
                <span className="live-dot live-dot-green" />
                Open · No application · No filter at the door
              </div>
              <h3
                className="em-white font-serif text-2xl font-bold tracking-[-0.02em] mb-2 text-white"
                dangerouslySetInnerHTML={{
                  __html: "Step <em>one</em> — join Discord.",
                }}
              />
              <p className="text-[13.5px] leading-[1.65] text-white/80 mb-[18px] max-w-[44ch]">
                All contribution tasks live in our Discord. Pick what you want to
                work on, submit when you&apos;re ready. Filtering happens at
                submission review, not at entry.
              </p>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener"
                className="cta-discord-btn inline-flex items-center gap-2.5 px-[22px] py-3 bg-white text-g-accent text-[13px] font-semibold no-underline transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" />
                </svg>
                Join the Genesis Discord
              </a>
            </div>

            <div className="cta-role-wrap flex flex-col">
              {ROLES.map((r) => (
                <div key={r.name} className={`role-block fade-up ${r.delay}`}>
                  <div className="role-name">{r.name}</div>
                  <p className="text-[13px] leading-[1.65] text-white/80 max-w-[42ch] pl-4">
                    {r.blurb}
                  </p>
                </div>
              ))}
            </div>

            <p className="fade-up d4 mt-9 font-serif italic text-[17px] text-white/65 leading-[1.55] max-w-[44ch] font-light">
              &quot;Every hackathon leaves behind knowledge and lessons. Let&apos;s
              build Genesis and put them all in one place.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

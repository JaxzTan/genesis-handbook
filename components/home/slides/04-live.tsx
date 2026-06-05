import Image from "next/image";
import { AnimatedNumber } from "@/components/animated-number";
import { CONTRIBUTE_URL } from "@/constants/site";
import type { Contributor, HandbookStats } from "@/types";

type Props = {
  stats: HandbookStats;
  contributors: Contributor[];
  countersActive: boolean;
};

export function LiveSlide({ stats, contributors, countersActive }: Props) {
  return (
    <section id="s4" data-slide-id="4" className="slide bg-white">
      <div
        className="live-wrap grid items-center"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "80px" }}
      >
        <div className="flex flex-col gap-9">
          <div className="fade-up font-mono text-[10px] tracking-[0.22em] uppercase text-g-accent flex items-center gap-2.5">
            <span className="live-dot" />
            Live · Year 01 · In Progress
          </div>
          <h2
            className="em-accent fade-up d1 font-bold"
            style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
            dangerouslySetInnerHTML={{
              __html: "The handbook is<br>being <em>written.</em><br>Right now.",
            }}
          />
          <div className="live-counter fade-up d2">
            <AnimatedNumber
              target={stats.contributions}
              active={countersActive}
              className="font-serif font-black tracking-[-0.05em] leading-[0.9] text-g-ink tabular-nums text-[clamp(72px,9vw,120px)]"
            />
            <div className="flex flex-col gap-1 pb-2.5">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-g-ink">
                Contributions
              </div>
              <div className="text-xs text-g-mid">
                Across all 3 phases · updated live
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="live-stat fade-up d3">
              <AnimatedNumber
                target={stats.contributors}
                active={countersActive}
                className="font-serif text-[28px] font-bold tracking-[-0.02em]"
              />
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-g-mid mt-0.5">
                Contributors
              </div>
            </div>
            <div className="live-stat fade-up d4">
              <AnimatedNumber
                target={stats.topics}
                active={countersActive}
                className="font-serif text-[28px] font-bold tracking-[-0.02em]"
              />
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-g-mid mt-0.5">
                Topics Mapped
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up d2 relative">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-g-mid mb-5 flex justify-between items-center">
            <span>{"// Contributor Wall"}</span>
            <span className="text-g-ink">
              {stats.contributors} / {stats.capacity}
            </span>
          </div>
          <div className="contrib-mosaic grid grid-cols-8 gap-1.5">
            {Array.from({ length: stats.capacity }, (_, i) => {
              const contributor = contributors[i];

              if (!contributor) {
                return <div key={i} className="contrib-cell empty" />;
              }

              const label = contributor.contributions
                ? `${contributor.name} · ${contributor.contributions} commits`
                : contributor.name;

              return (
                <a
                  key={contributor.id}
                  href={contributor.profileUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="contrib-cell filled cursor-pointer!"
                >
                  {contributor.avatarUrl ? (
                    <Image
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </a>
              );
            })}
          </div>
          <div className="mt-[18px] text-xs text-g-mid flex justify-between">
            <span>Each cell = one contributor</span>
            <a
              href={CONTRIBUTE_URL}
              target="_blank"
              rel="noopener"
              className="text-g-accent no-underline font-medium hover:underline"
            >
              Add yours →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

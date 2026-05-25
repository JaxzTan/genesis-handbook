"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatedNumber } from "@/components/animated-number";
import { NavDots } from "@/components/nav-dots";

const SLIDE_COUNT = 11;
const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "#";
const STATS = { contributions: 0, contributors: 0, topics: 0, capacity: 30 };

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [countersActive, setCountersActive] = useState(false);

  useEffect(() => {
    document
      .getElementById("s1")
      ?.querySelectorAll(".fade-up")
      .forEach((el) => el.classList.add("visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).dataset.slideId;
          if (!id) continue;
          setActiveSlide(Number(id));
          entry.target
            .querySelectorAll(".fade-up")
            .forEach((el) => el.classList.add("visible"));
          if (id === "4") setCountersActive(true);
        }
      },
      { threshold: 0.35 }
    );

    document
      .querySelectorAll<HTMLElement>("[data-slide-id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollToSlide(n: number) {
    document.getElementById(`s${n}`)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <NavDots
        count={SLIDE_COUNT}
        activeSlide={activeSlide}
        onSelect={scrollToSlide}
      />

      {/* S1 — Cover */}
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
              {[
                "Community-vetted",
                "Annually updated",
                "3-phase model",
                "AI-synthesized",
              ].map((pill) => (
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

      {/* S2 — Problem */}
      <section id="s2" data-slide-id="2" className="slide bg-white">
        <div
          className="prob-wrap grid items-start"
          style={{ gridTemplateColumns: "1fr 1.5fr", gap: "100px" }}
        >
          <div>
            <h2
              className="em-mid fade-up font-bold"
              style={{ fontSize: "clamp(38px, 4.5vw, 60px)" }}
              dangerouslySetInnerHTML={{
                __html: "The knowledge <em>exists.</em><br>It's just nowhere.",
              }}
            />
          </div>
          <div className="flex flex-col gap-[22px] pt-1">
            <p className="fade-up d1 text-[#3a3a38] text-[15px] leading-[1.78] max-w-[58ch]">
              We see newcomers show up to hackathons with zero direction. They
              have so many questions, but hackathons are too fast to allow
              that.
            </p>
            <p className="fade-up d2 text-[#3a3a38] text-[15px] leading-[1.78] max-w-[58ch]">
              Most of the guides out there are either outdated, lacking depth,
              or just way too academic. You get the &quot;what,&quot; but never
              the actual &quot;how&quot; and &quot;why&quot;, so you&apos;re
              left scrambling through the real parts on your own.
            </p>
            <p className="fade-up d3 text-[#3a3a38] text-[15px] leading-[1.78] max-w-[58ch]">
              The community has the knowledge, but it&apos;s buried in a
              thousand random conversations with seniors, mentors, and within
              Discord groups. We&apos;re missing a resource that actually
              covers the messy hackathon reality — everything from scrounging
              for a team on Discord at 2:00 AM to surviving the
              &quot;demo-day curse&quot; when your front-end suddenly stops
              talking to the blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* S3 — What is Genesis */}
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
              Genesis is an annual hackathon handbook where the community
              converges to architect and compile a definitive guide. Instead of
              a single voice attempting to cover everything, we crowdsource
              expertise, each contributor documenting exactly what they know
              best.
            </p>
            <p className="fade-up d2 text-[15px] leading-[1.75] text-[#3a3a38] mt-5">
              The result is a resource that&apos;s more comprehensive,
              balanced, and current than any individual could ever produce.
              It&apos;s updated annually, forged from real hackathon
              experience, and entirely owned by the community.
            </p>
            <div className="flex flex-col mt-10">
              {[
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
              ].map((s) => (
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

      {/* S4 — Live counter + contributor mosaic */}
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
                __html:
                  "The handbook is<br>being <em>written.</em><br>Right now.",
              }}
            />
            <div className="live-counter fade-up d2">
              <AnimatedNumber
                target={STATS.contributions}
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
                  target={STATS.contributors}
                  active={countersActive}
                  className="font-serif text-[28px] font-bold tracking-[-0.02em]"
                />
                <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-g-mid mt-0.5">
                  Contributors
                </div>
              </div>
              <div className="live-stat fade-up d4">
                <AnimatedNumber
                  target={STATS.topics}
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
              <span>// Contributor Wall</span>
              <span className="text-g-ink">
                {STATS.contributors} / {STATS.capacity}
              </span>
            </div>
            <div className="contrib-mosaic grid grid-cols-8 gap-1.5">
              {Array.from({ length: STATS.capacity }, (_, i) => {
                const filled = i < STATS.contributors;
                return (
                  <div
                    key={i}
                    className={`contrib-cell ${filled ? "filled" : "empty"}`}
                  >
                    {filled ? String(i + 1).padStart(2, "0") : ""}
                  </div>
                );
              })}
            </div>
            <div className="mt-[18px] text-xs text-g-mid flex justify-between">
              <span>Each cell = one contributor</span>
              <a
                href={DISCORD_INVITE}
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

      {/* S5 — How it's written */}
      <section id="s5" data-slide-id="5" className="slide bg-g-off">
        <p className="fade-up text-[15px] text-[#3a3a38] leading-[1.75] max-w-[60ch] mb-[52px]">
          Each year, contributions open to anyone with hackathon experience.
          Together, they write the handbook through three structured phases.
        </p>
        <div className="phases">
          {[
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
          ].map((p) => (
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

      {/* S6 — What gets covered */}
      <section id="s6" data-slide-id="6" className="slide bg-g-ink text-white">
        <div
          className="covered-wrap grid items-center"
          style={{ gridTemplateColumns: "1fr 1.3fr", gap: "100px" }}
        >
          <div>
            <h2
              className="em-white fade-up font-bold text-white mb-5"
              style={{ fontSize: "clamp(36px, 4.5vw, 58px)" }}
              dangerouslySetInnerHTML={{
                __html: "Everything that <em>actually</em> matters.",
              }}
            />
            <p className="fade-up d1 text-sm text-white/40 leading-[1.7] max-w-[36ch]">
              Topics evolve each year based on what contributors surface. Year
              1 — shaped by real experience, not assumptions.
            </p>
          </div>
          <div className="flex flex-col">
            {[
              {
                delay: "d1",
                label: "What is a hackathon and how it's structured",
                icon: (
                  <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="5" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="5" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                delay: "d2",
                label: "Judging criteria and how to think like a judge",
                icon: (
                  <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M9 5.5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                delay: "d3",
                label: "Team management and defining roles",
                icon: (
                  <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
                    <circle cx="6" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="13" cy="11" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M9 7.5c1.5 0 4 1 4 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5" />
                  </svg>
                ),
              },
              {
                delay: "d4",
                label: "From idea to pitch",
                icon: (
                  <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
                    <path d="M2 14L6 5l4.5 6.5L13 8l3 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                delay: "d5",
                label: "Tech stacks by role",
                icon: (
                  <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
                    <polyline points="3,12 7,7 10,10 14,5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="2" y="13" width="14" height="2" rx="1" fill="currentColor" opacity="0.3" />
                  </svg>
                ),
              },
              {
                delay: "d5",
                label: "Web3-specific tracks, tooling, and culture",
                icon: (
                  <svg className="topic-icon" viewBox="0 0 18 18" fill="none">
                    <polygon points="9,2 16,5.5 16,12.5 9,16 2,12.5 2,5.5" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                ),
              },
            ].map((t) => (
              <div key={t.label} className={`topic-row fade-up ${t.delay}`}>
                {t.icon}
                {t.label}
              </div>
            ))}
            <div className="mt-5 font-mono text-[9px] tracking-[0.14em] text-white/70 uppercase">
              Topics evolve each year based on contributor input
            </div>
          </div>
        </div>
      </section>

      {/* S7 — Phase flow example */}
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
          {(() => {
            const cols: Array<{
              phase: string;
              title: string;
              items: Array<{ label: string; body: React.ReactNode }>;
            }> = [
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
                    body:
                      "Finding a team means more than filling seats. It's about identifying complementary skills, aligning on ambition, and establishing trust fast — ideally before the clock even starts.",
                  },
                  {
                    label: "Managing Roles & Deadlines",
                    body:
                      "Without clear ownership, hackathon teams stall. This covers role assignment based on strengths, setting internal milestones, and what to do when someone goes quiet at hour 18.",
                  },
                  {
                    label: "Demo Day",
                    body:
                      "Demo day is a performance. Judges are fatigued by demo 10. This covers how to structure your 3 minutes and how to hold the room even when your live demo decides to break.",
                  },
                ],
              },
              {
                phase: "Phase 03 · Advise It",
                title: "Real Advice Added",
                items: [
                  {
                    label: 'On "Find a Team" — 3 contributors',
                    body:
                      '"Post in team-finding channels 48h before kickoff, not on the day. Include your stack, timezone, and what you want to build — specificity gets replies. Vague posts get ignored."',
                  },
                  {
                    label: 'On "Roles & Deadlines" — 4 contributors',
                    body:
                      '"Set a hard internal deadline 3 hours before submission. The last stretch is for polish only — not new features. Scope creep at hour 20 kills otherwise strong projects."',
                  },
                  {
                    label: 'On "Demo Day" — 3 contributors',
                    body:
                      '"Open with the problem, not the solution. Make judges feel the pain before you show the fix. If your live demo might break, have a recording ready and own it upfront."',
                  },
                ],
              },
            ];

            return cols.map((col, idx) => (
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
                {idx < cols.length - 1 && (
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
            ));
          })()}
        </div>
        <div className="d3 mt-9 px-[22px] py-[18px] bg-g-ink text-white/60 text-[13px] leading-[1.6] flex gap-3.5 items-start max-w-[680px]">
          <span className="text-g-accent flex-shrink-0 mt-0.5">✦</span>
          After each phase, AI synthesizes all contributions into a single
          balanced voice — preserving depth while removing redundancy.
        </div>
      </section>

      {/* S8 — Sample contribution */}
      <section id="s8" data-slide-id="8" className="slide bg-white">
        <div
          className="sample-head grid items-end mb-14"
          style={{ gridTemplateColumns: "1fr 1fr", gap: "80px" }}
        >
          <h2
            className="em-accent fade-up font-bold"
            style={{ fontSize: "clamp(34px, 4.2vw, 54px)" }}
            dangerouslySetInnerHTML={{
              __html: "What a contribution<br><em>looks like.</em>",
            }}
          />
          <p className="fade-up d1 text-sm leading-[1.75] text-[#3a3a38] max-w-[48ch]">
            A contribution is a small, focused unit — one person sharing one
            thing they know well. Below is a real submission from Phase 02 —
            Describe It, showing exactly what we ask for.
          </p>
        </div>

        <div className="sample-card fade-up d2">
          <div className="sample-meta">
            {[
              { label: "Submitted by", value: "Anonymous Contributor" },
              { label: "Phase", value: "02 — Describe It" },
              { label: "Topic", value: "Demo Day" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid">
                  {m.label}
                </div>
                <div className="text-[13px] text-g-ink font-medium">
                  {m.value}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-g-mid">
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Pitching", "Judges", "Live Demos"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 border border-g-rule rounded-full text-g-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="sample-body">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-g-accent mb-3.5">
              Phase 02 · Describe the Topic
            </div>
            <h3
              className="em-card font-serif text-[28px] font-bold tracking-[-0.02em] mb-[22px]"
              dangerouslySetInnerHTML={{
                __html:
                  "Demo Day is a <em>performance,</em> not a presentation.",
              }}
            />
            <p className="text-[14.5px] leading-[1.75] text-[#2a2a28] max-w-[62ch]">
              By the time judges reach your booth, they&apos;ve already seen
              ten demos. They&apos;re tired, they&apos;re hungry, and their
              pattern-matching is on autopilot. The hackathon doesn&apos;t end
              when you stop coding — it ends when you make a fatigued stranger
              care about your project in under three minutes.
            </p>
            <p className="text-[14.5px] leading-[1.75] text-[#2a2a28] max-w-[62ch] mt-3.5">
              A demo isn&apos;t a feature tour. It&apos;s a story arc. Open
              with the problem so the judges feel it. Then show the fix — but
              only the parts that actually matter.{" "}
              <strong className="font-semibold text-g-ink">
                Cut everything else.
              </strong>{" "}
              If your live demo can break, assume it will, and have a 30-second
              recording ready as backup. Own the failure if it happens; judges
              respect composure more than perfection.
            </p>

            <div className="sample-quote">
              &quot;The best demos I&apos;ve ever seen weren&apos;t the most
              technical. They were the ones where, three minutes in, the judges
              leaned forward.&quot;
            </div>

            <div className="mt-7 flex gap-6 items-center flex-wrap">
              {[
                { value: "312", label: "words" },
                { value: "~2 min", label: "to write" },
                { value: "Submitted via", label: "Google Form" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-xs text-g-mid flex items-center gap-1.5"
                >
                  <strong className="text-g-ink font-semibold">
                    {s.value}
                  </strong>{" "}
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S9 — The handbook */}
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

      {/* S10 — Roadmap */}
      <section id="s10" data-slide-id="10" className="slide bg-white">
        <div className="fade-up mb-[52px]">
          <h2
            className="em-accent font-bold"
            style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
            dangerouslySetInnerHTML={{ __html: "Built to <em>last.</em>" }}
          />
        </div>
        <div className="rm-cols">
          {[
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
          ].map((col, i) => (
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

      {/* S11 — CTA */}
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
                  All contribution tasks live in our Discord. Pick what you
                  want to work on, submit when you&apos;re ready. Filtering
                  happens at submission review, not at entry.
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
                {[
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
                ].map((r) => (
                  <div key={r.name} className={`role-block fade-up ${r.delay}`}>
                    <div className="role-name">{r.name}</div>
                    <p className="text-[13px] leading-[1.65] text-white/80 max-w-[42ch] pl-4">
                      {r.blurb}
                    </p>
                  </div>
                ))}
              </div>

              <p className="fade-up d4 mt-9 font-serif italic text-[17px] text-white/65 leading-[1.55] max-w-[44ch] font-light">
                &quot;Every hackathon leaves behind knowledge and lessons.
                Let&apos;s build Genesis and put them all in one place.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

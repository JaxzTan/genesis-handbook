import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { getContributorStats } from "@/actions/contributors";
import { SiteNav } from "@/components/site-nav";
import { TocHighlighter } from "./toc-highlighter";
import {
  ALWAYS,
  NEVER,
  ONELINERS,
  TIP_COUNT,
  TOOLS,
  TOPICS,
} from "./handbook-data";
import "./handbook.css";

// The handbook has its own visual identity (blue-white), separate from the
// landing deck — so it loads its own fonts, scoped via CSS variables on .hb.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-hb-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const inter = Inter({
  variable: "--font-hb-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-hb-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The Genesis Handbook · v1",
  description:
    "The stuff that actually decides hackathons, written by people who've competed and won.",
};

// Same cadence as the home page: the contributor wall refreshes hourly.
export const revalidate = 3600;

// Fallback avatar colors (template palette), used when a contributor has no
// GitHub avatar.
const AVA_COLORS = ["#2563EB", "#0EA5E9", "#4F46E5"];

function initialsOf(name: string): string {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function HandbookPage() {
  const { stats, contributors } = await getContributorStats();

  const tocSections = [
    ...TOPICS.map((t) => ({ id: t.id, label: t.title, short: t.short })),
    { id: "extras", label: "The Extras", short: "Extras" },
    { id: "wall", label: "Contributors", short: "Contributors" },
  ];

  return (
    <>
      <SiteNav
        variant="light"
        active="handbook"
        menu={{
          label: "On this page",
          items: TOPICS.map((t) => ({ href: `#${t.id}`, label: t.title })),
        }}
      />
      <div
        className={`hb ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
      <TocHighlighter />

      {/* ===================== HERO ===================== */}
      <header className="hero">
        <span className="eyebrow tag">Open · Non-profit · Community-built</span>
        <h1>
          The <span className="g">Genesis</span>
          <br />
          Handbook
        </h1>
        <p className="thesis">
          The stuff that actually decides hackathons, written by people
          who’ve competed and won.
        </p>
        <div className="meta">
          <span>
            <b>{TIP_COUNT}</b> tips
          </span>
          <span>
            <b>{stats.contributors}</b> contributors
          </span>
          <span>
            <b>{TOPICS.length}</b> topics
          </span>
          <span>
            <b>1</b> goal: fewer people lost at their first hackathon
          </span>
        </div>

        {/* the one thing this handbook solves */}
        <div className="keypoint">
          <span className="lbl">Keep this in mind</span>
          <p>
            This handbook solves one thing: the confusion of your first
            hackathon. Most new joiners have no idea how to start or how a
            hackathon actually flows. So the nine topics below run in the
            order a hackathon really happens: find one, build the team, split
            the roles, shape the idea, manage the clock, pick the stack,
            pitch it, submit it, and what to do after. If you&apos;re new,
            start at 01 and read straight down. That is the flow.
          </p>
          <span className="credit">
            Jaxz <span className="role">· co-founder</span>
          </span>
        </div>
      </header>

      {/* ===================== BODY ===================== */}
      <div className="shell">
        {/* SIDEBAR TOC */}
        <nav className="toc" aria-label="On this page">
          <div className="h">On this page</div>
          {TOPICS.map((t) => (
            <a key={t.id} href={`#${t.id}`}>
              {t.title}
            </a>
          ))}
          <div className="sep" />
          <a href="#extras" className="extras">
            The Extras
          </a>
          <a href="#wall">Contributors</a>
        </nav>

        <main>
          {/* mobile TOC */}
          <div className="toc-mobile" aria-label="On this page">
            {tocSections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.short}
              </a>
            ))}
          </div>

          {/* TOPICS */}
          {TOPICS.map((topic, i) => (
            <section key={topic.id} className="topic" id={topic.id}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h2>{topic.title}</h2>
              <p className="desc">{topic.desc}</p>
              {topic.tips.map((tip) => (
                <div key={`${topic.id}-${tip.by}-${tip.text.slice(0, 24)}`} className="tip">
                  <p>{tip.text}</p>
                </div>
              ))}
            </section>
          ))}

          {/* EXTRAS */}
          <section className="extras" id="extras">
            <span className="num mono">✷</span>
            <h2>The Extras</h2>
            <p className="desc">
              The stuff that didn’t fit a box: the hard-won one-liners, the
              do’s and don’ts, the things you only learn at 3am.
            </p>

            <div className="card">
              <div className="k">One-liners you’d tell your past self</div>
              <div className="oneliners">
                {ONELINERS.map((o) => (
                  <div key={o.by + o.text.slice(0, 16)} className="oneliner">
                    <span className="q">{o.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="dodont">
                <div className="col do">
                  <div className="k do">Always</div>
                  <ul className="do">
                    {ALWAYS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="col dont">
                  <div className="k dont">Never</div>
                  <ul className="dont">
                    {NEVER.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="k">Tool &amp; resource drops</div>
              <div className="oneliners">
                {TOOLS.map((t) => (
                  <div key={t.by + t.text.slice(0, 16)} className="oneliner">
                    <span className="q">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTRIBUTORS WALL — same live source as the landing page wall */}
          <section className="wall" id="wall">
            <h2>Contributors</h2>
            <p className="lead">
              Every tip here came from someone who’s been in the arena. This
              handbook is theirs.
            </p>
            <div className="people">
              {contributors.map((c, i) => (
                <a
                  key={c.id}
                  className="person"
                  href={c.profileUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    className="ava"
                    style={
                      c.avatarUrl
                        ? undefined
                        : { background: AVA_COLORS[i % AVA_COLORS.length] }
                    }
                  >
                    {c.avatarUrl ? (
                      <Image
                        src={c.avatarUrl}
                        alt={c.name}
                        width={40}
                        height={40}
                      />
                    ) : (
                      initialsOf(c.name)
                    )}
                  </span>
                  <span className="who">
                    <span className="n">{c.name}</span>
                    <span className="gh">@{c.name}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ===================== FOOTER ===================== */}
      <footer>
        <div className="foot">
          <div className="cta">
            <span className="eyebrow">We’re listening</span>
            <h3>Tell us what to fix.</h3>
            <p>
              Genesis is written by the community. That includes telling us
              what’s missing, confusing, or just wrong. Anonymous is fine.
            </p>
          </div>
          <Link className="btn" href="/feedback">
            Give feedback →
          </Link>
          <div className="legal">
            Genesis Handbook · Open · Non-profit · Built together · Advice is
            contributor-sourced and community-reviewed · Content licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-SA 4.0
            </a>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

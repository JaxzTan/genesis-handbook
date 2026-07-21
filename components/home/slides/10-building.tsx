import Link from "next/link";
import { TOPICS } from "@/app/handbook_v1/handbook-data";

const TOPIC_TIP_COUNT = TOPICS.reduce((sum, t) => sum + t.tips.length, 0);

const ITEMS = [
  {
    delay: "d1",
    status: "Live",
    live: true,
    name: "Edition 01 of the handbook",
    blurb: `The first edition is out: ${TOPIC_TIP_COUNT} real tips across ${TOPICS.length} topics, every one credited to the contributor who lived it.`,
    link: { href: "/handbook_v1", label: "Read it" },
  },
  {
    delay: "d2",
    status: "Live",
    live: true,
    name: "Contributor wall",
    blurb:
      "Synced hourly from GitHub. Every accepted contribution puts a real face on the wall.",
    link: null,
  },
  {
    delay: "d3",
    status: "Live",
    live: true,
    name: "Feedback loop",
    blurb:
      "Reader feedback goes straight into the next review cycle. Edition 02 starts with what you tell us.",
    link: { href: "/feedback", label: "Tell us" },
  },
  {
    delay: "d4",
    status: "In progress",
    live: false,
    name: "Contribution platform",
    blurb:
      "Moving from Google Forms to a built-in submission flow, with voting and a story feed on the roadmap.",
    link: null,
  },
];

export function BuildingSlide() {
  return (
    <section id="s9" data-slide-id="9" className="slide bg-g-off">
      <div
        className="covered-wrap grid items-center"
        style={{ gridTemplateColumns: "1fr 1.3fr", gap: "100px" }}
      >
        <div>
          <div className="fade-up font-mono text-[12px] tracking-[0.2em] uppercase text-g-accent mb-6 flex items-center gap-2.5">
            <span className="live-dot" />
            Now · In the workshop
          </div>
          <h2
            className="em-accent fade-up d1 font-bold mb-6"
            style={{ fontSize: "clamp(38px, 4.8vw, 62px)" }}
            dangerouslySetInnerHTML={{
              __html: "What we're<br>building <em>now.</em>",
            }}
          />
          <p className="fade-up d2 text-[16px] leading-[1.75] text-[#3a3a38] max-w-[46ch]">
            Genesis is more than a document. We&apos;re building the platform
            that keeps it alive: the handbook itself, the live wall behind it,
            and the pipeline that turns community submissions into a published
            edition every year.
          </p>
        </div>
        <div className="flex flex-col">
          {ITEMS.map((item) => (
            <div
              key={item.name}
              className={`fade-up ${item.delay} py-6 border-b border-g-rule first:border-t`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`font-mono text-[11px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${
                    item.live
                      ? "text-green-700 border-green-600/30 bg-green-50"
                      : "text-g-accent border-g-accent/30 bg-blue-50"
                  }`}
                >
                  {item.status}
                </span>
                <span className="font-serif text-[19px] font-bold tracking-[-0.01em] text-g-ink">
                  {item.name}
                </span>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#555553] max-w-[58ch]">
                {item.blurb}
                {item.link && (
                  <>
                    {" "}
                    <Link
                      href={item.link.href}
                      className="text-g-accent font-medium no-underline hover:underline"
                    >
                      {item.link.label} →
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

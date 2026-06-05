export function ProblemSlide() {
  return (
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
            have so many questions, but hackathons are too fast to allow that.
          </p>
          <p className="fade-up d2 text-[#3a3a38] text-[15px] leading-[1.78] max-w-[58ch]">
            Most of the guides out there are either outdated, lacking depth, or
            just way too academic. You get the &quot;what,&quot; but never the
            actual &quot;how&quot; and &quot;why&quot;, so you&apos;re left
            scrambling through the real parts on your own.
          </p>
          <p className="fade-up d3 text-[#3a3a38] text-[15px] leading-[1.78] max-w-[58ch]">
            The community has the knowledge, but it&apos;s buried in a thousand
            random conversations with seniors, mentors, and within Discord
            groups. We&apos;re missing a resource that actually covers the messy
            hackathon reality — everything from scrounging for a team on Discord
            at 2:00 AM to surviving the &quot;demo-day curse&quot; when your
            front-end suddenly stops talking to the blockchain.
          </p>
        </div>
      </div>
    </section>
  );
}

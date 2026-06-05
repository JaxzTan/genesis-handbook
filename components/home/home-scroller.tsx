"use client";

import { useEffect, useState } from "react";
import { NavDots } from "@/components/nav-dots";
import { SLIDE_COUNT } from "@/constants/site";
import type { Contributor, HandbookStats } from "@/types";
import { CoverSlide } from "./slides/01-cover";
import { ProblemSlide } from "./slides/02-problem";
import { WhatSlide } from "./slides/03-what";
import { LiveSlide } from "./slides/04-live";
import { ProcessSlide } from "./slides/05-process";
import { CoveredSlide } from "./slides/06-covered";
import { FlowSlide } from "./slides/07-flow";
import { SampleSlide } from "./slides/08-sample";
import { ResultSlide } from "./slides/09-result";
import { RoadmapSlide } from "./slides/10-roadmap";
import { CtaSlide } from "./slides/11-cta";

type Props = {
  stats: HandbookStats;
  contributors: Contributor[];
};

export function HomeScroller({ stats, contributors }: Props) {
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
      <CoverSlide />
      <ProblemSlide />
      <WhatSlide />
      <LiveSlide
        stats={stats}
        contributors={contributors}
        countersActive={countersActive}
      />
      <ProcessSlide />
      <CoveredSlide />
      <FlowSlide />
      <SampleSlide />
      <ResultSlide />
      <RoadmapSlide />
      <CtaSlide />
    </>
  );
}

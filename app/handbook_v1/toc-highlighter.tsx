"use client";

import { useEffect } from "react";

// Port of the template's active-section script: watches the handbook sections
// and mirrors the visible one onto both TOCs. Renders nothing — the nav markup
// stays server-rendered; this only toggles the `active` class.
export function TocHighlighter() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        ".hb nav.toc a, .hb .toc-mobile a"
      )
    );
    const map: Record<string, HTMLAnchorElement[]> = {};
    for (const a of links) {
      const id = a.getAttribute("href")?.slice(1);
      if (id) (map[id] = map[id] ?? []).push(a);
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".hb section[id]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((a) => a.classList.remove("active"));
          (map[entry.target.id] ?? []).forEach((a) =>
            a.classList.add("active")
          );
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return null;
}

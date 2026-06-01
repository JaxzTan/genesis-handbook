"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  target: number;
  active: boolean;
  durationMs?: number;
  className?: string;
};

export function AnimatedNumber({
  target,
  active,
  durationMs = 1100,
  className,
}: Props) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);

  return <span className={className}>{value}</span>;
}

"use client";

type Props = {
  count: number;
  activeSlide: number;
  onSelect: (slide: number) => void;
};

export function NavDots({ count, activeSlide, onSelect }: Props) {
  return (
    <nav className="nav-dots fixed right-7 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50">
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Go to slide ${n}`}
          className={`nav-dot${n === activeSlide ? " active" : ""}`}
          onClick={() => onSelect(n)}
        />
      ))}
    </nav>
  );
}

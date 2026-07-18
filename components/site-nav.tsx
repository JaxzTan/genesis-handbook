import Image from "next/image";
import Link from "next/link";

type Section = { href: string; label: string };

type Props = {
  // "dark" sits on the ink-colored deck (home); "light" on white pages.
  variant: "dark" | "light";
  active: "home" | "handbook" | "feedback";
  // Optional "On this page" dropdown (right side) for in-page section links.
  menu?: { label: string; items: Section[] };
};

const PAGES = [
  { href: "/", label: "Home", key: "home" },
  { href: "/handbook_v1", label: "Handbook v1", key: "handbook" },
  { href: "/feedback", label: "Feedback", key: "feedback" },
] as const;

export function SiteNav({ variant, active, menu }: Props) {
  const dark = variant === "dark";

  const barClass = dark
    ? "bg-g-ink/85 border-white/10 text-white"
    : "bg-white/85 border-g-rule text-g-ink";
  const menuTriggerClass = dark
    ? "text-white/60 hover:text-white"
    : "text-g-mid hover:text-g-ink";
  const pageClass = (isActive: boolean) =>
    isActive
      ? dark
        ? "text-white border-white/40"
        : "text-g-accent border-g-accent"
      : dark
        ? "text-white/70 border-white/15 hover:text-white hover:border-white/40"
        : "text-g-mid border-g-rule hover:text-g-accent hover:border-g-accent";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] h-14 border-b backdrop-blur-md ${barClass}`}
    >
      <nav
        aria-label="Site"
        className="h-full max-w-[1400px] mx-auto px-5 md:px-8 flex items-center gap-6"
      >
        <Link
          href="/"
          className="flex items-center gap-3 no-underline shrink-0"
          aria-label="Genesis home"
        >
          <Image
            src="/genesishandbook_logo.png"
            alt="Genesis logo"
            width={30}
            height={30}
            className="rounded-md"
            priority
          />
          <span
            className={`font-serif text-[17px] font-bold tracking-[-0.02em] ${
              dark ? "text-white" : "text-g-ink"
            }`}
          >
            Genesis
          </span>
        </Link>

        {/* Page links sit on the left, next to the logo. */}
        <div className="flex items-center gap-2.5">
          {PAGES.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              aria-current={p.key === active ? "page" : undefined}
              className={`font-mono text-[12px] tracking-[0.1em] uppercase no-underline border rounded-full px-3.5 py-1.5 transition-colors ${pageClass(
                p.key === active
              )}`}
            >
              {p.label}
            </Link>
          ))}
        </div>

        {/* In-page sections live in a dropdown on the right. */}
        {menu && menu.items.length > 0 && (
          <details className="relative ml-auto">
            <summary
              className={`list-none [&::-webkit-details-marker]:hidden cursor-pointer select-none flex items-center gap-1.5 font-mono text-[12px] tracking-[0.12em] uppercase transition-colors ${menuTriggerClass}`}
            >
              {menu.label}
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 4.5l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div
              className={`absolute right-0 top-full mt-3 w-80 max-h-[70vh] overflow-y-auto rounded-xl border shadow-xl py-2 ${
                dark
                  ? "bg-g-ink border-white/15"
                  : "bg-white border-g-rule shadow-black/10"
              }`}
            >
              {menu.items.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-5 py-2.5 text-[14px] leading-snug no-underline transition-colors ${
                    dark
                      ? "text-white/75 hover:text-white hover:bg-white/10"
                      : "text-g-ink/80 hover:text-g-accent hover:bg-g-off"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] mr-2.5 ${
                      dark ? "text-white/40" : "text-g-mid"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        )}
      </nav>
    </header>
  );
}

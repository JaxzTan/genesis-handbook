import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin — Genesis",
  // Keep the login page out of search results and AI crawlers.
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh bg-g-off flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[440px]">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-g-mid hover:text-g-ink no-underline transition-colors"
        >
          ← Genesis
        </Link>

        <div className="mt-6 mb-9">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-g-accent mb-4">
            Restricted
          </div>
          <h1
            className="font-serif font-bold text-g-ink leading-[1.0] tracking-[-0.03em] em-mid"
            style={{ fontSize: "clamp(34px, 5vw, 48px)" }}
            dangerouslySetInnerHTML={{ __html: "Admin <em>access.</em>" }}
          />
          <p className="text-[15px] text-g-mid leading-relaxed max-w-[46ch] mt-5">
            Sign in to read what the community sent through the feedback form.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

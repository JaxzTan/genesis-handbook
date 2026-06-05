import type { Metadata } from "next";
import Link from "next/link";
import { FeedbackForm } from "@/components/feedback/feedback-form";

export const metadata: Metadata = {
  title: "Feedback — Genesis",
  description: "Tell us what to improve in the Genesis hackathon handbook.",
};

export default function FeedbackPage() {
  return (
    <main className="min-h-dvh bg-g-off flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[640px]">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-g-mid hover:text-g-ink no-underline transition-colors"
        >
          ← Genesis
        </Link>

        <div className="mt-6 mb-9">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-g-accent mb-4">
            We&apos;re listening
          </div>
          <h1
            className="font-serif font-bold text-g-ink leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
            dangerouslySetInnerHTML={{ __html: "Tell us what to <em>fix.</em>" }}
          />
          <p className="text-[15px] text-g-mid leading-relaxed max-w-[52ch] mt-5">
            Genesis is written by the community — that includes telling us what&apos;s
            missing, confusing, or just wrong. Anonymous is fine.
          </p>
        </div>

        <FeedbackForm />
      </div>
    </main>
  );
}

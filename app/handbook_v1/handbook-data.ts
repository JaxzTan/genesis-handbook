// Handbook v1 content — compiled from the real Phase 2 & Phase 3 submissions
// (Google Sheets exports). Some source cells were clipped in the PDF export;
// those entries are trimmed to their last clean sentence. Edit freely here —
// the page and the hero tip-count derive from these arrays.

export type HbTip = { text: string; by: string };

export type HbTopic = {
  id: string;
  short: string; // mobile TOC label
  title: string;
  desc: string;
  tips: HbTip[];
};

export const FEATURED = {
  label: "Featured tip · Submission criteria",
  text: "Always read the judging rubric before writing any code.",
  by: "Nizar",
  role: "contributor",
};

export const TOPICS: HbTopic[] = [
  {
    id: "find",
    short: "Find",
    title: "Where to find quality hackathons",
    desc: "The good ones don't always find you. Know where the community actually posts them.",
    tips: [
      { text: "Devpost, DoraHacks, LinkedIn, Instagram.", by: "Hana Tang" },
      {
        text: "Devfolio — and follow your uni's social media and clubs.",
        by: "Yap Hao Jian",
      },
      {
        text: "Can't go wrong with HackathonKaki on Facebook. More recent years, the AI trifecta in Malaysia: AISEA (good mix of technical and non-technical), AI Tinkerers, and Build with AI (caters to more non-technical folks).",
        by: "Kevin Loh",
      },
      {
        text: "RedNote tech groups, and subscribe to each community you find.",
        by: "Jaxz Tan",
      },
      { text: "Instagram.", by: "Koh Yi Jay" },
    ],
  },
  {
    id: "team",
    short: "Team",
    title: "Finding a good team",
    desc: "The right team is built, not found — and usually before the event starts.",
    tips: [
      {
        text: "I'd say finding a truly good team is very hard — treat it as its own task, not an afterthought.",
        by: "Ethan Law",
      },
      {
        text: "Usually I ask the friends around me, because I already know if they've joined a few hackathons before.",
        by: "Jaxz Tan",
      },
      { text: "Asking around and word of mouth.", by: "Koh Yi Jay" },
      {
        text: "A team is like a fully built piece of art — every member matters.",
        by: "Yap Hao Jian",
      },
    ],
  },
  {
    id: "roles",
    short: "Roles",
    title: "Roles in a team — who does what",
    desc: "Decide who owns what on day one, so nobody's stepping on toes at hour 20.",
    tips: [
      {
        text: "Everyone discusses the idea together. Then: the Designer — UI/UX is very important; the Dev(s) — one or two depending on scope; the Pitcher — owns the slide deck and the video.",
        by: "Hana Tang",
      },
      { text: "Always assign clear ownership from the start.", by: "Nizar" },
      {
        text: "Product lead handles product logic. Business team deals with finance and pitching. Technical team does the prototype.",
        by: "Koh Yi Jay",
      },
      {
        text: "Front end, back end — and for web3, someone who understands contracts. A designer is a plus, unless it's a design hackathon. Pitch-and-demo people, plus an admin role. Sometimes a member juggles between roles.",
        by: "Yap Hao Jian",
      },
      { text: "Choose a good presenter to pitch.", by: "Ethan Law" },
    ],
  },
  {
    id: "ideas",
    short: "Ideas",
    title: "Brainstorming ideas",
    desc: "Where the problem comes from decides how good the idea is.",
    tips: [
      {
        text: "Never build a solution looking for a problem.",
        by: "Hana Tang",
      },
      {
        text: "Stay up to current trends, and talk to more friends.",
        by: "Ethan Law",
      },
      {
        text: "Pick an issue you face every day or frequently — and better not a 0-to-1 issue that needs everything built up from scratch.",
        by: "Jaxz Tan",
      },
    ],
  },
  {
    id: "time",
    short: "Time",
    title: "Time management & deadlines",
    desc: "Work backward from submission, not forward from now. The clock is the real judge.",
    tips: [
      {
        text: "Figure out the timeline first — don't rush. Hour 0–4: pick an idea and stick to it, zero pivots. Hour 4–12: the designer does wireframes. Hour 12–24: core feature development. Hour 24–30: stop adding features, start integrating. Hour 30–36: bug fixing, UI polishing, recording.",
        by: "Hana Tang",
      },
      {
        text: "Try to complete a working MVP at least one day before the deadline.",
        by: "Nizar",
      },
      {
        text: "Don't do things perfectly, and skip the “nice to have” bonus features. Lay down the core features and build from those. Skip manual boilerplate — use AI like Claude. Start the pitch deck and demo ASAP, not on the last day. Set a target for every member, and always update the group on what you've done.",
        by: "Yap Hao Jian",
      },
      {
        text: "The team lead needs to plan well — list things down as clearly as possible so everyone knows what to pick up.",
        by: "Jaxz Tan",
      },
      {
        text: "Split tasks with the help of each individual's skill sets.",
        by: "Koh Yi Jay",
      },
      { text: "Managing expectations is the key here.", by: "Ethan Law" },
    ],
  },
  {
    id: "stack",
    short: "Stack",
    title: "Tech stack & frameworks",
    desc: "Boring and familiar beats shiny and new. At 3am, you want tools you already know.",
    tips: [
      {
        text: "Frontend: Next.js (React), shadcn, Tailwind. Backend: TypeScript, Node.js or Python (FastAPI). DB: Supabase or Firebase — which also give you auth. AI if necessary: connect to LLM APIs. Deployment: Vercel for the frontend.",
        by: "Hana Tang",
      },
      {
        text: "Always use technologies your team already knows.",
        by: "Nizar",
      },
      {
        text: "Claude — CLI and agent — plus Figma for design. You can use AI for each part you're developing.",
        by: "Jaxz Tan",
      },
      {
        text: "Next.js with Supabase as the backend really streamlines everything.",
        by: "Koh Yi Jay",
      },
      {
        text: "For Ethereum: Scaffold-ETH — you can set it up fast.",
        by: "Yap Hao Jian",
      },
    ],
  },
  {
    id: "pitch",
    short: "Pitch",
    title: "How to pitch",
    desc: "The build gets you to the table. The pitch wins the round.",
    tips: [
      {
        text: "Honestly, pitching is the most important and hardest part.",
        by: "Ethan Law",
      },
      {
        text: "Hook the audience, and practice the verbal pitch — full runs, not fragments.",
        by: "Hana Tang",
      },
      {
        text: "Always practice the demo repeatedly, until everything is smooth.",
        by: "Nizar",
      },
      {
        text: "Practice at least 5 times before the pitch — and plan time for it, because you need time to memorise. Just don't practice when it's very close to the pitching session.",
        by: "Jaxz Tan",
      },
      {
        text: "Just try your best to understand your product.",
        by: "Koh Yi Jay",
      },
    ],
  },
  {
    id: "submission",
    short: "Submit",
    title: "Submission criteria",
    desc: "Most hackathons are judged on what you hand in. Treat the submission like a feature.",
    tips: [
      {
        text: "Always read the judging rubric before writing any code.",
        by: "Nizar",
      },
      {
        text: "1. The GitHub repo — make sure it's public, and clean. 2. Pitch deck: your Canva link and/or slides in PDF. 3. Pitch video: a brief explanation of the problem statement. 4. Executive summary: a 50-word version.",
        by: "Hana Tang",
      },
      {
        text: "A 3–5 min pitch or video plus 5 min Q&A. A prototype — a complete product showcase — some photos of the product, a short introduction and description, and a README in the repo that tells the whole story.",
        by: "Jaxz Tan",
      },
      {
        text: "Product works, business logic, problem statement.",
        by: "Koh Yi Jay",
      },
      {
        text: "The app demo: either live, or a repo people can run.",
        by: "Yap Hao Jian",
      },
      {
        text: "The usual stuff: make a really nice README.",
        by: "Ethan Law",
      },
    ],
  },
  {
    id: "after",
    short: "After",
    title: "What to do after the hackathon",
    desc: "Win or lose, the hackathon isn't over when the demo ends.",
    tips: [
      {
        text: "If you win: sleep, reflect, and join the next one.",
        by: "Ethan Law",
      },
      {
        text: "Hold a short retrospective with your team.",
        by: "Nizar",
      },
      {
        text: "Celebration — maybe a meal hahaha. And find a reflection form template for everyone to fill up.",
        by: "Jaxz Tan",
      },
      {
        text: "Basically for my case, we just hang out.",
        by: "Hana Tang",
      },
      {
        text: "Haidilao or Din Tai Fung, if you guys won.",
        by: "Yap Hao Jian",
      },
      { text: "Food.", by: "Koh Yi Jay" },
    ],
  },
];

// ---- The Extras (Phase 3) ----

export const ONELINERS: HbTip[] = [
  {
    text: "“Stop trying to write flawless, production-ready enterprise code.”",
    by: "Hana Tang",
  },
  {
    text: "“Brainstorm your idea early, and pick one that's solving a real problem.”",
    by: "Gan Jayci",
  },
  {
    text: "“Know what your teammates can do — team split is everything.”",
    by: "Jaxz",
  },
];

export const ALWAYS: string[] = [
  "Keep a working, live production URL",
  "Discuss the final result you want with the team first",
  "Discuss the topic and timeline before you build",
];

export const NEVER: string[] = [
  "Introduce a completely new feature last minute",
  "Overcomplicate the project — start from the core",
  "Push your API key into a public repo. PLS.",
];

export const TOOLS: HbTip[] = [
  { text: "Supabase / Firebase — for speedy DB and auth.", by: "Hana Tang" },
  {
    text: "Trello / Discord — for tracking each member's responsibilities.",
    by: "Gan Jayci",
  },
];

// Every advice entry on the page, for the hero counter.
export const TIP_COUNT =
  TOPICS.reduce((sum, t) => sum + t.tips.length, 0) +
  ONELINERS.length +
  ALWAYS.length +
  NEVER.length +
  TOOLS.length;

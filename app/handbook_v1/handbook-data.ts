// Handbook v1 content — the real Phase 2 & Phase 3 contributor submissions,
// cleaned up and expanded into short paragraphs for first-timers. Each tip keeps
// its original author; the wording is filled out from the fuller source answers.
// Edit freely here — the page and the hero tip-count derive from these arrays.

export type HbTip = { text: string; by: string };

export type HbTopic = {
  id: string;
  short: string; // mobile TOC label
  title: string;
  desc: string;
  tips: HbTip[];
};

export const TOPICS: HbTopic[] = [
  {
    id: "find",
    short: "Find",
    title: "Where to find quality hackathons",
    desc: "The good ones don't always find you. Know where the community actually posts them.",
    tips: [
      {
        text: "Start with the platforms built for this: Devpost lists upcoming hackathons and lets teams submit their projects, and DoraHacks does the same with a focus on blockchain events. Make an account and browse what's open — but don't stop there, because a lot of hackathons are announced only on LinkedIn and Instagram.",
        by: "Hana Tang",
      },
      {
        text: "Devfolio is another board worth an account — same idea, organizers list events and teams submit there. Beyond the platforms, follow your university's official accounts, tech clubs, and local tech communities, since many campus and community hackathons are only ever posted on their socials.",
        by: "Yap Hao Jian",
      },
      {
        text: "In Malaysia you can't go wrong with HackathonKaki, a Facebook group where the community shares almost every local hackathon. In recent years the AI communities have become reliable too: AISEA runs a good mix of technical and non-technical events, AI Tinkerers hosts builder-focused meetups, and Build with AI caters to people just getting started.",
        by: "Kevin Loh",
      },
      {
        text: "If you read Chinese, tech groups on RedNote (Xiaohongshu) share events regularly. Whatever you find, subscribe to the organizers and communities you like — good organizers tend to run events again, so following them means you never run out of options.",
        by: "Jaxz Tan",
      },
      {
        text: "Instagram — plenty of events surface there first. And look past the poster: the prize money isn't what makes a hackathon 'quality'. Check who's organizing it, who's judging, and whether past participants say good things.",
        by: "Koh Yi Jay",
      },
    ],
  },
  {
    id: "team",
    short: "Team",
    title: "Finding a good team",
    desc: "The right team is built, not found, and usually before the event starts.",
    tips: [
      {
        text: "Honest truth: finding a truly good team is very hard, and it usually takes a few hackathons before you find people you click with. So don't panic if your first team is messy — that's normal, and it's how everyone starts. Treat team-building as its own task, not an afterthought.",
        by: "Ethan Law",
      },
      {
        text: "The most reliable method is just asking around. I usually ask friends and coursemates first, because I already know their skills and working style, and whether they've done a few hackathons before. Word of mouth beats any matching app.",
        by: "Jaxz Tan",
      },
      {
        text: "Asking around and word of mouth. If you're searching among strangers, prefer people who've already joined a few hackathons — they understand the pace and the pressure. When you recruit online through LinkedIn, be specific: post your tech stack and timezone, because specific posts get replies while vague 'looking for team!' ones get ignored.",
        by: "Koh Yi Jay",
      },
      {
        text: "A team is like a fully built piece of art — every member is a piece that has to fit with the others, not just a collection of individually talented people. Choose teammates for complementary skills and attitude, not raw talent: one calm, reliable person at 3am is worth more than a brilliant one who disappears.",
        by: "Yap Hao Jian",
      },
    ],
  },
  {
    id: "roles",
    short: "Roles",
    title: "Roles in a team: who does what",
    desc: "Decide who owns what on day one, so nobody's stepping on toes at hour 20.",
    tips: [
      {
        text: "Before anything gets built, everyone discusses the idea together — ideation is a team sport. After that a typical team splits into clear roles: the Designer owns UI/UX (how the app looks and feels), which matters more than beginners think because judges see your screens before your code; the Dev(s), one or two depending on scope, build the frontend and backend; and the Pitcher owns the slide deck, the demo video, and the presentation itself.",
        by: "Hana Tang",
      },
      {
        text: "Whatever the structure, assign clear ownership from the start. Every task should have exactly one name attached to it, so nothing falls into the gap of 'I thought you were doing that'.",
        by: "Nizar",
      },
      {
        text: "For bigger or more specialized teams, split it out: a product lead handles product logic and direction, a business person handles the financial story and pitching angle, and a technical team builds the prototype.",
        by: "Koh Yi Jay",
      },
      {
        text: "You'll want frontend, backend, and — for a web3 hackathon — someone who understands smart contracts (programs that run on a blockchain). A designer is a plus unless it's a design hackathon, and don't forget the underrated admin role that handles registrations, submissions, and deadlines. Sometimes one member juggles two roles, and that's fine.",
        by: "Yap Hao Jian",
      },
      {
        text: "Choose your best speaker as the presenter early, so they have time to practice instead of being volunteered at the last minute.",
        by: "Ethan Law",
      },
    ],
  },
  {
    id: "ideas",
    short: "Ideas",
    title: "Brainstorming ideas",
    desc: "Where the problem comes from decides how good the idea is.",
    tips: [
      {
        text: "The golden rule: never build a solution looking for a problem. Start from a real problem — ideally one you or the people around you face often — and only then reach for technology. Judges can smell a project that exists just to show off a tool, and it rarely wins.",
        by: "Hana Tang",
      },
      {
        text: "Stay up to date with current trends, and talk to more people — friends, seniors, people in other industries. Make brainstorming a genuine team effort where everyone throws in ideas before you commit, because this is the most important stage of the whole hackathon.",
        by: "Ethan Law",
      },
      {
        text: "Pick an issue you face every day or frequently, and avoid 'zero to one' problems — ideas so new you'd have to first convince the judges the problem even exists. In a five-minute pitch you don't have time to build that context; pick something they already recognize, then show a sharper solution. Don't start coding until the idea is solid.",
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
        text: "Don't rush into coding — figure out the timeline first, even though it feels like wasted time. A rough 36-hour plan: Hours 0–4, pick an idea and stick to it with zero pivots (a pivot means changing your idea midway, which quietly kills more teams than bad code does). Hours 4–12, the designer draws wireframes (rough screen sketches) while the devs set up the project skeleton. Hours 12–24, build core features at full speed. Hours 24–30, stop adding features and start integrating. Hours 30–36, fix bugs, polish the UI, and record the demo.",
        by: "Hana Tang",
      },
      {
        text: "Aim to complete a working MVP — the Minimum Viable Product, the simplest version of your idea that actually works — at least one day before the deadline, leaving the rest for polish and the demo.",
        by: "Nizar",
      },
      {
        text: "Don't try to do things perfectly, and skip anything that's merely 'nice to have' — lay down the core features and build from those. Skip writing boilerplate by hand and let AI like Claude generate it. Start the pitch deck and demo early, not on the last day, set a clear target for every member, and always update the group on what you've finished.",
        by: "Yap Hao Jian",
      },
      {
        text: "Someone — usually the team lead — needs to own the plan and list every task as clearly as possible, so everyone knows exactly what they're responsible for. Don't over-detail up front: split by big areas first (frontend, APIs and middleware, database, repo and admin, web3 if needed), then let each member break their own area down.",
        by: "Jaxz Tan",
      },
      {
        text: "Split tasks around each person's actual skill set, not evenly — the goal is that everyone's working on what they're fastest at.",
        by: "Koh Yi Jay",
      },
      {
        text: "Managing expectations is the key here: a hackathon rewards a finished, working slice, not an ambitious half-built one.",
        by: "Ethan Law",
      },
    ],
  },
  {
    id: "stack",
    short: "Stack",
    title: "Tech stack & frameworks",
    desc: "Boring and familiar beats shiny and new. At 3am, you want tools you already know.",
    tips: [
      {
        text: "For a proven default web stack: frontend in Next.js (a React framework), styled with Tailwind CSS and shadcn/ui for ready-made components. Backend in TypeScript with Node.js, or Python with FastAPI — both beginner-friendly and well documented. Database on Supabase or Firebase, which hand you auth (login and accounts) out of the box. Add AI by connecting to LLM APIs instead of building from scratch, and deploy the frontend on Vercel.",
        by: "Hana Tang",
      },
      {
        text: "Unless the hackathon requires a specific technology, always use technologies your team already knows. A hackathon is the worst time to learn a new framework — every hour spent reading documentation is an hour not spent building.",
        by: "Nizar",
      },
      {
        text: "Use AI aggressively: Claude in the browser, the Claude CLI (the command-line version that works inside your codebase), and agents can generate code for every part you're developing. Use Figma for your wireframes and UI design.",
        by: "Jaxz Tan",
      },
      {
        text: "Next.js with Supabase as the backend really streamlines everything — you get the frontend framework and a database-plus-auth backend without gluing much together yourself.",
        by: "Koh Yi Jay",
      },
      {
        text: "Building on Ethereum? Scaffold-ETH gives you a ready-made project template, so you can set up in minutes instead of hours.",
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
        text: "Honestly, pitching is the most important and hardest part of a hackathon — plenty of technically weaker projects beat stronger ones purely by telling a better story. Judges are human; they remember how your pitch made them feel, not your file structure. Accept early that presentation is half the competition.",
        by: "Ethan Law",
      },
      {
        text: "Hook the audience in the first thirty seconds with the problem, then show — don't just describe — your solution. Practice the verbal pitch as full runs, not fragments; repetition is what turns nervous rambling into a confident story.",
        by: "Hana Tang",
      },
      {
        text: "Practice the live demo repeatedly until every click is muscle memory, because demos love to break exactly when the judges are watching.",
        by: "Nizar",
      },
      {
        text: "Practice at least five times before the pitch and plan that time into your schedule, because you need it to memorise. Just don't practice right before the pitching session — walking in flustered is worse than walking in slightly less rehearsed.",
        by: "Jaxz Tan",
      },
      {
        text: "Just try your best to genuinely understand your product. The QnA (the question round after your pitch) is where judges probe, and confident answers there win as many points as the pitch itself.",
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
        text: "Before you write any code, read the judging rubric — the scoring sheet that tells you exactly how points are awarded — and shape your work around it.",
        by: "Nizar",
      },
      {
        text: "Most hackathons ask for the same package, so treat it like a checklist: 1) a GitHub repo, set to public and kept clean, because judges can't grade what they can't open; 2) a pitch deck, as a Canva link and/or a PDF; 3) a pitch video briefly explaining the problem statement; 4) an executive summary, a roughly 50-word description of the project.",
        by: "Hana Tang",
      },
      {
        text: "Expect a 3–5 minute pitch or video plus around 5 minutes of Q&A. Round it out with a prototype or complete product showcase, a few photos of the product, a short intro and description, and a README in the repo that tells the whole story.",
        by: "Jaxz Tan",
      },
      {
        text: "In the end, judges are checking three things: the product works, the business logic makes sense, and the problem statement is clear.",
        by: "Koh Yi Jay",
      },
      {
        text: "For the demo itself: either a live working product, or at minimum a repo people can clone and run themselves.",
        by: "Yap Hao Jian",
      },
      {
        text: "The usual stuff — but make a really nice README. It's the front page of your repo and part of the product, not an afterthought: what problem it solves, how it works, and how to run it.",
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
        text: "Win or lose, the loop is the same: sleep, reflect, and join the next one. Hackathons are more about the growth and the people than the trophy, so a loss just means resting and going again.",
        by: "Ethan Law",
      },
      {
        text: "Once you've recovered, hold a short retrospective — a structured look at what went well, what went badly, and what to change next time. Fifteen honest minutes beats five more hackathons run on autopilot.",
        by: "Nizar",
      },
      {
        text: "First, celebrate — maybe a meal together, hahaha. Then find a reflection form template online and have everyone fill it in, so the quieter teammates get heard too.",
        by: "Jaxz Tan",
      },
      {
        text: "Basically, in my case, we just hang out. The after-party is where the real networking happens — talk to other teams, mentors, and judges, because those connections often outlast the project.",
        by: "Hana Tang",
      },
      {
        text: "Haidilao or Din Tai Fung, if you guys won.",
        by: "Yap Hao Jian",
      },
      {
        text: "Food. Win or lose, you just survived an intense weekend — go get a proper meal together first.",
        by: "Koh Yi Jay",
      },
    ],
  },
];

// ---- The Extras (Phase 3) ----

export const ONELINERS: HbTip[] = [
  {
    text: "“Stop trying to write flawless, production-ready code — a hackathon rewards a working demo, not engineering perfection.”",
    by: "Hana Tang",
  },
  {
    text: "“Brainstorm your idea early, and pick one that's solvable within the weekend — not the most impressive one, the most finishable one.”",
    by: "Gan Jayci",
  },
  {
    text: "“Know what your teammates can do. Team split is everything.”",
    by: "Jaxz Tan",
  },
];

export const ALWAYS: string[] = [
  "Keep a working, live production URL ready well before the deadline — not a 'works on my laptop' version.",
  "Agree with the team on what the final result should look like before you split the work.",
  "Discuss the topic and timeline before anyone writes a line of code.",
];

export const NEVER: string[] = [
  "Introduce a completely new feature at the last minute — it won't be tested and it'll break in the demo.",
  "Overcomplicate the project. Start from the real problem and build the simplest thing that solves it.",
  "Push your API key into a public repo. PLS — bots find it within minutes and rack up bills on your account.",
];

export const TOOLS: HbTip[] = [
  {
    text: "Supabase / Firebase — a database plus user login (auth) out of the box, which saves hours of backend setup.",
    by: "Hana Tang",
  },
  {
    text: "Trello / Discord — a visual task board and the team's group chat; together they track who owns what so nothing slips through the cracks.",
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

import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "freshergo",
    slug: "freshergo",
    title: "FresherGo",
    year: "2026",
    role: "Founder · Product & Engineering",
    metric: "12k+ visitors / month",
    summary:
      "Entry-level tech jobs platform with verified fresher, internship, and remote roles pulled from official company pages—driving 12k+ monthly visitors.",
    problem:
      "Early-career candidates waste time on spammy boards, reposts, and roles that never existed. “Entry-level” listings often hide 3+ years of experience, and many links lead to dead or third-party scrapes—not the company’s own careers page.",
    approach:
      "Built FresherGo as a product for freshers first: index openings that map to 0–2 years, internships, and remote tracks; prefer apply paths that land on official company pages; and make search by role, location, and remote the default happy path—not a dump of every job on the internet.",
    uniqueness:
      "Verification and freshness over inventory size. The product is tuned for entry-level discovery (filters, role hubs, company pages) with SEO that compounds organic traffic instead of paid acquisition alone.",
    outcome:
      "A live platform at freshergo.com with thousands of open roles, weekly new listings, and sustained organic demand—over 12k visitors per month without treating the site as a throwaway side project.",
    impact: [
      "Over 12,000 visitors per month",
      "1,600+ open roles indexed with fresher / internship / remote focus",
      "Apply paths oriented to official company pages, not dead scrapes",
      "Role and company hubs that compound organic search traffic",
    ],
    process: [
      {
        title: "Name the job-to-be-done",
        body: "Freshers need trustworthy entry-level roles fast—not another generic board. Scoped to tech-adjacent openings with clear experience bands and remote/internship paths.",
      },
      {
        title: "Ship the discovery surface",
        body: "Search, filters (0–1 yr, 1–2 yr, remote, internship), role hubs, and company pages so people can browse the way they already think about applying.",
      },
      {
        title: "Grow like a product",
        body: "Invested in SEO, listing freshness, and resources (guides, salary context) so traffic compounds—then kept the pipeline honest with verified, company-sourced links.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "SEO",
    ],
    links: [
      {
        label: "Live site",
        href: "https://freshergo.com",
        external: true,
      },
    ],
    featured: true,
  },
  {
    id: "toptools",
    slug: "toptools",
    title: "TopTools",
    year: "2026",
    role: "Founder · Product & Engineering",
    metric: "AI agents that research → build → SEO",
    summary:
      "In-progress tools site for finance and career utilities—an autonomous product that can research demand, build tools, open PRs, and ship SEO itself.",
    problem:
      "Most “tools” sites are either hand-built one-offs that never expand or thin AI slop with no keyword strategy. Scaling a library of useful finance and career tools by hand does not keep up with search demand—or quality bar.",
    approach:
      "Designing TopTools as a self-growing product: agents research keywords (full research, volume, keyword difficulty, CPM), decide whether a tool is worth building, implement the tool, open a PR, and run a complete SEO pass once selected. Humans review; the loop is built for continuous shipping.",
    uniqueness:
      "Not a chatbot wrapper and not a static directory. The system owns the full pipeline from opportunity scoring to implementation and distribution—so the site can compound without every page starting from a blank editor.",
    outcome:
      "Work in progress / shipping narrative: core agent loop and product framing in flight, with finance and career tools as the first verticals. Built to grow itself once the research → build → PR → SEO path is reliable.",
    impact: [
      "Agent loop designed around volume, KD, and CPM—not vibes",
      "Selected tools go from decision → implementation → PR → SEO",
      "Finance & career verticals chosen for durable search intent",
      "Human-in-the-loop review so autonomy does not mean unreviewed slop",
    ],
    process: [
      {
        title: "Define the autonomous loop",
        body: "Mapped stages: keyword research, opportunity scoring, build decision, implementation, PR, and SEO—each with a clear success check before the next stage.",
      },
      {
        title: "Pick verticals with intent",
        body: "Finance and career tools first—high intent, repeatable formats, and room for a library that compounds in search.",
      },
      {
        title: "Ship, then expand",
        body: "Prove one tool end-to-end through the agent pipeline, then widen the catalog without rewriting the growth system each time.",
      },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "AI agents",
      "SEO",
      "Node.js",
      "PostgreSQL",
    ],
    links: [
      {
        label: "Discuss",
        href: "/#contact",
        external: false,
      },
    ],
    featured: true,
  },
  {
    id: "pi-resume-harness",
    slug: "pi-resume-harness",
    title: "pi-resume-harness",
    year: "2026",
    role: "Creator · Open source",
    metric: "Resume Claude · Cursor · Codex in Pi",
    summary:
      "A Pi package that ports Grok Build's foreign-session resume flow into Pi—/resume-claude, /resume-cursor, /resume-codex, and /resume-foreign.",
    problem:
      "Switching coding agents mid-task usually means losing the thread. Grok Build can resume a Cursor session with /resume-cursor, but Pi had no equivalent—context died at the harness boundary.",
    approach:
      "Built pi-resume-harness as a native TypeScript Pi package. Readers scan Claude Code, Cursor, and Codex session stores; a searchable picker resolves latest / id / keyword; strict project-cwd matching keeps $HOME from swallowing every project; and an inert-history handoff prompt makes the model summarize and verify before continuing.",
    uniqueness:
      "Not a live restore and no Python. Foreign transcripts are treated as untrusted inert history—tool calls stay marked inert, and the handoff forces a verify-first continuation.",
    outcome:
      "Published to npm and the pi.dev gallery. Installed with pi install npm:pi-resume-harness; powers cross-harness handoff across Claude Code, Cursor, and Codex.",
    impact: [
      "Published on npm and pi.dev/packages",
      "Resume Claude Code, Cursor, and Codex sessions inside Pi",
      "Strict project-cwd matching—$HOME never swallows every project",
      "Inert handoff, not a live restore; zero Python dependencies",
    ],
    process: [
      {
        title: "Port Grok's resume flow",
        body: "Mapped Grok Build's /resume-<harness> behavior—scan the store, resolve latest/id/keyword, inject a handoff prompt—and kept the same safety boundary.",
      },
      {
        title: "Write native readers",
        body: "Built TypeScript readers for Claude Code JSONL, Cursor agent-transcripts, and Codex rollouts—offline, no Python, with strict project-cwd matching.",
      },
      {
        title: "Ship as a package",
        body: "Published to npm with the pi-package keyword so it surfaces in the pi.dev gallery, and kept the whole thing reviewable as open source.",
      },
    ],
    stack: ["TypeScript", "Node.js", "Pi", "npm"],
    links: [
      {
        label: "Source",
        href: "https://github.com/SachinD6/pi-resume-harness",
        external: true,
      },
      {
        label: "npm",
        href: "https://www.npmjs.com/package/pi-resume-harness",
        external: true,
      },
      {
        label: "pi.dev",
        href: "https://pi.dev/packages/pi-resume-harness",
        external: true,
      },
    ],
    featured: true,
  },
  {
    id: "project-copilot",
    slug: "project-copilot",
    title: "Project Copilot",
    year: "2025",
    role: "Product & Engineering",
    metric: "Idea → architecture, ERD, roadmap",
    summary:
      "Describe an idea and get system architecture, database schema, and a roadmap—plus a custom drag-and-drop ERD canvas.",
    problem:
      "Greenfield projects die in the setup phase: vague requirements, no ERD, no architecture sketch, and hours lost before the first useful commit. Generic chat dumps walls of text that never become a plan you can act on.",
    approach:
      "Built Project Copilot around structured outputs: architecture, schema, and roadmap from a short description, with a from-scratch drag-and-drop ERD canvas and Gemini for generation. UI is intentionally opinionated so plans feel concrete.",
    uniqueness:
      "Custom ERD canvas (not a bolt-on third-party only) paired with AI generation—turns fuzzy ideas into technical artifacts you can edit, not a one-shot chat transcript.",
    outcome:
      "A developer-facing tool that compresses early planning: architecture narrative, schema, roadmap, and an interactive ERD in one flow—source and demo available.",
    impact: [
      "Architecture + schema + roadmap from a short product description",
      "Custom drag-and-drop ERD canvas built in-product",
      "Gemini-assisted generation with a focused developer UI",
    ],
    process: [
      {
        title: "Structure the outputs",
        body: "Defined the minimum plan artifacts—architecture, ERD, roadmap—so generation always lands in usable slots.",
      },
      {
        title: "Build the canvas",
        body: "Implemented a React Flow–based ERD editor so schemas are visual and editable, not static markdown tables.",
      },
      {
        title: "Close the loop with AI",
        body: "Wired Gemini to seed the plan, then let users refine structure in the canvas and docs.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Firebase",
      "Gemini AI",
      "React Flow",
      "Docker",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://project-copilot-psi.vercel.app",
        external: true,
      },
      {
        label: "Source",
        href: "https://github.com/SachinD6/project-copilot",
        external: true,
      },
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

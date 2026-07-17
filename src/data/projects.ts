import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "portx",
    slug: "portx",
    title: "Portx",
    year: "2026",
    role: "Product & Engineering",
    metric: "Data-driven portfolio system",
    summary:
      "A minimal portfolio template that treats personal branding like a product—stories, tooling, and motion—not a resume dump.",
    problem:
      "Most developer portfolios look identical: hero, three project cards, GitHub links, no story. Recruiters bounce in seconds because they cannot tell what you owned or what changed because of you.",
    approach:
      "I framed the site as a reusable product: a typed data layer for content, production-grade lint/format/CI, and interaction patterns that feel intentional. Case studies lead with problem → approach → impact instead of screenshots alone.",
    uniqueness:
      "Command palette navigation, island nav, and a content model you edit without touching UI. The portfolio itself is proof of craft—not a static brochure of other work.",
    outcome:
      "A template-ready system others can fork, with clear positioning, measurable project stories, and a path for blog/labs so the site becomes a resource—not a one-time visit.",
    impact: [
      "Content swaps via src/data without UI rewrites",
      "PR previews + production deploy pipeline on Cloudflare Pages",
      "Case-study structure recruiters can scan in under a minute",
    ],
    process: [
      {
        title: "Frame the product",
        body: "Defined who the site is for (hiring managers + collaborators) and the 10-second promise: who I am, what I ship, how to act.",
      },
      {
        title: "Story over inventory",
        body: "Rebuilt projects as case studies with problem, approach, uniqueness, and numbers—not a GitHub dump.",
      },
      {
        title: "Ship like a SaaS",
        body: "Lint, format, hooks, CI, Pages deploys, analytics hooks, and a booking CTA so the journey ends with a clear next step.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Cloudflare Pages",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/SachinD6/portx",
        external: true,
      },
    ],
    featured: true,
  },
  {
    id: "pulse-api",
    slug: "pulse-api-gateway",
    title: "Pulse API Gateway",
    year: "2025",
    role: "Backend & Platform",
    metric: "−42% p95 latency",
    summary:
      "A thin gateway that unblocked growth when a monolith’s request path started failing under real traffic.",
    problem:
      "A product team was scaling features faster than the request path could handle. p95 latency climbed, auth was duplicated across services, and incidents took too long because there was no shared tracing story.",
    approach:
      "Designed a focused gateway: caching on hot reads, centralized auth and rate limits, and structured tracing. Kept the product UI stable while the platform layer absorbed complexity.",
    uniqueness:
      "Treated the gateway as a product surface for other engineers—clear contracts, boring defaults, and observability that reduced guesswork during incidents.",
    outcome:
      "Hot paths got faster, six services shared one auth/rate-limit model, and on-call had traces instead of log archaeology.",
    impact: [
      "−42% p95 latency on hot read paths",
      "Unified auth + rate limits across 6 services",
      "Structured tracing reduced incident MTTR",
    ],
    process: [
      {
        title: "Measure the pain",
        body: "Mapped the worst endpoints and failure modes before writing code—latency, auth sprawl, and blind spots in production.",
      },
      {
        title: "Thin slice",
        body: "Shipped caching + auth for one critical path first, then expanded with confidence from real metrics.",
      },
      {
        title: "Make it operable",
        body: "Tracing and rate-limit visibility so the next person could debug without tribal knowledge.",
      },
    ],
    stack: ["Node.js", "TypeScript", "Redis", "PostgreSQL", "Docker"],
    links: [{ label: "Discuss", href: "/#contact", external: false }],
    featured: true,
  },
  {
    id: "clarity-dashboard",
    slug: "clarity-dashboard",
    title: "Clarity Dashboard",
    year: "2025",
    role: "Full-stack product",
    metric: "3× faster reporting",
    summary:
      "A reporting surface for ops teams that replaced spreadsheet chaos with role-aware defaults and keyboard-first tables.",
    problem:
      "Ops spent hours stitching spreadsheets for the same weekly questions. Tools existed, but they mirrored the database—not the decisions people needed to make.",
    approach:
      "Interviewed how reports were actually assembled, then designed views around jobs-to-be-done: role defaults, export paths, and accessible tables that worked without a mouse.",
    uniqueness:
      "Optimized for the weekly ritual, not the schema. Empty states and exports were first-class, not afterthoughts.",
    outcome:
      "Reporting time collapsed from hours to minutes; support tickets about “where is my view?” dropped as roles mapped to sensible defaults.",
    impact: [
      "Reporting time dropped from hours to minutes",
      "Role-based views reduced support tickets",
      "Keyboard-first, accessible tables for daily use",
    ],
    process: [
      {
        title: "Watch the ritual",
        body: "Shadowed how people built the weekly report—then deleted every field that didn’t show up in that flow.",
      },
      {
        title: "Defaults over configuration",
        body: "Role-aware home views so most users never touched filters.",
      },
      {
        title: "Ship the edges",
        body: "Exports, empty states, and a11y were part of v1—not a later polish pass.",
      },
    ],
    stack: ["React", "Next.js", "tRPC", "PostgreSQL", "Tailwind CSS"],
    links: [{ label: "Discuss", href: "/#contact", external: false }],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

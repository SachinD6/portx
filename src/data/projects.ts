import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "portx",
    title: "Portx",
    year: "2026",
    role: "Product & Engineering",
    metric: "Template-ready portfolio system",
    summary:
      "Most developer portfolios look the same and bury the signal. Portx is a minimal, data-driven portfolio template with production tooling and motion that feels intentional—not decorative noise.",
    impact: [
      "Data layer so content swaps without touching UI",
      "Command palette + island nav for product-like navigation",
      "Strict lint, format, and commit hooks from day one",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "shadcn/ui"],
    links: [
      {
        label: "Live",
        href: "https://github.com/SachinD6/portx",
        external: true,
      },
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
    title: "Pulse API Gateway",
    year: "2025",
    role: "Backend & Platform",
    metric: "−42% p95 latency",
    summary:
      "A growing product hit the limits of a monolithic request path. Designed a thin gateway layer with caching, auth, and observability so services could scale without rewriting the product surface.",
    impact: [
      "Cut p95 latency by 42% on hot read paths",
      "Unified auth and rate limits across 6 services",
      "Added structured tracing that cut incident MTTR",
    ],
    stack: ["Node.js", "TypeScript", "Redis", "PostgreSQL", "Docker"],
    links: [{ label: "Case notes", href: "#contact", external: false }],
    featured: true,
  },
  {
    id: "clarity-dashboard",
    title: "Clarity Dashboard",
    year: "2025",
    role: "Full-stack",
    metric: "3× faster reporting",
    summary:
      "Ops teams were drowning in spreadsheets. Built a focused reporting surface with clear defaults, role-aware views, and export paths that matched how people actually work—not how the schema was drawn.",
    impact: [
      "Reporting time dropped from hours to minutes",
      "Role-based views reduced support tickets",
      "Accessible tables and keyboard-first flows",
    ],
    stack: ["React", "Next.js", "tRPC", "PostgreSQL", "Tailwind CSS"],
    links: [{ label: "Discuss", href: "#contact", external: false }],
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

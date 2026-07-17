import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "independent-products",
    company: "Independent product work",
    role: "Product Engineer / Founder",
    location: "India",
    locationType: "Remote",
    employmentType: "Full-time",
    start: "2024",
    end: "Present",
    current: true,
    companyUrl: "https://freshergo.com",
    description:
      "Building and operating independent products end-to-end—FresherGo for entry-level tech jobs and TopTools for finance & career tools—covering product, engineering, SEO, and growth.",
    highlights: [
      "Shipped FresherGo (freshergo.com): verified fresher/internship/remote roles sourced from company pages—driving 12k+ visitors per month",
      "Building TopTools: an autonomous tools site where AI agents research keywords (volume, KD, CPM), decide what to build, implement tools, open PRs, and handle SEO",
      "Owned the full loop: problem framing, UI, data pipelines, deploy, and distribution—not throwaway demos",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Tailwind",
      "AWS",
    ],
  },
  {
    id: "open-source-systems",
    company: "Open-source & systems projects",
    role: "Engineer",
    location: "Remote",
    locationType: "Remote",
    employmentType: "Part-time",
    start: "2025",
    end: "Present",
    current: true,
    description:
      "Side systems work on code understanding and developer tooling—graph-backed repos, architecture generation, and native utilities.",
    highlights: [
      "RepoAtlas: AST + knowledge-graph code understanding with Neo4j, AWS SQS, and Redis for real-time ingestion",
      "Project Copilot: architecture, ERD canvas, and Gemini-assisted planning for greenfield ideas",
      "Renamesit (in development): Rust/Tauri desktop utility for convert-by-rename file workflows",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "Neo4j",
      "PostgreSQL",
      "Redis",
      "AWS SQS",
      "Rust",
      "Tauri",
    ],
  },
];

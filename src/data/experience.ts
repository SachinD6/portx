import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "product-engineer-present",
    company: "Independent / Product work",
    role: "Product Engineer",
    location: "India",
    locationType: "Remote",
    employmentType: "Full-time",
    start: "2024",
    end: "Present",
    current: true,
    description:
      "Shipping product interfaces and the services behind them—problem framing, React/Next surfaces, APIs, and deploy pipelines with measurable outcomes.",
    highlights: [
      "Owned features from problem framing to production",
      "Built Portx: case-study portfolio system with CI and Pages deploys",
      "Raised craft bar with lint, review, and performance habits",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind",
    ],
  },
  {
    id: "engineering-intern",
    company: "Early-stage product team",
    role: "Engineering Intern",
    location: "Remote",
    locationType: "Remote",
    employmentType: "Internship",
    start: "2023",
    end: "2024",
    description:
      "Contributed across the stack on a small team: user-facing features, internal tools, and docs that helped the next person move faster.",
    highlights: [
      "Shipped user-facing features with code review rigor",
      "Improved internal tooling used daily by the team",
    ],
    stack: ["TypeScript", "React", "Node.js", "SQL"],
  },
];

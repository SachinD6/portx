import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "software-engineer-present",
    company: "Independent / Product work",
    role: "Software Engineer",
    location: "Remote",
    start: "2024",
    end: "Present",
    description:
      "Building product surfaces and services end-to-end—from interaction design details to APIs, data, and deploy pipelines.",
    highlights: [
      "Owned features from problem framing to production",
      "Shipped performant UIs with measurable outcomes",
      "Set up lint, CI, and review habits that keep quality high",
    ],
  },
  {
    id: "engineering-intern",
    company: "Early-stage product team",
    role: "Engineering Intern",
    location: "Remote",
    start: "2023",
    end: "2024",
    description:
      "Contributed across the stack on a small team: bug fixes that mattered, features with clear acceptance criteria, and docs that helped the next person.",
    highlights: [
      "Shipped user-facing features with code review rigor",
      "Improved internal tooling used daily by the team",
    ],
  },
];

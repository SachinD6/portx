import type { SkillCluster } from "./types";

export const skills: SkillCluster[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "Python"],
  },
  {
    id: "platform",
    title: "Platform",
    items: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "Vercel"],
  },
  {
    id: "craft",
    title: "Product & craft",
    items: [
      "System design",
      "API design",
      "Performance",
      "Accessibility",
      "Design systems",
      "DX tooling",
    ],
  },
];

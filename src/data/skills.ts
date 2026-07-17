import type { SkillCluster } from "./types";

export const skills: SkillCluster[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["TypeScript", "JavaScript", "SQL", "Rust"],
  },
  {
    id: "platform",
    title: "Platform",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Neo4j",
      "Redis",
      "Docker",
      "AWS",
    ],
  },
  {
    id: "infra",
    title: "Infra & ops",
    items: ["Terraform", "Kubernetes", "Git", "Tailwind CSS"],
  },
  {
    id: "craft",
    title: "Product & craft",
    items: [
      "System design",
      "SEO & growth",
      "API design",
      "Performance",
      "Accessibility",
      "DX tooling",
    ],
  },
];

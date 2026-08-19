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
      "Redis",
      "Docker",
      "AWS",
    ],
  },
  {
    id: "cms-commerce",
    title: "CMS & commerce",
    items: ["Sanity", "Payload CMS", "Medusa", "Headless commerce"],
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

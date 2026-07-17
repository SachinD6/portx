import type { LabItem } from "./types";

export const labs: LabItem[] = [
  {
    id: "command-palette",
    title: "Command palette navigation",
    description:
      "⌘K / Ctrl+K jump-to-section and copy-email actions—portfolio as a tool, not a brochure.",
    status: "shipped",
    tags: ["UX", "a11y", "cmdk"],
    href: "/#top",
  },
  {
    id: "case-study-model",
    title: "Case study data model",
    description:
      "Typed problem → approach → uniqueness → impact shape so every project ships as a story.",
    status: "shipped",
    tags: ["TypeScript", "content"],
    href: "/work/portx",
  },
  {
    id: "island-nav",
    title: "Island nav + chapter rail",
    description:
      "Floating nav with scroll spy and a desktop chapter rail that always shows labels.",
    status: "shipped",
    tags: ["Motion", "layout"],
    href: "/#work",
  },
  {
    id: "magnetic-cta",
    title: "Magnetic CTAs",
    description:
      "Subtle magnetic pull on primary buttons for desktop—skipped under reduced motion.",
    status: "shipped",
    tags: ["Motion", "craft"],
  },
  {
    id: "stack-marquee",
    title: "Triple stack marquee",
    description:
      "Three-row skill marquee with alternating directions and pause-on-hover.",
    status: "experiment",
    tags: ["CSS", "motion"],
    href: "/#top",
  },
  {
    id: "analytics-hook",
    title: "Pluggable analytics",
    description:
      "Data-driven analytics config (Plausible/Umami) so the portfolio can learn like a product.",
    status: "wip",
    tags: ["product", "privacy"],
  },
];

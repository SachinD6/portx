import type { CommandAction, NavItem } from "./types";

/** Primary chrome nav — mix of home anchors and real pages */
export const navigation: NavItem[] = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "labs", label: "Labs", href: "/labs", page: true },
  { id: "blog", label: "Writing", href: "/blog", page: true },
  { id: "approach", label: "Approach", href: "/#approach" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

/** Homepage sections for chapter rail + scroll spy */
export const homeSections: NavItem[] = [
  { id: "work", label: "Work", href: "#work" },
  { id: "writing", label: "Writing", href: "#writing" },
  { id: "labs", label: "Labs", href: "#labs" },
  { id: "approach", label: "Approach", href: "#approach" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const commandActions: CommandAction[] = [
  {
    id: "goto-work",
    label: "Go to Work",
    description: "Selected case studies",
    action: "scroll",
    sectionId: "work",
    keywords: ["projects", "portfolio", "case"],
  },
  {
    id: "goto-writing",
    label: "Go to Writing",
    description: "Essays & notes",
    href: "/blog",
    action: "navigate",
    keywords: ["blog", "posts"],
  },
  {
    id: "goto-labs",
    label: "Go to Labs",
    description: "Experiments & components",
    href: "/labs",
    action: "navigate",
    keywords: ["labs", "experiments"],
  },
  {
    id: "goto-contact",
    label: "Go to Contact",
    description: "Book or email",
    action: "scroll",
    sectionId: "contact",
    keywords: ["email", "hire", "book"],
  },
  {
    id: "copy-email",
    label: "Copy email",
    description: "Copy address to clipboard",
    action: "copy-email",
    keywords: ["mail", "contact"],
  },
];

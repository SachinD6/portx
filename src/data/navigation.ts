import type { CommandAction, NavItem } from "./types";

/** Primary chrome nav — mix of home anchors and real pages */
export const navigation: NavItem[] = [
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "labs", label: "Labs", href: "/labs", page: true },
  { id: "blog", label: "Writing", href: "/blog", page: true },
  { id: "contact", label: "Contact", href: "/#contact" },
];

/**
 * Homepage chapter rail — Experience first (strongest signal for recruiters).
 */
export const homeSections: NavItem[] = [
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "now", label: "Now", href: "#now" },
  { id: "work", label: "Work", href: "#work" },
  { id: "writing", label: "Writing", href: "#writing" },
  { id: "labs", label: "Labs", href: "#labs" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const commandActions: CommandAction[] = [
  {
    id: "goto-experience",
    label: "Go to Experience",
    description: "Roles & timeline",
    action: "scroll",
    sectionId: "experience",
    keywords: ["jobs", "career", "work history"],
  },
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

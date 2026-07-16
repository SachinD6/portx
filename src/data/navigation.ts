import type { CommandAction, NavItem } from "./types";

export const navigation: NavItem[] = [
  { id: "work", label: "Work", href: "#work" },
  { id: "approach", label: "Approach", href: "#approach" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const commandActions: CommandAction[] = [
  {
    id: "goto-work",
    label: "Go to Work",
    description: "Selected projects",
    action: "scroll",
    sectionId: "work",
    keywords: ["projects", "portfolio"],
  },
  {
    id: "goto-approach",
    label: "Go to Approach",
    description: "How I work",
    action: "scroll",
    sectionId: "approach",
    keywords: ["process", "principles"],
  },
  {
    id: "goto-experience",
    label: "Go to Experience",
    description: "Roles & timeline",
    action: "scroll",
    sectionId: "experience",
    keywords: ["jobs", "career"],
  },
  {
    id: "goto-stack",
    label: "Go to Stack",
    description: "Tools & craft",
    action: "scroll",
    sectionId: "stack",
    keywords: ["skills", "tech"],
  },
  {
    id: "goto-contact",
    label: "Go to Contact",
    description: "Say hello",
    action: "scroll",
    sectionId: "contact",
    keywords: ["email", "hire"],
  },
  {
    id: "copy-email",
    label: "Copy email",
    description: "Copy address to clipboard",
    action: "copy-email",
    keywords: ["mail", "contact"],
  },
];

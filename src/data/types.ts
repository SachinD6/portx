export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type CommandAction = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  keywords?: string[];
  /** Built-in action handled by the palette */
  action?: "copy-email" | "scroll";
  sectionId?: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  /** Lucide icon name key resolved in UI */
  icon: "github" | "linkedin" | "x" | "mail" | "globe";
};

export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  impact: string[];
  stack: string[];
  links: LinkItem[];
  featured?: boolean;
  cover?: string;
  metric?: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  description: string;
  highlights?: string[];
};

export type SkillCluster = {
  id: string;
  title: string;
  items: string[];
};

export type ApproachItem = {
  id: string;
  title: string;
  description: string;
};

export type Person = {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  availability: {
    status: "available" | "open" | "busy";
    label: string;
  };
  resumeUrl?: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  ogImage?: string;
  keywords: string[];
};

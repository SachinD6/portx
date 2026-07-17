export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  /** When true, treat as full page route (not homepage hash) */
  page?: boolean;
};

export type CommandAction = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  keywords?: string[];
  action?: "copy-email" | "scroll" | "navigate";
  sectionId?: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "mail" | "globe";
};

export type CaseStudyStep = {
  title: string;
  body: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  /** One-line outcome for cards */
  metric?: string;
  /** Short card blurb */
  summary: string;
  /** Case study: problem context */
  problem: string;
  /** Case study: how you approached it */
  approach: string;
  /** Case study: what made the work unique */
  uniqueness: string;
  /** Case study: result narrative */
  outcome: string;
  /** Quantified or concrete impact lines */
  impact: string[];
  process?: CaseStudyStep[];
  stack: string[];
  links: LinkItem[];
  featured?: boolean;
  cover?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  /** Simple paragraphs for static export (no MDX dependency) */
  body: string[];
};

export type LabItem = {
  id: string;
  title: string;
  description: string;
  status: "shipped" | "experiment" | "wip";
  tags: string[];
  href?: string;
  external?: boolean;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  locationType?: "Remote" | "On-site" | "Hybrid";
  employmentType?: "Full-time" | "Part-time" | "Contract" | "Internship";
  start: string;
  end: string;
  description: string;
  highlights?: string[];
  stack?: string[];
  current?: boolean;
  companyUrl?: string;
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
  /** Niche positioning title (not generic "full-stack") */
  role: string;
  headline: string;
  bio: string;
  /** Who you help / what you want next */
  positioning: string;
  location: string;
  email: string;
  /** GitHub username for contribution graph */
  githubUsername?: string;
  availability: {
    status: "available" | "open" | "busy";
    label: string;
  };
  resumeUrl?: string;
};

export type ProductConfig = {
  /** Cal.com (or similar) booking URL — primary product CTA */
  bookingUrl?: string;
  bookingLabel: string;
  analytics?: {
    provider: "plausible" | "umami" | "none";
    domain?: string;
    scriptUrl?: string;
    websiteId?: string;
  };
};

/** AI model currently in the daily toolkit (ramx “now playing” analogue) */
export type AiModel = {
  id: string;
  name: string;
  provider: string;
  /** Brand mark key for icon rendering */
  brand: "xai" | "anthropic" | "openai" | "moonshot";
  /** One-line why this model is in rotation */
  role: string;
  /** Visual accent for the widget chip */
  accent?: "primary" | "muted";
  status: "active" | "standby";
};

export type NowUsingConfig = {
  label: string;
  /** Shown next to the live pulse */
  liveLabel: string;
  /** Model id treated as the “now playing” primary */
  primaryId: string;
  models: AiModel[];
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

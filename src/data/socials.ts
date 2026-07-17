import type { SocialLink } from "./types";
import { person } from "./person";

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SachinD6",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/sachinxduhan",
    icon: "linkedin",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/sachinduhan",
    icon: "x",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${person.email}`,
    icon: "mail",
  },
];

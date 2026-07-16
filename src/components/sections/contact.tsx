"use client";

import { toast } from "sonner";

import {
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { Section } from "@/components/layout/section";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { person, socials } from "@/data";
import { copyToClipboard } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: MailIcon,
  globe: GlobeIcon,
} as const;

export function Contact() {
  const handleCopyEmail = async () => {
    await copyToClipboard(person.email);
    toast.success("Email copied");
  };

  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <Reveal className="text-center">
        <div className="double-bezel">
          <div className="double-bezel-inner px-6 py-12 sm:px-10 sm:py-16">
            <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
            >
              Let&apos;s build something clear
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {person.bio}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton onClick={handleCopyEmail}>
                {person.email}
              </MagneticButton>
              {person.resumeUrl ? (
                <MagneticButton
                  href={person.resumeUrl}
                  variant="secondary"
                  external
                >
                  Resume
                </MagneticButton>
              ) : null}
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target={social.icon === "mail" ? undefined : "_blank"}
                      rel={
                        social.icon === "mail"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3.5 py-2 text-sm",
                        "text-muted-foreground transition-all duration-300 ease-[var(--ease-out-soft)]",
                        "hover:-translate-y-0.5 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

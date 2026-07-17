import { SectionDivider } from "@/components/layout/section-divider";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { ProfileHero } from "@/components/sections/profile-hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";

/**
 * Profile (w/ AI bar) → Experience → Work → Writing → Stack → Contact
 */
export default function Home() {
  return (
    <main id="main">
      <ProfileHero />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <SelectedWork />
      <SectionDivider />
      <Writing />
      <SectionDivider />
      <Skills />
      <Contact />
    </main>
  );
}

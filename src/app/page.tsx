import { SectionDivider } from "@/components/layout/section-divider";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { ProfileHero } from "@/components/sections/profile-hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";

/**
 * Profile (w/ AI bar) → Experience → Work → Stack → Contact
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
      <Skills />
      <Contact />
    </main>
  );
}

import { SectionDivider } from "@/components/layout/section-divider";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { GithubActivity } from "@/components/sections/github-activity";
import { LabsPreview } from "@/components/sections/labs-preview";
import { ProfileHero } from "@/components/sections/profile-hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";

/**
 * Profile → Experience (job first) → GitHub activity → Work → Writing → Labs → Stack → Contact
 */
export default function Home() {
  return (
    <main id="main">
      <ProfileHero />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <GithubActivity />
      <SectionDivider />
      <SelectedWork />
      <SectionDivider />
      <Writing />
      <SectionDivider />
      <LabsPreview />
      <SectionDivider />
      <Skills />
      <Contact />
    </main>
  );
}

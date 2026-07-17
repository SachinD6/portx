import { SectionDivider } from "@/components/layout/section-divider";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { LabsPreview } from "@/components/sections/labs-preview";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Writing } from "@/components/sections/writing";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <StackMarquee />
      <SectionDivider />
      <SelectedWork />
      <SectionDivider />
      <Writing />
      <SectionDivider />
      <LabsPreview />
      <SectionDivider />
      <Approach />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Skills />
      <Contact />
    </main>
  );
}

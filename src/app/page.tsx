import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <SelectedWork />
      <Approach />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}

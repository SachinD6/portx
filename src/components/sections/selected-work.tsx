import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { featuredProjects } from "@/data";

export function SelectedWork() {
  return (
    <Section id="work" ariaLabelledBy="work-heading" wide>
      <Reveal>
        <SectionHeading
          id="work-heading"
          index="01"
          eyebrow="Selected work"
          title="Proof over promises"
          description="Expand a project to see the problem, ownership, and outcome."
        />
      </Reveal>

      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

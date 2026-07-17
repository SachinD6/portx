import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { featuredProjects } from "@/data";

export function SelectedWork() {
  return (
    <Section id="work" ariaLabelledBy="work-heading">
      <Reveal>
        <SectionHeading
          id="work-heading"
          index="03"
          eyebrow="Selected work"
          title="Case studies"
          description="Stories with problem, approach, uniqueness, and impact—not a GitHub dump."
        />
      </Reveal>

      <div className="flex flex-col gap-3">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

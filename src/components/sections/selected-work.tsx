import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { featuredProjects } from "@/data";

export function SelectedWork() {
  return (
    <Section id="work" ariaLabelledBy="work-heading" wide>
      <Reveal className="mb-12 text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Selected work
        </p>
        <h2
          id="work-heading"
          className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
        >
          Proof over promises
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          A few projects that show how I think—problem, ownership, and outcome.
        </p>
      </Reveal>

      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects & Production Builds",
  description: "Explore the project registry of Nurul Shaikh, featuring production-grade applications, custom developer tools, and full stack case studies.",
};

export default function ProjectsPage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection>
        <p className="text-sm text-[var(--app-muted)]">Project Registry</p>
        <h1 className="mt-1 text-3xl font-semibold">Production-minded builds</h1>
      </MotionSection>

      <div className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </PageTransition>
  );
}

import { MotionSection, PageTransition } from "@/components/motion-section";
import { getProjectBySlug, projects } from "@/lib/data";
import { ArrowLeft, Database, ExternalLink, GitBranch, Network, Server } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return {
    title: project ? `${project.name} - Project Details` : "Project Details",
    description: project
      ? `Case study and system design layout for ${project.name}. Technical details: ${project.summary}`
      : "Explore full stack project architecture, database models, and API designs.",
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition className="space-y-6">
      <MotionSection className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/projects"
            className="button-scale mb-4 inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] px-3 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Projects
          </Link>
          <p className="text-sm text-[var(--app-muted)]">{project.category}</p>
          <h1 className="mt-1 text-3xl font-semibold">{project.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--app-muted)]">
            {project.overview}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="button-scale inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] px-3 text-sm font-semibold"
          >
            <GitBranch className="size-4" aria-hidden="true" />
            Github
          </a>
          <Link
            href={project.liveUrl}
            className="button-scale inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--app-text)] px-3 text-sm font-semibold text-[var(--app-bg)]"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            View
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="grid gap-4 lg:grid-cols-4">
        {[
          ["Status", project.status],
          ["Stack", project.stack.join(", ")],
          ["Users", project.users],
          ["Performance", project.performance],
        ].map(([label, value]) => (
          <div
            key={label}
            className="lift-card rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5"
          >
            <p className="text-sm text-[var(--app-muted)]">{label}</p>
            <p className="mt-2 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </MotionSection>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Network className="size-5 text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-semibold">Architecture</h2>
          </div>
          <p className="mb-5 text-sm leading-7 text-[var(--app-muted)]">
            Problem solved: {project.problem}
          </p>
          <div className="space-y-3">
            {project.architecture.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4 text-sm leading-6 text-[var(--app-muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Server className="size-5 text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-semibold">Features</h2>
          </div>
          <div className="space-y-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-4 py-3 text-sm"
              >
                {feature}
              </div>
            ))}
          </div>
        </MotionSection>
      </div>

      <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
        <div className="mb-5 flex items-center gap-2">
          <Database className="size-5 text-emerald-500" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Database Design</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {project.database.map((entity) => (
            <div
              key={entity.entity}
              className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4"
            >
              <h3 className="font-semibold">{entity.entity}</h3>
              <div className="mt-4 space-y-2">
                {entity.fields.map((field) => (
                  <p
                    key={field}
                    className="rounded-md border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-xs text-[var(--app-muted)]"
                  >
                    {field}
                  </p>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-emerald-500">{entity.relation}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <div className="grid gap-4 xl:grid-cols-2">
        <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
          <h2 className="mb-4 text-xl font-semibold">API Structure</h2>
          <div className="space-y-3">
            {project.endpoints.map((endpoint) => (
              <div
                key={`${endpoint.method}-${endpoint.path}`}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500">
                    {endpoint.method}
                  </span>
                  <code className="text-sm">{endpoint.path}</code>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
          <h2 className="mb-4 text-xl font-semibold">Screenshots</h2>
          <div className="space-y-4">
            {project.screenshots.map((shot) => (
              <div
                key={shot.title}
                className="overflow-hidden rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)]"
              >
                <div className="border-b border-[var(--app-border)] px-4 py-3">
                  <p className="font-semibold">{shot.title}</p>
                  <p className="text-sm text-[var(--app-muted)]">{shot.description}</p>
                </div>
                <div className="grid min-h-44 gap-3 p-4">
                  <div className="h-8 rounded-md border border-[var(--app-border)] bg-[var(--app-card)]" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-24 rounded-md border border-[var(--app-border)] bg-[var(--app-card)]" />
                    <div className="h-24 rounded-md border border-[var(--app-border)] bg-[var(--app-card)]" />
                    <div className="h-24 rounded-md border border-[var(--app-border)] bg-[var(--app-card)]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionSection>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
          <h2 className="mb-4 text-xl font-semibold">Challenges</h2>
          <div className="space-y-2">
            {project.challenges.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4 text-sm leading-6 text-[var(--app-muted)]"
              >
                {item}
              </p>
            ))}
          </div>
        </MotionSection>
        <MotionSection className="rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-5">
          <h2 className="mb-4 text-xl font-semibold">Lessons Learned</h2>
          <div className="space-y-2">
            {project.lessons.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4 text-sm leading-6 text-[var(--app-muted)]"
              >
                {item}
              </p>
            ))}
          </div>
        </MotionSection>
      </div>
    </PageTransition>
  );
}

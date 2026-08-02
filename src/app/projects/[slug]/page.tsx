import { MotionSection, PageTransition } from "@/components/motion-section";
import { ProjectPreviewMockup } from "@/components/project-preview-mockup";
import { getProjectBySlug, projects } from "@/lib/data";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Key,
  Laptop,
  Network,
  Play,
  Server,
  Terminal,
} from "lucide-react";
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
    title: project ? `${project.name} - Case Study & System Design` : "Project Details",
    description: project
      ? `Detailed case study and architecture breakdown for ${project.name} by Nurul Shaikh. Tech stack: ${project.stack.join(", ")}.`
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
            className="button-scale mb-4 inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] px-3 text-sm font-semibold hover:border-emerald-500/40 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              {project.status}
            </span>
            <p className="text-sm text-[var(--app-muted)]">{project.category}</p>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--app-text)]">{project.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--app-muted)]">
            {project.overview}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="button-scale inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] px-4 text-sm font-semibold hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
          >
            <GitBranch className="size-4" aria-hidden="true" />
            GitHub Repository
          </a>
          {project.liveUrl && project.liveUrl.startsWith("http") && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="button-scale inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--app-text)] px-4 text-sm font-semibold text-[var(--app-bg)] hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Live Web Application
            </a>
          )}
        </div>
      </MotionSection>

      <MotionSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Status", project.status],
          ["Stack", project.stack.join(", ")],
          ["Throughput / Users", project.users],
          ["Performance", project.performance],
        ].map(([label, value]) => (
          <div
            key={label}
            className="lift-card glass-panel rounded-lg border border-[var(--app-border)] p-5 hover:border-emerald-500/30"
          >
            <p className="text-xs text-[var(--app-muted)] uppercase tracking-wider font-semibold">{label}</p>
            <p className="mt-2 text-lg font-bold text-[var(--app-text)]">{value}</p>
          </div>
        ))}
      </MotionSection>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-[var(--app-border)] pb-3">
            <Network className="size-5 text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-bold">System Architecture & Problem Statement</h2>
          </div>
          <div className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-6 text-amber-200">
            <span className="font-semibold text-amber-400">Core Problem Solved: </span>
            {project.problem}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[var(--app-muted)] uppercase tracking-wider">Architecture Layers:</p>
            {project.architecture.map((item, idx) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] p-4 text-sm leading-6 text-[var(--app-muted)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-[var(--app-border)] pb-3">
            <Server className="size-5 text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-bold">Key Product Features</h2>
          </div>
          <div className="space-y-2.5">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] px-4 py-3 text-sm text-[var(--app-text)] font-medium"
              >
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </MotionSection>
      </div>

      <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
        <div className="mb-5 flex items-center gap-2 border-b border-[var(--app-border)] pb-3">
          <Database className="size-5 text-emerald-500" aria-hidden="true" />
          <h2 className="text-xl font-bold">Database Entity Schema & Relationships</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.database.map((entity) => (
            <div
              key={entity.entity}
              className="rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] p-5"
            >
              <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-3">
                <h3 className="font-mono text-base font-bold text-emerald-400">{entity.entity}</h3>
                <span className="text-[10px] uppercase font-mono text-[var(--app-muted)]">Collection/Table</span>
              </div>
              <div className="mt-4 space-y-1.5">
                {entity.fields.map((field) => (
                  <div
                    key={field}
                    className="flex items-center justify-between rounded border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-1.5 font-mono text-xs text-[var(--app-muted)]"
                  >
                    <span>{field}</span>
                    <span className="text-[10px] text-zinc-500 font-sans">attr</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold text-emerald-400 border-t border-[var(--app-border)] pt-3">
                → {entity.relation}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-[var(--app-border)] pb-3">
            <Code2 className="size-5 text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-bold">API Specifications & Endpoints</h2>
          </div>
          <div className="space-y-3">
            {project.endpoints.map((endpoint) => (
              <div
                key={`${endpoint.method}-${endpoint.path}`}
                className="rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-bold font-mono ${
                      endpoint.method === "GET"
                        ? "border border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                        : endpoint.method === "POST"
                        ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "border border-amber-500/40 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="font-mono text-sm font-semibold text-[var(--app-text)]">{endpoint.path}</code>
                </div>
                <p className="mt-2.5 text-sm leading-6 text-[var(--app-muted)]">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
          <div className="mb-4 flex items-center gap-2 border-b border-[var(--app-border)] pb-3">
            <Laptop className="size-5 text-emerald-500" aria-hidden="true" />
            <h2 className="text-xl font-bold">Interactive Visual Screenshots & Previews</h2>
          </div>
          <div className="space-y-5">
            {project.screenshots.map((shot) => (
              <ProjectPreviewMockup
                key={shot.title}
                title={shot.title}
                description={shot.description}
                mockupType={shot.mockupType}
              />
            ))}
          </div>
        </MotionSection>
      </div>

      {/* Quick Start & Setup Instructions Section */}
      {project.quickStart && (
        <MotionSection className="glass-panel rounded-xl border border-emerald-500/30 bg-gradient-to-b from-[var(--app-card)] to-[color-mix(in_srgb,var(--app-bg)_90%,transparent)] p-6 shadow-lg">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-border)] pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="size-5 text-emerald-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[var(--app-text)]">🚀 Quick Start & Process to Run</h2>
            </div>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              STEP-BY-STEP REPRODUCIBLE SETUP
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            <div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
              <p className="flex items-center gap-2 text-xs font-bold text-[var(--app-muted)] uppercase tracking-wider mb-2">
                <Laptop className="size-4 text-emerald-400" /> Prerequisites
              </p>
              <ul className="space-y-1.5 text-xs text-[var(--app-text)]">
                {project.quickStart.prerequisites.map((req) => (
                  <li key={req} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
              <p className="flex items-center gap-2 text-xs font-bold text-[var(--app-muted)] uppercase tracking-wider mb-2">
                <Key className="size-4 text-amber-400" /> Required Environment Variables (.env)
              </p>
              <div className="font-mono text-xs space-y-1 bg-black/60 p-3 rounded border border-[var(--app-border)] text-zinc-300 overflow-x-auto">
                {project.quickStart.envVars.map((env) => (
                  <p key={env} className="text-emerald-300">{env}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-[var(--app-text)]">Execution Steps:</p>
            {project.quickStart.steps.map((st, i) => (
              <div
                key={st.step}
                className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                    {i + 1}
                  </span>
                  <h4 className="text-sm font-bold text-[var(--app-text)]">{st.step}</h4>
                </div>
                <p className="text-xs text-[var(--app-muted)] pl-7">{st.description}</p>
                {st.command && (
                  <div className="ml-7 flex items-center justify-between rounded bg-black/70 px-3 py-2 font-mono text-xs text-emerald-400 border border-emerald-500/20 overflow-x-auto">
                    <span>$ {st.command}</span>
                    <Play className="size-3 text-emerald-500 shrink-0 ml-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </MotionSection>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
          <h2 className="mb-4 text-xl font-bold border-b border-[var(--app-border)] pb-3">Engineering Challenges & Solutions</h2>
          <div className="space-y-3">
            {project.challenges.map((item, idx) => (
              <div
                key={item}
                className="rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] p-4 text-sm leading-6 text-[var(--app-muted)]"
              >
                <span className="font-semibold text-rose-400">Challenge #{idx + 1}: </span>
                {item}
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="glass-panel rounded-xl border border-[var(--app-border)] p-6">
          <h2 className="mb-4 text-xl font-bold border-b border-[var(--app-border)] pb-3">Key Lessons & Principles</h2>
          <div className="space-y-3">
            {project.lessons.map((item, idx) => (
              <div
                key={item}
                className="rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] p-4 text-sm leading-6 text-[var(--app-muted)]"
              >
                <span className="font-semibold text-emerald-400">Takeaway #{idx + 1}: </span>
                {item}
              </div>
            ))}
          </div>
        </MotionSection>
      </div>
    </PageTransition>
  );
}

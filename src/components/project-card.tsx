import type { Project } from "@/lib/data";
import { systemProfile } from "@/lib/data";
import { ArrowRight, ExternalLink, Gauge, GitBranch, Users } from "lucide-react";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="lift-card glass-panel rounded-lg p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[var(--app-muted)]">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--app-text)] group-hover:text-emerald-500 transition-colors duration-300">{project.name}</h3>
        </div>
        <span className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-500 animate-pulse">
          {project.status}
        </span>
      </div>

      <p className="mt-4 min-h-16 text-sm leading-6 text-[var(--app-muted)]">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-md border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-2 py-1 text-xs text-[var(--app-muted)] transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500 hover:scale-105"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="lift-card glass-tile rounded-lg p-3 hover:border-emerald-500/30">
          <div className="flex items-center gap-2 text-xs text-[var(--app-muted)]">
            <Users className="size-4 text-[var(--app-soft)]" aria-hidden="true" />
            Users
          </div>
          <p className="mt-2 text-lg font-semibold">{project.users}</p>
        </div>
        <div className="lift-card glass-tile rounded-lg p-3 hover:border-emerald-500/30">
          <div className="flex items-center gap-2 text-xs text-[var(--app-muted)]">
            <Gauge className="size-4 text-[var(--app-soft)]" aria-hidden="true" />
            Performance
          </div>
          <p className="mt-2 text-lg font-semibold text-emerald-500">{project.performance}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={project.liveUrl}
          className="button-scale inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] backdrop-blur-sm px-3 text-sm font-semibold hover:border-emerald-500/40 hover:text-emerald-500"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          View
        </Link>
        <a
          href={systemProfile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="button-scale inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] backdrop-blur-sm px-3 text-sm font-semibold hover:border-emerald-500/40 hover:text-emerald-500"
        >
          <GitBranch className="size-4" aria-hidden="true" />
          Github
        </a>
        <Link
          href={`/projects/${project.slug}`}
          className="button-scale inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--app-text)] px-3 text-sm font-semibold text-[var(--app-bg)] hover:shadow-lg hover:shadow-emerald-500/20"
        >
          Case Study
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

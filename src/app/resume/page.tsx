import type { Metadata } from "next";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { resumeDetails, projects } from "@/lib/data";
import {
  Download,
  Briefcase,
  GraduationCap,
  Sparkles,
  Terminal,
  Cpu,
  CheckCircle2,
  Mail,
  Phone,
  GitBranch,
  MapPin,
  Globe,
  ExternalLink,
  Code2,
  Layers,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Resume | Nurul Shaikh",
  description:
    "Official resume of Nurul Shaikh — Web Developer & Full-Stack Architect with experience at Yuga Yatra, 3D WebGL configurators, and AI-agentic systems.",
};

export default function ResumePage() {
  const { header, summary, technicalSkills, workExperience, education, aiWorkflow, softSkills } =
    resumeDetails;

  return (
    <PageTransition className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Header Card */}
      <MotionSection className="glass-panel rounded-2xl p-6 sm:p-8 border border-[var(--app-border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Code2 className="size-48 text-emerald-500" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-6 relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <Sparkles className="size-3.5" /> AVAILABLE FOR FREELANCE & REMOTE
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--app-text)]">
              {header.name}
            </h1>
            <p className="mt-1 text-base font-semibold text-emerald-500">{header.title}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:shaikhnurul8200@gmail.com"
              className="button-scale inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Mail className="size-4" /> Hire Me / Contact
            </a>
            <a
              href="/Nurul-Shaikh-Resume.pdf"
              download
              className="button-scale inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-5 text-sm font-semibold hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            >
              <Download className="size-4" /> Download PDF
            </a>
          </div>
        </div>

        {/* Contact Info Chips */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--app-border)] pt-5 text-xs text-[var(--app-muted)] font-medium">
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Mail className="size-3.5 text-emerald-500" /> {header.email}
          </span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Phone className="size-3.5 text-emerald-500" /> {header.phone}
          </span>
          <a
            href={`https://${header.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Globe className="size-3.5 text-emerald-500" /> {header.linkedin}
          </a>
          <a
            href={`https://${header.github}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <GitBranch className="size-3.5 text-emerald-500" /> {header.github}
          </a>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="size-3.5 text-emerald-500" /> {header.location}
          </span>
        </div>
      </MotionSection>

      {/* Professional Summary */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8">
        <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 mb-3 flex items-center gap-2">
          <Sparkles className="size-4" /> Professional Summary
        </h2>
        <p className="text-sm leading-8 text-[var(--app-text)] font-normal">{summary}</p>
      </MotionSection>

      {/* Technical Skills Categorized */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <Cpu className="size-4" /> Technical Skills
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technicalSkills.map((cat) => (
            <div
              key={cat.category}
              className="lift-card glass-tile rounded-xl p-4 border border-[var(--app-border)] hover:border-emerald-500/40 transition-all"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-[var(--app-border)] pb-2 mb-3">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_70%,transparent)] px-2 py-0.5 text-xs text-[var(--app-text)] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Work Experience */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <Briefcase className="size-4" /> Work Experience
        </h2>

        <div className="space-y-8">
          {workExperience.map((exp) => (
            <div
              key={exp.company + exp.role}
              className="relative pl-6 border-l-2 border-emerald-500/40 space-y-3"
            >
              <div className="absolute -left-[9px] top-0 size-4 rounded-full border-2 border-emerald-500 bg-[var(--app-bg)]" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[var(--app-text)]">{exp.role}</h3>
                  <p className="text-sm font-semibold text-emerald-400">
                    {exp.company} <span className="text-xs font-normal text-[var(--app-muted)]">• {exp.location}</span>
                  </p>
                </div>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 pt-1 text-xs sm:text-sm leading-6 text-[var(--app-muted)]">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Key Projects Grid */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
            <Globe className="size-4" /> Key Projects
          </h2>
          <Link
            href="/projects"
            className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
          >
            View All Portfolio Projects <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((p) => (
            <div
              key={p.slug}
              className="lift-card glass-tile rounded-xl p-5 border border-[var(--app-border)] hover:border-emerald-500/40 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[var(--app-text)]">{p.name}</h3>
                  <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs leading-5 text-[var(--app-muted)] line-clamp-3">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.stack.slice(0, 6).map((st) => (
                    <span
                      key={st}
                      className="rounded border border-[var(--app-border)] bg-[var(--app-bg)] px-2 py-0.5 text-[11px] text-zinc-300"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--app-border)] flex items-center justify-between text-xs">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <GitBranch className="size-3.5" /> Source Code
                </a>
                <Link
                  href={`/projects/${p.slug}`}
                  className="font-semibold text-[var(--app-text)] hover:text-emerald-400 flex items-center gap-1"
                >
                  Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Education */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <GraduationCap className="size-4" /> Education
        </h2>

        <div className="rounded-xl border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] p-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[var(--app-text)]">{education.degree}</h3>
            <p className="text-xs font-semibold text-emerald-400 mt-0.5">{education.institution}</p>
            <p className="text-xs text-[var(--app-muted)] mt-1 font-medium">{education.board}</p>
            <p className="text-xs text-zinc-400 mt-2 max-w-2xl leading-5">{education.note}</p>
          </div>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
            {education.period}
          </span>
        </div>
      </MotionSection>

      {/* AI-Augmented Workflow */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <Terminal className="size-4" /> AI-Augmented Development Workflow
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {aiWorkflow.map((wf) => (
            <div
              key={wf.tool}
              className="lift-card glass-tile rounded-xl p-4 border border-[var(--app-border)] hover:border-emerald-500/40 space-y-2"
            >
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-amber-400">
                <CheckCircle2 className="size-4 text-emerald-500" />
                {wf.tool}
              </div>
              <p className="text-xs leading-5 text-[var(--app-muted)]">{wf.description}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* Soft Skills & Work Style */}
      <MotionSection className="glass-panel rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2">
          <Layers className="size-4" /> Soft Skills & Work Style
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {softSkills.map((sk) => (
            <div
              key={sk.name}
              className="lift-card glass-tile rounded-xl p-4 border border-[var(--app-border)] hover:border-emerald-500/40 space-y-1.5"
            >
              <p className="text-xs font-bold text-[var(--app-text)]">{sk.name}</p>
              <p className="text-xs leading-5 text-[var(--app-muted)]">{sk.detail}</p>
            </div>
          ))}
        </div>
      </MotionSection>
    </PageTransition>
  );
}

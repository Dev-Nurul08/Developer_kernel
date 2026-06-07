import {
  SiCss,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiGithubactions,
  SiMysql,
  SiNextdotjs,
  SiReact,
  SiPostgresql,
} from "react-icons/si";
import { FaAws, FaCloud } from "react-icons/fa";
import { BookOpen, Rocket } from "lucide-react";

/* ── Main Tech Stack (what you already know) ── */
const stack = [
  { label: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
  { label: "Express", Icon: SiExpress, color: "var(--app-text)" },
  { label: "MongoDB", Icon: SiMongodb, color: "#47a248" },
  { label: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8" },
  { label: "HTML", Icon: SiHtml5, color: "#e34f26" },
  { label: "CSS", Icon: SiCss, color: "#1572b6" },
  { label: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { label: "Git", Icon: SiGit, color: "#f05032" },
];

/* ── Currently Learning ── */
const currentlyLearning = [
  { label: "React", Icon: SiReact, color: "#61dafb" },
  { label: "Next.js", Icon: SiNextdotjs, color: "var(--app-text)" },
  { label: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
];

/* ── Going to Learn ── */
const goingToLearn = [
  { label: "AWS", Icon: FaAws, color: "#ff9900" },
  { label: "Docker", Icon: SiDocker, color: "#2496ed" },
  { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088ff" },
  { label: "Cloud", Icon: FaCloud, color: "#818cf8" },
  { label: "MySQL", Icon: SiMysql, color: "#4479a1" },
];

export function TechStackShowcase() {
  return (
    <div className="space-y-8">
      {/* ── Current Tech Stack ── */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stack.map((item) => {
          const Icon = item.Icon;
          return (
            <div
              key={item.label}
              className="glass-tile group lift-card flex min-h-28 items-center gap-3 rounded-lg p-4 hover:border-emerald-500/30"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                <Icon className="size-7 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12" style={{ color: item.color }} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--app-text)] transition-colors duration-200 group-hover:text-emerald-500">{item.label}</p>
                <p className="mt-1 text-xs text-[var(--app-muted)] transition-colors duration-200 group-hover:text-[var(--app-soft)]">Stack module</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Currently Learning ── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="size-4 text-cyan-500 animate-pulse" aria-hidden="true" />
          <p className="text-sm font-semibold text-[var(--app-muted)]">Currently Learning</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {currentlyLearning.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.label}
                className="group lift-card flex min-h-24 items-center gap-3 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-card)_55%,transparent)] backdrop-blur-lg p-4 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_18px_rgba(6,182,212,0.12)]"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.25)]">
                  <Icon className="size-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12" style={{ color: item.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--app-text)] transition-colors duration-200 group-hover:text-cyan-500">{item.label}</p>
                  <p className="mt-0.5 text-xs text-[var(--app-muted)] transition-colors duration-200 group-hover:text-[var(--app-soft)]">In progress</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Going to Learn ── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Rocket className="size-4 text-amber-500 animate-pulse" aria-hidden="true" />
          <p className="text-sm font-semibold text-[var(--app-muted)]">Going to Learn</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {goingToLearn.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.label}
                className="group lift-card flex min-h-24 items-center gap-3 rounded-lg border border-dashed border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-card)_40%,transparent)] backdrop-blur-md p-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-[color-mix(in_srgb,var(--app-card)_64%,transparent)]"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-dashed border-[var(--app-border)] bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-amber-500/30 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <Icon className="size-5 opacity-60 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6" style={{ color: item.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--app-muted)] transition-colors duration-200 group-hover:text-amber-500">{item.label}</p>
                  <p className="mt-0.5 text-xs text-[var(--app-soft)] transition-colors duration-200 group-hover:text-[var(--app-muted)]">Upcoming</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

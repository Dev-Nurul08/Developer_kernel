import type { Metadata } from "next";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { skills } from "@/lib/data";
import { BadgeCheck, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills & Technical Capabilities",
  description: "Browse the developer capability matrix of Nurul Shaikh. Advanced frontend (React, CSS, HTML, JavaScript) and backend (Node.js, MongoDB, MySQL, REST APIs) skills.",
};

export default function SkillsPage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--app-muted)]">Skill Matrix</p>
          <h1 className="text-3xl font-semibold text-[var(--app-text)]">Capabilities by category</h1>
        </div>
        <div className="glass-tile rounded-lg border border-[var(--app-border)] px-4 py-3 text-sm text-[var(--app-muted)] hover:border-emerald-500/30 transition-colors duration-300">
          No bars. Evidence and levels only.
        </div>
      </MotionSection>

      <div className="grid gap-4 xl:grid-cols-2">
        {skills.map((group) => (
          <MotionSection
            key={group.title}
            className="group lift-card glass-panel rounded-lg p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                  <Code2 className="size-5 text-emerald-500 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[var(--app-text)] group-hover:text-emerald-500 transition-colors duration-300">{group.title}</h2>
                  <p className="text-sm text-[var(--app-muted)] mt-0.5">{group.signal}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] px-2.5 py-1 text-xs font-semibold text-[var(--app-text)]">
                <BadgeCheck className="size-4 text-emerald-500 animate-pulse" aria-hidden="true" />
                {group.level}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] px-3 py-2 text-sm text-[var(--app-muted)] transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500 hover:scale-105 hover:shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </MotionSection>
        ))}
      </div>
    </PageTransition>
  );
}

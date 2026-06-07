import type { Metadata } from "next";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { resumeOverview, skills } from "@/lib/data";
import { Download, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Resume Summary",
  description: "Access the interactive resume overview of Nurul Shaikh. View career qualifications, educational credentials, and download the full resume PDF.",
};

export default function ResumePage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--app-muted)]">Resume Overview</p>
          <h1 className="mt-1 text-3xl font-semibold">Nurul Shaikh</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--app-muted)]">
            Full Stack Developer focused on building practical web systems with
            clear backend architecture and polished SaaS interfaces.
          </p>
        </div>
        <a
          href="/Nurul-Shaikh-Resume.pdf"
          download
          className="button-scale inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--app-text)] px-4 text-sm font-semibold text-[var(--app-bg)] hover:shadow-lg hover:shadow-emerald-500/15"
        >
          <Download className="size-4" aria-hidden="true" />
          Download PDF
        </a>
      </MotionSection>

      <div className="grid gap-4 xl:grid-cols-2">
        {Object.entries(resumeOverview).map(([label, value]) => (
          <MotionSection
            key={label}
            className="group lift-card glass-panel rounded-lg p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <FileText className="size-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" aria-hidden="true" />
              <h2 className="text-xl font-semibold capitalize text-[var(--app-text)] group-hover:text-emerald-500 transition-colors duration-300">{label}</h2>
            </div>
            <p className="text-sm leading-7 text-[var(--app-muted)] transition-colors duration-300 group-hover:text-[var(--app-text)]">{value}</p>
          </MotionSection>
        ))}
      </div>

      <MotionSection className="glass-panel rounded-lg p-5">
        <h2 className="text-xl font-semibold text-[var(--app-text)]">Skill Snapshot</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {skills.map((group) => (
            <div
              key={group.title}
              className="lift-card glass-tile rounded-lg p-4 hover:border-emerald-500/30"
            >
              <p className="font-semibold text-[var(--app-text)]">{group.title}</p>
              <p className="mt-1 text-sm text-emerald-500 font-medium animate-pulse">{group.level}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                {group.items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>
    </PageTransition>
  );
}

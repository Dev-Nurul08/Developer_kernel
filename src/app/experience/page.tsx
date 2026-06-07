import type { Metadata } from "next";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { TimelineView } from "@/components/timeline-view";

export const metadata: Metadata = {
  title: "Professional Work Experience",
  description: "Read the career path and software engineering milestone timeline of Nurul Shaikh, featuring professional growth and specialized backend work.",
};

export default function ExperiencePage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection>
        <p className="text-sm text-[var(--app-muted)]">Experience Timeline</p>
        <h1 className="mt-1 text-3xl font-semibold">Developer growth system</h1>
      </MotionSection>
      <TimelineView />
    </PageTransition>
  );
}

import type { Metadata } from "next";
import { CertificateExplorer } from "@/components/certificate-explorer";
import { MotionSection, PageTransition } from "@/components/motion-section";

export const metadata: Metadata = {
  title: "Professional Certifications",
  description: "View verified training credentials and course completions of Nurul Shaikh, including Generative AI engineering certifications.",
};

export default function CertificatesPage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection>
        <p className="text-sm text-[var(--app-muted)]">Documents</p>
        <h1 className="mt-1 text-3xl font-semibold">Certificate system</h1>
      </MotionSection>
      <CertificateExplorer />
    </PageTransition>
  );
}

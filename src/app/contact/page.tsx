import type { Metadata } from "next";
import { ContactTicket } from "@/components/contact-ticket";
import { MotionSection, PageTransition } from "@/components/motion-section";

export const metadata: Metadata = {
  title: "Contact & Inquiries",
  description: "Connect with Nurul Shaikh. Submit support tickets, work requests, or get in touch for custom software development projects.",
};

export default function ContactPage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection>
        <p className="text-sm text-[var(--app-muted)]">Contact</p>
        <h1 className="mt-1 text-3xl font-semibold">Support ticket intake</h1>
      </MotionSection>
      <ContactTicket />
    </PageTransition>
  );
}

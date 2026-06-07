"use client";

import { CheckCircle2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactTicket() {
  const [ticket, setTicket] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTicket("#2026-001");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <form
        onSubmit={handleSubmit}
        className="glass-panel rounded-lg p-5"
      >
        <div className="mb-5">
          <p className="text-sm text-[var(--app-muted)]">Support Queue</p>
          <h2 className="mt-1 text-xl font-semibold text-[var(--app-text)]">Create New Inquiry</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-[var(--app-text)]">
            Name
            <input
              required
              name="name"
              className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-[var(--app-text)] placeholder-[var(--app-muted)]"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm text-[var(--app-text)]">
            Email
            <input
              required
              type="email"
              name="email"
              className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-[var(--app-text)] placeholder-[var(--app-muted)]"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm text-[var(--app-text)]">
            Project Type
            <select
              name="projectType"
              className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-[var(--app-text)]"
            >
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">Full Stack App</option>
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">Backend API</option>
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">Dashboard UI</option>
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">Portfolio System</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-[var(--app-text)]">
            Budget
            <select
              name="budget"
              className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-[var(--app-text)]"
            >
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">Discuss Later</option>
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">Under $500</option>
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">$500 - $1,500</option>
              <option className="bg-[var(--app-card)] text-[var(--app-text)]">$1,500+</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm sm:col-span-2 text-[var(--app-text)]">
            Message
            <textarea
              required
              name="message"
              rows={6}
              className="resize-none rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm p-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-[var(--app-text)] placeholder-[var(--app-muted)]"
              placeholder="What should Nurul build or improve?"
            />
          </label>
        </div>

        <button
          type="submit"
          className="button-scale mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--app-text)] px-4 text-sm font-semibold text-[var(--app-bg)] hover:shadow-lg hover:shadow-emerald-500/10"
        >
          <Send className="size-4" aria-hidden="true" />
          Submit Inquiry
        </button>
      </form>

      <div className="lift-card glass-panel rounded-lg p-5">
        <p className="text-sm text-[var(--app-muted)] font-semibold">Ticket Status</p>
        {ticket ? (
          <div className="mt-6">
            <CheckCircle2 className="size-10 text-emerald-500 animate-bounce" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold text-[var(--app-text)]">Ticket Created</h3>
            <p className="mt-2 text-3xl font-semibold text-emerald-500">{ticket}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
              Your inquiry is staged in Nurul OS. You can also contact us directly at{" "}
              <a href="mailto:shakhnurul8200@gmail.com" className="text-emerald-500 hover:underline">
                shakhnurul8200@gmail.com
              </a>{" "}
              for genuine contracting.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_50%,transparent)] p-5 text-sm leading-6 text-[var(--app-muted)]">
            New inquiry tickets appear here after submission.
          </div>
        )}
      </div>
    </div>
  );
}

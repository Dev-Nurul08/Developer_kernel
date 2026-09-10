"use client";

import { AlertCircle, CheckCircle2, Copy, ExternalLink, Loader2, Mail, Send, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

type TicketInfo = {
  ticketId: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
};

export function ContactTicket() {
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form field state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Full Stack App");
  const [budget, setBudget] = useState("Discuss Later");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectType,
          budget,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch email. Please try again or reach out directly.");
      }

      // Success
      setTicket({
        ticketId: data.ticketId || `#NRL-${Date.now().toString().slice(-6)}`,
        name,
        email,
        projectType,
        budget,
        message,
        submittedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      // Clear input fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try submitting again or email directly."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCopyTicket(ticketId: string) {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setTicket(null);
    setErrorMessage(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Left Column: Form or Success Receipt */}
      <div className="glass-panel rounded-xl p-6 sm:p-8 border border-[var(--app-border)] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-2">
            <Sparkles className="size-3" /> Direct Priority Dispatch to Gmail
          </div>
          <h2 className="text-2xl font-bold text-[var(--app-text)] tracking-tight">
            Send Inquiry to Nurul
          </h2>
          <p className="mt-1 text-sm text-[var(--app-muted)]">
            Every submission is forwarded straight to <span className="text-emerald-400 font-mono">shaikhnurul8200@gmail.com</span> with an auto-tracked reference ticket.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 flex items-start gap-3">
            <AlertCircle className="size-5 shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1 space-y-2">
              <p className="font-semibold text-red-200">Delivery Alert</p>
              <p>{errorMessage}</p>
              <div>
                <a
                  href={`mailto:shaikhnurul8200@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name || "Visitor")}&body=${encodeURIComponent(message || "")}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline"
                >
                  <Mail className="size-3.5" /> Open Default Mail Client Directly &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[var(--app-text)]">
              <span>Your Name <span className="text-emerald-500">*</span></span>
              <input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[var(--app-text)] placeholder-[var(--app-muted)] disabled:opacity-50"
                placeholder="e.g. Alex Henderson"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[var(--app-text)]">
              <span>Your Email Address <span className="text-emerald-500">*</span></span>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[var(--app-text)] placeholder-[var(--app-muted)] disabled:opacity-50"
                placeholder="alex@company.com"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[var(--app-text)]">
              <span>Project Scope / Category</span>
              <select
                name="projectType"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                disabled={loading}
                className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[var(--app-text)] disabled:opacity-50"
              >
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="Full Stack Web Application">Full Stack Web Application</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="AI & LLM Integration">AI &amp; LLM Integration</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="Python / FastAPI Backend API">Python / FastAPI Backend API</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="SaaS Platform Development">SaaS Platform Development</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="Dashboard & Data Visualization">Dashboard &amp; Data Visualization</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="Freelance / Contract Role">Freelance / Contract Role</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[var(--app-text)]">
              <span>Target Budget</span>
              <select
                name="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={loading}
                className="h-11 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[var(--app-text)] disabled:opacity-50"
              >
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="Discuss Later / Flexible">Discuss Later / Flexible</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="Under $500">Under $500</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="$500 - $1,500">$500 - $1,500</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="$1,500 - $3,500">$1,500 - $3,500</option>
                <option className="bg-[var(--app-card)] text-[var(--app-text)]" value="$3,500+">$3,500+ Enterprise</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium sm:col-span-2 text-[var(--app-text)]">
              <span>Project Details &amp; Message <span className="text-emerald-500">*</span></span>
              <textarea
                required
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                rows={5}
                className="resize-none rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm p-3 outline-none transition-all duration-300 hover:border-emerald-500/50 hover:bg-[color-mix(in_srgb,var(--app-card)_35%,transparent)] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[var(--app-text)] placeholder-[var(--app-muted)] disabled:opacity-50"
                placeholder="Describe your goals, requirements, timeline, or what you would like to build..."
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="button-scale inline-flex h-12 items-center gap-2.5 rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Transmitting to Gmail...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden="true" />
                  <span>Send Directly to Gmail</span>
                </>
              )}
            </button>

            <span className="text-xs text-[var(--app-muted)] flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Direct Inbox Delivery Guaranteed
            </span>
          </div>
        </form>
      </div>

      {/* Right Column: Live Status & Ticket Ledger */}
      <div className="space-y-4">
        <div className="lift-card glass-panel rounded-xl p-6 border border-[var(--app-border)] shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--app-border)] pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--app-muted)]">Dispatch Console</p>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              Gateway Active
            </span>
          </div>

          {ticket ? (
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--app-text)]">Email Dispatched!</h3>
                  <p className="text-xs text-[var(--app-muted)]">Delivered to Nurul&apos;s Gmail inbox</p>
                </div>
              </div>

              <div className="rounded-lg bg-[color-mix(in_srgb,var(--app-bg)_80%,transparent)] border border-[var(--app-border)] p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--app-muted)]">Reference Ticket:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyTicket(ticket.ticketId)}
                    className="inline-flex items-center gap-1 font-mono font-bold text-emerald-400 hover:underline"
                    title="Click to copy ticket ID"
                  >
                    {ticket.ticketId}
                    <Copy className="size-3 text-[var(--app-muted)]" />
                  </button>
                </div>
                {copied && (
                  <p className="text-[10px] text-emerald-400 text-right">Copied to clipboard!</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[var(--app-muted)]">Sender:</span>
                  <span className="text-[var(--app-text)] font-medium truncate max-w-[170px]">{ticket.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--app-muted)]">Scope:</span>
                  <span className="text-[var(--app-text)] font-medium truncate max-w-[170px]">{ticket.projectType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--app-muted)]">Budget:</span>
                  <span className="text-emerald-400 font-medium">{ticket.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--app-muted)]">Timestamp:</span>
                  <span className="text-[var(--app-muted)]">{ticket.submittedAt}</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[var(--app-muted)]">
                Thank you, <strong className="text-[var(--app-text)]">{ticket.name}</strong>! Your message has arrived in Nurul&apos;s primary Gmail inbox. Expect a response shortly at <strong className="text-[var(--app-text)]">{ticket.email}</strong>.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="w-full text-center rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-card)_50%,transparent)] py-2 text-xs font-semibold text-[var(--app-text)] transition-colors hover:bg-emerald-500/10 hover:border-emerald-500/40"
              >
                Create Another Inquiry
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-dashed border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_50%,transparent)] p-4 text-xs leading-relaxed text-[var(--app-muted)]">
                <p className="font-medium text-[var(--app-text)] mb-1">How your inquiry is processed:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Form inputs are validated and formatted</li>
                  <li>Direct transmission to Nurul&apos;s Gmail</li>
                  <li>Instant tracking ticket generated for your reference</li>
                  <li>Nurul reviews and responds within 24 hours</li>
                </ol>
              </div>

              <div className="rounded-lg bg-[color-mix(in_srgb,var(--app-card)_30%,transparent)] p-3 border border-[var(--app-border)] text-xs text-[var(--app-muted)]">
                <p className="font-semibold text-[var(--app-text)] mb-1">Direct Contact:</p>
                <a
                  href="mailto:shaikhnurul8200@gmail.com"
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline font-mono truncate"
                >
                  <Mail className="size-3.5 shrink-0" />
                  shaikhnurul8200@gmail.com
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links Card */}
        <div className="glass-panel rounded-xl p-4 border border-[var(--app-border)] text-xs space-y-2">
          <p className="font-semibold text-[var(--app-text)]">Other Channels</p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://github.com/Dev-Nurul08"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] p-2 hover:border-emerald-500/40 transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="size-3 text-[var(--app-muted)]" />
            </a>
            <a
              href="https://www.linkedin.com/in/nurul-shaikh/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] p-2 hover:border-emerald-500/40 transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink className="size-3 text-[var(--app-muted)]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

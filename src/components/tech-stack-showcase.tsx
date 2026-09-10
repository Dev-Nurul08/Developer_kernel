"use client";

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
  SiPython,
  SiFastapi,
  SiOpenai,
  SiAnthropic,
} from "react-icons/si";
import { FaAws, FaCloud } from "react-icons/fa";
import {
  BookOpen,
  Rocket,
  BrainCircuit,
  Bot,
  Network,
  Cpu,
  Sparkles,
  Layers,
  Terminal,
  Server,
  Zap,
} from "lucide-react";

/* ── Primary Tech Stack ── */
const primaryStack = [
  { label: "Python", Icon: SiPython, color: "#3776AB", tag: "AI & Backend" },
  { label: "FastAPI", Icon: SiFastapi, color: "#009688", tag: "REST APIs" },
  { label: "Node.js", Icon: SiNodedotjs, color: "#5fa04e", tag: "Runtime" },
  { label: "React", Icon: SiReact, color: "#61dafb", tag: "Frontend" },
  { label: "Next.js", Icon: SiNextdotjs, color: "var(--app-text)", tag: "Full-Stack" },
  { label: "Express", Icon: SiExpress, color: "var(--app-text)", tag: "API Framework" },
  { label: "MongoDB", Icon: SiMongodb, color: "#47a248", tag: "NoSQL Database" },
  { label: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8", tag: "Styling" },
  { label: "JavaScript", Icon: SiJavascript, color: "#f7df1e", tag: "Core Language" },
  { label: "Git & GitHub", Icon: SiGit, color: "#f05032", tag: "Version Control" },
  { label: "HTML5", Icon: SiHtml5, color: "#e34f26", tag: "Markup" },
  { label: "CSS3", Icon: SiCss, color: "#1572b6", tag: "Stylesheets" },
];

/* ── AI & LLM Development Pillars ── */
const aiPillars = [
  {
    title: "LLM Orchestration & Prompting",
    icon: SiAnthropic,
    color: "#D97706",
    badge: "Claude 3.5 & GPT-4o",
    description:
      "Engineers prompt pipelines, structured JSON function calling, context window optimization, and real-time Server-Sent Event (SSE) streaming responses.",
    tags: ["Claude API", "OpenAI", "Prompt Engineering", "Token Optimization"],
  },
  {
    title: "Autonomous Agent Pipelines",
    icon: Bot,
    color: "#10B981",
    badge: "Multi-Agent Systems",
    description:
      "Builds decoupled multi-agent architectures combining Playwright browser stealth, contact mining heuristics, and LLM copywriting agents.",
    tags: ["Agentic Workflows", "Playwright Stealth", "Task Orchestration", "Async Workers"],
  },
  {
    title: "High-Throughput REST APIs",
    icon: Network,
    color: "#06B6D4",
    badge: "FastAPI & Python",
    description:
      "Designs non-blocking asynchronous RESTful endpoints with Pydantic validation, OpenAPI documentation, connection pooling, and JWT authorization.",
    tags: ["FastAPI", "AsyncIO", "Pydantic", "REST Architecture", "SSE Streaming"],
  },
  {
    title: "AI-Powered Velocity & Tooling",
    icon: BrainCircuit,
    color: "#8B5CF6",
    badge: "AI IDEs & Pair Coding",
    description:
      "Deep daily expertise using Claude Code, Cursor, Trae, Codex, and Aider to accelerate feature delivery, eliminate boilerplate, and execute automated refactoring.",
    tags: ["Claude Code", "Cursor AI", "Trae IDE", "Codex", "Aider CLI", "Code Velocity"],
  },
];

/* ── Currently Deepening ── */
const currentlyLearning = [
  { label: "LangChain & Vector RAG", Icon: SiPython, color: "#3776AB", detail: "Document embeddings & vector search" },
  { label: "PostgreSQL & pgvector", Icon: SiPostgresql, color: "#4169e1", detail: "Relational data & similarity indexes" },
  { label: "OpenAI Realtime API", Icon: SiOpenai, color: "#10a37f", detail: "Low-latency bidirectional streaming" },
];

/* ── Cloud & Infrastructure ── */
const cloudInfrastructure = [
  { label: "Docker", Icon: SiDocker, color: "#2496ed" },
  { label: "AWS Cloud", Icon: FaAws, color: "#ff9900" },
  { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088ff" },
  { label: "Cloud Services", Icon: FaCloud, color: "#818cf8" },
  { label: "MySQL / SQL", Icon: SiMysql, color: "#4479a1" },
];

export function TechStackShowcase() {
  return (
    <div className="space-y-10">
      {/* ── Spotlight: AI & LLM Development Engineering ── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="size-5 text-emerald-400 animate-pulse" aria-hidden="true" />
            <h3 className="text-base font-bold text-[var(--app-text)]">
              AI, LLM & Python REST API Specialization
            </h3>
          </div>
          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
            Core Focus 2026
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {aiPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="lift-card glass-panel rounded-xl p-5 border border-[var(--app-border)] hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: `${pillar.color}15`, borderColor: `${pillar.color}35` }}
                      className="grid size-10 place-items-center rounded-lg border transition-transform duration-300 group-hover:scale-110"
                    >
                      <Icon className="size-5" style={{ color: pillar.color }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--app-text)] group-hover:text-emerald-400 transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] font-mono text-[var(--app-muted)]">{pillar.badge}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[var(--app-muted)] leading-relaxed min-h-11">
                  {pillar.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[var(--app-border)]">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--app-border)] bg-[var(--app-bg)] px-2 py-0.5 text-[11px] font-mono text-[var(--app-soft)] group-hover:text-[var(--app-text)] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Primary Tech Stack ── */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Terminal className="size-4 text-cyan-400" aria-hidden="true" />
          <p className="text-sm font-semibold text-[var(--app-muted)]">Core Technologies & Frameworks</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {primaryStack.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.label}
                className="glass-tile group lift-card flex min-h-24 items-center gap-3 rounded-lg p-3.5 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <Icon
                    className="size-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12"
                    style={{ color: item.color }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--app-text)] transition-colors duration-200 group-hover:text-emerald-500 truncate">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[11px] font-mono text-[var(--app-muted)] group-hover:text-[var(--app-soft)] truncate">
                    {item.tag}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Currently Deepening in AI & Data ── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="size-4 text-cyan-500 animate-pulse" aria-hidden="true" />
          <p className="text-sm font-semibold text-[var(--app-muted)]">Currently Deepening (AI & Data)</p>
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
                  <Icon
                    className="size-6 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12"
                    style={{ color: item.color }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--app-text)] transition-colors duration-200 group-hover:text-cyan-500">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--app-muted)] transition-colors duration-200 group-hover:text-[var(--app-soft)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Cloud & DevOps ── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Rocket className="size-4 text-amber-500 animate-pulse" aria-hidden="true" />
          <p className="text-sm font-semibold text-[var(--app-muted)]">Cloud & Infrastructure</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {cloudInfrastructure.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.label}
                className="group lift-card flex min-h-20 items-center gap-3 rounded-lg border border-dashed border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-card)_40%,transparent)] backdrop-blur-md p-3.5 transition-all duration-300 hover:border-amber-500/40 hover:bg-[color-mix(in_srgb,var(--app-card)_64%,transparent)]"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-dashed border-[var(--app-border)] bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-110 group-hover:border-amber-500/30 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <Icon
                    className="size-5 opacity-70 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6"
                    style={{ color: item.color }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--app-muted)] transition-colors duration-200 group-hover:text-amber-500">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-[var(--app-soft)]">Deployment</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

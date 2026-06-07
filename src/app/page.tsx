"use client";

import { DeveloperCore } from "@/components/developer-core";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { TechStackShowcase } from "@/components/tech-stack-showcase";
import { dashboardWidgets, systemProfile } from "@/lib/data";
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Server,
  Mail,
} from "lucide-react";
import {
  SiGithub,
  SiWakatime,
  SiLeetcode,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

function SocialLink({
  href,
  name,
  icon,
  color,
}: {
  href: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="button-scale inline-flex h-9 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-3 text-xs font-semibold transition-all duration-300 hover:border-emerald-500/40 hover:text-emerald-500 hover:shadow-md"
      title={`Open ${name} profile`}
    >
      <span style={{ color: color }} className="transition-transform duration-300 hover:scale-110">
        {icon}
      </span>
      <span className="text-[var(--app-muted)] hover:text-[var(--app-text)]">{name}</span>
    </a>
  );
}

export default function Home() {
  return (
    <PageTransition className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1fr_480px]">
        <div className="glass-panel rounded-lg p-5 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-border)] pb-4">
            <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-1.5 text-xs font-semibold">
              <Activity className="size-3.5 text-emerald-500" aria-hidden="true" />
              PORTFOLIO CORE ENVIRONMENT
            </div>
            <span className="text-xs text-[var(--app-muted)]">v1.0.0-beta</span>
          </div>

          {/* Developer Profile Header with Avatar Image & Social Icons */}
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6 border-b border-[var(--app-border)] pb-6">
            <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-indigo-500/20 p-0.5 transition-all duration-300 hover:border-emerald-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <div className="h-full w-full overflow-hidden rounded-[14px] bg-[var(--app-bg)]">
                <img
                  src="/profile.png"
                  alt="Nurul Shaikh"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.getElementById('avatar-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  id="avatar-fallback"
                  className="hidden h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-indigo-500/20 text-2xl font-bold text-emerald-400"
                >
                  NS
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-[var(--app-card)] bg-emerald-500 flex items-center justify-center">
                <span className="absolute h-3 w-3 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--app-text)] hover:text-emerald-500 transition-colors duration-200 truncate">
                  {systemProfile.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {systemProfile.developer}
                </span>
              </div>
              <p className="text-emerald-500 font-medium text-sm mt-0.5">{systemProfile.role}</p>
              
              {/* Social Brand Links Grid */}
              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
                <SocialLink href={systemProfile.socials.github} name="GitHub" icon={<SiGithub className="size-4" />} color="#71717a" />
                <SocialLink href={systemProfile.socials.linkedin} name="LinkedIn" icon={<FaLinkedin className="size-4" />} color="#0077b5" />
                <SocialLink href={systemProfile.socials.wakatime} name="WakaTime" icon={<SiWakatime className="size-4" />} color="#4f46e5" />
                <SocialLink href={systemProfile.socials.leetcode} name="LeetCode" icon={<SiLeetcode className="size-4" />} color="#f89f1b" />
                <SocialLink href={`mailto:${systemProfile.email}`} name="Email" icon={<Mail className="size-4" />} color="#10b981" />
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <StatusBlock label="Name" value={systemProfile.name} icon={<Cpu />} />
            <StatusBlock label="Role" value={systemProfile.role} icon={<Server />} />
            <StatusBlock
              label="Current Focus"
              value={systemProfile.currentFocus.join(" / ")}
              icon={<Database />}
            />
            <StatusBlock
              label="Availability"
              value={systemProfile.availability}
              icon={<CheckCircle2 />}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="button-scale inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--app-text)] px-4 text-sm font-semibold text-[var(--app-bg)] hover:shadow-lg hover:shadow-emerald-500/10"
            >
              Explore Projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              className="button-scale inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-4 text-sm font-semibold hover:border-emerald-500/40"
            >
              Resume Overview
            </Link>
          </div>
        </div>

        <div className="order-first xl:order-none">
          <DeveloperCore />
        </div>
      </section>

      <MotionSection className="space-y-4">
        <div>
          <p className="text-sm text-[var(--app-muted)]">Tech Stack Runtime</p>
          <h2 className="text-2xl font-semibold text-[var(--app-text)]">Tech Stack</h2>
        </div>
        <TechStackShowcase />
      </MotionSection>

      <MotionSection className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardWidgets.map((widget, index) => {
          const icons = [GitBranch, Activity, BookOpenCheck, CheckCircle2];
          const Icon = icons[index];

          return (
            <div
              key={widget.label}
              className="lift-card glass-panel rounded-lg p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-[var(--app-muted)] font-semibold">{widget.label}</p>
                <Icon className="size-4 text-emerald-500" aria-hidden="true" />
              </div>
              <p className="text-2xl font-semibold text-[var(--app-text)]">{widget.value}</p>
              <p className="mt-2 text-sm text-[var(--app-muted)]">{widget.detail}</p>
            </div>
          );
        })}
      </MotionSection>
    </PageTransition>
  );
}

function StatusBlock({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactElement;
}) {
  return (
    <div className="group rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm p-4 transition-all duration-300 hover:border-emerald-500/40 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="mb-3 flex items-center gap-2 text-sm text-[var(--app-muted)] transition-colors duration-300 group-hover:text-[var(--app-text)]">
        <span className="[&>svg]:size-4 [&>svg]:text-emerald-500 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-6">{icon}</span>
        {label}
      </div>
      <p className="text-lg font-semibold leading-7 text-[var(--app-text)] transition-colors duration-300 group-hover:text-emerald-500">{value}</p>
    </div>
  );
}

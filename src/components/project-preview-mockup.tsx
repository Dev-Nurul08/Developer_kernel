"use client";

import { Activity, Terminal, ShieldCheck, Sun, Cpu, CheckCircle2, Zap, Play, Layers } from "lucide-react";

interface ProjectPreviewMockupProps {
  mockupType?: "terminal" | "canvas3d" | "portal" | "dashboard" | "api" | "learning";
  title: string;
  description: string;
}

export function ProjectPreviewMockup({
  mockupType = "dashboard",
  title,
  description,
}: ProjectPreviewMockupProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_80%,transparent)] backdrop-blur-md transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b border-[var(--app-border)] bg-[var(--app-card)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs text-[var(--app-muted)]">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE SIMULATION
          </span>
        </div>
      </div>

      {/* Mockup Canvas / Interface Viewport */}
      <div className="relative min-h-[220px] p-4 sm:p-5 font-sans">
        {mockupType === "terminal" && (
          <div className="font-mono text-xs text-emerald-400 space-y-2 bg-black/60 p-4 rounded-lg border border-emerald-500/20 shadow-inner">
            <div className="flex items-center justify-between text-[var(--app-muted)] border-b border-emerald-500/10 pb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Terminal className="size-3.5" /> [LEADFORGE-AI ENGINE v2.4]
              </span>
              <span className="text-[10px]">SSE STREAM ACTIVE</span>
            </div>
            <p className="text-zinc-400">[04:02:11] <span className="text-cyan-400">ScoutAgent</span>: Scraping 45 B2B leads in 'San Francisco' (Niche: SaaS)...</p>
            <p className="text-zinc-400">[04:02:14] <span className="text-amber-400">EnrichmentAgent</span>: Extracted 38 emails, 42 direct phone lines, 5 social links.</p>
            <p className="text-zinc-400">[04:02:18] <span className="text-purple-400">AuditorAgent</span>: Lighthouse PageSpeed score: <span className="text-rose-400">42/100</span> (LCP: 4.8s). Missing meta description.</p>
            <p className="text-emerald-300 font-semibold">[04:02:22] <span className="text-emerald-400">CopywriterAgent (Claude 3.5)</span>: Generated customized pitch hook. Tier A lead queued for outreach!</p>
          </div>
        )}

        {mockupType === "canvas3d" && (
          <div className="relative h-48 rounded-lg border border-cyan-500/30 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/80 p-4 overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 rounded-md bg-black/50 border border-cyan-500/30 px-2.5 py-1 text-xs text-cyan-300">
                <Sun className="size-3.5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span>Diurnal Solar Angle: 48° NW</span>
              </div>
              <span className="rounded-md bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 text-[11px] font-bold text-emerald-400">
                112.4 FPS WebGL
              </span>
            </div>

            {/* Simulated 3D Rooftop WebGL Graphic */}
            <div className="my-auto flex items-center justify-center gap-3">
              <div className="relative w-44 h-20 rounded-md border-2 border-cyan-400/40 bg-cyan-950/40 backdrop-blur-sm p-1.5 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col justify-between">
                <div className="grid grid-cols-6 gap-1 h-full">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-sm bg-gradient-to-tr from-cyan-600 to-blue-500 border border-cyan-300/40 shadow-xs hover:brightness-125 transition-all" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 z-10 border-t border-slate-800 pt-2">
              <span>Panel Capacity: 14.8 kWp</span>
              <span className="text-emerald-400 font-semibold">Annual ROI: ₹1,85,000 / yr</span>
            </div>
          </div>
        )}

        {mockupType === "portal" && (
          <div className="space-y-3 bg-zinc-900/90 p-4 rounded-lg border border-amber-500/20">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-400" />
                <span className="text-xs font-bold text-zinc-100">सूर्यपुरा ग्राम पंचायत ई-गवर्नेंस पोर्टल</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded px-1.5 py-0.5 font-bold">
                डिजिटल प्रमाणित (QR Verified)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-zinc-800/80 border border-zinc-700">
                <p className="text-[10px] text-zinc-400">आवेदक का नाम (Applicant)</p>
                <p className="font-semibold text-zinc-200 mt-0.5">Rahul Shaikh</p>
                <p className="text-[10px] text-emerald-400 mt-1">आय प्रमाण पत्र: जारी (Approved)</p>
              </div>
              <div className="p-2.5 rounded bg-zinc-800/80 border border-zinc-700 flex flex-col items-center justify-center">
                <div className="h-10 w-10 bg-white p-1 rounded flex items-center justify-center shadow">
                  <div className="h-full w-full bg-black flex items-center justify-center text-[8px] text-white font-mono font-bold">
                    QR SECURE
                  </div>
                </div>
                <span className="text-[9px] text-zinc-400 mt-1">Scan for Instant Verification</span>
              </div>
            </div>
          </div>
        )}

        {mockupType === "dashboard" && (
          <div className="space-y-3 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Activity className="size-3.5 text-emerald-400" /> Operational Metrics Overview
              </span>
              <span className="text-[10px] text-emerald-400">Live Telemetry</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <p className="text-[10px] text-slate-400">Total Throughput</p>
                <p className="text-base font-bold text-slate-100 mt-1">1,240 / day</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <p className="text-[10px] text-slate-400">Avg Latency</p>
                <p className="text-base font-bold text-emerald-400 mt-1">18ms</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <p className="text-[10px] text-slate-400">Health Index</p>
                <p className="text-base font-bold text-cyan-400 mt-1">99.8%</p>
              </div>
            </div>
          </div>
        )}

        {mockupType === "api" && (
          <div className="font-mono text-xs space-y-2 bg-slate-950 p-4 rounded-lg border border-blue-500/20 text-slate-300">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="text-blue-400 flex items-center gap-1.5 font-bold">
                <Zap className="size-3.5 text-amber-400" /> REST API EXPLORER
              </span>
              <span className="text-[10px] text-emerald-400">STATUS 200 OK</span>
            </div>
            <p className="text-emerald-400"><span className="text-purple-400">POST</span> /api/v1/resource/dispatch</p>
            <div className="bg-slate-900 p-2.5 rounded text-[11px] text-slate-300 overflow-x-auto border border-slate-800">
              <span className="text-cyan-300">&#123;</span><br />
              &nbsp;&nbsp;<span className="text-rose-300">"status"</span>: <span className="text-emerald-300">"success"</span>,<br />
              &nbsp;&nbsp;<span className="text-rose-300">"executionTime"</span>: <span className="text-amber-300">"14ms"</span>,<br />
              &nbsp;&nbsp;<span className="text-rose-300">"payload"</span>: &#123; <span className="text-rose-300">"assignedAgent"</span>: <span className="text-emerald-300">"Nurul-Bot-01"</span> &#125;<br />
              <span className="text-cyan-300">&#125;</span>
            </div>
          </div>
        )}

        {mockupType === "learning" && (
          <div className="space-y-3 bg-zinc-950 p-4 rounded-lg border border-indigo-500/20">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-xs">
              <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <Layers className="size-3.5 text-indigo-400" /> Learner Capability Matrix
              </span>
              <span className="text-[10px] text-amber-400 font-bold">🔥 14-Day Streak</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-300 font-medium">Three.js & WebGL Shaders</span>
                <span className="text-emerald-400 font-bold">Completed (100%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-300 font-medium">FastAPI & Async Queue Workers</span>
                <span className="text-cyan-400 font-bold">In Progress (85%)</span>
              </div>
            </div>
          </div>
        )}

        <p className="mt-3 text-xs leading-5 text-[var(--app-muted)] italic">{description}</p>
      </div>
    </div>
  );
}

"use client";

import { certificates } from "@/lib/data";
import clsx from "clsx";
import { Download, FileBadge, FolderOpen, ShieldCheck, Eye } from "lucide-react";
import { useMemo, useState } from "react";

export function CertificateExplorer() {
  const categories = useMemo(
    () => Array.from(new Set(certificates.map((certificate) => certificate.category))),
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [viewMode, setViewMode] = useState<"visual" | "summary">("visual");

  const selected =
    certificates.find((certificate) => certificate.category === selectedCategory) ??
    certificates[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="glass-panel rounded-lg p-3">
        <div className="mb-3 flex items-center gap-2 px-2 py-1 text-sm font-semibold text-[var(--app-text)]">
          <FolderOpen className="size-4 text-emerald-500 animate-pulse" aria-hidden="true" />
          Certificate Explorer
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                "button-scale flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-300",
                selectedCategory === category
                  ? "border border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-text)] shadow-sm font-medium"
                  : "text-[var(--app-muted)] hover:bg-[color-mix(in_srgb,var(--app-bg)_50%,transparent)] hover:text-[var(--app-text)] hover:translate-x-1",
              )}
            >
              <FileBadge className="size-4 text-[var(--app-soft)]" aria-hidden="true" />
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--app-border)] px-5 py-4 gap-3">
          <div>
            <p className="text-xs text-[var(--app-muted)]">Verified Credential Document</p>
            <h2 className="text-lg font-semibold text-[var(--app-text)]">{selected.title}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("visual")}
                className={clsx(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all font-medium",
                  viewMode === "visual"
                    ? "bg-emerald-500 text-slate-950 font-semibold"
                    : "text-[var(--app-muted)] hover:text-[var(--app-text)]",
                )}
              >
                <Eye className="size-3.5" /> Real Certificate
              </button>
              <button
                type="button"
                onClick={() => setViewMode("summary")}
                className={clsx(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all font-medium",
                  viewMode === "summary"
                    ? "bg-emerald-500 text-slate-950 font-semibold"
                    : "text-[var(--app-muted)] hover:text-[var(--app-text)]",
                )}
              >
                Summary
              </button>
            </div>

            {/* Direct Download Button for Real Certificate */}
            <a
              href={selected.downloadUrl || selected.image}
              download={`${selected.title.replace(/[^a-zA-Z0-9]/g, "_")}.svg`}
              target="_blank"
              rel="noreferrer"
              className="button-scale inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Download className="size-4" /> Download Certificate
            </a>
          </div>
        </div>

        <div className="p-5">
          {viewMode === "visual" ? (
            /* Visual Real Certificate Image Container */
            <div className="space-y-4">
              <div className="relative rounded-xl border-2 border-emerald-500/30 bg-black/40 p-2 overflow-hidden shadow-2xl group">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-auto rounded-lg object-contain max-h-[550px] shadow-lg transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--app-muted)] border-t border-[var(--app-border)] pt-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span>Authentic Verified Document issued by <strong className="text-[var(--app-text)]">{selected.issuer}</strong></span>
                </div>
                <a
                  href={selected.downloadUrl || selected.image}
                  download={`${selected.title.replace(/[^a-zA-Z0-9]/g, "_")}.svg`}
                  className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <Download className="size-3.5" /> Download High-Res File
                </a>
              </div>
            </div>
          ) : (
            /* Summary View */
            <div className="relative min-h-[380px] rounded-xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-[color-mix(in_srgb,var(--app-bg)_90%,transparent)] to-[var(--app-bg)] p-6 sm:p-8 shadow-xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
              
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-[var(--app-border)] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-400">{selected.issuer}</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-[var(--app-text)]">{selected.title}</h3>
                  {'internId' in selected && selected.internId ? (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber-300">
                      INTERN ID: {selected.internId}
                    </span>
                  ) : 'credentialId' in selected && selected.credentialId ? (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-300">
                      CREDENTIAL ID: {selected.credentialId}
                    </span>
                  ) : null}
                </div>
                <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-300">
                  {selected.date}
                </span>
              </div>

              <div className="space-y-4">
                <p className="max-w-2xl text-sm leading-7 text-[var(--app-text)] font-medium">
                  {selected.summary}
                </p>

                {selected.ceo && (
                  <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-xs space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-zinc-300 font-semibold border-b border-amber-500/20 pb-2">
                      <span>Awarded To: <strong className="text-white">Nurul Shaikh</strong></span>
                      <span>Issuer / Track: <strong className="text-emerald-400">{selected.issuer}</strong></span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-zinc-400 pt-1 font-mono">
                      <span>Date: {selected.date}</span>
                      <span className="text-amber-400">Authority: {selected.ceo}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ["Credential Status", "Active & Verified"],
                  ["Issued By", selected.issuer],
                  ["Portfolio Link", "Authentic Record"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="lift-card rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] p-3.5 hover:border-amber-500/40 transition-colors"
                  >
                    <p className="text-[11px] font-semibold text-[var(--app-muted)] uppercase tracking-wider">{label}</p>
                    <p className="mt-1 text-xs font-bold text-amber-400 truncate">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


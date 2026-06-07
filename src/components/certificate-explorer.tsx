"use client";

import { certificates } from "@/lib/data";
import clsx from "clsx";
import { FileBadge, FolderOpen, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

export function CertificateExplorer() {
  const categories = useMemo(
    () => Array.from(new Set(certificates.map((certificate) => certificate.category))),
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
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

      <div className="glass-panel rounded-lg">
        <div className="flex items-center justify-between border-b border-[var(--app-border)] px-5 py-4">
          <div>
            <p className="text-xs text-[var(--app-muted)]">Preview</p>
            <h2 className="text-lg font-semibold text-[var(--app-text)]">{selected.title}</h2>
          </div>
          <ShieldCheck className="size-5 text-emerald-500" aria-hidden="true" />
        </div>

        <div className="p-5">
          <div className="min-h-[360px] rounded-lg border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_50%,transparent)] backdrop-blur-sm p-6">
            <div className="mb-12 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--app-muted)]">{selected.issuer}</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--app-text)]">{selected.title}</h3>
              </div>
              <span className="rounded-md border border-[var(--app-border)] px-3 py-1 text-sm bg-[color-mix(in_srgb,var(--app-bg)_40%,transparent)] backdrop-blur-sm">
                {selected.date}
              </span>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[var(--app-muted)]">
              {selected.summary}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {["Credential", "Verified", "Portfolio Ready"].map((label) => (
                <div
                  key={label}
                  className="lift-card glass-tile rounded-lg p-4 hover:border-emerald-500/30"
                >
                  <p className="text-xs text-[var(--app-muted)]">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-500">Active</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

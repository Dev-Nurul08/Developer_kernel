"use client";

import clsx from "clsx";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MailPlus,
  Sparkles,
  SunMoon,
  Timeline,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { IntroLoader } from "./intro-loader";

function shouldShowIntroLoader(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const navEntry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  // Only show on first visit or a full browser refresh — not on client-side route changes.
  return navEntry?.type === "navigate" || navEntry?.type === "reload";
}

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Skills", href: "/skills", icon: Code2 },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Experience", href: "/experience", icon: Timeline },
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "Contact", href: "/contact", icon: MailPlus },
  { label: "Resume", href: "/resume", icon: FileText },
];

type ThemeMode = "light" | "dark";
const themeStorageKey = "nurul-os-theme";
const themeChangeEvent = "nurul-os-theme-change";

function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  return (window.localStorage.getItem(themeStorageKey) as ThemeMode | null) ?? "dark";
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

function setStoredTheme(theme: ThemeMode) {
  window.localStorage.setItem(themeStorageKey, theme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "dark");

  const [showIntro, setShowIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (shouldShowIntroLoader()) {
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  const activeLabel = useMemo(() => {
    const active = navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    );

    return active?.label ?? "Dashboard";
  }, [pathname]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const displayTheme = mounted ? theme : "dark";

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
      <aside className="fixed inset-y-0 left-0 z-50 flex w-16 flex-col border-r border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-card)_86%,transparent)] backdrop-blur-xl lg:w-72">
        <div className="flex h-16 items-center justify-center gap-3 border-b border-[var(--app-border)] px-2 lg:justify-start lg:px-5">
          <div className="grid size-10 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)]">
            <Sparkles className="size-5 text-emerald-500" aria-hidden="true" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold">Nurul OS v1.0</p>
            <p className="text-xs text-[var(--app-muted)]">Developer Platform</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-2 py-5 lg:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

             return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={clsx(
                  "group flex h-11 items-center justify-center gap-3 rounded-lg px-3 text-sm transition-all duration-300 lg:justify-start",
                  active
                    ? "border border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-text)] shadow-sm"
                    : "text-[var(--app-muted)] hover:bg-[var(--app-bg)] hover:text-[var(--app-text)] hover:translate-x-1",
                )}
                title={item.label}
              >
                <Icon
                  className={clsx(
                    "size-5 transition-all duration-300 ease-out group-hover:scale-110 lg:size-4",
                    active ? "text-emerald-500" : "text-[var(--app-soft)] group-hover:text-emerald-500",
                  )}
                  aria-hidden="true"
                />
                <span className="hidden lg:inline transition-colors duration-200">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden border-t border-[var(--app-border)] p-4 lg:block">
          <div className="rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-[var(--app-muted)]">Workspace</span>
              <span className="status-dot" />
            </div>
            <p className="text-sm font-semibold">Open for Projects</p>
            <p className="mt-1 text-xs leading-5 text-[var(--app-muted)]">
              Node.js, MongoDB, and backend architecture.
            </p>
          </div>
        </div>

        {/* Theme Toggle inside Sidebar */}
        <div className="border-t border-[var(--app-border)] p-2 lg:p-4 flex flex-col items-center justify-center lg:items-stretch">
          <button
            type="button"
            onClick={() => setStoredTheme(displayTheme === "dark" ? "light" : "dark")}
            className="group flex h-11 w-full items-center justify-center gap-3 rounded-lg px-3 text-sm transition-all duration-300 text-[var(--app-muted)] hover:bg-[var(--app-bg)] hover:text-[var(--app-text)] hover:shadow-sm hover:border hover:border-[var(--app-border)] border border-transparent lg:justify-start"
            title={displayTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            <SunMoon className="size-5 transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-emerald-500 lg:size-4 text-[var(--app-soft)]" aria-hidden="true" />
            <span className="hidden lg:inline font-medium">
              {displayTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </aside>

      <div className="relative pl-16 lg:pl-72">
        {showIntro && (
          <div className="fixed inset-y-0 left-16 right-0 z-[60] lg:left-72">
            <IntroLoader onComplete={handleIntroComplete} />
          </div>
        )}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_88%,transparent)] px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{activeLabel}</p>
              <p className="truncate text-xs text-[var(--app-muted)]">
                Personal Operating System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-xs text-[var(--app-muted)] sm:flex hover:border-emerald-500/30 transition-colors duration-300">
              <BriefcaseBusiness className="size-4 text-emerald-500 animate-pulse" aria-hidden="true" />
              Developer: Online
            </div>
            <button
              type="button"
              onClick={() => setStoredTheme(displayTheme === "dark" ? "light" : "dark")}
              className="button-scale group grid size-10 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text)] hover:border-emerald-500/50 hover:text-emerald-500 transition-colors duration-300"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <SunMoon className="size-4 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

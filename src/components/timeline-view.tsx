"use client";

import { experienceTimeline } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function TimelineView() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 72%",
            end: "bottom 36%",
            scrub: true,
          },
        },
      );
    }, wrapperRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="absolute bottom-8 left-[22px] top-8 w-px bg-[var(--app-border)]" />
      <div
        ref={fillRef}
        className="absolute bottom-8 left-[22px] top-8 w-px origin-bottom bg-emerald-500"
      />

      <div className="space-y-6">
        {experienceTimeline.map((item) => (
          <div key={`${item.year}-${item.title}`} className="group relative grid gap-4 pl-14">
            <div className="absolute left-[14px] top-1.5 grid size-5 place-items-center rounded-full border border-emerald-500 bg-[var(--app-bg)] transition-all duration-300 group-hover:scale-125 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="lift-card glass-panel rounded-lg p-5">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-[var(--app-border)] bg-[color-mix(in_srgb,var(--app-bg)_60%,transparent)] backdrop-blur-sm px-2 py-1 text-xs font-semibold text-emerald-500 group-hover:scale-105 transition-transform duration-300">
                  {item.year}
                </span>
                <h3 className="text-base font-semibold text-[var(--app-text)] group-hover:text-emerald-500 transition-colors duration-300">{item.title}</h3>
              </div>
              <p className="text-sm leading-6 text-[var(--app-muted)] transition-colors duration-300 group-hover:text-[var(--app-text)]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

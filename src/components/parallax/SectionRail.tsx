"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { index: "01", label: "Início" },
  { index: "02", label: "O desafio" },
  { index: "03", label: "A solução" },
  { index: "04", label: "Funcionalidades" },
  { index: "05", label: "Depoimentos" },
  { index: "06", label: "Comece agora" },
];

export default function SectionRail() {
  const [active, setActive] = useState("01");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-scene");
            if (idx) setActive(idx);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function goTo(index: string) {
    const target = document.querySelector<HTMLElement>(`[data-scene="${index}"]`);
    if (!target) return;

    // Not scrollIntoView/scrollTo({behavior:"smooth"}): this page's
    // ParallaxScene instances mutate their sticky image's height/margin on
    // every scroll event, and that layout shift makes the browser's native
    // smooth-scroll implementation stall at 0 instead of animating (verified:
    // identical smooth scrollTo works fine on a page without those
    // listeners). A manual rAF loop just keeps pushing scrollY forward every
    // frame regardless of what else is reacting to scroll, so it can't get
    // stuck the same way.
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    const duration = 600;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      return;
    }

    const startTime = performance.now();
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  return (
    <div className="fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 items-stretch gap-3 lg:flex">
      <div className="rail-progress-track flex-shrink-0">
        <div className="rail-progress-fill" />
      </div>
      <div className="flex flex-col items-end justify-between gap-3">
        {ITEMS.map((item) => {
          const isActive = active === item.index;
          return (
            <button
              key={item.index}
              type="button"
              onClick={() => goTo(item.index)}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 shadow-sm backdrop-blur transition-all duration-300 hover:opacity-100 hover:shadow-md focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-body">
                {item.label}
              </span>
              <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-body/60"}`}>
                {item.index}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

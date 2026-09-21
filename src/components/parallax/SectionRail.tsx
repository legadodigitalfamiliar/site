"use client";

import { useEffect, useState } from "react";
import { scrollToElement } from "@/lib/scrollToId";

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
  const [visible, setVisible] = useState(true);

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

  // The rail only makes sense while scrolling through the parallax scenes it
  // navigates — once the page moves past the last one (into the plans/pricing
  // content below), hide it. Checked on scroll (same rAF-throttled pattern as
  // ParallaxScene's own handler) rather than IntersectionObserver, so it
  // reliably re-evaluates on every scroll position instead of only at
  // threshold-crossing moments.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-scene]");
    const lastSection = sections[sections.length - 1];
    if (!lastSection) return;

    let ticking = false;
    function update() {
      ticking = false;
      setVisible(lastSection.getBoundingClientRect().bottom > 0);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function goTo(index: string) {
    const target = document.querySelector<HTMLElement>(`[data-scene="${index}"]`);
    if (!target) return;
    scrollToElement(target);
  }

  return (
    <div
      className={`fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 items-stretch gap-3 transition-opacity duration-300 lg:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
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

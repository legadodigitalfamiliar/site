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

  return (
    <div className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 items-stretch gap-3 lg:flex">
      <div className="rail-progress-track flex-shrink-0">
        <div className="rail-progress-fill" />
      </div>
      <div className="flex flex-col items-end justify-between gap-3">
        {ITEMS.map((item) => {
          const isActive = active === item.index;
          return (
            <div
              key={item.index}
              className={`flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 shadow-sm backdrop-blur transition-all duration-300 ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-body">
                {item.label}
              </span>
              <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-body/60"}`}>
                {item.index}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

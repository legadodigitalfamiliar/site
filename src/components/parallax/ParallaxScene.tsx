"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

export type SceneCta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export type ScenePanel = {
  /** Anchor id for this panel (nav links target this, not the outer section). */
  id?: string;
  /** Rail index, e.g. "01". Required — used both for the rail and as the React key. */
  index: string;
  align?: "left" | "center";
  eyebrow: string;
  title: ReactNode;
  description?: string;
  ctas?: SceneCta[];
  children?: ReactNode;
  minHeightClass?: string;
};

export default function ParallaxScene({
  image,
  imagePriority = false,
  overlay = "dark",
  speed = 0.6,
  maxZoom = 0.2,
  maxPan = 100,
  panels,
  id,
  index,
  align = "left",
  eyebrow,
  title,
  description,
  ctas,
  children,
  minHeightClass = "min-h-screen",
}: {
  image?: string;
  imagePriority?: boolean;
  overlay?: "dark" | "light";
  /** Pan strength, 0-1 (multiplies maxPan). */
  speed?: number;
  /** Max zoom-in at the start of the scene, as a fraction (0.2 = 20%). Eases to 1 (no zoom) by the end. */
  maxZoom?: number;
  /** Max pan distance in px at the start of the scene. Eases to 0 by the end. */
  maxPan?: number;
  /**
   * Multiple content panels sharing ONE continuous background image and ONE
   * parallax calculation — use this instead of stacking two ParallaxScene
   * instances with the same `image`, which would produce a visible seam
   * (each section computes its own independent offset, so two crops of the
   * same photo end up misaligned at the boundary).
   */
  panels?: ScenePanel[];
  // Shorthand for a single-panel scene — wrapped into `panels` internally.
  id?: string;
  index?: string;
  align?: "left" | "center";
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  ctas?: SceneCta[];
  children?: ReactNode;
  minHeightClass?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const resolvedPanels: ScenePanel[] =
    panels ??
    [
      {
        id,
        index: index ?? "01",
        align,
        eyebrow: eyebrow ?? "",
        title,
        description,
        ctas,
        children,
        minHeightClass,
      },
    ];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      const bg = bgRef.current;
      if (!el || !bg) return;
      // progress goes 0 -> 1 as the section travels through the viewport
      // (0 = just entering at the bottom, 1 = fully scrolled past the top).
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1);

      // Ken Burns-style settle: the image starts slightly zoomed in and pans,
      // then eases to scale 1 / no offset exactly as the section finishes
      // scrolling past — so it always ends up fully "in place", never left
      // mid-drift. maxZoom is a fraction (0.2 = 20%), maxPan is in pixels.
      const scale = 1 + maxZoom * (1 - progress);
      const offset = (progress - 1) * maxPan * speed;
      bg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
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
  }, [speed, maxZoom, maxPan]);

  const ctaClass = (variant: SceneCta["variant"]) => {
    if (variant === "ghost") {
      return "inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20";
    }
    if (variant === "secondary") {
      return "inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-secondary/90";
    }
    return "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-dark";
  };

  const isDark = overlay === "dark";

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={bgRef}
        // 15vh overscan comfortably covers the default maxPan (100px * speed 0.6 = 60px max).
        className="absolute inset-x-0 -top-[15vh] -bottom-[15vh] will-change-transform"
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority={imagePriority}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="bg-grain h-full w-full bg-gradient-to-br from-primary via-primary-dark to-title" />
        )}
      </div>

      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-title/75 via-title/45 to-title/80"
            : "bg-gradient-to-b from-paper/90 via-paper/55 to-paper/90"
        }`}
      />

      <div className="relative z-10">
        {resolvedPanels.map((panel) => (
          <div
            key={panel.index}
            id={panel.id}
            data-scene={panel.index}
            className={`flex items-center px-6 py-20 ${panel.minHeightClass ?? "min-h-screen"}`}
          >
            <div
              className={`mx-auto w-full max-w-6xl ${panel.align === "center" ? "text-center" : ""}`}
            >
              <div className={`max-w-2xl ${panel.align === "center" ? "mx-auto" : ""}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  {panel.eyebrow}
                </p>
                <h2
                  className={`mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl ${
                    isDark ? "text-white" : "text-title"
                  }`}
                >
                  {panel.title}
                </h2>
                {panel.description && (
                  <p className={`mt-5 max-w-xl text-lg ${isDark ? "text-white/85" : "text-body"}`}>
                    {panel.description}
                  </p>
                )}
                {panel.ctas && panel.ctas.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {panel.ctas.map((cta) => (
                      <a
                        key={cta.label}
                        href={cta.href}
                        target={cta.external ? "_blank" : undefined}
                        rel={cta.external ? "noreferrer" : undefined}
                        className={ctaClass(cta.variant)}
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {panel.children && <div className="mt-12">{panel.children}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

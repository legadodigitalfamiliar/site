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
  /**
   * Skip the scroll-triggered reveal and render this panel fully visible
   * immediately. Use for the very first panel on the page (the hero): it's
   * already inside the viewport at initial load, before any scroll has
   * happened, so a `view()` timeline keyed to "entering" the viewport can
   * leave it stuck invisible instead of ever playing.
   */
  noReveal?: boolean;
};

export default function ParallaxScene({
  image,
  imagePriority = false,
  overlay = "dark",
  zoom = 0.2,
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
  /**
   * How much taller the image is than one viewport, as a fraction (0.2 =
   * 20% extra height, i.e. the minimum "zoom" needed for it to have
   * anywhere to pan). Capped relative to the viewport — not the section's
   * full height — so a tall merged multi-panel scene doesn't force a much
   * bigger zoom than a short one. The image pans upward by exactly that
   * extra amount, reaching the full pan precisely when the section finishes
   * scrolling past (text always scrolls at normal 100% speed).
   */
  zoom?: number;
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

    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      const bg = bgRef.current;
      if (!el || !bg) return;

      const vh = window.innerHeight || 1;
      // The image sits on `position: sticky` (handled in the className
      // below), which is what actually keeps it pinned near the top of
      // the viewport for the whole time the section is scrolling past —
      // that part needs zero JS. On top of that resting position, this
      // adds a small extra pan: the box is `zoom` fraction of a viewport
      // taller than 100vh, and eases upward by exactly that extra amount
      // as the section goes from just-reached-the-top (progress 0) to
      // fully-scrolled-past (progress 1) — landing on the full pan
      // exactly when the section ends, never before or after. zoom = 0
      // means no extra height and no transform at all: fully still.
      const extra = vh * zoom;
      bg.style.height = `${vh + extra}px`;
      bg.style.marginBottom = `${-(vh + extra)}px`;

      if (zoom === 0 || reduced) {
        bg.style.transform = "none";
        return;
      }

      const rect = el.getBoundingClientRect();
      const scrollSpan = Math.max(rect.height - vh, 1);
      const progress = Math.min(Math.max(-rect.top / scrollSpan, 0), 1);
      bg.style.transform = `translate3d(0, ${(-progress * extra).toFixed(1)}px, 0)`;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    if (reduced) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [zoom]);

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
    <section ref={sectionRef} className="relative">
      <div
        ref={bgRef}
        // position: sticky keeps the image pinned near the top of the
        // viewport for as long as the section is scrolling past, then lets
        // it scroll away with the page once the section ends. It's in-flow
        // (unlike absolute), so the scroll handler above also sets an
        // equal-and-opposite negative margin-bottom to cancel the space it
        // would otherwise reserve — without that, its own height would
        // push all of the panel content below it down by that same amount.
        className="sticky top-0 w-full will-change-transform"
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
              <div
                className={`${panel.noReveal ? "" : "scene-reveal"} max-w-2xl ${panel.align === "center" ? "mx-auto" : ""}`}
              >
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
              {panel.children && (
                <div className={`${panel.noReveal ? "" : "scene-reveal-children"} mt-12`}>
                  {panel.children}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

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

  // zoom = 0 means "pinned": the image just sticks to the top of the
  // viewport for as long as the section is scrolling past (via CSS
  // position: sticky), completely still, and only moves on with the page
  // once the section ends — no JS transform loop needed at all.
  const pinned = zoom === 0;

  useEffect(() => {
    if (pinned) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      const bg = bgRef.current;
      if (!el || !bg) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Scrollable distance while this section is "current": how far the
      // viewport travels from the moment the section's top reaches the
      // viewport's top (progress 0) to the moment the section's bottom
      // reaches the viewport's bottom (progress 1) — i.e. the full pass.
      const scrollSpan = Math.max(rect.height - vh, 1);
      const progress = Math.min(Math.max(-rect.top / scrollSpan, 0), 1);

      // The image is oversized by a fixed `zoom` fraction of the viewport
      // (not the section — a tall merged scene would otherwise need a much
      // bigger zoom to keep the same pan/scroll speed ratio). It pans
      // upward by that same extra amount over the full pass, reaching the
      // end of the pan exactly when the section finishes scrolling past.
      const extra = vh * zoom;
      bg.style.height = `${rect.height + extra}px`;
      bg.style.transform = `translate3d(0, ${(-progress * extra).toFixed(1)}px, 0)`;
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
  }, [zoom, pinned]);

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
    <section
      ref={sectionRef}
      // overflow-hidden clips the oversized pan-mode image layer, but it
      // also breaks position:sticky (an overflow-hidden ancestor that
      // never scrolls internally becomes the sticky containing block,
      // which then can't track the viewport) — so it must be dropped
      // entirely in pinned mode, which needs no clipping anyway (the
      // pinned image is exactly one viewport tall, never oversized).
      className={`relative ${pinned ? "" : "overflow-hidden"}`}
    >
      <div
        ref={bgRef}
        className={
          pinned
            ? // Pinned: stays put via native CSS sticky for the whole
              // section — zero movement — then scrolls away with the page
              // the instant the section ends.
              "sticky top-0 h-screen w-full"
            : // h-full is just the pre-hydration fallback; the scroll
              // handler overrides it with an exact px height.
              "absolute inset-x-0 top-0 h-full will-change-transform"
        }
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
              <div className={`scene-reveal max-w-2xl ${panel.align === "center" ? "mx-auto" : ""}`}>
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
                <div className="scene-reveal-children mt-12">{panel.children}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

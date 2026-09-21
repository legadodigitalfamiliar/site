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
  sticky = false,
  seamFade = true,
  shadeBoost = false,
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
   * scrolling past (text always scrolls at normal 100% speed). Only used
   * when `sticky` is false (the default pan mode).
   */
  zoom?: number;
  /**
   * Opt-in alternate mode: the image is `position: sticky` (pinned near
   * the top of the viewport for as long as the section scrolls past, then
   * releases cleanly at the section boundary) with a small `zoom`-fraction
   * pan layered on top, instead of the default absolute-positioned pan.
   * Use sparingly — this changes the underlying mechanism, not just the
   * numbers, so only opt a scene in when it specifically needs the
   * "practically pinned" feel (e.g. the hero). Leave every other scene on
   * the default pan mode.
   */
  sticky?: boolean;
  /**
   * Fade this scene's very top/bottom edge to a solid color so it blends
   * into the neighboring scene at the boundary instead of cutting straight
   * from one photo to another. Defaults on; turn off for a scene where the
   * fade itself looks wrong — e.g. a `sticky` scene, where the fade's
   * position is relative to the (very tall) section rather than to where
   * the pinned image visually releases, so it can render as a stray solid
   * bar instead of a blend.
   */
  seamFade?: boolean;
  /**
   * A small extra flat darkening over the whole photo, on top of the
   * regular overlay — for a scene whose image is busy/detailed enough
   * that text and cards need a touch more separation from it. Subtle by
   * design (a light scrim, not a stronger version of the main overlay).
   */
  shadeBoost?: boolean;
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

      if (sticky) {
        // position: sticky (set in the className below) is what actually
        // keeps the image pinned near the top of the viewport — that part
        // needs zero JS. On top of that resting position, this adds a
        // small extra pan: the box is `zoom` fraction of a viewport taller
        // than 100vh, and eases upward by exactly that extra amount as the
        // section goes from just-reached-the-top (progress 0) to
        // fully-scrolled-past (progress 1). Sticky is in-flow (unlike
        // absolute), so height/margin are also set here to reserve exactly
        // zero net layout space regardless of `zoom`.
        const extra = vh * zoom;
        bg.style.height = `${vh + extra}px`;
        bg.style.marginBottom = `${-(vh + extra)}px`;

        if (zoom === 0 || reduced) {
          bg.style.transform = "none";
          return;
        }

        const rect = el.getBoundingClientRect();
        // Floor scrollSpan to a sensible minimum: a section whose height is
        // barely more than one viewport (e.g. a single min-h-screen panel)
        // would otherwise have a near-zero scrollable distance, compressing
        // the whole 0->1 pan into a couple of scroll pixels — which reads
        // as an instant jump/snap instead of a pan. A floor guarantees the
        // pan always eases over a comfortable minimum distance, even if
        // that means it settles slightly before the section's true end for
        // unusually short sections.
        const scrollSpan = Math.max(rect.height - vh, vh * 0.6);
        const progress = Math.min(Math.max(-rect.top / scrollSpan, 0), 1);
        bg.style.transform = `translate3d(0, ${(-progress * extra).toFixed(1)}px, 0)`;
        return;
      }

      if (reduced) return;

      // Default pan mode: image is absolutely positioned (out of flow) and
      // oversized relative to the whole section, panning across that extra
      // height as the section scrolls past — see zoom's doc comment above.
      // Same minimum-scrollSpan floor as the sticky branch above: a section
      // only barely taller than one viewport (e.g. a single min-h-screen
      // panel with no extra content) would otherwise compress the whole
      // pan into a couple of scroll pixels, reading as a sudden jump
      // instead of a smooth motion.
      const rect = el.getBoundingClientRect();
      const scrollSpan = Math.max(rect.height - vh, vh * 0.6);
      const progress = Math.min(Math.max(-rect.top / scrollSpan, 0), 1);
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
    if (reduced && sticky) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [zoom, sticky]);

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
      {/*
        The clip lives on this dedicated wrapper, not on the <section>
        itself: `overflow` values other than visible/clip make an element a
        scroll container per spec, and putting overflow-hidden on the
        section made it the nearest scroll container for every descendant —
        including the text panels below, whose `animation-timeline: view()`
        blur/rise reveal needs to track the real page scroll. With the
        section itself a non-scrolling "scroll container" of ~zero
        scrollable range, that timeline degenerated to its resolved end
        state immediately, so text appeared already sharp instead of
        blurring in. Scoping the clip to just this image wrapper keeps the
        oversized pan-mode image contained without hijacking the timeline.
        Sticky mode needs no clipping (nothing sticks out past the viewport
        edges) and must stay unclipped anyway, since a non-scrolling
        overflow-hidden ancestor also breaks position:sticky.
      */}
      <div className={`absolute inset-0 ${sticky ? "" : "overflow-hidden"}`}>
        <div
          ref={bgRef}
          className={
            sticky
              ? "sticky top-0 w-full will-change-transform"
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
      </div>

      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-gradient-to-b from-title/75 via-title/45 to-title/80"
            : "bg-gradient-to-b from-paper/90 via-paper/55 to-paper/90"
        }`}
      />

      {shadeBoost && (
        <div className={`absolute inset-0 ${isDark ? "bg-title/15" : "bg-paper/15"}`} />
      )}

      {/*
        Left-side reading fade: the text block always sits on the left
        (or centered, where this still just darkens the side edges), so
        darkening the left side of the photo specifically — independent of
        the top-to-bottom overlay above — keeps text legible without
        having to darken the whole image uniformly.
      */}
      <div
        className={`absolute inset-y-0 left-0 w-full sm:w-2/3 ${
          isDark
            ? "bg-gradient-to-r from-title/60 via-title/15 to-transparent"
            : "bg-gradient-to-r from-paper/70 via-paper/20 to-transparent"
        }`}
      />

      {/*
        Seam blend: each scene's photo is independent, so two different
        images meeting at a section boundary is a hard cut with no
        transition. These two strips fade each section's very top/bottom
        edge to solid — not the same 45-80% translucent overlay above, but
        fully opaque — so adjacent sections both fade to the same solid
        color right at the seam and blend into it instead of visibly
        cutting from one photo to another. Opt out per-scene via seamFade.
      */}
      {seamFade && (
        <>
          <div
            className={`absolute inset-x-0 top-0 h-10 sm:h-16 ${
              isDark ? "bg-gradient-to-b from-title to-transparent" : "bg-gradient-to-b from-paper to-transparent"
            }`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-10 sm:h-16 ${
              isDark ? "bg-gradient-to-t from-title to-transparent" : "bg-gradient-to-t from-paper to-transparent"
            }`}
          />
        </>
      )}

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
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.22em] text-gold ${panel.noReveal ? "animate-fade-up" : ""}`}
                >
                  {panel.eyebrow}
                </p>
                {panel.noReveal ? (
                  <h1
                    className={`mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl ${
                      isDark ? "text-white" : "text-title"
                    }`}
                  >
                    {panel.title}
                  </h1>
                ) : (
                  <h2
                    className={`mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl ${
                      isDark ? "text-white" : "text-title"
                    }`}
                  >
                    {panel.title}
                  </h2>
                )}
                {panel.description && (
                  <p
                    className={`mt-5 max-w-xl text-lg ${isDark ? "text-white/85" : "text-body"} ${panel.noReveal ? "animate-fade-up" : ""}`}
                    style={panel.noReveal ? { animationDelay: "480ms" } : undefined}
                  >
                    {panel.description}
                  </p>
                )}
                {panel.ctas && panel.ctas.length > 0 && (
                  <div
                    className={`mt-8 flex flex-wrap gap-4 ${panel.noReveal ? "animate-fade-up" : ""}`}
                    style={panel.noReveal ? { animationDelay: "620ms" } : undefined}
                  >
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
                <div
                  className={`${panel.noReveal ? "animate-fade-up" : "scene-reveal-children"} mt-12`}
                  style={panel.noReveal ? { animationDelay: "700ms" } : undefined}
                >
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

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";

/** Overscan margin on the image layer, in vh, on top and bottom. Must be large
 * enough to cover the max clamp range used in the scroll handler below. */
const BUFFER_VH = 45;

export type SceneCta = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export default function ParallaxScene({
  id,
  index,
  image,
  imagePriority = false,
  overlay = "dark",
  align = "left",
  eyebrow,
  title,
  description,
  ctas,
  children,
  minHeightClass = "min-h-screen",
  speed = 0.35,
}: {
  id?: string;
  index: string;
  image?: string;
  imagePriority?: boolean;
  overlay?: "dark" | "light";
  align?: "left" | "center";
  eyebrow: string;
  title: ReactNode;
  description?: string;
  ctas?: SceneCta[];
  children?: ReactNode;
  minHeightClass?: string;
  /** How fast the background image travels relative to the page scroll (0 = pinned, 1 = same speed as content). */
  speed?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;

    function update() {
      ticking = false;
      const el = sectionRef.current;
      const bg = bgRef.current;
      if (!el || !bg) return;
      // rect.top moves 1:1 with scroll. Multiplying it by `speed` (< 1) makes the
      // background travel a shorter distance than the page itself, so it visibly
      // lags behind the content as the visitor scrolls — real differential-speed
      // parallax, not a background-attachment:fixed pin.
      // The image layer is overscanned by BUFFER_VH on each side (see className
      // below); clamp the offset to that same range so the lag can never expose
      // a bare edge at the top/bottom of the section.
      const rect = el.getBoundingClientRect();
      const buffer = window.innerHeight * (BUFFER_VH / 100);
      const offset = Math.max(Math.min(rect.top * speed, buffer), -buffer);
      bg.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
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
  }, [speed]);

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
      id={id}
      data-scene={index}
      className={`relative overflow-hidden ${minHeightClass}`}
    >
      <div
        ref={bgRef}
        className="absolute inset-x-0 -top-[45vh] -bottom-[45vh] will-change-transform"
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

      <div className="relative z-10 flex min-h-screen items-center px-6 py-20">
        <div className={`mx-auto w-full max-w-6xl ${align === "center" ? "text-center" : ""}`}>
          <div className={`max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {eyebrow}
            </p>
            <h2
              className={`mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl ${
                isDark ? "text-white" : "text-title"
              }`}
            >
              {title}
            </h2>
            {description && (
              <p className={`mt-5 max-w-xl text-lg ${isDark ? "text-white/85" : "text-body"}`}>
                {description}
              </p>
            )}
            {ctas && ctas.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {ctas.map((cta) => (
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
          {children && <div className="mt-12">{children}</div>}
        </div>
      </div>
    </section>
  );
}

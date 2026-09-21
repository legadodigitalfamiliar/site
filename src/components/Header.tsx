"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";
import { scrollToId } from "@/lib/scrollToId";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // On the home page, the ParallaxScene sections below constantly mutate
  // layout on scroll (see scrollToId's doc comment), which breaks plain
  // anchor-hash navigation — clicking a nav link (or the logo) just does
  // nothing instead of jumping to the section. Intercept and drive the
  // scroll manually whenever the target id is already on the page; only
  // fall through to a real navigation when it isn't (e.g. from /planos/...).
  function handleHashLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const id = href.slice(hashIndex + 1);
    if (pathname !== "/" && href.slice(0, hashIndex) !== pathname) return;
    if (scrollToId(id)) e.preventDefault();
  }

  // Close the mobile menu on any route change and lock body scroll while open.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      setScrolled(window.scrollY > 24);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur transition-shadow duration-300">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          href="/#inicio"
          onClick={(e) => handleHashLink(e, "/#inicio")}
          className="flex items-center gap-2 transition-all duration-300 hover:scale-105"
        >
          <Image
            src="/brand/logo.webp"
            alt=""
            width={32}
            height={32}
            className={`transition-all duration-300 ${scrolled ? "h-7 w-7" : "h-8 w-8"}`}
          />
          <span
            className={`font-display font-semibold text-title transition-all duration-300 ${
              scrolled ? "text-base" : "text-lg"
            }`}
          >
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleHashLink(e, link.href)}
              className="group relative rounded text-sm font-medium text-body transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("Olá! Quero saber mais sobre o Legado Digital.")}
            target="_blank"
            rel="noreferrer"
            className={`hidden items-center rounded-full bg-primary font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex ${
              scrolled ? "px-4 py-1.5 text-xs sm:px-4 sm:py-2" : "px-4 py-2 text-sm sm:px-5 sm:py-2.5"
            }`}
          >
            Falar no WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-title transition-colors hover:bg-title/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-paper transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleHashLink(e, link.href)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-body transition-colors hover:bg-title/5 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Olá! Quero saber mais sobre o Legado Digital.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark sm:hidden"
          >
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}

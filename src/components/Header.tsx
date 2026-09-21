"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
              className="group relative rounded text-sm font-medium text-body transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <a
          href={whatsappLink("Olá! Quero saber mais sobre o Legado Digital.")}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center rounded-full bg-primary font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            scrolled ? "px-4 py-1.5 text-xs sm:px-4 sm:py-2" : "px-4 py-2 text-sm sm:px-5 sm:py-2.5"
          }`}
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}

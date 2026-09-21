import Link from "next/link";
import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#inicio" className="font-display text-lg font-semibold text-title">
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappLink("Olá! Quero saber mais sobre o Legado Digital.")}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark md:inline-block"
        >
          Agendar demo
        </a>
      </div>
    </header>
  );
}

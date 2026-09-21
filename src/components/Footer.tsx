import { NAV_LINKS, SITE, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-title py-8 text-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
        <div>
          <p className="font-display text-base font-semibold text-white">{SITE.name}</p>
          <p className="mt-1.5 text-xs text-paper/70">
            Preservando a história das famílias, com organização e cuidado, para durar por
            gerações.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-paper/60">
            Navegação
          </p>
          <ul className="mt-2 space-y-1.5 text-xs">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-paper/80 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-paper/60">Contato</p>
          <ul className="mt-2 space-y-1.5 text-xs text-paper/80">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink("Olá! Quero saber mais sobre o Legado Digital.")}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                WhatsApp: {SITE.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl border-t border-white/10 px-6 pt-4 text-xs text-paper/50">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}

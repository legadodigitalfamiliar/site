import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-title py-14 text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">{SITE.name}</p>
          <p className="mt-2 text-sm text-paper/70">
            Preservando a história das famílias, com organização e cuidado, para durar por
            gerações.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-paper/60">
            Navegação
          </p>
          <ul className="mt-3 space-y-2 text-sm">
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
          <p className="text-sm font-semibold uppercase tracking-wide text-paper/60">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/80">
            <li>{SITE.email}</li>
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-6 pt-6 text-xs text-paper/50">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}

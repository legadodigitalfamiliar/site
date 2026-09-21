const ITEMS = [
  {
    tag: "Tudo em um lugar",
    title: "Organize a história inteira em um só espaço",
    text: "Árvore genealógica, fotos, histórias, documentos, livros e eventos históricos, reunidos e organizados automaticamente.",
    accent: "primary",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
        <path
          d="M32 8v20M32 28l-14 12M32 28l14 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="10" r="6" fill="currentColor" />
        <circle cx="16" cy="42" r="6" fill="currentColor" />
        <circle cx="48" cy="42" r="6" fill="currentColor" />
        <circle cx="16" cy="56" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="48" cy="56" r="4" fill="currentColor" opacity="0.5" />
        <path d="M16 48v4M48 48v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    tag: "Fácil de usar",
    title: "Nenhum conhecimento técnico necessário",
    text: "Interface intuitiva: basta clicar, adicionar e pronto. Funciona em qualquer navegador, computador ou celular.",
    accent: "gold",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
        <rect x="10" y="14" width="44" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M10 22h44" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 50h16M32 44v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M40 30l6 4-6 4M28 30l-6 4 6 4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    tag: "Seguro e protegido",
    title: "Seus dados protegidos e sob seu controle",
    text: "Criptografia, backup automático e acesso restrito. Você decide exatamente quem vê o quê.",
    accent: "secondary",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
        <path
          d="M32 8l18 7v14c0 13-7.7 21.8-18 27-10.3-5.2-18-14-18-27V15l18-7z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 32l6 6 12-13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    tag: "Sua propriedade",
    title: "Domínio próprio, dados seus, sempre",
    text: "O domínio é registrado em nome da sua família. Você nunca fica preso — pode migrar ou assumir a administração quando quiser.",
    accent: "primary",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
        <path
          d="M10 30L32 12l22 18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 27v23a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V27" stroke="currentColor" strokeWidth="2.5" />
        <rect x="27" y="38" width="10" height="14" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
] as const;

const ACCENT_CLASSES: Record<string, string> = {
  primary: "text-primary bg-primary/10",
  gold: "text-gold bg-gold-light",
  secondary: "text-secondary bg-secondary-light",
};

export default function SolutionSection() {
  return (
    <section id="como-funciona" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-title sm:text-4xl">Como o Legado Digital resolve</h2>
          <p className="mt-4 text-body">
            Uma plataforma pensada para transformar memórias soltas em um acervo organizado, vivo
            e duradouro.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {ITEMS.map((item, index) => (
            <div
              key={item.title}
              className={`grid items-center gap-10 md:grid-cols-2 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="flex items-center justify-center rounded-3xl border border-border bg-white p-10 shadow-sm">
                <div
                  className={`flex h-32 w-32 items-center justify-center rounded-full ${ACCENT_CLASSES[item.accent]}`}
                >
                  {item.icon}
                </div>
              </div>
              <div>
                <p
                  className={`mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${ACCENT_CLASSES[item.accent]}`}
                >
                  {item.tag}
                </p>
                <h3 className="text-2xl font-semibold text-title">{item.title}</h3>
                <p className="mt-3 text-body">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

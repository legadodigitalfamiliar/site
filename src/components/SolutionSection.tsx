const ITEMS = [
  {
    tag: "Tudo em um lugar",
    title: "Organize a história inteira em um só espaço",
    text: "Árvore genealógica, fotos, histórias, documentos, livros e eventos históricos, reunidos e organizados automaticamente.",
    accent: "primary",
  },
  {
    tag: "Fácil de usar",
    title: "Nenhum conhecimento técnico necessário",
    text: "Interface intuitiva: basta clicar, adicionar e pronto. Funciona em qualquer navegador, computador ou celular.",
    accent: "gold",
  },
  {
    tag: "Seguro e protegido",
    title: "Seus dados protegidos e sob seu controle",
    text: "Criptografia, backup automático e acesso restrito. Você decide exatamente quem vê o quê.",
    accent: "secondary",
  },
  {
    tag: "Sua propriedade",
    title: "Domínio próprio, dados seus, sempre",
    text: "O domínio é registrado em nome da sua família. Você nunca fica preso — pode migrar ou assumir a administração quando quiser.",
    accent: "primary",
  },
] as const;

const ACCENT_CLASSES: Record<string, string> = {
  primary: "text-primary bg-primary/10",
  gold: "text-gold bg-gold-light",
  secondary: "text-secondary bg-secondary-light",
};

export default function SolutionSection() {
  return (
    <section id="como-funciona" className="py-20">
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
              <div className="rounded-3xl border border-border bg-white p-10 shadow-sm">
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold ${ACCENT_CLASSES[item.accent]}`}
                >
                  {index + 1}
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

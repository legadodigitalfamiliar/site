const PROBLEMS = [
  {
    title: "Fotos espalhadas",
    text: "Fotos em diferentes computadores, celulares e pastas, sem nenhuma organização.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
        <rect x="6" y="10" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" transform="rotate(-8 14 18)" />
        <rect x="16" y="14" width="16" height="16" rx="2" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" transform="rotate(6 24 22)" />
      </svg>
    ),
  },
  {
    title: "Histórias perdidas",
    text: "Histórias e memórias de avós desaparecem com o tempo, sem ficarem registradas.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M10 8h16l4 4v20a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 18h12M14 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Documentos frágeis",
    text: "Certidões, diários e documentos em papel correm risco de se perder ou deteriorar.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
        <path d="M12 6h11l5 5v23a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M23 6v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 22l3 3-3 3M22 28l4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Árvore genealógica confusa",
    text: "Relacionamentos familiares complexos, difíceis de visualizar e compartilhar.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
        <circle cx="20" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="32" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M20 11v6M18 14l-8 3M22 14l8 3M10 23v3l6 3M30 23v3l-6 3" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-title sm:text-4xl">O desafio de preservar memórias</h2>
          <p className="mt-4 text-body">
            Toda família acumula uma vida inteira de histórias — mas sem um lugar certo para
            guardá-las, elas se perdem.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-border bg-paper p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {problem.icon}
              </div>
              <h3 className="text-lg font-semibold text-title">{problem.title}</h3>
              <p className="mt-2 text-sm text-body">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  {
    title: "Fotos espalhadas",
    text: "Fotos em diferentes computadores, celulares e pastas, sem nenhuma organização.",
  },
  {
    title: "Histórias perdidas",
    text: "Histórias e memórias de avós desaparecem com o tempo, sem ficarem registradas.",
  },
  {
    title: "Documentos frágeis",
    text: "Certidões, diários e documentos em papel correm risco de se perder ou deteriorar.",
  },
  {
    title: "Árvore genealógica confusa",
    text: "Relacionamentos familiares complexos, difíceis de visualizar e compartilhar.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-20">
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
              <h3 className="text-lg font-semibold text-title">{problem.title}</h3>
              <p className="mt-2 text-sm text-body">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

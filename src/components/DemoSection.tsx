import Image from "next/image";

const SCREENS = [
  {
    label: "Pessoas",
    caption: "Cada pessoa reúne biografia, família, fotos e histórias.",
    image: "/demo/pessoas.png",
  },
  {
    label: "Árvore genealógica",
    caption: "Navegue por pais, cônjuges e filhos com zoom e busca por pessoa.",
    image: "/demo/arvore.png",
  },
  {
    label: "Arquivo de fotos",
    caption: "Fotos organizadas por década, coleção, família e pessoa.",
    image: "/demo/fotos.webp",
  },
  {
    label: "Livro da família",
    caption: "Capítulos com a história contada de forma narrativa.",
    image: "/demo/livro.webp",
  },
];

export default function DemoSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-title sm:text-4xl">Veja como funciona</h2>
          <p className="mt-4 text-body">
            Um vislumbre de como a história da sua família pode ficar organizada dentro da
            plataforma.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SCREENS.map((screen) => (
            <div
              key={screen.label}
              className="overflow-hidden rounded-2xl border border-border bg-paper"
            >
              <div className="relative h-56 w-full bg-primary/5">
                <Image
                  src={screen.image}
                  alt={screen.label}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">
                  {screen.label}
                </p>
                <p className="mt-1 text-sm text-body">{screen.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

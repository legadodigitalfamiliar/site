import Image from "next/image";
import { whatsappLink } from "@/lib/site";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            Plataforma de legado familiar
          </p>
          <h1 className="text-4xl font-bold leading-tight text-title sm:text-5xl md:text-[3.15rem]">
            Preserve, organize e compartilhe a história da sua família
          </h1>
          <p className="mt-6 text-lg text-body">
            Uma plataforma segura e fácil de usar para guardar fotos, histórias, documentos e a
            árvore genealógica da sua família em um só lugar — para durar por gerações.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink("Olá! Quero começar a preservar a história da minha família.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Falar no WhatsApp
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 text-base font-semibold text-title transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Ver como funciona
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-[0_20px_60px_-30px_rgba(30,58,95,0.45)]">
            <Image
              src="/demo/livro.webp"
              alt="Capa do livro digital de uma família, com árvore genealógica gravada"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-white px-5 py-4 shadow-lg sm:block">
            <p className="text-2xl font-bold text-title">150+</p>
            <p className="text-xs text-body">pessoas documentadas</p>
          </div>
          <div className="absolute -top-5 -right-5 hidden rounded-2xl border border-border bg-white px-4 py-3 shadow-lg sm:block">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">4 gerações</p>
            <p className="text-xs text-body">conectadas na árvore</p>
          </div>
        </div>
      </div>
    </section>
  );
}

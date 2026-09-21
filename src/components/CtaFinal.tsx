import { whatsappLink } from "@/lib/site";

export default function CtaFinal() {
  return (
    <section id="contato" className="bg-primary py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Comece a preservar sua história hoje
        </h2>
        <p className="mt-4 text-white/85">
          Implantação em 5–10 dias úteis. Suporte via WhatsApp. Direito de arrependimento de 7
          dias.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={whatsappLink("Olá! Quero começar a preservar a história da minha família.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Falar no WhatsApp
          </a>
          <a
            href={whatsappLink("Olá! Gostaria de agendar uma demonstração do Legado Digital.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary transition-transform hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Agendar demonstração
          </a>
        </div>
      </div>
    </section>
  );
}

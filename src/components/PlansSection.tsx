import { PLANS, whatsappLink } from "@/lib/site";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function PlansSection() {
  return (
    <section id="planos" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-title sm:text-4xl">Escolha o plano certo para sua família</h2>
          <p className="mt-4 text-body">
            Implantação de {currency.format(1800)} em todos os planos. A manutenção anual varia
            conforme o tamanho e o suporte que sua família precisa.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-secondary/30 bg-secondary-light px-5 py-3 text-center text-sm text-body">
          <span className="font-semibold text-title">Não sabe qual escolher?</span> Comece pelo{" "}
          <strong className="text-primary">Legado Família</strong> — dá para fazer upgrade a
          qualquer momento se sua família crescer.
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-3xl border p-6 ${
                plan.destaque
                  ? "border-primary bg-primary text-white shadow-xl lg:-translate-y-3"
                  : "border-border bg-white"
              }`}
            >
              {plan.destaque && (
                <span className="mb-3 inline-block w-fit rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Mais popular
                </span>
              )}
              <h3
                className={`text-lg font-semibold ${plan.destaque ? "text-white" : "text-title"}`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 space-y-1.5 border-b border-current/10 pb-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`text-xs uppercase tracking-wide ${plan.destaque ? "text-white/70" : "text-body/70"}`}>
                    Implantação
                  </span>
                  <span className={`text-sm font-semibold ${plan.destaque ? "text-white" : "text-title"}`}>
                    {currency.format(plan.implantacao)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`text-xs uppercase tracking-wide ${plan.destaque ? "text-white/70" : "text-body/70"}`}>
                    Manutenção
                  </span>
                  <span className={`text-2xl font-bold ${plan.destaque ? "text-white" : "text-title"}`}>
                    {plan.manutencao === 0 ? "R$ 0" : `${currency.format(plan.manutencao ?? 0)}/ano`}
                  </span>
                </div>
              </div>

              <ul className="mt-4 flex-1 space-y-2 text-sm">
                <li className={plan.destaque ? "text-white/90" : "text-body"}>{plan.pessoas} · {plan.fotos}</li>
                <li className={plan.destaque ? "text-white/90" : "text-body"}>
                  {plan.dominio ? "Domínio incluído" : "Sem domínio"}
                </li>
                <li className={plan.destaque ? "text-white/90" : "text-body"}>{plan.suporte}</li>
              </ul>

              <a
                href={whatsappLink(`Olá! Tenho interesse no plano ${plan.name} do Legado Digital.`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.destaque
                    ? "bg-white text-primary hover:bg-white/90 focus-visible:outline-white"
                    : "bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary"
                }`}
              >
                Falar no WhatsApp
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-body">
          Precisa de mais de 1.000 pessoas ou 2.000 fotos?{" "}
          <a
            href={whatsappLink("Olá! Preciso de um plano Personalizado no Legado Digital.")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Fale sobre o plano Personalizado
          </a>
          .
        </p>
      </div>
    </section>
  );
}

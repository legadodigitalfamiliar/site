import { PLANS, whatsappLink } from "@/lib/site";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function PlansSection() {
  return (
    <section id="planos" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-title sm:text-4xl">Escolha o plano certo para sua família</h2>
          <p className="mt-4 text-body">
            Implantação de {currency.format(1800)} em todos os planos. A manutenção anual varia
            conforme o tamanho e o suporte que sua família precisa.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
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

              <div className="mt-4">
                <p className={`text-3xl font-bold ${plan.destaque ? "text-white" : "text-title"}`}>
                  {plan.manutencao === 0 ? currency.format(1800) : currency.format(plan.manutencao ?? 0)}
                </p>
                <p className={`text-sm ${plan.destaque ? "text-white/80" : "text-body"}`}>
                  {plan.manutencao === 0 ? "implantação única" : `${plan.manutencaoLabel} + implantação de ${currency.format(1800)}`}
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                <li className={plan.destaque ? "text-white/90" : "text-body"}>{plan.pessoas}</li>
                <li className={plan.destaque ? "text-white/90" : "text-body"}>{plan.fotos}</li>
                <li className={plan.destaque ? "text-white/90" : "text-body"}>{plan.livros}</li>
                <li className={plan.destaque ? "text-white/90" : "text-body"}>
                  {plan.dominio ? "Domínio incluído" : "Sem domínio"}
                </li>
                <li className={plan.destaque ? "text-white/90" : "text-body"}>{plan.suporte}</li>
                <li className="pt-2">
                  <ul className="space-y-1.5">
                    {plan.featureList.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-sm ${plan.destaque ? "text-white" : "text-body"}`}
                      >
                        <span
                          className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${plan.destaque ? "bg-white" : "bg-secondary"}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <a
                href={whatsappLink(`Olá! Tenho interesse no plano ${plan.name} do Legado Digital.`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  plan.destaque
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Escolher plano
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

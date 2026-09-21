import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LIMIT_ROWS, PLANS, whatsappLink } from "@/lib/site";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return PLANS.map((plan) => ({ slug: plan.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.id === slug);
  if (!plan) return {};
  return {
    title: plan.name,
    description: plan.tagline,
    alternates: { canonical: `/planos/${plan.id}` },
    openGraph: { title: `${plan.name} — Legado Digital`, description: plan.tagline },
  };
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = PLANS.find((p) => p.id === slug);
  if (!plan) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-white py-14">
          <div className="mx-auto max-w-6xl px-6">
            <Link
              href="/#planos"
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              ← Voltar para todos os planos
            </Link>

            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                {plan.destaque && (
                  <span className="mb-3 inline-block rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Mais popular
                  </span>
                )}
                <h1 className="text-3xl font-bold text-title sm:text-4xl">{plan.name}</h1>
                <p className="mt-2 max-w-xl text-body">{plan.tagline}</p>
              </div>

              <div className="rounded-2xl border border-border bg-paper p-6 sm:min-w-64">
                <p className="text-xs uppercase tracking-wide text-body/70">Implantação</p>
                <p className="text-lg font-semibold text-title">{currency.format(plan.implantacao)}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-body/70">Manutenção</p>
                <p className="text-3xl font-bold leading-tight text-title">
                  {plan.manutencao === 0 ? (
                    "R$ 0"
                  ) : (
                    <>
                      {currency.format(plan.manutencao ?? 0)}
                      <span className="text-base font-medium">/ano</span>
                    </>
                  )}
                </p>
                <a
                  href={whatsappLink(`Olá! Tenho interesse no plano ${plan.name} do Legado Digital.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-title">O que está incluído</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {plan.featureList.map((f) => (
                <li key={f} className="flex items-start gap-2 rounded-xl border border-border bg-white p-4 text-sm text-body">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                  {f}
                </li>
              ))}
              <li className="flex items-start gap-2 rounded-xl border border-border bg-white p-4 text-sm text-body">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                {plan.dominio ? "Domínio próprio incluído" : "Sem domínio incluído"}
              </li>
              <li className="flex items-start gap-2 rounded-xl border border-border bg-white p-4 text-sm text-body">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary" />
                {plan.suporte}
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-title">Limites de conteúdo</h2>
            <p className="mt-2 text-sm text-body">
              Links externos (vídeos incorporados) são sempre ilimitados, em qualquer plano.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[420px] text-left text-sm">
                <tbody>
                  {LIMIT_ROWS.map((row, i) => (
                    <tr key={row.key} className={i % 2 === 0 ? "bg-paper" : "bg-white"}>
                      <th scope="row" className="px-5 py-3 font-medium text-body">
                        {row.label}
                      </th>
                      <td className="px-5 py-3 text-right font-semibold text-title">
                        {plan.limits[row.key].toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-paper">
                    <th scope="row" className="px-5 py-3 font-medium text-body">
                      Links externos (vídeos)
                    </th>
                    <td className="px-5 py-3 text-right font-semibold text-secondary">Ilimitados</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-body/70">
              Fotos: até 10 MB por arquivo, com compressão automática. Documentos e outros
              arquivos: até 5 MB por arquivo, sem compressão. Vídeos são incorporados via links
              externos (YouTube, Vimeo, etc.), não hospedados diretamente.
            </p>
          </div>
        </section>

        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-2xl font-semibold text-title">Compare com os outros planos</h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="bg-paper">
                    <th scope="col" className="px-5 py-3 font-medium text-body/70">
                      Recurso
                    </th>
                    {PLANS.map((p) => (
                      <th
                        key={p.id}
                        scope="col"
                        className={`px-5 py-3 text-right font-semibold ${
                          p.id === plan.id ? "bg-primary/10 text-primary" : "text-title"
                        }`}
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <th scope="row" className="px-5 py-3 font-medium text-body">
                      Manutenção/ano
                    </th>
                    {PLANS.map((p) => (
                      <td
                        key={p.id}
                        className={`px-5 py-3 text-right font-semibold ${
                          p.id === plan.id ? "bg-primary/5 text-primary" : "text-title"
                        }`}
                      >
                        {p.manutencao === 0 ? "R$ 0" : currency.format(p.manutencao ?? 0)}
                      </td>
                    ))}
                  </tr>
                  {LIMIT_ROWS.map((row) => (
                    <tr key={row.key}>
                      <th scope="row" className="px-5 py-3 font-medium text-body">
                        {row.label}
                      </th>
                      {PLANS.map((p) => (
                        <td
                          key={p.id}
                          className={`px-5 py-3 text-right ${
                            p.id === plan.id ? "bg-primary/5 font-semibold text-primary" : "text-body"
                          }`}
                        >
                          {p.limits[row.key].toLocaleString("pt-BR")}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="px-5 py-3 font-medium text-body">
                      Domínio incluído
                    </th>
                    {PLANS.map((p) => (
                      <td
                        key={p.id}
                        className={`px-5 py-3 text-right ${
                          p.id === plan.id ? "bg-primary/5 font-semibold text-primary" : "text-body"
                        }`}
                      >
                        {p.dominio ? "Sim" : "Não"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-primary py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Pronto para começar com o {plan.name}?
            </h2>
            <p className="mt-3 text-white/85">
              Implantação em 5–10 dias úteis. Direito de arrependimento de 7 dias.
            </p>
            <a
              href={whatsappLink(`Olá! Tenho interesse no plano ${plan.name} do Legado Digital.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

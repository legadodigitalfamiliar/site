import ParallaxScene from "@/components/parallax/ParallaxScene";
import SectionRail from "@/components/parallax/SectionRail";
import TiltCard from "@/components/parallax/TiltCard";
import AnimatedTitle from "@/components/parallax/AnimatedTitle";
import {
  IconBook,
  IconDocuments,
  IconLink,
  IconLocation,
  IconMore,
  IconPeople,
  IconPhotos,
  IconTimeline,
  IconTree,
} from "@/components/parallax/icons";
import { whatsappLink } from "@/lib/site";

const PROBLEMS = [
  { icon: <IconPhotos />, title: "Fotos espalhadas", text: "Em diferentes dispositivos e sem organização." },
  { icon: <IconDocuments />, title: "Documentos frágeis", text: "Papéis que correm risco de se perder." },
  { icon: <IconBook />, title: "Histórias esquecidas", text: "Memórias que desaparecem com o tempo." },
  { icon: <IconTree />, title: "Árvore confusa", text: "Relacionamentos difíceis de visualizar." },
];

const MODULES = [
  { icon: <IconTree />, label: "Árvore genealógica" },
  { icon: <IconPhotos />, label: "Fotos e álbuns" },
  { icon: <IconDocuments />, label: "Documentos" },
  { icon: <IconBook />, label: "Histórias e livros" },
  { icon: <IconLocation />, label: "Locais" },
  { icon: <IconTimeline />, label: "Linha do tempo" },
  { icon: <IconPeople />, label: "Pessoas" },
  { icon: <IconLink />, label: "Links externos" },
  { icon: <IconMore />, label: "E muito mais" },
];

export default function ParallaxHome() {
  return (
    <div className="relative">
      <SectionRail />

      <ParallaxScene
        image="/parallax/hero.webp"
        sticky
        zoom={0.25}
        seamFade={false}
        imagePriority
        panels={[
          {
            id: "inicio",
            index: "01",
            noReveal: true,
            eyebrow: "Algumas histórias",
            title: (
              <>
                <span className="inline-block overflow-hidden pb-1 align-top">
                  <span className="animate-word-up inline-block" style={{ animationDelay: "0ms" }}>
                    Merecem
                  </span>
                </span>
                <br />
                <span className="inline-block overflow-hidden pb-1 align-top">
                  <span className="animate-word-up inline-block" style={{ animationDelay: "90ms" }}>
                    continuar.
                  </span>
                </span>
              </>
            ),
            description:
              "Reúna fotos, pessoas, histórias e documentos da sua família em um só lugar — organizado hoje, preservado para as próximas gerações.",
            ctas: [
              { label: "Conhecer o Legado Digital", href: "#como-funciona" },
              {
                label: "Falar no WhatsApp",
                href: whatsappLink("Olá! Quero conhecer o Legado Digital."),
                variant: "ghost",
                external: true,
              },
            ],
          },
          {
            index: "02",
            eyebrow: "O desafio é real",
            title: <AnimatedTitle lines={["Memórias que se", "perdem com o tempo."]} />,
            description:
              "Fotos espalhadas, histórias esquecidas, documentos em papel e conexões familiares difíceis de visualizar.",
            children: (
              <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
                {PROBLEMS.map((p) => (
                  <TiltCard
                    key={p.title}
                    className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
                      {p.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.title}</p>
                      <p className="mt-0.5 text-xs text-white/75">{p.text}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            ),
          },
        ]}
      />

      <ParallaxScene
        id="como-funciona"
        index="03"
        image="/parallax/solucao.webp"
        eyebrow="Tudo em um só lugar"
        title={<AnimatedTitle lines={["Uma plataforma feita para a sua família."]} />}
        description="Organize, preserve e compartilhe o que realmente importa. Simples, intuitiva e segura."
        ctas={[{ label: "Ver como funciona", href: "#planos", variant: "secondary" }]}
      />

      <ParallaxScene
        index="04"
        image="/parallax/legado.webp"
        shadeBoost
        eyebrow="Mais que funcionalidades"
        title={
          <AnimatedTitle lines={["É a história da sua família", "em novas possibilidades."]} />
        }
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {MODULES.map((m) => (
            <TiltCard
              key={m.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                {m.icon}
              </span>
              <span className="text-xs font-medium text-white/90">{m.label}</span>
            </TiltCard>
          ))}
        </div>
      </ParallaxScene>

      <ParallaxScene
        id="depoimentos"
        index="05"
        image="/parallax/depoimentos.webp"
        overlay="light"
        eyebrow="Histórias reais"
        title={<AnimatedTitle lines={["Famílias que já preservam o seu legado."]} />}
        description="Cada família tem uma história única. Veja como o Legado Digital pode ajudar a manter memórias vivas."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            "“Um presente para as próximas gerações conhecerem a história dos avós.”",
            "“Finalmente um lugar só para organizar tudo, com calma.”",
            "“Simples de usar e muito completo para registrar o que importa.”",
          ].map((quote, i) => (
            <div key={i} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="text-sm italic text-body">{quote}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-body/50">
                Exemplo ilustrativo
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-body/60">
          * Depoimentos ilustrativos enquanto reunimos histórias reais de famílias que usam o
          Legado Digital. Tem uma para compartilhar?{" "}
          <a
            href={whatsappLink("Olá! Quero compartilhar minha experiência com o Legado Digital.")}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Fale conosco
          </a>
          .
        </p>
      </ParallaxScene>

      <ParallaxScene
        id="contato"
        index="06"
        image="/parallax/encerramento.webp"
        align="center"
        eyebrow="O futuro agradece"
        title={<AnimatedTitle lines={["Preservar o passado é", "construir o futuro."]} />}
        description="Comece hoje e dê às próximas gerações o maior presente: a história da sua família."
        ctas={[
          { label: "Escolher meu plano", href: "#planos" },
          {
            label: "Falar com um especialista",
            href: whatsappLink("Olá! Quero começar a preservar a história da minha família."),
            variant: "ghost",
            external: true,
          },
        ]}
        minHeightClass="min-h-[90vh]"
      />
    </div>
  );
}

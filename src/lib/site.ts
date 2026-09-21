export const SITE = {
  name: "Legado Digital",
  whatsapp: "5541997224176",
  whatsappDisplay: "(41) 99722-4176",
  email: "legadodigitalfamiliar@gmail.com",
};

// Update once a custom domain (item 9 of the SEO checklist) is registered
// and pointed at this project — everything reading SITE_URL (metadata,
// robots.txt, sitemap.xml) picks up the change automatically.
export const SITE_URL = "https://legadodigital.vercel.app";

// Google Analytics 4 property created for this site (item 6 of the SEO checklist).
export const GA_MEASUREMENT_ID = "G-HQLSGNTHWC";

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

export const NAV_LINKS = [
  { label: "Início", href: "/#inicio" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Planos", href: "/#planos" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: "/#contato" },
];

export type PlanLimits = {
  pessoas: number;
  fotos: number;
  albuns: number;
  historias: number;
  eventos: number;
  livros: number;
  capitulos: number;
  documentos: number;
  videos: number;
  locais: number;
  fontes: number;
};

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  implantacao: number;
  manutencao: number | null;
  manutencaoLabel: string;
  pessoas: string;
  fotos: string;
  livros: string;
  dominio: boolean;
  suporte: string;
  destaque?: boolean;
  featureList: string[];
  limits: PlanLimits;
};

export const PLANS: Plan[] = [
  {
    id: "autonoma",
    name: "Entrega Autônoma",
    tagline: "Para quem quer independência total, sem mensalidade.",
    implantacao: 1800,
    manutencao: 0,
    manutencaoLabel: "Sem manutenção",
    pessoas: "100 pessoas",
    fotos: "300 fotos",
    livros: "1 livro",
    dominio: false,
    suporte: "Sem suporte contínuo",
    featureList: [
      "Plataforma configurada e entregue",
      "Cadastro demonstrativo inicial",
      "1 hora de treinamento",
      "Você administra tudo sozinho",
    ],
    limits: {
      pessoas: 100,
      fotos: 300,
      albuns: 10,
      historias: 20,
      eventos: 200,
      livros: 1,
      capitulos: 50,
      documentos: 10,
      videos: 10,
      locais: 50,
      fontes: 50,
    },
  },
  {
    id: "essencial",
    name: "Legado Essencial",
    tagline: "O básico com domínio próprio e suporte, sem complicação.",
    implantacao: 1800,
    manutencao: 360,
    manutencaoLabel: "/ano",
    pessoas: "100 pessoas",
    fotos: "300 fotos",
    livros: "1 livro",
    dominio: true,
    suporte: "Suporte básico (até 48h)",
    featureList: [
      "Domínio próprio incluído",
      "Manutenção técnica contínua",
      "Suporte via WhatsApp",
      "Atualizações automáticas",
    ],
    limits: {
      pessoas: 100,
      fotos: 300,
      albuns: 10,
      historias: 20,
      eventos: 200,
      livros: 1,
      capitulos: 50,
      documentos: 10,
      videos: 10,
      locais: 50,
      fontes: 50,
    },
  },
  {
    id: "familia",
    name: "Legado Família",
    tagline: "Mais espaço e atendimento prioritário para famílias médias.",
    implantacao: 1800,
    manutencao: 480,
    manutencaoLabel: "/ano",
    pessoas: "200 pessoas",
    fotos: "600 fotos",
    livros: "2 livros",
    dominio: true,
    suporte: "Atendimento prioritário (até 24h)",
    destaque: true,
    featureList: [
      "Tudo do Essencial",
      "Dobro de capacidade de conteúdo",
      "Resposta prioritária",
      "Ideal para famílias médias",
    ],
    limits: {
      pessoas: 200,
      fotos: 600,
      albuns: 20,
      historias: 40,
      eventos: 400,
      livros: 2,
      capitulos: 100,
      documentos: 25,
      videos: 25,
      locais: 100,
      fontes: 100,
    },
  },
  {
    id: "ampliado",
    name: "Legado Ampliado",
    tagline: "Famílias grandes, com genealogia mais complexa.",
    implantacao: 1800,
    manutencao: 720,
    manutencaoLabel: "/ano",
    pessoas: "500 pessoas",
    fotos: "1.200 fotos",
    livros: "5 livros",
    dominio: true,
    suporte: "Prioritário + pequenas intervenções",
    featureList: [
      "Tudo do Família",
      "5x mais espaço para conteúdo",
      "Pequenas intervenções técnicas",
      "Treinamento adicional incluído",
    ],
    limits: {
      pessoas: 500,
      fotos: 1200,
      albuns: 40,
      historias: 100,
      eventos: 800,
      livros: 5,
      capitulos: 300,
      documentos: 50,
      videos: 50,
      locais: 250,
      fontes: 250,
    },
  },
  {
    id: "historico",
    name: "Legado Histórico",
    tagline: "Capacidade máxima para acervos genealógicos grandes.",
    implantacao: 1800,
    manutencao: 1020,
    manutencaoLabel: "/ano",
    pessoas: "1.000 pessoas",
    fotos: "2.000 fotos",
    livros: "10 livros",
    dominio: true,
    suporte: "Acompanhamento próximo (até 12h)",
    featureList: [
      "Tudo do Ampliado",
      "Capacidade máxima dos planos padrão",
      "Acompanhamento próximo e contínuo",
      "Ideal para acervos genealógicos grandes",
    ],
    limits: {
      pessoas: 1000,
      fotos: 2000,
      albuns: 80,
      historias: 200,
      eventos: 1500,
      livros: 10,
      capitulos: 600,
      documentos: 100,
      videos: 100,
      locais: 500,
      fontes: 500,
    },
  },
];

export const LIMIT_ROWS: { key: keyof PlanLimits; label: string }[] = [
  { key: "pessoas", label: "Pessoas" },
  { key: "fotos", label: "Fotos" },
  { key: "albuns", label: "Álbuns" },
  { key: "historias", label: "Histórias" },
  { key: "eventos", label: "Eventos históricos" },
  { key: "livros", label: "Livros" },
  { key: "capitulos", label: "Capítulos" },
  { key: "documentos", label: "Documentos/arquivos" },
  { key: "videos", label: "Vídeos (links externos)" },
  { key: "locais", label: "Locais" },
  { key: "fontes", label: "Fontes bibliográficas" },
];

export const FAQ_ITEMS = [
  {
    q: "É fácil de usar? Não sou técnico.",
    a: "Sim. A plataforma é intuitiva: você acessa pelo navegador, clica para adicionar pessoas, fotos e histórias, e tudo é organizado automaticamente. Nada de planilhas ou tecnologia complicada.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Usamos criptografia em trânsito (HTTPS), banco de dados protegido, acesso restrito a quem você autorizar e backup automático. O backup próprio continua sendo recomendado.",
  },
  {
    q: "Posso fazer upgrade depois?",
    a: "Sim, a qualquer momento. Se sua família crescer além dos limites do plano, você pode subir para um plano maior. Downgrades são aplicados apenas na renovação anual.",
  },
  {
    q: "Como funciona o cancelamento?",
    a: "Você tem 7 dias corridos após o pagamento para se arrepender e pedir reembolso integral. Depois disso, pode cancelar a manutenção anual com 30 dias de aviso — a implantação já paga não é reembolsável.",
  },
  {
    q: "Vocês fazem importação de dados do FamilySearch?",
    a: "Sim, como serviço adicional tabelado, de R$ 80 (1–10 pessoas) a R$ 1.200 (501–1.000 pessoas). Acima disso, sob consulta.",
  },
  {
    q: "Qual o horário de atendimento?",
    a: "Suporte via WhatsApp, de segunda a sexta-feira, das 8h às 18h (horário de Brasília). O tempo de resposta varia por plano, de 12h a 48h úteis.",
  },
  {
    q: "Posso acessar pelo celular?",
    a: "Sim. A plataforma é totalmente responsiva e funciona em qualquer navegador, no computador, tablet ou celular.",
  },
  {
    q: "O domínio é meu ou da empresa?",
    a: "O domínio é sempre registrado em nome da sua família, desde a implantação. A empresa apenas administra tecnicamente enquanto a manutenção estiver ativa — a titularidade nunca é dela.",
  },
];

export const SITE = {
  name: "Legado Digital",
  whatsapp: "5541997224176",
  whatsappDisplay: "(41) 99722-4176",
  email: "legadodigitalfamiliar@gmail.com",
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export type Plan = {
  id: string;
  name: string;
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
};

export const PLANS: Plan[] = [
  {
    id: "autonoma",
    name: "Entrega Autônoma",
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
  },
  {
    id: "essencial",
    name: "Legado Essencial",
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
  },
  {
    id: "familia",
    name: "Legado Família",
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
  },
  {
    id: "ampliado",
    name: "Legado Ampliado",
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
  },
  {
    id: "historico",
    name: "Legado Histórico",
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
  },
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

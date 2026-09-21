export interface MarketingTool {
  id: string;
  name: string;
  category: string;
}

export const marketingTools: MarketingTool[] = [
  { id: "social-post", name: "Gerador de Posts", category: "Social Media" },
  { id: "meta-ads", name: "Meta Ads", category: "Tráfego Pago" },
  { id: "google-ads", name: "Google Ads", category: "Tráfego Pago" },
  { id: "seo", name: "Gerador SEO", category: "SEO" },
  { id: "email", name: "E-mail Marketing", category: "E-mail" },
  { id: "persona", name: "Criador de Persona", category: "Estratégia" },
  { id: "funnel", name: "Criador de Funil", category: "Estratégia" },
  { id: "landing-page", name: "Landing Page", category: "Conversão" },
  { id: "content-calendar", name: "Calendário de Conteúdo", category: "Social Media" },
  { id: "whatsapp", name: "WhatsApp Vendas", category: "Vendas" },
];

export interface BriefingInput {
  produto: string;
  publicoAlvo: string;
  nicho: string;
  localizacao: string;
  objetivo: string;
  oferta: string;
  diferenciais: string;
  tomDeVoz: string;
  detalhesExtras: string;
}

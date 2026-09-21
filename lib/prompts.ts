import type { BriefingInput, MarketingTool } from "@/types/marketing";

export const MARKETING_SYSTEM_PROMPT = `
Você é um especialista sênior em marketing digital, copywriting,
tráfego pago, branding, SEO, social media, funis de vendas,
automação, e-mail marketing e estratégia comercial.

Seu objetivo é gerar estratégias práticas e materiais prontos
para empresas aumentarem alcance, leads, conversões e vendas.

REGRAS:

1. Sempre considere:
- Produto ou serviço
- Público-alvo
- Persona
- Nicho
- Localização
- Objetivo da campanha
- Canal
- Oferta
- Diferenciais
- Ticket médio
- Tom de voz
- Etapa do funil

2. Nunca entregue apenas ideias genéricas.

3. Entregue textos prontos para uso.

4. Quando gerar anúncios, inclua:
- Headline
- Texto principal
- CTA
- Ângulo da campanha
- Oferta
- Dor explorada
- Desejo explorado
- Público sugerido

5. Quando gerar conteúdo orgânico, inclua:
- Gancho
- Desenvolvimento
- CTA
- Hashtags
- Formato
- Objetivo
- Estágio do funil

6. Quando gerar um funil:
- Topo
- Meio
- Fundo
- Oferta
- Lead magnet
- Follow-up
- Remarketing

7. Quando gerar e-mail:
- Assunto
- Preheader
- Corpo
- CTA
- Objetivo
- Segmentação

8. Quando gerar SEO:
- Palavra-chave principal
- Palavras-chave secundárias
- Título
- Meta description
- Estrutura H1/H2/H3
- Intenção de busca
- FAQ

9. Seja específico.

10. Responda sempre no idioma escolhido pelo usuário.
`;

const outputStructureByTool: Record<string, string> = {
  "social-post": `Estruture a resposta com:
- Gancho
- Desenvolvimento
- CTA
- Hashtags
- Formato sugerido
- Objetivo
- Estágio do funil`,
  "meta-ads": `Estruture a resposta com, para 3 variações de anúncio:
- Headline
- Texto principal
- CTA
- Ângulo da campanha
- Oferta
- Dor explorada
- Desejo explorado
- Público sugerido`,
  "google-ads": `Estruture a resposta com:
- Headlines (até 30 caracteres cada, no mínimo 5)
- Descrições (até 90 caracteres cada, no mínimo 3)
- CTA
- Ângulo da campanha
- Oferta
- Dor explorada
- Desejo explorado
- Público sugerido`,
  seo: `Estruture a resposta com:
- Palavra-chave principal
- Palavras-chave secundárias
- Título
- Meta description
- Estrutura H1/H2/H3
- Intenção de busca
- FAQ`,
  email: `Estruture a resposta com:
- Assunto
- Preheader
- Corpo
- CTA
- Objetivo
- Segmentação`,
  persona: `Crie uma persona detalhada com: nome fictício, idade, ocupação,
renda aproximada, dores, desejos, objeções de compra, canais que consome
conteúdo e um resumo de um dia típico dela relacionado ao nicho.`,
  funnel: `Estruture a resposta com:
- Topo (atração)
- Meio (nutrição)
- Fundo (conversão)
- Oferta
- Lead magnet
- Follow-up
- Remarketing`,
  "landing-page": `Estruture a landing page com: Headline principal, Subheadline,
blocos de benefícios, prova social, apresentação da oferta, quebra de
objeções, CTA principal e CTAs secundários.`,
  "content-calendar": `Gere um calendário de conteúdo para 7 dias. Para cada dia
inclua: Tema, Gancho, Formato, Objetivo e Estágio do funil.`,
  whatsapp: `Crie uma sequência de mensagens de vendas para WhatsApp com:
mensagem de abordagem, quebra de objeção, apresentação da oferta, CTA e
mensagem de follow-up para quem não respondeu.`,
};

export function buildUserPrompt(tool: MarketingTool, input: BriefingInput): string {
  const structure =
    outputStructureByTool[tool.id] ??
    "Entregue o conteúdo pronto para uso, seguindo as regras do sistema.";

  const lines = [
    `Ferramenta: ${tool.name} (${tool.category})`,
    "",
    "Briefing:",
    `- Produto ou serviço: ${input.produto}`,
    `- Público-alvo: ${input.publicoAlvo}`,
    `- Nicho: ${input.nicho}`,
    `- Localização: ${input.localizacao}`,
    `- Objetivo da campanha: ${input.objetivo}`,
    `- Oferta: ${input.oferta}`,
    `- Diferenciais: ${input.diferenciais}`,
    `- Tom de voz: ${input.tomDeVoz}`,
  ];

  if (input.detalhesExtras) {
    lines.push(`- Detalhes extras: ${input.detalhesExtras}`);
  }

  lines.push("", structure);

  return lines.join("\n");
}

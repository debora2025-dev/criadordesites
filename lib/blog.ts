export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-gerar-anuncios-com-ia",
    title: "Como gerar anúncios de Meta Ads e Google Ads com IA",
    excerpt:
      "Um passo a passo prático para transformar um briefing simples em anúncios prontos para publicar.",
    date: "2026-08-12",
    content: [
      "Criar um anúncio do zero costuma ser o gargalo de quem gerencia tráfego pago sozinho: escrever headline, testar ângulos, pensar na dor e no desejo do público — tudo isso consome tempo que poderia ir para otimização de campanha.",
      "Com um gerador de IA especializado em marketing, o processo muda de ordem: você descreve o produto, o público-alvo, a oferta e o tom de voz, e recebe de volta headline, texto principal, CTA, ângulo de campanha e até o público sugerido para segmentação.",
      "O ganho real não é só velocidade — é ter um ponto de partida estruturado em vez de uma página em branco. A partir daí, o trabalho humano vira ajuste fino, não criação do zero.",
    ],
  },
  {
    slug: "funil-de-vendas-em-menos-de-uma-hora",
    title: "Como estruturar um funil de vendas completo em menos de uma hora",
    excerpt:
      "Topo, meio, fundo, lead magnet e remarketing: veja como organizar tudo isso rapidamente.",
    date: "2026-08-28",
    content: [
      "Um funil de vendas bem desenhado precisa cobrir a jornada inteira: atração no topo, nutrição no meio e conversão no fundo — além de uma oferta de entrada (lead magnet) e uma estratégia de remarketing para quem não converteu de primeira.",
      "Na prática, boa parte do tempo gasto nessa etapa é organizacional: decidir o que vai em cada estágio e escrever o esqueleto de cada peça de conteúdo.",
      "Usando um gerador de IA com esse objetivo, você recebe a estrutura completa — topo, meio, fundo, oferta, lead magnet, follow-up e remarketing — em poucos segundos, e pode focar o tempo em refinar a oferta e testar variações.",
    ],
  },
  {
    slug: "conteudo-organico-que-converte",
    title: "Conteúdo orgânico que converte: gancho, desenvolvimento e CTA",
    excerpt: "A estrutura por trás de posts que prendem atenção e geram ação no final.",
    date: "2026-09-05",
    content: [
      "Todo post que funciona bem tem uma estrutura parecida por baixo do capô: um gancho que interrompe o scroll, um desenvolvimento que entrega valor ou conecta emocionalmente, e um CTA claro no final.",
      "A parte difícil não é saber essa fórmula — é aplicá-la de forma consistente, post após post, sem repetir o mesmo gancho.",
      "Por isso um calendário de conteúdo gerado com briefing (produto, público, objetivo e estágio do funil) ajuda tanto: você garante variedade de ganchos e formatos sem perder a estrutura que converte.",
    ],
  },
];

import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { marketingTools } from "@/types/marketing";

const categoryIcons: Record<string, string> = {
  "Social Media": "📱",
  "Tráfego Pago": "📢",
  SEO: "🔍",
  "E-mail": "✉️",
  Estratégia: "🎯",
  Conversão: "🚀",
  Vendas: "💬",
};

const stats = [
  { value: "10", label: "geradores de IA" },
  { value: "100%", label: "conteúdo em português" },
  { value: "< 30s", label: "para gerar um material" },
  { value: "0", label: "cartão de crédito no cadastro" },
];

const benefits = [
  {
    title: "Conteúdo pronto para publicar",
    description:
      "Nada de ideias soltas: cada geração já vem com headline, texto, CTA e estrutura completa — é copiar e usar.",
  },
  {
    title: "Um só lugar para tudo",
    description:
      "Geradores de IA, campanhas e leads na mesma tela — sem trocar de aba nem pagar por 5 ferramentas diferentes.",
  },
  {
    title: "Histórico salvo automaticamente",
    description:
      "Todo conteúdo gerado fica registrado no seu painel, então você nunca perde um anúncio ou e-mail bom.",
  },
];

const steps = [
  { title: "Crie sua conta", description: "Cadastro gratuito em menos de 1 minuto." },
  { title: "Escolha uma ferramenta", description: "Anúncios, posts, e-mails, SEO, funis e mais." },
  { title: "Preencha o briefing", description: "Produto, público, oferta, tom de voz." },
  { title: "Gere e use", description: "Copie o conteúdo pronto e coloque no ar." },
];

const testimonials = [
  {
    quote:
      "Reduzi o tempo de criação de campanha de um dia inteiro para menos de 1 hora. O que mais impressiona é a qualidade do texto pronto.",
    name: "Camila Rocha",
    role: "Dona de e-commerce de moda",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    quote:
      "Uso pra gerar briefing de anúncio, legenda e e-mail no mesmo lugar. Antes eu pagava três ferramentas diferentes pra isso.",
    name: "Rafael Menezes",
    role: "Gestor de tráfego",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    quote:
      "Como infoprodutora sozinha, isso virou meu departamento de marketing. Gero funil, e-mail e post de lançamento em minutos.",
    name: "Bianca Alves",
    role: "Infoprodutora",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <span className="landing-nav-brand">Marketing Digital Pro</span>
        <div className="landing-nav-actions">
          <Link href="/login">Entrar</Link>
          <Link href="/register" className="btn-primary">
            Criar conta grátis
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <span className="landing-eyebrow">Marketing digital com Inteligência Artificial</span>
          <h1>
            Pare de gastar horas criando
            <br />
            conteúdo de marketing.
          </h1>
          <p>
            Anúncios, posts, e-mails, SEO e funis prontos para publicar — gerados por uma IA
            treinada em marketing digital, com campanhas e leads organizados no mesmo painel.
          </p>
          <div className="landing-hero-actions">
            <Link href="/register" className="btn-primary btn-large">
              Começar agora, é grátis
            </Link>
            <Link href="/login" className="btn-secondary btn-large btn-on-dark">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="landing-stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="landing-section">
        <span className="landing-kicker">Ferramentas</span>
        <h2>Uma ferramenta pra cada etapa do seu marketing</h2>
        <p className="landing-section-subtitle">
          {marketingTools.length} geradores de IA prontos, organizados por objetivo.
        </p>
        <div className="landing-tools-grid">
          {marketingTools.map((tool) => (
            <div key={tool.id} className="landing-tool-card">
              <span className="landing-tool-icon">{categoryIcons[tool.category] ?? "✨"}</span>
              <span className="landing-tool-category">{tool.category}</span>
              <strong>{tool.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-muted">
        <span className="landing-kicker">Vantagens</span>
        <h2>Por que usar o Marketing Digital Pro</h2>
        <div className="landing-benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="landing-benefit-card">
              <strong>{benefit.title}</strong>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <span className="landing-kicker">Como funciona</span>
        <h2>Do briefing ao conteúdo pronto em 4 passos</h2>
        <ol className="landing-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="landing-step-number">{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-section landing-section-muted">
        <span className="landing-kicker">Depoimentos</span>
        <h2>Quem usa, não volta pro jeito antigo</h2>
        <div className="landing-testimonials-grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="landing-testimonial-card">
              <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption>
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-overlay" />
        <div className="landing-cta-content">
          <h2>Pronto para gerar seu próximo conteúdo?</h2>
          <p>Crie sua conta gratuita e comece a usar agora — sem cartão de crédito.</p>
          <Link href="/register" className="btn-primary btn-large">
            Criar conta grátis
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <span>Marketing Digital Pro</span>
        <div>
          <Link href="/login">Entrar</Link>
          <Link href="/register">Criar conta</Link>
        </div>
      </footer>
    </main>
  );
}

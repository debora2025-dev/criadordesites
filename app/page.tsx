import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { marketingTools } from "@/types/marketing";

const benefits = [
  {
    title: "Conteúdo pronto para usar",
    description:
      "Nada de ideias soltas: cada geração já vem com headline, texto, CTA e estrutura completa.",
  },
  {
    title: "Um só lugar para tudo",
    description:
      "Geradores de IA, campanhas e leads na mesma tela — sem trocar de ferramenta o dia todo.",
  },
  {
    title: "Histórico salvo automaticamente",
    description:
      "Todo conteúdo gerado fica registrado, então você nunca perde um anúncio ou e-mail bom.",
  },
];

const steps = [
  { title: "Crie sua conta", description: "Cadastro gratuito em menos de 1 minuto." },
  { title: "Escolha uma ferramenta", description: "Anúncios, posts, e-mails, SEO, funis e mais." },
  { title: "Preencha o briefing", description: "Produto, público, oferta, tom de voz." },
  { title: "Gere e use", description: "Copie o conteúdo pronto e coloque no ar." },
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
        <span className="landing-eyebrow">SaaS de Marketing Digital com IA</span>
        <h1>
          Gere marketing pronto para usar.
          <br />
          Sem depender de agência.
        </h1>
        <p>
          Anúncios, posts, e-mails, SEO, funis e mensagens de vendas gerados por IA
          especializada em marketing — mais campanhas e leads organizados no mesmo lugar.
        </p>
        <div className="landing-hero-actions">
          <Link href="/register" className="btn-primary btn-large">
            Começar agora, é grátis
          </Link>
          <Link href="/login" className="btn-secondary btn-large">
            Já tenho conta
          </Link>
        </div>
      </section>

      <section className="landing-section">
        <h2>Tudo que você precisa para vender mais</h2>
        <p className="landing-section-subtitle">
          {marketingTools.length} geradores de IA prontos, organizados por objetivo.
        </p>
        <div className="landing-tools-grid">
          {marketingTools.map((tool) => (
            <div key={tool.id} className="landing-tool-card">
              <span className="landing-tool-category">{tool.category}</span>
              <strong>{tool.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-muted">
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
        <h2>Como funciona</h2>
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

      <section className="landing-cta">
        <h2>Pronto para gerar seu próximo conteúdo?</h2>
        <p>Crie sua conta gratuita e comece a usar agora.</p>
        <Link href="/register" className="btn-primary btn-large">
          Criar conta grátis
        </Link>
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

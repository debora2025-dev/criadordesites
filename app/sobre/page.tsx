import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

export default function SobrePage() {
  return (
    <main className="landing-page">
      <PublicNav />

      <section className="landing-hero landing-hero-compact">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <span className="landing-eyebrow">Sobre</span>
          <h1>Marketing que não depende de agência</h1>
          <p>
            O Marketing Digital Pro nasceu para dar a pequenos negócios e profissionais
            autônomos o mesmo poder de produção de conteúdo que uma agência de marketing.
          </p>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-benefits-grid">
          <div className="landing-benefit-card">
            <strong>Nossa missão</strong>
            <p>
              Tirar a barreira técnica e de tempo entre uma boa ideia de marketing e um
              conteúdo pronto para publicar.
            </p>
          </div>
          <div className="landing-benefit-card">
            <strong>Como funciona</strong>
            <p>
              Uma IA treinada com regras de copywriting e estratégia digital gera anúncios,
              posts, e-mails, SEO e funis a partir de um briefing simples.
            </p>
          </div>
          <div className="landing-benefit-card">
            <strong>Para quem é</strong>
            <p>
              Donos de e-commerce, infoprodutores, gestores de tráfego e qualquer pessoa que
              precisa produzir marketing sem uma equipe inteira por trás.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "R$ 0",
    description: "Para começar a testar os geradores de IA.",
    features: ["10 geradores de IA", "Campanhas e leads ilimitados", "Histórico de gerações"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 49/mês",
    description: "Para quem usa o Marketing Digital Pro no dia a dia.",
    features: [
      "Tudo do Free",
      "Geração prioritária",
      "Perfil do negócio para preencher os geradores automaticamente",
      "Suporte por e-mail",
    ],
  },
];

export default function PrecosPage() {
  return (
    <main className="landing-page">
      <PublicNav />

      <section className="landing-hero landing-hero-compact">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <span className="landing-eyebrow">Preços</span>
          <h1>Planos simples, sem surpresa</h1>
          <p>Comece grátis. Faça upgrade quando precisar de mais.</p>
        </div>
      </section>

      <section className="landing-section">
        <p className="plan-disclaimer">
          Estrutura de planos em demonstração — nenhuma cobrança real é feita ainda.
        </p>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.id} className="pricing-card">
              <h3>{plan.name}</h3>
              <p className="pricing-price">{plan.price}</p>
              <p className="pricing-description">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link href="/register" className="btn-primary">
                Criar conta grátis
              </Link>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

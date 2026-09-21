"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "R$ 0",
    features: ["10 geradores de IA", "Campanhas e leads ilimitados", "Histórico de gerações"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 49/mês",
    features: [
      "Tudo do Free",
      "Geração prioritária",
      "Perfil do negócio para preencher os geradores automaticamente",
      "Suporte por e-mail",
    ],
  },
];

export function PlanCard({ currentPlan }: { currentPlan: string }) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleSelectPlan(planId: string) {
    setError("");
    setLoadingPlan(planId);

    const res = await fetch("/api/workspace/plan", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planId }),
    });
    const data = await res.json();

    setLoadingPlan(null);
    if (!res.ok) {
      setError(data.error ?? "Erro ao trocar de plano.");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <p className="plan-disclaimer">
        Estrutura de planos em demonstração — nenhuma cobrança real é feita ainda.
      </p>
      <div className="pricing-grid">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          return (
            <div key={plan.id} className={`pricing-card${isCurrent ? " pricing-card-active" : ""}`}>
              <h3>{plan.name}</h3>
              <p className="pricing-price">{plan.price}</p>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                disabled={isCurrent || loadingPlan !== null}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {isCurrent ? "Plano atual" : loadingPlan === plan.id ? "Aplicando..." : "Selecionar"}
              </button>
            </div>
          );
        })}
      </div>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

import { getCurrentUser, getDefaultWorkspace } from "@/lib/auth";
import { AccountForm } from "@/components/AccountForm";
import { BusinessProfileForm } from "@/components/BusinessProfileForm";
import { PlanCard } from "@/components/PlanCard";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const workspace = await getDefaultWorkspace(user!.id);

  return (
    <main>
      <div className="page-header">
        <h1>Configurações</h1>
        <p>Gerencie sua conta, o perfil do seu negócio e seu plano.</p>
      </div>

      <section className="list-section">
        <h2>Conta</h2>
        <div className="card">
          <AccountForm name={user?.name ?? ""} email={user?.email ?? ""} />
        </div>
      </section>

      <section className="list-section">
        <h2>Perfil do negócio</h2>
        <p className="section-hint">
          Esses dados preenchem automaticamente os geradores de IA, então você não precisa
          digitar tudo de novo em cada ferramenta.
        </p>
        <div className="card">
          <BusinessProfileForm
            profile={{
              businessName: workspace.businessName ?? "",
              niche: workspace.niche ?? "",
              defaultAudience: workspace.defaultAudience ?? "",
              defaultTone: workspace.defaultTone ?? "",
              defaultDifferentiators: workspace.defaultDifferentiators ?? "",
            }}
          />
        </div>
      </section>

      <section className="list-section">
        <h2>Plano</h2>
        <PlanCard currentPlan={workspace.plan} />
      </section>
    </main>
  );
}

import Link from "next/link";
import { getCurrentUser, getDefaultWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardCard } from "@/components/DashboardCard";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const workspace = await getDefaultWorkspace(user!.id);

  const [campaignCount, leadCount, generationCount] = await Promise.all([
    prisma.campaign.count({ where: { workspaceId: workspace.id } }),
    prisma.lead.count({ where: { workspaceId: workspace.id } }),
    prisma.generation.count({ where: { userId: user!.id } }),
  ]);

  return (
    <main>
      <div className="page-header">
        <h1>Olá, {user?.name || user?.email}</h1>
        <p>Aqui está um resumo do seu workspace.</p>
      </div>

      <div className="dashboard-cards">
        <DashboardCard title="Campanhas" value={campaignCount} />
        <DashboardCard title="Leads" value={leadCount} />
        <DashboardCard title="Conteúdos gerados" value={generationCount} />
      </div>

      <div className="dashboard-quicklinks">
        <Link href="/dashboard/generators" className="card-link">
          <strong>Gerar conteúdo</strong>
          <span>Escolha uma ferramenta de IA e crie algo novo agora.</span>
        </Link>
        <Link href="/dashboard/campaigns" className="card-link">
          <strong>Ver campanhas</strong>
          <span>Acompanhe o que está no ar e o orçamento de cada uma.</span>
        </Link>
        <Link href="/dashboard/leads" className="card-link">
          <strong>Ver leads</strong>
          <span>Organize os contatos que chegaram até você.</span>
        </Link>
      </div>
    </main>
  );
}

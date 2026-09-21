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
      <h1>Olá, {user?.name || user?.email}</h1>
      <div className="dashboard-cards">
        <DashboardCard title="Campanhas" value={campaignCount} />
        <DashboardCard title="Leads" value={leadCount} />
        <DashboardCard title="Conteúdos gerados" value={generationCount} />
      </div>
    </main>
  );
}

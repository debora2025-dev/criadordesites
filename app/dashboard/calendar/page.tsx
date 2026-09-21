import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CalendarPage() {
  const user = await getCurrentUser();

  const generations = await prisma.generation.findMany({
    where: { userId: user!.id, tool: "content-calendar" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <div className="page-header">
        <h1>Calendário de Conteúdo</h1>
        <p>Histórico dos calendários já gerados.</p>
      </div>

      <Link href="/dashboard/generators/content-calendar" className="btn-primary">
        Gerar novo calendário
      </Link>

      <div className="list-section">
        {generations.length === 0 ? (
          <p className="empty-state">Nenhum calendário gerado ainda.</p>
        ) : (
          generations.map((generation) => (
            <article key={generation.id} className="card calendar-entry">
              <h2>{new Date(generation.createdAt).toLocaleDateString("pt-BR")}</h2>
              <pre>{generation.output}</pre>
            </article>
          ))
        )}
      </div>
    </main>
  );
}

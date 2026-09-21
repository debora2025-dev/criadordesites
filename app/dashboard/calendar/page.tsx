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
      <h1>Calendário de Conteúdo</h1>
      <p>
        <Link href="/dashboard/generators/content-calendar">Gerar novo calendário</Link>
      </p>

      {generations.length === 0 ? (
        <p>Nenhum calendário gerado ainda.</p>
      ) : (
        generations.map((generation) => (
          <article key={generation.id}>
            <h2>{new Date(generation.createdAt).toLocaleDateString("pt-BR")}</h2>
            <pre>{generation.output}</pre>
          </article>
        ))
      )}
    </main>
  );
}

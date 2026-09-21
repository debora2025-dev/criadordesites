import Link from "next/link";
import { notFound } from "next/navigation";
import { marketingTools, categoryIcons } from "@/types/marketing";
import { GeneratorForm } from "@/components/GeneratorForm";
import { getCurrentUser, getDefaultWorkspace } from "@/lib/auth";

export default async function GeneratorToolPage({ params }: { params: { id: string } }) {
  const tool = marketingTools.find((t) => t.id === params.id);
  if (!tool) {
    notFound();
  }

  const user = await getCurrentUser();
  const workspace = await getDefaultWorkspace(user!.id);

  const defaults = {
    publicoAlvo: workspace.defaultAudience ?? "",
    nicho: workspace.niche ?? "",
    tomDeVoz: workspace.defaultTone ?? "",
    diferenciais: workspace.defaultDifferentiators ?? "",
  };

  return (
    <main>
      <Link href="/dashboard/generators" className="back-link">
        ← Voltar
      </Link>
      <div className="page-header">
        <h1>
          <span className="generator-card-icon">{categoryIcons[tool.category] ?? "✨"}</span>{" "}
          {tool.name}
        </h1>
        <p>{tool.category}</p>
      </div>
      <div className="card">
        <GeneratorForm tool={tool} defaults={defaults} />
      </div>
    </main>
  );
}

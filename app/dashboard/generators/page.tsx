import Link from "next/link";
import { marketingTools, categoryIcons } from "@/types/marketing";

export default function GeneratorsPage() {
  const categories = Array.from(new Set(marketingTools.map((tool) => tool.category)));

  return (
    <main>
      <div className="page-header">
        <h1>Geradores</h1>
        <p>Escolha uma ferramenta e preencha o briefing para gerar o material pronto para uso.</p>
      </div>

      {categories.map((category) => (
        <section key={category} className="generator-category">
          <h2>{category}</h2>
          <div className="generator-grid">
            {marketingTools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <Link
                  key={tool.id}
                  href={`/dashboard/generators/${tool.id}`}
                  className="generator-card"
                >
                  <span className="generator-card-icon">{categoryIcons[tool.category] ?? "✨"}</span>
                  <strong>{tool.name}</strong>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}

import Link from "next/link";
import { marketingTools } from "@/types/marketing";

export default function GeneratorsPage() {
  const categories = Array.from(new Set(marketingTools.map((tool) => tool.category)));

  return (
    <main>
      <h1>Geradores</h1>
      <p>Escolha uma ferramenta e preencha o briefing para gerar o material pronto para uso.</p>

      {categories.map((category) => (
        <section key={category}>
          <h2>{category}</h2>
          <ul>
            {marketingTools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <li key={tool.id}>
                  <Link href={`/dashboard/generators/${tool.id}`}>{tool.name}</Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { marketingTools } from "@/types/marketing";
import { GeneratorForm } from "@/components/GeneratorForm";

export default function GeneratorToolPage({ params }: { params: { id: string } }) {
  const tool = marketingTools.find((t) => t.id === params.id);
  if (!tool) {
    notFound();
  }

  return (
    <main>
      <Link href="/dashboard/generators">← Voltar</Link>
      <h1>{tool.name}</h1>
      <p>{tool.category}</p>
      <GeneratorForm tool={tool} />
    </main>
  );
}

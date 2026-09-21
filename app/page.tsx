import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="landing">
      <h1>Marketing AI SaaS</h1>
      <p>
        Gere anúncios, posts, e-mails, SEO e funis prontos para uso, e gerencie
        campanhas e leads em um só lugar.
      </p>
      <div className="landing-actions">
        <Link href="/login">Entrar</Link>
        <Link href="/register">Criar conta</Link>
      </div>
    </main>
  );
}

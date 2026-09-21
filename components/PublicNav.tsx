import Link from "next/link";

export function PublicNav() {
  return (
    <nav className="landing-nav">
      <Link href="/" className="landing-nav-brand">
        Marketing Digital Pro
      </Link>
      <div className="landing-nav-actions">
        <Link href="/precos">Preços</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/login">Entrar</Link>
        <Link href="/register" className="btn-primary">
          Criar conta grátis
        </Link>
      </div>
    </nav>
  );
}

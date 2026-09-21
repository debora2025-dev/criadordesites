import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="landing-footer">
      <span>Marketing Digital Pro</span>
      <div>
        <Link href="/sobre">Sobre</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/precos">Preços</Link>
        <Link href="/login">Entrar</Link>
        <Link href="/register">Criar conta</Link>
      </div>
    </footer>
  );
}

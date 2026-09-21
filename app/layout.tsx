import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Criador de Sites — Ferramentas de Marketing com IA",
  description: "Gere anúncios, posts, e-mails, SEO e funis prontos para uso.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

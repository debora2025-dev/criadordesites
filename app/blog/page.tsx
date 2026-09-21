import Link from "next/link";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <main className="landing-page">
      <PublicNav />

      <section className="landing-hero landing-hero-compact">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <span className="landing-eyebrow">Blog</span>
          <h1>Marketing digital na prática</h1>
          <p>Guias curtos sobre IA, anúncios, funis e conteúdo.</p>
        </div>
      </section>

      <section className="landing-section">
        <div className="blog-list">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <span className="blog-card-date">
                {new Date(post.date).toLocaleDateString("pt-BR")}
              </span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-card-link">Ler artigo →</span>
            </Link>
          ))}
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicNav } from "@/components/PublicNav";
import { PublicFooter } from "@/components/PublicFooter";
import { blogPosts } from "@/lib/blog";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="landing-page">
      <PublicNav />

      <article className="blog-post">
        <Link href="/blog" className="back-link">
          ← Voltar para o blog
        </Link>
        <span className="blog-card-date">{new Date(post.date).toLocaleDateString("pt-BR")}</span>
        <h1>{post.title}</h1>
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <Link href="/register" className="btn-primary">
          Testar o Marketing Digital Pro grátis
        </Link>
      </article>

      <PublicFooter />
    </main>
  );
}

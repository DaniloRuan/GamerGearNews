import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  getArticleBySlug,
  getRelatedArticles,
  getAllSlugs,
} from "@/app/data/articles";
import { generateArticleMetadata, generateArticleJsonLd } from "@/app/lib/seo";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ArticleProgress } from "@/components/article/ArticleProgress";
import { ArticleHero } from "@/components/article/ArticleHero";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleAuthor } from "@/components/article/ArticleAuthor";
import { ArticleShare } from "@/components/article/ArticleShare";
import { ArticleSidebar } from "@/components/article/ArticleSidebar";
import { RelatedArticles } from "@/components/article/RelatedArticles";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
};

// ─── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── SEO metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado | NivelMax" };
  return generateArticleMetadata(article);
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = article.relatedIds
    ? getRelatedArticles(article.relatedIds)
    : [];
  const jsonLd = generateArticleJsonLd(article);

  return (
    <>
      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="min-h-screen bg-[#080812] text-white">
        <ArticleProgress />

        <Navbar />

        <ArticleHero article={article} />

        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="flex gap-12 items-start">
            <main className="flex-1 min-w-0 max-w-3xl">
              <ArticleShare title={article.title} slug={article.slug} />
              <ArticleBody blocks={article.content} />
              <ArticleShare title={article.title} slug={article.slug} />
              <ArticleAuthor author={article.author} />
              <RelatedArticles articles={related} />
            </main>

            <ArticleSidebar blocks={article.content} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

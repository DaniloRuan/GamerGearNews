// ─────────────────────────────────────────────────────────────────────────────
// lib/api.ts
// Substitui os arquivos estáticos data/articles.ts e article/articles.ts
// Todos os dados agora vêm da API Express
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Author {
  name:    string;
  role:    string;
  avatar:  string;
  twitter?: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading";   level: 2 | 3; text: string }
  | { type: "image";     src: string; caption: string }
  | { type: "quote";     text: string; attribution?: string }
  | { type: "list";      items: string[] }
  | { type: "callout";   text: string; variant: "hot" | "info" | "warning" };

export interface Article {
  id:           number;
  slug:         string;
  title:        string;
  excerpt:      string;
  category:     string;
  tag:          string;
  readTime:     string;
  timestamp:    string;
  image:        string;
  imageCaption?: string;
  isHot?:       boolean;
  isFeatured?:  boolean;
  score?:       number;
  status?:      "published" | "draft" | "archived";
  relatedIds?:  number[];
  content?:     ArticleBlock[];
  publishedAt?: string;
  updatedAt?:   string;
  author?:      Author;
  seo?: {
    title?:       string;
    description?: string;
    keywords:     string[];
  };
}

// ─── Helper fetch ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    // no Next.js 15, revalida a cada 60s — ajuste conforme necessário
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API erro ${res.status} em ${path}`);
  }

  return res.json();
}

// ─── Funções públicas — usadas no Next.js ─────────────────────────────────────

/**
 * Retorna todos os artigos publicados.
 * Usado na home para montar FEATURED, SECONDARY, TRENDING e REVIEW.
 */
export async function getAllArticles(): Promise<Article[]> {
  const data = await apiFetch<{ articles: Article[] }>("/articles");
  return data.articles;
}

/**
 * Retorna um artigo pelo slug.
 * Usado em /noticias/[slug]/page.tsx
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const data = await apiFetch<{ article: Article }>(`/articles/slug/${slug}`);
    return data.article;
  } catch {
    return null;
  }
}

/**
 * Retorna todos os slugs publicados.
 * Usado em generateStaticParams de /noticias/[slug]/page.tsx
 */
export async function getAllSlugs(): Promise<string[]> {
  const data = await apiFetch<{ slugs: string[] }>("/articles/slugs");
  return data.slugs;
}

/**
 * Retorna artigos relacionados pelos IDs.
 * Usado na página de artigo para mostrar "Leia também"
 */
export async function getRelatedArticles(ids: number[]): Promise<Article[]> {
  if (!ids || ids.length === 0) return [];
  const all = await getAllArticles();
  return all.filter((a) => ids.includes(a.id));
}

// ─── Helpers para a home ─────────────────────────────────────────────────────
// Substituem as constantes FEATURED_ARTICLE, SECONDARY_ARTICLES, etc.

export async function getHomeData() {
  const articles = await getAllArticles();

  const featured   = articles.find((a) => a.isFeatured) ?? articles[0];
  const secondary  = articles.filter((a) => a.id !== featured?.id).slice(0, 4);
  const trending   = articles.filter((a) => a.isHot).slice(0, 4);
  const reviews    = articles.filter((a) => a.category === "Review").slice(0, 4);

  return { featured, secondary, trending, reviews };
}

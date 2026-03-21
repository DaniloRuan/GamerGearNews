export type ArticleStatus = "published" | "draft" | "archived";

export type ArticleCategory =
  | "Lançamentos"
  | "Hardware"
  | "Review"
  | "Indie"
  | "Esports"
  | "Mercado"
  | "RPG"
  | "Nintendo"
  | "Vendas";

export type ArticleTag =
  | "EXCLUSIVO"
  | "BREAKING"
  | "REVIEW"
  | "RUMOR"
  | "UPDATE"
  | "GAMEPLAY"
  | "REVELAÇÃO"
  | "LANÇAMENTO"
  | "DADOS";

export type BlockType =
  | "paragraph"
  | "heading"
  | "quote"
  | "list"
  | "image"
  | "callout";

export interface ArticleBlock {
  id: string;
  type: BlockType;
  // paragraph
  text?: string;
  // heading
  level?: 2 | 3;
  // quote
  attribution?: string;
  // list
  items?: string[];
  // image
  src?: string;
  caption?: string;
  // callout
  variant?: "hot" | "info" | "warning";
}

export interface AdminArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tag: ArticleTag;
  readTime: string;
  timestamp: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  imageCaption?: string;
  isHot: boolean;
  isFeatured: boolean;
  score?: number;
  status: ArticleStatus;
  relatedIds: number[];
  author: {
    name: string;
    role: string;
    avatar: string;
    twitter?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  content: ArticleBlock[];
}

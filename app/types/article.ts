export interface Author {
  name: string;
  role: string;
  avatar: string;
  twitter?: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: ArticleBlock[];
  category: string;
  tag: string;
  readTime: string;
  timestamp: string;
  publishedAt: string; // ISO string for SEO
  updatedAt?: string;
  image: string;
  imageCaption?: string;
  isHot?: boolean;
  isFeatured?: boolean;
  score?: number;
  author: Author;
  relatedIds?: number[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; caption: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string; variant: "info" | "warning" | "hot" };

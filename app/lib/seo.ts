import { Metadata } from "next";
import { Article } from "@/app/types/article";

const SITE_URL = "https://nivelmax.com.br";
const SITE_NAME = "NivelMax";

export function generateArticleMetadata(article: Article): Metadata {
  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      type: "article",
      title: article.seo.title,
      description: article.seo.description,
      url: `${SITE_URL}/noticias/${article.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.category,
      tags: article.seo.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: [article.image],
    },
    alternates: {
      canonical: `${SITE_URL}/noticias/${article.slug}`,
    },
  };
}

export function generateArticleJsonLd(article: Article): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/noticias/${article.slug}`,
    },
    keywords: article.seo.keywords.join(", "),
    articleSection: article.category,
    inLanguage: "pt-BR",
  });
}

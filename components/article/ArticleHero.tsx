import { Clock, Calendar, RefreshCw } from "lucide-react";
import { Article } from "@/app/types/article";
import { CategoryBadge } from "../ui/CategoryBadge";

interface ArticleHeroProps {
  article: Article;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <div className="relative w-full">
      {/* Cover image */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-[#080812]/50 to-[#080812]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080812]/60 via-transparent to-transparent" />
      </div>

      {/* Hero content — overlapping the image bottom */}
      <div className="relative max-w-4xl mx-auto px-4 -mt-32 pb-8 z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-[#606080] mb-4" aria-label="Breadcrumb">
          <a href="/" className="hover:text-[#FF3A20] transition-colors">Início</a>
          <span>/</span>
          <a href="/noticias" className="hover:text-[#FF3A20] transition-colors">Notícias</a>
          <span>/</span>
          <a href={`/categoria/${article.category.toLowerCase()}`} className="hover:text-[#FF3A20] transition-colors">
            {article.category}
          </a>
        </nav>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge label={article.tag} hot={article.isHot} />
          <CategoryBadge label={article.category} />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-base sm:text-lg text-[#A0A0C0] leading-relaxed mb-6 max-w-2xl">
          {article.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#606080] border-t border-[#1E1E3A] pt-4">
          <div className="flex items-center gap-1.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover border border-[#2D2D4E]"
            />
            <span className="text-[#A0A0C0] font-semibold">{article.author.name}</span>
            <span className="text-[#3D3D5E]">·</span>
            <span>{article.author.role}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </div>
          {article.updatedAt && (
            <div className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              Atualizado {formatDate(article.updatedAt)}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime} de leitura
          </div>
        </div>
      </div>

      {/* Image caption */}
      {article.imageCaption && (
        <p className="text-center text-[11px] text-[#505070] italic mt-1 mb-6 px-4">
          {article.imageCaption}
        </p>
      )}
    </div>
  );
}

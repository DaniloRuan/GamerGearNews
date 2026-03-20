import { Clock } from "lucide-react";
import Link from "next/link";
import { Article } from "@/app/article/article";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface HeroArticleProps {
  article: Article;
}

export function HeroArticle({ article }: HeroArticleProps) {
  return (
    <Link
      href={`/noticias/${article.slug}`}
      className="relative group overflow-hidden rounded-lg cursor-pointer block"
    >
      <div className="aspect-[16/9] sm:aspect-[21/9] relative">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080812] via-[#080812]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080812]/50 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 p-5 sm:p-8 max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge label={article.tag} hot={article.isHot} />
          <CategoryBadge label={article.category} />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3 tracking-tight group-hover:text-[#FF3A20] transition-colors duration-300">
          {article.title}
        </h1>
        <p className="text-sm sm:text-base text-[#A0A0C0] mb-4 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-[#606080]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {article.readTime} de leitura
          </span>
          <span>{article.timestamp}</span>
        </div>
      </div>
    </Link>
  );
}

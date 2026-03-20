import Link from "next/link";
import { Article } from "@/app/article/article";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ScorePill } from "./ScorePill";

interface TrendingItemProps {
  article: Article;
  rank: number;
}

export function TrendingItem({ article, rank }: TrendingItemProps) {
  return (
    <Link
      href={`/noticias/${article.slug}`}
      className="flex gap-3 group py-3 border-b border-[#1E1E3A] last:border-0"
    >
      {/* Rank */}
      <span className="text-2xl font-black text-[#1E1E3A] group-hover:text-[#FF3A20]/30 transition-colors w-8 shrink-0 leading-none mt-1">
        {String(rank).padStart(2, "0")}
      </span>

      {/* Thumbnail */}
      <div className="w-16 h-12 rounded overflow-hidden shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 group-hover:text-[#FF3A20] transition-colors duration-300">
            {article.title}
          </h4>
          {article.score && <ScorePill score={article.score} />}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <CategoryBadge label={article.category} />
          <span className="text-[10px] text-[#606080]">{article.timestamp}</span>
        </div>
      </div>
    </Link>
  );
}

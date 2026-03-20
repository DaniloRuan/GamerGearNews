import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Article } from "@/app/article/article";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { ScorePill } from "./ScorePill";

interface ReviewCardProps {
  article: Article;
}

export function ReviewCard({ article }: ReviewCardProps) {
  return (
    <Link href={`/noticias/${article.slug}`} className="block group">
      <Card className="bg-[#0D0D1A] border-[#1E1E3A] overflow-hidden hover:border-[#FF3A20]/40 transition-all duration-300 flex gap-0">
        <div className="w-24 shrink-0 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-3 flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <CategoryBadge label={article.category} />
            {article.score && <ScorePill score={article.score} />}
          </div>
          <h3 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[#FF3A20] transition-colors duration-300 leading-snug">
            {article.title}
          </h3>
          <p className="text-[10px] text-[#808098] line-clamp-1 mt-1">{article.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

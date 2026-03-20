import { Clock } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Article } from "@/app/types/article";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface SecondaryCardProps {
  article: Article;
}

export function SecondaryCard({ article }: SecondaryCardProps) {
  return (
    <Link href={`/noticias/${article.slug}`} className="block group">
      <Card className="bg-[#0D0D1A] border-[#1E1E3A] overflow-hidden hover:border-[#FF3A20]/40 transition-all duration-300 h-full">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge label={article.tag} hot={article.isHot} />
            <span className="text-[10px] text-[#606080] ml-auto">{article.timestamp}</span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-[#FF3A20] transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-xs text-[#808098] line-clamp-2 leading-relaxed">{article.excerpt}</p>
          <div className="flex items-center gap-1 mt-3 text-[10px] text-[#606080]">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

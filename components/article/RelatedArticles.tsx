import { Clock, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Article } from "@/app/types/article";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface RelatedArticlesProps {
  articles: Article[];
}

function RelatedCard({ article }: { article: Article }) {
  return (
    <a href={`/noticias/${article.slug}`}>
      <Card className="bg-[#0D0D1A] border-[#1E1E3A] overflow-hidden group cursor-pointer hover:border-[#FF3A20]/40 transition-all duration-300 h-full">
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge label={article.tag} hot={article.isHot} />
            <span className="text-[10px] text-[#606080] ml-auto">{article.timestamp}</span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-[#FF3A20] transition-colors mb-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-[#606080]">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-[#1E1E3A]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-black uppercase tracking-widest text-white">
          Leia também
        </h2>
        <a
          href="/noticias"
          className="flex items-center gap-1 text-xs text-[#FF3A20] font-semibold hover:underline"
        >
          Ver tudo <ChevronRight className="w-3 h-3" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <RelatedCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

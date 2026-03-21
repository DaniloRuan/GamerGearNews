import { Separator } from "@/components/ui/separator";
import { TrendingUp, Flame, Star, ChevronRight } from "lucide-react";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { CategoryTabs } from "@/components/news/CategoryTabs";
import { HeroArticle } from "@/components/news/HeroArticle";
import { SecondaryCard } from "@/components/news/SecondaryCard";
import { TrendingItem } from "@/components/news/TrendingItem";
import { ReviewCard } from "@/components/news/ReviewCard";
import { Newsletter } from "@/components/news/Newsletter";
import { PlatformStats } from "@/components/news/PlatformStats";

import { getHomeData } from "@/lib/api";

export default async function Inicio() {
  let featured, secondary, trending, reviews;

  try {
    ({ featured, secondary, trending, reviews } = await getHomeData());
  } catch (err) {
    console.error("Erro ao buscar dados da API:", err);
  }

  // API sem dados ainda — mostra mensagem amigável
  if (!featured) {
    return (
      <main className="min-h-screen bg-[#080812] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <p className="text-2xl font-black text-white">
            Nenhuma notícia ainda
          </p>
          <p className="text-sm text-[#606080]">
            Aguarde enquanto preparamos as últimas novidades do mundo gamer para
            você!
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080812] text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <CategoryTabs />

        {/* Hero + Secondary */}
        <section>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <HeroArticle article={featured} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {secondary?.slice(0, 2).map((a) => (
                <SecondaryCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>

        <Separator className="bg-[#1E1E3A]" />

        {/* Main + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {trending && trending.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="flex items-center gap-2 text-base font-black uppercase tracking-widest text-white">
                    <TrendingUp className="w-4 h-4 text-[#FF3A20]" />
                    Em Alta
                  </h2>
                  <button className="flex items-center gap-1 text-xs text-[#FF3A20] font-semibold hover:underline">
                    Ver tudo <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-lg px-4 py-1">
                  {trending.map((article, i) => (
                    <TrendingItem
                      key={article.id}
                      article={article}
                      rank={i + 1}
                    />
                  ))}
                </div>
              </div>
            )}

            {secondary && secondary.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 text-base font-black uppercase tracking-widest text-white mb-4">
                  <Flame className="w-4 h-4 text-[#FF3A20]" />
                  Últimas Notícias
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {secondary.map((a, i) => (
                    <SecondaryCard key={`${a.id}-${i}`} article={a} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {reviews && reviews.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="flex items-center gap-2 text-base font-black uppercase tracking-widest text-white">
                    <Star className="w-4 h-4 text-[#FF3A20]" />
                    Reviews
                  </h2>
                  <button className="flex items-center gap-1 text-xs text-[#FF3A20] font-semibold hover:underline">
                    Ver tudo <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {reviews.map((a) => (
                    <ReviewCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            )}

            <Newsletter />
            <PlatformStats />
          </aside>
        </section>
      </div>

      <Footer />
    </main>
  );
}

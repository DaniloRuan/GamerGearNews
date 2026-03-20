"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Flame, Star, ChevronRight } from "lucide-react";

// Layout
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

// News
import { CategoryTabs } from "@/components/news/CategoryTabs";
import { HeroArticle } from "@/components/news/HeroArticle";
import { SecondaryCard } from "@/components/news/SecondaryCard";
import { TrendingItem } from "@/components/news/TrendingItem";
import { ReviewCard } from "@/components/news/ReviewCard";
import { Newsletter } from "@/components/news/Newsletter";
import { PlatformStats } from "@/components/news/PlatformStats";

// Data
import {
  FEATURED_ARTICLE,
  SECONDARY_ARTICLES,
  TRENDING_ARTICLES,
  REVIEW_ARTICLES,
} from "@/app/article/articles";

export default function Inicio() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="min-h-screen bg-[#080812] text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Category Tabs */}
        <CategoryTabs active={activeTab} onChange={setActiveTab} />

        {/* Hero + Secondary grid */}
        <section>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <HeroArticle article={FEATURED_ARTICLE} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {SECONDARY_ARTICLES.slice(0, 2).map((a) => (
                <SecondaryCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>

        <Separator className="bg-[#1E1E3A]" />

        {/* Main content + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trending */}
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
                {TRENDING_ARTICLES.map((article, i) => (
                  <TrendingItem
                    key={article.id}
                    article={article}
                    rank={i + 1}
                  />
                ))}
              </div>
            </div>

            {/* Latest news grid */}
            <div>
              <h2 className="flex items-center gap-2 text-base font-black uppercase tracking-widest text-white mb-4">
                <Flame className="w-4 h-4 text-[#FF3A20]" />
                Últimas Notícias
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...SECONDARY_ARTICLES, ...SECONDARY_ARTICLES.slice(0, 1)].map(
                  (a, i) => (
                    <SecondaryCard key={`${a.id}-${i}`} article={a} />
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
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
                {REVIEW_ARTICLES.map((a) => (
                  <ReviewCard key={a.id} article={a} />
                ))}
              </div>
            </div>

            <Newsletter />
            <PlatformStats />
          </aside>
        </section>
      </div>

      <Footer />
    </main>
  );
}

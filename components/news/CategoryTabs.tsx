import { Zap, TrendingUp, Star, Trophy, Tv2 } from "lucide-react";

const TABS = [
  { label: "Tudo", icon: <Zap className="w-3.5 h-3.5" />, key: "all" },
  { label: "Em Alta", icon: <TrendingUp className="w-3.5 h-3.5" />, key: "trending" },
  { label: "Reviews", icon: <Star className="w-3.5 h-3.5" />, key: "reviews" },
  { label: "Esports", icon: <Trophy className="w-3.5 h-3.5" />, key: "esports" },
  { label: "Streaming", icon: <Tv2 className="w-3.5 h-3.5" />, key: "streaming" },
];

interface CategoryTabsProps {
  active: string;
  onChange: (key: string) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold whitespace-nowrap transition-all ${
            active === tab.key
              ? "bg-[#FF3A20] text-white"
              : "bg-[#1A1A2E] text-[#A0A0C0] hover:bg-[#252542] hover:text-white"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

import { Star } from "lucide-react";

interface ScorePillProps {
  score: number;
}

export function ScorePill({ score }: ScorePillProps) {
  const color =
    score >= 9
      ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
      : score >= 7
        ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
        : "text-red-400 border-red-400/30 bg-red-400/10";

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-black rounded border ${color}`}>
      <Star className="w-3 h-3 fill-current" />
      {score.toFixed(1)}
    </span>
  );
}

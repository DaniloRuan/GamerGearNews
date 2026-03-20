import { Flame } from "lucide-react";

interface CategoryBadgeProps {
  label: string;
  hot?: boolean;
}

export function CategoryBadge({ label, hot }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black tracking-widest uppercase rounded-sm ${
        hot
          ? "bg-[#FF3A20] text-white"
          : "bg-[#1A1A2E] border border-[#2D2D4E] text-[#A0A0C0]"
      }`}
    >
      {hot && <Flame className="w-2.5 h-2.5" />}
      {label}
    </span>
  );
}

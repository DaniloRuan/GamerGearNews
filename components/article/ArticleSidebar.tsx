"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleBlock } from "@/app/types/article";
import { List, Zap } from "lucide-react";

interface ArticleSidebarProps {
  blocks: ArticleBlock[];
}

function TableOfContents({ blocks }: { blocks: ArticleBlock[] }) {
  const headings = blocks.filter((b) => b.type === "heading") as Extract<
    ArticleBlock,
    { type: "heading" }
  >[];

  if (headings.length === 0) return null;

  return (
    <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-4">
      <h3 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#A0A0C0] mb-3">
        <List className="w-3.5 h-3.5 text-[#FF3A20]" />
        Neste artigo
      </h3>
      <ul className="space-y-1.5">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#heading-${i}`}
              className={`block text-xs leading-snug transition-colors hover:text-[#FF3A20] ${
                h.level === 2
                  ? "text-[#C0C0D8] font-semibold"
                  : "text-[#808098] pl-3 border-l border-[#2D2D4E]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarNewsletter() {
  return (
    <div className="bg-gradient-to-br from-[#FF3A20]/15 via-[#0D0D1A] to-[#1A0A2E] border border-[#FF3A20]/30 rounded-xl p-5">
      <Zap className="w-6 h-6 text-[#FF3A20] mb-2" />
      <h3 className="text-sm font-black text-white mb-1">Fique por dentro</h3>
      <p className="text-[11px] text-[#A0A0C0] mb-3 leading-relaxed">
        Notícias do mundo gamer todo dia, direto no seu e-mail.
      </p>
      <Input
        placeholder="seu@email.com"
        className="h-8 bg-[#080812] border-[#2D2D4E] text-white placeholder:text-[#505070] text-xs mb-2"
      />
      <Button className="w-full h-8 bg-[#FF3A20] hover:bg-[#E02A10] text-white text-xs font-black rounded-sm">
        Assinar grátis
      </Button>
    </div>
  );
}

export function ArticleSidebar({ blocks }: ArticleSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 space-y-4">
        <TableOfContents blocks={blocks} />
        <SidebarNewsletter />
      </div>
    </aside>
  );
}

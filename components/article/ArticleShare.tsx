"use client";

import { useState } from "react";
import { Link, Twitter, Facebook, Check } from "lucide-react";

interface ArticleShareProps {
  title: string;
  slug: string;
}

export function ArticleShare({ title, slug }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://nivelmax.com.br/noticias/${slug}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 flex-wrap my-8">
      <span className="text-[11px] font-black uppercase tracking-widest text-[#606080] mr-1">
        Compartilhar
      </span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D1A] border border-[#1E1E3A] rounded-sm text-xs font-bold text-[#A0A0C0] hover:border-[#FF3A20]/50 hover:text-white transition-all"
      >
        <Twitter className="w-3.5 h-3.5" />
        Twitter
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D1A] border border-[#1E1E3A] rounded-sm text-xs font-bold text-[#A0A0C0] hover:border-[#FF3A20]/50 hover:text-white transition-all"
      >
        <Facebook className="w-3.5 h-3.5" />
        Facebook
      </a>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D1A] border border-[#1E1E3A] rounded-sm text-xs font-bold text-[#A0A0C0] hover:border-[#FF3A20]/50 hover:text-white transition-all"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copiado!</span>
          </>
        ) : (
          <>
            <Link className="w-3.5 h-3.5" />
            Copiar link
          </>
        )}
      </button>
    </div>
  );
}

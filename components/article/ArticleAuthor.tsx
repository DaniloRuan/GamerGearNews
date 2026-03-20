import { Twitter } from "lucide-react";
import { Author } from "@/app/types/article";

interface ArticleAuthorProps {
  author: Author;
}

export function ArticleAuthor({ author }: ArticleAuthorProps) {
  return (
    <div className="flex items-start gap-4 bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-5 my-10">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-14 h-14 rounded-full object-cover border-2 border-[#2D2D4E] shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-black text-white">{author.name}</span>
          <span className="text-[10px] bg-[#1A1A2E] border border-[#2D2D4E] text-[#A0A0C0] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">
            {author.role}
          </span>
        </div>
        {author.twitter && (
          <a
            href={`https://twitter.com/${author.twitter.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#606080] hover:text-[#FF3A20] transition-colors mt-1"
          >
            <Twitter className="w-3 h-3" />
            {author.twitter}
          </a>
        )}
        <p className="text-xs text-[#808098] mt-2 leading-relaxed">
          Redator especializado em games AAA, indústria e análises de hardware. Cobre o mercado de games desde 2015.
        </p>
      </div>
    </div>
  );
}

import { Info, Flame, AlertTriangle } from "lucide-react";
import { ArticleBlock } from "@/app/types/article";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-[#C0C0D8] leading-[1.85] text-base sm:text-[17px] mb-6">{text}</p>
  );
}

function Heading({ level, text }: { level: 2 | 3; text: string }) {
  if (level === 2) {
    return (
      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-10 mb-4 border-l-2 border-[#FF3A20] pl-4">
        {text}
      </h2>
    );
  }
  return (
    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-8 mb-3">
      {text}
    </h3>
  );
}

function ArticleImage({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-8 -mx-4 sm:mx-0">
      <div className="overflow-hidden rounded-lg sm:rounded-xl">
        <img
          src={src}
          alt={caption}
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      <figcaption className="text-center text-[11px] text-[#505070] italic mt-2 px-4">
        {caption}
      </figcaption>
    </figure>
  );
}

function Quote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="my-8 border-l-4 border-[#FF3A20] bg-[#0D0D1A] rounded-r-lg px-6 py-5">
      <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed italic mb-2">
        "{text}"
      </p>
      {attribution && (
        <cite className="text-xs text-[#606080] not-italic font-medium">— {attribution}</cite>
      )}
    </blockquote>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[#C0C0D8] text-sm sm:text-base leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF3A20] shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Callout({ text, variant }: { text: string; variant: "info" | "warning" | "hot" }) {
  const styles = {
    hot: {
      bg: "bg-[#FF3A20]/10 border-[#FF3A20]/40",
      icon: <Flame className="w-4 h-4 text-[#FF3A20] shrink-0 mt-0.5" />,
    },
    info: {
      bg: "bg-blue-500/10 border-blue-500/30",
      icon: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: "bg-yellow-500/10 border-yellow-500/30",
      icon: <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />,
    },
  };

  const { bg, icon } = styles[variant];

  return (
    <div className={`my-6 flex gap-3 border rounded-lg px-4 py-4 ${bg}`}>
      {icon}
      <p className="text-sm text-[#C0C0D8] leading-relaxed">{text}</p>
    </div>
  );
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <Paragraph key={i} text={block.text} />;
          case "heading":
            return <Heading key={i} level={block.level} text={block.text} />;
          case "image":
            return <ArticleImage key={i} src={block.src} caption={block.caption} />;
          case "quote":
            return <Quote key={i} text={block.text} attribution={block.attribution} />;
          case "list":
            return <List key={i} items={block.items} />;
          case "callout":
            return <Callout key={i} text={block.text} variant={block.variant} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  ChevronUp, ChevronDown, Trash2, Plus,
  AlignLeft, Heading2, Quote, List, Image, Zap,
} from "lucide-react";
import { ArticleBlock, BlockType } from "@/app/types/admin";
import { v4 as uuid } from "uuid";

interface BlockEditorProps {
  blocks: ArticleBlock[];
  onChange: (blocks: ArticleBlock[]) => void;
}

const BLOCK_TYPES: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: "paragraph", label: "Parágrafo",  icon: <AlignLeft className="w-3.5 h-3.5" /> },
  { type: "heading",   label: "Título",     icon: <Heading2 className="w-3.5 h-3.5" /> },
  { type: "quote",     label: "Citação",    icon: <Quote className="w-3.5 h-3.5" /> },
  { type: "list",      label: "Lista",      icon: <List className="w-3.5 h-3.5" /> },
  { type: "image",     label: "Imagem",     icon: <Image className="w-3.5 h-3.5" /> },
  { type: "callout",   label: "Destaque",   icon: <Zap className="w-3.5 h-3.5" /> },
];

function newBlock(type: BlockType): ArticleBlock {
  const base = { id: uuid(), type };
  switch (type) {
    case "paragraph": return { ...base, text: "" };
    case "heading":   return { ...base, level: 2, text: "" };
    case "quote":     return { ...base, text: "", attribution: "" };
    case "list":      return { ...base, items: [""] };
    case "image":     return { ...base, src: "", caption: "" };
    case "callout":   return { ...base, variant: "info", text: "" };
    default:          return base;
  }
}

function BlockItem({
  block, idx, total,
  onUpdate, onDelete, onMove,
}: {
  block: ArticleBlock; idx: number; total: number;
  onUpdate: (data: Partial<ArticleBlock>) => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
}) {
  const inputCls = "w-full bg-[#080812] border border-[#2D2D4E] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#505070] focus:outline-none focus:border-[#FF3A20]/50 resize-none";

  return (
    <div className="group relative bg-[#080812] border border-[#1E1E3A] rounded-xl p-4 hover:border-[#2D2D4E] transition-colors">
      {/* Block type label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF3A20]">
          {block.type === "heading" ? `Título H${block.level}` : block.type}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onMove("up")} disabled={idx === 0} className="p-1 rounded text-[#606080] hover:text-white disabled:opacity-30">
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onMove("down")} disabled={idx === total - 1} className="p-1 rounded text-[#606080] hover:text-white disabled:opacity-30">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button onClick={onDelete} className="p-1 rounded text-[#606080] hover:text-red-400">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Fields by type */}
      {block.type === "paragraph" && (
        <textarea
          rows={4}
          className={inputCls}
          placeholder="Digite o texto do parágrafo..."
          value={block.text ?? ""}
          onChange={(e) => onUpdate({ text: e.target.value })}
        />
      )}

      {block.type === "heading" && (
        <div className="flex gap-2">
          <select
            value={block.level}
            onChange={(e) => onUpdate({ level: Number(e.target.value) as 2 | 3 })}
            className="bg-[#080812] border border-[#2D2D4E] rounded-md px-2 text-sm text-white shrink-0 focus:outline-none"
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <input
            className={inputCls}
            placeholder="Título da seção..."
            value={block.text ?? ""}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </div>
      )}

      {block.type === "quote" && (
        <div className="space-y-2">
          <textarea
            rows={3}
            className={inputCls}
            placeholder="Texto da citação..."
            value={block.text ?? ""}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
          <input
            className={inputCls}
            placeholder="Atribuição (ex: Nome, Cargo)"
            value={block.attribution ?? ""}
            onChange={(e) => onUpdate({ attribution: e.target.value })}
          />
        </div>
      )}

      {block.type === "list" && (
        <div className="space-y-2">
          {(block.items ?? []).map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={inputCls}
                placeholder={`Item ${i + 1}...`}
                value={item}
                onChange={(e) => {
                  const items = [...(block.items ?? [])];
                  items[i] = e.target.value;
                  onUpdate({ items });
                }}
              />
              <button
                onClick={() => {
                  const items = (block.items ?? []).filter((_, j) => j !== i);
                  onUpdate({ items });
                }}
                className="p-2 text-[#606080] hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => onUpdate({ items: [...(block.items ?? []), ""] })}
            className="text-xs text-[#FF3A20] font-semibold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Adicionar item
          </button>
        </div>
      )}

      {block.type === "image" && (
        <div className="space-y-2">
          <input
            className={inputCls}
            placeholder="URL da imagem (https://...)"
            value={block.src ?? ""}
            onChange={(e) => onUpdate({ src: e.target.value })}
          />
          {block.src && (
            <img src={block.src} alt="preview" className="w-full h-32 object-cover rounded-md" />
          )}
          <input
            className={inputCls}
            placeholder="Legenda da imagem..."
            value={block.caption ?? ""}
            onChange={(e) => onUpdate({ caption: e.target.value })}
          />
        </div>
      )}

      {block.type === "callout" && (
        <div className="space-y-2">
          <select
            value={block.variant}
            onChange={(e) => onUpdate({ variant: e.target.value as "hot" | "info" | "warning" })}
            className="bg-[#080812] border border-[#2D2D4E] rounded-md px-3 py-2 text-sm text-white focus:outline-none w-full"
          >
            <option value="hot">🔥 Hot — Destaque vermelho</option>
            <option value="info">💡 Info — Dica azul</option>
            <option value="warning">⚠️ Warning — Aviso amarelo</option>
          </select>
          <textarea
            rows={2}
            className={inputCls}
            placeholder="Texto do destaque..."
            value={block.text ?? ""}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const [showPicker, setShowPicker] = useState(false);

  function addBlock(type: BlockType) {
    onChange([...blocks, newBlock(type)]);
    setShowPicker(false);
  }

  function updateBlock(id: string, data: Partial<ArticleBlock>) {
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...data } : b)));
  }

  function deleteBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
  }

  function moveBlock(id: string, dir: "up" | "down") {
    const arr = [...blocks];
    const idx = arr.findIndex((b) => b.id === id);
    const newIdx = dir === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    onChange(arr);
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <BlockItem
          key={block.id}
          block={block}
          idx={i}
          total={blocks.length}
          onUpdate={(data) => updateBlock(block.id, data)}
          onDelete={() => deleteBlock(block.id)}
          onMove={(dir) => moveBlock(block.id, dir)}
        />
      ))}

      {/* Add block */}
      <div className="relative">
        <button
          onClick={() => setShowPicker((v) => !v)}
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-[#2D2D4E] rounded-xl text-sm font-semibold text-[#606080] hover:border-[#FF3A20]/50 hover:text-[#FF3A20] transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar bloco
        </button>

        {showPicker && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-3 grid grid-cols-3 gap-2 shadow-xl z-10">
            {BLOCK_TYPES.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#1A1A2E] hover:bg-[#FF3A20]/10 hover:border-[#FF3A20]/30 border border-[#2D2D4E] text-xs font-semibold text-[#A0A0C0] hover:text-white transition-all"
              >
                {icon} {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

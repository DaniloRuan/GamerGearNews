"use client";

import { useState } from "react";
import { ArticleInput } from "@/app/lib/adminApi";
import { Save, Flame, Star, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

const CATEGORIES = ["Lançamentos","Hardware","Review","Indie","Esports","Mercado","RPG","Nintendo","Vendas"];
const TAGS       = ["EXCLUSIVO","BREAKING","REVIEW","RUMOR","UPDATE","GAMEPLAY","REVELAÇÃO","LANÇAMENTO","DADOS"];

function slugify(text: string) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const EMPTY: ArticleInput = {
  slug: "", title: "", excerpt: "", category: "Lançamentos", tag: "EXCLUSIVO",
  readTime: "5 min", timestamp: "Agora", image: "", imageCaption: "",
  isHot: false, isFeatured: false, status: "draft", relatedIds: [],
  content: [],
  author: { name: "", role: "", avatar: "", twitter: "" },
  seo: { title: "", description: "", keywords: [] },
};

const input = "w-full bg-[#080812] border border-[#2D2D4E] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#505070] focus:outline-none focus:border-[#FF3A20]/50 resize-none";
const select = "w-full bg-[#080812] border border-[#2D2D4E] rounded-md px-3 py-2 text-sm text-white focus:outline-none";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#A0A0C0] uppercase tracking-widest mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-[#505070] mt-1">{hint}</p>}
    </div>
  );
}

// ─── Block editor inline ──────────────────────────────────────────────────────

type Block = Record<string, unknown>;

function BlockEditor({ blocks, onChange }: { blocks: Block[]; onChange: (b: Block[]) => void }) {
  function add(type: string) {
    const base: Block = { id: `b${Date.now()}`, type };
    if (type === "paragraph") base.text = "";
    if (type === "heading")   { base.level = 2; base.text = ""; }
    if (type === "quote")     { base.text = ""; base.attribution = ""; }
    if (type === "list")      base.items = [""];
    if (type === "image")     { base.src = ""; base.caption = ""; }
    if (type === "callout")   { base.variant = "info"; base.text = ""; }
    onChange([...blocks, base]);
  }

  function update(id: unknown, data: Partial<Block>) {
    onChange(blocks.map((b) => b.id === id ? { ...b, ...data } : b));
  }

  function remove(id: unknown) {
    onChange(blocks.filter((b) => b.id !== id));
  }

  function move(id: unknown, dir: "up" | "down") {
    const arr = [...blocks];
    const idx = arr.findIndex((b) => b.id === id);
    const ni  = dir === "up" ? idx - 1 : idx + 1;
    if (ni < 0 || ni >= arr.length) return;
    [arr[idx], arr[ni]] = [arr[ni], arr[idx]];
    onChange(arr);
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={String(block.id)} className="bg-[#080812] border border-[#1E1E3A] rounded-xl p-4 group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF3A20]">
              {String(block.type)}{block.type === "heading" ? ` H${block.level}` : ""}
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => move(block.id, "up")} disabled={i === 0} className="p-1 text-[#606080] hover:text-white disabled:opacity-30"><ChevronUp className="w-3.5 h-3.5" /></button>
              <button onClick={() => move(block.id, "down")} disabled={i === blocks.length - 1} className="p-1 text-[#606080] hover:text-white disabled:opacity-30"><ChevronDown className="w-3.5 h-3.5" /></button>
              <button onClick={() => remove(block.id)} className="p-1 text-[#606080] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {block.type === "paragraph" && (
            <textarea rows={3} className={input} value={String(block.text ?? "")} onChange={(e) => update(block.id, { text: e.target.value })} placeholder="Texto do parágrafo..." />
          )}
          {block.type === "heading" && (
            <div className="flex gap-2">
              <select className={`${select} w-20 shrink-0`} value={Number(block.level)} onChange={(e) => update(block.id, { level: Number(e.target.value) })}>
                <option value={2}>H2</option><option value={3}>H3</option>
              </select>
              <input className={input} value={String(block.text ?? "")} onChange={(e) => update(block.id, { text: e.target.value })} placeholder="Título..." />
            </div>
          )}
          {block.type === "quote" && (
            <div className="space-y-2">
              <textarea rows={2} className={input} value={String(block.text ?? "")} onChange={(e) => update(block.id, { text: e.target.value })} placeholder="Texto da citação..." />
              <input className={input} value={String(block.attribution ?? "")} onChange={(e) => update(block.id, { attribution: e.target.value })} placeholder="Atribuição (Nome, Cargo)" />
            </div>
          )}
          {block.type === "list" && (
            <div className="space-y-2">
              {(block.items as string[]).map((item, j) => (
                <div key={j} className="flex gap-2">
                  <input className={`${input} flex-1`} value={item} onChange={(e) => { const items = [...(block.items as string[])]; items[j] = e.target.value; update(block.id, { items }); }} placeholder={`Item ${j + 1}`} />
                  <button onClick={() => update(block.id, { items: (block.items as string[]).filter((_, k) => k !== j) })} className="p-2 text-[#606080] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
              <button onClick={() => update(block.id, { items: [...(block.items as string[]), ""] })} className="text-xs text-[#FF3A20] font-semibold flex items-center gap-1"><Plus className="w-3 h-3" />Adicionar item</button>
            </div>
          )}
          {block.type === "image" && (
            <div className="space-y-2">
              <input className={input} value={String(block.src ?? "")} onChange={(e) => update(block.id, { src: e.target.value })} placeholder="URL da imagem (https://...)" />
              {block.src && <img src={String(block.src)} alt="" className="w-full h-32 object-cover rounded-md" />}
              <input className={input} value={String(block.caption ?? "")} onChange={(e) => update(block.id, { caption: e.target.value })} placeholder="Legenda..." />
            </div>
          )}
          {block.type === "callout" && (
            <div className="space-y-2">
              <select className={select} value={String(block.variant)} onChange={(e) => update(block.id, { variant: e.target.value })}>
                <option value="hot">🔥 Hot</option>
                <option value="info">💡 Info</option>
                <option value="warning">⚠️ Warning</option>
              </select>
              <textarea rows={2} className={input} value={String(block.text ?? "")} onChange={(e) => update(block.id, { text: e.target.value })} placeholder="Texto do destaque..." />
            </div>
          )}
        </div>
      ))}

      {/* Picker de blocos */}
      <div className="grid grid-cols-3 gap-2">
        {[["paragraph","Parágrafo"],["heading","Título"],["quote","Citação"],["list","Lista"],["image","Imagem"],["callout","Destaque"]].map(([type, label]) => (
          <button key={type} onClick={() => add(type)} className="flex items-center justify-center gap-1.5 py-2 bg-[#0D0D1A] border border-dashed border-[#2D2D4E] rounded-lg text-xs font-semibold text-[#606080] hover:text-[#FF3A20] hover:border-[#FF3A20]/40 transition-all">
            <Plus className="w-3 h-3" />{label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

interface ArticleFormProps {
  initial?:     Partial<ArticleInput & { id?: number }>;
  onSave:       (data: ArticleInput) => Promise<void>;
  onSaveDraft?: (data: ArticleInput) => Promise<void>;
  loading?:     boolean;
}

export function ArticleForm({ initial, onSave, onSaveDraft, loading }: ArticleFormProps) {
  const [form, setForm]       = useState<ArticleInput>({ ...EMPTY, ...initial });
  const [tab, setTab]         = useState<"content"|"meta"|"seo">("content");
  const [kwInput, setKwInput] = useState("");

  function set<K extends keyof ArticleInput>(key: K, value: ArticleInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E3A] bg-[#0D0D1A] sticky top-0 z-10">
        <div className="flex gap-1">
          {(["content","meta","seo"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors capitalize ${tab === t ? "bg-[#FF3A20] text-white" : "text-[#808098] hover:text-white hover:bg-[#1A1A2E]"}`}>
              {t === "content" ? "Conteúdo" : t === "meta" ? "Metadados" : "SEO"}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {onSaveDraft && (
            <button onClick={() => onSaveDraft(form)} disabled={loading} className="px-4 py-1.5 bg-[#1A1A2E] border border-[#2D2D4E] text-[#A0A0C0] hover:text-white text-xs font-bold rounded-md transition-colors disabled:opacity-50">
              Salvar rascunho
            </button>
          )}
          <button onClick={() => onSave({ ...form, status: "published" })} disabled={loading} className="flex items-center gap-2 px-4 py-1.5 bg-[#FF3A20] hover:bg-[#E02A10] text-white text-xs font-black rounded-md disabled:opacity-50">
            <Save className="w-3.5 h-3.5" />{loading ? "Salvando..." : "Publicar"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* CONTEÚDO */}
        {tab === "content" && (
          <>
            <Field label="Título">
              <input className={input} value={form.title} onChange={(e) => { set("title", e.target.value); if (!initial?.slug) set("slug", slugify(e.target.value)); }} placeholder="Título do artigo..." />
            </Field>
            <Field label="Resumo" hint="1-2 frases. Aparece nos cards e no Google.">
              <textarea rows={2} className={input} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Breve descrição..." />
            </Field>
            <Field label="Imagem de capa">
              <input className={input} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
              {form.image && <img src={form.image} alt="" className="mt-2 w-full h-40 object-cover rounded-lg" />}
            </Field>
            <Field label="Legenda da imagem">
              <input className={input} value={form.imageCaption ?? ""} onChange={(e) => set("imageCaption", e.target.value)} placeholder="Opcional" />
            </Field>
            <Field label="Conteúdo">
              <BlockEditor blocks={form.content as Block[]} onChange={(b) => set("content", b as ArticleInput["content"])} />
            </Field>
          </>
        )}

        {/* META */}
        {tab === "meta" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoria">
                <select className={select} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Tag">
                <select className={select} value={form.tag} onChange={(e) => set("tag", e.target.value)}>
                  {TAGS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tempo de leitura">
                <input className={input} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min" />
              </Field>
              <Field label="Timestamp">
                <input className={input} value={form.timestamp} onChange={(e) => set("timestamp", e.target.value)} placeholder="Há 2 horas" />
              </Field>
            </div>
            <Field label="Slug (URL)" hint="Gerado automaticamente pelo título.">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#505070] shrink-0">/noticias/</span>
                <input className={`${input} flex-1`} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
              </div>
            </Field>
            <Field label="Score (nota — só para reviews)">
              <input type="number" min={0} max={10} step={0.1} className={input} value={form.score ?? ""} onChange={(e) => set("score", e.target.value ? Number(e.target.value) : undefined)} placeholder="Ex: 9.5" />
            </Field>
            <div className="flex gap-3">
              <button onClick={() => set("isHot", !form.isHot)} className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-bold transition-all ${form.isHot ? "bg-[#FF3A20]/15 border-[#FF3A20]/40 text-[#FF3A20]" : "bg-[#0D0D1A] border-[#2D2D4E] text-[#606080]"}`}>
                <Flame className="w-4 h-4" />{form.isHot ? "Em Destaque 🔥" : "Marcar como Hot"}
              </button>
              <button onClick={() => set("isFeatured", !form.isFeatured)} className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-bold transition-all ${form.isFeatured ? "bg-yellow-500/15 border-yellow-500/40 text-yellow-400" : "bg-[#0D0D1A] border-[#2D2D4E] text-[#606080]"}`}>
                <Star className="w-4 h-4" />{form.isFeatured ? "Featured ⭐" : "Marcar como Featured"}
              </button>
            </div>
            <div className="bg-[#080812] border border-[#1E1E3A] rounded-xl p-4 space-y-3">
              <p className="text-xs font-black text-[#A0A0C0] uppercase tracking-widest">Autor</p>
              <div className="grid grid-cols-2 gap-3">
                <input className={input} placeholder="Nome" value={form.author?.name ?? ""} onChange={(e) => set("author", { ...form.author!, name: e.target.value })} />
                <input className={input} placeholder="Cargo" value={form.author?.role ?? ""} onChange={(e) => set("author", { ...form.author!, role: e.target.value })} />
                <input className={input} placeholder="URL do avatar" value={form.author?.avatar ?? ""} onChange={(e) => set("author", { ...form.author!, avatar: e.target.value })} />
                <input className={input} placeholder="@twitter (opcional)" value={form.author?.twitter ?? ""} onChange={(e) => set("author", { ...form.author!, twitter: e.target.value })} />
              </div>
            </div>
          </>
        )}

        {/* SEO */}
        {tab === "seo" && (
          <>
            <Field label="Título SEO" hint={`${form.seo?.title?.length ?? 0}/60 caracteres`}>
              <input className={input} value={form.seo?.title ?? ""} onChange={(e) => set("seo", { ...form.seo, title: e.target.value })} placeholder="Título SEO | GamerGearNews" />
              <p className={`text-[11px] mt-1 ${(form.seo?.title?.length ?? 0) > 60 ? "text-red-400" : "text-[#505070]"}`}>{form.seo?.title?.length ?? 0}/60</p>
            </Field>
            <Field label="Descrição SEO">
              <textarea rows={3} className={input} value={form.seo?.description ?? ""} onChange={(e) => set("seo", { ...form.seo, description: e.target.value })} placeholder="Descrição para o Google..." />
              <p className={`text-[11px] mt-1 ${(form.seo?.description?.length ?? 0) > 155 ? "text-red-400" : "text-[#505070]"}`}>{form.seo?.description?.length ?? 0}/155</p>
            </Field>
            <Field label="Palavras-chave">
              <div className="flex gap-2 mb-2">
                <input className={`${input} flex-1`} placeholder="Digite e pressione Enter..." value={kwInput} onChange={(e) => setKwInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && kwInput.trim()) { set("seo", { ...form.seo, keywords: [...(form.seo?.keywords ?? []), kwInput.trim()] }); setKwInput(""); }}} />
                <button onClick={() => { if (kwInput.trim()) { set("seo", { ...form.seo, keywords: [...(form.seo?.keywords ?? []), kwInput.trim()] }); setKwInput(""); }}} className="px-3 py-2 bg-[#FF3A20] text-white text-sm font-bold rounded-md">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.seo?.keywords ?? []).map((kw, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A2E] border border-[#2D2D4E] rounded text-xs text-[#A0A0C0]">
                    {kw}
                    <button onClick={() => set("seo", { ...form.seo, keywords: (form.seo?.keywords ?? []).filter((_, j) => j !== i) })} className="text-[#606080] hover:text-red-400">×</button>
                  </span>
                ))}
              </div>
            </Field>
            {/* Preview Google */}
            <div className="bg-[#080812] border border-[#1E1E3A] rounded-xl p-4">
              <p className="text-[10px] font-bold text-[#606080] uppercase tracking-widest mb-3">Preview Google</p>
              <p className="text-blue-400 text-sm font-medium">{form.seo?.title || "Título do artigo | GamerGearNews"}</p>
              <p className="text-green-600 text-xs mt-0.5">gamergarnews.com.br/noticias/{form.slug || "slug"}</p>
              <p className="text-[#A0A0C0] text-xs mt-1">{form.seo?.description || "Descrição do artigo..."}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

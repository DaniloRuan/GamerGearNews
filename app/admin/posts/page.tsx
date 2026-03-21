"use client";

import { useEffect, useState } from "react";
import { useAuthStore }        from "@/app/store/authStore";
import { adminApi, Article, ArticleStatus } from "@/app/lib/adminApi";
import { AuthGuard }           from "@/components/admin/AuthGuard";
import Link from "next/link";
import {
  PlusCircle, Search, Trash2, Copy,
  ExternalLink, Pencil, Flame, Star,
  Filter, Loader2,
} from "lucide-react";

function StatusBadge({ status }: { status: ArticleStatus }) {
  const map = {
    published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    draft:     "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    archived:  "bg-[#1A1A2E] text-[#606080] border-[#2D2D4E]",
  };
  const labels = { published: "Publicado", draft: "Rascunho", archived: "Arquivado" };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${map[status]}`}>
      {labels[status]}
    </span>
  );
}

function ConfirmModal({ title, onConfirm, onCancel }: {
  title: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-base font-black text-white mb-2">Confirmar exclusão</h3>
        <p className="text-sm text-[#A0A0C0] mb-6 leading-relaxed">
          Tem certeza que deseja excluir <span className="text-white font-semibold">"{title}"</span>?
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 bg-[#1A1A2E] border border-[#2D2D4E] text-[#A0A0C0] text-sm font-semibold rounded-md">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold rounded-md hover:bg-red-500/30">Excluir</button>
        </div>
      </div>
    </div>
  );
}

function PostsList() {
  const { getToken }              = useAuthStore();
  const [articles, setArticles]   = useState<Article[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState<ArticleStatus | "all">("all");
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [actionId, setActionId]   = useState<number | null>(null);

  async function load() {
    try {
      const data = await adminApi.list(getToken());
      setArticles(data.articles);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: number) {
    setActionId(id);
    try { await adminApi.delete(getToken(), id); setArticles((p) => p.filter((a) => a.id !== id)); }
    catch (err) { console.error(err); }
    finally { setActionId(null); setConfirmId(null); }
  }

  async function handleDuplicate(id: number) {
    setActionId(id);
    try { await adminApi.duplicate(getToken(), id); await load(); }
    catch (err) { console.error(err); }
    finally { setActionId(null); }
  }

  async function handleStatus(id: number, status: ArticleStatus) {
    try {
      await adminApi.setStatus(getToken(), id, status);
      setArticles((p) => p.map((a) => a.id === id ? { ...a, status } : a));
    } catch (err) { console.error(err); }
  }

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const confirmArticle = articles.find((a) => a.id === confirmId);

  if (loading) return <div className="p-8 flex items-center gap-2 text-[#606080]"><Loader2 className="w-4 h-4 animate-spin" /> Carregando posts...</div>;

  return (
    <div className="p-8 max-w-6xl">
      {confirmId && confirmArticle && (
        <ConfirmModal title={confirmArticle.title} onConfirm={() => handleDelete(confirmId)} onCancel={() => setConfirmId(null)} />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Posts</h1>
          <p className="text-sm text-[#606080] mt-0.5">{articles.length} artigos no total</p>
        </div>
        <Link href="/admin/posts/novo" className="flex items-center gap-2 px-4 py-2 bg-[#FF3A20] hover:bg-[#E02A10] text-white text-sm font-black rounded-md transition-colors">
          <PlusCircle className="w-4 h-4" /> Novo Post
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606080]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="w-full pl-9 pr-4 h-9 bg-[#0D0D1A] border border-[#1E1E3A] rounded-md text-sm text-white placeholder:text-[#505070] focus:outline-none focus:border-[#FF3A20]/50" />
        </div>
        <div className="flex items-center gap-1 bg-[#0D0D1A] border border-[#1E1E3A] rounded-md p-1">
          <Filter className="w-3.5 h-3.5 text-[#606080] ml-2" />
          {(["all","published","draft","archived"] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${filterStatus === s ? "bg-[#FF3A20] text-white" : "text-[#808098] hover:text-white"}`}>
              {{ all:"Todos", published:"Publicados", draft:"Rascunhos", archived:"Arquivados" }[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E3A]">
              {["Post","Categoria","Status","Data","Ações"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-[#606080] uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-[#606080]">Nenhum post encontrado.</td></tr>
            )}
            {filtered.map((article) => (
              <tr key={article.id} className="border-b border-[#1E1E3A] last:border-0 hover:bg-[#1A1A2E]/30 transition-colors group">
                <td className="px-5 py-4 max-w-xs">
                  <div className="flex items-center gap-3">
                    <img src={article.image} alt="" className="w-14 h-9 object-cover rounded shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white line-clamp-1 group-hover:text-[#FF3A20] transition-colors">{article.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {article.isHot && <Flame className="w-3 h-3 text-[#FF3A20]" />}
                        {article.score && <span className="flex items-center gap-0.5 text-[10px] text-yellow-400"><Star className="w-2.5 h-2.5 fill-current" />{article.score}</span>}
                        <span className="text-[10px] text-[#505070]">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs text-[#A0A0C0] bg-[#1A1A2E] border border-[#2D2D4E] px-2 py-0.5 rounded">{article.category}</span>
                </td>
                <td className="px-5 py-4">
                  <select value={article.status} onChange={(e) => handleStatus(article.id, e.target.value as ArticleStatus)} className="bg-transparent text-[10px] font-bold border-0 outline-none cursor-pointer text-white">
                    <option value="published">✅ Publicado</option>
                    <option value="draft">✏️ Rascunho</option>
                    <option value="archived">📦 Arquivado</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-xs text-[#606080] whitespace-nowrap">
                  {new Date(article.publishedAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/posts/${article.id}`} title="Editar" className="p-1.5 rounded text-[#606080] hover:text-white hover:bg-[#1A1A2E] transition-colors"><Pencil className="w-3.5 h-3.5" /></Link>
                    <button onClick={() => handleDuplicate(article.id)} disabled={actionId === article.id} title="Duplicar" className="p-1.5 rounded text-[#606080] hover:text-white hover:bg-[#1A1A2E] transition-colors disabled:opacity-40">
                      {actionId === article.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <Link href={`/noticias/${article.slug}`} target="_blank" title="Ver no site" className="p-1.5 rounded text-[#606080] hover:text-white hover:bg-[#1A1A2E] transition-colors"><ExternalLink className="w-3.5 h-3.5" /></Link>
                    <button onClick={() => setConfirmId(article.id)} title="Excluir" className="p-1.5 rounded text-[#606080] hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPostsPage() {
  return <AuthGuard><PostsList /></AuthGuard>;
}

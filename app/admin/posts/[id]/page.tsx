"use client";

import { useEffect, useState }  from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore }         from "@/app/store/authStore";
import { adminApi, Article, ArticleInput } from "@/app/lib/adminApi";
import { ArticleForm }          from "@/components/admin/ArticleForm";
import { AuthGuard }            from "@/components/admin/AuthGuard";
import { ArrowLeft, ExternalLink, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

function EditPost() {
  const { id }         = useParams<{ id: string }>();
  const router         = useRouter();
  const { getToken }   = useAuthStore();

  const [article, setArticle]   = useState<Article | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving]     = useState(false);
  const [confirmDelete, setConfirm] = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    adminApi.byId(getToken(), Number(id))
      .then(({ article }) => setArticle(article))
      .catch((e) => setError(e.message))
      .finally(() => setPageLoading(false));
  }, [id]);

  async function handleSave(data: ArticleInput) {
    setSaving(true); setError("");
    try {
      await adminApi.update(getToken(), Number(id), { ...data, status: "published" });
      router.push("/admin/posts");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally { setSaving(false); }
  }

  async function handleDraft(data: ArticleInput) {
    setSaving(true); setError("");
    try {
      await adminApi.update(getToken(), Number(id), { ...data, status: "draft" });
      router.push("/admin/posts");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar rascunho");
    } finally { setSaving(false); }
  }

  async function handleDelete() {
    try {
      await adminApi.delete(getToken(), Number(id));
      router.push("/admin/posts");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao deletar");
    }
  }

  if (pageLoading) return (
    <div className="p-8 flex items-center gap-2 text-[#606080]">
      <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
    </div>
  );

  if (!article) return (
    <div className="p-8 text-red-400 text-sm">{error || "Artigo não encontrado"}</div>
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E3A]">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="p-1.5 rounded-md text-[#606080] hover:text-white hover:bg-[#1A1A2E] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight line-clamp-1 max-w-md">{article.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${article.status === "published" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" : "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"}`}>
                {article.status === "published" ? "Publicado" : "Rascunho"}
              </span>
              <span className="text-[11px] text-[#606080]">ID #{article.id}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/noticias/${article.slug}`} target="_blank" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#A0A0C0] hover:text-white bg-[#1A1A2E] border border-[#2D2D4E] rounded-md">
            <ExternalLink className="w-3.5 h-3.5" /> Ver no site
          </Link>
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 font-semibold">Confirmar?</span>
              <button onClick={handleDelete} className="px-3 py-1.5 text-xs font-bold bg-red-500/20 border border-red-500/30 text-red-400 rounded-md hover:bg-red-500/30">Sim, excluir</button>
              <button onClick={() => setConfirm(false)} className="px-3 py-1.5 text-xs font-bold bg-[#1A1A2E] border border-[#2D2D4E] text-[#A0A0C0] rounded-md">Cancelar</button>
            </div>
          ) : (
            <button onClick={() => setConfirm(true)} className="p-1.5 rounded-md text-[#606080] hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {error && <p className="px-6 py-2 text-xs text-red-400 bg-red-400/10 border-b border-red-400/20">{error}</p>}
      <div className="flex-1 overflow-hidden">
        <ArticleForm initial={article as unknown as Partial<ArticleInput>} onSave={handleSave} onSaveDraft={handleDraft} loading={saving} />
      </div>
    </div>
  );
}

export default function EditPostPage() {
  return <AuthGuard><EditPost /></AuthGuard>;
}

"use client";

import { useEffect, useState } from "react";
import { useAuthStore }        from "@/app/store/authStore";
import { adminApi, Article }   from "@/app/lib/adminApi";
import { AuthGuard }           from "@/components/admin/AuthGuard";
import Link                    from "next/link";
import {
  FileText, Clock, Flame, Archive,
  PlusCircle, ChevronRight, TrendingUp, Loader2,
} from "lucide-react";

function StatCard({ label, value, icon, color }: {
  label: string; value: number; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-white">{value}</p>
        <p className="text-xs text-[#606080] font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    draft:     "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    archived:  "bg-[#1A1A2E] text-[#606080] border-[#2D2D4E]",
  };
  const labels: Record<string, string> = {
    published: "Publicado", draft: "Rascunho", archived: "Arquivado",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${map[status]}`}>
      {labels[status] ?? status}
    </span>
  );
}

function Dashboard() {
  const { getToken }            = useAuthStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    adminApi.list(getToken())
      .then((d) => setArticles(d.articles))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const published = articles.filter((a) => a.status === "published").length;
  const drafts    = articles.filter((a) => a.status === "draft").length;
  const archived  = articles.filter((a) => a.status === "archived").length;
  const hot       = articles.filter((a) => a.isHot).length;
  const recent    = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  if (loading) return (
    <div className="p-8 flex items-center gap-2 text-[#606080]">
      <Loader2 className="w-4 h-4 animate-spin" /> Carregando...
    </div>
  );

  if (error) return (
    <div className="p-8 text-red-400 text-sm">{error}</div>
  );

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#606080] mt-0.5">
            Bem-vindo ao painel do GamerGearNews
          </p>
        </div>
        <Link
          href="/admin/posts/novo"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF3A20] hover:bg-[#E02A10] text-white text-sm font-black rounded-md transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> Novo Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Publicados"  value={published} icon={<FileText className="w-5 h-5 text-emerald-400" />} color="bg-emerald-500/10" />
        <StatCard label="Rascunhos"   value={drafts}    icon={<Clock   className="w-5 h-5 text-yellow-400" />}  color="bg-yellow-500/10" />
        <StatCard label="Em destaque" value={hot}       icon={<Flame   className="w-5 h-5 text-[#FF3A20]" />}   color="bg-[#FF3A20]/10" />
        <StatCard label="Arquivados"  value={archived}  icon={<Archive className="w-5 h-5 text-[#606080]" />}   color="bg-[#1A1A2E]" />
      </div>

      {/* Tabela recentes */}
      <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1E3A]">
          <h2 className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-[#FF3A20]" /> Posts Recentes
          </h2>
          <Link
            href="/admin/posts"
            className="flex items-center gap-1 text-xs text-[#FF3A20] font-semibold hover:underline"
          >
            Ver todos <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E3A]">
              {["Título", "Categoria", "Status", "Data", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-[#606080] uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-[#606080]">
                  Nenhum artigo ainda.
                </td>
              </tr>
            )}
            {recent.map((article) => (
              <tr
                key={article.id}
                className="border-b border-[#1E1E3A] last:border-0 hover:bg-[#1A1A2E]/40 transition-colors"
              >
                <td className="px-5 py-3.5 max-w-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.image}
                      alt=""
                      className="w-10 h-7 object-cover rounded shrink-0"
                    />
                    <p className="text-sm font-semibold text-white line-clamp-1">
                      {article.title}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs text-[#A0A0C0] bg-[#1A1A2E] border border-[#2D2D4E] px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={article.status} />
                </td>
                <td className="px-5 py-3.5 text-xs text-[#606080] whitespace-nowrap">
                  {new Date(article.publishedAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-5 py-3.5">
                  <Link
                    href={`/admin/posts/${article.id}`}
                    className="text-xs text-[#FF3A20] font-semibold hover:underline"
                  >
                    Editar →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AuthGuard><Dashboard /></AuthGuard>;
}

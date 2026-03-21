"use client";

import { useState }     from "react";
import { useRouter }    from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { adminApi, ArticleInput } from "@/app/lib/adminApi";
import { ArticleForm }  from "@/components/admin/ArticleForm";
import { AuthGuard }    from "@/components/admin/AuthGuard";
import { ArrowLeft }    from "lucide-react";
import Link             from "next/link";

function NewPost() {
  const router       = useRouter();
  const { getToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSave(data: ArticleInput) {
    setLoading(true); setError("");
    try {
      await adminApi.create(getToken(), { ...data, status: "published" });
      router.push("/admin/posts");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar post");
    } finally { setLoading(false); }
  }

  async function handleDraft(data: ArticleInput) {
    setLoading(true); setError("");
    try {
      await adminApi.create(getToken(), { ...data, status: "draft" });
      router.push("/admin/posts");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao salvar rascunho");
    } finally { setLoading(false); }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1E1E3A]">
        <Link href="/admin/posts" className="p-1.5 rounded-md text-[#606080] hover:text-white hover:bg-[#1A1A2E] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-lg font-black text-white tracking-tight">Novo Post</h1>
          <p className="text-xs text-[#606080]">Preencha e publique</p>
        </div>
      </div>
      {error && <p className="px-6 py-2 text-xs text-red-400 bg-red-400/10 border-b border-red-400/20">{error}</p>}
      <div className="flex-1 overflow-hidden">
        <ArticleForm onSave={handleSave} onSaveDraft={handleDraft} loading={loading} />
      </div>
    </div>
  );
}

export default function NewPostPage() {
  return <AuthGuard><NewPost /></AuthGuard>;
}

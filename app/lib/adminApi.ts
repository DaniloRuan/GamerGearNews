// lib/adminApi.ts
// Todas as chamadas à API que requerem autenticação (admin)

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface Author {
  name:     string;
  role:     string;
  avatar:   string;
  twitter?: string;
}

export type ArticleStatus = "published" | "draft" | "archived";

export interface Article {
  id:           number;
  slug:         string;
  title:        string;
  excerpt:      string;
  category:     string;
  tag:          string;
  readTime:     string;
  timestamp:    string;
  image:        string;
  imageCaption?: string;
  isHot:        boolean;
  isFeatured:   boolean;
  score?:       number;
  status:       ArticleStatus;
  relatedIds:   number[];
  content:      Record<string, unknown>[];
  author?:      Author;
  seo: {
    title?:       string;
    description?: string;
    keywords:     string[];
  };
  publishedAt:  string;
  updatedAt?:   string;
}

export type ArticleInput = Omit<Article, "id" | "publishedAt" | "updatedAt">;

// ─── Helper ───────────────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; admin: { id: number; name: string; email: string } }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    ),

  me: (token: string) =>
    apiFetch<{ admin: { id: number; name: string; email: string } }>(
      "/auth/me", {}, token
    ),

  changePassword: (token: string, currentPassword: string, newPassword: string) =>
    apiFetch<{ ok: boolean }>(
      "/auth/change-password",
      { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) },
      token
    ),
};

// ─── Articles (admin) ─────────────────────────────────────────────────────────

export const adminApi = {
  // Lista todos (inclusive drafts)
  list: (token: string) =>
    apiFetch<{ articles: Article[] }>("/articles/admin", {}, token),

  // Busca por ID
  byId: (token: string, id: number) =>
    apiFetch<{ article: Article }>(`/articles/admin/${id}`, {}, token),

  // Criar
  create: (token: string, data: Partial<ArticleInput>) =>
    apiFetch<{ ok: boolean; id: number; slug: string }>(
      "/articles",
      { method: "POST", body: JSON.stringify(data) },
      token
    ),

  // Atualizar
  update: (token: string, id: number, data: Partial<ArticleInput>) =>
    apiFetch<{ ok: boolean }>(
      `/articles/${id}`,
      { method: "PUT", body: JSON.stringify(data) },
      token
    ),

  // Deletar
  delete: (token: string, id: number) =>
    apiFetch<{ ok: boolean }>(
      `/articles/${id}`,
      { method: "DELETE" },
      token
    ),

  // Mudar status
  setStatus: (token: string, id: number, status: ArticleStatus) =>
    apiFetch<{ ok: boolean }>(
      `/articles/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) },
      token
    ),

  // Duplicar
  duplicate: (token: string, id: number) =>
    apiFetch<{ ok: boolean; id: number; slug: string }>(
      `/articles/${id}/duplicate`,
      { method: "POST" },
      token
    ),
};

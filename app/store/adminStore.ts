import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AdminArticle, ArticleBlock } from "@/app/types/admin";

// ─── Seed data ─────────────────────────────────────────────────────────────────

const SEED: AdminArticle[] = [
  {
    id: 1,
    slug: "gta-vi-data-oficial-ia-generativa",
    title: "GTA VI finalmente tem data oficial: mundo aberto redefinido com IA generativa",
    excerpt: "Rockstar Games surpreende ao anunciar tecnologias inéditas que criam NPCs com memória persistente e narrativas dinâmicas.",
    category: "Lançamentos",
    tag: "EXCLUSIVO",
    readTime: "6 min",
    timestamp: "Há 2 horas",
    publishedAt: "2026-03-20T10:00:00Z",
    updatedAt: "2026-03-20T12:00:00Z",
    image: "https://conectaja.proteste.org.br/wp-content/uploads/2025/05/trailer-gta6-970x472.png",
    imageCaption: "Cena do trailer oficial de GTA VI",
    isHot: true,
    isFeatured: true,
    status: "published",
    relatedIds: [2, 3],
    author: { name: "Lucas Ferreira", role: "Editor de Games AAA", avatar: "https://i.pravatar.cc/150?img=11", twitter: "@lucasferreira" },
    seo: { title: "GTA VI tem data oficial | GamerGearNews", description: "Rockstar revela data oficial de GTA VI com IA generativa.", keywords: ["GTA VI", "Rockstar"] },
    content: [
      { id: "b1", type: "paragraph", text: "A Rockstar Games finalmente quebrou o silêncio: GTA VI tem data de lançamento confirmada para 26 de setembro de 2026." },
      { id: "b2", type: "callout", variant: "hot", text: "🔥 Data confirmada: GTA VI chega em 26 de setembro de 2026 para PS5 e Xbox Series X|S." },
      { id: "b3", type: "heading", level: 2, text: "IA generativa muda tudo para os NPCs" },
      { id: "b4", type: "paragraph", text: "Os NPCs terão memória persistente entre sessões, reagindo diferente ao jogador com base em ações passadas." },
    ],
  },
  {
    id: 2,
    slug: "elden-ring-shadow-erdtree-12-milhoes",
    title: "Elden Ring: Shadow of the Erdtree bate 12 milhões de cópias em 48h",
    excerpt: "A expansão já é considerada o maior lançamento de DLC da história dos games.",
    category: "Vendas",
    tag: "BREAKING",
    readTime: "3 min",
    timestamp: "Há 4 horas",
    publishedAt: "2026-03-20T08:00:00Z",
    image: "https://s2-techtudo.glbimg.com/Ffvi3QbTnjwC1KFWnYChPVkBgnM=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/m/a/d8M8EuSMCYmWSAiPz8bw/elden-ring-vendas.png",
    isHot: true,
    isFeatured: false,
    status: "published",
    relatedIds: [1],
    author: { name: "Ana Beatriz", role: "Repórter de Mercado", avatar: "https://i.pravatar.cc/150?img=5" },
    seo: { title: "Elden Ring DLC bate 12 milhões | GamerGearNews", description: "Shadow of the Erdtree vende 12 milhões em 48h.", keywords: ["Elden Ring", "FromSoftware"] },
    content: [
      { id: "b1", type: "paragraph", text: "Shadow of the Erdtree vendeu 12 milhões de cópias nas primeiras 48 horas." },
    ],
  },
  {
    id: 3,
    slug: "review-astro-bot",
    title: "Review: Astro Bot",
    excerpt: "A Team Asobi entrega a experiência mais pura e alegre dos games em anos.",
    category: "Review",
    tag: "REVIEW",
    readTime: "8 min",
    timestamp: "Há 2 dias",
    publishedAt: "2026-03-18T10:00:00Z",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80",
    isHot: false,
    isFeatured: false,
    score: 10,
    status: "published",
    relatedIds: [],
    author: { name: "Camila Torres", role: "Editora de Indie", avatar: "https://i.pravatar.cc/150?img=9" },
    seo: { title: "Review Astro Bot | GamerGearNews", description: "Análise completa de Astro Bot.", keywords: ["Astro Bot", "review", "PS5"] },
    content: [
      { id: "b1", type: "paragraph", text: "Astro Bot é pura alegria em forma de jogo." },
    ],
  },
  {
    id: 4,
    slug: "xbox-handheld-2025-rascunho",
    title: "Microsoft confirma Xbox Handheld para o final de 2025",
    excerpt: "O portátil da Microsoft rodará jogos do Game Pass nativamente.",
    category: "Hardware",
    tag: "RUMOR",
    readTime: "3 min",
    timestamp: "Há 12h",
    publishedAt: "2026-03-20T06:00:00Z",
    image: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=600&q=80",
    isHot: false,
    isFeatured: false,
    status: "draft",
    relatedIds: [],
    author: { name: "Rafael Monteiro", role: "Editor de Hardware", avatar: "https://i.pravatar.cc/150?img=8" },
    seo: { title: "Xbox Handheld confirmado | GamerGearNews", description: "Microsoft confirma portátil Xbox.", keywords: ["Xbox Handheld", "Microsoft"] },
    content: [
      { id: "b1", type: "paragraph", text: "Rascunho em desenvolvimento..." },
    ],
  },
];

// ─── Store ─────────────────────────────────────────────────────────────────────

interface AdminStore {
  articles: AdminArticle[];
  // CRUD
  addArticle: (article: Omit<AdminArticle, "id">) => void;
  updateArticle: (id: number, data: Partial<AdminArticle>) => void;
  deleteArticle: (id: number) => void;
  duplicateArticle: (id: number) => void;
  // Status
  setStatus: (id: number, status: AdminArticle["status"]) => void;
  // Blocks
  addBlock: (articleId: number, block: ArticleBlock) => void;
  updateBlock: (articleId: number, blockId: string, data: Partial<ArticleBlock>) => void;
  deleteBlock: (articleId: number, blockId: string) => void;
  moveBlock: (articleId: number, blockId: string, direction: "up" | "down") => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      articles: SEED,

      addArticle: (article) => {
        const ids = get().articles.map((a) => a.id);
        const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
        set((s) => ({ articles: [{ ...article, id: newId }, ...s.articles] }));
      },

      updateArticle: (id, data) => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a
          ),
        }));
      },

      deleteArticle: (id) => {
        set((s) => ({ articles: s.articles.filter((a) => a.id !== id) }));
      },

      duplicateArticle: (id) => {
        const original = get().articles.find((a) => a.id === id);
        if (!original) return;
        const ids = get().articles.map((a) => a.id);
        const newId = Math.max(...ids) + 1;
        const copy: AdminArticle = {
          ...original,
          id: newId,
          slug: `${original.slug}-copia`,
          title: `${original.title} (cópia)`,
          status: "draft",
          publishedAt: new Date().toISOString(),
          updatedAt: undefined,
        };
        set((s) => ({ articles: [copy, ...s.articles] }));
      },

      setStatus: (id, status) => {
        set((s) => ({
          articles: s.articles.map((a) => (a.id === id ? { ...a, status } : a)),
        }));
      },

      addBlock: (articleId, block) => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === articleId ? { ...a, content: [...a.content, block] } : a
          ),
        }));
      },

      updateBlock: (articleId, blockId, data) => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === articleId
              ? { ...a, content: a.content.map((b) => (b.id === blockId ? { ...b, ...data } : b)) }
              : a
          ),
        }));
      },

      deleteBlock: (articleId, blockId) => {
        set((s) => ({
          articles: s.articles.map((a) =>
            a.id === articleId
              ? { ...a, content: a.content.filter((b) => b.id !== blockId) }
              : a
          ),
        }));
      },

      moveBlock: (articleId, blockId, direction) => {
        set((s) => ({
          articles: s.articles.map((a) => {
            if (a.id !== articleId) return a;
            const content = [...a.content];
            const idx = content.findIndex((b) => b.id === blockId);
            if (idx === -1) return a;
            const newIdx = direction === "up" ? idx - 1 : idx + 1;
            if (newIdx < 0 || newIdx >= content.length) return a;
            [content[idx], content[newIdx]] = [content[newIdx], content[idx]];
            return { ...a, content };
          }),
        }));
      },
    }),
    { name: "ggn-admin-store" }
  )
);

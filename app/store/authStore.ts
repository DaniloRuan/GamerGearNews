"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authApi } from "@/app/lib/adminApi";

interface Admin {
  id:    number;
  name:  string;
  email: string;
}

interface AuthStore {
  token:         string | null;
  admin:         Admin  | null;
  loading:       boolean;
  error:         string | null;
  _hasHydrated:  boolean;

  setHasHydrated: (v: boolean) => void;
  login:          (email: string, password: string) => Promise<boolean>;
  logout:         () => void;
  getToken:       () => string;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token:        null,
      admin:        null,
      loading:      false,
      error:        null,
      _hasHydrated: false,

      setHasHydrated: (v) => set({ _hasHydrated: v }),

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { token, admin } = await authApi.login(email, password);
          set({ token, admin, loading: false });
          return true;
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Erro ao fazer login";
          set({ error: msg, loading: false });
          return false;
        }
      },

      logout: () => {
        set({ token: null, admin: null });
        window.location.href = "/admin/login";
      },

      getToken: () => {
        const token = get().token;
        if (!token) {
          window.location.href = "/admin/login";
          throw new Error("Não autenticado");
        }
        return token;
      },
    }),
    {
      name:    "ggn-auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

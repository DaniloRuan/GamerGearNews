"use client";

import { useState, useEffect } from "react";
import { useRouter }           from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { Gamepad2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router                          = useRouter();
  const { login, loading, error, token } = useAuthStore();
  const [email, setEmail]               = useState("");
  const [password, setPass]             = useState("");
  const [show, setShow]                 = useState(false);
  const [hydrated, setHydrated]         = useState(false);

  // Espera o Zustand hidratar do localStorage
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Se já tiver token após hidratação, vai direto pro admin
  useEffect(() => {
    if (hydrated && token) {
      router.replace("/admin");
    }
  }, [hydrated, token, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) router.replace("/admin");
  }

  // Ainda hidratando
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#080812] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#FF3A20] animate-spin" />
      </div>
    );
  }

  const inputCls =
    "w-full bg-[#080812] border border-[#2D2D4E] rounded-md px-4 py-3 text-sm text-white placeholder:text-[#505070] focus:outline-none focus:border-[#FF3A20]/60 transition-colors";

  return (
    <div className="min-h-screen bg-[#080812] flex items-center justify-center px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF3A20]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-[#FF3A20]/10 border border-[#FF3A20]/30 flex items-center justify-center mb-4">
            <Gamepad2 className="w-7 h-7 text-[#FF3A20]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            GamerGear<span className="text-[#FF3A20]">News</span>
          </h1>
          <p className="text-xs text-[#606080] mt-1">Painel de Administração</p>
        </div>

        {/* Card */}
        <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-2xl p-6 shadow-2xl">
          <h2 className="text-base font-black text-white mb-5">Entrar</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#A0A0C0] uppercase tracking-widest mb-1.5">
                Email
              </label>
              <input
                type="email"
                className={inputCls}
                placeholder="Login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#A0A0C0] uppercase tracking-widest mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className={`${inputCls} pr-11`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606080] hover:text-white transition-colors"
                >
                  {show ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF3A20] hover:bg-[#E02A10] disabled:opacity-60 text-white text-sm font-black rounded-md transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#404060] mt-4">
          GamerGearNews © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

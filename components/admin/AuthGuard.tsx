"use client";

import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { useAuthStore }        from "@/app/store/authStore";
import { Loader2 }             from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, _hasHydrated } = useAuthStore();
  const router                  = useRouter();

  // Fallback: garante que após montar no cliente, sabemos que hidratou
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Aguarda tanto o mount do componente quanto a hidratação do Zustand
  const ready = mounted && _hasHydrated;

  useEffect(() => {
    if (ready && !token) {
      router.replace("/admin/login");
    }
  }, [ready, token, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#080812] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#FF3A20] animate-spin" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#080812] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#FF3A20] animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

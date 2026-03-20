"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

export function Newsletter() {
  return (
    <div className="bg-gradient-to-br from-[#FF3A20]/20 via-[#0D0D1A] to-[#1A0A2E] border border-[#FF3A20]/30 rounded-lg p-6">
      <Zap className="w-8 h-8 text-[#FF3A20] mb-3" />
      <h3 className="text-lg font-black text-white mb-1 tracking-tight">Fique por dentro</h3>
      <p className="text-xs text-[#A0A0C0] mb-4 leading-relaxed">
        As maiores notícias do mundo gamer direto no seu e-mail. Sem spam.
      </p>
      <div className="flex gap-2">
        <Input
          placeholder="seu@email.com"
          className="h-9 bg-[#080812] border-[#2D2D4E] text-white placeholder:text-[#505070] text-xs flex-1"
        />
        <Button className="h-9 bg-[#FF3A20] hover:bg-[#E02A10] text-white text-xs font-black px-4 rounded-sm shrink-0">
          Assinar
        </Button>
      </div>
    </div>
  );
}

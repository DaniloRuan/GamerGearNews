import { Gamepad2, GamepadDirectional } from "lucide-react";

const FOOTER_LINKS = ["Sobre", "Contato", "Privacidade", "Termos"];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1E1E3A] bg-[#0D0D1A]">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GamepadDirectional className="w-5 h-5 text-[#FF3A20]" />
          <span className="font-black text-lg tracking-tighter text-white">
            GamerGear<span className="text-[#FF3A20]">News</span>
          </span>
        </div>

        <p className="text-xs text-[#606080] text-center">
          © 2026 GamerGearNews. O portal gamer mais completo do Brasil.
        </p>

        <div className="flex gap-4 text-xs text-[#606080]">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

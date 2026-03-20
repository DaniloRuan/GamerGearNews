"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Search, Menu, X, Gamepad2, GamepadDirectional } from "lucide-react";

const NAV_LINKS = ["Notícias", "Reviews", "Hardware", "Esports", "Guias"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#080812]/95 backdrop-blur-md border-b border-[#1E1E3A]">
      {/* Top bar */}
      <div className="bg-[#FF3A20] text-white text-[11px] font-bold tracking-widest text-center py-1.5 uppercase">
        🔥 GTA VI DATA REVELADA — Leia agora
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <GamepadDirectional className="w-7 h-7 text-[#FF3A20]" />
          <span className="font-black text-2xl tracking-tighter text-white">
            GamerGears<span className="text-[#FF3A20]">News</span>
          </span>
        </a>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {NAV_LINKS.map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink className="px-3 py-2 text-sm font-semibold text-[#A0A0C0] hover:text-white transition-colors cursor-pointer rounded-md hover:bg-[#1A1A2E]">
                  {item}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center gap-2 animate-in slide-in-from-right-4">
              <Input
                autoFocus
                placeholder="Buscar jogos, reviews..."
                className="h-8 w-52 bg-[#1A1A2E] border-[#2D2D4E] text-white placeholder:text-[#505070] text-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#A0A0C0]"
                onClick={() => setSearchOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#A0A0C0] hover:text-white"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-4 h-4" />
            </Button>
          )}
          <Button className="hidden sm:flex bg-[#FF3A20] hover:bg-[#E02A10] text-white text-xs font-black px-4 h-8 rounded-sm">
            PRO
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 text-[#A0A0C0]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0D0D1A] border-t border-[#1E1E3A] px-4 py-3 flex flex-col gap-1 animate-in slide-in-from-top-2">
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              className="text-left px-3 py-2.5 text-sm font-semibold text-[#A0A0C0] hover:text-white hover:bg-[#1A1A2E] rounded-md transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

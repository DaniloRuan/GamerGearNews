"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import {
  Gamepad2, LayoutDashboard, FileText,
  PlusCircle, Eye, LogOut,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",      href: "/admin",            icon: LayoutDashboard },
  { label: "Todos os Posts", href: "/admin/posts",      icon: FileText },
  { label: "Novo Post",      href: "/admin/posts/novo", icon: PlusCircle },
  { label: "Ver Site",       href: "/",                 icon: Eye, external: true },
];

export function AdminSidebar() {
  const pathname        = usePathname();
  const { admin, logout } = useAuthStore();

  return (
    <aside className="w-56 shrink-0 bg-[#0D0D1A] border-r border-[#1E1E3A] flex flex-col min-h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1E1E3A]">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#FF3A20] flex items-center justify-center shrink-0">
            <Gamepad2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-black text-white tracking-widest uppercase leading-none">GamerGear</p>
            <p className="text-[9px] text-[#FF3A20] font-bold tracking-widest uppercase">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon, external }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                active
                  ? "bg-[#FF3A20]/15 text-[#FF3A20] border border-[#FF3A20]/20"
                  : "text-[#808098] hover:text-white hover:bg-[#1A1A2E]"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="px-3 pb-5 border-t border-[#1E1E3A] pt-3 space-y-2">
        {admin && (
          <div className="px-3 py-2 rounded-md bg-[#1A1A2E]">
            <p className="text-xs font-bold text-white truncate">{admin.name}</p>
            <p className="text-[10px] text-[#606080] truncate">{admin.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#808098] hover:text-red-400 hover:bg-[#1A1A2E] transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}

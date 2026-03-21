import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080812] text-white flex">
      <AdminSidebar />
      <div className="flex-1 ml-56 min-h-screen">
        {children}
      </div>
    </div>
  );
}

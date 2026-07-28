"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import Footer from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F0F0]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity tablet:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 h-screen shrink-0 transform transition-transform duration-300 tablet:static tablet:block tablet:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar onMobileClose={() => setIsSidebarOpen(false)} />
      </aside>

      <div className="flex flex-1 flex-col min-w-0 overflow-y-auto p-5 gap-5">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} /> 
        
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
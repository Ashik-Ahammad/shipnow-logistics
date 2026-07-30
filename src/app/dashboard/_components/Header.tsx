"use client";

import { useState } from "react";
import { Menu, Plus, Search } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const isDashboard = pathname === "/dashboard" || pathname === "/";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/dashboard/shipments?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleAddNewShipping = () => {
    router.push("/dashboard/shipments/create");
  };

  // If not on the dashboard, we still need the mobile menu toggle for navigation
  // but we hide the dashboard-specific content (search, add buttons, 'Hello John').
  if (!isDashboard) {
    return (
      <header className="z-40 tablet:hidden mb-5">
        <div className="flex items-center justify-between">
          <Image
            src="/images/shipnowBlueLogo.png"
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <button 
            onClick={onMenuClick}
            className="cursor-pointer text-gray-600 transition-colors hover:text-gray-900 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="z-40">
      
      {/* Mobile Header */}
      <div className="flex flex-col gap-4 tablet:hidden">
        <div className="flex items-center justify-between">
          <Image
            src="/images/shipnowBlueLogo.png"
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          
          <button 
            onClick={onMenuClick}
            className="cursor-pointer text-gray-600 transition-colors hover:text-gray-900 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-lg bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none transition-all focus:ring-1 focus:ring-[#856DF3]"
            />
          </form>
          <button 
            onClick={handleAddNewShipping}
            className="flex h-10.5 w-10.5 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#232323] text-white transition-colors hover:bg-black"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden items-center justify-between tablet:flex">
        
        <div>
          <p className="text-[16px] font-normal text-gray-500">Hello John!</p>
          <h1 className="mt-0.75 text-[24px] font-bold leading-none text-gray-900">
            Good Morning
          </h1>
        </div>

        
        <div className="flex items-center gap-2.5">
          <form onSubmit={handleSearchSubmit} className="relative w-70 desktop:w-[320px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#333333]" />
            <input
              type="text"
              placeholder="Search anything"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-lg text-[#757575] border border-transparent bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#856DF3]"
            />
          </form>
          <button 
            onClick={handleAddNewShipping}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#333333] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden desktop:inline">Add New Shipping</span>
            <span className="inline desktop:hidden">New Shipping</span>
          </button>
        </div>
      </div>
    </header>
  );
}
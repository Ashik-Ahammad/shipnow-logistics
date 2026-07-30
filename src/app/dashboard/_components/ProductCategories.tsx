"use client";

import { MoreHorizontal } from "lucide-react";
import { productCategoriesData } from "@/data/dashboard";
import { cn } from "@/lib/utils";

export default function ProductCategories() {
  return (
    <div className="flex h-110.75 flex-col rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Product Categories</h2>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Total Products */}
      <div className="mb-4 flex items-end justify-between">
        <span className="text-[13px] font-medium text-[#757575]">Total Products</span>
        <span className="text-[28px] font-bold leading-none text-[#333333]">
          {productCategoriesData.total}
        </span>
      </div>

      {/* Visual Bar */}
      <div className="mb-8 flex h-8 w-full overflow-hidden rounded-lg">
        {productCategoriesData.categories.map((cat, index) => (
          <div 
            key={index} 
            className={cat.color}
            style={{ width: `${cat.percentage}%` }}
          />
        ))}
      </div>

      {/* Categories List */}
      <div className="flex flex-1 flex-col justify-between">
        {productCategoriesData.categories.map((cat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("h-2.5 w-2.5 rounded-full", cat.color)} />
              <span className="text-[13px] font-bold text-[#333333]">{cat.name}</span>
            </div>
            <div className="flex items-center rounded-md bg-[#F4F4F5] px-2.5 py-1 text-[11px]">
              <span className="font-medium text-[#757575]">{cat.count} products</span>
              <div className="mx-2.5 h-3 w-[1px] bg-[#E0E0E0]" />
              <span className="font-bold text-[#333333]">{cat.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
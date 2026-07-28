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
      <div className="mb-8 flex h-12 w-full gap-1">
        {productCategoriesData.categories.map((cat, index) => (
          <div 
            key={index} 
            className={cn(
              "h-full", 
              cat.color,
              index === 0 && "rounded-l-lg",
              index === productCategoriesData.categories.length - 1 && "rounded-r-lg"
            )}
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
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-medium text-[#A3A3A3]">{cat.count} products</span>
              <span className="w-8 text-right text-[13px] font-bold text-[#333333]">{cat.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { inventoryCategories } from '@/data/warehouse';

export default function WarehouseInventory() {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col w-full h-full shadow-[0px_1px_3px_rgba(0,0,0,0.02)] border border-gray-100/50 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-[16px] font-semibold text-[#333333] leading-[1.2]">Warehouse Inventory</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-baseline gap-1.5 mb-6">
          <span className="text-[24px] font-bold text-[#333333] leading-[1.1]">10,000</span>
          <span className="text-[12px] font-medium text-gray-500">packages</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between flex-1 min-h-0 gap-4 md:gap-0">
        {inventoryCategories.map((cat, index) => {
          const isLast = index === inventoryCategories.length - 1;
          return (
            <React.Fragment key={cat.name}>
              {/* Desktop Vertical View */}
              <div className={`hidden md:flex flex-col items-center flex-1 group relative h-full px-[12px] ${isLast ? '' : 'border-r border-dashed border-[#EAEAEA]'}`}>
                <span className="text-[11px] text-[#757575] font-normal text-center mb-2 h-7 flex items-end justify-center leading-[1.3] px-1 shrink-0">
                  {cat.name}
                </span>

                {/* Tooltip on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1f2937] text-white text-[11px] py-1 px-2 rounded-md pointer-events-none z-20 whitespace-nowrap shadow-lg mt-4">
                  {cat.value} pkgs
                </div>
                
                <div className="relative w-full mx-auto flex-1 min-h-0 bg-linear-to-b from-transparent to-[#EBEBEB] rounded-t-[3px] mb-3 overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 right-0 w-full rounded-[3px] transition-all duration-300 group-hover:opacity-90"
                    style={{
                      height: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                      backgroundImage: cat.striped 
                        ? 'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.8) 4px, rgba(255,255,255,0.8) 6px)' 
                        : 'none'
                    }}
                  />
                </div>

                <div className="text-[11px] flex items-center gap-1 shrink-0 pb-1 leading-none">
                  <span className="font-bold text-[#333333]">{cat.percentage}%</span>
                  <span className="text-[#E0E0E0]">·</span>
                  <span className="font-normal text-[#757575]">{cat.value}</span>
                </div>
              </div>

              {/* Mobile Horizontal View */}
              <div className="md:hidden flex items-center justify-between w-full pt-1 pb-1">
                <div className="w-[45%] h-9 bg-gray-50 rounded-sm overflow-hidden relative">
                 <div 
                   className="absolute top-0 left-0 bottom-0 rounded-sm"
                   style={{
                     width: `${Math.min(100, (cat.percentage / 25) * 100)}%`,
                     backgroundColor: cat.color,
                     backgroundImage: cat.striped 
                       ? 'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.8) 4px, rgba(255,255,255,0.8) 6px)' 
                       : 'none'
                   }}
                 />
                </div>
                <div className="flex flex-col items-end pl-4">
                  <span className="text-[12px] text-gray-500 font-medium">{cat.name}</span>
                  <div className="text-[11px] font-bold text-[#1f2937] flex items-center gap-1 mt-0.5">
                    <span>{cat.percentage}%</span>
                    <span className="text-gray-300 mx-px">·</span>
                    <span className="text-gray-400 font-medium">{cat.value}</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      </div>
    </div>
  );
}

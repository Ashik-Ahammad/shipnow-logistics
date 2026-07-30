"use client";

import React, { useState } from 'react';
import { warehouseMapData } from '@/data/warehouse';

export default function WarehouseMap() {
  const [activeFloor, setActiveFloor] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col w-full h-full shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
        <h2 className="text-[16px] font-semibold text-[#333333] leading-[1.2]">Warehouse Map</h2>
        <div className="flex gap-[10px] bg-[#F0F0F0] rounded-[8px]">
          {[1, 2, 3].map(floor => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`px-[20px] h-[34px] rounded-[8px] text-[12px] font-semibold transition-colors flex items-center justify-center ${
                activeFloor === floor
                  ? 'bg-[#333333] text-white shadow-sm'
                  : 'text-[#757575] hover:text-[#333333] hover:bg-white/50'
              }`}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#f9fafb] rounded-2xl p-5 lg:p-6 flex flex-col flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {warehouseMapData[activeFloor].map((section) => {
            // Calculate column span based on the category for exact layout match
            const colSpanClass = section.category === 'Apparel' 
              ? 'lg:col-span-3 md:col-span-2 col-span-1' 
              : 'col-span-1';

            return (
              <div key={section.category} className={`bg-white rounded-xl p-4 lg:p-5 flex flex-col justify-between shadow-[0px_1px_3px_rgba(0,0,0,0.02)] border border-gray-100/50 ${colSpanClass}`}>
                <div>
                  <h3 className="text-[14px] font-bold text-[#333333] leading-[1.25] mb-4">{section.category}</h3>
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    {section.blocks.map(block => (
                      <div 
                        key={block.id} 
                        className={`w-10 h-10 p-[6px] rounded-md shrink-0 flex ${
                          block.status === 'Available'
                            ? 'bg-[#E3DDFF]'
                            : 'bg-[#E0E0E0]'
                        }`}
                      >
                        <div className="w-full h-full bg-white rounded-sm flex items-center justify-center text-[10px] font-semibold leading-none text-[#333333]">
                          {block.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-normal text-[#757575] flex items-center gap-1 mt-auto">
                  Available Space 
                  <div>
                    <span className="font-bold text-[#333333]">{section.availableSpace.split('/')[0]}</span>
                    <span className="font-bold text-[#757575]">/{section.availableSpace.split('/')[1]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-6 mt-auto">
          <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
            <div className="w-4 h-4 rounded-md bg-[#E3DDFF]"></div>
            Available
          </div>
          <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
            <div className="w-4 h-4 rounded-md bg-[#E0E0E0]"></div>
            Full
          </div>
        </div>
      </div>
    </div>
  );
}

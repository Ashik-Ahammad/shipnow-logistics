"use client";

import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-5 desktop:grid-cols-3">
      <div className="flex items-center justify-between rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
        <div>
          <h3 className="mb-2 text-[14px] font-medium text-[#757575]">
            Active Shipments
          </h3>
          <div className="mb-3 flex items-baseline gap-1.5">
            <span className="text-[28px] font-bold text-[#333333]">
              1,284
            </span>
            <span className="text-[12px] font-medium text-[#A3A3A3]">
              shipments
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px]">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F8EE]">
             <ChevronUp className="h-3.5 w-3.5 text-[#007837]" strokeWidth={3} />
            </div>
            <span className="font-semibold text-[#22C55E] text-[10px]">+8.7%</span> 
            <span className="text-[#A3A3A3] text-[10px]">from last week</span>
          </div>
        </div>
        
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-[#856DF3]">
          <Image src="/icons/shipments.svg" alt="Active Shipments" width={28} height={28} className="brightness-0 invert" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
        <div>
          <h3 className="mb-2 text-[14px] font-medium text-[#757575]">
            Delivery Performance
          </h3>
          <div className="mb-3 flex items-baseline gap-1.5">
            <span className="text-[28px] font-bold text-[#333333]">
              94.3%
            </span>
            <span className="text-[12px] font-medium text-[#A3A3A3]">
              on-time
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px]">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F8EE]">
              <ChevronUp className="h-3.5 w-3.5 text-[#007837]" strokeWidth={3} />
            </div>
            <span className="font-semibold text-[#22C55E] text-[10px]">-1.2%</span>
            <span className="text-[#A3A3A3] text-[10px]">from last week</span>
          </div>
        </div>
        
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-[#856DF3]">
          <Image src="/icons/analytics.svg" alt="Delivery Performance" width={28} height={28} className="brightness-0 invert" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
        <div>
          <h3 className="mb-2 text-[14px] font-medium text-[#757575]">
            Revenue
          </h3>
          <div className="mb-3 flex items-baseline gap-1.5">
            <span className="text-[28px] font-bold text-[#333333]">
              $82,450
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px]">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F8EE]">
             <ChevronUp className="h-3.5 w-3.5 text-[#007837]" strokeWidth={3} />
            </div> 
            <span className="font-semibold text-[#22C55E] text-[10px]">+12.4%</span>
            <span className="text-[#A3A3A3] text-[10px]">from last month</span>
          </div>
        </div>
        
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-[#856DF3]">
          <Image src="/icons/dollar.svg" alt="Revenue" width={28} height={28} className="brightness-0 invert" />
        </div>
      </div>
    </div>
  ); 
}
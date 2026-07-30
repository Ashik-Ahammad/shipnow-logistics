"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { profitSummaryData } from "@/data/dashboard";

interface TooltipPayloadItem {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="flex w-[114px] flex-col justify-center gap-1 rounded-lg rounded-bl-none bg-[#F0F0F0] p-2 outline-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#856DF3]"></div>
            <span className="text-[12px] font-medium leading-none text-[#757575]">Revenue</span>
          </div>
          <span className="text-[12px] font-semibold leading-none text-[#333333]">
            ${payload[0].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#333333]"></div>
            <span className="text-[12px] font-medium leading-none text-[#757575]">Cost</span>
          </div>
          <span className="text-[12px] font-semibold leading-none text-[#333333]">
            ${payload[1].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ProfitSummary() {
  const [selectedRange, setSelectedRange] = useState("Last 8 Months");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayData = useMemo(() => {
    if (selectedRange === "Last 4 Months") return profitSummaryData.slice(-4);
    if (selectedRange === "Last 8 Months") return profitSummaryData.slice(-8);
    return profitSummaryData; // Last Year
  }, [selectedRange]);

  const ranges = ["Last 4 Months", "Last 8 Months", "Last Year"];

  return (
    <div className="flex h-[259px] flex-col rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Profit Summary</h2>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-[12px] font-medium text-[#757575] hover:bg-gray-100 transition-colors"
          >
            {selectedRange} <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 z-50 overflow-hidden rounded-lg bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.08)] border border-gray-100">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[12px] transition-colors hover:bg-gray-50 ${
                    selectedRange === range ? "bg-gray-50 font-semibold text-[#333333]" : "font-medium text-[#757575]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <div className="flex items-end gap-2 desktop:gap-3">
          <span className="text-[24px] desktop:text-[32px] font-bold leading-none text-[#333333]">$624,550</span>
          <div className="flex items-center gap-1 rounded-full bg-[#E5F9E9] px-2 py-1 text-[11px] font-bold text-[#14CA74]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.37496 3V7.875C9.37496 7.97446 9.33546 8.06984 9.26513 8.14017C9.1948 8.21049 9.09942 8.25 8.99996 8.25C8.90051 8.25 8.80513 8.21049 8.7348 8.14017C8.66447 8.06984 8.62496 7.97446 8.62496 7.875V3.90516L3.26528 9.26531C3.19491 9.33568 3.09948 9.37521 2.99996 9.37521C2.90045 9.37521 2.80502 9.33568 2.73465 9.26531C2.66429 9.19495 2.62476 9.09951 2.62476 9C2.62476 8.90049 2.66429 8.80505 2.73465 8.73469L8.09481 3.375H4.12496C4.02551 3.375 3.93013 3.33549 3.8598 3.26516C3.78947 3.19484 3.74996 3.09946 3.74996 3C3.74996 2.90054 3.78947 2.80516 3.8598 2.73484C3.93013 2.66451 4.02551 2.625 4.12496 2.625H8.99996C9.09942 2.625 9.1948 2.66451 9.26513 2.73484C9.33546 2.80516 9.37496 2.90054 9.37496 3Z" fill="#007837"/>
            </svg>
            <span>5.62%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 desktop:gap-4 pb-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#856DF3]"></div>
            <span className="text-[12px] font-medium text-[#757575]">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#333333]"></div>
            <span className="text-[12px] font-medium text-[#757575]">Cost</span>
          </div>
        </div>
      </div>

      <div className="h-full w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={displayData} 
            margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid vertical={false} stroke="#F3F4F6" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#A3A3A3', fontSize: 10, fontWeight: 500 }}
              dy={5}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#A3A3A3', fontSize: 10, fontWeight: 500 }}
              ticks={[0, 25000, 50000, 75000, 100000]} 
              domain={[0, 100000]}
              tickFormatter={(value) => value === 0 ? '$0' : `$${(value / 1000)}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="revenue" radius={[5, 5, 0, 0]} barSize={15.88}>
              {displayData.map((entry, index) => (
                <Cell key={`cell-revenue-${index}`} fill={entry.month === 'May' ? "#856DF3" : "#E3DDFF"} />
              ))}
            </Bar>
            <Bar dataKey="cost" radius={[5, 5, 0, 0]} barSize={15.88}>
              {displayData.map((entry, index) => (
                <Cell key={`cell-cost-${index}`} fill={entry.month === 'May' ? "#333333" : "#F0F0F0"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
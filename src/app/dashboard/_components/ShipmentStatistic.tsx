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
  ResponsiveContainer 
} from "recharts";
import { shipmentStatisticData } from "@/data/dashboard";

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: any;
}

// Custom shape for the bars to match Figma design
const CustomBar = (props: CustomBarProps) => {
  const { x = 0, y = 0, width = 0, height = 0, payload } = props;
  const isActive = payload?.month === 'May'; // May is active

  const gradientId = isActive ? "colorPurple" : "colorGray";

  return (
    <g>
      {/* Gradient Fill - For ALL bars */}
      <rect x={x} y={y} width={width} height={height} fill={`url(#${gradientId})`} />
      
      {/* Top Black Border - For ALL bars */}
      <line 
        x1={x} 
        y1={y} 
        x2={x + width} 
        y2={y} 
        stroke="#333333" 
        strokeWidth={2} 
      />
      
      {/* Active Dot for May */}
      {isActive && (
        <circle 
          cx={x + width / 2} 
          cy={y} 
          r={5.5} 
          fill="#333333" 
          stroke="#FFFFFF" 
          strokeWidth={2.5} 
        />
      )}
    </g>
  );
};

interface TooltipPayloadItem {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// Custom Tooltip matching Figma design
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-[#E3DDFF] px-4 py-3 shadow-sm">
        <span className="mb-1 text-[12px] font-medium text-[#757575]">{label} 2030</span>
        <span className="text-[16px] font-bold text-[#333333]">
          {payload[0].value.toLocaleString()}
        </span>
      </div>
    );
  }
  return null;
};

export default function ShipmentStatistic() {
  const [selectedRange, setSelectedRange] = useState("Last Year");
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
    if (selectedRange === "Last 3 Months") return shipmentStatisticData.slice(-3);
    if (selectedRange === "Last 6 Months") return shipmentStatisticData.slice(-6);
    return shipmentStatisticData; // Last Year
  }, [selectedRange]);

  const ranges = ["Last 3 Months", "Last 6 Months", "Last Year"];

  return (
    <div className="flex h-[259px] flex-col rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      {/* Header Section */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Shipment Statistic</h2>
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

      {/* Number Summary */}
      <div className="mb-2 flex items-end gap-2 desktop:gap-3">
        <span className="text-[24px] desktop:text-[32px] font-bold leading-none text-[#333333]">4,352</span>
        <div className="flex items-center gap-1 rounded-full bg-[#E5F9E9] px-2 py-1 text-[11px] font-bold text-[#14CA74]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.37496 3V7.875C9.37496 7.97446 9.33546 8.06984 9.26513 8.14017C9.1948 8.21049 9.09942 8.25 8.99996 8.25C8.90051 8.25 8.80513 8.21049 8.7348 8.14017C8.66447 8.06984 8.62496 7.97446 8.62496 7.875V3.90516L3.26528 9.26531C3.19491 9.33568 3.09948 9.37521 2.99996 9.37521C2.90045 9.37521 2.80502 9.33568 2.73465 9.26531C2.66429 9.19495 2.62476 9.09951 2.62476 9C2.62476 8.90049 2.66429 8.80505 2.73465 8.73469L8.09481 3.375H4.12496C4.02551 3.375 3.93013 3.33549 3.8598 3.26516C3.78947 3.19484 3.74996 3.09946 3.74996 3C3.74996 2.90054 3.78947 2.80516 3.8598 2.73484C3.93013 2.66451 4.02551 2.625 4.12496 2.625H8.99996C9.09942 2.625 9.1948 2.66451 9.26513 2.73484C9.33546 2.80516 9.37496 2.90054 9.37496 3Z" fill="#007837"/>
          </svg>
          <span>+8.7%</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-full w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={displayData} 
            margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
            barCategoryGap={0} 
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#F3F4F6" 
            />
            
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
              ticks={[0, 1200, 2400, 3600, 4800]} 
              domain={[0, 4800]}
              tickFormatter={(value) => value === 0 ? '0K' : `${(value / 1000).toFixed(1)}K`}
            />
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'transparent' }} 
            />
            
            <Bar 
              dataKey="shipments" 
              shape={<CustomBar />} 
            />
            
            {/* Gradients Definition */}
            <defs>
              <linearGradient id="colorGray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#808080" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#808080" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#856DF3" stopOpacity={1} />
                <stop offset="100%" stopColor="#856DF3" stopOpacity={0} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
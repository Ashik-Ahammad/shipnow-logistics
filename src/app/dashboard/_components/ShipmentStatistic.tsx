"use client";

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

// Custom shape for the bars to match Figma design
const CustomBar = (props: any) => {
  const { x, y, width, height, index } = props;
  const isActive = index === 4; // May is active

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
        strokeWidth={2.5} 
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

// Custom Tooltip matching Figma design
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-[#E2DDFE] px-4 py-3 shadow-sm">
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
  return (
    <div className="flex h-[254px] flex-col rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      {/* Header Section */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Shipment Statistic</h2>
        <button className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-[12px] font-medium text-[#757575] hover:bg-gray-100">
          Last Year <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Number Summary */}
      <div className="mb-2 flex items-end gap-3">
        <span className="text-[32px] font-bold leading-none text-[#333333]">4,352</span>
        <div className="flex items-center gap-1 rounded-full bg-[#E5F9E9] px-2 py-1 text-[11px] font-bold text-[#14CA74]">
          <ArrowUpRight className="h-3 w-3" />
          <span>+8.7%</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-full w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={shipmentStatisticData} 
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
                <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#856DF3" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#856DF3" stopOpacity={0} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
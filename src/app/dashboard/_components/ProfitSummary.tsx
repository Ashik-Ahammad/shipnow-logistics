"use client";
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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length >= 2) {
    return (
      <div className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#856DF3]"></div>
            <span className="text-[12px] font-medium text-[#757575]">Revenue</span>
          </div>
          <span className="text-[12px] font-bold text-[#333333]">
            ${payload[0].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#333333]"></div>
            <span className="text-[12px] font-medium text-[#757575]">Cost</span>
          </div>
          <span className="text-[12px] font-bold text-[#333333]">
            ${payload[1].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ProfitSummary() {
  return (
    <div className="flex h-63.5 flex-col rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Profit Summary</h2>
        <button className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-[12px] font-medium text-[#757575] hover:bg-gray-100">
          Last 8 Months <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <div className="flex items-end gap-3">
          <span className="text-[32px] font-bold leading-none text-[#333333]">$624,550</span>
          <div className="flex items-center gap-1 rounded-full bg-[#E5F9E9] px-2 py-1 text-[11px] font-bold text-[#14CA74]">
            <ArrowUpRight className="h-3 w-3" />
            <span>5.62%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pb-1">
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
            data={profitSummaryData} 
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
            <Bar dataKey="revenue" radius={[4, 4, 0, 0]} barSize={16}>
              {profitSummaryData.map((entry, index) => (
                <Cell key={`cell-revenue-${index}`} fill={index === 4 ? "#856DF3" : "#EBE7FE"} />
              ))}
            </Bar>
            <Bar dataKey="cost" radius={[4, 4, 0, 0]} barSize={16}>
              {profitSummaryData.map((entry, index) => (
                <Cell key={`cell-cost-${index}`} fill={index === 4 ? "#333333" : "#F3F4F6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
"use client";

import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { shipmentTypeData } from "@/data/dashboard";
import { cn } from "@/lib/utils";

// Recharts data
const pieData = [
  { name: "Road Freight", value: 46, color: "#856DF3" },
  { name: "Air Freight", value: 28, color: "#333333" },
  { name: "Ocean Freight", value: 17, color: "#757575" },
  { name: "Rail Freight", value: 9, color: "#E5E7EB" },
];

// Custom Tooltip for Pie
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
          <span className="text-[12px] font-medium text-[#757575]">{payload[0].name}</span>
        </div>
        <span className="mt-1 text-[14px] font-bold text-[#333333]">
          {payload[0].value.toLocaleString()} shipments
        </span>
      </div>
    );
  }
  return null;
};

export default function ShipmentType() {
  return (
    <div className="flex h-98.5 flex-col rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Shipment Type</h2>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Recharts Donut Chart */}
      <div className="relative mb-4 flex flex-1 min-h-37.5 w-full items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={85}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[12px] font-medium text-[#A3A3A3]">Total Shipment</span>
          <span className="text-[28px] font-bold text-[#333333]">{shipmentTypeData.total}</span>
        </div>
      </div>

      {/* Legends */}
      <div className="grid grid-cols-2 gap-y-5">
        {shipmentTypeData.breakdown.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold", item.bgColor, item.textColor)}>
              {item.percentage}
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#333333]">{item.label}</span>
              <span className="text-[11px] text-[#A3A3A3]">{item.count} shipments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
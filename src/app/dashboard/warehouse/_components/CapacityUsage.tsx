"use client";

import React from 'react';
import { capacityUsageData } from '@/data/warehouse';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CapacityUsage({ className = '' }: { className?: string }) {

  const data = [
    { name: 'Loaded', value: capacityUsageData.loaded, color: '#856DF3' },
    { name: 'Empty', value: capacityUsageData.empty, color: '#FEFEFE' },
  ];

  return (
    <div className={`bg-[#333333] rounded-2xl p-5 flex flex-col w-full h-full text-white shadow-[0px_2px_4px_rgba(0,0,0,0.02)] overflow-hidden ${className}`}>
      <div className="flex justify-between items-start mb-2 shrink-0">
        <h2 className="text-[16px] font-semibold text-gray-100">Capacity Usage</h2>
        <button className="text-gray-400 hover:text-gray-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 min-h-0 relative flex items-center justify-center py-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              stroke="none"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              wrapperStyle={{ zIndex: 100 }}
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value, name) => [`${value} shelves`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[13px] text-gray-200 mb-1">Total Usage</span>
          <span className="text-[32px] leading-none font-bold text-white">{capacityUsageData.total}%</span>
        </div>
      </div>

      <div className="flex justify-between mt-2 px-2 shrink-0">
        <div className="flex flex-col">
          <div className="text-[13px] text-gray-200 mb-1">Loaded</div>
          <div className="text-[16px] font-bold text-white leading-none">{capacityUsageData.loaded} shelves</div>
        </div>
        <div className="flex flex-col">
          <div className="text-[13px] text-gray-200 mb-1">Empty</div>
          <div className="text-[16px] font-bold text-white leading-none">{capacityUsageData.empty} shelves</div>
        </div>
      </div>
    </div>
  );
}

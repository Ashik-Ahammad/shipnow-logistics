import React from 'react';

interface StatCardProps {
  title: string;
  data: {
    value: string | number;
    change: string;
  };
  unit?: string;
}

export default function StatCard({ title, data, unit }: StatCardProps) {
  const isPositive = data.change.startsWith('+');

  return (
    <div className="bg-white rounded-2xl p-3 md:px-5 md:py-4 flex flex-col justify-center shadow-[0px_1px_3px_rgba(0,0,0,0.02)] shrink-0 flex-1 min-h-0 w-full h-full border border-gray-100/50">
      <div className="text-[11px] md:text-[13px] text-[#757575] font-medium mb-1.5 leading-tight md:leading-normal max-w-15 md:max-w-none">{title}</div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mt-auto md:mt-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] md:text-[28px] font-bold text-[#1f2937] leading-none tracking-tight">{data.value}</span>
          {unit && <span className="hidden md:inline text-[12px] text-gray-400 font-medium">{unit}</span>}
        </div>
        <div className={`px-1.5 md:px-2.5 py-1 rounded-full text-[9px] md:text-[11px] font-bold flex items-center gap-1 leading-none self-start md:self-auto ${
          isPositive ? 'bg-[#E8F8F0] text-[#00C875]' : 'bg-red-50 text-red-500'
        }`}>
          {isPositive ? (
            <svg className="w-2 h-2 md:w-2.5 md:h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          ) : (
            <svg className="w-2 h-2 md:w-2.5 md:h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="7" x2="17" y2="17"></line>
              <polyline points="7 17 17 17 17 7"></polyline>
            </svg>
          )}
          {data.change}
        </div>
      </div>
    </div>
  );
}

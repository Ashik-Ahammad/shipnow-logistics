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
      <div className="text-[12px] text-[#757575] font-normal mb-1.5 leading-[1.3] max-w-15 md:max-w-none">{title}</div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mt-auto md:mt-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[24px] font-bold text-[#333333] leading-none tracking-tight">{data.value}</span>
          {unit && <span className="hidden md:inline text-[12px] text-gray-400 font-medium">{unit}</span>}
        </div>
        <div className={`px-1.5 md:px-2.5 py-1 rounded-sm text-[10px] font-semibold flex items-center gap-1 leading-[1.3] self-start md:self-auto ${
          isPositive ? 'bg-[#E8F8F0] text-[#007837]' : 'bg-red-50 text-red-500'
        }`}>
          {isPositive ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 shrink-0">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.28347 2.27903C9.40551 2.40107 9.40551 2.59893 9.28347 2.72097L5.53347 6.47097C5.41143 6.59301 5.21357 6.59301 5.09153 6.47097L3.75 5.12944L1.15847 7.72097C1.03643 7.84301 0.838568 7.84301 0.716529 7.72097C0.59449 7.59893 0.59449 7.40107 0.716529 7.27903L3.52903 4.46653C3.65107 4.34449 3.84893 4.34449 3.97097 4.46653L5.3125 5.80806L8.84153 2.27903C8.96357 2.15699 9.16143 2.15699 9.28347 2.27903Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M6.25 2.5C6.25 2.32741 6.38991 2.1875 6.5625 2.1875H9.0625C9.23509 2.1875 9.375 2.32741 9.375 2.5V5C9.375 5.17259 9.23509 5.3125 9.0625 5.3125C8.88991 5.3125 8.75 5.17259 8.75 5V2.8125H6.5625C6.38991 2.8125 6.25 2.67259 6.25 2.5Z" fill="currentColor"/>
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

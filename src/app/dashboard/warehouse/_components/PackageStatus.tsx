"use client";

import React, { useState } from 'react';
import { packageStatus } from '@/data/warehouse';
import { PackageBoxIcon } from '@/components/icons/WarehouseIcons';

const tabs = ['All', 'Expected', 'Received', 'Sent'];

export default function PackageStatus({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredData = packageStatus.filter(pkg => 
    activeTab === 'All' ? true : pkg.status === activeTab
  );

  return (
    <div className={`bg-white rounded-2xl p-6 flex flex-col w-full shadow-[0px_2px_4px_rgba(0,0,0,0.02)] ${className}`}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-[16px] font-semibold text-[#333333] leading-[1.2]">Package Status</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      <div className="flex bg-[#F0F0F0] rounded-[8px] mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 h-[34px] rounded-[8px] text-[12px] font-semibold transition-colors flex items-center justify-center ${
              activeTab === tab
                ? 'bg-[#333333] text-white shadow-sm'
                : 'text-[#757575] hover:text-[#333333] hover:bg-white/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredData.map(pkg => (
          <div key={pkg.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E3DDFF] flex items-center justify-center text-[#856DF3] shrink-0">
                <PackageBoxIcon className="w-[22px] h-[22px] text-[#856DF3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#333333] leading-[1.3]">{pkg.id}</span>
                <span className="text-[11px] font-normal text-[#757575] leading-[1.3] mt-0.5">{pkg.date}</span>
              </div>
            </div>
            
            <div className={`h-[14px] px-1.5 rounded-[4px] text-[11px] font-semibold leading-[14px] tracking-normal inline-flex items-center justify-center ${
              pkg.status === 'Sent' ? 'bg-[#E3DDFF] text-[#856DF3]' :
              pkg.status === 'Received' ? 'bg-[#E8F5E9] text-[#007837]' :
              'bg-gray-100 text-gray-600'
            }`}>
              {pkg.status}
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-400">No packages found for this status.</div>
        )}
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import { activityLog } from '@/data/warehouse';
import { ActivityCheckIcon, ActivityAddIcon, ActivityVanIcon, ActivityDocumentIcon } from '@/components/icons/WarehouseIcons';

export default function ActivityLog() {
  const getIcon = (type: string) => {
    switch(type) {
      case 'check': return <ActivityCheckIcon className="w-5 h-5 text-white" />;
      case 'add': return <ActivityAddIcon className="w-5 h-5 text-white" />;
      case 'truck': return <ActivityVanIcon className="w-5 h-5 text-white" />;
      case 'document': return <ActivityDocumentIcon className="w-5 h-5 text-white" />;
      default: return <ActivityCheckIcon className="w-5 h-5 text-white" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
      case 'check': return 'bg-[#333333]';
      case 'add': return 'bg-[#856DF3]';
      case 'truck': return 'bg-[#333333]';
      case 'document': return 'bg-[#856DF3]';
      default: return 'bg-[#333333]';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col w-full h-full shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-start mb-6 shrink-0">
        <h2 className="text-[16px] font-semibold text-[#333333] leading-[1.2]">Warehouse Activity Log</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col flex-1">
        {activityLog.map((log, index) => (
          <div key={log.id} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBgColor(log.iconType)}`}>
              {getIcon(log.iconType)}
            </div>
            
            <div className={`flex flex-col flex-1 pb-5 ${index !== activityLog.length - 1 ? 'border-b border-gray-100 mb-5' : ''}`}>
              <p className="text-[12px] font-normal text-[#333333] leading-[1.3]">
                <span className="font-semibold text-[#856DF3] mr-1 cursor-pointer">{log.user}</span>
                {log.action}
              </p>
              <span className="text-[10px] font-normal text-[#757575] leading-[1.3] mt-1">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

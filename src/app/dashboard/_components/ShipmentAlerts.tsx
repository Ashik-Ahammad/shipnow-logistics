"use client";

import { MoreHorizontal, FileText, MapPin, CloudRain, LucideIcon } from "lucide-react";
import { shipmentAlertsData } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  FileText: FileText,
  MapPin: MapPin,
  CloudRain: CloudRain,
};

export default function ShipmentAlerts() {
  return (
    <div className="flex h-110.75 flex-col rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#333333]">Shipment Alerts</h2>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-[28px] font-bold text-[#333333]">{shipmentAlertsData.totalDelays}</span>
        <span className="text-[14px] text-[#757575]">Delays Detected</span>
      </div>

      <div className="mb-4 flex gap-3">
        {shipmentAlertsData.summary.map((summaryItem, index) => (
          <div key={index} className={cn("flex flex-1 flex-col items-center justify-center rounded-xl py-3 text-center", summaryItem.bgColor)}>
            <span className="text-[20px] font-bold text-[#333333]">{summaryItem.count}</span>
            <span className="whitespace-pre-line text-[11px] font-medium leading-tight text-[#757575]">
              {summaryItem.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        {shipmentAlertsData.list.map((item, index) => {
          const Icon = iconMap[item.icon];
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                  {Icon && <Icon className="h-4 w-4 text-[#757575]" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#333333]">{item.title}</span>
                  <div className="flex items-center gap-1 text-[11px] text-[#A3A3A3]">
                    <span className="font-semibold text-[#856DF3]">{item.id}</span>
                    <span>• {item.type} • {item.date}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#333333]">↗</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
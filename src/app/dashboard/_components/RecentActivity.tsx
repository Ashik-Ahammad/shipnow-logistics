"use client";

import { MoreHorizontal, FileText, Tag, RefreshCcw, CheckCircle2, LucideIcon } from "lucide-react";
import { recentActivityData } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  FileText: FileText,
  Tag: Tag,
  RefreshCcw: RefreshCcw,
  CheckCircle2: CheckCircle2,
};

export default function RecentActivity() {
  return (
    <div className="flex h-full flex-col rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-[#333333]">Recent Activity</h2>
        <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#F9FAFB] text-[#757575] hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col">
        {recentActivityData.map((activity, index) => {
          const Icon = iconMap[activity.icon];

          return (
            <div key={activity.id} className={cn("relative flex gap-4", activity.hasLine ? "pb-6" : "")}>
              {activity.hasLine && (
                <div className="absolute left-4.75 top-10 h-[calc(100%-40px)] w-0.5 bg-gray-100"></div>
              )}
              
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", activity.iconBg)}>
                {Icon && <Icon className={cn("h-4 w-4", activity.iconColor)} />}
              </div>
              
              <div className="flex flex-col gap-1 pt-2">
                <p className="text-[13px] leading-relaxed text-[#333333]">
                  {activity.user.startsWith("@Support") || activity.user.startsWith("@Admin") ? (
                    <>
                      {activity.user.startsWith("@Support") ? "Customer Support " : "Administrator "}
                    </>
                  ) : (
                    "User "
                  )}
                  <span className="font-semibold text-[#856DF3]">{activity.user}</span> {activity.action}
                </p>
                <span className="text-[11px] font-medium text-[#A3A3A3]">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { ViewMode } from "./ShipmentsClient";

interface ShipmentsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  viewMode: ViewMode;
  onViewChange: (view: ViewMode) => void;
  freightFilter: string;
  setFreightFilter: (freight: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
}

const tabs = ["All", "Completed", "Delivery", "Pending"];
const freightOptions = ["All", "Air Freight", "Road Freight", "Ocean Freight", "Rail Freight"];
const dateOptions = ["All Time", "This Week", "This Month", "Last Month"];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default function ShipmentsToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  viewMode,
  onViewChange,
  freightFilter,
  setFreightFilter,
  dateFilter,
  setDateFilter,
}: ShipmentsToolbarProps) {
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const [isDateOpen, setIsDateOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);
  useClickOutside(dateRef, () => setIsDateOpen(false));

  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 p-5 bg-white desktop:flex-row desktop:items-center desktop:justify-between">
      {/* Tabs */}
      <div className="flex items-center rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={cn(
              "whitespace-nowrap rounded-lg px-5 py-2 text-[14px] font-medium transition-colors cursor-pointer",
              statusFilter === tab
                ? "bg-[#232323] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-full desktop:w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z" fill="#333333"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z" fill="black" fillOpacity="0.2"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z" fill="#333333"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z" fill="black" fillOpacity="0.2"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search id, company, etc"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-100 bg-gray-50/50 py-2.5 pl-9 pr-4 text-[14px] text-gray-900 outline-none transition-all focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3]"
          />
        </div>

        {/* Combined Filter and Date Dropdowns */}
        <div className="flex items-center rounded-lg border border-gray-100 bg-gray-50/50 h-10.5">
          {/* Filter Dropdown */}
          <div className="relative h-full flex" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className="flex h-full items-center justify-center gap-2 rounded-l-lg px-4 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4125 3.09563C14.3355 2.91782 14.208 2.76656 14.0458 2.66066C13.8835 2.55476 13.6937 2.49889 13.5 2.5H2.49998C2.30644 2.50038 2.11717 2.55692 1.95512 2.66276C1.79308 2.76859 1.66523 2.91917 1.58709 3.09624C1.50894 3.27331 1.48386 3.46925 1.51488 3.66029C1.54591 3.85133 1.6317 4.02926 1.76186 4.1725L1.76686 4.17813L5.99998 8.69813V13.5C5.99994 13.681 6.04902 13.8586 6.14198 14.0139C6.23494 14.1692 6.36831 14.2963 6.52785 14.3818C6.68739 14.4672 6.86714 14.5078 7.04792 14.4991C7.22869 14.4904 7.40373 14.4328 7.55436 14.3325L9.55436 12.9988C9.69146 12.9074 9.80388 12.7836 9.88162 12.6384C9.95936 12.4932 10 12.331 9.99998 12.1663V8.69813L14.2337 4.17813L14.2387 4.1725C14.3703 4.02991 14.4569 3.85174 14.4878 3.66023C14.5187 3.46872 14.4925 3.27235 14.4125 3.09563ZM9.13623 8.16125C9.04974 8.25295 9.00107 8.37395 8.99998 8.5V12.1663L6.99998 13.5V8.5C7.00002 8.37304 6.95176 8.25081 6.86498 8.15813L2.49998 3.5H13.5L9.13623 8.16125Z" fill="#333333"/>
                <path d="M14.4125 3.09563C14.3355 2.91782 14.208 2.76656 14.0458 2.66066C13.8835 2.55476 13.6937 2.49889 13.5 2.5H2.49998C2.30644 2.50038 2.11717 2.55692 1.95512 2.66276C1.79308 2.76859 1.66523 2.91917 1.58709 3.09624C1.50894 3.27331 1.48386 3.46925 1.51488 3.66029C1.54591 3.85133 1.6317 4.02926 1.76186 4.1725L1.76686 4.17813L5.99998 8.69813V13.5C5.99994 13.681 6.04902 13.8586 6.14198 14.0139C6.23494 14.1692 6.36831 14.2963 6.52785 14.3818C6.68739 14.4672 6.86714 14.5078 7.04792 14.4991C7.22869 14.4904 7.40373 14.4328 7.55436 14.3325L9.55436 12.9988C9.69146 12.9074 9.80388 12.7836 9.88162 12.6384C9.95936 12.4932 10 12.331 9.99998 12.1663V8.69813L14.2337 4.17813L14.2387 4.1725C14.3703 4.02991 14.4569 3.85174 14.4878 3.66023C14.5187 3.46872 14.4925 3.27235 14.4125 3.09563ZM9.13623 8.16125C9.04974 8.25295 9.00107 8.37395 8.99998 8.5V12.1663L6.99998 13.5V8.5C7.00002 8.37304 6.95176 8.25081 6.86498 8.15813L2.49998 3.5H13.5L9.13623 8.16125Z" fill="black" fillOpacity="0.2"/>
              </svg>
              <span className="hidden tablet:inline">
                Filter {freightFilter !== "All" && <span className="ml-1 rounded bg-gray-200 px-1.5 py-0.5 text-[11px] font-bold text-gray-700">{freightFilter.split(" ")[0]}</span>}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("ml-1 transition-transform", isFilterOpen && "rotate-180")}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 top-11.5 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg z-10">
                <div className="mb-2 px-2 pt-1 pb-2 text-[11px] font-semibold text-gray-400 border-b border-gray-50">FREIGHT TYPE</div>
                {freightOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setFreightFilter(opt); setIsFilterOpen(false); }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-[13px] transition-colors",
                      freightFilter === opt ? "bg-[#856DF3]/10 text-[#856DF3] font-medium" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-5.5 w-px bg-gray-200 shrink-0"></div>

          {/* Date Range Dropdown */}
          <div className="relative h-full flex" ref={dateRef}>
            <button 
              onClick={() => setIsDateOpen(!isDateOpen)} 
              className="flex h-full items-center justify-center gap-2 rounded-r-lg px-4 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-100 cursor-pointer"
            >
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2V12H11V2H1ZM12 12C12 12.5523 11.5523 13 11 13H1C0.447715 13 0 12.5523 0 12V2C0 1.44772 0.447715 1 1 1H11C11.5523 1 12 1.44772 12 2V12Z" fill="#333333"/>
                <path d="M1 2V12H11V2H1ZM12 12C12 12.5523 11.5523 13 11 13H1C0.447715 13 0 12.5523 0 12V2C0 1.44772 0.447715 1 1 1H11C11.5523 1 12 1.44772 12 2V12Z" fill="black" fillOpacity="0.2"/>
                <path d="M8.5 2.5V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V2.5C9.5 2.77614 9.27614 3 9 3C8.72386 3 8.5 2.77614 8.5 2.5Z" fill="#333333"/>
                <path d="M8.5 2.5V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V2.5C9.5 2.77614 9.27614 3 9 3C8.72386 3 8.5 2.77614 8.5 2.5Z" fill="black" fillOpacity="0.2"/>
                <path d="M2.5 2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V2.5C3.5 2.77614 3.27614 3 3 3C2.72386 3 2.5 2.77614 2.5 2.5Z" fill="#333333"/>
                <path d="M2.5 2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V2.5C3.5 2.77614 3.27614 3 3 3C2.72386 3 2.5 2.77614 2.5 2.5Z" fill="black" fillOpacity="0.2"/>
                <path d="M11.5 4C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H11.5Z" fill="#333333"/>
                <path d="M11.5 4C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H0.5C0.223858 5 0 4.77614 0 4.5C0 4.22386 0.223858 4 0.5 4H11.5Z" fill="black" fillOpacity="0.2"/>
                <path d="M6 8C6.41421 8 6.75 7.66421 6.75 7.25C6.75 6.83579 6.41421 6.5 6 6.5C5.58579 6.5 5.25 6.83579 5.25 7.25C5.25 7.66421 5.58579 8 6 8Z" fill="#333333"/>
                <path d="M6 8C6.41421 8 6.75 7.66421 6.75 7.25C6.75 6.83579 6.41421 6.5 6 6.5C5.58579 6.5 5.25 6.83579 5.25 7.25C5.25 7.66421 5.58579 8 6 8Z" fill="black" fillOpacity="0.2"/>
                <path d="M8.75 8C9.16421 8 9.5 7.66421 9.5 7.25C9.5 6.83579 9.16421 6.5 8.75 6.5C8.33579 6.5 8 6.83579 8 7.25C8 7.66421 8.33579 8 8.75 8Z" fill="#333333"/>
                <path d="M8.75 8C9.16421 8 9.5 7.66421 9.5 7.25C9.5 6.83579 9.16421 6.5 8.75 6.5C8.33579 6.5 8 6.83579 8 7.25C8 7.66421 8.33579 8 8.75 8Z" fill="black" fillOpacity="0.2"/>
                <path d="M3.25 10.5C3.66421 10.5 4 10.1642 4 9.75C4 9.33579 3.66421 9 3.25 9C2.83579 9 2.5 9.33579 2.5 9.75C2.5 10.1642 2.83579 10.5 3.25 10.5Z" fill="#333333"/>
                <path d="M3.25 10.5C3.66421 10.5 4 10.1642 4 9.75C4 9.33579 3.66421 9 3.25 9C2.83579 9 2.5 9.33579 2.5 9.75C2.5 10.1642 2.83579 10.5 3.25 10.5Z" fill="black" fillOpacity="0.2"/>
                <path d="M6 10.5C6.41421 10.5 6.75 10.1642 6.75 9.75C6.75 9.33579 6.41421 9 6 9C5.58579 9 5.25 9.33579 5.25 9.75C5.25 10.1642 5.58579 10.5 6 10.5Z" fill="#333333"/>
                <path d="M6 10.5C6.41421 10.5 6.75 10.1642 6.75 9.75C6.75 9.33579 6.41421 9 6 9C5.58579 9 5.25 9.33579 5.25 9.75C5.25 10.1642 5.58579 10.5 6 10.5Z" fill="black" fillOpacity="0.2"/>
                <path d="M8.75 10.5C9.16421 10.5 9.5 10.1642 9.5 9.75C9.5 9.33579 9.16421 9 8.75 9C8.33579 9 8 9.33579 8 9.75C8 10.1642 8.33579 10.5 8.75 10.5Z" fill="#333333"/>
                <path d="M8.75 10.5C9.16421 10.5 9.5 10.1642 9.5 9.75C9.5 9.33579 9.16421 9 8.75 9C8.33579 9 8 9.33579 8 9.75C8 10.1642 8.33579 10.5 8.75 10.5Z" fill="black" fillOpacity="0.2"/>
              </svg>
              <span className="hidden tablet:inline">{dateFilter}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("ml-1 transition-transform", isDateOpen && "rotate-180")}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            {isDateOpen && (
              <div className="absolute right-0 top-11.5 w-40 rounded-xl border border-gray-100 bg-white p-2 shadow-lg z-10">
                {dateOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setDateFilter(opt); setIsDateOpen(false); }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-[13px] transition-colors",
                      dateFilter === opt ? "bg-[#856DF3]/10 text-[#856DF3] font-medium" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center rounded-lg border border-gray-100 bg-gray-50/50 p-1 ml-2">
          <button
            onClick={() => onViewChange("table")}
            className={cn(
              "flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer",
              viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
            aria-label="Table View"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "flex items-center justify-center rounded-md p-1.5 transition-colors cursor-pointer",
              viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
            aria-label="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, MoreHorizontal, ChevronsUpDown, Check } from "lucide-react";
import { recentShipmentsData, RecentShipmentItem } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "In Transit": "bg-[#F3F4F6] text-[#757575]",
  "Out for Delivery": "bg-[#F0EFFF] text-[#856DF3]",
  "Delivered": "bg-[#E6F8EF] text-[#22C55E]",
  "Processing": "bg-[#EBF3FF] text-[#3B82F6]",
};

type SortKey = keyof RecentShipmentItem | "";

export default function RecentShipments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Filter and Sort Data
  const filteredAndSortedData = useMemo(() => {
    let data = [...recentShipmentsData];

    // Filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter((item) => 
        item.id.toLowerCase().includes(lowerSearch) ||
        item.companyName.toLowerCase().includes(lowerSearch) ||
        item.carrier.toLowerCase().includes(lowerSearch) ||
        item.route.toLowerCase().includes(lowerSearch) ||
        item.status.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    if (sortKey) {
      data.sort((a, b) => {
        const valA = String(a[sortKey as keyof RecentShipmentItem]).toLowerCase();
        const valB = String(b[sortKey as keyof RecentShipmentItem]).toLowerCase();
        
        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchTerm, sortKey, sortDirection]);

  // Handlers
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const toggleAllRows = () => {
    if (selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredAndSortedData.map(item => item.id)));
    }
  };

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const allSelected = filteredAndSortedData.length > 0 && selectedRows.size === filteredAndSortedData.length;

  return (
    <div className="flex h-full flex-col rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-6 flex flex-col gap-4 desktop:flex-row desktop:items-center desktop:justify-between">
        <h2 className="text-[18px] font-bold text-[#333333]">Recent Shipments</h2>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex h-10 w-full desktop:w-60 items-center rounded-lg bg-[#F9FAFB] px-3">
            <Search className="h-4 w-4 text-[#A3A3A3]" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search shipment" 
              className="h-full w-full bg-transparent pl-2 text-[13px] outline-none placeholder:text-[#A3A3A3] text-[#333333]"
            />
          </div>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB] text-[#757575] hover:bg-gray-100 transition-colors">
            <SlidersHorizontal className="h-4.5 w-4.5" />
          </button>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB] text-[#757575] hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-200 text-left text-[13px]">
          <thead>
            <tr className="h-11 bg-[#EAE6F8] text-[#757575]">
              <th className="w-13 rounded-l-lg pl-5.5 font-medium">
                <button 
                  onClick={toggleAllRows}
                  className={cn(
                    "flex h-4.5 w-4.5 items-center justify-center rounded-sm border-[1.5px] transition-colors focus:outline-none",
                    allSelected 
                      ? "border-[#856DF3] bg-[#856DF3]" 
                      : "border-[#E5E7EB] bg-white/60 hover:border-gray-400"
                  )}
                >
                  {allSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </button>
              </th>
              <th className="font-medium">
                <button 
                  onClick={() => handleSort("id")}
                  className="flex items-center gap-1.5 hover:text-[#333333] transition-colors focus:outline-none"
                >
                  Shipping ID <ChevronsUpDown className={cn("h-3 w-3", sortKey === "id" && "text-[#333333]")} />
                </button>
              </th>
              <th className="font-medium">
                <button 
                  onClick={() => handleSort("companyName")}
                  className="flex items-center gap-1.5 hover:text-[#333333] transition-colors focus:outline-none"
                >
                  Company <ChevronsUpDown className={cn("h-3 w-3", sortKey === "companyName" && "text-[#333333]")} />
                </button>
              </th>
              <th className="font-medium">
                <button 
                  onClick={() => handleSort("carrier")}
                  className="flex items-center gap-1.5 hover:text-[#333333] transition-colors focus:outline-none"
                >
                  Carriers <ChevronsUpDown className={cn("h-3 w-3", sortKey === "carrier" && "text-[#333333]")} />
                </button>
              </th>
              <th className="font-medium">
                <button 
                  onClick={() => handleSort("route")}
                  className="flex items-center gap-1.5 hover:text-[#333333] transition-colors focus:outline-none"
                >
                  Route <ChevronsUpDown className={cn("h-3 w-3", sortKey === "route" && "text-[#333333]")} />
                </button>
              </th>
              <th className="font-medium">
                <button 
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1.5 hover:text-[#333333] transition-colors focus:outline-none"
                >
                  Shipping Date <ChevronsUpDown className={cn("h-3 w-3", sortKey === "date" && "text-[#333333]")} />
                </button>
              </th>
              <th className="rounded-r-lg pr-5.5 font-medium">
                <button 
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1.5 hover:text-[#333333] transition-colors focus:outline-none"
                >
                  Status <ChevronsUpDown className={cn("h-3 w-3", sortKey === "status" && "text-[#333333]")} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((shipment, index) => {
                const isSelected = selectedRows.has(shipment.id);
                return (
                  <tr 
                    key={shipment.id} 
                    className={cn(
                      "border-b border-gray-100 transition-colors", 
                      isSelected ? "bg-[#856DF3]/5 hover:bg-[#856DF3]/10" : "hover:bg-gray-50/50",
                      index === filteredAndSortedData.length - 1 ? "border-0" : ""
                    )}
                  >
                    <td className="py-4 pl-5.5">
                      <button 
                        onClick={() => toggleRow(shipment.id)}
                        className={cn(
                          "flex h-4.5 w-4.5 items-center justify-center rounded-sm border-[1.5px] transition-colors focus:outline-none",
                          isSelected 
                            ? "border-[#856DF3] bg-[#856DF3]" 
                            : "border-[#E5E7EB] bg-white hover:border-gray-400"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </button>
                    </td>
                    <td className="py-4 font-semibold text-[#856DF3]">{shipment.id}</td>
                    <td className="py-4">
                      <div className="font-semibold text-[#333333]">{shipment.companyName}</div>
                      <div className="mt-0.5 text-[12px] text-[#A3A3A3]">{shipment.companyIndustry}</div>
                    </td>
                    <td className="py-4 font-medium text-[#757575]">{shipment.carrier}</td>
                    <td className="py-4 font-medium text-[#757575]">{shipment.route}</td>
                    <td className="py-4 font-medium text-[#757575]">{shipment.date}</td>
                    <td className="py-4 pr-5.5">
                      <span className={cn(
                        "inline-flex items-center justify-center rounded-full px-3 py-1.25 text-[11px] font-bold", 
                        statusStyles[shipment.status]
                      )}>
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[14px] text-[#757575]">
                  No shipments found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
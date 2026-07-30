"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ChevronsUpDown, Check } from "lucide-react";
import { recentShipmentsData, RecentShipmentItem } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "In Transit": "bg-[#E0E0E0] text-[#333333]",
  "Out for Delivery": "bg-[#E3DDFF] text-[#856DF3]",
  "Delivered": "bg-[#D9F9E7] text-[#007837]",
  "Processing": "bg-[#E3EDFF] text-[#3B82F6]",
};

type SortKey = keyof RecentShipmentItem | "";

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

export default function RecentShipments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsMenuOpen(false));

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

    if (statusFilter !== "All") {
      data = data.filter((item) => item.status === statusFilter);
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
  }, [searchTerm, sortKey, sortDirection, statusFilter]);

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
          <div className="relative flex h-10 w-full desktop:w-60 items-center rounded-lg bg-[#F0F0F0] px-3">
            <Search className="h-4 w-4 text-[#333333]" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search shipment" 
              className="h-full w-full bg-transparent pl-2 text-[13px] outline-none placeholder:text-[#757575] text-[#333333]"
            />
          </div>
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors cursor-pointer",
                isFilterOpen || statusFilter !== "All" ? "bg-gray-200 shadow-sm text-[#333333]" : "bg-[#F0F0F0] text-[#333333] hover:bg-gray-200"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.96429C12 6.70787 11.7761 6.5 11.5 6.5C11.2239 6.5 11 6.70787 11 6.96429V11.7929L9.35355 10.1464C9.15829 9.95118 8.84171 9.95118 8.64645 10.1464C8.45118 10.3417 8.45118 10.6583 8.64645 10.8536L11.1464 13.3536C11.3417 13.5488 11.6583 13.5488 11.8536 13.3536L14.3536 10.8536C14.5488 10.6583 14.5488 10.3417 14.3536 10.1464C14.1583 9.95118 13.8417 9.95118 13.6464 10.1464L12 11.7929V6.96429Z" fill="currentColor"/>
                <path d="M12 6.96429C12 6.70787 11.7761 6.5 11.5 6.5C11.2239 6.5 11 6.70787 11 6.96429V11.7929L9.35355 10.1464C9.15829 9.95118 8.84171 9.95118 8.64645 10.1464C8.45118 10.3417 8.45118 10.6583 8.64645 10.8536L11.1464 13.3536C11.3417 13.5488 11.6583 13.5488 11.8536 13.3536L14.3536 10.8536C14.5488 10.6583 14.5488 10.3417 14.3536 10.1464C14.1583 9.95118 13.8417 9.95118 13.6464 10.1464L12 11.7929V6.96429Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M2.5 4C2.5 3.72386 2.72386 3.5 3 3.5H11.5C11.7761 3.5 12 3.72386 12 4C12 4.27614 11.7761 4.5 11.5 4.5H3C2.72386 4.5 2.5 4.27614 2.5 4Z" fill="currentColor"/>
                <path d="M2.5 4C2.5 3.72386 2.72386 3.5 3 3.5H11.5C11.7761 3.5 12 3.72386 12 4C12 4.27614 11.7761 4.5 11.5 4.5H3C2.72386 4.5 2.5 4.27614 2.5 4Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M2.5 8C2.5 7.72386 2.72386 7.5 3 7.5H7.5C7.77614 7.5 8 7.72386 8 8C8 8.27614 7.77614 8.5 7.5 8.5H3C2.72386 8.5 2.5 8.27614 2.5 8Z" fill="currentColor"/>
                <path d="M2.5 8C2.5 7.72386 2.72386 7.5 3 7.5H7.5C7.77614 7.5 8 7.72386 8 8C8 8.27614 7.77614 8.5 7.5 8.5H3C2.72386 8.5 2.5 8.27614 2.5 8Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M3 11.5C2.72386 11.5 2.5 11.7239 2.5 12C2.5 12.2761 2.72386 12.5 3 12.5H6.5C6.77614 12.5 7 12.2761 7 12C7 11.7239 6.77614 11.5 6.5 11.5H3Z" fill="currentColor"/>
                <path d="M3 11.5C2.72386 11.5 2.5 11.7239 2.5 12C2.5 12.2761 2.72386 12.5 3 12.5H6.5C6.77614 12.5 7 12.2761 7 12C7 11.7239 6.77614 11.5 6.5 11.5H3Z" fill="currentColor" fillOpacity="0.2"/>
              </svg>
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 top-[44px] w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg z-10 text-[13px]">
                <div className="mb-2 px-2 pt-1 pb-2 text-[11px] font-semibold text-gray-400 border-b border-gray-50">STATUS</div>
                {["All", "In Transit", "Out for Delivery", "Delivered", "Processing"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setStatusFilter(opt); setIsFilterOpen(false); }}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left transition-colors",
                      statusFilter === opt ? "bg-[#856DF3]/10 text-[#856DF3] font-medium" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors cursor-pointer",
                isMenuOpen ? "bg-gray-200 shadow-sm text-[#333333]" : "bg-[#F0F0F0] text-[#333333] hover:bg-gray-200"
              )}
            >
              <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="currentColor"/>
                <circle cx="7" cy="2" r="2" fill="currentColor"/>
                <circle cx="12" cy="2" r="2" fill="currentColor"/>
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-[44px] w-40 rounded-xl border border-gray-100 bg-white p-2 shadow-lg z-10 text-[13px]">
                <button onClick={() => setIsMenuOpen(false)} className="w-full rounded-md px-3 py-2 text-left text-gray-600 hover:bg-gray-50 transition-colors">Export to CSV</button>
                <button onClick={() => setIsMenuOpen(false)} className="w-full rounded-md px-3 py-2 text-left text-gray-600 hover:bg-gray-50 transition-colors">Print Table</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-200 text-left text-[13px]">
          <thead>
            <tr className="h-11 bg-[#E3DDFF] text-[#757575]">
              <th className="w-13 rounded-l-lg pl-5.5 font-medium">
                <button 
                  onClick={toggleAllRows}
                  className={cn(
                    "flex h-4.5 w-4.5 items-center justify-center rounded-md border-transparent transition-colors focus:outline-none",
                    allSelected 
                      ? "bg-[#856DF3]" 
                      : "bg-[#F0F0F0] hover:bg-[#E0E0E0]"
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
                          "flex h-4.5 w-4.5 items-center justify-center rounded-md border-transparent transition-colors focus:outline-none",
                          isSelected 
                            ? "bg-[#856DF3]" 
                            : "bg-[#F0F0F0] hover:bg-[#E0E0E0]"
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
                    <td className="py-4 font-medium text-[#333333]">{shipment.carrier}</td>
                    <td className="py-4 font-medium text-[#333333]">{shipment.route}</td>
                    <td className="py-4 font-medium text-[#333333]">{shipment.date}</td>
                    <td className="py-4 pr-5.5">
                      <span className={cn(
                        "inline-flex items-center justify-center rounded-full h-5 px-2 text-[10px] font-semibold", 
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
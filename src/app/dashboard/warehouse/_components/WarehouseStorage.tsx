"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { warehouseStorage } from '@/data/warehouse';

type SortKey = 'floor' | 'section' | 'category' | 'percentage' | 'available';
type SortOrder = 'asc' | 'desc';

export default function WarehouseStorage() {
  const [sortKey, setSortKey] = useState<SortKey>('section');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const [filterFloor, setFilterFloor] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const processedData = useMemo(() => {
    let result = [...warehouseStorage];

    if (filterFloor !== null) {
      result = result.filter(item => item.floor === filterFloor);
    }

    result.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Initially show exactly 5 items to match Figma design perfectly.
    // If a floor is filtered, show all matching data.
    return filterFloor === null ? result.slice(0, 5) : result;
  }, [sortKey, sortOrder, filterFloor]);

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col w-full shadow-[0px_2px_4px_rgba(0,0,0,0.02)] h-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-[15px] font-semibold text-gray-800">Warehouse Storage</h2>
        <div className="flex items-center gap-3 text-sm">
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              {filterFloor !== null ? `Floor ${filterFloor}` : 'Filter'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 text-gray-400">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
                <button onClick={() => { setFilterFloor(null); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All Floors</button>
                <button onClick={() => { setFilterFloor(1); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Floor 1</button>
                <button onClick={() => { setFilterFloor(2); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Floor 2</button>
                <button onClick={() => { setFilterFloor(3); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Floor 3</button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-500 relative" ref={sortRef}>
            <span>Sort by:</span>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors capitalize"
            >
              {sortKey}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
                {['floor', 'section', 'category', 'percentage', 'available'].map((key) => (
                  <button 
                    key={key}
                    onClick={() => { handleSort(key as SortKey); setIsSortOpen(false); }} 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                  >
                    {key}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-150">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              <th className="pb-3 pl-4 pr-2 font-medium w-16">
                <div onClick={() => handleSort('floor')} className="flex items-center gap-1 cursor-pointer select-none">Floor <SortIcon active={sortKey === 'floor'} order={sortOrder} /></div>
              </th>
              <th className="pb-3 px-4 font-medium w-32">
                <div onClick={() => handleSort('section')} className="flex items-center gap-1 cursor-pointer select-none">Section <SortIcon active={sortKey === 'section'} order={sortOrder} /></div>
              </th>
              <th className="pb-3 px-4 font-medium w-40">
                <div onClick={() => handleSort('category')} className="flex items-center gap-1 cursor-pointer select-none">Category <SortIcon active={sortKey === 'category'} order={sortOrder} /></div>
              </th>
              <th className="pb-3 px-4 font-medium w-48">
                <div className="flex items-center gap-1 select-none">Storage Used</div>
              </th>
              <th className="pb-3 px-4 font-medium w-24 text-center">
                <div onClick={() => handleSort('percentage')} className="flex items-center justify-center gap-1 cursor-pointer select-none">Percentage <SortIcon active={sortKey === 'percentage'} order={sortOrder} /></div>
              </th>
              <th className="pb-3 pl-4 pr-4 font-medium w-32 text-right">
                <div onClick={() => handleSort('available')} className="flex items-center justify-end gap-1 cursor-pointer select-none">Available Space <SortIcon active={sortKey === 'available'} order={sortOrder} /></div>
              </th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-gray-700">
            {processedData.map((row, idx) => (
              <tr key={row.id} className={`${idx !== processedData.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <td className="py-4 pl-4 pr-2 font-medium">{row.floor}</td>
                <td className="py-4 px-4">{row.section}</td>
                <td className="py-4 px-4 text-gray-500">{row.category}</td>
                <td className="py-4 px-4">
                  <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#856DF3] rounded-full" style={{ width: `${row.percentage}%` }} />
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-semibold">{row.percentage}%</td>
                <td className="py-4 pl-4 pr-4 text-right">
                  <span className="font-semibold text-gray-900">{row.available}</span>
                  <span className="text-gray-400">/{row.total}</span>
                </td>
              </tr>
            ))}
            {processedData.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">No data available for the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortIcon({ active, order }: { active?: boolean, order?: 'asc' | 'desc' }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${active ? 'text-[#856DF3]' : 'text-gray-300'}`}>
      <path d="M7 15l5 5 5-5" className={active && order === 'asc' ? 'opacity-30' : ''} />
      <path d="M7 9l5-5 5 5" className={active && order === 'desc' ? 'opacity-30' : ''} />
    </svg>
  );
}

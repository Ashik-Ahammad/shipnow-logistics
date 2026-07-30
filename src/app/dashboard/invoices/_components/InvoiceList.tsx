import React, { useState, useRef, useEffect } from 'react';
import { Invoice, invoiceList } from '@/data/invoices';
import { CompanyLogos } from '@/data/companyLogos';

interface InvoiceListProps {
  selectedId: string;
  onSelect: (id: string) => void;
  globalSearch?: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Paid':
      return <span className="px-3 py-1 rounded-full bg-[#E8F8F0] text-[#00C875] text-[11px] font-bold">Paid</span>;
    case 'Unpaid':
      return <span className="px-3 py-1 rounded-full bg-[#F3F0FF] text-[#856DF3] text-[11px] font-bold">Unpaid</span>;
    case 'Overdue':
      return <span className="px-3 py-1 rounded-full bg-[#F3F4F6] text-[#4B5563] text-[11px] font-bold">Overdue</span>;
    default:
      return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold">{status}</span>;
  }
};

export default function InvoiceList({ selectedId, onSelect, globalSearch = '' }: InvoiceListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const filteredInvoices = invoiceList.filter((inv) => {
    const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGlobal = inv.id.toLowerCase().includes(globalSearch.toLowerCase()) || 
                          inv.companyName.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesFilter = statusFilter ? inv.status === statusFilter : true;
    return matchesSearch && matchesGlobal && matchesFilter;
  });

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <h2 className="text-[18px] font-bold text-[#1f2937]">Invoices</h2>
        
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden md:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search invoices" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#F9FAFB] rounded-xl text-[13px] border-none focus:ring-0 w-[240px] placeholder:text-gray-400 text-gray-700"
            />
          </div>
          {/* Mobile Search Button */}
          <button className="md:hidden w-10 h-10 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-gray-500 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`w-10 h-10 md:w-9 md:h-9 rounded-xl flex items-center justify-center transition-colors ${statusFilter || isFilterOpen ? 'bg-gray-200 text-gray-900' : 'bg-[#F9FAFB] text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2C9 1.86739 9.05268 1.74021 9.14645 1.64645C9.24021 1.55268 9.36739 1.5 9.5 1.5H11.5C11.6326 1.5 11.7598 1.55268 11.8536 1.64645C11.9473 1.74021 12 1.86739 12 2C12 2.13261 11.9473 2.25979 11.8536 2.35355C11.7598 2.44732 11.6326 2.5 11.5 2.5H9.5C9.36739 2.5 9.24021 2.44732 9.14645 2.35355C9.05268 2.25979 9 2.13261 9 2ZM0.5 2.5H7V3.5C7 3.63261 7.05268 3.75979 7.14645 3.85355C7.24021 3.94732 7.36739 4 7.5 4C7.63261 4 7.75979 3.94732 7.85355 3.85355C7.94732 3.75979 8 3.63261 8 3.5V0.5C8 0.367392 7.94732 0.240215 7.85355 0.146447C7.75979 0.0526785 7.63261 0 7.5 0C7.36739 0 7.24021 0.0526785 7.14645 0.146447C7.05268 0.240215 7 0.367392 7 0.5V1.5H0.5C0.367392 1.5 0.240215 1.55268 0.146447 1.64645C0.0526785 1.74021 0 1.86739 0 2C0 2.13261 0.0526785 2.25979 0.146447 2.35355C0.240215 2.44732 0.367392 2.5 0.5 2.5ZM11.5 7.5H5.5C5.36739 7.5 5.24021 7.55268 5.14645 7.64645C5.05268 7.74021 5 7.86739 5 8C5 8.13261 5.05268 8.25979 5.14645 8.35355C5.24021 8.44732 5.36739 8.5 5.5 8.5H11.5C11.6326 8.5 11.7598 8.44732 11.8536 8.35355C11.9473 8.25979 12 8.13261 12 8C12 7.86739 11.9473 7.74021 11.8536 7.64645C11.7598 7.55268 11.6326 7.5 11.5 7.5ZM3.5 6C3.36739 6 3.24021 6.05268 3.14645 6.14645C3.05268 6.24021 3 6.36739 3 6.5V7.5H0.5C0.367392 7.5 0.240215 7.55268 0.146447 7.64645C0.0526785 7.74021 0 7.86739 0 8C0 8.13261 0.0526785 8.25979 0.146447 8.35355C0.240215 8.44732 0.367392 8.5 0.5 8.5H3V9.5C3 9.63261 3.05268 9.75979 3.14645 9.85355C3.24021 9.94732 3.36739 10 3.5 10C3.63261 10 3.75979 9.94732 3.85355 9.85355C3.94732 9.75979 4 9.63261 4 9.5V6.5C4 6.36739 3.94732 6.24021 3.85355 6.14645C3.75979 6.05268 3.63261 6 3.5 6Z" fill="currentColor"/>
              </svg>
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                <button onClick={() => { setStatusFilter(null); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 ${statusFilter === null ? 'font-bold text-[#856DF3]' : 'text-gray-700'}`}>All</button>
                <button onClick={() => { setStatusFilter('Paid'); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 ${statusFilter === 'Paid' ? 'font-bold text-[#856DF3]' : 'text-gray-700'}`}>Paid</button>
                <button onClick={() => { setStatusFilter('Unpaid'); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 ${statusFilter === 'Unpaid' ? 'font-bold text-[#856DF3]' : 'text-gray-700'}`}>Unpaid</button>
                <button onClick={() => { setStatusFilter('Overdue'); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-[12px] hover:bg-gray-50 ${statusFilter === 'Overdue' ? 'font-bold text-[#856DF3]' : 'text-gray-700'}`}>Overdue</button>
              </div>
            )}
          </div>
          <button className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 bg-[#1C1C1C] text-white rounded-xl text-[13px] font-semibold hover:bg-black transition-colors whitespace-nowrap md:min-w-[110px]">
            <span className="hidden md:inline">New Invoice</span>
            <svg className="md:hidden w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto min-h-0">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-100 text-[12px] text-gray-500 font-medium">
              <th className="pb-4 pl-4 font-medium flex items-center gap-2">
                <div className="w-4 h-4 rounded-[4px] bg-[#856DF3] flex items-center justify-center">
                  <div className="w-2 h-[2px] bg-white rounded-full"></div>
                </div>
                Invoice ID
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </th>
              <th className="pb-4 px-4 font-medium">
                <div className="flex items-center gap-1">
                  Company
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </th>
              <th className="hidden md:table-cell pb-4 px-4 font-medium">
                <div className="flex items-center gap-1">
                  Shipping ID
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </th>
              <th className="pb-4 px-4 font-medium">
                <div className="flex items-center gap-1">
                  Date
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </th>
              <th className="hidden md:table-cell pb-4 px-4 font-medium">
                <div className="flex items-center gap-1">
                  Amount
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </th>
              <th className="hidden md:table-cell pb-4 pr-4 font-medium text-right">
                <div className="flex items-center justify-end gap-1">
                  Status
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => {
              const isSelected = inv.id === selectedId;
              const hasLogo = !!CompanyLogos[inv.companyName];
              
              return (
                <tr 
                  key={inv.id}
                  onClick={() => onSelect(inv.id)}
                  className={`border-b border-gray-50 last:border-none cursor-pointer transition-colors ${isSelected ? 'bg-[#F9F8FF]' : 'hover:bg-gray-50'}`}
                >
                  <td className="py-3 pl-4">
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-[4px] bg-[#856DF3] flex items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-[4px] border-2 border-gray-200 bg-gray-50 shrink-0"></div>
                      )}
                      <span className="text-[13px] font-bold text-[#856DF3] hover:underline flex items-center gap-1.5">
                        {inv.id}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400 stroke-2"><path d="M8 7H17M17 7V16M17 7L7 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full shrink-0 overflow-hidden">
                        {hasLogo ? (
                          <div className="scale-75">{CompanyLogos[inv.companyName]}</div>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-500">{inv.companyName.charAt(0)}</span>
                        )}
                      </div>
                      <span className="text-[13px] font-semibold text-[#1f2937]">{inv.companyName}</span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell py-3 px-4 text-[13px] text-gray-500 font-medium">
                    {inv.shippingId}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-semibold text-[#1f2937] whitespace-nowrap">{inv.issueDate} <span className="text-gray-400 font-medium">(Issued)</span></span>
                      <span className="text-[12px] font-semibold text-[#1f2937] whitespace-nowrap mt-0.5">{inv.dueDate} <span className="text-gray-400 font-medium">(Due)</span></span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell py-3 px-4 text-[13px] font-bold text-[#1f2937]">
                    ${inv.lineItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>
                  <td className="hidden md:table-cell py-3 pr-4 text-right">
                    {getStatusBadge(inv.status)}
                  </td>
                </tr>
              );
            })}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500 text-[13px]">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

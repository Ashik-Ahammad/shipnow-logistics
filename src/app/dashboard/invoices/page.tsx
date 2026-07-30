"use client";

import React, { useState } from 'react';
import SummaryCards from './_components/SummaryCards';
import InvoiceList from './_components/InvoiceList';
import InvoiceDetails from './_components/InvoiceDetails';
import { invoiceList } from '@/data/invoices';

export default function InvoicesPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>('INV-1008');
  const [globalSearch, setGlobalSearch] = useState('');

  const selectedInvoice = selectedInvoiceId 
    ? invoiceList.find(inv => inv.id === selectedInvoiceId) || null 
    : null;

  return (
    <div className="flex flex-col w-full pb-2">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333333] leading-[1.1] mb-1">Invoices & Billing</h1>
          <div className="text-[13px]">
            <span className="text-[#856DF3] font-medium">Dashboard</span>
            <span className="text-[#757575] mx-2">/</span>
            <span className="text-[#757575] font-medium">Invoices & Billing</span>
          </div>
        </div>
        
        {/* Top Search */}
        <div className="mt-4 md:mt-0">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search anything" 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white rounded-xl shadow-sm text-[13px] border-none focus:ring-2 focus:ring-[#856DF3] w-full md:w-[260px] placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <SummaryCards />
      </div>

      {/* Main Content Area: Responsive Master-Detail */}
      <div className="flex flex-col xl:flex-row gap-6 relative">
        
        {/* Left Side: Invoice List */}
        <div className="w-full xl:w-[60%] flex flex-col">
          <InvoiceList 
            selectedId={selectedInvoiceId || ''} 
            onSelect={(id) => setSelectedInvoiceId(id)} 
            globalSearch={globalSearch}
          />
        </div>

        {/* Right Side: Invoice Details */}
        {selectedInvoiceId && (
          <>
            {/* Backdrop for tablet/mobile */}
            <div 
              className="absolute inset-0 bg-[#333333]/20 z-10 rounded-[24px] xl:hidden"
              onClick={() => setSelectedInvoiceId(null)}
            ></div>

            <div className={`
              absolute top-0 bottom-0 right-0 z-20 w-full sm:w-[400px] md:w-[480px]
              xl:static xl:w-[40%] xl:flex xl:flex-col xl:z-auto xl:shadow-none
            `}>
              <InvoiceDetails 
                invoice={selectedInvoice} 
                onBack={() => setSelectedInvoiceId(null)} 
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

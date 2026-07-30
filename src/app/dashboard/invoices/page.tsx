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
      <div className="grid grid-cols-1 xl:flex xl:flex-row gap-6 relative">
        
        {/* Left Side: Invoice List */}
        <div className="w-full xl:w-[60%] col-start-1 row-start-1">
          <InvoiceList 
            selectedId={selectedInvoiceId || ''} 
            onSelect={(id) => setSelectedInvoiceId(id)} 
            globalSearch={globalSearch}
          />
        </div>

        {/* Right Side: Invoice Details */}
        {selectedInvoiceId && (
          <>
            {/* Backdrop for tablet */}
            <div 
              className="hidden md:block xl:hidden absolute inset-0 bg-[#333333]/10 z-10 rounded-[24px]"
              onClick={() => setSelectedInvoiceId(null)}
            ></div>

            <div className={`
              w-full z-20 col-start-1 row-start-2
              md:row-start-1 md:justify-self-end md:self-start md:w-[660px] lg:w-[700px] md:shadow-[0px_12px_48px_rgba(0,0,0,0.12)]
              xl:w-[40%] xl:z-auto xl:self-stretch xl:shadow-none xl:rounded-none
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

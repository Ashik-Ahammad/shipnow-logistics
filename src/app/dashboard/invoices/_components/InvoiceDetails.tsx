import React from 'react';
import { Invoice } from '@/data/invoices';

interface InvoiceDetailsProps {
  invoice: Invoice | null;
  onBack: () => void;
}

export default function InvoiceDetails({ invoice, onBack }: InvoiceDetailsProps) {
  if (!invoice) return null;

  const subTotal = invoice.lineItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const taxAmount = subTotal * invoice.taxRate;
  const total = subTotal + taxAmount + invoice.fee;

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_2px_4px_rgba(0,0,0,0.02)] h-full flex flex-col border border-gray-100/50">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="xl:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <h2 className="text-[16px] font-semibold text-[#333333] leading-[1.2]">Invoice Details</h2>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 bg-[#F3F4F6] text-[#333333] rounded-[8px] text-[12px] font-semibold leading-none hover:bg-gray-200 transition-colors">Edit</button>
          <button className="px-4 py-2 bg-[#F3F4F6] text-[#333333] rounded-[8px] text-[12px] font-semibold leading-none hover:bg-gray-200 transition-colors">Hold</button>
          <button className="px-4 py-2 bg-[#333333] text-[#FEFEFE] rounded-[8px] text-[12px] font-semibold leading-none hover:bg-black transition-colors shadow-sm">Send Invoice</button>
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        {/* Invoice Title & Dates */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333] leading-[1.25] mb-2">
              Invoice <span className="text-[#856DF3]">#{invoice.id}</span>
            </h3>
            {invoice.status === 'Unpaid' && <span className="px-2.5 py-1 rounded-[6px] bg-[#F3F0FF] text-[#856DF3] text-[10px] font-bold">Unpaid</span>}
            {invoice.status === 'Paid' && <span className="px-2.5 py-1 rounded-[6px] bg-[#E8F8F0] text-[#00C875] text-[10px] font-bold">Paid</span>}
            {invoice.status === 'Overdue' && <span className="px-2.5 py-1 rounded-[6px] bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold">Overdue</span>}
          </div>
          <div className="text-right flex flex-col gap-1.5">
            <div className="flex items-center justify-end gap-2"><span className="text-[10px] text-[#757575] font-normal leading-[1.3]">Issue Date</span><span className="text-[11px] font-semibold text-[#333333] leading-[1.3]">{invoice.issueDate}</span></div>
            <div className="flex items-center justify-end gap-2"><span className="text-[10px] text-[#757575] font-normal leading-[1.3]">Due Date</span><span className="text-[11px] font-semibold text-[#333333] leading-[1.3]">{invoice.dueDate}</span></div>
          </div>
        </div>

        {/* Bill From / Bill To Box */}
        <div className="bg-[#F9FAFB] rounded-[16px] p-6 flex flex-col md:flex-row gap-6 justify-between mb-8">
          <div className="flex-1">
            <div className="text-[11px] text-gray-400 font-medium mb-3">Bill From</div>
            <div className="font-bold text-[#333333] text-[16px] leading-[1.2] mb-1">{invoice.billFrom.name}</div>
            
            <div className="md:hidden text-[11px] text-[#757575] font-normal leading-[1.3] mb-2">
              {invoice.billFrom.email} &bull; {invoice.billFrom.phone}
            </div>
            <div className="hidden md:block text-[11px] text-[#757575] font-normal leading-[1.3] mb-2">{invoice.billFrom.email}</div>
            
            <div className="text-[12px] text-gray-500 whitespace-pre-line leading-relaxed mb-2">{invoice.billFrom.address}</div>
            <div className="hidden md:block text-[12px] text-gray-500">{invoice.billFrom.phone}</div>
          </div>
          <div className="flex-1 md:text-right mt-6 md:mt-0">
            <div className="text-[11px] text-gray-400 font-medium mb-3">Bill To</div>
            <div className="font-bold text-[#333333] text-[16px] leading-[1.2] mb-1">{invoice.billTo.name}</div>
            
            <div className="md:hidden text-[11px] text-[#757575] font-normal leading-[1.3] mb-2">
              {invoice.billTo.email} &bull; {invoice.billTo.phone}
            </div>
            <div className="hidden md:block text-[11px] text-[#757575] font-normal leading-[1.3] mb-2">{invoice.billTo.email}</div>
            
            <div className="text-[12px] text-gray-500 whitespace-pre-line leading-relaxed mb-2">{invoice.billTo.address}</div>
            <div className="hidden md:block text-[12px] text-gray-500">{invoice.billTo.phone}</div>
          </div>
        </div>

        {/* Package Summary */}
        <h4 className="text-[14px] font-semibold text-[#333333] leading-[1.25] mb-4">Package Summary</h4>
        <div className="rounded-[12px] border border-gray-100 mb-6 overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr className="text-[12px] text-[#4B5563] font-medium">
                <th className="py-3 pl-5 pr-4 font-medium flex items-center gap-1">Description <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></th>
                <th className="py-3 px-4 font-medium"><div className="flex items-center gap-1">Shipment Type <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div></th>
                <th className="hidden md:table-cell py-3 px-4 font-medium"><div className="flex items-center gap-1">Price <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div></th>
                <th className="hidden md:table-cell py-3 px-4 font-medium"><div className="flex items-center gap-1">Qty <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div></th>
                <th className="py-3 pr-5 pl-4 font-medium text-right"><div className="flex items-center justify-end gap-1">Amount <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div></th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-5 pl-5 pr-4 align-top">
                    <div className="text-[13px] font-medium text-[#333333]">{item.description}</div>
                    <div className="md:hidden text-[11px] mt-1">
                      <span className="text-[#856DF3] font-medium">${item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span> <span className="text-gray-400 font-medium">x {item.qty}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 align-top">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-[#333333] font-medium">{item.shipmentType}</span>
                      <span className="text-[12px] text-[#A3A3A3] font-normal">{item.serviceLevel}</span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell py-5 px-4 text-[13px] font-medium text-[#333333] align-top">${item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="hidden md:table-cell py-5 px-4 text-[13px] font-medium text-[#333333] align-top">{item.qty}</td>
                  <td className="py-5 pr-5 pl-4 text-right text-[13px] font-medium text-[#333333] align-top">${(item.price * item.qty).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              ))}
              
              {/* Totals rows */}
              <tr>
                <td></td>
                <td className="pt-6 pb-2 px-4 text-[11px] text-[#757575] font-medium hidden md:table-cell" colSpan={3}>Sub Total</td>
                <td className="pt-6 pb-2 px-4 text-[11px] text-[#757575] font-medium md:hidden">Sub Total</td>
                <td className="pt-6 pb-2 pr-5 pl-4 text-right text-[11px] font-medium text-[#333333]">${subTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
              <tr>
                <td></td>
                <td className="py-2 px-4 text-[11px] text-[#757575] font-medium hidden md:table-cell" colSpan={3}>Tax ({(invoice.taxRate * 100).toFixed(0)}%)</td>
                <td className="py-2 px-4 text-[11px] text-[#757575] font-medium md:hidden">Tax ({(invoice.taxRate * 100).toFixed(0)}%)</td>
                <td className="py-2 pr-5 pl-4 text-right text-[11px] font-medium text-[#333333]">${taxAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
              <tr>
                <td></td>
                <td className="pt-2 pb-6 px-4 text-[11px] text-[#757575] font-medium hidden md:table-cell" colSpan={3}>Fee</td>
                <td className="pt-2 pb-6 px-4 text-[11px] text-[#757575] font-medium md:hidden">Fee</td>
                <td className="pt-2 pb-6 pr-5 pl-4 text-right text-[11px] font-medium text-[#333333]">${invoice.fee.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
              <tr>
                <td></td>
                <td className="py-4 px-4 text-[11px] text-[#333333] font-bold border-t border-gray-100 hidden md:table-cell" colSpan={3}>Total</td>
                <td className="py-4 px-4 text-[11px] text-[#333333] font-bold border-t border-gray-100 md:hidden">Total</td>
                <td className="py-4 pr-5 pl-4 text-right text-[12px] font-bold text-[#333333] border-t border-gray-100">${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div>
          <div className="text-[11px] text-gray-400 font-medium mb-1">Note</div>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Please process payment by the due date to avoid delivery disruption. Late fees may apply after 3 business days past due.
          </p>
        </div>
      </div>
      
      {/* Mobile Actions */}
      <div className="md:hidden p-4 border-t border-gray-100 flex items-center gap-2 shrink-0 bg-white rounded-b-[24px]">
          <button className="flex-1 py-2.5 bg-[#F3F4F6] text-[#333333] rounded-[8px] text-[12px] font-semibold leading-none hover:bg-gray-200 transition-colors">Edit</button>
          <button className="flex-1 py-2.5 bg-[#F3F4F6] text-[#333333] rounded-[8px] text-[12px] font-semibold leading-none hover:bg-gray-200 transition-colors">Hold</button>
          <button className="flex-[1.5] py-2.5 bg-[#333333] text-[#FEFEFE] rounded-[8px] text-[12px] font-semibold leading-none hover:bg-black transition-colors shadow-sm">Send Invoice</button>
      </div>
    </div>
  );
}

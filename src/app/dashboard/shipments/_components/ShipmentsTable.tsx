"use client";

import { useState } from "react";
import { Box, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shipment } from "@/data/shipments";
import { CompanyLogos } from "@/data/companyLogos";
import Pagination from "@/components/ui/Pagination";

interface ShipmentsTableProps {
  data: Shipment[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const SortIcon = () => (
  <div className="flex flex-col -space-y-1.5">
    <ChevronUp className="h-2.5 w-2.5 text-gray-400" />
    <ChevronDown className="h-2.5 w-2.5 text-gray-400" />
  </div>
);

export default function ShipmentsTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: ShipmentsTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((d) => d.id));
    }
  };

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rId) => rId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-400";
      case "Delivery":
        return "bg-blue-400";
      case "Completed":
        return "bg-emerald-500";
      default:
        return "bg-gray-400";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#856DF3]";
      case "Pending":
        return "bg-[#856DF3]";
      case "Delivery":
        return "bg-[#856DF3]";
      default:
        return "bg-[#856DF3]";
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-x-auto rounded-t-xl bg-white border border-gray-100 border-b-0">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="px-5 py-4 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#856DF3] focus:ring-[#856DF3]"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Shipping ID <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Company <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Carriers <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Product Category <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Weight <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Route <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Date <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Progress <SortIcon /></div>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-[12px] font-medium text-gray-400 whitespace-nowrap cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-1.5">Status <SortIcon /></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="whitespace-nowrap px-5 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#856DF3] focus:ring-[#856DF3]"
                    checked={selectedRows.includes(shipment.id)}
                    onChange={() => toggleRow(shipment.id)}
                  />
                </td>
                
                {/* Shipping ID */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-[14px] font-semibold text-[#856DF3] mb-0.5">{shipment.id}</div>
                  <div className="flex items-center gap-1 text-[12px] text-gray-400">
                    <Box className="h-3 w-3" /> {shipment.freightType}
                  </div>
                </td>

                {/* Company */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center shrink-0">
                      {CompanyLogos[shipment.company.name] || (
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white", shipment.company.logoColor)}>
                          <div className="h-4 w-4 border-2 border-current rounded-sm"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-gray-900">{shipment.company.name}</div>
                      <div className="text-[12px] text-gray-400">{shipment.company.category}</div>
                    </div>
                  </div>
                </td>

                {/* Carriers */}
                <td className="whitespace-nowrap px-4 py-4 text-[13px] font-medium text-gray-700">
                  {shipment.carrier}
                </td>

                {/* Product Category */}
                <td className="whitespace-nowrap px-4 py-4 text-[13px] text-gray-700">
                  {shipment.productCategory}
                </td>

                {/* Weight */}
                <td className="whitespace-nowrap px-4 py-4 text-[13px] font-medium text-gray-900">
                  {shipment.weight}
                </td>

                {/* Route */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-[13px] font-medium text-gray-900 mb-0.5">
                    {shipment.route.origin} <span className="text-gray-400 font-normal">(Origin)</span>
                  </div>
                  <div className="text-[13px] font-medium text-[#856DF3]">
                    {shipment.route.destination} <span className="text-gray-400 font-normal">(Destination)</span>
                  </div>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-[13px] font-medium text-gray-900 mb-0.5">
                    {shipment.dates.atd} <span className="text-gray-400 font-normal">(ATD)</span>
                  </div>
                  <div className="text-[13px] font-medium text-[#856DF3]">
                    {shipment.dates.eta} <span className="text-gray-400 font-normal">(ETA)</span>
                  </div>
                </td>

                {/* Progress */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={cn("h-full rounded-full", getProgressColor(shipment.status))}
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                    <span className="text-[13px] font-medium text-gray-700">{shipment.progress}%</span>
                  </div>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", getStatusColor(shipment.status))} />
                    <span className="text-[13px] font-medium text-gray-700">{shipment.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <div className="mb-4 rounded-full bg-gray-50 p-4">
              <Box className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-[16px] font-bold text-gray-900">No shipments found</h3>
            <p className="mt-1.5 text-[14px] text-gray-500">We couldn&apos;t find any shipments matching your criteria.</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-b-xl border border-t-0 border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={pageSize}
          onPageSizeChange={onPageSizeChange}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}

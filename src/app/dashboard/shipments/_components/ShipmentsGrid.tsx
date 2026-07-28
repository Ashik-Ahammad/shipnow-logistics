"use client";

import { Plane, Truck, Ship, Train } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shipment } from "@/data/shipments";
import { CompanyLogos } from "@/data/companyLogos";
import Pagination from "@/components/ui/Pagination";

interface ShipmentsGridProps {
  data: Shipment[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

export default function ShipmentsGrid({
  data,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: ShipmentsGridProps) {

  // Map freight type to an icon
  const getCarrierIcon = (freightType: string) => {
    switch (freightType) {
      case "Air Freight": return <Plane className="h-4 w-4 text-gray-700" />;
      case "Road Freight": return <Truck className="h-4 w-4 text-gray-700" />;
      case "Ocean Freight": return <Ship className="h-4 w-4 text-gray-700" />;
      case "Rail Freight": return <Train className="h-4 w-4 text-gray-700" />;
      default: return <Truck className="h-4 w-4 text-gray-700" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"; // Processing
      case "Delivery":
        return "bg-[#EBE7FE] text-[#856DF3]"; // In Transit
      case "Completed":
        return "bg-green-100 text-green-800"; // Delivered
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Pending": return "Processing";
      case "Delivery": return "In Transit";
      case "Completed": return "Delivered";
      default: return status;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4">
        {data.map((shipment) => (
          <div key={shipment.id} className="flex flex-col rounded-[20px] bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[15px] font-bold text-gray-900 mb-2">{shipment.id}</p>
                <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold", getStatusStyle(shipment.status))}>
                  {getStatusText(shipment.status)}
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                {getCarrierIcon(shipment.freightType)}
              </div>
            </div>

            {/* Company */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                {CompanyLogos[shipment.company.name] || (
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white", shipment.company.logoColor)}>
                    <div className="h-5 w-5 border-2 border-current rounded-sm"></div>
                  </div>
                )}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-gray-900">{shipment.company.name}</div>
                <div className="text-[12px] text-gray-400">{shipment.company.category}</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-3 border-l-2 border-dashed border-gray-100 ml-2 mb-6 space-y-4">
              {/* Origin Dot */}
              <div className="absolute -left-1.25 top-1.5 h-2 w-2 rounded-full bg-[#EBE7FE] border-2 border-white ring-1 ring-[#EBE7FE]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#856DF3] ml-[-0.5px] mt-[-0.5px]"></div>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[12px] text-gray-400">Origin</span>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-gray-900">{shipment.route.origin}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{shipment.dates.atd}</p>
                </div>
              </div>

              {/* Destination Dot */}
              <div className="absolute -left-1.25 top-18 h-2 w-2 rounded-full bg-[#EBE7FE] border-2 border-white ring-1 ring-[#EBE7FE]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#856DF3] ml-[-0.5px] mt-[-0.5px]"></div>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[12px] text-gray-400">Destination</span>
                <div className="text-right">
                  <p className="text-[13px] font-semibold text-gray-900">{shipment.route.destination}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{shipment.dates.eta}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-auto pt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] text-gray-400">
                  Progres <span className="font-bold text-gray-900 ml-1">{shipment.progress}%</span>
                </p>
                <p className="text-[12px] text-gray-400">
                  Carriers <span className="font-bold text-gray-900 ml-1">{shipment.carrier}</span>
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#856DF3]"
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="col-span-full p-8 text-center text-sm text-gray-500">
            No shipments found.
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-gray-100">
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

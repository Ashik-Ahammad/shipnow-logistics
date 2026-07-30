"use client";

import { cn } from "@/lib/utils";
import { Shipment } from "@/data/shipments";
import { CompanyLogos } from "@/data/companyLogos";
import Pagination from "@/components/ui/Pagination";

const AirFreightIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.52378 2.41411C8.51737 2.4221 8.51059 2.42988 8.50344 2.43743L7.01751 4.00774C6.91479 4.1163 6.75742 4.15349 6.61697 4.10242L2.71642 2.68404L2.08374 3.31671L5.07814 5.31298C5.17162 5.3753 5.23223 5.47625 5.2433 5.58805C5.25437 5.69985 5.21473 5.81072 5.13529 5.89016L4.01029 7.01516C3.93996 7.08549 3.84458 7.125 3.74512 7.125H2.77545L2.18762 7.71283L3.57436 8.18061C3.68513 8.21797 3.77214 8.30486 3.80966 8.41557L4.28162 9.80818L4.87012 9.21967V8.25C4.87012 8.14434 4.91469 8.04359 4.99287 7.97252L6.12725 6.94127C6.20753 6.86829 6.31549 6.83365 6.42325 6.84631C6.53101 6.85897 6.628 6.91768 6.68919 7.00728L8.67476 9.91503L9.31109 9.27871L7.8927 5.37815C7.84149 5.23731 7.87904 5.0795 7.98821 4.97683L9.54643 3.51136C9.67517 3.37258 9.74708 3.18999 9.74708 3C9.74708 2.80057 9.66785 2.60931 9.52683 2.46829C9.38582 2.32727 9.19455 2.24805 8.99512 2.24805C8.82288 2.24805 8.65673 2.30714 8.52378 2.41411ZM10.1122 4.00401C10.3594 3.72903 10.4971 3.37161 10.4971 3C10.4971 2.60166 10.3388 2.21963 10.0572 1.93796C9.77549 1.65629 9.39347 1.49805 8.99512 1.49805C8.59678 1.49805 8.21475 1.65629 7.93308 1.93796C7.91215 1.95889 7.89419 1.98172 7.87921 2.00592L6.64194 3.31345L2.74828 1.89758C2.61135 1.84778 2.45798 1.88181 2.35496 1.98483L1.22996 3.10983C1.15052 3.18927 1.11088 3.30015 1.12195 3.41195C1.13302 3.52375 1.19363 3.6247 1.28711 3.68702L4.28151 5.68328L3.58979 6.375H2.62012C2.52067 6.375 2.42529 6.41451 2.35496 6.48483L1.22996 7.60983C1.13823 7.70156 1.10042 7.83419 1.13 7.9605C1.15958 8.08681 1.25234 8.18886 1.37526 8.23033L3.15888 8.83198L3.76497 10.6204C3.80657 10.7431 3.90864 10.8357 4.03488 10.8652C4.16112 10.8946 4.29363 10.8568 4.38529 10.7652L5.51029 9.64016C5.58062 9.56984 5.62012 9.47446 5.62012 9.375V8.41589L6.31285 7.78613L8.31044 10.7115C8.37338 10.8036 8.47412 10.863 8.58525 10.8734C8.69638 10.8838 8.80636 10.8441 8.88529 10.7652L10.0103 9.64016C10.1133 9.53714 10.1473 9.38377 10.0975 9.24684L8.68195 5.35396L10.0258 4.09014C10.0366 4.08146 10.0471 4.07209 10.0572 4.06204L10.0853 4.03392C10.0949 4.02432 10.1038 4.01434 10.1122 4.00401Z" fill="currentColor"/>
  </svg>
);

const RoadFreightIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.4375 4.875C9.26593 4.875 9.9375 5.54657 9.9375 6.375C9.9375 7.20343 9.26593 7.875 8.4375 7.875C7.73856 7.875 7.15126 7.39696 6.98474 6.75H4.26526C4.09874 7.39696 3.51144 7.875 2.8125 7.875C1.98407 7.875 1.3125 7.20343 1.3125 6.375C1.3125 5.54657 1.98407 4.875 2.8125 4.875C3.51144 4.875 4.09874 5.35304 4.26526 6H6.98474C7.15126 5.35304 7.73856 4.875 8.4375 4.875ZM2.8125 5.625C2.39829 5.625 2.0625 5.96079 2.0625 6.375C2.0625 6.78921 2.39829 7.125 2.8125 7.125C3.22671 7.125 3.5625 6.78921 3.5625 6.375C3.5625 5.96079 3.22671 5.625 2.8125 5.625ZM8.4375 5.625C8.02329 5.625 7.6875 5.96079 7.6875 6.375C7.6875 6.78921 8.02329 7.125 8.4375 7.125C8.85171 7.125 9.1875 6.78921 9.1875 6.375C9.1875 5.96079 8.85171 5.625 8.4375 5.625Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.875 0C8.08211 0 8.25 0.167893 8.25 0.375V5.40015C8.24992 5.60719 8.08206 5.77515 7.875 5.77515C7.66794 5.77515 7.50008 5.60719 7.5 5.40015V4.5H0.75V6H1.6875C1.89461 6 2.0625 6.16789 2.0625 6.375C2.0625 6.58211 1.89461 6.75 1.6875 6.75H0.75C0.551088 6.75 0.360379 6.67093 0.219727 6.53027C0.0790742 6.38962 0 6.19891 0 6V0.75C0 0.551088 0.0790743 0.360379 0.219727 0.219727C0.360379 0.0790744 0.551087 0 0.75 0H7.875ZM0.75 3.75H7.5V0.75H0.75V3.75Z" fill="currentColor"/>
    <path d="M9.62292 0.747136C10.0816 0.74801 10.4908 1.02935 10.66 1.45246L11.2192 2.85138C11.2251 2.86501 11.23 2.8791 11.2343 2.8935C11.2358 2.89886 11.2373 2.90423 11.2386 2.90961C11.2402 2.91603 11.2418 2.92247 11.243 2.92902C11.2442 2.93474 11.2448 2.94051 11.2456 2.94623C11.2466 2.95291 11.2476 2.95959 11.2482 2.96637C11.2488 2.97359 11.249 2.98078 11.2493 2.98798C11.2494 2.99198 11.25 2.99604 11.25 3.00007V6.00007C11.25 6.19895 11.1709 6.3897 11.0303 6.53034C10.8896 6.67097 10.6989 6.75007 10.5 6.75007H9.5625C9.35542 6.75007 9.18754 6.58208 9.1875 6.375C9.1875 6.16789 9.35539 6.00007 9.5625 6.00007H10.5V3.37507H7.875C7.66791 3.37507 7.50004 3.20714 7.5 3.00007C7.5 2.79296 7.66789 2.62507 7.875 2.62507H10.3209L9.9635 1.73114C9.90685 1.58952 9.771 1.49742 9.62146 1.49714C9.33031 1.49658 9.04246 1.49769 8.75354 1.4986C8.52465 1.49932 8.29491 1.50007 8.0625 1.50007C7.85542 1.50007 7.68754 1.33214 7.6875 1.12507C7.6875 0.917959 7.85539 0.750066 8.0625 0.750066C8.28837 0.750066 8.51713 0.749315 8.74658 0.748601C9.03907 0.747691 9.3327 0.746584 9.62292 0.747136Z" fill="currentColor"/>
  </svg>
);

const OceanFreightIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6 3.76875C6.01499 3.76875 6.02978 3.7696 6.04431 3.77131C6.1061 3.77486 6.16762 3.78552 6.22742 3.80391L6.23584 3.80684L10.3605 5.18489C10.51 5.23433 10.6402 5.32943 10.7325 5.45698C10.8251 5.58489 10.875 5.73891 10.875 5.8968V7.50007C10.875 7.53496 10.87 7.56981 10.8604 7.60335C10.4781 8.93825 9.41285 9.80939 8.42798 10.3536C7.4401 10.8994 6.47244 11.1506 6.17249 11.2208C6.05921 11.2488 5.94079 11.2488 5.82751 11.2208C5.52756 11.1506 4.5599 10.8994 3.57202 10.3536C2.58715 9.80939 1.52187 8.93825 1.13965 7.60335C1.13005 7.56981 1.12501 7.53496 1.125 7.50007V5.8968C1.12502 5.73892 1.1749 5.58488 1.26746 5.45698C1.3598 5.32943 1.49004 5.23433 1.63953 5.18489L5.76416 3.80684L5.77258 3.80391C5.83226 3.78555 5.89366 3.77488 5.95532 3.77131C5.96997 3.76958 5.98488 3.76875 6 3.76875ZM6.375 7.87507C6.37496 8.08215 6.20708 8.25007 6 8.25007C5.79292 8.25007 5.62504 8.08215 5.625 7.87507V4.64399L1.875 5.8968V7.44587C2.18949 8.4754 3.03797 9.20174 3.93494 9.69734C4.83879 10.1967 5.73287 10.4285 6 10.4909C6.26713 10.4285 7.16121 10.1967 8.06506 9.69734C8.96203 9.20174 9.81051 8.4754 10.125 7.44587V5.8968L10.1235 5.89644L6.375 4.64399V7.87507Z" fill="currentColor"/>
    <path d="M6 0.75C6.20711 0.75 6.375 0.917893 6.375 1.125V1.875H9C9.19891 1.875 9.38962 1.95407 9.53027 2.09473C9.67093 2.23538 9.75 2.42609 9.75 2.625V5.25C9.75 5.45711 9.58211 5.625 9.375 5.625C9.16789 5.625 9 5.45711 9 5.25V2.625H3V5.25C3 5.45711 2.83211 5.625 2.625 5.625C2.41789 5.625 2.25 5.45711 2.25 5.25V2.625C2.25 2.42609 2.32907 2.23538 2.46973 2.09473C2.61038 1.95407 2.80109 1.875 3 1.875H5.625V1.125C5.625 0.917893 5.79289 0.75 6 0.75Z" fill="currentColor"/>
  </svg>
);

const RailFreightIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.8125 1.125C9.64093 1.125 10.3125 1.79657 10.3125 2.625V8.625C10.3125 9.45343 9.64093 10.125 8.8125 10.125H8.24963L8.92493 11.0251C9.04914 11.1908 9.01552 11.4257 8.84985 11.5499C8.68417 11.6741 8.44932 11.6405 8.32507 11.4749L7.31287 10.125H4.68713L3.67493 11.4749C3.55068 11.6405 3.31583 11.6741 3.15015 11.5499C2.98448 11.4257 2.95086 11.1908 3.07507 11.0251L3.75037 10.125H3.1875C2.35907 10.125 1.6875 9.45343 1.6875 8.625V2.625C1.6875 1.79657 2.35907 1.125 3.1875 1.125H8.8125ZM3.1875 1.875C2.77329 1.875 2.4375 2.21079 2.4375 2.625V8.625C2.4375 9.03921 2.77329 9.375 3.1875 9.375H8.8125C9.22671 9.375 9.5625 9.03921 9.5625 8.625V2.625C9.5625 2.21079 9.22671 1.875 8.8125 1.875H3.1875Z" fill="currentColor"/>
    <path d="M9.9375 3C10.1446 3 10.3125 3.16789 10.3125 3.375C10.3125 3.58211 10.1446 3.75 9.9375 3.75H6.375V5.625H9.9375C10.1446 5.625 10.3125 5.79289 10.3125 6C10.3125 6.20711 10.1446 6.375 9.9375 6.375H2.0625C1.85539 6.375 1.6875 6.20711 1.6875 6C1.6875 5.79289 1.85539 5.625 2.0625 5.625H5.625V3.75H2.0625C1.85539 3.75 1.6875 3.58211 1.6875 3.375C1.6875 3.16789 1.85539 3 2.0625 3H9.9375Z" fill="currentColor"/>
    <path d="M3.9375 7.5C4.24816 7.5 4.5 7.75184 4.5 8.0625C4.5 8.37316 4.24816 8.625 3.9375 8.625C3.62684 8.625 3.375 8.37316 3.375 8.0625C3.375 7.75184 3.62684 7.5 3.9375 7.5Z" fill="currentColor"/>
    <path d="M8.0625 7.5C8.37316 7.5 8.625 7.75184 8.625 8.0625C8.625 8.37316 8.37316 8.625 8.0625 8.625C7.75184 8.625 7.5 8.37316 7.5 8.0625C7.5 7.75184 7.75184 7.5 8.0625 7.5Z" fill="currentColor"/>
  </svg>
);

const getCarrierIcon = (freightType: string) => {
  switch (freightType) {
    case "Air Freight": return <AirFreightIcon className="h-4 w-4 text-gray-700" />;
    case "Road Freight": return <RoadFreightIcon className="h-3 w-4 text-gray-700" />;
    case "Ocean Freight": return <OceanFreightIcon className="h-4 w-4 text-gray-700" />;
    case "Rail Freight": return <RailFreightIcon className="h-4 w-4 text-gray-700" />;
    default: return <RoadFreightIcon className="h-3 w-4 text-gray-700" />;
  }
};

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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-[#FEF5D4] text-[#B78800]"; // Processing
      case "Delivery":
        return "bg-[#EBE7FE] text-[#856DF3]"; // In Transit
      case "Completed":
        return "bg-[#E6F8F0] text-[#00A551]"; // Delivered
      default:
        return "bg-[#F5F5F5] text-[#757575]";
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
          <div key={shipment.id} className="flex flex-col rounded-[16px] bg-white p-5 shadow-sm border border-transparent hover:border-gray-100 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex flex-col items-start gap-2.5">
                <p className="text-[14px] font-bold text-[#333333] leading-[1.25]">{shipment.id}</p>
                <span className={cn("inline-flex rounded-[6px] px-2.5 py-1 text-[10px] font-medium leading-none", getStatusStyle(shipment.status))}>
                  {getStatusText(shipment.status)}
                </span>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F5] text-gray-700">
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
              <div className="flex flex-col justify-center gap-1">
                <div className="text-[14px] font-semibold text-gray-900 leading-tight">{shipment.company.name}</div>
                <div className="text-[11px] text-gray-400 leading-tight">{shipment.company.category}</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-6 flex bg-[#F5F5F5] rounded-lg p-2.5">
              <div className="flex flex-col items-center mr-3 mt-1.5 mb-1.5">
                <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#E3DDFF] z-10">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#856DF3]" />
                </div>
                <div className="w-[1.5px] flex-1 bg-[#E3DDFF]" />
                <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-[#E3DDFF] z-10">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0.75C4.90636 0.751241 3.85787 1.18624 3.08455 1.95955C2.31124 2.73287 1.87624 3.78136 1.875 4.875C1.875 8.40469 5.625 11.0705 5.78484 11.182C5.8479 11.2262 5.92302 11.2499 6 11.2499C6.07698 11.2499 6.1521 11.2262 6.21516 11.182C6.375 11.0705 10.125 8.40469 10.125 4.875C10.1238 3.78136 9.68876 2.73287 8.91545 1.95955C8.14213 1.18624 7.09364 0.751241 6 0.75ZM6 3.375C6.29667 3.375 6.58668 3.46297 6.83335 3.6278C7.08003 3.79262 7.27229 4.02689 7.38582 4.30097C7.49935 4.57506 7.52906 4.87666 7.47118 5.16764C7.4133 5.45861 7.27044 5.72588 7.06066 5.93566C6.85088 6.14544 6.58361 6.2883 6.29264 6.34618C6.00166 6.40406 5.70006 6.37435 5.42597 6.26082C5.15189 6.14729 4.91762 5.95503 4.7528 5.70835C4.58797 5.46168 4.5 5.17167 4.5 4.875C4.5 4.47718 4.65804 4.09564 4.93934 3.81434C5.22064 3.53304 5.60218 3.375 6 3.375Z" fill="#856DF3"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[11px] text-gray-400 font-medium leading-none mt-[2px]">Origin</span>
                  <div className="text-right">
                    <div className="text-[13px] font-semibold text-gray-900 leading-none mb-1.5">{shipment.route.origin}</div>
                    <div className="text-[10px] text-gray-400 leading-none">{shipment.dates.atd}</div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[11px] text-gray-400 font-medium leading-none mb-[2px]">Destination</span>
                  <div className="text-right">
                    <div className="text-[13px] font-semibold text-gray-900 leading-none mb-1.5">{shipment.route.destination}</div>
                    <div className="text-[10px] text-gray-400 leading-none">{shipment.dates.eta}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] text-gray-400 font-medium">
                  Progres <span className="font-semibold text-gray-900 ml-0.5">{shipment.progress}%</span>
                </p>
                <p className="text-[12px] text-gray-400 font-medium">
                  Carriers <span className="font-semibold text-gray-900 ml-0.5">{shipment.carrier}</span>
                </p>
              </div>
              <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#F5F5F5]">
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

      <div className="mt-6">
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

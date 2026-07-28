import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 12,
  onPageSizeChange,
  totalItems = 1240,
}: PaginationProps) {
  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "ellipsis", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "ellipsis", currentPage, "ellipsis", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 tablet:px-6">
      {/* Mobile-only rudimentary pagination */}
      <div className="flex w-full items-center justify-between tablet:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {Math.max(1, totalPages)}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>

      {/* Tablet/Desktop pagination matching Figma */}
      <div className="hidden tablet:flex tablet:w-full tablet:items-center tablet:justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[14px] text-gray-500 font-normal">Show</span>
          {onPageSizeChange && (
            <div className="relative flex items-center">
              <select
                className="appearance-none bg-transparent py-1 pl-1.5 pr-5 text-[14px] font-semibold text-gray-900 outline-none cursor-pointer"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
              >
                {[12, 24, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 text-gray-500">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
          )}
          <span className="text-[14px] text-gray-500 font-normal">of {totalItems.toLocaleString()} results</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-[#F4F4F4] text-gray-400 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {totalPages > 0 ? getPageNumbers().map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8.5 w-8.5 items-center justify-center text-[14px] font-medium text-gray-600 tracking-wider"
                >
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "flex h-8.5 w-8.5 items-center justify-center rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer",
                  currentPage === page
                    ? "bg-[#856DF3] text-white"
                    : "text-gray-900 hover:bg-gray-100"
                )}
              >
                {page}
              </button>
            );
          }) : null}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] bg-[#F4F4F4] text-gray-400 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

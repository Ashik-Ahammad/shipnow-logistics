"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 min-h-[50vh]">
      <div className="flex flex-col items-center justify-center gap-4 text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle className="h-8 w-8" />
        </div>
        
        <div className="flex flex-col gap-1">
          <h2 className="text-[18px] font-bold text-[#333333]">Something went wrong!</h2>
          <p className="text-[14px] text-[#757575] leading-relaxed">
            We encountered an unexpected error while trying to load this module. Please try again.
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#232323] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}

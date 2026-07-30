import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#856DF3]" />
        <p className="text-[14px] font-medium text-[#757575]">Loading...</p>
      </div>
    </div>
  );
}

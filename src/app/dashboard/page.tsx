import SummaryCards from "./_components/SummaryCards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 ">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 gap-6 desktop:grid-cols-2">
        <div className="flex h-85 w-full items-center justify-center rounded-xl border border-gray-100/50 bg-white text-gray-400 shadow-sm">
          Shipment Statistic Chart Placeholder
        </div>
        <div className="flex h-85 w-full items-center justify-center rounded-xl border border-gray-100/50 bg-white text-gray-400 shadow-sm">
          Profit Summary Chart Placeholder
        </div>
      </div>
    </div>
  );
}
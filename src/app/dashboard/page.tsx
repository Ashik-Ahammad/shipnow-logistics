import LiveTracking from "./_components/LiveTracking";
import ProductCategories from "./_components/ProductCategories";
import ProfitSummary from "./_components/ProfitSummary";
import RecentActivity from "./_components/RecentActivity";
import RecentShipments from "./_components/RecentShipments";
import ShipmentAlerts from "./_components/ShipmentAlerts";
import ShipmentStatistic from "./_components/ShipmentStatistic";
import ShipmentType from "./_components/ShipmentType";
import SummaryCards from "./_components/SummaryCards";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-12 gap-5 relative">
      {/* 1. Summary Cards */}
      <div className="tablet:col-span-12 desktop:col-span-8 desktop:col-start-1 desktop:row-start-1">
        <SummaryCards />
      </div>

      {/* 2. Shipment Statistic */}
      <div className="tablet:col-span-6 desktop:col-span-3 desktop:col-start-1 desktop:row-start-2">
        <ShipmentStatistic />
      </div>

      {/* 3. Profit Summary */}
      <div className="tablet:col-span-6 desktop:col-span-5 desktop:col-start-4 desktop:row-start-2">
        <ProfitSummary />
      </div>

      {/* 4. Shipment Type (Spans 2 rows on Desktop) */}
      <div className="tablet:col-span-6 desktop:col-span-4 desktop:col-start-9 desktop:row-start-1 desktop:row-span-2">
        <ShipmentType />
      </div>

      {/* 5. Product Categories */}
      <div className="tablet:col-span-6 desktop:col-span-3 desktop:col-start-1 desktop:row-start-3">
        <ProductCategories />
      </div>

      {/* 6. Live Tracking (Map) */}
      <div className="tablet:col-span-12 desktop:col-span-5 desktop:col-start-4 desktop:row-start-3">
        <LiveTracking />
      </div>

      {/* 7. Shipment Alerts */}
      <div className="tablet:col-span-6 desktop:col-span-4 desktop:col-start-9 desktop:row-start-3">
        <ShipmentAlerts />
      </div>

      {/* 8. Recent Shipments */}
      <div className="tablet:col-span-12 tablet:order-[11] desktop:order-none desktop:col-span-8 desktop:col-start-1 desktop:row-start-4">
        <RecentShipments />
      </div>

      {/* 9. Recent Activity */}
      <div className="tablet:col-span-6 tablet:order-[10] desktop:order-none desktop:col-span-4 desktop:col-start-9 desktop:row-start-4 h-full">
        <RecentActivity />
      </div>
    </div>
  );
}

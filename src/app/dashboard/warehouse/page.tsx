import React from 'react';
import HeaderActions from './_components/HeaderActions';
import StatCard from './_components/StatCard';
import WarehouseInventory from './_components/WarehouseInventory';
import CapacityUsage from './_components/CapacityUsage';
import WarehouseStorage from './_components/WarehouseStorage';
import PackageStatus from './_components/PackageStatus';
import WarehouseMap from './_components/WarehouseMap';
import ActivityLog from './_components/ActivityLog';
import { inventoryStats } from '@/data/warehouse';

export default function WarehousePage() {
  return (
    <div className="flex flex-col w-full h-full pb-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Warehouse</h1>
          <div className="text-sm">
            <span className="text-indigo-600 font-medium">Dashboard</span>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-500">Warehouse</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <HeaderActions />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-6">
        
        {/* Left Column Wrapper */}
        <div className="contents xl:flex xl:flex-col xl:w-[calc(75%-12px)] gap-6">
          
          {/* Top Row (StatCards & Inventory) */}
          <div className="order-1 md:col-span-2 flex flex-col xl:flex-row gap-6">
            <div className="xl:w-1/3 grid grid-cols-3 xl:flex xl:flex-col gap-3 md:gap-4 sm:gap-6 pb-2 sm:pb-0 h-27.5 sm:h-auto xl:h-70">
              <StatCard title="Total SKU" data={inventoryStats.totalSku} />
              <StatCard title="Quantity on Hand" data={inventoryStats.quantityOnHand} unit="units" />
              <StatCard title="Capacity Usage" data={inventoryStats.capacityUsage} unit="Full" />
            </div>
            <div className="xl:w-2/3 h-auto md:h-70 w-full flex flex-col">
              <WarehouseInventory />
            </div>
          </div>

          {/* Storage */}
          <div className="order-4 md:col-span-2 flex flex-col h-full">
            <WarehouseStorage />
          </div>

          {/* Map */}
          <div className="order-5 md:col-span-2 flex-1 flex flex-col h-full">
            <WarehouseMap />
          </div>

        </div>

        {/* Right Column Wrapper */}
        <div className="contents xl:flex xl:flex-col xl:w-[calc(25%-12px)] gap-6">
          
          {/* Capacity Usage */}
          <CapacityUsage className="order-2 md:col-span-1 h-74.5" />
          
          {/* Package Status */}
          <PackageStatus className="order-3 md:col-span-1 md:h-74.5 xl:h-auto" />
          
          {/* Activity Log */}
          <div className="order-6 md:col-span-2 xl:flex-1 flex">
            <ActivityLog />
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { RoadFreightIcon, RailFreightIcon, OceanFreightIcon, AirFreightIcon } from '@/components/icons/WarehouseIcons';

const actions = [
  { id: 'road', label: 'Road Freight', Icon: RoadFreightIcon },
  { id: 'rail', label: 'Rail Freight', Icon: RailFreightIcon },
  { id: 'ocean', label: 'Ocean Freight', Icon: OceanFreightIcon },
  { id: 'air', label: 'Air Freight', Icon: AirFreightIcon },
];

export default function HeaderActions() {
  const [active, setActive] = useState('road');

  return (
    <div className="flex items-center justify-between md:justify-start w-full md:w-auto bg-[#F3F4F6] md:bg-transparent p-1 md:p-0 rounded-2xl md:rounded-none md:gap-2">
      {actions.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 md:px-4 md:py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#333333] text-white flex-1 md:flex-none'
                : 'bg-transparent text-gray-500 hover:bg-gray-200 md:hover:bg-gray-100 flex-1 md:flex-none'
            }`}
          >
            <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            <span className={isActive ? 'block' : 'hidden md:block'}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

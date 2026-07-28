"use client";

import { Search, Plus, Minus, Truck } from "lucide-react";
import { liveTrackingData } from "@/data/dashboard";

export default function LiveTracking() {
  return (
    <div className="flex h-110.75 flex-col overflow-hidden rounded-[20px] bg-white p-6 shadow-[0px_2px_10px_rgba(0,0,0,0.02)]">
      
      {/* Outer Map Box */}
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-[#F4F4F5]">
        
        {/* Layer 1: Base Map Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80" 
          style={{ backgroundImage: "url('/images/map-bg.png')" }} 
        />

        {/* Layer 2: Route Line & Icon */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {/* Left Segment: Black Line */}
            <line 
              x1="-5%" y1="41%" 
              x2="50%" y2="33%" 
              stroke="#333333" 
              strokeWidth="4" 
            />
            {/* Right Segment: Purple Line */}
            <line 
              x1="50%" y1="33%" 
              x2="105%" y2="25%" 
              stroke="#856DF3" 
              strokeWidth="6" 
            />
          </svg>

          {/* Center Track Icon EXACTLY at the connection point (50%, 33%) */}
          <div 
            className="absolute -translate-x-1/2 -translate-y-1/2" 
            style={{ left: '50%', top: '33%' }}
          >
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_1_16290)">
                <rect x="34.2417" y="10.9963" width="24.2955" height="24.2955" rx="12.1477" transform="rotate(73.095 34.2417 10.9963)" fill="#856DF3"/>
                <rect x="34.9077" y="9.7487" width="26.2955" height="26.2955" rx="13.1477" transform="rotate(73.095 34.9077 9.7487)" stroke="#E3DDFF" strokeWidth="2"/>
                <path d="M19.2488 20.8722C18.3231 20.7151 17.7164 21.7999 18.3378 22.5038C19.7998 24.1601 21.5223 26.0999 22.2226 26.888C22.4256 27.1165 22.5121 27.4215 22.4606 27.7228C22.2723 28.8242 21.8045 31.6334 21.5311 33.9116C21.4252 34.7939 22.4215 35.2615 23.0667 34.6505L33.371 24.8923C33.9697 24.3253 33.6636 23.3182 32.8507 23.1803L19.2488 20.8722Z" fill="#FEFEFE"/>
              </g>
              <defs>
                <filter id="filter0_d_1_16290" x="-1.00391" y="-1.00372" width="54.3105" height="54.3104" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="6"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.27451 0 0 0 0 0.27451 0 0 0 0.4 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_16290"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_16290" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Layer 3: Top UI Controls */}
        <div className="relative z-10 flex items-start justify-between p-4">
          <div className="flex h-10 w-55 items-center gap-2 rounded-full bg-white px-4 shadow-sm border border-gray-100/50">
            <Search className="h-4 w-4 shrink-0 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Shipping ID..." 
              className="w-full bg-transparent text-[12px] font-medium text-[#333333] outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col overflow-hidden rounded-lg border border-gray-100/50 bg-white shadow-sm">
            <button className="flex h-8 w-8 items-center justify-center border-b border-gray-100 text-[#757575] hover:bg-gray-50">
              <Plus className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center text-[#757575] hover:bg-gray-50">
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Layer 4: Floating Details Card */}
        <div className="relative z-10 m-4 rounded-2xl bg-white p-5 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] mt-auto">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-[15px] font-bold text-[#333333]">{liveTrackingData.shippingId}</span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EBE7FE] px-2 py-0.5 text-[11px] font-bold text-[#856DF3]">
                  {liveTrackingData.status}
                </span>
                <span className="text-[11px] font-medium text-[#757575]">
                  {liveTrackingData.schedule}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-medium text-[#A3A3A3]">Courier:</span>
              <span className="text-[13px] font-bold text-[#333333]">{liveTrackingData.courierName}</span>
              <span className="text-[11px] font-medium text-[#757575]">{liveTrackingData.courierCompany}</span>
            </div>
          </div>

          {/* Card Progress Line */}
          <div className="relative mb-3 mt-6 flex h-7 w-full items-center">
            
            {/* Left Circle (Origin) */}
            <div className="absolute left-0 top-1/2 z-10 flex h-4.5 w-4.5 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] border-[#856DF3] bg-white shadow-sm">
              <div className="h-1.75 w-1.75 rounded-full bg-[#856DF3]" />
            </div>
            
            {/* Line Wrapper*/}
            <div className="absolute left-2.25 right-2.25 top-1/2 -translate-y-1/2">
              <div className="absolute left-0 top-0 h-0.75 w-full rounded-full bg-gray-200" />
              <div className="absolute left-0 top-0 h-0.75 w-[65%] rounded-full bg-[#856DF3]" />
              
              {/* Truck Icon */}
              <div className="absolute left-[65%] top-1/2 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#856DF3] shadow-[0_2px_8px_rgba(133,109,243,0.4)]">
                <Truck className="h-3.5 w-3.5 text-white" />
              </div>
            </div>

            {/* Right Circle (Destination) */}
            <div className="absolute right-0 top-1/2 z-10 h-4.5 w-4.5 -translate-y-1/2 rounded-full border-[2.5px] border-gray-200 bg-white" />
          </div>

          {/* Locations & Dates */}
          <div className="mt-4 flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#333333]">{liveTrackingData.origin.city}</span>
              <span className="mt-0.5 text-[11px] font-medium text-[#A3A3A3]">{liveTrackingData.origin.date}</span>
            </div>
            
            <div className="flex flex-col text-right">
              <span className="text-[13px] font-bold text-[#333333]">{liveTrackingData.destination.city}</span>
              <span className="mt-0.5 text-[11px] font-medium text-[#A3A3A3]">{liveTrackingData.destination.date}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
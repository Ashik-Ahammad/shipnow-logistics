"use client";

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Shipment, addShipment } from "@/data/shipments";

const countryCodes = [
  { code: 'us', flag: '🇺🇸', dial: '+1' },
  { code: 'bd', flag: '🇧🇩', dial: '+880' },
  { code: 'ind', flag: '🇮🇳', dial: '+91' },
  { code: 'uk', flag: '🇬🇧', dial: '+44' },
  { code: 'de', flag: '🇩🇪', dial: '+49' },
  { code: 'cn', flag: '🇨🇳', dial: '+86' },
  { code: 'ru', flag: '🇷🇺', dial: '+7' },
  { code: 'tr', flag: '🇹🇷', dial: '+90' }
];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function CountrySelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  const selected = countryCodes.find(c => c.code === value) || countryCodes[0];

  return (
    <div className="relative h-full flex-shrink-0" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-full items-center gap-1.5 bg-transparent px-3 py-2.5 cursor-pointer"
      >
        <span className="text-[14px] leading-none">{selected.flag}</span>
        <span className="text-[13px] font-medium text-gray-600">{selected.dial}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-400 ml-0.5" />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-40 rounded-xl bg-white p-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 z-10">
          {countryCodes.map(c => (
            <div 
              key={c.code}
              onClick={() => { onChange(c.code); setIsOpen(false); }}
              className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F9F9FC] rounded-lg cursor-pointer transition-colors"
            >
              <span className="text-[14px] leading-none">{c.flag}</span>
              <span className="text-[13px] font-medium text-gray-600">{c.dial}</span>
              <span className="text-[11px] font-semibold text-gray-400 uppercase ml-auto">{c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CreateShipmentPage() {
  const router = useRouter();
  
  const [freightType, setFreightType] = useState("Road Freight");
  const [services, setServices] = useState<string[]>(["Insurance Coverage", "Temperature Control", "Signature on Delivery"]);
  const [notify, setNotify] = useState(true);
  
  const [senderCountry, setSenderCountry] = useState("us");
  const [recipientCountry, setRecipientCountry] = useState("us");

  const toggleService = (service: string) => {
    setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const pickupAddress = formData.get("pickupAddress") as string;
    const deliveryAddress = formData.get("deliveryAddress") as string;
    
    const origin = pickupAddress.split(',')[1]?.trim() || pickupAddress.split(' ')[0] || "Unknown";
    const destination = deliveryAddress.split(',')[1]?.trim() || deliveryAddress.split(' ')[0] || "Unknown";

    const newShipment: Shipment = {
      id: `#SH${Math.floor(1000000 + Math.random() * 9000000)}`,
      freightType: freightType,
      company: {
        name: formData.get("recipientCompany") as string,
        category: "General",
        logoColor: "bg-[#856DF3]",
      },
      carrier: formData.get("carrier") as string,
      productCategory: formData.get("itemDescription") as string,
      weight: `${formData.get("weight")} ${formData.get("units")}`,
      route: {
        origin,
        destination
      },
      dates: {
        atd: "Pending",
        eta: formData.get("shipmentDate") as string,
      },
      progress: 0,
      status: "Pending",
    };

    addShipment(newShipment);
    router.push("/dashboard/shipments");
  };

  const inputClass = "w-full rounded-lg bg-white px-4 py-2.5 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all placeholder:text-gray-400 placeholder:font-normal";
  const grayInputClass = "w-full rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all placeholder:text-gray-400 placeholder:font-normal";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full p-6 w-full">
      <style dangerouslySetInnerHTML={{__html: `
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}} />

      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <button 
            type="button"
            onClick={() => router.back()}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer -ml-1"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-[22px] font-bold text-gray-900">Create New Shipment</h1>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-[#856DF3] font-medium ml-8">
          <span>Dashboard</span>
          <span className="text-gray-400 font-normal">/</span>
          <span>Shipments</span>
          <span className="text-gray-400 font-normal">/</span>
          <span className="text-gray-500 font-normal">Create New Shipment</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="flex flex-col rounded-[20px] bg-white p-6 tablet:p-8 shadow-sm">
        <h2 className="text-[15px] font-bold text-gray-900 mb-6">Shipment Form</h2>

        {/* Sender & Recipient Grid */}
        <div className="rounded-[16px] bg-[#F9F9FC] p-6 border border-gray-50 mb-8 relative">
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-12 relative">
            
            {/* Vertical Divider */}
            <div className="hidden desktop:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
            
            {/* Sender Info */}
            <div className="flex flex-col">
              <h3 className="text-[13px] font-bold text-gray-900 mb-5">Sender Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Company</label>
                  <input 
                    type="text" 
                    name="senderCompany"
                    required
                    placeholder="GreenHaven"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      name="senderEmail"
                      required
                      placeholder="logistics@greenhaven.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Phone Number</label>
                    <div className="flex items-center rounded-lg bg-white h-[42px] focus-within:ring-1 focus-within:ring-[#856DF3] focus-within:border-[#856DF3] border border-transparent transition-all">
                      <CountrySelect value={senderCountry} onChange={setSenderCountry} />
                      <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0" />
                      <input 
                        type="text" 
                        name="senderPhone"
                        required
                        placeholder="408-555-7210"
                        className="flex-1 bg-transparent px-3 py-2.5 text-[13px] font-medium text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Pickup Address</label>
                  <input 
                    type="text" 
                    name="pickupAddress"
                    required
                    placeholder="1120 Birch Street, Portland, OR 97205, USA"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Recipient Info */}
            <div className="flex flex-col">
              <h3 className="text-[13px] font-bold text-gray-900 mb-5">Recipient Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Company</label>
                  <input 
                    type="text" 
                    name="recipientCompany"
                    required
                    placeholder="FreshNest"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      name="recipientEmail"
                      required
                      placeholder="warehouse@freshnest.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Phone Number</label>
                    <div className="flex items-center rounded-lg bg-white h-[42px] focus-within:ring-1 focus-within:ring-[#856DF3] focus-within:border-[#856DF3] border border-transparent transition-all">
                      <CountrySelect value={recipientCountry} onChange={setRecipientCountry} />
                      <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0" />
                      <input 
                        type="text" 
                        name="recipientPhone"
                        required
                        placeholder="786-555-4432"
                        className="flex-1 bg-transparent px-3 py-2.5 text-[13px] font-medium text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Delivery Address</label>
                  <input 
                    type="text" 
                    name="deliveryAddress"
                    required
                    placeholder="Street address, city, state/province, ZIP code"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-8" />

        <div className="grid grid-cols-1 desktop:grid-cols-[380px_1fr] gap-8 desktop:gap-12 relative mb-8">
          
          {/* Vertical Divider */}
          <div className="hidden desktop:block absolute left-[380px] top-0 bottom-0 w-px bg-gray-100" style={{ transform: 'translateX(24px)' }} />

          {/* Package Details (Left Column) */}
          <div className="flex flex-col">
            <h3 className="text-[13px] font-bold text-gray-900 mb-5">Package Details</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Item Description</label>
                <input 
                  type="text" 
                  name="itemDescription"
                  required
                  placeholder="Premium Garden Tool Set"
                  className={grayInputClass}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Quantity</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      name="quantity"
                      required
                      placeholder="40"
                      className={grayInputClass}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <ChevronUp className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" />
                      <ChevronDown className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Value</label>
                  <input 
                    type="text" 
                    name="value"
                    required
                    placeholder="$3,200"
                    className={grayInputClass}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Weight</label>
                  <input 
                    type="number" 
                    name="weight"
                    required
                    placeholder="125"
                    className={grayInputClass}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Units</label>
                  <div className="relative">
                    <select name="units" required className="w-full appearance-none rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all cursor-pointer">
                      <option value="Kg">Kg</option>
                      <option value="Lbs">Lbs</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Dimensions</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="length"
                        required
                        placeholder="80"
                        className={cn(grayInputClass, "pl-4 pr-10")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400">cm</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Length</p>
                  </div>
                  <div>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="width"
                        required
                        placeholder="60"
                        className={cn(grayInputClass, "pl-4 pr-10")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400">cm</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Width</p>
                  </div>
                  <div>
                    <div className="relative">
                      <input 
                        type="number" 
                        name="height"
                        required
                        placeholder="ex. 20"
                        className={cn(grayInputClass, "pl-4 pr-10")}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400">cm</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Height</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Details (Right Column) */}
          <div className="flex flex-col">
            <h3 className="text-[13px] font-bold text-gray-900 mb-5">Shipping Details</h3>
            
            <div className="mb-6">
              <label className="block text-[11px] font-medium text-gray-500 mb-3">Freight Type</label>
              <div className="flex flex-wrap gap-8">
                {["Road Freight", "Rail Freight", "Ocean Freight", "Air Freight"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer" onClick={() => setFreightType(type)}>
                    <div className={cn("flex h-3.5 w-3.5 items-center justify-center rounded-full border", freightType === type ? "border-[#856DF3] bg-white" : "border-gray-300 bg-white")}>
                      {freightType === type && <div className="h-1.5 w-1.5 rounded-full bg-[#856DF3]" />}
                    </div>
                    <span className={cn("text-[12px] font-medium", freightType === type ? "text-gray-900" : "text-gray-500")}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Carrier</label>
                <div className="relative">
                  <select name="carrier" required className="w-full appearance-none rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all cursor-pointer">
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="DHL">DHL</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Shipping Method</label>
                <div className="relative">
                  <select name="shippingMethod" required defaultValue="" className="w-full appearance-none rounded-lg bg-[#F9F9FC] px-4 py-2.5 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all cursor-pointer invalid:text-gray-400 invalid:font-normal">
                    <option value="" disabled hidden>Select Method</option>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Shipment ID</label>
                <input 
                  type="text" 
                  placeholder="#SH9583742"
                  disabled
                  className="w-full rounded-lg bg-gray-100/50 px-4 py-2.5 text-[13px] font-medium text-gray-400 outline-none cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 mt-1.5">Auto-generated</p>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Shipment Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="shipmentDate"
                    required
                    className={cn(grayInputClass, "pr-10")}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Notes</label>
              <textarea 
                name="notes"
                placeholder="Add special delivery notes (optional)"
                rows={3}
                className="w-full rounded-lg bg-[#F9F9FC] px-4 py-3 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all resize-none placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            {/* Horizontal Divider inside Right Column */}
            <div className="h-px w-full bg-gray-100 my-8" />

            {/* Footer Area with Checks and Toggles */}
            <div className="flex flex-col tablet:flex-row justify-between gap-6">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-3">Additional Services</label>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-y-3 gap-x-8">
                  {["Insurance Coverage", "Temperature Control", "Signature on Delivery", "Fragile Item Handling"].map((service) => {
                    const isActive = services.includes(service);
                    return (
                      <label key={service} className="flex items-center gap-2 cursor-pointer group" onClick={() => toggleService(service)}>
                        <div className={cn("flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors", isActive ? "bg-[#856DF3] border-[#856DF3]" : "bg-[#F9F9FC] border-gray-200 group-hover:border-[#856DF3]")}>
                          {isActive && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <span className="text-[12px] font-medium text-gray-700">{service}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-3">Tracking & Status Updates</label>
                <div className="flex items-center gap-2">
                  <div 
                    className={cn("flex h-[22px] w-[40px] items-center rounded-full p-[3px] cursor-pointer transition-colors", notify ? "bg-[#856DF3]" : "bg-gray-300")}
                    onClick={() => setNotify(!notify)}
                  >
                    <div className={cn("h-4 w-4 rounded-full bg-white shadow-sm transition-transform", notify ? "translate-x-[18px]" : "translate-x-0")} />
                  </div>
                  <span className="text-[12px] font-medium text-gray-700">Notify Recipient via Email/SMS</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
          <button type="button" onClick={() => router.back()} className="rounded-xl bg-[#F9F9FC] px-6 py-3.5 text-[13px] font-semibold text-gray-600 transition-colors hover:bg-gray-100 cursor-pointer">
            Delete Form
          </button>
          <button type="submit" className="rounded-xl bg-[#232323] px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-black cursor-pointer">
            Submit Shipment
          </button>
        </div>

      </div>
    </form>
  );
}

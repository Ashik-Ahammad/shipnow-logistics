"use client";

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Shipment, addShipment } from "@/data/shipments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  senderCompany: z.string().min(1, "Sender company is required"),
  senderEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  senderPhone: z.string().min(1, "Phone number is required"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  recipientCompany: z.string().min(1, "Recipient company is required"),
  recipientEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  recipientPhone: z.string().min(1, "Phone number is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  itemDescription: z.string().min(1, "Item description is required"),
  quantity: z.number({ message: "Quantity must be a number" }).min(1, "Must be at least 1"),
  value: z.string().min(1, "Value is required"),
  weight: z.number({ message: "Weight must be a number" }).min(0.1, "Invalid weight"),
  units: z.string().min(1, "Units required"),
  length: z.number({ message: "Required" }).min(0.1, "Invalid"),
  width: z.number({ message: "Required" }).min(0.1, "Invalid"),
  height: z.number({ message: "Required" }).min(0.1, "Invalid"),
  carrier: z.string().min(1, "Carrier is required"),
  shippingMethod: z.string().min(1, "Shipping method is required"),
  shipmentDate: z.string().min(1, "Shipment date is required"),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: "Kg",
      carrier: "",
      shippingMethod: ""
    }
  });

  const quantity = watch("quantity");

  const toggleService = (service: string) => {
    setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  const onSubmit = (data: FormValues) => {
    const origin = data.pickupAddress.split(',')[1]?.trim() || data.pickupAddress.split(' ')[0] || "Unknown";
    const destination = data.deliveryAddress.split(',')[1]?.trim() || data.deliveryAddress.split(' ')[0] || "Unknown";

    const newShipment: Shipment = {
      id: `#SH${Math.floor(1000000 + Math.random() * 9000000)}`,
      freightType: freightType,
      company: {
        name: data.recipientCompany,
        category: "General",
        logoColor: "bg-[#856DF3]",
      },
      carrier: data.carrier,
      productCategory: data.itemDescription,
      weight: `${data.weight} ${data.units}`,
      route: {
        origin,
        destination
      },
      dates: {
        atd: "Pending",
        eta: data.shipmentDate,
      },
      progress: 0,
      status: "Pending",
    };

    addShipment(newShipment);
    router.push("/dashboard/shipments");
  };

  const getInputClass = (error: any, isGray = false) => {
    const base = `w-full rounded-lg ${isGray ? 'bg-[#F9F9FC]' : 'bg-white'} px-4 py-2.5 text-[13px] font-medium text-gray-900 outline-none border transition-all placeholder:text-gray-400 placeholder:font-normal`;
    if (error) {
      return cn(base, "border-red-500 focus:ring-1 focus:ring-red-500");
    }
    return cn(base, "border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3]");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 h-full p-6 w-full">
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
                    placeholder="GreenHaven"
                    className={getInputClass(errors.senderCompany)}
                    {...register("senderCompany")}
                  />
                  {errors.senderCompany && <p className="mt-1 text-[10px] text-red-500">{errors.senderCompany.message}</p>}
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      placeholder="logistics@greenhaven.com"
                      className={getInputClass(errors.senderEmail)}
                      {...register("senderEmail")}
                    />
                    {errors.senderEmail && <p className="mt-1 text-[10px] text-red-500">{errors.senderEmail.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Phone Number</label>
                    <div className={cn("flex items-center rounded-lg bg-white h-[42px] focus-within:ring-1 border transition-all", errors.senderPhone ? "border-red-500 focus-within:ring-red-500" : "border-transparent focus-within:ring-[#856DF3] focus-within:border-[#856DF3]")}>
                      <CountrySelect value={senderCountry} onChange={setSenderCountry} />
                      <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0" />
                      <input 
                        type="text" 
                        placeholder="408-555-7210"
                        className="flex-1 bg-transparent px-3 py-2.5 text-[13px] font-medium text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal w-full"
                        {...register("senderPhone")}
                      />
                    </div>
                    {errors.senderPhone && <p className="mt-1 text-[10px] text-red-500">{errors.senderPhone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Pickup Address</label>
                  <input 
                    type="text" 
                    placeholder="1120 Birch Street, Portland, OR 97205, USA"
                    className={getInputClass(errors.pickupAddress)}
                    {...register("pickupAddress")}
                  />
                  {errors.pickupAddress && <p className="mt-1 text-[10px] text-red-500">{errors.pickupAddress.message}</p>}
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
                    placeholder="FreshNest"
                    className={getInputClass(errors.recipientCompany)}
                    {...register("recipientCompany")}
                  />
                  {errors.recipientCompany && <p className="mt-1 text-[10px] text-red-500">{errors.recipientCompany.message}</p>}
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      placeholder="warehouse@freshnest.com"
                      className={getInputClass(errors.recipientEmail)}
                      {...register("recipientEmail")}
                    />
                    {errors.recipientEmail && <p className="mt-1 text-[10px] text-red-500">{errors.recipientEmail.message}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Phone Number</label>
                    <div className={cn("flex items-center rounded-lg bg-white h-[42px] focus-within:ring-1 border transition-all", errors.recipientPhone ? "border-red-500 focus-within:ring-red-500" : "border-transparent focus-within:ring-[#856DF3] focus-within:border-[#856DF3]")}>
                      <CountrySelect value={recipientCountry} onChange={setRecipientCountry} />
                      <div className="w-px h-5 bg-gray-200 mx-1 flex-shrink-0" />
                      <input 
                        type="text" 
                        placeholder="786-555-4432"
                        className="flex-1 bg-transparent px-3 py-2.5 text-[13px] font-medium text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-normal w-full"
                        {...register("recipientPhone")}
                      />
                    </div>
                    {errors.recipientPhone && <p className="mt-1 text-[10px] text-red-500">{errors.recipientPhone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Delivery Address</label>
                  <input 
                    type="text" 
                    placeholder="Street address, city, state/province, ZIP code"
                    className={getInputClass(errors.deliveryAddress)}
                    {...register("deliveryAddress")}
                  />
                  {errors.deliveryAddress && <p className="mt-1 text-[10px] text-red-500">{errors.deliveryAddress.message}</p>}
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
                  placeholder="Premium Garden Tool Set"
                  className={getInputClass(errors.itemDescription, true)}
                  {...register("itemDescription")}
                />
                {errors.itemDescription && <p className="mt-1 text-[10px] text-red-500">{errors.itemDescription.message}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Quantity</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="40"
                      className={getInputClass(errors.quantity, true)}
                      {...register("quantity", { valueAsNumber: true })}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <ChevronUp 
                        className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" 
                        onClick={() => setValue("quantity", (quantity || 0) + 1)}
                      />
                      <ChevronDown 
                        className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" 
                        onClick={() => setValue("quantity", Math.max(0, (quantity || 0) - 1))}
                      />
                    </div>
                  </div>
                  {errors.quantity && <p className="mt-1 text-[10px] text-red-500">{errors.quantity.message}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Value</label>
                  <input 
                    type="text" 
                    placeholder="$3,200"
                    className={getInputClass(errors.value, true)}
                    {...register("value")}
                  />
                  {errors.value && <p className="mt-1 text-[10px] text-red-500">{errors.value.message}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Weight</label>
                  <input 
                    type="number" 
                    placeholder="125"
                    className={getInputClass(errors.weight, true)}
                    {...register("weight", { valueAsNumber: true })}
                  />
                  {errors.weight && <p className="mt-1 text-[10px] text-red-500">{errors.weight.message}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Units</label>
                  <div className="relative">
                    <select 
                      className={cn(getInputClass(errors.units, true), "appearance-none cursor-pointer")}
                      {...register("units")}
                    >
                      <option value="Kg">Kg</option>
                      <option value="Lbs">Lbs</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.units && <p className="mt-1 text-[10px] text-red-500">{errors.units.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Dimensions</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="80"
                        className={cn(getInputClass(errors.length, true), "pl-4 pr-10")}
                        {...register("length", { valueAsNumber: true })}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400">cm</span>
                    </div>
                    {errors.length && <p className="mt-1 text-[10px] text-red-500">Required</p>}
                    {!errors.length && <p className="text-[10px] text-gray-400 mt-1.5">Length</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="60"
                        className={cn(getInputClass(errors.width, true), "pl-4 pr-10")}
                        {...register("width", { valueAsNumber: true })}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400">cm</span>
                    </div>
                    {errors.width && <p className="mt-1 text-[10px] text-red-500">Required</p>}
                    {!errors.width && <p className="text-[10px] text-gray-400 mt-1.5">Width</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <input 
                        type="number" 
                        placeholder="ex. 20"
                        className={cn(getInputClass(errors.height, true), "pl-4 pr-10")}
                        {...register("height", { valueAsNumber: true })}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-gray-400">cm</span>
                    </div>
                    {errors.height && <p className="mt-1 text-[10px] text-red-500">Required</p>}
                    {!errors.height && <p className="text-[10px] text-gray-400 mt-1.5">Height</p>}
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
                  <select 
                    className={cn(getInputClass(errors.carrier, true), "appearance-none cursor-pointer invalid:text-gray-400 invalid:font-normal")}
                    {...register("carrier")}
                  >
                    <option value="" disabled hidden>Select Carrier</option>
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="DHL">DHL</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                </div>
                {errors.carrier && <p className="mt-1 text-[10px] text-red-500">{errors.carrier.message}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Shipping Method</label>
                <div className="relative">
                  <select 
                    className={cn(getInputClass(errors.shippingMethod, true), "appearance-none cursor-pointer invalid:text-gray-400 invalid:font-normal")}
                    {...register("shippingMethod")}
                  >
                    <option value="" disabled hidden>Select Method</option>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                </div>
                {errors.shippingMethod && <p className="mt-1 text-[10px] text-red-500">{errors.shippingMethod.message}</p>}
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
                    className={cn(getInputClass(errors.shipmentDate, true), "pr-10")}
                    {...register("shipmentDate")}
                  />
                </div>
                {errors.shipmentDate && <p className="mt-1 text-[10px] text-red-500">{errors.shipmentDate.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1.5">Notes</label>
              <textarea 
                placeholder="Add special delivery notes (optional)"
                rows={3}
                className="w-full rounded-lg bg-[#F9F9FC] px-4 py-3 text-[13px] font-medium text-gray-900 outline-none border border-transparent focus:border-[#856DF3] focus:ring-1 focus:ring-[#856DF3] transition-all resize-none placeholder:text-gray-400 placeholder:font-normal"
                {...register("notes")}
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

"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface SidebarProps {
  onMobileClose?: () => void;
}

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: "/icons/dashboard.svg" },
  { name: "Analytics", href: "/dashboard/analytics", icon: "/icons/analytics.svg" },
  { name: "Calendar", href: "/dashboard/calendar", icon: "/icons/calendar.svg" },
  { name: "Shipments", href: "/dashboard/shipments", icon: "/icons/shipments.svg" },
  { name: "Tracking", href: "/dashboard/tracking", icon: "/icons/tracking.svg" },
  { name: "Warehouse", href: "/dashboard/warehouse", icon: "/icons/warehouse.svg" },
  { name: "Fleets", href: "/dashboard/fleets", icon: "/icons/fleets.svg" },
  { name: "Drivers", href: "/dashboard/drivers", icon: "/icons/drivers.svg" },
  { name: "Invoices & Billing", href: "/dashboard/invoices", icon: "/icons/invoice.svg" },
];

const bottomNav = [
  { name: "Message", href: "/messages", icon: "/icons/message.svg", badge: 19 },
  { name: "Notification", href: "/notifications", icon: "/icons/notification.svg", badge: 5 },
  { name: "Settings", href: "/settings", icon: "/icons/settings.svg" },
];

const inactiveFilter =
  "brightness(0) saturate(100%) invert(49%) sepia(3%) saturate(12%) hue-rotate(320deg) brightness(97%) contrast(86%)";
const activeFilter =
  "brightness(0) saturate(100%) invert(12%) sepia(80%) saturate(4156%) hue-rotate(255deg) brightness(87%) contrast(109%)";

export default function Sidebar({ onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    router.push("/");
  };

  return (
    <div className="flex h-full w-22.5 flex-col border-r border-gray-100 bg-white transition-all duration-300 desktop:w-65">
      <div className="flex h-22 items-center justify-center gap-[8.7px] px-0 desktop:justify-start desktop:px-6">
        <Image
          src="/images/shipnowBlueLogo.png"
          alt="ShipNow Logo"
          width={28}
          height={28}
          className="object-contain"
          priority
        />
        <span className="hidden font-nunito text-[19.13px] font-black italic tracking-wide text-[#333333] desktop:block">
          SHIPNOW
        </span>
      </div>

      <div className="mb-6 px-3 desktop:px-6 relative" ref={profileRef}>
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg p-2 transition-colors bg-[#F0F0F0] desktop:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#F0F0F0]">
              <Image
                src="/images/MrJohnDoe.png"
                alt="John Doe"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden text-left desktop:block">
              <p className="text-sm font-bold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <ChevronDown className={cn("hidden h-4 w-4 text-[#333333] desktop:block mr-2 transition-transform", isProfileOpen && "rotate-180")} />
        </button>

        {isProfileOpen && (
          <div className="absolute top-full left-3 right-3 desktop:left-6 desktop:right-6 mt-1.5 rounded-xl bg-white p-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 z-50">
            <div className="px-3 py-2 border-b border-gray-100 mb-1 hidden tablet:block desktop:hidden text-center">
              <p className="text-[13px] font-bold text-gray-900">John Doe</p>
              <p className="text-[11px] text-gray-500">Admin</p>
            </div>
            <button onClick={() => setIsProfileOpen(false)} className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-[#F9F9FC] rounded-lg transition-colors cursor-pointer">
              <User className="w-4 h-4 text-gray-500" />
              My Profile
            </button>
            <button onClick={() => setIsProfileOpen(false)} className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-[#F9F9FC] rounded-lg transition-colors cursor-pointer">
              <Settings className="w-4 h-4 text-gray-500" />
              Account Settings
            </button>
            <div className="my-1 h-px w-full bg-gray-100" />
            <button onClick={handleLogout} className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
              <LogOut className="w-4 h-4 text-red-500" />
              Log Out
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden desktop:px-4">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center justify-center gap-3 rounded-lg px-2 py-3 text-sm font-medium transition-colors desktop:justify-start desktop:px-4",
                isActive
                  ? "bg-[#2A1298]/10 text-[#2A1298]"
                  : "text-[#757575] hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={20}
                height={20}
                className="shrink-0"
                style={{ filter: isActive ? activeFilter : inactiveFilter }}
              />
              <span className="hidden desktop:block">{item.name}</span>
            </Link>
          );
        })}

        <div className="my-4 h-px w-full bg-gray-100" />

        {bottomNav.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center justify-center rounded-lg px-2 py-3 text-sm font-medium transition-colors desktop:justify-between desktop:px-4",
                isActive
                  ? "bg-[#2A1298]/10 text-[#2A1298]"
                  : "text-[#757575] hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="shrink-0"
                    style={{ filter: isActive ? activeFilter : inactiveFilter }}
                  />
                  {item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2A1298] desktop:hidden" />
                  )}
                </div>
                <span className="hidden desktop:block text-[14px] font-semibold">{item.name}</span>
              </div>
              
              {item.badge && (
                <span className="hidden h-5 min-w-5 items-center justify-center rounded-full bg-[#856DF3] px-1.5 text-[10px] font-bold text-white desktop:flex">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="hidden p-6 desktop:block">
        <div className="relative overflow-hidden rounded-[20px] bg-[#292929] p-5 text-white shadow-lg">
          <div className="absolute -right-3 -top-1 h-22.5 w-22.5">
            <Image
              src="/images/shipnowDarkIcon.png"
              alt="Background Pattern"
              fill
              className="object-contain opacity-90"
            />
          </div>
          <h4 className="relative z-10 mb-2 text-[18px] font-bold leading-tight">
            Loving <br /> ShipNow <br /> Free?
          </h4>
          <p className="relative z-10 mb-5 pr-4 text-[12px] leading-4.5 text-[#A3A3A3]">
            Go Pro to access priority support, real-time tracking, and full analytics.
          </p>
          <button className="relative z-10 w-full cursor-pointer rounded-[10px] bg-white py-2.5 text-[14px] font-bold text-[#333333] transition-colors hover:bg-gray-100">
            Go Pro Today
          </button>
        </div>
      </div>
    </div>
  );
}
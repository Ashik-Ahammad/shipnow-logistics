export interface ShipmentTypeBreakdown {
  label: string;
  percentage: string;
  count: string;
  bgColor: string;
  textColor: string;
}

export interface ShipmentTypeData {
  total: string;
  breakdown: ShipmentTypeBreakdown[];
}

export interface AlertSummary {
  count: number;
  label: string;
  bgColor: string;
}

export interface AlertItem {
  id: string;
  title: string;
  type: string;
  date: string;
  icon: string;
}

export interface ShipmentAlertsData {
  totalDelays: number;
  summary: AlertSummary[];
  list: AlertItem[];
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  hasLine: boolean;
}

// Data Export 
export const shipmentTypeData: ShipmentTypeData = {
  total: "2,500",
  breakdown: [
    {
      label: "Road Freight",
      percentage: "46%",
      count: "1,150",
      bgColor: "bg-[#856DF3]",
      textColor: "text-white",
    },
    {
      label: "Ocean Freight",
      percentage: "17%",
      count: "425",
      bgColor: "bg-[#757575]",
      textColor: "text-white",
    },
    {
      label: "Air Freight",
      percentage: "28%",
      count: "700",
      bgColor: "bg-[#333333]",
      textColor: "text-white",
    },
    {
      label: "Rail Freight",
      percentage: "9%",
      count: "225",
      bgColor: "bg-[#E5E7EB]",
      textColor: "text-[#757575]",
    },
  ],
};

export const shipmentAlertsData: ShipmentAlertsData = {
  totalDelays: 12,
  summary: [
    {
      count: 5,
      label: "Customs\nClearance\nDelay",
      bgColor: "bg-[#EBE7FE]",
    },
    {
      count: 4,
      label: "Incorrect\nAddress\nProvided",
      bgColor: "bg-[#F0EFFF]",
    },
    {
      count: 3,
      label: "Weather-\nRelated\nHold",
      bgColor: "bg-[#F4F2FF]",
    },
  ],
  list: [
    {
      id: "#SH8743921",
      title: "Customs Clearance Delay",
      type: "Ocean Freight",
      date: "Mar 20",
      icon: "FileText",
    },
    {
      id: "#SH8725810",
      title: "Incorrect Address Provided",
      type: "Road Freight",
      date: "Mar 20",
      icon: "MapPin",
    },
    {
      id: "#SH8790043",
      title: "Weather-Related Hold",
      type: "Air Freight",
      date: "Mar 19",
      icon: "CloudRain",
    },
    {
      id: "#SH8716654",
      title: "Incorrect Address Provided",
      type: "Rail Freight",
      date: "Mar 18",
      icon: "MapPin",
    },
  ],
};

export const recentActivityData: ActivityItem[] = [
  {
    id: 1,
    user: "@TechGuru99",
    action: "submitted a bulk shipment request",
    time: "12:00 PM",
    icon: "FileText",
    iconBg: "bg-[#E3DDFF]",
    iconColor: "text-[#856DF3]",
    hasLine: true,
  },
  {
    id: 2,
    user: "@SupportKen",
    action: "added a priority tag to Order ID 77889JKL",
    time: "11:30 AM",
    icon: "Tag",
    iconBg: "bg-[#E0E0E0]",
    iconColor: "text-[#757575]",
    hasLine: true,
  },
  {
    id: 3,
    user: "@SallyMae88",
    action: "initiated a return process for Order ID 44556GHI",
    time: "11:00 AM",
    icon: "RefreshCcw",
    iconBg: "bg-[#E3DDFF]",
    iconColor: "text-[#856DF3]",
    hasLine: true,
  },
  {
    id: 4,
    user: "@AdminLisa",
    action: "resolved a delivery issue for Order ID 12345XYZ",
    time: "10:15 AM",
    icon: "CheckCircle2",
    iconBg: "bg-[#E0E0E0]",
    iconColor: "text-[#757575]",
    hasLine: false,
  },
];

// ShipmentStatisticItem

export interface ShipmentStatisticItem {
  month: string;
  shipments: number;
}

export const shipmentStatisticData: ShipmentStatisticItem[] = [
  { month: 'Jan', shipments: 1400 },
  { month: 'Feb', shipments: 2000 },
  { month: 'Mar', shipments: 1100 },
  { month: 'Apr', shipments: 1900 },
  { month: 'May', shipments: 3124 },
  { month: 'Jun', shipments: 2600 }, 
  { month: 'Jul', shipments: 3500 },
  { month: 'Aug', shipments: 4200 },
];

// ProfitSummaryItem

export interface ProfitSummaryItem {
  month: string;
  revenue: number;
  cost: number;
}

export const profitSummaryData: ProfitSummaryItem[] = [
  { month: 'Jan', revenue: 45000, cost: 35000 },
  { month: 'Feb', revenue: 35000, cost: 25000 },
  { month: 'Mar', revenue: 50000, cost: 40000 },
  { month: 'Apr', revenue: 70000, cost: 45000 },
  { month: 'May', revenue: 87524, cost: 45680 },
  { month: 'Jun', revenue: 65000, cost: 40000 },
  { month: 'Jul', revenue: 55000, cost: 30000 },
  { month: 'Aug', revenue: 75000, cost: 45000 },
];

// --- productCategoriesData types ---
export interface ProductCategory {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface LiveTrackingData {
  shippingId: string;
  status: string;
  schedule: string;
  courierName: string;
  courierCompany: string;
  origin: {
    city: string;
    date: string;
  };
  destination: {
    city: string;
    date: string;
  };
}

// --- productCategoriesData data  ---
export const productCategoriesData = {
  total: "1,000",
  categories: [
    { name: "Electronics", count: 240, percentage: 24, color: "bg-[#856DF3]" },
    { name: "Home & Kitchen", count: 200, percentage: 20, color: "bg-[#E3DDFF]" },
    { name: "Apparel", count: 180, percentage: 18, color: "bg-[#333333]" },
    { name: "Beauty & Health", count: 140, percentage: 14, color: "bg-[#757575]" },
    { name: "Sports & Outdoors", count: 120, percentage: 12, color: "bg-[#E0E0E0]" },
    { name: "Automotive", count: 120, percentage: 12, color: "bg-[#F0F0F0]" },
  ]
};

export const liveTrackingData: LiveTrackingData = {
  shippingId: "#SH8743921",
  status: "In Transit",
  schedule: "On Schedule",
  courierName: "Daniel Cooper",
  courierCompany: "SkyLogix Express",
  origin: {
    city: "San Francisco, CA, USA",
    date: "Mar 19, 2035 - 10:30 AM",
  },
  destination: {
    city: "New York, NY, USA",
    date: "Mar 23, 2035 - 03:00 PM (estimated)",
  }
};

export interface RecentShipmentItem {
  id: string;
  companyName: string;
  companyIndustry: string;
  carrier: string;
  route: string;
  date: string;
  status: "In Transit" | "Out for Delivery" | "Delivered" | "Processing";
}

export const recentShipmentsData: RecentShipmentItem[] = [
  {
    id: "#SH9283746",
    companyName: "TechGear Inc.",
    companyIndustry: "Electronics",
    carrier: "FedEx",
    route: "Los Angeles, CA → Chicago, IL",
    date: "Mar 20, 2035",
    status: "In Transit",
  },
  {
    id: "#SH9182635",
    companyName: "StyleHub Co.",
    companyIndustry: "Apparel",
    carrier: "DHL",
    route: "New York, NY → Atlanta, GA",
    date: "Mar 19, 2035",
    status: "Out for Delivery",
  },
  {
    id: "#SH9037821",
    companyName: "FreshNest",
    companyIndustry: "Home & Kitchen",
    carrier: "UPS",
    route: "Dallas, TX → Miami, FL",
    date: "Mar 18, 2035",
    status: "Delivered",
  },
  {
    id: "#SH9374652",
    companyName: "FitPlus Gear",
    companyIndustry: "Sports & Outdoors",
    carrier: "USPS",
    route: "Seattle, WA → Denver, CO",
    date: "Mar 21, 2035",
    status: "Processing",
  },
  {
    id: "#SH9457830",
    companyName: "AutoParts Pro",
    companyIndustry: "Automotive",
    carrier: "Aramex",
    route: "Detroit, MI → San Diego, CA",
    date: "Mar 20, 2035",
    status: "In Transit",
  },
];
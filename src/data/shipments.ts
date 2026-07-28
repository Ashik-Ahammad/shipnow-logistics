export interface Shipment {
  id: string;
  freightType: string;
  company: {
    name: string;
    category: string;
    logoColor: string; // Used for a placeholder logo in the UI
  };
  carrier: string;
  productCategory: string;
  weight: string;
  route: {
    origin: string;
    destination: string;
  };
  dates: {
    atd: string; // Actual Time of Departure
    eta: string; // Estimated Time of Arrival
  };
  progress: number;
  status: "Completed" | "Delivery" | "Pending";
}

const baseData: Shipment[] = [
  {
    id: "#SH9283746",
    freightType: "Air Freight",
    company: { name: "TechGear Inc.", category: "Electronics", logoColor: "bg-gray-800" },
    carrier: "FedEx",
    productCategory: "Electronics",
    weight: "1,200 kg",
    route: { origin: "Minneapolis, MN", destination: "Kansas City, MO" },
    dates: { atd: "Mar 20, 2035 - 10:00 AM", eta: "Mar 23, 2035 - 03:00 PM" },
    progress: 60,
    status: "Delivery",
  },
  {
    id: "#SH9182635",
    freightType: "Road Freight",
    company: { name: "StyleHub Co.", category: "Apparel", logoColor: "bg-indigo-500" },
    carrier: "DHL",
    productCategory: "Apparel",
    weight: "850 kg",
    route: { origin: "New York, NY", destination: "Atlanta, GA" },
    dates: { atd: "Mar 19, 2035 - 11:30 AM", eta: "Mar 22, 2035 - 01:00 PM" },
    progress: 75,
    status: "Delivery",
  },
  {
    id: "#SH9037821",
    freightType: "Ocean Freight",
    company: { name: "FreshNest", category: "Home & Kitchen", logoColor: "bg-black" },
    carrier: "UPS",
    productCategory: "Kitchen Appliances",
    weight: "1,450 kg",
    route: { origin: "Dallas, TX", destination: "Miami, FL" },
    dates: { atd: "Mar 18, 2035 - 09:00 AM", eta: "Mar 21, 2035 - 06:00 PM" },
    progress: 100,
    status: "Completed",
  },
  {
    id: "#SH9374652",
    freightType: "Rail Freight",
    company: { name: "FitPlus Gear", category: "Sports & Outdoors", logoColor: "bg-blue-600" },
    carrier: "USPS",
    productCategory: "Fitness Equipment",
    weight: "960 kg",
    route: { origin: "Seattle, WA", destination: "Denver, CO" },
    dates: { atd: "Mar 21, 2035 - 08:45 AM", eta: "Mar 25, 2035 - 04:30 PM" },
    progress: 40,
    status: "Pending",
  },
  {
    id: "#SH9457830",
    freightType: "Road Freight",
    company: { name: "AutoParts Pro", category: "Automotive", logoColor: "bg-slate-700" },
    carrier: "Aramex",
    productCategory: "Engine Components",
    weight: "1,680 kg",
    route: { origin: "Detroit, MI", destination: "San Diego, CA" },
    dates: { atd: "Mar 20, 2035 - 07:15 AM", eta: "Mar 26, 2035 - 02:00 PM" },
    progress: 50,
    status: "Delivery",
  },
  {
    id: "#SH8821349",
    freightType: "Air Freight",
    company: { name: "EcoLights", category: "Electronics", logoColor: "bg-purple-500" },
    carrier: "FedEx",
    productCategory: "Electronics",
    weight: "1,100 kg",
    route: { origin: "Austin, TX", destination: "Phoenix, AZ" },
    dates: { atd: "Mar 19, 2035 - 12:00 PM", eta: "Mar 21, 2035 - 05:00 PM" },
    progress: 90,
    status: "Delivery",
  },
  {
    id: "#SH8967432",
    freightType: "Road Freight",
    company: { name: "GreenHaven", category: "Home & Garden", logoColor: "bg-green-600" },
    carrier: "USPS",
    productCategory: "Home Tools",
    weight: "1,250 kg",
    route: { origin: "Portland, OR", destination: "Salt Lake City, UT" },
    dates: { atd: "Mar 18, 2035 - 02:45 PM", eta: "Mar 22, 2035 - 11:00 AM" },
    progress: 65,
    status: "Delivery",
  },
  {
    id: "#SH8893247",
    freightType: "Road Freight",
    company: { name: "ModaWear", category: "Apparel", logoColor: "bg-indigo-600" },
    carrier: "DHL",
    productCategory: "Apparel",
    weight: "920 kg",
    route: { origin: "Boston, MA", destination: "Charlotte, NC" },
    dates: { atd: "Mar 20, 2035 - 01:00 PM", eta: "Mar 23, 2035 - 08:00 AM" },
    progress: 80,
    status: "Delivery",
  },
  {
    id: "#SH9018723",
    freightType: "Rail Freight",
    company: { name: "SunCore Panels", category: "Electronics", logoColor: "bg-gray-900" },
    carrier: "UPS",
    productCategory: "Solar Equipment",
    weight: "1,375 kg",
    route: { origin: "San Diego, CA", destination: "Reno, NV" },
    dates: { atd: "Mar 21, 2035 - 09:30 AM", eta: "Mar 24, 2035 - 01:30 PM" },
    progress: 30,
    status: "Pending",
  },
  {
    id: "#SH8881190",
    freightType: "Road Freight",
    company: { name: "VitaFresh", category: "Food & Beverage", logoColor: "bg-emerald-500" },
    carrier: "Local Courier",
    productCategory: "Perishables",
    weight: "980 kg",
    route: { origin: "Nashville, TN", destination: "Jacksonville, FL" },
    dates: { atd: "Mar 21, 2035 - 06:00 AM", eta: "Mar 22, 2035 - 10:00 AM" },
    progress: 85,
    status: "Delivery",
  },
  {
    id: "#SH8776103",
    freightType: "Air Freight",
    company: { name: "StyleDepot", category: "Fashion", logoColor: "bg-gray-800" },
    carrier: "FedEx",
    productCategory: "Fashion Items",
    weight: "1,020 kg",
    route: { origin: "Minneapolis, MN", destination: "Kansas City, MO" },
    dates: { atd: "Mar 19, 2035 - 10:15 AM", eta: "Mar 22, 2035 - 03:30 PM" },
    progress: 60,
    status: "Delivery",
  }
];

export let shipmentsData: Shipment[] = [...baseData];

let listeners: Array<() => void> = [];

export const addShipment = (shipment: Shipment) => {
  shipmentsData = [shipment, ...shipmentsData];
  listeners.forEach((listener) => listener());
};

export const subscribeToShipments = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

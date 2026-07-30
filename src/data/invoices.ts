export interface InvoiceSummary {
  title: string;
  amount: string;
  count: number;
  iconType: 'paid' | 'unpaid' | 'pending' | 'overdue';
}

export const invoiceSummaryStats: InvoiceSummary[] = [
  { title: "Paid Invoices", amount: "$28,890", count: 350, iconType: 'paid' },
  { title: "Unpaid Invoices", amount: "$16,700", count: 120, iconType: 'unpaid' },
  { title: "Pending Invoices", amount: "$8,050", count: 80, iconType: 'pending' },
  { title: "Overdue Invoices", amount: "$22,110", count: 245, iconType: 'overdue' },
];

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Pending';

export interface InvoiceLineItem {
  id: string;
  description: string;
  shipmentType: string;
  serviceLevel: string; // e.g., 'Express', 'Standard'
  price: number;
  qty: number;
}

export interface InvoiceBillingAddress {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface Invoice {
  id: string;
  companyName: string;
  shippingId: string;
  issueDate: string; // e.g., 'Mar 15, 2035'
  dueDate: string;   // e.g., 'Mar 22, 2035'
  status: InvoiceStatus;
  
  // Detail view properties
  billFrom: InvoiceBillingAddress;
  billTo: InvoiceBillingAddress;
  lineItems: InvoiceLineItem[];
  taxRate: number; // e.g., 0.08 for 8%
  fee: number;
}

const defaultBillFrom: InvoiceBillingAddress = {
  name: "ModaWear",
  email: "billing@modawear.com",
  address: "89 Franklin St, Boston,\nMA 02110, USA",
  phone: "+1 617-555-2290"
};

const defaultBillTo: InvoiceBillingAddress = {
  name: "ShipNow Logistics",
  email: "accounts@shipnow.com",
  address: "901 Distribution Ave, Charlotte, NC\n28217, USA",
  phone: "+1 704-555-9911"
};

// Default line items to use as fallback
const defaultLineItems: InvoiceLineItem[] = [
  { id: "1", description: "Standard Freight Package", shipmentType: "Road Freight", serviceLevel: "Standard", price: 100.00, qty: 1 }
];

export const invoiceList: Invoice[] = [
  {
    id: "INV-1001",
    companyName: "TechGear Inc.",
    shippingId: "#SH9283746",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    status: "Paid",
    billFrom: { ...defaultBillFrom, name: "TechGear Inc.", email: "billing@techgear.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Electronics Pallet", shipmentType: "Air Freight", serviceLevel: "Express", price: 1250.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1002",
    companyName: "StyleHub Co.",
    shippingId: "#SH9182635",
    issueDate: "Mar 16, 2035",
    dueDate: "Mar 23, 2035",
    status: "Unpaid",
    billFrom: { ...defaultBillFrom, name: "StyleHub Co.", email: "billing@stylehub.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Apparel Shipment", shipmentType: "Road Freight", serviceLevel: "Standard", price: 980.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1003",
    companyName: "FreshNest",
    shippingId: "#SH9037821",
    issueDate: "Mar 14, 2035",
    dueDate: "Mar 21, 2035",
    status: "Paid",
    billFrom: { ...defaultBillFrom, name: "FreshNest", email: "billing@freshnest.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Kitchen Appliances", shipmentType: "Ocean Freight", serviceLevel: "Standard", price: 1320.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1004",
    companyName: "FitPlus Gear",
    shippingId: "#SH9374652",
    issueDate: "Mar 17, 2035",
    dueDate: "Mar 24, 2035",
    status: "Unpaid",
    billFrom: { ...defaultBillFrom, name: "FitPlus Gear", email: "billing@fitplus.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Fitness Equipment", shipmentType: "Rail Freight", serviceLevel: "Standard", price: 1150.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1005",
    companyName: "AutoParts Pro",
    shippingId: "#SH9457830",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    status: "Overdue",
    billFrom: { ...defaultBillFrom, name: "AutoParts Pro", email: "billing@autoparts.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Engine Components", shipmentType: "Road Freight", serviceLevel: "Standard", price: 1480.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1006",
    companyName: "EcoLights",
    shippingId: "#SH8821349",
    issueDate: "Mar 13, 2035",
    dueDate: "Mar 20, 2035",
    status: "Paid",
    billFrom: { ...defaultBillFrom, name: "EcoLights", email: "billing@ecolights.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Lighting Fixtures", shipmentType: "Air Freight", serviceLevel: "Standard", price: 790.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1007",
    companyName: "GreenHaven",
    shippingId: "#SH8967432",
    issueDate: "Mar 14, 2035",
    dueDate: "Mar 21, 2035",
    status: "Paid",
    billFrom: { ...defaultBillFrom, name: "GreenHaven", email: "billing@greenhaven.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Garden Supplies", shipmentType: "Road Freight", serviceLevel: "Standard", price: 875.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1008",
    companyName: "ModaWear",
    shippingId: "#SH8893247",
    issueDate: "Mar 16, 2035",
    dueDate: "Mar 23, 2035",
    status: "Unpaid",
    billFrom: defaultBillFrom,
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Lightweight Hoodie Pack", shipmentType: "Road Freight", serviceLevel: "Express", price: 120.00, qty: 3 },
      { id: "2", description: "Autumn Jacket Set", shipmentType: "Road Freight", serviceLevel: "Standard", price: 180.00, qty: 2 },
      { id: "3", description: "Lightweight Hoodie Pack", shipmentType: "Road Freight", serviceLevel: "Express", price: 95.00, qty: 2 }
    ],
    taxRate: 0.08,
    fee: 10.00
  },
  {
    id: "INV-1009",
    companyName: "SunCore Panels",
    shippingId: "#SH9018723",
    issueDate: "Mar 17, 2035",
    dueDate: "Mar 24, 2035",
    status: "Unpaid",
    billFrom: { ...defaultBillFrom, name: "SunCore Panels", email: "billing@suncore.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Solar Panels", shipmentType: "Rail Freight", serviceLevel: "Standard", price: 1600.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1010",
    companyName: "VitaFresh",
    shippingId: "#SH8881190",
    issueDate: "Mar 15, 2035",
    dueDate: "Mar 22, 2035",
    status: "Overdue",
    billFrom: { ...defaultBillFrom, name: "VitaFresh", email: "billing@vitafresh.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Perishables", shipmentType: "Road Freight", serviceLevel: "Express", price: 1120.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  },
  {
    id: "INV-1011",
    companyName: "SmartAppliance",
    shippingId: "#SH8923752",
    issueDate: "Mar 18, 2035",
    dueDate: "Mar 25, 2035",
    status: "Paid",
    billFrom: { ...defaultBillFrom, name: "SmartAppliance", email: "billing@smartappliance.com" },
    billTo: defaultBillTo,
    lineItems: [
      { id: "1", description: "Home Appliances", shipmentType: "Ocean Freight", serviceLevel: "Standard", price: 1050.00, qty: 1 }
    ],
    taxRate: 0.0,
    fee: 0.0
  }
];

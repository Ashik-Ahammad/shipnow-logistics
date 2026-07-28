export const inventoryStats = {
  totalSku: {
    value: 285,
    change: "+2.58%",
  },
  quantityOnHand: {
    value: "12,450",
    change: "+4.37%",
  },
  capacityUsage: {
    value: "62.5%",
    change: "+1.54%",
  }
};

export const inventoryCategories = [
  { name: "Electronics", percentage: 25, value: "2,500", color: "#856DF3", striped: false },
  { name: "Apparel", percentage: 20, value: "2,000", color: "#856DF3", striped: true },
  { name: "Home & Kitchen", percentage: 18, value: "1,800", color: "#333333", striped: false },
  { name: "Beauty & Health", percentage: 15, value: "1,500", color: "#333333", striped: true },
  { name: "Automotive Parts", percentage: 12, value: "1,200", color: "#757575", striped: false },
  { name: "Sports Equipment", percentage: 10, value: "1,000", color: "#757575", striped: true },
];

export const capacityUsageData = {
  total: 62.5,
  loaded: 40,
  empty: 24
};

export const warehouseStorage = [
  { id: 1, floor: 1, section: "A1 \u2013 A10", category: "Electronics", percentage: 80, available: 20, total: 100 },
  { id: 2, floor: 2, section: "B1 \u2013 B10", category: "Apparel", percentage: 60, available: 40, total: 100 },
  { id: 3, floor: 1, section: "C1 \u2013 C10", category: "Home & Kitchen", percentage: 90, available: 10, total: 100 },
  { id: 4, floor: 3, section: "D1 \u2013 D10", category: "Automotive Parts", percentage: 50, available: 50, total: 100 },
  { id: 5, floor: 2, section: "E1 \u2013 E10", category: "Beauty & Health", percentage: 70, available: 30, total: 100 },
  { id: 6, floor: 1, section: "F1 \u2013 F10", category: "Sports Equipment", percentage: 45, available: 55, total: 100 },
  { id: 7, floor: 2, section: "G1 \u2013 G10", category: "Electronics", percentage: 35, available: 65, total: 100 },
  { id: 8, floor: 3, section: "H1 \u2013 H10", category: "Apparel", percentage: 85, available: 15, total: 100 },
  { id: 9, floor: 1, section: "I1 \u2013 I10", category: "Beauty & Health", percentage: 20, available: 80, total: 100 },
  { id: 10, floor: 3, section: "J1 \u2013 J10", category: "Home & Kitchen", percentage: 95, available: 5, total: 100 },
];

export const packageStatus = [
  { id: "PKG-HK77420", date: "March 20, 2035 \u2013 05:30 PM", status: "Sent" },
  { id: "PKG-A50812", date: "March 21, 2035 \u2013 01:45 PM", status: "Received" },
  { id: "PKG-E10293", date: "March 22, 2035 \u2013 09:00 AM", status: "Expected" },
];

export const warehouseMapData: Record<number, { category: string; availableSpace: string; blocks: { id: string; status: string }[] }[]> = {
  1: [
    {
      category: "Electronics",
      availableSpace: "20/100",
      blocks: [
        { id: "A1", status: "Available" },
        { id: "A2", status: "Full" },
        { id: "A3", status: "Available" },
      ]
    },
    {
      category: "Home & Kitchen",
      availableSpace: "10/100",
      blocks: [
        { id: "C1", status: "Available" },
        { id: "C2", status: "Full" },
        { id: "C3", status: "Full" },
      ]
    },
    {
      category: "Automotive Parts",
      availableSpace: "50/100",
      blocks: [
        { id: "D1", status: "Available" },
        { id: "D2", status: "Available" },
        { id: "D3", status: "Available" },
      ]
    },
    {
      category: "Sports Equipment",
      availableSpace: "45/100",
      blocks: [
        { id: "F1", status: "Available" },
        { id: "F2", status: "Available" },
        { id: "F3", status: "Full" },
      ]
    },
    {
      category: "Apparel",
      availableSpace: "20/100",
      blocks: [
        { id: "B1", status: "Available" },
        { id: "B2", status: "Full" },
        { id: "B3", status: "Full" },
        { id: "B4", status: "Available" },
        { id: "B5", status: "Available" },
        { id: "B6", status: "Full" },
        { id: "B7", status: "Full" },
        { id: "B8", status: "Available" },
        { id: "B9", status: "Full" },
        { id: "B10", status: "Available" },
      ]
    },
    {
      category: "Beauty & Health",
      availableSpace: "30/100",
      blocks: [
        { id: "E1", status: "Available" },
        { id: "E2", status: "Full" },
        { id: "E3", status: "Available" },
        { id: "E4", status: "Available" },
      ]
    },
  ],
  2: [
    {
      category: "Electronics",
      availableSpace: "65/100",
      blocks: [
        { id: "G1", status: "Available" },
        { id: "G2", status: "Available" },
        { id: "G3", status: "Available" },
      ]
    },
    {
      category: "Beauty & Health",
      availableSpace: "80/100",
      blocks: [
        { id: "I1", status: "Available" },
        { id: "I2", status: "Available" },
      ]
    },
  ],
  3: [
    {
      category: "Apparel",
      availableSpace: "15/100",
      blocks: [
        { id: "H1", status: "Full" },
        { id: "H2", status: "Full" },
        { id: "H3", status: "Available" },
      ]
    },
    {
      category: "Home & Kitchen",
      availableSpace: "5/100",
      blocks: [
        { id: "J1", status: "Full" },
        { id: "J2", status: "Full" },
        { id: "J3", status: "Full" },
        { id: "J4", status: "Available" },
      ]
    }
  ]
};

export const activityLog = [
  {
    id: 1,
    user: "Leo Fernandez",
    action: "confirmed receipt of 40 units of Winter Jacket Series in Section B3 (Apparel)",
    time: "01:45 PM",
    iconType: "check"
  },
  {
    id: 2,
    user: "Ava Martinez",
    action: "added 25 units of Smart Router Kit to Section A1 (Electronics)",
    time: "09:15 AM",
    iconType: "add"
  },
  {
    id: 3,
    user: "Oscar Liem",
    action: "dispatched 18 units of Stainless Steel Cookware Set from Section C5 (Home & Kitchen)",
    time: "05:30 PM",
    iconType: "truck"
  },
  {
    id: 4,
    user: "Dina Choi",
    action: "created a shipment entry for Brake Pad Sets in Section D2 (Automotive Parts)",
    time: "04:10 PM",
    iconType: "document"
  }
];

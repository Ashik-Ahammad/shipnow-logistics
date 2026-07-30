# ShipNow Logistics Dashboard

[![Live Preview](https://img.shields.io/badge/Live_Preview-View_Demo-blue?style=for-the-badge&logo=vercel)](https://shipnow-logistics.vercel.app)

ShipNow is a responsive, high-performance logistics and shipment management platform. This project translates a high-fidelity Figma design into a fully functional React application using the Next.js App Router. It demonstrates pixel-perfect design accuracy, responsive layouts across multiple breakpoints, and interactive modular components.

## 🚀 Tech Stack

- **Framework:** Next.js 15+ (App Router) / React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Data Visualization:** Recharts
- **Form Management:** React Hook Form & Zod
- **Icons:** Lucide React & Custom SVGs

## 📦 Setup Instructions

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ashik-Ahammad/shipnow-logistics.git
   cd shipnow-logistics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Features & Implementation Status

This project implements all required screens across Desktop (1440px), Tablet (768px), and Mobile (375px) breakpoints.

| Screen / Feature | Status | Notes |
| :--- | :--- | :--- |
| **Login** | ✅ Complete | Split-screen authentication layout with `react-hook-form` and `zod` validation. |
| **Dashboard** | ✅ Complete | Fully responsive shell with Recharts data visualization and layout grids. |
| **Shipments (View Switcher)**| ✅ Complete | Seamless toggle between Grid and Table views without full page reloads. |
| **Shipments (Grid View)** | ✅ Complete | Responsive card grid with working pagination and dynamic filtering. |
| **Shipments (Table View)** | ✅ Complete | Fully functional row selection, pagination, and multi-column sorting logic. |
| **Create New Shipment** | ✅ Complete | Multi-section form integrated with `react-hook-form` and custom `zod` validation schemas matching specific design error states. |
| **Invoices & Billing** | ✅ Complete | Interactive master-detail view with dynamic line-item total calculations. |
| **Warehouse** | ✅ Complete | Includes complex nested layouts, interactive map tabs, and analytics. |
| **Other Modules** | ✅ Complete | Analytics, Calendar, Tracking, Fleets, and Drivers modules are connected to clean placeholder pages. |

## 🛠️ Architecture & Design Decisions

* **Mock Data Isolation:** There is no backend integration. All application state is managed via React state and static mock data housed in the `src/data/` directory to ensure a smooth, client-side demonstration.
* **Component Modularity:** The UI is broken down into small, reusable components inside route-specific `_components` directories, keeping the codebase organized, scalable, and maintainable.
* **Responsive Strategy:** Tailwind CSS utility classes handle all layout adjustments, ensuring the user interface remains robust and visually consistent on any device.

## 🤝 Contact

**Ashik Ahammad**
- GitHub: [@Ashik-Ahammad](https://github.com/Ashik-Ahammad)

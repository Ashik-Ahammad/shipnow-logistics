# ShipNow Logistics Dashboard

![ShipNow Banner](public/images/loginImage1.png)

ShipNow is a modern, responsive logistics and shipment management platform built as a frontend implementation exercise. It translates a high-fidelity Figma design into a fully functional React application using the Next.js App Router, demonstrating pixel-perfect design accuracy, responsive layouts, and interactive components.

**Live Demo:** [Insert Your Live Deployment Link Here, e.g., https://shipnow-logistics.vercel.app]

## 🚀 Tech Stack

- **Framework:** Next.js 15+ (App Router) / React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Utility-first with `@tailwindcss/postcss`)
- **Data Visualization:** Recharts
- **Form Management:** React Hook Form & Zod
- **Icons:** Lucide React & Custom SVG integrations

## 📦 Setup Instructions

To run this project locally on your machine:

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

## 📊 Screen-by-Screen Status

This project implements all required screens across Desktop (1440px), Tablet (768px), and Mobile (375px) breakpoints.

| Screen / Feature | Status | Notes |
| :--- | :--- | :--- |
| **Login** | ✅ Complete | Split-screen auth with `react-hook-form` + `zod` validation. |
| **Dashboard** | ✅ Complete | Fully responsive shell with charts and layout grid implemented. |
| **Shipments (View Switcher)**| ✅ Complete | Seamless toggle between Grid and Table views without full page reloads. |
| **Shipments (Grid View)** | ✅ Complete | Responsive card grid with working pagination and filtering. |
| **Shipments (Table View)** | ⚠️ Partial | Row selection, filtering, and pagination are functional. *Column sorting UI is implemented, but data sorting logic is pending.* |
| **Create New Shipment** | ⚠️ Partial | Multi-section form is fully built. *Form validation relies on native HTML5 constraints rather than the custom Figma error states.* |
| **Invoices & Billing** | ✅ Complete | Interactive master-detail view with dynamic line-item total calculations. |
| **Warehouse** | ✅ Complete | Includes complex nested layouts, interactive map tabs, and analytics. |

## 🧠 Known Issues & Assumptions

*   **Mock Data Isolation:** As requested, there is no backend integration. All application state is managed via React state and static mock data housed in the `src/data/` directory.
*   **Create Shipment Form Validation:** The form utilizes standard HTML5 validation attributes (`required`) rather than a custom `react-hook-form` error state setup as shown in the specific Figma error frame.
*   **Table Sorting:** Table headers include interactive sorting icons, but the algorithmic sorting of the mock data array is currently bypassed.
*   **Map Implementation:** The live tracking panels utilize static UI implementations rather than a live Google Maps/Mapbox SDK integration, per the assignment guidelines.
*   **Placeholder Navigation:** Sidebar links that were not explicitly included in the design scope (e.g., Drivers, Analytics) are styled correctly but currently serve as UI placeholders.

## 🤝 Contact

**Ashik Ahammad**
- GitHub: [@Ashik-Ahammad](https://github.com/Ashik-Ahammad)

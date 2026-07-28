"use client";

import { useState, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ShipmentsToolbar from "@/app/dashboard/shipments/_components/ShipmentsToolbar";
import ShipmentsTable from "@/app/dashboard/shipments/_components/ShipmentsTable";
import ShipmentsGrid from "@/app/dashboard/shipments/_components/ShipmentsGrid";
import { shipmentsData, subscribeToShipments } from "@/data/shipments";

export type ViewMode = "table" | "grid";

function ShipmentsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const viewParam = searchParams.get("view");
  const viewMode: ViewMode = (viewParam === "grid" || viewParam === "table") ? viewParam : "table";

  const handleViewChange = (newView: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", newView);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  // Basic pagination state to pass down
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Basic filtering state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [freightFilter, setFreightFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("This Month");

  const [data, setData] = useState([...shipmentsData]);

  useEffect(() => {
    return subscribeToShipments(() => {
      setData([...shipmentsData]);
    });
  }, []);

  const filteredData = data.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesFreight = freightFilter === "All" || item.freightType === freightFilter;
    
    let matchesDate = true;
    if (dateFilter !== "All Time") {
      const isMar = item.dates.eta.includes("Mar") || item.dates.atd.includes("Mar") || item.dates.atd === "Pending";
      if (dateFilter === "This Month") matchesDate = isMar;
      else if (dateFilter === "Last Month") matchesDate = !isMar;
      else if (dateFilter === "This Week") matchesDate = isMar && item.status === "Delivery"; 
    }

    return matchesSearch && matchesStatus && matchesFreight && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const metricCards = [
    {
      id: 1,
      status: "All",
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2812 8.3125C11.2477 8.3125 12.0312 9.096 12.0312 10.0625C12.0312 11.029 11.2477 11.8125 10.2812 11.8125C9.46582 11.8125 8.78063 11.2548 8.58636 10.5H5.41364C5.21937 11.2548 4.53418 11.8125 3.71875 11.8125C2.75225 11.8125 1.96875 11.029 1.96875 10.0625C1.96875 9.096 2.75225 8.3125 3.71875 8.3125C4.53418 8.3125 5.21937 8.87021 5.41364 9.625H8.58636C8.78063 8.87021 9.46582 8.3125 10.2812 8.3125ZM3.71875 9.1875C3.2355 9.1875 2.84375 9.57925 2.84375 10.0625C2.84375 10.5457 3.2355 10.9375 3.71875 10.9375C4.202 10.9375 4.59375 10.5457 4.59375 10.0625C4.59375 9.57925 4.202 9.1875 3.71875 9.1875ZM10.2812 9.1875C9.798 9.1875 9.40625 9.57925 9.40625 10.0625C9.40625 10.5457 9.798 10.9375 10.2812 10.9375C10.7645 10.9375 11.1562 10.5457 11.1562 10.0625C11.1562 9.57925 10.7645 9.1875 10.2812 9.1875Z" fill="#856DF3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.625 2.625C9.86662 2.625 10.0625 2.82088 10.0625 3.0625V8.92517C10.0624 9.16672 9.86657 9.36267 9.625 9.36267C9.38343 9.36267 9.18759 9.16672 9.1875 8.92517V7.875H1.3125V9.625H2.40625C2.64787 9.625 2.84375 9.82088 2.84375 10.0625C2.84375 10.3041 2.64787 10.5 2.40625 10.5H1.3125C1.08044 10.5 0.857943 10.4077 0.693848 10.2437C0.529753 10.0796 0.4375 9.85706 0.4375 9.625V3.5C0.4375 3.26794 0.529753 3.04544 0.693848 2.88135C0.857942 2.71725 1.08044 2.625 1.3125 2.625H9.625ZM1.3125 7H9.1875V3.5H1.3125V7Z" fill="#856DF3"/>
<path d="M11.6642 3.49666C12.1994 3.49768 12.6768 3.82591 12.8742 4.31953L13.5266 5.95161C13.5335 5.96751 13.5392 5.98395 13.5441 6.00075C13.546 6.007 13.5477 6.01326 13.5493 6.01955C13.5511 6.02704 13.5529 6.03455 13.5544 6.04219C13.5557 6.04886 13.5564 6.05559 13.5574 6.06227C13.5585 6.07006 13.5597 6.07786 13.5604 6.08577C13.5611 6.09419 13.5614 6.10258 13.5616 6.11098C13.5618 6.11564 13.5625 6.12038 13.5625 6.12508V9.62508C13.5625 9.85711 13.4702 10.0797 13.3062 10.2437C13.1421 10.4078 12.9195 10.5001 12.6875 10.5001H11.5938C11.3522 10.5001 11.1563 10.3041 11.1562 10.0625C11.1562 9.82088 11.3521 9.62508 11.5938 9.62508H12.6875V6.56258H9.625C9.3834 6.56258 9.18754 6.36667 9.1875 6.12508C9.1875 5.88345 9.38338 5.68758 9.625 5.68758H12.4786L12.0616 4.64467C11.9955 4.47944 11.837 4.37199 11.6625 4.37166C11.3229 4.37101 10.987 4.37231 10.65 4.37337C10.3829 4.37421 10.1149 4.37508 9.84375 4.37508C9.60215 4.37508 9.40629 4.17917 9.40625 3.93758C9.40625 3.69595 9.60213 3.50008 9.84375 3.50008C10.1073 3.50008 10.3742 3.4992 10.6418 3.49837C10.9831 3.49731 11.3257 3.49601 11.6642 3.49666Z" fill="#856DF3"/>
</svg>
,
      label: "Total Shipments",
      value: "1,284",
      percentage: "4.6%",
      isUp: true,
      timeframe: "this week"
    },
    {
      id: 2,
      status: "Pending",
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6875 7.47359C12.5945 8.5542 12.1949 9.58579 11.5356 10.447C10.8763 11.3082 9.98469 11.9632 8.96577 12.3349C7.94685 12.7066 6.84296 12.7795 5.78399 12.5452C4.72501 12.3108 3.75499 11.7789 2.98807 11.0119C2.22114 10.245 1.6892 9.27498 1.45484 8.216C1.22047 7.15702 1.29343 6.05314 1.66513 5.03422C2.03683 4.0153 2.69181 3.12373 3.553 2.46441C4.4142 1.80509 5.44579 1.40545 6.5264 1.3125C6.58385 1.30776 6.64167 1.31438 6.69657 1.33199C6.75146 1.3496 6.80235 1.37784 6.84633 1.41512C6.8903 1.45239 6.92651 1.49796 6.95288 1.54923C6.97924 1.60049 6.99525 1.65645 6.99999 1.7139C7.00473 1.77136 6.99811 1.82918 6.9805 1.88408C6.96289 1.93897 6.93465 1.98986 6.89737 2.03384C6.8601 2.07781 6.81453 2.11402 6.76326 2.14038C6.71199 2.16675 6.65604 2.18276 6.59858 2.1875C5.68398 2.26608 4.81085 2.60425 4.08192 3.16223C3.353 3.7202 2.7986 4.47476 2.48396 5.33713C2.16933 6.1995 2.10754 7.13379 2.30588 8.03008C2.50422 8.92636 2.95442 9.74736 3.60353 10.3965C4.25263 11.0456 5.07362 11.4958 5.96991 11.6941C6.8662 11.8924 7.80049 11.8307 8.66286 11.516C9.52522 11.2014 10.2798 10.647 10.8378 9.91806C11.3957 9.18914 11.7339 8.31601 11.8125 7.4014C11.8221 7.28537 11.8773 7.1779 11.9662 7.10262C12.055 7.02734 12.1701 6.99043 12.2861 7C12.4021 7.00957 12.5096 7.06484 12.5849 7.15366C12.6602 7.24248 12.6971 7.35756 12.6875 7.47359ZM6.56249 3.9375V7C6.56249 7.11603 6.60858 7.22731 6.69063 7.30936C6.77268 7.39141 6.88396 7.4375 6.99999 7.4375H10.0625C10.1785 7.4375 10.2898 7.39141 10.3718 7.30936C10.4539 7.22731 10.5 7.11603 10.5 7C10.5 6.88397 10.4539 6.77269 10.3718 6.69064C10.2898 6.60859 10.1785 6.5625 10.0625 6.5625H7.43749V3.9375C7.43749 3.82147 7.3914 3.71019 7.30935 3.62814C7.2273 3.54609 7.11602 3.5 6.99999 3.5C6.88396 3.5 6.77268 3.54609 6.69063 3.62814C6.60858 3.71019 6.56249 3.82147 6.56249 3.9375ZM8.74999 2.625C8.87978 2.625 9.00666 2.58651 9.11458 2.5144C9.2225 2.44229 9.30662 2.3398 9.35629 2.21988C9.40596 2.09997 9.41895 1.96802 9.39363 1.84072C9.36831 1.71342 9.30581 1.59649 9.21403 1.50471C9.12225 1.41293 9.00532 1.35043 8.87802 1.32511C8.75072 1.29979 8.61877 1.31278 8.49885 1.36245C8.37894 1.41212 8.27645 1.49624 8.20434 1.60416C8.13223 1.71208 8.09374 1.83895 8.09374 1.96875C8.09374 2.1428 8.16288 2.30972 8.28595 2.43279C8.40902 2.55586 8.57594 2.625 8.74999 2.625ZM10.7187 3.9375C10.8485 3.9375 10.9754 3.89901 11.0833 3.8269C11.1913 3.75479 11.2754 3.6523 11.325 3.53238C11.3747 3.41247 11.3877 3.28052 11.3624 3.15322C11.3371 3.02592 11.2746 2.90899 11.1828 2.81721C11.091 2.72543 10.9741 2.66293 10.8468 2.63761C10.7195 2.61229 10.5875 2.62528 10.4676 2.67495C10.3477 2.72462 10.2452 2.80874 10.1731 2.91666C10.101 3.02458 10.0625 3.15145 10.0625 3.28125C10.0625 3.4553 10.1316 3.62222 10.2547 3.74529C10.3778 3.86836 10.5447 3.9375 10.7187 3.9375ZM12.0312 5.90625C12.161 5.90625 12.2879 5.86776 12.3958 5.79565C12.5038 5.72354 12.5879 5.62105 12.6375 5.50113C12.6872 5.38122 12.7002 5.24927 12.6749 5.12197C12.6496 4.99467 12.5871 4.87774 12.4953 4.78596C12.4035 4.69418 12.2866 4.63168 12.1593 4.60636C12.032 4.58104 11.9 4.59403 11.7801 4.6437C11.6602 4.69337 11.5577 4.77749 11.4856 4.88541C11.4135 4.99333 11.375 5.1202 11.375 5.25C11.375 5.42405 11.4441 5.59097 11.5672 5.71404C11.6903 5.83711 11.8572 5.90625 12.0312 5.90625Z" fill="#856DF3"/></svg>,
      label: "Pending",
      value: "285",
      percentage: "8.7%",
      isUp: true,
      timeframe: "this week"
    },
    {
      id: 3,
      status: "Delivery",
      icon: <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0195 3.21508L10.529 0.313359C10.4469 0.215241 10.3442 0.136331 10.2283 0.0821888C10.1123 0.0280469 9.98592 -8.40612e-06 9.85797 1.88931e-09H0.875C0.642936 1.88931e-09 0.420376 0.0921872 0.256282 0.256282C0.0921872 0.420376 0 0.642936 0 0.875V7C0 7.23206 0.0921872 7.45462 0.256282 7.61872C0.420376 7.78281 0.642936 7.875 0.875 7.875H1.80469C1.90107 8.25143 2.11999 8.58508 2.42695 8.82334C2.7339 9.06161 3.11143 9.19093 3.5 9.19093C3.88857 9.19093 4.2661 9.06161 4.57305 8.82334C4.88001 8.58508 5.09893 8.25143 5.19531 7.875H7.92969C8.02607 8.25143 8.24499 8.58508 8.55195 8.82334C8.8589 9.06161 9.23643 9.19093 9.625 9.19093C10.0136 9.19093 10.3911 9.06161 10.6981 8.82334C11.005 8.58508 11.2239 8.25143 11.3203 7.875H12.25C12.4821 7.875 12.7046 7.78281 12.8687 7.61872C13.0328 7.45462 13.125 7.23206 13.125 7V3.5C13.125 3.39547 13.0875 3.29439 13.0195 3.21508ZM11.7354 3.0625H8.75V0.875H9.85797L11.7354 3.0625ZM4.8125 3.0625V0.875H7.875V3.0625H4.8125ZM3.9375 0.875V3.0625H0.875V0.875H3.9375ZM3.5 8.3125C3.32694 8.3125 3.15777 8.26118 3.01388 8.16504C2.86998 8.06889 2.75783 7.93223 2.69161 7.77235C2.62538 7.61246 2.60805 7.43653 2.64181 7.2668C2.67557 7.09706 2.75891 6.94115 2.88128 6.81878C3.00365 6.69641 3.15956 6.61307 3.3293 6.57931C3.49903 6.54555 3.67496 6.56288 3.83485 6.62911C3.99473 6.69533 4.13139 6.80748 4.22754 6.95138C4.32368 7.09527 4.375 7.26444 4.375 7.4375C4.375 7.66956 4.28281 7.89212 4.11872 8.05622C3.95462 8.22031 3.73206 8.3125 3.5 8.3125ZM9.625 8.3125C9.45194 8.3125 9.28277 8.26118 9.13888 8.16504C8.99498 8.06889 8.88283 7.93223 8.81661 7.77235C8.75038 7.61246 8.73305 7.43653 8.76681 7.2668C8.80057 7.09706 8.88391 6.94115 9.00628 6.81878C9.12865 6.69641 9.28456 6.61307 9.4543 6.57931C9.62403 6.54555 9.79996 6.56288 9.95985 6.62911C10.1197 6.69533 10.2564 6.80748 10.3525 6.95138C10.4487 7.09527 10.5 7.26444 10.5 7.4375C10.5 7.66956 10.4078 7.89212 10.2437 8.05622C10.0796 8.22031 9.85706 8.3125 9.625 8.3125ZM11.3203 7C11.2239 6.62357 11.005 6.28992 10.6981 6.05166C10.3911 5.81339 10.0136 5.68407 9.625 5.68407C9.23643 5.68407 8.8589 5.81339 8.55195 6.05166C8.24499 6.28992 8.02607 6.62357 7.92969 7H5.19531C5.09893 6.62357 4.88001 6.28992 4.57305 6.05166C4.2661 5.81339 3.88857 5.68407 3.5 5.68407C3.11143 5.68407 2.7339 5.81339 2.42695 6.05166C2.11999 6.28992 1.90107 6.62357 1.80469 7H0.875V3.9375H12.25V7H11.3203Z" fill="#856DF3"/></svg>,
      label: "Delivery",
      value: "594",
      percentage: "4.2%",
      isUp: false,
      timeframe: "from last week"
    },
    {
      id: 4,
      status: "Completed",
      icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.49703 5.37797C9.53771 5.4186 9.56998 5.46685 9.592 5.51996C9.61401 5.57308 9.62534 5.63001 9.62534 5.6875C9.62534 5.74499 9.61401 5.80192 9.592 5.85504C9.56998 5.90815 9.53771 5.9564 9.49703 5.99703L6.43453 9.05953C6.3939 9.10021 6.34565 9.13248 6.29254 9.1545C6.23942 9.17651 6.18249 9.18784 6.125 9.18784C6.06751 9.18784 6.01058 9.17651 5.95746 9.1545C5.90435 9.13248 5.8561 9.10021 5.81547 9.05953L4.50297 7.74703C4.42088 7.66494 4.37476 7.5536 4.37476 7.4375C4.37476 7.3214 4.42088 7.21006 4.50297 7.12797C4.58506 7.04588 4.6964 6.99976 4.8125 6.99976C4.9286 6.99976 5.03994 7.04588 5.12203 7.12797L6.125 8.13148L8.87797 5.37797C8.9186 5.33729 8.96685 5.30502 9.01996 5.28301C9.07308 5.26099 9.13001 5.24966 9.1875 5.24966C9.24499 5.24966 9.30192 5.26099 9.35504 5.28301C9.40815 5.30502 9.4564 5.33729 9.49703 5.37797ZM12.25 2.625V11.375C12.25 11.6071 12.1578 11.8296 11.9937 11.9937C11.8296 12.1578 11.6071 12.25 11.375 12.25H2.625C2.39294 12.25 2.17038 12.1578 2.00628 11.9937C1.84219 11.8296 1.75 11.6071 1.75 11.375V2.625C1.75 2.39294 1.84219 2.17038 2.00628 2.00628C2.17038 1.84219 2.39294 1.75 2.625 1.75H11.375C11.6071 1.75 11.8296 1.84219 11.9937 2.00628C12.1578 2.17038 12.25 2.39294 12.25 2.625ZM11.375 11.375V2.625H2.625V11.375H11.375Z" fill="#856DF3"/></svg>,
      label: "Completed",
      value: "405",
      percentage: "3.9%",
      isUp: true,
      timeframe: "this week"
    }
  ];

  return (
    <div className="flex flex-col gap-6 h-full p-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
          <div className="flex items-center gap-2 text-sm text-[#856DF3] mt-1 font-medium">
            <span>Dashboard</span>
            <span className="text-gray-400 font-normal">/</span>
            <span className="text-gray-500 font-normal">Shipments</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => router.push("/dashboard/shipments/create")}
          className="flex items-center gap-2 rounded-xl bg-[#232323] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black cursor-pointer whitespace-nowrap"
        >
          <span className="text-lg leading-none">+</span> New Shipment
        </button>
      </div>

      {/* Summary Metric Cards */}
      {viewMode === "table" && (
        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
          {metricCards.map((card) => (
            <div 
              key={card.id}
              onClick={() => setStatusFilter(card.status)}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all cursor-pointer hover:border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F3FF]">
                    {card.icon}
                  </div>
                  <p className="text-[15px] font-medium text-gray-500">{card.label}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">...</button>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-[32px] font-bold text-gray-900 leading-none">{card.value}</p>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "flex h-5.5 w-5.5 items-center justify-center rounded-full shrink-0",
                    card.isUp ? "bg-[#EAF8F1]" : "bg-[#F5F3FF]"
                  )}>
                    {card.isUp ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.73483 7.39016C2.88128 7.53661 3.11872 7.53661 3.26517 7.39016L6 4.65533L8.73484 7.39016C8.88128 7.53661 9.11872 7.53661 9.26517 7.39016C9.41161 7.24372 9.41161 7.00628 9.26517 6.85984L6.26516 3.85984C6.11872 3.71339 5.88128 3.71339 5.73484 3.85984L2.73483 6.85984C2.58839 7.00628 2.58839 7.24372 2.73483 7.39016Z" fill="#007837"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.73483 4.60983C2.88128 4.46339 3.11872 4.46339 3.26517 4.60983L6 7.34467L8.73484 4.60983C8.88128 4.46339 9.11872 4.46339 9.26517 4.60983C9.41161 4.75628 9.41161 4.99372 9.26517 5.14017L6.26516 8.14016C6.11872 8.28661 5.88128 8.28661 5.73484 8.14016L2.73483 5.14017C2.58839 4.99372 2.58839 4.75628 2.73483 4.60983Z" fill="#2A1298"/></svg>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-medium text-gray-400">
                        {card.isUp ? "Up by" : "Down"}
                      </span>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        card.isUp ? "bg-[#EAF8F1] text-[#007837]" : "bg-[#F5F3FF] text-[#2A1298]"
                      )}>
                        {card.percentage}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 leading-tight mt-0.5">
                      {card.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <ShipmentsToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          onViewChange={handleViewChange}
          freightFilter={freightFilter}
          setFreightFilter={setFreightFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        
        <div className="flex-1 overflow-auto bg-[#F9F9FC] p-4">
          {viewMode === "table" ? (
            <ShipmentsTable 
              data={paginatedData} 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={itemsPerPage}
              onPageSizeChange={(size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
              totalItems={filteredData.length}
            />
          ) : (
            <ShipmentsGrid 
              data={paginatedData}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={itemsPerPage}
              onPageSizeChange={(size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              }}
              totalItems={filteredData.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShipmentsClient() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading shipments...</div>}>
      <ShipmentsContent />
    </Suspense>
  );
}
